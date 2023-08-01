import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  chatDetailsScreenParams,
  messageInterface,
  userInterface,
} from '../../utils/interfaceExports';
import {AppColors} from '../../utils/AppColors';
import TopAppBar from '../../components/TopAppBar';
import {WIDTH} from '../../utils/AppDimension';
import RegularText from '../../components/RegularText';
import ChatComp from '../../components/ChatComp';
import {AntDesign} from '../../utils/IconExport';
import {SizedBox} from '../../components/Reuseable';
import {AppContext} from '../../context/AppContext';
import {useNavigation} from '@react-navigation/native';
import AlertModal from '../../components/AlertModal';
import {
  deleteGroupFromFb,
  deleteMessageChat,
  updateGroupInfo,
} from '../../firebase/fbFireStore';

interface chatDetailsInterface {
  route: {
    params: chatDetailsScreenParams;
  };
}
const ChatDetails = ({route}: chatDetailsInterface) => {
  const {
    chatDetails,
    chatMedia,
    groupImage,
    groupName,
    isGroupChat,
    memberDetails,
    memberIds,
    adminDetails,
    chatId,
  } = route.params;
  const {user} = useContext(AppContext);
  const navigation = useNavigation<any>();
  const [chatDelete, setChatDelete] = useState(false);
  const [groupDelete, setGroupDelete] = useState(false);
  const [leaveGroup, setLeaveGroup] = useState(false);

  // console.log('grp member details', memberDetails);
  // console.log('grp member id', memberIds);
  // console.log('my id', user.uid);

  const deleteSingleChat = (val: string) => {
    if (val == 'chat') {
      deleteMessageChat(user?.uid, chatId);
      navigation.navigate('Home');
    } else {
      deleteGroupFromFb(chatId);
      navigation.navigate('Home');
    }
  };

  const leaveThisGroup = () => {
    let tempMemberIds = memberIds.filter(id => id != user.uid);
    let tempMemberDetails = memberDetails.filter(
      member => member.uid != user.uid,
    );

    let updatedData = {
      memberIds: tempMemberIds,
      memberDetails: tempMemberDetails,
    };
    updateGroupInfo(chatId, updatedData);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <TopAppBar back text="Back" profie />
      <ScrollView>
        {/* profile section */}
        <View style={styles.profileContainer}>
          <Image
            source={{uri: isGroupChat ? groupImage : chatDetails?.profilePic}}
            style={styles.profileImgStyle}
          />
          <RegularText
            text={isGroupChat ? groupName : chatDetails.username}
            extraStyle={styles.nameStyle}
          />
          {!isGroupChat && <RegularText text={chatDetails.email} />}
        </View>

        {/* group memberDetails */}
        {isGroupChat && (
          <View>
            <RegularText
              text="Members Details"
              extraStyle={styles.memberDetailText}
            />
            {/* admin deatils */}
            <ChatComp
              key={adminDetails.uid}
              username={adminDetails.username}
              profilePic={adminDetails.profilePic}
              lastMsg={adminDetails.email}
              onLongPress={() => {}}
              onPress={() => {}}
              isChat={false}
              isAdmin
            />
            {memberDetails.map((member: userInterface) => (
              <ChatComp
                key={member.uid}
                username={member.username}
                profilePic={member.profilePic}
                lastMsg={member.email}
                onLongPress={() => {}}
                onPress={() => {}}
                isChat={false}
              />
            ))}
          </View>
        )}

        {/* media content */}

        <View style={styles.mediaView}>
          <RegularText text="Media" />
          {/* <AntDesign name="arrowright" color={AppColors.WHITE} size={20} /> */}
        </View>

        {chatMedia.length == 0 ? (
          <View style={styles.emptyMedia}>
            <RegularText text="No Media Shared!" extraStyle={{fontSize: 14}} />
          </View>
        ) : (
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 10}}>
            {chatMedia.map((chat: messageInterface) =>
              chat.file.urls.map((url: string, index: number, arr) => (
                <Pressable
                  key={index}
                  style={styles.photoWrapper}
                  onPress={() =>
                    navigation.navigate('ImageSlider', {images: arr})
                  }>
                  <Image source={{uri: url}} style={styles.mediaPhotoStyle} />
                </Pressable>
              )),
            )}
          </ScrollView>
        )}

        <SizedBox />

        {/* chat delete */}
        {!isGroupChat && (
          <TextBtn
            onPress={() => setChatDelete(!chatDelete)}
            text="Delete Chat"
          />
        )}

        <AlertModal
          infoText="Chat Will be deleted!"
          onPressOk={() => deleteSingleChat('chat')}
          setVisiable={setChatDelete}
          visible={chatDelete}
        />

        {/* leave from group */}
        {isGroupChat && user.uid != adminDetails.uid && (
          <TextBtn
            onPress={() => setLeaveGroup(!leaveGroup)}
            text="Leave Group"
          />
        )}

        <AlertModal
          infoText="Leave group ?"
          onPressOk={leaveThisGroup}
          setVisiable={setLeaveGroup}
          visible={leaveGroup}
        />

        {/* group add new member btns  */}
        {isGroupChat && user.uid == adminDetails.uid && (
          <TextBtn
            onPress={() => {
              navigation.navigate('AddNewGroupMember', {
                membersId: memberIds,
                memberDetails: memberDetails,
                groupId: chatId,
              });
            }}
            text="Add member Group"
          />
        )}

        {/* group add new member btns  */}
        {isGroupChat && user.uid == adminDetails.uid && (
          <TextBtn
            onPress={() => {
              navigation.navigate('RemoveGroupMember', {
                membersId: memberIds,
                memberDetails: memberDetails,
                groupId: chatId,
              });
            }}
            text="Remove Group member"
          />
        )}

        {/* delete group  */}
        {isGroupChat && user.uid == adminDetails.uid && (
          <TextBtn
            onPress={() => setGroupDelete(!groupDelete)}
            text="Delete Group"
          />
        )}

        <AlertModal
          infoText="Group Will be deleted!"
          onPressOk={() => deleteSingleChat('group')}
          setVisiable={setGroupDelete}
          visible={groupDelete}
        />

        <SizedBox />
      </ScrollView>
    </View>
  );
};

export default ChatDetails;

interface textBtn {
  text: string;
  onPress: () => void;
}
const TextBtn = ({text, onPress}: textBtn) => (
  <Pressable style={styles.leaveGrpButton} onPress={onPress}>
    <RegularText text={text} />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  profileContainer: {
    width: WIDTH,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profileImgStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: AppColors.WHITE,
  },
  nameStyle: {
    fontSize: 20,
    marginTop: 5,
  },
  memberDetailText: {
    marginVertical: 7,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.THIN_GREY,
    paddingBottom: 5,
  },

  mediaView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  emptyMedia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoWrapper: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
  mediaPhotoStyle: {
    flex: 1,
    borderRadius: 5,
  },

  leaveGrpButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
