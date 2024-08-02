import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../app/store';
import { fetchAllCategory } from '../components/category/categorySlice';

export const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesArr } = useSelector((state: RootState) => state.categories);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  return categoriesArr;
}