import {Body, Card, CardItem, Content, Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import IconsPlay from '../IconPlay';

const compare = (prev, next) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

const play = async (id, url) => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id,
      url,
    });
    await TrackPlayer.play();
  } catch (error) {
    console.log(error);
  }
};

export const CardSurat = React.memo(({title, name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.leftColor}>
        <CardItem>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.surah}>{name}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}, compare);

export const CardDetailSurah = React.memo(({title, name, ayat}) => {
  const [playIcon, setPlay] = useState(true);

  const playing = async ayah => {
    play(ayah.numberInSurah, ayah.audio);
  };

  return (
    <Content showsVerticalScrollIndicator={false} padder>
      <Card>
        <CardItem header bordered>
          <Text style={styles.HeadingTitile}>{title}</Text>
          <Text style={styles.HeadingAyat}>{name}</Text>
        </CardItem>
        {ayat &&
          ayat.map(ayah => (
            <CardItem key={ayah.number} bordered>
              <Body style={styles.Body} key={ayah.number}>
                <Text style={styles.nomerAyat}>ayat {ayah.numberInSurah}</Text>
                <View style={styles.tekAyat}>
                  <View style={styles.containerAyat}>
                    <Text style={styles.listAyat}>{ayah.text}</Text>
                  </View>
                  <IconsPlay
                    play={playIcon}
                    onPressPlay={() => playing(ayah)}
                  />
                </View>
              </Body>
            </CardItem>
          ))}
      </Card>
    </Content>
  );
}, compare);

const styles = StyleSheet.create({
  leftColor: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  title: {fontSize: 20, color: '#5067FF', fontWeight: '700'},
  surah: {marginLeft: 15, fontSize: 18, fontWeight: '700', color: '#5067FF'},
  nomerAyat: {
    marginBottom: 10,
    position: 'relative',
    marginLeft: 240,
  },
  tekAyat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  containerAyat: {
    display: 'flex',
    maxWidth: '80%',
  },

  listAyat: {fontSize: 17, letterSpacing: 5},
  Body: {paddingVertical: 15},
  HeadingAyat: {marginLeft: 16, fontSize: 20},
  HeadingTitile: {fontSize: 20},
});
