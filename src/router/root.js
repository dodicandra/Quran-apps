import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screen/Home';
import Surahs from '../Screen/Surahs';
import Modal from '../Screen/Modal';
import Provider from '../hooks/Provider';

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
