import compression from "compression";
import cors from "cors";
import express from "express";
import userRoutes from './modules/user/user.route';
const app = express();
import cookieParser from 'cookie-parser';


app.use(cors());
app.use(compression()); 
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.get("/", (_req, res) => {
  res.send("Server is running");
});


app.use('/api/v1/users', userRoutes);



app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;