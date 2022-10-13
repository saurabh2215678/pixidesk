import React, { useContext, useState, useEffect } from "react";
import {auth, db, storage} from '../firebase';
import {doc, collection, setDoc, getDocs, Timestamp} from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {signInWithPopup, FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth';

import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../state/index";
import FullPageLoading from "../components/backend/fullPageLoading";


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    // redux functions implimentation
    const dispatch = useDispatch();
    const {uploadProfilePicture, updatingProfile, updatedProfile, signingUp, signedUp} = bindActionCreators(actionCreators, dispatch);
    // const isSigningUp = useSelector((state) => state.isSigningUp);

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function compare( a, b ) {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
      }

    async function signup({email, password, name, phone, country_code, profile_picture}) {
        signingUp();
        const userCollectionRef = collection(db, 'users');
        const data = await getDocs(userCollectionRef);
        var allUsers = data.docs.map((doc)=>({...doc.data()}));
        allUsers.sort(compare);
        const last_user = allUsers[allUsers.length - 1];
        const currentUserId = last_user?.id ? (last_user.id + 1) : 1;
        const authenticatedUser = await auth.createUserWithEmailAndPassword(email, password);
        const dbUser = {
            "id": currentUserId,
            "email" : authenticatedUser.user.email,
            "name" : name,
            "phone" : phone,
            "country_code" : country_code,
            "uid" : authenticatedUser.user.uid,
            "created_at" : Timestamp.fromDate (new Date()),
            "updated_at" : Timestamp.fromDate (new Date()),
            "user_type" : 2,
            "is_approved" : false
        }

        if(profile_picture){
            const file = await fetch(profile_picture).then(r => r.blob()).then(blobFile => new File([blobFile], 'profile_picture', { type: blobFile.type }));
            const imageRef = ref(storage, `users/user_${currentUserId}/${file.name}.png`);
            const metadata = {
                contentType: file.type,
              };
            try{
                const uploadTask = uploadBytesResumable(imageRef, file, metadata);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadProfilePicture(progress);
                    updatingProfile('profile_picture');
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                    default:
                        console.log('i am trying to upload');
                  }
                }, 
                (error) => {
                  // Handle unsuccessful uploads
                }, 
                () => {
                    updatingProfile('profile')
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    const userDocRef = doc(db, 'users', authenticatedUser.user.uid);
                    const payload = {...dbUser, "profile_picture" : downloadURL};
                    await setDoc(userDocRef, payload);
                    updatedProfile();
                    signedUp();
                  });
                }
              );
            }catch(e){
                signedUp();
                console.log(e);
            }
        }else{
            const userDocRef = doc(db, 'users', authenticatedUser.user.uid);
            const savedUser = await setDoc(userDocRef, dbUser);
            console.log(savedUser);
            signedUp();
        }
        return authenticatedUser;
    }

    async function signInWithFacebook(){
        signingUp();
        try{
        const provider = new FacebookAuthProvider();
        const userCollectionRef = collection(db, 'users');
        const data = await getDocs(userCollectionRef);
        var allUsers = data.docs.map((doc)=>({...doc.data()}));
        allUsers.sort(compare);
        const last_user = allUsers[allUsers.length - 1];
        const currentUserId = last_user?.id ? (last_user.id + 1) : 1;
        const authenticatedUser = await signInWithPopup(auth, provider);

        const credential = FacebookAuthProvider.credentialFromResult(authenticatedUser);
        const accessToken = credential.accessToken;
        const photoUrl = `${authenticatedUser.user.providerData[0].photoURL}?type=large&width=720&height=720&access_token=${accessToken}`
        let blob = await fetch(photoUrl).then(r => r.blob());
        const objectUrl = URL.createObjectURL(blob);

        const dbUser = {
          "id": currentUserId,
          "email" : authenticatedUser.user.email,
          "name" : authenticatedUser.user.displayName,
          "uid" : authenticatedUser.user.uid,
          "created_at" : Timestamp.fromDate (new Date()),
          "updated_at" : Timestamp.fromDate (new Date()),
          "user_type" : 2,
          "is_approved" : false
        }

        const file = await fetch(objectUrl).then(r => r.blob()).then(blobFile => new File([blobFile], 'profile_picture', { type: blobFile.type }));
        const imageRef = ref(storage, `users/user_${currentUserId}/${file.name}.jpeg`);
        const metadata = {
            contentType: file.type,
          };
        
          const uploadTask = uploadBytesResumable(imageRef, file, metadata);
          uploadTask.on('state_changed', 
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              uploadProfilePicture(progress);
              updatingProfile('profile_picture');
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                  console.log('i am trying to upload');
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
              updatingProfile('profile')
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);
              const userDocRef = doc(db, 'users', authenticatedUser.user.uid);
              const payload = {...dbUser, "profile_picture" : downloadURL};
              await setDoc(userDocRef, payload);
              updatedProfile();
              signedUp();
            });
          }
        );
        return authenticatedUser;
      }catch(e){
          signedUp();
          return e.code;
      }
    }

    async function signUpWithGoogle(){
      signingUp();
      const provider = new GoogleAuthProvider();
      const userCollectionRef = collection(db, 'users');
      const data = await getDocs(userCollectionRef);
      var allUsers = data.docs.map((doc)=>({...doc.data()}));
      allUsers.sort(compare);
      const last_user = allUsers[allUsers.length - 1];
      const currentUserId = last_user?.id ? (last_user.id + 1) : 1;
      const authenticatedUser = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(authenticatedUser);
      const accessToken = credential.accessToken;
      const photoUrl = `${authenticatedUser.user.photoURL}`.replace('96', '275');

      const dbUser = {
        "id": currentUserId,
        "email" : authenticatedUser.user.email,
        "name" : authenticatedUser.user.displayName,
        "uid" : authenticatedUser.user.uid,
        "created_at" : Timestamp.fromDate (new Date()),
        "updated_at" : Timestamp.fromDate (new Date()),
        "profile_picture" : photoUrl,
        "user_type" : 2,
        "is_approved" : false
      }
      
      console.log(authenticatedUser);
      console.log(photoUrl);
      const userDocRef = doc(db, 'users', authenticatedUser.user.uid);
      await setDoc(userDocRef, dbUser);
      updatedProfile();
      signedUp();
      return authenticatedUser;
    }

    async function login(email, password) {
        const loggedInUser =  await auth.signInWithEmailAndPassword(email, password);
        return loggedInUser;
    }
    
    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        });
        return unsubscribe;
    },[])

    const value = {
        currentUser,
        signInWithFacebook,
        signUpWithGoogle,
        login,
        logout,
        signup,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return(
        <AuthContext.Provider value={value}>
            {loading ? <FullPageLoading/> : children}
        </AuthContext.Provider>
    );
}