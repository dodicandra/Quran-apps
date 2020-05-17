import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Icon, Input, Item} from 'native-base';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Masjid from '../assets/image/masjiddd.png';
import {CardSurat} from '../Components';
import DigitalClock from '../Components/DigitalJam';

const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocal();
  }, [getLocal]);

  useEffect(() => {
    setOffLine();
    return () => setOffLine;
  });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const headerTiming = new Animated.Value(300);

  const keyboardDidShow = () => {
    console.log('SHOW');
    Animated.timing(headerTiming, {
      toValue: 120,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const keyboardDidHide = () => {
    console.log('HIDE');
  };

  const SearchFilter = event => {
    const searchtext = event.nativeEvent.text;
    const Teks = searchtext.trim().toLowerCase();

    const newData = dataFilter.filter(item =>
      item.englishName.toLowerCase().match(Teks),
    );
    console.log(newData);
    setData(newData);
  };

  const getData = useCallback(async timeOut => {
    try {
      setLoading(true);
      if (timeOut === true) return;
      const response = await axios.get('quran/ar.alafasy', {
        timeout: 1 * 60000,
      });
      const result = await response.data.data;
      setData(result.surahs);
      setDataFilter(result);
      setLoading(false);
    } catch (erro) {
      console.log(erro);
      setLoading(false);
      getData(true);
      Alert.alert(
        'Terjadi kesalahan',
        'mungkin jaringan mu bermasalah',
        [{text: 'Ulangi', onPress: () => getData()}],
        {cancelable: false},
      );
    }
  }, []);

  const setOffLine = useCallback(async () => {
    try {
      if ((await AsyncStorage.getItem('Quran')) === null) {
        const quran = await dataFilter.surahs.map(val => ({
          name: val.name,
          englishName: val.englishName,
          number: val.number,
        }));
        await AsyncStorage.setItem('Quran', JSON.stringify({surahs: quran}));
        alert('SUKSES');
      }
      return;
    } catch (err) {
      console.log(err);
    }
  }, [dataFilter]);

  const getLocal = useCallback(async () => {
    try {
      if ((await AsyncStorage.getItem('Quran')) === null) {
        getData();
      }
      setLoading(true);
      const LLL = await AsyncStorage.getItem('Quran');
      const qurans = JSON.parse(LLL);
      setData(qurans.surahs);
      setDataFilter(qurans.surahs);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [getData]);

  const yScroll = new Animated.Value(0);

  const HeaderHeight = yScroll.interpolate({
    inputRange: [0, 400],
    outputRange: [320, 120],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar showHideTransition="slide" barStyle="dark-content" />
      <KeyboardAvoidingView behavior="height">
        <View>
          <Animated.Image
            source={Masjid}
            style={[styles.homeCard, {height: HeaderHeight}]}
          />
          <View style={styles.containerCard}>
            <DigitalClock />
            <Item style={styles.searchInput}>
              <Icon name="ios-search" />
              <Input
                disabled={loading}
                placeholder="Search"
                onChange={e => SearchFilter(e)}
              />
            </Item>
          </View>
        </View>
      </KeyboardAvoidingView>
      {loading ? (
        <ActivityIndicator color="blue" size={40} />
      ) : (
        <ScrollView
          style={{paddingHorizontal: 17}}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: yScroll}}}],
            {useNativeDriver: false},
          )}>
          {data &&
            data.map(item => {
              return (
                <View style={{marginVertical: 7}}>
                  <CardSurat
                    name={item.name}
                    key={item.number}
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
    padding: 19,
  },
  Teks: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  IconHome: {color: 'red', fontSize: 40},
  Divider: {
    marginVertical: 3,
    flex: 1,
  },
  homeCard: {
    width: width,
    backgroundColor: '#aeaeae',
    marginBottom: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 2,
    paddingLeft: 10,
    borderRadius: 7,
  },
  containerCard: {
    padding: 10,
    position: 'absolute',
    bottom: 15,
    width,
  },
  times: {marginBottom: 20, fontSize: 25, fontWeight: 'bold'},
});

export default Home;

{
  /* <FlatList
          data={data}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          renderItem={MemoItem}
          maxToRenderPerBatch={15}
          keyExtractor={item => `${item.number}`}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: yScroll}}}],
            {useNativeDriver: false},
          )}
        /> */
}
