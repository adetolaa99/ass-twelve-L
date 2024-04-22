import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
 username: string;
 password: string;
 role: string;
 comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new mongoose.Schema({
 username: {
    type: String,
    required: true,
    unique: true,
 },
 password: {
    type: String,
    required: true,
 },
 role: {
    type: String,
    enum: ["guest", "admin"],
    default: "guest",
 },
});

UserSchema.pre<IUser>("save", async function (next) {
 if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
 }
 next();
});

UserSchema.methods.comparePassword = function (this: IUser, candidatePassword: string): Promise<boolean> {
 return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
