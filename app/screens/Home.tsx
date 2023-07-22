import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation<any>();

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Register');
        console.log('User signed out!');
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
