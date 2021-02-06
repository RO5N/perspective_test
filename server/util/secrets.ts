import { logger } from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
} else {
  logger.debug('Using .env.example file for configuraion');
  dotenv.config({ path: '.env.example' });
}
export const ENVIRONMENT: any = process.env.NODE_ENV || '';
//const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const JWT_SECRET: any = process.env['JWT_SECRET'];

export const AWS_ACCESS: any = process.env['AWS_ACCESS'];
export const AWS_SECRET: any = process.env['AWS_SECRET'];
export const S3_BUCKET: any = process.env['S3_BUCKET'];
export const S3_BUCKET_PUBLIC: any = process.env['S3_BUCKET_PUBLIC'];
export const S3_BUCKET_PUBLIC_ROOT: any = process.env['S3_BUCKET_PUBLIC_ROOT'];
export const MYSQL_HOST: any = process.env['MYSQL_HOST'];
export const MYSQL_USER: any = process.env['MYSQL_USER'];
export const MYSQL_PASSWORD: any = process.env['MYSQL_PASSWORD'];
export const MYSQL_DATABASE: any = process.env['MYSQL_DATABASE'];

export const MAIL_NO_REPLY: any = process.env['MAIL_USERNAME_NO_REPLY'];

if (!JWT_SECRET) {
  logger.error('No client secret. Set JWT_SECRET environment variable.');
  process.exit(1);
}
