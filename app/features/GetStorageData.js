import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const getPhotosFromStorage = () => {
  return new Promise((resolve, reject) => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
    })
      .then(r => {
        let imgUris = [];

        r.edges.forEach(edge => imgUris.push(edge.node.image.uri));

        resolve(imgUris);
      })
      .catch(err => {
        reject(err);
        //Error Loading Images
      });
  });
};
