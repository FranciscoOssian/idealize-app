import React, { useState, useEffect } from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Project from '../../components/Project';

import getProjects from '../../services/firebase/database/realTimeDB/GET/getProjects';


const Home = () => {
    const [projects, setProjects] = useState([]);

    const navigation = useNavigation();

    function handleNavigationToProject(project){
        navigation.navigate('Project', project);
    }
    

    function handleNavigationToRegisterProject(){
        navigation.navigate('RegisterProject')
    }

    const loadProjects = async() => {
        getProjects()
            .then(data => {
                setProjects(data);
            })
            .catch(err =>  console.log(err))
    }

    useEffect(() =>{
        loadProjects();
    }, []);



return (
    <>
        <Text style={styles.screenName}>Discover</Text>
        
        <View style={styles.newAndReload}>
            <RectButton
                onPress={()=>handleNavigationToRegisterProject()}
                style={styles.actionButon}
            >
                <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="black" />
                <Text>New Idea</Text>
            </RectButton>
            <RectButton
                onPress={()=>loadProjects()}
                style={styles.actionButon}
            >
                <AntDesign name="reload1" size={24} color="black" />
                <Text>Reload Ideas</Text>
            </RectButton>
        </View>
        
        <View>
            <ScrollView
                vertical
            >
                {projects.map( project => (


                    <RectButton
                        key={project.projectID}
                        onPress={() => handleNavigationToProject(project)}
                    >
                        <Project
                            key={project.projectID}
                            title={project.title}
                            description={project.description}
                            uri={project.uri}
                            wppLink={project.wppLink}
                            genericLink={project.genericLink}
                            ownerUID={project.ownerUID}
                        />
                    </RectButton>
                    
                    
                ) )}

                <Project
                    uri='a'
                    description=''
                    title=''
                ></Project>
            </ScrollView>
        </View>
    </>
);

}


const styles = StyleSheet.create({
    screenName:{
        fontSize:32
    },
    newAndReload:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    actionButon:{
        alignItems:'center'
    }
});


export default Home;