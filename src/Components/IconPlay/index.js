import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const IconsPlay = ({audio, id}) => {
  const [playing, setPlay] = useState(true);
  const [iconName, setIconName] = useState('control-play');
  const anScale = new Animated.Value(0);

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

  useEffect(() => {
    _spring();
  }, [_spring, playing]);

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

  const _spring = () => {
    Animated.spring(anScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      {playing ? (
        <Animated.View style={{transform: [{scale: anScale}]}}>
          <Icon
            type="SimpleLineIcons"
            name={iconName}
            style={styles.Icons}
            onPress={togglePlay}
          />
        </Animated.View>
      ) : (
        <Animated.View style={{transform: [{scale: anScale}]}}>
          <Icon
            type="SimpleLineIcons"
            name={iconName}
            style={styles.Icons}
            onPress={togglePause}
          />
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Icons: {color: 'blue'},
});

export default IconsPlay;
