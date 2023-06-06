import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { permissionsRoutes } from "./permissions.routes";
import { postsRoutes } from "./posts.routes";
import { rolesRoutes } from "./roles.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/roles", rolesRoutes);
router.use("/posts", postsRoutes);

export { router };
