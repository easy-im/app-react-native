import dev from './dev';
import prod from './prod';

type EnvType = 'local' | 'development' | 'production';
const env: EnvType = (process.env.NODE_ENV as EnvType) || 'local';

const configMap = {
  local: {},
  development: dev,
  production: prod,
};

const defaults = {
  baseUrl: 'http://192.168.2.104:8360/api',
  ws: {
    host: 'http://192.168.2.104:8360',
    namespace: 'chat',
  },
};

const config: any = {
  ...defaults,
  ...(configMap[env] || {}),
};

export default config;
