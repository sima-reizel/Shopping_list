import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import { useProd } from '../../hooks/useProduct'
import { useCategory } from '../../hooks/useCategory'
import './addProduct.css'
import { useEffect, useRef, useState } from 'react'
// import { addProd } from './productSlice'
import {fetchAllCategory} from '../category/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch }  from '../../app/store'
import { fetchAllProd, addProd, ProductState} from './productSlice'


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 20,
    padding: '10px 10px 10px 60px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function AddProduct() {
  const { addProduct, isProdAdded } = useProd()
  const categoriesArr  = useCategory()
  const [category, setCategory] = useState('')
  const [ totalQty, setTotalQty ] = useState(0)
  const prodNameRef = useRef<HTMLSelectElement>(null)
  const prodCategoryRef = useRef<HTMLSelectElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { prodArr } = useSelector((state: RootState) => state.products)
  const handleChange = (event: { target: { value: string } }) => {
    setCategory(event.target.value)
  }
  const submitProduct = () => {
    addProduct({name: prodNameRef.current.value, category: prodCategoryRef.current.value})
  }

  useEffect(() => {
    dispatch(fetchAllProd())
  }, [dispatch])

  useEffect(() => {
    setTotalQty(prodArr.length || 0)
  }, [prodArr])

  return (
    <div className='stack'>
      <div>סה"כ: {totalQty}</div>
      <Button className='form-control' onClick={()=>{submitProduct()}} variant="text">הוסף מוצר</Button>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native">קטגוריה</InputLabel>
        <NativeSelect
          id = "demo-customized-select-native"
          value = {category}
          onChange = {handleChange}
          inputRef = {prodCategoryRef}
          input = {<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          { categoriesArr.map((item, index) =>(
             <option key={index} value={item.name}>{item.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel  htmlFor="demo-customized-textbox">שם המוצר</InputLabel>
        <BootstrapInput inputRef = { prodNameRef } id="demo-customized-textbox" />
      </FormControl>
    </div>
  )
}