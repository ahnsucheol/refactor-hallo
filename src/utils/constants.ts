export const ACCESS_TOKEN_EXPIRATION = Math.floor(Date.now() / 1000) + 60 * 15; // 15분
export const REFRESH_TOKEN_EXPIRATION = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7일

export const ACCESS_TOKEN_TYPE = 'access_token';
export const REFRESH_TOKEN_TYPE = 'refresh_token';

export const COOKIE_EXPIRATION = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7일
export const COOKIE_NAME = 'Refresh_Token_Index';
export const COOKIE_OPTIONS = {
  httpOnly: true,
  expires: COOKIE_EXPIRATION,
  encode: String,
};
