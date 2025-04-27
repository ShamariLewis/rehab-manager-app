import { UserDocument } from "../models/user.model";

// This allows us to be able to access the currentWorkspace on the user.
declare global {
  namespace Express {
    interface User extends UserDocument {
      _id?: any;
    }
  }
}
