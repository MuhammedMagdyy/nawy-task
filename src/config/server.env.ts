import env from './env';

export const nodeEnv = env('NODE_ENV');
export const port = env('PORT');
export const accessTokenSecret = env('ACCESS_TOKEN_SECRET');
export const refreshTokenSecret = env('REFRESH_TOKEN_SECRET');
export const accessTokenExpiry = env('ACCESS_TOKEN_EXPIRY');
export const refreshTokenExpiry = env('REFRESH_TOKEN_EXPIRY');
