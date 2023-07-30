import {ScrollView, StyleSheet, Text, View, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopAppBar from '../components/TopAppBar';
import ChatComp from '../components/ChatComp';
import {AppColors} from '../utils/AppColors';
import {EmptyInfoComp, PositionButton, SizedBox} from '../components/Reuseable';
import {getAllContacts} from '../firebase/fbFireStore';
import {userInterface} from '../utils/interfaceExports';
import LoadingScreen from './LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '../utils/IconExport';
import {WIDTH} from '../utils/AppDimension';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  goToChatFromContact,
  gotoAddGroupScreen,
} from '../features/ContactScreenFuncs';

interface contactInterface {
  route: {
    params: {
      isContact: boolean;
    };
  };
}

const Contacts = ({route}: contactInterface) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const {isContact} = route.params;
  const [selectedMembers, setSelectedMember] = useState<
    Array<userInterface | []>
  >([]);
  const [memberIds, setMemberIds] = useState<Array<string>>([]);
  const heightValue = useSharedValue(0);

  useEffect(() => {
    heightValue.value = selectedMembers.length > 0 ? 80 : 0;
  }, [selectedMembers.length, heightValue]);

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
    getAllContacts()
      .then(data => {
        // console.log('this is from contact', data);
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);
  return (
    <View style={styles.container}>
      {/* topappBar */}
      <TopAppBar
        text={isContact ? 'Contacts' : 'Create Group'}
        profie={isContact ? false : true}
      />

      {/* if selected Members lenght exists  */}
      <Animated.View style={[styles.memberContainer, memberContainerAnimStyle]}>
        {selectedMembers.map((member: any, index: number) => (
          <AnimatedProfile
            key={index}
            index={index}
            profilePic={member.profilePic}
            isAdded={memberIds.includes(member.uid)}
          />
        ))}
      </Animated.View>

      {/* contacts render */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{paddingTop: 10}} overScrollMode="never">
          {contacts.length == 0 ? (
            <EmptyInfoComp infoText="No Contacts" />
          ) : (
            contacts.map((contact: userInterface, index) => (
              <ChatComp
                isSelected={selectedMembers.includes(contact)}
                profilePic={contact.profilePic}
                username={contact.username}
                lastMsg={contact.bio}
                onLongPress={() => {}}
                onPress={() =>
                  goToChatFromContact(
                    contact,
                    isContact,
                    navigation,
                    selectedMembers,
                    setSelectedMember,
                    memberIds,
                    setMemberIds,
                  )
                }
                key={index}
                isChat={false}
              />
            ))
          )}

          <SizedBox />
        </ScrollView>
      )}

      {/* create groupBtn */}
      {!isContact && (
        <PositionButton
          onPress={() =>
            gotoAddGroupScreen(selectedMembers, memberIds, navigation)
          }
          children={
            <AntDesign name="arrowright" color={AppColors.WHITE} size={25} />
          }
        />
      )}
    </View>
  );
};

export default Contacts;

interface profieInterface {
  profilePic: string;
  index: number;
  isAdded: boolean;
}
const AnimatedProfile = ({profilePic, index, isAdded}: profieInterface) => {
  console.log(isAdded);
  return (
    <Animated.Image
      source={{uri: profilePic}}
      style={[styles.memberAvatorStyle]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },

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
