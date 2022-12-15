import React, { useEffect, useState } from 'react';
import {
  Cabecalho,
  Container,
  Li,
  LinkStyled,
  Logo,
  Nav,
  NavTitle,
  Ul,
} from './styleHeader';
import LogoImg from '../../assets/picwish.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const selector = useSelector((state) => {
    if (state.user.currentUser !== null) {
      return state.user.currentUser.username;
    }
  });
  useEffect(() => {
    setUser(selector);
  }, [selector]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Container>
        <LinkStyled to="/">
          <Logo src={LogoImg} alt="logo SOS" />
        </LinkStyled>
        <Cabecalho>
          <Nav nav="nav-superior">
            <Ul nav="nav-superior">
              <Li nav="nav-superior">Ajuda</Li>
              <Li nav="nav-superior">Dúvidas Frequentes</Li>
              <Li nav="nav-superior">Mapa do Site</Li>
              <Li nav="nav-superior">Fale Conosco</Li>
            </Ul>
          </Nav>
          <NavTitle>DIVISÃO DE REFERÊNCIA DA PESSOA DESAPARECIDA</NavTitle>
        </Cabecalho>
      </Container>
      <Nav>
        <Ul>
          <Li>A Campanha</Li>
          <Li>Como Ajudar</Li>
          <Li>Como prevenir</Li>
          <Li>Álbum de fotos</Li>

          <Li>
            <LinkStyled to="/register">Cadastro</LinkStyled>
          </Li>
          {!user ? (
            <Li>
              <LinkStyled to="/login">Login</LinkStyled>
            </Li>
          ) : (
            <Li onClick={handleLogout}>Logout</Li>
          )}
        </Ul>
      </Nav>
    </>
  );
};

export default Header;
