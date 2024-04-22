import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import roomTypesRoutes from './routes/room_types';
import roomsRoutes from './routes/rooms';

dotenv.config();

connectDB();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Routes
app.use("/api/v1/rooms-types", roomTypesRoutes);
app.use("/api/v1/rooms", roomsRoutes);

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
