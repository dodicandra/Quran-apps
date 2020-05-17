import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../Screen/Home';
import Surahs from '../Screen/Surahs';

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
        options={{title: 'Surat'}}
        component={Surahs}
      />
    </RootStack.Navigator>
  );
};

export default Root;
