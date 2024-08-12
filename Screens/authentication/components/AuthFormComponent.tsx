import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useToggle from '@/Hooks/useToggle';
import {
  AppButton,
  AppText,
  AppView,
  ToastNotification,
  TouchableOpacity,
} from '@/components';
import {DropDwn, EmailIcon, EyeIcon, LockIcon, UserIcon} from '@/assets/icons';
import fonts from '@/configs/fonts';
import colors from '@/configs/colors';
import {useNavigation} from '@react-navigation/native';
import {
  AuthScreenProps,
  LoginScreenProps,
  SignUpScreenProps,
} from '@/types/general';
import routes from '@/navigation/routes';
import Size from '@/Utils/useResponsiveSize';
import {ISignUpData} from '@/types/api/auth.types';
import {getData, storeData} from '@/Utils/useAsyncStorage';
import {useAppDispatch} from '@/Hooks/reduxHook';
import {setUserState} from '@/store/slices/userSlice';
import Animated from 'react-native-reanimated';
import {useAnimatedShake} from '@/Hooks/useShakeAnimation';
import {hasUserDetails} from '@/Screens/SplashScreens/SplashScreen';

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface Props {
  login?: boolean;
  signUp?: boolean;
  setIsCountryCode?: React.Dispatch<React.SetStateAction<boolean>>;
  countryCode?: {
    cc: string;
    cf: string;
  };
  keyboardStatus?: boolean;
}

