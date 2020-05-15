import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, View, CardItem, Text, Body} from 'native-base';

const compare = (prev, next) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

export const CardSurat = React.memo(({title, name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.leftColor}>
        <CardItem header bordered>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.surah}>{name}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}, compare);
export const CardDetailSurah = ({title, name, text}) => {
  return (
    <Card style={styles.leftColor}>
      <CardItem header bordered>
        <Text>{title}</Text>
        <Text style={{marginLeft: 15}}>{name}</Text>
        <CardItem bordered>
          <Body>
            <Text>{text}</Text>
          </Body>
        </CardItem>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  leftColor: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
  },
  title: {fontSize: 20, color: '#5067FF', fontWeight: '700'},
  surah: {marginLeft: 15, fontSize: 18, fontWeight: '700'},
});
