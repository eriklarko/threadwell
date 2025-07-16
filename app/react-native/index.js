/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { setupAudioPro } from './src/now-playing/audio-player/audioPlayerService';

AppRegistry.registerComponent(appName, () => App);

// Initialize audio logic OUTSIDE of React lifecycle
setupAudioPro();
