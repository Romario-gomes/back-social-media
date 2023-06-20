import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostsRepositoryInMemory";

import { UpdatePostUseCase } from "./UpdatePostUseCase";

describe("Update Post", () => {
  let postsRepositoryInMemory: PostsRepositoryInMemory;
  let updatePostUseCase: UpdatePostUseCase;

  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    updatePostUseCase = new UpdatePostUseCase(postsRepositoryInMemory);
  });

  it("Should be able to update Post", async () => {
    await postsRepositoryInMemory.create({
      id: "123",
      user_id: "123",
      title: "title test",
      content: "content teste",
      midia: "midia",
      likes: 0,
    });

    const updatedPost = await updatePostUseCase.execute({
      id: "123",
      title: "title test",
      content: "content teste editado",
      midia: "midia",
      likes: 12,
    });

    expect(updatedPost.content).toEqual("content teste editado");
    expect(updatedPost.likes).toEqual(12);
  });
});
