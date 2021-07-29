import express, { Request, Response } from 'express';
import { Banker } from '../entities/Banker';
const router = express.Router();

router.post('/api/banker', async (req: Request, res: Response) => {
    const { first_name, last_name, email, card_number, employee_number } = req.body;
    try {
        const banker: Banker = Banker.create({
            first_name,
            last_name,
            email,
            card_number,
            employee_number,
        });
        await banker.save();
        res.status(201).send(banker);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export { router as createBankerRouter };
