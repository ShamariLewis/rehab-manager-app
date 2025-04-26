import { Schema } from "mongoose";
import { Currency, CurrencyType } from "../enums/currency.enum";

export interface IPrice {
  amount: number | null;
  currency: CurrencyType;
}

const PriceSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: Object.values(Currency),
      required: true,
      default: Currency.USD,
    },
  },
  { _id: false }
);

export default PriceSchema;
