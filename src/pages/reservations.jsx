import Link from 'next/link'
import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "@/services/firebase";
import {useRouter} from "next/navigation"
import NavigationBar from "@/components/navigation-bar";
import {getReservationsCollection} from "@/services/supabase"

import {Jaldi} from 'next/font/google'

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function Reservations() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [user] = useAuthState(auth);
    const [reservations, setReservations] = useState([]);
    const fetchReservations = async () => {
        await getReservationsCollection(user.uid).then(result => {
            setReservations(result)
        });
    }
    const getTimeString = (date) => {
        date = date?.seconds ? date?.seconds * 1000 : date
        const dateObject = new Date(date); // assuming seconds is Unix timestamp
        return dateObject.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };
    useEffect(() => {
        document.querySelector('html').style.overflowY = 'scroll'
        fetchReservations();
        if (!user) router.push('/log-in');
    }, [user, searchQuery]);
    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border min-h-screen overflow-auto flex-nowrap justify-center`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <div className="my-4 text-center text-3xl">
                    Reservations
                </div>
                <div className="mb-16 flex flex-wrap">
                    {reservations.map((reservation) => (
                        <Link key={reservation.id} href={`/reservations/${reservation.id}`} className="my-3 flex h-52 w-full flex-col bg-neutral-200 px-2 shadow">
                                <div className="h-1/5 w-full py-3 text-xl">
                                    <div className="">
                                        <div className="text-base leading-5 text-neutral-600">Reservation number</div>
                                        <div>{reservation.id}</div>
                                    </div>
                                    <div>
                                        <div className="text-base leading-5 text-neutral-600">Name</div>
                                        <div>{reservation.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-base leading-5 text-neutral-600">Status</div>
                                        <div>{reservation.status ? reservation.status : 'Can\'t assert status'}</div>
                                    </div>
                                    <div>
                                        <div className="text-base leading-5 text-neutral-600">Date of reservation</div>
                                        <div>{getTimeString(reservation.reservation_date) ?? 'Date not found'}</div>
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

