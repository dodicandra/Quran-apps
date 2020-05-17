import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Root from './src/router/root';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.alquran.cloud/v1/';

const theme = {
  colors: {
    background: 'white',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Root />
    </NavigationContainer>
  );
};

export default App;
