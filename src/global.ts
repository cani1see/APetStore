import { Dimensions, Platform } from 'react-native';

global.windowWidth = Dimensions.get('window').width;
global.windowHeight = Dimensions.get('window').height;
global.isIOS = Platform.OS === 'ios';
global.isAndroid = Platform.OS === 'android';
