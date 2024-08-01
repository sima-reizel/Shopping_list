import mongoose from 'mongoose'
import { initializeCategories } from '../utils/initializeCategories'

mongoose.Promise = global.Promise

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shoppingList')
        console.info('Connected to MongoDB')
        initializeCategories()
    } catch (err) {
        console.info('Failed to connect to MongoDB', err)
        process.exit(1) // Exit process with failure
    }
}

export default connectDB
