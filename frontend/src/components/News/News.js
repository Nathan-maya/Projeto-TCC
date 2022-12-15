import React from 'react';
import CardNews from '../CardNews/CardNews';
import { Container, Title } from './styleNews';

const News = () => {
  return (
    <Container>
      <Title>Notícias</Title>
      <CardNews/>
    </Container>
  );
};

export default News;
