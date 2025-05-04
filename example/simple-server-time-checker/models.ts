export namespace RpcObjects {
    export enum Methods {
        alive = "check-alive",
        time = "get-time",
        auth = "authorise",
    }

    export interface ResponseDataAlive {
        success: true;
    }

    export interface ResponseDataTime {
        currentTime: Date;
    }

    export interface ResponseDataAuth {
        accessToken: string;
    }

    export type ResponseData = ResponseDataAlive | ResponseDataTime | ResponseDataAuth;

    export interface RequestDataAuth {
        authKey: string;
    }
}