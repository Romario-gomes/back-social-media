import { injectable, inject } from "tsyringe";

import { Comment } from "@modules/comments/infra/typeorm/entities/Comment";
import { ICommentsRepository } from "@modules/comments/repositories/ICommentsRepository";

@injectable()
class ListCommentsUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
  ) {}
  async execute(): Promise<Comment[]> {
    const comments = await this.commentsRepository.list();

    return comments;
  }
}

export { ListCommentsUseCase };
