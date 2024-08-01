import { Router, Request, Response } from 'express'
import Order from '../model/order.model'
import { info } from 'console'

const router = Router()

export const get = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const post = async (req: Request, res: Response) => {
    try {
        const newOrder = new Order(req.body)
        await newOrder.save()
        res.status(200).json(newOrder)
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
