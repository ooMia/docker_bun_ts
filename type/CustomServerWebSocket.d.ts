import { ServerWebSocket } from "bun";

export interface CustomServerWebSocket extends ServerWebSocket {
  data: {
    name?: String;
  };
}
