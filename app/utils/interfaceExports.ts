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
}

// types.ts
export interface messageScreenParams {
  isGroupChat: boolean;
  profilePic: string;
  name: string;
  chatId: string;
}

export interface messageInterface {
  text: string;
  senderId: string;
  createdAt: Date;
  media: {
    isAdded: false;
    type: string;
  };
  urls: Array<[]>;
}
