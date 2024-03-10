import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import todoRouter from './routes/todos';

const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.PORT;

const mongoDBUrl = process.env.DB_URL as string;

mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Database connection failed: ', error.message);
  });

app.use(todoRouter);

app.listen(port, () => {
  console.log(`server is started at port: ${port}`);
});
