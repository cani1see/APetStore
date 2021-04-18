import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabBar, TabBarIndicator, TabView } from 'react-native-tab-view';
import Masonry from '../../components/business/Masonry';
import createAnimatedComponentForwardingRef from '../../components/common/createAnimatedComponentFrowardingRef';

const AnimatedMasonry = createAnimatedComponentForwardingRef(Masonry);

const TabBarHeight = 48;
const HeaderHeight = (global.windowWidth - 30) / 3 + 150;
const windowHeight = Dimensions.get('window').height;

const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;

const TABSCENE_TYPE = {
  SCROLLVIEW: 1,
  FLATLIST: 2,
};

const TabScene = ({
  numCols,
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => (
  <Animated.FlatList
    scrollToOverflowEnabled={true}
    numColumns={numCols}
    ref={onGetRef}
    scrollEventThrottle={16}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: true },
    )}
    onMomentumScrollBegin={onMomentumScrollBegin}
    onScrollEndDrag={onScrollEndDrag}
    onMomentumScrollEnd={onMomentumScrollEnd}
    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    ListHeaderComponent={() => <View style={{ height: 10 }} />}
    contentContainerStyle={{
      paddingTop: HeaderHeight + TabBarHeight,
      paddingHorizontal: 10,
      minHeight: windowHeight - TabBarHeight,
    }}
    showsHorizontalScrollIndicator={false}
    data={data}
    renderItem={renderItem}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item, index) => index.toString()}
  />
);

const MasonryTabScene = ({
  numCols,
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => (
  <Animated.View>
    <AnimatedMasonry
      ref={onGetRef}
      columns={numCols}
      containerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        paddingHorizontal: 5,
        minHeight: windowHeight - TabBarHeight,
      }}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      scrollToOverflowEnabled={true}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      showsHorizontalScrollIndicator={false}
      data={data}
      showsVerticalScrollIndicator={false}
    />
  </Animated.View>
);

const renderTab1Item = ({ item, index }) => {
  return (
    <View
      style={{
        borderRadius: 16,
        marginLeft: index % 2 === 0 ? 0 : 10,
        width: tab1ItemSize,
        height: tab1ItemSize,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{index}</Text>
    </View>
  );
};

const renderTab2Item = ({ item, index }) => {
  return (
    <View
      style={{
        marginLeft: index % 3 === 0 ? 0 : 10,
        borderRadius: 16,
        width: tab2ItemSize,
        height: tab2ItemSize,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{index}</Text>
    </View>
  );
};

const renderTab3Item = ({ item, index }) => {
  return (
    <View
      style={{
        marginLeft: index % 3 === 0 ? 0 : 10,
        borderRadius: 16,
        width: tab2ItemSize,
        height: tab2ItemSize,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{index}</Text>
    </View>
  );
};

const ScrollHead: React.FC = ({
  renderHeaderContent,
  tabConfig = [
    { key: 'tab1', title: '服装' },
    { key: 'tab2', title: '食品' },
    { key: 'tab3', title: '房屋' },
    { key: 'tab4', title: '出行' },
    { key: 'tab5', title: '玩具' },
  ],
  tab1Data = [...Array(40).keys()].map(it => ({ key: `${it}`, id: it })),
  tab2Data = Array(30).fill(0),
  renderListItem,
}) => {
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState(tabConfig);
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, scrollY, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            if (item.type === TABSCENE_TYPE.SCROLLVIEW) {
              item.value?.scrollTo({
                x: 0,
                y: scrollY._value,
                animated: false,
              });
            } else {
              item.value?.scrollToOffset({
                offset: scrollY._value,
                animated: false,
              });
            }
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              if (item.type === TABSCENE_TYPE.SCROLLVIEW) {
                item.value?.scrollTo({
                  x: 0,
                  y: HeaderHeight,
                  animated: false,
                });
              } else {
                item.value?.scrollToOffset({
                  offset: HeaderHeight,
                  animated: false,
                });
              }
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight + 80],
      outputRange: [0, -HeaderHeight - 80],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={[styles.header, { transform: [{ translateY: y }] }]}>
        <View>{renderHeaderContent()}</View>
      </Animated.View>
    );
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>
        {route.title}
      </Text>
    );
  };

  const renderIndicator = indicatorProps => {
    const width = indicatorProps.getTabWidth(tabIndex) - 12;
    return <TabBarIndicator {...indicatorProps} width={width} />;
  };

  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'tab1':
        numCols = 2;
        data = tab1Data;
        renderItem = renderListItem;
        return (
          <MasonryTabScene
            numCols={numCols}
            data={data}
            renderItem={renderItem}
            scrollY={scrollY}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onGetRef={ref => {
              if (ref) {
                ref.addItems(data);
                const found = listRefArr.current.find(e => e.key === route.key);
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    type: TABSCENE_TYPE.SCROLLVIEW,
                    value: ref,
                  });
                }
              }
            }}
          />
        );
      case 'tab2':
        numCols = 3;
        data = tab2Data;
        renderItem = renderTab2Item;
        break;
      case 'tab3':
        numCols = 3;
        data = tab2Data;
        renderItem = renderTab3Item;
        break;
      case 'tab4':
        numCols = 3;
        data = tab2Data;
        renderItem = renderTab3Item;
        break;
      case 'tab5':
        numCols = 3;
        data = tab2Data;
        renderItem = renderTab3Item;
        break;
      default:
        return null;
    }
    return (
      <TabScene
        numCols={numCols}
        data={data}
        renderItem={renderItem}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                type: TABSCENE_TYPE.FLATLIST,
                value: ref,
              });
            }
          }
        }}
      />
    );
  };

  const renderTabBar = props => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{ translateY: y }],
          width: '100%',
        }}>
        <TabBar
          {...props}
          onTabPress={({ route, preventDefault }) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          tabStyle={{
            width: 'auto',
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
          renderIndicator={renderIndicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={index => setIndex(index)}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

export const MemoizedScrollHead = React.memo(ScrollHead);

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    position: 'absolute',
  },
  label: { fontSize: 16, color: '#222' },
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: 'white' },
  indicator: {
    backgroundColor: '#FF69AD',
    borderRadius: 5,
    height: 10,
    marginBottom: 12,
    marginLeft: 6,
  },
});
