import React, { useState, useEffect } from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Project from '../../components/Project';

import getProjects from '../../services/firebase/database/realTimeDB/GET/getProjects';


const Home = () => {
    const [projects, setProjects] = useState([]);

    const [selectedProject, setSelectedProject] = useState(0);

    const navigation = useNavigation();

    function handleNavigationToProject(){
        navigation.navigate('Project', {
            id: selectedProject
        });
    }

    function handleNavigationToRegisterProject(){
        navigation.navigate('RegisterProject')
    }

    useEffect(() =>{
        const load = async() => {
            getProjects()
                .then(data => {
                    setProjects(data);
                })
                .catch(err =>  console.log(err))
        }
        load();
    }, []);



return (
    <>
        <Text style={styles.screenName}>home</Text>
        <RectButton
            onPress={()=>handleNavigationToRegisterProject()}
        >
            <Text>register project</Text>
        </RectButton>
        <View>
            <ScrollView
                vertical
            >
                {projects.map( project => (
                    <RectButton
                        key={project.projectID}
                        onPress={() => console.log(`clicou em ${project.title}`)}
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
            </ScrollView>
        </View>
    </>
);

}


const styles = StyleSheet.create({
    screenName:{
        fontSize:32
    }
});


export default Home;