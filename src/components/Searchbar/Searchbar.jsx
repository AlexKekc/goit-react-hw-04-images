import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Searchbox,
  SearchForm,
  SubmitButton,
  SubmitButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error(`Please enter your query`);
      return;
    }
    onSubmit({ query });
    setQuery('');
  };

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  return (
    <Searchbox>
      <SearchForm onSubmit={handleSubmit}>
        <SubmitButton type="submit">
          <BsSearch />
          <SubmitButtonLabel>Search</SubmitButtonLabel>
        </SubmitButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          value={query}
          onChange={handleQueryChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
      <Toaster position="top-right" reverseOrder={false} />
    </Searchbox>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
