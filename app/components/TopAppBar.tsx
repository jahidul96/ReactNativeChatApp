import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/AppDimension';
import {AppColors} from '../utils/AppColors';
import RegularText from './RegularText';
import {AntDesign, Feather, Ionicons} from '../utils/IconExport';
import {useNavigation} from '@react-navigation/native';

interface appBarInterface {
  text: string;
  back?: boolean;
}
const TopAppBar = ({text, back = true}: appBarInterface) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        {back && (
          <AntDesign
            name="arrowleft"
            color={AppColors.WHITE}
            size={25}
            style={{marginRight: 15}}
            onPress={() => navigation.navigate('Home')}
          />
        )}
        <RegularText text={text} extraStyle={styles.titleStyle} />
      </View>

      <View style={styles.titleWrapper}>
        <Ionicons
          name="search"
          color={AppColors.WHITE}
          size={22}
          style={{marginRight: 15}}
        />
        <Feather name="more-vertical" color={AppColors.WHITE} size={22} />
      </View>
    </View>
  );
};

export default TopAppBar;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT * 0.1 - 10,
    backgroundColor: AppColors.GREY_BLACK,
    paddingHorizontal: 20,
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
    fontWeight: 'bold',
  },
});
