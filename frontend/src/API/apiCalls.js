import { publicRequest } from '../requestMethod';
import { clearFile } from '../redux/fileSlice';

import {
  addMissingFailure,
  addMissingStart,
  addMissingSuccess,
} from '../redux/missingRedux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';


export const addMissing = async (missing, dispatch) => {
  dispatch(addMissingStart());
  try {
    const res = await publicRequest.post(`/missing`, missing);
    console.log('realizando post')
    await dispatch(addMissingSuccess(res.data));
    console.log('chamando clearFile')
    dispatch(clearFile());
  } catch (err) {
    console.log(err)
    dispatch(addMissingFailure());
  }
};

export const login = async(user,dispatch)=>{
  dispatch(loginStart());
  try{
    const res = await publicRequest.post('auth/login',user)
    await dispatch(loginSuccess(res.data))
    return res
  } catch(err){
    console.log(err)
    dispatch(loginFailure())
  }
}

export const register = async(register)=>{
  try{
    return await publicRequest.post('auth/register',register)
    
  }catch(err){
    return err
  }
}

export const findFirstImg = async()=>{
  try{
    return await publicRequest.get('missing/find/img')
  }catch(err){
    return err
  }
}

export const findOneMissing = async(id)=>{
  try{
    return await publicRequest.get(`missing/find/missing/${id}`)
  }catch(err){
    return err
  }
}
