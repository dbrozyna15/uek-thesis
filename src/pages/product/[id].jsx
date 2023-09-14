import {useRouter} from 'next/router';
import {auth} from "@/services/firebase";
import Image from "next/image";
import {Jaldi} from 'next/font/google'
import BackButton from "@/components/back-button";
import TagsArray from "@/components/tags-array";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {getBoardGameById, addReservation, updateBoardGameRented} from "@/services/supabase";

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

function ProductPage() {
    const router = useRouter();
    const {id} = router.query;
    const [user, loading] = useAuthState(auth);
    const [game, setGame] = useState();
    useEffect(() => {
        if (id) {
            getBoardGameById(id).then((game) => setGame(game));
        }

    }, [id]);

    const makeReservation = async () => {
        if (!available) return;
        const reservation = await addReservation(user.uid, game.id);
        await updateBoardGameRented(game);
        router.push(`/reservations/${reservation.id}`)
    }
    if (!game) {
        return <div>Loading...</div>;
    }
    const available = (parseInt(game.quantity) > parseInt(game.rented))
    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border flex-nowrap justify-center`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <BackButton src="/catalogue"/>
                <div className="flex w-full justify-center rounded-sm bg-neutral-100 pt-2 pb-6 shadow-lg">
                    <Image src={`/games/${game.name.toLowerCase()}.jpg`} width={200} height={100} alt="xdd"/>
                </div>
                <div className="mt-2 flex w-full flex-wrap text-2xl">{game.name}</div>
                <div>{game.publisher}</div>
                <div className="mt-8 mb-12 text-2xl">
                    <div className="mb-2 border-b-2">Average time: <span
                        className="float-right">{game.average_time} mins</span></div>
                    <div className="mb-2 border-b-2">Players: <span
                        className="float-right">{game.min_players}-{game.max_players}</span></div>
                    <div className="mb-2 border-b-2">Tags: <span className="float-right"> <TagsArray tags={game.tags}/> </span>
                    </div>
                    <div className="mb-2 border-b-2">Available: <span
                        className="float-right"> {available ? 'YES' : 'NO'} </span></div>
                </div>
                {available ?
                    <div className="mb-16 flex justify-center">
                        <button className="h-12 w-11/12 rounded-2xl bg-black text-2xl text-white"
                                onClick={makeReservation}>RESERVE
                        </button>
                    </div>
                    :
                    <div className="mb-4 flex justify-center">
                        <button className="h-12 w-11/12 rounded-2xl bg-neutral-400 text-2xl text-white">NOT AVAILABLE
                        </button>
                    </div>
                }
            </div>
        </main>
    );
}

export default ProductPage;