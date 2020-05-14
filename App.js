import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Root from './src/router/root';

const App = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default App;
