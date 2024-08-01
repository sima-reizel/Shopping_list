import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState, AppDispatch }  from '../app/store'
import { fetchAllProd, addProd } from '../components/product/productSlice'

interface Product {
    name: string
    category: string
  }

export const useProd = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { isProdAdded, prodArr } = useSelector((state:RootState) => state.products)

    useEffect(() => {
      dispatch(fetchAllProd())
    }, [isProdAdded])

    const addProduct = (prod: Product) => {
      dispatch(addProd(prod))
    }

    return {
      isProdAdded,
      prodArr,
      addProduct,
    }
}