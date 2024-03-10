import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
}

const todoSchema: Schema = new Schema<ITodo>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;
