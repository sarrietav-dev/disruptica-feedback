import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json() // Logs in JSON format
  ),
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Logs errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Logs all levels to a file
  ],
});

export default logger;