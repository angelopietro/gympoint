import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Container } from './styles';

export default function Loading(props) {
  const { color, size } = props;

  return (
    <Container>
      <AiOutlineLoading3Quarters color={color} size={size} />
    </Container>
  );
}

Loading.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
