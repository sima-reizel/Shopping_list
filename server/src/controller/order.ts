import { Router, Request, Response } from 'express'
import Order from '../model/order.model'
import Product from '../model/product.model'

export const get = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const post = async (req: Request, res: Response) => {
    try {
        const orderItems = req.body.items
        if( orderItems.length ) {
            const total = calcTotalOrder(orderItems)
            const newOrder = new Order({
                items: orderItems,
                total: total
            })
            await newOrder.save()
            removeAllProducts(Product)
            res.status(200).json(newOrder)
        }
        else {
            res.status(400).json({ message: 'You must select at least one product'})
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message })
        } else {
            console.error('Error adding new order:', error)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

const calcTotalOrder = (orderItems): number =>{
    return orderItems.reduce((sum, item) => sum + item?.cnt, 0);
}

const removeAllProducts = async (collectionName) => {
    try { 
       const result = await collectionName.deleteMany({})
       return result
    }
    catch(e) {
       console.error(`Faild to remove all documents ${collectionName}`, e.error)
    }
}