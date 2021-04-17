import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '../components/business/SearchBar';
import { FocusAwareStatusBar as StatusBar } from '../components/common/FocusAwareStatusBar';
import { MyCarousel } from '../components/business/MyCarousel';
import { HomeRoutes } from '../components/business/HomeRoutes';

export function CommunityScreen() {
  const navigation = useNavigation();
  const toSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={styles.container}>
        <SearchBar placeholder="冻干猫粮" onSearch={toSearch} />
        <MyCarousel />
        <HomeRoutes />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
