import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from './routes/index.route.js';

// dotenv config
dotenv.config();

// Create express app
const app = express();

//Morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// Helmet
app.use(helmet());
// Parse json request body
app.use(express.json());
// Parse json request body
app.use(express.urlencoded({ extended: true }));
// Sanitize request data
app.use(mongoSanitize());
// Enable cookie parser
app.use(cookieParser());
// gzip compression
app.use(compression());
// file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// cors
app.use(cors());

// API v1 routes
app.use('/api/v1', routes);

app.use(async (req, res, next) => {
    next(createHttpError.NotFound('This route does not exist'));
});

// Error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
