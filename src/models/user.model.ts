import mongoose from 'mongoose';

interface IUser {
  _id?: mongoose.Types.ObjectId ; // ?- optional h daalna h daalo wrna mt daalo
  name: string;
  role: "admin" | "user" | "deliveryBoy";
  email: string;
  mobile?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: false,
      unique: true,
      sparse: true
      
    },
    role: {
      type: String,
      enum: ["admin", "user", "deliveryBoy"],
      default:"user",
      required: true,
    },
    password: {
      type: String,
      required: true
    }
  
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
