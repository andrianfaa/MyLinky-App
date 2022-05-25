import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`),
  encoding: "utf8",
});

const config = {
  port: Number(process.env.API_PORT) ?? 8080,
  secret: process.env.API_SECRET as string,
  url: process.env.API_URL as string ?? `http://localhost:8080/api/${process.env.API_VERSION as string ?? "v1"}`,
  // Api
  api: {
    key: process.env.API_KEY as string,
    version: process.env.API_VERSION as string ?? "v1",
  },
  // Database
  db: {
    url: process.env.DB_URL as string,
  },
  firebase: {
    bucket: process.env.FIREBASE_BUCKET as string,
  },
};

if (
  !config.secret
  || !config.api.key
  || !config.db.url
  || !config.firebase.bucket
) {
  throw new Error("Missing config");
}

export default config;
