import { sign } from "jsonwebtoken";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

describe("Refresh Token", () => {
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let dayjsDateProvider: DayjsDateProvider;
  let refreshTokenUseCase: RefreshTokenUseCase;
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      usersRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it("Should be able to refresh a token already exists", async () => {
    // Crie um usuário fictício para simular a existência do token de atualização
    const user = await usersRepositoryInMemory.create({
      name: "teste",
      email: "email@teste.com",
      password: "12312",
      roles: [],
    });
    const refreshToken = sign(
      { sub: user.id, email: user.email },
      process.env.TEST_SECRET_KEY,
      {
        expiresIn: "10s",
      },
    );
    await usersTokensRepositoryInMemory.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_date: new Date(),
    });

    const response = await refreshTokenUseCase.execute(refreshToken);

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("refreshToken");
    const userToken =
      await usersTokensRepositoryInMemory.findByUserIdAndRefreshToken(
        user.id,
        refreshToken,
      );
    expect(userToken).toBeUndefined();
  });
});
