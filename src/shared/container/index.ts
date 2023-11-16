import { container } from "tsyringe";

import "./providers";

import { CommentsRepository } from "@modules/comments/infra/typeorm/repositories/CommentsRepository";
import { PostsRepository } from "../../modules/posts/infra/typeorm/repositories/PostsRepository";

import { RolesRepository } from "../../modules/accounts/infra/typeorm/repositories/RolesRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

import { ICommentsRepository } from "@modules/comments/repositories/ICommentsRepository";
import { IPostsRepository } from "../../modules/posts/repositories/IPostsRepository";
import { IRolesRepository } from "../../modules/accounts/repositories/IRolesRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository,
);

container.registerSingleton<IPostsRepository>(
  "PostsRepository",
  PostsRepository,
);

container.registerSingleton<ICommentsRepository>(
  "CommentsRepository",
  CommentsRepository,
);
