import { Router } from "express";
import multer from "multer";

import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { SendEmailUpdatePasswordController } from "@modules/accounts/useCases/sendEmailUpdatePassword/SendEmailUpdatePasswordController";
import { ShowUserController } from "@modules/accounts/useCases/showUser/ShowUserController";
import { UpdatePasswordController } from "@modules/accounts/useCases/updatePassword/UpdatePasswordController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updatePasswordController = new UpdatePasswordController();
const sendEmailUpdatePasswordController =
  new SendEmailUpdatePasswordController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);

usersRoutes.get("/me", showUserController.handle);
usersRoutes.put("/refresh-password/:token", updatePasswordController.handle);
usersRoutes.post("/send-email", sendEmailUpdatePasswordController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);

export { usersRoutes };
