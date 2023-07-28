import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import auth from '@react-native-firebase/auth';
import Home from '../screens/Home';
import LoadingScreen from '../screens/LoadingScreen';
import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import MessageScreen from '../screens/chat/MessageScreen';

import ImageSlider from '../screens/chat/ImageSlider';
import CreateGroup from '../screens/chat/CreateGroup';

const Stack = createNativeStackNavigator();
const NavigationScreens = () => {
  const [initializing, setInitializing] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');

  function onAuthStateChanged(user: any) {
    setInitialRoute(user ? 'Home' : 'Register');
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName={initialRoute}>
        {/* auth screens */}
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />

        {/* app screens */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen
          name="ImageSlider"
          component={ImageSlider}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreens;
