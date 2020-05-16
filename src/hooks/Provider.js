import React, {createContext, useState} from 'react';
import TrackPlayer from 'react-native-track-player';

export const Context = createContext();

const Provider = ({children}) => {
  const [modalPlay, setModalPlay] = useState(false);
  const [paused, setPaused] = useState(false);

  const stopPlay = () => {
    TrackPlayer.stop();
  };

  const pausePlay = () => {
    TrackPlayer.pause();
    setPaused(true);
  };

  const played = () => {
    TrackPlayer.play();
    setPaused(false);
  };

  return (
    <Context.Provider
      value={{modalPlay, paused, setModalPlay, stopPlay, pausePlay, played}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
