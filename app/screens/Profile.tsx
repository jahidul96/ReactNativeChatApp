import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import TopAppBar from '../components/TopAppBar';
import {WIDTH} from '../utils/AppDimension';
import {imgUri} from '../utils/FileExport';
import {AppColors} from '../utils/AppColors';
import RegularText from '../components/RegularText';
import {AntDesign, MaterialCommunityIcons} from '../utils/IconExport';
import {Divider} from '../components/Reuseable';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* topAppbar */}
      <TopAppBar text="Profile" back profie />

      {/* profile section */}
      <View style={styles.profileContainer}>
        <Image style={styles.imgStyle} source={{uri: imgUri}} />
        <View style={styles.nameWrapper}>
          <RegularText text={'Jahidul Islam'} extraStyle={styles.nameStyle} />
          <MaterialCommunityIcons name="pencil" size={22} />
        </View>
        <RegularText
          text={'Hey There, I am using chatapp'}
          extraStyle={styles.bioStyle}
        />
      </View>

      <Divider extraStyle={{marginTop: 10}} />
      {/* pageButtons */}
      <PageButton text="Contacts" />
      <PageButton text="Chats" />
      <PageButton text="Privacy" />
      <PageButton text="Account" />
      <PageButton text="Settings" />
      <PageButton text="Logout" />
    </View>
  );
};

export default Profile;

interface pageBtnInterface {
  text: string;
}
const PageButton = ({text}: pageBtnInterface) => {
  return (
    <Pressable style={styles.pageBtnContainer}>
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
