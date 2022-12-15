import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findOneMissing } from '../../API/apiCalls';
import { Container, Info, InfoText, P, TextLabel, Wrapper } from './style';

const DataMissing = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [missing, setMissing] = useState();

  useEffect(() => {
    const getMissing = async () => {
      try {
        const res = await findOneMissing(id);
        return setMissing(res.data);
      } catch (err) {
        return err;
      }
    };
    getMissing();
  }, [id]);

  return (
    <Container>
      {missing &&
        (console.log(missing),
        (
          <Wrapper>
            <Info>
              <a href={missing.img[0]} target='_blank' rel="noreferrer"><img src={missing.img[0]} alt="foto de uma pessoa"/></a>
              
              <InfoText>
                <TextLabel>Nome:</TextLabel>
                <P>{missing.nome}</P>
              </InfoText>
              <InfoText>
                <TextLabel>Idade: </TextLabel>
                <P>{missing.idade}</P>
              </InfoText>
              <InfoText>
                <TextLabel>Endereço: </TextLabel>
                <P>{missing.endereco}</P>
              </InfoText>
              <InfoText>
                <TextLabel>Data: </TextLabel>
                <P>{missing.data}</P>
              </InfoText>
              <InfoText>
                <TextLabel>Municipio:</TextLabel>
                <P> {missing.municipio}</P>
              </InfoText>

            </Info>
          </Wrapper>
        ))}
    </Container>
  );
};

export default DataMissing;
