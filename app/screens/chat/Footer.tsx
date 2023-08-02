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
  onPreesFile: () => void;
  onSend: () => void;
  onPressCamera: () => void;
}

const ICONVIEWPOS = 0;
const Footer = ({
  setValue,
  value,
  onPreesFile,
  onSend,
  onPressCamera,
}: footerInterface) => {
  const [textInputHeight, setTextInputHeight] = useState(50);

  const handleInputContentSizeChange = (event: any) => {
    if (event.nativeEvent.contentSize.height > 150) return;
    setTextInputHeight(event.nativeEvent.contentSize.height);
  };

  // inputContainerAnimation
  const inputContainerAnimStyle = useAnimatedStyle(() => {
    return {
      borderRadius: value
        ? withTiming(10, {duration: 300})
        : withTiming(30, {duration: 300}),
    };
  });

  // iconView animated styling
  const iconViewAnimStyle = useAnimatedStyle(() => {
    return {
      width: value
        ? withTiming(0, {duration: 500})
        : withTiming(80, {duration: 500}),
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
    <View style={[styles.container]}>
      <Animated.View style={[styles.leftContainer, inputContainerAnimStyle]}>
        {/* textinput */}
        <TextInput
          multiline
          placeholderTextColor={AppColors.WHITE}
          placeholder="type..."
          value={value}
          onChangeText={text => setValue(text)}
          onContentSizeChange={handleInputContentSizeChange}
          style={[styles.inputStyle, {height: Math.max(40, textInputHeight)}]}
        />

        {/* link and camera icon comp */}

        <Animated.View style={[styles.leftIconWrapper, iconViewAnimStyle]}>
          <TouchableOpacity onPress={onPreesFile}>
            <AntDesign name="link" size={23} color={AppColors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 10}} onPress={onPressCamera}>
            <Ionicons name="camera" size={25} color={AppColors.WHITE} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* recording/send button button comp */}
      {value ? (
        <Pressable style={styles.rightContainer} onPress={onSend}>
          <Ionicons name="send-sharp" size={20} color={AppColors.WHITE} />
        </Pressable>
      ) : (
        <Pressable style={styles.rightContainer} onPrees={()=> Alert.alert("Not implimented!")}>
          <MaterialIcons
            name="keyboard-voice"
            size={22}
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
    backgroundColor: 'transparent',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  leftContainer: {
    flex: 1,
    minHeight: 47,
    marginRight: 3,
    backgroundColor: AppColors.GREY_BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: 10,
    color: AppColors.WHITE,
    fontSize: 17,
  },

  leftIconWrapper: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 47,
    height: 47,
    borderRadius: 100,
    backgroundColor: AppColors.GREY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
