import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import { amqp, database } from '../../libs/ball-com/export';

import config from '../../libs/ball-com/config/config.json';
import { addListeners } from './connections/eventBindings';
import { addDatabaseSchemas } from './connections/database';

const app = express();
const port = config.port || 3000;

app.use(bodyParser.json());
app.use('/', router);

setTimeout(async () => {

    // adjust config for this project
    config.rabbitmq.queue = 'ball-com.finance';
    config.mongodb.read = 'mongodb://mongo-finance:27017/finance-read';
    config.mongodb.write = 'mongodb://mongo-finance:27017/finance-write';

    await amqp.connect(() => {
        console.log('Connected to RabbitMQ');
    });

    database.connect(() => {
        console.log('Connected to database');
    });

    await addListeners();
    console.log('RabbitMQ listeners connected');

    addDatabaseSchemas();
    console.log('Database schemas added');

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
});

export default app;
