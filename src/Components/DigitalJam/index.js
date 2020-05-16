import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
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
  }, [call]);

  return (
    <Text style={styles.times}>
      {moment(date).format('DD - MMMM / hh : mm : ss')}
    </Text>
  );
}, compare);

const styles = StyleSheet.create({
  times: {marginBottom: 20, fontSize: 25, fontWeight: 'bold'},
});

export default DigitalClock;
