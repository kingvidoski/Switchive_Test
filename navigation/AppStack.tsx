import {View, Text} from 'react-native';
import React from 'react';
import routes from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@/Screens/SplashScreens/SplashScreen';
import AuthNavigation from './AuthNavigation';
import DrawerNav from './DrawerNav';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ViewProduct from '@/Screens/Home/ViewProduct';
import {IProductData} from '@/types/api/product.types';

const MainStack = createSharedElementStackNavigator();

export type MainStackParamList = {
  [routes.DRAWER_NAV]: undefined;
  [routes.VIEW_PRODUCT_SCREEN]: {product: IProductData};
};

const AppStack = () => {
  return (
    <MainStack.Navigator
      initialRouteName={routes.DRAWER_NAV}
      screenOptions={{
        header: () => null,
      }}>
      <MainStack.Screen name={routes.DRAWER_NAV} component={DrawerNav} />
      <MainStack.Screen
        name={routes.VIEW_PRODUCT_SCREEN}
        component={ViewProduct}
        sharedElements={(route, otherRoute, showing) => {
          const {product} = route.params;
          console.log(product);
          return [`${product.title}`];
        }}
      />
    </MainStack.Navigator>
  );
};

export default AppStack;
