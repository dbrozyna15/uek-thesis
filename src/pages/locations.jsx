import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "@/services/firebase";
import {useRouter} from "next/navigation"
import {getBoardGamesCollection} from "@/services/firebase";
import NavigationBar from "@/components/navigation-bar";

import {Jaldi} from 'next/font/google'

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function Reservations() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [user, loading] = useAuthState(auth);
    const [locations, setLocations] = useState([]);
    const fetchGames = async (searchQuery) => {
        await getBoardGamesCollection(searchQuery).then(result => {
            setLocations(result)
            console.log(locations)
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
                <div className="my-4 text-center text-3xl">
                    Pick-up locations
                </div>
                <div className="my-4">
                    <input
                        className="w-full appearance-none rounded-2xl border border-black px-3 text-xl leading-tight text-black shadow py-1.5 focus:shadow-outline focus:outline-none"
                        id="searchQuery" type="text" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."/>
                </div>
                <div className="mb-16 flex flex-wrap">
                    {locations.map((location) => (
                        <div key={location.id} className="my-3 flex h-32 w-full flex-col bg-neutral-200 px-2 shadow">
                            <div className="h-1/5 w-full py-3 text-xl">
                                <div className="">
                                    <div className="text-base leading-5 text-neutral-600">Street name</div>
                                    <div>{location.id}</div>
                                </div>
                                <div>
                                    <div className="text-base leading-5 text-neutral-600">Distance</div>
                                    <div>{location.name}</div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <NavigationBar/>
        </main>
    )
}
