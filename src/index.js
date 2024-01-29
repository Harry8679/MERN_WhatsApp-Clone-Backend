import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";

// env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 6000;

// Exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});

// mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

// Exit on mongodb
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});

// Mongodb connection
mongoose.connect(DATABASE_URL).then(() => {
  logger.info("Connect to Mongodb");
});

let server;
server = app.listen(PORT, () => {
  logger.info(`WhatsApp Backend is running on the port ${PORT}`);
  //   console.log("process id", process.pid);
  //   throw new Error("Error is server");
});

// Handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
