/* eslint-disable no-console */
import "./api-env";
import app from "./src/app";
import config from "./src/config";

app.listen(config.port, () => console.info(`Server listening on port ${config.port}`));
