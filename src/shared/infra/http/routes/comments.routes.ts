import { Router } from "express";

import { CreateCommentController } from "@modules/comments/useCases/createComment/CreateCommentController";
import { UpdateCommentController } from "@modules/comments/useCases/updateComment/UpdateCommentController";

const commentsRoutes = Router();

const createCommentController = new CreateCommentController();
const updateCommentController = new UpdateCommentController();

commentsRoutes.post("/:id", createCommentController.handle);
commentsRoutes.put("/", updateCommentController.handle);

export { commentsRoutes };
