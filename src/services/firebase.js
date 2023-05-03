import {initializeApp, getApp, getApps} from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD4Ioqv19NBJYMK5pKf6bYDhnESt4RhkmQ",
    authDomain: "proj-sys-mob.firebaseapp.com",
    projectId: "proj-sys-mob",
    storageBucket: "proj-sys-mob.appspot.com",
    messagingSenderId: "586735279429",
    appId: "1:586735279429:web:b872cdc0b71e81d9c5b22c",
    measurementId: "G-3TF1RG45T2"
};

let app;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, provider);
        console.log(res.user)
    } catch (err) {
        console.log(err)
    }
}
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};