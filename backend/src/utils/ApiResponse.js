class ApiResponse {
    constructor(
        stautscode,
         data,
        message='success',
    ){
       this.stautscode=stautscode,
        this.data=data,
       this.message=message,
       this.success=stautscode < 400
    }
}

export{ApiResponse}