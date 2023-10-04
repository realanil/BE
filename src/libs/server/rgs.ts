import express, { Request, Response } from 'express';
import { BaseSlotGame } from '../platform/slots/base_slot_game';
import BigNumber from 'bignumber.js';
import { ServerResponseModel } from '../platform/slots/server_response_model';

export class RGS {

    app: express.Application;
    server: BaseSlotGame
    state: any;

    constructor(gameServer: BaseSlotGame) {
        var cors = require('cors');
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors);
        this.server = gameServer;

        this.app.post('/:gameCode/config', (req: Request, res: Response) => {
            const gameCode = req.params.gameCode;
            res.send(this.server.config(this.state)).status(200);
        });
        this.app.post('/:gameCode/play', (req: Request, res: Response) => {
            const gameCode = req.params.gameCode;

            const stake: BigNumber = req.body.stake ? new BigNumber(req.body.stake) : null;

            const request = { action: req.body.action, stake: stake, cheat: req.body.cheat, state: this.state };
            const response: ServerResponseModel = this.server.play(request);
            if (response.state) {
                this.state = JSON.parse(JSON.stringify(response.state));
            }
            res.send(response.response).status(200);
        });
    }

    start(port: string) {
        this.app.listen(port, () => {
            console.log(`listening at port ${port} `);
        });
    }

}