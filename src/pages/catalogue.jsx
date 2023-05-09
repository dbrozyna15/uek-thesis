import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "@/services/firebase";
import {useRouter} from "next/navigation"
import {getBoardGamesCollection} from "@/services/firebase";
import NavigationBar from "@/components/navigation-bar";

import {Jaldi} from 'next/font/google'

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function Catalogue() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [user] = useAuthState(auth);
    const [games, setGames] = useState([]);
    const fetchGames = async (searchQuery) => {
        await getBoardGamesCollection(searchQuery).then(result => {
            setGames(result)
            console.log(games)
        });
    }
    useEffect(() => {
        document.querySelector('html').style.overflowY = 'scroll'
        fetchGames(searchQuery);
        if (!user) router.push('/log-in');
    }, [user, searchQuery]);
    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border min-h-screen overflow-auto flex-nowrap justify-center`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <div className="mb-8">
                    <input
                        className="w-full appearance-none rounded-2xl border border-black px-3 text-xl leading-tight text-black shadow py-1.5 focus:shadow-outline focus:outline-none"
                        id="searchQuery" type="text" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."/>
                </div>
                <div className="mb-16 flex flex-wrap">
                    {games.map((game) => (
                        <Link key={game.id} href={`/product/${game.id}`}>
                            <div className="my-3 flex h-80 w-full flex-col bg-neutral-100 px-2 shadow">
                                <div className="flex h-3/4 rounded border mx-2.5 my-2.5">
                                    <Image src={`games/${game.name.toLowerCase()}.jpg`} alt={game.name} width={300} height={100}/>
                                </div>
                                <div className="h-1/4 text-xl">
                                    {game.name} <br/>
                                    <span className="text-base">{game.publisher}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <NavigationBar/>
        </main>
    )
}
