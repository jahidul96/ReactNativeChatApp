import auth from '@react-native-firebase/auth';

export const fbUserRegister = (email, password) => {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        resolve(user.user);
      })
      .catch(error => {
        reject(error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  });
};

export const signinWithFb = (email, password) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        resolve(user.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};
