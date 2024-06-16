// Import express, cors, helmet and morgan
import express from 'express';
import config from '../../libs/ball-com/config/config.json'
// import cors from 'cors';
import router from './routes/index';
import {addListeners} from './rabbitmq/EventBinding';

import CustomerSchema from './models/schemas/CustomerSchema';
import { amqp, database } from '../../libs/ball-com/export';

// Create Express server
const app = express(); // New express instance
const port = config.port || 3000; // Port number

// Express configuration
// app.use(cors()); // Enable CORS
// Use routes
app.use('/', router);

// Start the server with async (Callback) function to connect Rabbit, Listeners and open the server
setTimeout(async () => {
  
  //Adjust config file for this project
  config.rabbitmq.queue = 'ball-com.customers';
  config.mongodb.read = 'mongodb://mongo-customers:27017/customers.read';
  config.mongodb.write = 'mongodb://mongo-customers:27017/customers.write';

  await amqp.connect(() => {
    console.log("Connected to RabbitMQ");
  });

  await addListeners();
  console.log("Listeners connected");

  // database.connect(CustomerSchema, EventSchema, () => {
  //   console.log("Connected to database");
  // });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
})

// Export Express app
export default app;