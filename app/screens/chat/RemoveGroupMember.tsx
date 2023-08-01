import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {userInterface} from '../../utils/interfaceExports';
import TopAppBar from '../../components/TopAppBar';
import {AppColors} from '../../utils/AppColors';
import {
  EmptyInfoComp,
  PositionButton,
  SizedBox,
} from '../../components/Reuseable';
import ChatComp from '../../components/ChatComp';
import {AntDesign} from '../../utils/IconExport';
import {updateGroupInfo} from '../../firebase/fbFireStore';
import {useNavigation} from '@react-navigation/native';

interface removeInterFace {
  route: {
    params: {
      membersId: Array<string>;
      memberDetails: Array<userInterface>;
      groupId: string;
    };
  };
}
const RemoveGroupMember = ({route}: removeInterFace) => {
  const {groupId, memberDetails, membersId} = route.params;
  const [selectedMembers, setSelectedMember] = useState<Array<userInterface>>(
    [],
  );
  const [tempMembersId, setTempMembersId] = useState<Array<string>>(membersId);
  const [tempMemberDetails, setTempMembersDetails] = useState(memberDetails);
  const navigation = useNavigation<any>();

  const onPressRemoveContact = (contact: userInterface) => {
    if (selectedMembers.includes(contact)) {
      setSelectedMember(
        selectedMembers.filter(member => member.uid != contact.uid),
      );
    } else {
      setSelectedMember(prev => [...prev, contact]);
      setTempMembersId(tempMembersId.filter(id => id != contact.uid));
      setTempMembersDetails(
        tempMemberDetails.filter(member => member.uid != contact.uid),
      );
    }
  };

  const removeMember = () => {
    if (selectedMembers.length == 0) {
      return Alert.alert('Select At least one member to remove!');
    }

    let updatedData = {
      memberIds: tempMembersId,
      memberDetails: tempMemberDetails,
    };
    updateGroupInfo(groupId, updatedData);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <TopAppBar text="Profile" profie />
      <SizedBox />
      <ScrollView>
        {memberDetails.length == 0 ? (
          <EmptyInfoComp infoText="No Group members" />
        ) : (
          memberDetails.map(member => (
            <ChatComp
              isSelected={selectedMembers.includes(member)}
              profilePic={member.profilePic}
              username={member.username}
              lastMsg={member.bio}
              onLongPress={() => {}}
              onPress={() => onPressRemoveContact(member)}
              key={member.uid}
              isChat={false}
            />
          ))
        )}
      </ScrollView>

      <PositionButton
        onPress={removeMember}
        children={<AntDesign name="minus" color={AppColors.WHITE} size={25} />}
      />
    </View>
  );
};

export default RemoveGroupMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
});
