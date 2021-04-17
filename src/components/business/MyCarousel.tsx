import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const entries = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const _renderItem = ({ item }: any) => {
  return <View style={styles.carouselCard} key={item.id} />;
};

export const MyCarousel: React.FC = ({}) => {
  const [activeSlide, SetActiveSlide] = useState(0);
  return (
    <>
      <Carousel
        data={entries}
        autoplay={global.isIOS}
        loop={global.isIOS}
        renderItem={_renderItem}
        sliderWidth={global.windowWidth}
        itemWidth={global.windowWidth}
        onSnapToItem={index => SetActiveSlide(index)}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainerStyle}
        dotContainerStyle={styles.paginationDotContainerStyle}
        dotStyle={styles.paginationActiveDotStyle}
        inactiveDotStyle={styles.paginationInactiveDotStyle}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  carouselCard: {
    marginHorizontal: 15,
    width: global.windowWidth - 30,
    aspectRatio: 3,
    backgroundColor: 'cyan',
    borderRadius: 30,
  },
  paginationContainerStyle: {
    paddingVertical: 5,
  },
  paginationDotContainerStyle: {
    marginHorizontal: 4,
  },
  paginationActiveDotStyle: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8CD1E6',
  },
  paginationInactiveDotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C5E8F2',
  },
});
