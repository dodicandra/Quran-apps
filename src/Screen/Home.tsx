import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Icon, Input, Item} from 'native-base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';
import {DigitalClock, CardSurat} from 'components';
import {Mosque} from 'asset';

const {width} = Dimensions.get('window');

type Event = NativeSyntheticEvent<TextInputChangeEventData>;
interface DataTypes {
  number?: string;
  name?: string;
  englishName: string;
}

const Home = () => {
  const [data, setData] = useState<DataTypes[]>([] as DataTypes[]);
  const [dataFilter, setDataFilter] = useState<{surahs: DataTypes[]}>({
    surahs: []
  });
  const [loading, setLoading] = useState(false);
  const [isKeyboardShow, setKeyboardShow] = useState(false);
  const navigation = useNavigation();

  const yScroll = useRef(new Animated.Value(0)).current;
  const timing = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    const keyboardAction = Platform.OS === 'ios' ? 'Will' : 'Did';
    //@ts-ignore
    Keyboard.addListener(`keyboard${keyboardAction}Show`, keyboardDidShow);
    //@ts-ignore
    Keyboard.addListener(`keyboard${keyboardAction}Hide`, keyboardDidHide);

    return () => {
      Keyboard.removeAllListeners(`keyboard${keyboardAction}Show`);
      Keyboard.removeAllListeners(`keyboard${keyboardAction}Hide`);
    };
  });

  const keyboardDidShow = () => {
    setKeyboardShow(true);
    _scaleDwn();
  };
  const keyboardDidHide = () => {
    setKeyboardShow(false);
  };

  const _scaleDwn = () => {
    Animated.timing(timing, {
      toValue: 120,
      duration: 2000,
      useNativeDriver: false
    }).start();
  };

  const HeaderHeight = yScroll.interpolate({
    inputRange: [0, 400],
    outputRange: [320, 120],
    extrapolate: 'clamp'
  });

  const SearchFilter = (event: Event) => {
    const searchtext = event.nativeEvent.text;
    const Teks = searchtext.trim().toLowerCase();

    const newData = dataFilter.surahs.filter(item =>
      item.englishName.toLowerCase().match(Teks)
    );
    setData(newData);
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('quran/ar.alafasy', {
        timeout: 1 * 60000
      });
      const result = await response.data.data;
      setData(result.surahs);
      setDataFilter(result);
      setLoading(false);
    } catch (erro) {
      console.log(erro);
      setLoading(false);
      Alert.alert(
        'Terjadi kesalahan',
        'mungkin jaringan mu bermasalah',
        [{text: 'Ulangi', onPress: () => getData()}],
        {cancelable: false}
      );
    }
  }, []);
  //@ts-ignore
  useEffect(() => {
    const getLocal = async () => {
      try {
        if ((await AsyncStorage.getItem('Quran')) === null) {
          getData();
        }
        setLoading(true);
        const LLL = await AsyncStorage.getItem('Quran');
        const qurans = JSON.parse(LLL as string);
        setData(qurans.surahs);
        setDataFilter(qurans);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getLocal();

    return () => getLocal;
  }, [getData]);
  //@ts-ignore
  useEffect(() => {
    const setOffLine = async () => {
      try {
        if ((await AsyncStorage.getItem('Quran')) === null) {
          const quran = await dataFilter.surahs.map(val => ({
            name: val.name,
            englishName: val.englishName,
            number: val.number
          }));
          await AsyncStorage.setItem('Quran', JSON.stringify({surahs: quran}));
          Alert.alert('SUKSES');
        }
        return;
      } catch (err) {
        console.log(err);
      }
    };
    setOffLine();
    return () => setOffLine;
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar
        showHideTransition="fade"
        translucent={true}
        barStyle="dark-content"
      />
      <View style={{width}}>
        <Animated.Image
          source={Mosque}
          style={[
            styles.homeCard,
            {height: isKeyboardShow ? timing : HeaderHeight}
          ]}
        />
        <View style={styles.containerCard}>
          <DigitalClock />
          <Item style={styles.searchInput}>
            <Icon name="ios-search" />
            <Input
              disabled={loading}
              placeholder="Search..."
              onChange={e => SearchFilter(e)}
            />
          </Item>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator color="blue" size={40} />
      ) : (
        <ScrollView
          style={{paddingHorizontal: 17}}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: yScroll}}}],
            {useNativeDriver: false}
          )}>
          {data &&
            data.map(item => {
              return (
                <View key={item.number} style={{marginVertical: 7}}>
                  <CardSurat
                    name={item.name}
                    title={item.englishName}
                    onPress={() =>
                      navigation.navigate('Surahs', {id: item.number})
                    }
                  />
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 19
  },
  Teks: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  IconHome: {color: 'red', fontSize: 40},
  Divider: {
    marginVertical: 3,
    flex: 1
  },
  homeCard: {
    width: width,
    backgroundColor: '#aeaeae',
    marginBottom: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 2,
    paddingLeft: 10,
    borderRadius: 7
  },
  containerCard: {
    padding: 10,
    position: 'absolute',
    bottom: 15,
    width
  },
  times: {marginBottom: 20, fontSize: 25, fontWeight: 'bold'}
});

export default Home;
