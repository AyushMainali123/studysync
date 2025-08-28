export type TGoogleTokensResult = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
};

export type TGoogleUserInfo = {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export type TAccessTokenResult = {
  access_token: string;
  issued_token_type: string;
  token_type: string;
  expires_in: number;
  access_boundary_session_key: string;
};
