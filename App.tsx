import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import axios from 'axios';
import {YellowBox} from 'react-native';
import {Root} from 'router';

axios.defaults.baseURL = 'https://api.alquran.cloud/v1/';

const theme = {
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
};

const App = () => {
  YellowBox.ignoreWarnings(['No task registered for key']);
  return (
    <NavigationContainer theme={{colors: theme.colors, dark: true}}>
      <Root />
    </NavigationContainer>
  );
};

export default App;
