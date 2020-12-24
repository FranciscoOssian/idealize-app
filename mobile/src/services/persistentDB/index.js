import * as SecureStore from 'expo-secure-store';

const setCredentials = async ({ email, password }) => {
    const credentials = { email, password };
    let ok;
    try {
        await SecureStore.setItemAsync(
          'credentials',
          JSON.stringify(credentials)
        );
        ok = true;
    }catch (e) {
        console.log(e);
        ok = false;
    }

    return ok;
}

const getCredentials = async () => {
    let credentials;
    try {
        let response = await SecureStore.getItemAsync('credentials');

        if(!response) return 0;
  
        if (response) credentials = JSON.parse(response);
      } catch (e) { console.log(e) }

    return credentials;
}

const deleteCredentials = async () => {
    try {
        await SecureStore.deleteItemAsync('credentials');
    } catch (e) {console.log(e)}
}

export default {
    getCredentials,
    deleteCredentials,
    setCredentials
}