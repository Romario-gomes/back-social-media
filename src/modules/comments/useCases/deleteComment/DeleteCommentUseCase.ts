import { injectable, inject } from "tsyringe";

import { Comment } from "@modules/comments/infra/typeorm/entities/Comment";
import { ICommentsRepository } from "@modules/comments/repositories/ICommentsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCommentUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const comment = await this.commentsRepository.findById(id);

    if (!comment) {
      throw new AppError("Comment Not Found", 404);
    }

    await this.commentsRepository.delete(id);
  }
}

export { DeleteCommentUseCase };
