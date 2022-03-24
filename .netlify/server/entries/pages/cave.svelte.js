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
  default: () => Cave
});
module.exports = __toCommonJS(stdin_exports);
var import_index_628225c9 = require("../../chunks/index-628225c9.js");
var import_index_99269341 = require("../../chunks/index-99269341.js");
var import_uuid = require("uuid");
const userEggs = (0, import_index_99269341.w)([]);
const userDragons = (0, import_index_99269341.w)([]);
const Message = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"basicMsg"}">${slots.default ? slots.default({}) : `
        
    `}</div>`;
});
const css$2 = {
  code: ".btn-dark.svelte-14jhu8t.svelte-14jhu8t{font-size:14px;padding:4px 20px !important;margin-bottom:10px}.btn-light.svelte-14jhu8t.svelte-14jhu8t{width:100%;padding:4px 20px !important;margin-bottom:10px;font-weight:500;border:solid 1px}.btn-light.svelte-14jhu8t.svelte-14jhu8t:hover{background-color:black;color:white}.btn-yellow.svelte-14jhu8t.svelte-14jhu8t{font-size:14px;padding:4px 20px !important;margin-bottom:10px}p.svelte-14jhu8t.svelte-14jhu8t{font-weight:600;color:#999999}.card.svelte-14jhu8t.svelte-14jhu8t{border-radius:20px;margin:10px;transition:0.5s}.card.svelte-14jhu8t.svelte-14jhu8t:hover{box-shadow:0px 10px 20px -8px}.card-title.svelte-14jhu8t.svelte-14jhu8t{color:#737373;font-size:20px;font-weight:600}.card-header.svelte-14jhu8t.svelte-14jhu8t{border-radius:20px 20px 0px 0px;cursor:pointer;padding:20px 0px;background-color:#f2fffb;background:linear-gradient(20deg, #f2fffb, #b3b3b3)}.card-header.svelte-14jhu8t:hover #egg.svelte-14jhu8t{transform:scale(1) rotateX(0deg);box-shadow:0px 25px 15px -5px #595959}.card-body.svelte-14jhu8t.svelte-14jhu8t{text-align:center}.card-text.svelte-14jhu8t.svelte-14jhu8t{text-align:left}",
  map: null
};
const EggCard = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let $time, $$unsubscribe_time;
  let { egg } = $$props;
  let { contract } = $$props;
  let incTime = Number(egg.incubationTime);
  let incubating = incTime > 0 ? true : false;
  const time = (0, import_index_99269341.r)(incTime, function start(set) {
    const interval = setInterval(() => {
      if (incTime > 0) {
        incTime--;
        set(incTime);
      } else {
        incubating = false;
        stop();
      }
    }, 1e3);
    return function stop2() {
      clearInterval(interval);
    };
  });
  $$unsubscribe_time = (0, import_index_628225c9.f)(time, (value) => $time = value);
  if ($$props.egg === void 0 && $$bindings.egg && egg !== void 0)
    $$bindings.egg(egg);
  if ($$props.contract === void 0 && $$bindings.contract && contract !== void 0)
    $$bindings.contract(contract);
  if ($$props.time === void 0 && $$bindings.time && time !== void 0)
    $$bindings.time(time);
  $$result.css.add(css$2);
  $$unsubscribe_time();
  return `<div class="${"card svelte-14jhu8t"}" style="${"width: 18rem;"}"><div class="${"card-header svelte-14jhu8t"}"><a href="${"/egg/" + (0, import_index_628225c9.e)(egg.tokenId)}"><div id="${"egg"}" class="${"svelte-14jhu8t"}"></div></a></div>
	<div class="${"card-body svelte-14jhu8t"}"><h5 class="${"card-title svelte-14jhu8t"}">Egg : #${(0, import_index_628225c9.e)(egg.tokenId)}</h5>
		<hr>
		<p class="${"card-text svelte-14jhu8t"}"><b>MumId:</b>
			${(0, import_index_628225c9.e)(egg.mumId)}
			<br>
			<b>DadId:</b>
			${(0, import_index_628225c9.e)(egg.dadId)}</p>

		${egg.incubationTime == void 0 ? `<button class="${"btn btn-dark svelte-14jhu8t"}">Start Incubation</button>` : `${$time == 0 ? `<button class="${"btn btn-yellow svelte-14jhu8t"}">Ready to Hatch!</button>` : `${incubating ? `${(0, import_index_628225c9.v)(Message, "Message").$$render($$result, {}, {}, {
    default: () => {
      return `<span>${(0, import_index_628225c9.e)($time)}</span>
					<small>time let for hatching...</small>`;
    }
  })}` : ``}
			<button class="${"btn btn-yellow svelte-14jhu8t"}" ${incubating ? "disabled" : ""}>Ready to Hatch!</button>`}`}

		<a href="${"/egg/" + (0, import_index_628225c9.e)(egg.tokenId)}"><button class="${"btn btn-light svelte-14jhu8t"}">Checkout <i class="${"fas fa-arrow-circle-right"}"></i></button></a></div>
</div>`;
});
var EggGrid_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".row.svelte-1x75dwp{margin-top:25px}",
  map: null
};
const EggGrid = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let { eggs } = $$props;
  let { contract } = $$props;
  if ($$props.eggs === void 0 && $$bindings.eggs && eggs !== void 0)
    $$bindings.eggs(eggs);
  if ($$props.contract === void 0 && $$bindings.contract && contract !== void 0)
    $$bindings.contract(contract);
  $$result.css.add(css$1);
  return `<h1>Your Eggs</h1>

<div class="${"row svelte-1x75dwp"}">${eggs.length ? `${(0, import_index_628225c9.a)(eggs, (egg) => {
    return `<div class="${"col-md-4"}">${(0, import_index_628225c9.v)(EggCard, "EggCard").$$render($$result, { egg, contract }, {}, {})}
			</div>`;
  })}` : `<h2>Not Eggs found</h2>`}
</div>`;
});
var DragonCard_svelte_svelte_type_style_lang = "";
var cave_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-7sww8k.svelte-7sww8k{padding-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1}.btn-group.svelte-7sww8k .btn.svelte-7sww8k{margin:8px;font-weight:600;letter-spacing:0.8px;font-size:14px}.btn-group.svelte-7sww8k.svelte-7sww8k{margin-top:20px;margin-bottom:20px}",
  map: null
};
const Cave = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let contract = [];
  let eggs = [];
  userEggs.subscribe((value) => {
    eggs = value;
    console.log(eggs);
  });
  userDragons.subscribe((value) => {
  });
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Cave - Dragon Masters</title>`, ""}<link href="${"/css/egg.css"}" rel="${"stylesheet"}" data-svelte="svelte-m7boj1">`, ""}

<section class="${"svelte-7sww8k"}"><div class="${"btn-group svelte-7sww8k"}" role="${"group"}"><button type="${"button"}" class="${"btn btn-light svelte-7sww8k"}">EGG CONTRACT</button>
		<button type="${"button"}" class="${"btn btn-light svelte-7sww8k"}">DRAGON CONTRACT</button></div>

	${`${(0, import_index_628225c9.v)(EggGrid, "EggGrid").$$render($$result, { eggs, contract: contract["egg"] }, {}, {})}`}

	${``}

</section>`;
});
