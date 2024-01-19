import { useEffect } from 'react';
import { useStateContext } from '../store/StateProvider';
import axios from 'axios';
import { ACTION_TYPE } from '../Interface/enums';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

const Navbar = ({ navBackground }: { navBackground: boolean }) => {
  const { state, dispatch } = useStateContext();
  const { token, userInfo } = state;
  useEffect(() => {
    const getUserInfo = async () => {
      await axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          dispatch({
            type: ACTION_TYPE.SET_USER,
            payload: {
              userId: res.data.id,
              userName: res.data.display_name,
            },
          });
        })
        .catch((err) => console.log(err));
    };
    getUserInfo();
  }, [token, dispatch]);
  return (
    <Container navBackground={navBackground}>
      <div className='search_bar'>
        <FaSearch />
        <input type='text' placeholder='Artisti, canzoni, o podcasts' />
      </div>
      <div className='avatar'>
        <a href='#'>
          <CgProfile />
          <span>{userInfo.userName}</span>
        </a>
      </div>
    </Container>
  );
};

const Container = styled.div<{ navBackground: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? 'rgba(0,0,0,0.7)' : 'none'};
  .search_bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: white;
      gap: 0.5rem;
      font-weight: bold;
      svg {
        font-size: 1.25rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;

export default Navbar;
