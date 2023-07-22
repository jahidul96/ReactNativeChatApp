import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/AppColors';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={AppColors.WHITE}
        style={{alignSelf: 'center', marginVertical: 30}}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
