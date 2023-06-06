import { ICreatePostDTO } from "../dtos/ICreatePost";
import { Post } from "../infra/typeorm/entities/Post";

interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  findById(id: string): Promise<Post>;
  findByName(title: string): Promise<Post>;

  delete(id: string): Promise<void>;
}

export { IPostsRepository };
