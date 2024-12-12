export type ProductReview = {
    rating: number
    comment: string
    date: Date
    reviewerName: string
    reviewerEmail: string
}

export type ProductMeta = {
    createdAt: Date
    updatedAt: Date
    barcode: string
    qrCode: string
}

export type ProductDimensions = {
    width: number
    height: number
    depth: number
}

export enum AvailabilityStatus {
    IN_STOCK,
    OUT_OF_STOCK,
}

export type Product = {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: ProductDimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: AvailabilityStatus
    reviews: ProductReview[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: ProductMeta
    thumbnail: string
    images: string[]
}
