import { Router } from "express";

import { CreateCommentController } from "@modules/comments/useCases/createComment/CreateCommentController";

const commentsRoutes = Router();

const createCommentController = new CreateCommentController();

commentsRoutes.post("/:id", createCommentController.handle);

export { commentsRoutes };
