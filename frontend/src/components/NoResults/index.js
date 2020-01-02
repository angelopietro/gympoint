import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Container, Message } from './styles';

export default function NoResults() {
  return (
    <Container>
      <>
        <MdInfoOutline />
        <Message>Não há dados disponíveis.</Message>
      </>
    </Container>
  );
}
