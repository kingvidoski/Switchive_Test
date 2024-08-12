import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '@/configs/colors';
import {getData, storeData} from '@/Utils/useAsyncStorage';
import {useNavigation} from '@react-navigation/native';
import routes from '@/navigation/routes';
import {SplashScreenProps} from '@/types/general';
import {useAppDispatch, useAppSelector} from '@/Hooks/reduxHook';
import {selectUserState, setUserState} from '@/store/slices/userSlice';
import LottieView from 'lottie-react-native';

const HAS_ONBOARD = 'isOnboard';
export const hasUserDetails = 'user';

const Splashscreen = () => {
  const navigation = useNavigation<SplashScreenProps>();
  const dispatch = useAppDispatch();
  const User = useAppSelector(selectUserState);

  function handleNav() {
    if (User.email.length > 0) {
      // Once user is valid you can use refresh and access token to validate
      // /before deciding either to send user to LOGIN screen or HOME screen
      navigation.replace(routes.AUTH, {screen: routes.LOGIN_SCREEN});
    } else {
      navigation.replace(routes.AUTH, {screen: routes.SIGNUP_SCREEN});
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await getData(hasUserDetails);
      if (user) {
        const userDetails = JSON.parse(user);
        dispatch(setUserState(userDetails));
      }
      console.log(user);
    };

    getUser();
  }, []);

  return (
    <SafeAreaView style={[styles.center, styles.container]}>
      <StatusBar hidden />

      <LottieView
        source={require('@/assets/lottie/splash.json')}
        autoPlay
        onAnimationFinish={() => handleNav()}
        loop={false}
        style={{
          width: 400,
          height: 400,
        }}
      />
    </SafeAreaView>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    position: 'relative',
  },
});
