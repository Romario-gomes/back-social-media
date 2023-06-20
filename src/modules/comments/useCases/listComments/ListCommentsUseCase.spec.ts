import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CommentsRepositoryInMemory } from "@modules/comments/repositories/in-memory/CommentsRepositoryInMemory";

import { ListCommentsUseCase } from "./ListCommentsUseCase";

describe("List Comments", () => {
  let commentsRepositoryInMemory: CommentsRepositoryInMemory;
  let listCommentsUseCase: ListCommentsUseCase;

  beforeEach(() => {
    commentsRepositoryInMemory = new CommentsRepositoryInMemory();
    listCommentsUseCase = new ListCommentsUseCase(commentsRepositoryInMemory);
  });

  it("Should be able to list all comments", async () => {
    await commentsRepositoryInMemory.create({
      id: "456",
      user_id: "123",
      post_id: "321",
      content: "content teste",
    });

    await commentsRepositoryInMemory.create({
      id: "132",
      user_id: "123",
      post_id: "321",
      content: "content teste",
    });

    const comments = await listCommentsUseCase.execute();
    expect(comments).toHaveLength(2);
  });
});
