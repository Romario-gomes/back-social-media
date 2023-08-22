import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendEmailUpdatePasswordUseCase } from "./SendEmailUpdatePasswordUseCase";

class SendEmailUpdatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, url } = request.body;
    const sendEmailUpdatePasswordUseCase = container.resolve(
      SendEmailUpdatePasswordUseCase,
    );

    await sendEmailUpdatePasswordUseCase.execute({
      email,
      url,
    });

    return response.status(201).send();
  }
}

export { SendEmailUpdatePasswordController };
