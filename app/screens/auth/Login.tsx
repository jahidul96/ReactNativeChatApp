import {
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import {AppColors} from '../../utils/AppColors';
import RegularInput from '../../components/RegularInput';
import RegularButton from '../../components/RegularButton';
import AuthLinkComp from './AuthLinkComp';
import {useNavigation} from '@react-navigation/native';

import RegularText from '../../components/RegularText';
import {signinWithFb} from '../../firebase/fbAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert('Fill all the fields');
    }
    setLoading(true);

    setTimeout(() => {
      signinWithFb(email, password)
        .then(() => {
          setLoading(false);
          navigation.reset({routes: [{name: 'Home'}]});
          // navigation.navigate('Home');
        })
        .catch(() => {
          setLoading(false);
          Alert.alert('Something went wrong');
        });
    }, 2000);
  };
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.backIconWrapper}
        onPress={() => navigation.navigate('Register')}>
        <Ionicons name="arrow-back" color={AppColors.BLACK} size={25} />
      </TouchableOpacity> */}
      <StatusBar
        backgroundColor={AppColors.GREY_BLACK}
        barStyle={'light-content'}
      />
      <RegularText text="ChatApp" extraStyle={styles.logoTextStyle} />
      <RegularInput placeholder="Email" setValue={setEmail} />
      <RegularInput placeholder="Password" setValue={setPassword} isPassword />

      {loading ? (
        <ActivityIndicator
          color={AppColors.WHITE}
          style={{alignSelf: 'center', marginVertical: 30}}
        />
      ) : (
        <RegularButton
          text="Login"
          extraStyle={{marginTop: 10}}
          onPress={handleSignIn}
        />
      )}

      <AuthLinkComp
        text="Don't Have an Account ?"
        linkText="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: AppColors.GREY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconWrapper: {
    width: 60,
    height: 40,
    backgroundColor: AppColors.WHITE,
    borderRadius: 10,
    position: 'absolute',
    top: 40,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTextStyle: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
