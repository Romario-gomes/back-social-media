import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCommentUseCase } from "./UpdateCommentUseCase";

class UpdateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, content } = request.body;
    const updateCommentUseCase = container.resolve(UpdateCommentUseCase);

    const updatedComment = await updateCommentUseCase.execute({ id, content });

    return response.status(200).json(updatedComment);
  }
}

export { UpdateCommentController };
