class ApiError extends Error{
    public statusCode: number;
    public message: string = "Something went wrong";
    public success : boolean = false;
    public errors: any = null;
    constructor(statusCode: number, message: string, stack?: string, errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false
        this.errors = errors
        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};