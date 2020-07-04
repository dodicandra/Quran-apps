import {Icon} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';

interface IconsProps {
  audio: string;
  id: string;
  cb: () => void;
  selected?: boolean;
}

const IconsPlay: React.FC<IconsProps> = ({audio, id, cb, selected}) => {
  const [playing, setPlay] = useState(selected);
  const anScale = new Animated.Value(0);

  const play = async (number: string, url: string) => {
    try {
      await TrackPlayer.setupPlayer();
      //@ts-ignore
      await TrackPlayer.add({id: number, url});
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };
  console.log('playing', playing);
  useEffect(() => {
    if (playing === false && selected === true) {
      setPlay(crr => !crr);
    }
  }, [playing, selected]);

  const togglePlay = () => {
    play(id, audio);
    setPlay(!playing);
    cb();
  };

  const togglePause = () => {
    TrackPlayer.pause();
    setPlay(!playing);
    cb();
  };

  const spring = useCallback(() => {
    Animated.spring(anScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: false
    }).start();
  }, [anScale]);

  useEffect(() => {
    spring();
    return () => {};
  }, [spring, playing]);

  return (
    <Animated.View style={{transform: [{scale: anScale}]}}>
      {playing ? (
        <Icon
          type="SimpleLineIcons"
          name="control-play"
          style={styles.Icons}
          onPress={togglePlay}
        />
      ) : (
        <Icon
          type="SimpleLineIcons"
          name="control-pause"
          style={styles.Icons}
          onPress={togglePause}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Icons: {color: 'blue'}
});

const compare = (prev: any, next: any) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

const memoIzed = React.memo(IconsPlay, compare);

export default memoIzed;
