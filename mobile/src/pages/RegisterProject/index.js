import React, {useState, useEffect} from 'react';
import {View, TextInput, Image, StyleSheet, Text, Button, Alert} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Crypto from 'expo-crypto';

import postProject from '../../services/firebase/database/realTimeDB/POST/postProject';
import postPhotoProject from '../../services/firebase/database/storage/POST/postPhotoProject';
import currentUser from '../../services/firebase/auth/currentUser';

const RegisterProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectAreas, setProjectAreas] = useState('');
    const [projectWppLink, setProjectWppLink] = useState('');
    const [projectGenericLink, setProjectLink] = useState('');
    const [image, setImage] = useState({});

    const navigation = useNavigation();

    useEffect(()=>{
        const getPermissionAsync = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') alert('Sorry, we need camera roll permissions to make this work!');
        };
        getPermissionAsync();
    }, []);

    function onHandleToHome(){
        navigation.navigate('Home');
    }

    const selectImg = async () => {
        const date = new Date().getTime();
        
        const result = await ImagePicker.launchImageLibraryAsync();

        const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            `${result.uri}${date}`
        );
            
        if (result.cancelled) return;

        setImage({
            uri: result.uri,
            name: hash
        });
        
    }

    async function onHandleSend(){
        if(image === {}) return;
        const imageBackEndUri = await postPhotoProject(image.uri, image.name);
        const tags = projectAreas.replace(" ", "").split(",");
        const uid = currentUser().uid;
        postProject(
            {
                title: projectName,
                description: projectDescription,
                tags: tags,
                wppLink: projectWppLink,
                uri: imageBackEndUri,
                ownerUID: uid,
                genericLink: projectGenericLink
            }
        )
        Alert.alert('Success to send yout idea')
        onHandleToHome();


    }


    return (
        <>
            <Text style={styles.screenName}>Register your project idea</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setProjectName(text)}
                    value={projectName}
                    placeholder="the project name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setProjectDescription(text)}
                    value={projectDescription}
                    placeholder="the project description"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setProjectAreas(text)}
                    value={projectAreas}
                    placeholder="tags, separate with commas ( , ) "
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setProjectWppLink(text)}
                    value={projectWppLink}
                    placeholder="link to wpp group"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setProjectLink(text)}
                    value={projectGenericLink}
                    placeholder="A generic link"
                    keyboardType="email-address"
                />
                <View >
                    <Button title="Pick an image from camera roll"
                        onPress={() => selectImg()}
                    />

                    
                    <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, borderColor:'black', borderWidth:3, borderRadius: 3 }} />
                    <Text>Image</Text>
                </View>

                <RectButton
                    onPress={ () => onHandleSend().catch( err => console.log(err) ) }
                    style={ styles.send }
                >
                    <Text 
                        style={styles.sendTxt}
                    >
                        Send
                    </Text>
                </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screenName:{
        fontSize:30,
        alignSelf:'center'
    },
    form:{
        alignItems:'center'
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
    send:{
        
        alignItems:'center',
        
        backgroundColor:'black',

        width:343,
        height: 52,

        borderRadius:10,
        borderWidth:3,
        borderColor:'white',
    },
    sendTxt:{
        
        paddingTop:10,

        color:'white',
        
        fontSize:13,
    }
});

export default RegisterProject;