import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../../redux/slices/filterSlice";
import classNames from "classnames";
import {categories} from "../../data/categories";
import styles from './Categories.module.scss';

const Categories = () => {
  const activeCategory = useSelector(state => state.filterSlice.activeCategory);
  const dispatch = useDispatch();

  return (
    <ul className={styles.List}>
      {categories.map(category => (
        <li onClick={() => dispatch(setCategory(category.value))} key={category.id}
            className={classNames(styles.Item, category.value === activeCategory && styles.Item_Active)}>{category.value}</li>
      ))}
    </ul>
  );
};

export default Categories;