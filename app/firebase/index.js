import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getRealTimeUserData = friendId => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(friendId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setData(snapshot.data());
        }
      });

    return () => unsubscribe();
  }, []);

  return data;
};
