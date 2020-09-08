import React, { useState } from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import registerUser from '../../services/firebase/auth/registerUser';


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigation = useNavigation();

    function toLogin(){
        navigation.navigate('Login', {
        });
    }

    async function onHandleRegister(){
        registerUser(email, password, () => {
            toLogin();
        });
    }

return (
    <>
        <Text style={styles.screenName}>Register</Text>
        <View style={styles.form} >
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="email"
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="password"
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                value={name}
                placeholder="name"
            />

            <RectButton
                onPress={onHandleRegister}
                style={styles.registrar}
            >
                <Text style={styles.registrarTxt}>Registrar</Text>
            </RectButton>
        </View>


    </>
);

}

export default Register;

const styles = StyleSheet.create({
    screenName:{
        fontSize:36
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

    form:{
        alignItems:'center'
    },

    registrar:{
        alignItems:'center',
        
        backgroundColor:'black',

        width:343,
        height: 52,

        borderRadius:10,
        borderWidth:3,
        borderColor:'white',
    },

    registrarTxt:{
        paddingTop:10,

        color:'white',

        fontSize:13,
    }
});