import {useRouter} from 'next/router';
import Image from "next/image";
import {Jaldi} from 'next/font/google'
import BackButton from "@/components/back-button";
import {useEffect, useRef, useState} from "react";

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

function ReservationPage() {
    const router = useRouter();
    const {id, fresh} = router.query;
    const [reservation, setReservation] = useState();
    const [alerted, setAlerted] = useState(false);
    const audioRef = useRef(null);
    useEffect(() => {
        if (id && ! reservation) {
            getReservationById(id).then((reservation) => {
                setReservation(reservation)
                reservation.reservation_date = getTimeString(reservation.reservation_date)
            })
        }
        
        if (fresh && ! alerted && audioRef) {
            console.log('entered loop')
            setAlerted(true)
            setTimeout(() =>{
                if ('vibrate' in navigator) {
                    navigator.vibrate([100, 30, 300])
                }
                audioRef.current.play();
                console.log('played')
            }, 1000);
        }
    }, [alerted, fresh, id, reservation]);
    if (!reservation || !location) {
        return <div>Loading...</div>;
    }
    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border flex-nowrap justify-center`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <BackButton src="/reservations"/>
                <audio ref={audioRef}>
                    <source src="https://firebasestorage.googleapis.com/v0/b/proj-sys-mob.appspot.com/o/sounds%2Falert-sound.mp3?alt=media&token=9521ab64-cdf6-43e7-b62f-f70ff5f72d9f" type="audio/mpeg" />
                </audio>
                <div className="mb-4">
                    <div className="text-lg text-neutral-600">Reservation number</div>
                    <div className="text-2xl">{id}</div>
                </div>
                <div className="flex w-full justify-center rounded-sm bg-neutral-100 pt-2 pb-6 shadow-lg">
                    <Image src={`/games/${reservation.name.toLowerCase()}.jpg`} width={200} height={100} alt="xdd"/>
                </div>
                <div className="mt-2 flex w-full flex-wrap text-3xl">
                    {reservation.name}
                </div>
                <div className="mt-8 mb-8 text-xl">
                    <div className="mb-2 border-b-2">Status: <span
                        className="float-right">{reservation.status}</span></div>
                    <div className="mb-2 border-b-2">Date of reservation: <span
                        className="float-right">{reservation.reservation_date}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}

function getTimeString(date) {
    date = date?.seconds ? date?.seconds * 1000 : date
    const dateObject = new Date(date); // assuming seconds is Unix timestamp
    return dateObject.toLocaleDateString('pl-PL', {day: '2-digit', month: '2-digit', year: 'numeric'});
}

export default ReservationPage;