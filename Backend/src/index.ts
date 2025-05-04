import express from "express";
import routes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.use("/task/v1", taskRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
