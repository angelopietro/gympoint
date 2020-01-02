import React from 'react';
import propTypes from 'prop-types';
import { Container, CardBox } from './styles';

export default function Card({ children }) {
  return (
    <Container>
      <CardBox>{children}</CardBox>
    </Container>
  );
}

Card.propTypes = {
  children: propTypes.oneOfType([
    propTypes.element,
    propTypes.arrayOf(propTypes.element),
  ]).isRequired,
};
