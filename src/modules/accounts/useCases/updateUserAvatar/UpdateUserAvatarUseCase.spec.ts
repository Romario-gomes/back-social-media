import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

describe("Upload Avatar", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      usersRepositoryInMemory,
    );
  });

  it("Should be able to upload a new avatar image", async () => {
    const userTest = await usersRepositoryInMemory.create({
      name: "teste1",
      email: "email1@teste.com",
      password: "12312",
      roles: [],
    });

    await updateUserAvatarUseCase.execute({
      user_id: userTest.id,
      avatar_file: "file-test-name",
    });
    expect(userTest).toHaveProperty("avatar");
    expect(userTest.avatar).not.toBeNull();
    expect(userTest.avatar).toEqual("file-test-name");
  });
});
