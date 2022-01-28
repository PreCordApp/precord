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
(() => __awaiter(void 0, void 0, void 0, function* () {
    path = yield electron_1.ipcRenderer.invoke("getPath");
    presences = require(path + "\\presences.json");
}))();
const query = selector => document.querySelector(selector);
const form = query("#add-rich");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const element = e.target;
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
    }
    else {
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
}));
