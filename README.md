# Install
```
npm i @modulae.systems/rpc-server
```

# Notice
@modulae.systems/rpc-server is best used with
- [Typescript](https://www.npmjs.com/package/typescript)
- [@modulae.systems/rpc-client](https://www.npmjs.com/package/@modulae.systems/rpc-client)

# Usage
### On your .ts file
```
import { initRpcWithApiCallback } from "@modulae.systems/rpc-server";
import { RpcResponseModel } from "@modulae.systems/rpc-server/dist/types";

initRpcWithApiCallback(async (body, headers) => {
        // DO SOMETHING
        // example
        // if (body.method == "registerUser") {
        //     call registerUser(body.data)
        // } else if (body.method == "login") {
        //     call login(body.data)
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

### Add this line to your ```.env``` file
```
...
RPC_PORT=80 # or any port you want
...
```

## Future features (My personal TODO list)
1. ~~Custom Headers support (by v1)~~
2. ~~Add Sample Projects to showcase what this module can do~~