import * as fs from "fs-extra";
import { ipcRenderer } from "electron";
let path: string;
let clientId: any;

const select = document.getElementsByName("select")[0];

(async () => {
    path = await ipcRenderer.invoke("getPath");
    clientId = require(path + "\\id.json");
    console.log(path + "\\id.json");

    const input = document.getElementsByName("setId")[0] as HTMLInputElement;

    input.value = clientId.clientId;
})();

const query = selector => document.querySelector(selector);
const form = document.querySelector("#set-id") as HTMLFormElement;

form.addEventListener("submit", e => {
    e.preventDefault();
    const el = e.target as HTMLFormElement;

    console.log(el.setId.value);
    clientId.clientId = el.setId.value;
    fs.writeJSONSync(path + "\\id.json", clientId);

    const popup = query("*[added]");

    popup.style.animationName = "fadeAway";
    popup.style.animationDuration = "5s";

    setTimeout(() => {
        popup.style.animationName = "";
        popup.style.animationDuration = "";
    }, 5000);
});
