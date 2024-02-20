import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, decrementProduct, removeProduct, clearProducts} from "../../redux/slices/cartSlice";
import classNames from "classnames";
import styles from './FullCart.module.scss'

const FullCart = () => {

  const dispatch = useDispatch();
  const {products, totalPrice} = useSelector(state => state.cartSlice);
  const totalCount = products.reduce((sum, item) => sum + item.count, 0);

  const onClickPlus = (id) => {
    dispatch(addProduct({id}))
  }

  const onClickMinus = (id, count) => {
    if (count > 1) {
      dispatch(decrementProduct({id}))
    } else {
      dispatch(removeProduct({id}))
    }
  }

  const onClickRemove = (id) => {
    dispatch(removeProduct({id}))
  }

  const onClickClear = () => {
    dispatch(clearProducts())
  }

  return (
    <div className={styles.Cart}>
      <div className={styles.Header}>
        <h1 className={styles.Title}>Корзина</h1>
        <button onClick={onClickClear} className={styles.Clear} type={"button"}>Очистить корзину</button>
      </div>
      <ul className={styles.Products}>
        {products.map(product => (
          <li key={product.id} className={styles.Product}>
            <div className={styles.Product__ImgWrapper}>
              <img className={styles.Product__Img}
                   src={product.imageURL} alt=""/>
            </div>
            <div className={styles.Product__Info}>
              <h2 className={styles.Product__Title}>{product.title}</h2>
              <p className={styles.Product__Options}>{product.size}, {product.color}</p>
            </div>
            <div className={styles.Product__Amount}>
              <button onClick={() => onClickMinus(product.id, product.count)} className={styles.Product__Button}>-
              </button>
              <span className={styles.Amount}>{product.count}</span>
              <button onClick={() => onClickPlus(product.id)} className={styles.Product__Button}>+</button>
            </div>
            <p className={styles.Product__Price}>{product.price}</p>
            <button onClick={() => onClickRemove(product.id)} className={styles.Product__Button}>x</button>
          </li>
        ))}
      </ul>
      <div className={styles.Total}>
        <p className={styles.Total__Amount}>Всего товаров: <span>{totalCount} шт.</span></p>
        <p className={styles.Total__Price}>Сумма заказа: <span>{totalPrice} ₽</span></p>
      </div>
      <div className={styles.Buttons}>
        <Link to={'/'} className={classNames(styles.Button, styles.Button_Close)}>Вернуться назад</Link>
        <button className={styles.Button}>Оплатить сейчас</button>
      </div>
    </div>
  );
};

export default FullCart;