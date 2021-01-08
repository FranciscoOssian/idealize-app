const functions = require('firebase-functions');
const admin = require('firebase-admin');

const crypto = require('crypto');

admin.initializeApp();

const DB = admin.database();

const getProjects = async () => {
    let snapshot;
    let projects;
    try{
        snapshot = await DB.ref('projects').once('value');
        projects = snapshot.val();
    }catch(err){
        console.log(err);
        projects = [];
    }

    return projects;
}

const del = async (project, projects) => {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    DB.ref(`projects`).set(projects);
    return projects;
}

const findProject = (projects, idToFind) => {
    for (project of projects){
        if(project.projectId === idToFind) return project;
    }
    return undefined;
}

const hash = (type, encoding, text) => crypto.createHash(type).update(text).digest(encoding);


exports.deleteProject = functions.https.onRequest(async (request, response) => {

    try{

        //response.end(JSON.stringify(request.body));

        

        if(request.body.parcialOwnerSignature === undefined || request.body.projectId === undefined) response.end("blank spaces");
    
        const projects = await getProjects();

        const parcialOwnerSignature = request.body.parcialOwnerSignature;
        const projectIdResquest = request.body.projectId;

        const projectFind = findProject(projects, projectIdResquest);
        
        if(!projectFind) response.end('project not found');

        const ownerSignature = projectFind.ownerSignature;

        if( hash('sha256','hex',parcialOwnerSignature ) !== ownerSignature ) response.end('you dont have perm.');

        const projectsNews = await del(projectFind, projects);

        response.send(projectsNews);

        

    }catch(err){console.log("grrrrrr",err)}

    
});
