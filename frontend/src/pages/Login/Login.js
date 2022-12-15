import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  ContainerForm,
  Forms,
  Input,
  Label,
  Link,
  Mistakes,
  Wrapper,
} from './style';
import Header from '../../components/Header/Header';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../API/apiCalls';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Por favor, insira um nome!')
    .matches(
      /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
      'Digite um nome válido',
    ),
  password: Yup.string()
    .required('Por favor, insira a idade!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'No mínimo oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial:',
    ),
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mistake, setMistake] = useState('');
  const navagite = useNavigate();

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (values) => {
    setUsername(values.username);
    setPassword(values.password);
  };

  useEffect(() => {
    const Login = async () => {
      const res = await login({ username, password }, dispatch);
      if (res.status !== 200) {
        setMistake(res.response.data);
      } else {
        navagite('/');
      }
    };
    if (username) {
      Login();
    }
  }, [dispatch, navagite, password, username]);

  return (
    <Container>
      <Header />
      <ContainerForm>
        <Wrapper
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={(values, { resetForm }) => {
            handleClick(values);
            // resetForm();
          }}
        >
          {(props) => (
            <Forms>
              <Label htmlFor="username">username: </Label>
              {props.errors.username && (
                <Mistakes>{props.errors.username}</Mistakes>
              )}
              <Input name="username" type="text" />

              <Label htmlfor="password">password: </Label>
              {props.errors.password && (
                <Mistakes>{props.errors.password}</Mistakes>
              )}
              <Input name="password" type="password" />
              <Button type="submit" disabled={isFetching}>
                Entrar
              </Button>
              {error && <Mistakes>Usuário ou senha estão incorretos!</Mistakes>}
              <Link>Esqueceu a senha?</Link>
              <Link>Não tem uma conta? Crie uma!</Link>
            </Forms>
          )}
        </Wrapper>
      </ContainerForm>
    </Container>
  );
};

export default Login;
