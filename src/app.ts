import 'reflect-metadata'
import express, { Request, Response } from 'express'
import { configDotenv } from 'dotenv'
import notFoundHandler from './middleware/notFoundHandler'
import errorHandler from './middleware/errorHandler'
import productController from './features/product/product.controller'

configDotenv()

const PORT = process.env.PORT
if (!PORT) {
    console.log('Could not load port from .env')
    process.exit(1)
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/products/', productController)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})
