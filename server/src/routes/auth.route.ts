import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import { googleLoginCallback } from "../controllers/auth.controller";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

// This is the route for our google auth logins.
// You could pass in session into passport and set it to false if you wanted to use JWT.
authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
  }),
  googleLoginCallback
);

export default authRoutes;
