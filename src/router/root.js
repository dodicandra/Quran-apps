import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Provider from '../hooks/Provider';
import Home from '../Screen/Home';
import Surahs from '../Screen/Surahs';

const RootStack = createStackNavigator();

const Root = () => {
  return (
    <Provider>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="Surahs" component={Surahs} />
      </RootStack.Navigator>
    </Provider>
  );
};

export default Root;
