/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from '@/navigation/AppNavigator';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import {enableScreens} from 'react-native-screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import routes from './navigation/routes';
import {Provider} from 'react-redux';
import store from './store/store';

function App(): React.JSX.Element {
  const navigationRef = useRef<any>(null);

  // useLayoutEffect(() => {
  //   enableScreens(false);
  // }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
          <Toast visibilityTime={4000} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
