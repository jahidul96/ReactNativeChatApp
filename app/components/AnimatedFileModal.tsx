import {StyleSheet, Image, View, Pressable, Alert} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {fileModalData} from '../data/smallData';
import {AppColors} from '../utils/AppColors';
import {WIDTH} from '../utils/AppDimension';
import RegularText from './RegularText';

interface animatedFileModelinterface {
  showFileModal: boolean;
  onMediaPress: (text: string) => void;
}
const AnimatedFileModal = ({
  showFileModal,
  onMediaPress,
}: animatedFileModelinterface) => {
  // file modal anim style
  const fileModalAnimStyle = useAnimatedStyle(() => {
    return {
      // opacity: showFileModal
      //   ? withTiming(1, {duration: 500})
      //   : withTiming(0, {duration: 500}),
      // display: showFileModal
      //   ? withTiming('flex', {duration: 500})
      //   : withTiming('none', {duration: 500}),
      bottom: showFileModal
        ? withTiming(70, {duration: 500})
        : withTiming(-260, {duration: 500}),
    };
  });

  return (
    <Animated.View style={[styles.fileModalContainer, fileModalAnimStyle]}>
      {fileModalData.map(data => (
        <Pressable
          key={data.id}
          style={styles.itemWrapper}
          onPress={() => onMediaPress(data.name)}>
          <View style={[styles.itemStyle, {backgroundColor: data.bg}]}>
            <Image source={data.img} style={styles.imgStyle} />
          </View>
          <RegularText text={data.name} extraStyle={styles.textStyle} />
        </Pressable>
      ))}
    </Animated.View>
  );
};

export default AnimatedFileModal;

const styles = StyleSheet.create({
  fileModalContainer: {
    width: WIDTH - 50,
    height: 250,
    backgroundColor: AppColors.GREY_BLACK,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',

    left: 25,
    // zIndex: 999,
  },
  itemWrapper: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: AppColors.WHITE,

    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: 30,
    height: 30,
  },

  textStyle: {
    fontSize: 12,
    color: AppColors.GREY,
  },
});
