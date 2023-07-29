import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {userInterface} from '../../utils/interfaceExports';
import {AppColors} from '../../utils/AppColors';
import TopAppBar from '../../components/TopAppBar';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import RegularButton from '../../components/RegularButton';
import {Ionicons} from '../../utils/IconExport';
import RegularInput from '../../components/RegularInput';
import {AppContext} from '../../context/AppContext';
import {uploadFilesToBucket} from '../../firebase/fbStorage';
import {createGroupInDb, updateGroupInfo} from '../../firebase/fbFireStore';

interface groupInterFace {
  route: {
    params: {
      memberIds: Array<string>;
      selectedMembers: Array<userInterface>;
    };
  };
}
const CreateGroup = ({route}: groupInterFace) => {
  const navigation = useNavigation<any>();
  const {memberIds, selectedMembers} = route.params;
  const [image, setImage] = useState<string | null>();
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AppContext);

  const goToGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    });

    if (result.didCancel) return;

    if (result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  const groupData = {
    groupName,
    groupProfilePic: '',
    memberIds: memberIds.concat(user.uid),
    memberDetails: selectedMembers,
    adminDetails: user,
    lastMsg: '',
    newGroup: true,
    media: false,
    senderId: user.uid,
    groupId: '',
    updatedAt: Date.now(),
    newMessage: false,
    seenBy: [user.uid],
  };

  const createGroup = async () => {
    if (!groupName || !image) {
      return Alert.alert('Add ProfilePic and GroupName');
    }

    setLoading(true);

    const filePath = `groupProfile/${Date.now()}groupProfile.jpg`;
    // uploading image to firebase bucket
    let url = await uploadFilesToBucket(image, filePath);
    groupData.groupProfilePic = url;

    createGroupInDb(groupData)
      .then(val => {
        navigation.navigate('Home');
        updateGroupInfo(val, {groupId: val});
      })
      .catch(err =>
        Alert.alert(`Something went wrong! reason : ${err.message}`),
      );

    // console.log(createGroupData);
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.GREY_BLACK}
        barStyle={'light-content'}
      />
      <TopAppBar profie text="Create Group" />
      <View style={styles.contentWrapper}>
        <View style={styles.avatorWrapper}>
          {image ? (
            <TouchableOpacity onPress={goToGallery}>
              <Image source={{uri: image}} style={styles.imgStyle} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.avatorContainer}
              onPress={goToGallery}>
              <Ionicons name="person" color={AppColors.WHITE} size={35} />
            </TouchableOpacity>
          )}
        </View>
        <RegularInput placeholder="Username" setValue={setGroupName} />

        {loading ? (
          <ActivityIndicator
            color={AppColors.WHITE}
            style={{alignSelf: 'center', marginVertical: 30}}
          />
        ) : (
          <RegularButton
            text="Create"
            extraStyle={styles.btnStyle}
            onPress={createGroup}
          />
        )}
      </View>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  avatorWrapper: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgStyle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: AppColors.WHITE,
  },
  avatorContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: AppColors.GREY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    marginTop: 10,
    backgroundColor: AppColors.GREY_BLACK,
  },
});
