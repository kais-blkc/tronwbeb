import { Request, Response } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true,
    public details?: any,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
) => {
  // Логирование ошибки (можно подключить Winston)
  console.error(`[ERROR] ${err.message}`, {
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: err.stack,
  });

  // Обработка AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details,
    });
  }

  // Неизвестные ошибки (500)
  res.status(500).json({
    status: 'error',
    message: 'Внутренняя ошибка сервера',
  });
};
