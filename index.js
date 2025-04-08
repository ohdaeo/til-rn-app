/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
/**네비게이터 추가 */
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
