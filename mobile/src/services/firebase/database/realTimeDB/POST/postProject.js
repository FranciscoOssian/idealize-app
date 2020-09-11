import * as Crypto from 'expo-crypto';
import fireApp from '../../../fireapp';

import getProjects from '../GET/getProjects';

const DB = fireApp.database();

const postProject = async (project) => {

    const date = new Date().getTime();
    const projectData = JSON.stringify(project);

    const projectID = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${date}${projectData}`
      );

    project.projectID = projectID;

    const projects = await getProjects();
    const result = [project, ...projects];
    
    await DB.ref(`projects`).set(result);

}

export default postProject;