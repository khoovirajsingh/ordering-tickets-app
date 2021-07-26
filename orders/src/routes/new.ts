import mongoose from "mongoose";
import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {requireAuth, validateRequest} from '@cygnetops/common';

const router = express.Router();

router.post('api/orders',
    requireAuth,
    [
        body('titleId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('TitleId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        res.send({});
    });

export {router as newOrderRouter};