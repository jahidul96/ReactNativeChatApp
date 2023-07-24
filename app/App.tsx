import {StyleSheet} from 'react-native';
import React from 'react';
import NavigationScreens from './Navigation/NavigationScreens';
import AppContextProvider from './context/AppContext';

const App = () => {
  return (
    <AppContextProvider>
      <NavigationScreens />
    </AppContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
