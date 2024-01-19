import { useState } from 'react';
import styled from 'styled-components';
import { useStateContext } from '../store/StateProvider';
import axios from 'axios';

const VolumeControls = () => {
  const { state, dispatch } = useStateContext();
  const { token } = state;

  const setVolume = async (e: any) => {
    await axios
      .put(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`,
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
  };

  return (
    <Container>
      <input
        type='range'
        name='volume'
        min={0}
        max={100}
        onMouseUp={(e) => setVolume(e)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
export default VolumeControls;
