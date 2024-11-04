export class ApiError extends Error {
  public statusCode: number;
  public status: string;

  constructor(message: string, status: string, statusCode: number) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    // Capture the stack trace but exclude the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}
