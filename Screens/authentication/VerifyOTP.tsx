import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AppImage,
  AppScreen,
  AppText,
  AppView,
  ToastNotification,
} from '@/components';
import OTPInput from '@/components/OTPInput';
import colors from '@/configs/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthScreenProps, VerifyScreenRouteProps} from '@/types/general';
import routes from '@/navigation/routes';
import {useAppDispatch} from '@/Hooks/reduxHook';
import {setUserState} from '@/store/slices/userSlice';
import {getData, storeData} from '@/Utils/useAsyncStorage';
import {hasUserDetails} from '../SplashScreens/SplashScreen';

const VerifyOTP = () => {
  const [codes, setCodes] = useState<string>('');
  const route = useRoute<VerifyScreenRouteProps>();
  const {IUser} = route.params;
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const authNav = useNavigation<AuthScreenProps>();
  const dispatch = useAppDispatch();

  async function handleOtp() {
    try {
      setLoading(true);

      setTimeout(async () => {
        ToastNotification('success', `${IUser.email} has been verified`);
        await storeData(hasUserDetails, JSON.stringify(IUser));
        dispatch(setUserState(IUser));

        authNav.reset({
          index: 0,
          routes: [{name: routes.MAIN}],
        });
        setLoading(false);
      }, 4000);
    } catch (error) {
      console.log(error);
      ToastNotification('error');
    }
  }

  return (
    <AppScreen>
      <AppView className="items-center mt-20">
        <AppImage
          source={require('@/assets/images/getStarted.png')}
          className="object-contain w-[130px] h-[130px] rounded-full"
        />

        <AppText className="font-ROBOTO_400 text-xl text-deep_black mt-5">
          Verification codes OTP
        </AppText>

        <AppText className="font-ROBOTO_300 text-[13px] text-black_1/60 leading-[18px] text-center max-w-[80%] mt-2 mb-10">
          A verification code has been sent to: {'\n'} {IUser.email}
        </AppText>
      </AppView>

      <AppView className="px-5">
        <AppView className="py-[4px] pb-[10px] px-5 w-full rounded-[30px] items-center justify-center border border-border_grey">
          <OTPInput pinCount={6} handleCode={code => setCodes(code)} />
        </AppView>

        <AppView className="mt-6">
          <AppButton
            isLoading={loading}
            bgColor={colors.PUMPKIN}
            title="NEXT"
            isDisable={codes.length < 6}
            onPress={handleOtp}
            style={styles.shadow}
            labelStyle={{color: colors.DEEP_BLACK}}
          />
        </AppView>
      </AppView>
    </AppScreen>
  );
};

export default VerifyOTP;

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
});
