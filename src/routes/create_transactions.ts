import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';
import { Transaction, TransactionType } from '../entities/Transaction';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req: Request, res: Response) => {
    const { clientId } = req.params;
    const { type, amount } = req.body;

    const client: Client | undefined = await Client.findOne(parseInt(clientId));

    if (!client) {
        return res.status(404).send('client not found');
    }

    const transaction: Transaction = Transaction.create({
        amount,
        type,
        client,
    });

    await transaction.save();

    if (type === TransactionType.DEPOSIT) {
        client.balance = +client.balance + +amount;
    } else if (type === TransactionType.WITHDRAW) {
        client.balance = +client.balance - +amount;
    }

    await client.save();

    return res.status(201).send(client);
});

export { router as createTransactionRouter };
