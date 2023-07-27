import React, {createContext, useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {hasAndroidPermission} from '../features/AppPermisionEtc';
import {getPhotosFromStorage} from '../features/GetStorageData';
export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [storagePermission, setStoragePermision] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  useEffect(() => {
    hasAndroidPermission()
      .then(val => {
        setStoragePermision(val);

        // getting storage data
        getUserPhoto();
      })
      .catch(err => setStoragePermision(false));
  }, []);

  const getUserPhoto = () => {
    getPhotosFromStorage()
      .then(imgData => {
        setGalleryPhotos(imgData);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        storagePermission,
        setStoragePermision,
        galleryPhotos,
        setGalleryPhotos,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
