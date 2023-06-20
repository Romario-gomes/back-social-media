import { CommentsRepositoryInMemory } from "@modules/comments/repositories/in-memory/CommentsRepositoryInMemory";

import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

describe("Create Comment", () => {
  let commentsRepositoryInMemory: CommentsRepositoryInMemory;
  let deleteCommentUseCase: DeleteCommentUseCase;

  beforeEach(() => {
    commentsRepositoryInMemory = new CommentsRepositoryInMemory();
    deleteCommentUseCase = new DeleteCommentUseCase(commentsRepositoryInMemory);
  });

  it("Should be able to create a new Comment", async () => {
    const comment = await commentsRepositoryInMemory.create({
      id: "456",
      user_id: "123",
      post_id: "321",
      content: "content teste",
    });
    await deleteCommentUseCase.execute(comment.id);
    const getComment = await commentsRepositoryInMemory.findById(comment.id);
    expect(getComment).toBe(undefined);
  });
});
