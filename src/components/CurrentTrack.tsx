import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateContext } from '../store/StateProvider';
import axios from 'axios';
import { ICurrentTrack } from '../Interface/ICurrentTrack';
import { ACTION_TYPE } from '../Interface/enums';

const CurrentTrack = () => {
  const { state, dispatch } = useStateContext();
  const { token, currentlyplaying } = state;

  useEffect(() => {
    const getCurrentTrack = async () => {
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
          }
        })
        .catch((err) => console.log(err));
    };
    getCurrentTrack();
  }, [token, dispatch]);

  console.log(currentlyplaying);

  return (
    <Container>
      {currentlyplaying && (
        <div className='track'>
          <div className='track_name'>
            <img src={currentlyplaying?.image} alt='' />
          </div>
          <div className='track_info'>
            <h4>{currentlyplaying?.name}</h4>
            <h6>{currentlyplaying?.artists.join(', ')}</h6>
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;

export default CurrentTrack;
