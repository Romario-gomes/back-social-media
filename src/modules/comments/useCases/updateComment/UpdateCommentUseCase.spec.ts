import { CommentsRepositoryInMemory } from "@modules/comments/repositories/in-memory/CommentsRepositoryInMemory";

import { UpdateCommentUseCase } from "./UpdateCommentUseCase";

describe("Update Comment", () => {
  let commentsRepositoryInMemory: CommentsRepositoryInMemory;
  let updateCommentUseCase: UpdateCommentUseCase;

  beforeEach(() => {
    commentsRepositoryInMemory = new CommentsRepositoryInMemory();
    updateCommentUseCase = new UpdateCommentUseCase(commentsRepositoryInMemory);
  });

  it("Should be able to update comment", async () => {
    await commentsRepositoryInMemory.create({
      id: "456",
      user_id: "123",
      post_id: "321",
      content: "content teste",
    });

    const updatedComment = await updateCommentUseCase.execute({
      id: "456",
      content: "content teste editado",
    });

    expect(updatedComment.content).toEqual("content teste editado");
  });
});
