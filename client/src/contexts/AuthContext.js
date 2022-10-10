import React, { useContext, useState, useEffect } from "react";
import {auth, db, storage} from '../firebase';
import {doc, collection, setDoc, getDocs, Timestamp} from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {signInWithPopup, FacebookAuthProvider} from 'firebase/auth';

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
                // var uploadTask = await uploadBytes(imageRef, file, metadata);
                // const downloadUrl = await getDownloadURL(imageRef);
                // const userDocRef = doc(db, 'users', authenticatedUser.user.uid);
                // const payload = {...dbUser, "profile_picture" : downloadUrl};
                // await setDoc(userDocRef, payload);
                // signedUp();
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
        // const userProfilePic = await authenticatedUser.getPhotoUrl() + `?access_token=${accessToken}`;
        console.log(authenticatedUser);
        console.log(authenticatedUser.getUserProfilePicture());

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

    // async function getCurrentUser (){

    //     const userCollectionRef = collection(db, 'users');
    //     const data = await getDocs(userCollectionRef);
    //     var allUsers = data.docs.map((doc)=>({...doc.data()}));

    //     console.log(allUsers);

    //     // const userDocRef = doc(db, 'users', currentUser.uid);
    //     // const data = await getDoc(userDocRef);
    //     // console.log(data.data());
    // }


    // useEffect(()=>{
    //     if(currentUser){
    //         const user = new User();
    //         user.id = 0;
    //         user.email = currentUser.email;
    //         user.name = "abcdef";
    //         user.phone = "123456";
    //         user.country_code = "+91";
    //         user.profile_picture ="abcdef"
    //         user.uid = currentUser.uid;
    //         user.created_at = Timestamp.fromDate (new Date());
    //         user.updated_at = Timestamp.fromDate (new Date());
    //         user.user_type = 2;
    //         user.is_approved = false;
    //         createUser(user);
    //         console.log(user);
    //         getCurrentUser();
    //     }
    // },[currentUser])

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