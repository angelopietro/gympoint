import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';

export default function Currency({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <CurrencyInput
        name={fieldName}
        onChangeEvent={e => setSelected(e.target.value)}
        value={selected}
        decimalSeparator=","
        thousandSeparator="."
        precision={2}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

Currency.propTypes = {
  name: PropTypes.string.isRequired,
};
