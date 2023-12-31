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
import AnimatedAddMember from '../components/AnimatedAddMember';

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
  const [selectedMembers, setSelectedMember] = useState<Array<userInterface>>(
    [],
  );
  const [memberIds, setMemberIds] = useState<Array<string>>([]);

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
      <AnimatedAddMember
        membersId={memberIds}
        selectedMembers={selectedMembers!}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
});
