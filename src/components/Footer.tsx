import styled from 'styled-components';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import VolumeControls from './VolumeControls';

const Footer = () => {
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
      <VolumeControls />
    </Container>
  );
};

const Container = styled.div`
  background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

export default Footer;
