export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly error: boolean;

  public readonly code: string;

  constructor(message: string, statusCode = 400, code = "unexpected.error") {
    this.message = message;
    this.statusCode = statusCode;
    this.error = true;
    this.code = code;
  }
}
