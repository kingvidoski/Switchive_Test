import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppImage,
  AppText,
  AppView,
  ToastNotification,
  TouchableOpacity,
} from '@/components';
import {IProductData} from '@/types/api/product.types';
import {getAllProducts} from '@/api/products.api';
import Size, {getColumnCount} from '@/Utils/useResponsiveSize';
import Skeleton from '@/components/Skeleton';
import {FlashList} from '@shopify/flash-list';
import colors from '@/configs/colors';
import {truncateText} from '@/Utils/truncateText';
import Animated, {FadeInDown} from 'react-native-reanimated';
import HeartIcon from 'react-native-heroicons/outline/HeartIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeScreenRouteProps} from '@/types/general';
import routes from '@/navigation/routes';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {getData} from '@/Utils/useAsyncStorage';

const AnimatedView = Animated.createAnimatedComponent(AppView);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ProductList = () => {
  const columns = getColumnCount();
  const {bottom} = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductData[]>([]);
  const [limit, setLimit] = useState<number>(30);
  const [isFavItems, setIsFavItems] = useState<string[]>([]);
  const isFocused = useIsFocused();

  async function getFavItems() {
    const favItems = await getData('fav');
    if (favItems) {
      const items: string[] = JSON.parse(favItems);
      setIsFavItems(items);
    }
  }

  async function handleProducts(limit: number, isLoadMore?: boolean) {
    try {
      !isLoadMore && setLoading(true);
      const res = await getAllProducts(limit);
      if (res.ok && res.data) {
        setProducts(res.data.products);
      } else {
        //@ts-ignore
        ToastNotification('error', res.data.message);
        setError(true);
      }
    } catch (error) {
      ToastNotification('error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleProducts(30);
  }, []);

  useEffect(() => {
    getFavItems();
    handleProducts(limit, true);
  }, [isFocused]);

  return (
    <AppView className="w-full h-full flex-1 mt-7">
      {error ? (
        <LottieView
          source={require('@/assets/lottie/error.json')}
          autoPlay
          onAnimationFinish={() => handleProducts(30)}
          style={{
            width: 400,
            height: 400,
            marginTop: Size.hp(1),
            alignSelf: 'center',
          }}
        />
      ) : (
        <FlashList
          data={loading ? [...Array(10)] : products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={() => [
            handleProducts(limit + 20, true),
            setLimit(limit + 20),
          ]}
          numColumns={columns}
          ListFooterComponent={
            <>
              {products.length > 0 && !loading && !error && (
                <ActivityIndicator size={'large'} color={colors.BORDERE_GREY} />
              )}
            </>
          }
          renderItem={({item, index}) => {
            const isLastInRow = () => {
              return (index + 1) % columns === 0;
            };

            if (loading) return <LoadingCard isLastInRow={isLastInRow} />;
            else
              return (
                <ProductCard
                  index={index}
                  item={item}
                  isLastInRow={isLastInRow}
                  isFavItems={isFavItems}
                />
              );
          }}
          estimatedItemSize={1000}
        />
      )}
    </AppView>
  );
};

export default ProductList;

interface ProductCardPros {
  item: IProductData;
  isLastInRow: () => boolean;
  index: number;
  isFavItems: string[];
}

export const ProductCard = ({
  item,
  index,
  isFavItems,
  isLastInRow,
}: ProductCardPros) => {
  const {push} = useNavigation<HomeScreenRouteProps>();
  return (
    <AnimatedTouchable
      onPress={() =>
        push(routes.VIEW_PRODUCT_SCREEN, {
          product: item,
        })
      }
      entering={FadeInDown.delay(index * 300).springify()}
      style={{marginLeft: isLastInRow() ? 10 : 0}}
      className="mb-7 flex-1 bg-white relative">
      <HeartIcon
        size={24}
        style={{position: 'absolute', top: 10, right: 10}}
        color={
          isFavItems.includes(item.id.toString())
            ? colors.RED
            : colors.TRENDING_GRAY
        }
        fill={
          isFavItems.includes(item.id.toString()) ? colors.RED : 'transparent'
        }
      />
      <AppView
        style={{
          width: '100%',
          height: 200,
          borderRadius: 10,
        }}
        className="bg-grey_2/20">
        <AppImage
          source={{uri: item.thumbnail}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
        />
      </AppView>
      <AppView className="flex-row items-start gap-x-2 pl-1.5 mt-2">
        <AppText className="flex-1 font-ROBOTO_400 text-deep_black/70 text-[14px]">
          {truncateText(25, item.title)}
        </AppText>
        <AppText className="text-sm ml-auto text-red font-ROBOTO_300">
          ${item.price}
        </AppText>
      </AppView>
    </AnimatedTouchable>
  );
};

interface LoadingProps {
  isLastInRow: () => boolean;
}

export const LoadingCard = ({isLastInRow}: LoadingProps) => {
  return (
    <AppView
      style={{paddingRight: !isLastInRow() ? 10 : 0}}
      className="w-[100%] h-[200px] overflow-hidden mr-2.5">
      <AppView className="h-[80%] rounded-xl overflow-hidden bg-border_grey/40">
        <Skeleton delay={350} />
      </AppView>
      <AppView className="h-[16px] mt-1.5 overflow-hidden bg-border_grey/40">
        <Skeleton delay={350} />
      </AppView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.TRENDING_GRAY,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 9.27,
    elevation: 10,
    // margin: 10,
  },
});
