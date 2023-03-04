import { Injectable } from '@nestjs/common';
import * as customEnv from 'custom-env';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'dev';
const customEnvName = process.env.DOT_ENV_SUFFIX ?? process.env.NODE_ENV;
console.log('Using NODE_ENV: ' + process.env.NODE_ENV);
console.log('Using customEnvName: ' + customEnvName);
customEnv.env(customEnvName);
const _process = { env: process.env };
process.env = {};

@Injectable()
export class ConfigService {
  // USER
  PASSWORD_SALT = parseInt(_process.env.PASSWORD_SALT ?? '10', 10);
  REFRESH_SECRET = _process.env.REFRESH_SECRET ?? 'tinhngo';
  REFRESH_TOKEN_EXP = _process.env.REFRESH_TOKEN_EXP ?? '1d';
  ACCESS_SECRET = _process.env.ACCESS_SECRET ?? 'access_code';
  ACCESS_TOKEN_EXP = _process.env.ACCESS_TOKEN_EXP ?? '2d';
}
export const config = new ConfigService();
