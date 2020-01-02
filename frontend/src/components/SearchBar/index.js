import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdSearch } from 'react-icons/md';
import { SearchInput } from './styles';

export default function SearchBar({ ...rest }) {
  return (
    <SearchInput>
      <button type="submit">
        <MdSearch />
      </button>
      <Input autoComplete="off" type="search" name="search" {...rest} />
    </SearchInput>
  );
}
