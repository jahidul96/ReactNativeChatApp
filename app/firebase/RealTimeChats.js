import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const getRealtimeChats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('chats')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => doc.data());
        setData(docs);
      });

    return () => unsubscribe();
  }, []);

  return data;
};

export default getRealtimeChats;
