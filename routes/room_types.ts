import express, { Request, Response, Router } from 'express';
import Joi from 'joi';
import RoomType from '../models/room_type';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import validate from '../middlewares/validate';

const router: Router = express.Router();

const roomTypeSchema = Joi.object({
 name: Joi.string().required(),
});

// POST
router.post(
 "/RoomType",
 [authMiddleware, adminMiddleware, validate(roomTypeSchema)],
 async (req: Request, res: Response) => {
    const newRoomType = new RoomType({
      name: req.body.name,
    });

    try {
      const roomType = await newRoomType.save();
      res.status(201).json(roomType);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
 }
);

// GET
router.get("/RoomType", async (req: Request, res: Response) => {
 try {
    const roomTypes = await RoomType.find();
    res.json(roomTypes);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

export default router;
