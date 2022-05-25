import type { Response as ExpressResponse } from "express";
import path from "path";
import config from "../config";
import FirebaseAdmin from "../firebase-admin";
import { Response } from "../helpers";
import { RandomID } from "../utils";

export const imageServices = {
  uploadProfilePhoto: async (req: ApiRequest, res: ExpressResponse) => {
    const { file, user } = req;

    if (!file) {
      return Response.error(res, 400, {
        message: "File is required",
      });
    }

    if (!user) {
      return Response.error(res, 401, {
        message: "User is required",
      });
    }

    const ext = path.extname(file.originalname);
    const allowedExt = [".jpg", ".jpeg", ".png", ".gif"];

    if (!allowedExt.includes(ext)) {
      return Response.error(res, 400, {
        message: "Only images are allowed",
      });
    }

    try {
      const newFileName = `${RandomID.generate(10) + ext}`;
      const saveToFirebaseStorage = FirebaseAdmin.storage().bucket()
        .file(`photos/${newFileName}`)
        .createWriteStream()
        .end(file.buffer); // Upload file to firebase storage

      const firebaseStorageURL = `https://firebasestorage.googleapis.com/v0/b/${config.firebase.bucket}/o/photos%2F${newFileName}?alt=media`; // Get URL from firebase storage

      if (!saveToFirebaseStorage) {
        return Response.error(res, 500, {
          message: "Internal server error",
        });
      }

      return Response.success(res, 200, {
        message: "File uploaded successfully",
        data: {
          url: firebaseStorageURL,
        } as {
          url: string;
        },
      });
    } catch (error: any) {
      return Response.error(res, 500, {
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
