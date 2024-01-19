import { useEffect } from 'react';
import { useStateContext } from '../store/StateProvider';
import axios from 'axios';
import { ACTION_TYPE } from '../Interface/enums';
import { IPlayList } from '../Interface/store';
import styled from 'styled-components';

const Playlists = () => {
  const { state, dispatch } = useStateContext();
  const { token, playlist } = state;
  const changeCurrentlyPlayingSong = (id: string) => {
    dispatch({ type: ACTION_TYPE.SET_PLAYLIST_ID, payload: id });
  };

  useEffect(() => {
    const getPlaylistData = async () => {
      await axios
        .get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const items = res.data?.items || [];
          const playlist = items.map(
            ({ name, id }: { name: string; id: string }) => {
              return { name, id };
            }
          );
          dispatch({ type: ACTION_TYPE.SET_PLAYLISTS, payload: playlist });
        })
        .catch((err) => console.log(err));
    };
    getPlaylistData();
  }, [token, dispatch]);
  return (
    <Container>
      <ul>
        {playlist.map((pl: IPlayList) => (
          <li onClick={() => changeCurrentlyPlayingSong(pl.id)} key={pl.id}>
            {pl.name}
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  ul {
    color: #9a9a9a;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`;

export default Playlists;
