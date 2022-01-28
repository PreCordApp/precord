import { ipcRenderer } from "electron";
let path: string;
let presences: any;

const select = document.getElementsByName("select")[0];

(async () => {
    path = await ipcRenderer.invoke("getPath");
    presences = require(path + "\\presences.json");

    presences.forEach(presence => {
        select.innerHTML += `<option value="${presence.nameId}">${presence.nameId}</option>`;
    });
})();

const query = selector => document.querySelector(selector);
const form = document.querySelector("#select-rich") as HTMLFormElement;

form.addEventListener("submit", e => {
    e.preventDefault();
    const el = e.target as HTMLFormElement;
    ipcRenderer.invoke("select", el.select.value);

    window.location.href = "index.html";
});
