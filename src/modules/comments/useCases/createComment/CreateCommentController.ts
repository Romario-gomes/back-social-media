import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCommentUseCase } from "./CreateCommentUseCase";

class CreateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, content } = request.body;
    const { id } = request.params;

    const createCommentUseCase = container.resolve(CreateCommentUseCase);

    const comment = await createCommentUseCase.execute({
      user_id,
      post_id: id,
      content,
    });

    return response.status(201).json(comment);
  }
}

export { CreateCommentController };
