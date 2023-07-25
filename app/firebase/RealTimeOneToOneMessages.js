import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const getOneToOneMessages = chatterId => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('chats')
      .doc(chatterId)
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

export default getOneToOneMessages;
