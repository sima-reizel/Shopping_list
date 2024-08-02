import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addOrder } from './orderSlice';
import { useProd } from '../../hooks/useProduct';
import '../homePage.css';

export const Order = () => {
  const { prodArr } = useProd();
  const dispatch = useDispatch<AppDispatch>();
  const orderStatus = useSelector((state: RootState) => state.orders.isOrderAdded.status);

  const submitOrder = () => {
    if (prodArr.length === 0) {
      alert('No products to order.');
      return;
    }
    dispatch(addOrder({ items: prodArr }));
  };

  return (
    <div className='title button'>
      <Button
        className='form-control'
        onClick={submitOrder}
        variant="text"
        disabled={orderStatus === 'pending'}
      >
        {orderStatus === 'pending' ? 'Processing...' : 'סיים הזמנה'}
      </Button>
    </div>
  );
};