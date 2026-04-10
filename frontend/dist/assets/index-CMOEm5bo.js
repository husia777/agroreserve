const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			"assets/StandingOrdersPage-D5aHBF7q.js",
			"assets/query-CSqTlvHZ.js",
			"assets/ui-BHByy60k.js",
			"assets/vendor-DCpvk_e6.js",
			"assets/ClientAnalyticsPage-BPEBqqwL.js",
			"assets/charts-BFL_wnGK.js",
			"assets/AdminDashboard-CMjjAW0K.js",
			"assets/admin-BNmyOK3A.js",
			"assets/AdminOrdersPage-BCoVRLD-.js",
			"assets/AdminOrderDetailPage-DE70UAGl.js",
			"assets/AdminCatalogPage-Cvk0tyyC.js",
			"assets/Modal-maSlPEfk.js",
			"assets/AdminProductForm-Dm2prmY5.js",
			"assets/AdminStockPage-C5NG-WLj.js",
			"assets/AdminStockReceiptPage-D9e-9C_a.js",
			"assets/AdminClientsPage-Cl6JyqDn.js",
			"assets/AdminFinancePage-DYLq79wW.js",
			"assets/AdminCertificatesPage-C-XPn9LC.js",
			"assets/AdminSettingsPage-vk2BnFiZ.js",
			"assets/AdminBackupsPage-CggHk-jK.js",
			"assets/AdminSuppliersPage-DP1e_kTG.js",
			"assets/AdminContractsPage-Hnet786m.js",
			"assets/AdminDishesPage-1cy_VvzJ.js",
			"assets/AdminWriteOffsPage-DCJTF8xe.js",
			"assets/AdminTendersPage-PjqWBSI7.js",
			"assets/AdminAnalyticsPage-CdWZJoOZ.js",
			"assets/AdminCRMPage-DcNkvrSA.js",
			"assets/AdminRemindersPage-DLO2uwNl.js",
			"assets/AdminCalendarPage-Bj6gxVKN.js",
			"assets/AdminProcurementPage-ClBguaYa.js",
			"assets/AdminPriceLogPage-CQ3Yw6FW.js",
			"assets/AdminBatchesPage-Ds3fPO4s.js",
			"assets/AdminLogisticsPage-adqGbYuL.js",
			"assets/AdminLabelsPage-AjEo1vlZ.js",
			"assets/AdminDocumentsPage-B_KRSHbM.js",
		]),
) => i.map((i) => d[i]);
import {
	r as A,
	g as Xo,
	R as F,
	j as r,
	u as We,
	a as Sa,
	b as Jo,
	Q as Qo,
	d as Ko,
} from "./query-CSqTlvHZ.js";
import {
	r as el,
	u as Zt,
	L as H,
	N as ns,
	O as Ls,
	a as tl,
	b as Ea,
	c as Ca,
	d as sl,
	e as As,
	R as rl,
} from "./vendor-DCpvk_e6.js";
import {
	S as is,
	U as ct,
	P as yr,
	a as Qr,
	L as gi,
	X as Aa,
	M as al,
	b as jt,
	c as Oa,
	d as Ms,
	e as He,
	C as gs,
	f as Ta,
	g as pi,
	F as wt,
	h as Te,
	i as yi,
	j as $s,
	W as nl,
	k as bi,
	l as vi,
	A as Os,
	T as il,
	D as ol,
	m as ps,
	n as ll,
	o as Ra,
	p as ji,
	B as Kr,
	q as cl,
	r as dl,
	s as ul,
	E as ml,
	t as Pa,
	u as wi,
	v as rr,
	w as $t,
	x as Da,
	y as ar,
	z as hl,
	I as Ni,
	G as fl,
	H as Ts,
	J as xl,
	K as gl,
	N as ea,
	O as pl,
	Q as yl,
	R as bl,
	V as Rs,
	Y as nr,
	Z as Ps,
	_ as Ds,
	$ as ir,
	a0 as _i,
	a1 as vl,
	a2 as jl,
	a3 as br,
	a4 as wl,
	a5 as ta,
	a6 as Nl,
	a7 as _l,
	a8 as nn,
	a9 as kl,
} from "./ui-BHByy60k.js";
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
var sa = {},
	on = el;
((sa.createRoot = on.createRoot), (sa.hydrateRoot = on.hydrateRoot));
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
	ln = /\n+/g,
	yt = (e, t) => {
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
								? yt(o, i)
								: i + "{" + yt(o, i[1] == "k" ? "" : t) + "}")
				: typeof o == "object"
					? (a += yt(
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
						(n += yt.p ? yt.p(i, o) : i + ":" + o + ";"));
		}
		return s + (t && n ? t + "{" + n + "}" : n) + a;
	},
	nt = {},
	ki = (e) => {
		if (typeof e == "object") {
			let t = "";
			for (let s in e) t += s + ki(e[s]);
			return t;
		}
		return e;
	},
	Ol = (e, t, s, a, n) => {
		let i = ki(e),
			o =
				nt[i] ||
				(nt[i] = ((c) => {
					let d = 0,
						u = 11;
					for (; d < c.length; ) u = (101 * u + c.charCodeAt(d++)) >>> 0;
					return "go" + u;
				})(i));
		if (!nt[o]) {
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
										? ((m = u[3].replace(ln, " ").trim()),
											v.unshift((v[0][m] = v[0][m] || {})))
										: (v[0][u[1]] = u[2].replace(ln, " ").trim());
							return v[0];
						})(e);
			nt[o] = yt(n ? { ["@keyframes " + o]: c } : c, s ? "" : "." + o);
		}
		let l = s && nt.g ? nt.g : null;
		return (
			s && (nt.g = nt[o]),
			((c, d, u, m) => {
				m
					? (d.data = d.data.replace(m, c))
					: d.data.indexOf(c) === -1 && (d.data = u ? c + d.data : d.data + c);
			})(nt[o], t, a, l),
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
							: yt(l, "")
						: l === !1
							? ""
							: l;
			}
			return a + n + (o ?? "");
		}, "");
