import { Request, Response } from "express";
import Todo, { ITodo } from "../../models/todo";

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todo: ITodo | null = await Todo.findById(id);
    res.status(200).json({
      todo,
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const todo: any = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();

    res.status(201).json({ message: "Todo added", todo: newTodo });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true }
    );

    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
    });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteTodo: ITodo | null = await Todo.findByIdAndDelete(id);

    res.status(200).json({
      message: "Todo deleted",
      todo: deleteTodo,
    });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

export { getTodos, getTodo, updateTodo, deleteTodo, createTodo };
