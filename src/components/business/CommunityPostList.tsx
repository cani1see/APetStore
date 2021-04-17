import { Text, View } from 'react-native';
import { FlatList } from 'react-native-scroll-head-tab-view/index';
import React from 'react';

const ListData = new Array(20).fill({});

export function CommunityPostList(props) {
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginVertical: 2, padding: 10 }}>
        <Text>{'tab1 => ' + index}</Text>
      </View>
    );
  };
  return (
    <FlatList {...props} data={ListData} renderItem={renderItem} {...props} />
  );
}
