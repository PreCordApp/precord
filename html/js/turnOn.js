const fs = require("fs-extra");
const { ipcRenderer } = require("electron");
let path;
let presences;
let isTurnedOn;

(async () => {
    path = await ipcRenderer.invoke("getPath");
    isTurnedOn = await ipcRenderer.invoke("turnedOn");
    presences = require(path + "\\presences.json");

    setInterval(() => {
        presences = require(path + "\\presences.json");
    }, 3000);
})();

function turnOn() {
    ipcRenderer.invoke("run", presences);
}
