import {addUser} from "@/services/supabase";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log(data);
        await addUser(data.id, data.name, data.email);
        res.status(200).json();
    } else  {
        res.status(400).json({ message: 'Bad request' })
    }
}