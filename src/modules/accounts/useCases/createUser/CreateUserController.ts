import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role } = request.body as ICreateUserDTO;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user = await createUserUseCase.execute({
      name,
      email,
      role,
      password,
    });
    console.log(user.role)
    return response.status(201).json(user);
  }
}

export { CreateUserController };

