import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import RegisterMissing from '../../components/Register/RegisterMissing';
// import RegisterMissing from '../../components/Register/RegisterMissing'
import RegisterUser from '../../components/Register/RegisterUser';
import { Container, Wrapper } from './styleCadastro';

const Cadastro = () => {
  const [user, setUser] = useState('');
  const selector = useSelector((state) => {
    if (state.user.currentUser !== null) {
      return state.user.currentUser.username;
    }
  });
  useEffect(() => {
    setUser(selector);
  }, [selector]);

  return (
    <Container>
      <Header />
      <Wrapper>
        {!user && <RegisterUser />}
        {user && <RegisterMissing />}
      </Wrapper>
    </Container>
  );
};

export default Cadastro;
