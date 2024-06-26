import express from 'express';
import bodyParser from "body-parser";

import config from '../../libs/ball-com/config/config.json'
import router from './routes/index';
import {addListeners} from './connections/eventBindings';

import { amqp, database } from '../../libs/ball-com/export';
import {addDatabaseSchemas} from './connections/database';
import { startCron } from './controllers/timer.controller';

// Create Express server
const app = express(); // New express instance
const port = config.port || 3000; // Port number

// Express configuration
// app.use(cors()); // Enable CORS
// Use routes
app.use(bodyParser.json());
app.use('/', router);

// Start the server with async (Callback) function to connect Rabbit, Listeners and open the server
setTimeout(async () => {
  
  //Adjust config file for this project
  config.rabbitmq.queue = 'ball-com.customers';
  config.mongodb.read = 'mongodb://mongo-customers:27017/customers-read';
  config.mongodb.write = 'mongodb://mongo-customers:27017/customers-write';

  await amqp.connect(() => {
    console.log("Connected to RabbitMQ");
  });
  database.connect(() => {
    console.log("Connected to database");
  });
  
  await addListeners();
  console.log("RabbitMQ Listeners connected");

  addDatabaseSchemas();
  console.log("Database schemas added");

  await startCron();
  console.log("Timer started to update database every day at midnight");

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
})

// Export Express app
export default app;