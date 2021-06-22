interface LastFmSession {
  name: string;
  key: string;
}

export interface LastFmAuthResponse {
  session: LastFmSession;
}
