import { injectable, inject } from "tsyringe";

import { IUpdatePostDTO } from "@modules/posts/dtos/IUpdatePost";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postRepository: IPostsRepository,
  ) {}
  async execute(data: IUpdatePostDTO): Promise<Post> {
    const post = await this.postRepository.findById(data.id);

    if (!post) {
      throw new AppError("Post Not Found", 404);
    }

    Object.assign(post, data);

    const updatedPost = await this.postRepository.create(post);

    return updatedPost;
  }
}

export { UpdatePostUseCase };
