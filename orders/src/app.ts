// Import express, cors, helmet and morgan
import express from 'express';
import config from '../../libs/ball-com/config/config.json'
// import cors from 'cors';
import router from './routes/index';
import {addListeners} from './rabbitmq/EventBinding';

import { amqp, database } from '../../libs/ball-com/export';
import OrdersSchema from './models/schemas/OrderSchema';

// Create Express server
const app = express(); // New express instance
const port = config.port || 3000; // Port number

// Express configuration
// app.use(cors()); // Enable CORS
// Use routes
app.use('/', router);
app.use(express.json());

// Start the server with async (Callback) function to connect Rabbit, Listeners and open the server
setTimeout(async () => {

  //Adjust config file for this project
  config.rabbitmq.queue = 'ball-com.orders';
  config.mongodb.read = 'mongodb://mongo-customers:27017/orders.read';
  config.mongodb.write = 'mongodb://mongo-customers:27017/orders.write';

  await amqp.connect(() => {
    console.log("Connected to RabbitMQ");
  });
  
  await addListeners();
  console.log("Listeners connected");

  database.connect('Orders', OrdersSchema, () => {
    console.log("Connected to database");
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
})

// Export Express app
export default app;