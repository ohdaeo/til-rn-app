import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import WebViewScreen from '../screens/WebViewScreen';
import ProfileScreen from '../screens/ProfileScreen';

const ScreenStackNavigator = (): JSX.Element => {
  /**
   *screen 스택에 대한 정보관리
   *변수명을 Stack으로 설정
   */
  const stack = createStackNavigator();

  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={HomeScreen} />
      <stack.Screen name="About" component={AboutScreen} />
      <stack.Screen name="WebView" component={WebViewScreen} />
      <stack.Screen name="Profile" component={ProfileScreen} />
    </stack.Navigator>
  );
};

export default ScreenStackNavigator;
