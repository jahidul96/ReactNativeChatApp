import {
  StyleSheet,
  Alert,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {WIDTH} from '../../utils/AppDimension';
import {AppColors} from '../../utils/AppColors';
import {AntDesign, Ionicons, MaterialIcons} from '../../utils/IconExport';

import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface footerInterface {
  setValue: any;
  value: any;
}

const ICONVIEWPOS = 0;
const Footer = ({setValue, value}: footerInterface) => {
  const [textInputHeight, setTextInputHeight] = useState(40);
  const [onFoucs, setOnfocus] = useState(false);

  const handleInputContentSizeChange = (event: any) => {
    if (event.nativeEvent.contentSize.height > 150) return;
    setTextInputHeight(event.nativeEvent.contentSize.height);
  };

  // handleValue

  const handleValue = (text: any) => {
    setValue(text);
  };

  // inputContainerAnimation
  const inputContainerAnimStyle = useAnimatedStyle(() => {
    return {
      borderRadius: value
        ? withTiming(10, {duration: 300})
        : withTiming(30, {duration: 300}),
      alignItems: onFoucs
        ? withTiming('flex-end', {duration: 300})
        : withTiming('center', {duration: 300}),
    };
  });

  // iconView animated styling
  const iconViewAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: value
            ? withTiming(200, {duration: 700})
            : withTiming(ICONVIEWPOS, {duration: 700}),
        },
      ],
      display: value
        ? withTiming('none', {duration: 500})
        : withTiming('flex', {duration: 500}),
    };
  });

  return (
    <View style={[styles.container, {height: 60}]}>
      <Animated.View style={[styles.leftContainer, inputContainerAnimStyle]}>
        {/* textinput */}
        <TextInput
          multiline
          onFocus={() => setOnfocus(true)}
          onBlur={() => setOnfocus(false)}
          placeholderTextColor={AppColors.WHITE}
          placeholder="type..."
          value={value}
          onChangeText={handleValue}
          onContentSizeChange={handleInputContentSizeChange}
          style={[styles.inputStyle, {height: Math.max(40, textInputHeight)}]}
        />

        {/* link and camera icon comp */}

        <Animated.View style={[styles.leftIconWrapper, iconViewAnimStyle]}>
          <TouchableOpacity onPress={() => Alert.alert('122')}>
            <AntDesign name="link" size={23} color={AppColors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 10}}>
            <Ionicons name="camera" size={25} color={AppColors.WHITE} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* recording/send button button comp */}
      {value ? (
        <Pressable style={styles.rightContainer}>
          <Ionicons name="send-sharp" size={25} color={AppColors.WHITE} />
        </Pressable>
      ) : (
        <Pressable style={styles.rightContainer}>
          <MaterialIcons
            name="keyboard-voice"
            size={25}
            color={AppColors.WHITE}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    // minHeight: 60,
    backgroundColor: AppColors.BLACK,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leftContainer: {
    flex: 1,
    minHeight: 50,
    marginRight: 3,
    backgroundColor: AppColors.GREY_BLACK,
    flexDirection: 'row',

    overflow: 'hidden',
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: 10,
    color: AppColors.WHITE,
    fontSize: 17,
  },

  leftIconWrapper: {
    width: 80,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: AppColors.GREY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
