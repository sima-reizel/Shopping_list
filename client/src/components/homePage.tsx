import AddProduct from './product/addProduct'
import Tabs from './shopList/list'

export const HomePage = () => {
  return (
    <div>
        <h1>רשימת קניות</h1>
        <AddProduct/>
        <Tabs/>
    </div>
  )
}