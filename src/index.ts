import express, { Request, Response } from "express";
import itemRoutes from "./routes/itemRoutes";
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
const apiVersion = "v1";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware to parse JSON
app.use(express.json());

// Basic GET route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript API!");
});

// Use item routes
app.use("/api", itemRoutes);

// Use note routes
app.use(`/${apiVersion}`, noteRoutes);

// Use user routes
app.use(`/${apiVersion}`, userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
