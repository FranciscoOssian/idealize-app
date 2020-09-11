import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Project = (projectProps) => {

    const [owner, setOwner] = useState({});

    useEffect(()=>{
    },[]);

    return (
        <View style={styles.container}>

            <View
                style={styles.perfil}
            >
            </View>

            <Image
                style={styles.imagePerfil}
                source={{uri :projectProps.uri}}
            />
            <Text style={styles.projectName}>
                {projectProps.title}
            </Text>
            <Text style={styles.projectDescription}>
                {projectProps.description.substring(0,100)}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 50,
    },

    imagePerfil:{
        padding:100
    },

    projectName:{
        fontSize:25
    },

    projectDescription:{
        fontSize:10
    },
    perfil:{

    }
  });

export default Project;