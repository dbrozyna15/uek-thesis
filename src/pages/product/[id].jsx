import {useRouter} from 'next/router';
import {getBoardGameById} from "@/services/firebase";
import Image from "next/image";
import {Jaldi} from 'next/font/google'
import BackButton from "@/components/back-button";
import TagsArray from "@/components/tags-array";

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

function ProductPage({game}) {
    const router = useRouter();
    if (!game) {
        return <div>Loading...</div>;
    }
    const available = (parseInt(game.quantity) > parseInt(game.rented))

    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border h-screen flex-nowrap justify-center overflow-hidden`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <BackButton src="/catalogue"/>
                <div className="flex w-full justify-center rounded-sm bg-neutral-100 pt-2 pb-6 shadow-lg">
                    <Image src={`/games/${game.name}.jpg`} width={320} height={100} alt="xdd"/>
                </div>
                <div className="mt-2 flex w-full flex-wrap text-2xl">{game.name} Very Long Title of very long game</div>
                <div>Very Known Publisher</div>
                <div className="mt-8 mb-12 text-2xl">
                    <div className="mb-2 border-b-2">Average time: <span className="float-right">{game.details.average_time} mins</span></div>
                    <div className="mb-2 border-b-2">Players: <span
                        className="float-right">{game.details.min_players}-{game.details.max_players}</span></div>
                    <div className="mb-2 border-b-2">Tags: <span className="float-right"> <TagsArray tags={game.tags}/> </span></div>
                    <div className="mb-2 border-b-2">Available: <span className="float-right"> {available ? 'YES' : 'NO'} </span></div>
                </div>
                { available ?
                    <div className="flex justify-center">
                        <button className="h-12 w-11/12 rounded-2xl bg-black text-2xl text-white">RESERVE</button>
                    </div>
                    :
                    <div className="flex justify-center">
                        <button className="h-12 w-11/12 rounded-2xl bg-neutral-400 text-2xl text-white">NOT AVAILABLE</button>
                    </div>
                }
            </div>
        </main>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    const game = await getBoardGameById(id);
    return {
        props: {
            game
        }
    };
}

export default ProductPage;