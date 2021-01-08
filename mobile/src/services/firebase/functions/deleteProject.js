import axios from 'axios';

const deleteProject = async (props) => {

  const projectId = props.projectId;
  const parcialOwnerSignature = props.parcialOwnerSignature;

  const newProjects = await axios.delete('https://us-central1-idealize-app-4d62a.cloudfunctions.net/deleteProject',{
      data: {
        projectId,
        parcialOwnerSignature
      }
    });

  return newProjects.data;
}

export default deleteProject;