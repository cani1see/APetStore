import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { FocusAwareStatusBar as StatusBar } from '../components/common/FocusAwareStatusBar';
import { SearchBar } from '../components/business/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyCarousel } from '../components/business/MyCarousel';
import { DailyDiscount } from '../components/business/DailyDiscount';

export function ShopScreen() {
  const navigation = useNavigation();
  const toSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={styles.container}>
        <SearchBar placeholder="冻干猫粮" toCart={toSearch} />
        <MyCarousel />
        <DailyDiscount />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
