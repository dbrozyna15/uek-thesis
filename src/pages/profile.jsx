import Image from "next/image";
import {useEffect, useRef, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, getUserById} from "@/services/firebase";
import {useRouter} from "next/navigation"
import NavigationBar from "@/components/navigation-bar";

import {Jaldi} from 'next/font/google'
import LogoutButton from "@/components/logout-button";

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function Reservations() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        if (!user) {
            router.push('/log-in');
        } else {
            if (!userDetails) {
                getUserById(user.uid).then(res => setUserDetails(res))
                console.log(userDetails);
                console.log(user)
                }
        }
    }, [user, loading, userDetails, router]);
    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border min-h-screen overflow-auto flex-nowrap justify-center`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <div className="mb-4 text-center text-5xl">
                    Profile
                </div>
                <div className="flex max-h-40 justify-center">
                    <Image src={userDetails?.avatarUrl ?? '/icons/profile.png'} alt="avatar-placeholder" width={150} height={100} className="rounded-full"/>
                </div>
                <div className="mb-4 border-b border-black">
                    <div>Name</div>
                    <div className="text-2xl">{userDetails?.name ?? 'unreachable value'}</div>
                </div>
                <div className="mb-16 border-b border-black">
                    <div>E-mail</div>
                    <div className="text-2xl">{user?.email ?? 'unreachable value'}</div>
                </div>
                <LogoutButton/>
            </div>
            <NavigationBar/>
        </main>
    )
}
