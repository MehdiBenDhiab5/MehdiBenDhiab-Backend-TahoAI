import { AppError } from '../../middleware/errorHandler'
import productRepository from './product.repository'
import { Product } from './product.types'
import { GetProductsQueryDTO } from './validators/getProductsValidator'

const getAllProducts = (query: GetProductsQueryDTO): Product[] => {
    return productRepository.findAll(query)
}

const getProductsByTitle = (title: string): Product[] => {
    return productRepository.findByTitle(title)
}

const getProductById = (productId: number): Product | undefined => {
    return productRepository.findById(productId)
}

const saveProduct = (newProduct: Product): Product => {
    return productRepository.save(newProduct)
}

const updateProduct = (newProduct: Product): Product => {
    const productExists = productRepository.findById(newProduct.id)
    if (!productExists) {
        throw new AppError(400, "product doesn't exist")
    }
    return productRepository.update(newProduct)
}

const deleteProductById = (id: number) => {
    productRepository.deleteById(id)
}

export default {
    getAllProducts,
    getProductsByTitle,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProductById,
}
