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
    likes = 0,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.repository.create({
      id,
      user_id,
      title,
      content,
      midia,
      likes,
    });
    await this.repository.save(post);
    console.log("Post: ", post);
    return post;
  }
  async findById(id: string): Promise<Post> {
    const post = this.repository.findOne(id);
    return post;
  }

  async findByTitle(title: string): Promise<Post> {
    return this.repository.findOne({ title });
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}

export { PostsRepository };