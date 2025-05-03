import * as express from "express";
import * as dotenv from "dotenv";
import { RequestCallback, RpcRequestModel, RpcResponseModel } from "./types";

dotenv.config();

const app: express.Express = express();
app.use(express.json());

let callbackFunc: RequestCallback | undefined;

app.post("/rpc", async (req: express.Request, res: express.Response) => {
    const content: RpcRequestModel = req.body;
    const headers = req.headers;
    try {
        let response = await callbackFunc(content, headers);
        res.json(response)
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

export function initRpcWithApiCallback(callback: RequestCallback) {
    callbackFunc = callback;
    const port = process.env.RPC_PORT;
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}