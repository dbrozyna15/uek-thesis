import Image from 'next/image'
import {Jaldi} from 'next/font/google'

const jaldi = Jaldi({weight: '400', subsets: ['latin']});
export default function FirstPost() {
    return (
        <main
            className={`mx-auto max-w-sm h-screen content-center flex flex-nowrap ${jaldi.className} box-border overflow-hidden`}>
            <div className="w-full min-h-full flex flex-wrap bg-white content-between">
                <div className="h-2/5 w-full text-black flex-wrap flex content-center flex-col mt-11">
                    <div className="logo h-3/4 mb-5">
                        <Image src="/logo.png" alt="Dice Master Logo" width={256} height={256}/>
                    </div>
                    <div className="app-name text-5xl">
                        DICE MASTER
                    </div>
                </div>
                <div className="message-bar w-full px-8" style={{height:"6%"}}>
                    <div className="border-red-500 min-h-full px-3 border rounded
                    text-red-500 hover:text-white hover:bg-red-500 w-full flex
                    flex-wrap justify-center content-center">
                        WARNING: Wrong e-mail or password.
                    </div>
                </div>
                <form className="bg-white rounded px-8 pt-6 pb-8 w-full h-3/5">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="username">
                            E-mail
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-2xl leading-tight focus:outline-none focus:shadow-outline"
                            id="userEmail" type="text" placeholder="placeholder@email.com"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-2xl mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="userPassword" type="password" placeholder="********"/>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border
                            text-xl font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-7/12 mr-2"
                            type="button">
                            Google Sign In
                        </button>
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-5/12 ml-2"
                            type="submit">
                            Sign In
                        </button>
                    </div>
                    <div className="flex items-center justify-around flex-wrap">
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-full"
                            type="button">
                            Don't have account? Sign up
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}