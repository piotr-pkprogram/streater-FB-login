export interface ReactFacebookFailureResponse {
  status?: string | undefined;
}

export interface ReactFacebookLoginInfo {
  id: string;
  userID: string;
  accessToken: string;
  expiresIn: number;
  data_access_expiration_time: number;
  name?: string | undefined;
  email?: string | undefined;
  picture?:
    | {
        data: {
          height?: number | undefined;
          is_silhouette?: boolean | undefined;
          url?: string | undefined;
          width?: number | undefined;
        };
      }
    | undefined;
}
