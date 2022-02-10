export class ApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: any;

  constructor(code: number, success: boolean, message: string, data: any) {
    this.code = code;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
