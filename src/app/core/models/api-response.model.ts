export interface IApiResponse {
  Success: boolean;
  Message: string | undefined;
  Data: any;
  Errors: any;
}
