import { StatusCodes } from "http-status-codes";

class Unauthenticated extends Error {
    statusCode: number;
    
    constructor(message: string) {
        super(message);
        this.name = 'Unauthenticated';
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default Unauthenticated;
