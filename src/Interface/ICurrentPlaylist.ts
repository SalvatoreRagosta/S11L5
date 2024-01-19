import { ITrack } from './ITrack';

export interface ICurrentPlaylist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: ITrack[];
}
