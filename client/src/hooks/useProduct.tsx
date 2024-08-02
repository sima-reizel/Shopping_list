import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { RootState, AppDispatch } from '../app/store';
import { fetchAllProd, addProd } from '../components/product/productSlice';

interface Product {
  name: string;
  category: string;
}

export const useProd = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isProdAdded, prodArr } = useSelector((state: RootState) => state.products);

  // Fetch products on component mount or when `isProdAdded` changes
  useEffect(() => {
    dispatch(fetchAllProd());
  }, [dispatch, isProdAdded]);

  // Use useCallback to memoize the function and prevent unnecessary re-renders
  const addProduct = useCallback((prod: Product) => {
    dispatch(addProd(prod));
  }, [dispatch]);

  return {
    isProdAdded,
    prodArr,
    addProduct,
  };
}