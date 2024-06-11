// Import express, cors, helmet and morgan
import express from 'express';
import cors from 'cors';
import router from './routes';

// Create Express server
const app = express(); // New express instance
const port = 3000; // Port number

// Express configuration
app.use(cors()); // Enable CORS

// Use routes
app.use('/', router);

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
export default app;