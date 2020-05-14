import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screen/Home';

const RootStack = createStackNavigator();

const Root = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Root;
