import { Manager } from "socket.io-client";

const uri = new URL(import.meta.env.VITE_API_URL).toString();

export default new Manager(uri, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
});
