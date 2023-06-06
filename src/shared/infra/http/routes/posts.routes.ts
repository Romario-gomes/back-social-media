import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/CreatePost/CreatePostController";
import { DeletePostController } from "@modules/posts/useCases/DeletePost/DeletePostController";
import { UpdatePostController } from "@modules/posts/useCases/UpdatePost/UpdatePostController";

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

const postsRoutes = Router();

postsRoutes.post("/", createPostController.handle);
postsRoutes.put("/:id", updatePostController.handle);
postsRoutes.delete("/:id", deletePostController.handle);

export { postsRoutes };
