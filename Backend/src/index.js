import express from "express";
import cors from "cors";
import { connect } from "./config/database.js";
import bodyParser from "body-parser";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:1234", // Allow your frontend
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Use the API routes
app.use("/api", apiRoutes);

app.listen(3005, async () => {
  console.log(`Server started on http://localhost:3005`);
  await connect();
  console.log("MongoDB connected");
});
