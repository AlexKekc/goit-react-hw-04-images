import React, { Component } from 'react';
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

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    const { query } = this.state;

    event.preventDefault();

    if (query.trim() === '') {
      toast.error(`Please enter your query`);
      return;
    }
    this.props.onSubmit({ query });
    this.setState({ query: '' });
  };

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <Searchbox>
        <SearchForm onSubmit={this.handleSubmit}>
          <SubmitButton type="submit">
            <BsSearch />
            <SubmitButtonLabel>Search</SubmitButtonLabel>
          </SubmitButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            value={this.state.query}
            onChange={this.handleQueryChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
        <Toaster position="top-right" reverseOrder={false} />
      </Searchbox>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
