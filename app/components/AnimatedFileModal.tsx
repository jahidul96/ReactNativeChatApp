import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {fileModalData} from '../data/smallData';
import {AppColors} from '../utils/AppColors';
import {WIDTH} from '../utils/AppDimension';

interface animatedFileModelinterface {
  showFileModal: boolean;
}
const AnimatedFileModal = ({showFileModal}: animatedFileModelinterface) => {
  // file modal anim style
  const fileModalAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: showFileModal
        ? withTiming(1, {duration: 500})
        : withTiming(0, {duration: 500}),
      display: showFileModal
        ? withTiming('flex', {duration: 500})
        : withTiming('none', {duration: 500}),
      bottom: showFileModal
        ? withTiming(80, {duration: 500})
        : withTiming(-10, {duration: 500}),
    };
  });

  return (
    <Animated.View style={[styles.fileModalContainer, fileModalAnimStyle]}>
      {fileModalData.map(data => (
        <View
          key={data.id}
          style={[styles.itemStyle, {backgroundColor: data.bg}]}>
          <Image source={data.img} style={styles.imgStyle} />
        </View>
      ))}
    </Animated.View>
  );
};

export default AnimatedFileModal;

const styles = StyleSheet.create({
  fileModalContainer: {
    width: WIDTH - 50,
    height: 200,
    backgroundColor: AppColors.GREY_BLACK,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',

    left: 25,
    // zIndex: 999,
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
    width: 25,
    height: 25,
  },
});
