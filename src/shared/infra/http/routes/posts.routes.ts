import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/CreatePost/CreatePostController";

const createPostController = new CreatePostController();

const postsRoutes = Router();

postsRoutes.post("/", createPostController.handle);

export { postsRoutes };
