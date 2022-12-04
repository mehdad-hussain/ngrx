export interface IApiResponse {
  Success: boolean;
  Message: string | undefined;
  Data: any;
  TotalCount: number;
  Errors: any;
}
