import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostsRepositoryInMemory";

import { DeletePostUseCase } from "./DeletePostUseCase";

describe("Delete Post", () => {
  let postsRepositoryInMemory: PostsRepositoryInMemory;
  let deletePostUseCase: DeletePostUseCase;

  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    deletePostUseCase = new DeletePostUseCase(postsRepositoryInMemory);
  });

  it("Should be able to create a new Post", async () => {
    const post = await postsRepositoryInMemory.create({
      id: "123",
      user_id: "123",
      title: "title test",
      content: "content teste",
      midia: "midia",
      likes: 0,
    });
    await deletePostUseCase.execute(post.id);
    const getPost = await postsRepositoryInMemory.findById(post.id);
    expect(getPost).toBe(undefined);
  });
});
