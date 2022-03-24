var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  manifest: () => manifest
});
module.exports = __toCommonJS(stdin_exports);
const manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["css/components.css", "css/contractUI.css", "css/egg.css", "css/global.css", "favicon.png", "images/dragon.png", "robots.txt", "svelte-welcome.png", "svelte-welcome.webp"]),
  _: {
    mime: { ".css": "text/css", ".png": "image/png", ".txt": "text/plain", ".webp": "image/webp" },
    entry: { "file": "start-ebc8f798.js", "js": ["start-ebc8f798.js", "chunks/vendor-dbbb6491.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => __toESM(require("./nodes/0.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/1.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/2.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/3.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/4.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/5.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/6.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/7.js")))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/dragon\/([^/]+?)\/?$/,
        params: (m) => ({ dragonId: m[1] }),
        path: null,
        shadow: null,
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/about\/?$/,
        params: null,
        path: "/about",
        shadow: null,
        a: [0, 4],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/todos\.json$/,
        params: null,
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/todos/index.json.js")))
      },
      {
        type: "page",
        pattern: /^\/todos\/?$/,
        params: null,
        path: "/todos",
        shadow: null,
        a: [0, 5],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/todos\/([^/]+?)\.json$/,
        params: (m) => ({ uid: m[1] }),
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/todos/_uid_.json.js")))
      },
      {
        type: "page",
        pattern: /^\/cave\/?$/,
        params: null,
        path: "/cave",
        shadow: null,
        a: [0, 6],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/egg\/([^/]+?)\/?$/,
        params: (m) => ({ EggId: m[1] }),
        path: null,
        shadow: null,
        a: [0, 7],
        b: [1]
      }
    ]
  }
};
