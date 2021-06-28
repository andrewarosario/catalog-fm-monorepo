import { CONFIG } from '../../../../config';

export const environment = {
  production: true,
  lastFmKey: {
    apiPublicKey: '86c10d742e10e0fca5fee5e69612c848',
    apiSecretKey: CONFIG.LAST_FM_SECRET_PROD,
  },
};
