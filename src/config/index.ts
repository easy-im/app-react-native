import dev from './dev';
import prod from './prod';

type EnvType = 'local' | 'development' | 'production';
type Config = {
  appName: string;
  baseUrl: string;
  ws: {
    host: string;
    namespace: string;
  };
};

const env: EnvType = (process.env.NODE_ENV as EnvType) || 'local';

const configMap = {
  local: {},
  development: dev,
  production: prod,
};

const defaults = {
  appName: 'KitIM',
  baseUrl: 'http://10.12.164.11:8360/api',
  ws: {
    host: 'http://10.12.164.11:8360',
    namespace: 'chat',
  },
};

const config: Config = {
  ...defaults,
  ...(configMap[env] || {}),
};

export default config;
