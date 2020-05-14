import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, View, CardItem, Text, Body} from 'native-base';

export const CardSurat = ({title, name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.leftColor}>
        <CardItem header bordered>
          <Text>{title}</Text>
          <Text style={{marginLeft: 15}}>{name}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};
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
    borderLeftWidth: 5,
    borderLeftColor: 'red',
    flexDirection: 'row',
    marginVertical: 20,
  },
});
