

export interface ApiResponse <T>{
    succeded: boolean;
    message: string | null;
    result: T;
}
