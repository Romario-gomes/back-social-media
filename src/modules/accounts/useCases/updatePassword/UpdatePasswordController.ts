import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePasswordUseCase } from "./UpdatePasswordUseCase";

class UpdatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;
    const { password } = request.body;
    const updatePasswordUseCase = container.resolve(UpdatePasswordUseCase);
    const user = await updatePasswordUseCase.execute({
      token,
      password,
    });

    return response.status(200).json({
      user,
    });
  }
}

export { UpdatePasswordController };
