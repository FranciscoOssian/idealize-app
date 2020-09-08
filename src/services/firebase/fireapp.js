import firebase from 'firebase';
import { firebaseConfig } from '../../../firebaseConfigs.json';

const App = firebase.initializeApp(firebaseConfig);
firebase.analytics;

export default App;