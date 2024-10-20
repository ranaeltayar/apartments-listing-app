import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import apartmentsRouter from "./api/routers/apartment.router";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/units", apartmentsRouter);

server.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
