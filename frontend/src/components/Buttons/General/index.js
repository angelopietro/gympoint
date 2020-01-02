import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function General({ color, onClick, children }) {
  return (
    <Button color={color} onClick={onClick} type="button">
      {children}
    </Button>
  );
}

General.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

General.defaultProps = {
  color: 'primary',
  onClick() {},
};
