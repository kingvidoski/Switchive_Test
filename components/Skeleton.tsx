import {View, Text, Animated} from 'react-native';
import {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Easing} from 'react-native-reanimated';
import Size from '@/Utils/useResponsiveSize';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  delay: number;
  big?: boolean;
};

const Skeleton = ({delay, big}: Props) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        delay: delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [big ? -Size.wp(70) : -100, big ? Size.wp(70) : 100],
  });

  return (
    <AnimatedLG
      colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'transparent']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        width: '100%',
        height: '100%',
        transform: [{translateX: translateX}],
      }}
    />
  );
};

export default Skeleton;
