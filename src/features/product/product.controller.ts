import express, { NextFunction, Request, Response } from 'express'
import productService from './product.service'
import { Product } from './product.types'
import { AppError } from '../../middleware/errorHandler'
import { saveProductValidator } from './validators/saveProductValidator'
import { updateProductValidator } from './validators/updateProductValidator'
import {
    GetProductsQueryDTO,
    getProductsValidator,
} from './validators/getProductsValidator'
import { plainToInstance } from 'class-transformer'

const productController = express.Router()

productController.get(
    '/',
    getProductsValidator,
    (request: Request, response: Response<Product[]>) => {
        const query = plainToInstance(GetProductsQueryDTO, request.query)
        return response.json(productService.getAllProducts(query))
    }
)

productController.get(
    '/search',
    (request: Request, response: Response<Product[]>) => {
        const title = request.query.q
        if (!title || typeof title !== 'string') {
            throw new AppError(400, 'bad request')
        }
        return response.json(productService.getProductsByTitle(title))
    }
)

productController.get(
    '/:id',
    (request: Request<{ id: string }>, response: Response<Product>) => {
        const id = parseInt(request.params.id)
        const product = productService.getProductById(id)
        if (!product) {
            throw new AppError(400, 'product not found')
        }
        return response.json(product)
    }
)

productController.post(
    '/',
    saveProductValidator,
    (request: Request, response: Response<Product>, next: NextFunction) => {
        const newProduct = request.body
        const savedProduct = productService.saveProduct(newProduct)
        response.json(savedProduct)
    }
)

productController.put(
    '/',
    updateProductValidator,
    (request: Request, response: Response<Product>) => {
        const newProduct = request.body
        const updatedProduct = productService.updateProduct(newProduct)
        response.json(updatedProduct)
    }
)

productController.delete('/:id', (request: Request, response: Response) => {
    const id = parseInt(request.params.id)
    productService.deleteProductById(id)
    return response.status(200).send()
})

productController.get(
    '/categories/',
    (request: Request, response: Response) => {
        //TODO
    }
)

productController.get(
    '/category-list/',
    (request: Request, response: Response) => {
        //TODO
    }
)

export default productController
