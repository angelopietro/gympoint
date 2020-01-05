import React, { useRef, useEffect, useState } from 'react';
import Date, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import pt from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  registerLocale('pt', pt);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <Date
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};
