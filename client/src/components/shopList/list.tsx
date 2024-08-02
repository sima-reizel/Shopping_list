import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useProd } from '../../hooks/useProduct';
import { useCategory } from '../../hooks/useCategory';
import { Product, fetchAllProd } from '../product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import '../homePage.css';

interface CategoryItems {
  nameCategory: string;
  items: Product[];
  totalQty: number;
}

export const Tabs = () => {
  const [value, setValue] = useState<string>('1');
  const categories = useCategory();
  const [productsByCategory, setProductsByCategory] = useState<CategoryItems[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { prodArr } = useSelector((state: RootState) => state.products);
  const { isOrderAdded } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchAllProd());
  }, [dispatch, isOrderAdded.status]);

  useEffect(() => {
    const categorizeProducts = (products: Product[]) => {
      const categoryMap: { [key: string]: CategoryItems } = {};

      products.forEach(product => {
        if (!categoryMap[product.category]) {
          categoryMap[product.category] = {
            nameCategory: product.category,
            items: [],
            totalQty: 0,
          };
        }
        categoryMap[product.category].items.push(product);
        categoryMap[product.category].totalQty += product.cnt || 1;
      });

      setProductsByCategory(Object.values(categoryMap));
    };

    categorizeProducts(prodArr);
  }, [prodArr]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', paddingTop: '3%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="product tabs">
            {categories.map((category, index) => {
              const categoryData = productsByCategory.find(c => c.nameCategory === category.name);
              return (
                <Tab
                  label={`${category.name} (${categoryData?.totalQty || 0})`}
                  value={category.name}
                  key={index}
                />
              );
            })}
          </TabList>
        </Box>
        {categories.map((category, index) => {
          const categoryData = productsByCategory.find(c => c.nameCategory === category.name);
          return (
            <TabPanel value={category.name} key={index}>
              {categoryData && categoryData.items.length ? (
                categoryData.items.map((item, idx) => (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
                    key={idx}
                  >
                    <div className='div'>{item.name}</div>
                    <div>|</div>
                    <div className='div'>{item.cnt || 0} כמות</div>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                >
                  אין פריטים בקטגוריה זו
                </Box>
              )}
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
};
