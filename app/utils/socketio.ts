import { Manager } from "socket.io-client";

const uri = new URL(import.meta.env.VITE_API_URL).toString();
const sio = new Manager(uri, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
});

export default sio;
