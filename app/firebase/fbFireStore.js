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

export const getUserData = userId => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(userId)
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

// add single chat
const addChatToDb = (userId, chatId, chatData) => {
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('chats')
    .doc(chatId)
    .set(chatData);
};

// delete single message
export const deleteMessageChat = (userId, chatId) => {
  deleteOneToOneMessage(userId, chatId);
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('chats')
    .doc(chatId)
    .delete();
};

// add message to single chat
const addMessage = (userId, chatDocId, messageData) => {
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('chats')
    .doc(chatDocId)
    .collection('messages')
    .add(messageData);
};

// delete OneToone all messages
const deleteOneToOneMessage = (userId, chatId) => {
  firestore()
    .collection('Users')
    .doc(userId)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .get()
    .then(documentSnapshot => {
      documentSnapshot.docs.forEach(doc => {
        doc.ref.delete();
      });
    })
    .catch(err => {});
};

// update chat/message status
export const updateSeenStatus = (myId, chatId) => {
  firestore()
    .collection('Users')
    .doc(myId)
    .collection('chats')
    .doc(chatId)
    .update({newMessage: false});
};

// createGroup
export const createGroupInDb = groupData => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Groups')
      .add(groupData)
      .then(val => {
        resolve(val.id);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// update grp info
export const updateGroupInfo = (id, data) => {
  firestore().collection('Groups').doc(id).update(data);
};

// add message to group
export const addMessageToGroup = (groupId, messageData) => {
  firestore()
    .collection('Groups')
    .doc(groupId)
    .collection('messages')
    .add(messageData);
};

// delete grp
export const deleteGroupFromFb = async groupId => {
  deleteGrpMessages(groupId);
  firestore().collection('Groups').doc(groupId).delete();
};

// delete all grp messages
export const deleteGrpMessages = groupId => {
  firestore()
    .collection('Groups')
    .doc(groupId)
    .collection('messages')
    .get()
    .then(documentSnapshot => {
      documentSnapshot.docs.forEach(doc => {
        doc.ref.delete();
      });
    })
    .catch(err => {});
};
