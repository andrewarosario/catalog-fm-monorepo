import { LastFmHttpParams } from '@/api/models/last-fm-http-params';
import { LastFmMethod } from '@/api/enums/last-fm-method';

export const MOCK_LAST_FM_HTTP_PARAMS: LastFmHttpParams = {
  method: LastFmMethod.AuthGetSession,
  data: { key: 'value' },
};
