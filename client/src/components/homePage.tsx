import AddProduct from './product/addProduct'
import Tabs from './shopList/list'
import'./homePage.css'

export const HomePage = () => {
  return (
    <div>
        <h1 className='title'>רשימת קניות</h1>
        <AddProduct/>
        <Tabs/>
    </div>
  )
}