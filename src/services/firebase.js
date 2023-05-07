import {getApp, getApps, initializeApp} from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {addDoc, collection, getDocs, getFirestore, query, where, doc, getDoc, updateDoc} from "firebase/firestore";


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
        name: firstName + " " + lastName,
        authProvider: "local",
        email: email,
        phone: phone
    });

};

const getBoardGamesCollection = async (searchQuery) => {
    const q = query(collection(db, "items", 'board_games', 'owned_board_games'), where("name", ">=", searchQuery), where("name", "<=", searchQuery + "\uf8ff"));
    return await getDocs(q).then((querySnapshot) => {
        return querySnapshot.docs
            .map((doc) => ({...doc.data(), id: doc.id}));
    })
};
const getReservationsCollection = async (uid) => {
    const q = query(collection(db, "reservations"), where("user", "==", uid));
    return await getDocs(q).then((querySnapshot) => {
        console.log(querySnapshot.docs
            .map((doc) => ({...doc.data(), id: doc.id})))
        return querySnapshot.docs
            .map((doc) => ({...doc.data(), id: doc.id}));
    })

};
const getBoardGameById = async (searchQuery) => {

    const q = doc(db, "items", 'board_games', 'owned_board_games', searchQuery);
    return await getDoc(q).then((doc) => {
        return doc.data()
    })

};
const getReservationById = async (searchQuery) => {

    const q = doc(db, "reservations", searchQuery);
    return await getDoc(q).then((doc) => {
        return doc.data()
    })

};
const getLocationById = async (searchQuery) => {
    const q = doc(db, "locations", searchQuery);
    return await getDoc(q).then((doc) => {
        return doc.data()
    })

};

const addReservation = async (user, game, game_id) => {
    console.log(user.uid, game, game_id)
    return await addDoc(collection(db, "reservations"), {
        user: user.uid,
        game: game_id,
        location: game.location,
        name: game.name,
        reservation_date: Date.now(),
        status: 'Reserved'
    });
};

const updateGameStatus = async (id, game) => {
    const q = doc(db, "items", 'board_games', 'owned_board_games', id);
    await updateDoc(q, {
        rented: game.rented + 1,
    })

}


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
    getBoardGameById,
    getReservationsCollection,
    getReservationById,
    getLocationById,
    addReservation,
    updateGameStatus,
    db
};