import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { AuthorizationCallback, RequestCallback, RpcRequestModel, RpcResponseModel } from "./types";

dotenv.config();

const app: express.Express = express();
app.use(express.json());
app.use(cors());

let publicCallbackFunc: RequestCallback | undefined;
let protectedCallbackFunc: RequestCallback | undefined;
let authCallbackFunc: AuthorizationCallback;

app.post("/rpc/public", async (req: express.Request, res: express.Response) => {
    const content: RpcRequestModel = req.body;
    const headers = req.headers;
    try {
        if (publicCallbackFunc) {
            let response = await publicCallbackFunc(content.method, content.data);
            res.json(response);
        } else {
            res.status(404).json({
                error: {
                    code: 404,
                    description: "Endpoint is not configured",
                },
                data: null,
            });
        }
    } catch (e) {
        const errResponse: RpcResponseModel = {
            error: {
                code: 500,
                description: "Something went wrong",
                debug: e,
            },
            data: null,
        }
        res.status(500).json(errResponse);
    }
});

app.post("/rpc/protected", async (req: express.Request, res: express.Response) => {
    const content: RpcRequestModel = req.body;
    const headers = req.headers;
    try {
        if (protectedCallbackFunc && authCallbackFunc) {
            if (headers.authorization) {
                const token = headers.authorization.split(" ")[1]; // remove bearer or Bearer
                if (authCallbackFunc(content.method, token)) {
                    let response = await protectedCallbackFunc(content.method, content.data);
                    res.json(response);
                    return;
                }
            }
            res.status(401).json({
                error: {
                    code: 401,
                    description: "Not Authorised",
                },
                data: null,
            });
        } else {
            res.status(404).json({
                error: {
                    code: 404,
                    description: "Endpoint is not configured",
                },
                data: null,
            });
        }
    } catch (e) {
        const errResponse: RpcResponseModel = {
            error: {
                code: 500,
                description: "Something went wrong",
                debug: e,
            },
            data: null,
        }
        res.status(500).json(errResponse);
    }
});

/**
 * This function initiates the RPC API, saving the publicCallback, protectedCallback (if defined) and authorizationCallback (if defined). All method from this RPC will go through these 3 methods.
 *
 * @param publicCallback A callback where you get the body and the header. Define your logic on what to do when a method is called.
 * @param b The second number.
 */
export function initRpcWithApiCallback(publicCallback: RequestCallback, protectedCallback?: RequestCallback, authorizationCallback?: AuthorizationCallback) {
    publicCallbackFunc = publicCallback;
    protectedCallbackFunc = protectedCallback;
    authCallbackFunc = authorizationCallback;
    const port = process.env.RPC_PORT;
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}