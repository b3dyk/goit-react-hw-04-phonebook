import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, onSearch }) => {
  return (
    <input
      className={css.input}
      type="text"
      name="search"
      placeholder="Search by name"
      value={filter}
      onChange={onSearch}
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
