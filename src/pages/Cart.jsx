import React from 'react';
import Header from "../components/Header/Header";
import FullCart from "../components/FullCart/FullCart";

const Cart = () => {
  return (
    <>
      <Header isCart={true}/>
      <FullCart/>
    </>
  );
};

export default Cart;