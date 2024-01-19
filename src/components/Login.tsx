import styled from 'styled-components';
import Spotify_Logo_CMYK_Black from '../images/Spotify_Logo_CMYK_Black.png';
const Login = () => {
  const handleLogin = () => {
    const clientID = '1ec8c7602ff04446a4cbe04aaec3e543';
    const redirectURL = 'http://localhost:3000';
    const apiURL = 'https://accounts.spotify.com/authorize';
    const scope = [
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-email',
      'user-read-private',
      'user-read-playback-position',
      'user-top-read',
      'user-read-recently-played',
    ];
    window.location.href = `${apiURL}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope.join(
      ' '
    )}&response_type=token&show_daialog=true`;
    console.log('handleClick');
  };
  return (
    <Container>
      <img src={Spotify_Logo_CMYK_Black} alt='Spotify Logo' />
      <button onClick={handleLogin}>ACCEDI CON SPOTIFY</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 2rem;
    border-radius: 5px;
    border: none;
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

export default Login;
