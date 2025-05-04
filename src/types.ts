import { IncomingHttpHeaders } from "http";

export interface ApiConfig {
    port: number;
    requestCallback: RequestCallback;
}

/**
 * This function is a callback used when RPC receives a request. In this function, you are to add logic to process the body and headers to do what you want to during this RPC call.
 *
 * @param method Consist of the method, which is the name of the method you defined and called on the client.
 * @param data Consist of the data, which is the data structure defined by you from the client.
 * @returns RpcResponseModel consisting of error or data, which will be returned to the client.
 */
export type RequestCallback = (method: string, data: any) => Promise<RpcResponseModel>

/**
 * This function will be called when RPC receives a protected request. In this function you get the token, defined on Authorization: Bearer <token>. This token is defined on the client via the protected method, usually a JWT token. Create a logic to check the token and respond whether the user is authorised to access this method.
 *
 * @param method The method called by the client. Use this to check if the token has the appropriate access to this method.
 * @param token The token passed from the client via the header, usually a JWT token.
 * @returns Boolean of whether authorization has passed.
 */
export type AuthorizationCallback = (method: string, token: string) => Promise<boolean>

export interface RpcRequestModel {
    method: string;
    data: any;
}

export interface RpcResponseModel {
    error: RpcError | null;
    data: any | null;
}

export interface RpcError {
    code: number;
    description: string;
    debug?: any;
}

export interface RpcHeaders {
    [key: string]: string;
}