import { ACTION_TYPE } from '../Interface/enums';
import { IState } from '../Interface/store';

export const initialState: IState = {
  token: null,
  playlist: [],
  userInfo: {
    userId: '',
    userName: '',
  },
  playerState: false,
  currentlyplaying: null,
  selectedPlaylistId: null,
};

export const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ACTION_TYPE.SET_PLAYLISTS:
      return {
        ...state,
        playlist: action.payload,
      };
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };

    case ACTION_TYPE.SET_CURRENTLY_PLAYING:
      console.log(action.payload);
      return {
        ...state,
        currentlyplaying: action.payload,
      };
    case ACTION_TYPE.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.payload,
      };
    case ACTION_TYPE.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
