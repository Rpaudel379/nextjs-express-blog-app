export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  public errors?: object;

  constructor(message: string, statusCode: number, errors?: object) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "failed" : "error";
    this.isOperational = true;
    this.errors = errors;
    // Capture the stack trace but exclude the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}
