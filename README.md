# Install
```
npm i @modulae.systems/rpc-server
```

## Upgrade Note:
v1.x.x is not compatible with v0.x.x. There is a breaking change in initRpcWithApiCallback() method. Updated this module to feel more like calling methods, as per the intention of RPC itself.

# Notice
@modulae.systems/rpc-server is best used with
- [Typescript](https://www.npmjs.com/package/typescript)
- [@modulae.systems/rpc-client](https://www.npmjs.com/package/@modulae.systems/rpc-client)

# Usage
### On your .ts file (only support public methods)
```
import { initRpcWithApiCallback } from "@modulae.systems/rpc-server";
import { RpcResponseModel } from "@modulae.systems/rpc-server/dist/types";

initRpcWithApiCallback(async (method, data) => {
    // DO SOMETHING
    // example
    // if (method == "registerUser") {
    //     call registerUser(data)
    // } else if (method == "login") {
    //     call login(data)
    // }

    let responseData = {}; // some data your client will receive, preferably with some fixed models
    const response: RpcResponseModel = {
        error: null,
        data: responseData,
    }
    return response;
});
```
### On your .ts file (only support public and protected methods)
```
import { initRpcWithApiCallback } from "@modulae.systems/rpc-server";
import { RpcResponseModel } from "@modulae.systems/rpc-server/dist/types";

initRpcWithApiCallback(async (method, data) => {
    // DO SOMETHING
    // example
    // if (method == "registerUser") {
    //     call registerUser(data)
    // } else if (method == "login") {
    //     call login(data)
    // }

    let responseData = {}; // some data your client will receive, preferably with some fixed models
    const response: RpcResponseModel = {
        error: null,
        data: responseData,
    }
    return response;
}, async (method, data) => {
    // DO SOMETHING
    // example
    // if (method == "editProfile") {
    //     call editProfile(data)
    // } else if (method == "getFeed") {
    //     call getFeed(data)
    // } else if (method == "getAdminFeatures") {
    //     call getAdminFeatures(data)
    // }

    let responseData = {}; // some data your client will receive, preferably with some fixed models
    const response: RpcResponseModel = {
        error: null,
        data: responseData,
    }
    return response;
}, async (method, token) => {
    // CHECK AUTHORISATION
    // example
    // try {
    //     const tokenData: TokenData = jwt.verify(token, key) as jwt.JwtPayload; // defined your own TokenData type
    //     //in this example, auth_level 0=public, 1=login, 2=admin
    //     if (method == "editProfile" && tokenData.auth_level >= 1) {
    //         return true;
    //     } else if (method == "getFeed" && tokenData.auth_level >= 1) {
    //         return true;
    //     } else if (method == "getAdminFeatures" && tokenData.auth_level >= 2) {
    //         return true;
    //     }
    //     return false;
    // } catch (e) {
    //     return false;
    // }
});
```

### Add this line to your ```.env``` file
```
...
RPC_PORT=80 # or any port you want
...
```