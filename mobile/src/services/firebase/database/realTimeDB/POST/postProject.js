import * as Crypto from 'expo-crypto';
import fireApp from '../../../fireapp';

import getProjects from '../GET/getProjects';
import persistentDB from '../../../../persistentDB/index'

const DB = fireApp.database();

const postProject = async (project) => {

    const date = new Date().getTime();
    const projectData = JSON.stringify(project);
    
    const storedCredentials = await persistentDB.getCredentials();
    
    let ownerSignature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${JSON.stringify(storedCredentials)}`,
      );

    ownerSignature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${ownerSignature}`,
    );

    const projectId = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${date}${projectData}`
    );

    project.ownerSignature = ownerSignature;
    project.projectId = projectId;

    const projects = await getProjects();
    const result = [project, ...projects];
    await DB.ref(`projects`).set(result);
    
    return 0;

}

export default postProject;