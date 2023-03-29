import { writable } from "svelte/store";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA-7w_S9JwdjL8LprACpcNnZ-XS6mtBByM",
    authDomain: "sociobdeb.firebaseapp.com",
    projectId: "sociobdeb",
    storageBucket: "sociobdeb.appspot.com",
    messagingSenderId: "106628429941",
    appId: "1:106628429941:web:81d6b6c406b950a45b203c",
    measurementId: "G-D9V3JWZ0TK"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const authStore = writable<{
    isLoggedIn: boolean;
    user?: firebase.UserInfo;
    firebaseControlled: boolean;
}>
({
    isLoggedIn: false,
    firebaseControlled: false,
});
  

firebase.auth().onAuthStateChanged((user) => {
    authStore.set({
        isLoggedIn: user !== null,
        user,
        firebaseControlled: true,
    });
});
export async function login(email, password){
    return auth.signInWithEmailAndPassword(email, password).catch(error => error.message);
}
export async function logout(){
    return auth.signOut();
}