import { app, BrowserWindow, ipcMain, Notification } from "electron";
import * as fse from "fs-extra";
import * as RPC from "discord-rpc";

const path = app.getPath("userData");

let ClientData = require(path + "\\id.json");

setInterval(() => {
    ClientData = require(path + "\\id.json");
}, 1500);

const client = new RPC.Client({ transport: "ipc" });
client.login({ clientId: ClientData.clientId || "874351422559363103" });
const Presences = require(path + "\\presences.json");

let mainWindow: BrowserWindow;
let PresenceID: String;

let isTurnedOn: Boolean;

app.on("ready", () => {
    let mainWindow = new BrowserWindow({
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

ipcMain.handle("getPath", e => {
    return path;
});

ipcMain.handle("select", (e: any, selectId: string) => {
    PresenceID = selectId;
});

ipcMain.handle("turnedOn", (e: any) => {
    return isTurnedOn;
});

ipcMain.handle("run", (e: any, presences: any) => {
    const presence = presences.find((x: { nameId: String }) => x.nameId === PresenceID);
    if (!presence) return;
    presence.startTimestamp = Date.now();
    client.setActivity(presence, process.pid);
    isTurnedOn = true;
});

ipcMain.handle("getSelected", (e: any) => {
    return PresenceID || null;
});
