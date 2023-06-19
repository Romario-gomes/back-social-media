import { Router } from "express";

import { CreateCommentController } from "@modules/comments/useCases/createComment/CreateCommentController";
import { DeleteCommentController } from "@modules/comments/useCases/deleteComment/DeleteCommentController";
import { ListCommentsController } from "@modules/comments/useCases/listComments/ListCommentsController";
import { UpdateCommentController } from "@modules/comments/useCases/updateComment/UpdateCommentController";

const commentsRoutes = Router();

const createCommentController = new CreateCommentController();
const updateCommentController = new UpdateCommentController();
const deleteCommentController = new DeleteCommentController();
const listCommentsController = new ListCommentsController();

commentsRoutes.get("/", listCommentsController.handle);
commentsRoutes.post("/:id", createCommentController.handle);
commentsRoutes.put("/", updateCommentController.handle);
commentsRoutes.delete("/", deleteCommentController.handle);

export { commentsRoutes };
