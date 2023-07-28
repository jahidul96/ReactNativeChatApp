import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {AppColors} from '../utils/AppColors';
import {WIDTH} from '../utils/AppDimension';

const renderScene = SceneMap({
  first: () => (
    <View>
      <Text>Groups</Text>
    </View>
  ),
  second: () => (
    <View>
      <Text>Chats</Text>
    </View>
  ),
});
const TestPage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Chats'},
    {key: 'second', title: 'Groups'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: AppColors.WHITE}}
      style={{
        backgroundColor: AppColors.GREY_BLACK,
        minHeight: 55,
        justifyContent: 'center',
        elevation: 0,
        borderRadius: 6,
      }}
      labelStyle={{
        color: AppColors.GREY,
      }}
      activeColor={AppColors.WHITE}
    />
  );
  return (
    <View style={{flex: 1}}>
      {/* slider */}
      <View
        style={{
          flex: 1,
          width: WIDTH,
        }}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: WIDTH}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

export default TestPage;

const styles = StyleSheet.create({});
