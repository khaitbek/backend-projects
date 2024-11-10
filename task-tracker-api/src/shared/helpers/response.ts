export class BaseResponse<T> {
  data: T;
  status: number;
  message: string;
}

export class SuccessResponse<T> extends BaseResponse<T> {
  constructor(data: T) {
    super();
    this.data = data;
    this.status = 200;
    this.message = "Success";
  }
}
