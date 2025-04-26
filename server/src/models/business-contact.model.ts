import mongoose, { model, Document, Schema } from "mongoose";
import AddressSchema, { IAddress } from "../schemas/address.schema";
import { BusinessType, BusinessTypeEnum } from "../enums/business-contact.enum";

export interface BusinessContactDocument extends Document {
  businessName: string;
  businessType: BusinessTypeEnum;
  businessAddress: IAddress;
  workspace: mongoose.Types.ObjectId;
  businessEmail?: string;
  businessPhone: string | null;
}

const businessTypeSchema = new Schema<BusinessContactDocument>({
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  businessType: {
    type: String,
    enum: Object.values(BusinessType),
    default: null,
  },
  businessAddress: AddressSchema,
  workspace: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  businessEmail: {
    type: String,
    required: false,
    trim: true,
  },
  businessPhone: {
    type: String,
    required: false,
    default: null,
  },
});

const BusinessModel = model<BusinessContactDocument>(
  "Business",
  businessTypeSchema
);
export default BusinessModel;
