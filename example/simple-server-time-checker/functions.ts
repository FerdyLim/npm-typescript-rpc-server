import { RpcRequestModel, RpcResponseModel } from "@modulae.systems/rpc-server/dist/types";
import { RpcObjects } from "./models";
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
import { IncomingHttpHeaders } from "http";

dotenv.config();

export function getAuth(body: RpcRequestModel): RpcResponseModel {
    const data = body.data as RpcObjects.RequestDataAuth;
    if (data.authKey == process.env.AUTH_KEY) {
        const response: RpcObjects.ResponseDataAuth = {
            accessToken: jwt.sign(
                { data: "authenticated" },
                process.env.JWT_SECRET ?? "nokey",
                {
                    expiresIn: 5*60, // expires in 5 mins
                }
            )
        }
        return {
            error: null,
            data: response,
        }
    } else {
        return {
            error: {
                code: 403,
                description: "Missing authentication key",
            },
            data: null,
        };
    }
}

export function getAlive(): RpcResponseModel {
    const response: RpcObjects.ResponseDataAlive = {
        success: true,
    }
    return {
        error: null,
        data: response
    }
}

export function getTime(): RpcResponseModel {
    const response: RpcObjects.ResponseDataTime = {
        currentTime: new Date(),
    }
    return {
        error: null,
        data: response,
    }
}