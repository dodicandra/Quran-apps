import {Icon} from 'native-base';
import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../../hooks/Provider';

const IconsPlay = ({play, onPressPlay}) => {
  const {stopPlay} = useContext(Context);
  const [playing, setPlay] = useState(play);
  const [iconName, setIconName] = useState('control-play');

  console.log(playing);
  const togglePlay = () => {
    onPressPlay();
    setStateIcon();
    setPlay(!playing);
  };

  const togglePause = () => {
    stopPlay();
    setStateIcon();
    setPlay(!playing);
  };

  const setStateIcon = () => {
    setIconName(state =>
      state === 'control-play' ? 'control-pause' : 'control-play',
    );
  };

  return (
    <TouchableOpacity>
      {playing ? (
        <Icon
          type="SimpleLineIcons"
          name={iconName}
          style={styles.Icons}
          onPress={togglePlay}
        />
      ) : (
        <Icon
          type="SimpleLineIcons"
          name={iconName}
          style={styles.Icons}
          onPress={togglePause}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Icons: {color: 'blue'},
});

export default IconsPlay;
