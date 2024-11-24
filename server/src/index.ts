import "dotenv/config";
import express, { Request, Response } from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/test", (req: Request, res: Response) => {
  res.json({ msg: "Testing out the route" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started. Running on port ${port}`);
});
