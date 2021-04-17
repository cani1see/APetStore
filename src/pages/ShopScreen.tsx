import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FocusAwareStatusBar as StatusBar } from '../components/common/FocusAwareStatusBar';
import { SearchBar } from '../components/business/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyCarousel } from '../components/business/MyCarousel';
import { DailyDiscount } from '../components/business/DailyDiscount';
import { ScrollTabView } from 'react-native-scroll-head-tab-view/index';
import { ShopItemList } from '../components/business/ShopItemList';

export function ShopScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(290);
  const toSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);
  const headerOnLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);
  const _renderScrollHeader = useCallback(() => {
    return (
      <View onLayout={headerOnLayout}>
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
      <ScrollTabView
        headerHeight={headerHeight}
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        renderScrollHeader={_renderScrollHeader}>
        <ShopItemList tabLabel="服装" />
        <ShopItemList tabLabel="食品" />
        <ShopItemList tabLabel="房屋" />
        <ShopItemList tabLabel="出行" />
        <ShopItemList tabLabel="玩具" />
      </ScrollTabView>
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
