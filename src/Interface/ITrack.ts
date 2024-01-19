export interface ITrack {
  id: string;
  name: string;
  artists: string[];
  image: string;
  duration: number;
  album: string;
  context_uri: string;
  track_number: number;
}
