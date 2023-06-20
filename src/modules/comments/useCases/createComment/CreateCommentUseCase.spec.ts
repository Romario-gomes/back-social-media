import { CommentsRepositoryInMemory } from "@modules/comments/repositories/in-memory/CommentsRepositoryInMemory";

import { CreateCommentUseCase } from "./CreateCommentUseCase";

describe("Create Comment", () => {
  let commentsRepositoryInMemory: CommentsRepositoryInMemory;
  let createCommentUseCase: CreateCommentUseCase;

  beforeEach(() => {
    commentsRepositoryInMemory = new CommentsRepositoryInMemory();
    createCommentUseCase = new CreateCommentUseCase(commentsRepositoryInMemory);
  });

  it("Should be able to create a new Comment", async () => {
    const comment = {
      user_id: "123",
      post_id: "321",
      content: "content teste",
    };

    const commentCreated = await createCommentUseCase.execute(comment);

    expect(commentCreated).toHaveProperty("id");
    expect(commentCreated.user_id).toEqual(comment.user_id);
  });
});
