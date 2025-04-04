import * as process from 'node:process';

export class Environment {
  static readonly DB_HOST?: string = process.env.DB_HOST;
  static readonly DB_PORT?: number = Number(process.env.DB_PORT);
  static readonly DB_USERNAME?: string = process.env.DB_USERNAME;
  static readonly DB_PASSWORD?: string = process.env.DB_PASSWORD;
  static readonly DB_NAME?: string = process.env.DB_NAME;
}
