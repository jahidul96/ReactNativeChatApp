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

export const getGroups = setData => {
  const data = [];
  firestore()
    .collection('Groups')
    .where('members', 'array-contains', auth().currentUser.uid)
    .onSnapshot(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        let val = {groupId: doc.id, groupData: doc.data()};
        data.push(val);
      });
    });

  setData(data);
};

export const oneToOneChatMessage = (
  message,
  friendId,
  friendProfilePic,
  friendUsername,
  myData,
) => {
  const myChatData = {
    lastMsg: message,
    chatterId: friendId,
    chatterProfilePic: friendProfilePic,
    chatterName: friendUsername,
    updatedAt: Date.now(),
    media: false,
  };
  const friendChatData = {
    lastMsg: message,
    chatterId: myData.uid,
    chatterProfilePic: myData.profilePic,
    chatterName: myData.username,
    updatedAt: Date.now(),
    media: false,
  };

  let oneToOneMessageData = {
    text: message,
    senderId: myData.uid,
    createdAt: Date.now(),
    media: {
      isAdded: false,
      type: '',
    },
    urls: [],
  };

  // adding chat to current user db
  addChatToDb(myData.uid, friendId, myChatData);
  // adding messge to current user message collection
  addMessage(myData.uid, friendId, oneToOneMessageData);

  // adding chat to friend db
  addChatToDb(friendId, myData.uid, friendChatData);
  // adding messge to friends message collection
  addMessage(friendId, myData.uid, oneToOneMessageData);
};

const addChatToDb = (userId, chatId, chatData) => {
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('chats')
    .doc(chatId)
    .set(chatData);
};

const addMessage = (userId, chatDocId, messageData) => {
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('chats')
    .doc(chatDocId)
    .collection('messages')
    .add(messageData);
};
