const admin = require('firebase-admin');

const crypto = require('crypto');

const getProjects = require('../utils/getProjects.js');
const findProject = require('../utils/findProject.js');

admin.initializeApp();

const DB = admin.database();

const del = async (project, projects) => {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    DB.ref(`projects`).set(projects);
    return projects;
}

const hash = (type, encoding, text) => crypto.createHash(type).update(text).digest(encoding);

const deleteProject = async( request, response ) => {

    try{
        if(request.body.parcialOwnerSignature === undefined || request.body.projectId === undefined) response.end("blank spaces");
    
        const projects = await getProjects(DB);

        const parcialOwnerSignature = request.body.parcialOwnerSignature;
        const projectIdResquest = request.body.projectId;

        const projectFind = findProject(projects, projectIdResquest);
        
        if(!projectFind) response.end('project not found');

        const ownerSignature = projectFind.ownerSignature;

        if( hash('sha256','hex',parcialOwnerSignature ) !== ownerSignature ) response.end('you dont have perm.');

        const projectsNews = await del(projectFind, projects);

        response.send(projectsNews);
    }catch(err){console.log("grrrrrr",err)}

}

module.exports = deleteProject;