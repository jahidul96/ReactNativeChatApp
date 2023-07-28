import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const getGroupsChats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Groups')
      .where('memberIds', 'array-contains', auth().currentUser.uid)
      .onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => doc.data());
        setData(docs);
      });

    return () => unsubscribe();
  }, []);

  return data;
};

export default getGroupsChats;
