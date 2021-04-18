import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FocusAwareStatusBar as StatusBar } from '../../components/common/FocusAwareStatusBar';
import { SearchBar } from '../../components/business/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyCarousel } from '../../components/business/MyCarousel';
import { DailyDiscount } from '../../components/business/DailyDiscount';
import { MemoizedScrollHead as ScrollHead } from './ScrollHead';
import { ShopItemListRenderer } from '../../components/business/ShopItemList';

export function ShopScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const toSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);
  const _renderHeader = useCallback(() => {
    return (
      <View>
        <SearchBar placeholder="冻干猫粮" toCart={toSearch} />
        <MyCarousel />
        <DailyDiscount />
      </View>
    );
    // eslint-disable-next-line
  }, []);
  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ScrollHead
        renderHeaderContent={_renderHeader}
        renderListItem={ShopItemListRenderer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBarUnderlineStyle: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF69AD',
  },
});
