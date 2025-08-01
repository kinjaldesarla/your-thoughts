class ApiError extends Error{
    constructor(
        stautscode,
        message="something went wrong",
        errors=[],
        stack=''
    ){
        super(message),
        this.stautscode=stautscode,
        this.errors=errors,
        this.success=false,
        this.message=message,
        this.data=null

        if(stack){
         this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}