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

  async execute({ content, midia, user_id, title, likes }: ICreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.create({
      content,
      midia,
      user_id,
      title,
      likes
    });

    return post;
  }
}

export { CreatePostUseCase };
