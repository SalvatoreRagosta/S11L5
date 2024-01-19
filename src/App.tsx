import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from './store/StateProvider';
import reducer, { initialState } from './store/reducer';
import Login from './components/Login';
import Home from './components/Spotify';
import { ACTION_TYPE } from './Interface/enums';

function App() {
  const { state, dispatch } = useStateContext();
  const { token } = state;
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split('&')[0].split('=')[1];
      dispatch({ type: ACTION_TYPE.SET_TOKEN, payload: token });
    }
  }, [token, dispatch]);

  if (token) {
    return <Home />;
  }
  return <Login />;
}

export default App;
