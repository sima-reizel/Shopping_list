import mongoose, { Document, Schema } from 'mongoose'

interface IOrderItem {
    productName: string
    qty: number,
    category: string
}

interface IOrder extends Document{
    items: IOrderItem[]
    total: number
}

const OrderItemSchema = new Schema<IOrderItem>({
    productName: { type: String, required: true },
    qty: { type: Number, required: true },
    category: { type: String, required: true }
})

const OrderSchema = new Schema<IOrder>({
    items: [OrderItemSchema],
    total: { type: Number, required: true }
})

const Order = mongoose.model<IOrder>('Order', OrderSchema)

Order.createCollection().then(collection => {
    console.log(`collection ${collection.collectionName} is created`)
})

export default Order
