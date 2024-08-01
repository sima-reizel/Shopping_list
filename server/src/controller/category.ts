import { Router, Request, Response } from 'express';
import Category from '../model/category.model'

const router = Router()

export const get = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}