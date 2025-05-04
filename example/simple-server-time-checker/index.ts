import { initRpcWithApiCallback } from "@modulae.systems/rpc-server";
import { RpcResponseModel } from "@modulae.systems/rpc-server/dist/types";
import { RpcObjects } from "./models";
import { getAlive, getAuth, getTime } from "./functions";
import * as jwt from "jsonwebtoken"

initRpcWithApiCallback(async (method, body) => {
    if (method == RpcObjects.Methods.auth) {
        return getAuth(body);
    } else if (method == RpcObjects.Methods.alive) {
        return getAlive();
    }
    return {
        error: {
            code: 501,
            description: "Method not defined",
        },
        data: null,
    };
},async (method, body) => {
    if (method == RpcObjects.Methods.time) {
        return getTime();
    }
    return {
        error: {
            code: 501,
            description: "Method not defined",
        },
        data: null,
    };
},async (method, token) => {
    try {
        const key = process.env.JWT_SECRET ?? "nokey";
        const tokenData = jwt.verify(token, key) as jwt.JwtPayload;
        if (tokenData.data == "authenticated") {
            if (method == RpcObjects.Methods.time) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("JWT VERIFY ERROR: ",JSON.stringify(error))
        if (error.name == "TokenExpiredError") {
            return false;
        } else {
            return false;
        }
    }
});