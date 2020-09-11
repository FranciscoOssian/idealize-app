import fireApp from '../fireapp';

import {Alert} from 'react-native';

async function registerUser(email, password, callback){
    fireApp.auth().createUserWithEmailAndPassword(email, password)
        .then(async user => {
            Alert.alert('Success', `Your account with email ${email}, have be registred`);
            callback();
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if(errorCode === 'auth/email-already-in-use'){
                Alert.alert('email already in use', errorMessage);
            }
            else if (errorCode === 'auth/invalid-email'){
                Alert.alert('invalid email', errorMessage);
            }
            else if (errorCode === 'auth/operation-not-allowed'){
                Alert.alert('operation not allowed', errorMessage);
            }
            else if (errorCode === 'auth/weak-password'){
                Alert.alert('weak password', errorMessage);
            }
        })
}

export default registerUser;