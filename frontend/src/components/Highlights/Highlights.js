import React from 'react';

import CardHighlights from '../CardHighlights/CardHighlights'
import { Container, Title } from './styleHighlights';

const Highlights = () => {
  return (
    <Container>
      <Title>Destaques</Title>
      <CardHighlights/>
    </Container>
  );
};

export default Highlights;
