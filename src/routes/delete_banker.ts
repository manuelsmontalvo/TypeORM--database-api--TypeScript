import express, { Request, Response } from 'express';
import { Banker } from '../entities/Banker';

const router = express.Router();

router.delete('/api/banker/:bankerId', async (req: Request, res: Response) => {
    const { bankerId } = req.params;

    const response = await Banker.delete(parseInt(bankerId));

    return res.status(200).json(response);
});

export { router as deleteBankerRouter };
