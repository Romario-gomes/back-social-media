import { ICreateCommentDTO } from "@modules/comments/dtos/ICreateCommentDTO";
import { Comment } from "@modules/comments/infra/typeorm/entities/Comment";

import { ICommentsRepository } from "../ICommentsRepository";

class CommentsRepositoryInMemory implements ICommentsRepository {
  comments: Comment[] = [];

  async create({
    id,
    user_id,
    post_id,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, { id, user_id, post_id, content });

    this.comments.push(comment);

    return comment;
  }
  async findById(id: string): Promise<Comment> {
    return this.comments.find(comment => comment.id === id);
  }
  async delete(id: string): Promise<void> {
    this.comments.map(comment => comment.id !== id);
  }
  async list(): Promise<Comment[]> {
    return this.comments;
  }
}

export { CommentsRepositoryInMemory };
