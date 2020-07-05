import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const compare = (prev: any, next: any) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

const DigitalClock = React.memo(() => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getDATE = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(getDATE);
  }, []);

  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <Text style={styles.times}>{moment(date).format('DD - MMMM / ')}</Text>
      <Text style={{...styles.times, fontSize: 16}}>
        {moment(date).format(' hh : mm : ss')}
      </Text>
    </View>
  );
}, compare);

const styles = StyleSheet.create({
  times: {
    marginBottom: 0,
    marginLeft: 3,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 4,
    textShadowOffset: {width: 3, height: 3}
  }
});

export default DigitalClock;
