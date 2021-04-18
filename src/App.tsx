import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommunityScreen } from './pages/CommunityScreen/CommunityScreen';
import { ShopScreen } from './pages/ShopScreen/ShopScreen';
import { MessageScreen } from './pages/MessageScreen';
import { UserScreen } from './pages/UserScreen';
import { SearchScreen } from './pages/SearchScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator<RootStackParamList>();

const RootTab = createBottomTabNavigator();

const defaultStackOptions = {
  headerShown: false,
};

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const HomeTabs = () => (
  <RootTab.Navigator
    backBehavior={'initialRoute'}
    tabBarOptions={{
      allowFontScaling: false,
      keyboardHidesTabBar: true,
    }}>
    <RootTab.Screen name="社区" component={CommunityScreen} />
    <RootTab.Screen name="商城" component={ShopScreen} />
    <RootTab.Screen name="消息" component={MessageScreen} />
    <RootTab.Screen name="我的" component={UserScreen} />
  </RootTab.Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator screenOptions={defaultStackOptions}>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
