export interface ApiResponse <T>{
    succeded: boolean;
    message: string ;
    result: T;
}
