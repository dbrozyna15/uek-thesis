import {getReservationById} from "@/services/supabase";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query
        const query = await getReservationById(id);
        res.status(200).json(query);
    } else {
        res.status(400).json({ message: 'Bad request' })
    }
}