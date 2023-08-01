import React, {createContext, useEffect, useState} from 'react';
export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [storagePermission, setStoragePermision] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [pushToken, setPushToken] = useState('');

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        storagePermission,
        setStoragePermision,
        galleryPhotos,
        setGalleryPhotos,
        pushToken,
        setPushToken,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
