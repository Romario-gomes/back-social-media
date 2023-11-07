import { ICreatePostDTO } from "../dtos/ICreatePost";
import { Post } from "../infra/typeorm/entities/Post";

interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  findById(id: string): Promise<Post>;
  list(): Promise<Post[]>;
  delete(id: string): Promise<void>;
}

export { IPostsRepository };
