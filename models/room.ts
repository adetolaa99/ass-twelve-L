import mongoose, { Document, Schema } from 'mongoose';

interface IRoom extends Document {
 name: string;
 roomType: mongoose.Types.ObjectId;
 price: number;
}

const RoomSchema: Schema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
 },
 roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
 },
 price: {
    type: Number,
    required: true,
 },
});

const Room = mongoose.model<IRoom>('Room', RoomSchema);

export default Room;
