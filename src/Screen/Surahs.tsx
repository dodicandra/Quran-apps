import {AdEventType} from '@react-native-firebase/admob';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import {View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, BackHandler, StyleSheet} from 'react-native';
import {AyatTypes, CardDetailSurah} from 'Components';
import {StackRootTypes} from 'router';

//@ts-ignore
import {fireAddsIn} from 'utils';

export interface DataAyahsTypes {
  englishName?: string;
  name?: string;
  ayahs?: AyatTypes[];
}

type SurahProps = StackScreenProps<StackRootTypes<{id: string}>, 'Surahs'>;

const Surahs: React.FC<SurahProps> = ({route}) => {
  const param = route.params;

  const [data, setData] = useState<DataAyahsTypes>([] as DataAyahsTypes);
  const [loding, setLoading] = useState(false);

  useEffect(() => {
    const addListener = () => {
      try {
        fireAddsIn.onAdEvent(async (type: string, error: any) => {
          if (type === AdEventType.LOADED) {
            console.log('loaded ==>', type);
          }
          if (type === AdEventType.ERROR) {
            console.log(error);
          }
        });
        fireAddsIn.load();
      } catch (err) {
        console.log(err);
      }
    };

    addListener();
    return () => {
      addListener();
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      fireAddsIn.show().catch(err => console.log(err));
      // navigation.goBack();
      return true;
    });
    getData();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
      getData;
    };
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`surah/${param!.id}/ar.alafasy`);
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
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row'
  },
  openButton: {
    borderRadius: 100,
    padding: 10,
    height: 70,
    width: 70,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default Surahs;
