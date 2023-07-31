import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppColors} from '../../utils/AppColors';
import {AntDesign, Ionicons} from '../../utils/IconExport';
import {MediaSendFooter} from './ChatReusableComp';
import TopAppBar from '../../components/TopAppBar';
import RegularText from '../../components/RegularText';

import {AppContext} from '../../context/AppContext';
import {WIDTH} from '../../utils/AppDimension';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface modalInterface {
  visible: boolean;
  onRequestClose: () => void;
  name: string;
  onPress: () => void;
  setVisiable: any;
  selectedImg: Array<string>;
  setSelectedImg: any;
}
const GalleryModal = ({
  visible,
  onRequestClose,
  setVisiable,
  name,
  onPress,
  selectedImg,
  setSelectedImg,
}: modalInterface) => {
  const {galleryPhotos} = useContext(AppContext);
  const [previewImages, setPreviewImages] = useState(false);

  const onPreesOnImage = (photoUrl: string) => {
    const existPhoto = selectedImg.includes(photoUrl);
    if (existPhoto) {
      setSelectedImg(selectedImg.filter(img => img != photoUrl));
    } else {
      if (selectedImg.length >= 4) {
        return Alert.alert('Just 4 For Now!');
      }
      setSelectedImg((prevState: any) => [...prevState, photoUrl]);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        {previewImages ? (
          <View style={styles.prevSliderContainer}>
            {/* topAppBar */}
            <TopAppBar
              profie
              text={`back`}
              onPressBack={() => setPreviewImages(!previewImages)}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: WIDTH, height: 300}}>
                <FlatList
                  data={selectedImg}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={styles.sliderImgWrapper}>
                      <Image
                        source={{uri: item}}
                        style={styles.sliderImgStyle}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        ) : (
          <>
            {/* topAppBar */}
            <TopAppBar
              profie
              text={`Send To ${name}`}
              onPressBack={() => {
                setVisiable(!visible);
                setSelectedImg([]);
              }}
            />
            {/* photos */}
            <FlatList
              data={galleryPhotos}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <ImageComp
                  photoUrl={item}
                  onPreesOnImage={() => onPreesOnImage(item)}
                  selectedImg={selectedImg}
                />
              )}
            />

            {/* selected img preview */}
            {selectedImg.length > 0 && (
              <SmallPrevComp
                selectedImg={selectedImg}
                onPress={() => setPreviewImages(!previewImages)}
              />
            )}
          </>
        )}

        {/* bottom sender comp */}
        <MediaSendFooter name={name} onPress={onPress} />
      </View>
    </Modal>
  );
};

export default GalleryModal;

interface imageComp {
  photoUrl: string;
  onPreesOnImage: () => void;
  selectedImg: Array<string>;
}
const ImageComp = ({photoUrl, onPreesOnImage, selectedImg}: imageComp) => {
  const imgAdded = selectedImg.includes(photoUrl);

  // const selectedStyle = ;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.imgWrapper, {opacity: imgAdded ? 0.9 : 1}]}
      onPress={onPreesOnImage}>
      <Image source={{uri: photoUrl}} style={styles.imgStyle} />
      {imgAdded && (
        <View style={styles.selectedIconContainerStyle}>
          <AntDesign name="check" color={AppColors.WHITE} size={22} />
        </View>
      )}
    </TouchableOpacity>
  );
};

interface smallPrevInterface {
  selectedImg: Array<string>;
  onPress: () => void;
}

const SmallPrevComp = ({selectedImg, onPress}: smallPrevInterface) => {
  return (
    <View style={styles.selectedImgPrevContainer}>
      {/* image showCase */}
      <View style={styles.prevImgWraaper}>
        {selectedImg.map((photo: string, i: number) => (
          <Image
            key={i}
            source={{uri: photo}}
            style={styles.smallPrevImgStyle}
          />
        ))}
      </View>

      {/* prev icon */}
      <Pressable style={styles.prevIconWrapper} onPress={onPress}>
        <AntDesign name="arrowright" size={22} color={AppColors.WHITE} />
        <View style={styles.counterContainer}>
          <RegularText
            text={selectedImg.length.toString()}
            extraStyle={styles.counterText}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: AppColors.GREY_BLACK,
  },

  prevSliderContainer: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  sliderImgWrapper: {
    width: WIDTH,
    height: '100%',
  },
  sliderImgStyle: {
    flex: 1,
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
    width: '48%',
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  selectedImgPrevContainer: {
    width: WIDTH,
    height: 60,
    backgroundColor: AppColors.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  prevImgWraaper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallPrevImgStyle: {
    width: 40,
    height: 40,
    marginRight: 2,
    borderRadius: 10,
  },

  prevIconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.BLUE_DARK,
  },
  counterContainer: {
    position: 'absolute',
    top: -10,
    right: 2,
    backgroundColor: AppColors.GREY_BLACK,
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  selectedIconContainerStyle: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: AppColors.GREY_BLACK,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    opacity: 1,
  },
});
