import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.PORT;

const mongoDB = process.env.DB_URL as string;
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection failed: ", error.message);
  });

const todos = [
  {
    id: 1,
    title: "task 1",
    description: "learning ts",
    status: true,
    createAt: "",
    updateAt: "",
  },
  {
    id: 2,
    title: "task 2",
    description: "learning js",
    status: true,
    createAt: "",
    updateAt: "",
  },
  {
    id: 3,
    title: "task 3",
    description: "learning php",
    status: true,
    createAt: "",
    updateAt: "",
  },
];

app.get("/todos", (req, res) => {
  res.status(200).json({
    todos,
  });
});

app.get("/todos/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const todo = todos.find((el) => el.id === Number(id));
  if (!todo) {
    return res.status(404).json({ message: "todo not found" });
  }
  return res.status(200).json({
    todo,
  });
});

app.post("/todos", (req, res) => {
  console.log(req.body);
  const body = Object.assign(req.body);
  todos.push(body);
  return res.status(201).json({
    message: "todo is created",
    todo: body,
  });
});
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((el) => el.id === Number(id));
  if (!todo) {
    return res.status(404).json({ message: "todo not found" });
  }
  res.status(200).json({
    todo,
  });
});
app.listen(port, () => {
  console.log(`server is started at port ${port}`);
});
