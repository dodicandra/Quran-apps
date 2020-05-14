import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CardSurat, CardDetailSurah} from '../Components';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [surat, setSurat] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log('data ==> ', data);

  useEffect(() => {
    getData();
    return () => getData;
  }, [surat]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`surah/${surat}/ar.alafasy`);
      const result = await response.data.data;
      setData(curren => [...curren, result]);
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

  const loadAgain = () => {
    setSurat(curren => curren + 1);
  };

  const loadmore = useCallback(() => {
    loadAgain();
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderCard}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadmore}
      onEndReachedThreshold={0}
      maxToRenderPerBatch={13}
      refreshControl={
        <RefreshControl refreshing={loading} size={30} onRefresh={loadmore} />
      }
      refreshing={loading}
      showsVerticalScrollIndicator={false}
    />
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
});

export default Home;
