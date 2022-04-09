import "react-native-gesture-handler"
import { AppRegistry, I18nManager } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App.js';
I18nManager.forceRTL(false);
AppRegistry.registerComponent(appName, () => App);

