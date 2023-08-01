import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {userInterface} from '../utils/interfaceExports';
import {WIDTH} from '../utils/AppDimension';
import {AppColors} from '../utils/AppColors';

interface animatedAddedInterface {
  selectedMembers: Array<userInterface>;
  membersId: Array<string>;
}
const AnimatedAddMember = ({
  selectedMembers,
  membersId,
}: animatedAddedInterface) => {
  const heightValue = useSharedValue(0);

  // memberContainerAnimStyle
  const memberContainerAnimStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(heightValue.value, {duration: 300}),
      borderBottomWidth:
        selectedMembers.length > 0
          ? withTiming(1, {duration: 500})
          : withTiming(0, {duration: 500}), // Adjust duration as needed
    };
  });
  useEffect(() => {
    heightValue.value = selectedMembers.length > 0 ? 80 : 0;
  }, [selectedMembers.length, heightValue]);
  return (
    <Animated.View style={[styles.memberContainer, memberContainerAnimStyle]}>
      {selectedMembers.map((member: any, index: number) => (
        <AnimatedProfile
          key={index}
          index={index}
          profilePic={member.profilePic}
          isAdded={membersId.includes(member.uid)}
        />
      ))}
    </Animated.View>
  );
};

export default AnimatedAddMember;

interface profieInterface {
  profilePic: string;
  index: number;
  isAdded: boolean;
}
const AnimatedProfile = ({profilePic, index, isAdded}: profieInterface) => {
  return (
    <Animated.Image
      source={{uri: profilePic}}
      style={[styles.memberAvatorStyle]}
    />
  );
};

const styles = StyleSheet.create({
  memberContainer: {
    width: WIDTH,
    height: 80,
    backgroundColor: AppColors.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: AppColors.GREY,
  },

  memberAvatorStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: AppColors.WHITE,
    marginRight: 6,
  },
});
