import fireApp from '../../../fireapp';

const storage = fireApp.storage();

const deletePhotoProject = async (name) => {
    const resp = await storage.ref().child(`project_photos/${name}`).delete();
    return resp;
}

export default deletePhotoProject;