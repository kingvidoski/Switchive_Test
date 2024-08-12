import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Size from '@/Utils/useResponsiveSize';
import colors from '@/configs/colors';
import fonts from '@/configs/fonts';

interface ButtonProps {
  title?: string;
  labelStyle?: TextStyle;
  style?: ViewStyle;
  onPress: () => void;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  bgColor: string;
  isLoading?: boolean;
  isDisable?: boolean;
  replaceDefaultContent?: JSX.Element;
  labelWeight?: any;
}

const Button = ({
  title,
  labelStyle,
  style,
  onPress,
  iconLeft,
  iconRight,
  bgColor,
  isLoading,
  isDisable,
  replaceDefaultContent,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.butnContainer,
        {backgroundColor: isLoading ? colors.TRENDING_GRAY : bgColor},
        style,
        isDisable && {opacity: 0.4},
      ]}
      disabled={isDisable}
      activeOpacity={0.7}
      onPress={onPress}>
      {isLoading && (
        <ActivityIndicator
          size={'small'}
          color={colors.WHITE}
          style={{marginRight: 8}}
        />
      )}

      {replaceDefaultContent && replaceDefaultContent}
      {iconRight}
      {title && <Text style={[styles.label, labelStyle]}>{title}</Text>}
      {iconLeft}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  butnContainer: {
    paddingVertical: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: Size.getWidth() * 0.805,
    position: 'relative',
  },
  label: {
    fontSize: Size.calcWidth(16),
    color: colors.DEEP_BLACK,
    fontFamily: fonts.ROBOTO_300,
    textAlign: 'center',
    marginBottom: 1,
    letterSpacing: 0.3,
  },
});
