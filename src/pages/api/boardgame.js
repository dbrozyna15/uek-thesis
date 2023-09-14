import {getBoardGamesCollection} from "@/services/supabase";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const searchQuery = req.query.searchQuery
        const query = await getBoardGamesCollection(searchQuery);
        res.status(200).json(query);
    } else  {
        res.status(400).json({ message: 'Bad request' })
    }
}