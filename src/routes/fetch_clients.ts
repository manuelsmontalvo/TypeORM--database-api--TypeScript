import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';
import { createQueryBuilder } from 'typeorm';

const router = express.Router();

router.get('/api/clients', async (req: Request, res: Response) => {
    const clients = await createQueryBuilder('client')
        .select('client.first_name')
        .addSelect('client.balance')
        .from(Client, 'client')
        .leftJoinAndSelect('client.transactions', 'transactions')
        .where('client.id = :clientId', { clientId: 1 })
        .getMany();

    return res.status(200).json(clients);
});

export { router as fetchClientRouter };
