"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slotocrash_server_1 = require("./games/slotocrash/slotocrash_server");
var rgs_1 = require("./libs/server/rgs");
var port = "8080";
var server = new rgs_1.RGS(new slotocrash_server_1.SlotocrashServer());
server.start(port);
