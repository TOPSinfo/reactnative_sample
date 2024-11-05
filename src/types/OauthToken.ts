export interface OauthToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
  expiresAt: number;
}
