import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardDetailSurah} from '../Components';
import axios from 'axios';

const Surahs = ({route}) => {
  const {id} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`surah/${id}/ar.alafasy`);
      const result = await response.data.data;
      setData(result);
      setLoading(false);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <CardDetailSurah name={data.name} title={data.englishName} />
    </View>
  );
};

export default Surahs;
