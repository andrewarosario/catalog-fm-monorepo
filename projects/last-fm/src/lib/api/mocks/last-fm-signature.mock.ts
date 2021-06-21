import { MOCK_LAST_FM_HTTP_PARAMS } from './last-fm-http-params.mock';
import { MOCK_LAST_FM_KEY } from './last-fm-key.mock';

export const MOCK_LAST_FM_SIGNATURE = {
  api_key: MOCK_LAST_FM_KEY.apiPublicKey,
  api_sig: 'hashed',
  key: MOCK_LAST_FM_HTTP_PARAMS.data?.key,
  method: MOCK_LAST_FM_HTTP_PARAMS.method,
};
