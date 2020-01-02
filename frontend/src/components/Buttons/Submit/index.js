import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function Submit({ children }) {
  return <Button type="submit">{children}</Button>;
}

Submit.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
