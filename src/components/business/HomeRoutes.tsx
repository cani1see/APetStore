import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const routers = [
  { title: '手帐' },
  { title: '医院' },
  { title: '美容' },
  { title: '酒店' },
  { title: '保险' },
  { title: '共享' },
  { title: '餐厅' },
  { title: '住房' },
];

export const HomeRoutes: React.FC = ({}) => (
  <View style={styles.container}>
    {routers.map((route, index) => {
      return (
        <TouchableOpacity key={index} style={styles.item}>
          <View style={styles.iconWrap} />
          <Text style={styles.itemTitle}>{route.title}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    paddingHorizontal: 15,
  },
  item: {
    width: '25%',
    alignItems: 'center',
  },
  iconWrap: {
    width: 32,
    height: 32,
    backgroundColor: 'green',
  },
  itemTitle: {
    color: '#999999',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 5,
  },
});
