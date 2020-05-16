import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Icon, Input, Item} from 'native-base';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CardSurat} from '../Components';
import DigitalClock from '../Components/DigitalJam';
import Masjid from '../assets/image/masjid.png';

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

  const SearchFilter = event => {
    const searchtext = event.nativeEvent.text;
    const Teks = searchtext.trim().toLowerCase();
    const {surahs} = dataFilter;

    const newData = surahs.filter(item =>
      item.englishName.toLowerCase().match(Teks),
    );
    setData({surahs: newData});
  };

  const getData = useCallback(async timeOut => {
    try {
      setLoading(true);
      if (timeOut === true) return;
      const response = await axios.get('quran/ar.alafasy', {
        timeout: 1 * 60000,
      });
      const result = await response.data.data;
      setData(result);
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
      const LLL = await AsyncStorage.getItem('Quran');
      const qurans = JSON.parse(LLL);
      setData(qurans);
      setDataFilter(qurans);
    } catch (err) {
      console.log(err);
    }
  }, [getData]);

  const renderCard = useCallback(
    ({item}) => (
      <CardSurat
        key={item.number}
        name={item.name}
        title={item.englishName}
        onPress={() => navigation.navigate('Surahs', {id: item.number})}
      />
    ),
    [navigation],
  );

  const MemoRender = useMemo(() => renderCard, [renderCard]);

  return (
    <View style={{flex: 1}}>
      <StatusBar showHideTransition="slide" barStyle="dark-content" />
      <ImageBackground
        source={Masjid}
        resizeMode="cover"
        style={styles.homeCard}>
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
      </ImageBackground>
      {loading ? (
        <ActivityIndicator color="blue" size={40} />
      ) : (
        <FlatList
          data={data.surahs}
          renderItem={MemoRender}
          maxToRenderPerBatch={15}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
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
    height: 250,
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
    bottom: 0,
    width,
  },
  times: {marginBottom: 20, fontSize: 25, fontWeight: 'bold'},
});

export default Home;
