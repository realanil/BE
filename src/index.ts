import { SlotocrashServer } from "./games/slotocrash/slotocrash_server";
import { RGS } from "./libs/server/rgs";

const port: string = "8080";

const server = new RGS(new SlotocrashServer());
server.start(port);
