import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  AppImage,
  AppScreen,
  AppText,
  AppView,
  TouchableOpacity,
} from '@/components';
import colors from '@/configs/colors';
import AuthFormComponent from './components/AuthFormComponent';
import country_codes from '@/configs/country_codes';
import BottomSheet from './components/BottomModal';
import Size from '@/Utils/useResponsiveSize';
import routes from '@/navigation/routes';
import {SignUpScreenProps} from '@/types/general';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const {navigate} = useNavigation<SignUpScreenProps>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [isCountryCode, setIsCountryCode] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState({
    cc: country_codes[0].dial_code,
    cf: country_codes[0].flag,
  });

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
    <>
      <AppScreen containerStyle={{position: 'relative'}}>
        <AppView className="items-center mt-10">
          <AppImage
            source={require('@/assets/images/getStarted.png')}
            className="object-contain w-[130px] h-[130px] rounded-full"
          />

          <AppText className="font-ROBOTO_400 text-3xl text-deep_black text-center max-w-[80%] mt-5">
            Welcome
          </AppText>
          <AppText className="font-ROBOTO_300 text-[13px] text-deep_black/70 text-center max-w-[80%] mb-7">
            Insert your details below Full Name, Email, {'\n'}Phone number
          </AppText>

          <AuthFormComponent
            signUp
            countryCode={countryCode}
            setIsCountryCode={setIsCountryCode}
            keyboardStatus={keyboardStatus}
          />
        </AppView>

        {!keyboardStatus && (
          <AppView className="absolute bottom-2 w-full items-center space-y-[3px]">
            <AppText className="font-ROBOTO_300 text-xs text-center text-black_1/70">
              By signing up youhave agreed to our
            </AppText>
            <AppView className="flex-row items-center">
              <TouchableOpacity>
                <AppText className="font-ROBOTO_300 text-xs text-center text-black_1">
                  Terms of Use{'  '}
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity>
                <AppText className="font-ROBOTO_300 text-xs text-center text-black_1">
                  & Privacy Policy
                </AppText>
              </TouchableOpacity>
            </AppView>
          </AppView>
        )}
      </AppScreen>

      {isCountryCode && (
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
          <View style={styles.bottomSheetContainer}>
            <Pressable
              onPress={() => setIsCountryCode(false)}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            <BottomSheet
              handleClose={() => setIsCountryCode(false)}
              handleNav={item =>
                setCountryCode({cc: item.dial_code, cf: item.flag})
              }
            />
          </View>
        </View>
      )}
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: Size.getWidth(),
    height: Size.getHeight(),
    position: 'relative',
  },
});
