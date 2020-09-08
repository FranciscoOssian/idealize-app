import fireApp from '../../../fireapp';

const storage = fireApp.storage();

const postPhotoProject = async (uri, name) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const urlAccess = 'https://firebasestorage.googleapis.com/v0/b/idealize-app-5f4d2.appspot.com/o/project_photos%2F' + name + '?alt=media';
    
    await storage.ref().child(`project_photos/${name}`).put(blob);
    return urlAccess;
}

export default postPhotoProject;