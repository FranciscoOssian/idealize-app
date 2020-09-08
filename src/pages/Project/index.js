import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native';




const Project = () => {

    const [projectName, setProjectName] = useState('');
    const [imgProject, setImgProject] = useState('');
    const [ownerProjectId, setOwnerProjectId ] = useState(0);
    const [projectDescription, setProject_description] = useState('');
    const [projectTags, setProjectTags] = useState([]);
    const [wppLink, setWppLink] = useState('');
    const [genericLink, setGenericLink] = useState('');

    const route = useRoute();

    const routeParams = route.params;

    const navigation = useNavigation();



    function handleNavigateBack(){
        navigation.goBack();
    }

return(
    <>
    </>
);

}

export default Project;