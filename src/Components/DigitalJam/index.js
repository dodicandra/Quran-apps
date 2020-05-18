import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

const compare = (prev, next) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

const DigitalClock = React.memo(() => {
  const [date, setDate] = useState(new Date());

  const getDATE = (val = false) => {
    if (val === false) {
      setInterval(() => {
        setDate(new Date());
      }, 1000);
    }
    return;
  };

  const call = useCallback(getDATE, []);

  useEffect(() => {
    call();
    return () => call(true);
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
  times: {marginBottom: 15, fontSize: 25, fontWeight: 'bold'},
});

export default DigitalClock;
