import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import RoleModel from "../models/roles-permission.model";
import MemberModel from "../models/member.model";
import { Roles } from "../enums/role.enum";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
import { ProviderType } from "../enums/account-provider.enum";

// Login or create user using google auth.
export const loginOrCreateAccountService = async (data: {
  provider: string;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const { provider, providerId, displayName, email, picture } = data;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    console.log("Started Session.....");

    let user = await UserModel.findOne({ email }).session(session);
    if (!user) {
      // Step 1 of transaction: Create a new user if it doesn't exist.\
      user = new UserModel({
        email,
        name: displayName,
        profilePicture: picture || null,
      });
      await user.save({ session });

      // Step 2 of transaction: Create the account for the user
      const account = new AccountModel({
        userId: user._id,
        provider: provider,
        providerId,
      });

      await account.save({ session });

      // Step 3: Create a new workspace for the user.
      const workspace = new WorkspaceModel({
        name: `${user.name}'s workspace`,
        description: `This workspace has been created for ${user.name}`,
        owner: user._id,
      });
      await workspace.save({ session });

      // Step 4: Assign the Owner Role to the created user of the workspace.
      // The workspace is created as part of their account creation process so they'll have
      // the role of owner.
      const ownerRole = await RoleModel.findOne({
        name: Roles.OWNER,
      }).session(session);

      if (!ownerRole) {
        throw new NotFoundException("Owner role not found");
      }

      // Step 5: We now create use user as a member of the workspace and assign the owner
      // role.
      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date(),
      });

      await member.save({ session });

      // Set the current workspace of the user to the workspace._id
      user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
      await user.save({ session });
    }
    await session.commitTransaction();
    session.endSession();
    console.log("End Session......");

    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  } finally {
    session.endSession();
  }
};
