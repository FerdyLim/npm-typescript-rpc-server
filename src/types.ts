export interface ApiConfig {
    port: number;
    requestCallback: RequestCallback;
}

export type RequestCallback = (request: RpcRequestModel) => Promise<RpcResponseModel>

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