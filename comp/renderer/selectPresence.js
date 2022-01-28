"use strict";
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
const electron_1 = require("electron");
let path;
let presences;
const select = document.getElementsByName("select")[0];
(() => __awaiter(void 0, void 0, void 0, function* () {
    path = yield electron_1.ipcRenderer.invoke("getPath");
    presences = require(path + "\\presences.json");
    presences.forEach(presence => {
        select.innerHTML += `<option value="${presence.nameId}">${presence.nameId}</option>`;
    });
}))();
const query = selector => document.querySelector(selector);
const form = document.querySelector("#select-rich");
form.addEventListener("submit", e => {
    e.preventDefault();
    const el = e.target;
    electron_1.ipcRenderer.invoke("select", el.select.value);
    window.location.href = "index.html";
});
