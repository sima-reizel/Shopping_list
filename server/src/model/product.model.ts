import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
    name: string
    cnt: number
    category: string
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    cnt: { type: Number, required: true, default: 1},
    category: { type: String, required: true}
})

const Product = mongoose.model<IProduct>('Product', ProductSchema)

Product.createCollection().then(collection => {
    console.log(`collection ${collection.collectionName} is created`)
})

export default Product
