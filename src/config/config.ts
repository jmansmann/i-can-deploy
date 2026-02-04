import dotenv from 'dotenv';

// Load .env file only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

/**
 * Retrieves an environment variable, throwing an error if it's required but not set.
 */
function getEnvVar(key: string, required: boolean = true, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value || '';
}

/**
 * Parse a boolean environment variable
 */
function getBooleanEnvVar(key: string, defaultValue: boolean = false): boolean {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Parse a number environment variable
 */
function getNumberEnvVar(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Invalid number for environment variable ${key}: ${value}`);
  }
  return parsed;
}

/**
 * Application configuration
 * All configuration should be read from environment variables
 */
export const config = {
  // Application
  nodeEnv: getEnvVar('NODE_ENV', false, 'development'),
  port: getNumberEnvVar('PORT', 3000),
  logLevel: getEnvVar('LOG_LEVEL', false, 'info'),
  
  // Database (example)
  database: {
    host: getEnvVar('DB_HOST', false, 'localhost'),
    port: getNumberEnvVar('DB_PORT', 5432),
    name: getEnvVar('DB_NAME', true),
    user: getEnvVar('DB_USER', true),
    password: getEnvVar('DB_PASSWORD', true),
    ssl: getBooleanEnvVar('DB_SSL', false),
  },
  
  // API Keys / Secrets (example)
  apiKey: getEnvVar('API_KEY', false),
  
  // Feature Flags (example)
  features: {
    enableNewFeature: getBooleanEnvVar('FEATURE_NEW_FEATURE', false),
  },
} as const;

// Validate config on startup
export function validateConfig(): void {
  // Add any additional validation logic here
  console.log('Configuration validated successfully');
}
