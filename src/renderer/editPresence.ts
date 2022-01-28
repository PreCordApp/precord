import * as fs from "fs-extra";
import { ipcRenderer } from "electron";
let path: string;
let presences: any;
let selected: String | null;

(async () => {
    path = await ipcRenderer.invoke("getPath");
    selected = await ipcRenderer.invoke("getSelected");

    presences = require(path + "\\presences.json");
    const index = presences.findIndex(x => x.nameId === selected);
    if (index <= -1) selected = null;

    if (selected == null || selected == "") window.location.href = "select.html";

    for (const element of form.elements) {
        const presence = presences.find(x => x.nameId === selected);
        try {
            element.value = presence[element.name] || "";
        } catch (e) {
            console.log(e);
        }
    }
})();

const query = selector => document.querySelector(selector);
const form = query("#edit-rich");

form.addEventListener("submit", async e => {
    e.preventDefault();
    const element = e.target;

    let preObj = {
        nameId: element.nameId.value,
        details: element.details.value,
        state: element.state.value,
        largeImageKey: element.largeImageKey.value || null,
        largeImageText: element.largeImageKey.value || null,
        smallImageKey: element.smallImageKey.value || null,
        smallImageText: element.smallImageKey.value || null,
        startTimestamp: Date.now() || null,
    };

    if (element.timestamp.value === "true") {
        preObj.startTimestamp = Date.now();
    } else {
        preObj.startTimestamp = null;
    }

    Object.keys(preObj).forEach(key => {
        if (preObj[key] === null) {
            delete preObj[key];
        }
    });

    const presence = presences.findIndex(x => x.nameId === selected);

    presences[presence] = preObj;

    fs.writeJSONSync(path + "\\presences.json", presences);

    const popup = query("*[added]");

    popup.style.animationName = "fadeAway";
    popup.style.animationDuration = "5s";

    setTimeout(() => {
        popup.style.animationName = "";
        popup.style.animationDuration = "";
    }, 5000);

    ipcRenderer.invoke("select", preObj.nameId);
    selected = preObj.nameId;
});
