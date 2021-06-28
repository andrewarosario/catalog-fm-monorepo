import { CONFIG } from '../../../../config';

export const environment = {
  production: false,
  lastFmKey: {
    apiPublicKey: 'ace63c61153c7d8bc456af3f054b8df4',
    apiSecretKey: CONFIG.LAST_FM_SECRET_DEV,
  },
};
