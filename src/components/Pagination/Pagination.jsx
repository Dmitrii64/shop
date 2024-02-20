import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setPage} from "../../redux/slices/filterSlice";
import classNames from "classnames";
import styles from './Pagination.module.scss';

const Pagination = () => {
  const currentPage = useSelector(state => state.filterSlice.currentPage);
  const dispatch = useDispatch();
  //Api не позволяет получить общее кол-во товаров, чтобы определить число страниц
  let pages = [1, 2, 3];

  return (
    <ul className={styles.List}>
      {pages.map(page => (
        <li onClick={() => dispatch(setPage(page))} key={page}
            className={classNames(styles.Item, currentPage === page && styles.Item_Active)}>{page}</li>
      ))}
    </ul>
  );
};

export default Pagination;