import React, { useState, useEffect } from 'react';
import {TextInput, Text, View, AsyncStorage, Alert, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import signInWithEmailAndPassword from '../../services/firebase/auth/signInWithEmailAndPassword';
import persistentDB from '../../services/persistentDB/index';

//import { LogBox } from 'react-native';
//LogBox.ignoreAllLogs();

const Login = () => {

    useEffect(()=>{
        const run  = async () => {
            let flag = true;
            const credentials = await persistentDB.getCredentials();
            if(credentials){
                try{
                    console.log(credentials);
                    await signInWithEmailAndPassword(credentials.email, credentials.password)
                        .catch(error => {
                            flag = false;
                            const code = error.code;
                            code === 'auth/invalid-email' ? Alert.alert('Wrong password.', error.message) : 
                            code === 'auth/user-disabled' ? Alert.alert('user disabled', error.message)   : 
                            code === 'auth/user-not-found'? Alert.alert('user not found', error.message)  : 
                            code === 'auth/wrong-password'? Alert.alert('wrong password', error.message)  : {}
                        });
                    if (!flag) return; //the user can access the next screen even without login, but it is better to avoid
                    await handleNavigationToHome();
    
                }catch(err){console.log(err);}
            }
        }
        run();
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    async function handleNavigationToHome(){
        navigation.navigate('Home', {
        });
    }

    async function keepCredentials({ email, password }){
        await persistentDB.setCredentials({ email, password });
    }

    async function getCredentials(){
        return persistentDB.getCredentials();
    }

    async function enter(email, password){
        let flag = true;
        try{
            await signInWithEmailAndPassword(email, password)
                    .catch(error => {
                        flag = false;
                        const code = error.code;
                        code === 'auth/invalid-email' ? Alert.alert('Wrong password.', error.message) : 
                        code === 'auth/user-disabled' ? Alert.alert('user disabled', error.message)   : 
                        code === 'auth/user-not-found'? Alert.alert('user not found', error.message)  : 
                        code === 'auth/wrong-password'? Alert.alert('wrong password', error.message)  : {}
                    });
            if (!flag) return; //the user can access the next screen even without login, but it is better to avoid
            await keepCredentials({ email, password });
            await handleNavigationToHome();
        }catch(err){
            console.log('error in function ENTER ', err);
        }
        //await sendEmailVerification();
    }

return (
    <>
        <Text style={styles.screenName}>Login</Text>
        <View style={styles.inputs}>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="your email"
                autoCompleteType="email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="password"
                autoCompleteType="password"
                secureTextEntry={true}
            />
            <RectButton
                onPress={ async() => await enter(email, password) }
                style={styles.login}
            >
                <Text style={styles.loginTxt}>Login</Text>
            </RectButton>
        </View>
        
    </>
);

}

export default Login;

const styles = StyleSheet.create({
    screenName:{
        fontSize:36,
        color:'black'
    },

    input:{
        width:343,
        height: 40, 

        borderColor: 'black', 
        borderWidth: 3,
        borderRadius:10,

        padding:10,

        margin:10
    },

    inputs:{
        alignItems:'center'
    },

    login:{
        alignItems:'center',
        
        backgroundColor:'black',

        width:343,
        height: 52,

        borderRadius:10,
        borderWidth:3,
        borderColor:'white',
    },

    loginTxt:{
        paddingTop:10,

        color:'white',
        
        fontSize:13,
    }
});