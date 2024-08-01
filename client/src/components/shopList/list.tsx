import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../product/addProduct.css';
import { useProd } from '../../hooks/useProduct';
import { useCategory } from '../../hooks/useCategory';
import { Product, fetchAllProd } from '../product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import '../homePage.css'

// Interface to track items with their quantities
interface CategoryItems {
  [key: string]: Record<string, number>;  // { categoryName: { productName: quantity } }
}

// Interface to track total quantities for each category
interface CategoryQuantities {
  [key: string]: number;  // { categoryName: totalQuantity }
}

export default function Tabs() {
  const { addProduct } = useProd();
  const [value, setValue] = useState<string>('1');
  const categories = useCategory();
  
  // Initialize items state as an empty object
  const [items, setItems] = useState<CategoryItems>({});
  
  // Initialize total quantities state as an empty object
  const [quantities, setQuantities] = useState<CategoryQuantities>({});
  
  const dispatch = useDispatch<AppDispatch>();
  const { prodArr } = useSelector((state: RootState) => state.products);
  
  // Function to categorize items and aggregate quantities
  const itemsByCategory = (item: Product) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      
      // Initialize the category object if it doesn't exist
      if (!updatedItems[item.category]) {
        updatedItems[item.category] = {};
      }
      
      // Add or update the item with its count
      updatedItems[item.category][item.name] = item.cnt;
      
      return updatedItems;
    });

    // Update quantities state
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      
      // Initialize the quantity for the category if it doesn't exist
      if (!updatedQuantities[item.category]) {
        updatedQuantities[item.category] = 0;
      }
      
      // Add the item count to the category total quantity
      updatedQuantities[item.category] = +1
      
      return updatedQuantities;
    });
  };
  
  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchAllProd());
  }, [dispatch]);
  
  // Categorize products when `prodArr` updates
  useEffect(() => {
    prodArr.forEach((prod: Product) => {
      itemsByCategory(prod);
    });
  }, [prodArr]);
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  return (
    <>
      <h2 className='title'>יש לאסוף מוצרים אלה במחלקות המתאמות</h2>
      <Box sx={{ width: '100%', typography: 'body1', paddingTop: '3%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {categories.map((category, index) => (
                <Tab
                  label={`${category.name} (${quantities[category.name] || 0})`} // Display category name and total quantity
                  value={category.name}
                  key={index}
                />
              ))}
            </TabList>
          </Box>
          {categories.map((category, index) => (
            <TabPanel value={category.name} key={index}>
              {items[category.name] && Object.keys(items[category.name]).length ? (
                Object.entries(items[category.name]).map(([itemName, itemQty], idx) => (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }} key={idx}>
                    <div className='div'>{itemName}</div>
                    <div>|</div>
                    <div className='div'>{itemQty} כמות</div>
                  </Box>
                ))
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  אין פריטים בקטגוריה זו
                </Box>
              )}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
}
