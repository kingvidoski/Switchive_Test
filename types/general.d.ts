import {RootStackParamList} from '@/navigation/AppNavigator';
import {MainStackParamList} from '@/navigation/AppStack';
import {AuthStackParamList} from '@/navigation/AuthNavigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type SplashScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;
export type MainScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'MainScreen'
>;
export type AuthScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>;
export type LoginScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  'SignUpScreen'
>;
export type SignUpScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  'LoginScreen'
>;
export type VerifyScreenRouteProps = RouteProp<
  AuthStackParamList,
  'VerifyOtpScreen'
>;

export type ViewProductScreenRouteProps = RouteProp<
  MainStackParamList,
  'ViewProductScreen'
>;

export type HomeScreenRouteProps = NativeStackNavigationProp<
  MainStackParamList,
  'DrawerNav'
>;
