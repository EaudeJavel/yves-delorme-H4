import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Component
import FilterBar from './FilterBar';
import ListArticles from './ListArticles';
import ListFilters from './ListFilters';

// Styles
import styles from './Menu.module.scss';


const Menu = (props) => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [itemsShown, setItemsShown] = useState();
  const [filtered, setFiltered] = useState();
  const [listFilter, setListFilter] = useState('');
  const [numberFilter, setNumberFilter] = useState(0);


  useEffect(() => {
    setIsFilterActive(false);
    resetFilter();
  }, [props.title]);

  useEffect(() => {
    setFiltered(itemsShown);
  }, [itemsShown]);


  return (
    <div>
      <div className={styles.close} onClick={() => props.resetMenu()}>
        <img src="/static/close_green.svg" alt="Fermer le menu" className={styles.closeMenu} />
      </div>
      <div className={styles.menu}>
        <div className={styles.menuContainer}>
          <div className={props.typeItem === 'bigPillow' ? (`${styles.menuHeader} ${styles.menuHeaderPillow}`) : styles.menuHeader}>
            <h1 className={styles.title}>{props.title}</h1>
            <FilterBar onFilterActive={onFilterActive} isFilterActive={isFilterActive} handleSearchChange={handleSearchChange} numberFilter={numberFilter} resetFilter={resetFilter} />
          </div>
          {isFilterActive
            ? <ListFilters handleFilterChange={handleFilterChange} listFilter={listFilter} />
            : <ListArticles typeItem={props.typeItem} onItemChange={props.onItemChange} activeArticle={props.activeBed} itemsfunction={itemsfunction} filtered={filtered} listFilter={listFilter} />}
        </div>
      </div>
    </div>

  );

  function resetFilter() {
    setListFilter('');
    setNumberFilter(0);
  }

  function handleFilterChange(filter) {
    if (listFilter.includes(filter)) {
      setListFilter(listFilter.replace(filter, ''));
      setNumberFilter(numberFilter - 1);
    } else {
      setListFilter(listFilter + filter);
      setNumberFilter(numberFilter + 1);
    }
  }

  function onFilterActive() {
    setIsFilterActive(!isFilterActive);
  }

  function handleSearchChange(e) {
    let currentList = [];

    let newList = [];
    // If the search bar isn't empty
    if (e.target.value !== '') {
      currentList = itemsShown;
      newList = currentList.filter((item) => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = itemsShown;
    }
    setFiltered(newList);
  }

  function itemsfunction(items) {
    setItemsShown(items);
  }
};


Menu.propTypes = {
  title: PropTypes.string.isRequired,
  typeItem: PropTypes.string.isRequired,
  onItemChange: PropTypes.func.isRequired,
};

export default Menu;
