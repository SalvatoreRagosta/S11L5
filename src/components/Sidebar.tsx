import styled from 'styled-components';
import Spotify_Logo_CMYK_White from '../images/Spotify_Logo_CMYK_White.png';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import { IoLibrary } from 'react-icons/io5';
import Playlists from './Playlists';

const Sidebar = () => {
  return (
    <Container>
      <div className='top_links'>
        <div className='logo'>
          <img src={Spotify_Logo_CMYK_White} alt='Spotify Logo' />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Cerca</span>
          </li>
          <li>
            <IoLibrary />
            <span>La Tua Libreria</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  color: #bebebe3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top_links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      color: #9a9a9a;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
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
  }
`;

export default Sidebar;
