import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setSort} from "../../redux/slices/filterSlice";
import {sorts} from "../../data/sorts";
import classNames from "classnames";
import styles from './Sort.module.scss';

const Sort = () => {
  const selectedSort = useSelector(state => state.filterSlice.selectedSort);
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const sortRef = useRef();

  let order = selectedSort.order ? 'возрастанию' : 'убыванию';

  const selectSort = (sort) => {
    dispatch(setSort({...sort, order: selectedSort.order}));
    setIsPopupVisible(false);
  }

  const changeOrder = () => {
    dispatch(setSort({...selectedSort, order: !selectedSort.order}));
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsPopupVisible(false);
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [])

  return (
    <div className={styles.Sort} ref={sortRef}>
      <span className={styles.Text}>Сортировка по:</span>
      <span onClick={() => setIsPopupVisible(!isPopupVisible)} className={styles.TextValue}>{selectedSort.name}</span>
      <p onClick={() => changeOrder()} className={styles.TextValue}>{order}</p>
      {isPopupVisible && <ul className={styles.List}>
        {sorts.map(sort => (
          <li onClick={() => selectSort(sort)} key={sort.property}
              className={classNames(styles.Item, selectedSort.name === sort.name && styles.Item_Active)}>{sort.name}</li>
        ))}
      </ul>}
    </div>
  );
};

export default Sort;