import mongoose, { Document, Schema, model } from "mongoose";
import {
  TaskStatusType,
  TaskPriorityType,
  TaskPriority,
  TaskStatus,
} from "../enums/task.enum";
import { generateTaskCode } from "../utils/uuid";
import PriceSchema, { IPrice } from "../schemas/price.schema";

export interface TaskDocument extends Document {
  taskCode: string;
  title: string;
  price: IPrice;
  description: string;
  project: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  status: TaskStatusType;
  priority: TaskPriorityType;
  assignedTo: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  dueDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    taskCode: {
      type: String,
      unique: true,
      default: generateTaskCode,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: PriceSchema,
    description: {
      type: String,
      trim: true,
      default: null,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null
    }

  },
  { timestamps: true }
);

const TaskModel = model<TaskDocument>("Task", taskSchema);
export default TaskModel;
