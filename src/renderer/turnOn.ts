import * as fs from "fs-extra";
import { ipcRenderer } from "electron";
let path: string;
let presences: any;
let isTurnedOn: boolean;

(async () => {
    path = await ipcRenderer.invoke("getPath");
    isTurnedOn = await ipcRenderer.invoke("turnedOn");
    presences = require(path + "\\presences.json");

    setInterval(() => {
        presences = require(path + "\\presences.json");
    }, 3000);
})();

function turnOn(): void {
    ipcRenderer.invoke("run", presences);
}
