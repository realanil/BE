import { SlotocrashServer } from "./src/games/slotocrash/slotocrash_server";
import { RGS } from "./src/libs/server/rgs";

const port: string = "9090";

const server = new RGS(new SlotocrashServer());
server.start(port);
