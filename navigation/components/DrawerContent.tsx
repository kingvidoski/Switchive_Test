import {View, Text, StyleSheet, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {FLogout, LHome, LfHome, Logout_L} from '@/assets/icons';
import routes from '../routes';
import {AppImage, AppText, AppView, TouchableOpacity} from '@/components';
import colors from '@/configs/colors';
import fonts from '@/configs/fonts';
import CloseIcon from 'react-native-heroicons/outline/XMarkIcon';
import Size from '@/Utils/useResponsiveSize';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/Hooks/reduxHook';
import {selectUserState} from '@/store/slices/userSlice';
import {MainScreenProps} from '@/types/general';

const DrawerList = [
  {
    fIcon: <LfHome />,
    icon: <LHome />,
    label: 'Home',
    navigateTo: routes.PRODUCT_SCREEN,
  },
];

interface DrawerOptions extends DrawerContentComponentProps {
  fIcon: React.JSX.Element;
  icon: React.JSX.Element;
  label: string;
  navigateTo: string;
  isLogout: boolean;
}

const DrawerLayout = ({
  fIcon,
  icon,
  label,
  navigateTo,
  navigation,
  state,
  isLogout,
}: DrawerOptions) => {
  const isFocused = isLogout
    ? false
    : state.routes[state.index].name === navigateTo;

  console.log(state.routes[state.index].name, navigateTo);

  return (
    <AppView style={isFocused ? styles.list : {marginBottom: 5}}>
      <DrawerItem
        icon={({}) => (isFocused ? fIcon : icon)}
        label={label}
        onPress={() => navigation.navigate(navigateTo)}
        style={{
          height: 40,
          paddingBottom: 0,
        }}
        labelStyle={{
          ...styles.label,
          color: isFocused ? colors.DEEP_BLACK : colors.WHITE,
        }}
      />
    </AppView>
  );
};

interface DrawerItemsProps extends DrawerContentComponentProps {
  isLogout: boolean;
}

const DrawerItems = ({isLogout, ...props}: DrawerItemsProps) => {
  return DrawerList.map((item, index) => (
    <DrawerLayout
      key={index}
      label={item.label}
      navigateTo={item.navigateTo}
      icon={item.icon}
      fIcon={item.fIcon}
      isLogout={isLogout}
      {...props}
    />
  ));
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const navigation = useNavigation();
  const {reset} = useNavigation<MainScreenProps>();
  const user = useAppSelector(selectUserState);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#222831',
        position: 'relative',
      }}>
      <DrawerContentScrollView
        {...props}
        style={{
          paddingTop: 24,
        }}>
        <AppView style={[styles.header]}>
          <AppView style={{alignItems: 'center'}}>
            <AppImage
              source={require('@/assets/images/user.png')}
              style={styles.image}
            />
            <AppText style={styles.bigText}>
              {user.f_name} {user.l_name}
            </AppText>
            <AppText style={styles.text}>{user.phone}</AppText>
          </AppView>

          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <CloseIcon color={colors.WHITE} size={34} strokeWidth={2.5} />
          </TouchableOpacity>
        </AppView>

        <AppView style={{height: '100%'}}>
          <AppView style={styles.listWrapper}>
            <DrawerItems {...props} isLogout={isLogout} />
          </AppView>
        </AppView>
      </DrawerContentScrollView>
      <AppView style={[styles.listWrapper, {marginBottom: 40, marginLeft: 15}]}>
        <TouchableOpacity
          onPress={() => setIsLogout(true)}
          style={[
            styles.center,

            isLogout && styles.logoutList,
            {
              width: '95%',
              paddingVertical: 12,
              alignItems: 'center',
              columnGap: 12,
            },
          ]}>
          {!isLogout ? <FLogout /> : <Logout_L />}
          <AppText
            style={[
              styles.logout,
              {color: isLogout ? colors.DEEP_BLACK : colors.WHITE},
            ]}>
            Logout
          </AppText>
        </TouchableOpacity>

        <AppView style={[styles.center, {columnGap: 4}]}>
          <TouchableOpacity>
            <AppText
              style={[
                styles.text,
                {fontSize: 14, textDecorationLine: 'underline'},
              ]}>
              Privacy
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity>
            <AppText
              style={[
                styles.text,
                {fontSize: 14, textDecorationLine: 'underline'},
              ]}>
              Terms & Conditions
            </AppText>
          </TouchableOpacity>
        </AppView>
      </AppView>

      {/* <Modal visible={false} transparent></Modal> */}
      {isLogout && (
        <View style={styles.modal}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              width: Size.wp(53),
              height: Size.wp(30),
              borderRadius: 15,
              paddingVertical: 24,
            }}>
            <Text style={[styles.modalText]}>Are you sure?</Text>
            <View style={[styles.center, {marginTop: 'auto', columnGap: 35}]}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => [
                  reset({
                    index: 0,
                    routes: [{name: routes.AUTH}],
                  }), //Also clear credentials from local storage using removeData hook
                ]}>
                <Text
                  style={[
                    styles.modalText,
                    {color: colors.GREEN, textAlign: 'right'},
                  ]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setIsLogout(false)}>
                <Text
                  style={[
                    styles.modalText,
                    {color: colors.RED, textAlign: 'left'},
                  ]}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: fonts.ROBOTO_700,
    fontSize: 16,
    color: colors.DEEP_BLACK,
    textAlign: 'center',
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: 99,
    borderWidth: 2.5,
    borderColor: colors.WHITE,
  },
  bigText: {
    fontFamily: fonts.ROBOTO_400,
    color: colors.WHITE,
    fontSize: 20,
    marginVertical: 5,
  },
  text: {
    fontFamily: fonts.ROBOTO_300,
    color: colors.WHITE,
    fontSize: 14,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  listWrapper: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  list: {
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    marginLeft: 10,
    paddingBottom: 1.5,
    marginBottom: 10,
  },
  logoutList: {
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    marginBottom: 10,
    paddingLeft: 12,
  },
  label: {
    fontFamily: fonts.ROBOTO_400,
    fontSize: 15,
    color: colors.WHITE,
    marginLeft: -6,
    paddingBottom: 16,
  },
  logout: {
    fontFamily: fonts.ROBOTO_400,
    fontSize: 15,
  },
});
