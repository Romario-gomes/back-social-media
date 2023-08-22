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
    // Gere um token de atualização para o usuário fictício
    const refreshToken = sign(
      { sub: user.id, email: user.email },
      "aa6ee63048ffd029aa16ed6a2cd65f39",
      {
        expiresIn: "10s", // Defina um tempo de expiração adequado para o token de atualização
      },
    );
    await usersTokensRepositoryInMemory.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_date: new Date(),
    });

    // Execute o caso de uso para atualizar o token
    const response = await refreshTokenUseCase.execute(refreshToken);

    // Verifique se o novo token e o token de atualização foram gerados corretamente
    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("refreshToken");

    // Outros testes que você possa querer realizar, dependendo dos requisitos da sua aplicação
    // ...

    // Você também pode verificar se o token de atualização foi removido do repositório, se necessário
    const userToken =
      await usersTokensRepositoryInMemory.findByUserIdAndRefreshToken(
        user.id,
        refreshToken,
      );
    expect(userToken).toBeUndefined();
  });
});
