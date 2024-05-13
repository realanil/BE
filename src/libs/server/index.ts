const dotenv = require('dotenv');
import { RGS } from "./rgs";
import { glob } from "glob";

dotenv.config();

const port: string = process.env.PORT ? process.env.PORT : "8080";
//const httpsPort: string = process.env.HTTPS_PORT ? process.env.HTTPS_PORT : "8081";

glob(`./src/games/*/*.ts`).then(async servFiles => {

    const engines: Map<string, any> = new Map();
    console.log("servFiles", servFiles);

    for (let i = 0; i < servFiles.length; i++) {

        //for local
        //const tsfile = servFiles[i].split('src\\')[1];

        const tsfile = servFiles[i].split('src/')[1];

        console.log("tsfile", tsfile);

        const servClass = tsfile.split(".")[0]
        const engine = await import('./../../' + servClass);

        //for local
        //const id: string = servFiles[i].split('\\')[2]

        const id: string = servFiles[i].split('/')[2]
        console.log(i, id, engine);
        engines.set(id, engine.GameServer)
    }

    const server = new RGS(engines);
    server.start(port);
    console.log("start server")
})

