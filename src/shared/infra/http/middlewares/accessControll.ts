import { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

let usersRepository: UsersRepository;

interface IPayload {
  email: string;
}

async function decoder(request: Request): Promise<User | undefined> {
  const usersRepository = new UsersRepository();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  const { email } = verify(token, auth.secret_token) as IPayload;

  const user = await usersRepository.findByEmailWithRolesAndPermissions(email);

  return user;
}

export function is(permission: string[]): RequestHandler {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    usersRepository = new UsersRepository();

    const user = await decoder(request);
    const { roles } = user;

    const hasPermission = roles.some(role =>
      role.permission.some(p => permission.includes(p.name)),
    );

    if (!hasPermission) {
      throw new AppError("Invalid Permission", 403);
    }
    return next();
  };
}
