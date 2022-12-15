import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 20px 62px;
  align-items: center;
  height: 80px;
  border-bottom: solid white 1px;
`;

export const Logo = styled.img`
  cursor: pointer;
  height: 200px;
  width: 200px;
  max-width: 100%;
  object-fit: cover;
`;
export const Cabecalho = styled.div``;
export const NavTitle = styled.h1`
  position: absolute;
  top: 60px;
  right: 82px;
  font-size: 20px;
  font-weight: bold;
  color: #fafafa;
`;

export const Nav = styled.nav``;
export const Ul = styled.ul`
  ${(props) => {
    switch (props.nav) {
      case 'nav-superior':
        return `  display: flex;
  justify-content: flex-end;
  margin-top: -45px;
        `;
      default:
        return `  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 67px;
  `;
    }
  }}
`;
export const Li = styled.li`
  ${(props) => {
    switch (props.nav) {
      case 'nav-superior':
        return `
        font-size: 14px;
        margin-right: 20px;
        color: #fafafa;
        cursor:pointer;
        padding: 10px 10px;
        position:relative;

        &:after{
          background: none reapeat scroll 0 0 transparent;
          bottom:0;
          content:"";
          display:block;
          height: 2px;
          left:50%;
          position:absolute;
          background:#f88b61;
          transition: width 0.3s ease 0s, left 0.3s ease 0s;
          width:0;
        }
        &:hover:after{
          width: 100%;
          left:0;
        }
  `;
      default:
        return `text-transform: uppercase;
  font-weight: 400;
  font-size: 16px;
  color: #fafafa;
  margin-right: 20px;
  padding: 10px 10px;
  cursor:pointer;
  transition:0.5s;
  position:relative;

  &:after{
    background: none reapeat scroll 0 0 transparent;
    bottom:0;
    content:"";
    display:block;
    height: 2px;
    left:50%;
    position:absolute;
    background:#f88b61;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width:0;
  }
  &:hover:after{
    width: 100%;
    left:0;
  }
  @media screen and (max-height:300px){
    Ul{
      margin-top: 140px;
    }
  }
  `;
    }
  }}
`;

export const LinkStyled = styled(Link)`
  color: white;
  text-decoration: none;
`;