function vr(e) {
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
let Si, ra, aa;
vr.bind({ g: 1 });
let dt = vr.bind({ k: 1 });
function Rl(e, t, s, a) {
	((yt.p = t), (Si = e), (ra = s), (aa = a));
}
function St(e, t) {
	let s = this || {};
	return function () {
		let a = arguments;
		function n(i, o) {
			let l = Object.assign({}, i),
				c = l.className || n.className;
			((s.p = Object.assign({ theme: ra && ra() }, l)),
				(s.o = / *go\d+/.test(c)),
				(l.className = vr.apply(s, a) + (c ? " " + c : "")));
			let d = e;
			return (
				e[0] && ((d = l.as || e), delete l.as),
				aa && d[0] && aa(l),
				Si(d, l)
			);
		}
		return n;
	};
}
var Pl = (e) => typeof e == "function",
	or = (e, t) => (Pl(e) ? e(t) : e),
	Dl = (() => {
		let e = 0;
		return () => (++e).toString();
	})(),
	Ei = (() => {
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
	Ia = "default",
	Ci = (e, t) => {
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
				return Ci(e, {
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
	Ks = [],
	Ai = { toasts: [], pausedAt: void 0, settings: { toastLimit: Il } },
	st = {},
	Oi = (e, t = Ia) => {
		((st[t] = Ci(st[t] || Ai, e)),
			Ks.forEach(([s, a]) => {
				s === t && a(st[t]);
			}));
	},
	Ti = (e) => Object.keys(st).forEach((t) => Oi(e, t)),
	Fl = (e) => Object.keys(st).find((t) => st[t].toasts.some((s) => s.id === e)),
	jr =
		(e = Ia) =>
		(t) => {
			Oi(t, e);
		},
	Ll = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 },
	Ml = (e = {}, t = Ia) => {
		let [s, a] = A.useState(st[t] || Ai),
			n = A.useRef(st[t]);
		A.useEffect(
			() => (
				n.current !== st[t] && a(st[t]),
				Ks.push([t, a]),
				() => {
					let o = Ks.findIndex(([l]) => l === t);
					o > -1 && Ks.splice(o, 1);
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
	$l = (e, t = "blank", s) => ({
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
	Vs = (e) => (t, s) => {
		let a = $l(t, e, s);
		return (jr(a.toasterId || Fl(a.id))({ type: 2, toast: a }), a.id);
	},
	Ee = (e, t) => Vs("blank")(e, t);
Ee.error = Vs("error");
Ee.success = Vs("success");
Ee.loading = Vs("loading");
Ee.custom = Vs("custom");
Ee.dismiss = (e, t) => {
	let s = { type: 3, toastId: e };
	t ? jr(t)(s) : Ti(s);
};
Ee.dismissAll = (e) => Ee.dismiss(void 0, e);
Ee.remove = (e, t) => {
	let s = { type: 4, toastId: e };
	t ? jr(t)(s) : Ti(s);
};
Ee.removeAll = (e) => Ee.remove(void 0, e);
Ee.promise = (e, t, s) => {
	let a = Ee.loading(t.loading, { ...s, ...(s == null ? void 0 : s.loading) });
	return (
		typeof e == "function" && (e = e()),
		e
			.then((n) => {
				let i = t.success ? or(t.success, n) : void 0;
				return (
					i
						? Ee.success(i, {
								id: a,
								...s,
								...(s == null ? void 0 : s.success),
							})
						: Ee.dismiss(a),
					n
				);
			})
			.catch((n) => {
				let i = t.error ? or(t.error, n) : void 0;
				i
					? Ee.error(i, { id: a, ...s, ...(s == null ? void 0 : s.error) })
					: Ee.dismiss(a);
			}),
		e
	);
};
var Vl = 1e3,
	ql = (e, t = "default") => {
		let { toasts: s, pausedAt: a } = Ml(e, t),
			n = A.useRef(new Map()).current,
			i = A.useCallback((m, v = Vl) => {
				if (n.has(m)) return;
				let p = setTimeout(() => {
					(n.delete(m), o({ type: 4, toastId: m }));
				}, v);
				n.set(m, p);
			}, []);
		A.useEffect(() => {
			if (a) return;
			let m = Date.now(),
				v = s.map((p) => {
					if (p.duration === 1 / 0) return;
					let g = (p.duration || 0) + p.pauseDuration - (m - p.createdAt);
					if (g < 0) {
						p.visible && Ee.dismiss(p.id);
						return;
					}
					return setTimeout(() => Ee.dismiss(p.id, t), g);
				});
			return () => {
				v.forEach((p) => p && clearTimeout(p));
			};
		}, [s, a, t]);
		let o = A.useCallback(jr(t), [t]),
			l = A.useCallback(() => {
				o({ type: 5, time: Date.now() });
			}, [o]),
			c = A.useCallback(
				(m, v) => {
					o({ type: 1, toast: { id: m, height: v } });
				},
				[o],
			),
			d = A.useCallback(() => {
				a && o({ type: 6, time: Date.now() });
			}, [a, o]),
			u = A.useCallback(
				(m, v) => {
					let {
							reverseOrder: p = !1,
							gutter: g = 8,
							defaultPosition: j,
						} = v || {},
						f = s.filter(
							(k) => (k.position || j) === (m.position || j) && k.height,
						),
						S = f.findIndex((k) => k.id === m.id),
						y = f.filter((k, _) => _ < S && k.visible).length;
					return f
						.filter((k) => k.visible)
						.slice(...(p ? [y + 1] : [0, y]))
						.reduce((k, _) => k + (_.height || 0) + g, 0);
				},
				[s],
			);
		return (
			A.useEffect(() => {
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
	Ul = dt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,
	zl = dt`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
	Bl = dt`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,
	Wl = St("div")`
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
    animation: ${zl} 0.15s ease-out forwards;
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
	Hl = dt`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,
	Zl = St("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e) => e.secondary || "#e0e0e0"};
  border-right-color: ${(e) => e.primary || "#616161"};
  animation: ${Hl} 1s linear infinite;
`,
	Gl = dt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,
	Yl = dt`
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
	Xl = St("div")`
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
	Jl = St("div")`
  position: absolute;
`,
	Ql = St("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,
	Kl = dt`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
	ec = St("div")`
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
				? A.createElement(ec, null, t)
				: t
			: s === "blank"
				? null
				: A.createElement(
						Ql,
						null,
						A.createElement(Zl, { ...a }),
						s !== "loading" &&
							A.createElement(
								Jl,
								null,
								s === "error"
									? A.createElement(Wl, { ...a })
									: A.createElement(Xl, { ...a }),
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
	ic = St("div")`
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
	oc = St("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,
	lc = (e, t) => {
		let s = e.includes("top") ? 1 : -1,
			[a, n] = Ei() ? [ac, nc] : [sc(s), rc(s)];
		return {
			animation: t
				? `${dt(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
				: `${dt(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
		};
	},
	cc = A.memo(({ toast: e, position: t, style: s, children: a }) => {
		let n = e.height
				? lc(e.position || t || "top-center", e.visible)
				: { opacity: 0 },
			i = A.createElement(tc, { toast: e }),
			o = A.createElement(oc, { ...e.ariaProps }, or(e.message, e));
		return A.createElement(
			ic,
			{ className: e.className, style: { ...n, ...s, ...e.style } },
			typeof a == "function"
				? a({ icon: i, message: o })
				: A.createElement(A.Fragment, null, i, o),
		);
	});
Rl(A.createElement);
var dc = ({
		id: e,
		className: t,
		style: s,
		onHeightUpdate: a,
		children: n,
	}) => {
		let i = A.useCallback(
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
		return A.createElement("div", { ref: i, className: t, style: s }, n);
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
			transition: Ei() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
			transform: `translateY(${t * (s ? 1 : -1)}px)`,
			...a,
			...n,
		};
	},
	mc = vr`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,
	Gs = 16,
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
		let { toasts: c, handlers: d } = ql(s, i);
		return A.createElement(
			"div",
			{
				"data-rht-toaster": i || "",
				style: {
					position: "fixed",
					zIndex: 9999,
					top: Gs,
					left: Gs,
					right: Gs,
					bottom: Gs,
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
				return A.createElement(
					dc,
					{
						id: u.id,
						key: u.id,
						onHeightUpdate: d.updateHeight,
						className: u.visible ? mc : "",
						style: p,
					},
					u.type === "custom"
						? or(u.message, u)
						: n
							? n(u)
							: A.createElement(cc, { toast: u, position: m }),
				);
			}),
		);
	},
	Ot = Ee;
const fc = "modulepreload",
	xc = function (e) {
		return "/" + e;
	},
	cn = {},
	me = function (t, s, a) {
		let n = Promise.resolve();
		if (s && s.length > 0) {
			document.getElementsByTagName("link");
			const o = document.querySelector("meta[property=csp-nonce]"),
				l =
					(o == null ? void 0 : o.nonce) ||
					(o == null ? void 0 : o.getAttribute("nonce"));
			n = Promise.allSettled(
				s.map((c) => {
					if (((c = xc(c)), c in cn)) return;
					cn[c] = !0;
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
	dn = (e) => {
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
	pc = (e) => (e ? dn(e) : dn);
var Ri = { exports: {} },
	Pi = {},
	Di = { exports: {} },
	Ii = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var os = A;
function yc(e, t) {
	return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var bc = typeof Object.is == "function" ? Object.is : yc,
	vc = os.useState,
	jc = os.useEffect,
	wc = os.useLayoutEffect,
	Nc = os.useDebugValue;
function _c(e, t) {
	var s = t(),
		a = vc({ inst: { value: s, getSnapshot: t } }),
		n = a[0].inst,
		i = a[1];
	return (
		wc(
			function () {
				((n.value = s), (n.getSnapshot = t), Ir(n) && i({ inst: n }));
			},
			[e, s, t],
		),
		jc(
			function () {
				return (
					Ir(n) && i({ inst: n }),
					e(function () {
						Ir(n) && i({ inst: n });
					})
				);
			},
			[e],
		),
		Nc(s),
		s
	);
}
function Ir(e) {
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
Ii.useSyncExternalStore =
	os.useSyncExternalStore !== void 0 ? os.useSyncExternalStore : Sc;
Di.exports = Ii;
var Ec = Di.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wr = A,
	Cc = Ec;
function Ac(e, t) {
	return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Oc = typeof Object.is == "function" ? Object.is : Ac,
	Tc = Cc.useSyncExternalStore,
	Rc = wr.useRef,
	Pc = wr.useEffect,
	Dc = wr.useMemo,
	Ic = wr.useDebugValue;
Pi.useSyncExternalStoreWithSelector = function (e, t, s, a, n) {
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
Ri.exports = Pi;
var Fc = Ri.exports;
const Lc = Xo(Fc),
	Fi = {},
	{ useDebugValue: Mc } = F,
	{ useSyncExternalStoreWithSelector: $c } = Lc;
let un = !1;
const Vc = (e) => e;
function qc(e, t = Vc, s) {
	(Fi ? "production" : void 0) !== "production" &&
		s &&
		!un &&
		(console.warn(
			"[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
		),
		(un = !0));
	const a = $c(
		e.subscribe,
		e.getState,
		e.getServerState || e.getInitialState,
		t,
		s,
	);
	return (Mc(a), a);
}
const Uc = (e) => {
		(Fi ? "production" : void 0) !== "production" &&
			typeof e != "function" &&
			console.warn(
				"[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
			);
		const t = typeof e == "function" ? pc(e) : e,
			s = (a, n) => qc(t, a, n);
		return (Object.assign(s, t), s);
	},
	Li = (e) => Uc,
	zc = {};
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
const Is = (e) => (t) => {
		try {
			const s = e(t);
			return s instanceof Promise
				? s
				: {
						then(a) {
							return Is(a)(s);
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
					return Is(a)(s);
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
				merge: (f, S) => ({ ...S, ...f }),
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
		const u = Is(i.serialize),
			m = () => {
				const f = i.partialize({ ...a() });
				let S;
				const y = u({ state: f, version: i.version })
					.then((k) => d.setItem(i.name, k))
					.catch((k) => {
						S = k;
					});
				if (S) throw S;
				return y;
			},
			v = n.setState;
		n.setState = (f, S) => {
			(v(f, S), m());
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
			((o = !1), l.forEach((y) => y(a())));
			const S =
				((f = i.onRehydrateStorage) == null ? void 0 : f.call(i, a())) ||
				void 0;
			return Is(d.getItem.bind(d))(i.name)
				.then((y) => {
					if (y) return i.deserialize(y);
				})
				.then((y) => {
					if (y)
						if (typeof y.version == "number" && y.version !== i.version) {
							if (i.migrate) return i.migrate(y.state, y.version);
							console.error(
								"State loaded from storage couldn't be migrated since no migrate function was provided",
							);
						} else return y.state;
				})
				.then((y) => {
					var k;
					return ((g = i.merge(y, (k = a()) != null ? k : p)), s(g, !0), m());
				})
				.then(() => {
					(S == null || S(g, void 0), (o = !0), c.forEach((y) => y(g)));
				})
				.catch((y) => {
					S == null || S(void 0, y);
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
				l.forEach((y) => {
					var k;
					return y((k = a()) != null ? k : v);
				}));
			const S =
				((f = i.onRehydrateStorage) == null
					? void 0
					: f.call(i, (j = a()) != null ? j : v)) || void 0;
			return Is(d.getItem.bind(d))(i.name)
				.then((y) => {
					if (y)
						if (typeof y.version == "number" && y.version !== i.version) {
							if (i.migrate) return [!0, i.migrate(y.state, y.version)];
							console.error(
								"State loaded from storage couldn't be migrated since no migrate function was provided",
							);
						} else return [!1, y.state];
					return [!1, void 0];
				})
				.then((y) => {
					var k;
					const [_, E] = y;
					if (((p = i.merge(E, (k = a()) != null ? k : v)), s(p, !0), _))
						return u();
				})
				.then(() => {
					(S == null || S(p, void 0),
						(p = a()),
						(o = !0),
						c.forEach((y) => y(p)));
				})
				.catch((y) => {
					S == null || S(void 0, y);
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
			? ((zc ? "production" : void 0) !== "production" &&
					console.warn(
						"[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.",
					),
				Wc(e, t))
			: Hc(e, t),
	Mi = Zc;
var gt = ((e) => ((e.ADMIN = "admin"), (e.CLIENT = "client"), e))(gt || {}),
	Cs = ((e) => (
		(e.INDIVIDUAL = "individual"),
		(e.IP = "ip"),
		(e.OOO = "ooo"),
		e
	))(Cs || {}),
	ot = ((e) => (
		(e.PENDING = "pending"),
		(e.APPROVED = "approved"),
		(e.REJECTED = "rejected"),
		(e.BLOCKED = "blocked"),
		e
	))(ot || {}),
	we = ((e) => (
		(e.NEW = "new"),
		(e.CONFIRMED = "confirmed"),
		(e.ASSEMBLING = "assembling"),
		(e.ASSEMBLED = "assembled"),
		(e.DELIVERING = "delivering"),
		(e.DELIVERED = "delivered"),
		(e.CANCELLED = "cancelled"),
		e
	))(we || {}),
	Dt = ((e) => (
		(e.CASH = "cash"),
		(e.BANK_TRANSFER = "bank_transfer"),
		(e.CARD_ON_DELIVERY = "card_on_delivery"),
		(e.PREPAYMENT = "prepayment"),
		e
	))(Dt || {}),
	Gc = ((e) => (
		(e.PENDING = "pending"),
		(e.PAID = "paid"),
		(e.PARTIAL = "partial"),
		(e.OVERDUE = "overdue"),
		e
	))(Gc || {}),
	ss = ((e) => (
		(e.URGENT = "urgent"),
		(e.NORMAL = "normal"),
		(e.FLEXIBLE = "flexible"),
		e
	))(ss || {}),
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
	Ke = ((e) => (
		(e.INVOICE = "invoice"),
		(e.TORG12 = "torg12"),
		(e.UPD = "upd"),
		(e.ACT = "act"),
		(e.CONTRACT = "contract"),
		e
	))(Ke || {}),
	Jc = ((e) => (
		(e.KG = "kg"),
		(e.PIECE = "piece"),
		(e.LITER = "liter"),
		(e.BOX = "box"),
		(e.BAG = "bag"),
		e
	))(Jc || {});
function $i(e, t) {
	return function () {
		return e.apply(t, arguments);
	};
}
const { toString: Qc } = Object.prototype,
	{ getPrototypeOf: Fa } = Object,
	{ iterator: Nr, toStringTag: Vi } = Symbol,
	_r = ((e) => (t) => {
		const s = Qc.call(t);
		return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
	})(Object.create(null)),
	Xe = (e) => ((e = e.toLowerCase()), (t) => _r(t) === e),
	kr = (e) => (t) => typeof t === e,
	{ isArray: ys } = Array,
	ls = kr("undefined");
function qs(e) {
	return (
		e !== null &&
		!ls(e) &&
		e.constructor !== null &&
		!ls(e.constructor) &&
		Me(e.constructor.isBuffer) &&
		e.constructor.isBuffer(e)
	);
}
const qi = Xe("ArrayBuffer");
function Kc(e) {
	let t;
	return (
		typeof ArrayBuffer < "u" && ArrayBuffer.isView
			? (t = ArrayBuffer.isView(e))
			: (t = e && e.buffer && qi(e.buffer)),
		t
	);
}
const ed = kr("string"),
	Me = kr("function"),
	Ui = kr("number"),
	Us = (e) => e !== null && typeof e == "object",
	td = (e) => e === !0 || e === !1,
	er = (e) => {
		if (_r(e) !== "object") return !1;
		const t = Fa(e);
		return (
			(t === null ||
				t === Object.prototype ||
				Object.getPrototypeOf(t) === null) &&
			!(Vi in e) &&
			!(Nr in e)
		);
	},
	sd = (e) => {
		if (!Us(e) || qs(e)) return !1;
		try {
			return (
				Object.keys(e).length === 0 &&
				Object.getPrototypeOf(e) === Object.prototype
			);
		} catch {
			return !1;
		}
	},
	rd = Xe("Date"),
	ad = Xe("File"),
	nd = (e) => !!(e && typeof e.uri < "u"),
	id = (e) => e && typeof e.getParts < "u",
	od = Xe("Blob"),
	ld = Xe("FileList"),
	cd = (e) => Us(e) && Me(e.pipe);
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
const mn = dd(),
	hn = typeof mn.FormData < "u" ? mn.FormData : void 0,
	ud = (e) => {
		let t;
		return (
			e &&
			((hn && e instanceof hn) ||
				(Me(e.append) &&
					((t = _r(e)) === "formdata" ||
						(t === "object" &&
							Me(e.toString) &&
							e.toString() === "[object FormData]"))))
		);
	},
	md = Xe("URLSearchParams"),
	[hd, fd, xd, gd] = ["ReadableStream", "Request", "Response", "Headers"].map(
		Xe,
	),
	pd = (e) =>
		e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function zs(e, t, { allOwnKeys: s = !1 } = {}) {
	if (e === null || typeof e > "u") return;
	let a, n;
	if ((typeof e != "object" && (e = [e]), ys(e)))
		for (a = 0, n = e.length; a < n; a++) t.call(null, e[a], a, e);
	else {
		if (qs(e)) return;
		const i = s ? Object.getOwnPropertyNames(e) : Object.keys(e),
			o = i.length;
		let l;
		for (a = 0; a < o; a++) ((l = i[a]), t.call(null, e[l], l, e));
	}
}
function zi(e, t) {
	if (qs(e)) return null;
	t = t.toLowerCase();
	const s = Object.keys(e);
	let a = s.length,
		n;
	for (; a-- > 0; ) if (((n = s[a]), t === n.toLowerCase())) return n;
	return null;
}
const It =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
				? self
				: typeof window < "u"
					? window
					: global,
	Bi = (e) => !ls(e) && e !== It;
function na() {
	const { caseless: e, skipUndefined: t } = (Bi(this) && this) || {},
		s = {},
		a = (n, i) => {
			if (i === "__proto__" || i === "constructor" || i === "prototype") return;
			const o = (e && zi(s, i)) || i;
			er(s[o]) && er(n)
				? (s[o] = na(s[o], n))
				: er(n)
					? (s[o] = na({}, n))
					: ys(n)
						? (s[o] = n.slice())
						: (!t || !ls(n)) && (s[o] = n);
		};
	for (let n = 0, i = arguments.length; n < i; n++)
		arguments[n] && zs(arguments[n], a);
	return s;
}
const yd = (e, t, s, { allOwnKeys: a } = {}) => (
		zs(
			t,
			(n, i) => {
				s && Me(n)
					? Object.defineProperty(e, i, {
							value: $i(n, s),
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
			e = s !== !1 && Fa(e);
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
		if (ys(e)) return e;
		let t = e.length;
		if (!Ui(t)) return null;
		const s = new Array(t);
		for (; t-- > 0; ) s[t] = e[t];
		return s;
	},
	_d = (
		(e) => (t) =>
			e && t instanceof e
	)(typeof Uint8Array < "u" && Fa(Uint8Array)),
	kd = (e, t) => {
		const a = (e && e[Nr]).call(e);
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
	Ed = Xe("HTMLFormElement"),
	Cd = (e) =>
		e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (s, a, n) {
			return a.toUpperCase() + n;
		}),
	fn = (
		({ hasOwnProperty: e }) =>
		(t, s) =>
			e.call(t, s)
	)(Object.prototype),
	Ad = Xe("RegExp"),
	Wi = (e, t) => {
		const s = Object.getOwnPropertyDescriptors(e),
			a = {};
		(zs(s, (n, i) => {
			let o;
			(o = t(n, i, e)) !== !1 && (a[i] = o || n);
		}),
			Object.defineProperties(e, a));
	},
	Od = (e) => {
		Wi(e, (t, s) => {
			if (Me(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
				return !1;
			const a = e[s];
			if (Me(a)) {
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
		return (ys(e) ? a(e) : a(String(e).split(t)), s);
	},
	Rd = () => {},
	Pd = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Dd(e) {
	return !!(e && Me(e.append) && e[Vi] === "FormData" && e[Nr]);
}
const Id = (e) => {
		const t = new Array(10),
			s = (a, n) => {
				if (Us(a)) {
					if (t.indexOf(a) >= 0) return;
					if (qs(a)) return a;
					if (!("toJSON" in a)) {
						t[n] = a;
						const i = ys(a) ? [] : {};
						return (
							zs(a, (o, l) => {
								const c = s(o, n + 1);
								!ls(c) && (i[l] = c);
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
	Fd = Xe("AsyncFunction"),
	Ld = (e) => e && (Us(e) || Me(e)) && Me(e.then) && Me(e.catch),
	Hi = ((e, t) =>
		e
			? setImmediate
			: t
				? ((s, a) => (
						It.addEventListener(
							"message",
							({ source: n, data: i }) => {
								n === It && i === s && a.length && a.shift()();
							},
							!1,
						),
						(n) => {
							(a.push(n), It.postMessage(s, "*"));
						}
					))(`axios@${Math.random()}`, [])
				: (s) => setTimeout(s))(
		typeof setImmediate == "function",
		Me(It.postMessage),
	),
	Md =
		typeof queueMicrotask < "u"
			? queueMicrotask.bind(It)
			: (typeof process < "u" && process.nextTick) || Hi,
	$d = (e) => e != null && Me(e[Nr]),
	b = {
		isArray: ys,
		isArrayBuffer: qi,
		isBuffer: qs,
		isFormData: ud,
		isArrayBufferView: Kc,
		isString: ed,
		isNumber: Ui,
		isBoolean: td,
		isObject: Us,
		isPlainObject: er,
		isEmptyObject: sd,
		isReadableStream: hd,
		isRequest: fd,
		isResponse: xd,
		isHeaders: gd,
		isUndefined: ls,
		isDate: rd,
		isFile: ad,
		isReactNativeBlob: nd,
		isReactNative: id,
		isBlob: od,
		isRegExp: Ad,
		isFunction: Me,
		isStream: cd,
		isURLSearchParams: md,
		isTypedArray: _d,
		isFileList: ld,
		forEach: zs,
		merge: na,
		extend: yd,
		trim: pd,
		stripBOM: bd,
		inherits: vd,
		toFlatObject: jd,
		kindOf: _r,
		kindOfTest: Xe,
		endsWith: wd,
		toArray: Nd,
		forEachEntry: kd,
		matchAll: Sd,
		isHTMLForm: Ed,
		hasOwnProperty: fn,
		hasOwnProp: fn,
		reduceDescriptors: Wi,
		freezeMethods: Od,
		toObjectSet: Td,
		toCamelCase: Cd,
		noop: Rd,
		toFiniteNumber: Pd,
		findKey: zi,
		global: It,
		isContextDefined: Bi,
		isSpecCompliantForm: Dd,
		toJSONObject: Id,
		isAsyncFn: Fd,
		isThenable: Ld,
		setImmediate: Hi,
		asap: Md,
		isIterable: $d,
	};
let B = class Zi extends Error {
	static from(t, s, a, n, i, o) {
		const l = new Zi(t.message, s || t.code, a, n, i);
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
			config: b.toJSONObject(this.config),
			code: this.code,
			status: this.status,
		};
	}
};
B.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
B.ERR_BAD_OPTION = "ERR_BAD_OPTION";
B.ECONNABORTED = "ECONNABORTED";
B.ETIMEDOUT = "ETIMEDOUT";
B.ERR_NETWORK = "ERR_NETWORK";
B.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
B.ERR_DEPRECATED = "ERR_DEPRECATED";
B.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
B.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
B.ERR_CANCELED = "ERR_CANCELED";
B.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
B.ERR_INVALID_URL = "ERR_INVALID_URL";
const Vd = null;
function ia(e) {
	return b.isPlainObject(e) || b.isArray(e);
}
function Gi(e) {
	return b.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Fr(e, t, s) {
	return e
		? e
				.concat(t)
				.map(function (n, i) {
					return ((n = Gi(n)), !s && i ? "[" + n + "]" : n);
				})
				.join(s ? "." : "")
		: t;
}
function qd(e) {
	return b.isArray(e) && !e.some(ia);
}
const Ud = b.toFlatObject(b, {}, null, function (t) {
	return /^is[A-Z]/.test(t);
});
function Sr(e, t, s) {
	if (!b.isObject(e)) throw new TypeError("target must be an object");
	((t = t || new FormData()),
		(s = b.toFlatObject(
			s,
			{ metaTokens: !0, dots: !1, indexes: !1 },
			!1,
			function (j, f) {
				return !b.isUndefined(f[j]);
			},
		)));
	const a = s.metaTokens,
		n = s.visitor || u,
		i = s.dots,
		o = s.indexes,
		c = (s.Blob || (typeof Blob < "u" && Blob)) && b.isSpecCompliantForm(t);
	if (!b.isFunction(n)) throw new TypeError("visitor must be a function");
	function d(g) {
		if (g === null) return "";
		if (b.isDate(g)) return g.toISOString();
		if (b.isBoolean(g)) return g.toString();
		if (!c && b.isBlob(g))
			throw new B("Blob is not supported. Use a Buffer instead.");
		return b.isArrayBuffer(g) || b.isTypedArray(g)
			? c && typeof Blob == "function"
				? new Blob([g])
				: Buffer.from(g)
			: g;
	}
	function u(g, j, f) {
		let S = g;
		if (b.isReactNative(t) && b.isReactNativeBlob(g))
			return (t.append(Fr(f, j, i), d(g)), !1);
		if (g && !f && typeof g == "object") {
			if (b.endsWith(j, "{}"))
				((j = a ? j : j.slice(0, -2)), (g = JSON.stringify(g)));
			else if (
				(b.isArray(g) && qd(g)) ||
				((b.isFileList(g) || b.endsWith(j, "[]")) && (S = b.toArray(g)))
			)
				return (
					(j = Gi(j)),
					S.forEach(function (k, _) {
						!(b.isUndefined(k) || k === null) &&
							t.append(
								o === !0 ? Fr([j], _, i) : o === null ? j : j + "[]",
								d(k),
							);
					}),
					!1
				);
		}
		return ia(g) ? !0 : (t.append(Fr(f, j, i), d(g)), !1);
	}
	const m = [],
		v = Object.assign(Ud, {
			defaultVisitor: u,
			convertValue: d,
			isVisitable: ia,
		});
	function p(g, j) {
		if (!b.isUndefined(g)) {
			if (m.indexOf(g) !== -1)
				throw Error("Circular reference detected in " + j.join("."));
			(m.push(g),
				b.forEach(g, function (S, y) {
					(!(b.isUndefined(S) || S === null) &&
						n.call(t, S, b.isString(y) ? y.trim() : y, j, v)) === !0 &&
						p(S, j ? j.concat(y) : [y]);
				}),
				m.pop());
		}
	}
	if (!b.isObject(e)) throw new TypeError("data must be an object");
	return (p(e), t);
}
function xn(e) {
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
function La(e, t) {
	((this._pairs = []), e && Sr(e, this, t));
}
const Yi = La.prototype;
Yi.append = function (t, s) {
	this._pairs.push([t, s]);
};
Yi.toString = function (t) {
	const s = t
		? function (a) {
				return t.call(this, a, xn);
			}
		: xn;
	return this._pairs
		.map(function (n) {
			return s(n[0]) + "=" + s(n[1]);
		}, "")
		.join("&");
};
function zd(e) {
	return encodeURIComponent(e)
		.replace(/%3A/gi, ":")
		.replace(/%24/g, "$")
		.replace(/%2C/gi, ",")
		.replace(/%20/g, "+");
}
function Xi(e, t, s) {
	if (!t) return e;
	const a = (s && s.encode) || zd,
		n = b.isFunction(s) ? { serialize: s } : s,
		i = n && n.serialize;
	let o;
	if (
		(i
			? (o = i(t, n))
			: (o = b.isURLSearchParams(t) ? t.toString() : new La(t, n).toString(a)),
		o)
	) {
		const l = e.indexOf("#");
		(l !== -1 && (e = e.slice(0, l)),
			(e += (e.indexOf("?") === -1 ? "?" : "&") + o));
	}
	return e;
}
class gn {
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
		b.forEach(this.handlers, function (a) {
			a !== null && t(a);
		});
	}
}
const Ma = {
		silentJSONParsing: !0,
		forcedJSONParsing: !0,
		clarifyTimeoutError: !1,
		legacyInterceptorReqResOrdering: !0,
	},
	Bd = typeof URLSearchParams < "u" ? URLSearchParams : La,
	Wd = typeof FormData < "u" ? FormData : null,
	Hd = typeof Blob < "u" ? Blob : null,
	Zd = {
		isBrowser: !0,
		classes: { URLSearchParams: Bd, FormData: Wd, Blob: Hd },
		protocols: ["http", "https", "file", "blob", "url", "data"],
	},
	$a = typeof window < "u" && typeof document < "u",
	oa = (typeof navigator == "object" && navigator) || void 0,
	Gd =
		$a &&
		(!oa || ["ReactNative", "NativeScript", "NS"].indexOf(oa.product) < 0),
	Yd =
		typeof WorkerGlobalScope < "u" &&
		self instanceof WorkerGlobalScope &&
		typeof self.importScripts == "function",
	Xd = ($a && window.location.href) || "http://localhost",
	Jd = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				hasBrowserEnv: $a,
				hasStandardBrowserEnv: Gd,
				hasStandardBrowserWebWorkerEnv: Yd,
				navigator: oa,
				origin: Xd,
			},
			Symbol.toStringTag,
			{ value: "Module" },
		),
	),
	Re = { ...Jd, ...Zd };
function Qd(e, t) {
	return Sr(e, new Re.classes.URLSearchParams(), {
		visitor: function (s, a, n, i) {
			return Re.isNode && b.isBuffer(s)
				? (this.append(a, s.toString("base64")), !1)
				: i.defaultVisitor.apply(this, arguments);
		},
		...t,
	});
}
function Kd(e) {
	return b
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
function Ji(e) {
	function t(s, a, n, i) {
		let o = s[i++];
		if (o === "__proto__") return !0;
		const l = Number.isFinite(+o),
			c = i >= s.length;
		return (
			(o = !o && b.isArray(n) ? n.length : o),
			c
				? (b.hasOwnProp(n, o) ? (n[o] = [n[o], a]) : (n[o] = a), !l)
				: ((!n[o] || !b.isObject(n[o])) && (n[o] = []),
					t(s, a, n[o], i) && b.isArray(n[o]) && (n[o] = eu(n[o])),
					!l)
		);
	}
	if (b.isFormData(e) && b.isFunction(e.entries)) {
		const s = {};
		return (
			b.forEachEntry(e, (a, n) => {
				t(Kd(a), n, s, 0);
			}),
			s
		);
	}
	return null;
}
function tu(e, t, s) {
	if (b.isString(e))
		try {
			return ((t || JSON.parse)(e), b.trim(e));
		} catch (a) {
			if (a.name !== "SyntaxError") throw a;
		}
	return (s || JSON.stringify)(e);
}
const Bs = {
	transitional: Ma,
	adapter: ["xhr", "http", "fetch"],
	transformRequest: [
		function (t, s) {
			const a = s.getContentType() || "",
				n = a.indexOf("application/json") > -1,
				i = b.isObject(t);
			if ((i && b.isHTMLForm(t) && (t = new FormData(t)), b.isFormData(t)))
				return n ? JSON.stringify(Ji(t)) : t;
			if (
				b.isArrayBuffer(t) ||
				b.isBuffer(t) ||
				b.isStream(t) ||
				b.isFile(t) ||
				b.isBlob(t) ||
				b.isReadableStream(t)
			)
				return t;
			if (b.isArrayBufferView(t)) return t.buffer;
			if (b.isURLSearchParams(t))
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
				if ((l = b.isFileList(t)) || a.indexOf("multipart/form-data") > -1) {
					const c = this.env && this.env.FormData;
					return Sr(
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
			const s = this.transitional || Bs.transitional,
				a = s && s.forcedJSONParsing,
				n = this.responseType === "json";
			if (b.isResponse(t) || b.isReadableStream(t)) return t;
			if (t && b.isString(t) && ((a && !this.responseType) || n)) {
				const o = !(s && s.silentJSONParsing) && n;
				try {
					return JSON.parse(t, this.parseReviver);
				} catch (l) {
					if (o)
						throw l.name === "SyntaxError"
							? B.from(l, B.ERR_BAD_RESPONSE, this, null, this.response)
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
	env: { FormData: Re.classes.FormData, Blob: Re.classes.Blob },
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
b.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
	Bs.headers[e] = {};
});
const su = b.toObjectSet([
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
	pn = Symbol("internals");
function ws(e) {
	return e && String(e).trim().toLowerCase();
}
function tr(e) {
	return e === !1 || e == null ? e : b.isArray(e) ? e.map(tr) : String(e);
}
function au(e) {
	const t = Object.create(null),
		s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let a;
	for (; (a = s.exec(e)); ) t[a[1]] = a[2];
	return t;
}
const nu = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Lr(e, t, s, a, n) {
	if (b.isFunction(a)) return a.call(this, t, s);
	if ((n && (t = s), !!b.isString(t))) {
		if (b.isString(a)) return t.indexOf(a) !== -1;
		if (b.isRegExp(a)) return a.test(t);
	}
}
function iu(e) {
	return e
		.trim()
		.toLowerCase()
		.replace(/([a-z\d])(\w*)/g, (t, s, a) => s.toUpperCase() + a);
}
function ou(e, t) {
	const s = b.toCamelCase(" " + t);
	["get", "set", "has"].forEach((a) => {
		Object.defineProperty(e, a + s, {
			value: function (n, i, o) {
				return this[a].call(this, t, n, i, o);
			},
			configurable: !0,
		});
	});
}
let $e = class {
	constructor(t) {
		t && this.set(t);
	}
	set(t, s, a) {
		const n = this;
		function i(l, c, d) {
			const u = ws(c);
			if (!u) throw new Error("header name must be a non-empty string");
			const m = b.findKey(n, u);
			(!m || n[m] === void 0 || d === !0 || (d === void 0 && n[m] !== !1)) &&
				(n[m || c] = tr(l));
		}
		const o = (l, c) => b.forEach(l, (d, u) => i(d, u, c));
		if (b.isPlainObject(t) || t instanceof this.constructor) o(t, s);
		else if (b.isString(t) && (t = t.trim()) && !nu(t)) o(ru(t), s);
		else if (b.isObject(t) && b.isIterable(t)) {
			let l = {},
				c,
				d;
			for (const u of t) {
				if (!b.isArray(u))
					throw TypeError("Object iterator must return a key-value pair");
				l[(d = u[0])] = (c = l[d])
					? b.isArray(c)
						? [...c, u[1]]
						: [c, u[1]]
					: u[1];
			}
			o(l, s);
		} else t != null && i(s, t, a);
		return this;
	}
	get(t, s) {
		if (((t = ws(t)), t)) {
			const a = b.findKey(this, t);
			if (a) {
				const n = this[a];
				if (!s) return n;
				if (s === !0) return au(n);
				if (b.isFunction(s)) return s.call(this, n, a);
				if (b.isRegExp(s)) return s.exec(n);
				throw new TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(t, s) {
		if (((t = ws(t)), t)) {
			const a = b.findKey(this, t);
			return !!(a && this[a] !== void 0 && (!s || Lr(this, this[a], a, s)));
		}
		return !1;
	}
	delete(t, s) {
		const a = this;
		let n = !1;
		function i(o) {
			if (((o = ws(o)), o)) {
				const l = b.findKey(a, o);
				l && (!s || Lr(a, a[l], l, s)) && (delete a[l], (n = !0));
			}
		}
		return (b.isArray(t) ? t.forEach(i) : i(t), n);
	}
	clear(t) {
		const s = Object.keys(this);
		let a = s.length,
			n = !1;
		for (; a--; ) {
			const i = s[a];
			(!t || Lr(this, this[i], i, t, !0)) && (delete this[i], (n = !0));
		}
		return n;
	}
	normalize(t) {
		const s = this,
			a = {};
		return (
			b.forEach(this, (n, i) => {
				const o = b.findKey(a, i);
				if (o) {
					((s[o] = tr(n)), delete s[i]);
					return;
				}
				const l = t ? iu(i) : String(i).trim();
				(l !== i && delete s[i], (s[l] = tr(n)), (a[l] = !0));
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
			b.forEach(this, (a, n) => {
				a != null && a !== !1 && (s[n] = t && b.isArray(a) ? a.join(", ") : a);
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
		const a = (this[pn] = this[pn] = { accessors: {} }).accessors,
			n = this.prototype;
		function i(o) {
			const l = ws(o);
			a[l] || (ou(n, o), (a[l] = !0));
		}
		return (b.isArray(t) ? t.forEach(i) : i(t), this);
	}
};
$e.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization",
]);
b.reduceDescriptors($e.prototype, ({ value: e }, t) => {
	let s = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(a) {
			this[s] = a;
		},
	};
});
b.freezeMethods($e);
function Mr(e, t) {
	const s = this || Bs,
		a = t || s,
		n = $e.from(a.headers);
	let i = a.data;
	return (
		b.forEach(e, function (l) {
			i = l.call(s, i, n.normalize(), t ? t.status : void 0);
		}),
		n.normalize(),
		i
	);
}
function Qi(e) {
	return !!(e && e.__CANCEL__);
}
let Ws = class extends B {
	constructor(t, s, a) {
		(super(t ?? "canceled", B.ERR_CANCELED, s, a),
			(this.name = "CanceledError"),
			(this.__CANCEL__ = !0));
	}
};
function Ki(e, t, s) {
	const a = s.config.validateStatus;
	!s.status || !a || a(s.status)
		? e(s)
		: t(
				new B(
					"Request failed with status code " + s.status,
					[B.ERR_BAD_REQUEST, B.ERR_BAD_RESPONSE][
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
const lr = (e, t, s = 3) => {
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
	yn = (e, t) => {
		const s = e != null;
		return [(a) => t[0]({ lengthComputable: s, total: e, loaded: a }), t[1]];
	},
	bn =
		(e) =>
		(...t) =>
			b.asap(() => e(...t)),
	uu = Re.hasStandardBrowserEnv
		? ((e, t) => (s) => (
				(s = new URL(s, Re.origin)),
				e.protocol === s.protocol &&
					e.host === s.host &&
					(t || e.port === s.port)
			))(
				new URL(Re.origin),
				Re.navigator && /(msie|trident)/i.test(Re.navigator.userAgent),
			)
		: () => !0,
	mu = Re.hasStandardBrowserEnv
		? {
				write(e, t, s, a, n, i, o) {
					if (typeof document > "u") return;
					const l = [`${e}=${encodeURIComponent(t)}`];
					(b.isNumber(s) && l.push(`expires=${new Date(s).toUTCString()}`),
						b.isString(a) && l.push(`path=${a}`),
						b.isString(n) && l.push(`domain=${n}`),
						i === !0 && l.push("secure"),
						b.isString(o) && l.push(`SameSite=${o}`),
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
function eo(e, t, s) {
	let a = !hu(t);
	return e && (a || s == !1) ? fu(e, t) : t;
}
const vn = (e) => (e instanceof $e ? { ...e } : e);
function Vt(e, t) {
	t = t || {};
	const s = {};
	function a(d, u, m, v) {
		return b.isPlainObject(d) && b.isPlainObject(u)
			? b.merge.call({ caseless: v }, d, u)
			: b.isPlainObject(u)
				? b.merge({}, u)
				: b.isArray(u)
					? u.slice()
					: u;
	}
	function n(d, u, m, v) {
		if (b.isUndefined(u)) {
			if (!b.isUndefined(d)) return a(void 0, d, m, v);
		} else return a(d, u, m, v);
	}
	function i(d, u) {
		if (!b.isUndefined(u)) return a(void 0, u);
	}
	function o(d, u) {
		if (b.isUndefined(u)) {
			if (!b.isUndefined(d)) return a(void 0, d);
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
		headers: (d, u, m) => n(vn(d), vn(u), m, !0),
	};
	return (
		b.forEach(Object.keys({ ...e, ...t }), function (u) {
			if (u === "__proto__" || u === "constructor" || u === "prototype") return;
			const m = b.hasOwnProp(c, u) ? c[u] : n,
				v = m(e[u], t[u], u);
			(b.isUndefined(v) && m !== l) || (s[u] = v);
		}),
		s
	);
}
const to = (e) => {
		const t = Vt({}, e);
		let {
			data: s,
			withXSRFToken: a,
			xsrfHeaderName: n,
			xsrfCookieName: i,
			headers: o,
			auth: l,
		} = t;
		if (
			((t.headers = o = $e.from(o)),
			(t.url = Xi(
				eo(t.baseURL, t.url, t.allowAbsoluteUrls),
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
			b.isFormData(s))
		) {
			if (Re.hasStandardBrowserEnv || Re.hasStandardBrowserWebWorkerEnv)
				o.setContentType(void 0);
			else if (b.isFunction(s.getHeaders)) {
				const c = s.getHeaders(),
					d = ["content-type", "content-length"];
				Object.entries(c).forEach(([u, m]) => {
					d.includes(u.toLowerCase()) && o.set(u, m);
				});
			}
		}
		if (
			Re.hasStandardBrowserEnv &&
			(a && b.isFunction(a) && (a = a(t)), a || (a !== !1 && uu(t.url)))
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
				const n = to(e);
				let i = n.data;
				const o = $e.from(n.headers).normalize();
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
				function S() {
					if (!f) return;
					const k = $e.from(
							"getAllResponseHeaders" in f && f.getAllResponseHeaders(),
						),
						E = {
							data:
								!l || l === "text" || l === "json"
									? f.responseText
									: f.response,
							status: f.status,
							statusText: f.statusText,
							headers: k,
							config: e,
							request: f,
						};
					(Ki(
						function (z) {
							(s(z), j());
						},
						function (z) {
							(a(z), j());
						},
						E,
					),
						(f = null));
				}
				("onloadend" in f
					? (f.onloadend = S)
					: (f.onreadystatechange = function () {
							!f ||
								f.readyState !== 4 ||
								(f.status === 0 &&
									!(f.responseURL && f.responseURL.indexOf("file:") === 0)) ||
								setTimeout(S);
						}),
					(f.onabort = function () {
						f &&
							(a(new B("Request aborted", B.ECONNABORTED, e, f)), (f = null));
					}),
					(f.onerror = function (_) {
						const E = _ && _.message ? _.message : "Network Error",
							N = new B(E, B.ERR_NETWORK, e, f);
						((N.event = _ || null), a(N), (f = null));
					}),
					(f.ontimeout = function () {
						let _ = n.timeout
							? "timeout of " + n.timeout + "ms exceeded"
							: "timeout exceeded";
						const E = n.transitional || Ma;
						(n.timeoutErrorMessage && (_ = n.timeoutErrorMessage),
							a(
								new B(
									_,
									E.clarifyTimeoutError ? B.ETIMEDOUT : B.ECONNABORTED,
									e,
									f,
								),
							),
							(f = null));
					}),
					i === void 0 && o.setContentType(null),
					"setRequestHeader" in f &&
						b.forEach(o.toJSON(), function (_, E) {
							f.setRequestHeader(E, _);
						}),
					b.isUndefined(n.withCredentials) ||
						(f.withCredentials = !!n.withCredentials),
					l && l !== "json" && (f.responseType = n.responseType),
					d && (([v, g] = lr(d, !0)), f.addEventListener("progress", v)),
					c &&
						f.upload &&
						(([m, p] = lr(c)),
						f.upload.addEventListener("progress", m),
						f.upload.addEventListener("loadend", p)),
					(n.cancelToken || n.signal) &&
						((u = (k) => {
							f &&
								(a(!k || k.type ? new Ws(null, e, f) : k),
								f.abort(),
								(f = null));
						}),
						n.cancelToken && n.cancelToken.subscribe(u),
						n.signal &&
							(n.signal.aborted
								? u()
								: n.signal.addEventListener("abort", u))));
				const y = lu(n.url);
				if (y && Re.protocols.indexOf(y) === -1) {
					a(new B("Unsupported protocol " + y + ":", B.ERR_BAD_REQUEST, e));
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
						u instanceof B ? u : new Ws(u instanceof Error ? u.message : u),
					);
				}
			};
			let o =
				t &&
				setTimeout(() => {
					((o = null), i(new B(`timeout of ${t}ms exceeded`, B.ETIMEDOUT)));
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
			return ((c.unsubscribe = () => b.asap(l)), c);
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
	jn = (e, t, s, a) => {
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
	wn = 64 * 1024,
	{ isFunction: Ys } = b,
	ju = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(
		b.global,
	),
	{ ReadableStream: Nn, TextEncoder: _n } = b.global,
	kn = (e, ...t) => {
		try {
			return !!e(...t);
		} catch {
			return !1;
		}
	},
	wu = (e) => {
		e = b.merge.call({ skipUndefined: !0 }, ju, e);
		const { fetch: t, Request: s, Response: a } = e,
			n = t ? Ys(t) : typeof fetch == "function",
			i = Ys(s),
			o = Ys(a);
		if (!n) return !1;
		const l = n && Ys(Nn),
			c =
				n &&
				(typeof _n == "function"
					? (
							(g) => (j) =>
								g.encode(j)
						)(new _n())
					: async (g) => new Uint8Array(await new s(g).arrayBuffer())),
			d =
				i &&
				l &&
				kn(() => {
					let g = !1;
					const j = new s(Re.origin, {
						body: new Nn(),
						method: "POST",
						get duplex() {
							return ((g = !0), "half");
						},
					}).headers.has("Content-Type");
					return g && !j;
				}),
			u = o && l && kn(() => b.isReadableStream(new a("").body)),
			m = { stream: u && ((g) => g.body) };
		n &&
			["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
				!m[g] &&
					(m[g] = (j, f) => {
						let S = j && j[g];
						if (S) return S.call(j);
						throw new B(
							`Response type '${g}' is not supported`,
							B.ERR_NOT_SUPPORT,
							f,
						);
					});
			});
		const v = async (g) => {
				if (g == null) return 0;
				if (b.isBlob(g)) return g.size;
				if (b.isSpecCompliantForm(g))
					return (
						await new s(Re.origin, { method: "POST", body: g }).arrayBuffer()
					).byteLength;
				if (b.isArrayBufferView(g) || b.isArrayBuffer(g)) return g.byteLength;
				if ((b.isURLSearchParams(g) && (g = g + ""), b.isString(g)))
					return (await c(g)).byteLength;
			},
			p = async (g, j) => {
				const f = b.toFiniteNumber(g.getContentLength());
				return f ?? v(j);
			};
		return async (g) => {
			let {
					url: j,
					method: f,
					data: S,
					signal: y,
					cancelToken: k,
					timeout: _,
					onDownloadProgress: E,
					onUploadProgress: N,
					responseType: z,
					headers: te,
					withCredentials: se = "same-origin",
					fetchOptions: L,
				} = to(g),
				be = t || fetch;
			z = z ? (z + "").toLowerCase() : "text";
			let V = pu([y, k && k.toAbortSignal()], _),
				W = null;
			const Q =
				V &&
				V.unsubscribe &&
				(() => {
					V.unsubscribe();
				});
			let ae;
			try {
				if (
					N &&
					d &&
					f !== "get" &&
					f !== "head" &&
					(ae = await p(te, S)) !== 0
				) {
					let ne = new s(j, { method: "POST", body: S, duplex: "half" }),
						Pe;
					if (
						(b.isFormData(S) &&
							(Pe = ne.headers.get("content-type")) &&
							te.setContentType(Pe),
						ne.body)
					) {
						const [Ae, Je] = yn(ae, lr(bn(N)));
						S = jn(ne.body, wn, Ae, Je);
					}
				}
				b.isString(se) || (se = se ? "include" : "omit");
				const K = i && "credentials" in s.prototype,
					ve = {
						...L,
						signal: V,
						method: f.toUpperCase(),
						headers: te.normalize().toJSON(),
						body: S,
						duplex: "half",
						credentials: K ? se : void 0,
					};
				W = i && new s(j, ve);
				let R = await (i ? be(W, L) : be(j, ve));
				const Y = u && (z === "stream" || z === "response");
				if (u && (E || (Y && Q))) {
					const ne = {};
					["status", "statusText", "headers"].forEach((Et) => {
						ne[Et] = R[Et];
					});
					const Pe = b.toFiniteNumber(R.headers.get("content-length")),
						[Ae, Je] = (E && yn(Pe, lr(bn(E), !0))) || [];
					R = new a(
						jn(R.body, wn, Ae, () => {
							(Je && Je(), Q && Q());
						}),
						ne,
					);
				}
				z = z || "text";
				let ge = await m[b.findKey(m, z) || "text"](R, g);
				return (
					!Y && Q && Q(),
					await new Promise((ne, Pe) => {
						Ki(ne, Pe, {
							data: ge,
							headers: $e.from(R.headers),
							status: R.status,
							statusText: R.statusText,
							config: g,
							request: W,
						});
					})
				);
			} catch (K) {
				throw (
					Q && Q(),
					K && K.name === "TypeError" && /Load failed|fetch/i.test(K.message)
						? Object.assign(
								new B("Network Error", B.ERR_NETWORK, g, W, K && K.response),
								{ cause: K.cause || K },
							)
						: B.from(K, K && K.code, g, W, K && K.response)
				);
			}
		};
	},
	Nu = new Map(),
	so = (e) => {
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
so();
const Va = { http: Vd, xhr: gu, fetch: { get: so } };
b.forEach(Va, (e, t) => {
	if (e) {
		try {
			Object.defineProperty(e, "name", { value: t });
		} catch {}
		Object.defineProperty(e, "adapterName", { value: t });
	}
});
const Sn = (e) => `- ${e}`,
	_u = (e) => b.isFunction(e) || e === null || e === !1;
function ku(e, t) {
	e = b.isArray(e) ? e : [e];
	const { length: s } = e;
	let a, n;
	const i = {};
	for (let o = 0; o < s; o++) {
		a = e[o];
		let l;
		if (
			((n = a),
			!_u(a) && ((n = Va[(l = String(a)).toLowerCase()]), n === void 0))
		)
			throw new B(`Unknown adapter '${l}'`);
		if (n && (b.isFunction(n) || (n = n.get(t)))) break;
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
					o.map(Sn).join(`
`)
				: " " + Sn(o[0])
			: "as no adapter specified";
		throw new B(
			"There is no suitable adapter to dispatch the request " + l,
			"ERR_NOT_SUPPORT",
		);
	}
	return n;
}
const ro = { getAdapter: ku, adapters: Va };
function $r(e) {
	if (
		(e.cancelToken && e.cancelToken.throwIfRequested(),
		e.signal && e.signal.aborted)
	)
		throw new Ws(null, e);
}
function En(e) {
	return (
		$r(e),
		(e.headers = $e.from(e.headers)),
		(e.data = Mr.call(e, e.transformRequest)),
		["post", "put", "patch"].indexOf(e.method) !== -1 &&
			e.headers.setContentType("application/x-www-form-urlencoded", !1),
		ro
			.getAdapter(
				e.adapter || Bs.adapter,
				e,
			)(e)
			.then(
				function (a) {
					return (
						$r(e),
						(a.data = Mr.call(e, e.transformResponse, a)),
						(a.headers = $e.from(a.headers)),
						a
					);
				},
				function (a) {
					return (
						Qi(a) ||
							($r(e),
							a &&
								a.response &&
								((a.response.data = Mr.call(
									e,
									e.transformResponse,
									a.response,
								)),
								(a.response.headers = $e.from(a.response.headers)))),
						Promise.reject(a)
					);
				},
			)
	);
}
const ao = "1.13.6",
	Er = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
	(e, t) => {
		Er[e] = function (a) {
			return typeof a === e || "a" + (t < 1 ? "n " : " ") + e;
		};
	},
);
const Cn = {};
Er.transitional = function (t, s, a) {
	function n(i, o) {
		return (
			"[Axios v" +
			ao +
			"] Transitional option '" +
			i +
			"'" +
			o +
			(a ? ". " + a : "")
		);
	}
	return (i, o, l) => {
		if (t === !1)
			throw new B(
				n(o, " has been removed" + (s ? " in " + s : "")),
				B.ERR_DEPRECATED,
			);
		return (
			s &&
				!Cn[o] &&
				((Cn[o] = !0),
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
Er.spelling = function (t) {
	return (s, a) => (console.warn(`${a} is likely a misspelling of ${t}`), !0);
};
function Su(e, t, s) {
	if (typeof e != "object")
		throw new B("options must be an object", B.ERR_BAD_OPTION_VALUE);
	const a = Object.keys(e);
	let n = a.length;
	for (; n-- > 0; ) {
		const i = a[n],
			o = t[i];
		if (o) {
			const l = e[i],
				c = l === void 0 || o(l, i, e);
			if (c !== !0)
				throw new B("option " + i + " must be " + c, B.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (s !== !0) throw new B("Unknown option " + i, B.ERR_BAD_OPTION);
	}
}
const sr = { assertOptions: Su, validators: Er },
	ze = sr.validators;
let Lt = class {
	constructor(t) {
		((this.defaults = t || {}),
			(this.interceptors = { request: new gn(), response: new gn() }));
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
			(s = Vt(this.defaults, s)));
		const { transitional: a, paramsSerializer: n, headers: i } = s;
		(a !== void 0 &&
			sr.assertOptions(
				a,
				{
					silentJSONParsing: ze.transitional(ze.boolean),
					forcedJSONParsing: ze.transitional(ze.boolean),
					clarifyTimeoutError: ze.transitional(ze.boolean),
					legacyInterceptorReqResOrdering: ze.transitional(ze.boolean),
				},
				!1,
			),
			n != null &&
				(b.isFunction(n)
					? (s.paramsSerializer = { serialize: n })
					: sr.assertOptions(
							n,
							{ encode: ze.function, serialize: ze.function },
							!0,
						)),
			s.allowAbsoluteUrls !== void 0 ||
				(this.defaults.allowAbsoluteUrls !== void 0
					? (s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
					: (s.allowAbsoluteUrls = !0)),
			sr.assertOptions(
				s,
				{
					baseUrl: ze.spelling("baseURL"),
					withXsrfToken: ze.spelling("withXSRFToken"),
				},
				!0,
			),
			(s.method = (s.method || this.defaults.method || "get").toLowerCase()));
		let o = i && b.merge(i.common, i[s.method]);
		(i &&
			b.forEach(
				["delete", "get", "head", "post", "put", "patch", "common"],
				(g) => {
					delete i[g];
				},
			),
			(s.headers = $e.concat(o, i)));
		const l = [];
		let c = !0;
		this.interceptors.request.forEach(function (j) {
			if (typeof j.runWhen == "function" && j.runWhen(s) === !1) return;
			c = c && j.synchronous;
			const f = s.transitional || Ma;
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
			const g = [En.bind(this), void 0];
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
			u = En.call(this, p);
		} catch (g) {
			return Promise.reject(g);
		}
		for (m = 0, v = d.length; m < v; ) u = u.then(d[m++], d[m++]);
		return u;
	}
	getUri(t) {
		t = Vt(this.defaults, t);
		const s = eo(t.baseURL, t.url, t.allowAbsoluteUrls);
		return Xi(s, t.params, t.paramsSerializer);
	}
};
b.forEach(["delete", "get", "head", "options"], function (t) {
	Lt.prototype[t] = function (s, a) {
		return this.request(
			Vt(a || {}, { method: t, url: s, data: (a || {}).data }),
		);
	};
});
b.forEach(["post", "put", "patch"], function (t) {
	function s(a) {
		return function (i, o, l) {
			return this.request(
				Vt(l || {}, {
					method: t,
					headers: a ? { "Content-Type": "multipart/form-data" } : {},
					url: i,
					data: o,
				}),
			);
		};
	}
	((Lt.prototype[t] = s()), (Lt.prototype[t + "Form"] = s(!0)));
});
let Eu = class no {
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
				a.reason || ((a.reason = new Ws(i, o, l)), s(a.reason));
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
			token: new no(function (n) {
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
	return b.isObject(e) && e.isAxiosError === !0;
}
const la = {
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
Object.entries(la).forEach(([e, t]) => {
	la[t] = e;
});
function io(e) {
	const t = new Lt(e),
		s = $i(Lt.prototype.request, t);
	return (
		b.extend(s, Lt.prototype, t, { allOwnKeys: !0 }),
		b.extend(s, t, null, { allOwnKeys: !0 }),
		(s.create = function (n) {
			return io(Vt(e, n));
		}),
		s
	);
}
const Ne = io(Bs);
Ne.Axios = Lt;
Ne.CanceledError = Ws;
Ne.CancelToken = Eu;
Ne.isCancel = Qi;
Ne.VERSION = ao;
Ne.toFormData = Sr;
Ne.AxiosError = B;
Ne.Cancel = Ne.CanceledError;
Ne.all = function (t) {
	return Promise.all(t);
};
Ne.spread = Cu;
Ne.isAxiosError = Au;
Ne.mergeConfig = Vt;
Ne.AxiosHeaders = $e;
Ne.formToJSON = (e) => Ji(b.isHTMLForm(e) ? new FormData(e) : e);
Ne.getAdapter = ro.getAdapter;
Ne.HttpStatusCode = la;
Ne.default = Ne;
const {
		Axios: Qg,
		AxiosError: Kg,
		CanceledError: e0,
		isCancel: t0,
		CancelToken: s0,
		VERSION: r0,
		all: a0,
		Cancel: n0,
		isAxiosError: i0,
		spread: o0,
		toFormData: l0,
		AxiosHeaders: c0,
		HttpStatusCode: d0,
		formToJSON: u0,
		getAdapter: m0,
		mergeConfig: h0,
	} = Ne,
	oo = "/api/v1",
	je = Ne.create({
		baseURL: oo,
		headers: { "Content-Type": "application/json" },
		timeout: 15e3,
	});
localStorage.getItem("access_token");
localStorage.getItem("refresh_token");
let Vr = !1,
	ca = [];
const An = (e, t = null) => {
		(ca.forEach((s) => {
			e ? s.reject(e) : s.resolve(t);
		}),
			(ca = []));
	},
	da = (e, t) => {
		(localStorage.setItem("access_token", e),
			localStorage.setItem("refresh_token", t));
	},
	ua = () => {
		(localStorage.removeItem("access_token"),
			localStorage.removeItem("refresh_token"));
	};
je.interceptors.request.use(
	(e) => {
		const t = localStorage.getItem("access_token");
		return (t && (e.headers.Authorization = `Bearer ${t}`), e);
	},
	(e) => Promise.reject(e),
);
je.interceptors.response.use(
	(e) => e,
	async (e) => {
		var s;
		const t = e.config;
		if (((s = e.response) == null ? void 0 : s.status) === 401 && !t._retry) {
			if (Vr)
				return new Promise((n, i) => {
					ca.push({ resolve: n, reject: i });
				})
					.then((n) => ((t.headers.Authorization = `Bearer ${n}`), je(t)))
					.catch((n) => Promise.reject(n));
			((t._retry = !0), (Vr = !0));
			const a = localStorage.getItem("refresh_token");
			if (!a)
				return (ua(), (window.location.href = "/login"), Promise.reject(e));
			try {
				const n = await Ne.post(`${oo}/auth/refresh`, { refresh_token: a }),
					{ access_token: i, refresh_token: o } = n.data;
				return (
					da(i, o),
					An(null, i),
					(t.headers.Authorization = `Bearer ${i}`),
					je(t)
				);
			} catch (n) {
				return (
					An(n, null),
					ua(),
					(window.location.href = "/login"),
					Promise.reject(n)
				);
			} finally {
				Vr = !1;
			}
		}
		return Promise.reject(e);
	},
);
const Ce = Li()(
	Mi(
		(e, t) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: !1,
			isAdmin: !1,
			isApproved: !1,
			login: (s, a, n) => {
				(da(a, n),
					e({
						user: s,
						accessToken: a,
						refreshToken: n,
						isAuthenticated: !0,
						isAdmin: s.role === gt.ADMIN,
						isApproved: s.status === ot.APPROVED || s.role === gt.ADMIN,
					}));
			},
			logout: () => {
				(ua(),
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
					isAdmin: s.role === gt.ADMIN,
					isApproved: s.status === ot.APPROVED || s.role === gt.ADMIN,
				});
			},
			updateTokens: (s, a) => {
				(da(s, a), e({ accessToken: s, refreshToken: a }));
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
					((e.isAdmin = e.user.role === gt.ADMIN),
					(e.isApproved =
						e.user.status === ot.APPROVED || e.user.role === gt.ADMIN));
			},
		},
	),
);
function q(...e) {
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
					className: q(
						"rounded-full border-gray-200 border-t-primary-600 animate-spin",
						Ou[e],
						t,
					),
				}),
				r.jsx("span", { className: "sr-only", children: s }),
			],
		}),
	Gt = () =>
		r.jsx("div", {
			className: "flex items-center justify-center min-h-64",
			children: r.jsx(Tu, { size: "lg" }),
		}),
	Xs = (e) => {
		const t = e.reduce((a, n) => a + n.subtotal, 0),
			s = e.reduce((a, n) => a + n.quantity, 0);
		return { total: t, itemsCount: s };
	},
	bs = Li()(
		Mi(
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
						e({ items: c, ...Xs(c) }));
				},
				removeItem: (s) => {
					const { items: a } = t(),
						n = a.filter((i) => i.product.id !== s);
					e({ items: n, ...Xs(n) });
				},
				updateQuantity: (s, a) => {
					const { items: n } = t();
					if (a <= 0) {
						const o = n.filter((l) => l.product.id !== s);
						e({ items: o, ...Xs(o) });
						return;
					}
					const i = n.map((o) =>
						o.product.id === s
							? { ...o, quantity: a, subtotal: o.price * a }
							: o,
					);
					e({ items: i, ...Xs(i) });
				},
				clearCart: () => {
					e({ items: [], total: 0, itemsCount: 0 });
				},
				getItem: (s) => t().items.find((a) => a.product.id === s),
			}),
			{ name: "agroreserve-cart" },
		),
	),
	On = [
		{ to: "/catalog", label: "Каталог" },
		{ to: "/about", label: "О нас" },
		{ to: "/schools", label: "Для школ" },
		{ to: "/contacts", label: "Контакты" },
	],
	lo = () => {
		const [e, t] = A.useState(!1),
			[s, a] = A.useState(!1),
			{ isAuthenticated: n, isAdmin: i, user: o, logout: l } = Ce(),
			{ itemsCount: c } = bs(),
			d = Zt(),
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
								children: On.map((m) =>
									r.jsx(
										ns,
										{
											to: m.to,
											className: ({ isActive: v }) =>
												q(
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
											r.jsx(is, { className: "w-5 h-5" }),
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
																children: r.jsx(ct, {
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
																				r.jsx(yr, {
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
																				r.jsx(Qr, {
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
																					r.jsx(Qr, { className: "w-4 h-4" }),
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
																					r.jsx(gi, { className: "w-4 h-4" }),
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
											? r.jsx(Aa, { className: "w-5 h-5" })
											: r.jsx(al, { className: "w-5 h-5" }),
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
							children: On.map((m) =>
								r.jsx(
									ns,
									{
										to: m.to,
										onClick: () => t(!1),
										className: ({ isActive: v }) =>
											q(
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
	co = () =>
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
														r.jsx(jt, {
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
														r.jsx(Oa, {
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
														r.jsx(Ms, {
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
													r.jsx(He, {
														className:
															"w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400",
													}),
													"г. Тобольск, Тюменская обл.",
												],
											}),
											r.jsxs("li", {
												className: "flex items-start gap-2.5 text-gray-400",
												children: [
													r.jsx(gs, {
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
		{ to: "/catalog", label: "Каталог", icon: Ta, guestTo: "/quick-order" },
		{ to: "/cart", label: "Корзина", icon: is, badge: !0 },
		{ to: "/account/orders", label: "Заказы", icon: yr, requiresAuth: !0 },
		{ to: "/account/profile", label: "Профиль", icon: ct, requiresAuth: !0 },
	],
	uo = () => {
		const { itemsCount: e } = bs(),
			{ isAuthenticated: t } = Ce();
		return r.jsx("nav", {
			className:
				"fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-gray-200 safe-area-bottom",
			children: r.jsx("div", {
				className: "flex items-stretch",
				children: Ru.map((s) => {
					const a = s.requiresAuth && !t ? "/login" : s.to,
						n = s.icon;
					return r.jsx(
						ns,
						{
							to: a,
							className: ({ isActive: i }) =>
								q(
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
													className: q("w-5 h-5", i && "text-primary-600"),
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
											className: q("font-medium", i && "text-primary-600"),
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
				r.jsx(lo, {}),
				r.jsx("main", {
					className: "flex-1 pb-16 md:pb-0",
					children: r.jsx(Ls, {}),
				}),
				r.jsx(co, {}),
				r.jsx(uo, {}),
			],
		}),
	Tn = [
		{ to: "/account", label: "Обзор", icon: pi, exact: !0 },
		{ to: "/account/orders", label: "Мои заказы", icon: yr },
		{ to: "/account/documents", label: "Документы", icon: wt },
		{ to: "/account/profile", label: "Профиль", icon: ct },
	],
	Du = () => {
		const { user: e, isApproved: t } = Ce();
		return r.jsxs("div", {
			className: "flex flex-col min-h-screen bg-gray-50",
			children: [
				r.jsx(lo, {}),
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
													children: r.jsx(ct, {
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
										children: Tn.map((s, a) => {
											const n = s.icon;
											return r.jsx(
												ns,
												{
													to: s.to,
													end: s.exact,
													className: ({ isActive: i }) =>
														q(
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
																	className: q(
																		"w-4 h-4",
																		i ? "text-primary-600" : "text-gray-400",
																	),
																}),
																r.jsx("span", {
																	className: "flex-1",
																	children: s.label,
																}),
																i &&
																	r.jsx(Te, {
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
								children: r.jsx(Ls, {}),
							}),
						],
					}),
				}),
				r.jsx("div", {
					className: "lg:hidden border-t border-gray-200 bg-white",
					children: r.jsx("div", {
						className: "max-w-7xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto",
						children: Tn.map((s) => {
							const a = s.icon;
							return r.jsxs(
								ns,
								{
									to: s.to,
									end: s.exact,
									className: ({ isActive: n }) =>
										q(
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
				r.jsx(co, {}),
				r.jsx(uo, {}),
			],
		});
	},
	Iu = [
		{ to: "/admin", label: "Сегодня", icon: pi, exact: !0 },
		{ to: "/admin/orders", label: "Заказы", icon: $s },
		{ to: "/admin/catalog", label: "Каталог", icon: Ta },
		{ to: "/admin/stock", label: "Склад", icon: nl },
		{ to: "/admin/clients", label: "Клиенты", icon: bi },
		{ to: "/admin/finance", label: "Финансы", icon: vi },
		{ to: "/admin/certificates", label: "Сертификаты", icon: Os },
		{ to: "/admin/labels", label: "Ярлыки", icon: il },
		{ to: "/admin/documents", label: "Документы", icon: wt },
		{ to: "/admin/settings", label: "Настройки", icon: Qr },
		{ to: "/admin/backups", label: "Бэкапы", icon: ol },
	],
	Fu = [
		{ to: "/admin/suppliers", label: "Поставщики", icon: ps },
		{ to: "/admin/procurement", label: "Закупки", icon: $s },
		{ to: "/admin/batches", label: "Партии", icon: ll },
		{ to: "/admin/write-offs", label: "Списания", icon: Ra },
		{ to: "/admin/contracts", label: "Госконтракты", icon: wt },
		{ to: "/admin/tenders", label: "Тендеры", icon: ji },
		{ to: "/admin/analytics", label: "Аналитика", icon: vi },
		{ to: "/admin/crm", label: "CRM", icon: bi },
		{ to: "/admin/reminders", label: "Напоминания", icon: Kr },
		{ to: "/admin/calendar", label: "Календарь", icon: cl },
		{ to: "/admin/logistics", label: "Маршруты", icon: dl },
		{ to: "/admin/price-log", label: "Цены закупок", icon: ul },
	],
	Lu = ({ collapsed: e, onToggle: t }) => {
		const [s, a] = A.useState(!1),
			n = e !== void 0 ? e : s,
			{ logout: i, user: o } = Ce(),
			l = Zt(),
			c = () => {
				t ? t() : a(!s);
			},
			d = () => {
				(i(), l("/"));
			},
			u = (m) => {
				const v = m.icon;
				return r.jsxs(
					ns,
					{
						to: m.to,
						end: m.exact,
						className: ({ isActive: p }) =>
							q(
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
			className: q(
				"h-screen bg-gray-900 text-gray-300 flex flex-col flex-shrink-0",
				"transition-all duration-300 ease-in-out",
				n ? "w-16" : "w-60",
			),
			children: [
				r.jsxs("div", {
					className: q(
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
								? r.jsx(Te, { className: "w-4 h-4" })
								: r.jsx(yi, { className: "w-4 h-4" }),
						}),
					],
				}),
				r.jsxs("nav", {
					className: "flex-1 overflow-y-auto py-4 px-2 space-y-0.5",
					children: [
						Iu.map(u),
						r.jsx("div", {
							className: q("pt-3 pb-1", "px-1"),
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
							className: q(
								"flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors",
							),
							title: n ? "Сайт" : void 0,
							children: [
								r.jsx(ml, { className: "w-5 h-5 flex-shrink-0" }),
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
							className: q(
								"w-full flex items-center gap-3 px-2.5 py-2 rounded-lg",
								"text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors",
							),
							title: n ? "Выйти" : void 0,
							children: [
								r.jsx(gi, { className: "w-5 h-5 flex-shrink-0" }),
								!n && r.jsx("span", { children: "Выйти" }),
							],
						}),
					],
				}),
			],
		});
	},
	Mu = () => {
		const [e, t] = A.useState(!1);
		return r.jsxs("div", {
			className: "flex h-screen bg-gray-100 overflow-hidden",
			children: [
				r.jsx(Lu, { collapsed: e, onToggle: () => t(!e) }),
				r.jsx("div", {
					className: "flex-1 flex flex-col overflow-hidden",
					children: r.jsx("main", {
						className: "flex-1 overflow-y-auto",
						children: r.jsx(Ls, {}),
					}),
				}),
			],
		});
	},
	Ss = "Агрорезерв",
	mo =
		"Оптовые поставки овощей и фруктов из Узбекистана в Тобольск. Цены на 20-35% ниже рынка.",
	cs = "https://agroreserve.ru",
	qa = ({
		title: e,
		description: t = mo,
		canonical: s,
		ogImage: a,
		ogType: n = "website",
		schema: i,
	}) => (
		A.useEffect(
			() => (
				(document.title = e
					? `${e} — ${Ss}`
					: `${Ss} — оптовые овощи и фрукты из Узбекистана`),
				Tt("description", t),
				Tt("og:title", e || Ss, "property"),
				Tt("og:description", t, "property"),
				Tt("og:type", n, "property"),
				Tt("og:site_name", Ss, "property"),
				s &&
					(Tt("og:url", `${cs}${s}`, "property"), $u("canonical", `${cs}${s}`)),
				a && Tt("og:image", a, "property"),
				i && Vu(i),
				() => {
					var o;
					(o = document.getElementById("seo-jsonld")) == null || o.remove();
				}
			),
			[e, t, s, a, n, i],
		),
		null
	);
function Tt(e, t, s = "name") {
	let a = document.querySelector(`meta[${s}="${e}"]`);
	(a ||
		((a = document.createElement("meta")),
		a.setAttribute(s, e),
		document.head.appendChild(a)),
		(a.content = t));
}
function $u(e, t) {
	let s = document.querySelector(`link[rel="${e}"]`);
	(s ||
		((s = document.createElement("link")),
		(s.rel = e),
		document.head.appendChild(s)),
		(s.href = t));
}
function Vu(e) {
	let t = document.getElementById("seo-jsonld");
	(t ||
		((t = document.createElement("script")),
		(t.id = "seo-jsonld"),
		(t.type = "application/ld+json"),
		document.head.appendChild(t)),
		(t.textContent = JSON.stringify(e)));
}
const qu = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Агрорезерв",
		legalName: "ИП Наимов Хусейн Вохиджонович",
		url: cs,
		description: mo,
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
		name: Ss,
		url: cs,
		potentialAction: {
			"@type": "SearchAction",
			target: `${cs}/catalog?search={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	};
function zu(e) {
	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: e.name,
		description: e.description || e.name,
		url: `${cs}/catalog/${e.category_slug || "_"}/${e.slug}`,
		image: e.image || void 0,
		offers: {
			"@type": "Offer",
			priceCurrency: "RUB",
			price: e.price,
			availability:
				(e.stock_qty ?? 0) > 0
					? "https://schema.org/InStock"
					: "https://schema.org/OutOfStock",
			seller: { "@type": "Organization", name: "Агрорезерв" },
		},
	};
}
const Ua = async () => (await je.get("/catalog/categories")).data,
	ho = async (e) => (await je.get("/catalog/products", { params: e })).data,
	Bu = async (e) => (await je.get(`/catalog/products/${e}`)).data,
	Wu = async (e) =>
		(await je.get("/catalog/products/" + e + "/certificates")).data,
	Hu = async (e, t) =>
		(await je.post(`/catalog/products/${e}/notify`, { email: t })).data,
	Zu = {
		ovoshchi: "🥕",
		frukty: "🍎",
		sukhofruktyi: "🍇",
		orekhyi: "🥜",
		spetsii: "🌶️",
		myod: "🍯",
		masla: "🫒",
	},
	Gu = [
		{
			icon: wi,
			iconColor: "text-green-600",
			bgColor: "bg-green-50",
			title: "Цены на 20–35% ниже",
			description:
				"Прямые поставки, без посредников. Семейные связи с фермерами.",
		},
		{
			icon: ps,
			iconColor: "text-blue-600",
			bgColor: "bg-blue-50",
			title: "Бесплатная доставка",
			description:
				"Развозим по Тобольску и пригороду на собственной газели. Без доплат.",
		},
		{
			icon: Pa,
			iconColor: "text-purple-600",
			bgColor: "bg-purple-50",
			title: "Документы для 44-ФЗ",
			description:
				"Полный пакет: ТОРГ-12, счёт-фактура, сертификаты ТР ТС, декларации соответствия.",
		},
		{
			icon: rr,
			iconColor: "text-primary-600",
			bgColor: "bg-primary-50",
			title: "Свежесть гарантируем",
			description:
				"Поставки каждые 2 недели. Хранение в 3-зонном складе: +15°C, +2–6°C, сухая зона.",
		},
	],
	Rn = [
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
	Yu = [
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
	Xu = () => {
		const { isAuthenticated: e } = Ce(),
			{ data: t } = We({ queryKey: ["categories"], queryFn: Ua });
		return r.jsxs(r.Fragment, {
			children: [
				r.jsx(qa, {
					title: "Свежие овощи и фрукты оптом из Узбекистана",
					description:
						"Агрорезерв — прямые поставки овощей и фруктов из Узбекистана в Тобольск. Цены на 20-35% ниже рынка. Документы для 44-ФЗ.",
					canonical: "/",
					schema: { ...qu, ...Uu },
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
															r.jsx($s, { className: "w-5 h-5" }),
															"Перейти в каталог",
														],
													}),
													r.jsxs(H, {
														to: "/schools",
														className:
															"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-colors",
														children: [
															r.jsx(Pa, { className: "w-5 h-5" }),
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
										children: Gu.map((s, a) => {
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
													r.jsx(Te, { className: "w-4 h-4" }),
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
																children: Zu[s.slug] || "🌿",
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
										children: Rn.map((s, a) =>
											r.jsxs(
												"div",
												{
													className: "relative text-center",
													children: [
														a < Rn.length - 1 &&
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
												r.jsx(Te, { className: "w-5 h-5" }),
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
										children: Yu.map((s, a) =>
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
																	r.jsx($t, {
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
													r.jsx(Te, { className: "w-5 h-5" }),
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
														children: r.jsx(jt, {
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
														children: r.jsx(Oa, {
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
														children: r.jsx(He, {
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
														children: r.jsx(gs, {
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
function Ze(e) {
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
function Nt(e, t) {
	return e instanceof Date ? new e.constructor(t) : new Date(t);
}
function za(e, t) {
	const s = Ze(e);
	return isNaN(t) ? Nt(e, NaN) : (t && s.setDate(s.getDate() + t), s);
}
const fo = 6048e5,
	Ju = 864e5,
	xo = 6e4,
	go = 36e5;
let Qu = {};
function Cr() {
	return Qu;
}
function qt(e, t) {
	var l, c, d, u;
	const s = Cr(),
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
		n = Ze(e),
		i = n.getDay(),
		o = (i < a ? 7 : 0) + i - a;
	return (n.setDate(n.getDate() - o), n.setHours(0, 0, 0, 0), n);
}
function cr(e) {
	return qt(e, { weekStartsOn: 1 });
}
function po(e) {
	const t = Ze(e),
		s = t.getFullYear(),
		a = Nt(e, 0);
	(a.setFullYear(s + 1, 0, 4), a.setHours(0, 0, 0, 0));
	const n = cr(a),
		i = Nt(e, 0);
	(i.setFullYear(s, 0, 4), i.setHours(0, 0, 0, 0));
	const o = cr(i);
	return t.getTime() >= n.getTime()
		? s + 1
		: t.getTime() >= o.getTime()
			? s
			: s - 1;
}
function Pn(e) {
	const t = Ze(e);
	return (t.setHours(0, 0, 0, 0), t);
}
function Dn(e) {
	const t = Ze(e),
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
function Ku(e, t) {
	const s = Pn(e),
		a = Pn(t),
		n = +s - Dn(s),
		i = +a - Dn(a);
	return Math.round((n - i) / Ju);
}
function em(e) {
	const t = po(e),
		s = Nt(e, 0);
	return (s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0), cr(s));
}
function tm(e) {
	return (
		e instanceof Date ||
		(typeof e == "object" &&
			Object.prototype.toString.call(e) === "[object Date]")
	);
}
function sm(e) {
	if (!tm(e) && typeof e != "number") return !1;
	const t = Ze(e);
	return !isNaN(Number(t));
}
function rm(e) {
	const t = Ze(e),
		s = Nt(e, 0);
	return (s.setFullYear(t.getFullYear(), 0, 1), s.setHours(0, 0, 0, 0), s);
}
const am = {
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
	nm = (e, t, s) => {
		let a;
		const n = am[e];
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
function rs(e) {
	return (t = {}) => {
		const s = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[s] || e.formats[e.defaultWidth];
	};
}
const im = {
		full: "EEEE, MMMM do, y",
		long: "MMMM do, y",
		medium: "MMM d, y",
		short: "MM/dd/yyyy",
	},
	om = {
		full: "h:mm:ss a zzzz",
		long: "h:mm:ss a z",
		medium: "h:mm:ss a",
		short: "h:mm a",
	},
	lm = {
		full: "{{date}} 'at' {{time}}",
		long: "{{date}} 'at' {{time}}",
		medium: "{{date}}, {{time}}",
		short: "{{date}}, {{time}}",
	},
	cm = {
		date: rs({ formats: im, defaultWidth: "full" }),
		time: rs({ formats: om, defaultWidth: "full" }),
		dateTime: rs({ formats: lm, defaultWidth: "full" }),
	},
	dm = {
		lastWeek: "'last' eeee 'at' p",
		yesterday: "'yesterday at' p",
		today: "'today at' p",
		tomorrow: "'tomorrow at' p",
		nextWeek: "eeee 'at' p",
		other: "P",
	},
	um = (e, t, s, a) => dm[e];
function et(e) {
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
const mm = {
		narrow: ["B", "A"],
		abbreviated: ["BC", "AD"],
		wide: ["Before Christ", "Anno Domini"],
	},
	hm = {
		narrow: ["1", "2", "3", "4"],
		abbreviated: ["Q1", "Q2", "Q3", "Q4"],
		wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
	},
	fm = {
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
	xm = {
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
	gm = {
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
	pm = {
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
	ym = (e, t) => {
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
	bm = {
		ordinalNumber: ym,
		era: et({ values: mm, defaultWidth: "wide" }),
		quarter: et({
			values: hm,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1,
		}),
		month: et({ values: fm, defaultWidth: "wide" }),
		day: et({ values: xm, defaultWidth: "wide" }),
		dayPeriod: et({
			values: gm,
			defaultWidth: "wide",
			formattingValues: pm,
			defaultFormattingWidth: "wide",
		}),
	};
function tt(e) {
	return (t, s = {}) => {
		const a = s.width,
			n = (a && e.matchPatterns[a]) || e.matchPatterns[e.defaultMatchWidth],
			i = t.match(n);
		if (!i) return null;
		const o = i[0],
			l = (a && e.parsePatterns[a]) || e.parsePatterns[e.defaultParseWidth],
			c = Array.isArray(l) ? jm(l, (m) => m.test(o)) : vm(l, (m) => m.test(o));
		let d;
		((d = e.valueCallback ? e.valueCallback(c) : c),
			(d = s.valueCallback ? s.valueCallback(d) : d));
		const u = t.slice(o.length);
		return { value: d, rest: u };
	};
}
function vm(e, t) {
	for (const s in e)
		if (Object.prototype.hasOwnProperty.call(e, s) && t(e[s])) return s;
}
function jm(e, t) {
	for (let s = 0; s < e.length; s++) if (t(e[s])) return s;
}
function yo(e) {
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
const wm = /^(\d+)(th|st|nd|rd)?/i,
	Nm = /\d+/i,
	_m = {
		narrow: /^(b|a)/i,
		abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
		wide: /^(before christ|before common era|anno domini|common era)/i,
	},
	km = { any: [/^b/i, /^(a|c)/i] },
	Sm = {
		narrow: /^[1234]/i,
		abbreviated: /^q[1234]/i,
		wide: /^[1234](th|st|nd|rd)? quarter/i,
	},
	Em = { any: [/1/i, /2/i, /3/i, /4/i] },
	Cm = {
		narrow: /^[jfmasond]/i,
		abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
		wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
	},
	Am = {
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
	Om = {
		narrow: /^[smtwf]/i,
		short: /^(su|mo|tu|we|th|fr|sa)/i,
		abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
		wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
	},
	Tm = {
		narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
		any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
	},
	Rm = {
		narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
		any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
	},
	Pm = {
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
	Dm = {
		ordinalNumber: yo({
			matchPattern: wm,
			parsePattern: Nm,
			valueCallback: (e) => parseInt(e, 10),
		}),
		era: tt({
			matchPatterns: _m,
			defaultMatchWidth: "wide",
			parsePatterns: km,
			defaultParseWidth: "any",
		}),
		quarter: tt({
			matchPatterns: Sm,
			defaultMatchWidth: "wide",
			parsePatterns: Em,
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1,
		}),
		month: tt({
			matchPatterns: Cm,
			defaultMatchWidth: "wide",
			parsePatterns: Am,
			defaultParseWidth: "any",
		}),
		day: tt({
			matchPatterns: Om,
			defaultMatchWidth: "wide",
			parsePatterns: Tm,
			defaultParseWidth: "any",
		}),
		dayPeriod: tt({
			matchPatterns: Rm,
			defaultMatchWidth: "any",
			parsePatterns: Pm,
			defaultParseWidth: "any",
		}),
	},
	Im = {
		code: "en-US",
		formatDistance: nm,
		formatLong: cm,
		formatRelative: um,
		localize: bm,
		match: Dm,
		options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
	};
function Fm(e) {
	const t = Ze(e);
	return Ku(t, rm(t)) + 1;
}
function Lm(e) {
	const t = Ze(e),
		s = +cr(t) - +em(t);
	return Math.round(s / fo) + 1;
}
function bo(e, t) {
	var u, m, v, p;
	const s = Ze(e),
		a = s.getFullYear(),
		n = Cr(),
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
		o = Nt(e, 0);
	(o.setFullYear(a + 1, 0, i), o.setHours(0, 0, 0, 0));
	const l = qt(o, t),
		c = Nt(e, 0);
	(c.setFullYear(a, 0, i), c.setHours(0, 0, 0, 0));
	const d = qt(c, t);
	return s.getTime() >= l.getTime()
		? a + 1
		: s.getTime() >= d.getTime()
			? a
			: a - 1;
}
function Mm(e, t) {
	var l, c, d, u;
	const s = Cr(),
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
		n = bo(e, t),
		i = Nt(e, 0);
	return (i.setFullYear(n, 0, a), i.setHours(0, 0, 0, 0), qt(i, t));
}
function $m(e, t) {
	const s = Ze(e),
		a = +qt(s, t) - +Mm(s, t);
	return Math.round(a / fo) + 1;
}
function ue(e, t) {
	const s = e < 0 ? "-" : "",
		a = Math.abs(e).toString().padStart(t, "0");
	return s + a;
}
const ft = {
		y(e, t) {
			const s = e.getFullYear(),
				a = s > 0 ? s : 1 - s;
			return ue(t === "yy" ? a % 100 : a, t.length);
		},
		M(e, t) {
			const s = e.getMonth();
			return t === "M" ? String(s + 1) : ue(s + 1, 2);
		},
		d(e, t) {
			return ue(e.getDate(), t.length);
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
			return ue(e.getHours() % 12 || 12, t.length);
		},
		H(e, t) {
			return ue(e.getHours(), t.length);
		},
		m(e, t) {
			return ue(e.getMinutes(), t.length);
		},
		s(e, t) {
			return ue(e.getSeconds(), t.length);
		},
		S(e, t) {
			const s = t.length,
				a = e.getMilliseconds(),
				n = Math.trunc(a * Math.pow(10, s - 3));
			return ue(n, t.length);
		},
	},
	Jt = {
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night",
	},
	In = {
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
			return ft.y(e, t);
		},
		Y: function (e, t, s, a) {
			const n = bo(e, a),
				i = n > 0 ? n : 1 - n;
			if (t === "YY") {
				const o = i % 100;
				return ue(o, 2);
			}
			return t === "Yo"
				? s.ordinalNumber(i, { unit: "year" })
				: ue(i, t.length);
		},
		R: function (e, t) {
			const s = po(e);
			return ue(s, t.length);
		},
		u: function (e, t) {
			const s = e.getFullYear();
			return ue(s, t.length);
		},
		Q: function (e, t, s) {
			const a = Math.ceil((e.getMonth() + 1) / 3);
			switch (t) {
				case "Q":
					return String(a);
				case "QQ":
					return ue(a, 2);
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
					return ue(a, 2);
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
					return ft.M(e, t);
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
					return ue(a + 1, 2);
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
			const n = $m(e, a);
			return t === "wo"
				? s.ordinalNumber(n, { unit: "week" })
				: ue(n, t.length);
		},
		I: function (e, t, s) {
			const a = Lm(e);
			return t === "Io"
				? s.ordinalNumber(a, { unit: "week" })
				: ue(a, t.length);
		},
		d: function (e, t, s) {
			return t === "do"
				? s.ordinalNumber(e.getDate(), { unit: "date" })
				: ft.d(e, t);
		},
		D: function (e, t, s) {
			const a = Fm(e);
			return t === "Do"
				? s.ordinalNumber(a, { unit: "dayOfYear" })
				: ue(a, t.length);
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
					return ue(i, 2);
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
					return ue(i, t.length);
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
					return ue(n, t.length);
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
					? (n = Jt.noon)
					: a === 0
						? (n = Jt.midnight)
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
					? (n = Jt.evening)
					: a >= 12
						? (n = Jt.afternoon)
						: a >= 4
							? (n = Jt.morning)
							: (n = Jt.night),
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
			return ft.h(e, t);
		},
		H: function (e, t, s) {
			return t === "Ho"
				? s.ordinalNumber(e.getHours(), { unit: "hour" })
				: ft.H(e, t);
		},
		K: function (e, t, s) {
			const a = e.getHours() % 12;
			return t === "Ko"
				? s.ordinalNumber(a, { unit: "hour" })
				: ue(a, t.length);
		},
		k: function (e, t, s) {
			let a = e.getHours();
			return (
				a === 0 && (a = 24),
				t === "ko" ? s.ordinalNumber(a, { unit: "hour" }) : ue(a, t.length)
			);
		},
		m: function (e, t, s) {
			return t === "mo"
				? s.ordinalNumber(e.getMinutes(), { unit: "minute" })
				: ft.m(e, t);
		},
		s: function (e, t, s) {
			return t === "so"
				? s.ordinalNumber(e.getSeconds(), { unit: "second" })
				: ft.s(e, t);
		},
		S: function (e, t) {
			return ft.S(e, t);
		},
		X: function (e, t, s) {
			const a = e.getTimezoneOffset();
			if (a === 0) return "Z";
			switch (t) {
				case "X":
					return Ln(a);
				case "XXXX":
				case "XX":
					return Pt(a);
				case "XXXXX":
				case "XXX":
				default:
					return Pt(a, ":");
			}
		},
		x: function (e, t, s) {
			const a = e.getTimezoneOffset();
			switch (t) {
				case "x":
					return Ln(a);
				case "xxxx":
				case "xx":
					return Pt(a);
				case "xxxxx":
				case "xxx":
				default:
					return Pt(a, ":");
			}
		},
		O: function (e, t, s) {
			const a = e.getTimezoneOffset();
			switch (t) {
				case "O":
				case "OO":
				case "OOO":
					return "GMT" + Fn(a, ":");
				case "OOOO":
				default:
					return "GMT" + Pt(a, ":");
			}
		},
		z: function (e, t, s) {
			const a = e.getTimezoneOffset();
			switch (t) {
				case "z":
				case "zz":
				case "zzz":
					return "GMT" + Fn(a, ":");
				case "zzzz":
				default:
					return "GMT" + Pt(a, ":");
			}
		},
		t: function (e, t, s) {
			const a = Math.trunc(e.getTime() / 1e3);
			return ue(a, t.length);
		},
		T: function (e, t, s) {
			const a = e.getTime();
			return ue(a, t.length);
		},
	};
function Fn(e, t = "") {
	const s = e > 0 ? "-" : "+",
		a = Math.abs(e),
		n = Math.trunc(a / 60),
		i = a % 60;
	return i === 0 ? s + String(n) : s + String(n) + t + ue(i, 2);
}
function Ln(e, t) {
	return e % 60 === 0
		? (e > 0 ? "-" : "+") + ue(Math.abs(e) / 60, 2)
		: Pt(e, t);
}
function Pt(e, t = "") {
	const s = e > 0 ? "-" : "+",
		a = Math.abs(e),
		n = ue(Math.trunc(a / 60), 2),
		i = ue(a % 60, 2);
	return s + n + t + i;
}
const Mn = (e, t) => {
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
	vo = (e, t) => {
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
	Vm = (e, t) => {
		const s = e.match(/(P+)(p+)?/) || [],
			a = s[1],
			n = s[2];
		if (!n) return Mn(e, t);
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
		return i.replace("{{date}}", Mn(a, t)).replace("{{time}}", vo(n, t));
	},
	qm = { p: vo, P: Vm },
	Um = /^D+$/,
	zm = /^Y+$/,
	Bm = ["D", "DD", "YY", "YYYY"];
function Wm(e) {
	return Um.test(e);
}
function Hm(e) {
	return zm.test(e);
}
function Zm(e, t, s) {
	const a = Gm(e, t, s);
	if ((console.warn(a), Bm.includes(e))) throw new RangeError(a);
}
function Gm(e, t, s) {
	const a = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${s}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ym = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
	Xm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
	Jm = /^'([^]*?)'?$/,
	Qm = /''/g,
	Km = /[a-zA-Z]/;
function vs(e, t, s) {
	var u, m, v, p, g, j, f, S;
	const a = Cr(),
		n = (s == null ? void 0 : s.locale) ?? a.locale ?? Im,
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
			((S = (f = a.locale) == null ? void 0 : f.options) == null
				? void 0
				: S.weekStartsOn) ??
			0,
		l = Ze(e);
	if (!sm(l)) throw new RangeError("Invalid time value");
	let c = t
		.match(Xm)
		.map((y) => {
			const k = y[0];
			if (k === "p" || k === "P") {
				const _ = qm[k];
				return _(y, n.formatLong);
			}
			return y;
		})
		.join("")
		.match(Ym)
		.map((y) => {
			if (y === "''") return { isToken: !1, value: "'" };
			const k = y[0];
			if (k === "'") return { isToken: !1, value: eh(y) };
			if (In[k]) return { isToken: !0, value: y };
			if (k.match(Km))
				throw new RangeError(
					"Format string contains an unescaped latin alphabet character `" +
						k +
						"`",
				);
			return { isToken: !1, value: y };
		});
	n.localize.preprocessor && (c = n.localize.preprocessor(l, c));
	const d = { firstWeekContainsDate: i, weekStartsOn: o, locale: n };
	return c
		.map((y) => {
			if (!y.isToken) return y.value;
			const k = y.value;
			((!(s != null && s.useAdditionalWeekYearTokens) && Hm(k)) ||
				(!(s != null && s.useAdditionalDayOfYearTokens) && Wm(k))) &&
				Zm(k, t, String(e));
			const _ = In[k[0]];
			return _(l, k, n.localize, d);
		})
		.join("");
}
function eh(e) {
	const t = e.match(Jm);
	return t ? t[1].replace(Qm, "'") : e;
}
function $n(e, t, s) {
	const a = qt(e, s),
		n = qt(t, s);
	return +a == +n;
}
function jo(e, t) {
	const a = ah(e);
	let n;
	if (a.date) {
		const c = nh(a.date, 2);
		n = ih(c.restDateString, c.year);
	}
	if (!n || isNaN(n.getTime())) return new Date(NaN);
	const i = n.getTime();
	let o = 0,
		l;
	if (a.time && ((o = oh(a.time)), isNaN(o))) return new Date(NaN);
	if (a.timezone) {
		if (((l = lh(a.timezone)), isNaN(l))) return new Date(NaN);
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
const Js = {
		dateTimeDelimiter: /[T ]/,
		timeZoneDelimiter: /[Z ]/i,
		timezone: /([Z+-].*)$/,
	},
	th = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
	sh =
		/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
	rh = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function ah(e) {
	const t = {},
		s = e.split(Js.dateTimeDelimiter);
	let a;
	if (s.length > 2) return t;
	if (
		(/:/.test(s[0])
			? (a = s[0])
			: ((t.date = s[0]),
				(a = s[1]),
				Js.timeZoneDelimiter.test(t.date) &&
					((t.date = e.split(Js.timeZoneDelimiter)[0]),
					(a = e.substr(t.date.length, e.length)))),
		a)
	) {
		const n = Js.timezone.exec(a);
		n ? ((t.time = a.replace(n[1], "")), (t.timezone = n[1])) : (t.time = a);
	}
	return t;
}
function nh(e, t) {
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
function ih(e, t) {
	if (t === null) return new Date(NaN);
	const s = e.match(th);
	if (!s) return new Date(NaN);
	const a = !!s[4],
		n = Ns(s[1]),
		i = Ns(s[2]) - 1,
		o = Ns(s[3]),
		l = Ns(s[4]),
		c = Ns(s[5]) - 1;
	if (a) return hh(t, l, c) ? ch(t, l, c) : new Date(NaN);
	{
		const d = new Date(0);
		return !uh(t, i, o) || !mh(t, n)
			? new Date(NaN)
			: (d.setUTCFullYear(t, i, Math.max(n, o)), d);
	}
}
function Ns(e) {
	return e ? parseInt(e) : 1;
}
function oh(e) {
	const t = e.match(sh);
	if (!t) return NaN;
	const s = qr(t[1]),
		a = qr(t[2]),
		n = qr(t[3]);
	return fh(s, a, n) ? s * go + a * xo + n * 1e3 : NaN;
}
function qr(e) {
	return (e && parseFloat(e.replace(",", "."))) || 0;
}
function lh(e) {
	if (e === "Z") return 0;
	const t = e.match(rh);
	if (!t) return 0;
	const s = t[1] === "+" ? -1 : 1,
		a = parseInt(t[2]),
		n = (t[3] && parseInt(t[3])) || 0;
	return xh(a, n) ? s * (a * go + n * xo) : NaN;
}
function ch(e, t, s) {
	const a = new Date(0);
	a.setUTCFullYear(e, 0, 4);
	const n = a.getUTCDay() || 7,
		i = (t - 1) * 7 + s + 1 - n;
	return (a.setUTCDate(a.getUTCDate() + i), a);
}
const dh = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function wo(e) {
	return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function uh(e, t, s) {
	return t >= 0 && t <= 11 && s >= 1 && s <= (dh[t] || (wo(e) ? 29 : 28));
}
function mh(e, t) {
	return t >= 1 && t <= (wo(e) ? 366 : 365);
}
function hh(e, t, s) {
	return t >= 1 && t <= 53 && s >= 0 && s <= 6;
}
function fh(e, t, s) {
	return e === 24
		? t === 0 && s === 0
		: s >= 0 && s < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function xh(e, t) {
	return t >= 0 && t <= 59;
}
function _s(e, t) {
	if (e.one !== void 0 && t === 1) return e.one;
	const s = t % 10,
		a = t % 100;
	return s === 1 && a !== 11
		? e.singularNominative.replace("{{count}}", String(t))
		: s >= 2 && s <= 4 && (a < 10 || a > 20)
			? e.singularGenitive.replace("{{count}}", String(t))
			: e.pluralGenitive.replace("{{count}}", String(t));
}
function Ie(e) {
	return (t, s) =>
		s != null && s.addSuffix
			? s.comparison && s.comparison > 0
				? e.future
					? _s(e.future, t)
					: "через " + _s(e.regular, t)
				: e.past
					? _s(e.past, t)
					: _s(e.regular, t) + " назад"
			: _s(e.regular, t);
}
const gh = {
		lessThanXSeconds: Ie({
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
		xSeconds: Ie({
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
		lessThanXMinutes: Ie({
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
		xMinutes: Ie({
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
		aboutXHours: Ie({
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
		xHours: Ie({
			regular: {
				singularNominative: "{{count}} час",
				singularGenitive: "{{count}} часа",
				pluralGenitive: "{{count}} часов",
			},
		}),
		xDays: Ie({
			regular: {
				singularNominative: "{{count}} день",
				singularGenitive: "{{count}} дня",
				pluralGenitive: "{{count}} дней",
			},
		}),
		aboutXWeeks: Ie({
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
		xWeeks: Ie({
			regular: {
				singularNominative: "{{count}} неделя",
				singularGenitive: "{{count}} недели",
				pluralGenitive: "{{count}} недель",
			},
		}),
		aboutXMonths: Ie({
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
		xMonths: Ie({
			regular: {
				singularNominative: "{{count}} месяц",
				singularGenitive: "{{count}} месяца",
				pluralGenitive: "{{count}} месяцев",
			},
		}),
		aboutXYears: Ie({
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
		xYears: Ie({
			regular: {
				singularNominative: "{{count}} год",
				singularGenitive: "{{count}} года",
				pluralGenitive: "{{count}} лет",
			},
		}),
		overXYears: Ie({
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
		almostXYears: Ie({
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
	ph = (e, t, s) => gh[e](t, s),
	yh = {
		full: "EEEE, d MMMM y 'г.'",
		long: "d MMMM y 'г.'",
		medium: "d MMM y 'г.'",
		short: "dd.MM.y",
	},
	bh = {
		full: "H:mm:ss zzzz",
		long: "H:mm:ss z",
		medium: "H:mm:ss",
		short: "H:mm",
	},
	vh = { any: "{{date}}, {{time}}" },
	jh = {
		date: rs({ formats: yh, defaultWidth: "full" }),
		time: rs({ formats: bh, defaultWidth: "full" }),
		dateTime: rs({ formats: vh, defaultWidth: "any" }),
	},
	Ba = [
		"воскресенье",
		"понедельник",
		"вторник",
		"среду",
		"четверг",
		"пятницу",
		"субботу",
	];
function wh(e) {
	const t = Ba[e];
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
function Vn(e) {
	const t = Ba[e];
	return e === 2 ? "'во " + t + " в' p" : "'в " + t + " в' p";
}
function Nh(e) {
	const t = Ba[e];
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
const _h = {
		lastWeek: (e, t, s) => {
			const a = e.getDay();
			return $n(e, t, s) ? Vn(a) : wh(a);
		},
		yesterday: "'вчера в' p",
		today: "'сегодня в' p",
		tomorrow: "'завтра в' p",
		nextWeek: (e, t, s) => {
			const a = e.getDay();
			return $n(e, t, s) ? Vn(a) : Nh(a);
		},
		other: "P",
	},
	kh = (e, t, s, a) => {
		const n = _h[e];
		return typeof n == "function" ? n(t, s, a) : n;
	},
	Sh = {
		narrow: ["до н.э.", "н.э."],
		abbreviated: ["до н. э.", "н. э."],
		wide: ["до нашей эры", "нашей эры"],
	},
	Eh = {
		narrow: ["1", "2", "3", "4"],
		abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
		wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"],
	},
	Ch = {
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
	Ah = {
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
	Oh = {
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
	Th = {
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
	Rh = {
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
	Ph = (e, t) => {
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
	Dh = {
		ordinalNumber: Ph,
		era: et({ values: Sh, defaultWidth: "wide" }),
		quarter: et({
			values: Eh,
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1,
		}),
		month: et({
			values: Ch,
			defaultWidth: "wide",
			formattingValues: Ah,
			defaultFormattingWidth: "wide",
		}),
		day: et({ values: Oh, defaultWidth: "wide" }),
		dayPeriod: et({
			values: Th,
			defaultWidth: "any",
			formattingValues: Rh,
			defaultFormattingWidth: "wide",
		}),
	},
	Ih = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i,
	Fh = /\d+/i,
	Lh = {
		narrow: /^((до )?н\.?\s?э\.?)/i,
		abbreviated: /^((до )?н\.?\s?э\.?)/i,
		wide: /^(до нашей эры|нашей эры|наша эра)/i,
	},
	Mh = { any: [/^д/i, /^н/i] },
	$h = {
		narrow: /^[1234]/i,
		abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
		wide: /^[1234](-?[ыои]?й?)? квартал/i,
	},
	Vh = { any: [/1/i, /2/i, /3/i, /4/i] },
	qh = {
		narrow: /^[яфмаисонд]/i,
		abbreviated:
			/^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
		wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i,
	},
	Uh = {
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
	zh = {
		narrow: /^[впсч]/i,
		short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
		abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
		wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i,
	},
	Bh = {
		narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
		any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i],
	},
	Wh = {
		narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
		abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
		wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i,
	},
	Hh = {
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
	Zh = {
		ordinalNumber: yo({
			matchPattern: Ih,
			parsePattern: Fh,
			valueCallback: (e) => parseInt(e, 10),
		}),
		era: tt({
			matchPatterns: Lh,
			defaultMatchWidth: "wide",
			parsePatterns: Mh,
			defaultParseWidth: "any",
		}),
		quarter: tt({
			matchPatterns: $h,
			defaultMatchWidth: "wide",
			parsePatterns: Vh,
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1,
		}),
		month: tt({
			matchPatterns: qh,
			defaultMatchWidth: "wide",
			parsePatterns: Uh,
			defaultParseWidth: "any",
		}),
		day: tt({
			matchPatterns: zh,
			defaultMatchWidth: "wide",
			parsePatterns: Bh,
			defaultParseWidth: "any",
		}),
		dayPeriod: tt({
			matchPatterns: Wh,
			defaultMatchWidth: "wide",
			parsePatterns: Hh,
			defaultParseWidth: "any",
		}),
	},
	No = {
		code: "ru",
		formatDistance: ph,
		formatLong: jh,
		formatRelative: kh,
		localize: Dh,
		match: Zh,
		options: { weekStartsOn: 1, firstWeekContainsDate: 1 },
	},
	X = (e) =>
		new Intl.NumberFormat("ru-RU", {
			style: "currency",
			currency: "RUB",
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(e),
	Gh = (e, t = 0) =>
		new Intl.NumberFormat("ru-RU", {
			minimumFractionDigits: t,
			maximumFractionDigits: t,
		}).format(e),
	ds = (e) => {
		try {
			return vs(jo(e), "d MMMM yyyy", { locale: No });
		} catch {
			return e;
		}
	},
	_o = (e) => {
		try {
			return vs(jo(e), "d MMMM yyyy, HH:mm", { locale: No });
		} catch {
			return e;
		}
	},
	ut = (e, t) => {
		const s = { kg: "кг", piece: "шт", liter: "л", box: "ящ", bag: "мешок" };
		return `${Gh(e, e % 1 !== 0 ? 1 : 0)} ${s[t] || t}`;
	},
	f0 = (e) => {
		const t = e.replace(/\D/g, "");
		return t.length === 11
			? `+7 (${t.slice(1, 4)}) ${t.slice(4, 7)}-${t.slice(7, 9)}-${t.slice(9)}`
			: e;
	},
	Yh = {
		gray: "bg-gray-100 text-gray-700",
		green: "bg-green-100 text-green-800",
		yellow: "bg-yellow-100 text-yellow-800",
		red: "bg-red-100 text-red-800",
		blue: "bg-blue-100 text-blue-800",
		purple: "bg-purple-100 text-purple-800",
		cyan: "bg-cyan-100 text-cyan-800",
		orange: "bg-orange-100 text-orange-800",
	},
	Xh = {
		gray: "bg-gray-400",
		green: "bg-green-600",
		yellow: "bg-yellow-500",
		red: "bg-red-500",
		blue: "bg-blue-500",
		purple: "bg-purple-500",
		cyan: "bg-cyan-500",
		orange: "bg-orange-500",
	},
	Jh = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-xs" },
	Mt = ({
		variant: e = "gray",
		size: t = "md",
		children: s,
		className: a,
		dot: n = !1,
	}) =>
		r.jsxs("span", {
			className: q(
				"inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap",
				Yh[e],
				Jh[t],
				a,
			),
			children: [
				n &&
					r.jsx("span", {
						className: q("w-1.5 h-1.5 rounded-full flex-shrink-0", Xh[e]),
					}),
				s,
			],
		}),
	ma = ({
		quantity: e,
		minQuantity: t = 10,
		unit: s = "kg",
		showQuantity: a = !1,
	}) =>
		e <= 0
			? r.jsx(Mt, {
					variant: "red",
					size: "sm",
					dot: !0,
					children: "Нет в наличии",
				})
			: e <= t
				? r.jsx(Mt, {
						variant: "yellow",
						size: "sm",
						dot: !0,
						children: a ? `Мало: ${ut(e, s)}` : "Мало",
					})
				: r.jsx(Mt, {
						variant: "green",
						size: "sm",
						dot: !0,
						children: a ? `В наличии: ${ut(e, s)}` : "В наличии",
					}),
	Qh = {
		sm: { button: "w-7 h-7", input: "w-14 h-7 text-sm", icon: "w-3.5 h-3.5" },
		md: { button: "w-9 h-9", input: "w-16 h-9 text-sm", icon: "w-4 h-4" },
	},
	Wa = ({
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
		const d = Qh[c],
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
			className: q("flex items-center gap-1", l),
			children: [
				r.jsx("button", {
					type: "button",
					onClick: u,
					disabled: o || e <= s,
					className: q(
						"rounded-lg border border-gray-200 bg-white text-gray-600",
						"hover:bg-gray-50 hover:border-gray-300 transition-colors",
						"flex items-center justify-center flex-shrink-0",
						"disabled:opacity-40 disabled:cursor-not-allowed",
						d.button,
					),
					"aria-label": "Уменьшить",
					children: r.jsx(Da, { className: d.icon }),
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
							className: q(
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
					className: q(
						"rounded-lg border border-gray-200 bg-white text-gray-600",
						"hover:bg-gray-50 hover:border-gray-300 transition-colors",
						"flex items-center justify-center flex-shrink-0",
						"disabled:opacity-40 disabled:cursor-not-allowed",
						d.button,
					),
					"aria-label": "Увеличить",
					children: r.jsx(ar, { className: d.icon }),
				}),
			],
		});
	},
	he = {
		success: (e) =>
			Ot.success(e, {
				icon: r.jsx($t, { className: "w-5 h-5 text-green-600 flex-shrink-0" }),
			}),
		error: (e) =>
			Ot.error(e, {
				icon: r.jsx(hl, { className: "w-5 h-5 text-red-600 flex-shrink-0" }),
			}),
		warning: (e) =>
			Ot(e, {
				icon: r.jsx(fl, { className: "w-5 h-5 text-yellow-500 flex-shrink-0" }),
				style: { borderLeft: "4px solid #F59E0B" },
			}),
		info: (e) =>
			Ot(e, {
				icon: r.jsx(Ni, { className: "w-5 h-5 text-blue-500 flex-shrink-0" }),
				style: { borderLeft: "4px solid #3B82F6" },
			}),
		loading: (e) => Ot.loading(e),
		dismiss: (e) => {
			e ? Ot.dismiss(e) : Ot.dismiss();
		},
	},
	Kh = ({ product: e, className: t, layout: s = "grid" }) => {
		var y, k, _;
		const [a, n] = A.useState(e.min_order_qty || 1),
			[i, o] = A.useState(!1),
			{ isAuthenticated: l, isApproved: c } = Ce(),
			{ addItem: d, getItem: u } = bs(),
			m = l && c,
			v = m ? e.price_wholesale : e.price_retail,
			p = m && e.price_retail > e.price_wholesale,
			g = e.is_available && e.stock_quantity > 0,
			j = u(e.id),
			f = `/catalog/${((y = e.category) == null ? void 0 : y.slug) || "all"}/${e.slug}`,
			S = (E) => {
				(E.preventDefault(),
					E.stopPropagation(),
					g && (d(e, a, m), he.success(`«${e.name}» добавлен в корзину`)));
			};
		return s === "list"
			? r.jsx(H, {
					to: f,
					className: q("block group", t),
					children: r.jsxs("div", {
						className:
							"flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all",
						children: [
							r.jsx("div", {
								className:
									"w-20 h-20 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden",
								children:
									!i && (k = e.images) != null && k[0]
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
												children: r.jsx(Ts, {
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
											r.jsx(ma, {
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
														children: X(v),
													}),
													r.jsxs("span", {
														className: "text-xs text-gray-400 ml-1",
														children: ["/ ", e.unit === "kg" ? "кг" : "шт"],
													}),
												],
											}),
											r.jsxs("button", {
												onClick: S,
												disabled: !g,
												className: q(
													"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
													g
														? "bg-primary-600 text-white hover:bg-primary-700"
														: "bg-gray-100 text-gray-400 cursor-not-allowed",
												),
												children: [
													r.jsx(is, { className: "w-3.5 h-3.5" }),
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
					className: q(
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
							children: r.jsx(ma, {
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
												children: r.jsx(Ts, {
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
													children: X(v),
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
												children: X(e.price_retail),
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
												r.jsx(Wa, {
													value: a,
													onChange: n,
													min: e.min_order_qty || 1,
													max: e.stock_quantity,
													step: e.order_step || 1,
													size: "sm",
												}),
												r.jsxs("button", {
													onClick: S,
													className: q(
														"flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
														j
															? "bg-primary-100 text-primary-700 hover:bg-primary-200"
															: "bg-primary-600 text-white hover:bg-primary-700",
													),
													children: [
														r.jsx(is, { className: "w-3.5 h-3.5" }),
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
	Ha = ({ page: e, totalPages: t, onPageChange: s, className: a }) => {
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
			className: q("flex items-center justify-center gap-1", a),
			"aria-label": "Пагинация",
			children: [
				r.jsx("button", {
					onClick: () => s(e - 1),
					disabled: e === 1,
					className: q(
						"p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
						e === 1 && "opacity-30 cursor-not-allowed",
					),
					"aria-label": "Предыдущая страница",
					children: r.jsx(yi, { className: "w-4 h-4" }),
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
									className: q(
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
					className: q(
						"p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
						e === t && "opacity-30 cursor-not-allowed",
					),
					"aria-label": "Следующая страница",
					children: r.jsx(Te, { className: "w-4 h-4" }),
				}),
			],
		});
	},
	ef = ({
		value: e,
		onChange: t,
		placeholder: s = "Поиск...",
		debounceMs: a = 400,
		className: n,
		autoFocus: i = !1,
	}) => {
		const [o, l] = A.useState(e || ""),
			c = A.useRef(void 0);
		A.useEffect(() => {
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
			className: q("relative", n),
			children: [
				r.jsx("div", {
					className:
						"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
					children: r.jsx(ji, { className: "w-4 h-4" }),
				}),
				r.jsx("input", {
					type: "search",
					value: o,
					onChange: d,
					placeholder: s,
					autoFocus: i,
					className: q(
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
						children: r.jsx(Aa, { className: "w-4 h-4" }),
					}),
			],
		});
	},
	rt = A.forwardRef(
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
								className: q(
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
								children: r.jsx(xl, { className: "w-4 h-4" }),
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
rt.displayName = "Select";
const Za = ({ items: e, className: t, showHome: s = !0 }) =>
		r.jsxs("nav", {
			"aria-label": "Хлебные крошки",
			className: q("flex items-center gap-1 text-sm", t),
			children: [
				s &&
					r.jsxs(r.Fragment, {
						children: [
							r.jsx(H, {
								to: "/",
								className:
									"flex items-center text-gray-400 hover:text-gray-600 transition-colors",
								"aria-label": "Главная",
								children: r.jsx(gl, { className: "w-4 h-4" }),
							}),
							r.jsx(Te, {
								className: "w-3.5 h-3.5 text-gray-300 flex-shrink-0",
							}),
						],
					}),
				e.map((a, n) => {
					const i = n === e.length - 1;
					return r.jsx(
						F.Fragment,
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
											r.jsx(Te, {
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
	tf = {
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
	sf = {
		sm: "px-3 py-1.5 text-sm gap-1.5",
		md: "px-4 py-2 text-sm gap-2",
		lg: "px-6 py-3 text-base gap-2",
	},
	qe = ({
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
			className: q(
				"inline-flex items-center justify-center font-medium rounded-lg",
				"focus:outline-none focus:ring-2 focus:ring-offset-2",
				"transition-all duration-150",
				tf[e],
				sf[t],
				i && "w-full",
				u && "opacity-50 cursor-not-allowed pointer-events-none",
				o,
			),
			disabled: u,
			...d,
			children: [
				s
					? r.jsx(ea, { className: "w-4 h-4 animate-spin" })
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
	Ar = ({ icon: e, title: t, description: s, action: a, className: n }) =>
		r.jsxs("div", {
			className: q(
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
					r.jsx(qe, {
						variant: "primary",
						onClick: a.onClick,
						children: a.label,
					}),
			],
		}),
	rf = [
		{ value: "popularity", label: "По популярности" },
		{ value: "price_asc", label: "Сначала дешевле" },
		{ value: "price_desc", label: "Сначала дороже" },
		{ value: "name", label: "По названию" },
	],
	af = [
		{ value: "12", label: "12 на стр." },
		{ value: "24", label: "24 на стр." },
		{ value: "48", label: "48 на стр." },
	],
	nf = () => {
		const [e, t] = tl(),
			{ category: s } = Ea(),
			a = Zt(),
			[n, i] = A.useState(e.get("search") || ""),
			[o, l] = A.useState(e.get("sort") || "popularity"),
			[c, d] = A.useState(parseInt(e.get("page") || "1")),
			[u, m] = A.useState(parseInt(e.get("per_page") || "24")),
			[v, p] = A.useState("grid"),
			[g, j] = A.useState(!1),
			{ data: f } = We({ queryKey: ["categories"], queryFn: Ua }),
			S = f == null ? void 0 : f.find((L) => L.slug === s),
			y = {
				search: n || void 0,
				sort: o,
				page: c,
				per_page: u,
				category_id: S == null ? void 0 : S.id,
			},
			{
				data: k,
				isLoading: _,
				isFetching: E,
			} = We({
				queryKey: ["products", y],
				queryFn: () => ho(y),
				placeholderData: (L) => L,
			});
		A.useEffect(() => {
			const L = {};
			(n && (L.search = n),
				o && o !== "popularity" && (L.sort = o),
				c > 1 && (L.page = String(c)),
				u !== 24 && (L.per_page = String(u)),
				t(L, { replace: !0 }));
		}, [n, o, c, u]);
		const N = [
				{ label: "Каталог", href: "/catalog" },
				...(S ? [{ label: S.name }] : []),
			],
			z = (L) => {
				(i(L), d(1));
			},
			te = (L) => {
				(l(L), d(1));
			},
			se = (L) => {
				(d(1), j(!1), a(L ? `/catalog/${L}` : "/catalog"));
			};
		return r.jsxs(r.Fragment, {
			children: [
				r.jsx(qa, {
					title: "Каталог овощей и фруктов оптом",
					description:
						"Каталог свежих овощей и фруктов оптом — прямые поставки из Узбекистана. Доставка по Тобольску.",
					canonical: "/catalog",
				}),
				r.jsxs("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
					children: [
						r.jsx(Za, { items: N, className: "mb-4 text-sm" }),
						r.jsx("div", {
							className: "flex items-center justify-between mb-6",
							children: r.jsxs("div", {
								children: [
									r.jsx("h1", {
										className: "text-2xl font-bold text-gray-900",
										children: S ? S.name : "Все товары",
									}),
									k &&
										r.jsxs("p", {
											className: "text-sm text-gray-500 mt-0.5",
											children: [k.total, " товаров"],
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
														onClick: () => se(void 0),
														className: q(
															"w-full flex items-center justify-between px-4 py-2 text-sm transition-colors",
															s
																? "text-gray-600 hover:bg-gray-50"
																: "text-primary-700 bg-primary-50 font-semibold",
														),
														children: [
															r.jsx("span", { children: "Все товары" }),
															k &&
																!s &&
																r.jsx("span", {
																	className: "text-xs text-gray-400",
																	children: k.total,
																}),
														],
													}),
													f == null
														? void 0
														: f.map((L) =>
																r.jsxs(
																	"button",
																	{
																		onClick: () => se(L.slug),
																		className: q(
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
																children: r.jsx(Aa, {
																	className: "w-5 h-5 text-gray-500",
																}),
															}),
														],
													}),
													r.jsxs("nav", {
														className: "py-2",
														children: [
															r.jsx("button", {
																onClick: () => se(void 0),
																className: q(
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
																				onClick: () => se(L.slug),
																				className: q(
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
													children: r.jsx(ef, {
														value: n,
														onChange: z,
														placeholder: "Поиск товаров...",
													}),
												}),
												r.jsx("div", {
													className: "w-48",
													children: r.jsx(rt, {
														options: rf,
														value: o,
														onChange: (L) => te(L.target.value),
													}),
												}),
												r.jsx("div", {
													className: "hidden sm:block w-32",
													children: r.jsx(rt, {
														options: af,
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
															className: q(
																"p-2 transition-colors",
																v === "grid"
																	? "bg-primary-600 text-white"
																	: "bg-white text-gray-500 hover:bg-gray-50",
															),
															"aria-label": "Сетка",
															children: r.jsx(Ta, { className: "w-4 h-4" }),
														}),
														r.jsx("button", {
															onClick: () => p("list"),
															className: q(
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
														onClick: () => z(""),
														className:
															"text-xs text-primary-600 hover:underline",
														children: "Сбросить",
													}),
												],
											}),
										_
											? r.jsx(Gt, {})
											: (k == null ? void 0 : k.items.length) === 0
												? r.jsx(Ar, {
														title: "Товары не найдены",
														description: n
															? `По запросу «${n}» ничего не найдено. Попробуйте изменить поисковый запрос.`
															: "В этой категории пока нет товаров.",
														action: {
															label: "Смотреть все товары",
															onClick: () => se(void 0),
														},
													})
												: r.jsxs(r.Fragment, {
														children: [
															r.jsx("div", {
																className: q(
																	"transition-opacity",
																	E && "opacity-60",
																	v === "grid"
																		? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
																		: "space-y-3",
																),
																children:
																	k == null
																		? void 0
																		: k.items.map((L) =>
																				r.jsx(
																					Kh,
																					{ product: L, layout: v },
																					L.id,
																				),
																			),
															}),
															k &&
																k.pages > 1 &&
																r.jsx(Ha, {
																	page: c,
																	totalPages: k.pages,
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
	},
	of = () => {
		var Pe, Ae, Je, Et, js, Zs, Xt;
		const { category: e, id: t } = Ea(),
			[s, a] = A.useState(0),
			[n, i] = A.useState(1),
			[o, l] = A.useState(1),
			[c, d] = A.useState(1),
			[u, m] = A.useState("kg"),
			[v, p] = A.useState(""),
			[g, j] = A.useState(!1),
			[f, S] = A.useState(!1),
			{ isAuthenticated: y, isApproved: k, user: _ } = Ce(),
			{ addItem: E } = bs(),
			{ data: N, isLoading: z } = We({
				queryKey: ["product", t],
				queryFn: () => Bu(t),
				enabled: !!t,
			}),
			{ data: te } = We({
				queryKey: ["product-certs", N == null ? void 0 : N.id],
				queryFn: () => Wu(N.id),
				enabled:
					!!N &&
					(((Pe = N.certificate_ids) == null ? void 0 : Pe.length) ?? 0) > 0,
			}),
			se = Sa({
				mutationFn: (ie) => Hu(ie.productId, ie.email),
				onSuccess: (ie) => {
					ie.subscribed ? (j(!0), he.success(ie.message)) : he.info(ie.message);
				},
				onError: () => {
					he.error("Не удалось подписаться. Попробуйте позже.");
				},
			});
		if (z) return r.jsx(Gt, {});
		if (!N)
			return r.jsxs("div", {
				className: "max-w-7xl mx-auto px-4 py-16 text-center",
				children: [
					r.jsx("p", {
						className: "text-gray-500",
						children: "Товар не найден",
					}),
					r.jsx(H, {
						to: "/catalog",
						className: "text-primary-600 hover:underline mt-4 inline-block",
						children: "Вернуться в каталог",
					}),
				],
			});
		const L = y && k,
			be = L ? N.price_wholesale : N.price_retail,
			V = N.is_available && N.stock_quantity > 0,
			W = N.images && N.images.length > 0,
			Q = N.unit_weight || 0.15,
			ae = +(c * Q).toFixed(2),
			K = +(o * be).toFixed(2),
			ve = +(ae * be).toFixed(2),
			R = () => {
				(E(N, n, L),
					he.success(`«${N.name}» добавлен в корзину (${ut(n, N.unit)})`));
			},
			Y = () => {
				const ie = v || ((_ == null ? void 0 : _.email) ?? "");
				if (!ie) {
					he.error("Укажите email для уведомления");
					return;
				}
				se.mutate({ productId: N.id, email: ie });
			},
			ge = () => {
				_ != null && _.email
					? se.mutate({ productId: N.id, email: _.email })
					: S(!0);
			},
			ne = [
				{ label: "Каталог", href: "/catalog" },
				...(N.category
					? [{ label: N.category.name, href: `/catalog/${N.category.slug}` }]
					: []),
				{ label: N.name },
			];
		return r.jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
			children: [
				r.jsx(qa, {
					title: N.name,
					description: N.description || `${N.name} — купить оптом в Агрорезерв`,
					canonical: `/catalog/${((Ae = N.category) == null ? void 0 : Ae.slug) || "_"}/${N.slug}`,
					ogImage: (Je = N.images) == null ? void 0 : Je[0],
					ogType: "product",
					schema: zu({
						name: N.name,
						slug: N.slug,
						description: N.description,
						price: N.price_retail,
						unit: N.unit,
						category_slug: (Et = N.category) == null ? void 0 : Et.slug,
						image: (js = N.images) == null ? void 0 : js[0],
						stock_qty: N.stock_quantity,
					}),
				}),
				r.jsx(Za, { items: ne, className: "mb-6" }),
				r.jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
					children: [
						r.jsxs("div", {
							children: [
								r.jsx("div", {
									className:
										"aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3",
									children:
										W && !N.images[s]
											? r.jsx("div", {
													className:
														"w-full h-full flex items-center justify-center",
													children: r.jsx(Ts, {
														className: "w-16 h-16 text-gray-300",
													}),
												})
											: W
												? r.jsx("img", {
														src: N.images[s],
														alt: N.name,
														className: "w-full h-full object-cover",
													})
												: r.jsx("div", {
														className:
															"w-full h-full flex items-center justify-center",
														children: r.jsx(Ts, {
															className: "w-16 h-16 text-gray-300",
														}),
													}),
								}),
								W &&
									N.images.length > 1 &&
									r.jsx("div", {
										className: "flex gap-2 overflow-x-auto pb-1",
										children: N.images.map((ie, Ct) =>
											r.jsx(
												"button",
												{
													onClick: () => a(Ct),
													className: q(
														"w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors",
														s === Ct
															? "border-primary-600"
															: "border-transparent",
													),
													children: r.jsx("img", {
														src: ie,
														alt: "",
														className: "w-full h-full object-cover",
													}),
												},
												Ct,
											),
										),
									}),
							],
						}),
						r.jsxs("div", {
							children: [
								r.jsxs("div", {
									className: "flex items-start justify-between gap-3 mb-2",
									children: [
										r.jsx("h1", {
											className:
												"text-2xl sm:text-3xl font-bold text-gray-900 leading-tight",
											children: N.name,
										}),
										r.jsx(ma, {
											quantity: N.stock_quantity,
											minQuantity: N.min_stock_quantity,
											unit: N.unit,
											showQuantity: !0,
										}),
									],
								}),
								r.jsxs("div", {
									className:
										"flex items-center gap-2 text-sm text-gray-500 mb-4",
									children: [
										r.jsx(Ni, { className: "w-4 h-4" }),
										r.jsxs("span", {
											children: [
												"Страна: ",
												r.jsx("strong", {
													className: "text-gray-700",
													children: N.country_of_origin,
												}),
											],
										}),
									],
								}),
								r.jsx("div", {
									className: "bg-gray-50 rounded-xl p-4 mb-5",
									children: L
										? r.jsxs("div", {
												children: [
													r.jsx("div", {
														className:
															"text-xs font-semibold text-primary-600 mb-1",
														children: "Оптовая цена (для вас)",
													}),
													r.jsxs("div", {
														className: "text-3xl font-bold text-gray-900",
														children: [
															X(N.price_wholesale),
															r.jsxs("span", {
																className:
																	"text-base font-normal text-gray-400 ml-2",
																children: ["/ ", N.unit === "kg" ? "кг" : "шт"],
															}),
														],
													}),
													r.jsxs("div", {
														className:
															"text-sm text-gray-400 line-through mt-1",
														children: ["Розница: ", X(N.price_retail)],
													}),
												],
											})
										: r.jsxs("div", {
												children: [
													r.jsxs("div", {
														className: "text-3xl font-bold text-gray-900",
														children: [
															X(N.price_retail),
															r.jsxs("span", {
																className:
																	"text-base font-normal text-gray-400 ml-2",
																children: ["/ ", N.unit === "kg" ? "кг" : "шт"],
															}),
														],
													}),
													y
														? r.jsx("div", {
																className: "text-sm text-primary-600 mt-1",
																children:
																	"Оптовая цена доступна после подтверждения аккаунта",
															})
														: r.jsxs("div", {
																className: "text-sm text-primary-600 mt-1",
																children: [
																	r.jsx(H, {
																		to: "/login",
																		className:
																			"underline hover:text-primary-700",
																		children: "Войдите",
																	}),
																	" для получения оптовой цены",
																],
															}),
												],
											}),
								}),
								N.description &&
									r.jsx("p", {
										className: "text-sm text-gray-600 leading-relaxed mb-5",
										children: N.description,
									}),
								V
									? r.jsxs("div", {
											className: "flex items-center gap-3 mb-6",
											children: [
												r.jsx(Wa, {
													value: n,
													onChange: i,
													min: N.min_order_qty || 1,
													max: N.stock_quantity,
													step: N.order_step || 1,
													unit: N.unit === "kg" ? "кг" : "шт",
													disabled: !1,
													size: "md",
												}),
												r.jsx("button", {
													onClick: R,
													className:
														"flex-1 flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-semibold text-base transition-colors bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-200",
													children: "Добавить в корзину",
												}),
											],
										})
									: r.jsxs("div", {
											className: "mb-6",
											children: [
												r.jsx("button", {
													disabled: !0,
													className:
														"w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-semibold text-base bg-gray-100 text-gray-400 cursor-not-allowed mb-3",
													children: "Нет в наличии",
												}),
												g
													? r.jsxs("div", {
															className:
																"flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl",
															children: [
																r.jsx($t, {
																	className:
																		"w-5 h-5 text-green-600 flex-shrink-0",
																}),
																r.jsx("span", {
																	className: "text-sm text-green-800",
																	children:
																		"Мы уведомим вас, когда товар поступит в наличие",
																}),
															],
														})
													: y && _ != null && _.email && !f
														? r.jsxs("button", {
																onClick: ge,
																disabled: se.isPending,
																className:
																	"w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-semibold text-sm transition-colors bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100",
																children: [
																	se.isPending
																		? r.jsx(ea, {
																				className: "w-4 h-4 animate-spin",
																			})
																		: r.jsx(Kr, { className: "w-4 h-4" }),
																	"Уведомить о поступлении",
																],
															})
														: r.jsxs("div", {
																className: "space-y-2",
																children: [
																	r.jsx("p", {
																		className: "text-sm text-gray-600",
																		children:
																			"Оставьте email — мы сообщим, когда товар появится:",
																	}),
																	r.jsxs("div", {
																		className: "flex gap-2",
																		children: [
																			r.jsx("input", {
																				type: "email",
																				value:
																					v ||
																					((_ == null ? void 0 : _.email) ??
																						""),
																				onChange: (ie) => p(ie.target.value),
																				placeholder: "your@email.com",
																				className:
																					"flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400",
																			}),
																			r.jsxs("button", {
																				onClick: Y,
																				disabled: se.isPending,
																				className:
																					"flex items-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50",
																				children: [
																					se.isPending
																						? r.jsx(ea, {
																								className:
																									"w-4 h-4 animate-spin",
																							})
																						: r.jsx(Kr, {
																								className: "w-4 h-4",
																							}),
																					r.jsx("span", {
																						className: "hidden sm:inline",
																						children: "Уведомить",
																					}),
																				],
																			}),
																		],
																	}),
																],
															}),
											],
										}),
								N.min_order_qty &&
									N.min_order_qty > 1 &&
									r.jsxs("p", {
										className: "text-xs text-gray-500 mb-5",
										children: [
											"Минимальный заказ: ",
											ut(N.min_order_qty, N.unit),
										],
									}),
								((Zs = N.certificate_ids) == null ? void 0 : Zs.length) > 0 &&
									r.jsxs("div", {
										className: "p-3 bg-blue-50 rounded-lg mb-5",
										children: [
											r.jsxs("div", {
												className: "flex items-center gap-2 mb-2",
												children: [
													r.jsx(Os, {
														className: "w-5 h-5 text-blue-500 flex-shrink-0",
													}),
													r.jsx("span", {
														className: "text-blue-800 font-medium text-sm",
														children: "Сертификат соответствия",
													}),
												],
											}),
											(Xt = te == null ? void 0 : te.certificates) == null
												? void 0
												: Xt.map((ie) =>
														r.jsxs(
															"div",
															{
																className:
																	"flex items-center justify-between gap-2 py-1.5 border-t border-blue-100 first:border-t-0",
																children: [
																	r.jsxs("div", {
																		className: "text-xs text-blue-700",
																		children: [
																			ie.cert_type_label || "Сертификат",
																			" №",
																			ie.number,
																			ie.expiry_date &&
																				r.jsxs("span", {
																					className: "text-blue-400 ml-1",
																					children: [
																						"до ",
																						new Date(
																							ie.expiry_date,
																						).toLocaleDateString("ru-RU"),
																					],
																				}),
																		],
																	}),
																	ie.has_file &&
																		ie.file_url &&
																		r.jsxs("a", {
																			href: ie.file_url,
																			target: "_blank",
																			rel: "noopener noreferrer",
																			download:
																				ie.file_name || "certificate.pdf",
																			className:
																				"flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium",
																			children: [
																				r.jsx(Rs, { className: "w-3.5 h-3.5" }),
																				"Скачать",
																			],
																		}),
																],
															},
															ie._id,
														),
													),
											(!(te != null && te.certificates) ||
												te.certificates.length === 0) &&
												r.jsx("span", {
													className: "text-blue-500 text-xs",
													children: "Декларация ТР ТС / Сертификат",
												}),
										],
									}),
								N.storage_conditions &&
									r.jsxs("div", {
										className:
											"text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-5",
										children: [
											r.jsx("span", {
												className: "font-medium text-gray-900",
												children: "Условия хранения: ",
											}),
											N.storage_conditions,
										],
									}),
								N.unit === "piece" &&
									N.unit_weight &&
									r.jsxs("div", {
										className: "border border-gray-200 rounded-xl p-4",
										children: [
											r.jsxs("div", {
												className: "flex items-center gap-2 mb-3",
												children: [
													r.jsx(nr, { className: "w-4 h-4 text-primary-600" }),
													r.jsx("h3", {
														className: "text-sm font-semibold text-gray-900",
														children: "Поштучный калькулятор",
													}),
												],
											}),
											r.jsxs("p", {
												className: "text-xs text-gray-500 mb-3",
												children: [
													"1 шт ≈ ",
													N.unit_weight * 1e3,
													"г (",
													N.unit_weight,
													" кг)",
												],
											}),
											r.jsxs("div", {
												className: "grid grid-cols-2 gap-3",
												children: [
													r.jsxs("div", {
														children: [
															r.jsx("label", {
																className:
																	"block text-xs font-medium text-gray-600 mb-1",
																children: "Кол-во (кг)",
															}),
															r.jsx("input", {
																type: "number",
																value: o,
																onChange: (ie) => {
																	(l(+ie.target.value), m("kg"));
																},
																min: "0",
																step: "0.1",
																className:
																	"w-full border border-gray-200 rounded-lg px-3 py-2 text-sm",
															}),
															r.jsxs("div", {
																className: "text-xs text-gray-500 mt-1",
																children: [
																	"≈ ",
																	Math.round(o / (N.unit_weight || 0.15)),
																	" шт",
																],
															}),
															r.jsx("div", {
																className:
																	"text-sm font-bold text-gray-900 mt-0.5",
																children: X(K),
															}),
														],
													}),
													r.jsxs("div", {
														children: [
															r.jsx("label", {
																className:
																	"block text-xs font-medium text-gray-600 mb-1",
																children: "Кол-во (шт)",
															}),
															r.jsx("input", {
																type: "number",
																value: c,
																onChange: (ie) => {
																	(d(+ie.target.value), m("pcs"));
																},
																min: "0",
																step: "1",
																className:
																	"w-full border border-gray-200 rounded-lg px-3 py-2 text-sm",
															}),
															r.jsxs("div", {
																className: "text-xs text-gray-500 mt-1",
																children: ["≈ ", ae, " кг"],
															}),
															r.jsx("div", {
																className:
																	"text-sm font-bold text-gray-900 mt-0.5",
																children: X(ve),
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
			],
		});
	};
var Hs = (e) => e.type === "checkbox",
	Ft = (e) => e instanceof Date,
	Fe = (e) => e == null;
const ko = (e) => typeof e == "object";
var Se = (e) => !Fe(e) && !Array.isArray(e) && ko(e) && !Ft(e),
	lf = (e) =>
		Se(e) && e.target ? (Hs(e.target) ? e.target.checked : e.target.value) : e,
	cf = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
	df = (e, t) => e.has(cf(t)),
	uf = (e) => {
		const t = e.constructor && e.constructor.prototype;
		return Se(t) && t.hasOwnProperty("isPrototypeOf");
	},
	Ga =
		typeof window < "u" &&
		typeof window.HTMLElement < "u" &&
		typeof document < "u";
function pe(e) {
	if (e instanceof Date) return new Date(e);
	const t = typeof FileList < "u" && e instanceof FileList;
	if (Ga && (e instanceof Blob || t)) return e;
	const s = Array.isArray(e);
	if (!s && !(Se(e) && uf(e))) return e;
	const a = s ? [] : Object.create(Object.getPrototypeOf(e));
	for (const n in e)
		Object.prototype.hasOwnProperty.call(e, n) && (a[n] = pe(e[n]));
	return a;
}
var Or = (e) => /^\w*$/.test(e),
	fe = (e) => e === void 0,
	Tr = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
	Ya = (e) => Tr(e.replace(/["|']|\]/g, "").split(/\.|\[/)),
	P = (e, t, s) => {
		if (!t || !Se(e)) return s;
		const a = (Or(t) ? [t] : Ya(t)).reduce((n, i) => (Fe(n) ? n : n[i]), e);
		return fe(a) || a === e ? (fe(e[t]) ? s : e[t]) : a;
	},
	Qe = (e) => typeof e == "boolean",
	Ye = (e) => typeof e == "function",
	de = (e, t, s) => {
		let a = -1;
		const n = Or(t) ? [t] : Ya(t),
			i = n.length,
			o = i - 1;
		for (; ++a < i; ) {
			const l = n[a];
			let c = s;
			if (a !== o) {
				const d = e[l];
				c = Se(d) || Array.isArray(d) ? d : isNaN(+n[a + 1]) ? {} : [];
			}
			if (l === "__proto__" || l === "constructor" || l === "prototype") return;
			((e[l] = c), (e = e[l]));
		}
	};
const qn = { BLUR: "blur", FOCUS_OUT: "focusout" },
	Be = {
		onBlur: "onBlur",
		onChange: "onChange",
		onSubmit: "onSubmit",
		onTouched: "onTouched",
		all: "all",
	},
	it = {
		max: "max",
		min: "min",
		maxLength: "maxLength",
		minLength: "minLength",
		pattern: "pattern",
		required: "required",
		validate: "validate",
	},
	So = F.createContext(null);
So.displayName = "HookFormControlContext";
const mf = () => F.useContext(So);
var hf = (e, t, s, a = !0) => {
	const n = { defaultValues: t._defaultValues };
	for (const i in e)
		Object.defineProperty(n, i, {
			get: () => {
				const o = i;
				return (
					t._proxyFormState[o] !== Be.all &&
						(t._proxyFormState[o] = !a || Be.all),
					e[o]
				);
			},
		});
	return n;
};
const Eo = typeof window < "u" ? F.useLayoutEffect : F.useEffect;
var Ve = (e) => typeof e == "string",
	ff = (e, t, s, a, n) =>
		Ve(e)
			? (a && t.watch.add(e), P(s, e, n))
			: Array.isArray(e)
				? e.map((i) => (a && t.watch.add(i), P(s, i)))
				: (a && (t.watchAll = !0), s),
	ha = (e) => Fe(e) || !ko(e);
function bt(e, t, s = new WeakSet()) {
	if (ha(e) || ha(t)) return Object.is(e, t);
	if (Ft(e) && Ft(t)) return Object.is(e.getTime(), t.getTime());
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
				(Ft(o) && Ft(l)) ||
				(Se(o) && Se(l)) ||
				(Array.isArray(o) && Array.isArray(l))
					? !bt(o, l, s)
					: !Object.is(o, l)
			)
				return !1;
		}
	}
	return !0;
}
const xf = F.createContext(null);
xf.displayName = "HookFormContext";
var Co = (e, t, s, a, n) =>
		t
			? {
					...s[e],
					types: { ...(s[e] && s[e].types ? s[e].types : {}), [a]: n || !0 },
				}
			: {},
	Le = (e) => (Array.isArray(e) ? e : [e]),
	Un = () => {
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
function Ao(e, t) {
	const s = {};
	for (const a in e)
		if (e.hasOwnProperty(a)) {
			const n = e[a],
				i = t[a];
			if (n && Se(n) && i) {
				const o = Ao(n, i);
				Se(o) && (s[a] = o);
			} else e[a] && (s[a] = i);
		}
	return s;
}
var Oe = (e) => Se(e) && !Object.keys(e).length,
	Xa = (e) => e.type === "file",
	dr = (e) => {
		if (!Ga) return !1;
		const t = e ? e.ownerDocument : 0;
		return (
			e instanceof
			(t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement)
		);
	},
	Oo = (e) => e.type === "select-multiple",
	Ja = (e) => e.type === "radio",
	gf = (e) => Ja(e) || Hs(e),
	Ur = (e) => dr(e) && e.isConnected;
function pf(e, t) {
	const s = t.slice(0, -1).length;
	let a = 0;
	for (; a < s; ) e = fe(e) ? a++ : e[t[a++]];
	return e;
}
function yf(e) {
	for (const t in e) if (e.hasOwnProperty(t) && !fe(e[t])) return !1;
	return !0;
}
function _e(e, t) {
	const s = Array.isArray(t) ? t : Or(t) ? [t] : Ya(t),
		a = s.length === 1 ? e : pf(e, s),
		n = s.length - 1,
		i = s[n];
	return (
		a && delete a[i],
		n !== 0 &&
			((Se(a) && Oe(a)) || (Array.isArray(a) && yf(a))) &&
			_e(e, s.slice(0, -1)),
		e
	);
}
var bf = (e) => {
	for (const t in e) if (Ye(e[t])) return !0;
	return !1;
};
function To(e) {
	return Array.isArray(e) || (Se(e) && !bf(e));
}
function fa(e, t = {}) {
	for (const s in e) {
		const a = e[s];
		To(a)
			? ((t[s] = Array.isArray(a) ? [] : {}), fa(a, t[s]))
			: fe(a) || (t[s] = !0);
	}
	return t;
}
function Kt(e, t, s) {
	s || (s = fa(t));
	for (const a in e) {
		const n = e[a];
		if (To(n))
			fe(t) || ha(s[a])
				? (s[a] = fa(n, Array.isArray(n) ? [] : {}))
				: Kt(n, Fe(t) ? {} : t[a], s[a]);
		else {
			const i = t[a];
			s[a] = !bt(n, i);
		}
	}
	return s;
}
const zn = { value: !1, isValid: !1 },
	Bn = { value: !0, isValid: !0 };
var Ro = (e) => {
		if (Array.isArray(e)) {
			if (e.length > 1) {
				const t = e
					.filter((s) => s && s.checked && !s.disabled)
					.map((s) => s.value);
				return { value: t, isValid: !!t.length };
			}
			return e[0].checked && !e[0].disabled
				? e[0].attributes && !fe(e[0].attributes.value)
					? fe(e[0].value) || e[0].value === ""
						? Bn
						: { value: e[0].value, isValid: !0 }
					: Bn
				: zn;
		}
		return zn;
	},
	Po = (e, { valueAsNumber: t, valueAsDate: s, setValueAs: a }) =>
		fe(e)
			? e
			: t
				? e === ""
					? NaN
					: e && +e
				: s && Ve(e)
					? new Date(e)
					: a
						? a(e)
						: e;
const Wn = { isValid: !1, value: null };
var Do = (e) =>
	Array.isArray(e)
		? e.reduce(
				(t, s) =>
					s && s.checked && !s.disabled ? { isValid: !0, value: s.value } : t,
				Wn,
			)
		: Wn;
function Hn(e) {
	const t = e.ref;
	return Xa(t)
		? t.files
		: Ja(t)
			? Do(e.refs).value
			: Oo(t)
				? [...t.selectedOptions].map(({ value: s }) => s)
				: Hs(t)
					? Ro(e.refs).value
					: Po(fe(t.value) ? e.ref.value : t.value, e);
}
var vf = (e, t, s, a) => {
		const n = {};
		for (const i of e) {
			const o = P(t, i);
			o && de(n, i, o._f);
		}
		return {
			criteriaMode: s,
			names: [...e],
			fields: n,
			shouldUseNativeValidation: a,
		};
	},
	ur = (e) => e instanceof RegExp,
	ks = (e) =>
		fe(e)
			? e
			: ur(e)
				? e.source
				: Se(e)
					? ur(e.value)
						? e.value.source
						: e.value
					: e,
	ts = (e) => ({
		isOnSubmit: !e || e === Be.onSubmit,
		isOnBlur: e === Be.onBlur,
		isOnChange: e === Be.onChange,
		isOnAll: e === Be.all,
		isOnTouch: e === Be.onTouched,
	});
const Zn = "AsyncFunction";
var jf = (e) =>
		!!e &&
		!!e.validate &&
		!!(
			(Ye(e.validate) && e.validate.constructor.name === Zn) ||
			(Se(e.validate) &&
				Object.values(e.validate).find((t) => t.constructor.name === Zn))
		),
	wf = (e) =>
		e.mount &&
		(e.required ||
			e.min ||
			e.max ||
			e.maxLength ||
			e.minLength ||
			e.pattern ||
			e.validate),
	xa = (e, t, s) =>
		!s &&
		(t.watchAll ||
			t.watch.has(e) ||
			[...t.watch].some(
				(a) => e.startsWith(a) && /^\.\w+/.test(e.slice(a.length)),
			));
const as = (e, t, s, a) => {
	for (const n of s || Object.keys(e)) {
		const i = P(e, n);
		if (i) {
			const { _f: o, ...l } = i;
			if (o) {
				if (o.refs && o.refs[0] && t(o.refs[0], n) && !a) return !0;
				if (o.ref && t(o.ref, o.name) && !a) return !0;
				if (as(l, t)) break;
			} else if (Se(l) && as(l, t)) break;
		}
	}
};
function Gn(e, t, s) {
	const a = P(e, s);
	if (a || Or(s)) return { error: a, name: s };
	const n = s.split(".");
	for (; n.length; ) {
		const i = n.join("."),
			o = P(t, i),
			l = P(e, i);
		if (o && !Array.isArray(o) && s !== i) return { name: s };
		if (l && l.type) return { name: i, error: l };
		if (l && l.root && l.root.type) return { name: `${i}.root`, error: l.root };
		n.pop();
	}
	return { name: s };
}
var Nf = (e, t, s, a) => {
		s(e);
		const { name: n, ...i } = e;
		return (
			Oe(i) ||
			Object.keys(i).length >= Object.keys(t).length ||
			Object.keys(i).find((o) => t[o] === (!a || Be.all))
		);
	},
	_f = (e, t, s) =>
		!e ||
		!t ||
		e === t ||
		Le(e).some((a) => a && (s ? a === t : a.startsWith(t) || t.startsWith(a))),
	kf = (e, t, s, a, n) =>
		n.isOnAll
			? !1
			: !s && n.isOnTouch
				? !(t || e)
				: (s ? a.isOnBlur : n.isOnBlur)
					? !e
					: (s ? a.isOnChange : n.isOnChange)
						? e
						: !0,
	Sf = (e, t) => !Tr(P(e, t)).length && _e(e, t),
	Io = (e, t, s) => {
		const a = Le(P(e, s));
		return (de(a, "root", t[s]), de(e, s, a), e);
	};
function Yn(e, t, s = "validate") {
	if (Ve(e) || (Array.isArray(e) && e.every(Ve)) || (Qe(e) && !e))
		return { type: s, message: Ve(e) ? e : "", ref: t };
}
var Qt = (e) => (Se(e) && !ur(e) ? e : { value: e, message: "" }),
	ga = async (e, t, s, a, n, i) => {
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
				mount: S,
			} = e._f,
			y = P(s, j);
		if (!S || t.has(j)) return {};
		const k = l ? l[0] : o,
			_ = (V) => {
				n &&
					k.reportValidity &&
					(k.setCustomValidity(Qe(V) ? "" : V || ""), k.reportValidity());
			},
			E = {},
			N = Ja(o),
			z = Hs(o),
			te = N || z,
			se =
				((f || Xa(o)) && fe(o.value) && fe(y)) ||
				(dr(o) && o.value === "") ||
				y === "" ||
				(Array.isArray(y) && !y.length),
			L = Co.bind(null, j, a, E),
			be = (V, W, Q, ae = it.maxLength, K = it.minLength) => {
				const ve = V ? W : Q;
				E[j] = { type: V ? ae : K, message: ve, ref: o, ...L(V ? ae : K, ve) };
			};
		if (
			i
				? !Array.isArray(y) || !y.length
				: c &&
					((!te && (se || Fe(y))) ||
						(Qe(y) && !y) ||
						(z && !Ro(l).isValid) ||
						(N && !Do(l).isValid))
		) {
			const { value: V, message: W } = Ve(c)
				? { value: !!c, message: c }
				: Qt(c);
			if (
				V &&
				((E[j] = {
					type: it.required,
					message: W,
					ref: k,
					...L(it.required, W),
				}),
				!a)
			)
				return (_(W), E);
		}
		if (!se && (!Fe(m) || !Fe(v))) {
			let V, W;
			const Q = Qt(v),
				ae = Qt(m);
			if (!Fe(y) && !isNaN(y)) {
				const K = o.valueAsNumber || (y && +y);
				(Fe(Q.value) || (V = K > Q.value), Fe(ae.value) || (W = K < ae.value));
			} else {
				const K = o.valueAsDate || new Date(y),
					ve = (ge) => new Date(new Date().toDateString() + " " + ge),
					R = o.type == "time",
					Y = o.type == "week";
				(Ve(Q.value) &&
					y &&
					(V = R
						? ve(y) > ve(Q.value)
						: Y
							? y > Q.value
							: K > new Date(Q.value)),
					Ve(ae.value) &&
						y &&
						(W = R
							? ve(y) < ve(ae.value)
							: Y
								? y < ae.value
								: K < new Date(ae.value)));
			}
			if ((V || W) && (be(!!V, Q.message, ae.message, it.max, it.min), !a))
				return (_(E[j].message), E);
		}
		if ((d || u) && !se && (Ve(y) || (i && Array.isArray(y)))) {
			const V = Qt(d),
				W = Qt(u),
				Q = !Fe(V.value) && y.length > +V.value,
				ae = !Fe(W.value) && y.length < +W.value;
			if ((Q || ae) && (be(Q, V.message, W.message), !a))
				return (_(E[j].message), E);
		}
		if (p && !se && Ve(y)) {
			const { value: V, message: W } = Qt(p);
			if (
				ur(V) &&
				!y.match(V) &&
				((E[j] = { type: it.pattern, message: W, ref: o, ...L(it.pattern, W) }),
				!a)
			)
				return (_(W), E);
		}
		if (g) {
			if (Ye(g)) {
				const V = await g(y, s),
					W = Yn(V, k);
				if (W && ((E[j] = { ...W, ...L(it.validate, W.message) }), !a))
					return (_(W.message), E);
			} else if (Se(g)) {
				let V = {};
				for (const W in g) {
					if (!Oe(V) && !a) break;
					const Q = Yn(await g[W](y, s), k, W);
					Q &&
						((V = { ...Q, ...L(W, Q.message) }), _(Q.message), a && (E[j] = V));
				}
				if (!Oe(V) && ((E[j] = { ref: k, ...V }), !a)) return E;
			}
		}
		return (_(!0), E);
	};
const Ef = {
	mode: Be.onSubmit,
	reValidateMode: Be.onChange,
	shouldFocusError: !0,
};
function Cf(e = {}) {
	let t = { ...Ef, ...e },
		s = {
			submitCount: 0,
			isDirty: !1,
			isReady: !1,
			isLoading: Ye(t.defaultValues),
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
			Se(t.defaultValues) || Se(t.values)
				? pe(t.defaultValues || t.values) || {}
				: {},
		i = t.shouldUnregister ? {} : pe(n),
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
	const p = { array: Un(), state: Un() },
		g = t.criteriaMode === Be.all,
		j = (h) => (x) => {
			(clearTimeout(d), (d = setTimeout(h, x)));
		},
		f = async (h) => {
			if (!o.keepIsValid && !t.disabled && (m.isValid || v.isValid || h)) {
				let x;
				(t.resolver
					? ((x = Oe((await te()).errors)), S())
					: (x = await L(a, !0)),
					x !== s.isValid && p.state.next({ isValid: x }));
			}
		},
		S = (h, x) => {
			!t.disabled &&
				(m.isValidating ||
					m.validatingFields ||
					v.isValidating ||
					v.validatingFields) &&
				((h || Array.from(l.mount)).forEach((w) => {
					w && (x ? de(s.validatingFields, w, x) : _e(s.validatingFields, w));
				}),
				p.state.next({
					validatingFields: s.validatingFields,
					isValidating: !Oe(s.validatingFields),
				}));
		},
		y = (h, x = [], w, D, T = !0, O = !0) => {
			if (D && w && !t.disabled) {
				if (((o.action = !0), O && Array.isArray(P(a, h)))) {
					const U = w(P(a, h), D.argA, D.argB);
					T && de(a, h, U);
				}
				if (O && Array.isArray(P(s.errors, h))) {
					const U = w(P(s.errors, h), D.argA, D.argB);
					(T && de(s.errors, h, U), Sf(s.errors, h));
				}
				if (
					(m.touchedFields || v.touchedFields) &&
					O &&
					Array.isArray(P(s.touchedFields, h))
				) {
					const U = w(P(s.touchedFields, h), D.argA, D.argB);
					T && de(s.touchedFields, h, U);
				}
				((m.dirtyFields || v.dirtyFields) && (s.dirtyFields = Kt(n, i)),
					p.state.next({
						name: h,
						isDirty: V(h, x),
						dirtyFields: s.dirtyFields,
						errors: s.errors,
						isValid: s.isValid,
					}));
			} else de(i, h, x);
		},
		k = (h, x) => {
			(de(s.errors, h, x), p.state.next({ errors: s.errors }));
		},
		_ = (h) => {
			((s.errors = h), p.state.next({ errors: s.errors, isValid: !1 }));
		},
		E = (h, x, w, D) => {
			const T = P(a, h);
			if (T) {
				const O = P(i, h, fe(w) ? P(n, h) : w);
				(fe(O) || (D && D.defaultChecked) || x
					? de(i, h, x ? O : Hn(T._f))
					: ae(h, O),
					o.mount && !o.action && f());
			}
		},
		N = (h, x, w, D, T) => {
			let O = !1,
				U = !1;
			const oe = { name: h };
			if (!t.disabled) {
				if (!w || D) {
					(m.isDirty || v.isDirty) &&
						((U = s.isDirty),
						(s.isDirty = oe.isDirty = V()),
						(O = U !== oe.isDirty));
					const le = bt(P(n, h), x);
					((U = !!P(s.dirtyFields, h)),
						le ? _e(s.dirtyFields, h) : de(s.dirtyFields, h, !0),
						(oe.dirtyFields = s.dirtyFields),
						(O = O || ((m.dirtyFields || v.dirtyFields) && U !== !le)));
				}
				if (w) {
					const le = P(s.touchedFields, h);
					le ||
						(de(s.touchedFields, h, w),
						(oe.touchedFields = s.touchedFields),
						(O = O || ((m.touchedFields || v.touchedFields) && le !== w)));
				}
				O && T && p.state.next(oe);
			}
			return O ? oe : {};
		},
		z = (h, x, w, D) => {
			const T = P(s.errors, h),
				O = (m.isValid || v.isValid) && Qe(x) && s.isValid !== x;
			if (
				(t.delayError && w
					? ((c = j(() => k(h, w))), c(t.delayError))
					: (clearTimeout(d),
						(c = null),
						w ? de(s.errors, h, w) : _e(s.errors, h)),
				(w ? !bt(T, w) : T) || !Oe(D) || O)
			) {
				const U = {
					...D,
					...(O && Qe(x) ? { isValid: x } : {}),
					errors: s.errors,
					name: h,
				};
				((s = { ...s, ...U }), p.state.next(U));
			}
		},
		te = async (h) => (
			S(h, !0),
			await t.resolver(
				i,
				t.context,
				vf(h || l.mount, a, t.criteriaMode, t.shouldUseNativeValidation),
			)
		),
		se = async (h) => {
			const { errors: x } = await te(h);
			if ((S(h), h))
				for (const w of h) {
					const D = P(x, w);
					D ? de(s.errors, w, D) : _e(s.errors, w);
				}
			else s.errors = x;
			return x;
		},
		L = async (h, x, w = { valid: !0 }) => {
			for (const D in h) {
				const T = h[D];
				if (T) {
					const { _f: O, ...U } = T;
					if (O) {
						const oe = l.array.has(O.name),
							le = T._f && jf(T._f);
						le && m.validatingFields && S([O.name], !0);
						const De = await ga(
							T,
							l.disabled,
							i,
							g,
							t.shouldUseNativeValidation && !x,
							oe,
						);
						if (
							(le && m.validatingFields && S([O.name]),
							De[O.name] && ((w.valid = !1), x || e.shouldUseNativeValidation))
						)
							break;
						!x &&
							(P(De, O.name)
								? oe
									? Io(s.errors, De, O.name)
									: de(s.errors, O.name, De[O.name])
								: _e(s.errors, O.name));
					}
					!Oe(U) && (await L(U, x, w));
				}
			}
			return w.valid;
		},
		be = () => {
			for (const h of l.unMount) {
				const x = P(a, h);
				x &&
					(x._f.refs ? x._f.refs.every((w) => !Ur(w)) : !Ur(x._f.ref)) &&
					Xt(h);
			}
			l.unMount = new Set();
		},
		V = (h, x) => !t.disabled && (h && x && de(i, h, x), !bt(ne(), n)),
		W = (h, x, w) =>
			ff(h, l, { ...(o.mount ? i : fe(x) ? n : Ve(h) ? { [h]: x } : x) }, w, x),
		Q = (h) => Tr(P(o.mount ? i : n, h, t.shouldUnregister ? P(n, h, []) : [])),
		ae = (h, x, w = {}) => {
			const D = P(a, h);
			let T = x;
			if (D) {
				const O = D._f;
				O &&
					(!O.disabled && de(i, h, Po(x, O)),
					(T = dr(O.ref) && Fe(x) ? "" : x),
					Oo(O.ref)
						? [...O.ref.options].forEach(
								(U) => (U.selected = T.includes(U.value)),
							)
						: O.refs
							? Hs(O.ref)
								? O.refs.forEach((U) => {
										(!U.defaultChecked || !U.disabled) &&
											(Array.isArray(T)
												? (U.checked = !!T.find((oe) => oe === U.value))
												: (U.checked = T === U.value || !!T));
									})
								: O.refs.forEach((U) => (U.checked = U.value === T))
							: Xa(O.ref)
								? (O.ref.value = "")
								: ((O.ref.value = T),
									O.ref.type || p.state.next({ name: h, values: pe(i) })));
			}
			((w.shouldDirty || w.shouldTouch) &&
				N(h, T, w.shouldTouch, w.shouldDirty, !0),
				w.shouldValidate && ge(h));
		},
		K = (h, x, w) => {
			for (const D in x) {
				if (!x.hasOwnProperty(D)) return;
				const T = x[D],
					O = h + "." + D,
					U = P(a, O);
				(l.array.has(h) || Se(T) || (U && !U._f)) && !Ft(T)
					? K(O, T, w)
					: ae(O, T, w);
			}
		},
		ve = (h, x, w = {}) => {
			const D = P(a, h),
				T = l.array.has(h),
				O = pe(x);
			(de(i, h, O),
				T
					? (p.array.next({ name: h, values: pe(i) }),
						(m.isDirty || m.dirtyFields || v.isDirty || v.dirtyFields) &&
							w.shouldDirty &&
							p.state.next({
								name: h,
								dirtyFields: Kt(n, i),
								isDirty: V(h, O),
							}))
					: D && !D._f && !Fe(O)
						? K(h, O, w)
						: ae(h, O, w),
				xa(h, l)
					? p.state.next({ ...s, name: h, values: pe(i) })
					: p.state.next({ name: o.mount ? h : void 0, values: pe(i) }));
		},
		R = async (h) => {
			o.mount = !0;
			const x = h.target;
			let w = x.name,
				D = !0;
			const T = P(a, w),
				O = (le) => {
					D =
						Number.isNaN(le) ||
						(Ft(le) && isNaN(le.getTime())) ||
						bt(le, P(i, w, le));
				},
				U = ts(t.mode),
				oe = ts(t.reValidateMode);
			if (T) {
				let le, De;
				const At = x.type ? Hn(T._f) : lf(h),
					ht = h.type === qn.BLUR || h.type === qn.FOCUS_OUT,
					Zo =
						(!wf(T._f) && !t.resolver && !P(s.errors, w) && !T._f.deps) ||
						kf(ht, P(s.touchedFields, w), s.isSubmitted, oe, U),
					Pr = xa(w, l, ht);
				(de(i, w, At),
					ht
						? (!x || !x.readOnly) && (T._f.onBlur && T._f.onBlur(h), c && c(0))
						: T._f.onChange && T._f.onChange(h));
				const Dr = N(w, At, ht),
					Go = !Oe(Dr) || Pr;
				if ((!ht && p.state.next({ name: w, type: h.type, values: pe(i) }), Zo))
					return (
						(m.isValid || v.isValid) &&
							(t.mode === "onBlur" ? ht && f() : ht || f()),
						Go && p.state.next({ name: w, ...(Pr ? {} : Dr) })
					);
				if ((!ht && Pr && p.state.next({ ...s }), t.resolver)) {
					const { errors: rn } = await te([w]);
					if ((S([w]), O(At), D)) {
						const Yo = Gn(s.errors, a, w),
							an = Gn(rn, a, Yo.name || w);
						((le = an.error), (w = an.name), (De = Oe(rn)));
					}
				} else
					(S([w], !0),
						(le = (await ga(T, l.disabled, i, g, t.shouldUseNativeValidation))[
							w
						]),
						S([w]),
						O(At),
						D &&
							(le
								? (De = !1)
								: (m.isValid || v.isValid) && (De = await L(a, !0))));
				D &&
					(T._f.deps &&
						(!Array.isArray(T._f.deps) || T._f.deps.length > 0) &&
						ge(T._f.deps),
					z(w, De, le, Dr));
			}
		},
		Y = (h, x) => {
			if (P(s.errors, x) && h.focus) return (h.focus(), 1);
		},
		ge = async (h, x = {}) => {
			let w, D;
			const T = Le(h);
			if (t.resolver) {
				const O = await se(fe(h) ? h : T);
				((w = Oe(O)), (D = h ? !T.some((U) => P(O, U)) : w));
			} else
				h
					? ((D = (
							await Promise.all(
								T.map(async (O) => {
									const U = P(a, O);
									return await L(U && U._f ? { [O]: U } : U);
								}),
							)
						).every(Boolean)),
						!(!D && !s.isValid) && f())
					: (D = w = await L(a));
			return (
				p.state.next({
					...(!Ve(h) || ((m.isValid || v.isValid) && w !== s.isValid)
						? {}
						: { name: h }),
					...(t.resolver || !h ? { isValid: w } : {}),
					errors: s.errors,
				}),
				x.shouldFocus && !D && as(a, Y, h ? T : l.mount),
				D
			);
		},
		ne = (h, x) => {
			let w = { ...(o.mount ? i : n) };
			return (
				x && (w = Ao(x.dirtyFields ? s.dirtyFields : s.touchedFields, w)),
				fe(h) ? w : Ve(h) ? P(w, h) : h.map((D) => P(w, D))
			);
		},
		Pe = (h, x) => ({
			invalid: !!P((x || s).errors, h),
			isDirty: !!P((x || s).dirtyFields, h),
			error: P((x || s).errors, h),
			isValidating: !!P(s.validatingFields, h),
			isTouched: !!P((x || s).touchedFields, h),
		}),
		Ae = (h) => {
			const x = h ? Le(h) : void 0;
			(x == null || x.forEach((w) => _e(s.errors, w)),
				x
					? x.forEach((w) => {
							p.state.next({ name: w, errors: s.errors });
						})
					: p.state.next({ errors: {} }));
		},
		Je = (h, x, w) => {
			const D = (P(a, h, { _f: {} })._f || {}).ref,
				T = P(s.errors, h) || {},
				{ ref: O, message: U, type: oe, ...le } = T;
			(de(s.errors, h, { ...le, ...x, ref: D }),
				p.state.next({ name: h, errors: s.errors, isValid: !1 }),
				w && w.shouldFocus && D && D.focus && D.focus());
		},
		Et = (h, x) =>
			Ye(h)
				? p.state.subscribe({
						next: (w) => "values" in w && h(W(void 0, x), w),
					})
				: W(h, x, !0),
		js = (h) =>
			p.state.subscribe({
				next: (x) => {
					_f(h.name, x.name, h.exact) &&
						Nf(x, h.formState || m, Ho, h.reRenderRoot) &&
						h.callback({ values: { ...i }, ...s, ...x, defaultValues: n });
				},
			}).unsubscribe,
		Zs = (h) => (
			(o.mount = !0),
			(v = { ...v, ...h.formState }),
			js({ ...h, formState: { ...u, ...h.formState } })
		),
		Xt = (h, x = {}) => {
			for (const w of h ? Le(h) : l.mount)
				(l.mount.delete(w),
					l.array.delete(w),
					x.keepValue || (_e(a, w), _e(i, w)),
					!x.keepError && _e(s.errors, w),
					!x.keepDirty && _e(s.dirtyFields, w),
					!x.keepTouched && _e(s.touchedFields, w),
					!x.keepIsValidating && _e(s.validatingFields, w),
					!t.shouldUnregister && !x.keepDefaultValue && _e(n, w));
			(p.state.next({ values: pe(i) }),
				p.state.next({ ...s, ...(x.keepDirty ? { isDirty: V() } : {}) }),
				!x.keepIsValid && f());
		},
		ie = ({ disabled: h, name: x }) => {
			if ((Qe(h) && o.mount) || h || l.disabled.has(x)) {
				const T = l.disabled.has(x) !== !!h;
				(h ? l.disabled.add(x) : l.disabled.delete(x),
					T && o.mount && !o.action && f());
			}
		},
		Ct = (h, x = {}) => {
			let w = P(a, h);
			const D = Qe(x.disabled) || Qe(t.disabled);
			return (
				de(a, h, {
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
					? ie({ disabled: Qe(x.disabled) ? x.disabled : t.disabled, name: h })
					: E(h, !0, x.value),
				{
					...(D ? { disabled: x.disabled || t.disabled } : {}),
					...(t.progressive
						? {
								required: !!x.required,
								min: ks(x.min),
								max: ks(x.max),
								minLength: ks(x.minLength),
								maxLength: ks(x.maxLength),
								pattern: ks(x.pattern),
							}
						: {}),
					name: h,
					onChange: R,
					onBlur: R,
					ref: (T) => {
						if (T) {
							(Ct(h, x), (w = P(a, h)));
							const O =
									(fe(T.value) &&
										T.querySelectorAll &&
										T.querySelectorAll("input,select,textarea")[0]) ||
									T,
								U = gf(O),
								oe = w._f.refs || [];
							if (U ? oe.find((le) => le === O) : O === w._f.ref) return;
							(de(a, h, {
								_f: {
									...w._f,
									...(U
										? {
												refs: [
													...oe.filter(Ur),
													O,
													...(Array.isArray(P(n, h)) ? [{}] : []),
												],
												ref: { type: O.type, name: h },
											}
										: { ref: O }),
								},
							}),
								E(h, !1, void 0, O));
						} else
							((w = P(a, h, {})),
								w._f && (w._f.mount = !1),
								(t.shouldUnregister || x.shouldUnregister) &&
									!(df(l.array, h) && o.action) &&
									l.unMount.add(h));
					},
				}
			);
		},
		Rr = () => t.shouldFocusError && as(a, Y, l.mount),
		zo = (h) => {
			Qe(h) &&
				(p.state.next({ disabled: h }),
				as(
					a,
					(x, w) => {
						const D = P(a, w);
						D &&
							((x.disabled = D._f.disabled || h),
							Array.isArray(D._f.refs) &&
								D._f.refs.forEach((T) => {
									T.disabled = D._f.disabled || h;
								}));
					},
					0,
					!1,
				));
		},
		Ka = (h, x) => async (w) => {
			let D;
			w && (w.preventDefault && w.preventDefault(), w.persist && w.persist());
			let T = pe(i);
			if ((p.state.next({ isSubmitting: !0 }), t.resolver)) {
				const { errors: O, values: U } = await te();
				(S(), (s.errors = O), (T = pe(U)));
			} else await L(a);
			if (l.disabled.size) for (const O of l.disabled) _e(T, O);
			if ((_e(s.errors, "root"), Oe(s.errors))) {
				p.state.next({ errors: {} });
				try {
					await h(T, w);
				} catch (O) {
					D = O;
				}
			} else (x && (await x({ ...s.errors }, w)), Rr(), setTimeout(Rr));
			if (
				(p.state.next({
					isSubmitted: !0,
					isSubmitting: !1,
					isSubmitSuccessful: Oe(s.errors) && !D,
					submitCount: s.submitCount + 1,
					errors: s.errors,
				}),
				D)
			)
				throw D;
		},
		Bo = (h, x = {}) => {
			P(a, h) &&
				(fe(x.defaultValue)
					? ve(h, pe(P(n, h)))
					: (ve(h, x.defaultValue), de(n, h, pe(x.defaultValue))),
				x.keepTouched || _e(s.touchedFields, h),
				x.keepDirty ||
					(_e(s.dirtyFields, h),
					(s.isDirty = x.defaultValue ? V(h, pe(P(n, h))) : V())),
				x.keepError || (_e(s.errors, h), m.isValid && f()),
				p.state.next({ ...s }));
		},
		en = (h, x = {}) => {
			const w = h ? pe(h) : n,
				D = pe(w),
				T = Oe(h),
				O = T ? n : D;
			if ((x.keepDefaultValues || (n = w), !x.keepValues)) {
				if (x.keepDirtyValues) {
					const U = new Set([...l.mount, ...Object.keys(Kt(n, i))]);
					for (const oe of Array.from(U)) {
						const le = P(s.dirtyFields, oe),
							De = P(i, oe),
							At = P(O, oe);
						le && !fe(De) ? de(O, oe, De) : !le && !fe(At) && ve(oe, At);
					}
				} else {
					if (Ga && fe(h))
						for (const U of l.mount) {
							const oe = P(a, U);
							if (oe && oe._f) {
								const le = Array.isArray(oe._f.refs)
									? oe._f.refs[0]
									: oe._f.ref;
								if (dr(le)) {
									const De = le.closest("form");
									if (De) {
										De.reset();
										break;
									}
								}
							}
						}
					if (x.keepFieldsRef) for (const U of l.mount) ve(U, P(O, U));
					else a = {};
				}
				((i = t.shouldUnregister ? (x.keepDefaultValues ? pe(n) : {}) : pe(O)),
					p.array.next({ values: { ...O } }),
					p.state.next({ values: { ...O } }));
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
					(!t.shouldUnregister && !Oe(O))),
				(o.watch = !!t.shouldUnregister),
				(o.keepIsValid = !!x.keepIsValid),
				(o.action = !1),
				x.keepErrors || (s.errors = {}),
				p.state.next({
					submitCount: x.keepSubmitCount ? s.submitCount : 0,
					isDirty: T
						? !1
						: x.keepDirty
							? s.isDirty
							: !!(x.keepDefaultValues && !bt(h, n)),
					isSubmitted: x.keepIsSubmitted ? s.isSubmitted : !1,
					dirtyFields: T
						? {}
						: x.keepDirtyValues
							? x.keepDefaultValues && i
								? Kt(n, i)
								: s.dirtyFields
							: x.keepDefaultValues && h
								? Kt(n, h)
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
		tn = (h, x) => en(Ye(h) ? h(i) : h, { ...t.resetOptions, ...x }),
		Wo = (h, x = {}) => {
			const w = P(a, h),
				D = w && w._f;
			if (D) {
				const T = D.refs ? D.refs[0] : D.ref;
				T.focus &&
					setTimeout(() => {
						(T.focus(), x.shouldSelect && Ye(T.select) && T.select());
					});
			}
		},
		Ho = (h) => {
			s = { ...s, ...h };
		},
		sn = {
			control: {
				register: Ct,
				unregister: Xt,
				getFieldState: Pe,
				handleSubmit: Ka,
				setError: Je,
				_subscribe: js,
				_runSchema: te,
				_updateIsValidating: S,
				_focusError: Rr,
				_getWatch: W,
				_getDirty: V,
				_setValid: f,
				_setFieldArray: y,
				_setDisabledField: ie,
				_setErrors: _,
				_getFieldArray: Q,
				_reset: en,
				_resetDefaultValues: () =>
					Ye(t.defaultValues) &&
					t.defaultValues().then((h) => {
						(tn(h, t.resetOptions), p.state.next({ isLoading: !1 }));
					}),
				_removeUnmounted: be,
				_disableForm: zo,
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
			subscribe: Zs,
			trigger: ge,
			register: Ct,
			handleSubmit: Ka,
			watch: Et,
			setValue: ve,
			getValues: ne,
			reset: tn,
			resetField: Bo,
			clearErrors: Ae,
			unregister: Xt,
			setError: Je,
			setFocus: Wo,
			getFieldState: Pe,
		};
	return { ...sn, formControl: sn };
}
var xt = () => {
		if (typeof crypto < "u" && crypto.randomUUID) return crypto.randomUUID();
		const e = typeof performance > "u" ? Date.now() : performance.now() * 1e3;
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
			const s = ((Math.random() * 16 + e) % 16) | 0;
			return (t == "x" ? s : (s & 3) | 8).toString(16);
		});
	},
	zr = (e, t, s = {}) =>
		s.shouldFocus || fe(s.shouldFocus)
			? s.focusName || `${e}.${fe(s.focusIndex) ? t : s.focusIndex}.`
			: "",
	Br = (e, t) => [...e, ...Le(t)],
	Wr = (e) => (Array.isArray(e) ? e.map(() => {}) : void 0);
function Hr(e, t, s) {
	return [...e.slice(0, t), ...Le(s), ...e.slice(t)];
}
var Zr = (e, t, s) =>
		Array.isArray(e)
			? (fe(e[s]) && (e[s] = void 0), e.splice(s, 0, e.splice(t, 1)[0]), e)
			: [],
	Gr = (e, t) => [...Le(t), ...Le(e)];
function Af(e, t) {
	let s = 0;
	const a = [...e];
	for (const n of t) (a.splice(n - s, 1), s++);
	return Tr(a).length ? a : [];
}
var Yr = (e, t) =>
		fe(t)
			? []
			: Af(
					e,
					Le(t).sort((s, a) => s - a),
				),
	Xr = (e, t, s) => {
		[e[t], e[s]] = [e[s], e[t]];
	},
	Xn = (e, t, s) => ((e[t] = s), e);
function x0(e) {
	const t = mf(),
		{
			control: s = t,
			name: a,
			keyName: n = "id",
			shouldUnregister: i,
			rules: o,
		} = e,
		[l, c] = F.useState(s._getFieldArray(a)),
		d = F.useRef(s._getFieldArray(a).map(xt)),
		u = F.useRef(!1);
	(s._names.array.add(a),
		F.useMemo(
			() => o && l.length >= 0 && s.register(a, o),
			[s, a, l.length, o],
		),
		Eo(
			() =>
				s._subjects.array.subscribe({
					next: ({ values: _, name: E }) => {
						if (E === a || !E) {
							const N = P(_, a);
							Array.isArray(N) && (c(N), (d.current = N.map(xt)));
						}
					},
				}).unsubscribe,
			[s, a],
		));
	const m = F.useCallback(
			(_) => {
				((u.current = !0), s._setFieldArray(a, _));
			},
			[s, a],
		),
		v = (_, E) => {
			const N = Le(pe(_)),
				z = Br(s._getFieldArray(a), N);
			((s._names.focus = zr(a, z.length - 1, E)),
				(d.current = Br(d.current, N.map(xt))),
				m(z),
				c(z),
				s._setFieldArray(a, z, Br, { argA: Wr(_) }));
		},
		p = (_, E) => {
			const N = Le(pe(_)),
				z = Gr(s._getFieldArray(a), N);
			((s._names.focus = zr(a, 0, E)),
				(d.current = Gr(d.current, N.map(xt))),
				m(z),
				c(z),
				s._setFieldArray(a, z, Gr, { argA: Wr(_) }));
		},
		g = (_) => {
			const E = Yr(s._getFieldArray(a), _);
			((d.current = Yr(d.current, _)),
				m(E),
				c(E),
				!Array.isArray(P(s._fields, a)) && de(s._fields, a, void 0),
				s._setFieldArray(a, E, Yr, { argA: _ }));
		},
		j = (_, E, N) => {
			const z = Le(pe(E)),
				te = Hr(s._getFieldArray(a), _, z);
			((s._names.focus = zr(a, _, N)),
				(d.current = Hr(d.current, _, z.map(xt))),
				m(te),
				c(te),
				s._setFieldArray(a, te, Hr, { argA: _, argB: Wr(E) }));
		},
		f = (_, E) => {
			const N = s._getFieldArray(a);
			(Xr(N, _, E),
				Xr(d.current, _, E),
				m(N),
				c(N),
				s._setFieldArray(a, N, Xr, { argA: _, argB: E }, !1));
		},
		S = (_, E) => {
			const N = s._getFieldArray(a);
			(Zr(N, _, E),
				Zr(d.current, _, E),
				m(N),
				c(N),
				s._setFieldArray(a, N, Zr, { argA: _, argB: E }, !1));
		},
		y = (_, E) => {
			const N = pe(E),
				z = Xn(s._getFieldArray(a), _, N);
			((d.current = [...z].map((te, se) =>
				!te || se === _ ? xt() : d.current[se],
			)),
				m(z),
				c([...z]),
				s._setFieldArray(a, z, Xn, { argA: _, argB: N }, !0, !1));
		},
		k = (_) => {
			const E = Le(pe(_));
			((d.current = E.map(xt)),
				m([...E]),
				c([...E]),
				s._setFieldArray(a, [...E], (N) => N, {}, !0, !1));
		};
	return (
		F.useEffect(() => {
			if (
				((s._state.action = !1),
				xa(a, s._names) && s._subjects.state.next({ ...s._formState }),
				u.current &&
					(!ts(s._options.mode).isOnSubmit || s._formState.isSubmitted) &&
					!ts(s._options.reValidateMode).isOnSubmit)
			)
				if (s._options.resolver)
					s._runSchema([a]).then((_) => {
						s._updateIsValidating([a]);
						const E = P(_.errors, a),
							N = P(s._formState.errors, a);
						(N
							? (!E && N.type) ||
								(E && (N.type !== E.type || N.message !== E.message))
							: E && E.type) &&
							(E ? de(s._formState.errors, a, E) : _e(s._formState.errors, a),
							s._subjects.state.next({ errors: s._formState.errors }));
					});
				else {
					const _ = P(s._fields, a);
					_ &&
						_._f &&
						!(
							ts(s._options.reValidateMode).isOnSubmit &&
							ts(s._options.mode).isOnSubmit
						) &&
						ga(
							_,
							s._names.disabled,
							s._formValues,
							s._options.criteriaMode === Be.all,
							s._options.shouldUseNativeValidation,
							!0,
						).then(
							(E) =>
								!Oe(E) &&
								s._subjects.state.next({
									errors: Io(s._formState.errors, E, a),
								}),
						);
				}
			(s._subjects.state.next({ name: a, values: pe(s._formValues) }),
				s._names.focus &&
					as(s._fields, (_, E) => {
						if (s._names.focus && E.startsWith(s._names.focus) && _.focus)
							return (_.focus(), 1);
					}),
				(s._names.focus = ""),
				s._setValid(),
				(u.current = !1));
		}, [l, a, s]),
		F.useEffect(
			() => (
				!P(s._formValues, a) && s._setFieldArray(a),
				() => {
					const _ = (E, N) => {
						const z = P(s._fields, E);
						z && z._f && (z._f.mount = N);
					};
					s._options.shouldUnregister || i ? s.unregister(a) : _(a, !1);
				}
			),
			[a, s, n, i],
		),
		{
			swap: F.useCallback(f, [m, a, s]),
			move: F.useCallback(S, [m, a, s]),
			prepend: F.useCallback(p, [m, a, s]),
			append: F.useCallback(v, [m, a, s]),
			remove: F.useCallback(g, [m, a, s]),
			insert: F.useCallback(j, [m, a, s]),
			update: F.useCallback(y, [m, a, s]),
			replace: F.useCallback(k, [m, a, s]),
			fields: F.useMemo(
				() => l.map((_, E) => ({ ..._, [n]: d.current[E] || xt() })),
				[l, n],
			),
		}
	);
}
function Ut(e = {}) {
	const t = F.useRef(void 0),
		s = F.useRef(void 0),
		[a, n] = F.useState({
			isDirty: !1,
			isValidating: !1,
			isLoading: Ye(e.defaultValues),
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
			defaultValues: Ye(e.defaultValues) ? void 0 : e.defaultValues,
		});
	if (!t.current)
		if (e.formControl)
			((t.current = { ...e.formControl, formState: a }),
				e.defaultValues &&
					!Ye(e.defaultValues) &&
					e.formControl.reset(e.defaultValues, e.resetOptions));
		else {
			const { formControl: o, ...l } = Cf(e);
			t.current = { ...l, formState: a };
		}
	const i = t.current.control;
	return (
		(i._options = e),
		Eo(() => {
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
		F.useEffect(() => i._disableForm(e.disabled), [i, e.disabled]),
		F.useEffect(() => {
			(e.mode && (i._options.mode = e.mode),
				e.reValidateMode && (i._options.reValidateMode = e.reValidateMode));
		}, [i, e.mode, e.reValidateMode]),
		F.useEffect(() => {
			e.errors && (i._setErrors(e.errors), i._focusError());
		}, [i, e.errors]),
		F.useEffect(() => {
			e.shouldUnregister && i._subjects.state.next({ values: i._getWatch() });
		}, [i, e.shouldUnregister]),
		F.useEffect(() => {
			if (i._proxyFormState.isDirty) {
				const o = i._getDirty();
				o !== a.isDirty && i._subjects.state.next({ isDirty: o });
			}
		}, [i, a.isDirty]),
		F.useEffect(() => {
			var o;
			e.values && !bt(e.values, s.current)
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
		F.useEffect(() => {
			(i._state.mount || (i._setValid(), (i._state.mount = !0)),
				i._state.watch &&
					((i._state.watch = !1), i._subjects.state.next({ ...i._formState })),
				i._removeUnmounted());
		}),
		(t.current.formState = F.useMemo(() => hf(a, i), [i, a])),
		t.current
	);
}
const Jn = (e, t, s) => {
		if (e && "reportValidity" in e) {
			const a = P(s, t);
			(e.setCustomValidity((a && a.message) || ""), e.reportValidity());
		}
	},
	Fo = (e, t) => {
		for (const s in t.fields) {
			const a = t.fields[s];
			a && a.ref && "reportValidity" in a.ref
				? Jn(a.ref, s, e)
				: a.refs && a.refs.forEach((n) => Jn(n, s, e));
		}
	},
	Of = (e, t) => {
		t.shouldUseNativeValidation && Fo(e, t);
		const s = {};
		for (const a in e) {
			const n = P(t.fields, a),
				i = Object.assign(e[a] || {}, { ref: n && n.ref });
			if (Tf(t.names || Object.keys(e), a)) {
				const o = Object.assign({}, P(s, a));
				(de(o, "root", i), de(s, a, o));
			} else de(s, a, i);
		}
		return s;
	},
	Tf = (e, t) => e.some((s) => s.startsWith(t + "."));
var Rf = function (e, t) {
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
				s[o] = Co(o, t, s, n, d ? [].concat(d, a.message) : a.message);
			}
			e.shift();
		}
		return s;
	},
	zt = function (e, t, s) {
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
										i.shouldUseNativeValidation && Fo({}, i),
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
									errors: Of(
										Rf(
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
	re;
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
})(re || (re = {}));
var Qn;
(function (e) {
	e.mergeShapes = (t, s) => ({ ...t, ...s });
})(Qn || (Qn = {}));
const M = re.arrayToEnum([
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
	pt = (e) => {
		switch (typeof e) {
			case "undefined":
				return M.undefined;
			case "string":
				return M.string;
			case "number":
				return Number.isNaN(e) ? M.nan : M.number;
			case "boolean":
				return M.boolean;
			case "function":
				return M.function;
			case "bigint":
				return M.bigint;
			case "symbol":
				return M.symbol;
			case "object":
				return Array.isArray(e)
					? M.array
					: e === null
						? M.null
						: e.then &&
							  typeof e.then == "function" &&
							  e.catch &&
							  typeof e.catch == "function"
							? M.promise
							: typeof Map < "u" && e instanceof Map
								? M.map
								: typeof Set < "u" && e instanceof Set
									? M.set
									: typeof Date < "u" && e instanceof Date
										? M.date
										: M.object;
			default:
				return M.unknown;
		}
	},
	C = re.arrayToEnum([
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
class mt extends Error {
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
		if (!(t instanceof mt)) throw new Error(`Not a ZodError: ${t}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, re.jsonStringifyReplacer, 2);
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
mt.create = (e) => new mt(e);
const pa = (e, t) => {
	let s;
	switch (e.code) {
		case C.invalid_type:
			e.received === M.undefined
				? (s = "Required")
				: (s = `Expected ${e.expected}, received ${e.received}`);
			break;
		case C.invalid_literal:
			s = `Invalid literal value, expected ${JSON.stringify(e.expected, re.jsonStringifyReplacer)}`;
			break;
		case C.unrecognized_keys:
			s = `Unrecognized key(s) in object: ${re.joinValues(e.keys, ", ")}`;
			break;
		case C.invalid_union:
			s = "Invalid input";
			break;
		case C.invalid_union_discriminator:
			s = `Invalid discriminator value. Expected ${re.joinValues(e.options)}`;
			break;
		case C.invalid_enum_value:
			s = `Invalid enum value. Expected ${re.joinValues(e.options)}, received '${e.received}'`;
			break;
		case C.invalid_arguments:
			s = "Invalid function arguments";
			break;
		case C.invalid_return_type:
			s = "Invalid function return type";
			break;
		case C.invalid_date:
			s = "Invalid date";
			break;
		case C.invalid_string:
			typeof e.validation == "object"
				? "includes" in e.validation
					? ((s = `Invalid input: must include "${e.validation.includes}"`),
						typeof e.validation.position == "number" &&
							(s = `${s} at one or more positions greater than or equal to ${e.validation.position}`))
					: "startsWith" in e.validation
						? (s = `Invalid input: must start with "${e.validation.startsWith}"`)
						: "endsWith" in e.validation
							? (s = `Invalid input: must end with "${e.validation.endsWith}"`)
							: re.assertNever(e.validation)
				: e.validation !== "regex"
					? (s = `Invalid ${e.validation}`)
					: (s = "Invalid");
			break;
		case C.too_small:
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
		case C.too_big:
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
		case C.custom:
			s = "Invalid input";
			break;
		case C.invalid_intersection_types:
			s = "Intersection results could not be merged";
			break;
		case C.not_multiple_of:
			s = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case C.not_finite:
			s = "Number must be finite";
			break;
		default:
			((s = t.defaultError), re.assertNever(e));
	}
	return { message: s };
};
let Pf = pa;
function Df() {
	return Pf;
}
const If = (e) => {
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
function I(e, t) {
	const s = Df(),
		a = If({
			issueData: t,
			data: e.data,
			path: e.path,
			errorMaps: [
				e.common.contextualErrorMap,
				e.schemaErrorMap,
				s,
				s === pa ? void 0 : pa,
			].filter((n) => !!n),
		});
	e.common.issues.push(a);
}
class Ue {
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
			if (n.status === "aborted") return Z;
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
		return Ue.mergeObjectSync(t, a);
	}
	static mergeObjectSync(t, s) {
		const a = {};
		for (const n of s) {
			const { key: i, value: o } = n;
			if (i.status === "aborted" || o.status === "aborted") return Z;
			(i.status === "dirty" && t.dirty(),
				o.status === "dirty" && t.dirty(),
				i.value !== "__proto__" &&
					(typeof o.value < "u" || n.alwaysSet) &&
					(a[i.value] = o.value));
		}
		return { status: t.value, value: a };
	}
}
const Z = Object.freeze({ status: "aborted" }),
	Es = (e) => ({ status: "dirty", value: e }),
	Ge = (e) => ({ status: "valid", value: e }),
	Kn = (e) => e.status === "aborted",
	ei = (e) => e.status === "dirty",
	us = (e) => e.status === "valid",
	mr = (e) => typeof Promise < "u" && e instanceof Promise;
var $;
(function (e) {
	((e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
		(e.toString = (t) =>
			typeof t == "string" ? t : t == null ? void 0 : t.message));
})($ || ($ = {}));
class _t {
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
const ti = (e, t) => {
	if (us(t)) return { success: !0, data: t.value };
	if (!e.common.issues.length)
		throw new Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			const s = new mt(e.common.issues);
			return ((this._error = s), this._error);
		},
	};
};
function J(e) {
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
		return pt(t.data);
	}
	_getOrReturnCtx(t, s) {
		return (
			s || {
				common: t.parent.common,
				data: t.data,
				parsedType: pt(t.data),
				schemaErrorMap: this._def.errorMap,
				path: t.path,
				parent: t.parent,
			}
		);
	}
	_processInputParams(t) {
		return {
			status: new Ue(),
			ctx: {
				common: t.parent.common,
				data: t.data,
				parsedType: pt(t.data),
				schemaErrorMap: this._def.errorMap,
				path: t.path,
				parent: t.parent,
			},
		};
	}
	_parseSync(t) {
		const s = this._parse(t);
		if (mr(s)) throw new Error("Synchronous parse encountered promise.");
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
				parsedType: pt(t),
			},
			n = this._parseSync({ data: t, path: a.path, parent: a });
		return ti(a, n);
	}
	"~validate"(t) {
		var a, n;
		const s = {
			common: { issues: [], async: !!this["~standard"].async },
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: t,
			parsedType: pt(t),
		};
		if (!this["~standard"].async)
			try {
				const i = this._parseSync({ data: t, path: [], parent: s });
				return us(i) ? { value: i.value } : { issues: s.common.issues };
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
			us(i) ? { value: i.value } : { issues: s.common.issues },
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
				parsedType: pt(t),
			},
			n = this._parse({ data: t, path: a.path, parent: a }),
			i = await (mr(n) ? n : Promise.resolve(n));
		return ti(a, i);
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
				l = () => i.addIssue({ code: C.custom, ...a(n) });
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
		return new fs({
			schema: this,
			typeName: G.ZodEffects,
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
		return vt.create(this, this._def);
	}
	nullable() {
		return xs.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return at.create(this);
	}
	promise() {
		return gr.create(this, this._def);
	}
	or(t) {
		return fr.create([this, t], this._def);
	}
	and(t) {
		return xr.create(this, t, this._def);
	}
	transform(t) {
		return new fs({
			...J(this._def),
			schema: this,
			typeName: G.ZodEffects,
			effect: { type: "transform", transform: t },
		});
	}
	default(t) {
		const s = typeof t == "function" ? t : () => t;
		return new ja({
			...J(this._def),
			innerType: this,
			defaultValue: s,
			typeName: G.ZodDefault,
		});
	}
	brand() {
		return new ax({ typeName: G.ZodBranded, type: this, ...J(this._def) });
	}
	catch(t) {
		const s = typeof t == "function" ? t : () => t;
		return new wa({
			...J(this._def),
			innerType: this,
			catchValue: s,
			typeName: G.ZodCatch,
		});
	}
	describe(t) {
		const s = this.constructor;
		return new s({ ...this._def, description: t });
	}
	pipe(t) {
		return Qa.create(this, t);
	}
	readonly() {
		return Na.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}
const Ff = /^c[^\s-]{8,}$/i,
	Lf = /^[0-9a-z]+$/,
	Mf = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
	$f =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
	Vf = /^[a-z0-9_-]{21}$/i,
	qf = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
	Uf =
		/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
	zf =
		/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
	Bf = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Jr;
const Wf =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	Hf =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	Zf =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
	Gf =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	Yf = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	Xf = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	Lo =
		"((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
	Jf = new RegExp(`^${Lo}$`);
function Mo(e) {
	let t = "[0-5]\\d";
	e.precision
		? (t = `${t}\\.\\d{${e.precision}}`)
		: e.precision == null && (t = `${t}(\\.\\d+)?`);
	const s = e.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${s}`;
}
function Qf(e) {
	return new RegExp(`^${Mo(e)}$`);
}
function Kf(e) {
	let t = `${Lo}T${Mo(e)}`;
	const s = [];
	return (
		s.push(e.local ? "Z?" : "Z"),
		e.offset && s.push("([+-]\\d{2}:?\\d{2})"),
		(t = `${t}(${s.join("|")})`),
		new RegExp(`^${t}$`)
	);
}
function ex(e, t) {
	return !!(
		((t === "v4" || !t) && Wf.test(e)) ||
		((t === "v6" || !t) && Zf.test(e))
	);
}
function tx(e, t) {
	if (!qf.test(e)) return !1;
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
function sx(e, t) {
	return !!(
		((t === "v4" || !t) && Hf.test(e)) ||
		((t === "v6" || !t) && Gf.test(e))
	);
}
class lt extends ee {
	_parse(t) {
		if (
			(this._def.coerce && (t.data = String(t.data)),
			this._getType(t) !== M.string)
		) {
			const i = this._getOrReturnCtx(t);
			return (
				I(i, {
					code: C.invalid_type,
					expected: M.string,
					received: i.parsedType,
				}),
				Z
			);
		}
		const a = new Ue();
		let n;
		for (const i of this._def.checks)
			if (i.kind === "min")
				t.data.length < i.value &&
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						code: C.too_small,
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
					I(n, {
						code: C.too_big,
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
						? I(n, {
								code: C.too_big,
								maximum: i.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: i.message,
							})
						: l &&
							I(n, {
								code: C.too_small,
								minimum: i.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: i.message,
							}),
					a.dirty());
			} else if (i.kind === "email")
				zf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						validation: "email",
						code: C.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "emoji")
				(Jr || (Jr = new RegExp(Bf, "u")),
					Jr.test(t.data) ||
						((n = this._getOrReturnCtx(t, n)),
						I(n, {
							validation: "emoji",
							code: C.invalid_string,
							message: i.message,
						}),
						a.dirty()));
			else if (i.kind === "uuid")
				$f.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						validation: "uuid",
						code: C.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "nanoid")
				Vf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						validation: "nanoid",
						code: C.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "cuid")
				Ff.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						validation: "cuid",
						code: C.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "cuid2")
				Lf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						validation: "cuid2",
						code: C.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "ulid")
				Mf.test(t.data) ||
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						validation: "ulid",
						code: C.invalid_string,
						message: i.message,
					}),
					a.dirty());
			else if (i.kind === "url")
				try {
					new URL(t.data);
				} catch {
					((n = this._getOrReturnCtx(t, n)),
						I(n, {
							validation: "url",
							code: C.invalid_string,
							message: i.message,
						}),
						a.dirty());
				}
			else
				i.kind === "regex"
					? ((i.regex.lastIndex = 0),
						i.regex.test(t.data) ||
							((n = this._getOrReturnCtx(t, n)),
							I(n, {
								validation: "regex",
								code: C.invalid_string,
								message: i.message,
							}),
							a.dirty()))
					: i.kind === "trim"
						? (t.data = t.data.trim())
						: i.kind === "includes"
							? t.data.includes(i.value, i.position) ||
								((n = this._getOrReturnCtx(t, n)),
								I(n, {
									code: C.invalid_string,
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
											I(n, {
												code: C.invalid_string,
												validation: { startsWith: i.value },
												message: i.message,
											}),
											a.dirty())
										: i.kind === "endsWith"
											? t.data.endsWith(i.value) ||
												((n = this._getOrReturnCtx(t, n)),
												I(n, {
													code: C.invalid_string,
													validation: { endsWith: i.value },
													message: i.message,
												}),
												a.dirty())
											: i.kind === "datetime"
												? Kf(i).test(t.data) ||
													((n = this._getOrReturnCtx(t, n)),
													I(n, {
														code: C.invalid_string,
														validation: "datetime",
														message: i.message,
													}),
													a.dirty())
												: i.kind === "date"
													? Jf.test(t.data) ||
														((n = this._getOrReturnCtx(t, n)),
														I(n, {
															code: C.invalid_string,
															validation: "date",
															message: i.message,
														}),
														a.dirty())
													: i.kind === "time"
														? Qf(i).test(t.data) ||
															((n = this._getOrReturnCtx(t, n)),
															I(n, {
																code: C.invalid_string,
																validation: "time",
																message: i.message,
															}),
															a.dirty())
														: i.kind === "duration"
															? Uf.test(t.data) ||
																((n = this._getOrReturnCtx(t, n)),
																I(n, {
																	validation: "duration",
																	code: C.invalid_string,
																	message: i.message,
																}),
																a.dirty())
															: i.kind === "ip"
																? ex(t.data, i.version) ||
																	((n = this._getOrReturnCtx(t, n)),
																	I(n, {
																		validation: "ip",
																		code: C.invalid_string,
																		message: i.message,
																	}),
																	a.dirty())
																: i.kind === "jwt"
																	? tx(t.data, i.alg) ||
																		((n = this._getOrReturnCtx(t, n)),
																		I(n, {
																			validation: "jwt",
																			code: C.invalid_string,
																			message: i.message,
																		}),
																		a.dirty())
																	: i.kind === "cidr"
																		? sx(t.data, i.version) ||
																			((n = this._getOrReturnCtx(t, n)),
																			I(n, {
																				validation: "cidr",
																				code: C.invalid_string,
																				message: i.message,
																			}),
																			a.dirty())
																		: i.kind === "base64"
																			? Yf.test(t.data) ||
																				((n = this._getOrReturnCtx(t, n)),
																				I(n, {
																					validation: "base64",
																					code: C.invalid_string,
																					message: i.message,
																				}),
																				a.dirty())
																			: i.kind === "base64url"
																				? Xf.test(t.data) ||
																					((n = this._getOrReturnCtx(t, n)),
																					I(n, {
																						validation: "base64url",
																						code: C.invalid_string,
																						message: i.message,
																					}),
																					a.dirty())
																				: re.assertNever(i);
		return { status: a.value, value: t.data };
	}
	_regex(t, s, a) {
		return this.refinement((n) => t.test(n), {
			validation: s,
			code: C.invalid_string,
			...$.errToObj(a),
		});
	}
	_addCheck(t) {
		return new lt({ ...this._def, checks: [...this._def.checks, t] });
	}
	email(t) {
		return this._addCheck({ kind: "email", ...$.errToObj(t) });
	}
	url(t) {
		return this._addCheck({ kind: "url", ...$.errToObj(t) });
	}
	emoji(t) {
		return this._addCheck({ kind: "emoji", ...$.errToObj(t) });
	}
	uuid(t) {
		return this._addCheck({ kind: "uuid", ...$.errToObj(t) });
	}
	nanoid(t) {
		return this._addCheck({ kind: "nanoid", ...$.errToObj(t) });
	}
	cuid(t) {
		return this._addCheck({ kind: "cuid", ...$.errToObj(t) });
	}
	cuid2(t) {
		return this._addCheck({ kind: "cuid2", ...$.errToObj(t) });
	}
	ulid(t) {
		return this._addCheck({ kind: "ulid", ...$.errToObj(t) });
	}
	base64(t) {
		return this._addCheck({ kind: "base64", ...$.errToObj(t) });
	}
	base64url(t) {
		return this._addCheck({ kind: "base64url", ...$.errToObj(t) });
	}
	jwt(t) {
		return this._addCheck({ kind: "jwt", ...$.errToObj(t) });
	}
	ip(t) {
		return this._addCheck({ kind: "ip", ...$.errToObj(t) });
	}
	cidr(t) {
		return this._addCheck({ kind: "cidr", ...$.errToObj(t) });
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
					...$.errToObj(t == null ? void 0 : t.message),
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
					...$.errToObj(t == null ? void 0 : t.message),
				});
	}
	duration(t) {
		return this._addCheck({ kind: "duration", ...$.errToObj(t) });
	}
	regex(t, s) {
		return this._addCheck({ kind: "regex", regex: t, ...$.errToObj(s) });
	}
	includes(t, s) {
		return this._addCheck({
			kind: "includes",
			value: t,
			position: s == null ? void 0 : s.position,
			...$.errToObj(s == null ? void 0 : s.message),
		});
	}
	startsWith(t, s) {
		return this._addCheck({ kind: "startsWith", value: t, ...$.errToObj(s) });
	}
	endsWith(t, s) {
		return this._addCheck({ kind: "endsWith", value: t, ...$.errToObj(s) });
	}
	min(t, s) {
		return this._addCheck({ kind: "min", value: t, ...$.errToObj(s) });
	}
	max(t, s) {
		return this._addCheck({ kind: "max", value: t, ...$.errToObj(s) });
	}
	length(t, s) {
		return this._addCheck({ kind: "length", value: t, ...$.errToObj(s) });
	}
	nonempty(t) {
		return this.min(1, $.errToObj(t));
	}
	trim() {
		return new lt({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }],
		});
	}
	toLowerCase() {
		return new lt({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }],
		});
	}
	toUpperCase() {
		return new lt({
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
lt.create = (e) =>
	new lt({
		checks: [],
		typeName: G.ZodString,
		coerce: (e == null ? void 0 : e.coerce) ?? !1,
		...J(e),
	});
function rx(e, t) {
	const s = (e.toString().split(".")[1] || "").length,
		a = (t.toString().split(".")[1] || "").length,
		n = s > a ? s : a,
		i = Number.parseInt(e.toFixed(n).replace(".", "")),
		o = Number.parseInt(t.toFixed(n).replace(".", ""));
	return (i % o) / 10 ** n;
}
class Bt extends ee {
	constructor() {
		(super(...arguments),
			(this.min = this.gte),
			(this.max = this.lte),
			(this.step = this.multipleOf));
	}
	_parse(t) {
		if (
			(this._def.coerce && (t.data = Number(t.data)),
			this._getType(t) !== M.number)
		) {
			const i = this._getOrReturnCtx(t);
			return (
				I(i, {
					code: C.invalid_type,
					expected: M.number,
					received: i.parsedType,
				}),
				Z
			);
		}
		let a;
		const n = new Ue();
		for (const i of this._def.checks)
			i.kind === "int"
				? re.isInteger(t.data) ||
					((a = this._getOrReturnCtx(t, a)),
					I(a, {
						code: C.invalid_type,
						expected: "integer",
						received: "float",
						message: i.message,
					}),
					n.dirty())
				: i.kind === "min"
					? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
						((a = this._getOrReturnCtx(t, a)),
						I(a, {
							code: C.too_small,
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
							I(a, {
								code: C.too_big,
								maximum: i.value,
								type: "number",
								inclusive: i.inclusive,
								exact: !1,
								message: i.message,
							}),
							n.dirty())
						: i.kind === "multipleOf"
							? rx(t.data, i.value) !== 0 &&
								((a = this._getOrReturnCtx(t, a)),
								I(a, {
									code: C.not_multiple_of,
									multipleOf: i.value,
									message: i.message,
								}),
								n.dirty())
							: i.kind === "finite"
								? Number.isFinite(t.data) ||
									((a = this._getOrReturnCtx(t, a)),
									I(a, { code: C.not_finite, message: i.message }),
									n.dirty())
								: re.assertNever(i);
		return { status: n.value, value: t.data };
	}
	gte(t, s) {
		return this.setLimit("min", t, !0, $.toString(s));
	}
	gt(t, s) {
		return this.setLimit("min", t, !1, $.toString(s));
	}
	lte(t, s) {
		return this.setLimit("max", t, !0, $.toString(s));
	}
	lt(t, s) {
		return this.setLimit("max", t, !1, $.toString(s));
	}
	setLimit(t, s, a, n) {
		return new Bt({
			...this._def,
			checks: [
				...this._def.checks,
				{ kind: t, value: s, inclusive: a, message: $.toString(n) },
			],
		});
	}
	_addCheck(t) {
		return new Bt({ ...this._def, checks: [...this._def.checks, t] });
	}
	int(t) {
		return this._addCheck({ kind: "int", message: $.toString(t) });
	}
	positive(t) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: $.toString(t),
		});
	}
	negative(t) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: $.toString(t),
		});
	}
	nonpositive(t) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: $.toString(t),
		});
	}
	nonnegative(t) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: $.toString(t),
		});
	}
	multipleOf(t, s) {
		return this._addCheck({
			kind: "multipleOf",
			value: t,
			message: $.toString(s),
		});
	}
	finite(t) {
		return this._addCheck({ kind: "finite", message: $.toString(t) });
	}
	safe(t) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: Number.MIN_SAFE_INTEGER,
			message: $.toString(t),
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: Number.MAX_SAFE_INTEGER,
			message: $.toString(t),
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
				t.kind === "int" || (t.kind === "multipleOf" && re.isInteger(t.value)),
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
Bt.create = (e) =>
	new Bt({
		checks: [],
		typeName: G.ZodNumber,
		coerce: (e == null ? void 0 : e.coerce) || !1,
		...J(e),
	});
class Wt extends ee {
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
		if (this._getType(t) !== M.bigint) return this._getInvalidInput(t);
		let a;
		const n = new Ue();
		for (const i of this._def.checks)
			i.kind === "min"
				? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
					((a = this._getOrReturnCtx(t, a)),
					I(a, {
						code: C.too_small,
						type: "bigint",
						minimum: i.value,
						inclusive: i.inclusive,
						message: i.message,
					}),
					n.dirty())
				: i.kind === "max"
					? (i.inclusive ? t.data > i.value : t.data >= i.value) &&
						((a = this._getOrReturnCtx(t, a)),
						I(a, {
							code: C.too_big,
							type: "bigint",
							maximum: i.value,
							inclusive: i.inclusive,
							message: i.message,
						}),
						n.dirty())
					: i.kind === "multipleOf"
						? t.data % i.value !== BigInt(0) &&
							((a = this._getOrReturnCtx(t, a)),
							I(a, {
								code: C.not_multiple_of,
								multipleOf: i.value,
								message: i.message,
							}),
							n.dirty())
						: re.assertNever(i);
		return { status: n.value, value: t.data };
	}
	_getInvalidInput(t) {
		const s = this._getOrReturnCtx(t);
		return (
			I(s, {
				code: C.invalid_type,
				expected: M.bigint,
				received: s.parsedType,
			}),
			Z
		);
	}
	gte(t, s) {
		return this.setLimit("min", t, !0, $.toString(s));
	}
	gt(t, s) {
		return this.setLimit("min", t, !1, $.toString(s));
	}
	lte(t, s) {
		return this.setLimit("max", t, !0, $.toString(s));
	}
	lt(t, s) {
		return this.setLimit("max", t, !1, $.toString(s));
	}
	setLimit(t, s, a, n) {
		return new Wt({
			...this._def,
			checks: [
				...this._def.checks,
				{ kind: t, value: s, inclusive: a, message: $.toString(n) },
			],
		});
	}
	_addCheck(t) {
		return new Wt({ ...this._def, checks: [...this._def.checks, t] });
	}
	positive(t) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: $.toString(t),
		});
	}
	negative(t) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: $.toString(t),
		});
	}
	nonpositive(t) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: $.toString(t),
		});
	}
	nonnegative(t) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: $.toString(t),
		});
	}
	multipleOf(t, s) {
		return this._addCheck({
			kind: "multipleOf",
			value: t,
			message: $.toString(s),
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
Wt.create = (e) =>
	new Wt({
		checks: [],
		typeName: G.ZodBigInt,
		coerce: (e == null ? void 0 : e.coerce) ?? !1,
		...J(e),
	});
class hr extends ee {
	_parse(t) {
		if (
			(this._def.coerce && (t.data = !!t.data), this._getType(t) !== M.boolean)
		) {
			const a = this._getOrReturnCtx(t);
			return (
				I(a, {
					code: C.invalid_type,
					expected: M.boolean,
					received: a.parsedType,
				}),
				Z
			);
		}
		return Ge(t.data);
	}
}
hr.create = (e) =>
	new hr({
		typeName: G.ZodBoolean,
		coerce: (e == null ? void 0 : e.coerce) || !1,
		...J(e),
	});
class ms extends ee {
	_parse(t) {
		if (
			(this._def.coerce && (t.data = new Date(t.data)),
			this._getType(t) !== M.date)
		) {
			const i = this._getOrReturnCtx(t);
			return (
				I(i, {
					code: C.invalid_type,
					expected: M.date,
					received: i.parsedType,
				}),
				Z
			);
		}
		if (Number.isNaN(t.data.getTime())) {
			const i = this._getOrReturnCtx(t);
			return (I(i, { code: C.invalid_date }), Z);
		}
		const a = new Ue();
		let n;
		for (const i of this._def.checks)
			i.kind === "min"
				? t.data.getTime() < i.value &&
					((n = this._getOrReturnCtx(t, n)),
					I(n, {
						code: C.too_small,
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
						I(n, {
							code: C.too_big,
							message: i.message,
							inclusive: !0,
							exact: !1,
							maximum: i.value,
							type: "date",
						}),
						a.dirty())
					: re.assertNever(i);
		return { status: a.value, value: new Date(t.data.getTime()) };
	}
	_addCheck(t) {
		return new ms({ ...this._def, checks: [...this._def.checks, t] });
	}
	min(t, s) {
		return this._addCheck({
			kind: "min",
			value: t.getTime(),
			message: $.toString(s),
		});
	}
	max(t, s) {
		return this._addCheck({
			kind: "max",
			value: t.getTime(),
			message: $.toString(s),
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
ms.create = (e) =>
	new ms({
		checks: [],
		coerce: (e == null ? void 0 : e.coerce) || !1,
		typeName: G.ZodDate,
		...J(e),
	});
class si extends ee {
	_parse(t) {
		if (this._getType(t) !== M.symbol) {
			const a = this._getOrReturnCtx(t);
			return (
				I(a, {
					code: C.invalid_type,
					expected: M.symbol,
					received: a.parsedType,
				}),
				Z
			);
		}
		return Ge(t.data);
	}
}
si.create = (e) => new si({ typeName: G.ZodSymbol, ...J(e) });
class ri extends ee {
	_parse(t) {
		if (this._getType(t) !== M.undefined) {
			const a = this._getOrReturnCtx(t);
			return (
				I(a, {
					code: C.invalid_type,
					expected: M.undefined,
					received: a.parsedType,
				}),
				Z
			);
		}
		return Ge(t.data);
	}
}
ri.create = (e) => new ri({ typeName: G.ZodUndefined, ...J(e) });
class ai extends ee {
	_parse(t) {
		if (this._getType(t) !== M.null) {
			const a = this._getOrReturnCtx(t);
			return (
				I(a, {
					code: C.invalid_type,
					expected: M.null,
					received: a.parsedType,
				}),
				Z
			);
		}
		return Ge(t.data);
	}
}
ai.create = (e) => new ai({ typeName: G.ZodNull, ...J(e) });
class ni extends ee {
	constructor() {
		(super(...arguments), (this._any = !0));
	}
	_parse(t) {
		return Ge(t.data);
	}
}
ni.create = (e) => new ni({ typeName: G.ZodAny, ...J(e) });
class ii extends ee {
	constructor() {
		(super(...arguments), (this._unknown = !0));
	}
	_parse(t) {
		return Ge(t.data);
	}
}
ii.create = (e) => new ii({ typeName: G.ZodUnknown, ...J(e) });
class kt extends ee {
	_parse(t) {
		const s = this._getOrReturnCtx(t);
		return (
			I(s, { code: C.invalid_type, expected: M.never, received: s.parsedType }),
			Z
		);
	}
}
kt.create = (e) => new kt({ typeName: G.ZodNever, ...J(e) });
class oi extends ee {
	_parse(t) {
		if (this._getType(t) !== M.undefined) {
			const a = this._getOrReturnCtx(t);
			return (
				I(a, {
					code: C.invalid_type,
					expected: M.void,
					received: a.parsedType,
				}),
				Z
			);
		}
		return Ge(t.data);
	}
}
oi.create = (e) => new oi({ typeName: G.ZodVoid, ...J(e) });
class at extends ee {
	_parse(t) {
		const { ctx: s, status: a } = this._processInputParams(t),
			n = this._def;
		if (s.parsedType !== M.array)
			return (
				I(s, {
					code: C.invalid_type,
					expected: M.array,
					received: s.parsedType,
				}),
				Z
			);
		if (n.exactLength !== null) {
			const o = s.data.length > n.exactLength.value,
				l = s.data.length < n.exactLength.value;
			(o || l) &&
				(I(s, {
					code: o ? C.too_big : C.too_small,
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
				(I(s, {
					code: C.too_small,
					minimum: n.minLength.value,
					type: "array",
					inclusive: !0,
					exact: !1,
					message: n.minLength.message,
				}),
				a.dirty()),
			n.maxLength !== null &&
				s.data.length > n.maxLength.value &&
				(I(s, {
					code: C.too_big,
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
				[...s.data].map((o, l) => n.type._parseAsync(new _t(s, o, s.path, l))),
			).then((o) => Ue.mergeArray(a, o));
		const i = [...s.data].map((o, l) =>
			n.type._parseSync(new _t(s, o, s.path, l)),
		);
		return Ue.mergeArray(a, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, s) {
		return new at({
			...this._def,
			minLength: { value: t, message: $.toString(s) },
		});
	}
	max(t, s) {
		return new at({
			...this._def,
			maxLength: { value: t, message: $.toString(s) },
		});
	}
	length(t, s) {
		return new at({
			...this._def,
			exactLength: { value: t, message: $.toString(s) },
		});
	}
	nonempty(t) {
		return this.min(1, t);
	}
}
at.create = (e, t) =>
	new at({
		type: e,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: G.ZodArray,
		...J(t),
	});
function es(e) {
	if (e instanceof ke) {
		const t = {};
		for (const s in e.shape) {
			const a = e.shape[s];
			t[s] = vt.create(es(a));
		}
		return new ke({ ...e._def, shape: () => t });
	} else
		return e instanceof at
			? new at({ ...e._def, type: es(e.element) })
			: e instanceof vt
				? vt.create(es(e.unwrap()))
				: e instanceof xs
					? xs.create(es(e.unwrap()))
					: e instanceof Ht
						? Ht.create(e.items.map((t) => es(t)))
						: e;
}
class ke extends ee {
	constructor() {
		(super(...arguments),
			(this._cached = null),
			(this.nonstrict = this.passthrough),
			(this.augment = this.extend));
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const t = this._def.shape(),
			s = re.objectKeys(t);
		return ((this._cached = { shape: t, keys: s }), this._cached);
	}
	_parse(t) {
		if (this._getType(t) !== M.object) {
			const d = this._getOrReturnCtx(t);
			return (
				I(d, {
					code: C.invalid_type,
					expected: M.object,
					received: d.parsedType,
				}),
				Z
			);
		}
		const { status: a, ctx: n } = this._processInputParams(t),
			{ shape: i, keys: o } = this._getCached(),
			l = [];
		if (
			!(this._def.catchall instanceof kt && this._def.unknownKeys === "strip")
		)
			for (const d in n.data) o.includes(d) || l.push(d);
		const c = [];
		for (const d of o) {
			const u = i[d],
				m = n.data[d];
			c.push({
				key: { status: "valid", value: d },
				value: u._parse(new _t(n, m, n.path, d)),
				alwaysSet: d in n.data,
			});
		}
		if (this._def.catchall instanceof kt) {
			const d = this._def.unknownKeys;
			if (d === "passthrough")
				for (const u of l)
					c.push({
						key: { status: "valid", value: u },
						value: { status: "valid", value: n.data[u] },
					});
			else if (d === "strict")
				l.length > 0 &&
					(I(n, { code: C.unrecognized_keys, keys: l }), a.dirty());
			else if (d !== "strip")
				throw new Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			const d = this._def.catchall;
			for (const u of l) {
				const m = n.data[u];
				c.push({
					key: { status: "valid", value: u },
					value: d._parse(new _t(n, m, n.path, u)),
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
					.then((d) => Ue.mergeObjectSync(a, d))
			: Ue.mergeObjectSync(a, c);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return (
			$.errToObj,
			new ke({
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
									? { message: $.errToObj(t).message ?? n }
									: { message: n };
							},
						}
					: {}),
			})
		);
	}
	strip() {
		return new ke({ ...this._def, unknownKeys: "strip" });
	}
	passthrough() {
		return new ke({ ...this._def, unknownKeys: "passthrough" });
	}
	extend(t) {
		return new ke({
			...this._def,
			shape: () => ({ ...this._def.shape(), ...t }),
		});
	}
	merge(t) {
		return new ke({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
			typeName: G.ZodObject,
		});
	}
	setKey(t, s) {
		return this.augment({ [t]: s });
	}
	catchall(t) {
		return new ke({ ...this._def, catchall: t });
	}
	pick(t) {
		const s = {};
		for (const a of re.objectKeys(t))
			t[a] && this.shape[a] && (s[a] = this.shape[a]);
		return new ke({ ...this._def, shape: () => s });
	}
	omit(t) {
		const s = {};
		for (const a of re.objectKeys(this.shape)) t[a] || (s[a] = this.shape[a]);
		return new ke({ ...this._def, shape: () => s });
	}
	deepPartial() {
		return es(this);
	}
	partial(t) {
		const s = {};
		for (const a of re.objectKeys(this.shape)) {
			const n = this.shape[a];
			t && !t[a] ? (s[a] = n) : (s[a] = n.optional());
		}
		return new ke({ ...this._def, shape: () => s });
	}
	required(t) {
		const s = {};
		for (const a of re.objectKeys(this.shape))
			if (t && !t[a]) s[a] = this.shape[a];
			else {
				let i = this.shape[a];
				for (; i instanceof vt; ) i = i._def.innerType;
				s[a] = i;
			}
		return new ke({ ...this._def, shape: () => s });
	}
	keyof() {
		return $o(re.objectKeys(this.shape));
	}
}
ke.create = (e, t) =>
	new ke({
		shape: () => e,
		unknownKeys: "strip",
		catchall: kt.create(),
		typeName: G.ZodObject,
		...J(t),
	});
ke.strictCreate = (e, t) =>
	new ke({
		shape: () => e,
		unknownKeys: "strict",
		catchall: kt.create(),
		typeName: G.ZodObject,
		...J(t),
	});
ke.lazycreate = (e, t) =>
	new ke({
		shape: e,
		unknownKeys: "strip",
		catchall: kt.create(),
		typeName: G.ZodObject,
		...J(t),
	});
class fr extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t),
			a = this._def.options;
		function n(i) {
			for (const l of i) if (l.result.status === "valid") return l.result;
			for (const l of i)
				if (l.result.status === "dirty")
					return (s.common.issues.push(...l.ctx.common.issues), l.result);
			const o = i.map((l) => new mt(l.ctx.common.issues));
			return (I(s, { code: C.invalid_union, unionErrors: o }), Z);
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
			const l = o.map((c) => new mt(c));
			return (I(s, { code: C.invalid_union, unionErrors: l }), Z);
		}
	}
	get options() {
		return this._def.options;
	}
}
fr.create = (e, t) => new fr({ options: e, typeName: G.ZodUnion, ...J(t) });
function ya(e, t) {
	const s = pt(e),
		a = pt(t);
	if (e === t) return { valid: !0, data: e };
	if (s === M.object && a === M.object) {
		const n = re.objectKeys(t),
			i = re.objectKeys(e).filter((l) => n.indexOf(l) !== -1),
			o = { ...e, ...t };
		for (const l of i) {
			const c = ya(e[l], t[l]);
			if (!c.valid) return { valid: !1 };
			o[l] = c.data;
		}
		return { valid: !0, data: o };
	} else if (s === M.array && a === M.array) {
		if (e.length !== t.length) return { valid: !1 };
		const n = [];
		for (let i = 0; i < e.length; i++) {
			const o = e[i],
				l = t[i],
				c = ya(o, l);
			if (!c.valid) return { valid: !1 };
			n.push(c.data);
		}
		return { valid: !0, data: n };
	} else
		return s === M.date && a === M.date && +e == +t
			? { valid: !0, data: e }
			: { valid: !1 };
}
class xr extends ee {
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t),
			n = (i, o) => {
				if (Kn(i) || Kn(o)) return Z;
				const l = ya(i.value, o.value);
				return l.valid
					? ((ei(i) || ei(o)) && s.dirty(), { status: s.value, value: l.data })
					: (I(a, { code: C.invalid_intersection_types }), Z);
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
xr.create = (e, t, s) =>
	new xr({ left: e, right: t, typeName: G.ZodIntersection, ...J(s) });
class Ht extends ee {
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t);
		if (a.parsedType !== M.array)
			return (
				I(a, {
					code: C.invalid_type,
					expected: M.array,
					received: a.parsedType,
				}),
				Z
			);
		if (a.data.length < this._def.items.length)
			return (
				I(a, {
					code: C.too_small,
					minimum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: "array",
				}),
				Z
			);
		!this._def.rest &&
			a.data.length > this._def.items.length &&
			(I(a, {
				code: C.too_big,
				maximum: this._def.items.length,
				inclusive: !0,
				exact: !1,
				type: "array",
			}),
			s.dirty());
		const i = [...a.data]
			.map((o, l) => {
				const c = this._def.items[l] || this._def.rest;
				return c ? c._parse(new _t(a, o, a.path, l)) : null;
			})
			.filter((o) => !!o);
		return a.common.async
			? Promise.all(i).then((o) => Ue.mergeArray(s, o))
			: Ue.mergeArray(s, i);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new Ht({ ...this._def, rest: t });
	}
}
Ht.create = (e, t) => {
	if (!Array.isArray(e))
		throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new Ht({ items: e, typeName: G.ZodTuple, rest: null, ...J(t) });
};
class li extends ee {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t);
		if (a.parsedType !== M.map)
			return (
				I(a, { code: C.invalid_type, expected: M.map, received: a.parsedType }),
				Z
			);
		const n = this._def.keyType,
			i = this._def.valueType,
			o = [...a.data.entries()].map(([l, c], d) => ({
				key: n._parse(new _t(a, l, a.path, [d, "key"])),
				value: i._parse(new _t(a, c, a.path, [d, "value"])),
			}));
		if (a.common.async) {
			const l = new Map();
			return Promise.resolve().then(async () => {
				for (const c of o) {
					const d = await c.key,
						u = await c.value;
					if (d.status === "aborted" || u.status === "aborted") return Z;
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
				if (d.status === "aborted" || u.status === "aborted") return Z;
				((d.status === "dirty" || u.status === "dirty") && s.dirty(),
					l.set(d.value, u.value));
			}
			return { status: s.value, value: l };
		}
	}
}
li.create = (e, t, s) =>
	new li({ valueType: t, keyType: e, typeName: G.ZodMap, ...J(s) });
class Fs extends ee {
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t);
		if (a.parsedType !== M.set)
			return (
				I(a, { code: C.invalid_type, expected: M.set, received: a.parsedType }),
				Z
			);
		const n = this._def;
		(n.minSize !== null &&
			a.data.size < n.minSize.value &&
			(I(a, {
				code: C.too_small,
				minimum: n.minSize.value,
				type: "set",
				inclusive: !0,
				exact: !1,
				message: n.minSize.message,
			}),
			s.dirty()),
			n.maxSize !== null &&
				a.data.size > n.maxSize.value &&
				(I(a, {
					code: C.too_big,
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
				if (u.status === "aborted") return Z;
				(u.status === "dirty" && s.dirty(), d.add(u.value));
			}
			return { status: s.value, value: d };
		}
		const l = [...a.data.values()].map((c, d) =>
			i._parse(new _t(a, c, a.path, d)),
		);
		return a.common.async ? Promise.all(l).then((c) => o(c)) : o(l);
	}
	min(t, s) {
		return new Fs({
			...this._def,
			minSize: { value: t, message: $.toString(s) },
		});
	}
	max(t, s) {
		return new Fs({
			...this._def,
			maxSize: { value: t, message: $.toString(s) },
		});
	}
	size(t, s) {
		return this.min(t, s).max(t, s);
	}
	nonempty(t) {
		return this.min(1, t);
	}
}
Fs.create = (e, t) =>
	new Fs({
		valueType: e,
		minSize: null,
		maxSize: null,
		typeName: G.ZodSet,
		...J(t),
	});
class ci extends ee {
	get schema() {
		return this._def.getter();
	}
	_parse(t) {
		const { ctx: s } = this._processInputParams(t);
		return this._def.getter()._parse({ data: s.data, path: s.path, parent: s });
	}
}
ci.create = (e, t) => new ci({ getter: e, typeName: G.ZodLazy, ...J(t) });
class ba extends ee {
	_parse(t) {
		if (t.data !== this._def.value) {
			const s = this._getOrReturnCtx(t);
			return (
				I(s, {
					received: s.data,
					code: C.invalid_literal,
					expected: this._def.value,
				}),
				Z
			);
		}
		return { status: "valid", value: t.data };
	}
	get value() {
		return this._def.value;
	}
}
ba.create = (e, t) => new ba({ value: e, typeName: G.ZodLiteral, ...J(t) });
function $o(e, t) {
	return new hs({ values: e, typeName: G.ZodEnum, ...J(t) });
}
class hs extends ee {
	_parse(t) {
		if (typeof t.data != "string") {
			const s = this._getOrReturnCtx(t),
				a = this._def.values;
			return (
				I(s, {
					expected: re.joinValues(a),
					received: s.parsedType,
					code: C.invalid_type,
				}),
				Z
			);
		}
		if (
			(this._cache || (this._cache = new Set(this._def.values)),
			!this._cache.has(t.data))
		) {
			const s = this._getOrReturnCtx(t),
				a = this._def.values;
			return (
				I(s, { received: s.data, code: C.invalid_enum_value, options: a }),
				Z
			);
		}
		return Ge(t.data);
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
		return hs.create(t, { ...this._def, ...s });
	}
	exclude(t, s = this._def) {
		return hs.create(
			this.options.filter((a) => !t.includes(a)),
			{ ...this._def, ...s },
		);
	}
}
hs.create = $o;
class va extends ee {
	_parse(t) {
		const s = re.getValidEnumValues(this._def.values),
			a = this._getOrReturnCtx(t);
		if (a.parsedType !== M.string && a.parsedType !== M.number) {
			const n = re.objectValues(s);
			return (
				I(a, {
					expected: re.joinValues(n),
					received: a.parsedType,
					code: C.invalid_type,
				}),
				Z
			);
		}
		if (
			(this._cache ||
				(this._cache = new Set(re.getValidEnumValues(this._def.values))),
			!this._cache.has(t.data))
		) {
			const n = re.objectValues(s);
			return (
				I(a, { received: a.data, code: C.invalid_enum_value, options: n }),
				Z
			);
		}
		return Ge(t.data);
	}
	get enum() {
		return this._def.values;
	}
}
va.create = (e, t) => new va({ values: e, typeName: G.ZodNativeEnum, ...J(t) });
class gr extends ee {
	unwrap() {
		return this._def.type;
	}
	_parse(t) {
		const { ctx: s } = this._processInputParams(t);
		if (s.parsedType !== M.promise && s.common.async === !1)
			return (
				I(s, {
					code: C.invalid_type,
					expected: M.promise,
					received: s.parsedType,
				}),
				Z
			);
		const a = s.parsedType === M.promise ? s.data : Promise.resolve(s.data);
		return Ge(
			a.then((n) =>
				this._def.type.parseAsync(n, {
					path: s.path,
					errorMap: s.common.contextualErrorMap,
				}),
			),
		);
	}
}
gr.create = (e, t) => new gr({ type: e, typeName: G.ZodPromise, ...J(t) });
class fs extends ee {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === G.ZodEffects
			? this._def.schema.sourceType()
			: this._def.schema;
	}
	_parse(t) {
		const { status: s, ctx: a } = this._processInputParams(t),
			n = this._def.effect || null,
			i = {
				addIssue: (o) => {
					(I(a, o), o.fatal ? s.abort() : s.dirty());
				},
				get path() {
					return a.path;
				},
			};
		if (((i.addIssue = i.addIssue.bind(i)), n.type === "preprocess")) {
			const o = n.transform(a.data, i);
			if (a.common.async)
				return Promise.resolve(o).then(async (l) => {
					if (s.value === "aborted") return Z;
					const c = await this._def.schema._parseAsync({
						data: l,
						path: a.path,
						parent: a,
					});
					return c.status === "aborted"
						? Z
						: c.status === "dirty" || s.value === "dirty"
							? Es(c.value)
							: c;
				});
			{
				if (s.value === "aborted") return Z;
				const l = this._def.schema._parseSync({
					data: o,
					path: a.path,
					parent: a,
				});
				return l.status === "aborted"
					? Z
					: l.status === "dirty" || s.value === "dirty"
						? Es(l.value)
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
					? Z
					: (l.status === "dirty" && s.dirty(),
						o(l.value),
						{ status: s.value, value: l.value });
			} else
				return this._def.schema
					._parseAsync({ data: a.data, path: a.path, parent: a })
					.then((l) =>
						l.status === "aborted"
							? Z
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
				if (!us(o)) return Z;
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
						us(o)
							? Promise.resolve(n.transform(o.value, i)).then((l) => ({
									status: s.value,
									value: l,
								}))
							: Z,
					);
		re.assertNever(n);
	}
}
fs.create = (e, t, s) =>
	new fs({ schema: e, typeName: G.ZodEffects, effect: t, ...J(s) });
fs.createWithPreprocess = (e, t, s) =>
	new fs({
		schema: t,
		effect: { type: "preprocess", transform: e },
		typeName: G.ZodEffects,
		...J(s),
	});
class vt extends ee {
	_parse(t) {
		return this._getType(t) === M.undefined
			? Ge(void 0)
			: this._def.innerType._parse(t);
	}
	unwrap() {
		return this._def.innerType;
	}
}
vt.create = (e, t) =>
	new vt({ innerType: e, typeName: G.ZodOptional, ...J(t) });
class xs extends ee {
	_parse(t) {
		return this._getType(t) === M.null
			? Ge(null)
			: this._def.innerType._parse(t);
	}
	unwrap() {
		return this._def.innerType;
	}
}
xs.create = (e, t) =>
	new xs({ innerType: e, typeName: G.ZodNullable, ...J(t) });
class ja extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t);
		let a = s.data;
		return (
			s.parsedType === M.undefined && (a = this._def.defaultValue()),
			this._def.innerType._parse({ data: a, path: s.path, parent: s })
		);
	}
	removeDefault() {
		return this._def.innerType;
	}
}
ja.create = (e, t) =>
	new ja({
		innerType: e,
		typeName: G.ZodDefault,
		defaultValue: typeof t.default == "function" ? t.default : () => t.default,
		...J(t),
	});
class wa extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t),
			a = { ...s, common: { ...s.common, issues: [] } },
			n = this._def.innerType._parse({
				data: a.data,
				path: a.path,
				parent: { ...a },
			});
		return mr(n)
			? n.then((i) => ({
					status: "valid",
					value:
						i.status === "valid"
							? i.value
							: this._def.catchValue({
									get error() {
										return new mt(a.common.issues);
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
										return new mt(a.common.issues);
									},
									input: a.data,
								}),
				};
	}
	removeCatch() {
		return this._def.innerType;
	}
}
wa.create = (e, t) =>
	new wa({
		innerType: e,
		typeName: G.ZodCatch,
		catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
		...J(t),
	});
class di extends ee {
	_parse(t) {
		if (this._getType(t) !== M.nan) {
			const a = this._getOrReturnCtx(t);
			return (
				I(a, { code: C.invalid_type, expected: M.nan, received: a.parsedType }),
				Z
			);
		}
		return { status: "valid", value: t.data };
	}
}
di.create = (e) => new di({ typeName: G.ZodNaN, ...J(e) });
class ax extends ee {
	_parse(t) {
		const { ctx: s } = this._processInputParams(t),
			a = s.data;
		return this._def.type._parse({ data: a, path: s.path, parent: s });
	}
	unwrap() {
		return this._def.type;
	}
}
class Qa extends ee {
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
					? Z
					: i.status === "dirty"
						? (s.dirty(), Es(i.value))
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
				? Z
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
		return new Qa({ in: t, out: s, typeName: G.ZodPipeline });
	}
}
class Na extends ee {
	_parse(t) {
		const s = this._def.innerType._parse(t),
			a = (n) => (us(n) && (n.value = Object.freeze(n.value)), n);
		return mr(s) ? s.then((n) => a(n)) : a(s);
	}
	unwrap() {
		return this._def.innerType;
	}
}
Na.create = (e, t) =>
	new Na({ innerType: e, typeName: G.ZodReadonly, ...J(t) });
var G;
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
})(G || (G = {}));
const xe = lt.create,
	g0 = Bt.create;
Wt.create;
const p0 = hr.create;
ms.create;
kt.create;
const y0 = at.create,
	Yt = ke.create;
fr.create;
xr.create;
Ht.create;
const nx = ba.create,
	ix = hs.create,
	ui = va.create;
gr.create;
vt.create;
xs.create;
const b0 = {
		string: (e) => lt.create({ ...e, coerce: !0 }),
		number: (e) => Bt.create({ ...e, coerce: !0 }),
		boolean: (e) => hr.create({ ...e, coerce: !0 }),
		bigint: (e) => Wt.create({ ...e, coerce: !0 }),
		date: (e) => ms.create({ ...e, coerce: !0 }),
	},
	ox = async (e) => (await je.post("/auth/login", e)).data,
	lx = async (e) => (await je.post("/auth/register", e)).data,
	cx = async (e) => {
		await je.post("/auth/change-password", e);
	},
	ye = A.forwardRef(
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
								className: q(
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
									className: q(
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
ye.displayName = "Input";
const dx = Yt({
		email: xe().min(1, "Введите email").email("Некорректный email"),
		password: xe().min(6, "Минимум 6 символов"),
	}),
	ux = () => {
		var m, v, p, g;
		const [e, t] = A.useState(!1),
			{ login: s } = Ce(),
			a = Zt(),
			i =
				((v = (m = Ca().state) == null ? void 0 : m.from) == null
					? void 0
					: v.pathname) || "/",
			{
				register: o,
				handleSubmit: l,
				formState: { errors: c, isSubmitting: d },
			} = Ut({ resolver: zt(dx) }),
			u = async (j) => {
				var f, S;
				try {
					const y = await ox(j);
					(s(y.user, y.tokens.access_token, y.tokens.refresh_token),
						he.success(`Добро пожаловать, ${y.user.full_name.split(" ")[0]}!`),
						a(i === "/login" ? "/" : i, { replace: !0 }));
				} catch (y) {
					const k = y,
						_ =
							((S =
								(f = k == null ? void 0 : k.response) == null
									? void 0
									: f.data) == null
								? void 0
								: S.detail) || "Неверный email или пароль";
					he.error(_);
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
									r.jsx(ye, {
										label: "Email",
										type: "email",
										placeholder: "your@email.ru",
										leftIcon: r.jsx(Ms, { className: "w-4 h-4" }),
										error: (p = c.email) == null ? void 0 : p.message,
										...o("email"),
									}),
									r.jsx(ye, {
										label: "Пароль",
										type: e ? "text" : "password",
										placeholder: "Введите пароль",
										leftIcon: r.jsx(ir, { className: "w-4 h-4" }),
										rightIcon: e
											? r.jsx(Ps, { className: "w-4 h-4" })
											: r.jsx(Ds, { className: "w-4 h-4" }),
										onRightIconClick: () => t(!e),
										error: (g = c.password) == null ? void 0 : g.message,
										...o("password"),
									}),
									r.jsx(qe, {
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
	mx = [
		{ value: "individual", label: "Физическое лицо (B2C)" },
		{ value: "ip", label: "ИП" },
		{ value: "ooo", label: "ООО / АО / другое" },
	],
	hx = Yt({
		full_name: xe().min(2, "Введите ФИО (минимум 2 символа)"),
		email: xe().email("Некорректный email"),
		phone: xe()
			.regex(
				/^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
				"Некорректный номер телефона",
			)
			.optional()
			.or(nx("")),
		password: xe().min(8, "Минимум 8 символов"),
		password_confirm: xe(),
		client_type: ix(["individual", "ip", "ooo"]),
	}).refine((e) => e.password === e.password_confirm, {
		message: "Пароли не совпадают",
		path: ["password_confirm"],
	}),
	fx = Yt({
		organization_name: xe().min(2, "Введите название организации"),
		inn: xe().regex(/^\d{10,12}$/, "ИНН: 10 или 12 цифр"),
		legal_address: xe().min(10, "Введите юридический адрес"),
		delivery_address: xe().optional(),
	}),
	xx = () => {
		var S, y, k, _, E, N, z, te, se, L;
		const [e, t] = A.useState(1),
			[s, a] = A.useState(null),
			[n, i] = A.useState(!1),
			[o, l] = A.useState(!1),
			{ login: c } = Ce(),
			d = Zt(),
			u = Ut({
				resolver: zt(hx),
				defaultValues: { client_type: "individual" },
			}),
			m = Ut({ resolver: zt(fx) }),
			v = u.watch("client_type"),
			p = v === "ip" || v === "ooo",
			g = u.handleSubmit(async (be) => {
				p ? (a(be), t(2)) : await j(be);
			}),
			j = async (be, V) => {
				var W, Q;
				try {
					const ae = await lx({
						email: be.email,
						phone: be.phone || void 0,
						password: be.password,
						full_name: be.full_name,
						client_type: be.client_type,
						organization_name: V == null ? void 0 : V.organization_name,
						inn: V == null ? void 0 : V.inn,
						legal_address: V == null ? void 0 : V.legal_address,
						delivery_address: V == null ? void 0 : V.delivery_address,
					});
					(c(ae.user, ae.tokens.access_token, ae.tokens.refresh_token),
						p
							? (he.info(
									"Аккаунт создан! Он будет активирован после проверки менеджером.",
								),
								d("/account"))
							: (he.success("Добро пожаловать в Агрорезерв!"), d("/")));
				} catch (ae) {
					const K = ae,
						ve =
							((Q =
								(W = K == null ? void 0 : K.response) == null
									? void 0
									: W.data) == null
								? void 0
								: Q.detail) || "Ошибка регистрации";
					he.error(ve);
				}
			},
			f = m.handleSubmit(async (be) => {
				s && (await j(s, be));
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
									className: q(
										"flex-1 h-1.5 rounded-full transition-colors",
										e >= 1 ? "bg-primary-600" : "bg-gray-200",
									),
								}),
								r.jsx("div", {
									className: q(
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
										r.jsx(rt, {
											label: "Тип аккаунта",
											options: mx,
											error:
												(S = u.formState.errors.client_type) == null
													? void 0
													: S.message,
											...u.register("client_type"),
										}),
										r.jsx(ye, {
											label: "ФИО",
											placeholder: "Иванов Иван Иванович",
											leftIcon: r.jsx(ct, { className: "w-4 h-4" }),
											error:
												(y = u.formState.errors.full_name) == null
													? void 0
													: y.message,
											required: !0,
											...u.register("full_name"),
										}),
										r.jsx(ye, {
											label: "Email",
											type: "email",
											placeholder: "your@email.ru",
											leftIcon: r.jsx(Ms, { className: "w-4 h-4" }),
											error:
												(k = u.formState.errors.email) == null
													? void 0
													: k.message,
											required: !0,
											...u.register("email"),
										}),
										r.jsx(ye, {
											label: "Телефон",
											type: "tel",
											placeholder: "+7 (900) 000-00-00",
											leftIcon: r.jsx(jt, { className: "w-4 h-4" }),
											error:
												(_ = u.formState.errors.phone) == null
													? void 0
													: _.message,
											hint: "Необязательно. Для уведомлений в Telegram.",
											...u.register("phone"),
										}),
										r.jsx(ye, {
											label: "Пароль",
											type: n ? "text" : "password",
											placeholder: "Минимум 8 символов",
											leftIcon: r.jsx(ir, { className: "w-4 h-4" }),
											rightIcon: n
												? r.jsx(Ps, { className: "w-4 h-4" })
												: r.jsx(Ds, { className: "w-4 h-4" }),
											onRightIconClick: () => i(!n),
											error:
												(E = u.formState.errors.password) == null
													? void 0
													: E.message,
											required: !0,
											...u.register("password"),
										}),
										r.jsx(ye, {
											label: "Подтвердите пароль",
											type: o ? "text" : "password",
											placeholder: "Повторите пароль",
											leftIcon: r.jsx(ir, { className: "w-4 h-4" }),
											rightIcon: o
												? r.jsx(Ps, { className: "w-4 h-4" })
												: r.jsx(Ds, { className: "w-4 h-4" }),
											onRightIconClick: () => l(!o),
											error:
												(N = u.formState.errors.password_confirm) == null
													? void 0
													: N.message,
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
										r.jsx(qe, {
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
										r.jsx(ye, {
											label: "Название организации",
											placeholder: "ООО «Название» или ИП Иванов И.И.",
											leftIcon: r.jsx(_i, { className: "w-4 h-4" }),
											error:
												(z = m.formState.errors.organization_name) == null
													? void 0
													: z.message,
											required: !0,
											...m.register("organization_name"),
										}),
										r.jsx(ye, {
											label: "ИНН",
											placeholder: "10 или 12 цифр",
											error:
												(te = m.formState.errors.inn) == null
													? void 0
													: te.message,
											hint: "Для ИП — 12 цифр, для ООО — 10 цифр",
											required: !0,
											...m.register("inn"),
										}),
										r.jsx(ye, {
											label: "Юридический адрес",
											placeholder: "г. Тобольск, ул. Ленина, д. 1",
											leftIcon: r.jsx(He, { className: "w-4 h-4" }),
											error:
												(se = m.formState.errors.legal_address) == null
													? void 0
													: se.message,
											required: !0,
											...m.register("legal_address"),
										}),
										r.jsx(ye, {
											label: "Адрес доставки",
											placeholder: "Если отличается от юр. адреса",
											leftIcon: r.jsx(He, { className: "w-4 h-4" }),
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
										r.jsx(qe, {
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
	gx = () =>
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
								children: r.jsx(rr, { className: "w-6 h-6 text-primary-600" }),
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
							icon: wi,
							color: "text-green-600",
							bg: "bg-green-50",
							title: "Прямые поставки",
							desc: "Без посредников, напрямую от фермеров. Свежесть и качество гарантированы.",
						},
						{
							icon: ps,
							color: "text-blue-600",
							bg: "bg-blue-50",
							title: "Бесплатная доставка",
							desc: "Доставляем по Тобольску и пригороду на собственном транспорте.",
						},
						{
							icon: Pa,
							color: "text-purple-600",
							bg: "bg-purple-50",
							title: "44-ФЗ документы",
							desc: "Полный пакет: ТОРГ-12, счета, УПД, сертификаты ТР ТС для госзакупок.",
						},
						{
							icon: rr,
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
										r.jsx(jt, { className: "w-5 h-5 text-primary-600" }),
										"+7 (900) 000-00-00",
									],
								}),
								r.jsxs("a", {
									href: "mailto:info@agroreserve.ru",
									className:
										"flex items-center gap-3 text-gray-700 hover:text-primary-700",
									children: [
										r.jsx(Ms, { className: "w-5 h-5 text-primary-600" }),
										"info@agroreserve.ru",
									],
								}),
								r.jsxs("div", {
									className: "flex items-center gap-3 text-gray-700",
									children: [
										r.jsx(He, { className: "w-5 h-5 text-primary-600" }),
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
	px = () =>
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
															children: r.jsx(jt, {
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
															children: r.jsx(Oa, {
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
															children: r.jsx(Ms, {
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
														r.jsx(He, {
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
														r.jsx(gs, {
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
									r.jsx(He, {
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
	yx = async (e) => (await je.get("/schools/dishes", { params: e })).data,
	bx = async (e) => (await je.post("/schools/menu", e)).data,
	vx = async (e) => (await je.post(`/schools/menu/${e}/order`)).data,
	jx = [
		{
			icon: wt,
			text: "Прямые договоры до 600 000 ₽ без конкурентных процедур по 44-ФЗ",
		},
		{
			icon: wt,
			text: "Полный пакет закрывающих документов: ТОРГ-12, УПД, счёт-фактура",
		},
		{
			icon: Os,
			text: "Декларации соответствия ТР ТС и сертификаты качества на каждый товар",
		},
		{
			icon: vl,
			text: "Ветеринарные справки и удостоверения качества и безопасности",
		},
		{ icon: nr, text: "Цены на 20–35% ниже среднерыночных — экономия бюджета" },
		{
			icon: ps,
			text: "Бесплатная доставка в утреннее время до начала учебного дня",
		},
		{ icon: rr, text: "Стабильные поставки по графику, под учебный год" },
		{
			icon: jl,
			text: "Электронный документооборот, ЭЦП для электронных торговых площадок",
		},
	],
	wx = [
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
	Nx = [
		{ value: "breakfast", label: "Завтрак" },
		{ value: "lunch", label: "Обед" },
		{ value: "dinner", label: "Ужин" },
		{ value: "snack", label: "Полдник" },
	],
	_x = [
		"Все",
		"Первое блюдо",
		"Второе блюдо",
		"Гарнир",
		"Салат",
		"Выпечка",
		"Десерт",
		"Напиток",
	],
	kx = () => {
		const [e, t] = A.useState("Все"),
			[s, a] = A.useState({}),
			[n, i] = A.useState(""),
			[o, l] = A.useState(null),
			{ data: c, isLoading: d } = We({
				queryKey: ["schoolDishes", e],
				queryFn: () => yx({ category: e !== "Все" ? e : void 0 }),
			}),
			u = (f) => {
				const S = f._id;
				if (s[S]) {
					const y = { ...s };
					(delete y[S], a(y));
				} else a({ ...s, [S]: { dish: f, portions: 100, meal_type: "lunch" } });
			},
			m = (f, S) => {
				if (!s[f]) return;
				const y = Math.max(1, s[f].portions + S);
				a({ ...s, [f]: { ...s[f], portions: y } });
			},
			v = (f, S) => {
				s[f] && a({ ...s, [f]: { ...s[f], meal_type: S } });
			},
			p = A.useMemo(
				() =>
					Object.values(s).reduce(
						(f, { dish: S, portions: y }) => ({
							calories: f.calories + S.calories * y,
							protein: f.protein + S.protein * y,
							fat: f.fat + S.fat * y,
							carbs: f.carbs + S.carbs * y,
							portions: f.portions + y,
						}),
						{ calories: 0, protein: 0, fat: 0, carbs: 0, portions: 0 },
					),
				[s],
			),
			g = Object.keys(s).length,
			j = Sa({
				mutationFn: async () => {
					if (!n) throw new Error("Укажите дату начала недели");
					const f = new Date(n);
					f.setDate(f.getDate() + 6);
					const S = f.toISOString().split("T")[0],
						y = await bx({
							week_start: n,
							week_end: S,
							days: [
								{
									date: n,
									items: Object.values(s).map(
										({ dish: k, portions: _, meal_type: E }) => ({
											dish_id: k._id,
											portions: _,
											meal_type: E,
										}),
									),
								},
							],
						});
					return vx(y._id);
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
							r.jsx($t, { className: "w-5 h-5 text-green-600 flex-shrink-0" }),
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
					children: _x.map((f) =>
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
													const S = !!s[f._id];
													return r.jsxs(
														"button",
														{
															onClick: () => u(f),
															className: `text-left p-4 rounded-xl border transition-all ${S ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`,
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
																			className: `w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${S ? "bg-blue-600 border-blue-600" : "border-gray-300"}`,
																			children:
																				S &&
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
												r.jsx(is, { className: "w-4 h-4" }),
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
														({ dish: f, portions: S, meal_type: y }) =>
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
																					value: y,
																					onChange: (k) =>
																						v(f._id, k.target.value),
																					className:
																						"text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none",
																					children: Nx.map((k) =>
																						r.jsx(
																							"option",
																							{
																								value: k.value,
																								children: k.label,
																							},
																							k.value,
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
																							children: r.jsx(Da, {
																								className: "w-3 h-3",
																							}),
																						}),
																						r.jsxs("span", {
																							className:
																								"text-xs font-semibold w-10 text-center",
																							children: [S, " пор."],
																						}),
																						r.jsx("button", {
																							onClick: () => m(f._id, 10),
																							className:
																								"w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50",
																							children: r.jsx(ar, {
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
													r.jsx(is, { className: "w-5 h-5" }),
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
														r.jsx(br, { className: "w-3.5 h-3.5" }),
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
	Sx = () => {
		const { isAuthenticated: e, user: t } = Ce(),
			s = e && t && (["b2b", "ip", "ooo"].includes(t.client_type) || t.school);
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
										r.jsx(Os, { className: "w-4 h-4" }),
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
														r.jsx(nr, { className: "w-5 h-5" }),
														"Конструктор меню",
													],
												})
											: r.jsxs(H, {
													to: "/register",
													className:
														"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors",
													children: [
														"Зарегистрироваться",
														r.jsx(Te, { className: "w-5 h-5" }),
													],
												}),
										r.jsxs("a", {
											href: "tel:+79000000000",
											className:
												"inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-colors",
											children: [
												r.jsx(jt, { className: "w-5 h-5" }),
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
									children: jx.map((a, n) => {
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
									children: wx.map((a, n) =>
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
									? r.jsx(kx, {})
									: e
										? r.jsxs("div", {
												className:
													"bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center",
												children: [
													r.jsx(br, {
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
													r.jsx(nr, {
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
																	r.jsx(Te, { className: "w-5 h-5" }),
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
									r.jsx(Os, {
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
													r.jsx(jt, { className: "w-5 h-5" }),
													"Позвонить",
												],
											}),
											r.jsxs(H, {
												to: "/register",
												className:
													"flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors",
												children: [
													r.jsx(wt, { className: "w-5 h-5" }),
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
	Ex = ({ item: e, onRemove: t, onUpdateQty: s }) => {
		var i, o, l;
		const [a, n] = A.useState(!1);
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
										children: r.jsx(Ts, { className: "w-8 h-8 text-gray-300" }),
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
								X(e.price),
								" / ",
								e.product.unit === "kg" ? "кг" : "шт",
							],
						}),
						r.jsxs("div", {
							className: "flex items-center justify-between mt-3",
							children: [
								r.jsx(Wa, {
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
											children: X(e.subtotal),
										}),
										r.jsx("button", {
											onClick: () => t(e.product.id),
											className:
												"p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors",
											"aria-label": "Удалить",
											children: r.jsx(Ra, { className: "w-4 h-4" }),
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
	Cx = () => {
		const {
				items: e,
				total: t,
				removeItem: s,
				updateQuantity: a,
				clearCart: n,
			} = bs(),
			{ isAuthenticated: i, isApproved: o, user: l } = Ce(),
			c = Zt();
		if (e.length === 0)
			return r.jsx("div", {
				className: "max-w-4xl mx-auto px-4 py-16",
				children: r.jsx(Ar, {
					icon: r.jsx($s, { className: "w-8 h-8" }),
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
									Ex,
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
																ut(p.quantity, p.product.unit),
															],
														}),
														r.jsx("span", {
															className:
																"text-gray-900 font-medium flex-shrink-0",
															children: X(p.subtotal),
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
														children: X(t),
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
											className: q(
												"rounded-lg p-3 mb-4 text-sm",
												v ? "bg-red-50 border border-red-200" : "bg-gray-50",
											),
											children: [
												r.jsxs("div", {
													className: "flex items-center gap-2 mb-1",
													children: [
														v &&
															r.jsx(br, { className: "w-4 h-4 text-red-500" }),
														r.jsx("span", {
															className: "font-medium text-gray-700",
															children: "Кредитный лимит",
														}),
													],
												}),
												r.jsxs("div", {
													className: "text-gray-600",
													children: ["Лимит: ", X(d)],
												}),
												r.jsxs("div", {
													className: "text-gray-600",
													children: ["Задолженность: ", X(u)],
												}),
												r.jsxs("div", {
													className: q(
														"font-semibold",
														v ? "text-red-600" : "text-gray-900",
													),
													children: ["Доступно: ", X(m)],
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
											? r.jsx(qe, {
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
	Ax = async (e) => (await je.post("/orders", e)).data,
	Vo = async (e) => (await je.get("/orders", { params: e })).data,
	Ox = async (e) => (await je.get(`/orders/${e}`)).data,
	Tx = async (e) => (await je.post("/orders/retail", e)).data,
	Rx = new Date(),
	Px = za(new Date(), 14),
	Dx = vs(Rx, "yyyy-MM-dd"),
	Ix = vs(Px, "yyyy-MM-dd"),
	Fx = Yt({
		delivery_address: xe().min(10, "Укажите полный адрес доставки"),
		delivery_date: xe()
			.min(1, "Выберите дату")
			.refine(
				(e) => new Date(e) >= new Date(new Date().toDateString()),
				"Дата не может быть в прошлом",
			),
		delivery_slot: xe().min(1, "Выберите временной слот"),
		delivery_priority: ui(ss),
		payment_method: ui(Dt),
		note: xe().optional(),
	}),
	Lx = [
		{ value: "08:00-11:00", label: "08:00 – 11:00 (утро)" },
		{ value: "11:00-14:00", label: "11:00 – 14:00 (полдень)" },
		{ value: "14:00-17:00", label: "14:00 – 17:00 (вечер)" },
	],
	Mx = [
		{ value: ss.NORMAL, label: "🟡 Обычная доставка" },
		{ value: ss.FLEXIBLE, label: "🟢 Гибкая — любое время" },
		{ value: ss.URGENT, label: "🔴 Срочно (госконтракт)" },
	],
	$x = [
		{ value: Dt.BANK_TRANSFER, label: "Безналичный расчёт (счёт)" },
		{ value: Dt.CASH, label: "Наличными при получении" },
		{ value: Dt.CARD_ON_DELIVERY, label: "Картой при получении" },
		{ value: Dt.PREPAYMENT, label: "Предоплата на карту" },
	],
	Vx = () => {
		var u, m, v, p, g, j;
		const e = Zt(),
			{ items: t, total: s, clearCart: a } = bs(),
			{ user: n } = Ce(),
			{
				register: i,
				handleSubmit: o,
				formState: { errors: l, isSubmitting: c },
			} = Ut({
				resolver: zt(Fx),
				defaultValues: {
					delivery_address:
						((u = n == null ? void 0 : n.organization) == null
							? void 0
							: u.actual_address) || "",
					delivery_priority: ss.NORMAL,
					payment_method: Dt.BANK_TRANSFER,
				},
			}),
			d = async (f) => {
				var S, y;
				try {
					const k = await Ax({
						...f,
						items: t.map((_) => ({
							product_id: _.product.id,
							qty: _.quantity,
						})),
					});
					(a(),
						he.success(`Заказ ${k.order_number} оформлен!`),
						e(`/account/orders/${k.id}`));
				} catch (k) {
					const _ = k;
					he.error(
						((y =
							(S = _ == null ? void 0 : _.response) == null
								? void 0
								: S.data) == null
							? void 0
							: y.detail) || "Ошибка при оформлении заказа",
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
															r.jsx(ps, {
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
															r.jsx(ye, {
																label: "Адрес доставки",
																placeholder: "г. Тобольск, ул. Ленина, д. 1",
																leftIcon: r.jsx(He, { className: "w-4 h-4" }),
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
																	r.jsx(ye, {
																		label: "Дата доставки",
																		type: "date",
																		min: Dx,
																		max: Ix,
																		error:
																			(v = l.delivery_date) == null
																				? void 0
																				: v.message,
																		required: !0,
																		...i("delivery_date"),
																	}),
																	r.jsx(rt, {
																		label: "Время доставки",
																		options: Lx,
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
															r.jsx(rt, {
																label: "Приоритет доставки",
																options: Mx,
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
															r.jsx(ta, {
																className: "w-5 h-5 text-primary-600",
															}),
															r.jsx("h2", {
																className: "font-semibold text-gray-900",
																children: "Оплата",
															}),
														],
													}),
													r.jsx(rt, {
														label: "Способ оплаты",
														options: $x,
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
															r.jsx(gs, {
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
																					ut(f.quantity, f.product.unit),
																					" × ",
																					X(f.price),
																				],
																			}),
																		],
																	}),
																	r.jsx("span", {
																		className:
																			"font-semibold text-gray-900 flex-shrink-0",
																		children: X(f.subtotal),
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
																	children: X(s),
																}),
															],
														}),
														r.jsx("div", {
															className: "text-xs text-gray-400 mt-1",
															children: "+ бесплатная доставка",
														}),
													],
												}),
												r.jsx(qe, {
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
	Rt = 1e3,
	qx = [
		{ value: "08:00-11:00", label: "08:00 – 11:00 (утро)" },
		{ value: "11:00-14:00", label: "11:00 – 14:00 (полдень)" },
		{ value: "14:00-17:00", label: "14:00 – 17:00 (вечер)" },
	],
	Qs = {
		card: "2200 7007 5544 1234",
		recipient: "Наимов Х.В.",
		bank: "Т-Банк",
		sbp_phone: "+7 (XXX) XXX-XX-XX",
	},
	Ux = za(new Date(), 1),
	zx = za(new Date(), 7),
	Bx = vs(Ux, "yyyy-MM-dd"),
	Wx = vs(zx, "yyyy-MM-dd"),
	Hx = Yt({
		name: xe().min(2, "Минимум 2 символа"),
		phone: xe()
			.min(10, "Введите корректный номер телефона")
			.regex(/^[\d\s\+\-\(\)]+$/, "Некорректный формат телефона"),
		delivery_address: xe().min(5, "Укажите адрес (минимум 5 символов)"),
		delivery_date: xe().min(1, "Выберите дату"),
		delivery_slot: xe().min(1, "Выберите время"),
		note: xe().optional(),
	}),
	Zx = ({ product: e, cartQty: t, onAdd: s, onRemove: a, onSetQty: n }) => {
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
									children: X(e.price_retail),
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
															? r.jsx(Ra, {
																	className: "w-3.5 h-3.5 text-red-400",
																})
															: r.jsx(Da, { className: "w-3.5 h-3.5" }),
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
													children: r.jsx(ar, { className: "w-3.5 h-3.5" }),
												}),
												r.jsx("span", {
													className:
														"text-xs font-medium text-green-700 ml-auto",
													children: X(t * e.price_retail),
												}),
											],
										})
									: r.jsxs("button", {
											type: "button",
											onClick: s,
											className:
												"w-full flex items-center justify-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg py-2 transition-colors",
											children: [
												r.jsx(ar, { className: "w-4 h-4" }),
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
	Gx = () => {
		var W, Q, ae, K, ve;
		const [e, t] = A.useState([]),
			[s, a] = A.useState("all"),
			[n, i] = A.useState(""),
			[o, l] = A.useState("catalog"),
			[c, d] = A.useState(null),
			[u, m] = A.useState(!1),
			{ data: v } = We({
				queryKey: ["retailProducts"],
				queryFn: () => ho({ per_page: 200 }),
			}),
			{ data: p } = We({ queryKey: ["retailCategories"], queryFn: () => Ua() }),
			g = (v == null ? void 0 : v.items) || [],
			j = A.useMemo(() => {
				let R = g.filter((Y) => Y.is_active);
				if (
					(s !== "all" && (R = R.filter((Y) => Y.category_id === s)), n.trim())
				) {
					const Y = n.toLowerCase();
					R = R.filter((ge) => ge.name.toLowerCase().includes(Y));
				}
				return R;
			}, [g, s, n]),
			f = A.useMemo(
				() => e.reduce((R, Y) => R + Y.qty * Y.product.price_retail, 0),
				[e],
			),
			S = e.length,
			{
				register: y,
				handleSubmit: k,
				formState: { errors: _ },
			} = Ut({
				resolver: zt(Hx),
				defaultValues: { delivery_slot: "08:00-11:00" },
			}),
			{ mutate: E, isPending: N } = Sa({
				mutationFn: (R) =>
					Tx({
						name: R.name,
						phone: R.phone,
						items: e.map((Y) => ({ product_id: Y.product.id, qty: Y.qty })),
						delivery_date: R.delivery_date,
						delivery_slot: R.delivery_slot,
						delivery_address: R.delivery_address,
						note: R.note || void 0,
					}),
				onSuccess: (R) => {
					(d({ order_number: R.order_number, total: R.total }),
						l("payment"),
						he.success("Заказ оформлен! Переведите оплату."));
				},
				onError: (R) => {
					var ge, ne;
					const Y = R;
					he.error(
						((ne =
							(ge = Y == null ? void 0 : Y.response) == null
								? void 0
								: ge.data) == null
							? void 0
							: ne.detail) || "Ошибка при оформлении заказа",
					);
				},
			}),
			z = (R) => {
				t((Y) =>
					Y.find((ne) => ne.product.id === R.id)
						? Y.map((ne) =>
								ne.product.id === R.id
									? {
											...ne,
											qty: Math.round((ne.qty + R.order_step) * 100) / 100,
										}
									: ne,
							)
						: [...Y, { product: R, qty: R.order_step || 1 }],
				);
			},
			te = (R) => {
				t((Y) => {
					const ge = Y.find((Ae) => Ae.product.id === R);
					if (!ge) return Y;
					const ne = ge.product.order_step || 1,
						Pe = Math.round((ge.qty - ne) * 100) / 100;
					return Pe <= 0
						? Y.filter((Ae) => Ae.product.id !== R)
						: Y.map((Ae) => (Ae.product.id === R ? { ...Ae, qty: Pe } : Ae));
				});
			},
			se = (R, Y) => {
				Y <= 0
					? t((ge) => ge.filter((ne) => ne.product.id !== R))
					: t((ge) =>
							ge.map((ne) =>
								ne.product.id === R
									? { ...ne, qty: Math.round(Y * 100) / 100 }
									: ne,
							),
						);
			},
			L = (R) => {
				var Y;
				return (
					((Y = e.find((ge) => ge.product.id === R)) == null
						? void 0
						: Y.qty) || 0
				);
			},
			be = (R) => {
				if (f < Rt) {
					he.error(`Минимальная сумма заказа: ${X(Rt)}`);
					return;
				}
				E(R);
			},
			V = async () => {
				try {
					(await navigator.clipboard.writeText(Qs.card.replace(/\s/g, "")),
						m(!0),
						he.success("Номер карты скопирован"),
						setTimeout(() => m(!1), 2e3));
				} catch {
					he.error("Не удалось скопировать");
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
										onChange: (R) => i(R.target.value),
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
											: p.map((R) =>
													r.jsx(
														"button",
														{
															type: "button",
															onClick: () => a(R.id),
															className: `flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${s === R.id ? "bg-green-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`,
															children: R.name,
														},
														R.id,
													),
												),
									],
								}),
								r.jsx("div", {
									className:
										"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
									children: j.map((R) =>
										r.jsx(
											Zx,
											{
												product: R,
												cartQty: L(R.id),
												onAdd: () => z(R),
												onRemove: () => te(R.id),
												onSetQty: (Y) => se(R.id, Y),
											},
											R.id,
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
						S > 0 &&
							r.jsx("div", {
								className:
									"fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40",
								children: r.jsxs("div", {
									className: "max-w-5xl mx-auto px-4 py-3",
									children: [
										r.jsxs("button", {
											type: "button",
											onClick: () => {
												if (f < Rt) {
													he.error(
														`Минимальная сумма заказа: ${X(Rt)}. Сейчас: ${X(f)}`,
													);
													return;
												}
												l("form");
											},
											className:
												"w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors",
											children: [
												r.jsx($s, { className: "w-5 h-5" }),
												r.jsxs("span", {
													children: [
														"Оформить · ",
														S,
														" ",
														S === 1 ? "товар" : "товаров",
													],
												}),
												r.jsx("span", {
													className:
														"bg-white/20 px-2.5 py-0.5 rounded-lg text-sm",
													children: X(f),
												}),
											],
										}),
										f < Rt &&
											r.jsxs("p", {
												className: "text-xs text-center text-orange-600 mt-1.5",
												children: [
													"Минимальный заказ ",
													X(Rt),
													" (ещё",
													" ",
													X(Rt - f),
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
									onSubmit: k(be),
									className: "space-y-5",
									children: [
										r.jsxs("div", {
											className:
												"bg-white rounded-xl border border-gray-200 p-5",
											children: [
												r.jsxs("div", {
													className: "flex items-center gap-2 mb-4",
													children: [
														r.jsx(ct, { className: "w-5 h-5 text-green-600" }),
														r.jsx("h2", {
															className: "font-semibold text-gray-900",
															children: "Контактные данные",
														}),
													],
												}),
												r.jsxs("div", {
													className: "space-y-3",
													children: [
														r.jsx(ye, {
															label: "Имя",
															placeholder: "Как к вам обращаться",
															error: (W = _.name) == null ? void 0 : W.message,
															required: !0,
															...y("name"),
														}),
														r.jsx(ye, {
															label: "Телефон",
															placeholder: "+7 (XXX) XXX-XX-XX",
															type: "tel",
															leftIcon: r.jsx(jt, { className: "w-4 h-4" }),
															error: (Q = _.phone) == null ? void 0 : Q.message,
															required: !0,
															...y("phone"),
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
														r.jsx(He, { className: "w-5 h-5 text-green-600" }),
														r.jsx("h2", {
															className: "font-semibold text-gray-900",
															children: "Доставка",
														}),
													],
												}),
												r.jsxs("div", {
													className: "space-y-3",
													children: [
														r.jsx(ye, {
															label: "Адрес доставки",
															placeholder:
																"г. Тобольск, ул. Ленина, д. 1, кв. 5",
															leftIcon: r.jsx(He, { className: "w-4 h-4" }),
															error:
																(ae = _.delivery_address) == null
																	? void 0
																	: ae.message,
															required: !0,
															...y("delivery_address"),
														}),
														r.jsxs("div", {
															className: "grid grid-cols-2 gap-3",
															children: [
																r.jsx(ye, {
																	label: "Дата доставки",
																	type: "date",
																	min: Bx,
																	max: Wx,
																	error:
																		(K = _.delivery_date) == null
																			? void 0
																			: K.message,
																	required: !0,
																	...y("delivery_date"),
																}),
																r.jsx(rt, {
																	label: "Время",
																	options: qx,
																	placeholder: "Слот",
																	error:
																		(ve = _.delivery_slot) == null
																			? void 0
																			: ve.message,
																	required: !0,
																	...y("delivery_slot"),
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
													...y("note"),
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
													children: e.map((R) =>
														r.jsxs(
															"div",
															{
																className:
																	"flex items-center justify-between text-sm",
																children: [
																	r.jsxs("div", {
																		className: "text-gray-700 truncate mr-2",
																		children: [
																			R.product.name,
																			r.jsxs("span", {
																				className: "text-gray-400 ml-1",
																				children: [
																					ut(R.qty, R.product.unit),
																					" ×",
																					" ",
																					X(R.product.price_retail),
																				],
																			}),
																		],
																	}),
																	r.jsx("span", {
																		className:
																			"font-semibold text-gray-900 flex-shrink-0",
																		children: X(R.qty * R.product.price_retail),
																	}),
																],
															},
															R.product.id,
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
															children: X(f),
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
														r.jsx(ta, { className: "w-5 h-5 text-green-600" }),
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
										r.jsx(qe, {
											type: "submit",
											variant: "primary",
											fullWidth: !0,
											size: "lg",
											loading: N,
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
											r.jsx($t, {
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
														children: X(c.total),
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
													r.jsx(ta, { className: "w-5 h-5 text-green-600" }),
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
																children: ["Номер карты (", Qs.bank, ")"],
															}),
															r.jsxs("div", {
																className: "flex items-center gap-2 mt-1",
																children: [
																	r.jsx("div", {
																		className:
																			"flex-1 bg-gray-50 rounded-lg px-4 py-3 font-mono text-lg font-bold text-gray-900 tracking-wider",
																		children: Qs.card,
																	}),
																	r.jsx("button", {
																		type: "button",
																		onClick: V,
																		className:
																			"p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors",
																		title: "Скопировать",
																		children: u
																			? r.jsx($t, { className: "w-5 h-5" })
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
																children: Qs.recipient,
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
																children: X(c.total),
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
	Yx = {
		[we.NEW]: { label: "Новый", variant: "blue" },
		[we.CONFIRMED]: { label: "Подтверждён", variant: "purple" },
		[we.ASSEMBLING]: { label: "Собирается", variant: "yellow" },
		[we.ASSEMBLED]: { label: "Собран", variant: "green" },
		[we.DELIVERING]: { label: "В пути", variant: "cyan" },
		[we.DELIVERED]: { label: "Доставлен", variant: "green" },
		[we.CANCELLED]: { label: "Отменён", variant: "red" },
	},
	pr = ({ status: e, size: t = "md" }) => {
		const s = Yx[e] || { label: e, variant: "gray" };
		return r.jsx(Mt, {
			variant: s.variant,
			size: t,
			dot: !0,
			children: s.label,
		});
	},
	Xx = () => {
		var i;
		const { user: e, isApproved: t } = Ce(),
			{ data: s, isLoading: a } = We({
				queryKey: ["myOrders", { per_page: 5 }],
				queryFn: () => Vo({ per_page: 5, page: 1 }),
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
				(e == null ? void 0 : e.status) === ot.PENDING &&
					r.jsxs("div", {
						className:
							"flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl",
						children: [
							r.jsx(br, {
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
											children: r.jsx(yr, {
												className: "w-5 h-5 text-blue-600",
											}),
										}),
										r.jsx(Te, {
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
											children: r.jsx(wt, {
												className: "w-5 h-5 text-purple-600",
											}),
										}),
										r.jsx(Te, {
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
											children: r.jsx(ct, {
												className: "w-5 h-5 text-green-600",
											}),
										}),
										r.jsx(Te, {
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
												children: X(e.credit_limit),
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
												children: X(e.debt),
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
												children: X(e.credit_limit - e.debt),
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
									children: ["Все заказы", r.jsx(Te, { className: "w-4 h-4" })],
								}),
							],
						}),
						a
							? r.jsx(Gt, {})
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
																	children: ds(o.created_at),
																}),
															],
														}),
														r.jsxs("div", {
															className: "flex items-center gap-3",
															children: [
																r.jsx(pr, { status: o.status, size: "sm" }),
																r.jsx("span", {
																	className:
																		"text-sm font-semibold text-gray-900",
																	children: X(o.total),
																}),
																r.jsx(Te, {
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
	Jx = [
		{ value: "", label: "Все статусы" },
		{ value: we.NEW, label: "Новые" },
		{ value: we.CONFIRMED, label: "Подтверждённые" },
		{ value: we.ASSEMBLING, label: "Собираются" },
		{ value: we.DELIVERING, label: "В пути" },
		{ value: we.DELIVERED, label: "Доставленные" },
		{ value: we.CANCELLED, label: "Отменённые" },
	],
	Qx = () => {
		const [e, t] = A.useState(1),
			[s, a] = A.useState(""),
			{ data: n, isLoading: i } = We({
				queryKey: ["myOrders", { page: e, status: s }],
				queryFn: () => Vo({ page: e, per_page: 15, status: s || void 0 }),
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
						children: r.jsx(rt, {
							options: Jx,
							value: s,
							onChange: (o) => {
								(a(o.target.value), t(1));
							},
						}),
					}),
				}),
				i
					? r.jsx(Gt, {})
					: (n == null ? void 0 : n.items.length) === 0
						? r.jsx(Ar, {
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
																					children: ds(o.created_at),
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
																					children: X(o.total),
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3",
																					children: r.jsx(pr, {
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
																							r.jsx(Te, {
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
																			r.jsx(pr, {
																				status: o.status,
																				size: "sm",
																			}),
																		],
																	}),
																	r.jsx("div", {
																		className: "text-xs text-gray-400",
																		children: ds(o.created_at),
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
																				children: X(o.total),
																			}),
																		],
																	}),
																],
															},
															o.id,
														);
													}),
									}),
									r.jsx(Ha, {
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
	Kx = async (e) => (await je.get("/documents", { params: e })).data,
	qo = async (e) =>
		(await je.get(`/documents/${e}/download`, { responseType: "blob" })).data,
	eg = async (e) =>
		(
			await je.get(`/orders/${e}/certificates/download`, {
				responseType: "blob",
			})
		).data,
	_a = (e, t) => {
		const s = window.URL.createObjectURL(e),
			a = document.createElement("a");
		((a.href = s),
			a.setAttribute("download", t),
			document.body.appendChild(a),
			a.click(),
			a.remove(),
			window.URL.revokeObjectURL(s));
	},
	ka = [
		{ status: we.NEW, label: "Новый", description: "Заказ принят в обработку" },
		{
			status: we.CONFIRMED,
			label: "Подтверждён",
			description: "Заказ подтверждён менеджером",
		},
		{
			status: we.ASSEMBLING,
			label: "Собирается",
			description: "Идёт комплектация заказа",
		},
		{
			status: we.ASSEMBLED,
			label: "Собран",
			description: "Заказ укомплектован и готов",
		},
		{
			status: we.DELIVERING,
			label: "В пути",
			description: "Курьер везёт ваш заказ",
		},
		{
			status: we.DELIVERED,
			label: "Доставлен",
			description: "Заказ успешно доставлен",
		},
	],
	tg = ka.map((e) => e.status),
	sg = ({ currentStatus: e, statusHistory: t = [], className: s }) => {
		var n;
		if (e === we.CANCELLED)
			return r.jsxs("div", {
				className: q("flex items-center gap-3 py-4", s),
				children: [
					r.jsx("div", {
						className:
							"w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0",
						children: r.jsx(nn, { className: "w-4 h-4 text-red-600" }),
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
									((n = t.find((i) => i.status === we.CANCELLED)) == null
										? void 0
										: n.note) || "",
							}),
						],
					}),
				],
			});
		const a = tg.indexOf(e);
		return r.jsx("div", {
			className: q("space-y-0", s),
			children: ka.map((i, o) => {
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
										className: q(
											"w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
											l && "bg-primary-100",
											c && "bg-primary-600 ring-4 ring-primary-100",
											d && "bg-gray-100",
										),
										children: l
											? r.jsx($t, { className: "w-4 h-4 text-primary-600" })
											: c
												? r.jsx(gs, { className: "w-4 h-4 text-white" })
												: r.jsx(nn, { className: "w-4 h-4 text-gray-300" }),
									}),
									o < ka.length - 1 &&
										r.jsx("div", {
											className: q(
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
												className: q(
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
													children: _o(u.changed_at),
												}),
										],
									}),
									r.jsx("p", {
										className: q(
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
	rg = () => {
		var l;
		const { id: e } = Ea(),
			{ data: t, isLoading: s } = We({
				queryKey: ["order", e],
				queryFn: () => Ox(e),
				enabled: !!e,
			}),
			[a, n] = A.useState(!1),
			i = async () => {
				if (t) {
					n(!0);
					try {
						const c = await eg(t.id);
						(_a(c, `certificates_${t.order_number}.zip`),
							he.success("Сертификаты скачаны"));
					} catch {
						he.error("Нет доступных сертификатов");
					} finally {
						n(!1);
					}
				}
			},
			o = async (c, d) => {
				try {
					const u = await qo(c);
					_a(u, `${d}.pdf`);
				} catch {
					he.error("Ошибка при скачивании документа");
				}
			};
		return s
			? r.jsx(Gt, {})
			: t
				? r.jsxs("div", {
						className: "space-y-5",
						children: [
							r.jsx(Za, {
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
												children: ["Оформлен ", _o(t.created_at)],
											}),
										],
									}),
									r.jsx(pr, { status: t.status }),
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
																												ut(c.actual_qty, "kg"),
																											],
																										}),
																								],
																							}),
																							r.jsx("td", {
																								className:
																									"px-5 py-3 text-right text-gray-600 hidden sm:table-cell",
																								children: ut(
																									c.ordered_qty,
																									"kg",
																								),
																							}),
																							r.jsx("td", {
																								className:
																									"px-5 py-3 text-right text-gray-600 hidden sm:table-cell",
																								children: X(c.price),
																							}),
																							r.jsx("td", {
																								className:
																									"px-5 py-3 text-right font-semibold text-gray-900",
																								children: X(c.total),
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
																			children: X(t.total),
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
																	r.jsx(He, {
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
																	r.jsx(gs, {
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
																					ds(t.delivery_date),
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
																	r.jsx(ps, {
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
																			r.jsx(qe, {
																				variant: "ghost",
																				size: "sm",
																				icon: r.jsx(Rs, {
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
															r.jsx(qe, {
																variant: "outline",
																size: "sm",
																icon: r.jsx(Rs, { className: "w-4 h-4" }),
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
												r.jsx(sg, {
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
	ag = [
		{ value: "", label: "Все типы" },
		{ value: Ke.INVOICE, label: "Счёт на оплату" },
		{ value: Ke.TORG12, label: "ТОРГ-12" },
		{ value: Ke.UPD, label: "УПД" },
		{ value: Ke.ACT, label: "Акт сверки" },
	],
	mi = {
		[Ke.INVOICE]: { label: "Счёт", variant: "blue" },
		[Ke.TORG12]: { label: "ТОРГ-12", variant: "green" },
		[Ke.UPD]: { label: "УПД", variant: "purple" },
		[Ke.ACT]: { label: "Акт", variant: "orange" },
		[Ke.CONTRACT]: { label: "Договор", variant: "gray" },
	},
	ng = () => {
		const [e, t] = A.useState(1),
			[s, a] = A.useState(""),
			[n, i] = A.useState(null),
			{ data: o, isLoading: l } = We({
				queryKey: ["myDocuments", { page: e, docType: s }],
				queryFn: () => Kx({ page: e, per_page: 20, doc_type: s || void 0 }),
			}),
			c = async (d, u) => {
				i(d);
				try {
					const m = await qo(d);
					(_a(m, `${u}.pdf`), he.success("Файл скачан"));
				} catch {
					he.error("Ошибка при скачивании");
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
						children: r.jsx(rt, {
							options: ag,
							value: s,
							onChange: (d) => {
								(a(d.target.value), t(1));
							},
						}),
					}),
				}),
				l
					? r.jsx(Gt, {})
					: (o == null ? void 0 : o.items.length) === 0
						? r.jsx(Ar, {
								icon: r.jsx(wt, { className: "w-8 h-8" }),
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
																	const u = mi[d.doc_type] || {
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
																					children: r.jsx(Mt, {
																						variant: u.variant,
																						size: "sm",
																						children: u.label,
																					}),
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3 text-gray-500",
																					children: ds(d.created_at),
																				}),
																				r.jsx("td", {
																					className: "px-5 py-3 text-right",
																					children: r.jsx(qe, {
																						variant: "ghost",
																						size: "sm",
																						icon: r.jsx(Rs, {
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
														const u = mi[d.doc_type] || {
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
																			r.jsx(Mt, {
																				variant: u.variant,
																				size: "sm",
																				children: u.label,
																			}),
																		],
																	}),
																	r.jsx("div", {
																		className: "text-xs text-gray-400 mb-3",
																		children: ds(d.created_at),
																	}),
																	r.jsx(qe, {
																		variant: "outline",
																		size: "sm",
																		icon: r.jsx(Rs, { className: "w-4 h-4" }),
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
									r.jsx(Ha, {
										page: e,
										totalPages: (o == null ? void 0 : o.pages) || 1,
										onPageChange: t,
									}),
								],
							}),
			],
		});
	},
	ig = Yt({
		full_name: xe().min(2, "Минимум 2 символа"),
		phone: xe().optional(),
		delivery_address: xe().optional(),
	}),
	og = Yt({
		current_password: xe().min(6, "Введите текущий пароль"),
		new_password: xe().min(8, "Минимум 8 символов"),
		confirm_password: xe(),
	}).refine((e) => e.new_password === e.confirm_password, {
		message: "Пароли не совпадают",
		path: ["confirm_password"],
	}),
	lg = {
		[Cs.INDIVIDUAL]: "Физическое лицо",
		[Cs.IP]: "ИП",
		[Cs.OOO]: "Организация",
	},
	cg = {
		[ot.PENDING]: { label: "На проверке", variant: "yellow" },
		[ot.APPROVED]: { label: "Активен", variant: "green" },
		[ot.REJECTED]: { label: "Отклонён", variant: "red" },
		[ot.BLOCKED]: { label: "Заблокирован", variant: "gray" },
	},
	dg = () => {
		var p, g, j, f, S, y;
		const { user: e, setUser: t } = Ce(),
			s = Jo(),
			[a, n] = A.useState(!1),
			[i, o] = A.useState(!1),
			l = Ut({
				resolver: zt(ig),
				defaultValues: {
					full_name: (e == null ? void 0 : e.full_name) || "",
					phone: (e == null ? void 0 : e.phone) || "",
					delivery_address: (e == null ? void 0 : e.delivery_address) || "",
				},
			}),
			c = Ut({ resolver: zt(og) }),
			d = l.handleSubmit(async (k) => {
				try {
					const _ = await je.patch("/profile", k);
					(t(_.data),
						s.invalidateQueries({ queryKey: ["profile"] }),
						he.success("Профиль обновлён"));
				} catch {
					he.error("Ошибка при сохранении профиля");
				}
			}),
			u = c.handleSubmit(async (k) => {
				try {
					(await cx({
						current_password: k.current_password,
						new_password: k.new_password,
					}),
						c.reset(),
						he.success("Пароль изменён"));
				} catch {
					he.error("Ошибка при смене пароля. Проверьте текущий пароль.");
				}
			}),
			m = e ? cg[e.status] : null,
			v = (e == null ? void 0 : e.client_type) !== Cs.INDIVIDUAL;
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
								children: r.jsx(ct, { className: "w-7 h-7 text-primary-600" }),
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
													lg[(e == null ? void 0 : e.client_type) || ""] ||
													(e == null ? void 0 : e.client_type),
											}),
											m &&
												r.jsx(Mt, {
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
										r.jsx(ye, {
											label: "ФИО",
											leftIcon: r.jsx(ct, { className: "w-4 h-4" }),
											error:
												(p = l.formState.errors.full_name) == null
													? void 0
													: p.message,
											...l.register("full_name"),
										}),
										r.jsx(ye, {
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
										r.jsx(ye, {
											label: "Email",
											value: (e == null ? void 0 : e.email) || "",
											disabled: !0,
											hint: "Email изменить нельзя",
										}),
										r.jsx(ye, {
											label: "Адрес доставки",
											placeholder: "Адрес для доставки заказов",
											leftIcon: r.jsx(He, { className: "w-4 h-4" }),
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
									children: r.jsx(qe, {
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
									r.jsx(_i, { className: "w-5 h-5 text-gray-500" }),
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
								r.jsx(ir, { className: "w-5 h-5 text-gray-500" }),
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
								r.jsx(ye, {
									label: "Текущий пароль",
									type: a ? "text" : "password",
									rightIcon: a
										? r.jsx(Ps, { className: "w-4 h-4" })
										: r.jsx(Ds, { className: "w-4 h-4" }),
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
										r.jsx(ye, {
											label: "Новый пароль",
											type: i ? "text" : "password",
											rightIcon: i
												? r.jsx(Ps, { className: "w-4 h-4" })
												: r.jsx(Ds, { className: "w-4 h-4" }),
											onRightIconClick: () => o(!i),
											error:
												(S = c.formState.errors.new_password) == null
													? void 0
													: S.message,
											hint: "Минимум 8 символов",
											...c.register("new_password"),
										}),
										r.jsx(ye, {
											label: "Подтвердите пароль",
											type: "password",
											error:
												(y = c.formState.errors.confirm_password) == null
													? void 0
													: y.message,
											...c.register("confirm_password"),
										}),
									],
								}),
								r.jsx("div", {
									className: "flex justify-end",
									children: r.jsx(qe, {
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
	ug = F.lazy(() =>
		me(
			() => import("./StandingOrdersPage-D5aHBF7q.js"),
			__vite__mapDeps([0, 1, 2, 3]),
		),
	),
	mg = F.lazy(() =>
		me(
			() => import("./ClientAnalyticsPage-BPEBqqwL.js"),
			__vite__mapDeps([4, 1, 2, 3, 5]),
		),
	),
	hg = F.lazy(() =>
		me(
			() => import("./AdminDashboard-CMjjAW0K.js"),
			__vite__mapDeps([6, 1, 3, 7, 2]),
		),
	),
	fg = F.lazy(() =>
		me(
			() => import("./AdminOrdersPage-BCoVRLD-.js"),
			__vite__mapDeps([8, 1, 3, 7, 2]),
		),
	),
	xg = F.lazy(() =>
		me(
			() => import("./AdminOrderDetailPage-DE70UAGl.js"),
			__vite__mapDeps([9, 1, 3, 7, 2]),
		),
	),
	gg = F.lazy(() =>
		me(
			() => import("./AdminCatalogPage-Cvk0tyyC.js"),
			__vite__mapDeps([10, 1, 3, 7, 11, 2]),
		),
	),
	hi = F.lazy(() =>
		me(
			() => import("./AdminProductForm-Dm2prmY5.js"),
			__vite__mapDeps([12, 1, 7, 3, 2]),
		),
	),
	pg = F.lazy(() =>
		me(
			() => import("./AdminStockPage-C5NG-WLj.js"),
			__vite__mapDeps([13, 1, 3, 7, 2]),
		),
	),
	yg = F.lazy(() =>
		me(
			() => import("./AdminStockReceiptPage-D9e-9C_a.js"),
			__vite__mapDeps([14, 1, 7, 3, 2]),
		),
	),
	bg = F.lazy(() =>
		me(
			() => import("./AdminClientsPage-Cl6JyqDn.js"),
			__vite__mapDeps([15, 1, 7, 11, 2, 3]),
		),
	),
	vg = F.lazy(() =>
		me(
			() => import("./AdminFinancePage-DYLq79wW.js"),
			__vite__mapDeps([16, 1, 7, 11, 2, 3, 5]),
		),
	),
	jg = F.lazy(() =>
		me(
			() => import("./AdminCertificatesPage-C-XPn9LC.js"),
			__vite__mapDeps([17, 1, 7, 11, 2, 3]),
		),
	),
	wg = F.lazy(() =>
		me(
			() => import("./AdminSettingsPage-vk2BnFiZ.js"),
			__vite__mapDeps([18, 1, 7, 2, 3]),
		),
	),
	Ng = F.lazy(() =>
		me(
			() => import("./AdminBackupsPage-CggHk-jK.js"),
			__vite__mapDeps([19, 1, 2, 3]),
		),
	),
	_g = F.lazy(() =>
		me(
			() => import("./AdminSuppliersPage-DP1e_kTG.js"),
			__vite__mapDeps([20, 1, 7, 2, 3]),
		),
	),
	kg = F.lazy(() =>
		me(
			() => import("./AdminContractsPage-Hnet786m.js"),
			__vite__mapDeps([21, 1, 7, 2, 3]),
		),
	),
	Sg = F.lazy(() =>
		me(
			() => import("./AdminDishesPage-1cy_VvzJ.js"),
			__vite__mapDeps([22, 1, 7, 2, 3]),
		),
	),
	Eg = F.lazy(() =>
		me(
			() => import("./AdminWriteOffsPage-DCJTF8xe.js"),
			__vite__mapDeps([23, 1, 7, 2, 3, 5]),
		),
	),
	Cg = F.lazy(() =>
		me(
			() => import("./AdminTendersPage-PjqWBSI7.js"),
			__vite__mapDeps([24, 1, 7, 2, 3]),
		),
	),
	Ag = F.lazy(() =>
		me(
			() => import("./AdminAnalyticsPage-CdWZJoOZ.js"),
			__vite__mapDeps([25, 1, 7, 2, 3, 5]),
		),
	),
	Og = F.lazy(() =>
		me(
			() => import("./AdminCRMPage-DcNkvrSA.js"),
			__vite__mapDeps([26, 1, 7, 2, 3]),
		),
	),
	Tg = F.lazy(() =>
		me(
			() => import("./AdminRemindersPage-DLO2uwNl.js"),
			__vite__mapDeps([27, 1, 7, 2, 3]),
		),
	),
	Rg = F.lazy(() =>
		me(
			() => import("./AdminCalendarPage-Bj6gxVKN.js"),
			__vite__mapDeps([28, 1, 7, 2, 3]),
		),
	),
	Pg = F.lazy(() =>
		me(
			() => import("./AdminProcurementPage-ClBguaYa.js"),
			__vite__mapDeps([29, 1, 7, 2, 3]),
		),
	),
	Dg = F.lazy(() =>
		me(
			() => import("./AdminPriceLogPage-CQ3Yw6FW.js"),
			__vite__mapDeps([30, 1, 7, 2, 3, 5]),
		),
	),
	Ig = F.lazy(() =>
		me(
			() => import("./AdminBatchesPage-Ds3fPO4s.js"),
			__vite__mapDeps([31, 1, 7, 2, 3]),
		),
	),
	Fg = F.lazy(() =>
		me(
			() => import("./AdminLogisticsPage-adqGbYuL.js"),
			__vite__mapDeps([32, 1, 7, 2, 3]),
		),
	),
	Lg = F.lazy(() =>
		me(
			() => import("./AdminLabelsPage-AjEo1vlZ.js"),
			__vite__mapDeps([33, 1, 7, 2, 3]),
		),
	),
	Mg = F.lazy(() =>
		me(
			() => import("./AdminDocumentsPage-B_KRSHbM.js"),
			__vite__mapDeps([34, 1, 2, 3]),
		),
	),
	fi = () => {
		const { isAuthenticated: e } = Ce(),
			t = Ca();
		return e
			? r.jsx(Ls, {})
			: r.jsx(As, { to: "/login", state: { from: t }, replace: !0 });
	},
	$g = () => {
		const { isAuthenticated: e, user: t } = Ce(),
			s = Ca();
		return e
			? (t == null ? void 0 : t.role) !== gt.ADMIN
				? r.jsx(As, { to: "/", replace: !0 })
				: r.jsx(Ls, {})
			: r.jsx(As, { to: "/login", state: { from: s }, replace: !0 });
	},
	ce = ({ children: e }) =>
		r.jsx(A.Suspense, { fallback: r.jsx(Gt, {}), children: e }),
	Vg = () =>
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
	xi = () => {
		const { isAuthenticated: e } = Ce();
		return e ? r.jsx(nf, {}) : r.jsx(As, { to: "/quick-order", replace: !0 });
	},
	qg = () => {
		const { isAuthenticated: e } = Ce();
		return e ? r.jsx(Cx, {}) : r.jsx(As, { to: "/quick-order", replace: !0 });
	},
	Ug = sl([
		{
			element: r.jsx(Pu, {}),
			children: [
				{ path: "/", element: r.jsx(Xu, {}) },
				{ path: "/catalog", element: r.jsx(xi, {}) },
				{ path: "/catalog/:category", element: r.jsx(xi, {}) },
				{ path: "/catalog/:category/:id", element: r.jsx(of, {}) },
				{ path: "/about", element: r.jsx(gx, {}) },
				{ path: "/contacts", element: r.jsx(px, {}) },
				{ path: "/schools", element: r.jsx(Sx, {}) },
				{ path: "/quick-order", element: r.jsx(Gx, {}) },
				{ path: "/cart", element: r.jsx(qg, {}) },
				{
					element: r.jsx(fi, {}),
					children: [{ path: "/checkout", element: r.jsx(Vx, {}) }],
				},
			],
		},
		{ path: "/login", element: r.jsx(ux, {}) },
		{ path: "/register", element: r.jsx(xx, {}) },
		{
			element: r.jsx(fi, {}),
			children: [
				{
					element: r.jsx(Du, {}),
					children: [
						{ path: "/account", element: r.jsx(Xx, {}) },
						{ path: "/account/orders", element: r.jsx(Qx, {}) },
						{ path: "/account/orders/:id", element: r.jsx(rg, {}) },
						{ path: "/account/documents", element: r.jsx(ng, {}) },
						{ path: "/account/profile", element: r.jsx(dg, {}) },
						{
							path: "/account/standing-orders",
							element: r.jsx(ce, { children: r.jsx(ug, {}) }),
						},
						{
							path: "/account/analytics",
							element: r.jsx(ce, { children: r.jsx(mg, {}) }),
						},
					],
				},
			],
		},
		{
			element: r.jsx($g, {}),
			children: [
				{
					element: r.jsx(Mu, {}),
					children: [
						{ path: "/admin", element: r.jsx(ce, { children: r.jsx(hg, {}) }) },
						{
							path: "/admin/orders",
							element: r.jsx(ce, { children: r.jsx(fg, {}) }),
						},
						{
							path: "/admin/orders/:id",
							element: r.jsx(ce, { children: r.jsx(xg, {}) }),
						},
						{
							path: "/admin/catalog",
							element: r.jsx(ce, { children: r.jsx(gg, {}) }),
						},
						{
							path: "/admin/catalog/new",
							element: r.jsx(ce, { children: r.jsx(hi, {}) }),
						},
						{
							path: "/admin/catalog/:id/edit",
							element: r.jsx(ce, { children: r.jsx(hi, {}) }),
						},
						{
							path: "/admin/stock",
							element: r.jsx(ce, { children: r.jsx(pg, {}) }),
						},
						{
							path: "/admin/stock/receipt",
							element: r.jsx(ce, { children: r.jsx(yg, {}) }),
						},
						{
							path: "/admin/clients",
							element: r.jsx(ce, { children: r.jsx(bg, {}) }),
						},
						{
							path: "/admin/finance",
							element: r.jsx(ce, { children: r.jsx(vg, {}) }),
						},
						{
							path: "/admin/certificates",
							element: r.jsx(ce, { children: r.jsx(jg, {}) }),
						},
						{
							path: "/admin/settings",
							element: r.jsx(ce, { children: r.jsx(wg, {}) }),
						},
						{
							path: "/admin/backups",
							element: r.jsx(F.Suspense, {
								fallback: r.jsx("div", {}),
								children: r.jsx(Ng, {}),
							}),
						},
						{
							path: "/admin/documents",
							element: r.jsx(ce, { children: r.jsx(Mg, {}) }),
						},
						{
							path: "/admin/suppliers",
							element: r.jsx(ce, { children: r.jsx(_g, {}) }),
						},
						{
							path: "/admin/contracts",
							element: r.jsx(ce, { children: r.jsx(kg, {}) }),
						},
						{
							path: "/admin/dishes",
							element: r.jsx(ce, { children: r.jsx(Sg, {}) }),
						},
						{
							path: "/admin/write-offs",
							element: r.jsx(ce, { children: r.jsx(Eg, {}) }),
						},
						{
							path: "/admin/tenders",
							element: r.jsx(ce, { children: r.jsx(Cg, {}) }),
						},
						{
							path: "/admin/analytics",
							element: r.jsx(ce, { children: r.jsx(Ag, {}) }),
						},
						{
							path: "/admin/crm",
							element: r.jsx(ce, { children: r.jsx(Og, {}) }),
						},
						{
							path: "/admin/reminders",
							element: r.jsx(ce, { children: r.jsx(Tg, {}) }),
						},
						{
							path: "/admin/calendar",
							element: r.jsx(ce, { children: r.jsx(Rg, {}) }),
						},
						{
							path: "/admin/procurement",
							element: r.jsx(ce, { children: r.jsx(Pg, {}) }),
						},
						{
							path: "/admin/price-log",
							element: r.jsx(ce, { children: r.jsx(Dg, {}) }),
						},
						{
							path: "/admin/batches",
							element: r.jsx(ce, { children: r.jsx(Ig, {}) }),
						},
						{
							path: "/admin/logistics",
							element: r.jsx(ce, { children: r.jsx(Fg, {}) }),
						},
						{
							path: "/admin/labels",
							element: r.jsx(ce, { children: r.jsx(Lg, {}) }),
						},
					],
				},
			],
		},
		{ path: "*", element: r.jsx(Vg, {}) },
	]),
	zg = () => r.jsx(rl, { router: Ug }),
	Bg = new Qo({
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
	Uo = document.getElementById("root");
if (!Uo) throw new Error("Корневой элемент #root не найден в index.html");
sa.createRoot(Uo).render(
	r.jsx(F.StrictMode, {
		children: r.jsxs(Ko, {
			client: Bg,
			children: [
				r.jsx(zg, {}),
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
	ot as A,
	Mt as B,
	f0 as C,
	ss as D,
	Ar as E,
	Ot as F,
	Cs as G,
	g0 as H,
	ye as I,
	Yc as J,
	jo as K,
	No as L,
	Ze as M,
	Ku as N,
	we as O,
	Gt as P,
	Xc as Q,
	rt as S,
	Jc as U,
	je as a,
	X as b,
	q as c,
	ef as d,
	pr as e,
	ds as f,
	Vo as g,
	Ha as h,
	Za as i,
	_o as j,
	qe as k,
	ut as l,
	Gc as m,
	sg as n,
	ma as o,
	Yt as p,
	p0 as q,
	xe as r,
	he as s,
	zt as t,
	Ut as u,
	b0 as v,
	ui as w,
	vs as x,
	x0 as y,
	y0 as z,
};
//# sourceMappingURL=index-CMOEm5bo.js.map
