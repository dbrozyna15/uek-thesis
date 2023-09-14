import {createClient} from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://trcaucjqftjujjpmtbmq.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_KEY)
const getBoardGamesCollection = async (searchQuery = '') => {

    const {data: items} = await supabase
        .from('board_games')
        .select('*')
        .ilike('name', `${searchQuery}%`);

    return items.map((item) => ({...item, id: item.id}))
}

const getBoardGameById = async (gameId) => {

    const {data: item} = await supabase
        .from('board_games')
        .select()
        .eq('id', gameId);

    return item.shift()
}

const updateBoardGameRented = async (game) => {

    await supabase
        .from('board_games')
        .update({rented: game.rented + 1})
        .eq('id', game.id);
}

const getReservationsCollection = async (id) => {

    const {data: items} = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', id)

    return items.map((item) => ({...item, id: item.id}))
}

const getReservationById = async (reservationId) => {

    const {data: item} = await supabase
        .from('reservations')
        .select()
        .eq('id', reservationId);

    return item.shift()
}

const addReservation = async (user_id, game_id) => {

    const {data: reservation} = await supabase
        .from('reservations')
        .insert([{
            user_id: user_id,
            game_id: game_id,
            reservation_date: new Date(Date.now()).toISOString(),
            status: 'Reserved',
        }]).select();

    return reservation.shift();
}

const getUserById = async (userId) => {

    const {data: user} = await supabase
        .from('users')
        .select()
        .eq('id', userId);

    return user.shift()
}

const addUser = async (user_id, name, email) => {

    await supabase
        .from('users')
        .insert([{
            id: user_id,
            name: name,
            email: email
        }]);
}

export {
    getBoardGamesCollection,
    getBoardGameById,
    updateBoardGameRented,
    getReservationsCollection,
    getReservationById,
    addReservation,
    getUserById,
    addUser
}