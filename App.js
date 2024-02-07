import React, { createContext, useContext, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { registerRootComponent } from 'expo';
import Header from './src/components/Header/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalProvider } from './src/components/GlobalContext/GlobalContext';
import { NativeBaseProvider } from "native-base";




export default function App() {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <NativeBaseProvider>
          <Header />
          <AppContainer />
        </NativeBaseProvider>
      </GlobalProvider>
    </SafeAreaProvider>

  );
}

