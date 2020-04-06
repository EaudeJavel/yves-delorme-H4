
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.scss';

const Filters = (props) => {
  const [isFilterActive, setIsFilterActive] = useState('');
  const filters = props.arrayFilters;

  const listFilters = filters.map((filter) => (
    <button type="button" className={isFilterActive.includes(filter) ? (styles.itemActive) : (styles.itemNotActive)} onClick={() => activeFilter(filter)}>
      {filter}
    </button>
  ));

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.items}>
        {listFilters}
      </div>
    </div>
  );

  function activeFilter(filter) {
    if (isFilterActive.includes(filter)) {
      setIsFilterActive(isFilterActive.replace(filter, ''));
    } else {
      setIsFilterActive(isFilterActive + filter);
    }
  }
};


Filters.propTypes = {
  title: PropTypes.string.isRequired,
  arrayFilters: PropTypes.array.isRequired,
};

export default Filters;