import { injectable, inject } from "tsyringe";

import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeletePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}
  async execute(id: string, user_id: string): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if(user_id !== post.user_id){
      throw new AppError("not authorized to delete the post", 401)
    }

    await this.postsRepository.delete(id);
  }
}

export { DeletePostUseCase };
