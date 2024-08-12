import {View, Text, Pressable, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppImage, AppScreen, AppText, AppView} from '@/components';
import AuthFormComponent from './components/AuthFormComponent';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenProps} from '@/types/general';
import routes from '@/navigation/routes';

const Login = () => {
  const {navigate} = useNavigation<LoginScreenProps>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, [Keyboard]);

  return (
    <AppScreen containerStyle={{position: 'relative'}}>
      <AppView className="items-center mt-20">
        <AppImage
          source={require('@/assets/images/getStarted.png')}
          className="object-contain w-[130px] h-[130px] rounded-full"
        />

        <AppText className="font-ROBOTO_400 text-3xl text-deep_black text-center max-w-[80%] mt-5">
          Hello Again!
        </AppText>
        <AppText className="font-ROBOTO_300 text-sm text-deep_black/70 text-center max-w-[80%] mb-7">
          Welcome back you've been missed
        </AppText>

        <AuthFormComponent login />
      </AppView>

      {!keyboardStatus && (
        <AppView className="absolute bottom-2 w-full items-center space-y-[3px]">
          <AppView className="flex-row items-center mt-5">
            <AppText className="font-ROBOTO_400 text-[15px] text-black_1/50">
              Do not have account?
            </AppText>
            <Pressable
              style={{marginLeft: 5}}
              onPress={() => navigate(routes.SIGNUP_SCREEN)}>
              <AppText className="font-ROBOTO_400 text-[14px] text-deep_black underline">
                Sign Up
              </AppText>
            </Pressable>
          </AppView>
        </AppView>
      )}
    </AppScreen>
  );
};

export default Login;
