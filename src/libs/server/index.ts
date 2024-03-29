const dotenv = require('dotenv');
import { BaseSlotGame } from "../platform/slots/base_slot_game";
import { RGS } from "./rgs";
import { glob } from "glob";

dotenv.config();

const port: string = process.env.PORT ? process.env.PORT : "8080";

glob(`./src/games/*/*.ts`).then(async servFiles => {

    const engines: Map<string, BaseSlotGame> = new Map();
    console.log("servFiles", servFiles);

    for (let i = 0; i < servFiles.length; i++) {
        console.log("servFiles[i]", i, servFiles[i]);
        //for local
        //const tsfile = servFiles[i].split('src\\')[1];

        const tsfile = servFiles[i].split('src/')[1];
        console.log("tsfile", tsfile);

        const servClass = tsfile.split(".")[0]
        const engine = await import('./../../' + servClass);

        //for local
        //const id: string = servFiles[i].split('\\')[2]

        const id: string = servFiles[i].split('/')[2]
        console.log(id, engine, servFiles[i]);
        engines.set(id, new engine.GameServer())
    }

    const server = new RGS(engines);
    server.start(port);
    console.log("start server")
})

