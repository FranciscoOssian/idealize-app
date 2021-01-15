const findProject = (projects, idToFind) => {
    for (project of projects){
        if(project.projectId === idToFind) return project;
    }
    return undefined;
}

module.exports = findProject;