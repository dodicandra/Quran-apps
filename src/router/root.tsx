import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../Screen/Home';
import Surahs from '../Screen/Surahs';

export type StackRootTypes<T = object> = {
  Home?: T | undefined;
  Surahs?: T | undefined;
};
const RootStack = createStackNavigator<StackRootTypes>();

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
          headerTitleStyle: {textAlign: 'center'}
        }}
        component={Surahs}
      />
    </RootStack.Navigator>
  );
};

export default Root;
