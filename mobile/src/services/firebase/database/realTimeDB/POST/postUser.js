import fireApp from '../../../fireapp';
import getUsers from '../GET/getUsers';

const DB = fireApp.database();

const postUser = async (userCredentials) => {

    console.log(userCredentials);

    const user = userCredentials.user;
    const email = user.email;
    const uid = user.uid;
    //const photoPerfil = user.photoUrl;

    const users = await getUsers();

    const newUsers = [{email, uid}, ... users ];

    await DB.ref(`usersInfo`).set(newUsers);
    
    return 0;

}

export default postUser;