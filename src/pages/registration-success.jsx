import {Jaldi} from 'next/font/google'
import Link from 'next/link'
import Image from "next/image";

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function RegisterSuccess () {
    return (
        <main className={`mx-auto max-w-sm h-screen content-center flex flex-nowrap ${jaldi.className} box-border overflow-hidden`}>
            <div className="flex min-h-full w-full flex-wrap content-start bg-white">
                <div className="mt-11 flex h-2/5 w-full flex-col flex-wrap content-center text-black">
                    <div className="mb-5 h-3/4 logo">
                        <Image src="/tick.jpg" alt="Dice Master Logo" width={256} height={256}/>
                    </div>
                </div>
                <div className="h-4/5 w-full rounded bg-white px-8 pt-6 pb-8">
                    <div className="mb-16">
                        <div className="mb-2 block text-center text-4xl font-bold text-black">
                            Congratulations,<br/> your account has been successfully created.
                        </div>
                    </div>
                    <Link href="/log-in">
                    <button
                        className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-3xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-full"
                        type="button">
                            Sign In
                    </button>
                    </Link>
                </div>

            </div>
        </main>
    )
}