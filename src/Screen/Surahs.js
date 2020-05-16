/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import {Text, Icon} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, TouchableHighlight, View} from 'react-native';
import {CardDetailSurah} from '../Components';
import {Context} from '../hooks/Provider';

const Surahs = ({route}) => {
  const {id} = route.params;

  const {
    stopPlay,
    modalPlay,
    setModalPlay,
    pausePlay,
    paused,
    played,
  } = useContext(Context);

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
        onRequestClose={modalPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {paused ? (
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={played}>
                <Icon
                  type="Entypo"
                  name="controller-play"
                  style={styles.textStyle}
                />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={pausePlay}>
                <Icon type="Feather" name="pause" style={styles.textStyle} />
              </TouchableHighlight>
            )}

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: 'red'}}
              onPress={modalPress}>
              <Icon
                type="Entypo"
                name="controller-stop"
                style={styles.textStyle}
              />
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
