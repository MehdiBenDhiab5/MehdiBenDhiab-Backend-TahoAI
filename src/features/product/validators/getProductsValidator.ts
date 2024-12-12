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
    IsInt,
    IsNumber,
    IsOptional,
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

export class GetProductsQueryDTO {
    @IsInt()
    @Min(1)
    @Max(20)
    @IsOptional()
    limit: number

    @IsInt()
    @IsPositive()
    @IsOptional()
    skip: number

    @IsString()
    @IsOptional()
    select: string

    @IsString()
    @IsOptional()
    sortBy: string

    @IsString()
    @IsOptional()
    order: string
}

export const getProductsValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const instance = plainToInstance(GetProductsQueryDTO, req.query)
    const errors: ValidationError[] = await validate(instance)
    if (errors.length > 0) {
        next(new AppError(400, 'bad request'))
    }
    next()
}
