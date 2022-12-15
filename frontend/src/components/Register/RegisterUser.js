import React, { useState } from 'react';
import {
  Button,
  Container,
  Forms,
  Input,
  Label,
  Mistakes,
  Success,
  Wrapper,
} from './style';
import * as Yup from 'yup';
import { register } from '../../API/apiCalls';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Por favor, insira um nome!')
    .matches(
      /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
      'Digite um nome válido',
    ),
  password: Yup.string()
    .required('Por favor, uma senha!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'No mínimo oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial:',
    ),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Senhas diferentes!',
  ),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Por favor, insira o e-mail de contato!'),
});

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClick = async (values) => {
    setUsername(values.username);
    setPassword(values.password);
    setEmail(values.email);
    const res = await register({ username, password, email });
    console.log(res);
    if (res.status !== 201) {
      setError(res.response.data);
    } else {
      setError('')
      setSuccess(true);
    }
  };

  return (
    <Container>
      <Wrapper
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          username: '',
          password: '',
          repeatPassword: '',
          email: '',
        }}
        onSubmit={(values, { resetForm }) => {
          handleClick(values);
          // resetForm();
        }}
      >
        {(props) => (
          <Forms>
            <Label htmlFor="username">Nome de usuário: </Label>
            {props.errors.username && (
              <Mistakes>{props.errors.username}</Mistakes>
            )}
            <Input
              name="username"
              placeholder="nathan.maia"
              autoComplete="username"
            />
            <Label htmlFor="password">Senha: </Label>
            {props.errors.password && (
              <Mistakes>{props.errors.password}</Mistakes>
            )}
            <Input
              name="password"
              placeholder="1234!MN1"
              type="password"
              autoComplete="new-password"
            />
            <Label htmlFor="repeatPassword">Repetir a senha</Label>
            {props.errors.repeatPassword && (
              <Mistakes>{props.errors.repeatPassword}</Mistakes>
            )}
            <Input
              name="repeatPassword"
              placeholder="1234!MN1"
              type="password"
              autoComplete="new-password"
            />
            <Label htmlFor="email">E-mail:</Label>
            {props.errors.email && <Mistakes>{props.errors.email}</Mistakes>}
            <Input name="email" placeholder="exemplo@exemplo.com" />
            {error && <Mistakes>{error}</Mistakes>}
            {success && <Success>Cadastrado com sucesso!Faça o login</Success>}
            <Button type="submit">Cadastrar</Button>
          </Forms>
        )}
      </Wrapper>
    </Container>
  );
};

export default RegisterUser;
