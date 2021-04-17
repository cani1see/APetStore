import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';

export function CommunityScreen() {
  const navigation = useNavigation();
  const toSearch = useCallback(() => navigation.navigate('Search'), [
    navigation,
  ]);
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={styles.container}>
        <SearchBar placeholder="冻干猫粮" onSearch={toSearch} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
