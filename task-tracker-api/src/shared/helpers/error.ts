/* eslint-disable @typescript-eslint/no-namespace */
export class BaseError<T> extends Error {
  statusCode: number;
  message: string;
  data: T | null;
  constructor(message: string, statusCode = 500, data: T | null = null) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class NotFoundError<T> extends BaseError<T> {
  constructor(message: string, data?: T) {
    super(message, 404, data);
  }
}

export class BadRequestError<T> extends BaseError<T> {
  constructor(message: string, data?: T) {
    super(message, 400, data);
  }
}

export class UnauthorizedError<T> extends BaseError<T> {
  constructor(message: string, data?: T) {
    super(message, 401, data);
  }
}
