import styled from 'styled-components';
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from 'react-icons/bs';

import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import { useStateContext } from '../store/StateProvider';
import { ACTION_TYPE } from '../Interface/enums';
import axios from 'axios';

const PlayerControls = () => {
  const { state, dispatch } = useStateContext();
  const { token, playerState } = state;

  const changePlayerState = async () => {
    const state = playerState ? 'pause' : 'play';

    await axios
      .put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => console.log(err));

    dispatch({ type: ACTION_TYPE.SET_PLAYER_STATE, payload: !playerState });
  };

  const changeTrack = async (op: 'next' | 'previous') => {
    await axios
      .post(
        `https://api.spotify.com/v1/me/player/${op}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => console.log(err));

    await axios
      .get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        if (res.data !== '') {
          const { item } = res.data;
          dispatch({
            type: ACTION_TYPE.SET_CURRENTLY_PLAYING,
            payload: {
              id: item.id,
              name: item.name,
              artists: item.artists.map(({ name }: { name: string }) => name),
              image: item.album.images[2].url,
            },
          });
        } else {
          dispatch({ type: ACTION_TYPE.SET_CURRENTLY_PLAYING, payload: null });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <div className='shuffle'>
        <BsShuffle />
      </div>
      <div className='previous' onClick={() => changeTrack('previous')}>
        <CgPlayTrackPrev />
      </div>
      <div className='state' onClick={changePlayerState}>
        {playerState ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
      </div>
      <div className='next' onClick={() => changeTrack('next')}>
        <CgPlayTrackNext />
      </div>
      <div className='repeat'>
        <FiRepeat />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
`;

export default PlayerControls;
