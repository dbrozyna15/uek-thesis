import {addReservation, getReservationsCollection, getUserById} from "@/services/supabase";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const id = req.query.user_id
        const query = await getUserById(id);
        res.status(200).json(query);
    } else {
        res.status(400).json({message: 'Bad request'})
    }
}