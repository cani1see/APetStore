import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from '../components/business/SearchBar';
import { FocusAwareStatusBar as StatusBar } from '../components/common/FocusAwareStatusBar';
import { MyCarousel } from '../components/business/MyCarousel';
import { HomeRoutes } from '../components/business/HomeRoutes';
import { ScrollTabView } from 'react-native-scroll-head-tab-view';
import { CommunityPostList } from '../components/business/CommunityPostList';

export function CommunityScreen() {
  const navigation = useNavigation();
  const [headerHeight, setHeaderHeight] = useState(300);
  const insets = useSafeAreaInsets();
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
        <SearchBar placeholder="冻干猫粮" onSearch={toSearch} />
        <MyCarousel />
        <HomeRoutes />
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
        <CommunityPostList tabLabel="为你推荐" />
        <CommunityPostList tabLabel="今日最佳" />
        <CommunityPostList tabLabel="每月排行" />
      </ScrollTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBarUnderlineStyle: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8CD1E6',
  },
});