const AuthFormComponent = ({
  login,
  signUp,
  countryCode,
  setIsCountryCode,
  keyboardStatus,
}: Props) => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<SignUpScreenProps>();
  const navLG = useNavigation<LoginScreenProps>();
  const authNav = useNavigation<AuthScreenProps>();
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [toogle, setToogle] = useToggle(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {shake, rStyle, isShaking} = useAnimatedShake();

  const emptyVaiables =
    firstName === '' &&
    email === '' &&
    password === '' &&
    passwordConfirm === '' &&
    phoneNo === '';

  async function resetState() {
    setEmail('');
    setFirstName('');
    setPassword('');
    setPasswordConfirm('');
    setPhoneNo('');
    setError('');
  }

  const handleSignUpFunc = async () => {
    try {
      if (emptyVaiables) {
        setError('All fields are required');
        setTimeout(() => setError(''), 3000);
        return;
      } else {
        if (regex.test(email) && password === passwordConfirm) {
          setLoading(true);
          const userDtails: ISignUpData = {
            email,
            f_name: firstName.split(',')[0],
            l_name: firstName.split(',')[1],
            phone:
              phoneNo.length > 10 ? phoneNo : `${countryCode?.cc}${phoneNo}`,
            password,
          };

          setTimeout(() => {
            ToastNotification('success', `OTP was sent to ${email}`);
            navigate(routes.VERIFY_OTP, {IUser: userDtails});
            resetState();
            setLoading(false);
          }, 4000);
        } else {
          setError('Invalid Credentials');
          setTimeout(() => setError(''), 3000);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      ToastNotification('error');
    }
  };

  const handleLoginFunc = async () => {
    try {
      if (regex.test(email)) {
        setLoading(true);
        const isUser = await getData(hasUserDetails);

        if (isUser) {
          const userDetails: ISignUpData = JSON.parse(isUser);

          if (
            userDetails.email.trim() === email.trim() &&
            userDetails.password.trim() === password.trim()
          ) {
            ToastNotification('success', `Login was successful`);

            authNav.reset({
              index: 0,
              routes: [{name: routes.MAIN}],
            });
            setLoading(false);
            resetState();
          } else {
            setError('Invalid credentials');
            setLoading(false);
            setTimeout(() => setError(''), 3000);
            return;
          }
        }
      } else {
        setError('Invalid Credentials');
        setLoading(false);
        setTimeout(() => setError(''), 3000);
        return;
      }
    } catch (error) {
      console.log(error);
      ToastNotification('error');
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      shake();
      console.log('error');
    }
  }, [error]);

  return (
    <AppView className="w-full">
      {error !== '' && (
        <AppText className="font-ROBOTO_400 text-sm text-red text-center mb-4 -mt-2">
          {error}
        </AppText>
      )}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={[
          rStyle,
          {
            paddingHorizontal: Size.calcHeight(20),
            marginTop: Size.getHeight() < 668 ? 12 : 0,
            width: '99%',
          },
          signUp && {height: '45%'},
        ]}
        contentContainerStyle={
          signUp && {
            paddingBottom: keyboardStatus
              ? 180
              : Platform.OS === 'ios'
              ? 60
              : 0,
          }
        }>
        <AppView className="space-y-3 items-center">
          {/* FIRST NAME */}
          {signUp && (
            <AppView
              style={{
                paddingVertical: Platform.OS === 'ios' ? 19 : 14,
              }}
              className="px-5 w-full rounded-[30px] items-center flex-row border border-border_grey">
              <UserIcon />
              <TextInput
                placeholder="Name, Last name"
                placeholderTextColor="#9a9a9a"
                value={firstName}
                onChangeText={text => setFirstName(text)}
                style={[styles.inputText, {marginLeft: 11, flex: 1}]}
              />
            </AppView>
          )}

          {/* EMAIL */}
          {/* {!reset && ( */}
          <AppView
            style={{
              paddingVertical: Platform.OS === 'ios' ? 19 : 14,
            }}
            className=" px-5 w-full rounded-[30px] items-center flex-row border border-border_grey">
            <EmailIcon />
            <TextInput
              placeholder="Email address"
              placeholderTextColor="#9a9a9a"
              value={email}
              onChangeText={text => setEmail(text)}
              style={[styles.inputText, {marginLeft: 11, flex: 1}]}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </AppView>
          {/* )} */}

          {/* PHONE NUMBEER */}
          {signUp && countryCode && setIsCountryCode && (
            <AppView
              style={[
                //   styles.textInput,
                //   Platform.OS === 'android' && {
                //     paddingTop: Size.calcHeight(2),
                //     paddingBottom: Size.calcHeight(3),
                //   },
                {paddingVertical: 14},
              ]}
              className=" px-5 w-full rounded-[30px] items-center flex-row border border-border_grey">
              <Pressable
                style={[styles.center, {columnGap: 4}]}
                onPress={() => setIsCountryCode(true)}>
                <AppView className="w-7 h-7 mr-1.5 rounded-full items-center justify-center overflow-hidden">
                  <AppText className="text-[50px] -mt-4 -ml-3">
                    {countryCode.cf}
                  </AppText>
                </AppView>
                <DropDwn />
                <AppText
                  style={[
                    styles.inputText,
                    {
                      color: phoneNo !== '' ? colors.DEEP_BLACK : '#9a9a9a',
                      marginLeft: 6,
                    },
                  ]}>
                  {countryCode.cc}
                </AppText>
              </Pressable>
              <TextInput
                placeholder="111 222 333"
                placeholderTextColor="#9a9a9a"
                value={phoneNo}
                onChangeText={setPhoneNo}
                keyboardType="number-pad"
                // maxLength={} TODO: regulate max base on country code
                style={[styles.inputText, {flex: 1, marginLeft: 11}]}
              />
            </AppView>
          )}

          {/* PASSWORD */}
          <AppView
            style={{
              paddingVertical: Platform.OS === 'ios' ? 19 : 14,
            }}
            className=" px-5 w-full rounded-[30px] items-center flex-row border border-border_grey">
            <LockIcon />
            <AppView className="w-full flex-row flex-1 items-center ml-[11px]">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9a9a9a"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={toogle}
                style={[styles.inputText, {flex: 1}]}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={setToogle} className="relative">
                {toogle && (
                  <AppView className="absolute top-1 w-5 h-[2px] bg-[#cecece] rotate-[40deg]" />
                )}
                <EyeIcon />
              </TouchableOpacity>
            </AppView>
          </AppView>

          {/* CONFIRM PASSWORD */}
          {signUp && (
            <AppView
              style={{
                paddingVertical: Platform.OS === 'ios' ? 19 : 14,
              }}
              className="px-5 w-full rounded-[30px] items-center flex-row border border-border_grey">
              <LockIcon />
              <AppView className="w-full flex-row flex-1 items-center ml-[11px]">
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#9a9a9a"
                  onChangeText={text => setPasswordConfirm(text)}
                  value={passwordConfirm}
                  secureTextEntry={toogle}
                  style={[styles.inputText, {flex: 1}]}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity onPress={setToogle} className="relative">
                  {toogle && (
                    <AppView className="absolute top-1 w-5 h-[2px] bg-[#cecece] rotate-[40deg]" />
                  )}
                  <EyeIcon />
                </TouchableOpacity>
              </AppView>
            </AppView>
          )}
        </AppView>
      </Animated.ScrollView>

      <AppView className="mt-5 items-center">
        {signUp && (
          <AppView className="space-y-3">
            <AppButton
              bgColor={colors.PUMPKIN}
              title="SIGN UP"
              onPress={handleSignUpFunc}
              style={styles.shadow}
              isLoading={loading}
              labelStyle={{color: colors.DEEP_BLACK}}
            />
          </AppView>
        )}

        {login && (
          <AppView className="space-y-3 w-full items-center">
            <AppButton
              bgColor={colors.PUMPKIN}
              title="LOGIN"
              onPress={handleLoginFunc}
              style={{...styles.shadow, width: '90%'}}
              isLoading={loading}
              labelStyle={{color: colors.DEEP_BLACK}}
            />
          </AppView>
        )}

        {signUp && (
          <AppView className="flex-row items-center mt-5">
            <AppText className="font-ROBOTO_400 text-[15px] text-black_1/50">
              Already have account?
            </AppText>
            <Pressable
              style={{marginLeft: 5, marginBottom: 1.5}}
              onPress={() => navigate(routes.LOGIN_SCREEN)}>
              <AppText className="font-ROBOTO_400 text-[14px] text-deep_black underline">
                Login
              </AppText>
            </Pressable>
          </AppView>
        )}
      </AppView>
    </AppView>
  );
};

export default AuthFormComponent;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.TRENDING_GRAY,
    shadowOffset: {
      width: -2,
      height: 8,
    },
    shadowOpacity: 0.55,
    shadowRadius: 9.27,
    elevation: 10,
  },
  inputText: {
    fontFamily: fonts.ROBOTO_300,
    fontSize: 15,
    color: colors.DEEP_BLACK,
    padding: 0,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
