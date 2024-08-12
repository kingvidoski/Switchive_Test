import {View, Text, Pressable, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ViewProductScreenRouteProps} from '@/types/general';
import {
  AppButton,
  AppHeader,
  AppImage,
  AppScreen,
  AppText,
  AppView,
  ToastNotification,
} from '@/components';
import Size from '@/Utils/useResponsiveSize';
import {SharedElement} from 'react-navigation-shared-element';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {truncateText} from '@/Utils/truncateText';
import colors from '@/configs/colors';
import fonts from '@/configs/fonts';
import {getData, storeData} from '@/Utils/useAsyncStorage';

const AnimatedView = Animated.createAnimatedComponent(AppView);

const ViewProduct = () => {
  const route = useRoute<ViewProductScreenRouteProps>();
  const {product} = route.params;
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const [isFavItems, setIsFavItems] = useState<string[]>([]);

  async function getFavItems() {
    const favItems = await getData('fav');
    if (favItems) {
      const items: string[] = JSON.parse(favItems);
      setIsFavItems(items);
    }
  }

  async function handleAddToFav() {
    // add to fav
    setIsFavItems(prev => [...prev, product.id.toString()]);
    await storeData(
      'fav',
      JSON.stringify([...isFavItems, product.id.toString()]),
    );
    ToastNotification('info', 'Product added to Favorites');
  }

  useEffect(() => {
    getFavItems();
  }, []);

  return (
    <AppView className="h-full w-full relative">
      {/* <StatusBar barStyle={'light-content'} /> */}
      <AppView className="px-6 mt-20">
        <AppHeader hidemenu />
      </AppView>

      <AnimatedView
        style={[
          {
            height: Size.hp(60),
            // backgroundColor: 'rgba(144, 144, 144, 0.15)',
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          },
        ]}
        className="items-center justify-center overflow-hidden absolute -top-2 -z-10 w-full">
        {/* <SharedElement
          id={product.title}
          style={{
            width: '100%',
            height: Size.hp(55),
          }}> */}
        <AppImage
          source={{uri: product.thumbnail}}
          style={{
            width: '100%',
            height: Size.hp(60),
          }}
          resizeMode={'cover'}
        />
        {/* </SharedElement> */}
      </AnimatedView>

      <AnimatedView
        entering={FadeInDown.delay(300).springify()}
        style={[styles.shadow, {marginTop: Size.hp(40)}]}
        className="px-6 pt-5 bg-white rounded-t-3xl h-full">
        <AppText className="font-ROBOTO_500 text-2xl mb-1 text-deep_black text-center">
          {product.title}
        </AppText>

        {product.description.length > 60 ? (
          <AppText className="leading-5 mt-1 font-ROBOTO_300 text-[13px] text-deep_black/60">
            {isReadMore
              ? product.description
              : truncateText(60, product.description)}
            {!isReadMore && (
              <Pressable onPress={() => setIsReadMore(!isReadMore)}>
                <AppText className="ml-1 font-ROBOTO_400 text-[13px] text-blue_1 underline">
                  read more
                </AppText>
              </Pressable>
            )}
          </AppText>
        ) : (
          <AppText className="leading-5 mt-1 font-ROBOTO_300 text-[13px] text-deep_black/60">
            {product.description}
          </AppText>
        )}

        <AppView className="mt-3">
          <AppText className="font-ROBOTO_400 text-xl text-deep_black">
            ${product.price}
          </AppText>
        </AppView>
      </AnimatedView>

      <AnimatedView
        // style={rStyle}
        className="absolute bottom-10 w-full items-center">
        <AppButton
          bgColor={colors.PUMPKIN}
          isDisable={isFavItems.includes(product.id.toString())}
          title={
            isFavItems.includes(product.id.toString())
              ? 'Item added'
              : 'Add to favorites'
          }
          onPress={handleAddToFav}
          labelStyle={{
            color: colors.WHITE,
            fontFamily: fonts.ROBOTO_700,
            fontSize: 17,
          }}
        />
      </AnimatedView>
    </AppView>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.TRENDING_GRAY,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.55,
    shadowRadius: 9.27,
    elevation: 10,
  },
});
