import Image from 'next/image'
import Link from 'next/link'
import {useEffect} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "@/services/firebase";
import {useRouter} from "next/navigation"


import {Jaldi} from 'next/font/google'

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function Home() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) router.push('/log-in');
    }, [user, loading, router]);
    return (
        <main
            className={`mx-auto max-w-sm h-screen flex ${jaldi.className} box-border bg-white`}>
            <div className="mx-4 my-16 flex w-full flex-col flex-nowrap content-between text-black">
                <Link href="/catalogue" className="my-4 flex h-1/4 w-full rounded border-2 border-black">
                    <div className="flex w-2/5 flex-wrap content-center justify-center">
                        <Image src="/icons/catalogue.png" width={100} height={100} alt="katalog"></Image>
                    </div>
                    <div className="flex w-3/5 flex-wrap content-center justify-center text-center text-3xl">Catalogue
                    </div>
                </Link>
                <Link href="/reservations" className="my-4 flex h-1/4 w-full rounded border-2 border-black">
                    <div className="flex w-2/5 flex-wrap content-center justify-center">
                        <Image src="/icons/catalogue.png" width={100} height={100} alt="rezerwacje"></Image>
                    </div>
                    <div
                        className="flex w-3/5 flex-wrap content-center justify-center text-center text-3xl">Reservations
                    </div>
                </Link>
                <Link href="/locations" className="my-4 flex h-1/4 w-full rounded border-2 border-black">
                    <div className="flex w-2/5 flex-wrap content-center justify-center">
                        <Image src="/icons/locations.png" width={100} height={100} alt="pickup"></Image>
                    </div>
                    <div className="flex w-3/5 flex-wrap content-center justify-center text-center text-3xl">Pick-up
                        points
                    </div>
                </Link>
                <Link href="/profile" className="my-4 flex h-1/4 w-full rounded border-2 border-black">
                    <div className="flex w-2/5 flex-wrap content-center justify-center">
                        <Image src="/icons/profile.png" width={100} height={100} alt="profile"></Image>
                    </div>
                    <div className="flex w-3/5 flex-wrap content-center justify-center text-center text-3xl">Profile
                    </div>
                </Link>
            </div>
        </main>
    )
}
