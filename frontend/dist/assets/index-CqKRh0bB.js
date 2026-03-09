const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			"assets/StandingOrdersPage-BjkXkLGE.js",
			"assets/query-CSqTlvHZ.js",
			"assets/ui-DkQ5vUzx.js",
			"assets/vendor-DCpvk_e6.js",
			"assets/ClientAnalyticsPage-B51FH20V.js",
			"assets/charts-BFL_wnGK.js",
			"assets/AdminDashboard-B8Ddpnz6.js",
			"assets/admin-Cg3Azfz7.js",
			"assets/AdminOrdersPage-0zws-zsy.js",
			"assets/AdminOrderDetailPage-DtsAyiKr.js",
			"assets/AdminCatalogPage-eqWKsymx.js",
			"assets/Modal-MdRHN0F2.js",
			"assets/AdminProductForm-CMjvrcnx.js",
			"assets/AdminStockPage-DytZ4rkc.js",
			"assets/AdminStockReceiptPage-ChD2gNLx.js",
			"assets/AdminClientsPage-DMnSYpnJ.js",
			"assets/AdminFinancePage-D56a3TFw.js",
			"assets/AdminCertificatesPage-BAGZNZUg.js",
			"assets/AdminSettingsPage-JYI-UUyv.js",
			"assets/AdminBackupsPage-CTI_A09G.js",
			"assets/AdminSuppliersPage-ChOb51r8.js",
			"assets/AdminContractsPage-B2lo7Wvz.js",
			"assets/AdminDishesPage-CC8GCK74.js",
			"assets/AdminWriteOffsPage-DzLRk6yi.js",
			"assets/AdminTendersPage-k2P73mLx.js",
			"assets/AdminAnalyticsPage-DJBk11nI.js",
			"assets/AdminCRMPage-BwaL55qB.js",
			"assets/AdminRemindersPage-DEBSuBTf.js",
			"assets/AdminCalendarPage-BNX9B9DE.js",
			"assets/AdminProcurementPage-O0dUmOyh.js",
			"assets/AdminPriceLogPage-CLrReftU.js",
			"assets/AdminBatchesPage-DDvqwwDb.js",
			"assets/AdminLogisticsPage-BXR0kxRP.js",
			"assets/AdminLabelsPage-DAp07cM9.js",
			"assets/AdminDocumentsPage-C9Jm0xXc.js",
		]),
) => i.map((i) => d[i]);
import {
	r as O,
	g as Zo,
	R as I,
	j as r,
	u as st,
	a as li,
	b as Go,
	Q as Yo,
	d as Xo,
} from "./query-CSqTlvHZ.js";
import {
	r as Jo,
	u as qt,
	L as H,
	N as Kt,
	O as Cs,
	a as Qo,
	b as ci,
	c as ja,
	d as Ko,
	e as ws,
	R as el,
} from "./vendor-DCpvk_e6.js";
import {
	S as es,
	U as ot,
	P as ur,
	a as Gr,
	L as di,
	X as wa,
	M as tl,
	b as yt,
	c as Na,
	d as As,
	e as Be,
	C as ds,
	f as _a,
	g as ui,
	F as bt,
	h as Ae,
	i as mi,
	j as Os,
	W as sl,
	k as hi,
	l as fi,
	A as Ys,
	T as rl,
	D as al,
	m as us,
	n as nl,
	o as ka,
	p as xi,
	B as il,
	q as ol,
	r as ll,
	s as cl,
	E as dl,
	t as Sa,
	u as gi,
	v as Xs,
	w as ts,
	x as Ea,
	y as Js,
	z as ul,
	I as ml,
	G as hl,
	H as Yr,
	J as fl,
	K as xl,
	N as gl,
	O as pl,
	Q as yl,
	R as bl,
	V as Ns,
	Y as _s,
	Z as Qs,
	_ as pi,
	$ as Xr,
	a0 as vl,
	a1 as jl,
	a2 as mr,
	a3 as wl,
	a4 as Jr,
	a5 as Nl,
	a6 as _l,
	a7 as Ja,
	a8 as Ks,
	a9 as kl,
} from "./ui-DkQ5vUzx.js";
(function () {
	const t = document.createElement("link").relList;
	if (t && t.supports && t.supports("modulepreload")) return;
	for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
	new MutationObserver((n) => {
		for (const i of n)
			if (i.type === "childList")
				for (const o of i.addedNodes)
					o.tagName === "LINK" && o.rel === "modulepreload" && a(o);
	}).observe(document, { childList: !0, subtree: !0 });
	function s(n) {
		const i = {};
		return (
			n.integrity && (i.integrity = n.integrity),
			n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy),
			n.crossOrigin === "use-credentials"
				? (i.credentials = "include")
				: n.crossOrigin === "anonymous"
					? (i.credentials = "omit")
					: (i.credentials = "same-origin"),
			i
		);
	}
	function a(n) {
		if (n.ep) return;
		n.ep = !0;
		const i = s(n);
		fetch(n.href, i);
	}
})();
var Qr = {},
	Qa = Jo;
((Qr.createRoot = Qa.createRoot), (Qr.hydrateRoot = Qa.hydrateRoot));
let Sl = { data: "" },
	El = (e) => {
		if (typeof window == "object") {
			let t =
				(e ? e.querySelector("#_goober") : window._goober) ||
				Object.assign(document.createElement("style"), {
					innerHTML: " ",
					id: "_goober",
				});
			return (
				(t.nonce = window.__nonce__),
				t.parentNode || (e || document.head).appendChild(t),
				t.firstChild
			);
		}
		return e || Sl;
	},
	Cl = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
	Al = /\/\*[^]*?\*\/|  +/g,
	Ka = /\n+/g,
	xt = (e, t) => {
		let s = "",
			a = "",
			n = "";
		for (let i in e) {
			let o = e[i];
			i[0] == "@"
				? i[1] == "i"
					? (s = i + " " + o + ";")
					: (a +=
							i[1] == "f"
								? xt(o, i)
								: i + "{" + xt(o, i[1] == "k" ? "" : t) + "}")
				: typeof o == "object"
					? (a += xt(
							o,
							t
								? t.replace(/([^,])+/g, (l) =>
										i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (c) =>
											/&/.test(c) ? c.replace(/&/g, l) : l ? l + " " + c : c,
										),
									)
								: i,
						))
					: o != null &&
						((i = /^--/.test(i) ? i : i.replace(/[A-Z]/g, "-$&").toLowerCase()),
						(n += xt.p ? xt.p(i, o) : i + ":" + o + ";"));
		}
		return s + (t && n ? t + "{" + n + "}" : n) + a;
	},
	rt = {},
	yi = (e) => {
		if (typeof e == "object") {
			let t = "";
			for (let s in e) t += s + yi(e[s]);
			return t;
		}
		return e;
	},
	Ol = (e, t, s, a, n) => {
		let i = yi(e),
			o =
				rt[i] ||
				(rt[i] = ((c) => {
					let d = 0,
						u = 11;
					for (; d < c.length; ) u = (101 * u + c.charCodeAt(d++)) >>> 0;
					return "go" + u;
				})(i));
		if (!rt[o]) {
			let c =
				i !== e
					? e
					: ((d) => {
							let u,
								m,
								v = [{}];
							for (; (u = Cl.exec(d.replace(Al, ""))); )
								u[4]
									? v.shift()
									: u[3]
										? ((m = u[3].replace(Ka, " ").trim()),
											v.unshift((v[0][m] = v[0][m] || {})))
										: (v[0][u[1]] = u[2].replace(Ka, " ").trim());
							return v[0];
						})(e);
			rt[o] = xt(n ? { ["@keyframes " + o]: c } : c, s ? "" : "." + o);
		}
		let l = s && rt.g ? rt.g : null;
		return (
			s && (rt.g = rt[o]),
			((c, d, u, m) => {
				m
					? (d.data = d.data.replace(m, c))
					: d.data.indexOf(c) === -1 && (d.data = u ? c + d.data : d.data + c);
			})(rt[o], t, a, l),
			o
		);
	},
	Tl = (e, t, s) =>
		e.reduce((a, n, i) => {
			let o = t[i];
			if (o && o.call) {
				let l = o(s),
					c = (l && l.props && l.props.className) || (/^go/.test(l) && l);
				o = c
					? "." + c
					: l && typeof l == "object"
						? l.props
							? ""
							: xt(l, "")
						: l === !1
							? ""
							: l;
			}
			return a + n + (o ?? "");
		}, "");
function hr(e) {
	let t = this || {},
		s = e.call ? e(t.p) : e;
	return Ol(
		s.unshift
			? s.raw
				? Tl(s, [].slice.call(arguments, 1), t.p)
				: s.reduce((a, n) => Object.assign(a, n && n.call ? n(t.p) : n), {})
			: s,
		El(t.target),
		t.g,
		t.o,
		t.k,
	);
}
let bi, Kr, ea;
hr.bind({ g: 1 });
let lt = hr.bind({ k: 1 });
function Rl(e, t, s, a) {
	((xt.p = t), (bi = e), (Kr = s), (ea = a));
}
function Nt(e, t) {
	let s = this || {};
	return function () {
		let a = arguments;
		function n(i, o) {
			let l = Object.assign({}, i),
				c = l.className || n.className;
			((s.p = Object.assign({ theme: Kr && Kr() }, l)),
				(s.o = / *go\d+/.test(c)),
				(l.className = hr.apply(s, a) + (c ? " " + c : "")));
			let d = e;
			return (
				e[0] && ((d = l.as || e), delete l.as),
				ea && d[0] && ea(l),
				bi(d, l)
			);
		}
		return n;
	};
}
var Pl = (e) => typeof e == "function",
	er = (e, t) => (Pl(e) ? e(t) : e),
	Dl = (() => {
		let e = 0;
		return () => (++e).toString();
	})(),
	vi = (() => {
		let e;
		return () => {
			if (e === void 0 && typeof window < "u") {
				let t = matchMedia("(prefers-reduced-motion: reduce)");
				e = !t || t.matches;
			}
			return e;
		};
	})(),
	Il = 20,
	Ca = "default",
	ji = (e, t) => {
		let { toastLimit: s } = e.settings;
		switch (t.type) {
			case 0:
				return { ...e, toasts: [t.toast, ...e.toasts].slice(0, s) };
			case 1:
				return {
					...e,
					toasts: e.toasts.map((o) =>
						o.id === t.toast.id ? { ...o, ...t.toast } : o,
					),
				};
			case 2:
				let { toast: a } = t;
				return ji(e, {
					type: e.toasts.find((o) => o.id === a.id) ? 1 : 0,
					toast: a,
				});
			case 3:
				let { toastId: n } = t;
				return {
					...e,
					toasts: e.toasts.map((o) =>
						o.id === n || n === void 0
							? { ...o, dismissed: !0, visible: !1 }
							: o,
					),
				};
			case 4:
				return t.toastId === void 0
					? { ...e, toasts: [] }
					: { ...e, toasts: e.toasts.filter((o) => o.id !== t.toastId) };
			case 5:
				return { ...e, pausedAt: t.time };
			case 6:
				let i = t.time - (e.pausedAt || 0);
				return {
					...e,
					pausedAt: void 0,
					toasts: e.toasts.map((o) => ({
						...o,
						pauseDuration: o.pauseDuration + i,
					})),
				};
		}
	},
	Ws = [],
	wi = { toasts: [], pausedAt: void 0, settings: { toastLimit: Il } },
	Ke = {},
	Ni = (e, t = Ca) => {
		((Ke[t] = ji(Ke[t] || wi, e)),
			Ws.forEach(([s, a]) => {
				s === t && a(Ke[t]);
			}));
	},
	_i = (e) => Object.keys(Ke).forEach((t) => Ni(e, t)),
	Fl = (e) => Object.keys(Ke).find((t) => Ke[t].toasts.some((s) => s.id === e)),
	fr =
		(e = Ca) =>
		(t) => {
			Ni(t, e);
		},
	Ll = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 },
	Ml = (e = {}, t = Ca) => {
		let [s, a] = O.useState(Ke[t] || wi),
			n = O.useRef(Ke[t]);
		O.useEffect(
			() => (
				n.current !== Ke[t] && a(Ke[t]),
				Ws.push([t, a]),
				() => {
					let o = Ws.findIndex(([l]) => l === t);
					o > -1 && Ws.splice(o, 1);
				}
			),
			[t],
		);
		let i = s.toasts.map((o) => {
			var l, c, d;
			return {
				...e,
				...e[o.type],
				...o,
				removeDelay:
					o.removeDelay ||
					((l = e[o.type]) == null ? void 0 : l.removeDelay) ||
					(e == null ? void 0 : e.removeDelay),
				duration:
					o.duration ||
					((c = e[o.type]) == null ? void 0 : c.duration) ||
					(e == null ? void 0 : e.duration) ||
					Ll[o.type],
				style: {
					...e.style,
					...((d = e[o.type]) == null ? void 0 : d.style),
					...o.style,
				},
			};
		});
		return { ...s, toasts: i };
	},
	Vl = (e, t = "blank", s) => ({
		createdAt: Date.now(),
		visible: !0,
		dismissed: !1,
		type: t,
		ariaProps: { role: "status", "aria-live": "polite" },
		message: e,
		pauseDuration: 0,
		...s,
		id: (s == null ? void 0 : s.id) || Dl(),
	}),
	Ts = (e) => (t, s) => {
		let a = Vl(t, e, s);
		return (fr(a.toasterId || Fl(a.id))({ type: 2, toast: a }), a.id);
	},
	Se = (e, t) => Ts("blank")(e, t);
Se.error = Ts("error");
Se.success = Ts("success");
Se.loading = Ts("loading");
Se.custom = Ts("custom");
Se.dismiss = (e, t) => {
	let s = { type: 3, toastId: e };
	t ? fr(t)(s) : _i(s);
};
Se.dismissAll = (e) => Se.dismiss(void 0, e);
Se.remove = (e, t) => {
	let s = { type: 4, toastId: e };
	t ? fr(t)(s) : _i(s);
};
Se.removeAll = (e) => Se.remove(void 0, e);
Se.promise = (e, t, s) => {
	let a = Se.loading(t.loading, { ...s, ...(s == null ? void 0 : s.loading) });
	return (
		typeof e == "function" && (e = e()),
		e
			.then((n) => {
				let i = t.success ? er(t.success, n) : void 0;
				return (
					i
						? Se.success(i, {
								id: a,
								...s,
								...(s == null ? void 0 : s.success),
							})
						: Se.dismiss(a),
					n
				);
			})
			.catch((n) => {
				let i = t.error ? er(t.error, n) : void 0;
				i
					? Se.error(i, { id: a, ...s, ...(s == null ? void 0 : s.error) })
					: Se.dismiss(a);
			}),
		e
	);
};
var $l = 1e3,
	zl = (e, t = "default") => {
		let { toasts: s, pausedAt: a } = Ml(e, t),
			n = O.useRef(new Map()).current,
			i = O.useCallback((m, v = $l) => {
				if (n.has(m)) return;
				let p = setTimeout(() => {
					(n.delete(m), o({ type: 4, toastId: m }));
				}, v);
				n.set(m, p);
			}, []);
		O.useEffect(() => {
			if (a) return;
			let m = Date.now(),
				v = s.map((p) => {
					if (p.duration === 1 / 0) return;
					let g = (p.duration || 0) + p.pauseDuration - (m - p.createdAt);
					if (g < 0) {
						p.visible && Se.dismiss(p.id);
						return;
					}
					return setTimeout(() => Se.dismiss(p.id, t), g);
				});
			return () => {
				v.forEach((p) => p && clearTimeout(p));
			};
		}, [s, a, t]);
		let o = O.useCallback(fr(t), [t]),
			l = O.useCallback(() => {
				o({ type: 5, time: Date.now() });
			}, [o]),
			c = O.useCallback(
				(m, v) => {
					o({ type: 1, toast: { id: m, height: v } });
				},
				[o],
			),
			d = O.useCallback(() => {
				a && o({ type: 6, time: Date.now() });
			}, [a, o]),
			u = O.useCallback(
				(m, v) => {
					let {
							reverseOrder: p = !1,
							gutter: g = 8,
							defaultPosition: j,
						} = v || {},
						f = s.filter(
							(N) => (N.position || j) === (m.position || j) && N.height,
						),
						k = f.findIndex((N) => N.id === m.id),
						b = f.filter((N, _) => _ < k && N.visible).length;
					return f
						.filter((N) => N.visible)
						.slice(...(p ? [b + 1] : [0, b]))
						.reduce((N, _) => N + (_.height || 0) + g, 0);
				},
				[s],
			);
		return (
			O.useEffect(() => {
				s.forEach((m) => {
					if (m.dismissed) i(m.id, m.removeDelay);
					else {
						let v = n.get(m.id);
						v && (clearTimeout(v), n.delete(m.id));
					}
				});
			}, [s, i]),
			{
				toasts: s,
				handlers: {
					updateHeight: c,
					startPause: l,
					endPause: d,
					calculateOffset: u,
				},
			}
		);
	},
	Ul = lt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,
	ql = lt`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
	Bl = lt`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,
	Wl = Nt("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ul} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ql} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e) => e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Bl} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,
	Hl = lt`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,
	Zl = Nt("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e) => e.secondary || "#e0e0e0"};
  border-right-color: ${(e) => e.primary || "#616161"};
  animation: ${Hl} 1s linear infinite;
`,
	Gl = lt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,
	Yl = lt`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,
	Xl = Nt("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Gl} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Yl} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e) => e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,
	Jl = Nt("div")`
  position: absolute;
`,
	Ql = Nt("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,
	Kl = lt`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
	ec = Nt("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Kl} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,
	tc = ({ toast: e }) => {
		let { icon: t, type: s, iconTheme: a } = e;
		return t !== void 0
			? typeof t == "string"
				? O.createElement(ec, null, t)
				: t
			: s === "blank"
				? null
				: O.createElement(
						Ql,
						null,
						O.createElement(Zl, { ...a }),
						s !== "loading" &&
							O.createElement(
								Jl,
								null,
								s === "error"
									? O.createElement(Wl, { ...a })
									: O.createElement(Xl, { ...a }),
							),
					);
	},
	sc = (e) => `
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,
	rc = (e) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`,
	ac = "0%{opacity:0;} 100%{opacity:1;}",
	nc = "0%{opacity:1;} 100%{opacity:0;}",
	ic = Nt("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,
	oc = Nt("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,
	lc = (e, t) => {
		let s = e.includes("top") ? 1 : -1,
			[a, n] = vi() ? [ac, nc] : [sc(s), rc(s)];
		return {
			animation: t
				? `${lt(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
				: `${lt(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
		};
	},
	cc = O.memo(({ toast: e, position: t, style: s, children: a }) => {
		let n = e.height
				? lc(e.position || t || "top-center", e.visible)
				: { opacity: 0 },
			i = O.createElement(tc, { toast: e }),
			o = O.createElement(oc, { ...e.ariaProps }, er(e.message, e));
		return O.createElement(
			ic,
			{ className: e.className, style: { ...n, ...s, ...e.style } },
			typeof a == "function"
				? a({ icon: i, message: o })
				: O.createElement(O.Fragment, null, i, o),
		);
	});
Rl(O.createElement);
var dc = ({
		id: e,
		className: t,
		style: s,
		onHeightUpdate: a,
		children: n,
	}) => {
		let i = O.useCallback(
			(o) => {
				if (o) {
					let l = () => {
						let c = o.getBoundingClientRect().height;
						a(e, c);
					};
					(l(),
						new MutationObserver(l).observe(o, {
							subtree: !0,
							childList: !0,
							characterData: !0,
						}));
				}
			},
			[e, a],
		);
		return O.createElement("div", { ref: i, className: t, style: s }, n);
	},
	uc = (e, t) => {
		let s = e.includes("top"),
			a = s ? { top: 0 } : { bottom: 0 },
			n = e.includes("center")
				? { justifyContent: "center" }
				: e.includes("right")
					? { justifyContent: "flex-end" }
					: {};
		return {
			left: 0,
			right: 0,
			display: "flex",
			position: "absolute",
			transition: vi() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
			transform: `translateY(${t * (s ? 1 : -1)}px)`,
			...a,
			...n,
		};
	},
	mc = hr`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,
	$s = 16,
	hc = ({
		reverseOrder: e,
		position: t = "top-center",
		toastOptions: s,
		gutter: a,
		children: n,
		toasterId: i,
		containerStyle: o,
		containerClassName: l,
	}) => {
		let { toasts: c, handlers: d } = zl(s, i);
		return O.createElement(
			"div",
			{
				"data-rht-toaster": i || "",
				style: {
					position: "fixed",
					zIndex: 9999,
					top: $s,
					left: $s,
					right: $s,
					bottom: $s,
					pointerEvents: "none",
					...o,
				},
				className: l,
				onMouseEnter: d.startPause,
				onMouseLeave: d.endPause,
			},
			c.map((u) => {
				let m = u.position || t,
					v = d.calculateOffset(u, {
						reverseOrder: e,
						gutter: a,
						defaultPosition: t,
					}),
					p = uc(m, v);
				return O.createElement(
					dc,
					{
						id: u.id,
						key: u.id,
						onHeightUpdate: d.updateHeight,
						className: u.visible ? mc : "",
						style: p,
					},
					u.type === "custom"
						? er(u.message, u)
						: n
							? n(u)
							: O.createElement(cc, { toast: u, position: m }),
				);
			}),
		);
	},
	St = Se;
const fc = "modulepreload",
	xc = function (e) {
		return "/" + e;
	},
	en = {},
	le = function (t, s, a) {
		let n = Promise.resolve();
		if (s && s.length > 0) {
			document.getElementsByTagName("link");
			const o = document.querySelector("meta[property=csp-nonce]"),
				l =
					(o == null ? void 0 : o.nonce) ||
					(o == null ? void 0 : o.getAttribute("nonce"));
			n = Promise.allSettled(
				s.map((c) => {
					if (((c = xc(c)), c in en)) return;
					en[c] = !0;
					const d = c.endsWith(".css"),
						u = d ? '[rel="stylesheet"]' : "";
					if (document.querySelector(`link[href="${c}"]${u}`)) return;
					const m = document.createElement("link");
					if (
						((m.rel = d ? "stylesheet" : fc),
						d || (m.as = "script"),
						(m.crossOrigin = ""),
						(m.href = c),
						l && m.setAttribute("nonce", l),
						document.head.appendChild(m),
						d)
					)
						return new Promise((v, p) => {
							(m.addEventListener("load", v),
								m.addEventListener("error", () =>
									p(new Error(`Unable to preload CSS for ${c}`)),
								));
						});
				}),
			);
		}
		function i(o) {
			const l = new Event("vite:preloadError", { cancelable: !0 });
			if (((l.payload = o), window.dispatchEvent(l), !l.defaultPrevented))
				throw o;
		}
		return n.then((o) => {
			for (const l of o || []) l.status === "rejected" && i(l.reason);
			return t().catch(i);
		});
	},
	gc = {},
	tn = (e) => {
		let t;
		const s = new Set(),
			a = (u, m) => {
				const v = typeof u == "function" ? u(t) : u;
				if (!Object.is(v, t)) {
					const p = t;
					((t =
						(m ?? (typeof v != "object" || v === null))
							? v
							: Object.assign({}, t, v)),
						s.forEach((g) => g(t, p)));
				}
			},
			n = () => t,
			c = {
				setState: a,
				getState: n,
				getInitialState: () => d,
				subscribe: (u) => (s.add(u), () => s.delete(u)),
				destroy: () => {
					((gc ? "production" : void 0) !== "production" &&
						console.warn(
							"[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
						),
						s.clear());
				},
			},
			d = (t = e(a, n, c));
		return c;
	},
	pc = (e) => (e ? tn(e) : tn);
var ki = { exports: {} },
	Si = {},
	Ei = { exports: {} },
	Ci = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ss = O;
function yc(e, t) {
	return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var bc = typeof Object.is == "function" ? Object.is : yc,
	vc = ss.useState,
	jc = ss.useEffect,
	wc = ss.useLayoutEffect,
	Nc = ss.useDebugValue;
function _c(e, t) {
	var s = t(),
		a = vc({ inst: { value: s, getSnapshot: t } }),
		n = a[0].inst,
		i = a[1];
	return (
		wc(
			function () {
				((n.value = s), (n.getSnapshot = t), Or(n) && i({ inst: n }));
			},
			[e, s, t],
		),
		jc(
			function () {
				return (
					Or(n) && i({ inst: n }),
					e(function () {
						Or(n) && i({ inst: n });
					})
				);
			},
			[e],
		),
		Nc(s),
		s
	);
}
function Or(e) {
	var t = e.getSnapshot;
	e = e.value;
	try {
		var s = t();
		return !bc(e, s);
	} catch {
		return !0;
	}
}
function kc(e, t) {
	return t();
}
var Sc =
	typeof window > "u" ||
	typeof window.document > "u" ||
	typeof window.document.createElement > "u"
		? kc
		: _c;
Ci.useSyncExternalStore =
	ss.useSyncExternalStore !== void 0 ? ss.useSyncExternalStore : Sc;
Ei.exports = Ci;
var Ec = Ei.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xr = O,
	Cc = Ec;
function Ac(e, t) {
	return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Oc = typeof Object.is == "function" ? Object.is : Ac,
	Tc = Cc.useSyncExternalStore,
	Rc = xr.useRef,
	Pc = xr.useEffect,
	Dc = xr.useMemo,
	Ic = xr.useDebugValue;
Si.useSyncExternalStoreWithSelector = function (e, t, s, a, n) {
	var i = Rc(null);
	if (i.current === null) {
		var o = { hasValue: !1, value: null };
		i.current = o;
	} else o = i.current;
	i = Dc(
		function () {
			function c(p) {
				if (!d) {
					if (((d = !0), (u = p), (p = a(p)), n !== void 0 && o.hasValue)) {
						var g = o.value;
						if (n(g, p)) return (m = g);
					}
					return (m = p);
				}
				if (((g = m), Oc(u, p))) return g;
				var j = a(p);
				return n !== void 0 && n(g, j) ? ((u = p), g) : ((u = p), (m = j));
			}
			var d = !1,
				u,
				m,
				v = s === void 0 ? null : s;
			return [
				function () {
					return c(t());
				},
				v === null
					? void 0
					: function () {
							return c(v());
						},
			];
		},
		[t, s, a, n],
	);
	var l = Tc(e, i[0], i[1]);
	return (
		Pc(
			function () {
				((o.hasValue = !0), (o.value = l));
			},
			[l],
		),
		Ic(l),
		l
	);
};
ki.exports = Si;
var Fc = ki.exports;
const Lc = Zo(Fc),
	Ai = {},
	{ useDebugValue: Mc } = I,
	{ useSyncExternalStoreWithSelector: Vc } = Lc;
let sn = !1;
const $c = (e) => e;
function zc(e, t = $c, s) {
	(Ai ? "production" : void 0) !== "production" &&
		s &&
		!sn &&
		(console.warn(
			"[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
		),
		(sn = !0));
	const a = Vc(
		e.subscribe,
		e.getState,
		e.getServerState || e.getInitialState,
		t,
		s,
	);
	return (Mc(a), a);
}
const Uc = (e) => {
		(Ai ? "production" : void 0) !== "production" &&
			typeof e != "function" &&
			console.warn(
				"[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
			);
		const t = typeof e == "function" ? pc(e) : e,
			s = (a, n) => zc(t, a, n);
		return (Object.assign(s, t), s);
	},
	Oi = (e) => Uc,
	qc = {};
function Bc(e, t) {
	let s;
	try {
		s = e();
	} catch {
		return;
	}
	return {
		getItem: (n) => {
			var i;
			const o = (c) => (c === null ? null : JSON.parse(c, void 0)),
				l = (i = s.getItem(n)) != null ? i : null;
			return l instanceof Promise ? l.then(o) : o(l);
		},
		setItem: (n, i) => s.setItem(n, JSON.stringify(i, void 0)),
		removeItem: (n) => s.removeItem(n),
	};
}
const ks = (e) => (t) => {
		try {
			const s = e(t);
			return s instanceof Promise
				? s
				: {
						then(a) {
							return ks(a)(s);
						},
						catch(a) {
							return this;
						},
					};
		} catch (s) {
			return {
				then(a) {
					return this;
				},
				catch(a) {
					return ks(a)(s);
				},
			};
		}
	},
	Wc = (e, t) => (s, a, n) => {
		let i = {
				getStorage: () => localStorage,
				serialize: JSON.stringify,
				deserialize: JSON.parse,
				partialize: (f) => f,
				version: 0,
				merge: (f, k) => ({ ...k, ...f }),
				...t,
			},
			o = !1;
		const l = new Set(),
			c = new Set();
		let d;
		try {
			d = i.getStorage();
		} catch {}
		if (!d)
			return e(
				(...f) => {
					(console.warn(
						`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`,
					),
						s(...f));
				},
				a,
				n,
			);
		const u = ks(i.serialize),
			m = () => {
				const f = i.partialize({ ...a() });
				let k;
				const b = u({ state: f, version: i.version })
					.then((N) => d.setItem(i.name, N))
					.catch((N) => {
						k = N;
					});
				if (k) throw k;
				return b;
			},
			v = n.setState;
		n.setState = (f, k) => {
			(v(f, k), m());
		};
		const p = e(
			(...f) => {
				(s(...f), m());
			},
			a,
			n,
		);
		let g;
		const j = () => {
			var f;
			if (!d) return;
			((o = !1), l.forEach((b) => b(a())));
			const k =
				((f = i.onRehydrateStorage) == null ? void 0 : f.call(i, a())) ||
				void 0;
			return ks(d.getItem.bind(d))(i.name)
				.then((b) => {
					if (b) return i.deserialize(b);
				})
				.then((b) => {
					if (b)
						if (typeof b.version == "number" && b.version !== i.version) {
							if (i.migrate) return i.migrate(b.state, b.version);
							console.error(
								"State loaded from storage couldn't be migrated since no migrate function was provided",
							);
						} else return b.state;
				})
				.then((b) => {
					var N;
					return ((g = i.merge(b, (N = a()) != null ? N : p)), s(g, !0), m());
				})
				.then(() => {
					(k == null || k(g, void 0), (o = !0), c.forEach((b) => b(g)));
				})
				.catch((b) => {
					k == null || k(void 0, b);
				});
		};
		return (
			(n.persist = {
				setOptions: (f) => {
					((i = { ...i, ...f }), f.getStorage && (d = f.getStorage()));
				},
				clearStorage: () => {
					d == null || d.removeItem(i.name);
				},
				getOptions: () => i,
				rehydrate: () => j(),
				hasHydrated: () => o,
				onHydrate: (f) => (
					l.add(f),
					() => {
						l.delete(f);
					}
				),
				onFinishHydration: (f) => (
					c.add(f),
					() => {
						c.delete(f);
					}
				),
			}),
			j(),
			g || p
		);
	},
	Hc = (e, t) => (s, a, n) => {
		let i = {
				storage: Bc(() => localStorage),
				partialize: (j) => j,
				version: 0,
				merge: (j, f) => ({ ...f, ...j }),
				...t,
			},
			o = !1;
		const l = new Set(),
			c = new Set();
		let d = i.storage;
		if (!d)
			return e(
				(...j) => {
					(console.warn(
						`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`,
					),
						s(...j));
				},
				a,
				n,
			);
		const u = () => {
				const j = i.partialize({ ...a() });
				return d.setItem(i.name, { state: j, version: i.version });
			},
			m = n.setState;
		n.setState = (j, f) => {
			(m(j, f), u());
		};
		const v = e(
			(...j) => {
				(s(...j), u());
			},
			a,
			n,
		);
		n.getInitialState = () => v;
		let p;
		const g = () => {
			var j, f;
			if (!d) return;
			((o = !1),
				l.forEach((b) => {
					var N;
					return b((N = a()) != null ? N : v);
				}));
			const k =
				((f = i.onRehydrateStorage) == null
					? void 0
					: f.call(i, (j = a()) != null ? j : v)) || void 0;
			return ks(d.getItem.bind(d))(i.name)
				.then((b) => {
					if (b)
						if (typeof b.version == "number" && b.version !== i.version) {
							if (i.migrate) return [!0, i.migrate(b.state, b.version)];
							console.error(
								"State loaded from storage couldn't be migrated since no migrate function was provided",
							);
						} else return [!1, b.state];
					return [!1, void 0];
				})
				.then((b) => {
					var N;
					const [_, S] = b;
					if (((p = i.merge(S, (N = a()) != null ? N : v)), s(p, !0), _))
						return u();
				})
				.then(() => {
					(k == null || k(p, void 0),
						(p = a()),
						(o = !0),
						c.forEach((b) => b(p)));
				})
				.catch((b) => {
					k == null || k(void 0, b);
				});
		};
		return (
			(n.persist = {
				setOptions: (j) => {
					((i = { ...i, ...j }), j.storage && (d = j.storage));
				},
				clearStorage: () => {
					d == null || d.removeItem(i.name);
				},
				getOptions: () => i,
				rehydrate: () => g(),
				hasHydrated: () => o,
				onHydrate: (j) => (
					l.add(j),
					() => {
						l.delete(j);
					}
				),
				onFinishHydration: (j) => (
					c.add(j),
					() => {
						c.delete(j);
					}
				),
			}),
			i.skipHydration || g(),
			p || v
		);
	},
	Zc = (e, t) =>
		"getStorage" in t || "serialize" in t || "deserialize" in t
			? ((qc ? "production" : void 0) !== "production" &&
					console.warn(
						"[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.",
					),
				Wc(e, t))
			: Hc(e, t),
	Ti = Zc;
var ht = ((e) => ((e.ADMIN = "admin"), (e.CLIENT = "client"), e))(ht || {}),
	js = ((e) => (
		(e.INDIVIDUAL = "individual"),
		(e.IP = "ip"),
		(e.OOO = "ooo"),
		e
	))(js || {}),
	nt = ((e) => (
		(e.PENDING = "pending"),
		(e.APPROVED = "approved"),
		(e.REJECTED = "rejected"),
		(e.BLOCKED = "blocked"),
		e
	))(nt || {}),
	ye = ((e) => (
		(e.NEW = "new"),
		(e.CONFIRMED = "confirmed"),
		(e.ASSEMBLING = "assembling"),
		(e.ASSEMBLED = "assembled"),
		(e.DELIVERING = "delivering"),
		(e.DELIVERED = "delivered"),
		(e.CANCELLED = "cancelled"),
		e
	))(ye || {}),
	Ot = ((e) => (
		(e.CASH = "cash"),
		(e.BANK_TRANSFER = "bank_transfer"),
		(e.CARD_ON_DELIVERY = "card_on_delivery"),
		(e.PREPAYMENT = "prepayment"),
		e
	))(Ot || {}),
	Gc = ((e) => (
		(e.PENDING = "pending"),
		(e.PAID = "paid"),
		(e.PARTIAL = "partial"),
		(e.OVERDUE = "overdue"),
		e
	))(Gc || {}),
	Xt = ((e) => (
		(e.URGENT = "urgent"),
		(e.NORMAL = "normal"),
		(e.FLEXIBLE = "flexible"),
		e
	))(Xt || {}),
	Yc = ((e) => (
		(e.RENT = "rent"),
		(e.TRANSPORT = "transport"),
		(e.PACKAGING = "packaging"),
		(e.SALARY = "salary"),
		(e.COMMUNICATION = "communication"),
		(e.TAXES = "taxes"),
		(e.OTHER = "other"),
		e
	))(Yc || {}),
	Xc = ((e) => (
		(e.DECLARATION = "declaration"),
		(e.CERTIFICATE = "certificate"),
		(e.VET_CERT = "vet_cert"),
		(e.QUALITY_CERT = "quality_cert"),
		e
	))(Xc || {}),
	Xe = ((e) => (
		(e.INVOICE = "invoice"),
		(e.TORG12 = "torg12"),
		(e.UPD = "upd"),
		(e.ACT = "act"),
		(e.CONTRACT = "contract"),
		e
	))(Xe || {}),
	Jc = ((e) => (
		(e.KG = "kg"),
		(e.PIECE = "piece"),
		(e.LITER = "liter"),
		(e.BOX = "box"),
		(e.BAG = "bag"),
		e
	))(Jc || {});
function Ri(e, t) {
	return function () {
		return e.apply(t, arguments);
	};
}
const { toString: Qc } = Object.prototype,
	{ getPrototypeOf: Aa } = Object,
	{ iterator: gr, toStringTag: Pi } = Symbol,
	pr = ((e) => (t) => {
		const s = Qc.call(t);
		return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
	})(Object.create(null)),
	Ge = (e) => ((e = e.toLowerCase()), (t) => pr(t) === e),
	yr = (e) => (t) => typeof t === e,
	{ isArray: ms } = Array,
	rs = yr("undefined");
function Rs(e) {
	return (
		e !== null &&
		!rs(e) &&
		e.constructor !== null &&
		!rs(e.constructor) &&
		Ie(e.constructor.isBuffer) &&
		e.constructor.isBuffer(e)
	);
}
const Di = Ge("ArrayBuffer");
function Kc(e) {
	let t;
	return (
		typeof ArrayBuffer < "u" && ArrayBuffer.isView
			? (t = ArrayBuffer.isView(e))
			: (t = e && e.buffer && Di(e.buffer)),
		t
	);
}
const ed = yr("string"),
	Ie = yr("function"),
	Ii = yr("number"),
	Ps = (e) => e !== null && typeof e == "object",
	td = (e) => e === !0 || e === !1,
	Hs = (e) => {
		if (pr(e) !== "object") return !1;
		const t = Aa(e);
		return (
			(t === null ||
				t === Object.prototype ||
				Object.getPrototypeOf(t) === null) &&
			!(Pi in e) &&
			!(gr in e)
		);
	},
	sd = (e) => {
		if (!Ps(e) || Rs(e)) return !1;
		try {
			return (
				Object.keys(e).length === 0 &&
				Object.getPrototypeOf(e) === Object.prototype
			);
		} catch {
			return !1;
		}
	},
	rd = Ge("Date"),
	ad = Ge("File"),
	nd = (e) => !!(e && typeof e.uri < "u"),
	id = (e) => e && typeof e.getParts < "u",
	od = Ge("Blob"),
	ld = Ge("FileList"),
	cd = (e) => Ps(e) && Ie(e.pipe);
function dd() {
	return typeof globalThis < "u"
		? globalThis
		: typeof self < "u"
			? self
			: typeof window < "u"
				? window
				: typeof global < "u"
					? global
					: {};
}
const rn = dd(),
	an = typeof rn.FormData < "u" ? rn.FormData : void 0,
	ud = (e) => {
		let t;
		return (
			e &&
			((an && e instanceof an) ||
				(Ie(e.append) &&
					((t = pr(e)) === "formdata" ||
						(t === "object" &&
							Ie(e.toString) &&
							e.toString() === "[object FormData]"))))
		);
	},
	md = Ge("URLSearchParams"),
	[hd, fd, xd, gd] = ["ReadableStream", "Request", "Response", "Headers"].map(
		Ge,
	),
	pd = (e) =>
		e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ds(e, t, { allOwnKeys: s = !1 } = {}) {
	if (e === null || typeof e > "u") return;
	let a, n;
	if ((typeof e != "object" && (e = [e]), ms(e)))
		for (a = 0, n = e.length; a < n; a++) t.call(null, e[a], a, e);
	else {
		if (Rs(e)) return;
		const i = s ? Object.getOwnPropertyNames(e) : Object.keys(e),
			o = i.length;
		let l;
		for (a = 0; a < o; a++) ((l = i[a]), t.call(null, e[l], l, e));
	}
}
function Fi(e, t) {
	if (Rs(e)) return null;
	t = t.toLowerCase();
	const s = Object.keys(e);
	let a = s.length,
		n;
	for (; a-- > 0; ) if (((n = s[a]), t === n.toLowerCase())) return n;
	return null;
}
const Tt =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
				? self
				: typeof window < "u"
					? window
					: global,
	Li = (e) => !rs(e) && e !== Tt;
function ta() {
	const { caseless: e, skipUndefined: t } = (Li(this) && this) || {},
		s = {},
		a = (n, i) => {
			if (i === "__proto__" || i === "constructor" || i === "prototype") return;
			const o = (e && Fi(s, i)) || i;
			Hs(s[o]) && Hs(n)
				? (s[o] = ta(s[o], n))
				: Hs(n)
					? (s[o] = ta({}, n))
					: ms(n)
						? (s[o] = n.slice())
						: (!t || !rs(n)) && (s[o] = n);
		};
	for (let n = 0, i = arguments.length; n < i; n++)
		arguments[n] && Ds(arguments[n], a);
	return s;
}
const yd = (e, t, s, { allOwnKeys: a } = {}) => (
		Ds(
			t,
			(n, i) => {
				s && Ie(n)
					? Object.defineProperty(e, i, {
							value: Ri(n, s),
							writable: !0,
							enumerable: !0,
							configurable: !0,
						})
					: Object.defineProperty(e, i, {
							value: n,
							writable: !0,
							enumerable: !0,
							configurable: !0,
						});
			},
			{ allOwnKeys: a },
		),
		e
	),
	bd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
	vd = (e, t, s, a) => {
		((e.prototype = Object.create(t.prototype, a)),
			Object.defineProperty(e.prototype, "constructor", {
				value: e,
				writable: !0,
				enumerable: !1,
				configurable: !0,
			}),
			Object.defineProperty(e, "super", { value: t.prototype }),
			s && Object.assign(e.prototype, s));
	},
	jd = (e, t, s, a) => {
		let n, i, o;
		const l = {};
		if (((t = t || {}), e == null)) return t;
		do {
			for (n = Object.getOwnPropertyNames(e), i = n.length; i-- > 0; )
				((o = n[i]),
					(!a || a(o, e, t)) && !l[o] && ((t[o] = e[o]), (l[o] = !0)));
			e = s !== !1 && Aa(e);
		} while (e && (!s || s(e, t)) && e !== Object.prototype);
		return t;
	},
	wd = (e, t, s) => {
		((e = String(e)),
			(s === void 0 || s > e.length) && (s = e.length),
			(s -= t.length));
		const a = e.indexOf(t, s);
		return a !== -1 && a === s;
	},
	Nd = (e) => {
		if (!e) return null;
		if (ms(e)) return e;
		let t = e.length;
		if (!Ii(t)) return null;
		const s = new Array(t);
		for (; t-- > 0; ) s[t] = e[t];
		return s;
	},
	_d = (
		(e) => (t) =>
			e && t instanceof e
	)(typeof Uint8Array < "u" && Aa(Uint8Array)),
	kd = (e, t) => {
		const a = (e && e[gr]).call(e);
		let n;
		for (; (n = a.next()) && !n.done; ) {
			const i = n.value;
			t.call(e, i[0], i[1]);
		}
	},
	Sd = (e, t) => {
		let s;
		const a = [];
		for (; (s = e.exec(t)) !== null; ) a.push(s);
		return a;
	},
	Ed = Ge("HTMLFormElement"),
	Cd = (e) =>
		e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (s, a, n) {
			return a.toUpperCase() + n;
		}),
	nn = (
		({ hasOwnProperty: e }) =>
		(t, s) =>
			e.call(t, s)
	)(Object.prototype),
	Ad = Ge("RegExp"),
	Mi = (e, t) => {
		const s = Object.getOwnPropertyDescriptors(e),
			a = {};
		(Ds(s, (n, i) => {
			let o;
			(o = t(n, i, e)) !== !1 && (a[i] = o || n);
		}),
			Object.defineProperties(e, a));
	},
	Od = (e) => {
		Mi(e, (t, s) => {
			if (Ie(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
				return !1;
			const a = e[s];
			if (Ie(a)) {
				if (((t.enumerable = !1), "writable" in t)) {
					t.writable = !1;
					return;
				}
				t.set ||
					(t.set = () => {
						throw Error("Can not rewrite read-only method '" + s + "'");
					});
			}
		});
	},
	Td = (e, t) => {
		const s = {},
			a = (n) => {
				n.forEach((i) => {
					s[i] = !0;
				});
			};
		return (ms(e) ? a(e) : a(String(e).split(t)), s);
	},
	Rd = () => {},
	Pd = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Dd(e) {
	return !!(e && Ie(e.append) && e[Pi] === "FormData" && e[gr]);
}
const Id = (e) => {
		const t = new Array(10),
			s = (a, n) => {
				if (Ps(a)) {
					if (t.indexOf(a) >= 0) return;
					if (Rs(a)) return a;
					if (!("toJSON" in a)) {
						t[n] = a;
						const i = ms(a) ? [] : {};
						return (
							Ds(a, (o, l) => {
								const c = s(o, n + 1);
								!rs(c) && (i[l] = c);
							}),
							(t[n] = void 0),
							i
						);
					}
				}
				return a;
			};
		return s(e, 0);
	},
	Fd = Ge("AsyncFunction"),
	Ld = (e) => e && (Ps(e) || Ie(e)) && Ie(e.then) && Ie(e.catch),
	Vi = ((e, t) =>
		e
			? setImmediate
			: t
				? ((s, a) => (
						Tt.addEventListener(
							"message",
							({ source: n, data: i }) => {
								n === Tt && i === s && a.length && a.shift()();
							},
							!1,
						),
						(n) => {
							(a.push(n), Tt.postMessage(s, "*"));
						}
					))(`axios@${Math.random()}`, [])
				: (s) => setTimeout(s))(
		typeof setImmediate == "function",
		Ie(Tt.postMessage),
	),
	Md =
		typeof queueMicrotask < "u"
			? queueMicrotask.bind(Tt)
			: (typeof process < "u" && process.nextTick) || Vi,
	Vd = (e) => e != null && Ie(e[gr]),
	y = {
		isArray: ms,
		isArrayBuffer: Di,
		isBuffer: Rs,
		isFormData: ud,
		isArrayBufferView: Kc,
		isString: ed,
		isNumber: Ii,
		isBoolean: td,
		isObject: Ps,
		isPlainObject: Hs,
		isEmptyObject: sd,
		isReadableStream: hd,
		isRequest: fd,
		isResponse: xd,
		isHeaders: gd,
		isUndefined: rs,
		isDate: rd,
		isFile: ad,
		isReactNativeBlob: nd,
		isReactNative: id,
		isBlob: od,
		isRegExp: Ad,
		isFunction: Ie,
		isStream: cd,
		isURLSearchParams: md,
		isTypedArray: _d,
		isFileList: ld,
		forEach: Ds,
		merge: ta,
		extend: yd,
		trim: pd,
		stripBOM: bd,
		inherits: vd,
		toFlatObject: jd,
		kindOf: pr,
		kindOfTest: Ge,
		endsWith: wd,
		toArray: Nd,
		forEachEntry: kd,
		matchAll: Sd,
		isHTMLForm: Ed,
		hasOwnProperty: nn,
		hasOwnProp: nn,
		reduceDescriptors: Mi,
		freezeMethods: Od,
		toObjectSet: Td,
		toCamelCase: Cd,
		noop: Rd,
		toFiniteNumber: Pd,
		findKey: Fi,
		global: Tt,
		isContextDefined: Li,
		isSpecCompliantForm: Dd,
		toJSONObject: Id,
		isAsyncFn: Fd,
		isThenable: Ld,
		setImmediate: Vi,
		asap: Md,
		isIterable: Vd,
	};
let q = class $i extends Error {
	static from(t, s, a, n, i, o) {
		const l = new $i(t.message, s || t.code, a, n, i);
		return (
			(l.cause = t),
			(l.name = t.name),
			t.status != null && l.status == null && (l.status = t.status),
			o && Object.assign(l, o),
			l
		);
	}
	constructor(t, s, a, n, i) {
		(super(t),
			Object.defineProperty(this, "message", {
				value: t,
				enumerable: !0,
				writable: !0,
				configurable: !0,
			}),
			(this.name = "AxiosError"),
			(this.isAxiosError = !0),
			s && (this.code = s),
			a && (this.config = a),
			n && (this.request = n),
			i && ((this.response = i), (this.status = i.status)));
	}
	toJSON() {
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: y.toJSONObject(this.config),
			code: this.code,
			status: this.status,
		};
	}
};
q.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
q.ERR_BAD_OPTION = "ERR_BAD_OPTION";
q.ECONNABORTED = "ECONNABORTED";
q.ETIMEDOUT = "ETIMEDOUT";
q.ERR_NETWORK = "ERR_NETWORK";
q.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
q.ERR_DEPRECATED = "ERR_DEPRECATED";
q.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
q.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
q.ERR_CANCELED = "ERR_CANCELED";
q.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
q.ERR_INVALID_URL = "ERR_INVALID_URL";
const $d = null;
function sa(e) {
	return y.isPlainObject(e) || y.isArray(e);
}
function zi(e) {
	return y.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Tr(e, t, s) {
	return e
		? e
				.concat(t)
				.map(function (n, i) {
					return ((n = zi(n)), !s && i ? "[" + n + "]" : n);
				})
				.join(s ? "." : "")
		: t;
}
function zd(e) {
	return y.isArray(e) && !e.some(sa);
}
const Ud = y.toFlatObject(y, {}, null, function (t) {
	return /^is[A-Z]/.test(t);
});
function br(e, t, s) {
	if (!y.isObject(e)) throw new TypeError("target must be an object");
	((t = t || new FormData()),
		(s = y.toFlatObject(
			s,
			{ metaTokens: !0, dots: !1, indexes: !1 },
			!1,
			function (j, f) {
				return !y.isUndefined(f[j]);
			},
		)));
	const a = s.metaTokens,
		n = s.visitor || u,
		i = s.dots,
		o = s.indexes,
		c = (s.Blob || (typeof Blob < "u" && Blob)) && y.isSpecCompliantForm(t);
	if (!y.isFunction(n)) throw new TypeError("visitor must be a function");
	function d(g) {
		if (g === null) return "";
		if (y.isDate(g)) return g.toISOString();
		if (y.isBoolean(g)) return g.toString();
		if (!c && y.isBlob(g))
			throw new q("Blob is not supported. Use a Buffer instead.");
		return y.isArrayBuffer(g) || y.isTypedArray(g)
			? c && typeof Blob == "function"
				? new Blob([g])
				: Buffer.from(g)
			: g;
	}
	function u(g, j, f) {
		let k = g;
		if (y.isReactNative(t) && y.isReactNativeBlob(g))
			return (t.append(Tr(f, j, i), d(g)), !1);
		if (g && !f && typeof g == "object") {
			if (y.endsWith(j, "{}"))
				((j = a ? j : j.slice(0, -2)), (g = JSON.stringify(g)));
			else if (
				(y.isArray(g) && zd(g)) ||
				((y.isFileList(g) || y.endsWith(j, "[]")) && (k = y.toArray(g)))
			)
				return (
					(j = zi(j)),
					k.forEach(function (N, _) {
						!(y.isUndefined(N) || N === null) &&
							t.append(
								o === !0 ? Tr([j], _, i) : o === null ? j : j + "[]",
								d(N),
							);
					}),
					!1
				);
		}
		return sa(g) ? !0 : (t.append(Tr(f, j, i), d(g)), !1);
	}
	const m = [],
		v = Object.assign(Ud, {
			defaultVisitor: u,
			convertValue: d,
			isVisitable: sa,
		});
	function p(g, j) {
		if (!y.isUndefined(g)) {
			if (m.indexOf(g) !== -1)
				throw Error("Circular reference detected in " + j.join("."));
			(m.push(g),
				y.forEach(g, function (k, b) {
					(!(y.isUndefined(k) || k === null) &&
						n.call(t, k, y.isString(b) ? b.trim() : b, j, v)) === !0 &&
						p(k, j ? j.concat(b) : [b]);
				}),
				m.pop());
		}
	}
	if (!y.isObject(e)) throw new TypeError("data must be an object");
	return (p(e), t);
}
function on(e) {
	const t = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+",
		"%00": "\0",
	};
	return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (a) {
		return t[a];
	});
}
function Oa(e, t) {
	((this._pairs = []), e && br(e, this, t));
}
const Ui = Oa.prototype;
Ui.append = function (t, s) {
	this._pairs.push([t, s]);
};
Ui.toString = function (t) {
	const s = t
		? function (a) {
				return t.call(this, a, on);
			}
		: on;
	return this._pairs
		.map(function (n) {
			return s(n[0]) + "=" + s(n[1]);
		}, "")
		.join("&");
};
function qd(e) {
	return encodeURIComponent(e)
		.replace(/%3A/gi, ":")
		.replace(/%24/g, "$")
		.replace(/%2C/gi, ",")
		.replace(/%20/g, "+");
}
function qi(e, t, s) {
	if (!t) return e;
	const a = (s && s.encode) || qd,
		n = y.isFunction(s) ? { serialize: s } : s,
		i = n && n.serialize;
	let o;
	if (
		(i
			? (o = i(t, n))
			: (o = y.isURLSearchParams(t) ? t.toString() : new Oa(t, n).toString(a)),
		o)
	) {
		const l = e.indexOf("#");
		(l !== -1 && (e = e.slice(0, l)),
			(e += (e.indexOf("?") === -1 ? "?" : "&") + o));
	}
	return e;
}
class ln {
	constructor() {
		this.handlers = [];
	}
	use(t, s, a) {
		return (
			this.handlers.push({
				fulfilled: t,
				rejected: s,
				synchronous: a ? a.synchronous : !1,
				runWhen: a ? a.runWhen : null,
			}),
			this.handlers.length - 1
		);
	}
	eject(t) {
		this.handlers[t] && (this.handlers[t] = null);
	}
	clear() {
		this.handlers && (this.handlers = []);
	}
	forEach(t) {
		y.forEach(this.handlers, function (a) {
			a !== null && t(a);
		});
	}
}
const Ta = {
		silentJSONParsing: !0,
		forcedJSONParsing: !0,
		clarifyTimeoutError: !1,
		legacyInterceptorReqResOrdering: !0,
	},
	Bd = typeof URLSearchParams < "u" ? URLSearchParams : Oa,
	Wd = typeof FormData < "u" ? FormData : null,
	Hd = typeof Blob < "u" ? Blob : null,
	Zd = {
		isBrowser: !0,
		classes: { URLSearchParams: Bd, FormData: Wd, Blob: Hd },
		protocols: ["http", "https", "file", "blob", "url", "data"],
	},
	Ra = typeof window < "u" && typeof document < "u",
	ra = (typeof navigator == "object" && navigator) || void 0,
	Gd =
		Ra &&
		(!ra || ["ReactNative", "NativeScript", "NS"].indexOf(ra.product) < 0),
	Yd =
		typeof WorkerGlobalScope < "u" &&
		self instanceof WorkerGlobalScope &&
		typeof self.importScripts == "function",
	Xd = (Ra && window.location.href) || "http://localhost",
	Jd = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				hasBrowserEnv: Ra,
				hasStandardBrowserEnv: Gd,
				hasStandardBrowserWebWorkerEnv: Yd,
				navigator: ra,
				origin: Xd,
			},
			Symbol.toStringTag,
			{ value: "Module" },
		),
	),
	Oe = { ...Jd, ...Zd };
function Qd(e, t) {
	return br(e, new Oe.classes.URLSearchParams(), {
		visitor: function (s, a, n, i) {
			return Oe.isNode && y.isBuffer(s)
				? (this.append(a, s.toString("base64")), !1)
				: i.defaultVisitor.apply(this, arguments);
		},
		...t,
	});
}
function Kd(e) {
	return y
		.matchAll(/\w+|\[(\w*)]/g, e)
		.map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function eu(e) {
	const t = {},
		s = Object.keys(e);
	let a;
	const n = s.length;
	let i;
	for (a = 0; a < n; a++) ((i = s[a]), (t[i] = e[i]));
	return t;
}
function Bi(e) {
	function t(s, a, n, i) {
		let o = s[i++];
		if (o === "__proto__") return !0;
		const l = Number.isFinite(+o),
			c = i >= s.length;
		return (
			(o = !o && y.isArray(n) ? n.length : o),
			c
				? (y.hasOwnProp(n, o) ? (n[o] = [n[o], a]) : (n[o] = a), !l)
				: ((!n[o] || !y.isObject(n[o])) && (n[o] = []),
					t(s, a, n[o], i) && y.isArray(n[o]) && (n[o] = eu(n[o])),
					!l)
		);
	}
	if (y.isFormData(e) && y.isFunction(e.entries)) {
		const s = {};
		return (
			y.forEachEntry(e, (a, n) => {
				t(Kd(a), n, s, 0);
			}),
			s
		);
	}
	return null;
}
function tu(e, t, s) {
	if (y.isString(e))
		try {
			return ((t || JSON.parse)(e), y.trim(e));
		} catch (a) {
			if (a.name !== "SyntaxError") throw a;
		}
	return (s || JSON.stringify)(e);
}
const Is = {
	transitional: Ta,
	adapter: ["xhr", "http", "fetch"],
	transformRequest: [
		function (t, s) {
			const a = s.getContentType() || "",
				n = a.indexOf("application/json") > -1,
				i = y.isObject(t);
			if ((i && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t)))
				return n ? JSON.stringify(Bi(t)) : t;
			if (
				y.isArrayBuffer(t) ||
				y.isBuffer(t) ||
				y.isStream(t) ||
				y.isFile(t) ||
				y.isBlob(t) ||
				y.isReadableStream(t)
			)
				return t;
			if (y.isArrayBufferView(t)) return t.buffer;
			if (y.isURLSearchParams(t))
				return (
					s.setContentType(
						"application/x-www-form-urlencoded;charset=utf-8",
						!1,
					),
					t.toString()
				);
			let l;
			if (i) {
				if (a.indexOf("application/x-www-form-urlencoded") > -1)
					return Qd(t, this.formSerializer).toString();
				if ((l = y.isFileList(t)) || a.indexOf("multipart/form-data") > -1) {
					const c = this.env && this.env.FormData;
					return br(
						l ? { "files[]": t } : t,
						c && new c(),
						this.formSerializer,
					);
				}
			}
			return i || n ? (s.setContentType("application/json", !1), tu(t)) : t;
		},
	],
	transformResponse: [
		function (t) {
			const s = this.transitional || Is.transitional,
				a = s && s.forcedJSONParsing,
				n = this.responseType === "json";
			if (y.isResponse(t) || y.isReadableStream(t)) return t;
			if (t && y.isString(t) && ((a && !this.responseType) || n)) {
				const o = !(s && s.silentJSONParsing) && n;
				try {
					return JSON.parse(t, this.parseReviver);
				} catch (l) {
					if (o)
						throw l.name === "SyntaxError"
							? q.from(l, q.ERR_BAD_RESPONSE, this, null, this.response)
							: l;
				}
			}
			return t;
		},
	],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: { FormData: Oe.classes.FormData, Blob: Oe.classes.Blob },
	validateStatus: function (t) {
		return t >= 200 && t < 300;
	},
	headers: {
		common: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": void 0,
		},
	},
};
y.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
	Is.headers[e] = {};
});
const su = y.toObjectSet([
		"age",
		"authorization",
		"content-length",
		"content-type",
		"etag",
		"expires",
		"from",
		"host",
		"if-modified-since",
		"if-unmodified-since",
		"last-modified",
		"location",
		"max-forwards",
		"proxy-authorization",
		"referer",
		"retry-after",
		"user-agent",
	]),
	ru = (e) => {
		const t = {};
		let s, a, n;
		return (
			e &&
				e
					.split(
						`
`,
					)
					.forEach(function (o) {
						((n = o.indexOf(":")),
							(s = o.substring(0, n).trim().toLowerCase()),
							(a = o.substring(n + 1).trim()),
							!(!s || (t[s] && su[s])) &&
								(s === "set-cookie"
									? t[s]
										? t[s].push(a)
										: (t[s] = [a])
									: (t[s] = t[s] ? t[s] + ", " + a : a)));
					}),
			t
		);
	},
	cn = Symbol("internals");
function xs(e) {
	return e && String(e).trim().toLowerCase();
}
function Zs(e) {
	return e === !1 || e == null ? e : y.isArray(e) ? e.map(Zs) : String(e);
}
function au(e) {
	const t = Object.create(null),
		s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let a;
	for (; (a = s.exec(e)); ) t[a[1]] = a[2];
	return t;
}
const nu = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Rr(e, t, s, a, n) {
	if (y.isFunction(a)) return a.call(this, t, s);
	if ((n && (t = s), !!y.isString(t))) {
		if (y.isString(a)) return t.indexOf(a) !== -1;
		if (y.isRegExp(a)) return a.test(t);
	}
}
function iu(e) {
	return e
		.trim()
		.toLowerCase()
		.replace(/([a-z\d])(\w*)/g, (t, s, a) => s.toUpperCase() + a);
}
function ou(e, t) {
	const s = y.toCamelCase(" " + t);
	["get", "set", "has"].forEach((a) => {
		Object.defineProperty(e, a + s, {
			value: function (n, i, o) {
				return this[a].call(this, t, n, i, o);
			},
			configurable: !0,
		});
	});
}
let Fe = class {
	constructor(t) {
		t && this.set(t);
	}
	set(t, s, a) {
		const n = this;
		function i(l, c, d) {
			const u = xs(c);
			if (!u) throw new Error("header name must be a non-empty string");
			const m = y.findKey(n, u);
			(!m || n[m] === void 0 || d === !0 || (d === void 0 && n[m] !== !1)) &&
				(n[m || c] = Zs(l));
		}
		const o = (l, c) => y.forEach(l, (d, u) => i(d, u, c));
		if (y.isPlainObject(t) || t instanceof this.constructor) o(t, s);
		else if (y.isString(t) && (t = t.trim()) && !nu(t)) o(ru(t), s);
		else if (y.isObject(t) && y.isIterable(t)) {
			let l = {},
				c,
				d;
			for (const u of t) {
				if (!y.isArray(u))
					throw TypeError("Object iterator must return a key-value pair");
				l[(d = u[0])] = (c = l[d])
					? y.isArray(c)
						? [...c, u[1]]
						: [c, u[1]]
					: u[1];
			}
			o(l, s);
		} else t != null && i(s, t, a);
		return this;
	}
	get(t, s) {
		if (((t = xs(t)), t)) {
			const a = y.findKey(this, t);
			if (a) {
				const n = this[a];
				if (!s) return n;
				if (s === !0) return au(n);
				if (y.isFunction(s)) return s.call(this, n, a);
				if (y.isRegExp(s)) return s.exec(n);
				throw new TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(t, s) {
		if (((t = xs(t)), t)) {
			const a = y.findKey(this, t);
			return !!(a && this[a] !== void 0 && (!s || Rr(this, this[a], a, s)));
		}
		return !1;
	}
	delete(t, s) {
		const a = this;
		let n = !1;
		function i(o) {
			if (((o = xs(o)), o)) {
				const l = y.findKey(a, o);
				l && (!s || Rr(a, a[l], l, s)) && (delete a[l], (n = !0));
			}
		}
		return (y.isArray(t) ? t.forEach(i) : i(t), n);
	}
	clear(t) {
		const s = Object.keys(this);
		let a = s.length,
			n = !1;
		for (; a--; ) {
			const i = s[a];
			(!t || Rr(this, this[i], i, t, !0)) && (delete this[i], (n = !0));
		}
		return n;
	}
	normalize(t) {
		const s = this,
			a = {};
		return (
			y.forEach(this, (n, i) => {
				const o = y.findKey(a, i);
				if (o) {
					((s[o] = Zs(n)), delete s[i]);
					return;
				}
				const l = t ? iu(i) : String(i).trim();
				(l !== i && delete s[i], (s[l] = Zs(n)), (a[l] = !0));
			}),
			this
		);
	}
	concat(...t) {
		return this.constructor.concat(this, ...t);
	}
	toJSON(t) {
		const s = Object.create(null);
		return (
			y.forEach(this, (a, n) => {
				a != null && a !== !1 && (s[n] = t && y.isArray(a) ? a.join(", ") : a);
			}),
			s
		);
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([t, s]) => t + ": " + s).join(`
`);
	}
	getSetCookie() {
		return this.get("set-cookie") || [];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(t) {
		return t instanceof this ? t : new this(t);
	}
	static concat(t, ...s) {
		const a = new this(t);
		return (s.forEach((n) => a.set(n)), a);
	}
	static accessor(t) {
		const a = (this[cn] = this[cn] = { accessors: {} }).accessors,
			n = this.prototype;
		function i(o) {
			const l = xs(o);
			a[l] || (ou(n, o), (a[l] = !0));
		}
		return (y.isArray(t) ? t.forEach(i) : i(t), this);
	}
};
Fe.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization",
]);
y.reduceDescriptors(Fe.prototype, ({ value: e }, t) => {
	let s = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(a) {
			this[s] = a;
		},
	};
});
y.freezeMethods(Fe);
function Pr(e, t) {
	const s = this || Is,
		a = t || s,
		n = Fe.from(a.headers);
	let i = a.data;
	return (
		y.forEach(e, function (l) {
			i = l.call(s, i, n.normalize(), t ? t.status : void 0);
		}),
		n.normalize(),
		i
	);
}
function Wi(e) {
	return !!(e && e.__CANCEL__);
}
let Fs = class extends q {
	constructor(t, s, a) {
		(super(t ?? "canceled", q.ERR_CANCELED, s, a),
			(this.name = "CanceledError"),
			(this.__CANCEL__ = !0));
	}
};
function Hi(e, t, s) {
	const a = s.config.validateStatus;
	!s.status || !a || a(s.status)
		? e(s)
		: t(
				new q(
					"Request failed with status code " + s.status,
					[q.ERR_BAD_REQUEST, q.ERR_BAD_RESPONSE][
						Math.floor(s.status / 100) - 4
					],
					s.config,
					s.request,
					s,
				),
			);
}
function lu(e) {
	const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
	return (t && t[1]) || "";
}
function cu(e, t) {
	e = e || 10;
	const s = new Array(e),
		a = new Array(e);
	let n = 0,
		i = 0,
		o;
	return (
		(t = t !== void 0 ? t : 1e3),
		function (c) {
			const d = Date.now(),
				u = a[i];
			(o || (o = d), (s[n] = c), (a[n] = d));
			let m = i,
				v = 0;
			for (; m !== n; ) ((v += s[m++]), (m = m % e));
			if (((n = (n + 1) % e), n === i && (i = (i + 1) % e), d - o < t)) return;
			const p = u && d - u;
			return p ? Math.round((v * 1e3) / p) : void 0;
		}
	);
}
function du(e, t) {
	let s = 0,
		a = 1e3 / t,
		n,
		i;
	const o = (d, u = Date.now()) => {
		((s = u), (n = null), i && (clearTimeout(i), (i = null)), e(...d));
	};
	return [
		(...d) => {
			const u = Date.now(),
				m = u - s;
			m >= a
				? o(d, u)
				: ((n = d),
					i ||
						(i = setTimeout(() => {
							((i = null), o(n));
						}, a - m)));
		},
		() => n && o(n),
	];
}
const tr = (e, t, s = 3) => {
		let a = 0;
		const n = cu(50, 250);
		return du((i) => {
			const o = i.loaded,
				l = i.lengthComputable ? i.total : void 0,
				c = o - a,
				d = n(c),
				u = o <= l;
			a = o;
			const m = {
				loaded: o,
				total: l,
				progress: l ? o / l : void 0,
				bytes: c,
				rate: d || void 0,
				estimated: d && l && u ? (l - o) / d : void 0,
				event: i,
				lengthComputable: l != null,
				[t ? "download" : "upload"]: !0,
			};
			e(m);
		}, s);
	},
	dn = (e, t) => {
		const s = e != null;
		return [(a) => t[0]({ lengthComputable: s, total: e, loaded: a }), t[1]];
	},
	un =
		(e) =>
		(...t) =>
			y.asap(() => e(...t)),
	uu = Oe.hasStandardBrowserEnv
		? ((e, t) => (s) => (
				(s = new URL(s, Oe.origin)),
				e.protocol === s.protocol &&
					e.host === s.host &&
					(t || e.port === s.port)
			))(
				new URL(Oe.origin),
				Oe.navigator && /(msie|trident)/i.test(Oe.navigator.userAgent),
			)
		: () => !0,
	mu = Oe.hasStandardBrowserEnv
		? {
				write(e, t, s, a, n, i, o) {
					if (typeof document > "u") return;
					const l = [`${e}=${encodeURIComponent(t)}`];
					(y.isNumber(s) && l.push(`expires=${new Date(s).toUTCString()}`),
						y.isString(a) && l.push(`path=${a}`),
						y.isString(n) && l.push(`domain=${n}`),
						i === !0 && l.push("secure"),
						y.isString(o) && l.push(`SameSite=${o}`),
						(document.cookie = l.join("; ")));
				},
				read(e) {
					if (typeof document > "u") return null;
					const t = document.cookie.match(
						new RegExp("(?:^|; )" + e + "=([^;]*)"),
					);
					return t ? decodeURIComponent(t[1]) : null;
				},
				remove(e) {
					this.write(e, "", Date.now() - 864e5, "/");
				},
			}
		: {
				write() {},
				read() {
					return null;
				},
				remove() {},
			};
function hu(e) {
	return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function fu(e, t) {
	return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Zi(e, t, s) {
	let a = !hu(t);
	return e && (a || s == !1) ? fu(e, t) : t;
}
const mn = (e) => (e instanceof Fe ? { ...e } : e);
function It(e, t) {
	t = t || {};
	const s = {};
	function a(d, u, m, v) {
		return y.isPlainObject(d) && y.isPlainObject(u)
			? y.merge.call({ caseless: v }, d, u)
			: y.isPlainObject(u)
				? y.merge({}, u)
				: y.isArray(u)
					? u.slice()
					: u;
	}
	function n(d, u, m, v) {
		if (y.isUndefined(u)) {
			if (!y.isUndefined(d)) return a(void 0, d, m, v);
		} else return a(d, u, m, v);
	}
	function i(d, u) {
		if (!y.isUndefined(u)) return a(void 0, u);
	}
	function o(d, u) {
		if (y.isUndefined(u)) {
			if (!y.isUndefined(d)) return a(void 0, d);
		} else return a(void 0, u);
	}
	function l(d, u, m) {
		if (m in t) return a(d, u);
		if (m in e) return a(void 0, d);
	}
	const c = {
		url: i,
		method: i,
		data: i,
		baseURL: o,
		transformRequest: o,
		transformResponse: o,
		paramsSerializer: o,
		timeout: o,
		timeoutMessage: o,
		withCredentials: o,
		withXSRFToken: o,
		adapter: o,
		responseType: o,
		xsrfCookieName: o,
		xsrfHeaderName: o,
		onUploadProgress: o,
		onDownloadProgress: o,
		decompress: o,
		maxContentLength: o,
		maxBodyLength: o,
		beforeRedirect: o,
		transport: o,
		httpAgent: o,
		httpsAgent: o,
		cancelToken: o,
		socketPath: o,
		responseEncoding: o,
		validateStatus: l,
		headers: (d, u, m) => n(mn(d), mn(u), m, !0),
	};
	return (
		y.forEach(Object.keys({ ...e, ...t }), function (u) {
			if (u === "__proto__" || u === "constructor" || u === "prototype") return;
			const m = y.hasOwnProp(c, u) ? c[u] : n,
				v = m(e[u], t[u], u);
			(y.isUndefined(v) && m !== l) || (s[u] = v);
		}),
		s
	);
}
const Gi = (e) => {
		const t = It({}, e);
		let {
			data: s,
			withXSRFToken: a,
			xsrfHeaderName: n,
			xsrfCookieName: i,
			headers: o,
			auth: l,
		} = t;
		if (
			((t.headers = o = Fe.from(o)),
			(t.url = qi(
				Zi(t.baseURL, t.url, t.allowAbsoluteUrls),
				e.params,
				e.paramsSerializer,
			)),
			l &&
				o.set(
					"Authorization",
					"Basic " +
						btoa(
							(l.username || "") +
								":" +
								(l.password ? unescape(encodeURIComponent(l.password)) : ""),
						),
				),
			y.isFormData(s))
		) {
			if (Oe.hasStandardBrowserEnv || Oe.hasStandardBrowserWebWorkerEnv)
				o.setContentType(void 0);
			else if (y.isFunction(s.getHeaders)) {
				const c = s.getHeaders(),
					d = ["content-type", "content-length"];
				Object.entries(c).forEach(([u, m]) => {
					d.includes(u.toLowerCase()) && o.set(u, m);
				});
			}
		}
		if (
			Oe.hasStandardBrowserEnv &&
			(a && y.isFunction(a) && (a = a(t)), a || (a !== !1 && uu(t.url)))
		) {
			const c = n && i && mu.read(i);
			c && o.set(n, c);
		}
		return t;
	},
	xu = typeof XMLHttpRequest < "u",
	gu =
		xu &&
		function (e) {
			return new Promise(function (s, a) {
				const n = Gi(e);
				let i = n.data;
				const o = Fe.from(n.headers).normalize();
				let { responseType: l, onUploadProgress: c, onDownloadProgress: d } = n,
					u,
					m,
					v,
					p,
					g;
				function j() {
					(p && p(),
						g && g(),
						n.cancelToken && n.cancelToken.unsubscribe(u),
						n.signal && n.signal.removeEventListener("abort", u));
				}
				let f = new XMLHttpRequest();
				(f.open(n.method.toUpperCase(), n.url, !0), (f.timeout = n.timeout));
				function k() {
					if (!f) return;
					const N = Fe.from(
							"getAllResponseHeaders" in f && f.getAllResponseHeaders(),
						),
						S = {
							data:
								!l || l === "text" || l === "json"
									? f.responseText
									: f.response,
							status: f.status,
							statusText: f.statusText,
							headers: N,
							config: e,
							request: f,
						};
					(Hi(
						function (B) {
							(s(B), j());
						},
						function (B) {
							(a(B), j());
						},
						S,
					),
						(f = null));
				}
				("onloadend" in f
					? (f.onloadend = k)
					: (f.onreadystatechange = function () {
							!f ||
								f.readyState !== 4 ||
								(f.status === 0 &&
									!(f.responseURL && f.responseURL.indexOf("file:") === 0)) ||
								setTimeout(k);
						}),
					(f.onabort = function () {
						f &&
							(a(new q("Request aborted", q.ECONNABORTED, e, f)), (f = null));
					}),
					(f.onerror = function (_) {
						const S = _ && _.message ? _.message : "Network Error",
							$ = new q(S, q.ERR_NETWORK, e, f);
						(($.event = _ || null), a($), (f = null));
					}),
					(f.ontimeout = function () {
						let _ = n.timeout
							? "timeout of " + n.timeout + "ms exceeded"
							: "timeout exceeded";
						const S = n.transitional || Ta;
						(n.timeoutErrorMessage && (_ = n.timeoutErrorMessage),
							a(
								new q(
									_,
									S.clarifyTimeoutError ? q.ETIMEDOUT : q.ECONNABORTED,
									e,
									f,
								),
							),
							(f = null));
					}),
					i === void 0 && o.setContentType(null),
					"setRequestHeader" in f &&
						y.forEach(o.toJSON(), function (_, S) {
							f.setRequestHeader(S, _);
						}),
					y.isUndefined(n.withCredentials) ||
						(f.withCredentials = !!n.withCredentials),
					l && l !== "json" && (f.responseType = n.responseType),
					d && (([v, g] = tr(d, !0)), f.addEventListener("progress", v)),
					c &&
						f.upload &&
						(([m, p] = tr(c)),
						f.upload.addEventListener("progress", m),
						f.upload.addEventListener("loadend", p)),
					(n.cancelToken || n.signal) &&
						((u = (N) => {
							f &&
								(a(!N || N.type ? new Fs(null, e, f) : N),
								f.abort(),
								(f = null));
						}),
						n.cancelToken && n.cancelToken.subscribe(u),
						n.signal &&
							(n.signal.aborted
								? u()
								: n.signal.addEventListener("abort", u))));
				const b = lu(n.url);
				if (b && Oe.protocols.indexOf(b) === -1) {
					a(new q("Unsupported protocol " + b + ":", q.ERR_BAD_REQUEST, e));
					return;
				}
				f.send(i || null);
			});
		},
	pu = (e, t) => {
		const { length: s } = (e = e ? e.filter(Boolean) : []);
		if (t || s) {
			let a = new AbortController(),
				n;
			const i = function (d) {
				if (!n) {
					((n = !0), l());
					const u = d instanceof Error ? d : this.reason;
					a.abort(
						u instanceof q ? u : new Fs(u instanceof Error ? u.message : u),
					);
				}
			};
			let o =
				t &&
				setTimeout(() => {
					((o = null), i(new q(`timeout of ${t}ms exceeded`, q.ETIMEDOUT)));
				}, t);
			const l = () => {
				e &&
					(o && clearTimeout(o),
					(o = null),
					e.forEach((d) => {
						d.unsubscribe
							? d.unsubscribe(i)
							: d.removeEventListener("abort", i);
					}),
					(e = null));
			};
			e.forEach((d) => d.addEventListener("abort", i));
			const { signal: c } = a;
			return ((c.unsubscribe = () => y.asap(l)), c);
		}
	},
	yu = function* (e, t) {
		let s = e.byteLength;
		if (s < t) {
			yield e;
			return;
		}
		let a = 0,
			n;
		for (; a < s; ) ((n = a + t), yield e.slice(a, n), (a = n));
	},
	bu = async function* (e, t) {
		for await (const s of vu(e)) yield* yu(s, t);
	},
	vu = async function* (e) {
		if (e[Symbol.asyncIterator]) {
			yield* e;
			return;
		}
		const t = e.getReader();
		try {
			for (;;) {
				const { done: s, value: a } = await t.read();
				if (s) break;
				yield a;
			}
		} finally {
			await t.cancel();
		}
	},
	hn = (e, t, s, a) => {
		const n = bu(e, t);
		let i = 0,
			o,
			l = (c) => {
				o || ((o = !0), a && a(c));
			};
		return new ReadableStream(
			{
				async pull(c) {
					try {
						const { done: d, value: u } = await n.next();
						if (d) {
							(l(), c.close());
							return;
						}
						let m = u.byteLength;
						if (s) {
							let v = (i += m);
							s(v);
						}
						c.enqueue(new Uint8Array(u));
					} catch (d) {
						throw (l(d), d);
					}
				},
				cancel(c) {
					return (l(c), n.return());
				},
			},
			{ highWaterMark: 2 },
		);
	},
	fn = 64 * 1024,
	{ isFunction: zs } = y,
	ju = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(
		y.global,
	),
	{ ReadableStream: xn, TextEncoder: gn } = y.global,
	pn = (e, ...t) => {
		try {
			return !!e(...t);
		} catch {
			return !1;
		}
	},
	wu = (e) => {
		e = y.merge.call({ skipUndefined: !0 }, ju, e);
		const { fetch: t, Request: s, Response: a } = e,
			n = t ? zs(t) : typeof fetch == "function",
			i = zs(s),
			o = zs(a);
		if (!n) return !1;
		const l = n && zs(xn),
			c =
				n &&
				(typeof gn == "function"
					? (
							(g) => (j) =>
								g.encode(j)
						)(new gn())
					: async (g) => new Uint8Array(await new s(g).arrayBuffer())),
			d =
				i &&
				l &&
				pn(() => {
					let g = !1;
					const j = new s(Oe.origin, {
						body: new xn(),
						method: "POST",
						get duplex() {
							return ((g = !0), "half");
						},
					}).headers.has("Content-Type");
					return g && !j;
				}),
			u = o && l && pn(() => y.isReadableStream(new a("").body)),
			m = { stream: u && ((g) => g.body) };
		n &&
			["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
				!m[g] &&
					(m[g] = (j, f) => {
						let k = j && j[g];
						if (k) return k.call(j);
						throw new q(
							`Response type '${g}' is not supported`,
							q.ERR_NOT_SUPPORT,
							f,
						);
					});
			});
		const v = async (g) => {
				if (g == null) return 0;
				if (y.isBlob(g)) return g.size;
				if (y.isSpecCompliantForm(g))
					return (
						await new s(Oe.origin, { method: "POST", body: g }).arrayBuffer()
					).byteLength;
				if (y.isArrayBufferView(g) || y.isArrayBuffer(g)) return g.byteLength;
				if ((y.isURLSearchParams(g) && (g = g + ""), y.isString(g)))
					return (await c(g)).byteLength;
			},
			p = async (g, j) => {
				const f = y.toFiniteNumber(g.getContentLength());
				return f ?? v(j);
			};
		return async (g) => {
			let {
					url: j,
					method: f,
					data: k,
					signal: b,
					cancelToken: N,
					timeout: _,
					onDownloadProgress: S,
					onUploadProgress: $,
					responseType: B,
					headers: xe,
					withCredentials: me = "same-origin",
					fetchOptions: L,
				} = Gi(g),
				we = t || fetch;
			B = B ? (B + "").toLowerCase() : "text";
			let V = pu([b, N && N.toAbortSignal()], _),
				G = null;
			const Q =
				V &&
				V.unsubscribe &&
				(() => {
					V.unsubscribe();
				});
			let ce;
			try {
				if (
					$ &&
					d &&
					f !== "get" &&
					f !== "head" &&
					(ce = await p(xe, k)) !== 0
				) {
					let se = new s(j, { method: "POST", body: k, duplex: "half" }),
						ze;
					if (
						(y.isFormData(k) &&
							(ze = se.headers.get("content-type")) &&
							xe.setContentType(ze),
						se.body)
					) {
						const [Le, _t] = dn(ce, tr(un($)));
						k = hn(se.body, fn, Le, _t);
					}
				}
				y.isString(me) || (me = me ? "include" : "omit");
				const K = i && "credentials" in s.prototype,
					ve = {
						...L,
						signal: V,
						method: f.toUpperCase(),
						headers: xe.normalize().toJSON(),
						body: k,
						duplex: "half",
						credentials: K ? me : void 0,
					};
				G = i && new s(j, ve);
				let T = await (i ? we(G, L) : we(j, ve));
				const Y = u && (B === "stream" || B === "response");
				if (u && (S || (Y && Q))) {
					const se = {};
					["status", "statusText", "headers"].forEach((Vs) => {
						se[Vs] = T[Vs];
					});
					const ze = y.toFiniteNumber(T.headers.get("content-length")),
						[Le, _t] = (S && dn(ze, tr(un(S), !0))) || [];
					T = new a(
						hn(T.body, fn, Le, () => {
							(_t && _t(), Q && Q());
						}),
						se,
					);
				}
				B = B || "text";
				let ge = await m[y.findKey(m, B) || "text"](T, g);
				return (
					!Y && Q && Q(),
					await new Promise((se, ze) => {
						Hi(se, ze, {
							data: ge,
							headers: Fe.from(T.headers),
							status: T.status,
							statusText: T.statusText,
							config: g,
							request: G,
						});
					})
				);
			} catch (K) {
				throw (
					Q && Q(),
					K && K.name === "TypeError" && /Load failed|fetch/i.test(K.message)
						? Object.assign(
								new q("Network Error", q.ERR_NETWORK, g, G, K && K.response),
								{ cause: K.cause || K },
							)
						: q.from(K, K && K.code, g, G, K && K.response)
				);
			}
		};
	},
	Nu = new Map(),
	Yi = (e) => {
		let t = (e && e.env) || {};
		const { fetch: s, Request: a, Response: n } = t,
			i = [a, n, s];
		let o = i.length,
			l = o,
			c,
			d,
			u = Nu;
		for (; l--; )
			((c = i[l]),
				(d = u.get(c)),
				d === void 0 && u.set(c, (d = l ? new Map() : wu(t))),
				(u = d));
		return d;
	};
Yi();
const Pa = { http: $d, xhr: gu, fetch: { get: Yi } };
y.forEach(Pa, (e, t) => {
	if (e) {
		try {
			Object.defineProperty(e, "name", { value: t });
		} catch {}
		Object.defineProperty(e, "adapterName", { value: t });
	}
});
const yn = (e) => `- ${e}`,
	_u = (e) => y.isFunction(e) || e === null || e === !1;
function ku(e, t) {
	e = y.isArray(e) ? e : [e];
	const { length: s } = e;
	let a, n;
	const i = {};
	for (let o = 0; o < s; o++) {
		a = e[o];
		let l;
		if (
			((n = a),
			!_u(a) && ((n = Pa[(l = String(a)).toLowerCase()]), n === void 0))
		)
			throw new q(`Unknown adapter '${l}'`);
		if (n && (y.isFunction(n) || (n = n.get(t)))) break;
		i[l || "#" + o] = n;
	}
	if (!n) {
		const o = Object.entries(i).map(
			([c, d]) =>
				`adapter ${c} ` +
				(d === !1
					? "is not supported by the environment"
					: "is not available in the build"),
		);
		let l = s
			? o.length > 1
				? `since :
` +
					o.map(yn).join(`
`)
				: " " + yn(o[0])
			: "as no adapter specified";
		throw new q(
			"There is no suitable adapter to dispatch the request " + l,
			"ERR_NOT_SUPPORT",
		);
	}
	return n;
}
const Xi = { getAdapter: ku, adapters: Pa };
function Dr(e) {
	if (
		(e.cancelToken && e.cancelToken.throwIfRequested(),
		e.signal && e.signal.aborted)
	)
		throw new Fs(null, e);
}
function bn(e) {
	return (
		Dr(e),
		(e.headers = Fe.from(e.headers)),
		(e.data = Pr.call(e, e.transformRequest)),
		["post", "put", "patch"].indexOf(e.method) !== -1 &&
			e.headers.setContentType("application/x-www-form-urlencoded", !1),
		Xi.getAdapter(
			e.adapter || Is.adapter,
			e,
		)(e).then(
			function (a) {
				return (
					Dr(e),
					(a.data = Pr.call(e, e.transformResponse, a)),
					(a.headers = Fe.from(a.headers)),
					a
				);
			},
			function (a) {
				return (
					Wi(a) ||
						(Dr(e),
						a &&
							a.response &&
							((a.response.data = Pr.call(e, e.transformResponse, a.response)),
							(a.response.headers = Fe.from(a.response.headers)))),
					Promise.reject(a)
				);
			},
		)
	);
}
const Ji = "1.13.6",
	vr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
	(e, t) => {
		vr[e] = function (a) {
			return typeof a === e || "a" + (t < 1 ? "n " : " ") + e;
		};
	},
);
const vn = {};
vr.transitional = function (t, s, a) {
	function n(i, o) {
		return (
			"[Axios v" +
			Ji +
			"] Transitional option '" +
			i +
			"'" +
			o +
			(a ? ". " + a : "")
		);
	}
	return (i, o, l) => {
		if (t === !1)
			throw new q(
				n(o, " has been removed" + (s ? " in " + s : "")),
				q.ERR_DEPRECATED,
			);
		return (
			s &&
				!vn[o] &&
				((vn[o] = !0),
				console.warn(
					n(
						o,
						" has been deprecated since v" +
							s +
							" and will be removed in the near future",
					),
				)),
			t ? t(i, o, l) : !0
		);
	};
};
vr.spelling = function (t) {
	return (s, a) => (console.warn(`${a} is likely a misspelling of ${t}`), !0);
};
function Su(e, t, s) {
	if (typeof e != "object")
		throw new q("options must be an object", q.ERR_BAD_OPTION_VALUE);
	const a = Object.keys(e);
	let n = a.length;
	for (; n-- > 0; ) {
		const i = a[n],
			o = t[i];
		if (o) {
			const l = e[i],
				c = l === void 0 || o(l, i, e);
			if (c !== !0)
				throw new q("option " + i + " must be " + c, q.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (s !== !0) throw new q("Unknown option " + i, q.ERR_BAD_OPTION);
	}
}
const Gs = { assertOptions: Su, validators: vr },
	Ue = Gs.validators;
let Pt = class {
	constructor(t) {
		((this.defaults = t || {}),
			(this.interceptors = { request: new ln(), response: new ln() }));
	}
	async request(t, s) {
		try {
			return await this._request(t, s);
		} catch (a) {
			if (a instanceof Error) {
				let n = {};
				Error.captureStackTrace
					? Error.captureStackTrace(n)
					: (n = new Error());
				const i = n.stack ? n.stack.replace(/^.+\n/, "") : "";
				try {
					a.stack
						? i &&
							!String(a.stack).endsWith(i.replace(/^.+\n.+\n/, "")) &&
							(a.stack +=
								`
` + i)
						: (a.stack = i);
				} catch {}
			}
			throw a;
		}
	}
	_request(t, s) {
		(typeof t == "string" ? ((s = s || {}), (s.url = t)) : (s = t || {}),
			(s = It(this.defaults, s)));
		const { transitional: a, paramsSerializer: n, headers: i } = s;
		(a !== void 0 &&
			Gs.assertOptions(
				a,
				{
					silentJSONParsing: Ue.transitional(Ue.boolean),
					forcedJSONParsing: Ue.transitional(Ue.boolean),
					clarifyTimeoutError: Ue.transitional(Ue.boolean),
					legacyInterceptorReqResOrdering: Ue.transitional(Ue.boolean),
				},
				!1,
			),
			n != null &&
				(y.isFunction(n)
					? (s.paramsSerializer = { serialize: n })
					: Gs.assertOptions(
							n,
							{ encode: Ue.function, serialize: Ue.function },
							!0,
						)),
			s.allowAbsoluteUrls !== void 0 ||
				(this.defaults.allowAbsoluteUrls !== void 0
					? (s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
					: (s.allowAbsoluteUrls = !0)),
			Gs.assertOptions(
				s,
				{
					baseUrl: Ue.spelling("baseURL"),
					withXsrfToken: Ue.spelling("withXSRFToken"),
				},
				!0,
			),
			(s.method = (s.method || this.defaults.method || "get").toLowerCase()));
		let o = i && y.merge(i.common, i[s.method]);
		(i &&
			y.forEach(
				["delete", "get", "head", "post", "put", "patch", "common"],
				(g) => {
					delete i[g];
				},
			),
			(s.headers = Fe.concat(o, i)));
		const l = [];
		let c = !0;
		this.interceptors.request.forEach(function (j) {
			if (typeof j.runWhen == "function" && j.runWhen(s) === !1) return;
			c = c && j.synchronous;
			const f = s.transitional || Ta;
			f && f.legacyInterceptorReqResOrdering
				? l.unshift(j.fulfilled, j.rejected)
				: l.push(j.fulfilled, j.rejected);
		});
		const d = [];
		this.interceptors.response.forEach(function (j) {
			d.push(j.fulfilled, j.rejected);
		});
		let u,
			m = 0,
			v;
		if (!c) {
			const g = [bn.bind(this), void 0];
			for (
				g.unshift(...l), g.push(...d), v = g.length, u = Promise.resolve(s);
				m < v;
			)
				u = u.then(g[m++], g[m++]);
			return u;
		}
		v = l.length;
		let p = s;
		for (; m < v; ) {
			const g = l[m++],
				j = l[m++];
			try {
				p = g(p);
			} catch (f) {
				j.call(this, f);
				break;
			}
		}
		try {
			u = bn.call(this, p);
		} catch (g) {
			return Promise.reject(g);
		}
		for (m = 0, v = d.length; m < v; ) u = u.then(d[m++], d[m++]);
		return u;
	}
	getUri(t) {
		t = It(this.defaults, t);
		const s = Zi(t.baseURL, t.url, t.allowAbsoluteUrls);
		return qi(s, t.params, t.paramsSerializer);
	}
};
y.forEach(["delete", "get", "head", "options"], function (t) {
	Pt.prototype[t] = function (s, a) {
		return this.request(
			It(a || {}, { method: t, url: s, data: (a || {}).data }),
		);
	};
});
y.forEach(["post", "put", "patch"], function (t) {
	function s(a) {
		return function (i, o, l) {
			return this.request(
				It(l || {}, {
					method: t,
					headers: a ? { "Content-Type": "multipart/form-data" } : {},
					url: i,
					data: o,
				}),
			);
		};
	}
	((Pt.prototype[t] = s()), (Pt.prototype[t + "Form"] = s(!0)));
});
let Eu = class Qi {
	constructor(t) {
		if (typeof t != "function")
			throw new TypeError("executor must be a function.");
		let s;
		this.promise = new Promise(function (i) {
			s = i;
		});
		const a = this;
		(this.promise.then((n) => {
			if (!a._listeners) return;
			let i = a._listeners.length;
			for (; i-- > 0; ) a._listeners[i](n);
			a._listeners = null;
		}),
			(this.promise.then = (n) => {
				let i;
				const o = new Promise((l) => {
					(a.subscribe(l), (i = l));
				}).then(n);
				return (
					(o.cancel = function () {
						a.unsubscribe(i);
					}),
					o
				);
			}),
			t(function (i, o, l) {
				a.reason || ((a.reason = new Fs(i, o, l)), s(a.reason));
			}));
	}
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	subscribe(t) {
		if (this.reason) {
			t(this.reason);
			return;
		}
		this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
	}
	unsubscribe(t) {
		if (!this._listeners) return;
		const s = this._listeners.indexOf(t);
		s !== -1 && this._listeners.splice(s, 1);
	}
	toAbortSignal() {
		const t = new AbortController(),
			s = (a) => {
				t.abort(a);
			};
		return (
			this.subscribe(s),
			(t.signal.unsubscribe = () => this.unsubscribe(s)),
			t.signal
		);
	}
	static source() {
		let t;
		return {
			token: new Qi(function (n) {
				t = n;
			}),
			cancel: t,
		};
	}
};
function Cu(e) {
	return function (s) {
		return e.apply(null, s);
	};
}
function Au(e) {
	return y.isObject(e) && e.isAxiosError === !0;
}
const aa = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526,
};
Object.entries(aa).forEach(([e, t]) => {
	aa[t] = e;
});
function Ki(e) {
	const t = new Pt(e),
		s = Ri(Pt.prototype.request, t);
	return (
		y.extend(s, Pt.prototype, t, { allOwnKeys: !0 }),
		y.extend(s, t, null, { allOwnKeys: !0 }),
		(s.create = function (n) {
			return Ki(It(e, n));
		}),
		s
	);
}
const be = Ki(Is);
be.Axios = Pt;
be.CanceledError = Fs;
be.CancelToken = Eu;
be.isCancel = Wi;
be.VERSION = Ji;
be.toFormData = br;
be.AxiosError = q;
be.Cancel = be.CanceledError;
be.all = function (t) {
	return Promise.all(t);
};
be.spread = Cu;
be.isAxiosError = Au;
be.mergeConfig = It;
be.AxiosHeaders = Fe;
be.formToJSON = (e) => Bi(y.isHTMLForm(e) ? new FormData(e) : e);
be.getAdapter = Xi.getAdapter;
be.HttpStatusCode = aa;
be.default = be;
const {
		Axios: Zg,
		AxiosError: Gg,
		CanceledError: Yg,
		isCancel: Xg,
		CancelToken: Jg,
		VERSION: Qg,
		all: Kg,
		Cancel: e0,
		isAxiosError: t0,
		spread: s0,
		toFormData: r0,
		AxiosHeaders: a0,
		HttpStatusCode: n0,
		formToJSON: i0,
		getAdapter: o0,
		mergeConfig: l0,
	} = be,
	eo = "/api/v1",
	_e = be.create({
		baseURL: eo,
		headers: { "Content-Type": "application/json" },
		timeout: 15e3,
	});
localStorage.getItem("access_token");
localStorage.getItem("refresh_token");
let Ir = !1,
	na = [];
const jn = (e, t = null) => {
		(na.forEach((s) => {
			e ? s.reject(e) : s.resolve(t);
		}),
			(na = []));
	},
	ia = (e, t) => {
		(localStorage.setItem("access_token", e),
			localStorage.setItem("refresh_token", t));
	},
	oa = () => {
		(localStorage.removeItem("access_token"),
			localStorage.removeItem("refresh_token"));
	};
_e.interceptors.request.use(
	(e) => {
		const t = localStorage.getItem("access_token");
		return (t && (e.headers.Authorization = `Bearer ${t}`), e);
	},
	(e) => Promise.reject(e),
);
_e.interceptors.response.use(
	(e) => e,
	async (e) => {
		var s;
		const t = e.config;
		if (((s = e.response) == null ? void 0 : s.status) === 401 && !t._retry) {
			if (Ir)
				return new Promise((n, i) => {
					na.push({ resolve: n, reject: i });
				})
					.then((n) => ((t.headers.Authorization = `Bearer ${n}`), _e(t)))
					.catch((n) => Promise.reject(n));
			((t._retry = !0), (Ir = !0));
			const a = localStorage.getItem("refresh_token");
			if (!a)
				return (oa(), (window.location.href = "/login"), Promise.reject(e));
			try {
				const n = await be.post(`${eo}/auth/refresh`, { refresh_token: a }),
					{ access_token: i, refresh_token: o } = n.data;
				return (
					ia(i, o),
					jn(null, i),
					(t.headers.Authorization = `Bearer ${i}`),
					_e(t)
				);
			} catch (n) {
				return (
					jn(n, null),
					oa(),
					(window.location.href = "/login"),
					Promise.reject(n)
				);
			} finally {
				Ir = !1;
			}
		}
		return Promise.reject(e);
	},
);
const Ee = Oi()(
	Ti(
		(e, t) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: !1,
			isAdmin: !1,
			isApproved: !1,
			login: (s, a, n) => {
				(ia(a, n),
					e({
						user: s,
						accessToken: a,
						refreshToken: n,
						isAuthenticated: !0,
						isAdmin: s.role === ht.ADMIN,
						isApproved: s.status === nt.APPROVED || s.role === ht.ADMIN,
					}));
			},
			logout: () => {
				(oa(),
					e({
						user: null,
						accessToken: null,
						refreshToken: null,
						isAuthenticated: !1,
						isAdmin: !1,
						isApproved: !1,
					}));
			},
			setUser: (s) => {
				const a = t();
				e({
					...a,
					user: s,
					isAdmin: s.role === ht.ADMIN,
					isApproved: s.status === nt.APPROVED || s.role === ht.ADMIN,
				});
			},
			updateTokens: (s, a) => {
				(ia(s, a), e({ accessToken: s, refreshToken: a }));
			},
		}),
		{
			name: "agroreserve-auth",
			partialize: (e) => ({
				user: e.user,
				accessToken: e.accessToken,
				refreshToken: e.refreshToken,
				isAuthenticated: e.isAuthenticated,
				isAdmin: e.isAdmin,
				isApproved: e.isApproved,
			}),
			onRehydrateStorage: () => (e) => {
				e &&
					e.user &&
					((e.isAdmin = e.user.role === ht.ADMIN),
					(e.isApproved =
						e.user.status === nt.APPROVED || e.user.role === ht.ADMIN));
			},
		},
	),
);
function U(...e) {
	return e
		.flat()
		.filter((t) => typeof t == "string" && t.length > 0)
		.join(" ");
}
const Ou = {
		sm: "w-4 h-4 border-2",
		md: "w-6 h-6 border-2",
		lg: "w-8 h-8 border-3",
		xl: "w-12 h-12 border-4",
	},
	Tu = ({ size: e = "md", className: t, label: s = "Загрузка..." }) =>
		r.jsxs("div", {
			className: "flex items-center justify-center",
			role: "status",
			"aria-label": s,
			children: [
				r.jsx("div", {
					className: U(
						"rounded-full border-gray-200 border-t-primary-600 animate-spin",
						Ou[e],
						t,
					),
				}),
				r.jsx("span", { className: "sr-only", children: s }),
			],
		}),
	hs = () =>
		r.jsx("div", {
			className: "flex items-center justify-center min-h-64",
			children: r.jsx(Tu, { size: "lg" }),
		}),
	Us = (e) => {
		const t = e.reduce((a, n) => a + n.subtotal, 0),
			s = e.reduce((a, n) => a + n.quantity, 0);
		return { total: t, itemsCount: s };
	},
	Ls = Oi()(
		Ti(
			(e, t) => ({
				items: [],
				total: 0,
				itemsCount: 0,
				addItem: (s, a, n) => {
					const { items: i } = t(),
						o = i.findIndex((d) => d.product.id === s.id),
						l = n ? s.price_wholesale : s.price_retail;
					let c;
					(o >= 0
						? (c = i.map((d, u) => {
								if (u === o) {
									const m = d.quantity + a;
									return { ...d, quantity: m, subtotal: l * m };
								}
								return d;
							}))
						: (c = [
								...i,
								{ product: s, quantity: a, price: l, subtotal: l * a },
							]),
						e({ items: c, ...Us(c) }));
				},
				removeItem: (s) => {
					const { items: a } = t(),
						n = a.filter((i) => i.product.id !== s);
					e({ items: n, ...Us(n) });
				},
				updateQuantity: (s, a) => {
					const { items: n } = t();
					if (a <= 0) {
						const o = n.filter((l) => l.product.id !== s);
						e({ items: o, ...Us(o) });
						return;
					}
					const i = n.map((o) =>
						o.product.id === s
							? { ...o, quantity: a, subtotal: o.price * a }
							: o,
					);
					e({ items: i, ...Us(i) });
				},
				clearCart: () => {
					e({ items: [], total: 0, itemsCount: 0 });
				},
				getItem: (s) => t().items.find((a) => a.product.id === s),
			}),
			{ name: "agroreserve-cart" },
		),
	),
	wn = [
		{ to: "/catalog", label: "Каталог" },
		{ to: "/about", label: "О нас" },
		{ to: "/schools", label: "Для школ" },
		{ to: "/contacts", label: "Контакты" },
	],
	to = () => {
		const [e, t] = O.useState(!1),
			[s, a] = O.useState(!1),
			{ isAuthenticated: n, isAdmin: i, user: o, logout: l } = Ee(),
			{ itemsCount: c } = Ls(),
			d = qt(),
			u = () => {
				(l(), a(!1), d("/"));
			};
		return r.jsxs("header", {
			className:
				"sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm",
			children: [
				r.jsx("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: r.jsxs("div", {
						className: "flex items-center justify-between h-16",
						children: [
							r.jsxs(H, {
								to: "/",
								className: "flex items-center gap-2.5 flex-shrink-0 group",
								children: [
									r.jsx("div", {
										className:
											"w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-primary-700 transition-colors",
										children: r.jsxs("svg", {
											viewBox: "0 0 36 36",
											fill: "none",
											className: "w-6 h-6",
											"aria-hidden": "true",
											children: [
												r.jsx("path", {
													d: "M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4z",
													fill: "white",
													fillOpacity: "0.2",
												}),
												r.jsx("path", {
													d: "M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z",
													fill: "white",
												}),
											],
										}),
									}),
									r.jsxs("div", {
										className: "leading-tight",
										children: [
											r.jsx("div", {
												className:
													"text-base font-bold text-gray-900 tracking-tight",
												children: "АГРОРЕЗЕРВ",
											}),
											r.jsx("div", {
												className:
													"text-xs text-primary-600 font-medium -mt-0.5",
												children: "Тобольск",
											}),
										],
									}),
								],
							}),
							r.jsx("nav", {
								className: "hidden md:flex items-center gap-1",
								children: wn.map((m) =>
									r.jsx(
										Kt,
										{
											to: m.to,
											className: ({ isActive: v }) =>
												U(
													"px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
													v
														? "text-primary-700 bg-primary-50"
														: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
												),
											children: m.label,
										},
										m.to,
									),
								),
							}),
							r.jsxs("div", {
								className: "flex items-center gap-2",
								children: [
									r.jsxs(H, {
										to: "/cart",
										className:
											"relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors",
										"aria-label": "Корзина",
										children: [
											r.jsx(es, { className: "w-5 h-5" }),
											c > 0 &&
												r.jsx("span", {
													className:
														"absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none",
													children: c > 99 ? "99+" : c,
												}),
										],
									}),
									n
										? r.jsxs("div", {
												className: "relative",
												children: [
													r.jsxs("button", {
														onClick: () => a(!s),
														className:
															"flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
														children: [
															r.jsx("div", {
																className:
																	"w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center",
																children: r.jsx(ot, {
																	className: "w-4 h-4 text-primary-700",
																}),
															}),
															r.jsx("span", {
																className:
																	"hidden sm:block max-w-[100px] truncate",
																children:
																	o == null
																		? void 0
																		: o.full_name.split(" ")[0],
															}),
														],
													}),
													s &&
														r.jsxs(r.Fragment, {
															children: [
																r.jsx("div", {
																	className: "fixed inset-0 z-10",
																	onClick: () => a(!1),
																}),
																r.jsxs("div", {
																	className:
																		"absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-lg z-20 py-1",
																	children: [
																		r.jsxs("div", {
																			className:
																				"px-4 py-2.5 border-b border-gray-100",
																			children: [
																				r.jsx("div", {
																					className:
																						"text-sm font-semibold text-gray-900 truncate",
																					children:
																						o == null ? void 0 : o.full_name,
																				}),
																				r.jsx("div", {
																					className:
																						"text-xs text-gray-500 truncate",
																					children:
																						o == null ? void 0 : o.email,
																				}),
																			],
																		}),
																		r.jsxs(H, {
																			to: "/account",
																			onClick: () => a(!1),
																			className:
																				"flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
																			children: [
																				r.jsx(ur, {
																					className: "w-4 h-4 text-gray-400",
																				}),
																				"Мои заказы",
																			],
																		}),
																		r.jsxs(H, {
																			to: "/account/profile",
																			onClick: () => a(!1),
																			className:
																				"flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
																			children: [
																				r.jsx(Gr, {
																					className: "w-4 h-4 text-gray-400",
																				}),
																				"Профиль",
																			],
																		}),
																		i &&
																			r.jsxs(H, {
																				to: "/admin",
																				onClick: () => a(!1),
																				className:
																					"flex items-center gap-2.5 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 font-medium",
																				children: [
																					r.jsx(Gr, { className: "w-4 h-4" }),
																					"Панель управления",
																				],
																			}),
																		r.jsx("div", {
																			className:
																				"border-t border-gray-100 mt-1",
																			children: r.jsxs("button", {
																				onClick: u,
																				className:
																					"flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50",
																				children: [
																					r.jsx(di, { className: "w-4 h-4" }),
																					"Выйти",
																				],
																			}),
																		}),
																	],
																}),
															],
														}),
												],
											})
										: r.jsx(H, {
												to: "/login",
												className:
													"px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm",
												children: "Войти",
											}),
									r.jsx("button", {
										onClick: () => t(!e),
										className:
											"md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
										"aria-label": "Меню",
										children: e
											? r.jsx(wa, { className: "w-5 h-5" })
											: r.jsx(tl, { className: "w-5 h-5" }),
									}),
								],
							}),
						],
					}),
				}),
				e &&
					r.jsx("div", {
						className: "md:hidden border-t border-gray-200 bg-white",
						children: r.jsx("div", {
							className: "max-w-7xl mx-auto px-4 py-3 space-y-1",
							children: wn.map((m) =>
								r.jsx(
									Kt,
									{
										to: m.to,
										onClick: () => t(!1),
										className: ({ isActive: v }) =>
											U(
												"block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
												v
													? "text-primary-700 bg-primary-50"
													: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
											),
										children: m.label,
									},
									m.to,
								),
							),
						}),
					}),
			],
		});
	},
	so = () =>
		r.jsx("footer", {
			className: "bg-gray-900 text-gray-300 mt-auto",
			children: r.jsxs("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
				children: [
					r.jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
						children: [
							r.jsxs("div", {
								className: "lg:col-span-1",
								children: [
									r.jsxs("div", {
										className: "flex items-center gap-2 mb-4",
										children: [
											r.jsx("div", {
												className:
													"w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center",
												children: r.jsx("svg", {
													viewBox: "0 0 36 36",
													fill: "none",
													className: "w-6 h-6",
													"aria-hidden": "true",
													children: r.jsx("path", {
														d: "M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z",
														fill: "white",
													}),
												}),
											}),
											r.jsxs("div", {
												children: [
													r.jsx("div", {
														className: "text-base font-bold text-white",
														children: "АГРОРЕЗЕРВ",
													}),
													r.jsx("div", {
														className: "text-xs text-primary-400",
														children: "Тобольск",
													}),
												],
											}),
										],
									}),
									r.jsx("p", {
										className: "text-sm text-gray-400 leading-relaxed",
										children:
											"Прямые поставки свежих овощей и фруктов. Документы для госзакупок по 44-ФЗ.",
									}),
								],
							}),
							r.jsxs("div", {
								children: [
									r.jsx("h3", {
										className:
											"text-sm font-semibold text-white uppercase tracking-wider mb-4",
										children: "Каталог",
									}),
									r.jsx("ul", {
										className: "space-y-2.5 text-sm",
										children: [
											{ to: "/catalog?category=ovoshchi", label: "Овощи" },
											{ to: "/catalog?category=frukty", label: "Фрукты" },
											{
												to: "/catalog?category=sukhofruktyi",
												label: "Сухофрукты",
											},
											{ to: "/catalog?category=orekhyi", label: "Орехи" },
											{ to: "/catalog?category=spetsii", label: "Специи" },
											{ to: "/catalog?category=myod", label: "Мёд и масла" },
										].map((e) =>
											r.jsx(
												"li",
												{
													children: r.jsx(H, {
														to: e.to,
														className:
															"text-gray-400 hover:text-white transition-colors",
														children: e.label,
													}),
												},
												e.to,
											),
										),
									}),
								],
							}),
							r.jsxs("div", {
								children: [
									r.jsx("h3", {
										className:
											"text-sm font-semibold text-white uppercase tracking-wider mb-4",
										children: "Компания",
									}),
									r.jsx("ul", {
										className: "space-y-2.5 text-sm",
										children: [
											{ to: "/about", label: "О нас" },
											{ to: "/schools", label: "Для школ" },
											{ to: "/contacts", label: "Контакты" },
											{ to: "/account/orders", label: "Мои заказы" },
											{ to: "/account/documents", label: "Документы" },
										].map((e) =>
											r.jsx(
												"li",
												{
													children: r.jsx(H, {
														to: e.to,
														className:
															"text-gray-400 hover:text-white transition-colors",
														children: e.label,
													}),
												},
												e.to,
											),
										),
									}),
								],
							}),
							r.jsxs("div", {
								children: [
									r.jsx("h3", {
										className:
											"text-sm font-semibold text-white uppercase tracking-wider mb-4",
										children: "Контакты",
									}),
									r.jsxs("ul", {
										className: "space-y-3 text-sm",
										children: [
											r.jsx("li", {
												children: r.jsxs("a", {
													href: "tel:+79000000000",
													className:
														"flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors",
													children: [
														r.jsx(yt, {
															className:
																"w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400",
														}),
														"+7 (900) 000-00-00",
													],
												}),
											}),
											r.jsx("li", {
												children: r.jsxs("a", {
													href: "https://t.me/agroreserve",
													className:
														"flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors",
													target: "_blank",
													rel: "noopener noreferrer",
													children: [
														r.jsx(Na, {
															className:
																"w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400",
														}),
														"Telegram: @agroreserve",
													],
												}),
											}),
											r.jsx("li", {
												children: r.jsxs("a", {
													href: "mailto:info@agroreserve.ru",
													className:
														"flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors",
													children: [
														r.jsx(As, {
															className:
																"w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400",
														}),
														"info@agroreserve.ru",
													],
												}),
											}),
											r.jsxs("li", {
												className: "flex items-start gap-2.5 text-gray-400",
												children: [
													r.jsx(Be, {
														className:
															"w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400",
													}),
													"г. Тобольск, Тюменская обл.",
												],
											}),
											r.jsxs("li", {
												className: "flex items-start gap-2.5 text-gray-400",
												children: [
													r.jsx(ds, {
														className:
															"w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400",
													}),
													"Пн–Сб: 08:00–18:00",
												],
											}),
										],
									}),
								],
							}),
						],
					}),
					r.jsxs("div", {
						className: "mt-10 pt-6 border-t border-gray-800",
						children: [
							r.jsxs("div", {
								className:
									"flex flex-col sm:flex-row sm:items-center justify-between gap-4",
								children: [
									r.jsx("div", {
										className: "text-xs text-gray-500",
										children:
											"ИП Наимов Хусейн Вохиджонович · ИНН: 0000000000 · ОГРНИП: 000000000000000",
									}),
									r.jsxs("div", {
										className: "text-xs text-gray-500",
										children: [
											"© ",
											new Date().getFullYear(),
											" Агрорезерв · Все права защищены",
										],
									}),
								],
							}),
							r.jsx("div", {
								className: "mt-2 text-xs text-gray-600",
								children: r.jsx("a", {
									href: "https://www.perplexity.ai/computer",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "hover:text-gray-400 transition-colors",
									children: "Created with Perplexity Computer",
								}),
							}),
						],
					}),
				],
			}),
		}),
	Ru = [
		{ to: "/catalog", label: "Каталог", icon: _a, guestTo: "/quick-order" },
		{ to: "/cart", label: "Корзина", icon: es, badge: !0 },
		{ to: "/account/orders", label: "Заказы", icon: ur, requiresAuth: !0 },
		{ to: "/account/profile", label: "Профиль", icon: ot, requiresAuth: !0 },
	],
	ro = () => {
		const { itemsCount: e } = Ls(),
			{ isAuthenticated: t } = Ee();
		return r.jsx("nav", {
			className:
				"fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-gray-200 safe-area-bottom",
			children: r.jsx("div", {
				className: "flex items-stretch",
				children: Ru.map((s) => {
					const a = s.requiresAuth && !t ? "/login" : s.to,
						n = s.icon;
					return r.jsx(
						Kt,
						{
							to: a,
							className: ({ isActive: i }) =>
								U(
									"flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative",
									"text-xs transition-colors",
									i ? "text-primary-600" : "text-gray-500 hover:text-gray-700",
								),
							children: ({ isActive: i }) =>
								r.jsxs(r.Fragment, {
									children: [
										r.jsxs("div", {
											className: "relative",
											children: [
												r.jsx(n, {
													className: U("w-5 h-5", i && "text-primary-600"),
												}),
												s.badge &&
													e > 0 &&
													r.jsx("span", {
														className:
															"absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none",
														children: e > 9 ? "9+" : e,
													}),
											],
										}),
										r.jsx("span", {
											className: U("font-medium", i && "text-primary-600"),
											children: s.label,
										}),
										i &&
											r.jsx("span", {
												className:
													"absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full",
											}),
									],
								}),
						},
						s.to,
					);
				}),
			}),
		});
	},
	Pu = () =>
		r.jsxs("div", {
			className: "flex flex-col min-h-screen",
			children: [
				r.jsx(to, {}),
				r.jsx("main", {
					className: "flex-1 pb-16 md:pb-0",
					children: r.jsx(Cs, {}),
				}),
				r.jsx(so, {}),
				r.jsx(ro, {}),
			],
		}),
	Nn = [
		{ to: "/account", label: "Обзор", icon: ui, exact: !0 },
		{ to: "/account/orders", label: "Мои заказы", icon: ur },
		{ to: "/account/documents", label: "Документы", icon: bt },
		{ to: "/account/profile", label: "Профиль", icon: ot },
	],
	Du = () => {
		const { user: e, isApproved: t } = Ee();
		return r.jsxs("div", {
			className: "flex flex-col min-h-screen bg-gray-50",
			children: [
				r.jsx(to, {}),
				r.jsx("div", {
					className:
						"flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6",
					children: r.jsxs("div", {
						className: "flex gap-6",
						children: [
							r.jsxs("aside", {
								className: "hidden lg:block w-56 flex-shrink-0",
								children: [
									r.jsx("div", {
										className:
											"bg-white rounded-xl border border-gray-200 p-4 mb-4",
										children: r.jsxs("div", {
											className: "flex items-center gap-3",
											children: [
												r.jsx("div", {
													className:
														"w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center",
													children: r.jsx(ot, {
														className: "w-5 h-5 text-primary-600",
													}),
												}),
												r.jsxs("div", {
													className: "min-w-0",
													children: [
														r.jsx("div", {
															className:
																"text-sm font-semibold text-gray-900 truncate",
															children: e == null ? void 0 : e.full_name,
														}),
														r.jsx("div", {
															className: "text-xs text-gray-500",
															children: t ? "Верифицированный" : "На модерации",
														}),
													],
												}),
											],
										}),
									}),
									r.jsx("nav", {
										className:
											"bg-white rounded-xl border border-gray-200 overflow-hidden",
										children: Nn.map((s, a) => {
											const n = s.icon;
											return r.jsx(
												Kt,
												{
													to: s.to,
													end: s.exact,
													className: ({ isActive: i }) =>
														U(
															"flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
															a > 0 && "border-t border-gray-100",
															i
																? "text-primary-700 bg-primary-50"
																: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
														),
													children: ({ isActive: i }) =>
														r.jsxs(r.Fragment, {
															children: [
																r.jsx(n, {
																	className: U(
																		"w-4 h-4",
																		i ? "text-primary-600" : "text-gray-400",
																	),
																}),
																r.jsx("span", {
																	className: "flex-1",
																	children: s.label,
																}),
																i &&
																	r.jsx(Ae, {
																		className: "w-4 h-4 text-primary-400",
																	}),
															],
														}),
												},
												s.to,
											);
										}),
									}),
								],
							}),
							r.jsx("main", {
								className: "flex-1 min-w-0",
								children: r.jsx(Cs, {}),
							}),
						],
					}),
				}),
				r.jsx("div", {
					className: "lg:hidden border-t border-gray-200 bg-white",
					children: r.jsx("div", {
						className: "max-w-7xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto",
						children: Nn.map((s) => {
							const a = s.icon;
							return r.jsxs(
								Kt,
								{
									to: s.to,
									end: s.exact,
									className: ({ isActive: n }) =>
										U(
											"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
											n
												? "bg-primary-100 text-primary-700"
												: "text-gray-500 hover:bg-gray-100",
										),
									children: [r.jsx(a, { className: "w-3.5 h-3.5" }), s.label],
								},
								s.to,
							);
						}),
					}),
				}),
				r.jsx(so, {}),
				r.jsx(ro, {}),
			],
		});
	},
	Iu = [
		{ to: "/admin", label: "Сегодня", icon: ui, exact: !0 },
		{ to: "/admin/orders", label: "Заказы", icon: Os },
		{ to: "/admin/catalog", label: "Каталог", icon: _a },
		{ to: "/admin/stock", label: "Склад", icon: sl },
		{ to: "/admin/clients", label: "Клиенты", icon: hi },
		{ to: "/admin/finance", label: "Финансы", icon: fi },
		{ to: "/admin/certificates", label: "Сертификаты", icon: Ys },
		{ to: "/admin/labels", label: "Ярлыки", icon: rl },
		{ to: "/admin/documents", label: "Документы", icon: bt },
		{ to: "/admin/settings", label: "Настройки", icon: Gr },
		{ to: "/admin/backups", label: "Бэкапы", icon: al },
	],
	Fu = [
		{ to: "/admin/suppliers", label: "Поставщики", icon: us },
		{ to: "/admin/procurement", label: "Закупки", icon: Os },
		{ to: "/admin/batches", label: "Партии", icon: nl },
		{ to: "/admin/write-offs", label: "Списания", icon: ka },
		{ to: "/admin/contracts", label: "Госконтракты", icon: bt },
		{ to: "/admin/tenders", label: "Тендеры", icon: xi },
		{ to: "/admin/analytics", label: "Аналитика", icon: fi },
		{ to: "/admin/crm", label: "CRM", icon: hi },
		{ to: "/admin/reminders", label: "Напоминания", icon: il },
		{ to: "/admin/calendar", label: "Календарь", icon: ol },
		{ to: "/admin/logistics", label: "Маршруты", icon: ll },
		{ to: "/admin/price-log", label: "Цены закупок", icon: cl },
	],
	Lu = ({ collapsed: e, onToggle: t }) => {
		const [s, a] = O.useState(!1),
			n = e !== void 0 ? e : s,
			{ logout: i, user: o } = Ee(),
			l = qt(),
			c = () => {
				t ? t() : a(!s);
			},
			d = () => {
				(i(), l("/"));
			},
			u = (m) => {
				const v = m.icon;
				return r.jsxs(
					Kt,
					{
						to: m.to,
						end: m.exact,
						className: ({ isActive: p }) =>
							U(
								"flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors",
								"text-sm font-medium",
								p
									? "bg-primary-600/20 text-primary-400 border border-primary-600/20"
									: "text-gray-400 hover:bg-gray-800 hover:text-white",
							),
						title: n ? m.label : void 0,
						children: [
							r.jsx(v, { className: "w-5 h-5 flex-shrink-0" }),
							!n && r.jsx("span", { className: "truncate", children: m.label }),
						],
					},
					m.to,
				);
			};
		return r.jsxs("aside", {
			className: U(
				"h-screen bg-gray-900 text-gray-300 flex flex-col flex-shrink-0",
				"transition-all duration-300 ease-in-out",
				n ? "w-16" : "w-60",
			),
			children: [
				r.jsxs("div", {
					className: U(
						"flex items-center border-b border-gray-800 h-16 flex-shrink-0",
						n ? "justify-center px-2" : "justify-between px-4",
					),
					children: [
						!n &&
							r.jsxs("div", {
								children: [
									r.jsx("div", {
										className: "text-sm font-bold text-white",
										children: "АГРОРЕЗЕРВ",
									}),
									r.jsx("div", {
										className: "text-xs text-primary-400",
										children: "Панель управления",
									}),
								],
							}),
						r.jsx("button", {
							onClick: c,
							className:
								"p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0",
							"aria-label": n ? "Развернуть" : "Свернуть",
							children: n
								? r.jsx(Ae, { className: "w-4 h-4" })
								: r.jsx(mi, { className: "w-4 h-4" }),
						}),
					],
				}),
				r.jsxs("nav", {
					className: "flex-1 overflow-y-auto py-4 px-2 space-y-0.5",
					children: [
						Iu.map(u),
						r.jsx("div", {
							className: U("pt-3 pb-1", "px-1"),
							children: n
								? r.jsx("div", { className: "border-t border-gray-800 mx-1" })
								: r.jsx("div", {
										className:
											"text-xs font-semibold text-gray-500 uppercase tracking-wider px-1.5 py-1 border-t border-gray-800",
										children: "Расширенные",
									}),
						}),
						Fu.map(u),
					],
				}),
				r.jsxs("div", {
					className: "border-t border-gray-800 p-2 space-y-0.5",
					children: [
						r.jsxs("a", {
							href: "/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: U(
								"flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors",
							),
							title: n ? "Сайт" : void 0,
							children: [
								r.jsx(dl, { className: "w-5 h-5 flex-shrink-0" }),
								!n && r.jsx("span", { children: "Открыть сайт" }),
							],
						}),
						!n &&
							r.jsxs("div", {
								className: "px-2.5 py-2",
								children: [
									r.jsx("div", {
										className:
											"text-xs font-semibold text-gray-500 uppercase tracking-wider truncate",
										children: o == null ? void 0 : o.full_name,
									}),
									r.jsx("div", {
										className: "text-xs text-gray-600 truncate",
										children: o == null ? void 0 : o.email,
									}),
								],
							}),
						r.jsxs("button", {
							onClick: d,
							className: U(
								"w-full flex items-center gap-3 px-2.5 py-2 rounded-lg",
								"text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors",
							),
							title: n ? "Выйти" : void 0,
							children: [
								r.jsx(di, { className: "w-5 h-5 flex-shrink-0" }),
								!n && r.jsx("span", { children: "Выйти" }),
							],
						}),
					],
				}),
			],
		});
	},
	Mu = () => {
		const [e, t] = O.useState(!1);
		return r.jsxs("div", {
			className: "flex h-screen bg-gray-100 overflow-hidden",
			children: [
				r.jsx(Lu, { collapsed: e, onToggle: () => t(!e) }),
				r.jsx("div", {
					className: "flex-1 flex flex-col overflow-hidden",
					children: r.jsx("main", {
						className: "flex-1 overflow-y-auto",
						children: r.jsx(Cs, {}),
					}),
				}),
			],
		});
	},
	bs = "Агрорезерв",
	ao =
		"Оптовые поставки овощей и фруктов из Узбекистана в Тобольск. Цены на 20-35% ниже рынка.",
	Ss = "https://agroreserve.ru",
	no = ({
		title: e,
		description: t = ao,
		canonical: s,
		ogImage: a,
		ogType: n = "website",
		schema: i,
	}) => (
		O.useEffect(
			() => (
				(document.title = e
					? `${e} — ${bs}`
					: `${bs} — оптовые овощи и фрукты из Узбекистана`),
				Et("description", t),
				Et("og:title", e || bs, "property"),
				Et("og:description", t, "property"),
				Et("og:type", n, "property"),
				Et("og:site_name", bs, "property"),
				s &&
					(Et("og:url", `${Ss}${s}`, "property"), Vu("canonical", `${Ss}${s}`)),
				a && Et("og:image", a, "property"),
				i && $u(i),
				() => {
					var o;
					(o = document.getElementById("seo-jsonld")) == null || o.remove();
				}
			),
			[e, t, s, a, n, i],
		),
		null
	);
function Et(e, t, s = "name") {
	let a = document.querySelector(`meta[${s}="${e}"]`);
	(a ||
		((a = document.createElement("meta")),
		a.setAttribute(s, e),
		document.head.appendChild(a)),
		(a.content = t));
}
function Vu(e, t) {
	let s = document.querySelector(`link[rel="${e}"]`);
	(s ||
		((s = document.createElement("link")),
		(s.rel = e),
		document.head.appendChild(s)),
		(s.href = t));
}
function $u(e) {
	let t = document.getElementById("seo-jsonld");
	(t ||
		((t = document.createElement("script")),
		(t.id = "seo-jsonld"),
		(t.type = "application/ld+json"),
		document.head.appendChild(t)),
		(t.textContent = JSON.stringify(e)));
}
const zu = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Агрорезерв",
		legalName: "ИП Наимов Хусейн Вохиджонович",
		url: Ss,
		description: ao,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Тобольск",
			addressRegion: "Тюменская область",
			addressCountry: "RU",
		},
	},
	Uu = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: bs,
		url: Ss,
		potentialAction: {
			"@type": "SearchAction",
			target: `${Ss}/catalog?search={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	},
	Da = async () => (await _e.get("/catalog/categories")).data,
	io = async (e) => (await _e.get("/catalog/products", { params: e })).data,
	qu = {
		ovoshchi: "🥕",
		frukty: "🍎",
		sukhofruktyi: "🍇",
		orekhyi: "🥜",
		spetsii: "🌶️",
		myod: "🍯",
		masla: "🫒",
	},
	Bu = [
		{
			icon: gi,
			iconColor: "text-green-600",
			bgColor: "bg-green-50",
			title: "Цены на 20–35% ниже",
			description:
				"Прямые поставки, без посредников. Семейные связи с фермерами.",
		},
		{
			icon: us,
			iconColor: "text-blue-600",
			bgColor: "bg-blue-50",
			title: "Бесплатная доставка",
			description:
				"Развозим по Тобольску и пригороду на собственной газели. Без доплат.",
		},
		{
			icon: Sa,
			iconColor: "text-purple-600",
			bgColor: "bg-purple-50",
			title: "Документы для 44-ФЗ",
			description:
				"Полный пакет: ТОРГ-12, счёт-фактура, сертификаты ТР ТС, декларации соответствия.",
		},
		{
			icon: Xs,
			iconColor: "text-primary-600",
			bgColor: "bg-primary-50",
			title: "Свежесть гарантируем",
			description:
				"Поставки каждые 2 недели. Хранение в 3-зонном складе: +15°C, +2–6°C, сухая зона.",
		},
	],
	_n = [
		{
			number: "01",
			title: "Выберите товары",
			description: "Просмотрите каталог, добавьте нужные товары в корзину",
		},
		{
			number: "02",
			title: "Оформите заказ",
			description: "Укажите адрес, выберите дату и время доставки",
		},
		{
			number: "03",
			title: "Получите доставку",
			description: "Доставим точно в срок, с документами и сертификатами",
		},
	],
	Wu = [
		{
			icon: "🏫",
			title: "Школы",
			description: "Прямые контракты до 600 тыс. ₽ по 44-ФЗ",
		},
		{
			icon: "🍽️",
			title: "Кафе и рестораны",
			description: "Свежие овощи и зелень для кухни",
		},
		{
			icon: "🏢",
			title: "Столовые",
			description: "Регулярные поставки по расписанию",
		},
		{
			icon: "🏪",
			title: "Магазины",
			description: "Широкий ассортимент по оптовым ценам",
		},
	],
	Hu = () => {
		const { isAuthenticated: e } = Ee(),
			{ data: t } = st({ queryKey: ["categories"], queryFn: Da });
		return r.jsxs(r.Fragment, {
			children: [
				r.jsx(no, {
					title: "Свежие овощи и фрукты оптом из Узбекистана",
					description:
						"Агрорезерв — прямые поставки овощей и фруктов из Узбекистана в Тобольск. Цены на 20-35% ниже рынка. Документы для 44-ФЗ.",
					canonical: "/",
					schema: { ...zu, ...Uu },
				}),
				r.jsxs("div", {
					children: [
						r.jsxs("section", {
							className:
								"relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white overflow-hidden",
							children: [
								r.jsxs("div", {
									className:
										"absolute inset-0 overflow-hidden pointer-events-none",
									children: [
										r.jsx("div", {
											className:
												"absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full",
										}),
										r.jsx("div", {
											className:
												"absolute -bottom-8 -left-8 w-48 h-48 bg-white/5 rounded-full",
										}),
										r.jsx("div", {
											className:
												"absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full",
										}),
									],
								}),
								r.jsx("div", {
									className:
										"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24",
									children: r.jsxs("div", {
										className: "max-w-2xl",
										children: [
											r.jsxs("div", {
												className:
													"inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium mb-6",
												children: [
													r.jsx("span", {
														className:
															"w-2 h-2 bg-green-300 rounded-full animate-pulse",
													}),
													"Прямые поставки",
												],
											}),
											r.jsxs("h1", {
												className:
													"text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4",
												children: [
													"Свежие овощи и фрукты",
													r.jsx("span", {
														className: "block text-green-200 mt-1",
														children: "оптом в Тобольске",
													}),
												],
											}),
											r.jsxs("p", {
												className: "text-lg text-white/80 mb-8 leading-relaxed",
												children: [
													"Прямые поставки от фермеров. Цены на",
													" ",
													r.jsx("span", {
														className: "font-semibold text-white",
														children: "20–35% ниже рынка",
													}),
													". Полный пакет документов для госзакупок по 44-ФЗ.",
												],
											}),
											r.jsxs("div", {
												className: "flex flex-col sm:flex-row gap-3",
												children: [
													r.jsxs(H, {
														to: e ? "/catalog" : "/quick-order",
														className:
															"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg shadow-primary-900/20",
														children: [
															r.jsx(Os, { className: "w-5 h-5" }),
															"Перейти в каталог",
														],
													}),
													r.jsxs(H, {
														to: "/schools",
														className:
															"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-colors",
														children: [
															r.jsx(Sa, { className: "w-5 h-5" }),
															"Для школ (44-ФЗ)",
														],
													}),
												],
											}),
											r.jsxs("div", {
												className:
													"flex items-center gap-6 mt-8 pt-6 border-t border-white/20",
												children: [
													r.jsxs("div", {
														children: [
															r.jsx("div", {
																className: "text-2xl font-bold",
																children: "200+",
															}),
															r.jsx("div", {
																className: "text-xs text-white/70",
																children: "наименований",
															}),
														],
													}),
													r.jsx("div", { className: "w-px h-8 bg-white/20" }),
													r.jsxs("div", {
														children: [
															r.jsx("div", {
																className: "text-2xl font-bold",
																children: "35%",
															}),
															r.jsx("div", {
																className: "text-xs text-white/70",
																children: "ниже рынка",
															}),
														],
													}),
													r.jsx("div", { className: "w-px h-8 bg-white/20" }),
													r.jsxs("div", {
														children: [
															r.jsx("div", {
																className: "text-2xl font-bold",
																children: "0 ₽",
															}),
															r.jsx("div", {
																className: "text-xs text-white/70",
																children: "доставка",
															}),
														],
													}),
												],
											}),
										],
									}),
								}),
							],
						}),
						r.jsx("section", {
							className: "bg-gray-50 py-16",
							children: r.jsxs("div", {
								className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
								children: [
									r.jsxs("div", {
										className: "text-center mb-10",
										children: [
											r.jsx("h2", {
												className:
													"text-2xl sm:text-3xl font-bold text-gray-900",
												children: "Почему выбирают Агрорезерв",
											}),
											r.jsx("p", {
												className: "text-gray-500 mt-2",
												children:
													"Мы не просто поставщик — мы надёжный партнёр",
											}),
										],
									}),
									r.jsx("div", {
										className:
											"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
										children: Bu.map((s, a) => {
											const n = s.icon;
											return r.jsxs(
												"div",
												{
													className:
														"bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all",
													children: [
														r.jsx("div", {
															className: `w-12 h-12 ${s.bgColor} rounded-xl flex items-center justify-center mb-4`,
															children: r.jsx(n, {
																className: `w-6 h-6 ${s.iconColor}`,
															}),
														}),
														r.jsx("h3", {
															className: "font-semibold text-gray-900 mb-2",
															children: s.title,
														}),
														r.jsx("p", {
															className:
																"text-sm text-gray-500 leading-relaxed",
															children: s.description,
														}),
													],
												},
												a,
											);
										}),
									}),
								],
							}),
						}),
						r.jsx("section", {
							className: "py-16",
							children: r.jsxs("div", {
								className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
								children: [
									r.jsxs("div", {
										className: "flex items-center justify-between mb-8",
										children: [
											r.jsxs("div", {
												children: [
													r.jsx("h2", {
														className:
															"text-2xl sm:text-3xl font-bold text-gray-900",
														children: "Каталог товаров",
													}),
													r.jsx("p", {
														className: "text-gray-500 mt-1",
														children: "Свежие продукты прямо с грядки",
													}),
												],
											}),
											r.jsxs(H, {
												to: e ? "/catalog" : "/quick-order",
												className:
													"flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium text-sm",
												children: [
													"Весь каталог",
													r.jsx(Ae, { className: "w-4 h-4" }),
												],
											}),
										],
									}),
									r.jsxs("div", {
										className:
											"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4",
										children: [
											(t || []).map((s) =>
												r.jsxs(
													H,
													{
														to: `/catalog/${s.slug}`,
														className:
															"group flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50/30 hover:shadow-sm transition-all text-center",
														children: [
															r.jsx("div", {
																className:
																	"text-4xl mb-3 group-hover:scale-110 transition-transform",
																children: qu[s.slug] || "🌿",
															}),
															r.jsx("div", {
																className:
																	"text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors",
																children: s.name,
															}),
															s.product_count > 0 &&
																r.jsxs("div", {
																	className: "text-xs text-gray-400 mt-0.5",
																	children: [s.product_count, " товаров"],
																}),
														],
													},
													s.id,
												),
											),
											!t &&
												Array.from({ length: 7 }).map((s, a) =>
													r.jsx(
														"div",
														{
															className:
																"h-28 bg-gray-200 rounded-xl animate-pulse",
														},
														a,
													),
												),
										],
									}),
								],
							}),
						}),
						r.jsx("section", {
							className: "bg-primary-50 py-16",
							children: r.jsxs("div", {
								className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
								children: [
									r.jsxs("div", {
										className: "text-center mb-10",
										children: [
											r.jsx("h2", {
												className:
													"text-2xl sm:text-3xl font-bold text-gray-900",
												children: "Как сделать заказ",
											}),
											r.jsx("p", {
												className: "text-gray-500 mt-2",
												children: "Просто, быстро, удобно",
											}),
										],
									}),
									r.jsx("div", {
										className:
											"grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto",
										children: _n.map((s, a) =>
											r.jsxs(
												"div",
												{
													className: "relative text-center",
													children: [
														a < _n.length - 1 &&
															r.jsx("div", {
																className:
																	"hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary-200 z-0",
															}),
														r.jsxs("div", {
															className: "relative z-10",
															children: [
																r.jsx("div", {
																	className:
																		"w-16 h-16 bg-primary-600 text-white text-xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200",
																	children: s.number,
																}),
																r.jsx("h3", {
																	className: "font-semibold text-gray-900 mb-2",
																	children: s.title,
																}),
																r.jsx("p", {
																	className: "text-sm text-gray-500",
																	children: s.description,
																}),
															],
														}),
													],
												},
												a,
											),
										),
									}),
									r.jsx("div", {
										className: "text-center mt-10",
										children: r.jsxs(H, {
											to: "/register",
											className:
												"inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200",
											children: [
												"Зарегистрироваться и начать",
												r.jsx(Ae, { className: "w-5 h-5" }),
											],
										}),
									}),
								],
							}),
						}),
						r.jsx("section", {
							className: "py-16",
							children: r.jsxs("div", {
								className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
								children: [
									r.jsxs("div", {
										className: "text-center mb-10",
										children: [
											r.jsx("h2", {
												className:
													"text-2xl sm:text-3xl font-bold text-gray-900",
												children: "Наши клиенты",
											}),
											r.jsx("p", {
												className: "text-gray-500 mt-2",
												children: "Работаем с B2B и B2C клиентами",
											}),
										],
									}),
									r.jsx("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
										children: Wu.map((s, a) =>
											r.jsxs(
												"div",
												{
													className:
														"bg-white rounded-xl border border-gray-200 p-5 text-center hover:border-primary-200 hover:shadow-sm transition-all",
													children: [
														r.jsx("div", {
															className: "text-4xl mb-3",
															children: s.icon,
														}),
														r.jsx("div", {
															className: "font-semibold text-gray-900",
															children: s.title,
														}),
														r.jsx("div", {
															className: "text-xs text-gray-500 mt-1",
															children: s.description,
														}),
													],
												},
												a,
											),
										),
									}),
								],
							}),
						}),
						r.jsx("section", {
							className:
								"bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16",
							children: r.jsx("div", {
								className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
								children: r.jsxs("div", {
									className:
										"flex flex-col lg:flex-row items-center justify-between gap-8",
									children: [
										r.jsxs("div", {
											className: "max-w-lg",
											children: [
												r.jsx("div", {
													className: "text-blue-200 text-sm font-medium mb-2",
													children: "🏫 Для учреждений бюджетной сферы",
												}),
												r.jsx("h2", {
													className: "text-2xl sm:text-3xl font-bold mb-4",
													children:
														"Работаем со школами и госучреждениями по 44-ФЗ",
												}),
												r.jsx("ul", {
													className: "space-y-3 text-blue-100",
													children: [
														"Прямые договоры до 600 000 ₽ без торгов",
														"Полный пакет документов: ТОРГ-12, счёт-фактуры, УПД",
														"Сертификаты ТР ТС, декларации соответствия, ветсправки",
														"Калькулятор меню для школьного питания",
														"ЭЦП, работаем через ЭТП и напрямую",
													].map((s, a) =>
														r.jsxs(
															"li",
															{
																className: "flex items-start gap-2.5",
																children: [
																	r.jsx(ts, {
																		className:
																			"w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5",
																	}),
																	s,
																],
															},
															a,
														),
													),
												}),
											],
										}),
										r.jsx("div", {
											className: "flex-shrink-0",
											children: r.jsxs(H, {
												to: "/schools",
												className:
													"inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base",
												children: [
													"Подробнее для школ",
													r.jsx(Ae, { className: "w-5 h-5" }),
												],
											}),
										}),
									],
								}),
							}),
						}),
						r.jsx("section", {
							className: "py-16 bg-gray-50",
							children: r.jsxs("div", {
								className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
								children: [
									r.jsxs("div", {
										className: "text-center mb-10",
										children: [
											r.jsx("h2", {
												className:
													"text-2xl sm:text-3xl font-bold text-gray-900",
												children: "Свяжитесь с нами",
											}),
											r.jsx("p", {
												className: "text-gray-500 mt-2",
												children:
													"Ответим на все вопросы и оформим первый заказ",
											}),
										],
									}),
									r.jsxs("div", {
										className:
											"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto",
										children: [
											r.jsxs("a", {
												href: "tel:+79000000000",
												className:
													"flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all text-center",
												children: [
													r.jsx("div", {
														className:
															"w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3",
														children: r.jsx(yt, {
															className: "w-6 h-6 text-primary-600",
														}),
													}),
													r.jsx("div", {
														className: "font-semibold text-gray-900",
														children: "Телефон",
													}),
													r.jsx("div", {
														className: "text-sm text-gray-500 mt-1",
														children: "+7 (900) 000-00-00",
													}),
												],
											}),
											r.jsxs("a", {
												href: "https://t.me/agroreserve",
												target: "_blank",
												rel: "noopener noreferrer",
												className:
													"flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all text-center",
												children: [
													r.jsx("div", {
														className:
															"w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3",
														children: r.jsx(Na, {
															className: "w-6 h-6 text-blue-500",
														}),
													}),
													r.jsx("div", {
														className: "font-semibold text-gray-900",
														children: "Telegram",
													}),
													r.jsx("div", {
														className: "text-sm text-gray-500 mt-1",
														children: "@agroreserve",
													}),
												],
											}),
											r.jsxs("div", {
												className:
													"flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 text-center",
												children: [
													r.jsx("div", {
														className:
															"w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-3",
														children: r.jsx(Be, {
															className: "w-6 h-6 text-orange-500",
														}),
													}),
													r.jsx("div", {
														className: "font-semibold text-gray-900",
														children: "Адрес",
													}),
													r.jsx("div", {
														className: "text-sm text-gray-500 mt-1",
														children: "г. Тобольск, Тюменская обл.",
													}),
												],
											}),
											r.jsxs("div", {
												className:
													"flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 text-center",
												children: [
													r.jsx("div", {
														className:
															"w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3",
														children: r.jsx(ds, {
															className: "w-6 h-6 text-green-600",
														}),
													}),
													r.jsx("div", {
														className: "font-semibold text-gray-900",
														children: "Время работы",
													}),
													r.jsx("div", {
														className: "text-sm text-gray-500 mt-1",
														children: "Пн–Сб: 08:00–18:00",
													}),
												],
											}),
										],
									}),
								],
							}),
						}),
					],
				}),
			],
		});
	};
function We(e) {
	const t = Object.prototype.toString.call(e);
	return e instanceof Date || (typeof e == "object" && t === "[object Date]")
		? new e.constructor(+e)
		: typeof e == "number" ||
			  t === "[object Number]" ||
			  typeof e == "string" ||
			  t === "[object String]"
			? new Date(e)
			: new Date(NaN);
}
function vt(e, t) {
	return e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Ia(e, t) {
	const s = We(e);
	return isNaN(t) ? vt(e, NaN) : (t && s.setDate(s.getDate() + t), s);
}
const oo = 6048e5,
	Zu = 864e5,
	lo = 6e4,
	co = 36e5;
let Gu = {};
function jr() {
	return Gu;
}
function Ft(e, t) {
	var l, c, d, u;
	const s = jr(),
		a =
			(t == null ? void 0 : t.weekStartsOn) ??
			((c = (l = t == null ? void 0 : t.locale) == null ? void 0 : l.options) ==
			null
				? void 0
				: c.weekStartsOn) ??
			s.weekStartsOn ??
			((u = (d = s.locale) == null ? void 0 : d.options) == null
				? void 0
				: u.weekStartsOn) ??
			0,
		n = We(e),
		i = n.getDay(),
		o = (i < a ? 7 : 0) + i - a;
	return (n.setDate(n.getDate() - o), n.setHours(0, 0, 0, 0), n);
}
function sr(e) {
	return Ft(e, { weekStartsOn: 1 });
}
function uo(e) {
	const t = We(e),
		s = t.getFullYear(),
		a = vt(e, 0);
	(a.setFullYear(s + 1, 0, 4), a.setHours(0, 0, 0, 0));
	const n = sr(a),
		i = vt(e, 0);
	(i.setFullYear(s, 0, 4), i.setHours(0, 0, 0, 0));
	const o = sr(i);
	return t.getTime() >= n.getTime()
		? s + 1
		: t.getTime() >= o.getTime()
			? s
			: s - 1;
}
function kn(e) {
	const t = We(e);
	return (t.setHours(0, 0, 0, 0), t);
}
function Sn(e) {
	const t = We(e),
		s = new Date(
			Date.UTC(
				t.getFullYear(),
				t.getMonth(),
				t.getDate(),
				t.getHours(),
				t.getMinutes(),
				t.getSeconds(),
				t.getMilliseconds(),
			),
		);
	return (s.setUTCFullYear(t.getFullYear()), +e - +s);
}
function Yu(e, t) {
	const s = kn(e),
		a = kn(t),
		n = +s - Sn(s),
		i = +a - Sn(a);
	return Math.round((n - i) / Zu);
}
function Xu(e) {
	const t = uo(e),
		s = vt(e, 0);
	return (s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0), sr(s));
}
function Ju(e) {
	return (
		e instanceof Date ||
		(typeof e == "object" &&
			Object.prototype.toString.call(e) === "[object Date]")
	);
}
function Qu(e) {
	if (!Ju(e) && typeof e != "number") return !1;
	const t = We(e);
	return !isNaN(Number(t));
}
function Ku(e) {
	const t = We(e),
		s = vt(e, 0);
	return (s.setFullYear(t.getFullYear(), 0, 1), s.setHours(0, 0, 0, 0), s);
}
const em = {
		lessThanXSeconds: {
			one: "less than a second",
			other: "less than {{count}} seconds",
		},
		xSeconds: { one: "1 second", other: "{{count}} seconds" },
		halfAMinute: "half a minute",
		lessThanXMinutes: {
			one: "less than a minute",
			other: "less than {{count}} minutes",
		},
		xMinutes: { one: "1 minute", other: "{{count}} minutes" },
		aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
		xHours: { one: "1 hour", other: "{{count}} hours" },
		xDays: { one: "1 day", other: "{{count}} days" },
		aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
		xWeeks: { one: "1 week", other: "{{count}} weeks" },
		aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
		xMonths: { one: "1 month", other: "{{count}} months" },
		aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
		xYears: { one: "1 year", other: "{{count}} years" },
		overXYears: { one: "over 1 year", other: "over {{count}} years" },
		almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
	},
	tm = (e, t, s) => {
		let a;
		const n = em[e];
		return (
			typeof n == "string"
				? (a = n)
				: t === 1
					? (a = n.one)
					: (a = n.other.replace("{{count}}", t.toString())),
			s != null && s.addSuffix
				? s.comparison && s.comparison > 0
					? "in " + a
					: a + " ago"
				: a
		);
	};
function Jt(e) {
	return (t = {}) => {
		const s = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[s] || e.formats[e.defaultWidth];
	};
}
const sm = {
		full: "EEEE, MMMM do, y",
		long: "MMMM do, y",
		medium: "MMM d, y",
		short: "MM/dd/yyyy",
	},
	rm = {
		full: "h:mm:ss a zzzz",
		long: "h:mm:ss a z",
		medium: "h:mm:ss a",
		short: "h:mm a",
	},
	am = {
		full: "{{date}} 'at' {{time}}",
		long: "{{date}} 'at' {{time}}",
		medium: "{{date}}, {{time}}",
		short: "{{date}}, {{time}}",
	},
	nm = {
		date: Jt({ formats: sm, defaultWidth: "full" }),
		time: Jt({ formats: rm, defaultWidth: "full" }),
		dateTime: Jt({ formats: am, defaultWidth: "full" }),
	},
	im = {
		lastWeek: "'last' eeee 'at' p",
		yesterday: "'yesterday at' p",
		today: "'today at' p",
		tomorrow: "'tomorrow at' p",
		nextWeek: "eeee 'at' p",
		other: "P",
	},
	om = (e, t, s, a) => im[e];
function Je(e) {
	return (t, s) => {
		const a = s != null && s.context ? String(s.context) : "standalone";
		let n;
		if (a === "formatting" && e.formattingValues) {
			const o = e.defaultFormattingWidth || e.defaultWidth,
				l = s != null && s.width ? String(s.width) : o;
			n = e.formattingValues[l] || e.formattingValues[o];
		} else {
			const o = e.defaultWidth,
				l = s != null && s.width ? String(s.width) : e.defaultWidth;
			n = e.values[l] || e.values[o];
		}
		const i = e.argumentCallback ? e.argumentCallback(t) : t;
		return n[i];
	};
}
const lm = {
		narrow: ["B", "A"],
		abbreviated: ["BC", "AD"],
		wide: ["Before Christ", "Anno Domini"],
	},
	cm = {
		narrow: ["1", "2", "3", "4"],
		abbreviated: ["Q1", "Q2", "Q3", "Q4"],
		wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
	},
	dm = {
		narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
		abbreviated: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		wide: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
	},
	um = {
		narrow: ["S", "M", "T", "W", "T", "F", "S"],
		short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		wide: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		],
	},
	mm = {
		narrow: {
			am: "a",
			pm: "p",
			midnight: "mi",
			noon: "n",
			morning: "morning",
			afternoon: "afternoon",
			evening: "evening",
			night: "night",
		},
		abbreviated: {
			am: "AM",
			pm: "PM",
			midnight: "midnight",
			noon: "noon",
			morning: "morning",
			afternoon: "afternoon",
			evening: "evening",
			night: "night",
		},
		wide: {
			am: "a.m.",
			pm: "p.m.",
			midnight: "midnight",
			noon: "noon",
			morning: "morning",
			afternoon: "afternoon",
			evening: "evening",
			night: "night",
		},
	},
	hm = {
		narrow: {
			am: "a",
			pm: "p",
			midnight: "mi",
			noon: "n",
			morning: "in the morning",
			afternoon: "in the afternoon",
			evening: "in the evening",
			night: "at night",
		},
		abbreviated: {
			am: "AM",
			pm: "PM",
			midnight: "midnight",
			noon: "noon",
			morning: "in the morning",
			afternoon: "in the afternoon",
			evening: "in the evening",
			night: "at night",
		},
		wide: {
			am: "a.m.",
			pm: "p.m.",
			midnight: "midnight",
			noon: "noon",
			morning: "in the morning",
			afternoon: "in the afternoon",
			evening: "in the evening",
			night: "at night",
		},
	},
	fm = (e, t) => {
		const s = Number(e),
			a = s % 100;
		if (a > 20 || a < 10)
			switch (a % 10) {
				case 1:
					return s + "st";
				case 2:
					return s + "nd";
				case 3:
					return s + "rd";
			}
		return s + "th";
	},
	xm = {
		ordinalNumber: fm,
		era: Je({ values: lm, defaultWidth: "wide" }),
		quarter: Je({
			values: cm,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1,
		}),
		month: Je({ values: dm, defaultWidth: "wide" }),
		day: Je({ values: um, defaultWidth: "wide" }),
		dayPeriod: Je({
			values: mm,
			defaultWidth: "wide",
			formattingValues: hm,
			defaultFormattingWidth: "wide",
		}),
	};
function Qe(e) {
	return (t, s = {}) => {
		const a = s.width,
			n = (a && e.matchPatterns[a]) || e.matchPatterns[e.defaultMatchWidth],
			i = t.match(n);
		if (!i) return null;
		const o = i[0],
			l = (a && e.parsePatterns[a]) || e.parsePatterns[e.defaultParseWidth],
			c = Array.isArray(l) ? pm(l, (m) => m.test(o)) : gm(l, (m) => m.test(o));
		let d;
		((d = e.valueCallback ? e.valueCallback(c) : c),
			(d = s.valueCallback ? s.valueCallback(d) : d));
		const u = t.slice(o.length);
		return { value: d, rest: u };
	};
}
function gm(e, t) {
	for (const s in e)
		if (Object.prototype.hasOwnProperty.call(e, s) && t(e[s])) return s;
}
function pm(e, t) {
	for (let s = 0; s < e.length; s++) if (t(e[s])) return s;
}
function mo(e) {
	return (t, s = {}) => {
		const a = t.match(e.matchPattern);
		if (!a) return null;
		const n = a[0],
			i = t.match(e.parsePattern);
		if (!i) return null;
		let o = e.valueCallback ? e.valueCallback(i[0]) : i[0];
		o = s.valueCallback ? s.valueCallback(o) : o;
		const l = t.slice(n.length);
		return { value: o, rest: l };
	};
}
const ym = /^(\d+)(th|st|nd|rd)?/i,
	bm = /\d+/i,
	vm = {
		narrow: /^(b|a)/i,
		abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
		wide: /^(before christ|before common era|anno domini|common era)/i,
	},
	jm = { any: [/^b/i, /^(a|c)/i] },
	wm = {
		narrow: /^[1234]/i,
		abbreviated: /^q[1234]/i,
		wide: /^[1234](th|st|nd|rd)? quarter/i,
	},
	Nm = { any: [/1/i, /2/i, /3/i, /4/i] },
	_m = {
		narrow: /^[jfmasond]/i,
		abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
		wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
	},
	km = {
		narrow: [
			/^j/i,
			/^f/i,
			/^m/i,
			/^a/i,
			/^m/i,
			/^j/i,
			/^j/i,
			/^a/i,
			/^s/i,
			/^o/i,
			/^n/i,
			/^d/i,
		],
		any: [
			/^ja/i,
			/^f/i,
			/^mar/i,
			/^ap/i,
			/^may/i,
			/^jun/i,
			/^jul/i,
			/^au/i,
			/^s/i,
			/^o/i,
			/^n/i,
			/^d/i,
		],
	},
	Sm = {
		narrow: /^[smtwf]/i,
		short: /^(su|mo|tu|we|th|fr|sa)/i,
		abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
		wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
	},
	Em = {
		narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
		any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
	},
	Cm = {
		narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
		any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
	},
	Am = {
		any: {
			am: /^a/i,
			pm: /^p/i,
			midnight: /^mi/i,
			noon: /^no/i,
			morning: /morning/i,
			afternoon: /afternoon/i,
			evening: /evening/i,
			night: /night/i,
		},
	},
	Om = {
		ordinalNumber: mo({
			matchPattern: ym,
			parsePattern: bm,
			valueCallback: (e) => parseInt(e, 10),
		}),
		era: Qe({
			matchPatterns: vm,
			defaultMatchWidth: "wide",
			parsePatterns: jm,
			defaultParseWidth: "any",
		}),
		quarter: Qe({
			matchPatterns: wm,
			defaultMatchWidth: "wide",
			parsePatterns: Nm,
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1,
		}),
		month: Qe({
			matchPatterns: _m,
			defaultMatchWidth: "wide",
			parsePatterns: km,
			defaultParseWidth: "any",
		}),
		day: Qe({
			matchPatterns: Sm,
			defaultMatchWidth: "wide",
			parsePatterns: Em,
			defaultParseWidth: "any",
		}),
		dayPeriod: Qe({
			matchPatterns: Cm,
			defaultMatchWidth: "any",
			parsePatterns: Am,
			defaultParseWidth: "any",
		}),
	},
	Tm = {
		code: "en-US",
		formatDistance: tm,
		formatLong: nm,
		formatRelative: om,
		localize: xm,
		match: Om,
		options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
	};
function Rm(e) {
	const t = We(e);
	return Yu(t, Ku(t)) + 1;
}
function Pm(e) {
	const t = We(e),
		s = +sr(t) - +Xu(t);
	return Math.round(s / oo) + 1;
}
function ho(e, t) {
	var u, m, v, p;
	const s = We(e),
		a = s.getFullYear(),
		n = jr(),
		i =
			(t == null ? void 0 : t.firstWeekContainsDate) ??
			((m = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) ==
			null
				? void 0
				: m.firstWeekContainsDate) ??
			n.firstWeekContainsDate ??
			((p = (v = n.locale) == null ? void 0 : v.options) == null
				? void 0
				: p.firstWeekContainsDate) ??
			1,
		o = vt(e, 0);
	(o.setFullYear(a + 1, 0, i), o.setHours(0, 0, 0, 0));
	const l = Ft(o, t),
		c = vt(e, 0);
	(c.setFullYear(a, 0, i), c.setHours(0, 0, 0, 0));
	const d = Ft(c, t);
	return s.getTime() >= l.getTime()
		? a + 1
		: s.getTime() >= d.getTime()
			? a
			: a - 1;
}
function Dm(e, t) {
	var l, c, d, u;
	const s = jr(),
		a =
			(t == null ? void 0 : t.firstWeekContainsDate) ??
			((c = (l = t == null ? void 0 : t.locale) == null ? void 0 : l.options) ==
			null
				? void 0
				: c.firstWeekContainsDate) ??
			s.firstWeekContainsDate ??
			((u = (d = s.locale) == null ? void 0 : d.options) == null
				? void 0
				: u.firstWeekContainsDate) ??
			1,
		n = ho(e, t),
		i = vt(e, 0);
	return (i.setFullYear(n, 0, a), i.setHours(0, 0, 0, 0), Ft(i, t));
}
function Im(e, t) {
	const s = We(e),
		a = +Ft(s, t) - +Dm(s, t);
	return Math.round(a / oo) + 1;
}
function oe(e, t) {
	const s = e < 0 ? "-" : "",
		a = Math.abs(e).toString().padStart(t, "0");
	return s + a;
}
const ut = {
		y(e, t) {
			const s = e.getFullYear(),
				a = s > 0 ? s : 1 - s;
			return oe(t === "yy" ? a % 100 : a, t.length);
		},
		M(e, t) {
			const s = e.getMonth();
			return t === "M" ? String(s + 1) : oe(s + 1, 2);
		},
		d(e, t) {
			return oe(e.getDate(), t.length);
		},
		a(e, t) {
			const s = e.getHours() / 12 >= 1 ? "pm" : "am";
			switch (t) {
				case "a":
				case "aa":
					return s.toUpperCase();
				case "aaa":
					return s;
				case "aaaaa":
					return s[0];
				case "aaaa":
				default:
					return s === "am" ? "a.m." : "p.m.";
			}
		},
		h(e, t) {
			return oe(e.getHours() % 12 || 12, t.length);
		},
		H(e, t) {
			return oe(e.getHours(), t.length);
		},
		m(e, t) {
			return oe(e.getMinutes(), t.length);
		},
		s(e, t) {
			return oe(e.getSeconds(), t.length);
		},
		S(e, t) {
			const s = t.length,
				a = e.getMilliseconds(),
				n = Math.trunc(a * Math.pow(10, s - 3));
			return oe(n, t.length);
		},
	},
	Wt = {
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night",
	},
	En = {
		G: function (e, t, s) {
			const a = e.getFullYear() > 0 ? 1 : 0;
			switch (t) {
				case "G":
				case "GG":
				case "GGG":
					return s.era(a, { width: "abbreviated" });
				case "GGGGG":
					return s.era(a, { width: "narrow" });
				case "GGGG":
				default:
					return s.era(a, { width: "wide" });
			}
		},
		y: function (e, t, s) {
			if (t === "yo") {
				const a = e.getFullYear(),
					n = a > 0 ? a : 1 - a;
				return s.ordinalNumber(n, { unit: "year" });
			}
			return ut.y(e, t);
		},
		Y: function (e, t, s, a) {
			const n = ho(e, a),
				i = n > 0 ? n : 1 - n;
			if (t === "YY") {
				const o = i % 100;
				return oe(o, 2);
			}
			return t === "Yo"
				? s.ordinalNumber(i, { unit: "year" })
				: oe(i, t.length);
		},
		R: function (e, t) {
			const s = uo(e);
			return oe(s, t.length);
		},
		u: function (e, t) {
			const s = e.getFullYear();
			return oe(s, t.length);
		},
		Q: function (e, t, s) {
			const a = Math.ceil((e.getMonth() + 1) / 3);
			switch (t) {
				case "Q":
					return String(a);
				case "QQ":
					return oe(a, 2);
				case "Qo":
					return s.ordinalNumber(a, { unit: "quarter" });
				case "QQQ":
					return s.quarter(a, { width: "abbreviated", context: "formatting" });
				case "QQQQQ":
					return s.quarter(a, { width: "narrow", context: "formatting" });
				case "QQQQ":
				default:
					return s.quarter(a, { width: "wide", context: "formatting" });
			}
		},
		q: function (e, t, s) {
			const a = Math.ceil((e.getMonth() + 1) / 3);
			switch (t) {
				case "q":
					return String(a);
				case "qq":
					return oe(a, 2);
				case "qo":
					return s.ordinalNumber(a, { unit: "quarter" });
				case "qqq":
					return s.quarter(a, { width: "abbreviated", context: "standalone" });
				case "qqqqq":
					return s.quarter(a, { width: "narrow", context: "standalone" });
				case "qqqq":
				default:
					return s.quarter(a, { width: "wide", context: "standalone" });
			}
		},
		M: function (e, t, s) {
			const a = e.getMonth();
			switch (t) {
				case "M":
				case "MM":
					return ut.M(e, t);
				case "Mo":
					return s.ordinalNumber(a + 1, { unit: "month" });
				case "MMM":
					return s.month(a, { width: "abbreviated", context: "formatting" });
				case "MMMMM":
					return s.month(a, { width: "narrow", context: "formatting" });
				case "MMMM":
				default:
					return s.month(a, { width: "wide", context: "formatting" });
			}
		},
		L: function (e, t, s) {
			const a = e.getMonth();
			switch (t) {
				case "L":
					return String(a + 1);
				case "LL":
					return oe(a + 1, 2);
				case "Lo":
					return s.ordinalNumber(a + 1, { unit: "month" });
				case "LLL":
					return s.month(a, { width: "abbreviated", context: "standalone" });
				case "LLLLL":
					return s.month(a, { width: "narrow", context: "standalone" });
				case "LLLL":
				default:
					return s.month(a, { width: "wide", context: "standalone" });
			}
		},
		w: function (e, t, s, a) {
			const n = Im(e, a);
			return t === "wo"
				? s.ordinalNumber(n, { unit: "week" })
				: oe(n, t.length);
		},
		I: function (e, t, s) {
			const a = Pm(e);
			return t === "Io"
				? s.ordinalNumber(a, { unit: "week" })
				: oe(a, t.length);
		},
		d: function (e, t, s) {
			return t === "do"
				? s.ordinalNumber(e.getDate(), { unit: "date" })
				: ut.d(e, t);
		},
		D: function (e, t, s) {
			const a = Rm(e);
			return t === "Do"
				? s.ordinalNumber(a, { unit: "dayOfYear" })
				: oe(a, t.length);
		},
		E: function (e, t, s) {
			const a = e.getDay();
			switch (t) {
				case "E":
				case "EE":
				case "EEE":
					return s.day(a, { width: "abbreviated", context: "formatting" });
				case "EEEEE":
					return s.day(a, { width: "narrow", context: "formatting" });
				case "EEEEEE":
					return s.day(a, { width: "short", context: "formatting" });
				case "EEEE":
				default:
					return s.day(a, { width: "wide", context: "formatting" });
			}
		},
		e: function (e, t, s, a) {
			const n = e.getDay(),
				i = (n - a.weekStartsOn + 8) % 7 || 7;
			switch (t) {
				case "e":
					return String(i);
				case "ee":
					return oe(i, 2);
				case "eo":
					return s.ordinalNumber(i, { unit: "day" });
				case "eee":
					return s.day(n, { width: "abbreviated", context: "formatting" });
				case "eeeee":
					return s.day(n, { width: "narrow", context: "formatting" });
				case "eeeeee":
					return s.day(n, { width: "short", context: "formatting" });
				case "eeee":
				default:
					return s.day(n, { width: "wide", context: "formatting" });
			}
		},
		c: function (e, t, s, a) {
			const n = e.getDay(),
				i = (n - a.weekStartsOn + 8) % 7 || 7;
			switch (t) {
				case "c":
					return String(i);
				case "cc":
					return oe(i, t.length);
				case "co":
					return s.ordinalNumber(i, { unit: "day" });
				case "ccc":
					return s.day(n, { width: "abbreviated", context: "standalone" });
				case "ccccc":
					return s.day(n, { width: "narrow", context: "standalone" });
				case "cccccc":
					return s.day(n, { width: "short", context: "standalone" });
				case "cccc":
				default:
					return s.day(n, { width: "wide", context: "standalone" });
			}
		},
		i: function (e, t, s) {
			const a = e.getDay(),
				n = a === 0 ? 7 : a;
			switch (t) {
				case "i":
					return String(n);
				case "ii":
					return oe(n, t.length);
				case "io":
					return s.ordinalNumber(n, { unit: "day" });
				case "iii":
					return s.day(a, { width: "abbreviated", context: "formatting" });
				case "iiiii":
					return s.day(a, { width: "narrow", context: "formatting" });
				case "iiiiii":
					return s.day(a, { width: "short", context: "formatting" });
				case "iiii":
				default:
					return s.day(a, { width: "wide", context: "formatting" });
			}
		},
		a: function (e, t, s) {
			const n = e.getHours() / 12 >= 1 ? "pm" : "am";
			switch (t) {
				case "a":
				case "aa":
					return s.dayPeriod(n, {
						width: "abbreviated",
						context: "formatting",
					});
				case "aaa":
					return s
						.dayPeriod(n, { width: "abbreviated", context: "formatting" })
						.toLowerCase();
				case "aaaaa":
					return s.dayPeriod(n, { width: "narrow", context: "formatting" });
				case "aaaa":
				default:
					return s.dayPeriod(n, { width: "wide", context: "formatting" });
			}
		},
		b: function (e, t, s) {
			const a = e.getHours();
			let n;
			switch (
				(a === 12
					? (n = Wt.noon)
					: a === 0
						? (n = Wt.midnight)
						: (n = a / 12 >= 1 ? "pm" : "am"),
				t)
			) {
				case "b":
				case "bb":
					return s.dayPeriod(n, {
						width: "abbreviated",
						context: "formatting",
					});
				case "bbb":
					return s
						.dayPeriod(n, { width: "abbreviated", context: "formatting" })
						.toLowerCase();
				case "bbbbb":
					return s.dayPeriod(n, { width: "narrow", context: "formatting" });
				case "bbbb":
				default:
					return s.dayPeriod(n, { width: "wide", context: "formatting" });
			}
		},
		B: function (e, t, s) {
			const a = e.getHours();
			let n;
			switch (
				(a >= 17
					? (n = Wt.evening)
					: a >= 12
						? (n = Wt.afternoon)
						: a >= 4
							? (n = Wt.morning)
							: (n = Wt.night),
				t)
			) {
				case "B":
				case "BB":
				case "BBB":
					return s.dayPeriod(n, {
						width: "abbreviated",
						context: "formatting",
					});
				case "BBBBB":
					return s.dayPeriod(n, { width: "narrow", context: "formatting" });
				case "BBBB":
				default:
					return s.dayPeriod(n, { width: "wide", context: "formatting" });
			}
		},
		h: function (e, t, s) {
			if (t === "ho") {
				let a = e.getHours() % 12;
				return (a === 0 && (a = 12), s.ordinalNumber(a, { unit: "hour" }));
			}
			return ut.h(e, t);
		},
		H: function (e, t, s) {
			return t === "Ho"
				? s.ordinalNumber(e.getHours(), { unit: "hour" })
				: ut.H(e, t);
		},
		K: function (e, t, s) {
			const a = e.getHours() % 12;
			return t === "Ko"
				? s.ordinalNumber(a, { unit: "hour" })
				: oe(a, t.length);
		},
		k: function (e, t, s) {
			let a = e.getHours();
			return (
				a === 0 && (a = 24),
				t === "ko" ? s.ordinalNumber(a, { unit: "hour" }) : oe(a, t.length)
			);
		},
		m: function (e, t, s) {
			return t === "mo"
				? s.ordinalNumber(e.getMinutes(), { unit: "minute" })
				: ut.m(e, t);
		},
		s: function (e, t, s) {
			return t === "so"
				? s.ordinalNumber(e.getSeconds(), { unit: "second" })
				: ut.s(e, t);
		},
		S: function (e, t) {
			return ut.S(e, t);
		},
		X: function (e, t, s) {
			const a = e.getTimezoneOffset();
			if (a === 0) return "Z";
			switch (t) {
				case "X":
					return An(a);
				case "XXXX":
				case "XX":
					return At(a);
				case "XXXXX":
				case "XXX":
				default:
					return At(a, ":");
			}
		},
		x: function (e, t, s) {
			const a = e.getTimezoneOffset();
			switch (t) {
				case "x":
					return An(a);
				case "xxxx":
				case "xx":
					return At(a);
				case "xxxxx":
				case "xxx":
				default:
					return At(a, ":");
			}
		},
		O: function (e, t, s) {
			const a = e.getTimezoneOffset();
			switch (t) {
				case "O":
				case "OO":
				case "OOO":
					return "GMT" + Cn(a, ":");
				case "OOOO":
				default:
					return "GMT" + At(a, ":");
			}
		},
		z: function (e, t, s) {
			const a = e.getTimezoneOffset();
			switch (t) {
				case "z":
				case "zz":
				case "zzz":
					return "GMT" + Cn(a, ":");
				case "zzzz":
				default:
					return "GMT" + At(a, ":");
			}
		},
		t: function (e, t, s) {
			const a = Math.trunc(e.getTime() / 1e3);
			return oe(a, t.length);
		},
		T: function (e, t, s) {
			const a = e.getTime();
			return oe(a, t.length);
		},
	};
function Cn(e, t = "") {
	const s = e > 0 ? "-" : "+",
		a = Math.abs(e),
		n = Math.trunc(a / 60),
		i = a % 60;
	return i === 0 ? s + String(n) : s + String(n) + t + oe(i, 2);
}
function An(e, t) {
	return e % 60 === 0
		? (e > 0 ? "-" : "+") + oe(Math.abs(e) / 60, 2)
		: At(e, t);
}
function At(e, t = "") {
	const s = e > 0 ? "-" : "+",
		a = Math.abs(e),
		n = oe(Math.trunc(a / 60), 2),
		i = oe(a % 60, 2);
	return s + n + t + i;
}
const On = (e, t) => {
		switch (e) {
			case "P":
				return t.date({ width: "short" });
			case "PP":
				return t.date({ width: "medium" });
			case "PPP":
				return t.date({ width: "long" });
			case "PPPP":
			default:
				return t.date({ width: "full" });
		}
	},
	fo = (e, t) => {
		switch (e) {
			case "p":
				return t.time({ width: "short" });
			case "pp":
				return t.time({ width: "medium" });
			case "ppp":
				return t.time({ width: "long" });
			case "pppp":
			default:
				return t.time({ width: "full" });
		}
	},
	Fm = (e, t) => {
		const s = e.match(/(P+)(p+)?/) || [],
			a = s[1],
			n = s[2];
		if (!n) return On(e, t);
		let i;
		switch (a) {
			case "P":
				i = t.dateTime({ width: "short" });
				break;
			case "PP":
				i = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				i = t.dateTime({ width: "long" });
				break;
			case "PPPP":
			default:
				i = t.dateTime({ width: "full" });
				break;
		}
		return i.replace("{{date}}", On(a, t)).replace("{{time}}", fo(n, t));
	},
	Lm = { p: fo, P: Fm },
	Mm = /^D+$/,
	Vm = /^Y+$/,
	$m = ["D", "DD", "YY", "YYYY"];
function zm(e) {
	return Mm.test(e);
}
function Um(e) {
	return Vm.test(e);
}
function qm(e, t, s) {
	const a = Bm(e, t, s);
	if ((console.warn(a), $m.includes(e))) throw new RangeError(a);
}
function Bm(e, t, s) {
	const a = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${s}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Wm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
	Hm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
	Zm = /^'([^]*?)'?$/,
	Gm = /''/g,
	Ym = /[a-zA-Z]/;
function fs(e, t, s) {
	var u, m, v, p, g, j, f, k;
	const a = jr(),
		n = (s == null ? void 0 : s.locale) ?? a.locale ?? Tm,
		i =
			(s == null ? void 0 : s.firstWeekContainsDate) ??
			((m = (u = s == null ? void 0 : s.locale) == null ? void 0 : u.options) ==
			null
				? void 0
				: m.firstWeekContainsDate) ??
			a.firstWeekContainsDate ??
			((p = (v = a.locale) == null ? void 0 : v.options) == null
				? void 0
				: p.firstWeekContainsDate) ??
			1,
		o =
			(s == null ? void 0 : s.weekStartsOn) ??
			((j = (g = s == null ? void 0 : s.locale) == null ? void 0 : g.options) ==
			null
				? void 0
				: j.weekStartsOn) ??
			a.weekStartsOn ??
			((k = (f = a.locale) == null ? void 0 : f.options) == null
				? void 0
				: k.weekStartsOn) ??
			0,
		l = We(e);
	if (!Qu(l)) throw new RangeError("Invalid time value");
	let c = t
		.match(Hm)
		.map((b) => {
			const N = b[0];
			if (N === "p" || N === "P") {
				const _ = Lm[N];
				return _(b, n.formatLong);
			}
			return b;
		})
		.join("")
		.match(Wm)
		.map((b) => {
			if (b === "''") return { isToken: !1, value: "'" };
			const N = b[0];
			if (N === "'") return { isToken: !1, value: Xm(b) };
			if (En[N]) return { isToken: !0, value: b };
			if (N.match(Ym))
				throw new RangeError(
					"Format string contains an unescaped latin alphabet character `" +
						N +
						"`",
				);
			return { isToken: !1, value: b };
		});
	n.localize.preprocessor && (c = n.localize.preprocessor(l, c));
	const d = { firstWeekContainsDate: i, weekStartsOn: o, locale: n };
	return c
		.map((b) => {
			if (!b.isToken) return b.value;
			const N = b.value;
			((!(s != null && s.useAdditionalWeekYearTokens) && Um(N)) ||
				(!(s != null && s.useAdditionalDayOfYearTokens) && zm(N))) &&
				qm(N, t, String(e));
			const _ = En[N[0]];
			return _(l, N, n.localize, d);
		})
		.join("");
}
function Xm(e) {
	const t = e.match(Zm);
	return t ? t[1].replace(Gm, "'") : e;
}
function Tn(e, t, s) {
	const a = Ft(e, s),
		n = Ft(t, s);
	return +a == +n;
}
function xo(e, t) {
	const a = eh(e);
	let n;
	if (a.date) {
		const c = th(a.date, 2);
		n = sh(c.restDateString, c.year);
	}
	if (!n || isNaN(n.getTime())) return new Date(NaN);
	const i = n.getTime();
	let o = 0,
		l;
	if (a.time && ((o = rh(a.time)), isNaN(o))) return new Date(NaN);
	if (a.timezone) {
		if (((l = ah(a.timezone)), isNaN(l))) return new Date(NaN);
	} else {
		const c = new Date(i + o),
			d = new Date(0);
		return (
			d.setFullYear(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()),
			d.setHours(
				c.getUTCHours(),
				c.getUTCMinutes(),
				c.getUTCSeconds(),
				c.getUTCMilliseconds(),
			),
			d
		);
	}
	return new Date(i + o + l);
}
const qs = {
		dateTimeDelimiter: /[T ]/,
		timeZoneDelimiter: /[Z ]/i,
		timezone: /([Z+-].*)$/,
	},
	Jm = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
	Qm =
		/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
	Km = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function eh(e) {
	const t = {},
		s = e.split(qs.dateTimeDelimiter);
	let a;
	if (s.length > 2) return t;
	if (
		(/:/.test(s[0])
			? (a = s[0])
			: ((t.date = s[0]),
				(a = s[1]),
				qs.timeZoneDelimiter.test(t.date) &&
					((t.date = e.split(qs.timeZoneDelimiter)[0]),
					(a = e.substr(t.date.length, e.length)))),
		a)
	) {
		const n = qs.timezone.exec(a);
		n ? ((t.time = a.replace(n[1], "")), (t.timezone = n[1])) : (t.time = a);
	}
	return t;
}
function th(e, t) {
	const s = new RegExp(
			"^(?:(\\d{4}|[+-]\\d{" +
				(4 + t) +
				"})|(\\d{2}|[+-]\\d{" +
				(2 + t) +
				"})$)",
		),
		a = e.match(s);
	if (!a) return { year: NaN, restDateString: "" };
	const n = a[1] ? parseInt(a[1]) : null,
		i = a[2] ? parseInt(a[2]) : null;
	return {
		year: i === null ? n : i * 100,
		restDateString: e.slice((a[1] || a[2]).length),
	};
}
function sh(e, t) {
	if (t === null) return new Date(NaN);
	const s = e.match(Jm);
	if (!s) return new Date(NaN);
	const a = !!s[4],
		n = gs(s[1]),
		i = gs(s[2]) - 1,
		o = gs(s[3]),
		l = gs(s[4]),
		c = gs(s[5]) - 1;
	if (a) return ch(t, l, c) ? nh(t, l, c) : new Date(NaN);
	{
		const d = new Date(0);
		return !oh(t, i, o) || !lh(t, n)
			? new Date(NaN)
			: (d.setUTCFullYear(t, i, Math.max(n, o)), d);
	}
}
function gs(e) {
	return e ? parseInt(e) : 1;
}
function rh(e) {
	const t = e.match(Qm);
	if (!t) return NaN;
	const s = Fr(t[1]),
		a = Fr(t[2]),
		n = Fr(t[3]);
	return dh(s, a, n) ? s * co + a * lo + n * 1e3 : NaN;
}
function Fr(e) {
	return (e && parseFloat(e.replace(",", "."))) || 0;
}
function ah(e) {
	if (e === "Z") return 0;
	const t = e.match(Km);
	if (!t) return 0;
	const s = t[1] === "+" ? -1 : 1,
		a = parseInt(t[2]),
		n = (t[3] && parseInt(t[3])) || 0;
	return uh(a, n) ? s * (a * co + n * lo) : NaN;
}
function nh(e, t, s) {
	const a = new Date(0);
	a.setUTCFullYear(e, 0, 4);
	const n = a.getUTCDay() || 7,
		i = (t - 1) * 7 + s + 1 - n;
	return (a.setUTCDate(a.getUTCDate() + i), a);
}
const ih = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function go(e) {
	return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function oh(e, t, s) {
	return t >= 0 && t <= 11 && s >= 1 && s <= (ih[t] || (go(e) ? 29 : 28));
}
function lh(e, t) {
	return t >= 1 && t <= (go(e) ? 366 : 365);
}
function ch(e, t, s) {
	return t >= 1 && t <= 53 && s >= 0 && s <= 6;
}
function dh(e, t, s) {
	return e === 24
		? t === 0 && s === 0
		: s >= 0 && s < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function uh(e, t) {
	return t >= 0 && t <= 59;
}
function ps(e, t) {
	if (e.one !== void 0 && t === 1) return e.one;
	const s = t % 10,
		a = t % 100;
	return s === 1 && a !== 11
		? e.singularNominative.replace("{{count}}", String(t))
		: s >= 2 && s <= 4 && (a < 10 || a > 20)
			? e.singularGenitive.replace("{{count}}", String(t))
			: e.pluralGenitive.replace("{{count}}", String(t));
}
function Re(e) {
	return (t, s) =>
		s != null && s.addSuffix
			? s.comparison && s.comparison > 0
				? e.future
					? ps(e.future, t)
					: "через " + ps(e.regular, t)
				: e.past
					? ps(e.past, t)
					: ps(e.regular, t) + " назад"
			: ps(e.regular, t);
}
const mh = {
		lessThanXSeconds: Re({
			regular: {
				one: "меньше секунды",
				singularNominative: "меньше {{count}} секунды",
				singularGenitive: "меньше {{count}} секунд",
				pluralGenitive: "меньше {{count}} секунд",
			},
			future: {
				one: "меньше, чем через секунду",
				singularNominative: "меньше, чем через {{count}} секунду",
				singularGenitive: "меньше, чем через {{count}} секунды",
				pluralGenitive: "меньше, чем через {{count}} секунд",
			},
		}),
		xSeconds: Re({
			regular: {
				singularNominative: "{{count}} секунда",
				singularGenitive: "{{count}} секунды",
				pluralGenitive: "{{count}} секунд",
			},
			past: {
				singularNominative: "{{count}} секунду назад",
				singularGenitive: "{{count}} секунды назад",
				pluralGenitive: "{{count}} секунд назад",
			},
			future: {
				singularNominative: "через {{count}} секунду",
				singularGenitive: "через {{count}} секунды",
				pluralGenitive: "через {{count}} секунд",
			},
		}),
		halfAMinute: (e, t) =>
			t != null && t.addSuffix
				? t.comparison && t.comparison > 0
					? "через полминуты"
					: "полминуты назад"
				: "полминуты",
		lessThanXMinutes: Re({
			regular: {
				one: "меньше минуты",
				singularNominative: "меньше {{count}} минуты",
				singularGenitive: "меньше {{count}} минут",
				pluralGenitive: "меньше {{count}} минут",
			},
			future: {
				one: "меньше, чем через минуту",
				singularNominative: "меньше, чем через {{count}} минуту",
				singularGenitive: "меньше, чем через {{count}} минуты",
				pluralGenitive: "меньше, чем через {{count}} минут",
			},
		}),
		xMinutes: Re({
			regular: {
				singularNominative: "{{count}} минута",
				singularGenitive: "{{count}} минуты",
				pluralGenitive: "{{count}} минут",
			},
			past: {
				singularNominative: "{{count}} минуту назад",
				singularGenitive: "{{count}} минуты назад",
				pluralGenitive: "{{count}} минут назад",
			},
			future: {
				singularNominative: "через {{count}} минуту",
				singularGenitive: "через {{count}} минуты",
				pluralGenitive: "через {{count}} минут",
			},
		}),
		aboutXHours: Re({
			regular: {
				singularNominative: "около {{count}} часа",
				singularGenitive: "около {{count}} часов",
				pluralGenitive: "около {{count}} часов",
			},
			future: {
				singularNominative: "приблизительно через {{count}} час",
				singularGenitive: "приблизительно через {{count}} часа",
				pluralGenitive: "приблизительно через {{count}} часов",
			},
		}),
		xHours: Re({
			regular: {
				singularNominative: "{{count}} час",
				singularGenitive: "{{count}} часа",
				pluralGenitive: "{{count}} часов",
			},
		}),
		xDays: Re({
			regular: {
				singularNominative: "{{count}} день",
				singularGenitive: "{{count}} дня",
				pluralGenitive: "{{count}} дней",
			},
		}),
		aboutXWeeks: Re({
			regular: {
				singularNominative: "около {{count}} недели",
				singularGenitive: "около {{count}} недель",
				pluralGenitive: "около {{count}} недель",
			},
			future: {
				singularNominative: "приблизительно через {{count}} неделю",
				singularGenitive: "приблизительно через {{count}} недели",
				pluralGenitive: "приблизительно через {{count}} недель",
			},
		}),
		xWeeks: Re({
			regular: {
				singularNominative: "{{count}} неделя",
				singularGenitive: "{{count}} недели",
				pluralGenitive: "{{count}} недель",
			},
		}),
		aboutXMonths: Re({
			regular: {
				singularNominative: "около {{count}} месяца",
				singularGenitive: "около {{count}} месяцев",
				pluralGenitive: "около {{count}} месяцев",
			},
			future: {
				singularNominative: "приблизительно через {{count}} месяц",
				singularGenitive: "приблизительно через {{count}} месяца",
				pluralGenitive: "приблизительно через {{count}} месяцев",
			},
		}),
		xMonths: Re({
			regular: {
				singularNominative: "{{count}} месяц",
				singularGenitive: "{{count}} месяца",
				pluralGenitive: "{{count}} месяцев",
			},
		}),
		aboutXYears: Re({
			regular: {
				singularNominative: "около {{count}} года",
				singularGenitive: "около {{count}} лет",
				pluralGenitive: "около {{count}} лет",
			},
			future: {
				singularNominative: "приблизительно через {{count}} год",
				singularGenitive: "приблизительно через {{count}} года",
				pluralGenitive: "приблизительно через {{count}} лет",
			},
		}),
		xYears: Re({
			regular: {
				singularNominative: "{{count}} год",
				singularGenitive: "{{count}} года",
				pluralGenitive: "{{count}} лет",
			},
		}),
		overXYears: Re({
			regular: {
				singularNominative: "больше {{count}} года",
				singularGenitive: "больше {{count}} лет",
				pluralGenitive: "больше {{count}} лет",
			},
			future: {
				singularNominative: "больше, чем через {{count}} год",
				singularGenitive: "больше, чем через {{count}} года",
				pluralGenitive: "больше, чем через {{count}} лет",
			},
		}),
		almostXYears: Re({
			regular: {
				singularNominative: "почти {{count}} год",
				singularGenitive: "почти {{count}} года",
				pluralGenitive: "почти {{count}} лет",
			},
			future: {
				singularNominative: "почти через {{count}} год",
				singularGenitive: "почти через {{count}} года",
				pluralGenitive: "почти через {{count}} лет",
			},
		}),
	},
	hh = (e, t, s) => mh[e](t, s),
	fh = {
		full: "EEEE, d MMMM y 'г.'",
		long: "d MMMM y 'г.'",
		medium: "d MMM y 'г.'",
		short: "dd.MM.y",
	},
	xh = {
		full: "H:mm:ss zzzz",
		long: "H:mm:ss z",
		medium: "H:mm:ss",
		short: "H:mm",
	},
	gh = { any: "{{date}}, {{time}}" },
	ph = {
		date: Jt({ formats: fh, defaultWidth: "full" }),
		time: Jt({ formats: xh, defaultWidth: "full" }),
		dateTime: Jt({ formats: gh, defaultWidth: "any" }),
	},
	Fa = [
		"воскресенье",
		"понедельник",
		"вторник",
		"среду",
		"четверг",
		"пятницу",
		"субботу",
	];
function yh(e) {
	const t = Fa[e];
	switch (e) {
		case 0:
			return "'в прошлое " + t + " в' p";
		case 1:
		case 2:
		case 4:
			return "'в прошлый " + t + " в' p";
		case 3:
		case 5:
		case 6:
			return "'в прошлую " + t + " в' p";
	}
}
function Rn(e) {
	const t = Fa[e];
	return e === 2 ? "'во " + t + " в' p" : "'в " + t + " в' p";
}
function bh(e) {
	const t = Fa[e];
	switch (e) {
		case 0:
			return "'в следующее " + t + " в' p";
		case 1:
		case 2:
		case 4:
			return "'в следующий " + t + " в' p";
		case 3:
		case 5:
		case 6:
			return "'в следующую " + t + " в' p";
	}
}
const vh = {
		lastWeek: (e, t, s) => {
			const a = e.getDay();
			return Tn(e, t, s) ? Rn(a) : yh(a);
		},
		yesterday: "'вчера в' p",
		today: "'сегодня в' p",
		tomorrow: "'завтра в' p",
		nextWeek: (e, t, s) => {
			const a = e.getDay();
			return Tn(e, t, s) ? Rn(a) : bh(a);
		},
		other: "P",
	},
	jh = (e, t, s, a) => {
		const n = vh[e];
		return typeof n == "function" ? n(t, s, a) : n;
	},
	wh = {
		narrow: ["до н.э.", "н.э."],
		abbreviated: ["до н. э.", "н. э."],
		wide: ["до нашей эры", "нашей эры"],
	},
	Nh = {
		narrow: ["1", "2", "3", "4"],
		abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
		wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"],
	},
	_h = {
		narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
		abbreviated: [
			"янв.",
			"фев.",
			"март",
			"апр.",
			"май",
			"июнь",
			"июль",
			"авг.",
			"сент.",
			"окт.",
			"нояб.",
			"дек.",
		],
		wide: [
			"январь",
			"февраль",
			"март",
			"апрель",
			"май",
			"июнь",
			"июль",
			"август",
			"сентябрь",
			"октябрь",
			"ноябрь",
			"декабрь",
		],
	},
	kh = {
		narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
		abbreviated: [
			"янв.",
			"фев.",
			"мар.",
			"апр.",
			"мая",
			"июн.",
			"июл.",
			"авг.",
			"сент.",
			"окт.",
			"нояб.",
			"дек.",
		],
		wide: [
			"января",
			"февраля",
			"марта",
			"апреля",
			"мая",
			"июня",
			"июля",
			"августа",
			"сентября",
			"октября",
			"ноября",
			"декабря",
		],
	},
	Sh = {
		narrow: ["В", "П", "В", "С", "Ч", "П", "С"],
		short: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
		abbreviated: ["вск", "пнд", "втр", "срд", "чтв", "птн", "суб"],
		wide: [
			"воскресенье",
			"понедельник",
			"вторник",
			"среда",
			"четверг",
			"пятница",
			"суббота",
		],
	},
	Eh = {
		narrow: {
			am: "ДП",
			pm: "ПП",
			midnight: "полн.",
			noon: "полд.",
			morning: "утро",
			afternoon: "день",
			evening: "веч.",
			night: "ночь",
		},
		abbreviated: {
			am: "ДП",
			pm: "ПП",
			midnight: "полн.",
			noon: "полд.",
			morning: "утро",
			afternoon: "день",
			evening: "веч.",
			night: "ночь",
		},
		wide: {
			am: "ДП",
			pm: "ПП",
			midnight: "полночь",
			noon: "полдень",
			morning: "утро",
			afternoon: "день",
			evening: "вечер",
			night: "ночь",
		},
	},
	Ch = {
		narrow: {
			am: "ДП",
			pm: "ПП",
			midnight: "полн.",
			noon: "полд.",
			morning: "утра",
			afternoon: "дня",
			evening: "веч.",
			night: "ночи",
		},
		abbreviated: {
			am: "ДП",
			pm: "ПП",
			midnight: "полн.",
			noon: "полд.",
			morning: "утра",
			afternoon: "дня",
			evening: "веч.",
			night: "ночи",
		},
		wide: {
			am: "ДП",
			pm: "ПП",
			midnight: "полночь",
			noon: "полдень",
			morning: "утра",
			afternoon: "дня",
			evening: "вечера",
			night: "ночи",
		},
	},
	Ah = (e, t) => {
		const s = Number(e),
			a = t == null ? void 0 : t.unit;
		let n;
		return (
			a === "date"
				? (n = "-е")
				: a === "week" || a === "minute" || a === "second"
					? (n = "-я")
					: (n = "-й"),
			s + n
		);
	},
	Oh = {
		ordinalNumber: Ah,
		era: Je({ values: wh, defaultWidth: "wide" }),
		quarter: Je({
			values: Nh,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1,
		}),
		month: Je({
			values: _h,
			defaultWidth: "wide",
			formattingValues: kh,
			defaultFormattingWidth: "wide",
		}),
		day: Je({ values: Sh, defaultWidth: "wide" }),
		dayPeriod: Je({
			values: Eh,
			defaultWidth: "any",
			formattingValues: Ch,
			defaultFormattingWidth: "wide",
		}),
	},
	Th = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i,
	Rh = /\d+/i,
	Ph = {
		narrow: /^((до )?н\.?\s?э\.?)/i,
		abbreviated: /^((до )?н\.?\s?э\.?)/i,
		wide: /^(до нашей эры|нашей эры|наша эра)/i,
	},
	Dh = { any: [/^д/i, /^н/i] },
	Ih = {
		narrow: /^[1234]/i,
		abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
		wide: /^[1234](-?[ыои]?й?)? квартал/i,
	},
	Fh = { any: [/1/i, /2/i, /3/i, /4/i] },
	Lh = {
		narrow: /^[яфмаисонд]/i,
		abbreviated:
			/^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
		wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i,
	},
	Mh = {
		narrow: [
			/^я/i,
			/^ф/i,
			/^м/i,
			/^а/i,
			/^м/i,
			/^и/i,
			/^и/i,
			/^а/i,
			/^с/i,
			/^о/i,
			/^н/i,
			/^я/i,
		],
		any: [
			/^я/i,
			/^ф/i,
			/^мар/i,
			/^ап/i,
			/^ма[йя]/i,
			/^июн/i,
			/^июл/i,
			/^ав/i,
			/^с/i,
			/^о/i,
			/^н/i,
			/^д/i,
		],
	},
	Vh = {
		narrow: /^[впсч]/i,
		short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
		abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
		wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i,
	},
	$h = {
		narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
		any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i],
	},
	zh = {
		narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
		abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
		wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i,
	},
	Uh = {
		any: {
			am: /^дп/i,
			pm: /^пп/i,
			midnight: /^полн/i,
			noon: /^полд/i,
			morning: /^у/i,
			afternoon: /^д[ен]/i,
			evening: /^в/i,
			night: /^н/i,
		},
	},
	qh = {
		ordinalNumber: mo({
			matchPattern: Th,
			parsePattern: Rh,
			valueCallback: (e) => parseInt(e, 10),
		}),
		era: Qe({
			matchPatterns: Ph,
			defaultMatchWidth: "wide",
			parsePatterns: Dh,
			defaultParseWidth: "any",
		}),
		quarter: Qe({
			matchPatterns: Ih,
			defaultMatchWidth: "wide",
			parsePatterns: Fh,
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1,
		}),
		month: Qe({
			matchPatterns: Lh,
			defaultMatchWidth: "wide",
			parsePatterns: Mh,
			defaultParseWidth: "any",
		}),
		day: Qe({
			matchPatterns: Vh,
			defaultMatchWidth: "wide",
			parsePatterns: $h,
			defaultParseWidth: "any",
		}),
		dayPeriod: Qe({
			matchPatterns: zh,
			defaultMatchWidth: "wide",
			parsePatterns: Uh,
			defaultParseWidth: "any",
		}),
	},
	po = {
		code: "ru",
		formatDistance: hh,
		formatLong: ph,
		formatRelative: jh,
		localize: Oh,
		match: qh,
		options: { weekStartsOn: 1, firstWeekContainsDate: 1 },
	},
	J = (e) =>
		new Intl.NumberFormat("ru-RU", {
			style: "currency",
			currency: "RUB",
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(e),
	Bh = (e, t = 0) =>
		new Intl.NumberFormat("ru-RU", {
			minimumFractionDigits: t,
			maximumFractionDigits: t,
		}).format(e),
	as = (e) => {
		try {
			return fs(xo(e), "d MMMM yyyy", { locale: po });
		} catch {
			return e;
		}
	},
	yo = (e) => {
		try {
			return fs(xo(e), "d MMMM yyyy, HH:mm", { locale: po });
		} catch {
			return e;
		}
	},
	Lt = (e, t) => {
		const s = { kg: "кг", piece: "шт", liter: "л", box: "ящ", bag: "мешок" };
		return `${Bh(e, e % 1 !== 0 ? 1 : 0)} ${s[t] || t}`;
	},
	c0 = (e) => {
		const t = e.replace(/\D/g, "");
		return t.length === 11
			? `+7 (${t.slice(1, 4)}) ${t.slice(4, 7)}-${t.slice(7, 9)}-${t.slice(9)}`
			: e;
	},
	Wh = {
		gray: "bg-gray-100 text-gray-700",
		green: "bg-green-100 text-green-800",
		yellow: "bg-yellow-100 text-yellow-800",
		red: "bg-red-100 text-red-800",
		blue: "bg-blue-100 text-blue-800",
		purple: "bg-purple-100 text-purple-800",
		cyan: "bg-cyan-100 text-cyan-800",
		orange: "bg-orange-100 text-orange-800",
	},
	Hh = {
		gray: "bg-gray-400",
		green: "bg-green-600",
		yellow: "bg-yellow-500",
		red: "bg-red-500",
		blue: "bg-blue-500",
		purple: "bg-purple-500",
		cyan: "bg-cyan-500",
		orange: "bg-orange-500",
	},
	Zh = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-xs" },
	Dt = ({
		variant: e = "gray",
		size: t = "md",
		children: s,
		className: a,
		dot: n = !1,
	}) =>
		r.jsxs("span", {
			className: U(
				"inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap",
				Wh[e],
				Zh[t],
				a,
			),
			children: [
				n &&
					r.jsx("span", {
						className: U("w-1.5 h-1.5 rounded-full flex-shrink-0", Hh[e]),
					}),
				s,
			],
		}),
	Pn = ({
		quantity: e,
		minQuantity: t = 10,
		unit: s = "kg",
		showQuantity: a = !1,
	}) =>
		e <= 0
			? r.jsx(Dt, {
					variant: "red",
					size: "sm",
					dot: !0,
					children: "Нет в наличии",
				})
			: e <= t
				? r.jsx(Dt, {
						variant: "yellow",
						size: "sm",
						dot: !0,
						children: a ? `Мало: ${Lt(e, s)}` : "Мало",
					})
				: r.jsx(Dt, {
						variant: "green",
						size: "sm",
						dot: !0,
						children: a ? `В наличии: ${Lt(e, s)}` : "В наличии",
					}),
	Gh = {
		sm: { button: "w-7 h-7", input: "w-14 h-7 text-sm", icon: "w-3.5 h-3.5" },
		md: { button: "w-9 h-9", input: "w-16 h-9 text-sm", icon: "w-4 h-4" },
	},
	bo = ({
		value: e,
		onChange: t,
		min: s = 0,
		max: a = 9999,
		step: n = 1,
		unit: i,
		disabled: o = !1,
		className: l,
		size: c = "md",
	}) => {
		const d = Gh[c],
			u = () => {
				const p = Math.max(s, +(e - n).toFixed(2));
				t(p);
			},
			m = () => {
				const p = Math.min(a, +(e + n).toFixed(2));
				t(p);
			},
			v = (p) => {
				const g = parseFloat(p.target.value);
				if (!isNaN(g)) {
					const j = Math.min(a, Math.max(s, +g.toFixed(2)));
					t(j);
				}
			};
		return r.jsxs("div", {
			className: U("flex items-center gap-1", l),
			children: [
				r.jsx("button", {
					type: "button",
					onClick: u,
					disabled: o || e <= s,
					className: U(
						"rounded-lg border border-gray-200 bg-white text-gray-600",
						"hover:bg-gray-50 hover:border-gray-300 transition-colors",
						"flex items-center justify-center flex-shrink-0",
						"disabled:opacity-40 disabled:cursor-not-allowed",
						d.button,
					),
					"aria-label": "Уменьшить",
					children: r.jsx(Ea, { className: d.icon }),
				}),
				r.jsxs("div", {
					className: "flex items-center",
					children: [
						r.jsx("input", {
							type: "number",
							value: e,
							onChange: v,
							min: s,
							max: a,
							step: n,
							disabled: o,
							className: U(
								"text-center border border-gray-200 rounded-lg font-semibold text-gray-900",
								"focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400",
								"disabled:bg-gray-100 disabled:cursor-not-allowed",
								"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
								d.input,
							),
						}),
						i &&
							r.jsx("span", {
								className: "ml-1 text-sm text-gray-400",
								children: i,
							}),
					],
				}),
				r.jsx("button", {
					type: "button",
					onClick: m,
					disabled: o || e >= a,
					className: U(
						"rounded-lg border border-gray-200 bg-white text-gray-600",
						"hover:bg-gray-50 hover:border-gray-300 transition-colors",
						"flex items-center justify-center flex-shrink-0",
						"disabled:opacity-40 disabled:cursor-not-allowed",
						d.button,
					),
					"aria-label": "Увеличить",
					children: r.jsx(Js, { className: d.icon }),
				}),
			],
		});
	},
	pe = {
		success: (e) =>
			St.success(e, {
				icon: r.jsx(ts, { className: "w-5 h-5 text-green-600 flex-shrink-0" }),
			}),
		error: (e) =>
			St.error(e, {
				icon: r.jsx(ul, { className: "w-5 h-5 text-red-600 flex-shrink-0" }),
			}),
		warning: (e) =>
			St(e, {
				icon: r.jsx(hl, { className: "w-5 h-5 text-yellow-500 flex-shrink-0" }),
				style: { borderLeft: "4px solid #F59E0B" },
			}),
		info: (e) =>
			St(e, {
				icon: r.jsx(ml, { className: "w-5 h-5 text-blue-500 flex-shrink-0" }),
				style: { borderLeft: "4px solid #3B82F6" },
			}),
		loading: (e) => St.loading(e),
		dismiss: (e) => {
			e ? St.dismiss(e) : St.dismiss();
		},
	},
	Yh = ({ product: e, className: t, layout: s = "grid" }) => {
		var b, N, _;
		const [a, n] = O.useState(e.min_order_qty || 1),
			[i, o] = O.useState(!1),
			{ isAuthenticated: l, isApproved: c } = Ee(),
			{ addItem: d, getItem: u } = Ls(),
			m = l && c,
			v = m ? e.price_wholesale : e.price_retail,
			p = m && e.price_retail > e.price_wholesale,
			g = e.is_available && e.stock_quantity > 0,
			j = u(e.id),
			f = `/catalog/${((b = e.category) == null ? void 0 : b.slug) || "products"}/${e.slug}`,
			k = (S) => {
				(S.preventDefault(),
					S.stopPropagation(),
					g && (d(e, a, m), pe.success(`«${e.name}» добавлен в корзину`)));
			};
		return s === "list"
			? r.jsx(H, {
					to: f,
					className: U("block group", t),
					children: r.jsxs("div", {
						className:
							"flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all",
						children: [
							r.jsx("div", {
								className:
									"w-20 h-20 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden",
								children:
									!i && (N = e.images) != null && N[0]
										? r.jsx("img", {
												src: e.images[0],
												alt: e.name,
												className:
													"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
												onError: () => o(!0),
											})
										: r.jsx("div", {
												className:
													"w-full h-full flex items-center justify-center",
												children: r.jsx(Yr, {
													className: "w-8 h-8 text-gray-300",
												}),
											}),
							}),
							r.jsxs("div", {
								className: "flex-1 min-w-0",
								children: [
									r.jsxs("div", {
										className: "flex items-start justify-between gap-2",
										children: [
											r.jsx("h3", {
												className:
													"text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2",
												children: e.name,
											}),
											r.jsx(Pn, {
												quantity: e.stock_quantity,
												minQuantity: e.min_stock_quantity,
											}),
										],
									}),
									r.jsx("p", {
										className: "text-xs text-gray-500 mt-1",
										children: e.country_of_origin,
									}),
									r.jsxs("div", {
										className: "flex items-center justify-between mt-2",
										children: [
											r.jsxs("div", {
												children: [
													r.jsx("span", {
														className: "text-base font-bold text-gray-900",
														children: J(v),
													}),
													r.jsxs("span", {
														className: "text-xs text-gray-400 ml-1",
														children: ["/ ", e.unit === "kg" ? "кг" : "шт"],
													}),
												],
											}),
											r.jsxs("button", {
												onClick: k,
												disabled: !g,
												className: U(
													"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
													g
														? "bg-primary-600 text-white hover:bg-primary-700"
														: "bg-gray-100 text-gray-400 cursor-not-allowed",
												),
												children: [
													r.jsx(es, { className: "w-3.5 h-3.5" }),
													j ? "В корзине" : "В корзину",
												],
											}),
										],
									}),
								],
							}),
						],
					}),
				})
			: r.jsxs("div", {
					className: U(
						"group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200",
						t,
					),
					children: [
						p &&
							r.jsx("div", {
								className:
									"absolute top-2 left-2 z-10 bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full",
								children: "Опт",
							}),
						r.jsx("div", {
							className: "absolute top-2 right-2 z-10",
							children: r.jsx(Pn, {
								quantity: e.stock_quantity,
								minQuantity: e.min_stock_quantity,
							}),
						}),
						r.jsx(H, {
							to: f,
							className: "block",
							children: r.jsx("div", {
								className: "aspect-square bg-gray-50 overflow-hidden",
								children:
									!i && (_ = e.images) != null && _[0]
										? r.jsx("img", {
												src: e.images[0],
												alt: e.name,
												className:
													"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
												onError: () => o(!0),
											})
										: r.jsx("div", {
												className:
													"w-full h-full flex items-center justify-center",
												children: r.jsx(Yr, {
													className: "w-12 h-12 text-gray-300",
												}),
											}),
							}),
						}),
						r.jsxs("div", {
							className: "p-3",
							children: [
								r.jsx(H, {
									to: f,
									children: r.jsx("h3", {
										className:
											"text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 min-h-[2.5rem]",
										children: e.name,
									}),
								}),
								r.jsx("p", {
									className: "text-xs text-gray-400 mt-1",
									children: e.country_of_origin,
								}),
								r.jsxs("div", {
									className: "mt-2 mb-3",
									children: [
										r.jsxs("div", {
											className: "flex items-baseline gap-2",
											children: [
												r.jsx("span", {
													className: "text-base font-bold text-gray-900",
													children: J(v),
												}),
												r.jsxs("span", {
													className: "text-xs text-gray-400",
													children: ["/ ", e.unit === "kg" ? "кг" : "шт"],
												}),
											],
										}),
										p &&
											r.jsx("div", {
												className: "text-xs text-gray-400 line-through",
												children: J(e.price_retail),
											}),
										!m &&
											l &&
											r.jsx("div", {
												className: "text-xs text-primary-600 mt-0.5",
												children: "Войдите для оптовой цены",
											}),
									],
								}),
								g
									? r.jsxs("div", {
											className: "flex items-center gap-2",
											children: [
												r.jsx(bo, {
													value: a,
													onChange: n,
													min: e.min_order_qty || 1,
													max: e.stock_quantity,
													step: e.order_step || 1,
													size: "sm",
												}),
												r.jsxs("button", {
													onClick: k,
													className: U(
														"flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
														j
															? "bg-primary-100 text-primary-700 hover:bg-primary-200"
															: "bg-primary-600 text-white hover:bg-primary-700",
													),
													children: [
														r.jsx(es, { className: "w-3.5 h-3.5" }),
														j ? "В корзине" : "В корзину",
													],
												}),
											],
										})
									: r.jsx("button", {
											disabled: !0,
											className:
												"w-full py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-400 cursor-not-allowed",
											children: "Нет в наличии",
										}),
							],
						}),
					],
				});
	},
	La = ({ page: e, totalPages: t, onPageChange: s, className: a }) => {
		if (t <= 1) return null;
		const n = () => {
			const o = [],
				l = Math.max(2, e - 2),
				c = Math.min(t - 1, e + 2);
			(o.push(1), l > 2 && o.push("..."));
			for (let d = l; d <= c; d++) o.push(d);
			return (c < t - 1 && o.push("..."), t > 1 && o.push(t), o);
		};
		return r.jsxs("nav", {
			className: U("flex items-center justify-center gap-1", a),
			"aria-label": "Пагинация",
			children: [
				r.jsx("button", {
					onClick: () => s(e - 1),
					disabled: e === 1,
					className: U(
						"p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
						e === 1 && "opacity-30 cursor-not-allowed",
					),
					"aria-label": "Предыдущая страница",
					children: r.jsx(mi, { className: "w-4 h-4" }),
				}),
				n().map((i, o) =>
					i === "..."
						? r.jsx(
								"span",
								{
									className: "px-2 py-1 text-gray-400 text-sm",
									children: "...",
								},
								`dots-${o}`,
							)
						: r.jsx(
								"button",
								{
									onClick: () => s(i),
									className: U(
										"min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-colors",
										e === i
											? "bg-primary-600 text-white"
											: "text-gray-700 hover:bg-gray-100",
									),
									"aria-current": e === i ? "page" : void 0,
									children: i,
								},
								i,
							),
				),
				r.jsx("button", {
					onClick: () => s(e + 1),
					disabled: e === t,
					className: U(
						"p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
						e === t && "opacity-30 cursor-not-allowed",
					),
					"aria-label": "Следующая страница",
					children: r.jsx(Ae, { className: "w-4 h-4" }),
				}),
			],
		});
	},
	Xh = ({
		value: e,
		onChange: t,
		placeholder: s = "Поиск...",
		debounceMs: a = 400,
		className: n,
		autoFocus: i = !1,
	}) => {
		const [o, l] = O.useState(e || ""),
			c = O.useRef(void 0);
		O.useEffect(() => {
			l(e || "");
		}, [e]);
		const d = (m) => {
				const v = m.target.value;
				(l(v),
					c.current && clearTimeout(c.current),
					(c.current = setTimeout(() => {
						t(v);
					}, a)));
			},
			u = () => {
				(l(""), t(""));
			};
		return r.jsxs("div", {
			className: U("relative", n),
			children: [
				r.jsx("div", {
					className:
						"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
					children: r.jsx(xi, { className: "w-4 h-4" }),
				}),
				r.jsx("input", {
					type: "search",
					value: o,
					onChange: d,
					placeholder: s,
					autoFocus: i,
					className: U(
						"w-full pl-10 pr-9 py-2.5 rounded-lg border border-gray-300 bg-white",
						"text-sm text-gray-900 placeholder:text-gray-400",
						"focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400",
						"transition-colors",
					),
				}),
				o &&
					r.jsx("button", {
						onClick: u,
						className:
							"absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
						children: r.jsx(wa, { className: "w-4 h-4" }),
					}),
			],
		});
	},
	et = O.forwardRef(
		(
			{
				label: e,
				error: t,
				hint: s,
				options: a,
				placeholder: n,
				className: i,
				id: o,
				...l
			},
			c,
		) => {
			const d = o || `select-${Math.random().toString(36).substr(2, 9)}`;
			return r.jsxs("div", {
				className: "w-full",
				children: [
					e &&
						r.jsxs("label", {
							htmlFor: d,
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: [
								e,
								l.required &&
									r.jsx("span", {
										className: "text-red-500 ml-1",
										children: "*",
									}),
							],
						}),
					r.jsxs("div", {
						className: "relative",
						children: [
							r.jsxs("select", {
								ref: c,
								id: d,
								className: U(
									"w-full appearance-none rounded-lg border py-2.5 pl-3.5 pr-10",
									"text-sm bg-white transition-colors",
									"focus:outline-none focus:ring-2 focus:ring-offset-0",
									t
										? "border-red-300 bg-red-50 focus:ring-red-300 text-red-900"
										: "border-gray-300 focus:ring-primary-300 focus:border-primary-400 text-gray-900",
									l.disabled && "bg-gray-100 cursor-not-allowed text-gray-500",
									i,
								),
								...l,
								children: [
									n &&
										r.jsx("option", { value: "", disabled: !0, children: n }),
									a.map((u) =>
										r.jsx(
											"option",
											{
												value: u.value,
												disabled: u.disabled,
												children: u.label,
											},
											u.value,
										),
									),
								],
							}),
							r.jsx("div", {
								className:
									"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400",
								children: r.jsx(fl, { className: "w-4 h-4" }),
							}),
						],
					}),
					t &&
						r.jsx("p", { className: "mt-1 text-xs text-red-600", children: t }),
					s &&
						!t &&
						r.jsx("p", {
							className: "mt-1 text-xs text-gray-500",
							children: s,
						}),
				],
			});
		},
	);
et.displayName = "Select";
const vo = ({ items: e, className: t, showHome: s = !0 }) =>
		r.jsxs("nav", {
			"aria-label": "Хлебные крошки",
			className: U("flex items-center gap-1 text-sm", t),
			children: [
				s &&
					r.jsxs(r.Fragment, {
						children: [
							r.jsx(H, {
								to: "/",
								className:
									"flex items-center text-gray-400 hover:text-gray-600 transition-colors",
								"aria-label": "Главная",
								children: r.jsx(xl, { className: "w-4 h-4" }),
							}),
							r.jsx(Ae, {
								className: "w-3.5 h-3.5 text-gray-300 flex-shrink-0",
							}),
						],
					}),
				e.map((a, n) => {
					const i = n === e.length - 1;
					return r.jsx(
						I.Fragment,
						{
							children: i
								? r.jsx("span", {
										className:
											"text-gray-900 font-medium truncate max-w-[200px]",
										children: a.label,
									})
								: r.jsxs(r.Fragment, {
										children: [
											a.href
												? r.jsx(H, {
														to: a.href,
														className:
															"text-gray-500 hover:text-gray-700 transition-colors truncate max-w-[160px]",
														children: a.label,
													})
												: r.jsx("span", {
														className: "text-gray-500 truncate max-w-[160px]",
														children: a.label,
													}),
											r.jsx(Ae, {
												className: "w-3.5 h-3.5 text-gray-300 flex-shrink-0",
											}),
										],
									}),
						},
						n,
					);
				}),
			],
		}),
	Jh = {
		primary:
			"bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm",
		secondary:
			"bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
		danger:
			"bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
		ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
		outline:
			"bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500",
	},
	Qh = {
		sm: "px-3 py-1.5 text-sm gap-1.5",
		md: "px-4 py-2 text-sm gap-2",
		lg: "px-6 py-3 text-base gap-2",
	},
	Ve = ({
		variant: e = "primary",
		size: t = "md",
		loading: s = !1,
		icon: a,
		iconPosition: n = "left",
		fullWidth: i = !1,
		className: o,
		children: l,
		disabled: c,
		...d
	}) => {
		const u = c || s;
		return r.jsxs("button", {
			className: U(
				"inline-flex items-center justify-center font-medium rounded-lg",
				"focus:outline-none focus:ring-2 focus:ring-offset-2",
				"transition-all duration-150",
				Jh[e],
				Qh[t],
				i && "w-full",
				u && "opacity-50 cursor-not-allowed pointer-events-none",
				o,
			),
			disabled: u,
			...d,
			children: [
				s
					? r.jsx(gl, { className: "w-4 h-4 animate-spin" })
					: a &&
						n === "left" &&
						r.jsx("span", { className: "flex-shrink-0", children: a }),
				l && r.jsx("span", { children: l }),
				!s &&
					a &&
					n === "right" &&
					r.jsx("span", { className: "flex-shrink-0", children: a }),
			],
		});
	},
	wr = ({ icon: e, title: t, description: s, action: a, className: n }) =>
		r.jsxs("div", {
			className: U(
				"flex flex-col items-center justify-center py-16 px-4 text-center",
				n,
			),
			children: [
				r.jsx("div", {
					className:
						"w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400",
					children: e || r.jsx(pl, { className: "w-8 h-8" }),
				}),
				r.jsx("h3", {
					className: "text-lg font-semibold text-gray-900 mb-2",
					children: t,
				}),
				s &&
					r.jsx("p", {
						className: "text-sm text-gray-500 max-w-sm mb-6",
						children: s,
					}),
				a &&
					r.jsx(Ve, {
						variant: "primary",
						onClick: a.onClick,
						children: a.label,
					}),
			],
		}),
	Kh = [
		{ value: "popularity", label: "По популярности" },
		{ value: "price_asc", label: "Сначала дешевле" },
		{ value: "price_desc", label: "Сначала дороже" },
		{ value: "name", label: "По названию" },
	],
	ef = [
		{ value: "12", label: "12 на стр." },
		{ value: "24", label: "24 на стр." },
		{ value: "48", label: "48 на стр." },
	],
	tf = () => {
		const [e, t] = Qo(),
			{ category: s } = ci(),
			a = qt(),
			[n, i] = O.useState(e.get("search") || ""),
			[o, l] = O.useState(e.get("sort") || "popularity"),
			[c, d] = O.useState(parseInt(e.get("page") || "1")),
			[u, m] = O.useState(parseInt(e.get("per_page") || "24")),
			[v, p] = O.useState("grid"),
			[g, j] = O.useState(!1),
			{ data: f } = st({ queryKey: ["categories"], queryFn: Da }),
			k = f == null ? void 0 : f.find((L) => L.slug === s),
			b = {
				search: n || void 0,
				sort: o,
				page: c,
				per_page: u,
				category_id: k == null ? void 0 : k.id,
			},
			{
				data: N,
				isLoading: _,
				isFetching: S,
			} = st({
				queryKey: ["products", b],
				queryFn: () => io(b),
				placeholderData: (L) => L,
			});
		O.useEffect(() => {
			const L = {};
			(n && (L.search = n),
				o && o !== "popularity" && (L.sort = o),
				c > 1 && (L.page = String(c)),
				u !== 24 && (L.per_page = String(u)),
				t(L, { replace: !0 }));
		}, [n, o, c, u]);
		const $ = [
				{ label: "Каталог", href: "/catalog" },
				...(k ? [{ label: k.name }] : []),
			],
			B = (L) => {
				(i(L), d(1));
			},
			xe = (L) => {
				(l(L), d(1));
			},
			me = (L) => {
				(d(1), j(!1), a(L ? `/catalog/${L}` : "/catalog"));
			};
		return r.jsxs(r.Fragment, {
			children: [
				r.jsx(no, {
					title: "Каталог овощей и фруктов оптом",
					description:
						"Каталог свежих овощей и фруктов оптом — прямые поставки из Узбекистана. Доставка по Тобольску.",
					canonical: "/catalog",
				}),
				r.jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
					children: [
						r.jsx(vo, { items: $, className: "mb-4 text-sm" }),
						r.jsx("div", {
							className: "flex items-center justify-between mb-6",
							children: r.jsxs("div", {
								children: [
									r.jsx("h1", {
										className: "text-2xl font-bold text-gray-900",
										children: k ? k.name : "Все товары",
									}),
									N &&
										r.jsxs("p", {
											className: "text-sm text-gray-500 mt-0.5",
											children: [N.total, " товаров"],
										}),
								],
							}),
						}),
						r.jsxs("div", {
							className: "flex gap-6",
							children: [
								r.jsx("aside", {
									className: "hidden lg:block w-56 flex-shrink-0",
									children: r.jsxs("div", {
										className:
											"bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-20",
										children: [
											r.jsx("div", {
												className: "px-4 py-3 border-b border-gray-100",
												children: r.jsx("h2", {
													className: "text-sm font-semibold text-gray-900",
													children: "Категории",
												}),
											}),
											r.jsxs("nav", {
												className: "py-2",
												children: [
													r.jsxs("button", {
														onClick: () => me(void 0),
														className: U(
															"w-full flex items-center justify-between px-4 py-2 text-sm transition-colors",
															s
																? "text-gray-600 hover:bg-gray-50"
																: "text-primary-700 bg-primary-50 font-semibold",
														),
														children: [
															r.jsx("span", { children: "Все товары" }),
															N &&
																!s &&
																r.jsx("span", {
																	className: "text-xs text-gray-400",
																	children: N.total,
																}),
														],
													}),
													f == null
														? void 0
														: f.map((L) =>
																r.jsxs(
																	"button",
																	{
																		onClick: () => me(L.slug),
																		className: U(
																			"w-full flex items-center justify-between px-4 py-2 text-sm transition-colors",
																			s === L.slug
																				? "text-primary-700 bg-primary-50 font-semibold"
																				: "text-gray-600 hover:bg-gray-50",
																		),
																		children: [
																			r.jsx("span", {
																				className: "truncate",
																				children: L.name,
																			}),
																			L.product_count > 0 &&
																				r.jsx("span", {
																					className:
																						"text-xs text-gray-400 ml-2 flex-shrink-0",
																					children: L.product_count,
																				}),
																		],
																	},
																	L.id,
																),
															),
												],
											}),
										],
									}),
								}),
								g &&
									r.jsxs("div", {
										className: "fixed inset-0 z-50 lg:hidden",
										children: [
											r.jsx("div", {
												className: "absolute inset-0 bg-black/50",
												onClick: () => j(!1),
											}),
											r.jsxs("div", {
												className:
													"absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto",
												children: [
													r.jsxs("div", {
														className:
															"flex items-center justify-between px-4 py-4 border-b",
														children: [
															r.jsx("h2", {
																className: "font-semibold text-gray-900",
																children: "Категории",
															}),
															r.jsx("button", {
																onClick: () => j(!1),
																children: r.jsx(wa, {
																	className: "w-5 h-5 text-gray-500",
																}),
															}),
														],
													}),
													r.jsxs("nav", {
														className: "py-2",
														children: [
															r.jsx("button", {
																onClick: () => me(void 0),
																className: U(
																	"w-full text-left px-4 py-3 text-sm",
																	s
																		? "text-gray-600"
																		: "text-primary-700 font-semibold",
																),
																children: "Все товары",
															}),
															f == null
																? void 0
																: f.map((L) =>
																		r.jsxs(
																			"button",
																			{
																				onClick: () => me(L.slug),
																				className: U(
																					"w-full text-left px-4 py-3 text-sm",
																					s === L.slug
																						? "text-primary-700 font-semibold"
																						: "text-gray-600",
																				),
																				children: [
																					L.name,
																					" ",
																					L.product_count > 0 &&
																						`(${L.product_count})`,
																				],
																			},
																			L.id,
																		),
																	),
														],
													}),
												],
											}),
										],
									}),
								r.jsxs("div", {
									className: "flex-1 min-w-0",
									children: [
										r.jsxs("div", {
											className: "flex flex-wrap items-center gap-3 mb-4",
											children: [
												r.jsxs("button", {
													onClick: () => j(!0),
													className:
														"lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50",
													children: [
														r.jsx(yl, { className: "w-4 h-4" }),
														"Категории",
													],
												}),
												r.jsx("div", {
													className: "flex-1 min-w-[200px]",
													children: r.jsx(Xh, {
														value: n,
														onChange: B,
														placeholder: "Поиск товаров...",
													}),
												}),
												r.jsx("div", {
													className: "w-48",
													children: r.jsx(et, {
														options: Kh,
														value: o,
														onChange: (L) => xe(L.target.value),
													}),
												}),
												r.jsx("div", {
													className: "hidden sm:block w-32",
													children: r.jsx(et, {
														options: ef,
														value: String(u),
														onChange: (L) => {
															(m(parseInt(L.target.value)), d(1));
														},
													}),
												}),
												r.jsxs("div", {
													className:
														"hidden sm:flex border border-gray-200 rounded-lg overflow-hidden",
													children: [
														r.jsx("button", {
															onClick: () => p("grid"),
															className: U(
																"p-2 transition-colors",
																v === "grid"
																	? "bg-primary-600 text-white"
																	: "bg-white text-gray-500 hover:bg-gray-50",
															),
															"aria-label": "Сетка",
															children: r.jsx(_a, { className: "w-4 h-4" }),
														}),
														r.jsx("button", {
															onClick: () => p("list"),
															className: U(
																"p-2 transition-colors",
																v === "list"
																	? "bg-primary-600 text-white"
																	: "bg-white text-gray-500 hover:bg-gray-50",
															),
															"aria-label": "Список",
															children: r.jsx(bl, { className: "w-4 h-4" }),
														}),
													],
												}),
											],
										}),
										n &&
											r.jsxs("div", {
												className: "flex items-center gap-2 mb-4",
												children: [
													r.jsxs("span", {
														className: "text-sm text-gray-500",
														children: ["Поиск: «", n, "»"],
													}),
													r.jsx("button", {
														onClick: () => B(""),
														className:
															"text-xs text-primary-600 hover:underline",
														children: "Сбросить",
													}),
												],
											}),
										_
											? r.jsx(hs, {})
											: (N == null ? void 0 : N.items.length) === 0
												? r.jsx(wr, {
														title: "Товары не найдены",
														description: n
															? `По запросу «${n}» ничего не найдено. Попробуйте изменить поисковый запрос.`
															: "В этой категории пока нет товаров.",
														action: {
															label: "Смотреть все товары",
															onClick: () => me(void 0),
														},
													})
												: r.jsxs(r.Fragment, {
														children: [
															r.jsx("div", {
																className: U(
																	"transition-opacity",
																	S && "opacity-60",
																	v === "grid"
																		? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
																		: "space-y-3",
																),
																children:
																	N == null
																		? void 0
																		: N.items.map((L) =>
																				r.jsx(
																					Yh,
																					{ product: L, layout: v },
																					L.id,
																				),
																			),
															}),
															N &&
																N.pages > 1 &&
																r.jsx(La, {
																	page: c,
																	totalPages: N.pages,
																	onPageChange: (L) => {
																		(d(L),
																			window.scrollTo({
																				top: 0,
																				behavior: "smooth",
																			}));
																	},
																	className: "mt-8",
																}),
														],
													}),
									],
								}),
							],
						}),
					],
				}),
			],
		});
	};
var Ms = (e) => e.type === "checkbox",
	Rt = (e) => e instanceof Date,
	Pe = (e) => e == null;
const jo = (e) => typeof e == "object";
var ke = (e) => !Pe(e) && !Array.isArray(e) && jo(e) && !Rt(e),
	sf = (e) =>
		ke(e) && e.target ? (Ms(e.target) ? e.target.checked : e.target.value) : e,
	rf = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
	af = (e, t) => e.has(rf(t)),
	nf = (e) => {
		const t = e.constructor && e.constructor.prototype;
		return ke(t) && t.hasOwnProperty("isPrototypeOf");
	},
	Ma =
		typeof window < "u" &&
		typeof window.HTMLElement < "u" &&
		typeof document < "u";
function he(e) {
	if (e instanceof Date) return new Date(e);
	const t = typeof FileList < "u" && e instanceof FileList;
	if (Ma && (e instanceof Blob || t)) return e;
	const s = Array.isArray(e);
	if (!s && !(ke(e) && nf(e))) return e;
	const a = s ? [] : Object.create(Object.getPrototypeOf(e));
	for (const n in e)
		Object.prototype.hasOwnProperty.call(e, n) && (a[n] = he(e[n]));
	return a;
}
var Nr = (e) => /^\w*$/.test(e),
	de = (e) => e === void 0,
	_r = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
	Va = (e) => _r(e.replace(/["|']|\]/g, "").split(/\.|\[/)),
	R = (e, t, s) => {
		if (!t || !ke(e)) return s;
		const a = (Nr(t) ? [t] : Va(t)).reduce((n, i) => (Pe(n) ? n : n[i]), e);
		return de(a) || a === e ? (de(e[t]) ? s : e[t]) : a;
	},
	Ye = (e) => typeof e == "boolean",
	Ze = (e) => typeof e == "function",
	ie = (e, t, s) => {
		let a = -1;
		const n = Nr(t) ? [t] : Va(t),
			i = n.length,
			o = i - 1;
		for (; ++a < i; ) {
			const l = n[a];
			let c = s;
			if (a !== o) {
				const d = e[l];
				c = ke(d) || Array.isArray(d) ? d : isNaN(+n[a + 1]) ? {} : [];
			}
			if (l === "__proto__" || l === "constructor" || l === "prototype") return;
			((e[l] = c), (e = e[l]));
		}
	};
const Dn = { BLUR: "blur", FOCUS_OUT: "focusout" },
	qe = {
		onBlur: "onBlur",
		onChange: "onChange",
		onSubmit: "onSubmit",
		onTouched: "onTouched",
		all: "all",
	},
	at = {
		max: "max",
		min: "min",
		maxLength: "maxLength",
		minLength: "minLength",
		pattern: "pattern",
		required: "required",
		validate: "validate",
	},
	wo = I.createContext(null);
wo.displayName = "HookFormControlContext";
const of = () => I.useContext(wo);
var lf = (e, t, s, a = !0) => {
	const n = { defaultValues: t._defaultValues };
	for (const i in e)
		Object.defineProperty(n, i, {
			get: () => {
				const o = i;
				return (
					t._proxyFormState[o] !== qe.all &&
						(t._proxyFormState[o] = !a || qe.all),
					e[o]
				);
			},
		});
	return n;
};
const No = typeof window < "u" ? I.useLayoutEffect : I.useEffect;
var Me = (e) => typeof e == "string",
	cf = (e, t, s, a, n) =>
		Me(e)
			? (a && t.watch.add(e), R(s, e, n))
			: Array.isArray(e)
				? e.map((i) => (a && t.watch.add(i), R(s, i)))
				: (a && (t.watchAll = !0), s),
	la = (e) => Pe(e) || !jo(e);
function gt(e, t, s = new WeakSet()) {
	if (la(e) || la(t)) return Object.is(e, t);
	if (Rt(e) && Rt(t)) return Object.is(e.getTime(), t.getTime());
	const a = Object.keys(e),
		n = Object.keys(t);
	if (a.length !== n.length) return !1;
	if (s.has(e) || s.has(t)) return !0;
	(s.add(e), s.add(t));
	for (const i of a) {
		const o = e[i];
		if (!n.includes(i)) return !1;
		if (i !== "ref") {
			const l = t[i];
			if (
				(Rt(o) && Rt(l)) ||
				(ke(o) && ke(l)) ||
				(Array.isArray(o) && Array.isArray(l))
					? !gt(o, l, s)
					: !Object.is(o, l)
			)
				return !1;
		}
	}
	return !0;
}
const df = I.createContext(null);
df.displayName = "HookFormContext";
var _o = (e, t, s, a, n) =>
		t
			? {
					...s[e],
					types: { ...(s[e] && s[e].types ? s[e].types : {}), [a]: n || !0 },
				}
			: {},
	De = (e) => (Array.isArray(e) ? e : [e]),
	In = () => {
		let e = [];
		return {
			get observers() {
				return e;
			},
			next: (n) => {
				for (const i of e) i.next && i.next(n);
			},
			subscribe: (n) => (
				e.push(n),
				{
					unsubscribe: () => {
						e = e.filter((i) => i !== n);
					},
				}
			),
			unsubscribe: () => {
				e = [];
			},
		};
	};
function ko(e, t) {
	const s = {};
	for (const a in e)
		if (e.hasOwnProperty(a)) {
			const n = e[a],
				i = t[a];
			if (n && ke(n) && i) {
				const o = ko(n, i);
				ke(o) && (s[a] = o);
			} else e[a] && (s[a] = i);
		}
	return s;
}
var Ce = (e) => ke(e) && !Object.keys(e).length,
	$a = (e) => e.type === "file",
	rr = (e) => {
		if (!Ma) return !1;
		const t = e ? e.ownerDocument : 0;
		return (
			e instanceof
			(t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement)
		);
	},
	So = (e) => e.type === "select-multiple",
	za = (e) => e.type === "radio",
	uf = (e) => za(e) || Ms(e),
	Lr = (e) => rr(e) && e.isConnected;
function mf(e, t) {
	const s = t.slice(0, -1).length;
	let a = 0;
	for (; a < s; ) e = de(e) ? a++ : e[t[a++]];
	return e;
}
function hf(e) {
	for (const t in e) if (e.hasOwnProperty(t) && !de(e[t])) return !1;
	return !0;
}
function je(e, t) {
	const s = Array.isArray(t) ? t : Nr(t) ? [t] : Va(t),
		a = s.length === 1 ? e : mf(e, s),
		n = s.length - 1,
		i = s[n];
	return (
		a && delete a[i],
		n !== 0 &&
			((ke(a) && Ce(a)) || (Array.isArray(a) && hf(a))) &&
			je(e, s.slice(0, -1)),
		e
	);
}
var ff = (e) => {
	for (const t in e) if (Ze(e[t])) return !0;
	return !1;
};
function Eo(e) {
	return Array.isArray(e) || (ke(e) && !ff(e));
}
function ca(e, t = {}) {
	for (const s in e) {
		const a = e[s];
		Eo(a)
			? ((t[s] = Array.isArray(a) ? [] : {}), ca(a, t[s]))
			: de(a) || (t[s] = !0);
	}
	return t;
}
function Zt(e, t, s) {
	s || (s = ca(t));
	for (const a in e) {
		const n = e[a];
		if (Eo(n))
			de(t) || la(s[a])
				? (s[a] = ca(n, Array.isArray(n) ? [] : {}))
				: Zt(n, Pe(t) ? {} : t[a], s[a]);
		else {
			const i = t[a];
			s[a] = !gt(n, i);
		}
	}
	return s;
}
const Fn = { value: !1, isValid: !1 },
	Ln = { value: !0, isValid: !0 };
var Co = (e) => {
		if (Array.isArray(e)) {
			if (e.length > 1) {
				const t = e
					.filter((s) => s && s.checked && !s.disabled)
					.map((s) => s.value);
				return { value: t, isValid: !!t.length };
			}
			return e[0].checked && !e[0].disabled
				? e[0].attributes && !de(e[0].attributes.value)
					? de(e[0].value) || e[0].value === ""
						? Ln
						: { value: e[0].value, isValid: !0 }
					: Ln
				: Fn;
		}
		return Fn;
	},
	Ao = (e, { valueAsNumber: t, valueAsDate: s, setValueAs: a }) =>
		de(e)
			? e
			: t
				? e === ""
					? NaN
					: e && +e
				: s && Me(e)
					? new Date(e)
					: a
						? a(e)
						: e;
const Mn = { isValid: !1, value: null };
var Oo = (e) =>
	Array.isArray(e)
		? e.reduce(
				(t, s) =>
					s && s.checked && !s.disabled ? { isValid: !0, value: s.value } : t,
				Mn,
			)
		: Mn;
function Vn(e) {
	const t = e.ref;
	return $a(t)
		? t.files
		: za(t)
			? Oo(e.refs).value
			: So(t)
				? [...t.selectedOptions].map(({ value: s }) => s)
				: Ms(t)
					? Co(e.refs).value
					: Ao(de(t.value) ? e.ref.value : t.value, e);
}
var xf = (e, t, s, a) => {
		const n = {};
		for (const i of e) {
			const o = R(t, i);
			o && ie(n, i, o._f);
		}
		return {
			criteriaMode: s,
			names: [...e],
			fields: n,
			shouldUseNativeValidation: a,
		};
	},
	ar = (e) => e instanceof RegExp,
	ys = (e) =>
		de(e)
			? e
			: ar(e)
				? e.source
				: ke(e)
					? ar(e.value)
						? e.value.source
						: e.value
					: e,
	Yt = (e) => ({
		isOnSubmit: !e || e === qe.onSubmit,
		isOnBlur: e === qe.onBlur,
		isOnChange: e === qe.onChange,
		isOnAll: e === qe.all,
		isOnTouch: e === qe.onTouched,
	});
const $n = "AsyncFunction";
var gf = (e) =>
		!!e &&
		!!e.validate &&
		!!(
			(Ze(e.validate) && e.validate.constructor.name === $n) ||
			(ke(e.validate) &&
				Object.values(e.validate).find((t) => t.constructor.name === $n))
		),
	pf = (e) =>
		e.mount &&
		(e.required ||
			e.min ||
			e.max ||
			e.maxLength ||
			e.minLength ||
			e.pattern ||
			e.validate),
	da = (e, t, s) =>
		!s &&
		(t.watchAll ||
			t.watch.has(e) ||
			[...t.watch].some(
				(a) => e.startsWith(a) && /^\.\w+/.test(e.slice(a.length)),
			));
const Qt = (e, t, s, a) => {
	for (const n of s || Object.keys(e)) {
		const i = R(e, n);
		if (i) {
			const { _f: o, ...l } = i;
			if (o) {
				if (o.refs && o.refs[0] && t(o.refs[0], n) && !a) return !0;
				if (o.ref && t(o.ref, o.name) && !a) return !0;
				if (Qt(l, t)) break;
			} else if (ke(l) && Qt(l, t)) break;
		}
	}
};
function zn(e, t, s) {
	const a = R(e, s);
	if (a || Nr(s)) return { error: a, name: s };
	const n = s.split(".");
	for (; n.length; ) {
		const i = n.join("."),
			o = R(t, i),
			l = R(e, i);
		if (o && !Array.isArray(o) && s !== i) return { name: s };
		if (l && l.type) return { name: i, error: l };
		if (l && l.root && l.root.type) return { name: `${i}.root`, error: l.root };
		n.pop();
	}
	return { name: s };
}
var yf = (e, t, s, a) => {
		s(e);
		const { name: n, ...i } = e;
		return (
			Ce(i) ||
			Object.keys(i).length >= Object.keys(t).length ||
			Object.keys(i).find((o) => t[o] === (!a || qe.all))
		);
	},
	bf = (e, t, s) =>
		!e ||
		!t ||
		e === t ||
		De(e).some((a) => a && (s ? a === t : a.startsWith(t) || t.startsWith(a))),
	vf = (e, t, s, a, n) =>
		n.isOnAll
			? !1
			: !s && n.isOnTouch
				? !(t || e)
				: (s ? a.isOnBlur : n.isOnBlur)
					? !e
					: (s ? a.isOnChange : n.isOnChange)
						? e
						: !0,
	jf = (e, t) => !_r(R(e, t)).length && je(e, t),
	To = (e, t, s) => {
		const a = De(R(e, s));
		return (ie(a, "root", t[s]), ie(e, s, a), e);
	};
function Un(e, t, s = "validate") {
	if (Me(e) || (Array.isArray(e) && e.every(Me)) || (Ye(e) && !e))
		return { type: s, message: Me(e) ? e : "", ref: t };
}
var Ht = (e) => (ke(e) && !ar(e) ? e : { value: e, message: "" }),
	ua = async (e, t, s, a, n, i) => {
		const {
				ref: o,
				refs: l,
				required: c,
				maxLength: d,
				minLength: u,
				min: m,
				max: v,
				pattern: p,
				validate: g,
				name: j,
				valueAsNumber: f,
				mount: k,
			} = e._f,
			b = R(s, j);
		if (!k || t.has(j)) return {};
		const N = l ? l[0] : o,
			_ = (V) => {
				n &&
					N.reportValidity &&
					(N.setCustomValidity(Ye(V) ? "" : V || ""), N.reportValidity());
			},
			S = {},
			$ = za(o),
			B = Ms(o),
			xe = $ || B,
			me =
				((f || $a(o)) && de(o.value) && de(b)) ||
				(rr(o) && o.value === "") ||
				b === "" ||
				(Array.isArray(b) && !b.length),
			L = _o.bind(null, j, a, S),
			we = (V, G, Q, ce = at.maxLength, K = at.minLength) => {
				const ve = V ? G : Q;
				S[j] = { type: V ? ce : K, message: ve, ref: o, ...L(V ? ce : K, ve) };
			};
		if (
			i
				? !Array.isArray(b) || !b.length
				: c &&
					((!xe && (me || Pe(b))) ||
						(Ye(b) && !b) ||
						(B && !Co(l).isValid) ||
						($ && !Oo(l).isValid))
		) {
			const { value: V, message: G } = Me(c)
				? { value: !!c, message: c }
				: Ht(c);
			if (
				V &&
				((S[j] = {
					type: at.required,
					message: G,
					ref: N,
					...L(at.required, G),
				}),
				!a)
			)
				return (_(G), S);
		}
		if (!me && (!Pe(m) || !Pe(v))) {
			let V, G;
			const Q = Ht(v),
				ce = Ht(m);
			if (!Pe(b) && !isNaN(b)) {
				const K = o.valueAsNumber || (b && +b);
				(Pe(Q.value) || (V = K > Q.value), Pe(ce.value) || (G = K < ce.value));
			} else {
				const K = o.valueAsDate || new Date(b),
					ve = (ge) => new Date(new Date().toDateString() + " " + ge),
					T = o.type == "time",
					Y = o.type == "week";
				(Me(Q.value) &&
					b &&
					(V = T
						? ve(b) > ve(Q.value)
						: Y
							? b > Q.value
							: K > new Date(Q.value)),
					Me(ce.value) &&
						b &&
						(G = T
							? ve(b) < ve(ce.value)
							: Y
								? b < ce.value
								: K < new Date(ce.value)));
			}
			if ((V || G) && (we(!!V, Q.message, ce.message, at.max, at.min), !a))
				return (_(S[j].message), S);
		}
		if ((d || u) && !me && (Me(b) || (i && Array.isArray(b)))) {
			const V = Ht(d),
				G = Ht(u),
				Q = !Pe(V.value) && b.length > +V.value,
				ce = !Pe(G.value) && b.length < +G.value;
			if ((Q || ce) && (we(Q, V.message, G.message), !a))
				return (_(S[j].message), S);
		}
		if (p && !me && Me(b)) {
			const { value: V, message: G } = Ht(p);
			if (
				ar(V) &&
				!b.match(V) &&
				((S[j] = { type: at.pattern, message: G, ref: o, ...L(at.pattern, G) }),
				!a)
			)
				return (_(G), S);
		}
		if (g) {
			if (Ze(g)) {
				const V = await g(b, s),
					G = Un(V, N);
				if (G && ((S[j] = { ...G, ...L(at.validate, G.message) }), !a))
					return (_(G.message), S);
			} else if (ke(g)) {
				let V = {};
				for (const G in g) {
					if (!Ce(V) && !a) break;
					const Q = Un(await g[G](b, s), N, G);
					Q &&
						((V = { ...Q, ...L(G, Q.message) }), _(Q.message), a && (S[j] = V));
				}
				if (!Ce(V) && ((S[j] = { ref: N, ...V }), !a)) return S;
			}
		}
		return (_(!0), S);
	};
const wf = {
	mode: qe.onSubmit,
	reValidateMode: qe.onChange,
	shouldFocusError: !0,
};
function Nf(e = {}) {
	let t = { ...wf, ...e },
		s = {
			submitCount: 0,
			isDirty: !1,
			isReady: !1,
			isLoading: Ze(t.defaultValues),
			isValidating: !1,
			isSubmitted: !1,
			isSubmitting: !1,
			isSubmitSuccessful: !1,
			isValid: !1,
			touchedFields: {},
			dirtyFields: {},
			validatingFields: {},
			errors: t.errors || {},
			disabled: t.disabled || !1,
		},
		a = {},
		n =
			ke(t.defaultValues) || ke(t.values)
				? he(t.defaultValues || t.values) || {}
				: {},
		i = t.shouldUnregister ? {} : he(n),
		o = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
		l = {
			mount: new Set(),
			disabled: new Set(),
			unMount: new Set(),
			array: new Set(),
			watch: new Set(),
		},
		c,
		d = 0;
	const u = {
			isDirty: !1,
			dirtyFields: !1,
			validatingFields: !1,
			touchedFields: !1,
			isValidating: !1,
			isValid: !1,
			errors: !1,
		},
		m = { ...u };
	let v = { ...m };
	const p = { array: In(), state: In() },
		g = t.criteriaMode === qe.all,
		j = (h) => (x) => {
			(clearTimeout(d), (d = setTimeout(h, x)));
		},
		f = async (h) => {
			if (!o.keepIsValid && !t.disabled && (m.isValid || v.isValid || h)) {
				let x;
				(t.resolver
					? ((x = Ce((await xe()).errors)), k())
					: (x = await L(a, !0)),
					x !== s.isValid && p.state.next({ isValid: x }));
			}
		},
		k = (h, x) => {
			!t.disabled &&
				(m.isValidating ||
					m.validatingFields ||
					v.isValidating ||
					v.validatingFields) &&
				((h || Array.from(l.mount)).forEach((w) => {
					w && (x ? ie(s.validatingFields, w, x) : je(s.validatingFields, w));
				}),
				p.state.next({
					validatingFields: s.validatingFields,
					isValidating: !Ce(s.validatingFields),
				}));
		},
		b = (h, x = [], w, P, A = !0, C = !0) => {
			if (P && w && !t.disabled) {
				if (((o.action = !0), C && Array.isArray(R(a, h)))) {
					const z = w(R(a, h), P.argA, P.argB);
					A && ie(a, h, z);
				}
				if (C && Array.isArray(R(s.errors, h))) {
					const z = w(R(s.errors, h), P.argA, P.argB);
					(A && ie(s.errors, h, z), jf(s.errors, h));
				}
				if (
					(m.touchedFields || v.touchedFields) &&
					C &&
					Array.isArray(R(s.touchedFields, h))
				) {
					const z = w(R(s.touchedFields, h), P.argA, P.argB);
					A && ie(s.touchedFields, h, z);
				}
				((m.dirtyFields || v.dirtyFields) && (s.dirtyFields = Zt(n, i)),
					p.state.next({
						name: h,
						isDirty: V(h, x),
						dirtyFields: s.dirtyFields,
						errors: s.errors,
						isValid: s.isValid,
					}));
			} else ie(i, h, x);
		},
		N = (h, x) => {
			(ie(s.errors, h, x), p.state.next({ errors: s.errors }));
		},
		_ = (h) => {
			((s.errors = h), p.state.next({ errors: s.errors, isValid: !1 }));
		},
		S = (h, x, w, P) => {
			const A = R(a, h);
			if (A) {
				const C = R(i, h, de(w) ? R(n, h) : w);
				(de(C) || (P && P.defaultChecked) || x
					? ie(i, h, x ? C : Vn(A._f))
					: ce(h, C),
					o.mount && !o.action && f());
			}
		},
		$ = (h, x, w, P, A) => {
			let C = !1,
				z = !1;
			const re = { name: h };
			if (!t.disabled) {
				if (!w || P) {
					(m.isDirty || v.isDirty) &&
						((z = s.isDirty),
						(s.isDirty = re.isDirty = V()),
						(C = z !== re.isDirty));
					const ae = gt(R(n, h), x);
					((z = !!R(s.dirtyFields, h)),
						ae ? je(s.dirtyFields, h) : ie(s.dirtyFields, h, !0),
						(re.dirtyFields = s.dirtyFields),
						(C = C || ((m.dirtyFields || v.dirtyFields) && z !== !ae)));
				}
				if (w) {
					const ae = R(s.touchedFields, h);
					ae ||
						(ie(s.touchedFields, h, w),
						(re.touchedFields = s.touchedFields),
						(C = C || ((m.touchedFields || v.touchedFields) && ae !== w)));
				}
				C && A && p.state.next(re);
			}
			return C ? re : {};
		},
		B = (h, x, w, P) => {
			const A = R(s.errors, h),
				C = (m.isValid || v.isValid) && Ye(x) && s.isValid !== x;
			if (
				(t.delayError && w
					? ((c = j(() => N(h, w))), c(t.delayError))
					: (clearTimeout(d),
						(c = null),
						w ? ie(s.errors, h, w) : je(s.errors, h)),
				(w ? !gt(A, w) : A) || !Ce(P) || C)
			) {
				const z = {
					...P,
					...(C && Ye(x) ? { isValid: x } : {}),
					errors: s.errors,
					name: h,
				};
				((s = { ...s, ...z }), p.state.next(z));
			}
		},
		xe = async (h) => (
			k(h, !0),
			await t.resolver(
				i,
				t.context,
				xf(h || l.mount, a, t.criteriaMode, t.shouldUseNativeValidation),
			)
		),
		me = async (h) => {
			const { errors: x } = await xe(h);
			if ((k(h), h))
				for (const w of h) {
					const P = R(x, w);
					P ? ie(s.errors, w, P) : je(s.errors, w);
				}
			else s.errors = x;
			return x;
		},
		L = async (h, x, w = { valid: !0 }) => {
			for (const P in h) {
				const A = h[P];
				if (A) {
					const { _f: C, ...z } = A;
					if (C) {
						const re = l.array.has(C.name),
							ae = A._f && gf(A._f);
						ae && m.validatingFields && k([C.name], !0);
						const Te = await ua(
							A,
							l.disabled,
							i,
							g,
							t.shouldUseNativeValidation && !x,
							re,
						);
						if (
							(ae && m.validatingFields && k([C.name]),
							Te[C.name] && ((w.valid = !1), x || e.shouldUseNativeValidation))
						)
							break;
						!x &&
							(R(Te, C.name)
								? re
									? To(s.errors, Te, C.name)
									: ie(s.errors, C.name, Te[C.name])
								: je(s.errors, C.name));
					}
					!Ce(z) && (await L(z, x, w));
				}
			}
			return w.valid;
		},
		we = () => {
			for (const h of l.unMount) {
				const x = R(a, h);
				x &&
					(x._f.refs ? x._f.refs.every((w) => !Lr(w)) : !Lr(x._f.ref)) &&
					kr(h);
			}
			l.unMount = new Set();
		},
		V = (h, x) => !t.disabled && (h && x && ie(i, h, x), !gt(se(), n)),
		G = (h, x, w) =>
			cf(h, l, { ...(o.mount ? i : de(x) ? n : Me(h) ? { [h]: x } : x) }, w, x),
		Q = (h) => _r(R(o.mount ? i : n, h, t.shouldUnregister ? R(n, h, []) : [])),
		ce = (h, x, w = {}) => {
			const P = R(a, h);
			let A = x;
			if (P) {
				const C = P._f;
				C &&
					(!C.disabled && ie(i, h, Ao(x, C)),
					(A = rr(C.ref) && Pe(x) ? "" : x),
					So(C.ref)
						? [...C.ref.options].forEach(
								(z) => (z.selected = A.includes(z.value)),
							)
						: C.refs
							? Ms(C.ref)
								? C.refs.forEach((z) => {
										(!z.defaultChecked || !z.disabled) &&
											(Array.isArray(A)
												? (z.checked = !!A.find((re) => re === z.value))
												: (z.checked = A === z.value || !!A));
									})
								: C.refs.forEach((z) => (z.checked = z.value === A))
							: $a(C.ref)
								? (C.ref.value = "")
								: ((C.ref.value = A),
									C.ref.type || p.state.next({ name: h, values: he(i) })));
			}
			((w.shouldDirty || w.shouldTouch) &&
				$(h, A, w.shouldTouch, w.shouldDirty, !0),
				w.shouldValidate && ge(h));
		},
		K = (h, x, w) => {
			for (const P in x) {
				if (!x.hasOwnProperty(P)) return;
				const A = x[P],
					C = h + "." + P,
					z = R(a, C);
				(l.array.has(h) || ke(A) || (z && !z._f)) && !Rt(A)
					? K(C, A, w)
					: ce(C, A, w);
			}
		},
		ve = (h, x, w = {}) => {
			const P = R(a, h),
				A = l.array.has(h),
				C = he(x);
			(ie(i, h, C),
				A
					? (p.array.next({ name: h, values: he(i) }),
						(m.isDirty || m.dirtyFields || v.isDirty || v.dirtyFields) &&
							w.shouldDirty &&
							p.state.next({
								name: h,
								dirtyFields: Zt(n, i),
								isDirty: V(h, C),
							}))
					: P && !P._f && !Pe(C)
						? K(h, C, w)
						: ce(h, C, w),
				da(h, l)
					? p.state.next({ ...s, name: h, values: he(i) })
					: p.state.next({ name: o.mount ? h : void 0, values: he(i) }));
		},
		T = async (h) => {
			o.mount = !0;
			const x = h.target;
			let w = x.name,
				P = !0;
			const A = R(a, w),
				C = (ae) => {
					P =
						Number.isNaN(ae) ||
						(Rt(ae) && isNaN(ae.getTime())) ||
						gt(ae, R(i, w, ae));
				},
				z = Yt(t.mode),
				re = Yt(t.reValidateMode);
			if (A) {
				let ae, Te;
				const kt = x.type ? Vn(A._f) : sf(h),
					dt = h.type === Dn.BLUR || h.type === Dn.FOCUS_OUT,
					Bo =
						(!pf(A._f) && !t.resolver && !R(s.errors, w) && !A._f.deps) ||
						vf(dt, R(s.touchedFields, w), s.isSubmitted, re, z),
					Cr = da(w, l, dt);
				(ie(i, w, kt),
					dt
						? (!x || !x.readOnly) && (A._f.onBlur && A._f.onBlur(h), c && c(0))
						: A._f.onChange && A._f.onChange(h));
				const Ar = $(w, kt, dt),
					Wo = !Ce(Ar) || Cr;
				if ((!dt && p.state.next({ name: w, type: h.type, values: he(i) }), Bo))
					return (
						(m.isValid || v.isValid) &&
							(t.mode === "onBlur" ? dt && f() : dt || f()),
						Wo && p.state.next({ name: w, ...(Cr ? {} : Ar) })
					);
				if ((!dt && Cr && p.state.next({ ...s }), t.resolver)) {
					const { errors: Ya } = await xe([w]);
					if ((k([w]), C(kt), P)) {
						const Ho = zn(s.errors, a, w),
							Xa = zn(Ya, a, Ho.name || w);
						((ae = Xa.error), (w = Xa.name), (Te = Ce(Ya)));
					}
				} else
					(k([w], !0),
						(ae = (await ua(A, l.disabled, i, g, t.shouldUseNativeValidation))[
							w
						]),
						k([w]),
						C(kt),
						P &&
							(ae
								? (Te = !1)
								: (m.isValid || v.isValid) && (Te = await L(a, !0))));
				P &&
					(A._f.deps &&
						(!Array.isArray(A._f.deps) || A._f.deps.length > 0) &&
						ge(A._f.deps),
					B(w, Te, ae, Ar));
			}
		},
		Y = (h, x) => {
			if (R(s.errors, x) && h.focus) return (h.focus(), 1);
		},
		ge = async (h, x = {}) => {
			let w, P;
			const A = De(h);
			if (t.resolver) {
				const C = await me(de(h) ? h : A);
				((w = Ce(C)), (P = h ? !A.some((z) => R(C, z)) : w));
			} else
				h
					? ((P = (
							await Promise.all(
								A.map(async (C) => {
									const z = R(a, C);
									return await L(z && z._f ? { [C]: z } : z);
								}),
							)
						).every(Boolean)),
						!(!P && !s.isValid) && f())
					: (P = w = await L(a));
			return (
				p.state.next({
					...(!Me(h) || ((m.isValid || v.isValid) && w !== s.isValid)
						? {}
						: { name: h }),
					...(t.resolver || !h ? { isValid: w } : {}),
					errors: s.errors,
				}),
				x.shouldFocus && !P && Qt(a, Y, h ? A : l.mount),
				P
			);
		},
		se = (h, x) => {
			let w = { ...(o.mount ? i : n) };
			return (
				x && (w = ko(x.dirtyFields ? s.dirtyFields : s.touchedFields, w)),
				de(h) ? w : Me(h) ? R(w, h) : h.map((P) => R(w, P))
			);
		},
		ze = (h, x) => ({
			invalid: !!R((x || s).errors, h),
			isDirty: !!R((x || s).dirtyFields, h),
			error: R((x || s).errors, h),
			isValidating: !!R(s.validatingFields, h),
			isTouched: !!R((x || s).touchedFields, h),
		}),
		Le = (h) => {
			const x = h ? De(h) : void 0;
			(x == null || x.forEach((w) => je(s.errors, w)),
				x
					? x.forEach((w) => {
							p.state.next({ name: w, errors: s.errors });
						})
					: p.state.next({ errors: {} }));
		},
		_t = (h, x, w) => {
			const P = (R(a, h, { _f: {} })._f || {}).ref,
				A = R(s.errors, h) || {},
				{ ref: C, message: z, type: re, ...ae } = A;
			(ie(s.errors, h, { ...ae, ...x, ref: P }),
				p.state.next({ name: h, errors: s.errors, isValid: !1 }),
				w && w.shouldFocus && P && P.focus && P.focus());
		},
		Vs = (h, x) =>
			Ze(h)
				? p.state.subscribe({
						next: (w) => "values" in w && h(G(void 0, x), w),
					})
				: G(h, x, !0),
		qa = (h) =>
			p.state.subscribe({
				next: (x) => {
					bf(h.name, x.name, h.exact) &&
						yf(x, h.formState || m, qo, h.reRenderRoot) &&
						h.callback({ values: { ...i }, ...s, ...x, defaultValues: n });
				},
			}).unsubscribe,
		Vo = (h) => (
			(o.mount = !0),
			(v = { ...v, ...h.formState }),
			qa({ ...h, formState: { ...u, ...h.formState } })
		),
		kr = (h, x = {}) => {
			for (const w of h ? De(h) : l.mount)
				(l.mount.delete(w),
					l.array.delete(w),
					x.keepValue || (je(a, w), je(i, w)),
					!x.keepError && je(s.errors, w),
					!x.keepDirty && je(s.dirtyFields, w),
					!x.keepTouched && je(s.touchedFields, w),
					!x.keepIsValidating && je(s.validatingFields, w),
					!t.shouldUnregister && !x.keepDefaultValue && je(n, w));
			(p.state.next({ values: he(i) }),
				p.state.next({ ...s, ...(x.keepDirty ? { isDirty: V() } : {}) }),
				!x.keepIsValid && f());
		},
		Ba = ({ disabled: h, name: x }) => {
			if ((Ye(h) && o.mount) || h || l.disabled.has(x)) {
				const A = l.disabled.has(x) !== !!h;
				(h ? l.disabled.add(x) : l.disabled.delete(x),
					A && o.mount && !o.action && f());
			}
		},
		Sr = (h, x = {}) => {
			let w = R(a, h);
			const P = Ye(x.disabled) || Ye(t.disabled);
			return (
				ie(a, h, {
					...(w || {}),
					_f: {
						...(w && w._f ? w._f : { ref: { name: h } }),
						name: h,
						mount: !0,
						...x,
					},
				}),
				l.mount.add(h),
				w
					? Ba({ disabled: Ye(x.disabled) ? x.disabled : t.disabled, name: h })
					: S(h, !0, x.value),
				{
					...(P ? { disabled: x.disabled || t.disabled } : {}),
					...(t.progressive
						? {
								required: !!x.required,
								min: ys(x.min),
								max: ys(x.max),
								minLength: ys(x.minLength),
								maxLength: ys(x.maxLength),
								pattern: ys(x.pattern),
							}
						: {}),
					name: h,
					onChange: T,
					onBlur: T,
					ref: (A) => {
						if (A) {
							(Sr(h, x), (w = R(a, h)));
							const C =
									(de(A.value) &&
										A.querySelectorAll &&
										A.querySelectorAll("input,select,textarea")[0]) ||
									A,
								z = uf(C),
								re = w._f.refs || [];
							if (z ? re.find((ae) => ae === C) : C === w._f.ref) return;
							(ie(a, h, {
								_f: {
									...w._f,
									...(z
										? {
												refs: [
													...re.filter(Lr),
													C,
													...(Array.isArray(R(n, h)) ? [{}] : []),
												],
												ref: { type: C.type, name: h },
											}
										: { ref: C }),
								},
							}),
								S(h, !1, void 0, C));
						} else
							((w = R(a, h, {})),
								w._f && (w._f.mount = !1),
								(t.shouldUnregister || x.shouldUnregister) &&
									!(af(l.array, h) && o.action) &&
									l.unMount.add(h));
					},
				}
			);
		},
		Er = () => t.shouldFocusError && Qt(a, Y, l.mount),
		$o = (h) => {
			Ye(h) &&
				(p.state.next({ disabled: h }),
				Qt(
					a,
					(x, w) => {
						const P = R(a, w);
						P &&
							((x.disabled = P._f.disabled || h),
							Array.isArray(P._f.refs) &&
								P._f.refs.forEach((A) => {
									A.disabled = P._f.disabled || h;
								}));
					},
					0,
					!1,
				));
		},
		Wa = (h, x) => async (w) => {
			let P;
			w && (w.preventDefault && w.preventDefault(), w.persist && w.persist());
			let A = he(i);
			if ((p.state.next({ isSubmitting: !0 }), t.resolver)) {
				const { errors: C, values: z } = await xe();
				(k(), (s.errors = C), (A = he(z)));
			} else await L(a);
			if (l.disabled.size) for (const C of l.disabled) je(A, C);
			if ((je(s.errors, "root"), Ce(s.errors))) {
				p.state.next({ errors: {} });
				try {
					await h(A, w);
				} catch (C) {
					P = C;
				}
			} else (x && (await x({ ...s.errors }, w)), Er(), setTimeout(Er));
			if (
				(p.state.next({
					isSubmitted: !0,
					isSubmitting: !1,
					isSubmitSuccessful: Ce(s.errors) && !P,
					submitCount: s.submitCount + 1,
					errors: s.errors,
				}),
				P)
			)
				throw P;
		},
		zo = (h, x = {}) => {
			R(a, h) &&
				(de(x.defaultValue)
					? ve(h, he(R(n, h)))
					: (ve(h, x.defaultValue), ie(n, h, he(x.defaultValue))),
				x.keepTouched || je(s.touchedFields, h),
				x.keepDirty ||
					(je(s.dirtyFields, h),
					(s.isDirty = x.defaultValue ? V(h, he(R(n, h))) : V())),
				x.keepError || (je(s.errors, h), m.isValid && f()),
				p.state.next({ ...s }));
		},
		Ha = (h, x = {}) => {
			const w = h ? he(h) : n,
				P = he(w),
				A = Ce(h),
				C = A ? n : P;
			if ((x.keepDefaultValues || (n = w), !x.keepValues)) {
				if (x.keepDirtyValues) {
					const z = new Set([...l.mount, ...Object.keys(Zt(n, i))]);
					for (const re of Array.from(z)) {
						const ae = R(s.dirtyFields, re),
							Te = R(i, re),
							kt = R(C, re);
						ae && !de(Te) ? ie(C, re, Te) : !ae && !de(kt) && ve(re, kt);
					}
				} else {
					if (Ma && de(h))
						for (const z of l.mount) {
							const re = R(a, z);
							if (re && re._f) {
								const ae = Array.isArray(re._f.refs)
									? re._f.refs[0]
									: re._f.ref;
								if (rr(ae)) {
									const Te = ae.closest("form");
									if (Te) {
										Te.reset();
										break;
									}
								}
							}
						}
					if (x.keepFieldsRef) for (const z of l.mount) ve(z, R(C, z));
					else a = {};
				}
				((i = t.shouldUnregister ? (x.keepDefaultValues ? he(n) : {}) : he(C)),
					p.array.next({ values: { ...C } }),
					p.state.next({ values: { ...C } }));
			}
			((l = {
				mount: x.keepDirtyValues ? l.mount : new Set(),
				unMount: new Set(),
				array: new Set(),
				disabled: new Set(),
				watch: new Set(),
				watchAll: !1,
				focus: "",
			}),
				(o.mount =
					!m.isValid ||
					!!x.keepIsValid ||
					!!x.keepDirtyValues ||
					(!t.shouldUnregister && !Ce(C))),
				(o.watch = !!t.shouldUnregister),
				(o.keepIsValid = !!x.keepIsValid),
				(o.action = !1),
				x.keepErrors || (s.errors = {}),
				p.state.next({
					submitCount: x.keepSubmitCount ? s.submitCount : 0,
					isDirty: A
						? !1
						: x.keepDirty
							? s.isDirty
							: !!(x.keepDefaultValues && !gt(h, n)),
					isSubmitted: x.keepIsSubmitted ? s.isSubmitted : !1,
					dirtyFields: A
						? {}
						: x.keepDirtyValues
							? x.keepDefaultValues && i
								? Zt(n, i)
								: s.dirtyFields
							: x.keepDefaultValues && h
								? Zt(n, h)
								: x.keepDirty
									? s.dirtyFields
									: {},
					touchedFields: x.keepTouched ? s.touchedFields : {},
					errors: x.keepErrors ? s.errors : {},
					isSubmitSuccessful: x.keepIsSubmitSuccessful
						? s.isSubmitSuccessful
						: !1,
					isSubmitting: !1,
					defaultValues: n,
				}));
		},
		Za = (h, x) => Ha(Ze(h) ? h(i) : h, { ...t.resetOptions, ...x }),
		Uo = (h, x = {}) => {
			const w = R(a, h),
				P = w && w._f;
			if (P) {
				const A = P.refs ? P.refs[0] : P.ref;
				A.focus &&
					setTimeout(() => {
						(A.focus(), x.shouldSelect && Ze(A.select) && A.select());
					});
			}
		},
		qo = (h) => {
			s = { ...s, ...h };
		},
		Ga = {
			control: {
				register: Sr,
				unregister: kr,
				getFieldState: ze,
				handleSubmit: Wa,
				setError: _t,
				_subscribe: qa,
				_runSchema: xe,
				_updateIsValidating: k,
				_focusError: Er,
				_getWatch: G,
				_getDirty: V,
				_setValid: f,
				_setFieldArray: b,
				_setDisabledField: Ba,
				_setErrors: _,
				_getFieldArray: Q,
				_reset: Ha,
				_resetDefaultValues: () =>
					Ze(t.defaultValues) &&
					t.defaultValues().then((h) => {
						(Za(h, t.resetOptions), p.state.next({ isLoading: !1 }));
					}),
				_removeUnmounted: we,
				_disableForm: $o,
				_subjects: p,
				_proxyFormState: m,
				get _fields() {
					return a;
				},
				get _formValues() {
					return i;
				},
				get _state() {
					return o;
				},
				set _state(h) {
					o = h;
				},
				get _defaultValues() {
					return n;
				},
				get _names() {
					return l;
				},
				set _names(h) {
					l = h;
				},
				get _formState() {
					return s;
				},
				get _options() {
					return t;
				},
				set _options(h) {
					t = { ...t, ...h };
				},
			},
			subscribe: Vo,
			trigger: ge,
			register: Sr,
			handleSubmit: Wa,
			watch: Vs,
			setValue: ve,
			getValues: se,
			reset: Za,
			resetField: zo,
			clearErrors: Le,
			unregister: kr,
			setError: _t,
			setFocus: Uo,
			getFieldState: ze,
		};
	return { ...Ga, formControl: Ga };
}
var mt = () => {
		if (typeof crypto < "u" && crypto.randomUUID) return crypto.randomUUID();
		const e = typeof performance > "u" ? Date.now() : performance.now() * 1e3;
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
			const s = ((Math.random() * 16 + e) % 16) | 0;
			return (t == "x" ? s : (s & 3) | 8).toString(16);
		});
	},
	Mr = (e, t, s = {}) =>
		s.shouldFocus || de(s.shouldFocus)
			? s.focusName || `${e}.${de(s.focusIndex) ? t : s.focusIndex}.`
			: "",
	Vr = (e, t) => [...e, ...De(t)],
	$r = (e) => (Array.isArray(e) ? e.map(() => {}) : void 0);
function zr(e, t, s) {
	return [...e.slice(0, t), ...De(s), ...e.slice(t)];
}
var Ur = (e, t, s) =>
		Array.isArray(e)
			? (de(e[s]) && (e[s] = void 0), e.splice(s, 0, e.splice(t, 1)[0]), e)
			: [],
	qr = (e, t) => [...De(t), ...De(e)];
function _f(e, t) {
	let s = 0;
	const a = [...e];
	for (const n of t) (a.splice(n - s, 1), s++);
	return _r(a).length ? a : [];
}
var Br = (e, t) =>
		de(t)
			? []
			: _f(
					e,
					De(t).sort((s, a) => s - a),
				),
	Wr = (e, t, s) => {
		[e[t], e[s]] = [e[s], e[t]];
	},
	qn = (e, t, s) => ((e[t] = s), e);
function d0(e) {
	const t = of(),
		{
			control: s = t,
			name: a,
			keyName: n = "id",
			shouldUnregister: i,
			rules: o,
		} = e,
		[l, c] = I.useState(s._getFieldArray(a)),
		d = I.useRef(s._getFieldArray(a).map(mt)),
		u = I.useRef(!1);
	(s._names.array.add(a),
		I.useMemo(
			() => o && l.length >= 0 && s.register(a, o),
			[s, a, l.length, o],
		),
		No(
			() =>
				s._subjects.array.subscribe({
					next: ({ values: _, name: S }) => {
						if (S === a || !S) {
							const $ = R(_, a);
							Array.isArray($) && (c($), (d.current = $.map(mt)));
						}
					},
				}).unsubscribe,
			[s, a],
		));
	const m = I.useCallback(
			(_) => {
				((u.current = !0), s._setFieldArray(a, _));
			},
			[s, a],
		),
		v = (_, S) => {
			const $ = De(he(_)),
				B = Vr(s._getFieldArray(a), $);
			((s._names.focus = Mr(a, B.length - 1, S)),
				(d.current = Vr(d.current, $.map(mt))),
				m(B),
				c(B),
				s._setFieldArray(a, B, Vr, { argA: $r(_) }));
		},
		p = (_, S) => {
			const $ = De(he(_)),
				B = qr(s._getFieldArray(a), $);
			((s._names.focus = Mr(a, 0, S)),
				(d.current = qr(d.current, $.map(mt))),
				m(B),
				c(B),
				s._setFieldArray(a, B, qr, { argA: $r(_) }));
		},
		g = (_) => {
			const S = Br(s._getFieldArray(a), _);
			((d.current = Br(d.current, _)),
				m(S),
				c(S),
				!Array.isArray(R(s._fields, a)) && ie(s._fields, a, void 0),
				s._setFieldArray(a, S, Br, { argA: _ }));
		},
		j = (_, S, $) => {
			const B = De(he(S)),
				xe = zr(s._getFieldArray(a), _, B);
			((s._names.focus = Mr(a, _, $)),
				(d.current = zr(d.current, _, B.map(mt))),
				m(xe),
				c(xe),
				s._setFieldArray(a, xe, zr, { argA: _, argB: $r(S) }));
		},
		f = (_, S) => {
			const $ = s._getFieldArray(a);
			(Wr($, _, S),
				Wr(d.current, _, S),
				m($),
				c($),
				s._setFieldArray(a, $, Wr, { argA: _, argB: S }, !1));
		},
		k = (_, S) => {
			const $ = s._getFieldArray(a);
			(Ur($, _, S),
				Ur(d.current, _, S),
				m($),
				c($),
				s._setFieldArray(a, $, Ur, { argA: _, argB: S }, !1));
		},
		b = (_, S) => {
			const $ = he(S),
				B = qn(s._getFieldArray(a), _, $);
			((d.current = [...B].map((xe, me) =>
				!xe || me === _ ? mt() : d.current[me],
			)),
				m(B),
				c([...B]),
				s._setFieldArray(a, B, qn, { argA: _, argB: $ }, !0, !1));
		},
		N = (_) => {
			const S = De(he(_));
			((d.current = S.map(mt)),
				m([...S]),
				c([...S]),
				s._setFieldArray(a, [...S], ($) => $, {}, !0, !1));
		};
	return (
		I.useEffect(() => {
			if (
				((s._state.action = !1),
				da(a, s._names) && s._subjects.state.next({ ...s._formState }),
				u.current &&
					(!Yt(s._options.mode).isOnSubmit || s._formState.isSubmitted) &&
					!Yt(s._options.reValidateMode).isOnSubmit)
			)
				if (s._options.resolver)
					s._runSchema([a]).then((_) => {
						s._updateIsValidating([a]);
						const S = R(_.errors, a),
							$ = R(s._formState.errors, a);
						($
							? (!S && $.type) ||
								(S && ($.type !== S.type || $.message !== S.message))
							: S && S.type) &&
							(S ? ie(s._formState.errors, a, S) : je(s._formState.errors, a),
							s._subjects.state.next({ errors: s._formState.errors }));
					});
				else {
					const _ = R(s._fields, a);
					_ &&
						_._f &&
						!(
							Yt(s._options.reValidateMode).isOnSubmit &&
							Yt(s._options.mode).isOnSubmit
						) &&
						ua(
							_,
							s._names.disabled,
							s._formValues,
							s._options.criteriaMode === qe.all,
							s._options.shouldUseNativeValidation,
							!0,
						).then(
							(S) =>
								!Ce(S) &&
								s._subjects.state.next({
									errors: To(s._formState.errors, S, a),
								}),
						);
				}
			(s._subjects.state.next({ name: a, values: he(s._formValues) }),
				s._names.focus &&
					Qt(s._fields, (_, S) => {
						if (s._names.focus && S.startsWith(s._names.focus) && _.focus)
							return (_.focus(), 1);
					}),
				(s._names.focus = ""),
				s._setValid(),
				(u.current = !1));
		}, [l, a, s]),
		I.useEffect(
			() => (
				!R(s._formValues, a) && s._setFieldArray(a),
				() => {
					const _ = (S, $) => {
						const B = R(s._fields, S);
						B && B._f && (B._f.mount = $);
					};
					s._options.shouldUnregister || i ? s.unregister(a) : _(a, !1);
				}
			),
			[a, s, n, i],
		),
		{
			swap: I.useCallback(f, [m, a, s]),
			move: I.useCallback(k, [m, a, s]),
			prepend: I.useCallback(p, [m, a, s]),
			append: I.useCallback(v, [m, a, s]),
			remove: I.useCallback(g, [m, a, s]),
			insert: I.useCallback(j, [m, a, s]),
			update: I.useCallback(b, [m, a, s]),
			replace: I.useCallback(N, [m, a, s]),
			fields: I.useMemo(
				() => l.map((_, S) => ({ ..._, [n]: d.current[S] || mt() })),
				[l, n],
			),
		}
	);
}
function Mt(e = {}) {
	const t = I.useRef(void 0),
		s = I.useRef(void 0),
		[a, n] = I.useState({
			isDirty: !1,
			isValidating: !1,
			isLoading: Ze(e.defaultValues),
			isSubmitted: !1,
			isSubmitting: !1,
			isSubmitSuccessful: !1,
			isValid: !1,
			submitCount: 0,
			dirtyFields: {},
			touchedFields: {},
			validatingFields: {},
			errors: e.errors || {},
			disabled: e.disabled || !1,
			isReady: !1,
			defaultValues: Ze(e.defaultValues) ? void 0 : e.defaultValues,
		});
	if (!t.current)
		if (e.formControl)
			((t.current = { ...e.formControl, formState: a }),
				e.defaultValues &&
					!Ze(e.defaultValues) &&
					e.formControl.reset(e.defaultValues, e.resetOptions));
		else {
			const { formControl: o, ...l } = Nf(e);
			t.current = { ...l, formState: a };
		}
	const i = t.current.control;
	return (
		(i._options = e),
		No(() => {
			const o = i._subscribe({
				formState: i._proxyFormState,
				callback: () => n({ ...i._formState }),
				reRenderRoot: !0,
			});
			return (
				n((l) => ({ ...l, isReady: !0 })),
				(i._formState.isReady = !0),
				o
			);
		}, [i]),
		I.useEffect(() => i._disableForm(e.disabled), [i, e.disabled]),
		I.useEffect(() => {
			(e.mode && (i._options.mode = e.mode),
				e.reValidateMode && (i._options.reValidateMode = e.reValidateMode));
		}, [i, e.mode, e.reValidateMode]),
		I.useEffect(() => {
			e.errors && (i._setErrors(e.errors), i._focusError());
		}, [i, e.errors]),
		I.useEffect(() => {
			e.shouldUnregister && i._subjects.state.next({ values: i._getWatch() });
		}, [i, e.shouldUnregister]),
		I.useEffect(() => {
			if (i._proxyFormState.isDirty) {
				const o = i._getDirty();
				o !== a.isDirty && i._subjects.state.next({ isDirty: o });
			}
		}, [i, a.isDirty]),
		I.useEffect(() => {
			var o;
			e.values && !gt(e.values, s.current)
				? (i._reset(e.values, {
						keepFieldsRef: !0,
						...i._options.resetOptions,
					}),
					(!((o = i._options.resetOptions) === null || o === void 0) &&
						o.keepIsValid) ||
						i._setValid(),
					(s.current = e.values),
					n((l) => ({ ...l })))
				: i._resetDefaultValues();
		}, [i, e.values]),
		I.useEffect(() => {
			(i._state.mount || (i._setValid(), (i._state.mount = !0)),
				i._state.watch &&
					((i._state.watch = !1), i._subjects.state.next({ ...i._formState })),
				i._removeUnmounted());
		}),
		(t.current.formState = I.useMemo(() => lf(a, i), [i, a])),
		t.current
	);
}
const Bn = (e, t, s) => {
		if (e && "reportValidity" in e) {
			const a = R(s, t);
			(e.setCustomValidity((a && a.message) || ""), e.reportValidity());
		}
	},
	Ro = (e, t) => {
		for (const s in t.fields) {
			const a = t.fields[s];
			a && a.ref && "reportValidity" in a.ref
				? Bn(a.ref, s, e)
				: a.refs && a.refs.forEach((n) => Bn(n, s, e));
		}
	},
	kf = (e, t) => {
		t.shouldUseNativeValidation && Ro(e, t);
		const s = {};
		for (const a in e) {
			const n = R(t.fields, a),
				i = Object.assign(e[a] || {}, { ref: n && n.ref });
			if (Sf(t.names || Object.keys(e), a)) {
				const o = Object.assign({}, R(s, a));
				(ie(o, "root", i), ie(s, a, o));
			} else ie(s, a, i);
		}
		return s;
	},
	Sf = (e, t) => e.some((s) => s.startsWith(t + "."));
var Ef = function (e, t) {
		for (var s = {}; e.length; ) {
			var a = e[0],
				n = a.code,
				i = a.message,
				o = a.path.join(".");
			if (!s[o])
				if ("unionErrors" in a) {
					var l = a.unionErrors[0].errors[0];
					s[o] = { message: l.message, type: l.code };
				} else s[o] = { message: i, type: n };
			if (
				("unionErrors" in a &&
					a.unionErrors.forEach(function (u) {
						return u.errors.forEach(function (m) {
							return e.push(m);
						});
					}),
				t)
			) {
				var c = s[o].types,
					d = c && c[a.code];
				s[o] = _o(o, t, s, n, d ? [].concat(d, a.message) : a.message);
			}
			e.shift();
		}
		return s;
	},
	Vt = function (e, t, s) {
		return (
			s === void 0 && (s = {}),
			function (a, n, i) {
				try {
					return Promise.resolve(
						(function (o, l) {
							try {
								var c = Promise.resolve(
									e[s.mode === "sync" ? "parse" : "parseAsync"](a, t),
								).then(function (d) {
									return (
										i.shouldUseNativeValidation && Ro({}, i),
										{ errors: {}, values: s.raw ? a : d }
									);
								});
							} catch (d) {
								return l(d);
							}
							return c && c.then ? c.then(void 0, l) : c;
						})(0, function (o) {
							if (
								(function (l) {
									return Array.isArray(l == null ? void 0 : l.errors);
								})(o)
							)
								return {
									values: {},
									errors: kf(
										Ef(
											o.errors,
											!i.shouldUseNativeValidation && i.criteriaMode === "all",
										),
										i,
									),
								};
							throw o;
						}),
					);
				} catch (o) {
					return Promise.reject(o);
				}
			}
		);
	},
	te;
(function (e) {
	e.assertEqual = (n) => {};
	function t(n) {}
	e.assertIs = t;
	function s(n) {
		throw new Error();
	}
	((e.assertNever = s),
		(e.arrayToEnum = (n) => {
			const i = {};
			for (const o of n) i[o] = o;
			return i;
		}),
		(e.getValidEnumValues = (n) => {
			const i = e.objectKeys(n).filter((l) => typeof n[n[l]] != "number"),
				o = {};
			for (const l of i) o[l] = n[l];
			return e.objectValues(o);
		}),
		(e.objectValues = (n) =>
			e.objectKeys(n).map(function (i) {
				return n[i];
			})),
		(e.objectKeys =
			typeof Object.keys == "function"
				? (n) => Object.keys(n)
				: (n) => {
						const i = [];
						for (const o in n)
							Object.prototype.hasOwnProperty.call(n, o) && i.push(o);
						return i;
					}),
		(e.find = (n, i) => {
			for (const o of n) if (i(o)) return o;
		}),
		(e.isInteger =
			typeof Number.isInteger == "function"
				? (n) => Number.isInteger(n)
				: (n) =>
						typeof n == "number" && Number.isFinite(n) && Math.floor(n) === n));
	function a(n, i = " | ") {
		return n.map((o) => (typeof o == "string" ? `'${o}'` : o)).join(i);
	}
	((e.joinValues = a),
		(e.jsonStringifyReplacer = (n, i) =>
			typeof i == "bigint" ? i.toString() : i));
})(te || (te = {}));
var Wn;
(function (e) {
	e.mergeShapes = (t, s) => ({ ...t, ...s });
})(Wn || (Wn = {}));
const F = te.arrayToEnum([
		"string",
		"nan",
		"number",
		"integer",
		"float",
		"boolean",
		"date",
		"bigint",
		"symbol",
		"function",
		"undefined",
		"null",
		"array",
		"object",
		"unknown",
		"promise",
		"void",
		"never",
		"map",
		"set",
	]),
	ft = (e) => {
		switch (typeof e) {
			case "undefined":
				return F.undefined;
			case "string":
				return F.string;
			case "number":
				return Number.isNaN(e) ? F.nan : F.number;
			case "boolean":
				return F.boolean;
			case "function":
				return F.function;
			case "bigint":
				return F.bigint;
			case "symbol":
				return F.symbol;
			case "object":
				return Array.isArray(e)
					? F.array
					: e === null
						? F.null
						: e.then &&
							  typeof e.then == "function" &&
							  e.catch &&
							  typeof e.catch == "function"
							? F.promise
							: typeof Map < "u" && e instanceof Map
								? F.map
								: typeof Set < "u" && e instanceof Set
									? F.set
									: typeof Date < "u" && e instanceof Date
										? F.date
										: F.object;
			default:
				return F.unknown;
		}
	},
	E = te.arrayToEnum([
		"invalid_type",
		"invalid_literal",
		"custom",
		"invalid_union",
		"invalid_union_discriminator",
		"invalid_enum_value",
		"unrecognized_keys",
		"invalid_arguments",
		"invalid_return_type",
		"invalid_date",
		"invalid_string",
		"too_small",
		"too_big",
		"invalid_intersection_types",
		"not_multiple_of",
		"not_finite",
	]);
class ct extends Error {
	get errors() {
		return this.issues;
	}
	constructor(t) {
		(super(),
			(this.issues = []),
			(this.addIssue = (a) => {
				this.issues = [...this.issues, a];
			}),
			(this.addIssues = (a = []) => {
				this.issues = [...this.issues, ...a];
			}));
		const s = new.target.prototype;
		(Object.setPrototypeOf
			? Object.setPrototypeOf(this, s)
			: (this.__proto__ = s),
			(this.name = "ZodError"),
			(this.issues = t));
	}
	format(t) {
		const s =
				t ||
				function (i) {
					return i.message;
				},
			a = { _errors: [] },
			n = (i) => {
				for (const o of i.issues)
					if (o.code === "invalid_union") o.unionErrors.map(n);
					else if (o.code === "invalid_return_type") n(o.returnTypeError);
					else if (o.code === "invalid_arguments") n(o.argumentsError);
					else if (o.path.length === 0) a._errors.push(s(o));
					else {
						let l = a,
							c = 0;
						for (; c < o.path.length; ) {
							const d = o.path[c];
							(c === o.path.length - 1
								? ((l[d] = l[d] || { _errors: [] }), l[d]._errors.push(s(o)))
								: (l[d] = l[d] || { _errors: [] }),
								(l = l[d]),
								c++);
						}
					}
			};
		return (n(this), a);
	}
	static assert(t) {
		if (!(t instanceof ct)) throw new Error(`Not a ZodError: ${t}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, te.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(t = (s) => s.message) {
		const s = {},
			a = [];
		for (const n of this.issues)
			if (n.path.length > 0) {
				const i = n.path[0];
				((s[i] = s[i] || []), s[i].push(t(n)));
			} else a.push(t(n));
		return { formErrors: a, fieldErrors: s };
	}
	get formErrors() {
		return this.flatten();
	}
}
ct.create = (e) => new ct(e);
const ma = (e, t) => {
	let s;
	switch (e.code) {
		case E.invalid_type:
			e.received === F.undefined
				? (s = "Required")
				: (s = `Expected ${e.expected}, received ${e.received}`);
			break;
		case E.invalid_literal:
			s = `Invalid literal value, expected ${JSON.stringify(e.expected, te.jsonStringifyReplacer)}`;
			break;
		case E.unrecognized_keys:
			s = `Unrecognized key(s) in object: ${te.joinValues(e.keys, ", ")}`;
			break;
		case E.invalid_union:
			s = "Invalid input";
			break;
		case E.invalid_union_discriminator:
			s = `Invalid discriminator value. Expected ${te.joinValues(e.options)}`;
			break;
		case E.invalid_enum_value:
			s = `Invalid enum value. Expected ${te.joinValues(e.options)}, received '${e.received}'`;
			break;
		case E.invalid_arguments:
			s = "Invalid function arguments";
			break;
		case E.invalid_return_type:
			s = "Invalid function return type";
			break;
		case E.invalid_date:
			s = "Invalid date";
			break;
		case E.invalid_string:
			typeof e.validation == "object"
				? "includes" in e.validation
					? ((s = `Invalid input: must include "${e.validation.includes}"`),
						typeof e.validation.position == "number" &&
							(s = `${s} at one or more positions greater than or equal to ${e.validation.position}`))
					: "startsWith" in e.validation
						? (s = `Invalid input: must start with "${e.validation.startsWith}"`)
						: "endsWith" in e.validation
							? (s = `Invalid input: must end with "${e.validation.endsWith}"`)
							: te.assertNever(e.validation)
				: e.validation !== "regex"
					? (s = `Invalid ${e.validation}`)
					: (s = "Invalid");
			break;
		case E.too_small:
			e.type === "array"
				? (s = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`)
				: e.type === "string"
					? (s = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`)
					: e.type === "number"
						? (s = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`)
						: e.type === "bigint"
							? (s = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`)
							: e.type === "date"
								? (s = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`)
								: (s = "Invalid input");
			break;
		case E.too_big:
			e.type === "array"
				? (s = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`)
				: e.type === "string"
					? (s = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`)
					: e.type === "number"
						? (s = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
						: e.type === "bigint"
							? (s = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
							: e.type === "date"
								? (s = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`)
								: (s = "Invalid input");
			break;
		case E.custom:
			s = "Invalid input";
			break;
		case E.invalid_intersection_types:
			s = "Intersection results could not be merged";
			break;
		case E.not_multiple_of:
			s = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case E.not_finite:
			s = "Number must be finite";
			break;
		default:
			((s = t.defaultError), te.assertNever(e));
	}
	return { message: s };
};
let Cf = ma;
function Af() {
	return Cf;
}
const Of = (e) => {
	const { data: t, path: s, errorMaps: a, issueData: n } = e,
		i = [...s, ...(n.path || [])],
		o = { ...n, path: i };
	if (n.message !== void 0) return { ...n, path: i, message: n.message };
	let l = "";
	const c = a
		.filter((d) => !!d)
		.slice()
		.reverse();
	for (const d of c) l = d(o, { data: t, defaultError: l }).message;
	return { ...n, path: i, message: l };
};
function D(e, t) {
	const s = Af(),
		a = Of({
			issueData: t,
			data: e.data,
			path: e.path,
			errorMaps: [
				e.common.contextualErrorMap,
				e.schemaErrorMap,
				s,
				s === ma ? void 0 : ma,
			].filter((n) => !!n),
		});
	e.common.issues.push(a);
}
class $e {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		this.value === "valid" && (this.value = "dirty");
	}
	abort() {
		this.value !== "aborted" && (this.value = "aborted");
	}
	static mergeArray(t, s) {
		const a = [];
		for (const n of s) {
			if (n.status === "aborted") return W;
			(n.status === "dirty" && t.dirty(), a.push(n.value));
		}
		return { status: t.value, value: a };
	}
	static async mergeObjectAsync(t, s) {
		const a = [];
		for (const n of s) {
			const i = await n.key,
				o = await n.value;
			a.push({ key: i, value: o });
		}
		return $e.mergeObjectSync(t, a);
	}
	static mergeObjectSync(t, s) {
		const a = {};
		for (const n of s) {
			const { key: i, value: o } = n;
			if (i.status === "aborted" || o.status === "aborted") return W;
			(i.status === "dirty" && t.dirty(),
				o.status === "dirty" && t.dirty(),
				i.value !== "__proto__" &&
					(typeof o.value < "u" || n.alwaysSet) &&
					(a[i.value] = o.value));
		}
		return { status: t.value, value: a };
	}
}
const W = Object.freeze({ status: "aborted" }),
	vs = (e) => ({ status: "dirty", value: e }),
	He = (e) => ({ status: "valid", value: e }),
	Hn = (e) => e.status === "aborted",
	Zn = (e) => e.status === "dirty",
	ns = (e) => e.status === "valid",
	nr = (e) => typeof Promise < "u" && e instanceof Promise;
var M;
(function (e) {
	((e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
		(e.toString = (t) =>
			typeof t == "string" ? t : t == null ? void 0 : t.message));
})(M || (M = {}));
class jt {
	constructor(t, s, a, n) {
		((this._cachedPath = []),
			(this.parent = t),
			(this.data = s),
			(this._path = a),
			(this._key = n));
	}
	get path() {
		return (
			this._cachedPath.length ||
				(Array.isArray(this._key)
					? this._cachedPath.push(...this._path, ...this._key)
					: this._cachedPath.push(...this._path, this._key)),
			this._cachedPath
		);
	}
}
const Gn = (e, t) => {
	if (ns(t)) return { success: !0, data: t.value };
	if (!e.common.issues.length)
		throw new Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			const s = new ct(e.common.issues);
			return ((this._error = s), this._error);
		},
	};
};
function X(e) {
	if (!e) return {};
	const {
		errorMap: t,
		invalid_type_error: s,
		required_error: a,
		description: n,
	} = e;
	if (t && (s || a))
		throw new Error(
			`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
		);
	return t
		? { errorMap: t, description: n }
		: {
				errorMap: (o, l) => {
					const { message: c } = e;
					return o.code === "invalid_enum_value"
						? { message: c ?? l.defaultError }
						: typeof l.data > "u"
							? { message: c ?? a ?? l.defaultError }
							: o.code !== "invalid_type"
								? { message: l.defaultError }
								: { message: c ?? s ?? l.defaultError };
				},
				description: n,
			};
}
class ee {
	get description() {
		return this._def.description;
	}
	_getType(t) {
		return ft(t.data);
	}
	_getOrReturnCtx(t, s) {
		return (
			s || {
				common: t.parent.common,
				data: t.data,
				parsedType: ft(t.data),
				schemaErrorMap: this._def.errorMap,
				path: t.path,
				parent: t.parent,
			}
		);
	}
	_processInputParams(t) {
		return {
			status: new $e(),
			ctx: {
				common: t.parent.common,
				data: t.data,
				parsedType: ft(t.data),
				schemaErrorMap: this._def.errorMap,
				path: t.path,
				parent: t.parent,
			},
		};
	}
	_parseSync(t) {
		const s = this._parse(t);
		if (nr(s)) throw new Error("Synchronous parse encountered promise.");
		return s;
	}
	_parseAsync(t) {
		const s = this._parse(t);
		return Promise.resolve(s);
	}
	parse(t, s) {
		const a = this.safeParse(t, s);
		if (a.success) return a.data;
		throw a.error;
	}
	safeParse(t, s) {
		const a = {
				common: {
					issues: [],
					async: (s == null ? void 0 : s.async) ?? !1,
					contextualErrorMap: s == null ? void 0 : s.errorMap,
				},
				path: (s == null ? void 0 : s.path) || [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data: t,
				parsedType: ft(t),
			},
			n = this._parseSync({ data: t, path: a.path, parent: a });
		return Gn(a, n);
	}
	"~validate"(t) {
		var a, n;
		const s = {
			common: { issues: [], async: !!this["~standard"].async },
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: t,
			parsedType: ft(t),
		};
		if (!this["~standard"].async)
			try {
				const i = this._parseSync({ data: t, path: [], parent: s });
				return ns(i) ? { value: i.value } : { issues: s.common.issues };
			} catch (i) {
				((n =
					(a = i == null ? void 0 : i.message) == null
						? void 0
						: a.toLowerCase()) != null &&
					n.includes("encountered") &&
					(this["~standard"].async = !0),
					(s.common = { issues: [], async: !0 }));
			}
		return this._parseAsync({ data: t, path: [], parent: s }).then((i) =>
			ns(i) ? { value: i.value } : { issues: s.common.issues },
		);
	}
	async parseAsync(t, s) {
		const a = await this.safeParseAsync(t, s);
		if (a.success) return a.data;
		throw a.error;
	}
	async safeParseAsync(t, s) {
		const a = {
				common: {
					issues: [],
					contextualErrorMap: s == null ? void 0 : s.errorMap,
					async: !0,
				},
				path: (s == null ? void 0 : s.path) || [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data: t,
				parsedType: ft(t),
			},
			n = this._parse({ data: t, path: a.path, parent: a }),
			i = await (nr(n) ? n : Promise.resolve(n));
		return Gn(a, i);
	}
	refine(t, s) {
		const a = (n) =>
			typeof s == "string" || typeof s > "u"
				? { message: s }
				: typeof s == "function"
					? s(n)
					: s;
		return this._refinement((n, i) => {
			const o = t(n),
				l = () => i.addIssue({ code: E.custom, ...a(n) });
			return typeof Promise < "u" && o instanceof Promise
				? o.then((c) => (c ? !0 : (l(), !1)))
				: o
					? !0
					: (l(), !1);
		});
	}
	refinement(t, s) {
		return this._refinement((a, n) =>
			t(a) ? !0 : (n.addIssue(typeof s == "function" ? s(a, n) : s), !1),
		);
	}
	_refinement(t) {
		return new ls({
			schema: this,
			typeName: Z.ZodEffects,
			effect: { type: "refinement", refinement: t },
		});
	}
	superRefine(t) {
		return this._refinement(t);
	}
	constructor(t) {
		((this.spa = this.safeParseAsync),
			(this._def = t),
			(this.parse = this.parse.bind(this)),
			(this.safeParse = this.safeParse.bind(this)),
			(this.parseAsync = this.parseAsync.bind(this)),
			(this.safeParseAsync = this.safeParseAsync.bind(this)),
			(this.spa = this.spa.bind(this)),
			(this.refine = this.refine.bind(this)),
			(this.refinement = this.refinement.bind(this)),
			(this.superRefine = this.superRefine.bind(this)),
			(this.optional = this.optional.bind(this)),
			(this.nullable = this.nullable.bind(this)),
			(this.nullish = this.nullish.bind(this)),
			(this.array = this.array.bind(this)),
			(this.promise = this.promise.bind(this)),
			(this.or = this.or.bind(this)),
			(this.and = this.and.bind(this)),
			(this.transform = this.transform.bind(this)),
			(this.brand = this.brand.bind(this)),
			(this.default = this.default.bind(this)),
			(this.catch = this.catch.bind(this)),
			(this.describe = this.describe.bind(this)),
			(this.pipe = this.pipe.bind(this)),
			(this.readonly = this.readonly.bind(this)),
			(this.isNullable = this.isNullable.bind(this)),
			(this.isOptional = this.isOptional.bind(this)),
			(this["~standard"] = {
				version: 1,
				vendor: "zod",
				validate: (s) => this["~validate"](s),
			}));
	}
	optional() {
		return pt.create(this, this._def);
	}
	nullable() {
		return cs.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return tt.create(this);
	}
	promise() {
		return cr.create(this, this._def);
	}
	or(t) {
		return or.create([this, t], this._def);
	}
	and(t) {
		return lr.create(this, t, this._def);
	}
	transform(t) {
		return new ls({
			...X(this._def),
			schema: this,
			typeName: Z.ZodEffects,
			effect: { type: "transform", transform: t },
		});
	}
	default(t) {
		const s = typeof t == "function" ? t : () => t;
		return new ga({
			...X(this._def),
			innerType: this,
			defaultValue: s,
			typeName: Z.ZodDefault,
		});
	}
	brand() {
		return new Kf({ typeName: Z.ZodBranded, type: this, ...X(this._def) });
	}
	catch(t) {
		const s = typeof t == "function" ? t : () => t;
		return new pa({
			...X(this._def),
			innerType: this,
			catchValue: s,
			typeName: Z.ZodCatch,
		});
	}
	describe(t) {
		const s = this.constructor;
		return new s({ ...this._def, description: t });
	}
	pipe(t) {
		return Ua.create(this, t);
	}
	readonly() {
		return ya.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}
const Tf = /^c[^\s-]{8,}$/i,
	Rf = /^[0-9a-z]+$/,
	Pf = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
	Df =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
	If = /^[a-z0-9_-]{21}$/i,
	Ff = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
	Lf =
		/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
	Mf =
		/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
	Vf = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Hr;
const $f =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	zf =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	Uf =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
	qf =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	Bf = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	Wf = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	Po =
		"((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
	Hf = new RegExp(`^${Po}$`);
function Do(e) {
	let t = "[0-5]\\d";
	e.precision
		? (t = `${t}\\.\\d{${e.precision}}`)
		: e.precision == null && (t = `${t}(\\.\\d+)?`);
	const s = e.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${s}`;
}
function Zf(e) {
	return new RegExp(`^${Do(e)}$`);
}
function Gf(e) {
	let t = `${Po}T${Do(e)}`;
	const s = [];
	return (
		s.push(e.local ? "Z?" : "Z"),
		e.offset && s.push("([+-]\\d{2}:?\\d{2})"),
		(t = `${t}(${s.join("|")})`),
		new RegExp(`^${t}$`)
	);
}
function Yf(e, t) {
	return !!(
		((t === "v4" || !t) && $f.test(e)) ||
		((t === "v6" || !t) && Uf.test(e))
	);
}
function Xf(e, t) {
	if (!Ff.test(e)) return !1;
	try {
		const [s] = e.split(".");
		if (!s) return !1;
		const a = s
				.replace(/-/g, "+")
				.replace(/_/g, "/")
				.padEnd(s.length + ((4 - (s.length % 4)) % 4), "="),
			n = JSON.parse(atob(a));
		return !(
			typeof n != "object" ||
			n === null ||
			("typ" in n && (n == null ? void 0 : n.typ) !== "JWT") ||
			!n.alg ||
			(t && n.alg !== t)
		);
	} catch {
		return !1;
	}
}
function Jf(e, t) {
	return !!(
		((t === "v4" || !t) && zf.test(e)) ||
		((t === "v6" || !t) && qf.test(e))
	);
}
class it extends ee {
	_parse(t) {
		if (
			(this._def.coerce && (t.data = String(t.data)),
			this._getType(t) !== F.string)
		) {
			const i = this._getOrReturnCtx(t);
			return (
				D(i, {
					code: E.invalid_type,
					expected: F.string,
					received: i.parsedType,
				}),
				W
			);
		}
		const a = new $e();
		let n;
		for (const i of this._def.checks)
			if (i.kind === "min")
				t.data.length < i.value &&
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						code: E.too_small,
						minimum: i.value,
						type: "string",
						inclusive: !0,
						exact: !1,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "max")
				t.data.length > i.value &&
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						code: E.too_big,
						maximum: i.value,
						type: "string",
						inclusive: !0,
						exact: !1,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "length") {
				const o = t.data.length > i.value,
					l = t.data.length < i.value;
				(o || l) &&
					((n = this._getOrReturnCtx(t, n)),
					o
						? D(n, {
								code: E.too_big,
								maximum: i.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: i.message,
							})
						: l &&
							D(n, {
								code: E.too_small,
								minimum: i.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: i.message,
							}),
					a.dirty());
			} else if (i.kind === "email")
				Mf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						validation: "email",
						code: E.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "emoji")
				(Hr || (Hr = new RegExp(Vf, "u")),
					Hr.test(t.data) ||
						((n = this._getOrReturnCtx(t, n)),
						D(n, {
							validation: "emoji",
							code: E.invalid_string,
							message: i.message,
						}),
						a.dirty()));
			else if (i.kind === "uuid")
				Df.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						validation: "uuid",
						code: E.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "nanoid")
				If.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						validation: "nanoid",
						code: E.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "cuid")
				Tf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						validation: "cuid",
						code: E.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "cuid2")
				Rf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						validation: "cuid2",
						code: E.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "ulid")
				Pf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						validation: "ulid",
						code: E.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "url")
				try {
					new URL(t.data);
				} catch {
					((n = this._getOrReturnCtx(t, n)),
						D(n, {
							validation: "url",
							code: E.invalid_string,
							message: i.message,
						}),
						a.dirty());
				}
			else
				i.kind === "regex"
					? ((i.regex.lastIndex = 0),
						i.regex.test(t.data) ||
							((n = this._getOrReturnCtx(t, n)),
							D(n, {
								validation: "regex",
								code: E.invalid_string,
								message: i.message,
							}),
							a.dirty()))
					: i.kind === "trim"
						? (t.data = t.data.trim())
						: i.kind === "includes"
							? t.data.includes(i.value, i.position) ||
								((n = this._getOrReturnCtx(t, n)),
								D(n, {
									code: E.invalid_string,
									validation: { includes: i.value, position: i.position },
									message: i.message,
								}),
								a.dirty())
							: i.kind === "toLowerCase"
								? (t.data = t.data.toLowerCase())
								: i.kind === "toUpperCase"
									? (t.data = t.data.toUpperCase())
									: i.kind === "startsWith"
										? t.data.startsWith(i.value) ||
											((n = this._getOrReturnCtx(t, n)),
											D(n, {
												code: E.invalid_string,
												validation: { startsWith: i.value },
												message: i.message,
											}),
											a.dirty())
										: i.kind === "endsWith"
											? t.data.endsWith(i.value) ||
												((n = this._getOrReturnCtx(t, n)),
												D(n, {
													code: E.invalid_string,
													validation: { endsWith: i.value },
													message: i.message,
												}),
												a.dirty())
											: i.kind === "datetime"
												? Gf(i).test(t.data) ||
													((n = this._getOrReturnCtx(t, n)),
													D(n, {
														code: E.invalid_string,
														validation: "datetime",
														message: i.message,
													}),
													a.dirty())
												: i.kind === "date"
													? Hf.test(t.data) ||
														((n = this._getOrReturnCtx(t, n)),
														D(n, {
															code: E.invalid_string,
															validation: "date",
															message: i.message,
														}),
														a.dirty())
													: i.kind === "time"
														? Zf(i).test(t.data) ||
															((n = this._getOrReturnCtx(t, n)),
															D(n, {
																code: E.invalid_string,
																validation: "time",
																message: i.message,
															}),
															a.dirty())
														: i.kind === "duration"
															? Lf.test(t.data) ||
																((n = this._getOrReturnCtx(t, n)),
																D(n, {
																	validation: "duration",
																	code: E.invalid_string,
																	message: i.message,
																}),
																a.dirty())
															: i.kind === "ip"
																? Yf(t.data, i.version) ||
																	((n = this._getOrReturnCtx(t, n)),
																	D(n, {
																		validation: "ip",
																		code: E.invalid_string,
																		message: i.message,
																	}),
																	a.dirty())
																: i.kind === "jwt"
																	? Xf(t.data, i.alg) ||
																		((n = this._getOrReturnCtx(t, n)),
																		D(n, {
																			validation: "jwt",
																			code: E.invalid_string,
																			message: i.message,
																		}),
																		a.dirty())
																	: i.kind === "cidr"
																		? Jf(t.data, i.version) ||
																			((n = this._getOrReturnCtx(t, n)),
																			D(n, {
																				validation: "cidr",
																				code: E.invalid_string,
																				message: i.message,
																			}),
																			a.dirty())
																		: i.kind === "base64"
																			? Bf.test(t.data) ||
																				((n = this._getOrReturnCtx(t, n)),
																				D(n, {
																					validation: "base64",
																					code: E.invalid_string,
																					message: i.message,
																				}),
																				a.dirty())
																			: i.kind === "base64url"
																				? Wf.test(t.data) ||
																					((n = this._getOrReturnCtx(t, n)),
																					D(n, {
																						validation: "base64url",
																						code: E.invalid_string,
																						message: i.message,
																					}),
																					a.dirty())
																				: te.assertNever(i);
		return { status: a.value, value: t.data };
	}
	_regex(t, s, a) {
		return this.refinement((n) => t.test(n), {
			validation: s,
			code: E.invalid_string,
			...M.errToObj(a),
		});
	}
	_addCheck(t) {
		return new it({ ...this._def, checks: [...this._def.checks, t] });
	}
	email(t) {
		return this._addCheck({ kind: "email", ...M.errToObj(t) });
	}
	url(t) {
		return this._addCheck({ kind: "url", ...M.errToObj(t) });
	}
	emoji(t) {
		return this._addCheck({ kind: "emoji", ...M.errToObj(t) });
	}
	uuid(t) {
		return this._addCheck({ kind: "uuid", ...M.errToObj(t) });
	}
	nanoid(t) {
		return this._addCheck({ kind: "nanoid", ...M.errToObj(t) });
	}
	cuid(t) {
		return this._addCheck({ kind: "cuid", ...M.errToObj(t) });
	}
	cuid2(t) {
		return this._addCheck({ kind: "cuid2", ...M.errToObj(t) });
	}
	ulid(t) {
		return this._addCheck({ kind: "ulid", ...M.errToObj(t) });
	}
	base64(t) {
		return this._addCheck({ kind: "base64", ...M.errToObj(t) });
	}
	base64url(t) {
		return this._addCheck({ kind: "base64url", ...M.errToObj(t) });
	}
	jwt(t) {
		return this._addCheck({ kind: "jwt", ...M.errToObj(t) });
	}
	ip(t) {
		return this._addCheck({ kind: "ip", ...M.errToObj(t) });
	}
	cidr(t) {
		return this._addCheck({ kind: "cidr", ...M.errToObj(t) });
	}
	datetime(t) {
		return typeof t == "string"
			? this._addCheck({
					kind: "datetime",
					precision: null,
					offset: !1,
					local: !1,
					message: t,
				})
			: this._addCheck({
					kind: "datetime",
					precision:
						typeof (t == null ? void 0 : t.precision) > "u"
							? null
							: t == null
								? void 0
								: t.precision,
					offset: (t == null ? void 0 : t.offset) ?? !1,
					local: (t == null ? void 0 : t.local) ?? !1,
					...M.errToObj(t == null ? void 0 : t.message),
				});
	}
	date(t) {
		return this._addCheck({ kind: "date", message: t });
	}
	time(t) {
		return typeof t == "string"
			? this._addCheck({ kind: "time", precision: null, message: t })
			: this._addCheck({
					kind: "time",
					precision:
						typeof (t == null ? void 0 : t.precision) > "u"
							? null
							: t == null
								? void 0
								: t.precision,
					...M.errToObj(t == null ? void 0 : t.message),
				});
	}
	duration(t) {
		return this._addCheck({ kind: "duration", ...M.errToObj(t) });
	}
	regex(t, s) {
		return this._addCheck({ kind: "regex", regex: t, ...M.errToObj(s) });
	}
	includes(t, s) {
		return this._addCheck({
			kind: "includes",
			value: t,
			position: s == null ? void 0 : s.position,
			...M.errToObj(s == null ? void 0 : s.message),
		});
	}
	startsWith(t, s) {
		return this._addCheck({ kind: "startsWith", value: t, ...M.errToObj(s) });
	}
	endsWith(t, s) {
		return this._addCheck({ kind: "endsWith", value: t, ...M.errToObj(s) });
	}
	min(t, s) {
		return this._addCheck({ kind: "min", value: t, ...M.errToObj(s) });
	}
	max(t, s) {
		return this._addCheck({ kind: "max", value: t, ...M.errToObj(s) });
	}
	length(t, s) {
		return this._addCheck({ kind: "length", value: t, ...M.errToObj(s) });
	}
	nonempty(t) {
		return this.min(1, M.errToObj(t));
	}
	trim() {
		return new it({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }],
		});
	}
	toLowerCase() {
		return new it({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }],
		});
	}
	toUpperCase() {
		return new it({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }],
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((t) => t.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((t) => t.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((t) => t.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((t) => t.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((t) => t.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((t) => t.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((t) => t.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((t) => t.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((t) => t.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((t) => t.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((t) => t.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((t) => t.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((t) => t.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((t) => t.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((t) => t.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((t) => t.kind === "base64url");
	}
	get minLength() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "min" && (t === null || s.value > t) && (t = s.value);
		return t;
	}
	get maxLength() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "max" && (t === null || s.value < t) && (t = s.value);
		return t;
	}
}
it.create = (e) =>
	new it({
		checks: [],
		typeName: Z.ZodString,
		coerce: (e == null ? void 0 : e.coerce) ?? !1,
		...X(e),
	});
function Qf(e, t) {
	const s = (e.toString().split(".")[1] || "").length,
		a = (t.toString().split(".")[1] || "").length,
		n = s > a ? s : a,
		i = Number.parseInt(e.toFixed(n).replace(".", "")),
		o = Number.parseInt(t.toFixed(n).replace(".", ""));
	return (i % o) / 10 ** n;
}
class $t extends ee {
	constructor() {
		(super(...arguments),
			(this.min = this.gte),
			(this.max = this.lte),
			(this.step = this.multipleOf));
	}
	_parse(t) {
		if (
			(this._def.coerce && (t.data = Number(t.data)),
			this._getType(t) !== F.number)
		) {
			const i = this._getOrReturnCtx(t);
			return (
				D(i, {
					code: E.invalid_type,
					expected: F.number,
					received: i.parsedType,
				}),
				W
			);
		}
		let a;
		const n = new $e();
		for (const i of this._def.checks)
			i.kind === "int"
				? te.isInteger(t.data) ||
					((a = this._getOrReturnCtx(t, a)),
					D(a, {
						code: E.invalid_type,
						expected: "integer",
						received: "float",
						message: i.message,
					}),
					n.dirty())
				: i.kind === "min"
					? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
						((a = this._getOrReturnCtx(t, a)),
						D(a, {
							code: E.too_small,
							minimum: i.value,
							type: "number",
							inclusive: i.inclusive,
							exact: !1,
							message: i.message,
						}),
						n.dirty())
					: i.kind === "max"
						? (i.inclusive ? t.data > i.value : t.data >= i.value) &&
							((a = this._getOrReturnCtx(t, a)),
							D(a, {
								code: E.too_big,
								maximum: i.value,
								type: "number",
								inclusive: i.inclusive,
								exact: !1,
								message: i.message,
							}),
							n.dirty())
						: i.kind === "multipleOf"
							? Qf(t.data, i.value) !== 0 &&
								((a = this._getOrReturnCtx(t, a)),
								D(a, {
									code: E.not_multiple_of,
									multipleOf: i.value,
									message: i.message,
								}),
								n.dirty())
							: i.kind === "finite"
								? Number.isFinite(t.data) ||
									((a = this._getOrReturnCtx(t, a)),
									D(a, { code: E.not_finite, message: i.message }),
									n.dirty())
								: te.assertNever(i);
		return { status: n.value, value: t.data };
	}
	gte(t, s) {
		return this.setLimit("min", t, !0, M.toString(s));
	}
	gt(t, s) {
		return this.setLimit("min", t, !1, M.toString(s));
	}
	lte(t, s) {
		return this.setLimit("max", t, !0, M.toString(s));
	}
	lt(t, s) {
		return this.setLimit("max", t, !1, M.toString(s));
	}
	setLimit(t, s, a, n) {
		return new $t({
			...this._def,
			checks: [
				...this._def.checks,
				{ kind: t, value: s, inclusive: a, message: M.toString(n) },
			],
		});
	}
	_addCheck(t) {
		return new $t({ ...this._def, checks: [...this._def.checks, t] });
	}
	int(t) {
		return this._addCheck({ kind: "int", message: M.toString(t) });
	}
	positive(t) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: M.toString(t),
		});
	}
	negative(t) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: M.toString(t),
		});
	}
	nonpositive(t) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: M.toString(t),
		});
	}
	nonnegative(t) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: M.toString(t),
		});
	}
	multipleOf(t, s) {
		return this._addCheck({
			kind: "multipleOf",
			value: t,
			message: M.toString(s),
		});
	}
	finite(t) {
		return this._addCheck({ kind: "finite", message: M.toString(t) });
	}
	safe(t) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: Number.MIN_SAFE_INTEGER,
			message: M.toString(t),
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: Number.MAX_SAFE_INTEGER,
			message: M.toString(t),
		});
	}
	get minValue() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "min" && (t === null || s.value > t) && (t = s.value);
		return t;
	}
	get maxValue() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "max" && (t === null || s.value < t) && (t = s.value);
		return t;
	}
	get isInt() {
		return !!this._def.checks.find(
			(t) =>
				t.kind === "int" || (t.kind === "multipleOf" && te.isInteger(t.value)),
		);
	}
	get isFinite() {
		let t = null,
			s = null;
		for (const a of this._def.checks) {
			if (a.kind === "finite" || a.kind === "int" || a.kind === "multipleOf")
				return !0;
			a.kind === "min"
				? (s === null || a.value > s) && (s = a.value)
				: a.kind === "max" && (t === null || a.value < t) && (t = a.value);
		}
		return Number.isFinite(s) && Number.isFinite(t);
	}
}
$t.create = (e) =>
	new $t({
		checks: [],
		typeName: Z.ZodNumber,
		coerce: (e == null ? void 0 : e.coerce) || !1,
		...X(e),
	});
class zt extends ee {
	constructor() {
		(super(...arguments), (this.min = this.gte), (this.max = this.lte));
	}
	_parse(t) {
		if (this._def.coerce)
			try {
				t.data = BigInt(t.data);
			} catch {
				return this._getInvalidInput(t);
			}
		if (this._getType(t) !== F.bigint) return this._getInvalidInput(t);
		let a;
		const n = new $e();
		for (const i of this._def.checks)
			i.kind === "min"
				? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
					((a = this._getOrReturnCtx(t, a)),
					D(a, {
						code: E.too_small,
						type: "bigint",
						minimum: i.value,
						inclusive: i.inclusive,
						message: i.message,
					}),
					n.dirty())
				: i.kind === "max"
					? (i.inclusive ? t.data > i.value : t.data >= i.value) &&
						((a = this._getOrReturnCtx(t, a)),
						D(a, {
							code: E.too_big,
							type: "bigint",
							maximum: i.value,
							inclusive: i.inclusive,
							message: i.message,
						}),
						n.dirty())
					: i.kind === "multipleOf"
						? t.data % i.value !== BigInt(0) &&
							((a = this._getOrReturnCtx(t, a)),
							D(a, {
								code: E.not_multiple_of,
								multipleOf: i.value,
								message: i.message,
							}),
							n.dirty())
						: te.assertNever(i);
		return { status: n.value, value: t.data };
	}
	_getInvalidInput(t) {
		const s = this._getOrReturnCtx(t);
		return (
			D(s, {
				code: E.invalid_type,
				expected: F.bigint,
				received: s.parsedType,
			}),
			W
		);
	}
	gte(t, s) {
		return this.setLimit("min", t, !0, M.toString(s));
	}
	gt(t, s) {
		return this.setLimit("min", t, !1, M.toString(s));
	}
	lte(t, s) {
		return this.setLimit("max", t, !0, M.toString(s));
	}
	lt(t, s) {
		return this.setLimit("max", t, !1, M.toString(s));
	}
	setLimit(t, s, a, n) {
		return new zt({
			...this._def,
			checks: [
				...this._def.checks,
				{ kind: t, value: s, inclusive: a, message: M.toString(n) },
			],
		});
	}
	_addCheck(t) {
		return new zt({ ...this._def, checks: [...this._def.checks, t] });
	}
	positive(t) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: M.toString(t),
		});
	}
	negative(t) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: M.toString(t),
		});
	}
	nonpositive(t) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: M.toString(t),
		});
	}
	nonnegative(t) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: M.toString(t),
		});
	}
	multipleOf(t, s) {
		return this._addCheck({
			kind: "multipleOf",
			value: t,
			message: M.toString(s),
		});
	}
	get minValue() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "min" && (t === null || s.value > t) && (t = s.value);
		return t;
	}
	get maxValue() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "max" && (t === null || s.value < t) && (t = s.value);
		return t;
	}
}
zt.create = (e) =>
	new zt({
		checks: [],
		typeName: Z.ZodBigInt,
		coerce: (e == null ? void 0 : e.coerce) ?? !1,
		...X(e),
	});
class ir extends ee {
	_parse(t) {
		if (
			(this._def.coerce && (t.data = !!t.data), this._getType(t) !== F.boolean)
		) {
			const a = this._getOrReturnCtx(t);
			return (
				D(a, {
					code: E.invalid_type,
					expected: F.boolean,
					received: a.parsedType,
				}),
				W
			);
		}
		return He(t.data);
	}
}
ir.create = (e) =>
	new ir({
		typeName: Z.ZodBoolean,
		coerce: (e == null ? void 0 : e.coerce) || !1,
		...X(e),
	});
class is extends ee {
	_parse(t) {
		if (
			(this._def.coerce && (t.data = new Date(t.data)),
			this._getType(t) !== F.date)
		) {
			const i = this._getOrReturnCtx(t);
			return (
				D(i, {
					code: E.invalid_type,
					expected: F.date,
					received: i.parsedType,
				}),
				W
			);
		}
		if (Number.isNaN(t.data.getTime())) {
			const i = this._getOrReturnCtx(t);
			return (D(i, { code: E.invalid_date }), W);
		}
		const a = new $e();
		let n;
		for (const i of this._def.checks)
			i.kind === "min"
				? t.data.getTime() < i.value &&
					((n = this._getOrReturnCtx(t, n)),
					D(n, {
						code: E.too_small,
						message: i.message,
						inclusive: !0,
						exact: !1,
						minimum: i.value,
						type: "date",
					}),
					a.dirty())
				: i.kind === "max"
					? t.data.getTime() > i.value &&
						((n = this._getOrReturnCtx(t, n)),
						D(n, {
							code: E.too_big,
							message: i.message,
							inclusive: !0,
							exact: !1,
							maximum: i.value,
							type: "date",
						}),
						a.dirty())
					: te.assertNever(i);
		return { status: a.value, value: new Date(t.data.getTime()) };
	}
	_addCheck(t) {
		return new is({ ...this._def, checks: [...this._def.checks, t] });
	}
	min(t, s) {
		return this._addCheck({
			kind: "min",
			value: t.getTime(),
			message: M.toString(s),
		});
	}
	max(t, s) {
		return this._addCheck({
			kind: "max",
			value: t.getTime(),
			message: M.toString(s),
		});
	}
	get minDate() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "min" && (t === null || s.value > t) && (t = s.value);
		return t != null ? new Date(t) : null;
	}
	get maxDate() {
		let t = null;
		for (const s of this._def.checks)
			s.kind === "max" && (t === null || s.value < t) && (t = s.value);
		return t != null ? new Date(t) : null;
	}
}
is.create = (e) =>
	new is({
		checks: [],
		coerce: (e == null ? void 0 : e.coerce) || !1,
		typeName: Z.ZodDate,
		...X(e),
	});
class Yn extends ee {
	_parse(t) {
		if (this._getType(t) !== F.symbol) {
			const a = this._getOrReturnCtx(t);
			return (
				D(a, {
					code: E.invalid_type,
					expected: F.symbol,
					received: a.parsedType,
				}),
				W
			);
		}
		return He(t.data);
	}
}
Yn.create = (e) => new Yn({ typeName: Z.ZodSymbol, ...X(e) });
class Xn extends ee {
	_parse(t) {
		if (this._getType(t) !== F.undefined) {
			const a = this._getOrReturnCtx(t);
			return (
				D(a, {
					code: E.invalid_type,
					expected: F.undefined,
					received: a.parsedType,
				}),
				W
			);
		}
		return He(t.data);
	}
}
Xn.create = (e) => new Xn({ typeName: Z.ZodUndefined, ...X(e) });
class Jn extends ee {
	_parse(t) {
		if (this._getType(t) !== F.null) {
			const a = this._getOrReturnCtx(t);
			return (
				D(a, {
					code: E.invalid_type,
					expected: F.null,
					received: a.parsedType,
				}),
				W
			);
		}
		return He(t.data);
	}
}
Jn.create = (e) => new Jn({ typeName: Z.ZodNull, ...X(e) });
class Qn extends ee {
	constructor() {
		(super(...arguments), (this._any = !0));
	}
	_parse(t) {
		return He(t.data);
	}
}
Qn.create = (e) => new Qn({ typeName: Z.ZodAny, ...X(e) });
class Kn extends ee {
	constructor() {
		(super(...arguments), (this._unknown = !0));
	}
	_parse(t) {
		return He(t.data);
	}
}
Kn.create = (e) => new Kn({ typeName: Z.ZodUnknown, ...X(e) });
class wt extends ee {
	_parse(t) {
		const s = this._getOrReturnCtx(t);
		return (
			D(s, { code: E.invalid_type, expected: F.never, received: s.parsedType }),
			W
		);
	}
}
wt.create = (e) => new wt({ typeName: Z.ZodNever, ...X(e) });
class ei extends ee {
	_parse(t) {
		if (this._getType(t) !== F.undefined) {
			const a = this._getOrReturnCtx(t);
			return (
				D(a, {
					code: E.invalid_type,
					expected: F.void,
					received: a.parsedType,
				}),
				W
			);
		}
		return He(t.data);
	}
}
ei.create = (e) => new ei({ typeName: Z.ZodVoid, ...X(e) });
class tt extends ee {
	_parse(t) {
		const { ctx: s, status: a } = this._processInputParams(t),
			n = this._def;
		if (s.parsedType !== F.array)
			return (
				D(s, {
					code: E.invalid_type,
					expected: F.array,
					received: s.parsedType,
				}),
				W
			);
		if (n.exactLength !== null) {
			const o = s.data.length > n.exactLength.value,
				l = s.data.length < n.exactLength.value;
			(o || l) &&
				(D(s, {
					code: o ? E.too_big : E.too_small,
					minimum: l ? n.exactLength.value : void 0,
					maximum: o ? n.exactLength.value : void 0,
					type: "array",
					inclusive: !0,
					exact: !0,
					message: n.exactLength.message,
				}),
				a.dirty());
		}
		if (
			(n.minLength !== null &&
				s.data.length < n.minLength.value &&
				(D(s, {
					code: E.too_small,
					minimum: n.minLength.value,
					type: "array",
					inclusive: !0,
					exact: !1,
					message: n.minLength.message,
				}),
				a.dirty()),
			n.maxLength !== null &&
				s.data.length > n.maxLength.value &&
				(D(s, {
					code: E.too_big,
					maximum: n.maxLength.value,
					type: "array",
					inclusive: !0,
					exact: !1,
					message: n.maxLength.message,
				}),
				a.dirty()),
			s.common.async)
		)
			return Promise.all(
				[...s.data].map((o, l) => n.type._parseAsync(new jt(s, o, s.path, l))),
			).then((o) => $e.mergeArray(a, o));
		const i = [...s.data].map((o, l) =>
			n.type._parseSync(new jt(s, o, s.path, l)),
		);
		return $e.mergeArray(a, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, s) {
		return new tt({
			...this._def,
			minLength: { value: t, message: M.toString(s) },
		});
	}
	max(t, s) {
		return new tt({
			...this._def,
			maxLength: { value: t, message: M.toString(s) },
		});
	}
	length(t, s) {
		return new tt({
			...this._def,
			exactLength: { value: t, message: M.toString(s) },
		});
	}
	nonempty(t) {
		return this.min(1, t);
	}
}
tt.create = (e, t) =>
	new tt({
		type: e,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: Z.ZodArray,
		...X(t),
	});
function Gt(e) {
	if (e instanceof Ne) {
		const t = {};
		for (const s in e.shape) {
			const a = e.shape[s];
			t[s] = pt.create(Gt(a));
		}
		return new Ne({ ...e._def, shape: () => t });
	} else
		return e instanceof tt
			? new tt({ ...e._def, type: Gt(e.element) })
			: e instanceof pt
				? pt.create(Gt(e.unwrap()))
				: e instanceof cs
					? cs.create(Gt(e.unwrap()))
					: e instanceof Ut
						? Ut.create(e.items.map((t) => Gt(t)))
						: e;
}
class Ne extends ee {
	constructor() {
		(super(...arguments),
			(this._cached = null),
			(this.nonstrict = this.passthrough),
			(this.augment = this.extend));
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const t = this._def.shape(),
			s = te.objectKeys(t);
		return ((this._cached = { shape: t, keys: s }), this._cached);
	}
	_parse(t) {
		if (this._getType(t) !== F.object) {
			const d = this._getOrReturnCtx(t);
			return (
				D(d, {
					code: E.invalid_type,
					expected: F.object,
					received: d.parsedType,
				}),
				W
			);
		}
		const { status: a, ctx: n } = this._processInputParams(t),
			{ shape: i, keys: o } = this._getCached(),
			l = [];
		if (
			!(this._def.catchall instanceof wt && this._def.unknownKeys === "strip")
		)
			for (const d in n.data) o.includes(d) || l.push(d);
		const c = [];
		for (const d of o) {
			const u = i[d],
				m = n.data[d];
			c.push({
				key: { status: "valid", value: d },
				value: u._parse(new jt(n, m, n.path, d)),
				alwaysSet: d in n.data,
			});
		}
		if (this._def.catchall instanceof wt) {
			const d = this._def.unknownKeys;
			if (d === "passthrough")
				for (const u of l)
					c.push({
						key: { status: "valid", value: u },
						value: { status: "valid", value: n.data[u] },
					});
			else if (d === "strict")
				l.length > 0 &&
					(D(n, { code: E.unrecognized_keys, keys: l }), a.dirty());
			else if (d !== "strip")
				throw new Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			const d = this._def.catchall;
			for (const u of l) {
				const m = n.data[u];
				c.push({
					key: { status: "valid", value: u },
					value: d._parse(new jt(n, m, n.path, u)),
					alwaysSet: u in n.data,
				});
			}
		}
		return n.common.async
			? Promise.resolve()
					.then(async () => {
						const d = [];
						for (const u of c) {
							const m = await u.key,
								v = await u.value;
							d.push({ key: m, value: v, alwaysSet: u.alwaysSet });
						}
						return d;
					})
					.then((d) => $e.mergeObjectSync(a, d))
			: $e.mergeObjectSync(a, c);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return (
			M.errToObj,
			new Ne({
				...this._def,
				unknownKeys: "strict",
				...(t !== void 0
					? {
							errorMap: (s, a) => {
								var i, o;
								const n =
									((o = (i = this._def).errorMap) == null
										? void 0
										: o.call(i, s, a).message) ?? a.defaultError;
								return s.code === "unrecognized_keys"
									? { message: M.errToObj(t).message ?? n }
									: { message: n };
							},
						}
					: {}),
			})
		);
	}
	strip() {
		return new Ne({ ...this._def, unknownKeys: "strip" });
	}
	passthrough() {
		return new Ne({ ...this._def, unknownKeys: "passthrough" });
	}
	extend(t) {
		return new Ne({
			...this._def,
			shape: () => ({ ...this._def.shape(), ...t }),
		});
	}
	merge(t) {
		return new Ne({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
			typeName: Z.ZodObject,
		});
	}
	setKey(t, s) {
		return this.augment({ [t]: s });
	}
	catchall(t) {
		return new Ne({ ...this._def, catchall: t });
	}
	pick(t) {
		const s = {};
		for (const a of te.objectKeys(t))
			t[a] && this.shape[a] && (s[a] = this.shape[a]);
		return new Ne({ ...this._def, shape: () => s });
	}
	omit(t) {
		const s = {};
		for (const a of te.objectKeys(this.shape)) t[a] || (s[a] = this.shape[a]);
		return new Ne({ ...this._def, shape: () => s });
	}
	deepPartial() {
		return Gt(this);
	}
	partial(t) {
		const s = {};
		for (const a of te.objectKeys(this.shape)) {
			const n = this.shape[a];
			t && !t[a] ? (s[a] = n) : (s[a] = n.optional());
		}
		return new Ne({ ...this._def, shape: () => s });
	}
	required(t) {
		const s = {};
		for (const a of te.objectKeys(this.shape))
			if (t && !t[a]) s[a] = this.shape[a];
			else {
				let i = this.shape[a];
				for (; i instanceof pt; ) i = i._def.innerType;
				s[a] = i;
			}
		return new Ne({ ...this._def, shape: () => s });
	}
	keyof() {
		return Io(te.objectKeys(this.shape));
	}
}
Ne.create = (e, t) =>
	new Ne({
		shape: () => e,
		unknownKeys: "strip",
		catchall: wt.create(),
		typeName: Z.ZodObject,
		...X(t),
	});
Ne.strictCreate = (e, t) =>
	new Ne({
		shape: () => e,
		unknownKeys: "strict",
		catchall: wt.create(),
		typeName: Z.ZodObject,
		...X(t),
	});
Ne.lazycreate = (e, t) =>
	new Ne({
		shape: e,
		unknownKeys: "strip",
		catchall: wt.create(),
		typeName: Z.ZodObject,
		...X(t),
	});
class or extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t),
			a = this._def.options;
		function n(i) {
			for (const l of i) if (l.result.status === "valid") return l.result;
			for (const l of i)
				if (l.result.status === "dirty")
					return (s.common.issues.push(...l.ctx.common.issues), l.result);
			const o = i.map((l) => new ct(l.ctx.common.issues));
			return (D(s, { code: E.invalid_union, unionErrors: o }), W);
		}
		if (s.common.async)
			return Promise.all(
				a.map(async (i) => {
					const o = { ...s, common: { ...s.common, issues: [] }, parent: null };
					return {
						result: await i._parseAsync({
							data: s.data,
							path: s.path,
							parent: o,
						}),
						ctx: o,
					};
				}),
			).then(n);
		{
			let i;
			const o = [];
			for (const c of a) {
				const d = { ...s, common: { ...s.common, issues: [] }, parent: null },
					u = c._parseSync({ data: s.data, path: s.path, parent: d });
				if (u.status === "valid") return u;
				(u.status === "dirty" && !i && (i = { result: u, ctx: d }),
					d.common.issues.length && o.push(d.common.issues));
			}
			if (i) return (s.common.issues.push(...i.ctx.common.issues), i.result);
			const l = o.map((c) => new ct(c));
			return (D(s, { code: E.invalid_union, unionErrors: l }), W);
		}
	}
	get options() {
		return this._def.options;
	}
}
or.create = (e, t) => new or({ options: e, typeName: Z.ZodUnion, ...X(t) });
function ha(e, t) {
	const s = ft(e),
		a = ft(t);
	if (e === t) return { valid: !0, data: e };
	if (s === F.object && a === F.object) {
		const n = te.objectKeys(t),
			i = te.objectKeys(e).filter((l) => n.indexOf(l) !== -1),
			o = { ...e, ...t };
		for (const l of i) {
			const c = ha(e[l], t[l]);
			if (!c.valid) return { valid: !1 };
			o[l] = c.data;
		}
		return { valid: !0, data: o };
	} else if (s === F.array && a === F.array) {
		if (e.length !== t.length) return { valid: !1 };
		const n = [];
		for (let i = 0; i < e.length; i++) {
			const o = e[i],
				l = t[i],
				c = ha(o, l);
			if (!c.valid) return { valid: !1 };
			n.push(c.data);
		}
		return { valid: !0, data: n };
	} else
		return s === F.date && a === F.date && +e == +t
			? { valid: !0, data: e }
			: { valid: !1 };
}
class lr extends ee {
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t),
			n = (i, o) => {
				if (Hn(i) || Hn(o)) return W;
				const l = ha(i.value, o.value);
				return l.valid
					? ((Zn(i) || Zn(o)) && s.dirty(), { status: s.value, value: l.data })
					: (D(a, { code: E.invalid_intersection_types }), W);
			};
		return a.common.async
			? Promise.all([
					this._def.left._parseAsync({ data: a.data, path: a.path, parent: a }),
					this._def.right._parseAsync({
						data: a.data,
						path: a.path,
						parent: a,
					}),
				]).then(([i, o]) => n(i, o))
			: n(
					this._def.left._parseSync({ data: a.data, path: a.path, parent: a }),
					this._def.right._parseSync({ data: a.data, path: a.path, parent: a }),
				);
	}
}
lr.create = (e, t, s) =>
	new lr({ left: e, right: t, typeName: Z.ZodIntersection, ...X(s) });
class Ut extends ee {
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t);
		if (a.parsedType !== F.array)
			return (
				D(a, {
					code: E.invalid_type,
					expected: F.array,
					received: a.parsedType,
				}),
				W
			);
		if (a.data.length < this._def.items.length)
			return (
				D(a, {
					code: E.too_small,
					minimum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: "array",
				}),
				W
			);
		!this._def.rest &&
			a.data.length > this._def.items.length &&
			(D(a, {
				code: E.too_big,
				maximum: this._def.items.length,
				inclusive: !0,
				exact: !1,
				type: "array",
			}),
			s.dirty());
		const i = [...a.data]
			.map((o, l) => {
				const c = this._def.items[l] || this._def.rest;
				return c ? c._parse(new jt(a, o, a.path, l)) : null;
			})
			.filter((o) => !!o);
		return a.common.async
			? Promise.all(i).then((o) => $e.mergeArray(s, o))
			: $e.mergeArray(s, i);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new Ut({ ...this._def, rest: t });
	}
}
Ut.create = (e, t) => {
	if (!Array.isArray(e))
		throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new Ut({ items: e, typeName: Z.ZodTuple, rest: null, ...X(t) });
};
class ti extends ee {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t);
		if (a.parsedType !== F.map)
			return (
				D(a, { code: E.invalid_type, expected: F.map, received: a.parsedType }),
				W
			);
		const n = this._def.keyType,
			i = this._def.valueType,
			o = [...a.data.entries()].map(([l, c], d) => ({
				key: n._parse(new jt(a, l, a.path, [d, "key"])),
				value: i._parse(new jt(a, c, a.path, [d, "value"])),
			}));
		if (a.common.async) {
			const l = new Map();
			return Promise.resolve().then(async () => {
				for (const c of o) {
					const d = await c.key,
						u = await c.value;
					if (d.status === "aborted" || u.status === "aborted") return W;
					((d.status === "dirty" || u.status === "dirty") && s.dirty(),
						l.set(d.value, u.value));
				}
				return { status: s.value, value: l };
			});
		} else {
			const l = new Map();
			for (const c of o) {
				const d = c.key,
					u = c.value;
				if (d.status === "aborted" || u.status === "aborted") return W;
				((d.status === "dirty" || u.status === "dirty") && s.dirty(),
					l.set(d.value, u.value));
			}
			return { status: s.value, value: l };
		}
	}
}
ti.create = (e, t, s) =>
	new ti({ valueType: t, keyType: e, typeName: Z.ZodMap, ...X(s) });
class Es extends ee {
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t);
		if (a.parsedType !== F.set)
			return (
				D(a, { code: E.invalid_type, expected: F.set, received: a.parsedType }),
				W
			);
		const n = this._def;
		(n.minSize !== null &&
			a.data.size < n.minSize.value &&
			(D(a, {
				code: E.too_small,
				minimum: n.minSize.value,
				type: "set",
				inclusive: !0,
				exact: !1,
				message: n.minSize.message,
			}),
			s.dirty()),
			n.maxSize !== null &&
				a.data.size > n.maxSize.value &&
				(D(a, {
					code: E.too_big,
					maximum: n.maxSize.value,
					type: "set",
					inclusive: !0,
					exact: !1,
					message: n.maxSize.message,
				}),
				s.dirty()));
		const i = this._def.valueType;
		function o(c) {
			const d = new Set();
			for (const u of c) {
				if (u.status === "aborted") return W;
				(u.status === "dirty" && s.dirty(), d.add(u.value));
			}
			return { status: s.value, value: d };
		}
		const l = [...a.data.values()].map((c, d) =>
			i._parse(new jt(a, c, a.path, d)),
		);
		return a.common.async ? Promise.all(l).then((c) => o(c)) : o(l);
	}
	min(t, s) {
		return new Es({
			...this._def,
			minSize: { value: t, message: M.toString(s) },
		});
	}
	max(t, s) {
		return new Es({
			...this._def,
			maxSize: { value: t, message: M.toString(s) },
		});
	}
	size(t, s) {
		return this.min(t, s).max(t, s);
	}
	nonempty(t) {
		return this.min(1, t);
	}
}
Es.create = (e, t) =>
	new Es({
		valueType: e,
		minSize: null,
		maxSize: null,
		typeName: Z.ZodSet,
		...X(t),
	});
class si extends ee {
	get schema() {
		return this._def.getter();
	}
	_parse(t) {
		const { ctx: s } = this._processInputParams(t);
		return this._def.getter()._parse({ data: s.data, path: s.path, parent: s });
	}
}
si.create = (e, t) => new si({ getter: e, typeName: Z.ZodLazy, ...X(t) });
class fa extends ee {
	_parse(t) {
		if (t.data !== this._def.value) {
			const s = this._getOrReturnCtx(t);
			return (
				D(s, {
					received: s.data,
					code: E.invalid_literal,
					expected: this._def.value,
				}),
				W
			);
		}
		return { status: "valid", value: t.data };
	}
	get value() {
		return this._def.value;
	}
}
fa.create = (e, t) => new fa({ value: e, typeName: Z.ZodLiteral, ...X(t) });
function Io(e, t) {
	return new os({ values: e, typeName: Z.ZodEnum, ...X(t) });
}
class os extends ee {
	_parse(t) {
		if (typeof t.data != "string") {
			const s = this._getOrReturnCtx(t),
				a = this._def.values;
			return (
				D(s, {
					expected: te.joinValues(a),
					received: s.parsedType,
					code: E.invalid_type,
				}),
				W
			);
		}
		if (
			(this._cache || (this._cache = new Set(this._def.values)),
			!this._cache.has(t.data))
		) {
			const s = this._getOrReturnCtx(t),
				a = this._def.values;
			return (
				D(s, { received: s.data, code: E.invalid_enum_value, options: a }),
				W
			);
		}
		return He(t.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const t = {};
		for (const s of this._def.values) t[s] = s;
		return t;
	}
	get Values() {
		const t = {};
		for (const s of this._def.values) t[s] = s;
		return t;
	}
	get Enum() {
		const t = {};
		for (const s of this._def.values) t[s] = s;
		return t;
	}
	extract(t, s = this._def) {
		return os.create(t, { ...this._def, ...s });
	}
	exclude(t, s = this._def) {
		return os.create(
			this.options.filter((a) => !t.includes(a)),
			{ ...this._def, ...s },
		);
	}
}
os.create = Io;
class xa extends ee {
	_parse(t) {
		const s = te.getValidEnumValues(this._def.values),
			a = this._getOrReturnCtx(t);
		if (a.parsedType !== F.string && a.parsedType !== F.number) {
			const n = te.objectValues(s);
			return (
				D(a, {
					expected: te.joinValues(n),
					received: a.parsedType,
					code: E.invalid_type,
				}),
				W
			);
		}
		if (
			(this._cache ||
				(this._cache = new Set(te.getValidEnumValues(this._def.values))),
			!this._cache.has(t.data))
		) {
			const n = te.objectValues(s);
			return (
				D(a, { received: a.data, code: E.invalid_enum_value, options: n }),
				W
			);
		}
		return He(t.data);
	}
	get enum() {
		return this._def.values;
	}
}
xa.create = (e, t) => new xa({ values: e, typeName: Z.ZodNativeEnum, ...X(t) });
class cr extends ee {
	unwrap() {
		return this._def.type;
	}
	_parse(t) {
		const { ctx: s } = this._processInputParams(t);
		if (s.parsedType !== F.promise && s.common.async === !1)
			return (
				D(s, {
					code: E.invalid_type,
					expected: F.promise,
					received: s.parsedType,
				}),
				W
			);
		const a = s.parsedType === F.promise ? s.data : Promise.resolve(s.data);
		return He(
			a.then((n) =>
				this._def.type.parseAsync(n, {
					path: s.path,
					errorMap: s.common.contextualErrorMap,
				}),
			),
		);
	}
}
cr.create = (e, t) => new cr({ type: e, typeName: Z.ZodPromise, ...X(t) });
class ls extends ee {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === Z.ZodEffects
			? this._def.schema.sourceType()
			: this._def.schema;
	}
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t),
			n = this._def.effect || null,
			i = {
				addIssue: (o) => {
					(D(a, o), o.fatal ? s.abort() : s.dirty());
				},
				get path() {
					return a.path;
				},
			};
		if (((i.addIssue = i.addIssue.bind(i)), n.type === "preprocess")) {
			const o = n.transform(a.data, i);
			if (a.common.async)
				return Promise.resolve(o).then(async (l) => {
					if (s.value === "aborted") return W;
					const c = await this._def.schema._parseAsync({
						data: l,
						path: a.path,
						parent: a,
					});
					return c.status === "aborted"
						? W
						: c.status === "dirty" || s.value === "dirty"
							? vs(c.value)
							: c;
				});
			{
				if (s.value === "aborted") return W;
				const l = this._def.schema._parseSync({
					data: o,
					path: a.path,
					parent: a,
				});
				return l.status === "aborted"
					? W
					: l.status === "dirty" || s.value === "dirty"
						? vs(l.value)
						: l;
			}
		}
		if (n.type === "refinement") {
			const o = (l) => {
				const c = n.refinement(l, i);
				if (a.common.async) return Promise.resolve(c);
				if (c instanceof Promise)
					throw new Error(
						"Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
					);
				return l;
			};
			if (a.common.async === !1) {
				const l = this._def.schema._parseSync({
					data: a.data,
					path: a.path,
					parent: a,
				});
				return l.status === "aborted"
					? W
					: (l.status === "dirty" && s.dirty(),
						o(l.value),
						{ status: s.value, value: l.value });
			} else
				return this._def.schema
					._parseAsync({ data: a.data, path: a.path, parent: a })
					.then((l) =>
						l.status === "aborted"
							? W
							: (l.status === "dirty" && s.dirty(),
								o(l.value).then(() => ({ status: s.value, value: l.value }))),
					);
		}
		if (n.type === "transform")
			if (a.common.async === !1) {
				const o = this._def.schema._parseSync({
					data: a.data,
					path: a.path,
					parent: a,
				});
				if (!ns(o)) return W;
				const l = n.transform(o.value, i);
				if (l instanceof Promise)
					throw new Error(
						"Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
					);
				return { status: s.value, value: l };
			} else
				return this._def.schema
					._parseAsync({ data: a.data, path: a.path, parent: a })
					.then((o) =>
						ns(o)
							? Promise.resolve(n.transform(o.value, i)).then((l) => ({
									status: s.value,
									value: l,
								}))
							: W,
					);
		te.assertNever(n);
	}
}
ls.create = (e, t, s) =>
	new ls({ schema: e, typeName: Z.ZodEffects, effect: t, ...X(s) });
ls.createWithPreprocess = (e, t, s) =>
	new ls({
		schema: t,
		effect: { type: "preprocess", transform: e },
		typeName: Z.ZodEffects,
		...X(s),
	});
class pt extends ee {
	_parse(t) {
		return this._getType(t) === F.undefined
			? He(void 0)
			: this._def.innerType._parse(t);
	}
	unwrap() {
		return this._def.innerType;
	}
}
pt.create = (e, t) =>
	new pt({ innerType: e, typeName: Z.ZodOptional, ...X(t) });
class cs extends ee {
	_parse(t) {
		return this._getType(t) === F.null
			? He(null)
			: this._def.innerType._parse(t);
	}
	unwrap() {
		return this._def.innerType;
	}
}
cs.create = (e, t) =>
	new cs({ innerType: e, typeName: Z.ZodNullable, ...X(t) });
class ga extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t);
		let a = s.data;
		return (
			s.parsedType === F.undefined && (a = this._def.defaultValue()),
			this._def.innerType._parse({ data: a, path: s.path, parent: s })
		);
	}
	removeDefault() {
		return this._def.innerType;
	}
}
ga.create = (e, t) =>
	new ga({
		innerType: e,
		typeName: Z.ZodDefault,
		defaultValue: typeof t.default == "function" ? t.default : () => t.default,
		...X(t),
	});
class pa extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t),
			a = { ...s, common: { ...s.common, issues: [] } },
			n = this._def.innerType._parse({
				data: a.data,
				path: a.path,
				parent: { ...a },
			});
		return nr(n)
			? n.then((i) => ({
					status: "valid",
					value:
						i.status === "valid"
							? i.value
							: this._def.catchValue({
									get error() {
										return new ct(a.common.issues);
									},
									input: a.data,
								}),
				}))
			: {
					status: "valid",
					value:
						n.status === "valid"
							? n.value
							: this._def.catchValue({
									get error() {
										return new ct(a.common.issues);
									},
									input: a.data,
								}),
				};
	}
	removeCatch() {
		return this._def.innerType;
	}
}
pa.create = (e, t) =>
	new pa({
		innerType: e,
		typeName: Z.ZodCatch,
		catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
		...X(t),
	});
class ri extends ee {
	_parse(t) {
		if (this._getType(t) !== F.nan) {
			const a = this._getOrReturnCtx(t);
			return (
				D(a, { code: E.invalid_type, expected: F.nan, received: a.parsedType }),
				W
			);
		}
		return { status: "valid", value: t.data };
	}
}
ri.create = (e) => new ri({ typeName: Z.ZodNaN, ...X(e) });
class Kf extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t),
			a = s.data;
		return this._def.type._parse({ data: a, path: s.path, parent: s });
	}
	unwrap() {
		return this._def.type;
	}
}
class Ua extends ee {
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t);
		if (a.common.async)
			return (async () => {
				const i = await this._def.in._parseAsync({
					data: a.data,
					path: a.path,
					parent: a,
				});
				return i.status === "aborted"
					? W
					: i.status === "dirty"
						? (s.dirty(), vs(i.value))
						: this._def.out._parseAsync({
								data: i.value,
								path: a.path,
								parent: a,
							});
			})();
		{
			const n = this._def.in._parseSync({
				data: a.data,
				path: a.path,
				parent: a,
			});
			return n.status === "aborted"
				? W
				: n.status === "dirty"
					? (s.dirty(), { status: "dirty", value: n.value })
					: this._def.out._parseSync({
							data: n.value,
							path: a.path,
							parent: a,
						});
		}
	}
	static create(t, s) {
		return new Ua({ in: t, out: s, typeName: Z.ZodPipeline });
	}
}
class ya extends ee {
	_parse(t) {
		const s = this._def.innerType._parse(t),
			a = (n) => (ns(n) && (n.value = Object.freeze(n.value)), n);
		return nr(s) ? s.then((n) => a(n)) : a(s);
	}
	unwrap() {
		return this._def.innerType;
	}
}
ya.create = (e, t) =>
	new ya({ innerType: e, typeName: Z.ZodReadonly, ...X(t) });
var Z;
(function (e) {
	((e.ZodString = "ZodString"),
		(e.ZodNumber = "ZodNumber"),
		(e.ZodNaN = "ZodNaN"),
		(e.ZodBigInt = "ZodBigInt"),
		(e.ZodBoolean = "ZodBoolean"),
		(e.ZodDate = "ZodDate"),
		(e.ZodSymbol = "ZodSymbol"),
		(e.ZodUndefined = "ZodUndefined"),
		(e.ZodNull = "ZodNull"),
		(e.ZodAny = "ZodAny"),
		(e.ZodUnknown = "ZodUnknown"),
		(e.ZodNever = "ZodNever"),
		(e.ZodVoid = "ZodVoid"),
		(e.ZodArray = "ZodArray"),
		(e.ZodObject = "ZodObject"),
		(e.ZodUnion = "ZodUnion"),
		(e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
		(e.ZodIntersection = "ZodIntersection"),
		(e.ZodTuple = "ZodTuple"),
		(e.ZodRecord = "ZodRecord"),
		(e.ZodMap = "ZodMap"),
		(e.ZodSet = "ZodSet"),
		(e.ZodFunction = "ZodFunction"),
		(e.ZodLazy = "ZodLazy"),
		(e.ZodLiteral = "ZodLiteral"),
		(e.ZodEnum = "ZodEnum"),
		(e.ZodEffects = "ZodEffects"),
		(e.ZodNativeEnum = "ZodNativeEnum"),
		(e.ZodOptional = "ZodOptional"),
		(e.ZodNullable = "ZodNullable"),
		(e.ZodDefault = "ZodDefault"),
		(e.ZodCatch = "ZodCatch"),
		(e.ZodPromise = "ZodPromise"),
		(e.ZodBranded = "ZodBranded"),
		(e.ZodPipeline = "ZodPipeline"),
		(e.ZodReadonly = "ZodReadonly"));
})(Z || (Z = {}));
const ue = it.create,
	u0 = $t.create;
zt.create;
const m0 = ir.create;
is.create;
wt.create;
const h0 = tt.create,
	Bt = Ne.create;
or.create;
lr.create;
Ut.create;
const ex = fa.create,
	tx = os.create,
	ai = xa.create;
cr.create;
pt.create;
cs.create;
const f0 = {
		string: (e) => it.create({ ...e, coerce: !0 }),
		number: (e) => $t.create({ ...e, coerce: !0 }),
		boolean: (e) => ir.create({ ...e, coerce: !0 }),
		bigint: (e) => zt.create({ ...e, coerce: !0 }),
		date: (e) => is.create({ ...e, coerce: !0 }),
	},
	sx = async (e) => (await _e.post("/auth/login", e)).data,
	rx = async (e) => (await _e.post("/auth/register", e)).data,
	ax = async (e) => {
		await _e.post("/auth/change-password", e);
	},
	fe = O.forwardRef(
		(
			{
				label: e,
				error: t,
				hint: s,
				leftIcon: a,
				rightIcon: n,
				onRightIconClick: i,
				className: o,
				id: l,
				...c
			},
			d,
		) => {
			const u = l || `input-${Math.random().toString(36).substr(2, 9)}`;
			return r.jsxs("div", {
				className: "w-full",
				children: [
					e &&
						r.jsxs("label", {
							htmlFor: u,
							className: "block text-sm font-medium text-gray-700 mb-1",
							children: [
								e,
								c.required &&
									r.jsx("span", {
										className: "text-red-500 ml-1",
										children: "*",
									}),
							],
						}),
					r.jsxs("div", {
						className: "relative",
						children: [
							a &&
								r.jsx("div", {
									className:
										"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
									children: a,
								}),
							r.jsx("input", {
								ref: d,
								id: u,
								className: U(
									"w-full rounded-lg border text-sm transition-colors",
									"focus:outline-none focus:ring-2 focus:ring-offset-0",
									"placeholder:text-gray-400",
									a ? "pl-10" : "pl-3.5",
									n ? "pr-10" : "pr-3.5",
									"py-2.5",
									t
										? "border-red-300 bg-red-50 focus:ring-red-300 focus:border-red-400 text-red-900"
										: "border-gray-300 bg-white focus:ring-primary-300 focus:border-primary-400 text-gray-900",
									c.disabled && "bg-gray-100 cursor-not-allowed text-gray-500",
									o,
								),
								...c,
							}),
							n &&
								r.jsx("div", {
									className: U(
										"absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400",
										i && "cursor-pointer hover:text-gray-600",
									),
									onClick: i,
									children: n,
								}),
						],
					}),
					t &&
						r.jsx("p", { className: "mt-1 text-xs text-red-600", children: t }),
					s &&
						!t &&
						r.jsx("p", {
							className: "mt-1 text-xs text-gray-500",
							children: s,
						}),
				],
			});
		},
	);
fe.displayName = "Input";
const nx = Bt({
		email: ue().min(1, "Введите email").email("Некорректный email"),
		password: ue().min(6, "Минимум 6 символов"),
	}),
	ix = () => {
		var m, v, p, g;
		const [e, t] = O.useState(!1),
			{ login: s } = Ee(),
			a = qt(),
			i =
				((v = (m = ja().state) == null ? void 0 : m.from) == null
					? void 0
					: v.pathname) || "/",
			{
				register: o,
				handleSubmit: l,
				formState: { errors: c, isSubmitting: d },
			} = Mt({ resolver: Vt(nx) }),
			u = async (j) => {
				var f, k;
				try {
					const b = await sx(j);
					(s(b.user, b.tokens.access_token, b.tokens.refresh_token),
						pe.success(`Добро пожаловать, ${b.user.full_name.split(" ")[0]}!`),
						a(i === "/login" ? "/" : i, { replace: !0 }));
				} catch (b) {
					const N = b,
						_ =
							((k =
								(f = N == null ? void 0 : N.response) == null
									? void 0
									: f.data) == null
								? void 0
								: k.detail) || "Неверный email или пароль";
					pe.error(_);
				}
			};
		return r.jsx("div", {
			className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
			children: r.jsxs("div", {
				className: "w-full max-w-md",
				children: [
					r.jsxs("div", {
						className: "text-center mb-8",
						children: [
							r.jsxs(H, {
								to: "/",
								className: "inline-flex items-center gap-2",
								children: [
									r.jsx("div", {
										className:
											"w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center",
										children: r.jsx("svg", {
											viewBox: "0 0 36 36",
											fill: "none",
											className: "w-7 h-7",
											children: r.jsx("path", {
												d: "M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z",
												fill: "white",
											}),
										}),
									}),
									r.jsx("div", {
										className: "text-xl font-bold text-gray-900",
										children: "АГРОРЕЗЕРВ",
									}),
								],
							}),
							r.jsx("h1", {
								className: "text-2xl font-bold text-gray-900 mt-6",
								children: "Вход в аккаунт",
							}),
							r.jsxs("p", {
								className: "text-gray-500 mt-2 text-sm",
								children: [
									"Нет аккаунта?",
									" ",
									r.jsx(H, {
										to: "/register",
										className:
											"text-primary-600 hover:text-primary-700 font-medium",
										children: "Зарегистрироваться",
									}),
								],
							}),
						],
					}),
					r.jsxs("div", {
						className:
							"bg-white rounded-2xl border border-gray-200 shadow-sm p-8",
						children: [
							r.jsxs("form", {
								onSubmit: l(u),
								className: "space-y-4",
								children: [
									r.jsx(fe, {
										label: "Email",
										type: "email",
										placeholder: "your@email.ru",
										leftIcon: r.jsx(As, { className: "w-4 h-4" }),
										error: (p = c.email) == null ? void 0 : p.message,
										...o("email"),
									}),
									r.jsx(fe, {
										label: "Пароль",
										type: e ? "text" : "password",
										placeholder: "Введите пароль",
										leftIcon: r.jsx(Qs, { className: "w-4 h-4" }),
										rightIcon: e
											? r.jsx(Ns, { className: "w-4 h-4" })
											: r.jsx(_s, { className: "w-4 h-4" }),
										onRightIconClick: () => t(!e),
										error: (g = c.password) == null ? void 0 : g.message,
										...o("password"),
									}),
									r.jsx(Ve, {
										type: "submit",
										variant: "primary",
										fullWidth: !0,
										loading: d,
										size: "lg",
										className: "mt-2",
										children: "Войти",
									}),
								],
							}),
							r.jsxs("div", {
								className: "relative my-6",
								children: [
									r.jsx("div", {
										className: "absolute inset-0 flex items-center",
										children: r.jsx("div", {
											className: "w-full border-t border-gray-200",
										}),
									}),
									r.jsx("div", {
										className: "relative flex justify-center",
										children: r.jsx("span", {
											className: "bg-white px-3 text-sm text-gray-400",
											children: "или",
										}),
									}),
								],
							}),
							r.jsxs("a", {
								href: "https://t.me/agroreserve_bot?start=login",
								target: "_blank",
								rel: "noopener noreferrer",
								className:
									"flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-blue-200 text-blue-600 font-medium text-sm hover:bg-blue-50 transition-colors",
								children: [
									r.jsx("svg", {
										viewBox: "0 0 24 24",
										className: "w-5 h-5 fill-current",
										children: r.jsx("path", {
											d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z",
										}),
									}),
									"Войти через Telegram",
								],
							}),
						],
					}),
				],
			}),
		});
	},
	ox = [
		{ value: "individual", label: "Физическое лицо (B2C)" },
		{ value: "ip", label: "ИП" },
		{ value: "ooo", label: "ООО / АО / другое" },
	],
	lx = Bt({
		full_name: ue().min(2, "Введите ФИО (минимум 2 символа)"),
		email: ue().email("Некорректный email"),
		phone: ue()
			.regex(
				/^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
				"Некорректный номер телефона",
			)
			.optional()
			.or(ex("")),
		password: ue().min(8, "Минимум 8 символов"),
		password_confirm: ue(),
		client_type: tx(["individual", "ip", "ooo"]),
	}).refine((e) => e.password === e.password_confirm, {
		message: "Пароли не совпадают",
		path: ["password_confirm"],
	}),
	cx = Bt({
		organization_name: ue().min(2, "Введите название организации"),
		inn: ue().regex(/^\d{10,12}$/, "ИНН: 10 или 12 цифр"),
		legal_address: ue().min(10, "Введите юридический адрес"),
		delivery_address: ue().optional(),
	}),
	dx = () => {
		var k, b, N, _, S, $, B, xe, me, L;
		const [e, t] = O.useState(1),
			[s, a] = O.useState(null),
			[n, i] = O.useState(!1),
			[o, l] = O.useState(!1),
			{ login: c } = Ee(),
			d = qt(),
			u = Mt({
				resolver: Vt(lx),
				defaultValues: { client_type: "individual" },
			}),
			m = Mt({ resolver: Vt(cx) }),
			v = u.watch("client_type"),
			p = v === "ip" || v === "ooo",
			g = u.handleSubmit(async (we) => {
				p ? (a(we), t(2)) : await j(we);
			}),
			j = async (we, V) => {
				var G, Q;
				try {
					const ce = await rx({
						email: we.email,
						phone: we.phone || void 0,
						password: we.password,
						full_name: we.full_name,
						client_type: we.client_type,
						organization_name: V == null ? void 0 : V.organization_name,
						inn: V == null ? void 0 : V.inn,
						legal_address: V == null ? void 0 : V.legal_address,
						delivery_address: V == null ? void 0 : V.delivery_address,
					});
					(c(ce.user, ce.tokens.access_token, ce.tokens.refresh_token),
						p
							? (pe.info(
									"Аккаунт создан! Он будет активирован после проверки менеджером.",
								),
								d("/account"))
							: (pe.success("Добро пожаловать в Агрорезерв!"), d("/")));
				} catch (ce) {
					const K = ce,
						ve =
							((Q =
								(G = K == null ? void 0 : K.response) == null
									? void 0
									: G.data) == null
								? void 0
								: Q.detail) || "Ошибка регистрации";
					pe.error(ve);
				}
			},
			f = m.handleSubmit(async (we) => {
				s && (await j(s, we));
			});
		return r.jsx("div", {
			className:
				"min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8",
			children: r.jsxs("div", {
				className: "w-full max-w-lg",
				children: [
					r.jsxs("div", {
						className: "text-center mb-8",
						children: [
							r.jsxs(H, {
								to: "/",
								className: "inline-flex items-center gap-2",
								children: [
									r.jsx("div", {
										className:
											"w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center",
										children: r.jsx("svg", {
											viewBox: "0 0 36 36",
											fill: "none",
											className: "w-7 h-7",
											children: r.jsx("path", {
												d: "M18 6C14 6 11 9 10 12c-1 3 0 7 2 10 1.5 2 4 3.5 6 4V14c2 1 4 3 5 6 1 2.5 0.5 6-1 8.5 3-1 5.5-3 7-6 1.5-3 1-7-1-10-2-3-5.5-5.5-10-6.5z",
												fill: "white",
											}),
										}),
									}),
									r.jsx("div", {
										className: "text-xl font-bold text-gray-900",
										children: "АГРОРЕЗЕРВ",
									}),
								],
							}),
							r.jsx("h1", {
								className: "text-2xl font-bold text-gray-900 mt-6",
								children: "Создать аккаунт",
							}),
							r.jsxs("p", {
								className: "text-gray-500 mt-2 text-sm",
								children: [
									"Уже есть аккаунт?",
									" ",
									r.jsx(H, {
										to: "/login",
										className:
											"text-primary-600 hover:text-primary-700 font-medium",
										children: "Войти",
									}),
								],
							}),
						],
					}),
					p &&
						r.jsxs("div", {
							className: "flex items-center gap-3 mb-6",
							children: [
								r.jsx("div", {
									className: U(
										"flex-1 h-1.5 rounded-full transition-colors",
										e >= 1 ? "bg-primary-600" : "bg-gray-200",
									),
								}),
								r.jsx("div", {
									className: U(
										"flex-1 h-1.5 rounded-full transition-colors",
										e >= 2 ? "bg-primary-600" : "bg-gray-200",
									),
								}),
								r.jsxs("div", {
									className: "text-xs text-gray-500 whitespace-nowrap",
									children: ["Шаг ", e, " из 2"],
								}),
							],
						}),
					r.jsxs("div", {
						className:
							"bg-white rounded-2xl border border-gray-200 shadow-sm p-8",
						children: [
							e === 1 &&
								r.jsxs("form", {
									onSubmit: g,
									className: "space-y-4",
									children: [
										r.jsx("h2", {
											className: "text-lg font-semibold text-gray-900 mb-4",
											children: "Личные данные",
										}),
										r.jsx(et, {
											label: "Тип аккаунта",
											options: ox,
											error:
												(k = u.formState.errors.client_type) == null
													? void 0
													: k.message,
											...u.register("client_type"),
										}),
										r.jsx(fe, {
											label: "ФИО",
											placeholder: "Иванов Иван Иванович",
											leftIcon: r.jsx(ot, { className: "w-4 h-4" }),
											error:
												(b = u.formState.errors.full_name) == null
													? void 0
													: b.message,
											required: !0,
											...u.register("full_name"),
										}),
										r.jsx(fe, {
											label: "Email",
											type: "email",
											placeholder: "your@email.ru",
											leftIcon: r.jsx(As, { className: "w-4 h-4" }),
											error:
												(N = u.formState.errors.email) == null
													? void 0
													: N.message,
											required: !0,
											...u.register("email"),
										}),
										r.jsx(fe, {
											label: "Телефон",
											type: "tel",
											placeholder: "+7 (900) 000-00-00",
											leftIcon: r.jsx(yt, { className: "w-4 h-4" }),
											error:
												(_ = u.formState.errors.phone) == null
													? void 0
													: _.message,
											hint: "Необязательно. Для уведомлений в Telegram.",
											...u.register("phone"),
										}),
										r.jsx(fe, {
											label: "Пароль",
											type: n ? "text" : "password",
											placeholder: "Минимум 8 символов",
											leftIcon: r.jsx(Qs, { className: "w-4 h-4" }),
											rightIcon: n
												? r.jsx(Ns, { className: "w-4 h-4" })
												: r.jsx(_s, { className: "w-4 h-4" }),
											onRightIconClick: () => i(!n),
											error:
												(S = u.formState.errors.password) == null
													? void 0
													: S.message,
											required: !0,
											...u.register("password"),
										}),
										r.jsx(fe, {
											label: "Подтвердите пароль",
											type: o ? "text" : "password",
											placeholder: "Повторите пароль",
											leftIcon: r.jsx(Qs, { className: "w-4 h-4" }),
											rightIcon: o
												? r.jsx(Ns, { className: "w-4 h-4" })
												: r.jsx(_s, { className: "w-4 h-4" }),
											onRightIconClick: () => l(!o),
											error:
												($ = u.formState.errors.password_confirm) == null
													? void 0
													: $.message,
											required: !0,
											...u.register("password_confirm"),
										}),
										p &&
											r.jsx("div", {
												className:
													"bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700",
												children:
													"На следующем шаге укажите реквизиты организации для доступа к оптовым ценам.",
											}),
										r.jsx(Ve, {
											type: "submit",
											variant: "primary",
											fullWidth: !0,
											loading: u.formState.isSubmitting,
											size: "lg",
											className: "mt-2",
											children: p ? "Далее" : "Зарегистрироваться",
										}),
									],
								}),
							e === 2 &&
								r.jsxs("form", {
									onSubmit: f,
									className: "space-y-4",
									children: [
										r.jsxs("div", {
											className: "flex items-center gap-3 mb-4",
											children: [
												r.jsx("button", {
													type: "button",
													onClick: () => t(1),
													className:
														"p-1.5 rounded-lg hover:bg-gray-100 text-gray-500",
													children: "← Назад",
												}),
												r.jsx("h2", {
													className: "text-lg font-semibold text-gray-900",
													children: "Реквизиты организации",
												}),
											],
										}),
										r.jsx(fe, {
											label: "Название организации",
											placeholder: "ООО «Название» или ИП Иванов И.И.",
											leftIcon: r.jsx(pi, { className: "w-4 h-4" }),
											error:
												(B = m.formState.errors.organization_name) == null
													? void 0
													: B.message,
											required: !0,
											...m.register("organization_name"),
										}),
										r.jsx(fe, {
											label: "ИНН",
											placeholder: "10 или 12 цифр",
											error:
												(xe = m.formState.errors.inn) == null
													? void 0
													: xe.message,
											hint: "Для ИП — 12 цифр, для ООО — 10 цифр",
											required: !0,
											...m.register("inn"),
										}),
										r.jsx(fe, {
											label: "Юридический адрес",
											placeholder: "г. Тобольск, ул. Ленина, д. 1",
											leftIcon: r.jsx(Be, { className: "w-4 h-4" }),
											error:
												(me = m.formState.errors.legal_address) == null
													? void 0
													: me.message,
											required: !0,
											...m.register("legal_address"),
										}),
										r.jsx(fe, {
											label: "Адрес доставки",
											placeholder: "Если отличается от юр. адреса",
											leftIcon: r.jsx(Be, { className: "w-4 h-4" }),
											error:
												(L = m.formState.errors.delivery_address) == null
													? void 0
													: L.message,
											hint: "Необязательно",
											...m.register("delivery_address"),
										}),
										r.jsx("div", {
											className:
												"bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800",
											children:
												"После регистрации ваш аккаунт будет проверен менеджером. После одобрения вы получите доступ к оптовым ценам и заказам.",
										}),
										r.jsx(Ve, {
											type: "submit",
											variant: "primary",
											fullWidth: !0,
											loading: m.formState.isSubmitting,
											size: "lg",
											children: "Завершить регистрацию",
										}),
									],
								}),
						],
					}),
				],
			}),
		});
	},
	ux = () =>
		r.jsxs("div", {
			className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
			children: [
				r.jsxs("div", {
					className: "mb-10",
					children: [
						r.jsx("h1", {
							className: "text-3xl font-bold text-gray-900 mb-3",
							children: "О компании Агрорезерв",
						}),
						r.jsx("p", {
							className: "text-lg text-gray-500",
							children: "Прямые поставки свежих овощей и фруктов в Тобольск",
						}),
					],
				}),
				r.jsx("div", {
					className: "bg-white rounded-2xl border border-gray-200 p-8 mb-6",
					children: r.jsxs("div", {
						className: "flex items-start gap-4",
						children: [
							r.jsx("div", {
								className:
									"w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0",
								children: r.jsx(Xs, { className: "w-6 h-6 text-primary-600" }),
							}),
							r.jsxs("div", {
								children: [
									r.jsx("h2", {
										className: "text-xl font-bold text-gray-900 mb-3",
										children: "Наша история",
									}),
									r.jsx("p", {
										className: "text-gray-600 leading-relaxed mb-4",
										children:
											"Агрорезерв — это проект ИП Наимов Хусейн Вохиджонович, основанный на семейных связях с фермерскими хозяйствами. Благодаря прямым поставкам без посредников мы предлагаем цены на 20–35% ниже рынка при высоком качестве продуктов.",
									}),
									r.jsx("p", {
										className: "text-gray-600 leading-relaxed",
										children:
											"Наша цель — сделать свежие узбекские овощи, фрукты, сухофрукты и специи доступными для жителей и предприятий Тобольска. Мы работаем с B2B-клиентами (школы, кафе, рестораны, столовые) и частными покупателями.",
									}),
								],
							}),
						],
					}),
				}),
				r.jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",
					children: [
						{
							icon: gi,
							color: "text-green-600",
							bg: "bg-green-50",
							title: "Прямые поставки",
							desc: "Без посредников, напрямую от фермеров. Свежесть и качество гарантированы.",
						},
						{
							icon: us,
							color: "text-blue-600",
							bg: "bg-blue-50",
							title: "Бесплатная доставка",
							desc: "Доставляем по Тобольску и пригороду на собственном транспорте.",
						},
						{
							icon: Sa,
							color: "text-purple-600",
							bg: "bg-purple-50",
							title: "44-ФЗ документы",
							desc: "Полный пакет: ТОРГ-12, счета, УПД, сертификаты ТР ТС для госзакупок.",
						},
						{
							icon: Xs,
							color: "text-primary-600",
							bg: "bg-primary-50",
							title: "Свежесть",
							desc: "Склад с 3 температурными зонами. Поставки раз в 2 недели.",
						},
					].map((e, t) => {
						const s = e.icon;
						return r.jsxs(
							"div",
							{
								className: "bg-white rounded-xl border border-gray-200 p-5",
								children: [
									r.jsx("div", {
										className: `w-10 h-10 ${e.bg} rounded-lg flex items-center justify-center mb-3`,
										children: r.jsx(s, { className: `w-5 h-5 ${e.color}` }),
									}),
									r.jsx("h3", {
										className: "font-semibold text-gray-900 mb-1",
										children: e.title,
									}),
									r.jsx("p", {
										className: "text-sm text-gray-500",
										children: e.desc,
									}),
								],
							},
							t,
						);
					}),
				}),
				r.jsxs("div", {
					className: "bg-white rounded-2xl border border-gray-200 p-8 mb-6",
					children: [
						r.jsx("h2", {
							className: "text-xl font-bold text-gray-900 mb-4",
							children: "Наш ассортимент",
						}),
						r.jsx("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
							children: [
								{ icon: "🥕", name: "Овощи" },
								{ icon: "🍎", name: "Фрукты" },
								{ icon: "🍇", name: "Сухофрукты" },
								{ icon: "🥜", name: "Орехи" },
								{ icon: "🌶️", name: "Специи" },
								{ icon: "🍯", name: "Мёд" },
								{ icon: "🫒", name: "Масла" },
								{ icon: "🌿", name: "Зелень" },
							].map((e, t) =>
								r.jsxs(
									"div",
									{
										className:
											"flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-sm",
										children: [
											r.jsx("span", {
												className: "text-2xl",
												children: e.icon,
											}),
											r.jsx("span", {
												className: "font-medium text-gray-700",
												children: e.name,
											}),
										],
									},
									t,
								),
							),
						}),
					],
				}),
				r.jsxs("div", {
					className: "bg-white rounded-2xl border border-gray-200 p-8 mb-6",
					children: [
						r.jsx("h2", {
							className: "text-xl font-bold text-gray-900 mb-4",
							children: "Реквизиты",
						}),
						r.jsx("dl", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm",
							children: [
								{ dt: "Организация", dd: "ИП Наимов Хусейн Вохиджонович" },
								{ dt: "ИНН", dd: "0000000000" },
								{ dt: "ОГРНИП", dd: "000000000000000" },
								{ dt: "Система налогообложения", dd: "УСН 6%" },
								{ dt: "Банк", dd: "ПАО «Сбербанк»" },
								{ dt: "Адрес", dd: "г. Тобольск, Тюменская обл." },
							].map((e, t) =>
								r.jsxs(
									"div",
									{
										className: "flex gap-2",
										children: [
											r.jsxs("dt", {
												className: "text-gray-500 min-w-[160px]",
												children: [e.dt, ":"],
											}),
											r.jsx("dd", {
												className: "text-gray-900 font-medium",
												children: e.dd,
											}),
										],
									},
									t,
								),
							),
						}),
					],
				}),
				r.jsxs("div", {
					className: "bg-primary-50 rounded-2xl border border-primary-100 p-8",
					children: [
						r.jsx("h2", {
							className: "text-xl font-bold text-gray-900 mb-4",
							children: "Контакты",
						}),
						r.jsxs("div", {
							className: "space-y-3",
							children: [
								r.jsxs("a", {
									href: "tel:+79000000000",
									className:
										"flex items-center gap-3 text-gray-700 hover:text-primary-700",
									children: [
										r.jsx(yt, { className: "w-5 h-5 text-primary-600" }),
										"+7 (900) 000-00-00",
									],
								}),
								r.jsxs("a", {
									href: "mailto:info@agroreserve.ru",
									className:
										"flex items-center gap-3 text-gray-700 hover:text-primary-700",
									children: [
										r.jsx(As, { className: "w-5 h-5 text-primary-600" }),
										"info@agroreserve.ru",
									],
								}),
								r.jsxs("div", {
									className: "flex items-center gap-3 text-gray-700",
									children: [
										r.jsx(Be, { className: "w-5 h-5 text-primary-600" }),
										"г. Тобольск, Тюменская область",
									],
								}),
							],
						}),
						r.jsxs("div", {
							className: "mt-6 flex gap-3",
							children: [
								r.jsx(H, {
									to: "/catalog",
									className:
										"px-5 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors text-sm",
									children: "Перейти в каталог",
								}),
								r.jsx(H, {
									to: "/contacts",
									className:
										"px-5 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm",
									children: "Все контакты",
								}),
							],
						}),
					],
				}),
			],
		}),
	mx = () =>
		r.jsxs("div", {
			className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
			children: [
				r.jsx("h1", {
					className: "text-3xl font-bold text-gray-900 mb-2",
					children: "Контакты",
				}),
				r.jsx("p", {
					className: "text-gray-500 mb-8",
					children: "Свяжитесь с нами удобным способом",
				}),
				r.jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
					children: [
						r.jsxs("div", {
							className: "space-y-4",
							children: [
								r.jsxs("div", {
									className: "bg-white rounded-xl border border-gray-200 p-6",
									children: [
										r.jsx("h2", {
											className: "text-base font-semibold text-gray-900 mb-4",
											children: "Способы связи",
										}),
										r.jsxs("div", {
											className: "space-y-4",
											children: [
												r.jsxs("a", {
													href: "tel:+79000000000",
													className:
														"flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors",
													children: [
														r.jsx("div", {
															className:
																"w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0",
															children: r.jsx(yt, {
																className: "w-5 h-5 text-primary-600",
															}),
														}),
														r.jsxs("div", {
															children: [
																r.jsx("div", {
																	className:
																		"text-sm font-medium text-gray-900",
																	children: "Телефон",
																}),
																r.jsx("div", {
																	className: "text-sm text-gray-600",
																	children: "+7 (900) 000-00-00",
																}),
																r.jsx("div", {
																	className: "text-xs text-gray-400 mt-0.5",
																	children: "Звонки пн–сб 08:00–18:00",
																}),
															],
														}),
													],
												}),
												r.jsxs("a", {
													href: "https://t.me/agroreserve",
													target: "_blank",
													rel: "noopener noreferrer",
													className:
														"flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors",
													children: [
														r.jsx("div", {
															className:
																"w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0",
															children: r.jsx(Na, {
																className: "w-5 h-5 text-blue-500",
															}),
														}),
														r.jsxs("div", {
															children: [
																r.jsx("div", {
																	className:
																		"text-sm font-medium text-gray-900",
																	children: "Telegram",
																}),
																r.jsx("div", {
																	className: "text-sm text-gray-600",
																	children: "@agroreserve",
																}),
																r.jsx("div", {
																	className: "text-xs text-gray-400 mt-0.5",
																	children: "Быстрый ответ",
																}),
															],
														}),
													],
												}),
												r.jsxs("a", {
													href: "mailto:info@agroreserve.ru",
													className:
														"flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors",
													children: [
														r.jsx("div", {
															className:
																"w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0",
															children: r.jsx(As, {
																className: "w-5 h-5 text-orange-500",
															}),
														}),
														r.jsxs("div", {
															children: [
																r.jsx("div", {
																	className:
																		"text-sm font-medium text-gray-900",
																	children: "Email",
																}),
																r.jsx("div", {
																	className: "text-sm text-gray-600",
																	children: "info@agroreserve.ru",
																}),
																r.jsx("div", {
																	className: "text-xs text-gray-400 mt-0.5",
																	children: "Для официальных запросов",
																}),
															],
														}),
													],
												}),
											],
										}),
									],
								}),
								r.jsxs("div", {
									className: "bg-white rounded-xl border border-gray-200 p-6",
									children: [
										r.jsx("h2", {
											className: "text-base font-semibold text-gray-900 mb-4",
											children: "Адрес и время работы",
										}),
										r.jsxs("div", {
											className: "space-y-3",
											children: [
												r.jsxs("div", {
													className: "flex items-start gap-3",
													children: [
														r.jsx(Be, {
															className:
																"w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0",
														}),
														r.jsxs("div", {
															children: [
																r.jsx("div", {
																	className:
																		"text-sm font-medium text-gray-900",
																	children: "Адрес",
																}),
																r.jsx("div", {
																	className: "text-sm text-gray-600",
																	children: "г. Тобольск, Тюменская область",
																}),
																r.jsx("div", {
																	className: "text-xs text-gray-400 mt-0.5",
																	children: "Самовывоз — по договорённости",
																}),
															],
														}),
													],
												}),
												r.jsxs("div", {
													className: "flex items-start gap-3",
													children: [
														r.jsx(ds, {
															className:
																"w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0",
														}),
														r.jsxs("div", {
															children: [
																r.jsx("div", {
																	className:
																		"text-sm font-medium text-gray-900",
																	children: "Время работы",
																}),
																r.jsx("div", {
																	className: "text-sm text-gray-600",
																	children: "Пн–Сб: 08:00–18:00",
																}),
																r.jsx("div", {
																	className: "text-xs text-gray-400 mt-0.5",
																	children: "Вс — выходной",
																}),
															],
														}),
													],
												}),
											],
										}),
									],
								}),
							],
						}),
						r.jsx("div", {
							className:
								"bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]",
							children: r.jsxs("div", {
								className: "text-center p-8",
								children: [
									r.jsx(Be, {
										className: "w-12 h-12 text-gray-400 mx-auto mb-3",
									}),
									r.jsx("p", {
										className: "text-gray-500 text-sm",
										children: "г. Тобольск, Тюменская область",
									}),
									r.jsx("a", {
										href: "https://maps.google.com/?q=Тобольск,Тюменская+область",
										target: "_blank",
										rel: "noopener noreferrer",
										className:
											"mt-3 inline-block text-sm text-primary-600 hover:underline",
										children: "Открыть в Google Maps",
									}),
								],
							}),
						}),
					],
				}),
				r.jsxs("div", {
					className:
						"mt-6 bg-primary-50 rounded-xl border border-primary-100 p-6",
					children: [
						r.jsx("h2", {
							className: "text-base font-semibold text-gray-900 mb-2",
							children: "Доставка",
						}),
						r.jsx("p", {
							className: "text-sm text-gray-600",
							children:
								"Бесплатная доставка по Тобольску и пригороду на нашем транспорте. Временные слоты: 08:00–11:00, 11:00–14:00, 14:00–17:00. Доставка осуществляется с понедельника по субботу.",
						}),
					],
				}),
			],
		}),
	hx = async (e) => (await _e.get("/schools/dishes", { params: e })).data,
	fx = async (e) => (await _e.post("/schools/menus", e)).data,
	xx = async (e) => (await _e.post(`/schools/menus/${e}/order`)).data,
	gx = [
		{
			icon: bt,
			text: "Прямые договоры до 600 000 ₽ без конкурентных процедур по 44-ФЗ",
		},
		{
			icon: bt,
			text: "Полный пакет закрывающих документов: ТОРГ-12, УПД, счёт-фактура",
		},
		{
			icon: Ys,
			text: "Декларации соответствия ТР ТС и сертификаты качества на каждый товар",
		},
		{
			icon: vl,
			text: "Ветеринарные справки и удостоверения качества и безопасности",
		},
		{ icon: Xr, text: "Цены на 20–35% ниже среднерыночных — экономия бюджета" },
		{
			icon: us,
			text: "Бесплатная доставка в утреннее время до начала учебного дня",
		},
		{ icon: Xs, text: "Стабильные поставки по графику, под учебный год" },
		{
			icon: jl,
			text: "Электронный документооборот, ЭЦП для электронных торговых площадок",
		},
	],
	px = [
		{ icon: "📄", name: "ТОРГ-12", desc: "Товарная накладная" },
		{ icon: "💳", name: "Счёт-фактура", desc: "Для НДС-плательщиков" },
		{ icon: "📋", name: "УПД", desc: "Универсальный передаточный документ" },
		{
			icon: "🏆",
			name: "Декларация ТР ТС",
			desc: "Соответствие техрегламентам",
		},
		{ icon: "🏅", name: "Сертификаты", desc: "Качество и безопасность" },
		{ icon: "🐄", name: "Ветсправки", desc: "Ветеринарные документы" },
	],
	yx = [
		{ value: "breakfast", label: "Завтрак" },
		{ value: "lunch", label: "Обед" },
		{ value: "dinner", label: "Ужин" },
		{ value: "snack", label: "Полдник" },
	],
	bx = [
		"Все",
		"Первое блюдо",
		"Второе блюдо",
		"Гарнир",
		"Салат",
		"Выпечка",
		"Десерт",
		"Напиток",
	],
	vx = () => {
		const [e, t] = O.useState("Все"),
			[s, a] = O.useState({}),
			[n, i] = O.useState(""),
			[o, l] = O.useState(null),
			{ data: c, isLoading: d } = st({
				queryKey: ["schoolDishes", e],
				queryFn: () => hx({ category: e !== "Все" ? e : void 0 }),
			}),
			u = (f) => {
				const k = f._id;
				if (s[k]) {
					const b = { ...s };
					(delete b[k], a(b));
				} else a({ ...s, [k]: { dish: f, portions: 100, meal_type: "lunch" } });
			},
			m = (f, k) => {
				if (!s[f]) return;
				const b = Math.max(1, s[f].portions + k);
				a({ ...s, [f]: { ...s[f], portions: b } });
			},
			v = (f, k) => {
				s[f] && a({ ...s, [f]: { ...s[f], meal_type: k } });
			},
			p = O.useMemo(
				() =>
					Object.values(s).reduce(
						(f, { dish: k, portions: b }) => ({
							calories: f.calories + k.calories * b,
							protein: f.protein + k.protein * b,
							fat: f.fat + k.fat * b,
							carbs: f.carbs + k.carbs * b,
							portions: f.portions + b,
						}),
						{ calories: 0, protein: 0, fat: 0, carbs: 0, portions: 0 },
					),
				[s],
			),
			g = Object.keys(s).length,
			j = li({
				mutationFn: async () => {
					if (!n) throw new Error("Укажите дату начала недели");
					const f = new Date(n);
					f.setDate(f.getDate() + 6);
					const k = f.toISOString().split("T")[0],
						b = await fx({
							week_start: n,
							week_end: k,
							days: [
								{
									date: n,
									items: Object.values(s).map(
										({ dish: N, portions: _, meal_type: S }) => ({
											dish_id: N._id,
											portions: _,
											meal_type: S,
										}),
									),
								},
							],
						});
					return xx(b._id);
				},
				onSuccess: (f) => {
					(l(f.order_number), a({}));
				},
			});
		return r.jsxs("div", {
			className: "space-y-6",
			children: [
				o &&
					r.jsxs("div", {
						className:
							"bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3",
						children: [
							r.jsx(ts, { className: "w-5 h-5 text-green-600 flex-shrink-0" }),
							r.jsxs("div", {
								children: [
									r.jsxs("div", {
										className: "font-semibold text-green-900",
										children: ["Заказ ", o, " успешно создан!"],
									}),
									r.jsx(H, {
										to: "/account/orders",
										className: "text-sm text-green-700 underline",
										children: "Перейти к заказам",
									}),
								],
							}),
						],
					}),
				r.jsx("div", {
					className: "flex flex-wrap gap-2",
					children: bx.map((f) =>
						r.jsx(
							"button",
							{
								onClick: () => t(f),
								className: `text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors ${e === f ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-600 hover:border-gray-400 bg-white"}`,
								children: f,
							},
							f,
						),
					),
				}),
				r.jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [
						r.jsxs("div", {
							className: "lg:col-span-2",
							children: [
								r.jsx("h3", {
									className: "text-base font-semibold text-gray-900 mb-3",
									children: "Выберите блюда",
								}),
								d
									? r.jsx("div", {
											className: "text-center py-8 text-gray-400 text-sm",
											children: "Загружаем справочник...",
										})
									: c != null && c.length
										? r.jsx("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
												children: c.map((f) => {
													const k = !!s[f._id];
													return r.jsxs(
														"button",
														{
															onClick: () => u(f),
															className: `text-left p-4 rounded-xl border transition-all ${k ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`,
															children: [
																r.jsxs("div", {
																	className:
																		"flex items-start justify-between gap-2",
																	children: [
																		r.jsx("div", {
																			className:
																				"font-medium text-gray-900 text-sm",
																			children: f.name,
																		}),
																		r.jsx("div", {
																			className: `w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${k ? "bg-blue-600 border-blue-600" : "border-gray-300"}`,
																			children:
																				k &&
																				r.jsx("svg", {
																					className: "w-3 h-3 text-white",
																					fill: "currentColor",
																					viewBox: "0 0 12 12",
																					children: r.jsx("path", {
																						d: "M10 3L5 8 2 5",
																						stroke: "white",
																						strokeWidth: "2",
																						fill: "none",
																						strokeLinecap: "round",
																					}),
																				}),
																		}),
																	],
																}),
																r.jsxs("div", {
																	className: "text-xs text-gray-500 mt-1",
																	children: [
																		f.category,
																		" · ",
																		f.portion_weight_g,
																		"г",
																	],
																}),
																r.jsxs("div", {
																	className: "flex gap-2 mt-1.5 flex-wrap",
																	children: [
																		r.jsxs("span", {
																			className:
																				"text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded",
																			children: [f.calories, " ккал"],
																		}),
																		r.jsxs("span", {
																			className:
																				"text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded",
																			children: ["Б ", f.protein, "г"],
																		}),
																		f.sanpin_compliant &&
																			r.jsx("span", {
																				className:
																					"text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded",
																				children: "✓ СанПиН",
																			}),
																	],
																}),
															],
														},
														f._id,
													);
												}),
											})
										: r.jsx("div", {
												className: "text-center py-8 text-gray-400 text-sm",
												children: "Блюда не найдены",
											}),
							],
						}),
						r.jsxs("div", {
							className: "space-y-4",
							children: [
								r.jsxs("div", {
									className: "bg-white rounded-xl border border-gray-200 p-4",
									children: [
										r.jsxs("h3", {
											className:
												"text-base font-semibold text-gray-900 mb-3 flex items-center gap-2",
											children: [
												r.jsx(es, { className: "w-4 h-4" }),
												"Выбрано (",
												g,
												")",
											],
										}),
										g === 0
											? r.jsx("p", {
													className: "text-xs text-gray-400 py-2",
													children: "Выберите блюда из списка",
												})
											: r.jsx("div", {
													className: "space-y-3",
													children: Object.values(s).map(
														({ dish: f, portions: k, meal_type: b }) =>
															r.jsxs(
																"div",
																{
																	className: "space-y-2",
																	children: [
																		r.jsx("div", {
																			className:
																				"text-sm font-medium text-gray-800 truncate",
																			children: f.name,
																		}),
																		r.jsxs("div", {
																			className: "flex items-center gap-2",
																			children: [
																				r.jsx("select", {
																					value: b,
																					onChange: (N) =>
																						v(f._id, N.target.value),
																					className:
																						"text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none",
																					children: yx.map((N) =>
																						r.jsx(
																							"option",
																							{
																								value: N.value,
																								children: N.label,
																							},
																							N.value,
																						),
																					),
																				}),
																				r.jsxs("div", {
																					className:
																						"flex items-center gap-1 ml-auto",
																					children: [
																						r.jsx("button", {
																							onClick: () => m(f._id, -10),
																							className:
																								"w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50",
																							children: r.jsx(Ea, {
																								className: "w-3 h-3",
																							}),
																						}),
																						r.jsxs("span", {
																							className:
																								"text-xs font-semibold w-10 text-center",
																							children: [k, " пор."],
																						}),
																						r.jsx("button", {
																							onClick: () => m(f._id, 10),
																							className:
																								"w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50",
																							children: r.jsx(Js, {
																								className: "w-3 h-3",
																							}),
																						}),
																					],
																				}),
																			],
																		}),
																	],
																},
																f._id,
															),
													),
												}),
									],
								}),
								g > 0 &&
									r.jsxs("div", {
										className:
											"bg-blue-50 rounded-xl border border-blue-200 p-4",
										children: [
											r.jsxs("h3", {
												className:
													"text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2",
												children: [
													r.jsx(wl, { className: "w-4 h-4" }),
													"КБЖУ итого (",
													p.portions,
													" порций)",
												],
											}),
											r.jsxs("div", {
												className: "grid grid-cols-2 gap-2 text-xs",
												children: [
													r.jsxs("div", {
														className: "bg-white rounded-lg p-2",
														children: [
															r.jsx("div", {
																className: "text-gray-400",
																children: "Ккал",
															}),
															r.jsx("div", {
																className: "font-bold text-gray-900",
																children: p.calories.toFixed(0),
															}),
														],
													}),
													r.jsxs("div", {
														className: "bg-white rounded-lg p-2",
														children: [
															r.jsx("div", {
																className: "text-gray-400",
																children: "Белки, г",
															}),
															r.jsx("div", {
																className: "font-bold text-gray-900",
																children: p.protein.toFixed(1),
															}),
														],
													}),
													r.jsxs("div", {
														className: "bg-white rounded-lg p-2",
														children: [
															r.jsx("div", {
																className: "text-gray-400",
																children: "Жиры, г",
															}),
															r.jsx("div", {
																className: "font-bold text-gray-900",
																children: p.fat.toFixed(1),
															}),
														],
													}),
													r.jsxs("div", {
														className: "bg-white rounded-lg p-2",
														children: [
															r.jsx("div", {
																className: "text-gray-400",
																children: "Углеводы, г",
															}),
															r.jsx("div", {
																className: "font-bold text-gray-900",
																children: p.carbs.toFixed(1),
															}),
														],
													}),
												],
											}),
										],
									}),
								g > 0 &&
									r.jsxs("div", {
										className: "space-y-3",
										children: [
											r.jsxs("div", {
												children: [
													r.jsx("label", {
														className:
															"block text-sm font-medium text-gray-700 mb-1",
														children: "Дата начала недели",
													}),
													r.jsx("input", {
														type: "date",
														value: n,
														onChange: (f) => i(f.target.value),
														className:
															"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
													}),
												],
											}),
											r.jsxs("button", {
												onClick: () => j.mutate(),
												disabled: j.isPending || !n,
												className:
													"w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60",
												children: [
													r.jsx(es, { className: "w-5 h-5" }),
													j.isPending
														? "Создаём заказ..."
														: "Сформировать заказ",
												],
											}),
											j.isError &&
												r.jsxs("p", {
													className:
														"text-xs text-red-600 flex items-center gap-1",
													children: [
														r.jsx(mr, { className: "w-3.5 h-3.5" }),
														"Ошибка при создании заказа",
													],
												}),
										],
									}),
							],
						}),
					],
				}),
			],
		});
	},
	jx = () => {
		const { isAuthenticated: e, user: t } = Ee(),
			s =
				e &&
				t &&
				(t.client_type === "ooo" || t.client_type === "ip" || t.school);
		return r.jsxs("div", {
			children: [
				r.jsx("section", {
					className:
						"bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20",
					children: r.jsx("div", {
						className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
						children: r.jsxs("div", {
							className: "max-w-2xl",
							children: [
								r.jsxs("div", {
									className:
										"inline-flex items-center gap-2 bg-white/20 text-blue-100 text-sm font-medium px-3 py-1.5 rounded-full mb-4",
									children: [
										r.jsx(Ys, { className: "w-4 h-4" }),
										"Поставщик для школьного питания",
									],
								}),
								r.jsxs("h1", {
									className:
										"text-4xl sm:text-5xl font-bold mb-4 leading-tight",
									children: [
										"Свежие продукты для школьного питания",
										r.jsx("span", {
											className: "block text-blue-200 mt-1",
											children: "по 44-ФЗ",
										}),
									],
								}),
								r.jsx("p", {
									className: "text-lg text-blue-100 mb-8 leading-relaxed",
									children:
										"Прямые договоры до 600 000 ₽ без конкурентных процедур. Конструктор меню с расчётом КБЖУ. Полный пакет документов — от накладной до ветсправки.",
								}),
								r.jsxs("div", {
									className: "flex flex-col sm:flex-row gap-3",
									children: [
										e
											? r.jsxs("a", {
													href: "#menu-constructor",
													className:
														"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors",
													children: [
														r.jsx(Xr, { className: "w-5 h-5" }),
														"Конструктор меню",
													],
												})
											: r.jsxs(H, {
													to: "/register",
													className:
														"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors",
													children: [
														"Зарегистрироваться",
														r.jsx(Ae, { className: "w-5 h-5" }),
													],
												}),
										r.jsxs("a", {
											href: "tel:+79000000000",
											className:
												"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-colors",
											children: [
												r.jsx(yt, { className: "w-5 h-5" }),
												"Позвонить",
											],
										}),
									],
								}),
							],
						}),
					}),
				}),
				r.jsxs("div", {
					className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14",
					children: [
						r.jsxs("section", {
							children: [
								r.jsx("h2", {
									className: "text-2xl font-bold text-gray-900 mb-2",
									children: "Почему выбирают нас",
								}),
								r.jsx("p", {
									className: "text-gray-500 text-sm mb-6",
									children: "Работаем с учреждениями питания с 2018 года",
								}),
								r.jsx("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: gx.map((a, n) => {
										const i = a.icon;
										return r.jsxs(
											"div",
											{
												className:
													"flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200",
												children: [
													r.jsx("div", {
														className:
															"w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0",
														children: r.jsx(i, {
															className: "w-4 h-4 text-blue-600",
														}),
													}),
													r.jsx("span", {
														className: "text-sm text-gray-700 leading-relaxed",
														children: a.text,
													}),
												],
											},
											n,
										);
									}),
								}),
							],
						}),
						r.jsxs("section", {
							children: [
								r.jsx("h2", {
									className: "text-2xl font-bold text-gray-900 mb-2",
									children: "Полный комплект документов",
								}),
								r.jsx("p", {
									className: "text-gray-500 text-sm mb-6",
									children: "Всё необходимое для бухгалтерии, ФСНС и проверок",
								}),
								r.jsx("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
									children: px.map((a, n) =>
										r.jsxs(
											"div",
											{
												className:
													"flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200",
												children: [
													r.jsx("div", {
														className: "text-2xl",
														children: a.icon,
													}),
													r.jsxs("div", {
														children: [
															r.jsx("div", {
																className:
																	"text-sm font-semibold text-gray-900",
																children: a.name,
															}),
															r.jsx("div", {
																className: "text-xs text-gray-500",
																children: a.desc,
															}),
														],
													}),
												],
											},
											n,
										),
									),
								}),
							],
						}),
						r.jsxs("section", {
							id: "menu-constructor",
							children: [
								r.jsxs("div", {
									className: "flex items-center gap-3 mb-2",
									children: [
										r.jsx("h2", {
											className: "text-2xl font-bold text-gray-900",
											children: "Конструктор меню",
										}),
										r.jsx("span", {
											className:
												"bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full",
											children: "Beta",
										}),
									],
								}),
								r.jsx("p", {
									className: "text-gray-500 text-sm mb-6",
									children:
										"Составьте меню, рассчитайте КБЖУ и сформируйте заказ одним нажатием",
								}),
								s
									? r.jsx(vx, {})
									: e
										? r.jsxs("div", {
												className:
													"bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center",
												children: [
													r.jsx(mr, {
														className: "w-10 h-10 text-amber-500 mx-auto mb-3",
													}),
													r.jsx("h3", {
														className:
															"text-lg font-semibold text-gray-900 mb-2",
														children: "Конструктор доступен для организаций",
													}),
													r.jsx("p", {
														className: "text-sm text-gray-500 mb-4",
														children:
															"Зарегистрируйтесь как ИП или ООО для доступа к конструктору меню и инструментам школьного питания.",
													}),
													r.jsx(H, {
														to: "/account/profile",
														className:
															"inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors",
														children: "Обновить профиль",
													}),
												],
											})
										: r.jsxs("div", {
												className:
													"bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8 text-center",
												children: [
													r.jsx(Xr, {
														className: "w-12 h-12 text-blue-600 mx-auto mb-4",
													}),
													r.jsx("h3", {
														className: "text-xl font-bold text-gray-900 mb-2",
														children:
															"Зарегистрируйтесь для доступа к конструктору меню",
													}),
													r.jsx("p", {
														className:
															"text-sm text-gray-600 mb-6 max-w-md mx-auto",
														children:
															"Авторизованные B2B-клиенты получают доступ к конструктору меню с расчётом КБЖУ, автоматическим формированием заказа и отчётностью.",
													}),
													r.jsxs("div", {
														className:
															"flex flex-col sm:flex-row items-center justify-center gap-3",
														children: [
															r.jsxs(H, {
																to: "/register",
																className:
																	"flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors",
																children: [
																	"Зарегистрироваться",
																	r.jsx(Ae, { className: "w-5 h-5" }),
																],
															}),
															r.jsx(H, {
																to: "/login",
																className:
																	"text-sm text-blue-600 hover:text-blue-700 font-medium",
																children: "Уже есть аккаунт? Войти",
															}),
														],
													}),
												],
											}),
							],
						}),
						r.jsx("section", {
							children: r.jsxs("div", {
								className:
									"bg-gray-900 rounded-2xl p-10 text-white text-center",
								children: [
									r.jsx(Ys, {
										className: "w-12 h-12 text-blue-400 mx-auto mb-4",
									}),
									r.jsx("h2", {
										className: "text-2xl font-bold mb-2",
										children: "Готовы к сотрудничеству?",
									}),
									r.jsx("p", {
										className: "text-gray-400 mb-8 max-w-md mx-auto",
										children:
											"Свяжитесь с нами для обсуждения условий поставок и подписания договора",
									}),
									r.jsxs("div", {
										className:
											"flex flex-col sm:flex-row items-center justify-center gap-3",
										children: [
											r.jsxs("a", {
												href: "tel:+79000000000",
												className:
													"flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors",
												children: [
													r.jsx(yt, { className: "w-5 h-5" }),
													"Позвонить",
												],
											}),
											r.jsxs(H, {
												to: "/register",
												className:
													"flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors",
												children: [
													r.jsx(bt, { className: "w-5 h-5" }),
													"Зарегистрироваться",
												],
											}),
										],
									}),
								],
							}),
						}),
					],
				}),
			],
		});
	},
	wx = ({ item: e, onRemove: t, onUpdateQty: s }) => {
		var i, o, l;
		const [a, n] = O.useState(!1);
		return r.jsxs("div", {
			className: "flex gap-4 p-4 bg-white rounded-xl border border-gray-200",
			children: [
				r.jsx(H, {
					to: `/catalog/${((i = e.product.category) == null ? void 0 : i.slug) || "products"}/${e.product.slug}`,
					children: r.jsx("div", {
						className:
							"w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0",
						children:
							!a && (o = e.product.images) != null && o[0]
								? r.jsx("img", {
										src: e.product.images[0],
										alt: e.product.name,
										className: "w-full h-full object-cover",
										onError: () => n(!0),
									})
								: r.jsx("div", {
										className: "w-full h-full flex items-center justify-center",
										children: r.jsx(Yr, { className: "w-8 h-8 text-gray-300" }),
									}),
					}),
				}),
				r.jsxs("div", {
					className: "flex-1 min-w-0",
					children: [
						r.jsx(H, {
							to: `/catalog/${((l = e.product.category) == null ? void 0 : l.slug) || "products"}/${e.product.slug}`,
							className:
								"text-sm font-semibold text-gray-900 hover:text-primary-700 line-clamp-2",
							children: e.product.name,
						}),
						r.jsx("div", {
							className: "text-xs text-gray-400 mt-0.5",
							children: e.product.country_of_origin,
						}),
						r.jsxs("div", {
							className: "text-xs text-gray-500 mt-1",
							children: [
								J(e.price),
								" / ",
								e.product.unit === "kg" ? "кг" : "шт",
							],
						}),
						r.jsxs("div", {
							className: "flex items-center justify-between mt-3",
							children: [
								r.jsx(bo, {
									value: e.quantity,
									onChange: (c) => s(e.product.id, c),
									min: e.product.min_order_qty || 1,
									max: e.product.stock_quantity,
									step: e.product.order_step || 1,
									size: "sm",
								}),
								r.jsxs("div", {
									className: "flex items-center gap-3",
									children: [
										r.jsx("span", {
											className: "font-bold text-gray-900",
											children: J(e.subtotal),
										}),
										r.jsx("button", {
											onClick: () => t(e.product.id),
											className:
												"p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors",
											"aria-label": "Удалить",
											children: r.jsx(ka, { className: "w-4 h-4" }),
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		});
	},
	Nx = () => {
		const {
				items: e,
				total: t,
				removeItem: s,
				updateQuantity: a,
				clearCart: n,
			} = Ls(),
			{ isAuthenticated: i, isApproved: o, user: l } = Ee(),
			c = qt();
		if (e.length === 0)
			return r.jsx("div", {
				className: "max-w-4xl mx-auto px-4 py-16",
				children: r.jsx(wr, {
					icon: r.jsx(Os, { className: "w-8 h-8" }),
					title: "Корзина пуста",
					description: "Добавьте товары из каталога для оформления заказа",
					action: { label: "Перейти в каталог", onClick: () => c("/catalog") },
				}),
			});
		const d = (l == null ? void 0 : l.credit_limit) || 0,
			u = (l == null ? void 0 : l.debt) || 0,
			m = d - u,
			v = i && d > 0 && t > m;
		return r.jsxs("div", {
			className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
			children: [
				r.jsxs("div", {
					className: "flex items-center justify-between mb-6",
					children: [
						r.jsxs("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: [
								"Корзина ",
								r.jsxs("span", {
									className: "text-gray-400 font-normal text-base ml-2",
									children: [e.length, " товаров"],
								}),
							],
						}),
						r.jsx("button", {
							onClick: n,
							className:
								"text-sm text-red-500 hover:text-red-700 hover:underline",
							children: "Очистить корзину",
						}),
					],
				}),
				r.jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [
						r.jsx("div", {
							className: "lg:col-span-2 space-y-3",
							children: e.map((p) =>
								r.jsx(
									wx,
									{ item: p, onRemove: s, onUpdateQty: a },
									p.product.id,
								),
							),
						}),
						r.jsx("div", {
							className: "lg:col-span-1",
							children: r.jsxs("div", {
								className:
									"bg-white rounded-xl border border-gray-200 p-5 sticky top-20",
								children: [
									r.jsx("h2", {
										className: "text-base font-semibold text-gray-900 mb-4",
										children: "Итого по заказу",
									}),
									r.jsx("div", {
										className: "space-y-2 mb-4",
										children: e.map((p) =>
											r.jsxs(
												"div",
												{
													className:
														"flex items-center justify-between text-sm",
													children: [
														r.jsxs("span", {
															className:
																"text-gray-600 truncate mr-2 max-w-[180px]",
															children: [
																p.product.name,
																" × ",
																Lt(p.quantity, p.product.unit),
															],
														}),
														r.jsx("span", {
															className:
																"text-gray-900 font-medium flex-shrink-0",
															children: J(p.subtotal),
														}),
													],
												},
												p.product.id,
											),
										),
									}),
									r.jsxs("div", {
										className: "border-t border-gray-100 pt-3 mb-4",
										children: [
											r.jsxs("div", {
												className: "flex items-center justify-between",
												children: [
													r.jsx("span", {
														className: "font-semibold text-gray-900",
														children: "Итого",
													}),
													r.jsx("span", {
														className: "text-xl font-bold text-gray-900",
														children: J(t),
													}),
												],
											}),
											r.jsx("div", {
												className: "text-xs text-gray-400 mt-1",
												children: "Доставка — бесплатно",
											}),
										],
									}),
									i &&
										o &&
										d > 0 &&
										r.jsxs("div", {
											className: U(
												"rounded-lg p-3 mb-4 text-sm",
												v ? "bg-red-50 border border-red-200" : "bg-gray-50",
											),
											children: [
												r.jsxs("div", {
													className: "flex items-center gap-2 mb-1",
													children: [
														v &&
															r.jsx(mr, { className: "w-4 h-4 text-red-500" }),
														r.jsx("span", {
															className: "font-medium text-gray-700",
															children: "Кредитный лимит",
														}),
													],
												}),
												r.jsxs("div", {
													className: "text-gray-600",
													children: ["Лимит: ", J(d)],
												}),
												r.jsxs("div", {
													className: "text-gray-600",
													children: ["Задолженность: ", J(u)],
												}),
												r.jsxs("div", {
													className: U(
														"font-semibold",
														v ? "text-red-600" : "text-gray-900",
													),
													children: ["Доступно: ", J(m)],
												}),
												v &&
													r.jsx("p", {
														className: "text-red-600 text-xs mt-1",
														children: "Сумма заказа превышает доступный лимит",
													}),
											],
										}),
									i
										? o
											? r.jsx(Ve, {
													variant: "primary",
													fullWidth: !0,
													size: "lg",
													onClick: () => c("/checkout"),
													disabled: v,
													children: "Оформить заказ",
												})
											: r.jsx("div", {
													className:
														"bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800",
													children:
														"Ваш аккаунт находится на проверке. После одобрения вы сможете оформлять заказы.",
												})
										: r.jsxs("div", {
												className: "space-y-2",
												children: [
													r.jsx(H, {
														to: "/login",
														className:
															"block w-full text-center py-3 px-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors",
														children: "Войти для оформления",
													}),
													r.jsx(H, {
														to: "/register",
														className:
															"block w-full text-center py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm",
														children: "Создать аккаунт",
													}),
												],
											}),
								],
							}),
						}),
					],
				}),
			],
		});
	},
	_x = async (e) => (await _e.post("/orders", e)).data,
	Fo = async (e) => (await _e.get("/orders", { params: e })).data,
	kx = async (e) => (await _e.get(`/orders/${e}`)).data,
	Sx = async (e) => (await _e.post("/orders/retail", e)).data,
	Ex = new Date(),
	Cx = Ia(new Date(), 14),
	Ax = fs(Ex, "yyyy-MM-dd"),
	Ox = fs(Cx, "yyyy-MM-dd"),
	Tx = Bt({
		delivery_address: ue().min(10, "Укажите полный адрес доставки"),
		delivery_date: ue()
			.min(1, "Выберите дату")
			.refine(
				(e) => new Date(e) >= new Date(new Date().toDateString()),
				"Дата не может быть в прошлом",
			),
		delivery_slot: ue().min(1, "Выберите временной слот"),
		delivery_priority: ai(Xt),
		payment_method: ai(Ot),
		note: ue().optional(),
	}),
	Rx = [
		{ value: "08:00-11:00", label: "08:00 – 11:00 (утро)" },
		{ value: "11:00-14:00", label: "11:00 – 14:00 (полдень)" },
		{ value: "14:00-17:00", label: "14:00 – 17:00 (вечер)" },
	],
	Px = [
		{ value: Xt.NORMAL, label: "🟡 Обычная доставка" },
		{ value: Xt.FLEXIBLE, label: "🟢 Гибкая — любое время" },
		{ value: Xt.URGENT, label: "🔴 Срочно (госконтракт)" },
	],
	Dx = [
		{ value: Ot.BANK_TRANSFER, label: "Безналичный расчёт (счёт)" },
		{ value: Ot.CASH, label: "Наличными при получении" },
		{ value: Ot.CARD_ON_DELIVERY, label: "Картой при получении" },
		{ value: Ot.PREPAYMENT, label: "Предоплата на карту" },
	],
	Ix = () => {
		var u, m, v, p, g, j;
		const e = qt(),
			{ items: t, total: s, clearCart: a } = Ls(),
			{ user: n } = Ee(),
			{
				register: i,
				handleSubmit: o,
				formState: { errors: l, isSubmitting: c },
			} = Mt({
				resolver: Vt(Tx),
				defaultValues: {
					delivery_address:
						((u = n == null ? void 0 : n.organization) == null
							? void 0
							: u.actual_address) || "",
					delivery_priority: Xt.NORMAL,
					payment_method: Ot.BANK_TRANSFER,
				},
			}),
			d = async (f) => {
				var k, b;
				try {
					const N = await _x({
						...f,
						items: t.map((_) => ({
							product_id: _.product.id,
							qty: _.quantity,
						})),
					});
					(a(),
						pe.success(`Заказ ${N.order_number} оформлен!`),
						e(`/account/orders/${N.id}`));
				} catch (N) {
					const _ = N;
					pe.error(
						((b =
							(k = _ == null ? void 0 : _.response) == null
								? void 0
								: k.data) == null
							? void 0
							: b.detail) || "Ошибка при оформлении заказа",
					);
				}
			};
		return t.length === 0
			? (e("/cart"), null)
			: r.jsxs("div", {
					className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
					children: [
						r.jsx("h1", {
							className: "text-2xl font-bold text-gray-900 mb-6",
							children: "Оформление заказа",
						}),
						r.jsx("form", {
							onSubmit: o(d),
							children: r.jsxs("div", {
								className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
								children: [
									r.jsxs("div", {
										className: "lg:col-span-2 space-y-5",
										children: [
											r.jsxs("div", {
												className:
													"bg-white rounded-xl border border-gray-200 p-5",
												children: [
													r.jsxs("div", {
														className: "flex items-center gap-2 mb-4",
														children: [
															r.jsx(us, {
																className: "w-5 h-5 text-primary-600",
															}),
															r.jsx("h2", {
																className: "font-semibold text-gray-900",
																children: "Доставка",
															}),
														],
													}),
													r.jsxs("div", {
														className: "space-y-4",
														children: [
															r.jsx(fe, {
																label: "Адрес доставки",
																placeholder: "г. Тобольск, ул. Ленина, д. 1",
																leftIcon: r.jsx(Be, { className: "w-4 h-4" }),
																error:
																	(m = l.delivery_address) == null
																		? void 0
																		: m.message,
																required: !0,
																...i("delivery_address"),
															}),
															r.jsxs("div", {
																className: "grid grid-cols-2 gap-4",
																children: [
																	r.jsx(fe, {
																		label: "Дата доставки",
																		type: "date",
																		min: Ax,
																		max: Ox,
																		error:
																			(v = l.delivery_date) == null
																				? void 0
																				: v.message,
																		required: !0,
																		...i("delivery_date"),
																	}),
																	r.jsx(et, {
																		label: "Время доставки",
																		options: Rx,
																		placeholder: "Выберите слот",
																		error:
																			(p = l.delivery_slot) == null
																				? void 0
																				: p.message,
																		required: !0,
																		...i("delivery_slot"),
																	}),
																],
															}),
															r.jsx(et, {
																label: "Приоритет доставки",
																options: Px,
																error:
																	(g = l.delivery_priority) == null
																		? void 0
																		: g.message,
																...i("delivery_priority"),
															}),
														],
													}),
												],
											}),
											r.jsxs("div", {
												className:
													"bg-white rounded-xl border border-gray-200 p-5",
												children: [
													r.jsxs("div", {
														className: "flex items-center gap-2 mb-4",
														children: [
															r.jsx(Jr, {
																className: "w-5 h-5 text-primary-600",
															}),
															r.jsx("h2", {
																className: "font-semibold text-gray-900",
																children: "Оплата",
															}),
														],
													}),
													r.jsx(et, {
														label: "Способ оплаты",
														options: Dx,
														error:
															(j = l.payment_method) == null
																? void 0
																: j.message,
														required: !0,
														...i("payment_method"),
													}),
												],
											}),
											r.jsxs("div", {
												className:
													"bg-white rounded-xl border border-gray-200 p-5",
												children: [
													r.jsxs("div", {
														className: "flex items-center gap-2 mb-4",
														children: [
															r.jsx(ds, {
																className: "w-5 h-5 text-primary-600",
															}),
															r.jsx("h2", {
																className: "font-semibold text-gray-900",
																children: "Дополнительно",
															}),
														],
													}),
													r.jsxs("div", {
														children: [
															r.jsx("label", {
																className:
																	"block text-sm font-medium text-gray-700 mb-1",
																children: "Примечание к заказу",
															}),
															r.jsx("textarea", {
																...i("note"),
																rows: 3,
																placeholder:
																	"Особые пожелания, инструкции для курьера...",
																className:
																	"w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400",
															}),
														],
													}),
												],
											}),
										],
									}),
									r.jsx("div", {
										className: "lg:col-span-1",
										children: r.jsxs("div", {
											className:
												"bg-white rounded-xl border border-gray-200 p-5 sticky top-20",
											children: [
												r.jsx("h2", {
													className: "font-semibold text-gray-900 mb-4",
													children: "Ваш заказ",
												}),
												r.jsx("div", {
													className: "space-y-3 mb-4",
													children: t.map((f) =>
														r.jsxs(
															"div",
															{
																className: "flex justify-between text-sm",
																children: [
																	r.jsxs("div", {
																		className: "text-gray-600 min-w-0 mr-2",
																		children: [
																			r.jsx("div", {
																				className:
																					"font-medium text-gray-900 truncate",
																				children: f.product.name,
																			}),
																			r.jsxs("div", {
																				className: "text-gray-400",
																				children: [
																					Lt(f.quantity, f.product.unit),
																					" × ",
																					J(f.price),
																				],
																			}),
																		],
																	}),
																	r.jsx("span", {
																		className:
																			"font-semibold text-gray-900 flex-shrink-0",
																		children: J(f.subtotal),
																	}),
																],
															},
															f.product.id,
														),
													),
												}),
												r.jsxs("div", {
													className: "border-t border-gray-100 pt-3 mb-5",
													children: [
														r.jsxs("div", {
															className: "flex justify-between items-center",
															children: [
																r.jsx("span", {
																	className: "font-semibold text-gray-900",
																	children: "Итого",
																}),
																r.jsx("span", {
																	className: "text-xl font-bold text-gray-900",
																	children: J(s),
																}),
															],
														}),
														r.jsx("div", {
															className: "text-xs text-gray-400 mt-1",
															children: "+ бесплатная доставка",
														}),
													],
												}),
												r.jsx(Ve, {
													type: "submit",
													variant: "primary",
													fullWidth: !0,
													size: "lg",
													loading: c,
													children: "Подтвердить заказ",
												}),
												r.jsx("p", {
													className: "text-xs text-gray-400 text-center mt-3",
													children:
														"Нажимая «Подтвердить», вы соглашаетесь с условиями заказа",
												}),
											],
										}),
									}),
								],
							}),
						}),
					],
				});
	},
	Ct = 1e3,
	Fx = [
		{ value: "08:00-11:00", label: "08:00 – 11:00 (утро)" },
		{ value: "11:00-14:00", label: "11:00 – 14:00 (полдень)" },
		{ value: "14:00-17:00", label: "14:00 – 17:00 (вечер)" },
	],
	Bs = {
		card: "2200 7007 5544 1234",
		recipient: "Наимов Х.В.",
		bank: "Т-Банк",
		sbp_phone: "+7 (XXX) XXX-XX-XX",
	},
	Lx = Ia(new Date(), 1),
	Mx = Ia(new Date(), 7),
	Vx = fs(Lx, "yyyy-MM-dd"),
	$x = fs(Mx, "yyyy-MM-dd"),
	zx = Bt({
		name: ue().min(2, "Минимум 2 символа"),
		phone: ue()
			.min(10, "Введите корректный номер телефона")
			.regex(/^[\d\s\+\-\(\)]+$/, "Некорректный формат телефона"),
		delivery_address: ue().min(5, "Укажите адрес (минимум 5 символов)"),
		delivery_date: ue().min(1, "Выберите дату"),
		delivery_slot: ue().min(1, "Выберите время"),
		note: ue().optional(),
	}),
	Ux = ({ product: e, cartQty: t, onAdd: s, onRemove: a, onSetQty: n }) => {
		const i = e.stock_quantity > 0 && e.is_active;
		return r.jsxs("div", {
			className: `bg-white rounded-xl border p-4 transition-shadow ${t > 0 ? "border-green-300 shadow-sm" : "border-gray-200"} ${i ? "" : "opacity-50"}`,
			children: [
				r.jsxs("div", {
					className: "flex items-start justify-between gap-2 mb-2",
					children: [
						r.jsxs("div", {
							className: "min-w-0",
							children: [
								r.jsx("h3", {
									className:
										"font-medium text-gray-900 text-sm leading-snug truncate",
									children: e.name,
								}),
								r.jsx("p", {
									className: "text-xs text-gray-400 mt-0.5",
									children: e.country_of_origin || "Узбекистан",
								}),
							],
						}),
						r.jsxs("div", {
							className: "text-right flex-shrink-0",
							children: [
								r.jsx("div", {
									className: "font-bold text-green-700 text-sm",
									children: J(e.price_retail),
								}),
								r.jsxs("div", {
									className: "text-xs text-gray-400",
									children: ["за ", e.unit],
								}),
							],
						}),
					],
				}),
				i
					? r.jsx("div", {
							className: "flex items-center gap-2 mt-3",
							children:
								t > 0
									? r.jsxs(r.Fragment, {
											children: [
												r.jsx("button", {
													type: "button",
													onClick: a,
													className:
														"w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors",
													children:
														t <= e.order_step
															? r.jsx(ka, {
																	className: "w-3.5 h-3.5 text-red-400",
																})
															: r.jsx(Ea, { className: "w-3.5 h-3.5" }),
												}),
												r.jsx("input", {
													type: "number",
													value: t,
													onChange: (o) => {
														const l = parseFloat(o.target.value);
														!isNaN(l) && l > 0
															? n(l)
															: (o.target.value === "" || l === 0) && n(0);
													},
													min: 0,
													step: e.order_step,
													className:
														"w-16 text-center text-sm font-semibold border border-gray-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-green-300",
												}),
												r.jsx("button", {
													type: "button",
													onClick: s,
													className:
														"w-8 h-8 flex items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors",
													children: r.jsx(Js, { className: "w-3.5 h-3.5" }),
												}),
												r.jsx("span", {
													className:
														"text-xs font-medium text-green-700 ml-auto",
													children: J(t * e.price_retail),
												}),
											],
										})
									: r.jsxs("button", {
											type: "button",
											onClick: s,
											className:
												"w-full flex items-center justify-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg py-2 transition-colors",
											children: [
												r.jsx(Js, { className: "w-4 h-4" }),
												"Добавить",
											],
										}),
						})
					: r.jsx("div", {
							className: "text-xs text-red-400 mt-3 text-center py-2",
							children: "Нет в наличии",
						}),
			],
		});
	},
	qx = () => {
		var G, Q, ce, K, ve;
		const [e, t] = O.useState([]),
			[s, a] = O.useState("all"),
			[n, i] = O.useState(""),
			[o, l] = O.useState("catalog"),
			[c, d] = O.useState(null),
			[u, m] = O.useState(!1),
			{ data: v } = st({
				queryKey: ["retailProducts"],
				queryFn: () => io({ per_page: 200 }),
			}),
			{ data: p } = st({ queryKey: ["retailCategories"], queryFn: () => Da() }),
			g = (v == null ? void 0 : v.items) || [],
			j = O.useMemo(() => {
				let T = g.filter((Y) => Y.is_active);
				if (
					(s !== "all" && (T = T.filter((Y) => Y.category_id === s)), n.trim())
				) {
					const Y = n.toLowerCase();
					T = T.filter((ge) => ge.name.toLowerCase().includes(Y));
				}
				return T;
			}, [g, s, n]),
			f = O.useMemo(
				() => e.reduce((T, Y) => T + Y.qty * Y.product.price_retail, 0),
				[e],
			),
			k = e.length,
			{
				register: b,
				handleSubmit: N,
				formState: { errors: _ },
			} = Mt({
				resolver: Vt(zx),
				defaultValues: { delivery_slot: "08:00-11:00" },
			}),
			{ mutate: S, isPending: $ } = li({
				mutationFn: (T) =>
					Sx({
						name: T.name,
						phone: T.phone,
						items: e.map((Y) => ({ product_id: Y.product.id, qty: Y.qty })),
						delivery_date: T.delivery_date,
						delivery_slot: T.delivery_slot,
						delivery_address: T.delivery_address,
						note: T.note || void 0,
					}),
				onSuccess: (T) => {
					(d({ order_number: T.order_number, total: T.total }),
						l("payment"),
						pe.success("Заказ оформлен! Переведите оплату."));
				},
				onError: (T) => {
					var ge, se;
					const Y = T;
					pe.error(
						((se =
							(ge = Y == null ? void 0 : Y.response) == null
								? void 0
								: ge.data) == null
							? void 0
							: se.detail) || "Ошибка при оформлении заказа",
					);
				},
			}),
			B = (T) => {
				t((Y) =>
					Y.find((se) => se.product.id === T.id)
						? Y.map((se) =>
								se.product.id === T.id
									? {
											...se,
											qty: Math.round((se.qty + T.order_step) * 100) / 100,
										}
									: se,
							)
						: [...Y, { product: T, qty: T.order_step || 1 }],
				);
			},
			xe = (T) => {
				t((Y) => {
					const ge = Y.find((Le) => Le.product.id === T);
					if (!ge) return Y;
					const se = ge.product.order_step || 1,
						ze = Math.round((ge.qty - se) * 100) / 100;
					return ze <= 0
						? Y.filter((Le) => Le.product.id !== T)
						: Y.map((Le) => (Le.product.id === T ? { ...Le, qty: ze } : Le));
				});
			},
			me = (T, Y) => {
				Y <= 0
					? t((ge) => ge.filter((se) => se.product.id !== T))
					: t((ge) =>
							ge.map((se) =>
								se.product.id === T
									? { ...se, qty: Math.round(Y * 100) / 100 }
									: se,
							),
						);
			},
			L = (T) => {
				var Y;
				return (
					((Y = e.find((ge) => ge.product.id === T)) == null
						? void 0
						: Y.qty) || 0
				);
			},
			we = (T) => {
				if (f < Ct) {
					pe.error(`Минимальная сумма заказа: ${J(Ct)}`);
					return;
				}
				S(T);
			},
			V = async () => {
				try {
					(await navigator.clipboard.writeText(Bs.card.replace(/\s/g, "")),
						m(!0),
						pe.success("Номер карты скопирован"),
						setTimeout(() => m(!1), 2e3));
				} catch {
					pe.error("Не удалось скопировать");
				}
			};
		return o === "catalog"
			? r.jsxs("div", {
					className: "min-h-screen bg-gray-50",
					children: [
						r.jsx("header", {
							className: "bg-white border-b border-gray-200 sticky top-0 z-30",
							children: r.jsx("div", {
								className: "max-w-5xl mx-auto px-4 py-3",
								children: r.jsxs("div", {
									className: "flex items-center justify-between",
									children: [
										r.jsxs("div", {
											children: [
												r.jsx("h1", {
													className: "text-lg font-bold text-gray-900",
													children: "Агрорезерв",
												}),
												r.jsx("p", {
													className: "text-xs text-gray-500",
													children: "Быстрый заказ с доставкой",
												}),
											],
										}),
										r.jsx("a", {
											href: "tel:+7XXXXXXXXXX",
											className:
												"text-sm text-green-700 font-medium hover:underline",
											children: "Позвонить",
										}),
									],
								}),
							}),
						}),
						r.jsxs("div", {
							className: "max-w-5xl mx-auto px-4 py-4 pb-32",
							children: [
								r.jsx("div", {
									className: "mb-4",
									children: r.jsx("input", {
										type: "text",
										placeholder: "Поиск товара...",
										value: n,
										onChange: (T) => i(T.target.value),
										className:
											"w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400",
									}),
								}),
								r.jsxs("div", {
									className:
										"flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide",
									children: [
										r.jsx("button", {
											type: "button",
											onClick: () => a("all"),
											className: `flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${s === "all" ? "bg-green-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`,
											children: "Все",
										}),
										p == null
											? void 0
											: p.map((T) =>
													r.jsx(
														"button",
														{
															type: "button",
															onClick: () => a(T.id),
															className: `flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${s === T.id ? "bg-green-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`,
															children: T.name,
														},
														T.id,
													),
												),
									],
								}),
								r.jsx("div", {
									className:
										"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
									children: j.map((T) =>
										r.jsx(
											Ux,
											{
												product: T,
												cartQty: L(T.id),
												onAdd: () => B(T),
												onRemove: () => xe(T.id),
												onSetQty: (Y) => me(T.id, Y),
											},
											T.id,
										),
									),
								}),
								j.length === 0 &&
									r.jsx("div", {
										className: "text-center py-12 text-gray-400 text-sm",
										children: "Товары не найдены",
									}),
							],
						}),
						k > 0 &&
							r.jsx("div", {
								className:
									"fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40",
								children: r.jsxs("div", {
									className: "max-w-5xl mx-auto px-4 py-3",
									children: [
										r.jsxs("button", {
											type: "button",
											onClick: () => {
												if (f < Ct) {
													pe.error(
														`Минимальная сумма заказа: ${J(Ct)}. Сейчас: ${J(f)}`,
													);
													return;
												}
												l("form");
											},
											className:
												"w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors",
											children: [
												r.jsx(Os, { className: "w-5 h-5" }),
												r.jsxs("span", {
													children: [
														"Оформить · ",
														k,
														" ",
														k === 1 ? "товар" : "товаров",
													],
												}),
												r.jsx("span", {
													className:
														"bg-white/20 px-2.5 py-0.5 rounded-lg text-sm",
													children: J(f),
												}),
											],
										}),
										f < Ct &&
											r.jsxs("p", {
												className: "text-xs text-center text-orange-600 mt-1.5",
												children: [
													"Минимальный заказ ",
													J(Ct),
													" (ещё",
													" ",
													J(Ct - f),
													")",
												],
											}),
									],
								}),
							}),
					],
				})
			: o === "form"
				? r.jsxs("div", {
						className: "min-h-screen bg-gray-50",
						children: [
							r.jsx("header", {
								className:
									"bg-white border-b border-gray-200 sticky top-0 z-30",
								children: r.jsxs("div", {
									className:
										"max-w-lg mx-auto px-4 py-3 flex items-center gap-3",
									children: [
										r.jsx("button", {
											type: "button",
											onClick: () => l("catalog"),
											className: "text-gray-500 hover:text-gray-700 text-sm",
											children: "← Назад",
										}),
										r.jsx("h1", {
											className: "text-lg font-bold text-gray-900",
											children: "Оформление",
										}),
									],
								}),
							}),
							r.jsx("div", {
								className: "max-w-lg mx-auto px-4 py-5",
								children: r.jsxs("form", {
									onSubmit: N(we),
									className: "space-y-5",
									children: [
										r.jsxs("div", {
											className:
												"bg-white rounded-xl border border-gray-200 p-5",
											children: [
												r.jsxs("div", {
													className: "flex items-center gap-2 mb-4",
													children: [
														r.jsx(ot, { className: "w-5 h-5 text-green-600" }),
														r.jsx("h2", {
															className: "font-semibold text-gray-900",
															children: "Контактные данные",
														}),
													],
												}),
												r.jsxs("div", {
													className: "space-y-3",
													children: [
														r.jsx(fe, {
															label: "Имя",
															placeholder: "Как к вам обращаться",
															error: (G = _.name) == null ? void 0 : G.message,
															required: !0,
															...b("name"),
														}),
														r.jsx(fe, {
															label: "Телефон",
															placeholder: "+7 (XXX) XXX-XX-XX",
															type: "tel",
															leftIcon: r.jsx(yt, { className: "w-4 h-4" }),
															error: (Q = _.phone) == null ? void 0 : Q.message,
															required: !0,
															...b("phone"),
														}),
													],
												}),
											],
										}),
										r.jsxs("div", {
											className:
												"bg-white rounded-xl border border-gray-200 p-5",
											children: [
												r.jsxs("div", {
													className: "flex items-center gap-2 mb-4",
													children: [
														r.jsx(Be, { className: "w-5 h-5 text-green-600" }),
														r.jsx("h2", {
															className: "font-semibold text-gray-900",
															children: "Доставка",
														}),
													],
												}),
												r.jsxs("div", {
													className: "space-y-3",
													children: [
														r.jsx(fe, {
															label: "Адрес доставки",
															placeholder:
																"г. Тобольск, ул. Ленина, д. 1, кв. 5",
															leftIcon: r.jsx(Be, { className: "w-4 h-4" }),
															error:
																(ce = _.delivery_address) == null
																	? void 0
																	: ce.message,
															required: !0,
															...b("delivery_address"),
														}),
														r.jsxs("div", {
															className: "grid grid-cols-2 gap-3",
															children: [
																r.jsx(fe, {
																	label: "Дата доставки",
																	type: "date",
																	min: Vx,
																	max: $x,
																	error:
																		(K = _.delivery_date) == null
																			? void 0
																			: K.message,
																	required: !0,
																	...b("delivery_date"),
																}),
																r.jsx(et, {
																	label: "Время",
																	options: Fx,
																	placeholder: "Слот",
																	error:
																		(ve = _.delivery_slot) == null
																			? void 0
																			: ve.message,
																	required: !0,
																	...b("delivery_slot"),
																}),
															],
														}),
													],
												}),
											],
										}),
										r.jsxs("div", {
											className:
												"bg-white rounded-xl border border-gray-200 p-5",
											children: [
												r.jsxs("div", {
													className: "flex items-center gap-2 mb-4",
													children: [
														r.jsx(Nl, { className: "w-5 h-5 text-green-600" }),
														r.jsx("h2", {
															className: "font-semibold text-gray-900",
															children: "Комментарий",
														}),
													],
												}),
												r.jsx("textarea", {
													...b("note"),
													rows: 2,
													placeholder: "Домофон, подъезд, пожелания...",
													className:
														"w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400",
												}),
											],
										}),
										r.jsxs("div", {
											className:
												"bg-white rounded-xl border border-gray-200 p-5",
											children: [
												r.jsx("h2", {
													className: "font-semibold text-gray-900 mb-3",
													children: "Ваш заказ",
												}),
												r.jsx("div", {
													className: "space-y-2 mb-3",
													children: e.map((T) =>
														r.jsxs(
															"div",
															{
																className:
																	"flex items-center justify-between text-sm",
																children: [
																	r.jsxs("div", {
																		className: "text-gray-700 truncate mr-2",
																		children: [
																			T.product.name,
																			r.jsxs("span", {
																				className: "text-gray-400 ml-1",
																				children: [
																					Lt(T.qty, T.product.unit),
																					" ×",
																					" ",
																					J(T.product.price_retail),
																				],
																			}),
																		],
																	}),
																	r.jsx("span", {
																		className:
																			"font-semibold text-gray-900 flex-shrink-0",
																		children: J(T.qty * T.product.price_retail),
																	}),
																],
															},
															T.product.id,
														),
													),
												}),
												r.jsxs("div", {
													className:
														"border-t border-gray-100 pt-3 flex justify-between items-center",
													children: [
														r.jsx("span", {
															className: "font-semibold text-gray-900",
															children: "Итого",
														}),
														r.jsx("span", {
															className: "text-xl font-bold text-gray-900",
															children: J(f),
														}),
													],
												}),
												r.jsx("p", {
													className: "text-xs text-gray-400 mt-1",
													children: "Бесплатная доставка по Тобольску",
												}),
											],
										}),
										r.jsxs("div", {
											className:
												"bg-green-50 rounded-xl border border-green-200 p-5",
											children: [
												r.jsxs("div", {
													className: "flex items-center gap-2 mb-2",
													children: [
														r.jsx(Jr, { className: "w-5 h-5 text-green-600" }),
														r.jsx("h2", {
															className: "font-semibold text-green-800",
															children: "Оплата",
														}),
													],
												}),
												r.jsx("p", {
													className: "text-sm text-green-700",
													children:
														"Предоплата переводом на карту. Реквизиты будут показаны после оформления.",
												}),
											],
										}),
										r.jsx(Ve, {
											type: "submit",
											variant: "primary",
											fullWidth: !0,
											size: "lg",
											loading: $,
											children: "Оформить заказ",
										}),
									],
								}),
							}),
						],
					})
				: o === "payment" && c
					? r.jsx("div", {
							className:
								"min-h-screen bg-gray-50 flex items-center justify-center px-4",
							children: r.jsxs("div", {
								className: "max-w-md w-full space-y-5",
								children: [
									r.jsxs("div", {
										className:
											"bg-white rounded-xl border border-gray-200 p-6 text-center",
										children: [
											r.jsx(ts, {
												className: "w-14 h-14 text-green-500 mx-auto mb-3",
											}),
											r.jsx("h1", {
												className: "text-xl font-bold text-gray-900 mb-1",
												children: "Заказ оформлен",
											}),
											r.jsx("p", {
												className: "text-2xl font-bold text-green-700",
												children: c.order_number,
											}),
											r.jsxs("p", {
												className: "text-sm text-gray-500 mt-2",
												children: [
													"Сумма к оплате: ",
													r.jsx("span", {
														className: "font-bold text-gray-900",
														children: J(c.total),
													}),
												],
											}),
										],
									}),
									r.jsxs("div", {
										className:
											"bg-white rounded-xl border border-green-200 p-6",
										children: [
											r.jsxs("div", {
												className: "flex items-center gap-2 mb-4",
												children: [
													r.jsx(Jr, { className: "w-5 h-5 text-green-600" }),
													r.jsx("h2", {
														className: "font-semibold text-gray-900",
														children: "Переведите на карту",
													}),
												],
											}),
											r.jsxs("div", {
												className: "space-y-4",
												children: [
													r.jsxs("div", {
														children: [
															r.jsxs("label", {
																className:
																	"text-xs font-medium text-gray-500 uppercase",
																children: ["Номер карты (", Bs.bank, ")"],
															}),
															r.jsxs("div", {
																className: "flex items-center gap-2 mt-1",
																children: [
																	r.jsx("div", {
																		className:
																			"flex-1 bg-gray-50 rounded-lg px-4 py-3 font-mono text-lg font-bold text-gray-900 tracking-wider",
																		children: Bs.card,
																	}),
																	r.jsx("button", {
																		type: "button",
																		onClick: V,
																		className:
																			"p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors",
																		title: "Скопировать",
																		children: u
																			? r.jsx(ts, { className: "w-5 h-5" })
																			: r.jsx(_l, { className: "w-5 h-5" }),
																	}),
																],
															}),
														],
													}),
													r.jsxs("div", {
														children: [
															r.jsx("label", {
																className:
																	"text-xs font-medium text-gray-500 uppercase",
																children: "Получатель",
															}),
															r.jsx("p", {
																className: "mt-1 text-gray-900 font-medium",
																children: Bs.recipient,
															}),
														],
													}),
													r.jsxs("div", {
														children: [
															r.jsx("label", {
																className:
																	"text-xs font-medium text-gray-500 uppercase",
																children: "Сумма перевода",
															}),
															r.jsx("p", {
																className:
																	"mt-1 text-2xl font-bold text-green-700",
																children: J(c.total),
															}),
														],
													}),
													r.jsx("div", {
														className: "bg-yellow-50 rounded-lg p-3",
														children: r.jsxs("p", {
															className: "text-sm text-yellow-800",
															children: [
																"В комментарии к переводу укажите:",
																" ",
																r.jsx("span", {
																	className: "font-bold",
																	children: c.order_number,
																}),
															],
														}),
													}),
												],
											}),
										],
									}),
									r.jsxs("div", {
										className: "bg-white rounded-xl border border-gray-200 p-5",
										children: [
											r.jsx("h3", {
												className: "font-semibold text-gray-900 mb-3",
												children: "Что дальше?",
											}),
											r.jsxs("ol", {
												className: "space-y-2 text-sm text-gray-600",
												children: [
													r.jsxs("li", {
														className: "flex gap-2",
														children: [
															r.jsx("span", {
																className:
																	"flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold",
																children: "1",
															}),
															"Переведите указанную сумму на карту",
														],
													}),
													r.jsxs("li", {
														className: "flex gap-2",
														children: [
															r.jsx("span", {
																className:
																	"flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold",
																children: "2",
															}),
															"Мы подтвердим получение оплаты",
														],
													}),
													r.jsxs("li", {
														className: "flex gap-2",
														children: [
															r.jsx("span", {
																className:
																	"flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold",
																children: "3",
															}),
															"Доставим заказ в выбранное время",
														],
													}),
												],
											}),
										],
									}),
									r.jsx("div", {
										className: "text-center",
										children: r.jsx("a", {
											href: "/",
											className:
												"text-sm text-green-700 hover:underline font-medium",
											children: "Вернуться на главную",
										}),
									}),
								],
							}),
						})
					: null;
	},
	Bx = {
		[ye.NEW]: { label: "Новый", variant: "blue" },
		[ye.CONFIRMED]: { label: "Подтверждён", variant: "purple" },
		[ye.ASSEMBLING]: { label: "Собирается", variant: "yellow" },
		[ye.ASSEMBLED]: { label: "Собран", variant: "green" },
		[ye.DELIVERING]: { label: "В пути", variant: "cyan" },
		[ye.DELIVERED]: { label: "Доставлен", variant: "green" },
		[ye.CANCELLED]: { label: "Отменён", variant: "red" },
	},
	dr = ({ status: e, size: t = "md" }) => {
		const s = Bx[e] || { label: e, variant: "gray" };
		return r.jsx(Dt, {
			variant: s.variant,
			size: t,
			dot: !0,
			children: s.label,
		});
	},
	Wx = () => {
		var i;
		const { user: e, isApproved: t } = Ee(),
			{ data: s, isLoading: a } = st({
				queryKey: ["myOrders", { per_page: 5 }],
				queryFn: () => Fo({ per_page: 5, page: 1 }),
			}),
			n = (s == null ? void 0 : s.items) || [];
		return r.jsxs("div", {
			className: "space-y-5",
			children: [
				r.jsxs("div", {
					children: [
						r.jsxs("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: [
								"Добро пожаловать, ",
								((i = e == null ? void 0 : e.full_name) == null
									? void 0
									: i.split(" ")[0]) || "клиент",
								"!",
							],
						}),
						r.jsx("p", {
							className: "text-gray-500 text-sm mt-1",
							children: "Личный кабинет Агрорезерв",
						}),
					],
				}),
				(e == null ? void 0 : e.status) === nt.PENDING &&
					r.jsxs("div", {
						className:
							"flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl",
						children: [
							r.jsx(mr, {
								className: "w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5",
							}),
							r.jsxs("div", {
								children: [
									r.jsx("div", {
										className: "text-sm font-semibold text-yellow-800",
										children: "Аккаунт на проверке",
									}),
									r.jsx("p", {
										className: "text-sm text-yellow-700 mt-0.5",
										children:
											"Ваш аккаунт проходит модерацию. После одобрения вы получите доступ к оптовым ценам и сможете оформлять заказы. Обычно это занимает 1–2 рабочих дня.",
									}),
								],
							}),
						],
					}),
				r.jsxs("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
					children: [
						r.jsxs(H, {
							to: "/account/orders",
							className:
								"bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all group",
							children: [
								r.jsxs("div", {
									className: "flex items-center justify-between",
									children: [
										r.jsx("div", {
											className:
												"w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center",
											children: r.jsx(ur, {
												className: "w-5 h-5 text-blue-600",
											}),
										}),
										r.jsx(Ae, {
											className:
												"w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors",
										}),
									],
								}),
								r.jsxs("div", {
									className: "mt-3",
									children: [
										r.jsx("div", {
											className: "text-2xl font-bold text-gray-900",
											children: (s == null ? void 0 : s.total) || 0,
										}),
										r.jsx("div", {
											className: "text-sm text-gray-500",
											children: "Мои заказы",
										}),
									],
								}),
							],
						}),
						r.jsxs(H, {
							to: "/account/documents",
							className:
								"bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all group",
							children: [
								r.jsxs("div", {
									className: "flex items-center justify-between",
									children: [
										r.jsx("div", {
											className:
												"w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center",
											children: r.jsx(bt, {
												className: "w-5 h-5 text-purple-600",
											}),
										}),
										r.jsx(Ae, {
											className:
												"w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors",
										}),
									],
								}),
								r.jsxs("div", {
									className: "mt-3",
									children: [
										r.jsx("div", {
											className: "text-2xl font-bold text-gray-900",
											children: "—",
										}),
										r.jsx("div", {
											className: "text-sm text-gray-500",
											children: "Документы",
										}),
									],
								}),
							],
						}),
						r.jsxs(H, {
							to: "/account/profile",
							className:
								"bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-sm transition-all group",
							children: [
								r.jsxs("div", {
									className: "flex items-center justify-between",
									children: [
										r.jsx("div", {
											className:
												"w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center",
											children: r.jsx(ot, {
												className: "w-5 h-5 text-green-600",
											}),
										}),
										r.jsx(Ae, {
											className:
												"w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors",
										}),
									],
								}),
								r.jsxs("div", {
									className: "mt-3",
									children: [
										r.jsx("div", {
											className: "text-sm font-semibold text-gray-900 truncate",
											children: e == null ? void 0 : e.full_name,
										}),
										r.jsx("div", {
											className: "text-sm text-gray-500",
											children: "Профиль",
										}),
									],
								}),
							],
						}),
					],
				}),
				t &&
					(e == null ? void 0 : e.credit_limit) !== void 0 &&
					e.credit_limit > 0 &&
					r.jsxs("div", {
						className: "bg-white rounded-xl border border-gray-200 p-5",
						children: [
							r.jsx("h2", {
								className: "text-base font-semibold text-gray-900 mb-3",
								children: "Финансы",
							}),
							r.jsxs("div", {
								className: "grid grid-cols-3 gap-4",
								children: [
									r.jsxs("div", {
										children: [
											r.jsx("div", {
												className: "text-sm text-gray-500",
												children: "Кредитный лимит",
											}),
											r.jsx("div", {
												className: "text-lg font-bold text-gray-900",
												children: J(e.credit_limit),
											}),
										],
									}),
									r.jsxs("div", {
										children: [
											r.jsx("div", {
												className: "text-sm text-gray-500",
												children: "Задолженность",
											}),
											r.jsx("div", {
												className: `text-lg font-bold ${e.debt > 0 ? "text-red-600" : "text-gray-900"}`,
												children: J(e.debt),
											}),
										],
									}),
									r.jsxs("div", {
										children: [
											r.jsx("div", {
												className: "text-sm text-gray-500",
												children: "Доступно",
											}),
											r.jsx("div", {
												className: "text-lg font-bold text-primary-600",
												children: J(e.credit_limit - e.debt),
											}),
										],
									}),
								],
							}),
							e.debt > 0 &&
								r.jsx("div", {
									className:
										"mt-3 text-sm text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2",
									children:
										"Погасите задолженность для увеличения доступного лимита",
								}),
						],
					}),
				r.jsxs("div", {
					className: "bg-white rounded-xl border border-gray-200",
					children: [
						r.jsxs("div", {
							className:
								"flex items-center justify-between px-5 py-4 border-b border-gray-100",
							children: [
								r.jsx("h2", {
									className: "text-base font-semibold text-gray-900",
									children: "Последние заказы",
								}),
								r.jsxs(H, {
									to: "/account/orders",
									className:
										"text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1",
									children: ["Все заказы", r.jsx(Ae, { className: "w-4 h-4" })],
								}),
							],
						}),
						a
							? r.jsx(hs, {})
							: n.length === 0
								? r.jsxs("div", {
										className: "py-10 text-center text-gray-500 text-sm",
										children: [
											"Заказов пока нет.",
											" ",
											r.jsx(H, {
												to: "/catalog",
												className: "text-primary-600 hover:underline",
												children: "Перейти в каталог",
											}),
										],
									})
								: r.jsx("div", {
										className: "divide-y divide-gray-100",
										children: n.map((o) =>
											r.jsxs(
												H,
												{
													to: `/account/orders/${o.id}`,
													className:
														"flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors",
													children: [
														r.jsxs("div", {
															children: [
																r.jsx("div", {
																	className:
																		"text-sm font-semibold text-gray-900",
																	children: o.order_number,
																}),
																r.jsx("div", {
																	className: "text-xs text-gray-400 mt-0.5",
																	children: as(o.created_at),
																}),
															],
														}),
														r.jsxs("div", {
															className: "flex items-center gap-3",
															children: [
																r.jsx(dr, { status: o.status, size: "sm" }),
																r.jsx("span", {
																	className:
																		"text-sm font-semibold text-gray-900",
																	children: J(o.total),
																}),
																r.jsx(Ae, {
																	className: "w-4 h-4 text-gray-400",
																}),
															],
														}),
													],
												},
												o.id,
											),
										),
									}),
					],
				}),
			],
		});
	},
	Hx = [
		{ value: "", label: "Все статусы" },
		{ value: ye.NEW, label: "Новые" },
		{ value: ye.CONFIRMED, label: "Подтверждённые" },
		{ value: ye.ASSEMBLING, label: "Собираются" },
		{ value: ye.DELIVERING, label: "В пути" },
		{ value: ye.DELIVERED, label: "Доставленные" },
		{ value: ye.CANCELLED, label: "Отменённые" },
	],
	Zx = () => {
		const [e, t] = O.useState(1),
			[s, a] = O.useState(""),
			{ data: n, isLoading: i } = st({
				queryKey: ["myOrders", { page: e, status: s }],
				queryFn: () => Fo({ page: e, per_page: 15, status: s || void 0 }),
			});
		return r.jsxs("div", {
			className: "space-y-4",
			children: [
				r.jsxs("div", {
					className: "flex items-center justify-between",
					children: [
						r.jsx("h1", {
							className: "text-2xl font-bold text-gray-900",
							children: "Мои заказы",
						}),
						n &&
							r.jsxs("span", {
								className: "text-sm text-gray-500",
								children: [n.total, " заказов"],
							}),
					],
				}),
				r.jsx("div", {
					className: "flex gap-3",
					children: r.jsx("div", {
						className: "w-48",
						children: r.jsx(et, {
							options: Hx,
							value: s,
							onChange: (o) => {
								(a(o.target.value), t(1));
							},
						}),
					}),
				}),
				i
					? r.jsx(hs, {})
					: (n == null ? void 0 : n.items.length) === 0
						? r.jsx(wr, {
								title: "Заказов нет",
								description: s
									? "Нет заказов с выбранным статусом"
									: "Вы ещё не сделали ни одного заказа",
								action: s
									? void 0
									: {
											label: "Перейти в каталог",
											onClick: () => (window.location.href = "/catalog"),
										},
							})
						: r.jsxs(r.Fragment, {
								children: [
									r.jsx("div", {
										className:
											"hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden",
										children: r.jsxs("table", {
											className: "w-full text-sm",
											children: [
												r.jsx("thead", {
													className: "bg-gray-50 border-b border-gray-100",
													children: r.jsxs("tr", {
														children: [
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Номер",
															}),
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Дата",
															}),
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Товаров",
															}),
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Сумма",
															}),
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Статус",
															}),
															r.jsx("th", { className: "px-5 py-3" }),
														],
													}),
												}),
												r.jsx("tbody", {
													className: "divide-y divide-gray-100",
													children:
														n == null
															? void 0
															: n.items.map((o) => {
																	var l;
																	return r.jsxs(
																		"tr",
																		{
																			className:
																				"hover:bg-gray-50/50 transition-colors",
																			children: [
																				r.jsx("td", {
																					className:
																						"px-5 py-3 font-semibold text-gray-900",
																					children: o.order_number,
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3 text-gray-500",
																					children: as(o.created_at),
																				}),
																				r.jsxs("td", {
																					className: "px-5 py-3 text-gray-600",
																					children: [
																						((l = o.items) == null
																							? void 0
																							: l.length) || 0,
																						" поз.",
																					],
																				}),
																				r.jsx("td", {
																					className:
																						"px-5 py-3 font-semibold text-gray-900",
																					children: J(o.total),
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3",
																					children: r.jsx(dr, {
																						status: o.status,
																						size: "sm",
																					}),
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3",
																					children: r.jsxs(H, {
																						to: `/account/orders/${o.id}`,
																						className:
																							"flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium",
																						children: [
																							"Детали",
																							r.jsx(Ae, {
																								className: "w-4 h-4",
																							}),
																						],
																					}),
																				}),
																			],
																		},
																		o.id,
																	);
																}),
												}),
											],
										}),
									}),
									r.jsx("div", {
										className: "md:hidden space-y-3",
										children:
											n == null
												? void 0
												: n.items.map((o) => {
														var l;
														return r.jsxs(
															H,
															{
																to: `/account/orders/${o.id}`,
																className:
																	"block bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors",
																children: [
																	r.jsxs("div", {
																		className:
																			"flex items-center justify-between mb-2",
																		children: [
																			r.jsx("span", {
																				className:
																					"font-semibold text-gray-900",
																				children: o.order_number,
																			}),
																			r.jsx(dr, {
																				status: o.status,
																				size: "sm",
																			}),
																		],
																	}),
																	r.jsx("div", {
																		className: "text-xs text-gray-400",
																		children: as(o.created_at),
																	}),
																	r.jsxs("div", {
																		className:
																			"flex items-center justify-between mt-2",
																		children: [
																			r.jsxs("span", {
																				className: "text-sm text-gray-500",
																				children: [
																					((l = o.items) == null
																						? void 0
																						: l.length) || 0,
																					" позиций",
																				],
																			}),
																			r.jsx("span", {
																				className: "font-bold text-gray-900",
																				children: J(o.total),
																			}),
																		],
																	}),
																],
															},
															o.id,
														);
													}),
									}),
									r.jsx(La, {
										page: e,
										totalPages: (n == null ? void 0 : n.pages) || 1,
										onPageChange: t,
										className: "mt-4",
									}),
								],
							}),
			],
		});
	},
	Gx = async (e) => (await _e.get("/documents", { params: e })).data,
	Lo = async (e) =>
		(await _e.get(`/documents/${e}/download`, { responseType: "blob" })).data,
	Yx = async (e) =>
		(
			await _e.get(`/orders/${e}/certificates/download`, {
				responseType: "blob",
			})
		).data,
	ba = (e, t) => {
		const s = window.URL.createObjectURL(e),
			a = document.createElement("a");
		((a.href = s),
			a.setAttribute("download", t),
			document.body.appendChild(a),
			a.click(),
			a.remove(),
			window.URL.revokeObjectURL(s));
	},
	va = [
		{ status: ye.NEW, label: "Новый", description: "Заказ принят в обработку" },
		{
			status: ye.CONFIRMED,
			label: "Подтверждён",
			description: "Заказ подтверждён менеджером",
		},
		{
			status: ye.ASSEMBLING,
			label: "Собирается",
			description: "Идёт комплектация заказа",
		},
		{
			status: ye.ASSEMBLED,
			label: "Собран",
			description: "Заказ укомплектован и готов",
		},
		{
			status: ye.DELIVERING,
			label: "В пути",
			description: "Курьер везёт ваш заказ",
		},
		{
			status: ye.DELIVERED,
			label: "Доставлен",
			description: "Заказ успешно доставлен",
		},
	],
	Xx = va.map((e) => e.status),
	Jx = ({ currentStatus: e, statusHistory: t = [], className: s }) => {
		var n;
		if (e === ye.CANCELLED)
			return r.jsxs("div", {
				className: U("flex items-center gap-3 py-4", s),
				children: [
					r.jsx("div", {
						className:
							"w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0",
						children: r.jsx(Ja, { className: "w-4 h-4 text-red-600" }),
					}),
					r.jsxs("div", {
						children: [
							r.jsx("div", {
								className: "text-sm font-semibold text-red-700",
								children: "Заказ отменён",
							}),
							r.jsx("div", {
								className: "text-xs text-gray-500 mt-0.5",
								children:
									((n = t.find((i) => i.status === ye.CANCELLED)) == null
										? void 0
										: n.note) || "",
							}),
						],
					}),
				],
			});
		const a = Xx.indexOf(e);
		return r.jsx("div", {
			className: U("space-y-0", s),
			children: va.map((i, o) => {
				const l = o < a,
					c = o === a,
					d = o > a,
					u = t.find((m) => m.status === i.status);
				return r.jsxs(
					"div",
					{
						className: "flex gap-3",
						children: [
							r.jsxs("div", {
								className: "flex flex-col items-center",
								children: [
									r.jsx("div", {
										className: U(
											"w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
											l && "bg-primary-100",
											c && "bg-primary-600 ring-4 ring-primary-100",
											d && "bg-gray-100",
										),
										children: l
											? r.jsx(ts, { className: "w-4 h-4 text-primary-600" })
											: c
												? r.jsx(ds, { className: "w-4 h-4 text-white" })
												: r.jsx(Ja, { className: "w-4 h-4 text-gray-300" }),
									}),
									o < va.length - 1 &&
										r.jsx("div", {
											className: U(
												"w-0.5 h-8 mt-1 rounded-full",
												l ? "bg-primary-300" : "bg-gray-200",
											),
										}),
								],
							}),
							r.jsxs("div", {
								className: "flex-1 pb-8",
								children: [
									r.jsxs("div", {
										className: "flex items-center justify-between",
										children: [
											r.jsx("span", {
												className: U(
													"text-sm font-semibold",
													l && "text-primary-700",
													c && "text-gray-900",
													d && "text-gray-400",
												),
												children: i.label,
											}),
											u &&
												r.jsx("span", {
													className: "text-xs text-gray-400",
													children: yo(u.changed_at),
												}),
										],
									}),
									r.jsx("p", {
										className: U(
											"text-xs mt-0.5",
											l || c ? "text-gray-500" : "text-gray-300",
										),
										children: i.description,
									}),
								],
							}),
						],
					},
					i.status,
				);
			}),
		});
	},
	Qx = () => {
		var l;
		const { id: e } = ci(),
			{ data: t, isLoading: s } = st({
				queryKey: ["order", e],
				queryFn: () => kx(e),
				enabled: !!e,
			}),
			[a, n] = O.useState(!1),
			i = async () => {
				if (t) {
					n(!0);
					try {
						const c = await Yx(t.id);
						(ba(c, `certificates_${t.order_number}.zip`),
							pe.success("Сертификаты скачаны"));
					} catch {
						pe.error("Нет доступных сертификатов");
					} finally {
						n(!1);
					}
				}
			},
			o = async (c, d) => {
				try {
					const u = await Lo(c);
					ba(u, `${d}.pdf`);
				} catch {
					pe.error("Ошибка при скачивании документа");
				}
			};
		return s
			? r.jsx(hs, {})
			: t
				? r.jsxs("div", {
						className: "space-y-5",
						children: [
							r.jsx(vo, {
								items: [
									{ label: "Мои заказы", href: "/account/orders" },
									{ label: t.order_number },
								],
							}),
							r.jsxs("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [
									r.jsxs("div", {
										children: [
											r.jsx("h1", {
												className: "text-2xl font-bold text-gray-900",
												children: t.order_number,
											}),
											r.jsxs("p", {
												className: "text-sm text-gray-500 mt-0.5",
												children: ["Оформлен ", yo(t.created_at)],
											}),
										],
									}),
									r.jsx(dr, { status: t.status }),
								],
							}),
							r.jsxs("div", {
								className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
								children: [
									r.jsxs("div", {
										className: "lg:col-span-2 space-y-4",
										children: [
											r.jsxs("div", {
												className:
													"bg-white rounded-xl border border-gray-200 overflow-hidden",
												children: [
													r.jsx("div", {
														className: "px-5 py-4 border-b border-gray-100",
														children: r.jsx("h2", {
															className: "font-semibold text-gray-900",
															children: "Состав заказа",
														}),
													}),
													r.jsxs("table", {
														className: "w-full text-sm",
														children: [
															r.jsx("thead", {
																className:
																	"bg-gray-50 border-b border-gray-100 hidden sm:table-header-group",
																children: r.jsxs("tr", {
																	children: [
																		r.jsx("th", {
																			className:
																				"px-5 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase",
																			children: "Товар",
																		}),
																		r.jsx("th", {
																			className:
																				"px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase",
																			children: "Кол-во",
																		}),
																		r.jsx("th", {
																			className:
																				"px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase",
																			children: "Цена",
																		}),
																		r.jsx("th", {
																			className:
																				"px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase",
																			children: "Сумма",
																		}),
																	],
																}),
															}),
															r.jsx("tbody", {
																className: "divide-y divide-gray-100",
																children:
																	(l = t.items) == null
																		? void 0
																		: l.map((c) =>
																				r.jsxs(
																					"tr",
																					{
																						children: [
																							r.jsxs("td", {
																								className: "px-5 py-3",
																								children: [
																									r.jsx("div", {
																										className:
																											"font-medium text-gray-900",
																										children: c.product_name,
																									}),
																									c.actual_qty &&
																										c.actual_qty !==
																											c.ordered_qty &&
																										r.jsxs("div", {
																											className:
																												"text-xs text-orange-600 mt-0.5",
																											children: [
																												"Факт: ",
																												Lt(c.actual_qty, "kg"),
																											],
																										}),
																								],
																							}),
																							r.jsx("td", {
																								className:
																									"px-5 py-3 text-right text-gray-600 hidden sm:table-cell",
																								children: Lt(
																									c.ordered_qty,
																									"kg",
																								),
																							}),
																							r.jsx("td", {
																								className:
																									"px-5 py-3 text-right text-gray-600 hidden sm:table-cell",
																								children: J(c.price),
																							}),
																							r.jsx("td", {
																								className:
																									"px-5 py-3 text-right font-semibold text-gray-900",
																								children: J(c.total),
																							}),
																						],
																					},
																					c.product_id,
																				),
																			),
															}),
															r.jsx("tfoot", {
																className:
																	"border-t-2 border-gray-200 bg-gray-50",
																children: r.jsxs("tr", {
																	children: [
																		r.jsx("td", {
																			colSpan: 3,
																			className:
																				"px-5 py-3 text-sm font-semibold text-gray-900 hidden sm:table-cell",
																			children: "Итого",
																		}),
																		r.jsx("td", {
																			className:
																				"px-5 py-3 text-right text-base font-bold text-gray-900",
																			children: J(t.total),
																		}),
																	],
																}),
															}),
														],
													}),
												],
											}),
											r.jsxs("div", {
												className:
													"bg-white rounded-xl border border-gray-200 p-5",
												children: [
													r.jsx("h2", {
														className: "font-semibold text-gray-900 mb-4",
														children: "Информация о доставке",
													}),
													r.jsxs("div", {
														className: "space-y-3",
														children: [
															r.jsxs("div", {
																className: "flex items-start gap-3",
																children: [
																	r.jsx(Be, {
																		className:
																			"w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0",
																	}),
																	r.jsxs("div", {
																		children: [
																			r.jsx("div", {
																				className: "text-xs text-gray-500",
																				children: "Адрес",
																			}),
																			r.jsx("div", {
																				className: "text-sm text-gray-900",
																				children: t.delivery_address,
																			}),
																		],
																	}),
																],
															}),
															r.jsxs("div", {
																className: "flex items-start gap-3",
																children: [
																	r.jsx(ds, {
																		className:
																			"w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0",
																	}),
																	r.jsxs("div", {
																		children: [
																			r.jsx("div", {
																				className: "text-xs text-gray-500",
																				children: "Дата и время",
																			}),
																			r.jsxs("div", {
																				className: "text-sm text-gray-900",
																				children: [
																					as(t.delivery_date),
																					" · ",
																					t.delivery_slot,
																				],
																			}),
																		],
																	}),
																],
															}),
															r.jsxs("div", {
																className: "flex items-start gap-3",
																children: [
																	r.jsx(us, {
																		className:
																			"w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0",
																	}),
																	r.jsxs("div", {
																		children: [
																			r.jsx("div", {
																				className: "text-xs text-gray-500",
																				children: "Оплата",
																			}),
																			r.jsx("div", {
																				className: "text-sm text-gray-900",
																				children: t.payment_method,
																			}),
																		],
																	}),
																],
															}),
															t.note &&
																r.jsxs("div", {
																	className:
																		"mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600",
																	children: [
																		r.jsx("span", {
																			className: "font-medium text-gray-900",
																			children: "Примечание:",
																		}),
																		" ",
																		t.note,
																	],
																}),
														],
													}),
												],
											}),
											t.documents &&
												t.documents.length > 0 &&
												r.jsxs("div", {
													className:
														"bg-white rounded-xl border border-gray-200 p-5",
													children: [
														r.jsx("h2", {
															className: "font-semibold text-gray-900 mb-4",
															children: "Документы",
														}),
														r.jsx("div", {
															className: "space-y-2",
															children: t.documents.map((c) =>
																r.jsxs(
																	"div",
																	{
																		className:
																			"flex items-center justify-between p-3 bg-gray-50 rounded-lg",
																		children: [
																			r.jsxs("div", {
																				children: [
																					r.jsx("div", {
																						className:
																							"text-sm font-medium text-gray-900",
																						children: c.doc_number,
																					}),
																					r.jsx("div", {
																						className: "text-xs text-gray-500",
																						children: c.doc_type,
																					}),
																				],
																			}),
																			r.jsx(Ve, {
																				variant: "ghost",
																				size: "sm",
																				icon: r.jsx(Ks, {
																					className: "w-4 h-4",
																				}),
																				onClick: () => o(c.id, c.doc_number),
																				children: "PDF",
																			}),
																		],
																	},
																	c.id,
																),
															),
														}),
													],
												}),
											r.jsxs("div", {
												className:
													"bg-white rounded-xl border border-gray-200 p-5",
												children: [
													r.jsxs("div", {
														className: "flex items-center justify-between",
														children: [
															r.jsxs("div", {
																className: "flex items-center gap-2",
																children: [
																	r.jsx(kl, {
																		className: "w-5 h-5 text-blue-500",
																	}),
																	r.jsx("h2", {
																		className: "font-semibold text-gray-900",
																		children: "Сертификаты",
																	}),
																],
															}),
															r.jsx(Ve, {
																variant: "outline",
																size: "sm",
																icon: r.jsx(Ks, { className: "w-4 h-4" }),
																loading: a,
																onClick: i,
																children: "Скачать ZIP",
															}),
														],
													}),
													r.jsx("p", {
														className: "text-xs text-gray-500 mt-2",
														children:
															"Все сертификаты качества на товары из заказа",
													}),
												],
											}),
										],
									}),
									r.jsx("div", {
										className: "lg:col-span-1",
										children: r.jsxs("div", {
											className:
												"bg-white rounded-xl border border-gray-200 p-5 sticky top-20",
											children: [
												r.jsx("h2", {
													className: "font-semibold text-gray-900 mb-5",
													children: "Статус заказа",
												}),
												r.jsx(Jx, {
													currentStatus: t.status,
													statusHistory: t.status_history,
												}),
											],
										}),
									}),
								],
							}),
						],
					})
				: r.jsxs("div", {
						className: "text-center py-12",
						children: [
							r.jsx("p", {
								className: "text-gray-500",
								children: "Заказ не найден",
							}),
							r.jsx(H, {
								to: "/account/orders",
								className: "text-primary-600 hover:underline mt-2 inline-block",
								children: "Назад к заказам",
							}),
						],
					});
	},
	Kx = [
		{ value: "", label: "Все типы" },
		{ value: Xe.INVOICE, label: "Счёт на оплату" },
		{ value: Xe.TORG12, label: "ТОРГ-12" },
		{ value: Xe.UPD, label: "УПД" },
		{ value: Xe.ACT, label: "Акт сверки" },
	],
	ni = {
		[Xe.INVOICE]: { label: "Счёт", variant: "blue" },
		[Xe.TORG12]: { label: "ТОРГ-12", variant: "green" },
		[Xe.UPD]: { label: "УПД", variant: "purple" },
		[Xe.ACT]: { label: "Акт", variant: "orange" },
		[Xe.CONTRACT]: { label: "Договор", variant: "gray" },
	},
	eg = () => {
		const [e, t] = O.useState(1),
			[s, a] = O.useState(""),
			[n, i] = O.useState(null),
			{ data: o, isLoading: l } = st({
				queryKey: ["myDocuments", { page: e, docType: s }],
				queryFn: () => Gx({ page: e, per_page: 20, doc_type: s || void 0 }),
			}),
			c = async (d, u) => {
				i(d);
				try {
					const m = await Lo(d);
					(ba(m, `${u}.pdf`), pe.success("Файл скачан"));
				} catch {
					pe.error("Ошибка при скачивании");
				} finally {
					i(null);
				}
			};
		return r.jsxs("div", {
			className: "space-y-5",
			children: [
				r.jsx("div", {
					className: "flex items-center justify-between",
					children: r.jsx("h1", {
						className: "text-2xl font-bold text-gray-900",
						children: "Мои документы",
					}),
				}),
				r.jsx("div", {
					className: "flex gap-3",
					children: r.jsx("div", {
						className: "w-48",
						children: r.jsx(et, {
							options: Kx,
							value: s,
							onChange: (d) => {
								(a(d.target.value), t(1));
							},
						}),
					}),
				}),
				l
					? r.jsx(hs, {})
					: (o == null ? void 0 : o.items.length) === 0
						? r.jsx(wr, {
								icon: r.jsx(bt, { className: "w-8 h-8" }),
								title: "Документов нет",
								description: "Документы появятся после оформления заказов",
							})
						: r.jsxs(r.Fragment, {
								children: [
									r.jsx("div", {
										className:
											"hidden sm:block bg-white rounded-xl border border-gray-200 overflow-hidden",
										children: r.jsxs("table", {
											className: "w-full text-sm",
											children: [
												r.jsx("thead", {
													className: "bg-gray-50 border-b border-gray-100",
													children: r.jsxs("tr", {
														children: [
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Документ",
															}),
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Тип",
															}),
															r.jsx("th", {
																className:
																	"px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Дата",
															}),
															r.jsx("th", {
																className:
																	"px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider",
																children: "Действие",
															}),
														],
													}),
												}),
												r.jsx("tbody", {
													className: "divide-y divide-gray-100",
													children:
														o == null
															? void 0
															: o.items.map((d) => {
																	const u = ni[d.doc_type] || {
																		label: d.doc_type,
																		variant: "gray",
																	};
																	return r.jsxs(
																		"tr",
																		{
																			className:
																				"hover:bg-gray-50/50 transition-colors",
																			children: [
																				r.jsx("td", {
																					className:
																						"px-5 py-3 font-medium text-gray-900",
																					children: d.doc_number,
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3",
																					children: r.jsx(Dt, {
																						variant: u.variant,
																						size: "sm",
																						children: u.label,
																					}),
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3 text-gray-500",
																					children: as(d.created_at),
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3 text-right",
																					children: r.jsx(Ve, {
																						variant: "ghost",
																						size: "sm",
																						icon: r.jsx(Ks, {
																							className: "w-4 h-4",
																						}),
																						loading: n === d.id,
																						onClick: () =>
																							c(d.id, d.doc_number),
																						children: "Скачать PDF",
																					}),
																				}),
																			],
																		},
																		d.id,
																	);
																}),
												}),
											],
										}),
									}),
									r.jsx("div", {
										className: "sm:hidden space-y-3",
										children:
											o == null
												? void 0
												: o.items.map((d) => {
														const u = ni[d.doc_type] || {
															label: d.doc_type,
															variant: "gray",
														};
														return r.jsxs(
															"div",
															{
																className:
																	"bg-white rounded-xl border border-gray-200 p-4",
																children: [
																	r.jsxs("div", {
																		className:
																			"flex items-center justify-between mb-2",
																		children: [
																			r.jsx("span", {
																				className:
																					"font-semibold text-gray-900 text-sm",
																				children: d.doc_number,
																			}),
																			r.jsx(Dt, {
																				variant: u.variant,
																				size: "sm",
																				children: u.label,
																			}),
																		],
																	}),
																	r.jsx("div", {
																		className: "text-xs text-gray-400 mb-3",
																		children: as(d.created_at),
																	}),
																	r.jsx(Ve, {
																		variant: "outline",
																		size: "sm",
																		icon: r.jsx(Ks, { className: "w-4 h-4" }),
																		loading: n === d.id,
																		onClick: () => c(d.id, d.doc_number),
																		fullWidth: !0,
																		children: "Скачать PDF",
																	}),
																],
															},
															d.id,
														);
													}),
									}),
									r.jsx(La, {
										page: e,
										totalPages: (o == null ? void 0 : o.pages) || 1,
										onPageChange: t,
									}),
								],
							}),
			],
		});
	},
	tg = Bt({
		full_name: ue().min(2, "Минимум 2 символа"),
		phone: ue().optional(),
		delivery_address: ue().optional(),
	}),
	sg = Bt({
		current_password: ue().min(6, "Введите текущий пароль"),
		new_password: ue().min(8, "Минимум 8 символов"),
		confirm_password: ue(),
	}).refine((e) => e.new_password === e.confirm_password, {
		message: "Пароли не совпадают",
		path: ["confirm_password"],
	}),
	rg = {
		[js.INDIVIDUAL]: "Физическое лицо",
		[js.IP]: "ИП",
		[js.OOO]: "Организация",
	},
	ag = {
		[nt.PENDING]: { label: "На проверке", variant: "yellow" },
		[nt.APPROVED]: { label: "Активен", variant: "green" },
		[nt.REJECTED]: { label: "Отклонён", variant: "red" },
		[nt.BLOCKED]: { label: "Заблокирован", variant: "gray" },
	},
	ng = () => {
		var p, g, j, f, k, b;
		const { user: e, setUser: t } = Ee(),
			s = Go(),
			[a, n] = O.useState(!1),
			[i, o] = O.useState(!1),
			l = Mt({
				resolver: Vt(tg),
				defaultValues: {
					full_name: (e == null ? void 0 : e.full_name) || "",
					phone: (e == null ? void 0 : e.phone) || "",
					delivery_address: (e == null ? void 0 : e.delivery_address) || "",
				},
			}),
			c = Mt({ resolver: Vt(sg) }),
			d = l.handleSubmit(async (N) => {
				try {
					const _ = await _e.patch("/profile", N);
					(t(_.data),
						s.invalidateQueries({ queryKey: ["profile"] }),
						pe.success("Профиль обновлён"));
				} catch {
					pe.error("Ошибка при сохранении профиля");
				}
			}),
			u = c.handleSubmit(async (N) => {
				try {
					(await ax({
						current_password: N.current_password,
						new_password: N.new_password,
					}),
						c.reset(),
						pe.success("Пароль изменён"));
				} catch {
					pe.error("Ошибка при смене пароля. Проверьте текущий пароль.");
				}
			}),
			m = e ? ag[e.status] : null,
			v = (e == null ? void 0 : e.client_type) !== js.INDIVIDUAL;
		return r.jsxs("div", {
			className: "space-y-5",
			children: [
				r.jsx("h1", {
					className: "text-2xl font-bold text-gray-900",
					children: "Профиль",
				}),
				r.jsx("div", {
					className: "bg-white rounded-xl border border-gray-200 p-5",
					children: r.jsxs("div", {
						className: "flex items-center gap-4 mb-4",
						children: [
							r.jsx("div", {
								className:
									"w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center",
								children: r.jsx(ot, { className: "w-7 h-7 text-primary-600" }),
							}),
							r.jsxs("div", {
								children: [
									r.jsx("h2", {
										className: "text-lg font-semibold text-gray-900",
										children: e == null ? void 0 : e.full_name,
									}),
									r.jsxs("div", {
										className: "flex items-center gap-2 mt-1",
										children: [
											r.jsx("span", {
												className: "text-sm text-gray-500",
												children:
													rg[(e == null ? void 0 : e.client_type) || ""] ||
													(e == null ? void 0 : e.client_type),
											}),
											m &&
												r.jsx(Dt, {
													variant: m.variant,
													size: "sm",
													children: m.label,
												}),
										],
									}),
								],
							}),
						],
					}),
				}),
				r.jsxs("div", {
					className: "bg-white rounded-xl border border-gray-200 p-5",
					children: [
						r.jsx("h2", {
							className: "text-base font-semibold text-gray-900 mb-4",
							children: "Личные данные",
						}),
						r.jsxs("form", {
							onSubmit: d,
							className: "space-y-4",
							children: [
								r.jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [
										r.jsx(fe, {
											label: "ФИО",
											leftIcon: r.jsx(ot, { className: "w-4 h-4" }),
											error:
												(p = l.formState.errors.full_name) == null
													? void 0
													: p.message,
											...l.register("full_name"),
										}),
										r.jsx(fe, {
											label: "Телефон",
											placeholder: "+7 (900) 000-00-00",
											error:
												(g = l.formState.errors.phone) == null
													? void 0
													: g.message,
											...l.register("phone"),
										}),
									],
								}),
								r.jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [
										r.jsx(fe, {
											label: "Email",
											value: (e == null ? void 0 : e.email) || "",
											disabled: !0,
											hint: "Email изменить нельзя",
										}),
										r.jsx(fe, {
											label: "Адрес доставки",
											placeholder: "Адрес для доставки заказов",
											leftIcon: r.jsx(Be, { className: "w-4 h-4" }),
											error:
												(j = l.formState.errors.delivery_address) == null
													? void 0
													: j.message,
											...l.register("delivery_address"),
										}),
									],
								}),
								r.jsx("div", {
									className: "flex justify-end",
									children: r.jsx(Ve, {
										type: "submit",
										variant: "primary",
										loading: l.formState.isSubmitting,
										children: "Сохранить изменения",
									}),
								}),
							],
						}),
					],
				}),
				v &&
					(e == null ? void 0 : e.organization) &&
					r.jsxs("div", {
						className: "bg-white rounded-xl border border-gray-200 p-5",
						children: [
							r.jsxs("div", {
								className: "flex items-center gap-2 mb-4",
								children: [
									r.jsx(pi, { className: "w-5 h-5 text-gray-500" }),
									r.jsx("h2", {
										className: "text-base font-semibold text-gray-900",
										children: "Реквизиты организации",
									}),
								],
							}),
							r.jsxs("dl", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm",
								children: [
									r.jsxs("div", {
										children: [
											r.jsx("dt", {
												className: "text-gray-500",
												children: "Название",
											}),
											r.jsx("dd", {
												className: "font-medium text-gray-900",
												children: e.organization.name,
											}),
										],
									}),
									r.jsxs("div", {
										children: [
											r.jsx("dt", {
												className: "text-gray-500",
												children: "ИНН",
											}),
											r.jsx("dd", {
												className: "font-medium text-gray-900",
												children: e.organization.inn,
											}),
										],
									}),
									r.jsxs("div", {
										children: [
											r.jsx("dt", {
												className: "text-gray-500",
												children: "Юридический адрес",
											}),
											r.jsx("dd", {
												className: "font-medium text-gray-900",
												children: e.organization.legal_address,
											}),
										],
									}),
									e.organization.bank_name &&
										r.jsxs("div", {
											children: [
												r.jsx("dt", {
													className: "text-gray-500",
													children: "Банк",
												}),
												r.jsx("dd", {
													className: "font-medium text-gray-900",
													children: e.organization.bank_name,
												}),
											],
										}),
								],
							}),
							r.jsx("div", {
								className: "mt-3 text-xs text-gray-400",
								children: "Для изменения реквизитов свяжитесь с менеджером",
							}),
						],
					}),
				r.jsxs("div", {
					className: "bg-white rounded-xl border border-gray-200 p-5",
					children: [
						r.jsxs("div", {
							className: "flex items-center gap-2 mb-4",
							children: [
								r.jsx(Qs, { className: "w-5 h-5 text-gray-500" }),
								r.jsx("h2", {
									className: "text-base font-semibold text-gray-900",
									children: "Смена пароля",
								}),
							],
						}),
						r.jsxs("form", {
							onSubmit: u,
							className: "space-y-4",
							children: [
								r.jsx(fe, {
									label: "Текущий пароль",
									type: a ? "text" : "password",
									rightIcon: a
										? r.jsx(Ns, { className: "w-4 h-4" })
										: r.jsx(_s, { className: "w-4 h-4" }),
									onRightIconClick: () => n(!a),
									error:
										(f = c.formState.errors.current_password) == null
											? void 0
											: f.message,
									...c.register("current_password"),
								}),
								r.jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [
										r.jsx(fe, {
											label: "Новый пароль",
											type: i ? "text" : "password",
											rightIcon: i
												? r.jsx(Ns, { className: "w-4 h-4" })
												: r.jsx(_s, { className: "w-4 h-4" }),
											onRightIconClick: () => o(!i),
											error:
												(k = c.formState.errors.new_password) == null
													? void 0
													: k.message,
											hint: "Минимум 8 символов",
											...c.register("new_password"),
										}),
										r.jsx(fe, {
											label: "Подтвердите пароль",
											type: "password",
											error:
												(b = c.formState.errors.confirm_password) == null
													? void 0
													: b.message,
											...c.register("confirm_password"),
										}),
									],
								}),
								r.jsx("div", {
									className: "flex justify-end",
									children: r.jsx(Ve, {
										type: "submit",
										variant: "secondary",
										loading: c.formState.isSubmitting,
										children: "Изменить пароль",
									}),
								}),
							],
						}),
					],
				}),
			],
		});
	},
	ig = I.lazy(() =>
		le(
			() => import("./StandingOrdersPage-BjkXkLGE.js"),
			__vite__mapDeps([0, 1, 2, 3]),
		),
	),
	og = I.lazy(() =>
		le(
			() => import("./ClientAnalyticsPage-B51FH20V.js"),
			__vite__mapDeps([4, 1, 2, 3, 5]),
		),
	),
	lg = I.lazy(() =>
		le(
			() => import("./AdminDashboard-B8Ddpnz6.js"),
			__vite__mapDeps([6, 1, 3, 7, 2]),
		),
	),
	cg = I.lazy(() =>
		le(
			() => import("./AdminOrdersPage-0zws-zsy.js"),
			__vite__mapDeps([8, 1, 3, 7, 2]),
		),
	),
	dg = I.lazy(() =>
		le(
			() => import("./AdminOrderDetailPage-DtsAyiKr.js"),
			__vite__mapDeps([9, 1, 3, 7, 2]),
		),
	),
	ug = I.lazy(() =>
		le(
			() => import("./AdminCatalogPage-eqWKsymx.js"),
			__vite__mapDeps([10, 1, 3, 7, 11, 2]),
		),
	),
	ii = I.lazy(() =>
		le(
			() => import("./AdminProductForm-CMjvrcnx.js"),
			__vite__mapDeps([12, 1, 7, 3, 2]),
		),
	),
	mg = I.lazy(() =>
		le(
			() => import("./AdminStockPage-DytZ4rkc.js"),
			__vite__mapDeps([13, 1, 3, 7, 2]),
		),
	),
	hg = I.lazy(() =>
		le(
			() => import("./AdminStockReceiptPage-ChD2gNLx.js"),
			__vite__mapDeps([14, 1, 7, 3, 2]),
		),
	),
	fg = I.lazy(() =>
		le(
			() => import("./AdminClientsPage-DMnSYpnJ.js"),
			__vite__mapDeps([15, 1, 7, 11, 2, 3]),
		),
	),
	xg = I.lazy(() =>
		le(
			() => import("./AdminFinancePage-D56a3TFw.js"),
			__vite__mapDeps([16, 1, 7, 11, 2, 3, 5]),
		),
	),
	gg = I.lazy(() =>
		le(
			() => import("./AdminCertificatesPage-BAGZNZUg.js"),
			__vite__mapDeps([17, 1, 7, 11, 2, 3]),
		),
	),
	pg = I.lazy(() =>
		le(
			() => import("./AdminSettingsPage-JYI-UUyv.js"),
			__vite__mapDeps([18, 1, 7, 2, 3]),
		),
	),
	yg = I.lazy(() =>
		le(
			() => import("./AdminBackupsPage-CTI_A09G.js"),
			__vite__mapDeps([19, 1, 2, 3]),
		),
	),
	bg = I.lazy(() =>
		le(
			() => import("./AdminSuppliersPage-ChOb51r8.js"),
			__vite__mapDeps([20, 1, 7, 2, 3]),
		),
	),
	vg = I.lazy(() =>
		le(
			() => import("./AdminContractsPage-B2lo7Wvz.js"),
			__vite__mapDeps([21, 1, 7, 2, 3]),
		),
	),
	jg = I.lazy(() =>
		le(
			() => import("./AdminDishesPage-CC8GCK74.js"),
			__vite__mapDeps([22, 1, 7, 2, 3]),
		),
	),
	wg = I.lazy(() =>
		le(
			() => import("./AdminWriteOffsPage-DzLRk6yi.js"),
			__vite__mapDeps([23, 1, 7, 2, 3, 5]),
		),
	),
	Ng = I.lazy(() =>
		le(
			() => import("./AdminTendersPage-k2P73mLx.js"),
			__vite__mapDeps([24, 1, 7, 2, 3]),
		),
	),
	_g = I.lazy(() =>
		le(
			() => import("./AdminAnalyticsPage-DJBk11nI.js"),
			__vite__mapDeps([25, 1, 7, 2, 3, 5]),
		),
	),
	kg = I.lazy(() =>
		le(
			() => import("./AdminCRMPage-BwaL55qB.js"),
			__vite__mapDeps([26, 1, 7, 2, 3]),
		),
	),
	Sg = I.lazy(() =>
		le(
			() => import("./AdminRemindersPage-DEBSuBTf.js"),
			__vite__mapDeps([27, 1, 7, 2, 3]),
		),
	),
	Eg = I.lazy(() =>
		le(
			() => import("./AdminCalendarPage-BNX9B9DE.js"),
			__vite__mapDeps([28, 1, 7, 2, 3]),
		),
	),
	Cg = I.lazy(() =>
		le(
			() => import("./AdminProcurementPage-O0dUmOyh.js"),
			__vite__mapDeps([29, 1, 7, 2, 3]),
		),
	),
	Ag = I.lazy(() =>
		le(
			() => import("./AdminPriceLogPage-CLrReftU.js"),
			__vite__mapDeps([30, 1, 7, 2, 3, 5]),
		),
	),
	Og = I.lazy(() =>
		le(
			() => import("./AdminBatchesPage-DDvqwwDb.js"),
			__vite__mapDeps([31, 1, 7, 2, 3]),
		),
	),
	Tg = I.lazy(() =>
		le(
			() => import("./AdminLogisticsPage-BXR0kxRP.js"),
			__vite__mapDeps([32, 1, 7, 2, 3]),
		),
	),
	Rg = I.lazy(() =>
		le(
			() => import("./AdminLabelsPage-DAp07cM9.js"),
			__vite__mapDeps([33, 1, 7, 2, 3]),
		),
	),
	Pg = I.lazy(() =>
		le(
			() => import("./AdminDocumentsPage-C9Jm0xXc.js"),
			__vite__mapDeps([34, 1, 2, 3]),
		),
	),
	oi = () => {
		const { isAuthenticated: e } = Ee(),
			t = ja();
		return e
			? r.jsx(Cs, {})
			: r.jsx(ws, { to: "/login", state: { from: t }, replace: !0 });
	},
	Dg = () => {
		const { isAuthenticated: e, user: t } = Ee(),
			s = ja();
		return e
			? (t == null ? void 0 : t.role) !== ht.ADMIN
				? r.jsx(ws, { to: "/", replace: !0 })
				: r.jsx(Cs, {})
			: r.jsx(ws, { to: "/login", state: { from: s }, replace: !0 });
	},
	ne = ({ children: e }) =>
		r.jsx(O.Suspense, { fallback: r.jsx(hs, {}), children: e }),
	Ig = () =>
		r.jsxs("div", {
			className:
				"min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50",
			children: [
				r.jsx("div", {
					className: "text-6xl font-bold text-gray-200",
					children: "404",
				}),
				r.jsx("h1", {
					className: "text-xl font-semibold text-gray-700",
					children: "Страница не найдена",
				}),
				r.jsx("p", {
					className: "text-gray-500 text-sm",
					children: "Возможно, она была перемещена или удалена",
				}),
				r.jsx("a", {
					href: "/",
					className:
						"mt-2 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors",
					children: "На главную",
				}),
			],
		}),
	Zr = () => {
		const { isAuthenticated: e } = Ee();
		return e ? r.jsx(tf, {}) : r.jsx(ws, { to: "/quick-order", replace: !0 });
	},
	Fg = () => {
		const { isAuthenticated: e } = Ee();
		return e ? r.jsx(Nx, {}) : r.jsx(ws, { to: "/quick-order", replace: !0 });
	},
	Lg = Ko([
		{
			element: r.jsx(Pu, {}),
			children: [
				{ path: "/", element: r.jsx(Hu, {}) },
				{ path: "/catalog", element: r.jsx(Zr, {}) },
				{ path: "/catalog/:category", element: r.jsx(Zr, {}) },
				{ path: "/catalog/:category/:id", element: r.jsx(Zr, {}) },
				{ path: "/about", element: r.jsx(ux, {}) },
				{ path: "/contacts", element: r.jsx(mx, {}) },
				{ path: "/schools", element: r.jsx(jx, {}) },
				{ path: "/quick-order", element: r.jsx(qx, {}) },
				{ path: "/cart", element: r.jsx(Fg, {}) },
				{
					element: r.jsx(oi, {}),
					children: [{ path: "/checkout", element: r.jsx(Ix, {}) }],
				},
			],
		},
		{ path: "/login", element: r.jsx(ix, {}) },
		{ path: "/register", element: r.jsx(dx, {}) },
		{
			element: r.jsx(oi, {}),
			children: [
				{
					element: r.jsx(Du, {}),
					children: [
						{ path: "/account", element: r.jsx(Wx, {}) },
						{ path: "/account/orders", element: r.jsx(Zx, {}) },
						{ path: "/account/orders/:id", element: r.jsx(Qx, {}) },
						{ path: "/account/documents", element: r.jsx(eg, {}) },
						{ path: "/account/profile", element: r.jsx(ng, {}) },
						{
							path: "/account/standing-orders",
							element: r.jsx(ne, { children: r.jsx(ig, {}) }),
						},
						{
							path: "/account/analytics",
							element: r.jsx(ne, { children: r.jsx(og, {}) }),
						},
					],
				},
			],
		},
		{
			element: r.jsx(Dg, {}),
			children: [
				{
					element: r.jsx(Mu, {}),
					children: [
						{ path: "/admin", element: r.jsx(ne, { children: r.jsx(lg, {}) }) },
						{
							path: "/admin/orders",
							element: r.jsx(ne, { children: r.jsx(cg, {}) }),
						},
						{
							path: "/admin/orders/:id",
							element: r.jsx(ne, { children: r.jsx(dg, {}) }),
						},
						{
							path: "/admin/catalog",
							element: r.jsx(ne, { children: r.jsx(ug, {}) }),
						},
						{
							path: "/admin/catalog/new",
							element: r.jsx(ne, { children: r.jsx(ii, {}) }),
						},
						{
							path: "/admin/catalog/:id/edit",
							element: r.jsx(ne, { children: r.jsx(ii, {}) }),
						},
						{
							path: "/admin/stock",
							element: r.jsx(ne, { children: r.jsx(mg, {}) }),
						},
						{
							path: "/admin/stock/receipt",
							element: r.jsx(ne, { children: r.jsx(hg, {}) }),
						},
						{
							path: "/admin/clients",
							element: r.jsx(ne, { children: r.jsx(fg, {}) }),
						},
						{
							path: "/admin/finance",
							element: r.jsx(ne, { children: r.jsx(xg, {}) }),
						},
						{
							path: "/admin/certificates",
							element: r.jsx(ne, { children: r.jsx(gg, {}) }),
						},
						{
							path: "/admin/settings",
							element: r.jsx(ne, { children: r.jsx(pg, {}) }),
						},
						{
							path: "/admin/backups",
							element: r.jsx(I.Suspense, {
								fallback: r.jsx("div", {}),
								children: r.jsx(yg, {}),
							}),
						},
						{
							path: "/admin/documents",
							element: r.jsx(ne, { children: r.jsx(Pg, {}) }),
						},
						{
							path: "/admin/suppliers",
							element: r.jsx(ne, { children: r.jsx(bg, {}) }),
						},
						{
							path: "/admin/contracts",
							element: r.jsx(ne, { children: r.jsx(vg, {}) }),
						},
						{
							path: "/admin/dishes",
							element: r.jsx(ne, { children: r.jsx(jg, {}) }),
						},
						{
							path: "/admin/write-offs",
							element: r.jsx(ne, { children: r.jsx(wg, {}) }),
						},
						{
							path: "/admin/tenders",
							element: r.jsx(ne, { children: r.jsx(Ng, {}) }),
						},
						{
							path: "/admin/analytics",
							element: r.jsx(ne, { children: r.jsx(_g, {}) }),
						},
						{
							path: "/admin/crm",
							element: r.jsx(ne, { children: r.jsx(kg, {}) }),
						},
						{
							path: "/admin/reminders",
							element: r.jsx(ne, { children: r.jsx(Sg, {}) }),
						},
						{
							path: "/admin/calendar",
							element: r.jsx(ne, { children: r.jsx(Eg, {}) }),
						},
						{
							path: "/admin/procurement",
							element: r.jsx(ne, { children: r.jsx(Cg, {}) }),
						},
						{
							path: "/admin/price-log",
							element: r.jsx(ne, { children: r.jsx(Ag, {}) }),
						},
						{
							path: "/admin/batches",
							element: r.jsx(ne, { children: r.jsx(Og, {}) }),
						},
						{
							path: "/admin/logistics",
							element: r.jsx(ne, { children: r.jsx(Tg, {}) }),
						},
						{
							path: "/admin/labels",
							element: r.jsx(ne, { children: r.jsx(Rg, {}) }),
						},
					],
				},
			],
		},
		{ path: "*", element: r.jsx(Ig, {}) },
	]),
	Mg = () => r.jsx(el, { router: Lg }),
	Vg = new Yo({
		defaultOptions: {
			queries: {
				retry: 1,
				staleTime: 5 * 60 * 1e3,
				gcTime: 10 * 60 * 1e3,
				refetchOnWindowFocus: !1,
			},
			mutations: { retry: !1 },
		},
	}),
	Mo = document.getElementById("root");
if (!Mo) throw new Error("Корневой элемент #root не найден в index.html");
Qr.createRoot(Mo).render(
	r.jsx(I.StrictMode, {
		children: r.jsxs(Xo, {
			client: Vg,
			children: [
				r.jsx(Mg, {}),
				r.jsx(hc, {
					position: "top-right",
					gutter: 8,
					containerStyle: { top: 16, right: 16 },
					toastOptions: {
						duration: 4e3,
						style: {
							background: "#fff",
							color: "#111827",
							border: "1px solid #e5e7eb",
							borderRadius: "10px",
							padding: "12px 16px",
							fontSize: "14px",
							boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
							maxWidth: "380px",
						},
						success: {
							iconTheme: { primary: "#16a34a", secondary: "#fff" },
							style: { border: "1px solid #bbf7d0", background: "#f0fdf4" },
						},
						error: {
							iconTheme: { primary: "#dc2626", secondary: "#fff" },
							style: { border: "1px solid #fecaca", background: "#fef2f2" },
						},
						loading: {
							iconTheme: { primary: "#16a34a", secondary: "#e5e7eb" },
						},
					},
				}),
			],
		}),
	}),
);
"serviceWorker" in navigator &&
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then((e) => {
				console.log("SW зарегистрирован:", e.scope);
			})
			.catch((e) => {
				console.warn("SW ошибка регистрации:", e);
			});
	});
export {
	nt as A,
	Dt as B,
	c0 as C,
	Xt as D,
	wr as E,
	St as F,
	js as G,
	u0 as H,
	fe as I,
	Yc as J,
	xo as K,
	po as L,
	We as M,
	Yu as N,
	ye as O,
	hs as P,
	Xc as Q,
	et as S,
	Jc as U,
	_e as a,
	J as b,
	U as c,
	Xh as d,
	dr as e,
	as as f,
	Fo as g,
	La as h,
	vo as i,
	yo as j,
	Ve as k,
	Lt as l,
	Gc as m,
	Jx as n,
	Pn as o,
	Bt as p,
	m0 as q,
	ue as r,
	pe as s,
	Vt as t,
	Mt as u,
	f0 as v,
	ai as w,
	fs as x,
	d0 as y,
	h0 as z,
};
//# sourceMappingURL=index-CqKRh0bB.js.map
