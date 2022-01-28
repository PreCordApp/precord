const fs = require("fs-extra");
const { ipcRenderer } = require("electron");
let path;
let clientId;

const select = document.getElementsByName("select")[0];

(async () => {
    path = await ipcRenderer.invoke("getPath");
    clientId = require(path + "\\id.json");

    const input = document.getElementsByName("id")[0];

    input.value = clientId.clientId;
})();

const query = selector => document.querySelector(selector);
const form = document.querySelector("#set-id");

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e.target.id.value);
    clientId.clientId = e.target.id.value;
    fs.writeJSONSync(path + "\\id.json", clientId);

    const popup = query("*[added]");

    popup.style.animationName = "fadeAway";
    popup.style.animationDuration = "5s";

    setTimeout(() => {
        popup.style.animationName = "";
        popup.style.animationDuration = "";
    }, 5000);
});
