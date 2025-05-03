import { IncomingHttpHeaders } from "http";
export interface ApiConfig {
    port: number;
    requestCallback: RequestCallback;
}
export type RequestCallback = (body: RpcRequestModel, headers: IncomingHttpHeaders) => Promise<RpcResponseModel>;
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
