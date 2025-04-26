import mongoose, { Document, Schema, model } from "mongoose";
import {
  ProjectStrategy,
  ProjectStrategyEnum,
  ProjectType,
  ProjectTypeEnum,
  ProjectStatusEnum,
  ProjectStatus,
} from "../enums/project-type.enum";
import AddressSchema, { IAddress } from "../schemas/address.schema";

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  propertyAddress: IAddress;
  projectType: ProjectTypeEnum;
  projectStrategy: ProjectStrategyEnum;
  workspace: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  startDate: Date | null;
  endDate: Date | null;
  status: ProjectStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    propertyAddress: AddressSchema,
    description: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      enum: Object.values(ProjectType),
      default: null,
    },
    projectStrategy: {
      type: String,
      enum: Object.values(ProjectStrategy),
      default: null,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.NOT_STARTED,
    },
  },
  { timestamps: true }
);

const ProjectModel = model<ProjectDocument>("Project", projectSchema);
export default ProjectModel;
