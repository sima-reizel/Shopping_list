import { Request, Response } from 'express'
import Product from '../model/product.model'

// Utility function to handle errors
const handleError = (res: Response, error: any, message: string) => {
  console.error(message, error);
  res.status(error.name === 'ValidationError' ? 400 : 500).json({ message: error.message || 'Internal Server Error' })
}

// Fetch all products
export const get = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    handleError(res, error, 'Error fetching products:')
  }
}

// Add or update a product
export const post = async (req: Request, res: Response) => {
  try {
    const { name, category, ...rest } = req.body

    // Find product by name and category
    let product = await Product.findOne({ name, category })

    // Update existing product or create a new one
    if (product) {
      product.cnt += 1
      Object.assign(product, rest)
    } else {
      product = new Product({ name, cnt: 1, category, ...rest })
    }

    await product.save()
    res.status(200).json(product)
  } catch (error) {
    handleError(res, error, 'Error adding or updating product:')
  }
}