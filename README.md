# Install
```
npm i @modulae.systems/rpc-server
```

# Notice
@modulae.systems/rpc-server is best used with
- [Typescript](https://www.npmjs.com/package/typescript)
- [@modulae.systems/rpc-client](https://www.npmjs.com/package/@modulae.systems/rpc-client)

# Usage
On your .ts file
```
import { initRpcWithApiCallback } from "@modulae.systems/rpc-server";
import { RpcRequestModel, RpcResponseModel } from "@modulae.systems/rpc-server/dist/types";

initRpcWithApiCallback(async (request: RpcRequestModel) => {
        // DO SOMETHING
        // example
        // if (request.method == "registerUser") {
        //     call registerUser(request.data)
        // } else if (request.method == "login") {
        //     call login(request.data)
        // }

        let responseData = {}; // some data your client will receive, preferably with some fixed models
        const response: RpcResponseModel = {
            error: null,
            data: responseData,
        }
        return response;
    }
);
```

Add this line to your ```.env``` file
```
...
RPC_PORT=80 # or any port you want
...
```