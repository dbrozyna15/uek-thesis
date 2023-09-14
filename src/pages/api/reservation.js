import {addReservation, getReservationsCollection} from "@/services/supabase";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const id = req.query.user_id
        const query = await getReservationsCollection(id);
        res.status(200).json(query);
    } else if (req.method === 'POST') {
        const data = req.body;
        await addReservation(data.user_id, data.game_id);
        res.status(200).json();
    } else  {
        res.status(400).json({ message: 'Bad request' })
    }
}