import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import storeRoutes from './routes/store.js';
const app = express();
app.use(cors());
app.use(express.json());
// API routes
app.use('/api/store', storeRoutes);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
