import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

const User = models.User || model("User", UserSchema);
export default User;
