import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'native-base';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Teks}>Home</Text>
      <Icon name="home" style={styles.IconHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Teks: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  IconHome: {color: 'red', fontSize: 40},
});

export default Home;
