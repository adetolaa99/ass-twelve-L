import mongoose, { Document, Schema } from 'mongoose';

interface IRoomType extends Document {
 name: string;
}

const RoomTypeSchema: Schema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
 },
});

const RoomType = mongoose.model<IRoomType>("RoomType", RoomTypeSchema);

export default RoomType;
