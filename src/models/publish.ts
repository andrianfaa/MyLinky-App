import { Schema, model } from "mongoose";
import { RandomID } from "../utils";

const publishSChema = new Schema({
  id: {
    type: String,
    default: RandomID.generate(7),
  },
  uid: {
    type: String,
    required: true,
  },
  openInNewTab: {
    type: Boolean,
    default: false,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  username: {
    type: String,
    required: true,
  },
  profile: {
    name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
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

export const Publish = model("publish", publishSChema);
