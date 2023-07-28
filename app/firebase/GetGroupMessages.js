import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const getGroupMessages = groupId => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Groups')
      .doc(groupId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => doc.data());
        setData(docs);
      });

    return () => unsubscribe();
  }, []);

  return data;
};

export default getGroupMessages;
