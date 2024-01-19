import { ICurrentTrack } from './ICurrentTrack';
import { IUser } from './IUser';

export interface IStoreAction {
  type: any;
  payload: any;
}

export interface IStoreContext {
  state: any;
  dispatch: (action: IStoreAction) => void;
}

export interface IPlayList {
  name: string;
  id: string;
}

export interface IState {
  token: string | null;
  playlist: IPlayList[];
  userInfo: IUser;
  playerState: boolean;
  currentlyplaying: ICurrentTrack | null;
  selectedPlaylistId: string | null;
}
