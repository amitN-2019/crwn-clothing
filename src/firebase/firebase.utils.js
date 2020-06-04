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

 
  export const addCollectionAndDocuments  = async (collectionKey , objectsToAdd)  => {

    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef) 

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef =  collectionRef.doc();
      batch.set(newDocRef , obj)  ;

   });
   return await batch.commit();

  };


  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
  
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };
  
  
  export const getCurrentUser =  () => {

     return new Promise((resolve , reject) => {

      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);

      }, reject)
     });
  }

  export const auth =  firebase.auth();  
  export const firestore =  firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;


