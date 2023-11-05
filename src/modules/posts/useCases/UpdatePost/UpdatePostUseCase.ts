import { injectable, inject } from "tsyringe";

import { IUpdatePostDTO } from "@modules/posts/dtos/IUpdatePost";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postRepository: IPostsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute(data: IUpdatePostDTO): Promise<Post> {
    const [post, user] = await Promise.all([this.postRepository.findById(data.id), this.usersRepository.findById(data.user_id)])

    if (!post) {
      throw new AppError("Post Not Found", 404);
    }

    if(user.id !== post.user_id && user.roles.name !== "admin"){
      throw new AppError("not authorized to update the post", 401)
    }

    Object.assign(post, data);

    const updatedPost = await this.postRepository.create(post);

    return updatedPost;
  }
}

export { UpdatePostUseCase };
