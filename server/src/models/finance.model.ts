import mongoose, { Schema, Document, model } from "mongoose";
import PaymentSchema, { IPayment } from "../schemas/payment.schema";

export interface FinanceDocument extends Document {
  workspaceId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  payments: IPayment[];
  totalExpenses: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const financeSchema = new Schema<FinanceDocument>({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  payments: PaymentSchema,
  totalExpenses: {
    type: Number,
    default: null,
  },
});

const FinanceModel = model<FinanceDocument>("Finance", financeSchema);
export default FinanceModel;
