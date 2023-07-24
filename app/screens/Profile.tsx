import {StyleSheet, Text, View, Image, Pressable, Modal} from 'react-native';
import React, {useState, useContext} from 'react';
import TopAppBar from '../components/TopAppBar';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {imgUri} from '../utils/FileExport';
import {AppColors} from '../utils/AppColors';
import RegularText from '../components/RegularText';
import {AntDesign, MaterialCommunityIcons} from '../utils/IconExport';
import {Divider} from '../components/Reuseable';
import RegularButton from '../components/RegularButton';
import AlertModal from '../components/AlertModal';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../context/AppContext';

const Profile = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const navigation = useNavigation<any>();
  const {user, setUser} = useContext(AppContext);

  // console.log('userFrom firebase', user);

  const logoutUser = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.reset({routes: [{name: 'Register'}]});
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <View style={styles.container}>
      {/* topAppbar */}
      <TopAppBar text="Profile" back profie />

      {/* profile section */}
      <View style={styles.profileContainer}>
        {user ? (
          <Image style={styles.imgStyle} source={{uri: user?.profilePic}} />
        ) : (
          <Image style={styles.imgStyle} source={{uri: imgUri}} />
        )}

        <View style={styles.nameWrapper}>
          <RegularText
            text={user ? user?.username : 'Username'}
            extraStyle={styles.nameStyle}
          />
          <MaterialCommunityIcons name="pencil" size={22} />
        </View>
        <RegularText
          text={'Hey There, I am using chatapp'}
          extraStyle={styles.bioStyle}
        />
      </View>

      <Divider extraStyle={{marginTop: 10}} />
      {/* pageButtons */}
      <PageButton text="Contacts" onPress={() => {}} />
      <PageButton text="Chats" onPress={() => {}} />
      <PageButton text="Privacy" onPress={() => {}} />
      <PageButton text="Account" onPress={() => {}} />
      <PageButton text="Settings" onPress={() => {}} />
      <PageButton
        text="Logout"
        onPress={() => {
          setLogoutModal(!logoutModal);
        }}
      />

      {/* logout modal */}

      <AlertModal
        infoText="Are you Sure ?"
        visible={logoutModal}
        setVisiable={setLogoutModal}
        onPressOk={logoutUser}
      />
    </View>
  );
};

export default Profile;

interface pageBtnInterface {
  text: string;
  onPress: () => void;
}
const PageButton = ({text, onPress}: pageBtnInterface) => {
  return (
    <Pressable style={styles.pageBtnContainer} onPress={onPress}>
      <RegularText text={text} extraStyle={styles.buttonTextStyle} />
      <AntDesign name="right" size={22} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  imgStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: AppColors.WHITE,
  },
  nameWrapper: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  nameStyle: {
    color: AppColors.BLACK,
    fontWeight: '700',
    fontSize: 19,
    marginRight: 5,
  },
  bioStyle: {
    color: AppColors.GREY,
    marginTop: 5,
  },

  pageBtnContainer: {
    width: WIDTH,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: AppColors.THIN_GREY,
    borderBottomWidth: 1,
    // paddingBottom: 5,
  },
  buttonTextStyle: {
    color: AppColors.BLACK,

    fontSize: 19,
  },
});
