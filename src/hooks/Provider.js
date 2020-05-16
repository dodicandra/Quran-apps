import React, {createContext, useState} from 'react';
import TrackPlayer from 'react-native-track-player';

export const Context = createContext();

const Provider = ({children}) => {
  const [modalPlay, setModalPlay] = useState(false);

  const stopPlay = () => {
    TrackPlayer.pause();
  };

  return (
    <Context.Provider value={{modalPlay, setModalPlay, stopPlay}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
