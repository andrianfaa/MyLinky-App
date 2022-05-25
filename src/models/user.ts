import { Schema, model } from "mongoose";
import { RandomID } from "../utils";

export interface UserSchemaType {
  uid: string;
  username?: string;
  email?: string;
  password?: string;
  createAt?: Date;
  updateAt?: Date;
}

const userSchema = new Schema({
  uid: {
    type: String,
    default: RandomID.generate(7),
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model("User", userSchema);
