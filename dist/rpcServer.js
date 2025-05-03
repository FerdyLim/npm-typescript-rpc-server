"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRpcWithApiCallback = initRpcWithApiCallback;
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
let callbackFunc;
app.post("/rpc", async (req, res) => {
    const content = req.body;
    try {
        let response = await callbackFunc(content);
        res.json(response);
    }
    catch (e) {
        const errResponse = {
            error: {
                code: 500,
                description: "Something went wrong",
                debug: e,
            },
            data: null,
        };
        res.status(500).json(errResponse);
    }
});
function initRpcWithApiCallback(callback) {
    callbackFunc = callback;
    const port = process.env.RPC_PORT;
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
