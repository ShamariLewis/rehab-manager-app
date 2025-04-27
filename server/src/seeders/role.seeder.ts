import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/database.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";

// We use a mongoose transaction to seed our database with initial data to be used in our application.
// We'll run our database connection in this file independently to seed our database.
const seedRoles = async () => {
  console.log("Seeding roles started.......");

  try {
    await connectDB();
    const session = await mongoose.startSession();
    session.startTransaction();

    // If there is any existing data, delete it.
    console.log("Clearing existing roles.....");
    await RoleModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      // Check if the role already exists.
      const existingRole = await RoleModel.findOne({ name: role }).session(
        session
      );
      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions: permissions,
        });
        await newRole.save({ session });
      } else {
        console.log(`Role ${role} already exists.`);
      }
    }

    await session.commitTransaction();
    console.log("Transaction committed");

    session.endSession();
    console.log("Session ended");

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error during seeding", error);
  }
};

seedRoles().catch((error) => console.error("Error running seed script", error));
