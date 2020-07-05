import {Icon} from 'native-base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';

interface IconsProps {
  audio: string;
  id: string;
  cb: () => void;
  selected?: boolean;
}

const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

const IconsPlay: React.FC<IconsProps> = ({audio, id, cb, selected}) => {
  const [playing, setPlay] = useState(selected);
  const anScale = new Animated.Value(0);
  const ref = useRef<Icon>(null);
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
  useEffect(() => {
    if (playing === false && selected === true) {
      setPlay(curen => !curen);
    }
  }, [selected]);

  const togglePlay = () => {
    play(id, audio);
    setPlay(!playing);
    cb();
  };

  const togglePause = () => {
    console.log();
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
    <React.Fragment>
      {playing ? (
        <Icon
          type="SimpleLineIcons"
          name="control-play"
          style={styles.Icons}
          onPress={togglePlay}
        />
      ) : (
        <AnimatedTouch
          accessible
          accessibilityLabel="icon"
          testID="icon"
          style={{transform: [{scale: anScale}]}}>
          <Icon
            ref={ref}
            type="SimpleLineIcons"
            name="control-pause"
            style={styles.Icons}
            onPress={togglePause}
          />
        </AnimatedTouch>
      )}
    </React.Fragment>
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
