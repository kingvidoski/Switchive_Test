import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import Login from '@/Screens/authentication/Login';
import SignUp from '@/Screens/authentication/SignUp';
import {ISignUpData} from '@/types/api/auth.types';
import VerifyOTP from '@/Screens/authentication/VerifyOTP';

const Auth = createNativeStackNavigator();

export type AuthStackParamList = {
  [routes.LOGIN_SCREEN]: undefined;
  [routes.SIGNUP_SCREEN]: undefined;
  [routes.VERIFY_OTP]: {IUser: ISignUpData};
};

const AuthNavigation = () => {
  return (
    <Auth.Navigator
      initialRouteName={routes.LOGIN_SCREEN}
      screenOptions={{
        header: () => null,
        headerShown: false,
      }}>
      <Auth.Screen name={routes.SIGNUP_SCREEN} component={SignUp} />
      <Auth.Screen name={routes.LOGIN_SCREEN} component={Login} />
      <Auth.Screen name={routes.VERIFY_OTP} component={VerifyOTP} />
    </Auth.Navigator>
  );
};

export default AuthNavigation;
