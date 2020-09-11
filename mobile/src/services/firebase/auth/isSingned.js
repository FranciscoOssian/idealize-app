import fireApp from '../fireapp';

export default fireApp.auth().currentUser? true : false;