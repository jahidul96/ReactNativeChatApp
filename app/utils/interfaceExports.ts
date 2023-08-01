export interface userInterface {
  bio: string;
  email: string;
  profilePic: string;
  pushToken: string;
  uid: string;
  username: string;
}

export interface chatInterface {
  chatterId: string;
  chatterName: string;
  chatterProfilePic: string;
  lastMsg: string;
  media: boolean;
  updatedAt: Date;
  newMessage: boolean;
}

// types.ts
export interface messageScreenParams {
  isGroupChat: boolean;
  profilePic: string;
  name: string;
  chatId: string;
  membersId: Array<string>;
  adminDetails: userInterface;
  memberDetails: Array<userInterface>;
}

export interface messageInterface {
  text: string;
  createdAt: Date;
  media: boolean;
  isGroupChat: boolean;
  senderDetails: userInterface;
  file: {
    urls: [];
    type: string;
  };
}

export interface imgShowScreenparamsInterface {
  imgUrl: Array<string>;
  isMultiple: boolean;
  name: string;
  chatId: string;
  profilePic: string;
  user: userInterface;
  setShowCamera: any;
}

export interface groupChatInterface {
  groupName: string;
  groupProfilePic: string;
  memberIds: Array<string>;
  memberDetails: Array<userInterface>;
  adminDetails: userInterface;
  lastMsg: string;
  newGroup: boolean;
  media: boolean;
  senderId: string;
  groupId: string;
  updatedAt: Date;
  newMessage: boolean;
  seenBy: Array<string>;
}

export interface chatDetailsScreenParams {
  isGroupChat: boolean;
  memberDetails: Array<userInterface>;
  memberIds: Array<string>;
  chatDetails: userInterface;
  groupImage: string;
  groupName: string;
  chatMedia: Array<messageInterface>;
  adminDetails: userInterface;
  chatId: string;
}
