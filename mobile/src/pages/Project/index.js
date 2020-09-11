import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet, ImageBackground, View, Text, Button, Alert, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';

const Project = () => {

    const [projectName, setProjectName] = useState('');
    const [imgProject, setImgProject] = useState('a'); //starst with 'a' for dont warnig because uri do not be a empyt string
    const [ownerProjectId, setOwnerProjectId ] = useState(0);
    const [projectDescription, setProjectDescription] = useState('');
    const [projectTags, setProjectTags] = useState([]);
    const [wppLink, setWppLink] = useState('');
    const [genericLink, setGenericLink] = useState('');

    const route = useRoute();

    
    useEffect(()=>{
        const routeParams = route.params;
        const { title, description, uri, wppLink, genericLink, ownerUID } = routeParams;
        setGenericLink(genericLink);
        setImgProject(uri);
        setOwnerProjectId(ownerUID);
        setProjectDescription(description);
        setProjectName(title);
        setWppLink(wppLink);
    }, [])
    
    const navigation = useNavigation();
    
    
    function onHandleWpp(){
        try{
            console.log(wppLink);
            Linking.openURL(wppLink);
        }catch(err){
            console.log(err);
        }
    }

    function onHandleGenericLink(){
        try{
            console.log(genericLink);
            Linking.openURL(genericLink);
        }catch(err){console.log(err)}
    }

    function handleNavigateBack(){
        navigation.goBack();
    }

return(
    <>
        <ImageBackground
            style={styles.image}
            source={ { uri: imgProject } }
        >

            <View
                style={styles.PerfilAndBack}
            >
                <View
                    style={styles.perfil}
                >
                    <MaterialIcons name="person-outline" size={24} color="black" />
                    <Text style={styles.email}>Email</Text>
                </View>
                <RectButton
                    onPress={ () => handleNavigateBack()}
                >
                    <View style={styles.back}>
                        <AntDesign name="back" size={24} color="black" />
                    </View>
                </RectButton>
            </View>

            <View
                style={styles.box}
            >
                <Text
                    style={styles.projectName}
                >
                    {projectName}
                </Text>
                <Text
                    style={styles.descriptionProject}
                >
                    {projectDescription}
                </Text>
                {projectTags.map( tag => (
                    <Tex>{tag}</Tex>
                ) )}

                <View
                    style={styles.links}
                >
                    <RectButton
                        onPress={()=>onHandleWpp()}
                        style={styles.ActionLink}
                    >
                        <FontAwesome name="whatsapp" size={50} color="black"/>
                        <Text>WhatsApp</Text>
                    </RectButton>
                    <RectButton
                        onPress={()=>onHandleGenericLink()}
                        style={styles.ActionLink}
                    >
                        <MaterialCommunityIcons name="link-variant" size={50} color="black" />
                        <Text>Generic Link</Text>
                    </RectButton>
                </View>
                
            </View>

        </ImageBackground>
    </>
);

}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    box:{
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#ffff',
        width:'80%',
        borderRadius:10
    },
    PerfilAndBack:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:'70%',
        marginTop:'10%',
        alignItems:'center'
    },
    perfil:{
        display:'flex',
        flexDirection:'row',

        justifyContent:'center',
        alignItems:'center',

        backgroundColor:'#ffff',

        borderRadius:100,
        
        width:200,
        height:50
    },
    ActionLink:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    centering:{
        textAlignVertical:'center',
    },
    back:{
        backgroundColor:'#ffff',
        borderRadius:100
    },

    projectName:{
        fontSize:30
    },
    descriptionProject:{
        fontSize:15,
        textAlign:'center',
        margin:'5%'
    },
    links:{
        display:'flex',
        flexDirection:'row',

        justifyContent:'center',
        alignItems:'center',
    }, 
    email:{
    }
});

export default Project;