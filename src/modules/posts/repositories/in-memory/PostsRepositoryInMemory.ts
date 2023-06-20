import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePost";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";

import { IPostsRepository } from "../IPostsRepository";

class PostsRepositoryInMemory implements IPostsRepository {
  posts: Post[] = [];

  async create({
    id,
    user_id,
    title,
    content,
    midia,
    likes,
  }: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, {
      id,
      user_id,
      title,
      content,
      midia,
      likes,
    });

    this.posts.push(post);

    return post;
  }
  async findById(id: string): Promise<Post> {
    return this.posts.find(post => post.id === id);
  }
  async findByTitle(title: string): Promise<Post> {
    return this.posts.find(post => post.title === title);
  }
  async list(): Promise<Post[]> {
    return this.posts;
  }
  async delete(id: string): Promise<void> {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
      this.posts.splice(postIndex, 1);
    }
  }
}

export { PostsRepositoryInMemory };
