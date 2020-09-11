import fireApp from '../fireapp';

const signInWithEmailAndPassword  = async(email, password) => {
    return fireApp.auth().signInWithEmailAndPassword(email, password);
}

export default signInWithEmailAndPassword;