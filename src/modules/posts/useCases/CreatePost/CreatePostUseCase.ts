import { injectable, inject } from "tsyringe";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePost";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute({
    title,
    content,
    midia,
    user_id,
  }: ICreatePostDTO): Promise<Post> {
    const postAlreadyExists = await this.postsRepository.findByTitle(title);

    if (postAlreadyExists) {
      throw new AppError("Post Already exists");
    }

    const post = await this.postsRepository.create({
      title,
      content,
      midia,
      user_id,
    });

    return post;
  }
}

export { CreatePostUseCase };
