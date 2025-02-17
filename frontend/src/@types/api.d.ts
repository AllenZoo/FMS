interface RestResult<T> {
  data: T;
  message: string;
  resultCode: number;
  status: string;
}
