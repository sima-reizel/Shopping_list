import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from './config/db'
import requestLogger from './middleware/requestLogger'
import productRouter from './routes/product'
import categoryRouter from './routes/category'
import orderRouter from './routes/order'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// Connect to MongoDB
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('Api running')
})

app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/order', orderRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})