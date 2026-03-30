export class ApiResponse<T> {
  succeeded: boolean;
  message?: string | null;
  data?: T | null;

  constructor(data?: T | null, message?: string | null) {
    this.succeeded = true;
    this.message = message ?? null;
    this.data = data ?? null;
  }
}
