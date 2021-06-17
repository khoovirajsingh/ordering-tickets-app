import {Request, Response, NextFunction} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
    if (err instanceof RequestValidationError) {
        const formatterErrors = err.errors.map(error => {
           return { message: error.msg, field: error.param };
        });
        return res.status(400).send({ errors: formatterErrors });
    }
    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send({ errors: err.reason });
    }
    res.status(400).send({
        errors: [{ message: 'Something went wrong'}]
    });
};