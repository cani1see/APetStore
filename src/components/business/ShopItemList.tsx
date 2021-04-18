import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

const ListData = new Array(20).fill({});

export const ShopItemListRenderer = (item) => {
  return (
    <View style={[styles.cardShadow]}>
      <View style={styles.card}>
        <View style={styles.postImage} />
        <View style={styles.contentContainer}>
          <View style={styles.firstLine}>
            <View>
              <Text style={{ color: '#222222', fontSize: 12 }}>
                大龄铲屎官...
              </Text>
            </View>
            <View style={styles.likesWrap}>
              <Text style={styles.likes}>124 赞</Text>
              <View style={styles.likeIcon} />
            </View>
          </View>
          {item.id % 2 === 0 ? (
            <Text style={styles.title}>怎么今天看起来</Text>
          ) : (
            <Text style={styles.title}>怎么今天看起来特别的有精神？？？</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    elevation: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowColor: '#000000',
    shadowRadius: 20,
    padding: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 30,
  },
  card: {
    width: (global.windowWidth - 30) / 2,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  postImage: {
    backgroundColor: 'orange',
    height: undefined,
    aspectRatio: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  title: {
    marginBottom: 9,
    fontSize: 14,
    color: '#222222',
    fontWeight: 'bold',
  },
  likeIcon: { width: 32, height: 32, backgroundColor: '#FF69AD' },
  likes: { color: '#999999', fontSize: 12 },
  likesWrap: { flexDirection: 'row', alignItems: 'center' },
});
