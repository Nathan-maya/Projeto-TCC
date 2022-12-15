import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';

export const Container = styled.section`
  color: #fafafa;
`;
export const ContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
export const Wrapper = styled(Formik)`

`;
export const Forms = styled(Form)`
  margin: 20px 62px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #fafafa;
  padding: 20px;
`;
export const Input = styled(Field)`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #fafafa;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 10px 20px 10px;
  width: 100%;
`;

export const Label = styled.label`
  color: black;
  font-family: sans-serif;
  line-height: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Link = styled.a`
  color: black;
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export const Button = styled.button`
  background-color: #F88B61;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #fafafa;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 10px 20px 10px;
  width: 100%;
  cursor: pointer;
  transition: 0.5s;

  &:hover{
    background: #303245;
  }
`;

export const Mistakes = styled.div`
  color: #d8000c;
  border: 1px solid;
  padding: 15px 10px 15px 50px;
  background: #ffbaba;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-image: url('https://i.imgur.com/GnyDvKN.png');
`;

