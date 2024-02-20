import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import qs from 'qs';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setFilters} from "../redux/slices/filterSlice";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import ProductList from "../components/ProductList/ProductList";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {activeCategory, selectedSort, currentPage} = useSelector(state => state.filterSlice);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = () => {
    setIsLoading(true);
    let category = activeCategory !== 'Все' ? activeCategory : '';
    let order = selectedSort.order ? 'asc' : 'desc'
    axios.get(`https://65c22b1df7e6ea59682ac573.mockapi.io/products?page=${currentPage}&limit=${4}&category=${category}&sortBy=${selectedSort.property}&order=${order}`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params))
      isSearch.current = true;
    }
  }, [])

  useEffect(() => {
    if (!isSearch.current) {
      fetchProducts();
    }
    isSearch.current = false;
  }, [activeCategory, selectedSort, currentPage])

  useEffect(() => {
    if (isMounted) {
      const queryStr = qs.stringify({
        activeCategory,
        sort: selectedSort.property,
        order: selectedSort.order,
        currentPage
      });

      navigate(`?${queryStr}`)
    }
    isMounted.current = true;
  }, [activeCategory, selectedSort, currentPage])

  return (
    <>
      <Header isCart={false}/>
      <div className="Filters">
        <Categories/>
        <Sort/>
      </div>
      <ProductList products={products} isLoading={isLoading}/>
      <Pagination/>
    </>
  );
};

export default Home;