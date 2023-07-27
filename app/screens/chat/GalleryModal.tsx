import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/AppColors';
import {AntDesign, Ionicons} from '../../utils/IconExport';
import {MediaSendFooter} from './ChatReusableComp';
import TopAppBar from '../../components/TopAppBar';
import RegularText from '../../components/RegularText';
import {Divider, SizedBox} from '../../components/Reuseable';
import {imgUri} from '../../utils/FileExport';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface modalInterface {
  visible: boolean;
  onRequestClose: () => void;
  name: string;
  onPress: () => void;
  setVisiable: any;
}
const GalleryModal = ({
  visible,
  onRequestClose,
  setVisiable,
  name,
  onPress,
}: modalInterface) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <Pressable style={styles.centeredView}>
        {/* topAppBar */}
        <TopAppBar
          profie
          text={`Send To ${name}`}
          onPressBack={() => setVisiable(!visible)}
        />

        {/* photos */}
        <ScrollView contentContainerStyle={styles.photoContainer}>
          {/* <RegularText text="Photos" extraStyle={styles.topTitlestyle} /> */}
          <View style={styles.imgWrapper}>
            {data.map((d, i) => (
              <ImageComp key={i} />
            ))}
          </View>
        </ScrollView>

        {/* bottom sender comp */}
        <MediaSendFooter name={name} onPress={onPress} />
      </Pressable>
    </Modal>
  );
};

export default GalleryModal;

interface imageComp {}
const ImageComp = () => (
  <Image source={{uri: imgUri}} style={styles.imgStyle} />
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: AppColors.GREY_BLACK,
  },

  photoContainer: {
    backgroundColor: AppColors.BLACK,
    // flexGrow: 1,
    paddingHorizontal: 15,
  },
  topTitlestyle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  imgWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imgStyle: {
    width: '48%',
    height: 120,
    marginBottom: 10,
  },
});
