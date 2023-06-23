import { Router } from "express";

import { CreatePermissionController } from "../../../../modules/accounts/useCases/createPermission/CreatePermissionController";
import { is } from "../middlewares/accessControll";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const permissionsRoutes = Router();

const createPermissionController = new CreatePermissionController();
permissionsRoutes.post(
  "/",
  ensureAuthenticated,
  is(["Permissão 1"]),
  createPermissionController.handle,
);

export { permissionsRoutes };
