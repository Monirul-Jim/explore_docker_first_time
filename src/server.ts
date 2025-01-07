import { Server } from "http";
import app from "./app";
import { errorlogger, logger } from "./app/src/shared/logger";
const port = 5000;
let server: Server;

async function main() {
  try {
    server = app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
      logger.info(`app is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
    errorlogger.error(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  errorlogger.error(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  errorlogger.error("uncaughtException is detected");
  process.exit(1);
});
