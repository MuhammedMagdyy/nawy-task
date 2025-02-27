import { sign, verify, Secret } from 'jsonwebtoken';
import { JwtType } from '../types';
import { IJwtPayload } from '../interfaces';
import {
  accessTokenSecret,
  accessTokenExpiry,
  refreshTokenSecret,
  refreshTokenExpiry,
} from '../config';

export class JwtService {
  static generateTokens(payload: IJwtPayload) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  static generateAccessToken({
    exp: _exp,
    iat: _iat,
    ...payload
  }: IJwtPayload) {
    return sign(payload, accessTokenSecret as Secret, {
      expiresIn: accessTokenExpiry as unknown as number,
    });
  }

  static generateRefreshToken({
    exp: _exp,
    iat: _iat,
    ...payload
  }: IJwtPayload) {
    return sign(payload, refreshTokenSecret as Secret, {
      expiresIn: refreshTokenExpiry as unknown as number,
    });
  }

  static verifyToken(token: string, type: JwtType) {
    const secret = type === 'access' ? accessTokenSecret : refreshTokenSecret;

    return verify(token, secret) as IJwtPayload;
  }
}
