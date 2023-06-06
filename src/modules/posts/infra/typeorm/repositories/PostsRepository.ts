import { Repository, getRepository } from "typeorm";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePost";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

import { Post } from "../entities/Post";

class PostsRepository implements IPostsRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async create({
    id,
    user_id,
    title,
    content,
    midia,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.repository.create({
      id,
      user_id,
      title,
      content,
      midia,
    });
    await this.repository.save(post);

    return post;
  }
  async findById(id: string): Promise<Post> {
    const post = this.repository.findOne(id);
    return post;
  }
}

export { PostsRepository };
