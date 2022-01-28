const { app, BrowserWindow, ipcMain } = require("electron");
const fse = require("fs-extra");
const path = app.getPath("userData");
const RPC = require("discord-rpc");
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
app.on("ready", () => {
    let mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        icon: "./html/images/icon.png",
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
        fse.copySync(__dirname + "\\presences.json", path + "\\presences.json");
    }
    if (!fse.existsSync(path + "\\id.json")) {
        fse.copySync(__dirname + "\\id.json", path + "\\id.json");
    }
    mainWindow.loadFile("./html/index.html");
});
ipcMain.handle("getPath", e => {
    return path;
});
ipcMain.handle("select", (e, selectId) => {
    PresenceID = selectId;
});
ipcMain.handle("turnedOn", (e) => {
    return isTurnedOn;
});
ipcMain.handle("run", (e, presences) => {
    const presence = presences.find(x => x.nameId === PresenceID);
    if (!presence)
        return;
    presence.startTimestamp = Date.now();
    client.setActivity(presence, process.pid);
    isTurnedOn = true;
});
ipcMain.handle("getSelected", (e) => {
    return PresenceID || null;
});
