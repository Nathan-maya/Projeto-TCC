import styled from "styled-components";
import { Formik, Form, Field } from 'formik';

export const Container = styled.section`
  color: #fafafa;
`;
export const Wrapper = styled(Formik)`
`;
export const Forms = styled(Form)`
  margin: 20px 62px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #fafafa;
  padding: 20px;
`;
export const Input = styled(Field)`
  background-color: #343434;
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
export const LabelFotos = {
  padding: '10px 0px',
  background: '#303245',
  color: '#fafafa',
  textTransform: 'uppercase',
  textAlign: 'center',
  display: 'block',
  borderRadius: '12px',
  cursor: 'pointer',
};
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
export const InputFile = {
  display: 'none',
};

export const List = {
  color: 'black',
  width: ' 100%',
  backgroundColor: '#ffffff',
  borderRadius: '0 0 5px 5px',
};

export const Mistakes = styled.div`
  color: #d8000c;
  border: 1px solid;
  padding: 15px 10px 15px 50px;
  background: #ffbaba;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-image: url('https://i.imgur.com/GnyDvKN.png');
`;

export const Success = styled.div`
  color: #4f8a10;
  border: 1px solid;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  background-color: #dff2bf;
  background-image: url('https://i.imgur.com/Q9BGTuy.png');
  background-repeat: no-repeat;
  background-position: 10px center;
`;

export const Ul = styled.ul`
  background: #303245;
  border-radius: 12px;
  padding: 20px;
  opacity: 0;
  transition: 0.9s ease-out;
  ${(props) => (props.visible ? 'opacity: 1' : 'opacity:0')}
`;
export const Li = styled.li`
  cursor: pointer;
`;

