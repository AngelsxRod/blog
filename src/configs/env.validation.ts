import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
  IsBoolean,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Testing = 'testing',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  APP_NAME: string;

  @IsString()
  APP_VERSION: string;

  @IsNumber()
  APP_PORT: number;

  @IsString()
  APP_HOST: string;

  @IsString()
  DB_URI: string;

  @IsString()
  DB_NAME: string;

  @IsNumber()
  BCRYPT_ROUNDS: number;

  @IsBoolean()
  SWAGGER_ENABLED: boolean;

  @IsString()
  SWAGGER_PATH: string;

  @IsBoolean()
  CORS_ENABLED: boolean;

  @IsString()
  CORS_ORIGIN: string;

  @IsBoolean()
  RATE_LIMIT_ENABLED: boolean;

  @IsNumber()
  RATE_LIMIT_MAX: number;

  @IsNumber()
  RATE_LIMIT_WINDOW_MS: number;

  @IsString()
  LOG_LEVEL: string;

  @IsNumber()
  REQUEST_TIMEOUT: number;

  @IsString()
  MAX_REQUEST_SIZE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
