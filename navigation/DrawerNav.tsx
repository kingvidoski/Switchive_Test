import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import routes from './routes';
import ProductScreen from '@/Screens/Home/ProductScreen';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

export type DrawerParamList = {
  [routes.PRODUCT_SCREEN]: undefined;
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
      }}>
      <Drawer.Screen name="Home" component={ProductScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
