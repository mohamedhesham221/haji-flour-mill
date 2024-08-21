import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import passport from 'passport';
import { customStrategies } from './passport.js';

import adminRouter from "./routes/admin/index.js";
import apiV1Router from "./routes/api/v1/index.js";

const app = express();

const PORT = 3030;

customStrategies(passport);
app.use("/assets", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/admin", adminRouter);
app.use("/api/v1", apiV1Router);

app.get("/", (req, res) => {
  res.send("Hii, from server");
});

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