import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import getInfoProfile from '../../services/firebase/auth/profile/getInfoProfile';

const Project = (projectProps) => {

    const [owner, setOwner] = useState({});

    getInfoProfile(projectProps.ownerUID)
        .then(data => setOwner(data))


    return (
        <View style={styles.container}>
            <Text>{owner.email}</Text>
            <Image
                style={styles.container}
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

    projectName:{
        fontSize:25
    },

    projectDescription:{
        fontSize:10
    }
  });

export default Project;