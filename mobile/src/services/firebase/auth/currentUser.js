import fireApp from '../fireapp';

const currentUser  = () => {
    return fireApp.auth().currentUser;
}

export default currentUser;