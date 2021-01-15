const getProjects = async (DB) => {
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

module.exports = getProjects;