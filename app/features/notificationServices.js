import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

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
    askNotificationPermision();
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
  messaging().onNotificationOpenedApp(remoteMessage => {
    displayRemoteNotifeeMessage(
      remoteMessage.data.title,
      remoteMessage.data.body,
      remoteMessage.data.image,
    );
  });

  // Check whether an initial notification is available
  messaging().getInitialNotification(async remoteMessage => {
    console.log('this app now on kill state', remoteMessage);

    displayRemoteNotifeeMessage(
      remoteMessage.data.title,
      remoteMessage.data.body,
      remoteMessage.data.image,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('firegroundhandler message', remoteMessage.data);

    // Display a notification

    displayRemoteNotifeeMessage(
      remoteMessage.data.title,
      remoteMessage.data.body,
      remoteMessage.data.image,
    );
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('background message handler', remoteMessage.notification);
    displayRemoteNotifeeMessage(
      remoteMessage.data.title,
      remoteMessage.data.body,
      remoteMessage.data.image,
    );
  });
};

const displayRemoteNotifeeMessage = async (title, body, imgUrl) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'custom_channel',
  });

  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
      largeIcon: imgUrl,
      circularLargeIcon: true,
    },
  });
};
export const displayNotifeeMessage = async (title, body) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'custom_channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
  });
};
