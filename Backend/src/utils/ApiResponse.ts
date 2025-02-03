class ApiResponse{
    statusCode: number
    message: string
    data: any
    success: boolean
    constructor(status: number, message: string, data: any, success: boolean){
        this.statusCode = status
        this.message = message
        this.data = data
        this.success = success
    }    
}

export {ApiResponse}