import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostsRepositoryInMemory";

import { ListPostsUseCase } from "./ListPostsUseCase";

describe("List Comments", () => {
  let postsRepositoryInMemory: PostsRepositoryInMemory;
  let listPostsUseCase: ListPostsUseCase;

  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    listPostsUseCase = new ListPostsUseCase(postsRepositoryInMemory);
  });

  it("Should be able to list all Posts", async () => {
    await postsRepositoryInMemory.create({
      user_id: "123",
      title: "title test",
      content: "content teste",
      midia: "midia",
      likes: 0,
    });

    await postsRepositoryInMemory.create({
      user_id: "123",
      title: "title test",
      content: "content teste",
      midia: "midia",
      likes: 0,
    });

    const posts = await listPostsUseCase.execute();
    expect(posts).toHaveLength(2);
  });
});
