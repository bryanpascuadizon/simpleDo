import { Schema, models, model } from "mongoose";

const TaskSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  note: {
    type: String,
    required: [true, "Note is required"],
  },
  isCompleted: {
    type: Boolean,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const Task = models.Task || model("Task", TaskSchema);
export default Task;
