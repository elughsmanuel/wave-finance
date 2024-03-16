import { StatusCodes } from "http-status-codes";

class UnprocessableEntity extends Error {
    statusCode: number;
    
    constructor(message: string) {
        super(message);
        this.name = 'UnprocessableEntity';
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    }
}

export default UnprocessableEntity;
