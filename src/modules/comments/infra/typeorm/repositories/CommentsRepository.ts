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
    id,
    user_id,
    post_id,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.repository.create({ id, user_id, post_id, content });

    await this.repository.save(comment);

    return comment;
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.repository.findOne(id);

    return comment;
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async list(): Promise<Comment[]> {
    const comments = await this.repository.find();

    return comments;
  }
}

export { CommentsRepository };
