import {
  Alert,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

import {AppColors} from '../../utils/AppColors';
import {Ionicons} from '../../utils/IconExport';
import RegularInput from '../../components/RegularInput';
import RegularButton from '../../components/RegularButton';
import AuthLinkComp from './AuthLinkComp';
import {useNavigation} from '@react-navigation/native';
import {fbUserRegister} from '../../firebase/fbAuth';
import {addUserToFb} from '../../firebase/fbFireStore';
import {uploadFilesToBucket} from '../../firebase/fbStorage';
import {AppContext} from '../../context/AppContext';
import {getFcmToken} from '../../features/notificationServices';
import {getUserPhoto} from '../../features/GetStorageData';
import {hasAndroidPermission} from '../../features/AppPermisionEtc';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<string | null>();
  const {setPushToken, setGalleryPhotos, setStoragePermision} =
    useContext(AppContext);
  const [token, setToken] = useState('');

  const userData = {
    email,
    username,
    pushToken: '',
    uid: '',
    profilePic: '',
    bio: 'Hey There, I am using chatapp',
  };

  const goToGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    });

    if (result.didCancel) return;

    if (result.assets) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSignIn = async () => {
    if (!email || !password || !username || !image) {
      return Alert.alert('Fill all the field');
    }

    setLoading(true);

    const filePath = `profilePic/${Date.now()}profilePic.jpg`;
    // uploading image to firebase bucket
    let url = await uploadFilesToBucket(image, filePath);
    userData.profilePic = url;
    userData.pushToken = token;

    // register user
    fbUserRegister(email, password)
      .then(user => {
        userData.uid = user.uid;
        //   adding data to firebase firestore
        addUserToFb(userData, user.uid)
          .then(() => {
            setLoading(false);
            navigation.reset({routes: [{name: 'Home'}]});
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('SignIn Failed!!!');
        console.log(error.message);
      });
  };

  useEffect(() => {
    hasAndroidPermission()
      .then(val => {
        setStoragePermision(val);
        getUserPhoto(setGalleryPhotos);
      })
      .catch(err => setStoragePermision(false));
    getFcmToken()
      .then(val => {
        setToken(val);
        setPushToken(val);
      })
      .catch(err => console.log(err.message));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.GREY_BLACK}
        barStyle={'light-content'}
      />
      <View style={styles.avatorWrapper}>
        {image ? (
          <TouchableOpacity onPress={goToGallery}>
            <Image source={{uri: image}} style={styles.imgStyle} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.avatorContainer}
            onPress={goToGallery}>
            <Ionicons name="person" color={AppColors.WHITE} size={35} />
          </TouchableOpacity>
        )}
      </View>
      <RegularInput placeholder="Username" setValue={setUsername} />
      <RegularInput placeholder="Email" setValue={setEmail} />
      <RegularInput
        placeholder="Password"
        setValue={setPassword}
        isPassword={true}
      />

      {loading ? (
        <ActivityIndicator
          color={AppColors.WHITE}
          style={{alignSelf: 'center', marginVertical: 30}}
        />
      ) : (
        <RegularButton
          text="Register"
          extraStyle={{marginTop: 10}}
          onPress={handleSignIn}
        />
      )}

      <AuthLinkComp
        text="Already Have Account ?"
        linkText="LOGIN!"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: AppColors.GREY_BLACK,
  },
  avatorWrapper: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: AppColors.WHITE,
  },
  avatorContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
