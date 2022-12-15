import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Container = styled.section`
  margin: 20px 82px 0px 62px;
  max-width: 100%;
`;

export const ContainerAviso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  color:#fafafa;
`;
export const span = {
  fontSize: '24px',
  color:'#fafafa',
};
export const number = {
  fontSize: '36px',
  fontWeight: 'bold',
  color:'#F88B61',
};
export const P = styled.p``;
export const slide = {
  paddingTop: '20px',
  borderRadius: '5px',
};
export const SlideContent = styled.div`
  display: flex;
  margin-bottom: 40px;

`;
export const LinkStyled = styled(Link)`
  > img {
    width: 100%; 
    height: 100%;
    max-width: 15rem;
    max-height: 15rem;
    cursor:pointer
  }
`;



const rodando = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`;
export const Loading = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 8px solid white;
  border-left: 8px solid black;
  animation-name: ${rodando};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;
