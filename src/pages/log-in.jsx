import Image from 'next/image'
import Link from 'next/link'
import {Jaldi} from 'next/font/google'
import {auth, logInWithEmailAndPassword, logout, signInWithGoogle} from '@/services/firebase'
import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from "next/navigation"



const jaldi = Jaldi({weight: '400', subsets: ['latin']});
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const [showError, setShowError] = useState('hidden');
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        };
        if (user) {
            console.log(user)
            setShowError('hidden')
            router.push('/')
        }
    }, [user, loading]);
    const handleLogin = async () => {
        try {
            await logInWithEmailAndPassword(email, password).then(() => { router.push('/') })
        } catch (err) {
            setShowError('visible')
        }
    } 
    return (
        <main
            className={`mx-auto max-w-sm h-screen content-center flex flex-nowrap ${jaldi.className} box-border overflow-hidden`}>
            <div className="flex min-h-full w-full flex-wrap content-between bg-white">
                <div className="mt-8 mb-3 flex w-full flex-col flex-wrap content-center text-black">
                    <div className="mx-auto h-full logo">
                        <Image src="/logo-2.png" alt="Dice Master Logo" width={180} height={150}/>
                    </div>
                </div>
                <div className="w-full px-8 message-bar" style={{height: "6%", visibility: showError}}>
                    <div className="border-red-500 min-h-full px-3 border rounded
                    text-red-500 hover:text-white hover:bg-red-500 w-full flex
                    flex-wrap justify-center content-center">
                        WARNING: Wrong e-mail or password.
                    </div>
                </div>

                <form className="h-4/6 w-full rounded bg-white px-8 pt-2 pb-8">
                    <div className="mb-4">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="username">
                            E-mail
                        </label>
                        <input
                            className="w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="userEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="placeholder@email.com"/>
                    </div>
                    <div className="mb-2">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mb-3 w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="userPassword" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border
                            text-xl font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-7/12 mr-2"
                            type="button"
                            onClick={signInWithGoogle}
                        >
                            Google Sign In
                        </button>
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-5/12 ml-2"
                            type="button"
                            onClick={handleLogin}>
                            Sign In
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-around">
                        <Link href="/register" className="w-full">
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-full"
                            type="button">
                            Are you new? Sign up
                        </button>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}