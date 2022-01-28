"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const electron_1 = require("electron");
let path;
let presences;
let selected;
(() => __awaiter(void 0, void 0, void 0, function* () {
    path = yield electron_1.ipcRenderer.invoke("getPath");
    selected = yield electron_1.ipcRenderer.invoke("getSelected");
    presences = require(path + "\\presences.json");
    const index = presences.findIndex(x => x.nameId === selected);
    if (index <= -1)
        selected = null;
    if (selected == null || selected == "")
        window.location.href = "select.html";
    for (const element of form.elements) {
        const presence = presences.find(x => x.nameId === selected);
        try {
            element.value = presence[element.name] || "";
        }
        catch (e) {
            console.log(e);
        }
    }
}))();
const query = selector => document.querySelector(selector);
const form = query("#edit-rich");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    else {
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
    electron_1.ipcRenderer.invoke("select", preObj.nameId);
    selected = preObj.nameId;
}));
