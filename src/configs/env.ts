interface Env {
  NEXT_PUBLIC_API_SERVER_URL?: string;
  NEXT_PUBLIC_AUTH_API_URL?: string;
  NEXT_PUBLIC_DAUM_LOGIN_URL?: string;
  NEXT_PUBLIC_DAUM_LOGOUT_URL?: string;
  NEXT_PUBLIC_TENTH_HOST?: string;
  NEXT_PUBLIC_TENTH_KEY?: string;
}

const getConfig = (): Env => {
  return {
    NEXT_PUBLIC_API_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL,
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_DAUM_LOGIN_URL: process.env.NEXT_PUBLIC_DAUM_LOGIN_URL,
    NEXT_PUBLIC_DAUM_LOGOUT_URL: process.env.NEXT_PUBLIC_DAUM_LOGOUT_URL,
    NEXT_PUBLIC_TENTH_HOST: process.env.NEXT_PUBLIC_TENTH_HOST,
    NEXT_PUBLIC_TENTH_KEY: process.env.NEXT_PUBLIC_TENTH_KEY,
  };
};

const verifyConfig = (config: Env): NodeJS.ProcessEnv => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) throw new Error(`Missing key ${key} in .env`);
  }
  return config as NodeJS.ProcessEnv;
};

const config = getConfig();
export default verifyConfig(config);
