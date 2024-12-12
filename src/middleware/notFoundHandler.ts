import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AppError } from './errorHandler'

const notFoundHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    throw new AppError(404, 'ROUTE_NOT_FOUND')
}

export default notFoundHandler
