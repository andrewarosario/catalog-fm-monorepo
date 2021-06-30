import { LastFmSession } from 'last-fm';

export type AuthLastFmSession = LastFmSession;

export interface AuthUser {
  lastFmSession: AuthLastFmSession;
}
