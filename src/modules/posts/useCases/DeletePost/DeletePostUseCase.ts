import { injectable, inject } from "tsyringe";

import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class DeletePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute(id: string, user_id: string): Promise<void> {
    const [post, user] = await Promise.all([this.postsRepository.findById(id), this.usersRepository.findById(user_id)])

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if(user_id !== post.user_id && user.roles.name !== "admin"){
      throw new AppError("not authorized to delete the post", 401)
    }

    await this.postsRepository.delete(id);
  }
}

export { DeletePostUseCase };
