import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(dbName);

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            client.close();
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Insert new user
        await db.collection('users').insertOne(req.body);
        
        client.close();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
}