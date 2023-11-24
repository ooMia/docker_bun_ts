// See ./README.md for instructions on how to run this benchmark.
const port = process.env.PORT || 4001;

import {createRequire} from "module";

const require = createRequire(import.meta.url);
var clients = [];
var WebSocketServer = require("ws").Server,
    config = {
        host: "0.0.0.0",
        port,
    },
    wss = new WebSocketServer(config, function () {
        console.log(`Waiting for clients to connect..`);
    });

wss.on("connection", function (ws, {url}) {
    const name = new URL(new URL(url, "http://localhost:3000")).searchParams.get(
        "name"
    );
    clients.push(ws);
    console.log(
        `${name} connected (${clients.length} connected)`
    );


    ws.on("message", function (message) {
        const out = `${name}: ${message}`;
        for (let client of clients) {
            client.send(out);
        }
    });

    // when a connection is closed
    ws.on("close", function (ws) {
        clients.splice(clients.indexOf(ws), 1);
    });
});


//
// function sendReadyMessage() {
//     console.log("All clients connected");
//     setTimeout(() => {
//         console.log("Starting benchmark");
//         for (let client of clients) {
//             client.send(`ready`);
//         }
//     }, 100);
// }
