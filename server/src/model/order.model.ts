import mongoose, { Document, Schema } from 'mongoose'

interface IOrderItem {
    name: string
    cnt: number,
    category: string
}

interface IOrder extends Document{
    items: IOrderItem[]
    total: number
}

const OrderItemSchema = new Schema<IOrderItem>({
    name: { type: String, required: true },
    cnt: { type: Number, required: true },
    category: { type: String, required: true }
})

const OrderSchema = new Schema<IOrder>({
    items: [OrderItemSchema],
    total: { type: Number, required: false }
})

const Order = mongoose.model<IOrder>('Order', OrderSchema)

Order.createCollection().then(collection => {
    console.log(`collection ${collection.collectionName} is created`)
})

export default Order
