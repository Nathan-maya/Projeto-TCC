import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from './firebaseConfig';
import {
  uploadFileFailure,
  uploadFileStart,
  uploadFileSuccess,
} from './fileSlice';
export const uploadFile = async (files, dispatch) => {
  dispatch(uploadFileStart);
  try {
    const urls = [];
    files.map((file, index) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );
          // console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            urls.push(downloadURL);
            if (files.length === urls.length) {
              dispatch(uploadFileSuccess(urls));
            }
          });
        },
      );
    });
  } catch (err) {
    dispatch(uploadFileFailure());
  }
};
