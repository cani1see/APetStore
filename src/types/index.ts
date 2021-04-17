import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  default: undefined;
  Home: undefined;
  Search: undefined;
};

export type DefaultNavigationProps<
  T extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, T>;
