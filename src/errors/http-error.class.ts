export class HTTPError extends Error {
    public statusCode: number;
    public context?: string
    
    constructor(statusCode: number, message: string, context?: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.context = context;
    }
}