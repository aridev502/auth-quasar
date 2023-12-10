
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDmexJJG37fC-eY7cpRXNzpsuEonXDUSjI",
  authDomain: "char-quasar.firebaseapp.com",
  databaseURL: "https://char-quasar-default-rtdb.firebaseio.com",
  projectId: "char-quasar",
  storageBucket: "char-quasar.appspot.com",
  messagingSenderId: "1062992905931",
  appId: "1:1062992905931:web:c18e934fa9a9b5a003fd4e"
};

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const marcaTiempo = serverTimestamp;



export {

  db,
  auth,
  marcaTiempo

}

