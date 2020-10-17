import fireApp from '../../../fireapp';
import { baseUrlStorage } from '../../../../../../firebaseConfigs.json';

const storage = fireApp.storage();

const postPhotoProject = async (uri, name) => {

    const response = await fetch(uri);
    const blob = await response.blob();

    const urlAccess = baseUrlStorage + name + '?alt=media';

    await storage.ref().child(`project_photos/${name}`).put(blob);
    return urlAccess;
}

export default postPhotoProject;