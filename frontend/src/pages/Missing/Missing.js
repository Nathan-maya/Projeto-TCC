import React from 'react';
import DataMissing from '../../components/DataMissing/DataMissing';
import Header from '../../components/Header/Header'
import { Container } from './style';

const Missing = () => {
  return (
    <Container>
      <Header/>
      <DataMissing />
    </Container>
  );
};

export default Missing;
