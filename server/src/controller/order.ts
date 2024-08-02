import { Request, Response } from 'express'
import Order from '../model/order.model'
import Product from '../model/product.model'

// Utility function to handle errors
const handleError = (res: Response, error: any, message: string) => {
  console.error(message, error)
  res.status(error.name === 'ValidationError' ? 400 : 500).json({ message: error.message || 'Internal Server Error' })
}

// Calculate the total of the order
const calcTotalOrder = (orderItems: { cnt: number }[]): number => {
  return orderItems.reduce((sum, item) => sum + item.cnt, 0)
}

// Remove all products from the collection
const removeAllProducts = async () => {
  try {
    const result = await Product.deleteMany({})
    return result;
  } catch (error) {
    console.error('Failed to remove all products:', error)
    throw new Error('Failed to remove all products')
  }
}

// Get all orders
export const get = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    handleError(res, error, 'Error fetching orders:')
  }
};

// Add a new order
export const post = async (req: Request, res: Response) => {
  try {
    const { items } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'You must select at least one product' })
    }

    const total = calcTotalOrder(items)
    const newOrder = new Order({ items, total })

    await newOrder.save()
    await removeAllProducts()

    res.status(201).json(newOrder)
  } catch (error) {
    handleError(res, error, 'Error adding new order:')
  }
}
