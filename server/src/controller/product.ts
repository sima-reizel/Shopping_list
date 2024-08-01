import { Router, Request, Response } from 'express'
import Product from '../model/product.model'

const router = Router()

export const get = async (req: Request, res: Response) => {
    try {
        const product = await Product.find()
        res.status(200).json(product)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const post = async (req: Request, res: Response) => {
    console.info(req.body)
    try {
        const { name: prodName, ...rest } = req.body
        let product = await Product.findOne({ name: prodName })

        if (product) {
            product.set({
                cnt: (product.cnt || 0) + 1,
                ...rest
            })
            await product.save()
            res.status(200).json(product)
        } else {
            product = new Product({ name: prodName, cnt: 1, ...rest })
            await product.save()
            res.status(200).json(product)
        }
        
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            res.status(400).json({ message: 'Book with the same name already exists.' })
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message })
        } else {
            console.error('Error adding new book:', error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
