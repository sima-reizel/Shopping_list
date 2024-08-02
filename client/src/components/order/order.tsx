import Button from '@mui/material/Button'
import '../homePage.css'
import { useProd } from '../../hooks/useProduct'
import { RootState, AppDispatch }  from '../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from './orderSlice'


export const Order = () =>{
    const { prodArr } = useProd()
    const dispatch = useDispatch<AppDispatch>()
    // const { prodArr } = useSelector((state: RootState) => state.products)

    const submitOrder = () =>{
        dispatch(addOrder({items: prodArr}))
    }

    return (
        <div className='title button'>
          <Button className = 'form-control' onClick={submitOrder} variant="text">סיים הזמנה </Button>
        </div>
    )
}