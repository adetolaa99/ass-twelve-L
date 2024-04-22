import express, { Request, Response, Router } from 'express';
import Room from '../models/room';
import RoomType from '../models/room_type';

const router: Router = express.Router();

// POST
router.post("/Room", async (req: Request, res: Response) => {
 const { name, roomType, price } = req.body;

 try {
    const roomTypeExists = await RoomType.findById(roomType);
    if (!roomTypeExists) {
      return res.status(400).json({ message: "Room type not found" });
    }

    const newRoom = new Room({
      name,
      roomType,
      price,
    });

    const room = await newRoom.save();
    res.status(201).json(room);
 } catch (err) {
    res.status(400).json({ message: err.message });
 }
});

// GET
router.get("/Room", async (req: Request, res: Response) => {
 const { search, roomType, minPrice, maxPrice } = req.query;

 try {
    const query: any = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (roomType) query.roomType = roomType;
    if (minPrice) query.price = { $gte: parseFloat(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };

    const rooms = await Room.find(query);
    res.json(rooms);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

// PATCH
router.patch("/Room/:roomId", async (req: Request, res: Response) => {
 const { roomId } = req.params;
 const updates = Object.keys(req.body);
 const allowedUpdates = ["name", "roomType", "price"];
 const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
 );

 if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
 }

 try {
    const room = await Room.findByIdAndUpdate(roomId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).send();
    }

    res.send(room);
 } catch (err) {
    res.status(400).send(err);
 }
});

// DELETE
router.delete("/Room/:roomId", async (req: Request, res: Response) => {
 const { roomId } = req.params;

 try {
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).send();
    }

    res.send(room);
 } catch (err) {
    res.status(500).send(err);
 }
});

// GET by ID
router.get("/Room/:roomId", async (req: Request, res: Response) => {
 const { roomId } = req.params;

 try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send();
    }

    res.send(room);
 } catch (err) {
    res.status(500).send(err);
 }
});

export default router;
