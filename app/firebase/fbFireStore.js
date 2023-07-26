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
  user,
  messageData,
  media,
) => {
  const myChatData = {
    lastMsg: message,
    chatterId: friendId,
    chatterProfilePic: friendProfilePic,
    chatterName: friendUsername,
    updatedAt: Date.now(),
    media: media,
    newMessage: false,
  };
  const friendChatData = {
    lastMsg: message,
    chatterId: user.uid,
    chatterProfilePic: user.profilePic,
    chatterName: user.username,
    updatedAt: Date.now(),
    media: media,
    newMessage: true,
  };

  // adding chat to current user db
  addChatToDb(user.uid, friendId, myChatData);
  // adding messge to current user message collection
  addMessage(user.uid, friendId, messageData);

  // adding chat to friend db
  addChatToDb(friendId, user.uid, friendChatData);
  // adding messge to friends message collection
  addMessage(friendId, user.uid, messageData);
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

const updateMessageCounter = (userId, counter) => {
  const ref = firestore().collection('Users').doc(userId);
  ref.update({messageCounter: counter + 1});
};

export const updateSeenStatus = (myId, chatId) => {
  firestore()
    .collection('Users')
    .doc(myId)
    .collection('chats')
    .doc(chatId)
    .update({newMessage: false});
};
