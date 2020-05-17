import {Icon} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const IconsPlay = ({audio, id}) => {
  const [playing, setPlay] = useState(true);
  const [iconName, setIconName] = useState('control-play');

  const play = async (number, url) => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: number,
        url,
      });
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(playing);

  const togglePlay = () => {
    play(id, audio);
    setStateIcon();
    setPlay(!playing);
  };

  const togglePause = () => {
    TrackPlayer.pause();
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
