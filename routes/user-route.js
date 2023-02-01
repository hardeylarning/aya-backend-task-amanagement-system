import express from "express";
import {
  userDeleteController,
  userGetController,
  userLoginController,
  userRegisterController,
  usersController,
  userUpdateController,
} from "../controller/user-controller.js";
import { isLoggedIn } from "../middleware/is-logged-in.js";

const userRoute = express.Router();

userRoute.post("/login", userLoginController);
userRoute.post("/register", userRegisterController);

userRoute.get("/", usersController);

// userRoute.get("/:id", userGetController);

userRoute.get("/profile", isLoggedIn, userGetController);

userRoute.put("/:id", userUpdateController);

userRoute.delete("/:id", userDeleteController);

export default userRoute;
