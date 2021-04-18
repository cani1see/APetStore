import React, { useCallback} from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from '../../components/business/SearchBar';
import { FocusAwareStatusBar as StatusBar } from '../../components/common/FocusAwareStatusBar';
import { MyCarousel } from '../../components/business/MyCarousel';
import { HomeRoutes } from '../../components/business/HomeRoutes';
import { MemoizedScrollHead as ScrollHead } from './ScrollHead';
import { CommunityPostListRenderItem } from '../../components/business/CommunityPostList';

export function CommunityScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const toSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);
  const _renderHeader = useCallback(() => {
    return (
      <View>
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
      <ScrollHead
        renderHeaderContent={_renderHeader}
        renderListItem={CommunityPostListRenderItem}
      />
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
