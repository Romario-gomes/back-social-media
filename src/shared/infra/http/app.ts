import "reflect-metadata";
import "@shared/container";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import { router } from "./routes";

const app = express();

createConnection();

app.use(cors());

app.use(express.json());

// rota padrão onde vai ficar a documentação do projeto
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
        error: err.error,
        code: err.code,
      });
    }

    return response.status(500).json({
      status: "Error",
      Message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
