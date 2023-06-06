import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePostUseCase } from "./UpdatePostUseCase";

class UpdatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, content, midia } = request.body;

    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    const postUpdated = await updatePostUseCase.execute({
      id,
      title,
      content,
      midia,
    });

    return response.status(200).json(postUpdated);
  }
}

export { UpdatePostController };
