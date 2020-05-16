/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import {Text} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, TouchableHighlight, View} from 'react-native';
import {CardDetailSurah} from '../Components';
import {Context} from '../hooks/Provider';

const Surahs = ({route}) => {
  const {id} = route.params;

  const {stopPlay, modalPlay, setModalPlay} = useContext(Context);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    return () => getData;
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`surah/${id}/ar.alafasy`);
      const result = await response.data.data;
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const modalPress = () => {
    setModalPlay(!modalPlay);
    stopPlay();
  };

  return (
    <>
      <CardDetailSurah
        title={data.englishName}
        name={data.name}
        ayat={data.ayahs}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPlay}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={modalPress}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
    shadowColor: '#000',
    width: '90%',
    height: '70%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
