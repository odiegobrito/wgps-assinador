import { Buffer } from "buffer";
import Login from "./login";
global.Buffer = Buffer;

export default function HomeScreen() {
  return <Login />;
}
