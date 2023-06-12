import { injectable, inject } from "tsyringe";

import { ICreateCommentDTO } from "../../dtos/ICreateCommentDTO";
import { Comment } from "../../infra/typeorm/entities/Comment";
import { ICommentsRepository } from "../../repositories/ICommentsRepository";

@injectable()
class CreateCommentUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
  ) {}

  async execute({
    user_id,
    post_id,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = await this.commentsRepository.create({
      user_id,
      post_id,
      content,
    });

    return comment;
  }
}

export { CreateCommentUseCase };
