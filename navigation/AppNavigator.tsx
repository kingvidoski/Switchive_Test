import {View, Text} from 'react-native';
import React from 'react';
import routes from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@/Screens/SplashScreens/SplashScreen';
import AuthNavigation from './AuthNavigation';
import AppStack from './AppStack';

const RootStack = createNativeStackNavigator();

export type RootStackParamList = {
  [routes.SPLASH_SCREEN]: undefined;
  [routes.MAIN]: undefined;
  [routes.AUTH]: any;
};

const AppNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={routes.SPLASH_SCREEN}
      screenOptions={{
        header: () => null,
      }}>
      <RootStack.Group>
        <RootStack.Screen
          name={routes.SPLASH_SCREEN}
          component={SplashScreen}
        />
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen name={routes.AUTH} component={AuthNavigation} />
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen name={routes.MAIN} component={AppStack} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default AppNavigator;
