import { Router } from "express";

import { CreatePermissionController } from "../../../../modules/accounts/useCases/createPermission/CreatePermissionController";
import {
  ensureAuthenticated,
  ensurePermission,
} from "../middlewares/ensureAuthenticated";

const permissionsRoutes = Router();

const createPermissionController = new CreatePermissionController();
permissionsRoutes.post(
  "/",
  ensurePermission(["Permissão 1"]),
  createPermissionController.handle,
);

export { permissionsRoutes };
