import firebase from 'firebase';
import { firebaseConfig } from '../../../firebaseConfig.json';

const App = firebase.initializeApp(firebaseConfig);
firebase.analytics;

export default App;