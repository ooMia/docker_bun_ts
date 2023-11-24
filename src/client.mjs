const env = "process" in globalThis ? process.env : "Deno" in globalThis ? Deno.env.toObject() : {};

const SERVER = env.SERVER || "ws://0.0.0.0:4001";
const WebSocket = globalThis.WebSocket || (await import("ws")).WebSocket;
const NAME = 'Tom';

const client = new WebSocket(`${SERVER}?name=${NAME}`);
client.onmessage = event => { console.log(event.data)};

client.onopen = event => {
  client.send("Hello, there.")
}