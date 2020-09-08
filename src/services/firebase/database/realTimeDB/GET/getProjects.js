import fireApp from '../../../fireapp';

const DB = fireApp.database();

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

export default getProjects;