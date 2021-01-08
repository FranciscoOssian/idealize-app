import fireApp from '../fireapp';

async function registerUserAuth(email, password){
    const a = fireApp.auth().createUserWithEmailAndPassword(email, password)

    a.then(a => console.log(a));

    return a;
}

export default registerUserAuth;