import mongoose, { Document, Schema, model } from "mongoose";
import {
  MilestoneStatusType,
  MilestonePriorityType,
  MilestoneStatus,
  MilestonePriority,
} from "../enums/milestone.enum";

export interface MilestoneDocument extends Document {
  name: string;
  description: string | null;
  project: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  task: mongoose.Types.ObjectId;
  status: MilestoneStatusType;
  priority: MilestonePriorityType;
  createdBy: mongoose.Types.ObjectId;
  dueDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const milestoneSchema = new Schema<MilestoneDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MilestoneStatus),
      default: MilestoneStatus.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(MilestonePriority),
      default: MilestonePriority.MEDIUM,
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
      default: null,
    },
  },
  { timestamps: true }
);

const MilestoneModel = model<MilestoneDocument>("Milestone", milestoneSchema);
export default MilestoneModel;
