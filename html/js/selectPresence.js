const fs = require("fs-extra");
const { ipcRenderer } = require("electron");
let path;
let presences;

const select = document.getElementsByName("select")[0];

(async () => {
    path = await ipcRenderer.invoke("getPath");
    presences = require(path + "\\presences.json");

    presences.forEach(presence => {
        select.innerHTML += `<option value="${presence.nameId}">${presence.nameId}</option>`;
    });
})();

const query = selector => document.querySelector(selector);
const form = document.querySelector("#select-rich");

form.addEventListener("submit", e => {
    e.preventDefault();
    ipcRenderer.invoke("select", e.target.select.value);

    window.location.href = "index.html";
});
