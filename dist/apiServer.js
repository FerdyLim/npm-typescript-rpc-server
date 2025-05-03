"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRpcWithConfig = initRpcWithConfig;
const express = require("express");
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
function initRpcWithConfig(obj) {
    callbackFunc = obj.requestCallback;
    app.listen(obj.port, () => {
        console.log(`[server]: Server is running at http://localhost:${obj.port}`);
    });
}
