import {useRouter} from 'next/router';
import {getLocationById, getReservationById} from "@/services/firebase";
import Image from "next/image";
import {Jaldi} from 'next/font/google'
import BackButton from "@/components/back-button";
import {useEffect, useState} from "react";

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

function ReservationPage() {
    const router = useRouter();
    const {id} = router.query;
    const [reservation, setReservation] = useState();
    const [location, setLocation] = useState();
    useEffect(() => {
        if (id) {
            getReservationById(id).then((reservation) => {
                setReservation(reservation)
                reservation.return_deadline = getTimeString(reservation.return_deadline)
                reservation.pickup_date = getTimeString(reservation.pickup_date)
                reservation.reservation_date = getTimeString(reservation.reservation_date)
            })
        }
        if (reservation) {
            getLocationById(reservation.location).then((location) => {
                setLocation(location)
                location.location = JSON.stringify(location?.location)
            })
        }
    }, [id, reservation]);
    if (!reservation || !location) {
        return <div>Loading...</div>;
    }
    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border h-screen flex-nowrap justify-center overflow-hidden max-h-screen`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <BackButton src="/reservations"/>
                <div className="mb-4">
                    <div className="text-lg text-neutral-600">Reservation number</div>
                    <div className="text-2xl">{id}</div>
                </div>
                <div className="flex w-full justify-center rounded-sm bg-neutral-100 pt-2 pb-6 shadow-lg">
                    <Image src={`/games/${reservation.name}.jpg`} width={280} height={100} alt="xdd"/>
                </div>
                <div className="mt-2 flex w-full flex-wrap text-3xl">
                    {reservation.name}
                </div>
                <div className="mt-8 mb-8 text-xl">
                    <div className="mb-2 border-b-2">Status: <span
                        className="float-right">{reservation.status}</span></div>
                    <div className="mb-2 border-b-2">Pick-up point: <span
                        className="float-right">{location.address}</span></div>
                    <div className="mb-2 border-b-2">Date of reservation: <span
                        className="float-right">{reservation.reservation_date}</span>
                    </div>
                    <div className="mb-2 border-b-2">Date of pick-up: <span
                        className="float-right">{reservation.pickup_date !== 'Invalid Date' ? reservation.pickup_date : '----'}</span>
                    </div>
                    <div className="mb-2 border-b-2">Deadline for return: <span
                        className="float-right">{(reservation.pickup_date !== 'Invalid Date') && reservation.pickup_date ? reservation.return_deadline : '----'}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}

// export async function getServerSideProps(context) {
//     const {id} = context.params;
//     const reservation = await getReservationById(id);
//     reservation.return_deadline = getTimeString(reservation.return_deadline)
//     reservation.pickup_date = getTimeString(reservation.pickup_date)
//     reservation.reservation_date = getTimeString(reservation.reservation_date)
//     const location = await getLocationById(reservation.location)
//     location.location = JSON.stringify(location?.location)
//     return {
//         props: {
//             reservation,
//             location
//         }
//     };
// }

function getTimeString(date) {
    date = date?.seconds ? date?.seconds * 1000 : date
    const dateObject = new Date(date); // assuming seconds is Unix timestamp
    return dateObject.toLocaleDateString('pl-PL', {day: '2-digit', month: '2-digit', year: 'numeric'});
}

export default ReservationPage;