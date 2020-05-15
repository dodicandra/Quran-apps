import axios from 'axios';
import {Icon, Input, Item, Fab, Button, Container} from 'native-base';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import {CardSurat} from '../Components';

const {width, height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  console.log('kok');

  useEffect(() => {
    getLocal();
    getDATE();
  }, []);

  const getDATE = useCallback(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const SearchFilter = event => {
    const searchtext = event.nativeEvent.text;
    const Teks = searchtext.trim().toLowerCase();
    const {surahs} = dataFilter;

    const newData = surahs.filter(item =>
      item.englishName.toLowerCase().match(Teks),
    );
    setData({surahs: newData});
  };

  const getData = async timeOut => {
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
  };
  const setOffLine = async () => {
    try {
      const quran = await dataFilter.surahs.map(val => ({
        name: val.name,
        englishName: val.englishName,
        number: val.number,
      }));
      await AsyncStorage.setItem('Quran', JSON.stringify({surahs: quran}));
    } catch (err) {
      console.log(err);
    }
  };

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
  }, []);

  // hanya untuk testing
  const removeLocal = async () => {
    try {
      await AsyncStorage.removeItem('Quran');
    } catch (err) {
      console.log(err);
    }
  };

  const renderCard = ({item}) => (
    <CardSurat key={item.number} name={item.name} title={item.englishName} />
  );

  const MemoRender = useMemo(() => renderCard, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.homeCard}>
        <View style={styles.containerCard}>
          <Text style={styles.times}>
            {moment(date).format('DD - MMMM / hh : mm : ss')}
          </Text>
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
      {loading ? (
        <ActivityIndicator color="blue" size={40} />
      ) : (
        <FlatList
          data={data.surahs}
          renderItem={MemoRender}
          maxToRenderPerBatch={20}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Fab
        direction="up"
        containerStyle={{}}
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => setOffLine()}>
        <Text style={{fontSize: 10}}>Offline</Text>
      </Fab>
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
