import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Root from './src/router/root';
import axios from 'axios';

axios.defaults.baseURL = 'http://api.alquran.cloud/v1/';

const App = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default App;
