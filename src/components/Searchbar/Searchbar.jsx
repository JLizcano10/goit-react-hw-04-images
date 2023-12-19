import { Component } from 'react';
import {
  Searchcomponent,
  SearchForm,
  SearchFormButtonLabel,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export default class Searchbar extends Component {
  state = {
    keyWord: '',
  };

  handleSearchChange = event => {
    this.setState({ keyWord: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.keyWord.trim() === '') {
      alert('Enter a search word.');
      return;
    }

    this.props.onSubmit({ ...this.state });
    this.setState({ keyWord: '' });
  };

  render() {
    return (
      <Searchcomponent>
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            <SearchFormButtonLabel className="button-label">
              Search
            </SearchFormButtonLabel>
            <FaSearch width="48" height="48" />
          </SearchFormButton>
          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="keyWord"
            value={this.state.keyWord}
            onChange={this.handleSearchChange}
          />
        </SearchForm>
      </Searchcomponent>
    );
  }
}
