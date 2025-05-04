import express from 'express';
import routes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import cors from 'cors';
const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'https://stunning-couscous-pq97w54grjrf7g55-5173.app.github.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers need this
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",routes)
app.use("/task/v1",taskRoutes)
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

