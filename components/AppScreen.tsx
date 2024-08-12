import Size from '@/Utils/useResponsiveSize';
import colors from '@/configs/colors';
import {
  StyleSheet,
  View,
  ViewProps,
  ScrollView,
  ViewStyle,
  StatusBar,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
  containerStyle?: ViewStyle;
  scrollable?: boolean;
  showBackHeader?: boolean;
  statusBarHidden?: boolean;
}
const AppScreen = (props: ScreenProps): JSX.Element => {
  const {children, style, containerStyle, scrollable, statusBarHidden} = props;

  return (
    <SafeAreaView
      style={[
        styles.screen,
        containerStyle,
        Platform.OS === 'android' ? {flex: 1} : {height: Size.getHeight()},
      ]}>
      {statusBarHidden && <StatusBar hidden={true} />}

      {scrollable ? (
        <ScrollView
          bounces={false}
          // decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          style={[styles.view, style]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.view, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: Size.calcWidth(20),
  },
  view: {
    flex: 1,
  },
});

export default AppScreen;
