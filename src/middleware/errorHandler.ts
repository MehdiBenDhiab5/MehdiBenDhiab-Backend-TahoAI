import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export class AppError extends Error {
    public status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    }
}

const errorHandler: ErrorRequestHandler = (
    error: AppError,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.status || 500
    const message = error.message || 'INTERNAL_SERVER_ERROR'

    response.status(status).json({
        message,
    })
}

export default errorHandler
