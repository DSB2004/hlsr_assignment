export enum TokenType {
  ACCESS = "access",
  REFRESH = "refresh",
  VERIFICATION = "verification",
  PASSWORD = "password",
}

export interface DecodedToken {
  email: string;
  authId: string;
}
