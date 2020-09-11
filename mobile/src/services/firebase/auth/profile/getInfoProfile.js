import fireApp from '../../fireapp';

const getInfoProfile = async (uid) => {
    const profile = await fireApp.firestore().collection('users').doc(uid).get();
    const data = profile && profile.data();

    if(!data) return {}

    return data;
}

export default getInfoProfile;