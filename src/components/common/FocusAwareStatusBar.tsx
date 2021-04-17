import * as React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

type FocusAwareStatusBarProps = StatusBarProps;

export function FocusAwareStatusBar(props: FocusAwareStatusBarProps) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}
