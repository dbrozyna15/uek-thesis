import {getApp, getApps, initializeApp} from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {addDoc, collection, getDocs, getFirestore, query, where,} from "firebase/firestore";


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
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}
const logInWithEmailAndPassword = async (email, password) => {
     return await signInWithEmailAndPassword(auth, email, password);

};
const registerWithEmailAndPassword = async (email, firstName, lastName, password, phone) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        return await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: firstName+ " " +lastName,
            authProvider: "local",
            email: email,
            phone: phone
        });

};

const getBoardGamesCollection = async (searchQuery) => {
    const q = query(collection(db, "items", 'board_games', 'owned_board_games'), where("name", ">=", searchQuery), where("name", "<=", searchQuery + "\uf8ff"));
    return await getDocs(q).then((querySnapshot)=>{
        return querySnapshot.docs
            .map((doc) => ({...doc.data(), id: doc.id}));
    })
    
};


const logout = () => {
    signOut(auth);
};
export {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    getBoardGamesCollection,
    db
};