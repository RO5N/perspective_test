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

export const MYSQL_HOST: any = process.env['MYSQL_HOST'];
export const MYSQL_USER: any = process.env['MYSQL_USER'];
export const MYSQL_PASSWORD: any = process.env['MYSQL_PASSWORD'];
export const MYSQL_DATABASE: any = process.env['MYSQL_DATABASE'];
