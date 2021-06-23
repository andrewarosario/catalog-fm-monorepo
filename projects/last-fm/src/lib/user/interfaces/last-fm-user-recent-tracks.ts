import { Observable } from 'rxjs';
import { LastFmUserRecentTracksResponse } from '../models/last-fm-user-recent-tracks-response';

type UserRecentTracksParams = {
  user: string;
  limit: string;
  page: string;
};

export interface LastFmUserRecentTracks {
  getRecentTracks(params: UserRecentTracksParams): Observable<LastFmUserRecentTracksResponse>;
}
