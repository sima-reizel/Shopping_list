import { Request, Response } from 'express'
import Category from '../model/category.model'

// Utility function to handle errors
const handleError = (res: Response, error: any, message: string) => {
  console.error(message, error)
  res.status(500).json({ message: error.message || 'Internal Server Error' })
};

// Get all categories
export const get = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    handleError(res, error, 'Error fetching categories:')
  }
}
