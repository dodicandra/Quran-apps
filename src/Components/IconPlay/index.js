import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const IconsPlay = ({onPressPlay}) => {
  return (
    <Icon
      type="SimpleLineIcons"
      name="control-play"
      style={styles.Icons}
      onPress={onPressPlay}
    />
  );
};

const styles = StyleSheet.create({
  Icons: {color: 'blue'},
});

export default IconsPlay;
