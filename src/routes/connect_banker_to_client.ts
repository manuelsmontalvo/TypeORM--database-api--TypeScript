import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async (req: Request, res: Response) => {
    const { bankerId, clientId } = req.params;

    const client: Client | undefined = await Client.findOne(parseInt(clientId));
    const banker: Banker | undefined = await Banker.findOne(parseInt(bankerId));

    if (!banker || !client) {
        return res.status(404).send('Banker or Client not found');
    }

    banker.clients = [client];

    await banker.save();

    return res.status(201).send('Banker connected to Client');
});

export { router as connectBankerToClientRouter };
