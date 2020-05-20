import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../Screen/Home';
import Surahs from '../Screen/Surahs';
import {requesAdds} from '../utils/adds';
import {BackHandler} from 'react-native';

const RootStack = createStackNavigator();

const Root = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Surahs"
        options={{
          title: 'Surat',
          headerLeft: () => null,
          headerTitleStyle: {textAlign: 'center'},
        }}
        component={Surahs}
        listeners={({navigation}) => ({
          focus: e => {
            BackHandler.addEventListener('hardwareBackPress', () => {
              requesAdds();
            });
          },
        })}
      />
    </RootStack.Navigator>
  );
};

export default Root;
