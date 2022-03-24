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
  default: () => U5BEggIdu5D,
  load: () => load
});
module.exports = __toCommonJS(stdin_exports);
var import_index_628225c9 = require("../../../chunks/index-628225c9.js");
var import_uuid = require("uuid");
async function load({ params }) {
  return { props: { EggId: params.EggId } };
}
const U5BEggIdu5D = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let { EggId } = $$props;
  if ($$props.EggId === void 0 && $$bindings.EggId && EggId !== void 0)
    $$bindings.EggId(EggId);
  return `${$$result.head += `${$$result.title = `<title>Cave - Egg ID - ${(0, import_index_628225c9.e)(EggId)}</title>`, ""}<link href="${"/css/egg.css"}" rel="${"stylesheet"}" data-svelte="svelte-1t1xwk4">`, ""}

<h1>Egg id is ${(0, import_index_628225c9.e)(EggId)}</h1>

${`<h2>Egg not found...</h2>`}`;
});
