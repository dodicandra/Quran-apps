/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {CardDetailSurah} from '../Components';
import {View} from 'native-base';

const Surahs = ({route}) => {
  const {id} = route.params;

  const [data, setData] = useState([]);
  const [loding, setLoading] = useState(false);

  useEffect(() => {
    getData();
    return () => getData;
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`surah/${id}/ar.alafasy`);
      const result = await response.data.data;
      setData(result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {loding ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <CardDetailSurah
          title={data.englishName}
          name={data.name}
          ayat={data.ayahs}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    width: '90%',
    height: '30%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  openButton: {
    borderRadius: 100,
    padding: 10,
    height: 70,
    width: 70,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Surahs;
