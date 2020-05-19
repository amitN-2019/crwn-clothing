import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAsVO5rRuqTKF2s1LfyFjIgrCR4wwFtaBg",
    authDomain: "crwn-db-16bda.firebaseapp.com",
    databaseURL: "https://crwn-db-16bda.firebaseio.com",
    projectId: "crwn-db-16bda",
    storageBucket: "crwn-db-16bda.appspot.com",
    messagingSenderId: "147416963814",
    appId: "1:147416963814:web:6668d0b99ee7104cf4f927",
    measurementId: "G-LEY66T3J44"
  };

  export const createUserProfileDocument = async(userAuth , additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

     const snapShot = await userRef.get();

 
    if(!snapShot.exists){

        const { displayName , email  } = userAuth;
        const createdAt = new Date();

        try {

            await userRef.set(
            {
                    
                 displayName,
                 email,
                 createdAt,
                 ...additionalData
            }
      )
    }catch(error){
            console.log('error creating user', error.message);
        }


    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth =  firebase.auth();  
  export const firestore =  firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


