import {useRouter} from 'next/router';
import {getBoardGameById} from "@/services/firebase";
import Image from "next/image";
import {Jaldi} from 'next/font/google'
import BackButton from "@/components/back-button";

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

function ReservationPage({reservation}) {
    const router = useRouter();
    const {id} = router.query;
    if (!reservation) {
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
                <div className="mt-2 flex w-full flex-wrap text-2xl">{reservation.name} Very Long Title of very long
                    game
                </div>
                <div>Very Known Publisher</div>
                <div className="mt-8 mb-8 text-2xl">
                    <div className="mb-2 border-b-2">Status: <span
                        className="float-right">{reservation.status}Ready to pick up</span></div>
                    <div className="mb-2 border-b-2">Location: <span
                        className="float-right">{reservation.location}ul. Jana Dietla 64</span></div>
                    <div className="mb-2 border-b-2">Date of reservation: <span
                        className="float-right">{reservation.status}24.03.2022</span>
                    </div>
                    <div className="mb-2 border-b-2">Date of pick-up: <span
                        className="float-right">{reservation.status ?? '----'}</span>
                    </div>
                    <div className="mb-2 border-b-2">Deadline for return: <span
                        className="float-right">{reservation.status}24.03.2022</span>
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    const reservation = await getBoardGameById(id);
    return {
        props: {
            reservation
        }
    };
}

export default ReservationPage;