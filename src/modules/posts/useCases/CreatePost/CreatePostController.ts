import { Request, Response } from "express";

class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.status(201).json({ message: "Controller" });
  }
}

export { CreatePostController };
