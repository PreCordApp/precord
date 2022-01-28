"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fse = __importStar(require("fs-extra"));
const RPC = __importStar(require("discord-rpc"));
const path = electron_1.app.getPath("userData");
let ClientData = require(path + "\\id.json");
setInterval(() => {
    ClientData = require(path + "\\id.json");
}, 1500);
const client = new RPC.Client({ transport: "ipc" });
client.login({ clientId: ClientData.clientId || "874351422559363103" });
const Presences = require(path + "\\presences.json");
let mainWindow;
let PresenceID;
let isTurnedOn;
electron_1.app.on("ready", () => {
    let mainWindow = new electron_1.BrowserWindow({
        autoHideMenuBar: true,
        icon: `${__dirname}/views/images/icon.png`,
        maxWidth: 1200,
        maxHeight: 800,
        minWidth: 1200,
        minHeight: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    if (!fse.existsSync(path + "\\presences.json")) {
        fse.copySync(`${__dirname}/data/presences.json`, path + `\\presences.json`);
    }
    if (!fse.existsSync(path + "\\data\\id.json")) {
        fse.copySync(`${__dirname}/data/id.json`, path + `\\id.json`);
    }
    mainWindow.loadFile(`./views/index.html`);
});
electron_1.ipcMain.handle("getPath", e => {
    return path;
});
electron_1.ipcMain.handle("select", (e, selectId) => {
    PresenceID = selectId;
});
electron_1.ipcMain.handle("turnedOn", (e) => {
    return isTurnedOn;
});
electron_1.ipcMain.handle("run", (e, presences) => {
    const presence = presences.find((x) => x.nameId === PresenceID);
    if (!presence)
        return;
    presence.startTimestamp = Date.now();
    client.setActivity(presence, process.pid);
    isTurnedOn = true;
});
electron_1.ipcMain.handle("getSelected", (e) => {
    return PresenceID || null;
});
