import 'dotenv/config';
import {fileURLToPath} from "url";
import { join, dirname } from 'path';
import express from "express";
import mongoose from "mongoose";
import passport from 'passport';
import { customStrategies } from './passport.js';
import cors from "cors";

import adminRouter from "./routes/admin/index.js";
import apiV1Router from "./routes/api/v1/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = process.env.PORT || 3030;

customStrategies(passport);
app.use(cors({origin: "http://localhost:3000"}));
app.use("/assets", express.static("public"));
// app.use(express.static(join("public", "client")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/admin", adminRouter);
app.use("/api/v1", apiV1Router);

// app.get("/*", (req, res) => {
//   res.sendFile(join(__dirname, "public", "client", "index.html"));
// });
app.get("/", (req, res) => {
  res.send("Hi! from server.")
})

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