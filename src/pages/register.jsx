import {Jaldi} from 'next/font/google'
import {registerWithEmailAndPassword} from "@/services/firebase";
import {useState} from "react";
import {useRouter} from "next/navigation"

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState('hidden');
    const register = async () => {
        try {
            await registerWithEmailAndPassword(email, firstName, lastName, password).then(() => {router.push('/registration-success')})
        } catch (err) {
            setShowError('visible');
        }
    }
    return (
        <main
            className={`mx-auto max-w-sm h-screen content-center flex flex-nowrap ${jaldi.className} box-border overflow-hidden`}>
            <div className="flex min-h-full w-full flex-wrap content-start bg-white">
                <div className="mt-8 w-full px-8 message-bar" style={{height: "6%"}}>
                    <div
                        className="flex min-h-full w-full flex-wrap content-center justify-center px-3 text-5xl text-black">
                        Registration
                    </div>
                </div>
                <div className="mt-8 w-full px-8 message-bar" style={{height: "6%", visibility: showError}}>
                    <div className="border-red-500 min-h-full px-3 border rounded
                    text-red-500 hover:text-white hover:bg-red-500 w-full flex
                    flex-wrap justify-center content-center">
                        WARNING: Wrong e-mail or password.
                    </div>
                </div>
                <form className="h-4/5 w-full rounded bg-white px-8 pt-6 pb-8">
                    <div className="mb-4">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="username">
                            E-mail
                        </label>
                        <input
                            className="w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="userEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="placeholder@email.com"/>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="firstName">
                            First name
                        </label>
                        <input
                            className="w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"/>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="lastName">
                            Last name
                        </label>
                        <input
                            className="w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"/>
                    </div>
                    <div className="mb-6">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mb-3 w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="userPassword" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                    </div>
                    <div className="flex flex-wrap items-center justify-around">
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-full"
                            type="button" onClick={register}>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}