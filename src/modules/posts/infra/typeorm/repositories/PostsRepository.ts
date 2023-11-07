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
    content,
    midia,
    title,
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

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async list(): Promise<Post[]> {
    const posts = await this.repository.find({
      relations: ["comments"],
      order: {
        created_at: "DESC",
      },
    });

    return posts;
  }
}

export { PostsRepository };
