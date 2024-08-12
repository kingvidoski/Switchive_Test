import {
  Platform,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {AppText, AppView} from '@/components';
import {ArrowLeft, HamburgerIcon} from '@/assets/icons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  style?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  hideback?: boolean;
  handleFunc?: () => void;
  hidemenu?: boolean;
  handleMenuFunc?: () => void;
  replaceDefaultContent?: JSX.Element;
}

const AppHeader = ({
  style,
  hideback,
  hidemenu,
  handleMenuFunc,
  handleFunc,
  label,
  labelStyle,
  replaceDefaultContent,
}: Props) => {
  const {goBack} = useNavigation();

  return (
    <AppView
      style={[style, Platform.OS === 'android' && {marginTop: 8}]}
      className="flex-row items-center justify-center w-full relative">
      {!hideback && (
        <Pressable
          onPress={
            handleFunc ? handleFunc : handleMenuFunc ? handleMenuFunc : goBack
          }
          style={{position: 'absolute', left: 0}}>
          <AppView className="rotate-180 bg-white rounded-full p-2">
            <ArrowLeft />
          </AppView>
        </Pressable>
      )}

      {replaceDefaultContent ? (
        replaceDefaultContent
      ) : (
        <AppText
          style={labelStyle}
          className="text-sm font-ROBOTO_300 text-deep_black">
          {label}
        </AppText>
      )}

      {!hidemenu && (
        <Pressable
          onPress={() =>
            handleMenuFunc
              ? handleMenuFunc()
              : console.log('do soomething to menu')
          }
          style={{position: 'absolute', right: 0}}>
          <HamburgerIcon />
        </Pressable>
      )}
    </AppView>
  );
};

export default AppHeader;
