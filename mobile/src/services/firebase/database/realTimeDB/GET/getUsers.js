import fireApp from '../../../fireapp';

const DB = fireApp.database();

const getUsers = async () => {
    let snapshot;
    let users;
    try{
        snapshot = await DB.ref('usersInfo').once('value');
        users = snapshot.val();
    }catch(err){
        console.log(err);
        users = [];
    }

    return users;
}

export default getUsers;