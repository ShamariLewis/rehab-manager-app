import { Schema } from "mongoose";
import {
  PaymentMethod,
  PaymentMethodType,
  PaymentStatus,
  PaymentStatusType,
} from "../enums/payment.enum";
import PriceSchema, { IPrice } from "./price.schema";

export interface IPayment {
  paymentCode: string;
  methodOfPayment: PaymentMethodType;
  status: PaymentStatusType;
  paidDate: Date;
  total: IPrice;
}

const PaymentSchema = new Schema(
  {
    paymentCode: {
      type: String,
      unique: true,
      default: null
    },
    methodOfPayment: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: null,
      required: true,
    },
    paidDate: {

    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.NOT_PAID,
      required: true,
    },
    total: PriceSchema,
  },
  { _id: false }
);

export default PaymentSchema;
