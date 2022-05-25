import { Schema, model } from "mongoose";
import { RandomID } from "../utils";

export interface LinkySchemaType {
  id: string;
  uid: string;
  user: {
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
  links: {
    id?: string;
    url?: string;
    title?: string;
    type: string;
    isPublished: boolean;
  }[];
}

const linkySchema = new Schema({
  id: {
    type: String,
    default: RandomID.generate(7),
  },
  uid: {
    type: String,
    required: true,
  },
  user: {
    name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  links: {
    type: Array,
    default: [],
  },
});

export const Linky = model("Linky", linkySchema);
