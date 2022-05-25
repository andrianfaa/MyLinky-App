import bodyParser from "body-parser";
import cors from "cors";
import type { NextFunction, Response as ExpressResponse } from "express";
import express from "express";
import helmet from "helmet";
import type { ConnectOptions } from "mongoose";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config";
import { Response } from "./helpers";
import routes from "./routes";

// Init express
const app = express();

app.use((
  err: any,
  req: ApiRequest,
  res: ExpressResponse,
  next: NextFunction,
) => {
  res.setHeader("x-xss-protection", "1; mode=block");
  res.header("Cross-Origin-Resource-Policy", "*");
  next();
});

// Init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Additional middlewares
// app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({
  maxAge: 31536000,
}));
app.use(helmet.noSniff());

// Connect to mongodb (using mongodb shell)
mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions).catch((err: any) => {
  throw new Error(err);
});

app.use(`/api/${config.api.version}`, routes);
app.all("*", (req: ApiRequest, res: ExpressResponse) => {
  Response.error(res, 404, { message: "Not found" } as ApiResponse<null>);
});

export default app;
