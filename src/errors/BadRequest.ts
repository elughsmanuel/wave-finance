import { StatusCodes } from "http-status-codes";

class BadRequest extends Error {
    statusCode: number;
    
    constructor(message: string) {
        super(message);
        this.name = 'BadRequest';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequest;
