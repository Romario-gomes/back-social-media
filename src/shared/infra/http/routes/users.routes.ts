import { Router } from "express";

import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { ShowUserController } from "@modules/accounts/useCases/showUser/ShowUserController";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();
const listUsersController = new ListUsersController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);

usersRoutes.get("/me", showUserController.handle);

export { usersRoutes };
