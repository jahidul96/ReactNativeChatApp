import firestore from '@react-native-firebase/firestore';

export const addUserToFb = (data, userId) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .set(data)
      .then(() => {
        resolve(true);
        console.log('data added to fb collection');
      })
      .catch(error => {
        reject(error);
        console.log(error.message);
      });
  });
};
