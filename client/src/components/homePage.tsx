import AddProduct from './product/addProduct'
import { Order } from './order/order'
import {Tabs} from './shopList/list'
import'./homePage.css'

export const HomePage = () => {
  return (
    <div>
        <h1 className='title'>רשימת קניות</h1>
        <AddProduct/>
        <Order/>
        <h2 className='title'>יש לאסוף מוצרים אלה במחלקות המתאמות</h2>
        <Tabs/>
    </div>
  )
}