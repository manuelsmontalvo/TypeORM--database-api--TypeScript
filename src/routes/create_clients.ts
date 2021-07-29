import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';
const router = express.Router();

router.post('/api/client', async (req: Request, res: Response) => {
    const { first_name, last_name, email, card_number, balance } = req.body;
    try {
        const client: Client = Client.create({
            first_name,
            last_name,
            email,
            card_number,
            balance,
        });
        await client.save();
        res.status(201).send(client);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export { router as createClientRouter };
