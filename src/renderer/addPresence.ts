import * as fs from "fs-extra";
import { ipcRenderer } from "electron";
let path: string;
let presences: any;

(async () => {
    path = await ipcRenderer.invoke("getPath");
    presences = require(path + "\\presences.json");
})();

const query = selector => document.querySelector(selector);
const form = query("#add-rich") as HTMLFormElement;

form.addEventListener("submit", async e => {
    e.preventDefault();
    const element = e.target as HTMLFormElement;

    let presence = {
        nameId: element.nameId.value,
        details: element.details.value,
        state: element.state.value,
        largeImageKey: element.large_image.value || null,
        largeImageText: element.large_text.value || null,
        smallImageKey: element.small_image.value || null,
        smallImageText: element.small_text.value || null,
        startTimestamp: Date.now() || null,
    };

    if (element.timestamp.value === "true") {
        presence.startTimestamp = Date.now();
    } else {
        presence.startTimestamp = null;
    }

    Object.keys(presence).forEach(key => {
        if (presence[key] === null) {
            delete presence[key];
        }
    });

    presences.push(presence);

    fs.writeJSONSync(path + "\\presences.json", presences);

    const popup = query("*[added]");

    popup.style.animationName = "fadeAway";
    popup.style.animationDuration = "5s";

    setTimeout(() => {
        popup.style.animationName = "";
        popup.style.animationDuration = "";
    }, 5000);
});
