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
  default: () => _layout
});
module.exports = __toCommonJS(stdin_exports);
var import_index_628225c9 = require("../../chunks/index-628225c9.js");
var import_index_99269341 = require("../../chunks/index-99269341.js");
var import_uuid = require("uuid");
const NavBar = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  return `<nav class="${"navbar navbar-expand-lg navbar-light bg-light"}"><div class="${"container-fluid"}"><a class="${"navbar-brand"}" href="${"/"}">Navbar</a>
      <button class="${"navbar-toggler"}" type="${"button"}" data-bs-toggle="${"collapse"}" data-bs-target="${"#navbarSupportedContent"}" aria-controls="${"navbarSupportedContent"}" aria-expanded="${"false"}" aria-label="${"Toggle navigation"}"><span class="${"navbar-toggler-icon"}"></span></button>
      <div class="${"collapse navbar-collapse"}" id="${"navbarSupportedContent"}"><ul class="${"navbar-nav me-auto mb-2 mb-lg-0"}"><li class="${"nav-item"}"><a class="${"nav-link active"}" aria-current="${"page"}" href="${"/"}">Home</a></li>
          <li class="${"nav-item"}"><a class="${"nav-link"}" href="${"/cave"}">Cave</a></li>
          <li class="${"nav-item dropdown"}"><a class="${"nav-link dropdown-toggle"}" href="${"/"}" id="${"navbarDropdown"}" role="${"button"}" data-bs-toggle="${"dropdown"}" aria-expanded="${"false"}">Dropdown
            </a>
            <ul class="${"dropdown-menu"}" aria-labelledby="${"navbarDropdown"}"><li><a class="${"dropdown-item"}" href="${"/"}">Action</a></li>
              <li><a class="${"dropdown-item"}" href="${"/"}">Another action</a></li>
              <li><hr class="${"dropdown-divider"}"></li>
              <li><a class="${"dropdown-item"}" href="${"/"}">Something else here</a></li></ul></li>
          <li class="${"nav-item"}"><a href="${"/"}" class="${"nav-link disabled"}">Disabled</a></li></ul>
        <form class="${"d-flex"}"><input class="${"form-control me-2"}" type="${"search"}" placeholder="${"Search"}" aria-label="${"Search"}">
          <button class="${"btn btn-outline-success"}" type="${"submit"}">Search</button></form></div></div></nav>`;
});
const alertTrigger = (0, import_index_99269341.w)([{ alertType: "success", content: "hellow Moralis!", show: false, id: 0 }]);
function dismissAlert(id) {
  let currentAlerts = (0, import_index_628225c9.g)(alertTrigger);
  alertTrigger.set(currentAlerts.filter((el) => el.id != id));
}
var AlertMsg_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "#alertDiv.svelte-5bfwky{z-index:100;position:fixed;width:fit-content;margin:auto;width:100%}.alert.svelte-5bfwky{width:fit-content;max-width:70%;margin:auto}p.svelte-5bfwky{margin:0}",
  map: null
};
let timeOut = 4e3;
const AlertMsg = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let { alertType = "info" } = $$props;
  let { content = "This is a empty alert, just close it..." } = $$props;
  let { id } = $$props;
  let { alert_number = 0 } = $$props;
  let { show = true } = $$props;
  let marginBottom = (alert_number - 1) * 70 + 10;
  if (marginBottom < 80)
    marginBottom = 10;
  clearAlert();
  function clearAlert() {
    if (id == 0)
      return;
    setTimeout(() => {
      dismissAlert(id);
    }, timeOut);
  }
  if ($$props.alertType === void 0 && $$bindings.alertType && alertType !== void 0)
    $$bindings.alertType(alertType);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.alert_number === void 0 && $$bindings.alert_number && alert_number !== void 0)
    $$bindings.alert_number(alert_number);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  $$result.css.add(css$1);
  return `${show ? `<div id="${"alertDiv"}" style="${"bottom:" + (0, import_index_628225c9.e)(marginBottom) + "px;"}" class="${"svelte-5bfwky"}"><div class="${"alert alert-" + (0, import_index_628225c9.e)(alertType) + " alert-dismissible fade show svelte-5bfwky"}" role="${"alert"}"><p class="${"svelte-5bfwky"}"><!-- HTML_TAG_START -->${content}<!-- HTML_TAG_END --></p>
  
        <button type="${"button"}" class="${"btn-close"}"></button></div></div>` : ``}`;
});
const Header = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  let lastAlerts;
  alertTrigger.subscribe((alerts) => {
    lastAlerts = alerts;
  });
  return `${(0, import_index_628225c9.v)(NavBar, "NavBar").$$render($$result, {}, {}, {})}

${(0, import_index_628225c9.a)(lastAlerts, (alert, i) => {
    return `${(0, import_index_628225c9.v)(AlertMsg, "Alert").$$render($$result, Object.assign(alert, { alert_number: i }), {}, {})}`;
  })}`;
});
var app = "";
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-83apxr{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:1024px;margin:0 auto;box-sizing:border-box}",
  map: null
};
const _layout = (0, import_index_628225c9.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${(0, import_index_628225c9.v)(Header, "Header").$$render($$result, {}, {}, {})}

<main class="${"svelte-83apxr"}">${slots.default ? slots.default({}) : ``}
</main>`;
});
