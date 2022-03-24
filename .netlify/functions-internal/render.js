const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["css/components.css","css/contractUI.css","css/egg.css","css/global.css","favicon.png","images/dragon.png","robots.txt","svelte-welcome.png","svelte-welcome.webp"]),
	_: {
		mime: {".css":"text/css",".png":"image/png",".txt":"text/plain",".webp":"image/webp"},
		entry: {"file":"start-ebc8f798.js","js":["start-ebc8f798.js","chunks/vendor-dbbb6491.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js')),
			() => Promise.resolve().then(() => require('../server/nodes/6.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js'))
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/dragon\/([^/]+?)\/?$/,
				params: (m) => ({ dragonId: m[1]}),
				path: null,
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/about\/?$/,
				params: null,
				path: "/about",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/todos\.json$/,
				params: null,
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/todos/index.json.js'))
			},
			{
				type: 'page',
				pattern: /^\/todos\/?$/,
				params: null,
				path: "/todos",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/todos\/([^/]+?)\.json$/,
				params: (m) => ({ uid: m[1]}),
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/todos/_uid_.json.js'))
			},
			{
				type: 'page',
				pattern: /^\/cave\/?$/,
				params: null,
				path: "/cave",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/egg\/([^/]+?)\/?$/,
				params: (m) => ({ EggId: m[1]}),
				path: null,
				shadow: null,
				a: [0,7],
				b: [1]
			}
		]
	}
});
