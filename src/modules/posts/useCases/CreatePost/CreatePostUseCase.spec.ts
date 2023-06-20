import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostsRepositoryInMemory";

import { CreatePostUseCase } from "./CreatePostUseCase";

describe("Create Post", () => {
  let postsRepositoryInMemory: PostsRepositoryInMemory;
  let createPostUseCase: CreatePostUseCase;

  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
  });

  it("Should be able to create a new Comment", async () => {
    const post = {
      user_id: "123",
      title: "title test",
      content: "content teste",
      midia: "midia",
      likes: 0,
    };

    const commentCreated = await createPostUseCase.execute(post);

    expect(commentCreated).toHaveProperty("id");
    expect(commentCreated.user_id).toEqual(post.user_id);
  });
});
