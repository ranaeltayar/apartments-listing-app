import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import apartmentsRouter from "./api/routers/apartment.router";
import errorHandler from './api/handlers/error-handler';
import {swaggerDocs} from './swagger-docs';
import swaggerUi from "swagger-ui-express";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/units", apartmentsRouter);

app.use(errorHandler);


server.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
