import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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

export const getUserData = () => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          resolve(documentSnapshot);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getAllContacts = () => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .where('uid', '!=', auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        let userData = [];
        documentSnapshot.docs.forEach(doc => {
          userData.push(doc.data());
        });

        resolve(userData);
      })
      .catch(err => {
        reject(err);
      });
  });
};
