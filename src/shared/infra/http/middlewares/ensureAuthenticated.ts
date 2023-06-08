import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import auth from "../../../../config/auth";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

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

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const user = await decoder(request);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    const rolesName = user.roles.map(role => role.name);

    request.user = {
      id: user.id,
      roles: rolesName,
      permissions: user.roles.flatMap(role => role.permission.map(p => p.name)),
    };
    /* const existsRoles = userRoles?.some(r => role.includes(r)); */

    /* if (existsRoles) {
      return next();
    } */

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError("token.expired", 401);
    } else if (error instanceof JsonWebTokenError) {
      throw new AppError("Invalid JWT token", 401);
    } else {
      throw new AppError("Unexpected error", 500);
    }
  }
}

export function ensureAuthorized(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const userRoles = request.user.roles;

    const hasPermission = roles.some(role => userRoles.includes(role));
    if (!hasPermission) {
      throw new AppError("Unauthorized", 403);
    }

    next();
  };
}

export function ensurePermission(permission: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const user = await decoder(request);
    const { roles } = user;
    /* const { permissions } = request.user; */
    console.log("parametro: ", permission);
    console.log("User: ", user);
    /* console.log("Permissões: ", permissions); */
    /* const hasPermission = permission.some(permission =>
      permissions.includes(permission),
    ); */

    const hasPermission = roles.some(role =>
      role.permission.some(p => permission.includes(p.name)),
    );

    if (!hasPermission) {
      throw new AppError("Invalid Permission", 403);
    }
    return next();
  };
}
