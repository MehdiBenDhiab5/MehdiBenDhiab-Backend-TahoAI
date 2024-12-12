import { NextFunction, Request, Response } from 'express'
import {
    AvailabilityStatus,
    ProductDimensions,
    ProductMeta,
    ProductReview,
} from '../product.types'
import {
    ArrayMinSize,
    IsArray,
    IsIn,
    IsNumber,
    IsPositive,
    IsString,
    IsUrl,
    Max,
    MaxLength,
    Min,
    MinLength,
    validate,
    ValidationError,
} from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { AppError } from '../../../middleware/errorHandler'

export class newProductDTO {
    @IsNumber()
    @IsPositive()
    id: number

    @IsString()
    @MinLength(3)
    title!: string

    @IsString()
    @MinLength(10)
    description!: string

    @IsString()
    category!: string

    @IsNumber()
    @IsPositive()
    price!: number

    @IsNumber()
    @Min(0)
    @Max(100)
    discountPercentage!: number

    @IsNumber()
    @Min(0)
    @Max(5)
    rating!: number

    @IsNumber()
    @IsPositive()
    stock!: number

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    tags!: string[]

    @IsString()
    brand!: string

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    sku!: string

    @IsNumber()
    @IsPositive()
    weight!: number

    dimensions!: ProductDimensions

    @IsString()
    warrantyInformation!: string

    @IsString()
    shippingInformation!: string

    @IsIn(Object.values(AvailabilityStatus))
    availabilityStatus!: AvailabilityStatus

    @IsArray()
    reviews!: ProductReview[]

    @IsString()
    returnPolicy!: string

    @IsNumber()
    @Min(1)
    minimumOrderQuantity!: number

    meta!: ProductMeta

    @IsUrl()
    thumbnail!: string

    @IsArray()
    @IsUrl({}, { each: true })
    @ArrayMinSize(1)
    images!: string[]
}

export const updateProductValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const instance = plainToInstance(newProductDTO, req.body)
    const errors: ValidationError[] = await validate(instance)
    if (errors.length > 0) {
        next(new AppError(400, 'bad request'))
    }
    next()
}
