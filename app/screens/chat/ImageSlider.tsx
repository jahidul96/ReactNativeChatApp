import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/AppColors';
import TopAppBar from '../../components/TopAppBar';
import {WIDTH} from '../../utils/AppDimension';

interface paramsInterface {
  route: {
    params: {
      images: Array<string>;
    };
  };
}

const ImageSlider = ({route}: paramsInterface) => {
  const {images} = route.params;
  //   console.log(images);
  return (
    <View style={styles.container}>
      <TopAppBar profie text="Images" />
      {/* slider */}
      <View style={styles.sliderContainer}>
        <View
          style={{
            width: WIDTH,
            height: 300,
          }}>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.imgStyle} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.GREY_BLACK,
  },
  sliderContainer: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: WIDTH,
    height: '100%',
  },
});
