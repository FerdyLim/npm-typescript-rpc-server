import { initRpcWithApiCallback } from "@modulae.systems/rpc-server";
import { RpcResponseModel } from "@modulae.systems/rpc-server/dist/types";
import { RpcObjects } from "./models";
import { getAlive, getAuth, getTime } from "./functions";

initRpcWithApiCallback(async (body, headers) => {
    const method = body.method as RpcObjects.Methods;

    if (method == RpcObjects.Methods.auth) {
        return getAuth(body);
    } else if (method == RpcObjects.Methods.alive) {
        return getAlive();
    } else if (method == RpcObjects.Methods.time) {
        return getTime(headers);
    }
    return {
        error: {
            code: 501,
            description: "Method not defined",
        },
        data: null,
    };
});