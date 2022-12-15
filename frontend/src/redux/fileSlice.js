import { createSlice } from '@reduxjs/toolkit';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from './firebaseConfig';

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //upload
    uploadFileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    uploadFileSuccess: (state, action) => {
      state.isFetching = false;
      state.files = action.payload
    },
    uploadFileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearFile:(state)=>{
      console.log('clearFile')
      state.files=[]
    }
  },
});

export const { uploadFileStart, uploadFileSuccess, uploadFileFailure,clearFile } =
  fileSlice.actions;

export default fileSlice.reducer;


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
