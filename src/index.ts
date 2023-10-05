import { SlotocrashServer } from "./games/slotocrash/slotocrash_server";
import { RGS } from "./libs/server/rgs";

const port: string = "9090";

const server = new RGS(new SlotocrashServer());
server.start(port);
