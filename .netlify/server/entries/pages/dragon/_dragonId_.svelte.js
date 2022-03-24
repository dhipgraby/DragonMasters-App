var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => U5BdragonIdu5D,
  load: () => load
});
module.exports = __toCommonJS(stdin_exports);
var import_index_628225c9 = require("../../../chunks/index-628225c9.js");
var import_uuid = require("uuid");
var ProgressBar_svelte_svelte_type_style_lang = "";
var SingleDragon_svelte_svelte_type_style_lang = "";
var _dragonId__svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-1vzgwxx{margin-top:50px}",
  map: null
};
async function load({ params }) {
  return { props: { dragonId: params.dragonId } };
}
const U5BdragonIdu5D = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let { dragonId } = $$props;
  if ($$props.dragonId === void 0 && $$bindings.dragonId && dragonId !== void 0)
    $$bindings.dragonId(dragonId);
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Cave - Dragon ID - ${(0, import_index_628225c9.e)(dragonId)}</title>`, ""}<link href="${"/css/egg.css"}" rel="${"stylesheet"}" data-svelte="svelte-1b0o95k">`, ""}

${`<h2 class="${"svelte-1vzgwxx"}">Dragon not found...</h2>`}`;
});
