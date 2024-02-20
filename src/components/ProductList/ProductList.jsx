import React from 'react';
import Product from "../Product/Product";
import styles from './ProductList.module.scss';
import Skeleton from "../Skeleton/Skeleton";

const ProductList = ({products, isLoading}) => {
  const skeletons = [...new Array(4)];

  return (
    <ul className={styles.List}>
      {isLoading
        ? skeletons.map((_, index) => <Skeleton key={index}/>)
        : products.map(product => (
          <Product product={product} key={product.id}/>
        ))}
    </ul>
  );
};

export default ProductList;