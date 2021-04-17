import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

type Props = {
  onSearch?: Function;
  toCart?: () => any;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({
  onSearch,
  toCart,
  placeholder,
}: Props) => {
  const [query, setQuery] = useState('');
  const onSearchPress = () => typeof onSearch === 'function' && onSearch(query);
  return (
    <View style={styles.container}>
      {typeof toCart === 'function' && (
        <TouchableOpacity onPress={toCart} style={styles.cart} />
      )}
      <TextInput
        underlineColorAndroid="transparent"
        style={styles.input}
        onChangeText={setQuery}
        multiline={false}
        maxLength={80}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        selectionColor="#FFD5D1"
      />
      <TouchableOpacity style={styles.searchWrap} onPress={onSearchPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    backgroundColor: '#f1f1f1',
    flex: 1,
    height: 36,
    borderRadius: 18,
    paddingLeft: 10,
    paddingRight: 44,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
  },
  searchWrap: {
    position: 'absolute',
    right: 25,
    top: 10,
    bottom: 10,
    width: 24,
    backgroundColor: 'yellow',
  },
  cart: {
    width: 32,
    height: 32,
    marginRight: 10,
    backgroundColor: 'yellow',
  },
});
