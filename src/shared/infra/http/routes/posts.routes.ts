import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/CreatePost/CreatePostController";
import { DeletePostController } from "@modules/posts/useCases/DeletePost/DeletePostController";
import { ListPostsController } from "@modules/posts/useCases/listPost/ListPostsController";
import { UpdatePostController } from "@modules/posts/useCases/UpdatePost/UpdatePostController";

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();
const listPostsController = new ListPostsController();

const postsRoutes = Router();

postsRoutes.get("/", listPostsController.handle);
postsRoutes.post("/", createPostController.handle);
postsRoutes.put("/:id", updatePostController.handle);
postsRoutes.delete("/:id", deletePostController.handle);

export { postsRoutes };
