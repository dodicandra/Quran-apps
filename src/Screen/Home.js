import axios from 'axios';
import {Icon, Input, Item} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CardSurat} from '../Components';

const {width, height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    return () => getData;
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

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('quran/ar.alafasy');
      const result = await response.data.data;
      setData(result);
      setDataFilter(result);
      setLoading(false);
    } catch (erro) {
      console.log(erro);
    }
  };

  const renderCard = ({item}) => (
    <View style={styles.Divider}>
      <CardSurat
        key={item.number}
        name={item.name}
        title={item.englishName}
        text={item.text}
      />
    </View>
  );

  return (
    <>
      <View style={styles.homeCard}>
        <View style={styles.containerCard}>
          <Item style={styles.searchInput}>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChange={e => SearchFilter(e)} />
          </Item>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator color="blue" size={40} />
      ) : (
        <FlatList
          data={data.surahs}
          renderItem={renderCard}
          maxToRenderPerBatch={20}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
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
    marginVertical: 5,
    flex: 1,
  },
  homeCard: {
    width: width,
    height: 250,
    backgroundColor: '#aeaeae',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 7,
  },
  containerCard: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width,
  },
});

export default Home;
