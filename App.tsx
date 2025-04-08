import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ScreenStackNavigator />
    </NavigationContainer>
  );
};

export default App;
