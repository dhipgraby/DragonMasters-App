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
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_628225c9 = require("../../chunks/index-628225c9.js");
var import_uuid = require("uuid");
const EggToken = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let { contract } = $$props;
  let eggId_start;
  let eggId_check;
  let eggId_details;
  let eggId_hatch;
  if ($$props.contract === void 0 && $$bindings.contract && contract !== void 0)
    $$bindings.contract(contract);
  return `<h1>EggToken</h1>

<br>
<div class="${"grid"}" align="${"left"}"><button class="${"btn btn-info t-sm"}">Total Supply</button>

	<br>
	<table class="${"table table-striped"}"><tr><h2>Mint Gen 0 egg</h2>
			<button class="${"btn btn-dark"}">MINT</button></tr>
		<tr><h2>Start Incubation</h2>
			<div class="${"mb-3"}"><input type="${"text"}" class="${"form-control"}" placeholder="${"Egg Id"}"${(0, import_index_628225c9.d)("value", eggId_start, 0)}></div>
			<button class="${"btn btn-dark"}">Start</button></tr>
		<tr><h2>Check Incubation time</h2>
			<div class="${"mb-3"}"><input type="${"text"}" class="${"form-control"}" placeholder="${"Egg Id"}"${(0, import_index_628225c9.d)("value", eggId_check, 0)}></div>
			<button class="${"btn btn-dark"}">Check</button></tr>

		<tr><h2>Get Egg details</h2>
			<div class="${"mb-3"}"><input type="${"text"}" class="${"form-control"}" placeholder="${"Egg Id"}"${(0, import_index_628225c9.d)("value", eggId_details, 0)}></div>
			<button class="${"btn btn-dark"}">Get Details</button></tr>

		<tr><h2>Hatch</h2>
			<div class="${"mb-3"}"><input type="${"text"}" class="${"form-control"}" placeholder="${"Egg Id"}"${(0, import_index_628225c9.d)("value", eggId_hatch, 0)}></div>
			<button class="${"btn btn-dark"}">HATCH!</button></tr></table></div>`;
});
var ContractUI_svelte_svelte_type_style_lang = "";
const css = {
  code: ".btn-group.svelte-e4mmaw .btn.svelte-e4mmaw{margin:8px;font-weight:600;letter-spacing:0.8px;font-size:14px}.btn-group.svelte-e4mmaw.svelte-e4mmaw{margin-top:20px;margin-bottom:20px}section.svelte-e4mmaw.svelte-e4mmaw{padding-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1}",
  map: null
};
const ContractUI = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let egg_contract;
  $$result.css.add(css);
  return `<section class="${"svelte-e4mmaw"}"><div class="${"btn-group svelte-e4mmaw"}" role="${"group"}"><button type="${"button"}" class="${"btn btn-light svelte-e4mmaw"}">EGG CONTRACT</button>
		<button type="${"button"}" class="${"btn btn-light svelte-e4mmaw"}">DRAGON CONTRACT</button></div>

	

	${`${(0, import_index_628225c9.v)(EggToken, "EggToken").$$render($$result, { contract: egg_contract }, {}, {})}`}

	${``}
</section>`;
});
const Routes = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Home</title>`, ""}<link href="${"/css/contractUI.css"}" rel="${"stylesheet"}" data-svelte="svelte-x31fgt">`, ""}


${(0, import_index_628225c9.v)(ContractUI, "ContractUI").$$render($$result, {}, {}, {})}`;
});
