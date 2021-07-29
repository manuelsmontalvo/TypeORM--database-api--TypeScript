import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';

const router = express.Router();

router.delete('/api/client/:clientId', async (req: Request, res: Response) => {
    const { clientId } = req.params;

    const response = await Client.delete(parseInt(clientId));

    return res.status(200).json(response);
});

export { router as deleteClientRouter };
