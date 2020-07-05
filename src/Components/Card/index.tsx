import {Body, Card, CardItem, Content, Text, View} from 'native-base';
import React, {useState, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';

import IconsPlay from '../IconPlay';

interface CardSurahProps {
  title?: string;
  name?: string;
  onPress?: () => void;
}

export interface AyatTypes {
  number?: number;
  numberInSurah: string;
  text?: string;
  audio: string;
}

interface CardDetailProps {
  title?: string;
  name?: string;
  ayat?: AyatTypes[];
}

const compare = (prev: any, next: any) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

export const CardSurat: React.FC<CardSurahProps> = React.memo(
  ({title, name, onPress}) => {
    const {width, height, fontScale} = useWindowDimensions();

    return (
      <TouchableOpacity onPress={onPress}>
        <Card style={styles.leftColor}>
          <CardItem
            style={{
              justifyContent: 'space-between',
              flex: 1
            }}>
            <Text style={[styles.title, {fontSize: fontScale + 20}]}>
              {title}
            </Text>
            <Text style={[styles.surah, {fontSize: fontScale + 20}]}>
              {name}
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  },
  compare
);

export const CardDetailSurah: React.FC<CardDetailProps> = React.memo(
  ({title, name, ayat}) => {
    const [selected, setSelected] = useState(true);
    const onSelected = useCallback(() => {
      setSelected(!selected);
    }, [selected]);

    return (
      <Content showsVerticalScrollIndicator={false}>
        <Card>
          <CardItem style={{justifyContent: 'space-between'}} header bordered>
            <Text style={styles.HeadingAyat}>{title}</Text>
            <Text style={styles.HeadingAyat}>{name}</Text>
          </CardItem>
          {ayat &&
            ayat.map(ayah => (
              <CardItem key={ayah.number} bordered>
                <Body style={styles.Body} key={ayah.number}>
                  <Text style={styles.nomerAyat}>
                    ayat {ayah.numberInSurah}
                  </Text>
                  <View style={styles.tekAyat}>
                    <View
                      style={{
                        marginRight: 30,
                        width: '85%'
                      }}>
                      <Text
                        selectable={true}
                        adjustsFontSizeToFit={true}
                        style={styles.listAyat}>
                        {ayah.text}
                      </Text>
                    </View>
                    <IconsPlay
                      selected={selected}
                      cb={onSelected}
                      audio={ayah.audio}
                      id={ayah.numberInSurah}
                    />
                  </View>
                </Body>
              </CardItem>
            ))}
        </Card>
      </Content>
    );
  },
  compare
);

const styles = StyleSheet.create({
  leftColor: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10
  },
  title: {color: '#5067FF', fontWeight: '700'},
  surah: {fontWeight: '700', color: '#5067FF'},
  nomerAyat: {
    marginBottom: 10,
    position: 'relative'
  },
  tekAyat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  },
  listAyat: {fontSize: 25, letterSpacing: 5, textAlign: 'right'},
  Body: {paddingVertical: 15},
  HeadingAyat: {
    fontSize: 20,
    padding: 4,
    textTransform: 'capitalize',
    letterSpacing: 4
  }
});
