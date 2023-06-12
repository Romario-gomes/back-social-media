import { injectable, inject } from "tsyringe";

import { IUpdateCommentDTO } from "@modules/comments/dtos/IUpdateCommentDTO";
import { Comment } from "@modules/comments/infra/typeorm/entities/Comment";
import { ICommentsRepository } from "@modules/comments/repositories/ICommentsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateCommentUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
  ) {}
  async execute(data: IUpdateCommentDTO): Promise<Comment> {
    const comment = await this.commentsRepository.findById(data.id);

    if (!comment) {
      throw new AppError("Comment Not Found", 404);
    }

    Object.assign(comment, data);

    const updatedComment = await this.commentsRepository.create(comment);

    return updatedComment;
  }
}

export { UpdateCommentUseCase };
