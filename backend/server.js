// Import required modules and files.
import 'dotenv/config';
import {fileURLToPath} from "url";
import { join, dirname } from 'path';
import express from "express";
import mongoose from "mongoose";
import passport from 'passport';
import { customStrategies } from './passport.js';
import cors from "cors";

// Import different routers.
import adminRouter from "./routes/admin/index.js";
import apiV1Router from "./routes/api/v1/index.js";

// Gets the current directory path.
const __dirname = dirname(fileURLToPath(import.meta.url));

// Creates express app.
const app = express();

// Sets the port to 3030 for development, it will take hosting server's provided port on deployment.
const PORT = process.env.PORT || 3030;

// Import and call passport strategy to authenticate users using passport.
customStrategies(passport);

// Sets cors to the client app url to escape cors related error.
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Serves static files at /assets path and also serve client app from any path.
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "public", "client")));

// Sets api to extract body data either from urlencoded form or json form.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sets view engine as ejs for server side rendered pages.
app.set("view engine", "ejs");

// Uses the imported routers with respective paths.
app.use("/admin", adminRouter);
app.use("/api/v1", apiV1Router);

// Serve all the client routes through this wild card route. It will match all the routes other than the above specified routes.
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "public", "client", "index.html"));
});

// Make sure database is connected before listening the server.
Promise.all([mongoose.connect(process.env.DATABASE_CONNECTION_STRING)])
  .then(() => {
    console.log("Connected to DB")
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`MongoDB atlas error: ${error}`);
  })