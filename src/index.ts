import { createConnection } from 'typeorm';
import express from 'express';
import { createClientRouter } from './routes/create_clients';
import { createBankerRouter } from './routes/create_banker';
import { createTransactionRouter } from './routes/create_transactions';
import { connectBankerToClientRouter } from './routes/connect_banker_to_client';
import { deleteClientRouter } from './routes/delete_client';
import { deleteBankerRouter } from './routes/delete_banker';
import { fetchClientRouter } from './routes/fetch_clients';

const app = express();
const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await createConnection(); // For production use url for the deployed server for host
        console.log('Connected to Postgress');
        app.use(express.json());
        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);
        app.use(connectBankerToClientRouter);
        app.use(deleteClientRouter);
        app.use(deleteBankerRouter);
        app.use(deleteBankerRouter);
        app.use(fetchClientRouter);
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        throw new Error('Unable to connect to db');
    }
};

main();
