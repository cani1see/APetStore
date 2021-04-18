import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const entries = [
  [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ],
  [
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ],
  [
    {
      id: 7,
    },
    {
      id: 8,
    },
  ],
];

const _renderItem = ({ item: itemTime3 }) => {
  return (
    <View style={styles.carouselRow}>
      {/* eslint-disable-next-line */}
      {itemTime3.map(item => {
        return (
          <View key={item.id} style={styles.discountItem}>
            <View style={styles.itemImageContainer}>
              <View style={styles.priceWrap}>
                <Text style={styles.price}>￥59</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export const DailyDiscount: React.FC = ({}) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>限时特价</Text>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>每日更新</Text>
      </View>
    </View>
    <View style={styles.carouselWrap}>
      <Carousel
        data={entries}
        autoplay={global.isIOS}
        loop={global.isIOS}
        renderItem={_renderItem}
        sliderWidth={global.windowWidth - 150}
        itemWidth={global.windowWidth - 150}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { height: 100, backgroundColor: '#eee', flexDirection: 'row' },
  titleContainer: {
    marginLeft: 22,
    paddingHorizontal: 8,
    width: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FF69AD',
    marginTop: 20,
    marginBottom: 9,
  },
  subTitleContainer: {
    backgroundColor: '#8CD1E6',
    borderRadius: 5,
    height: 24,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    color: '#222222',
    fontSize: 14,
  },
  carouselWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 16,
  },
  carouselRow: { flexDirection: 'row', height: 100, alignItems: 'center' },
  discountItem: {
    width: (global.windowWidth - 150) / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceWrap: {
    position: 'absolute',
    width: 48,
    height: 20,
    backgroundColor: '#FF69AD',
    bottom: -10,
    right: -4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImageContainer: { width: 64, height: 64, backgroundColor: 'pink' },
  price: { color: 'white', fontSize: 14 },
});
