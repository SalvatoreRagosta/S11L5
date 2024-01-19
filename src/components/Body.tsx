import styled from 'styled-components';
import { AiFillClockCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useStateContext } from '../store/StateProvider';
import axios from 'axios';
import { ICurrentPlaylist } from '../Interface/ICurrentPlaylist';
import { ITrack } from '../Interface/ITrack';
import { ACTION_TYPE } from '../Interface/enums';

const Body = ({ bodyBackground }: { bodyBackground: boolean }) => {
  const [currentPlaylist, setCurrentPlaylist] =
    useState<ICurrentPlaylist | null>(null);
  const { state, dispatch } = useStateContext();
  const { token, selectedPlaylistId } = state;

  const convertTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const playTrack = async (track: ITrack) => {
    await axios
      .put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: track.context_uri,
          offeset: {
            position: track.track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res: any) => {
        if (res.status === 204) {
          const { id, name, artists, image } = track;
          const currentlyPlaying = {
            id,
            name,
            artists,
            image,
          };
          dispatch({
            type: ACTION_TYPE.SET_CURRENTLY_PLAYING,
            payload: currentlyPlaying,
          });
          dispatch({ type: ACTION_TYPE.SET_PLAYER_STATE, payload: true });
        } else {
          dispatch({ type: ACTION_TYPE.SET_PLAYER_STATE, payload: true });
        }
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    const getFirstPlaylist = async () => {
      await axios
        .get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const { id, name, description } = res.data;
          let trackItems = res.data.tracks.items;
          const selectedPlaylist: ICurrentPlaylist = {
            id,
            name,
            description,
            image: res.data.images[0].url,
            tracks: trackItems.map(({ track }: { track: any }) => ({
              id: track.id,
              name: track.name,
              artists: track.artists.map(({ name }: { name: string }) => name),
              image: track.album.images[2].url,
              duration: track.duration_ms,
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
            })),
          };
          setCurrentPlaylist(selectedPlaylist);
        })
        .catch((err) => console.log(err));
    };
    if (selectedPlaylistId) {
      getFirstPlaylist();
    }
  }, [token, selectedPlaylistId]);

  return (
    <Container bodyBackground={bodyBackground}>
      <div className='playlist'>
        <div className='image'>
          <img src={currentPlaylist?.image} alt='playlist image' />
        </div>
        <div className='details'>
          <span className='type'>PLAYLIST</span>
          <h1 className='title'>{currentPlaylist?.name}</h1>
          <p className='description'>{currentPlaylist?.description}</p>
        </div>
      </div>
      <div className='list'>
        <div className='header_row'>
          <div className='col'>
            <span>#</span>
          </div>
          <div className='col'>
            <span>TITLE</span>
          </div>
          <div className='col'>
            <span>ALBUM</span>
          </div>
          <div className='col'>
            <span>
              <AiFillClockCircle />
            </span>
          </div>
        </div>
        <div className='tracks'>
          {currentPlaylist?.tracks.map((track: ITrack, index) => {
            return (
              <div key={track.id} onClick={() => playTrack(track)}>
                <div className='row' key={track.id}>
                  <div className='col'>
                    <span>{index + 1}</span>
                  </div>
                  <div className='col detail'>
                    <div className='image'>
                      <img src={track.image} alt={`track-image-${index}`} />
                    </div>
                    <div className='info'>
                      <span className='name'>{track.name}</span>
                      <span>{track.artists}</span>
                    </div>
                  </div>
                  <div className='col'>
                    <span>{track.album}</span>
                  </div>
                  <div className='col'>
                    <span>{convertTime(track.duration)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div<{ bodyBackground: boolean }>`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ bodyBackground }) =>
        bodyBackground ? '#000000dc' : 'none'};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          text-wrap: nowrap;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;

export default Body;
