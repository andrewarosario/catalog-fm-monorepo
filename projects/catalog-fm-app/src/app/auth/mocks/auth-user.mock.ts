import { MOCK_LAST_FM_AUTH_RESPONSE } from 'last-fm';
import { AuthUser } from '../models/auth-user';

export const mockAuthUser = (): AuthUser => ({ lastFmSession: MOCK_LAST_FM_AUTH_RESPONSE.session });
