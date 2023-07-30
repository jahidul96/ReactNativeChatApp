import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const askNotificationPermision = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
};

export const requestUserPermissionForNotification = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
  }
};

export const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  // console.log('messaging token');
  // console.log(fcmToken);
  return fcmToken;
};

export const getRefreshToken = async () => {
  console.log('refreshed token func');
  messaging().onTokenRefresh(token => {
    console.log('refrehed token ', token);
  });
};

export const notificationListeners = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging().getInitialNotification(async remoteMessage => {
    console.log('this app now on kill state', remoteMessage);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('firegroundhandler message', remoteMessage.data);

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.data.title,
      body: remoteMessage.data.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
        largeIcon: remoteMessage.data.image,
      },
    });
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('background message handler', remoteMessage.notification);

    await notifee.displayNotification({
      title: remoteMessage.data.title,
      body: remoteMessage.data.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
        largeIcon: remoteMessage.data.image,
      },
    });
  });
};

const displayNotifeeMessage = async (title, body) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
};
