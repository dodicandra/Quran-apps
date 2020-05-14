import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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
      <RootStack.Screen name="Surahs" component={Surahs} />
    </RootStack.Navigator>
  );
};

export default Root;
