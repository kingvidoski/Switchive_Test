import {View, Text} from 'react-native';
import React from 'react';
import {AppScreen, AppText, AppView, TouchableOpacity} from '@/components';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {MenuBar} from '@/assets/icons';
import ProductList from './ProductList';

const ProductScreen = () => {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <AppView className="px-6">
        <AppView className="flex-row items-center justify-between mt-3">
          <TouchableOpacity
            className="ml-auto"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MenuBar />
          </TouchableOpacity>
        </AppView>
      </AppView>
      <AppText className="mt-6 font-ROBOTO_500 text-[28px] text-deep_black">
        Some sweets of
      </AppText>
      <AppText className="font-ROBOTO_300 text-base text-deep_black">
        Happiness!
      </AppText>

      {/* product list here */}
      <ProductList />
    </AppScreen>
  );
};

export default ProductScreen;
