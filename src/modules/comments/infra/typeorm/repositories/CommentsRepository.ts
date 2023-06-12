import { Repository, getRepository } from "typeorm";

import { ICreateCommentDTO } from "@modules/comments/dtos/ICreateCommentDTO";
import { ICommentsRepository } from "@modules/comments/repositories/ICommentsRepository";

import { Comment } from "../entities/Comment";

class CommentsRepository implements ICommentsRepository {
  private repository: Repository<Comment>;

  constructor() {
    this.repository = getRepository(Comment);
  }

  async create({
    user_id,
    post_id,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.repository.create({ user_id, post_id, content });

    await this.repository.save(comment);

    return comment;
  }
}

export { CommentsRepository };
