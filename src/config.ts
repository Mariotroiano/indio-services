interface EnvVariables {
  MODE: string;
  BASE_URL: string;
  BASE_URL_V2: string;
  USE_COGNITO: boolean;
  FEATURE_ACTIVITY_LOG: boolean;
}

const env: EnvVariables = {
  MODE: process.env.NODE_ENV || 'development', 
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  BASE_URL_V2: process.env.BASE_URL_V2 || '',
  USE_COGNITO: process.env.USE_COGNITO === 'true',
  FEATURE_ACTIVITY_LOG: process.env.FEATURE_ACTIVITY_LOG === 'true',
};

const isDev = (env.MODE === 'development');
const baseUrl = isDev ? '/api/v1' : `${env.BASE_URL}/api/v1`;
const baseUrlV2 = env.BASE_URL_V2;

const CONSTANTS = {
  USE_COGNITO: env.USE_COGNITO,
  ACTIVITY_LOG: env.FEATURE_ACTIVITY_LOG,
};

export {
  isDev,
  baseUrl,
  baseUrlV2,
  CONSTANTS,
};
