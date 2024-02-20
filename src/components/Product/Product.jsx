import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {addProduct} from "../../redux/slices/cartSlice";
import classNames from "classnames";
import styles from './Product.module.scss';

const Product = ({product}) => {
  const {id, imageURL, title, colors, sizes, price, category} = product;

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const dispatch = useDispatch();
  const productInCart = useSelector(state => state.cartSlice.products.find(obj => obj.id === id))
  const productCount = productInCart ? productInCart.count : 0;
  const addProductToCart = () => {
    const product = {
      id,
      imageURL,
      title,
      price,
      color: activeColor,
      size: activeSize
    };
    dispatch(addProduct(product))
  }

  return (
    <li className={styles.Product}>
      <div className={styles.ImgWrapper}>
        <img src={imageURL} alt=""
             className={styles.Img}/>
      </div>
      <h2 className={styles.Name}>{title}</h2>
      <div className={styles.Options}>
        <ul className={styles.Colors}>
          {colors.map(color => (
            <li onClick={() => setActiveColor(color)} key={color}
                className={classNames(styles.Color, styles[`Color_${color}`], color === activeColor && styles.Color_Active)}></li>
          ))}
        </ul>
        <ul className={styles.Sizes}>
          {sizes.map(size => (
            <li onClick={() => setActiveSize(size)} key={size}
                className={classNames(styles.Size, size === activeSize && styles.Size_Active)}>{size}</li>
          ))}
        </ul>
      </div>
      <div className={styles.Add}>
        <p className={styles.Price}>{price} ₽</p>
        <button onClick={addProductToCart} className={styles.Button}>В корзину
          {productCount > 0 && <span className={styles.Quantity}>{productCount}</span>}
        </button>
      </div>
    </li>
  );
};

export default Product;