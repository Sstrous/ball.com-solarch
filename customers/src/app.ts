// Import express, cors, helmet and morgan
import express from 'express';
import config from './config/config.json'
// import cors from 'cors';
import router from './routes/index';
import {connect as amqpConnect} from './rabbitmq/amqp';
import {addListeners} from './rabbitmq/EventBinding';
import {connect as dbConnect} from './database/database';

// Create Express server
const app = express(); // New express instance
const port = config.port || 3000; // Port number

// Express configuration
// app.use(cors()); // Enable CORS
// Use routes
app.use('/', router);

// Start the server with async (Callback) function to connect Rabbit, Listeners and open the server
setTimeout(async () => {
  await amqpConnect(() => {
    console.log("Connected to RabbitMQ");
  });
  
  await addListeners();
  console.log("Listeners connected");

  await dbConnect(() => {
    console.log("Connected to Database");
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
})

// Export Express app
export default app;