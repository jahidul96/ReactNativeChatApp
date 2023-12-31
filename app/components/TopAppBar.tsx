import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {AppColors} from '../utils/AppColors';
import RegularText from './RegularText';
import {AntDesign, Feather, Ionicons} from '../utils/IconExport';
import {useNavigation} from '@react-navigation/native';
import {imgUri} from '../utils/FileExport';

interface appBarInterface {
  text?: string;
  back?: boolean;
  onPressonMore?: () => void;
  profie?: boolean;
  message?: boolean;
  name?: string;
  profilePic?: string;
  onPressBack?: () => {};
  extraStyle?: any;
  onPressDetails?: () => void;
}
const TopAppBar = ({
  text,
  back = true,
  onPressonMore,
  profie,
  message = false,
  name,
  profilePic,
  onPressBack,
  extraStyle,
  onPressDetails,
}: appBarInterface) => {
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.container, extraStyle]}>
      <View style={styles.titleWrapper}>
        {back && (
          <AntDesign
            name="arrowleft"
            color={AppColors.WHITE}
            size={25}
            style={{marginRight: 15}}
            onPress={onPressBack ? onPressBack : () => navigation.goBack()}
          />
        )}
        {text && <RegularText text={text} extraStyle={styles.titleStyle} />}
        {message && (
          <Pressable style={styles.profileWrapper} onPress={onPressDetails}>
            <Image
              source={{uri: profilePic ? profilePic : imgUri}}
              style={styles.profileImgStyle}
            />
            <View>
              <RegularText text={name!} extraStyle={styles.nameStyle} />
              <RegularText text="status" extraStyle={styles.onlineStyle} />
            </View>
          </Pressable>
        )}
      </View>

      {profie ? (
        <View></View>
      ) : (
        <View style={styles.titleWrapper}>
          <Ionicons
            name="search"
            color={AppColors.WHITE}
            size={22}
            style={{marginRight: 15}}
          />
          <TouchableOpacity onPress={onPressonMore}>
            <Feather name="more-vertical" color={AppColors.WHITE} size={22} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TopAppBar;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT * 0.1 - 10,
    backgroundColor: AppColors.GREY_BLACK,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImgStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.WHITE,
    marginRight: 8,
  },

  nameStyle: {
    fontSize: 15,
  },
  onlineStyle: {
    fontSize: 12,
    marginTop: -3,
  },
});
