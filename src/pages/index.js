import Image from 'next/image'
import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db, logout } from "@/services/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {useRouter} from "next/navigation"



import {Jaldi} from 'next/font/google'

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function Home() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.email);
        } catch (err) {
            console.log(user);
            console.error(err);
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) router.push('/log-in');
        fetchUserName();
    }, [user, loading]);
    return (
        <main
            className={`mx-auto max-w-sm h-screen flex ${jaldi.className} box-border bg-white`}>
            <div className="mx-4 my-16 flex w-full flex-col flex-nowrap content-between text-black">
               <div className="my-4 flex h-1/4 w-full bg-red-500"></div>
               <div className="my-4 flex h-1/4 w-full bg-red-500"></div>
               <div className="my-4 flex h-1/4 w-full bg-red-500"></div>
               <div className="my-4 flex h-1/4 w-full bg-red-500"></div>
            </div>
        </main>
    )
}
