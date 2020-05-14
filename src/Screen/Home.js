import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import {CardSurat} from '../Components';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get('quran/ar.alafasy');
      const result = await response.data.data;
      setData(result);
      setLoading(false);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {loading ? (
        <ActivityIndicator size={30} color="red" />
      ) : (
        data.surahs.map(surah => (
          <View style={styles.Divider}>
            <CardSurat
              key={surah.number}
              name={surah.name}
              title={surah.englishName}
              onPress={() => navigation.navigate('Surahs', {id: surah.number})}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  Teks: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  IconHome: {color: 'red', fontSize: 40},
  Divider: {
    marginVertical: 5,
  },
});

export default Home;
