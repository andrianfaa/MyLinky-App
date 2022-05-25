import { Schema, model } from "mongoose";
import { RandomID } from "../utils";

export interface SettingSchemaType {
  generalSettings: {
    profile: {
      name: string;
      username: string;
      email: string;
      avatar: string;
      bio: string;
    };
  };
  publishSettings: {
    profile: {
      showProfilePhoto: boolean;
      showProfileName: boolean;
      showProfileUsername: boolean;
      showProfileBio: boolean;
      showProfileEmail: boolean;
    };
    links: {
      openLinksInNewTab: boolean;
      showIcon: boolean;
    }
  }
}

const settingSchema = new Schema({
  id: {
    type: String,
    default: RandomID.generate(7),
  },
  uid: {
    type: String,
    required: true,
  },
  generalSettings: {
    profile: {
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
      bio: {
        type: String,
        default: "",
      },
      avatar: {
        type: String,
        default: "",
      },
    },
  },
  publishSettings: {
    profile: {
      showProfilePhoto: {
        type: Boolean,
        default: true,
      },
      showProfileName: {
        type: Boolean,
        default: true,
      },
      showProfileUsername: {
        type: Boolean,
        default: true,
      },
      showProfileBio: {
        type: Boolean,
        default: false,
      },
      showProfileEmail: {
        type: Boolean,
        default: false,
      },
    },
    links: {
      openLinksInNewTab: {
        type: Boolean,
        default: false,
      },
      showIcon: {
        type: Boolean,
        default: true,
      },
    },
  },
});

export const Setting = model("Setting", settingSchema);
