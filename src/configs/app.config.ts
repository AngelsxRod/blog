export const appConfig = () => ({
  app: {
    name: process.env.APP_NAME || 'TodoList',
    version: process.env.APP_VERSION || '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.APP_PORT || '3000', 10),
    host: process.env.APP_HOST || 'localhost',
  },
  database: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/blog',
    name: process.env.DB_NAME || 'blog',
  },
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
    path: process.env.SWAGGER_PATH || '/api',
  },
  cors: {
    enabled: process.env.CORS_ENABLED === 'true',
    origins: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  },
  rateLimit: {
    enabled: process.env.RATE_LIMIT_ENABLED === 'true',
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  server: {
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || '30000', 10),
    maxRequestSize: process.env.MAX_REQUEST_SIZE || '10mb',
  },
});
