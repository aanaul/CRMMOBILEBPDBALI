//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function D(e, t) {
		return E(e.type, t, e.props);
	}
	function O(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function k(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var A = /\/+/g;
	function j(e, t) {
		return typeof e == "object" && e && e.key != null ? k("" + e.key) : t.toString(36);
	}
	function M(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function N(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, N(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + j(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(A, "$&/") + "/"), N(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = D(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + j(a, u), c += N(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + j(a, u++), c += N(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return N(M(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function P(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return N(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function F(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var I = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, L = {
		map: P,
		forEach: function(e, t, n) {
			P(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return P(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return P(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = L, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = O, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: F
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, I);
		} catch (e) {
			I(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.6";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, O());
		else {
			var t = n(l);
			t !== null && j(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.6";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), j = Symbol.iterator;
	function M(e) {
		return typeof e != "object" || !e ? null : (e = j && e[j] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var N = Symbol.for("react.client.reference");
	function P(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === N ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case E: return "SuspenseList";
			case k: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case D: return t = e.displayName || null, t === null ? P(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return P(e(t));
				} catch {}
		}
		return null;
	}
	var F = Array.isArray, I = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, R = [], z = -1;
	function B(e) {
		return { current: e };
	}
	function V(e) {
		0 > z || (e.current = R[z], R[z] = null, z--);
	}
	function H(e, t) {
		z++, R[z] = e.current, e.current = t;
	}
	var U = B(null), W = B(null), te = B(null), ne = B(null);
	function re(e, t) {
		switch (H(te, t), H(W, e), H(U, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Wd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Wd(t), e = Gd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		V(U), H(U, e);
	}
	function ie() {
		V(U), V(W), V(te);
	}
	function G(e) {
		e.memoizedState !== null && H(ne, e);
		var t = U.current, n = Gd(t, e.type);
		t !== n && (H(W, e), H(U, n));
	}
	function ae(e) {
		W.current === e && (V(U), V(W)), ne.current === e && (V(ne), ep._currentValue = ee);
	}
	var K, oe;
	function se(e) {
		if (K === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			K = t && t[1] || "", oe = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + K + e + oe;
	}
	var ce = !1;
	function le(e, t) {
		if (!e || ce) return "";
		ce = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			ce = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? se(n) : "";
	}
	function ue(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return se(e.type);
			case 16: return se("Lazy");
			case 13: return e.child !== t && t !== null ? se("Suspense Fallback") : se("Suspense");
			case 19: return se("SuspenseList");
			case 0:
			case 15: return le(e.type, !1);
			case 11: return le(e.type.render, !1);
			case 1: return le(e.type, !0);
			case 31: return se("Activity");
			default: return "";
		}
	}
	function de(e) {
		try {
			var t = "", n = null;
			do
				t += ue(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var fe = Object.prototype.hasOwnProperty, pe = t.unstable_scheduleCallback, me = t.unstable_cancelCallback, he = t.unstable_shouldYield, ge = t.unstable_requestPaint, q = t.unstable_now, _e = t.unstable_getCurrentPriorityLevel, ve = t.unstable_ImmediatePriority, ye = t.unstable_UserBlockingPriority, be = t.unstable_NormalPriority, xe = t.unstable_LowPriority, Se = t.unstable_IdlePriority, Ce = t.log, we = t.unstable_setDisableYieldValue, Te = null, Ee = null;
	function De(e) {
		if (typeof Ce == "function" && we(e), Ee && typeof Ee.setStrictMode == "function") try {
			Ee.setStrictMode(Te, e);
		} catch {}
	}
	var Oe = Math.clz32 ? Math.clz32 : je, ke = Math.log, Ae = Math.LN2;
	function je(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (ke(e) / Ae | 0) | 0;
	}
	var Me = 256, Ne = 262144, Pe = 4194304;
	function Fe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ie(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Fe(n))) : i = Fe(o) : i = Fe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Fe(n))) : i = Fe(o)) : i = Fe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Le(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Re(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function ze() {
		var e = Pe;
		return Pe <<= 1, !(Pe & 62914560) && (Pe = 4194304), e;
	}
	function Be(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ve(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function He(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Oe(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && Ue(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function Ue(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Oe(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function We(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Oe(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ge(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ke(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ke(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function qe(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Je() {
		var e = L.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : hp(e.type)) : e;
	}
	function J(e, t) {
		var n = L.p;
		try {
			return L.p = e, t();
		} finally {
			L.p = n;
		}
	}
	var Ye = Math.random().toString(36).slice(2), Xe = "__reactFiber$" + Ye, Ze = "__reactProps$" + Ye, Qe = "__reactContainer$" + Ye, $e = "__reactEvents$" + Ye, et = "__reactListeners$" + Ye, tt = "__reactHandles$" + Ye, nt = "__reactResources$" + Ye, rt = "__reactMarker$" + Ye;
	function it(e) {
		delete e[Xe], delete e[Ze], delete e[$e], delete e[et], delete e[tt];
	}
	function at(e) {
		var t = e[Xe];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Qe] || n[Xe]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = mf(e); e !== null;) {
					if (n = e[Xe]) return n;
					e = mf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function ot(e) {
		if (e = e[Xe] || e[Qe]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function st(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function ct(e) {
		var t = e[nt];
		return t ||= e[nt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function lt(e) {
		e[rt] = !0;
	}
	var ut = /* @__PURE__ */ new Set(), dt = {};
	function ft(e, t) {
		pt(e, t), pt(e + "Capture", t);
	}
	function pt(e, t) {
		for (dt[e] = t, e = 0; e < t.length; e++) ut.add(t[e]);
	}
	var mt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), ht = {}, gt = {};
	function _t(e) {
		return fe.call(gt, e) ? !0 : fe.call(ht, e) ? !1 : mt.test(e) ? gt[e] = !0 : (ht[e] = !0, !1);
	}
	function vt(e, t, n) {
		if (_t(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function yt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function bt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function xt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function St(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ct(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function wt(e) {
		if (!e._valueTracker) {
			var t = St(e) ? "checked" : "value";
			e._valueTracker = Ct(e, t, "" + e[t]);
		}
	}
	function Tt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = St(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Et(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Dt = /[\n"\\]/g;
	function Ot(e) {
		return e.replace(Dt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function kt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + xt(t)) : e.value !== "" + xt(t) && (e.value = "" + xt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : jt(e, o, xt(n)) : jt(e, o, xt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + xt(s) : e.removeAttribute("name");
	}
	function At(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				wt(e);
				return;
			}
			n = n == null ? "" : "" + xt(n), t = t == null ? n : "" + xt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), wt(e);
	}
	function jt(e, t, n) {
		t === "number" && Et(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Mt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + xt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Nt(e, t, n) {
		if (t != null && (t = "" + xt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + xt(n);
	}
	function Pt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (F(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = xt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), wt(e);
	}
	function Ft(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var It = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Lt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || It.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Rt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Lt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Lt(e, o, t[o]);
	}
	function zt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Bt = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Vt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Ht(e) {
		return Vt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Ut() {}
	var Wt = null;
	function Gt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Kt = null, qt = null;
	function Jt(e) {
		var t = ot(e);
		if (t && (e = t.stateNode)) {
			var n = e[Ze] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (kt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Ot("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Ze] || null;
								if (!a) throw Error(i(90));
								kt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Tt(r);
					}
					break a;
				case "textarea":
					Nt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Mt(e, !!n.multiple, t, !1);
			}
		}
	}
	var Yt = !1;
	function Xt(e, t, n) {
		if (Yt) return e(t, n);
		Yt = !0;
		try {
			return e(t);
		} finally {
			if (Yt = !1, (Kt !== null || qt !== null) && (bu(), Kt && (t = Kt, e = qt, qt = Kt = null, Jt(t), e))) for (t = 0; t < e.length; t++) Jt(e[t]);
		}
	}
	function Zt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Ze] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var Y = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), Qt = !1;
	if (Y) try {
		var $t = {};
		Object.defineProperty($t, "passive", { get: function() {
			Qt = !0;
		} }), window.addEventListener("test", $t, $t), window.removeEventListener("test", $t, $t);
	} catch {
		Qt = !1;
	}
	var en = null, tn = null, nn = null;
	function rn() {
		if (nn) return nn;
		var e, t = tn, n = t.length, r, i = "value" in en ? en.value : en.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return nn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function an(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function on() {
		return !0;
	}
	function sn() {
		return !1;
	}
	function cn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? on : sn, this.isPropagationStopped = sn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = on);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = on);
			},
			persist: function() {},
			isPersistent: on
		}), t;
	}
	var ln = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, un = cn(ln), dn = h({}, ln, {
		view: 0,
		detail: 0
	}), fn = cn(dn), pn, mn, hn, gn = h({}, dn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Dn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== hn && (hn && e.type === "mousemove" ? (pn = e.screenX - hn.screenX, mn = e.screenY - hn.screenY) : mn = pn = 0, hn = e), pn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : mn;
		}
	}), _n = cn(gn), vn = cn(h({}, gn, { dataTransfer: 0 })), yn = cn(h({}, dn, { relatedTarget: 0 })), bn = cn(h({}, ln, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), xn = cn(h({}, ln, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Sn = cn(h({}, ln, { data: 0 })), Cn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, wn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Tn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function En(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Tn[e]) ? !!t[e] : !1;
	}
	function Dn() {
		return En;
	}
	var On = cn(h({}, dn, {
		key: function(e) {
			if (e.key) {
				var t = Cn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = an(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? wn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Dn,
		charCode: function(e) {
			return e.type === "keypress" ? an(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? an(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), kn = cn(h({}, gn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), An = cn(h({}, dn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Dn
	})), jn = cn(h({}, ln, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Mn = cn(h({}, gn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Nn = cn(h({}, ln, {
		newState: 0,
		oldState: 0
	})), Pn = [
		9,
		13,
		27,
		32
	], Fn = Y && "CompositionEvent" in window, In = null;
	Y && "documentMode" in document && (In = document.documentMode);
	var Ln = Y && "TextEvent" in window && !In, Rn = Y && (!Fn || In && 8 < In && 11 >= In), zn = " ", Bn = !1;
	function Vn(e, t) {
		switch (e) {
			case "keyup": return Pn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Hn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Un = !1;
	function Wn(e, t) {
		switch (e) {
			case "compositionend": return Hn(t);
			case "keypress": return t.which === 32 ? (Bn = !0, zn) : null;
			case "textInput": return e = t.data, e === zn && Bn ? null : e;
			default: return null;
		}
	}
	function Gn(e, t) {
		if (Un) return e === "compositionend" || !Fn && Vn(e, t) ? (e = rn(), nn = tn = en = null, Un = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Rn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Kn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function qn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Kn[e.type] : t === "textarea";
	}
	function Jn(e, t, n, r) {
		Kt ? qt ? qt.push(r) : qt = [r] : Kt = r, t = Od(t, "onChange"), 0 < t.length && (n = new un("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Yn = null, Xn = null;
	function Zn(e) {
		bd(e, 0);
	}
	function Qn(e) {
		if (Tt(st(e))) return e;
	}
	function $n(e, t) {
		if (e === "change") return t;
	}
	var er = !1;
	if (Y) {
		var tr;
		if (Y) {
			var nr = "oninput" in document;
			if (!nr) {
				var rr = document.createElement("div");
				rr.setAttribute("oninput", "return;"), nr = typeof rr.oninput == "function";
			}
			tr = nr;
		} else tr = !1;
		er = tr && (!document.documentMode || 9 < document.documentMode);
	}
	function ir() {
		Yn && (Yn.detachEvent("onpropertychange", ar), Xn = Yn = null);
	}
	function ar(e) {
		if (e.propertyName === "value" && Qn(Xn)) {
			var t = [];
			Jn(t, Xn, e, Gt(e)), Xt(Zn, t);
		}
	}
	function or(e, t, n) {
		e === "focusin" ? (ir(), Yn = t, Xn = n, Yn.attachEvent("onpropertychange", ar)) : e === "focusout" && ir();
	}
	function sr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Qn(Xn);
	}
	function cr(e, t) {
		if (e === "click") return Qn(t);
	}
	function lr(e, t) {
		if (e === "input" || e === "change") return Qn(t);
	}
	function ur(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var dr = typeof Object.is == "function" ? Object.is : ur;
	function fr(e, t) {
		if (dr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!fe.call(t, i) || !dr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function pr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function mr(e, t) {
		var n = pr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = pr(n);
		}
	}
	function hr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? hr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function gr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Et(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Et(e.document);
		}
		return t;
	}
	function _r(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var vr = Y && "documentMode" in document && 11 >= document.documentMode, yr = null, br = null, xr = null, Sr = !1;
	function Cr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Sr || yr == null || yr !== Et(r) || (r = yr, "selectionStart" in r && _r(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), xr && fr(xr, r) || (xr = r, r = Od(br, "onSelect"), 0 < r.length && (t = new un("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = yr)));
	}
	function wr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Tr = {
		animationend: wr("Animation", "AnimationEnd"),
		animationiteration: wr("Animation", "AnimationIteration"),
		animationstart: wr("Animation", "AnimationStart"),
		transitionrun: wr("Transition", "TransitionRun"),
		transitionstart: wr("Transition", "TransitionStart"),
		transitioncancel: wr("Transition", "TransitionCancel"),
		transitionend: wr("Transition", "TransitionEnd")
	}, Er = {}, Dr = {};
	Y && (Dr = document.createElement("div").style, "AnimationEvent" in window || (delete Tr.animationend.animation, delete Tr.animationiteration.animation, delete Tr.animationstart.animation), "TransitionEvent" in window || delete Tr.transitionend.transition);
	function Or(e) {
		if (Er[e]) return Er[e];
		if (!Tr[e]) return e;
		var t = Tr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Dr) return Er[e] = t[n];
		return e;
	}
	var kr = Or("animationend"), Ar = Or("animationiteration"), jr = Or("animationstart"), Mr = Or("transitionrun"), Nr = Or("transitionstart"), Pr = Or("transitioncancel"), Fr = Or("transitionend"), Ir = /* @__PURE__ */ new Map(), Lr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Lr.push("scrollEnd");
	function Rr(e, t) {
		Ir.set(e, t), ft(t, [e]);
	}
	var zr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Br = [], Vr = 0, Hr = 0;
	function Ur() {
		for (var e = Vr, t = Hr = Vr = 0; t < e;) {
			var n = Br[t];
			Br[t++] = null;
			var r = Br[t];
			Br[t++] = null;
			var i = Br[t];
			Br[t++] = null;
			var a = Br[t];
			if (Br[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && qr(n, i, a);
		}
	}
	function Wr(e, t, n, r) {
		Br[Vr++] = e, Br[Vr++] = t, Br[Vr++] = n, Br[Vr++] = r, Hr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Gr(e, t, n, r) {
		return Wr(e, t, n, r), Jr(e);
	}
	function Kr(e, t) {
		return Wr(e, null, null, t), Jr(e);
	}
	function qr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Oe(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Jr(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Yr = {};
	function Xr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Zr(e, t, n, r) {
		return new Xr(e, t, n, r);
	}
	function Qr(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function $r(e, t) {
		var n = e.alternate;
		return n === null ? (n = Zr(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ei(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ti(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") Qr(e) && (s = 1);
		else if (typeof e == "string") s = Kf(e, n, U.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = Zr(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return ni(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = Zr(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = Zr(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = Zr(19, n, t, a), e.elementType = E, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case D:
						s = 14;
						break a;
					case O:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Zr(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ni(e, t, n, r) {
		return e = Zr(7, e, r, t), e.lanes = n, e;
	}
	function ri(e, t, n) {
		return e = Zr(6, e, null, t), e.lanes = n, e;
	}
	function ii(e) {
		var t = Zr(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ai(e, t, n) {
		return t = Zr(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var oi = /* @__PURE__ */ new WeakMap();
	function si(e, t) {
		if (typeof e == "object" && e) {
			var n = oi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: de(t)
			}, oi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: de(t)
		};
	}
	var ci = [], li = 0, ui = null, di = 0, fi = [], pi = 0, mi = null, hi = 1, gi = "";
	function _i(e, t) {
		ci[li++] = di, ci[li++] = ui, ui = e, di = t;
	}
	function vi(e, t, n) {
		fi[pi++] = hi, fi[pi++] = gi, fi[pi++] = mi, mi = e;
		var r = hi;
		e = gi;
		var i = 32 - Oe(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Oe(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, hi = 1 << 32 - Oe(t) + i | n << i | r, gi = a + e;
		} else hi = 1 << a | n << i | r, gi = e;
	}
	function yi(e) {
		e.return !== null && (_i(e, 1), vi(e, 1, 0));
	}
	function bi(e) {
		for (; e === ui;) ui = ci[--li], ci[li] = null, di = ci[--li], ci[li] = null;
		for (; e === mi;) mi = fi[--pi], fi[pi] = null, gi = fi[--pi], fi[pi] = null, hi = fi[--pi], fi[pi] = null;
	}
	function xi(e, t) {
		fi[pi++] = hi, fi[pi++] = gi, fi[pi++] = mi, hi = t.id, gi = t.overflow, mi = e;
	}
	var Si = null, Ci = null, wi = !1, Ti = null, Ei = !1, Di = Error(i(519));
	function Oi(e) {
		throw Pi(si(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Di;
	}
	function ki(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Xe] = e, t[Ze] = r, n) {
			case "dialog":
				xd("cancel", t), xd("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				xd("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < vd.length; n++) xd(vd[n], t);
				break;
			case "source":
				xd("error", t);
				break;
			case "img":
			case "image":
			case "link":
				xd("error", t), xd("load", t);
				break;
			case "details":
				xd("toggle", t);
				break;
			case "input":
				xd("invalid", t), At(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				xd("invalid", t);
				break;
			case "textarea": xd("invalid", t), Pt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Pd(t.textContent, n) ? (r.popover != null && (xd("beforetoggle", t), xd("toggle", t)), r.onScroll != null && xd("scroll", t), r.onScrollEnd != null && xd("scrollend", t), r.onClick != null && (t.onclick = Ut), t = !0) : t = !1, t || Oi(e, !0);
	}
	function Ai(e) {
		for (Si = e.return; Si;) switch (Si.tag) {
			case 5:
			case 31:
			case 13:
				Ei = !1;
				return;
			case 27:
			case 3:
				Ei = !0;
				return;
			default: Si = Si.return;
		}
	}
	function ji(e) {
		if (e !== Si) return !1;
		if (!wi) return Ai(e), wi = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Kd(e.type, e.memoizedProps)), n = !n), n && Ci && Oi(e), Ai(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ci = pf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ci = pf(e);
		} else t === 27 ? (t = Ci, ef(e.type) ? (e = ff, ff = null, Ci = e) : Ci = t) : Ci = Si ? df(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Mi() {
		Ci = Si = null, wi = !1;
	}
	function Ni() {
		var e = Ti;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Ti = null), e;
	}
	function Pi(e) {
		Ti === null ? Ti = [e] : Ti.push(e);
	}
	var Fi = B(null), Ii = null, Li = null;
	function Ri(e, t, n) {
		H(Fi, t._currentValue), t._currentValue = n;
	}
	function zi(e) {
		e._currentValue = Fi.current, V(Fi);
	}
	function Bi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Vi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Bi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Bi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Hi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					dr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ne.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [ep] : e.push(ep));
			}
			a = a.return;
		}
		e !== null && Vi(t, e, n, r), t.flags |= 262144;
	}
	function Ui(e) {
		for (e = e.firstContext; e !== null;) {
			if (!dr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Wi(e) {
		Ii = e, Li = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Gi(e) {
		return qi(Ii, e);
	}
	function Ki(e, t) {
		return Ii === null && Wi(e), qi(e, t);
	}
	function qi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Li === null) {
			if (e === null) throw Error(i(308));
			Li = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Li = Li.next = t;
		return n;
	}
	var Ji = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Yi = t.unstable_scheduleCallback, Xi = t.unstable_NormalPriority, Zi = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Qi() {
		return {
			controller: new Ji(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function $i(e) {
		e.refCount--, e.refCount === 0 && Yi(Xi, function() {
			e.controller.abort();
		});
	}
	var ea = null, ta = 0, na = 0, ra = null;
	function ia(e, t) {
		if (ea === null) {
			var n = ea = [];
			ta = 0, na = fd(), ra = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ta++, t.then(aa, aa), t;
	}
	function aa() {
		if (--ta === 0 && ea !== null) {
			ra !== null && (ra.status = "fulfilled");
			var e = ea;
			ea = null, na = 0, ra = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function oa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var sa = I.S;
	I.S = function(e, t) {
		eu = q(), typeof t == "object" && t && typeof t.then == "function" && ia(e, t), sa !== null && sa(e, t);
	};
	var ca = B(null);
	function la() {
		var e = ca.current;
		return e === null ? Fl.pooledCache : e;
	}
	function ua(e, t) {
		t === null ? H(ca, ca.current) : H(ca, t.pool);
	}
	function da() {
		var e = la();
		return e === null ? null : {
			parent: Zi._currentValue,
			pool: e
		};
	}
	var fa = Error(i(460)), pa = Error(i(474)), ma = Error(i(542)), ha = { then: function() {} };
	function ga(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function _a(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Ut, Ut), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, xa(e), e;
			default:
				if (typeof t.status == "string") t.then(Ut, Ut);
				else {
					if (e = Fl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, xa(e), e;
				}
				throw ya = t, fa;
		}
	}
	function va(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ya = e, fa) : e;
		}
	}
	var ya = null;
	function ba() {
		if (ya === null) throw Error(i(459));
		var e = ya;
		return ya = null, e;
	}
	function xa(e) {
		if (e === fa || e === ma) throw Error(i(483));
	}
	var Sa = null, Ca = 0;
	function wa(e) {
		var t = Ca;
		return Ca += 1, Sa === null && (Sa = []), _a(Sa, e, t);
	}
	function Ta(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ea(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Da(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = $r(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ri(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && va(i) === t.type) ? (t = a(t, n.props), Ta(t, n), t.return = e, t) : (t = ti(n.type, n.key, n.props, null, e.mode, r), Ta(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ai(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ni(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ri("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ti(t.type, t.key, t.props, null, e.mode, n), Ta(n, t), n.return = e, n;
					case v: return t = ai(t, e.mode, n), t.return = e, t;
					case O: return t = va(t), f(e, t, n);
				}
				if (F(t) || M(t)) return t = ni(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, wa(t), n);
				if (t.$$typeof === C) return f(e, Ki(e, t), n);
				Ea(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case O: return n = va(n), p(e, t, n, r);
				}
				if (F(n) || M(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, wa(n), r);
				if (n.$$typeof === C) return p(e, t, Ki(e, n), r);
				Ea(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = va(r), m(e, t, n, r, i);
				}
				if (F(r) || M(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, wa(r), i);
				if (r.$$typeof === C) return m(e, t, n, Ki(t, r), i);
				Ea(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), wi && _i(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return wi && _i(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), wi && _i(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), wi && _i(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return wi && _i(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), wi && _i(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && va(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ta(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ni(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ti(o.type, o.key, o.props, null, e.mode, c), Ta(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = ai(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = va(o), b(e, r, o, c);
				}
				if (F(o)) return h(e, r, o, c);
				if (M(o)) {
					if (l = M(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, wa(o), c);
				if (o.$$typeof === C) return b(e, r, Ki(e, o), c);
				Ea(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ri(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ca = 0;
				var i = b(e, t, n, r);
				return Sa = null, i;
			} catch (t) {
				if (t === fa || t === ma) throw t;
				var a = Zr(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Oa = Da(!0), ka = Da(!1), Aa = !1;
	function ja(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ma(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Na(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Pa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Pl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Jr(e), qr(e, null, n), t;
		}
		return Wr(e, r, t, n), Jr(e);
	}
	function Fa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	function Ia(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var La = !1;
	function Ra() {
		if (La) {
			var e = ra;
			if (e !== null) throw e;
		}
	}
	function za(e, t, n, r) {
		La = !1;
		var i = e.updateQueue;
		Aa = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Ll & f) === f : (r & f) === f) {
					f !== 0 && f === na && (La = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Aa = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ba(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Va(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ba(n[e], t);
	}
	var Ha = B(null), Ua = B(0);
	function Wa(e, t) {
		e = Ul, H(Ua, e), H(Ha, t), Ul = e | t.baseLanes;
	}
	function Ga() {
		H(Ua, Ul), H(Ha, Ha.current);
	}
	function Ka() {
		Ul = Ua.current, V(Ha), V(Ua);
	}
	var qa = B(null), Ja = null;
	function Ya(e) {
		var t = e.alternate;
		H(eo, eo.current & 1), H(qa, e), Ja === null && (t === null || Ha.current !== null || t.memoizedState !== null) && (Ja = e);
	}
	function Xa(e) {
		H(eo, eo.current), H(qa, e), Ja === null && (Ja = e);
	}
	function Za(e) {
		e.tag === 22 ? (H(eo, eo.current), H(qa, e), Ja === null && (Ja = e)) : Qa(e);
	}
	function Qa() {
		H(eo, eo.current), H(qa, qa.current);
	}
	function $a(e) {
		V(qa), Ja === e && (Ja = null), V(eo);
	}
	var eo = B(0);
	function to(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || cf(n) || lf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var no = 0, X = null, ro = null, io = null, ao = !1, oo = !1, so = !1, co = 0, lo = 0, uo = null, fo = 0;
	function po() {
		throw Error(i(321));
	}
	function mo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!dr(e[n], t[n])) return !1;
		return !0;
	}
	function ho(e, t, n, r, i, a) {
		return no = a, X = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, I.H = e === null || e.memoizedState === null ? Ms : Ns, so = !1, a = n(r, i), so = !1, oo && (a = _o(t, n, r, i)), go(e), a;
	}
	function go(e) {
		I.H = js;
		var t = ro !== null && ro.next !== null;
		if (no = 0, io = ro = X = null, ao = !1, lo = 0, uo = null, t) throw Error(i(300));
		e === null || Xs || (e = e.dependencies, e !== null && Ui(e) && (Xs = !0));
	}
	function _o(e, t, n, r) {
		X = e;
		var a = 0;
		do {
			if (oo && (uo = null), lo = 0, oo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, io = ro = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			I.H = Ps, o = t(n, r);
		} while (oo);
		return o;
	}
	function vo() {
		var e = I.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? To(t) : t, e = e.useState()[0], (ro === null ? null : ro.memoizedState) !== e && (X.flags |= 1024), t;
	}
	function yo() {
		var e = co !== 0;
		return co = 0, e;
	}
	function bo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function xo(e) {
		if (ao) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			ao = !1;
		}
		no = 0, io = ro = X = null, oo = !1, lo = co = 0, uo = null;
	}
	function So() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return io === null ? X.memoizedState = io = e : io = io.next = e, io;
	}
	function Co() {
		if (ro === null) {
			var e = X.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = ro.next;
		var t = io === null ? X.memoizedState : io.next;
		if (t !== null) io = t, ro = e;
		else {
			if (e === null) throw X.alternate === null ? Error(i(467)) : Error(i(310));
			ro = e, e = {
				memoizedState: ro.memoizedState,
				baseState: ro.baseState,
				baseQueue: ro.baseQueue,
				queue: ro.queue,
				next: null
			}, io === null ? X.memoizedState = io = e : io = io.next = e;
		}
		return io;
	}
	function wo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function To(e) {
		var t = lo;
		return lo += 1, uo === null && (uo = []), e = _a(uo, e, t), t = X, (io === null ? t.memoizedState : io.next) === null && (t = t.alternate, I.H = t === null || t.memoizedState === null ? Ms : Ns), e;
	}
	function Eo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return To(e);
			if (e.$$typeof === C) return Gi(e);
		}
		throw Error(i(438, String(e)));
	}
	function Do(e) {
		var t = null, n = X.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = X.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = wo(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function Oo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function ko(e) {
		return Ao(Co(), ro, e);
	}
	function Ao(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (no & f) === f : (Ll & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === na && (d = !0);
					else if ((no & p) === p) {
						u = u.next, p === na && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, X.lanes |= p, Gl |= p;
					f = u.action, so && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, X.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !dr(o, e.memoizedState) && (Xs = !0, d && (n = ra, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function jo(e) {
		var t = Co(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			dr(o, t.memoizedState) || (Xs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Mo(e, t, n) {
		var r = X, a = Co(), o = wi;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !dr((ro || a).memoizedState, n);
		if (s && (a.memoizedState = n, Xs = !0), a = a.queue, rs(Fo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || io !== null && io.memoizedState.tag & 1) {
			if (r.flags |= 2048, Qo(9, { destroy: void 0 }, Po.bind(null, r, a, n, t), null), Fl === null) throw Error(i(349));
			o || no & 127 || No(r, t, n);
		}
		return n;
	}
	function No(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = X.updateQueue, t === null ? (t = wo(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Po(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Io(t) && Lo(e);
	}
	function Fo(e, t, n) {
		return n(function() {
			Io(t) && Lo(e);
		});
	}
	function Io(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !dr(e, n);
		} catch {
			return !0;
		}
	}
	function Lo(e) {
		var t = Kr(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Ro(e) {
		var t = So();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), so) {
				De(!0);
				try {
					n();
				} finally {
					De(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Oo,
			lastRenderedState: e
		}, t;
	}
	function zo(e, t, n, r) {
		return e.baseState = n, Ao(e, ro, typeof r == "function" ? r : Oo);
	}
	function Bo(e, t, n, r, a) {
		if (Os(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			I.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Vo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Vo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = I.T, o = {};
			I.T = o;
			try {
				var s = n(i, r), c = I.S;
				c !== null && c(o, s), Ho(e, t, s);
			} catch (n) {
				Wo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), I.T = a;
			}
		} else try {
			a = n(i, r), Ho(e, t, a);
		} catch (n) {
			Wo(e, t, n);
		}
	}
	function Ho(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Uo(e, t, n);
		}, function(n) {
			return Wo(e, t, n);
		}) : Uo(e, t, n);
	}
	function Uo(e, t, n) {
		t.status = "fulfilled", t.value = n, Go(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Vo(e, n)));
	}
	function Wo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Go(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Go(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ko(e, t) {
		return t;
	}
	function qo(e, t) {
		if (wi) {
			var n = Fl.formState;
			if (n !== null) {
				a: {
					var r = X;
					if (wi) {
						if (Ci) {
							b: {
								for (var i = Ci, a = Ei; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = df(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Ci = df(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Oi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = So(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ko,
			lastRenderedState: t
		}, n.queue = r, n = Ts.bind(null, X, r), r.dispatch = n, r = Ro(!1), a = Ds.bind(null, X, !1, r.queue), r = So(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Bo.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Jo(e) {
		return Yo(Co(), ro, e);
	}
	function Yo(e, t, n) {
		if (t = Ao(e, t, Ko)[0], e = ko(Oo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = To(t);
		} catch (e) {
			throw e === fa ? ma : e;
		}
		else r = t;
		t = Co();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (X.flags |= 2048, Qo(9, { destroy: void 0 }, Xo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Xo(e, t) {
		e.action = t;
	}
	function Zo(e) {
		var t = Co(), n = ro;
		if (n !== null) return Yo(t, n, e);
		Co(), t = t.memoizedState, n = Co();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Qo(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = X.updateQueue, t === null && (t = wo(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function $o() {
		return Co().memoizedState;
	}
	function es(e, t, n, r) {
		var i = So();
		X.flags |= e, i.memoizedState = Qo(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ts(e, t, n, r) {
		var i = Co();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		ro !== null && r !== null && mo(r, ro.memoizedState.deps) ? i.memoizedState = Qo(t, a, n, r) : (X.flags |= e, i.memoizedState = Qo(1 | t, a, n, r));
	}
	function ns(e, t) {
		es(8390656, 8, e, t);
	}
	function rs(e, t) {
		ts(2048, 8, e, t);
	}
	function is(e) {
		X.flags |= 4;
		var t = X.updateQueue;
		if (t === null) t = wo(), X.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function as(e) {
		var t = Co().memoizedState;
		return is({
			ref: t,
			nextImpl: e
		}), function() {
			if (Pl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function os(e, t) {
		return ts(4, 2, e, t);
	}
	function ss(e, t) {
		return ts(4, 4, e, t);
	}
	function cs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ls(e, t, n) {
		n = n == null ? null : n.concat([e]), ts(4, 4, cs.bind(null, t, e), n);
	}
	function us() {}
	function ds(e, t) {
		var n = Co();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && mo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function fs(e, t) {
		var n = Co();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && mo(t, r[1])) return r[0];
		if (r = e(), so) {
			De(!0);
			try {
				e();
			} finally {
				De(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ps(e, t, n) {
		return n === void 0 || no & 1073741824 && !(Ll & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), X.lanes |= e, Gl |= e, n);
	}
	function ms(e, t, n, r) {
		return dr(n, t) ? n : Ha.current === null ? !(no & 42) || no & 1073741824 && !(Ll & 261930) ? (Xs = !0, e.memoizedState = n) : (e = mu(), X.lanes |= e, Gl |= e, t) : (e = ps(e, n, r), dr(e, t) || (Xs = !0), e);
	}
	function hs(e, t, n, r, i) {
		var a = L.p;
		L.p = a !== 0 && 8 > a ? a : 8;
		var o = I.T, s = {};
		I.T = s, Ds(e, !1, t, n);
		try {
			var c = i(), l = I.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Es(e, t, oa(c, r), pu(e)) : Es(e, t, r, pu(e));
		} catch (n) {
			Es(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			L.p = a, o !== null && s.types !== null && (o.types = s.types), I.T = o;
		}
	}
	function gs() {}
	function _s(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = vs(e).queue;
		hs(e, a, t, ee, n === null ? gs : function() {
			return ys(e), n(r);
		});
	}
	function vs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ee,
			baseState: ee,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Oo,
				lastRenderedState: ee
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Oo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ys(e) {
		var t = vs(e);
		t.next === null && (t = e.alternate.memoizedState), Es(e, t.next.queue, {}, pu());
	}
	function bs() {
		return Gi(ep);
	}
	function xs() {
		return Co().memoizedState;
	}
	function Ss() {
		return Co().memoizedState;
	}
	function Cs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Na(n);
					var r = Pa(t, e, n);
					r !== null && (hu(r, t, n), Fa(r, t, n)), t = { cache: Qi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ws(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Os(e) ? ks(t, n) : (n = Gr(e, t, n, r), n !== null && (hu(n, e, r), As(n, t, r)));
	}
	function Ts(e, t, n) {
		Es(e, t, n, pu());
	}
	function Es(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Os(e)) ks(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, dr(s, o)) return Wr(e, t, i, 0), Fl === null && Ur(), !1;
			} catch {}
			if (n = Gr(e, t, i, r), n !== null) return hu(n, e, r), As(n, t, r), !0;
		}
		return !1;
	}
	function Ds(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: fd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Os(e)) {
			if (t) throw Error(i(479));
		} else t = Gr(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Os(e) {
		var t = e.alternate;
		return e === X || t !== null && t === X;
	}
	function ks(e, t) {
		oo = ao = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function As(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	var js = {
		readContext: Gi,
		use: Eo,
		useCallback: po,
		useContext: po,
		useEffect: po,
		useImperativeHandle: po,
		useLayoutEffect: po,
		useInsertionEffect: po,
		useMemo: po,
		useReducer: po,
		useRef: po,
		useState: po,
		useDebugValue: po,
		useDeferredValue: po,
		useTransition: po,
		useSyncExternalStore: po,
		useId: po,
		useHostTransitionStatus: po,
		useFormState: po,
		useActionState: po,
		useOptimistic: po,
		useMemoCache: po,
		useCacheRefresh: po
	};
	js.useEffectEvent = po;
	var Ms = {
		readContext: Gi,
		use: Eo,
		useCallback: function(e, t) {
			return So().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Gi,
		useEffect: ns,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), es(4194308, 4, cs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return es(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			es(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = So();
			t = t === void 0 ? null : t;
			var r = e();
			if (so) {
				De(!0);
				try {
					e();
				} finally {
					De(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = So();
			if (n !== void 0) {
				var i = n(t);
				if (so) {
					De(!0);
					try {
						n(t);
					} finally {
						De(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ws.bind(null, X, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = So();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ro(e);
			var t = e.queue, n = Ts.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: us,
		useDeferredValue: function(e, t) {
			return ps(So(), e, t);
		},
		useTransition: function() {
			var e = Ro(!1);
			return e = hs.bind(null, X, e.queue, !0, !1), So().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = X, a = So();
			if (wi) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Fl === null) throw Error(i(349));
				Ll & 127 || No(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ns(Fo.bind(null, r, o, e), [e]), r.flags |= 2048, Qo(9, { destroy: void 0 }, Po.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = So(), t = Fl.identifierPrefix;
			if (wi) {
				var n = gi, r = hi;
				n = (r & ~(1 << 32 - Oe(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = co++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = fo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: bs,
		useFormState: qo,
		useActionState: qo,
		useOptimistic: function(e) {
			var t = So();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ds.bind(null, X, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Do,
		useCacheRefresh: function() {
			return So().memoizedState = Cs.bind(null, X);
		},
		useEffectEvent: function(e) {
			var t = So(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Pl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ns = {
		readContext: Gi,
		use: Eo,
		useCallback: ds,
		useContext: Gi,
		useEffect: rs,
		useImperativeHandle: ls,
		useInsertionEffect: os,
		useLayoutEffect: ss,
		useMemo: fs,
		useReducer: ko,
		useRef: $o,
		useState: function() {
			return ko(Oo);
		},
		useDebugValue: us,
		useDeferredValue: function(e, t) {
			return ms(Co(), ro.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ko(Oo)[0], t = Co().memoizedState;
			return [typeof e == "boolean" ? e : To(e), t];
		},
		useSyncExternalStore: Mo,
		useId: xs,
		useHostTransitionStatus: bs,
		useFormState: Jo,
		useActionState: Jo,
		useOptimistic: function(e, t) {
			return zo(Co(), ro, e, t);
		},
		useMemoCache: Do,
		useCacheRefresh: Ss
	};
	Ns.useEffectEvent = as;
	var Ps = {
		readContext: Gi,
		use: Eo,
		useCallback: ds,
		useContext: Gi,
		useEffect: rs,
		useImperativeHandle: ls,
		useInsertionEffect: os,
		useLayoutEffect: ss,
		useMemo: fs,
		useReducer: jo,
		useRef: $o,
		useState: function() {
			return jo(Oo);
		},
		useDebugValue: us,
		useDeferredValue: function(e, t) {
			var n = Co();
			return ro === null ? ps(n, e, t) : ms(n, ro.memoizedState, e, t);
		},
		useTransition: function() {
			var e = jo(Oo)[0], t = Co().memoizedState;
			return [typeof e == "boolean" ? e : To(e), t];
		},
		useSyncExternalStore: Mo,
		useId: xs,
		useHostTransitionStatus: bs,
		useFormState: Zo,
		useActionState: Zo,
		useOptimistic: function(e, t) {
			var n = Co();
			return ro === null ? (n.baseState = e, [e, n.queue.dispatch]) : zo(n, ro, e, t);
		},
		useMemoCache: Do,
		useCacheRefresh: Ss
	};
	Ps.useEffectEvent = as;
	function Fs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Is = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Na(r);
			i.payload = t, n != null && (i.callback = n), t = Pa(e, i, r), t !== null && (hu(t, e, r), Fa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Na(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Pa(e, i, r), t !== null && (hu(t, e, r), Fa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Na(n);
			r.tag = 2, t != null && (r.callback = t), t = Pa(e, r, n), t !== null && (hu(t, e, n), Fa(t, e, n));
		}
	};
	function Ls(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !fr(n, r) || !fr(i, a) : !0;
	}
	function Rs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Is.enqueueReplaceState(t, t.state, null);
	}
	function zs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Bs(e) {
		zr(e);
	}
	function Vs(e) {
		console.error(e);
	}
	function Hs(e) {
		zr(e);
	}
	function Us(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ws(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Gs(e, t, n) {
		return n = Na(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Us(e, t);
		}, n;
	}
	function Ks(e) {
		return e = Na(e), e.tag = 3, e;
	}
	function qs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ws(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ws(t, n, r), typeof i != "function" && (ru === null ? ru = new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Js(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Hi(t, n, a, !0), n = qa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ja === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Ku(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Ku(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Ku(e, r, a), Du(), !1;
		}
		if (wi) return t = qa.current, t === null ? (r !== Di && (t = Error(i(423), { cause: r }), Pi(si(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = si(r, n), a = Gs(e.stateNode, r, a), Ia(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Di && (e = Error(i(422), { cause: r }), Pi(si(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = si(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = si(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Gs(n.stateNode, r, e), Ia(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Ks(a), qs(a, e, n, r), Ia(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ys = Error(i(461)), Xs = !1;
	function Zs(e, t, n, r) {
		t.child = e === null ? ka(t, null, n, r) : Oa(t, e.child, n, r);
	}
	function Qs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Wi(t), r = ho(e, t, n, o, a, i), s = yo(), e !== null && !Xs ? (bo(e, t, i), Sc(e, t, i)) : (wi && s && yi(t), t.flags |= 1, Zs(e, t, r, i), t.child);
	}
	function $s(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Qr(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ec(e, t, a, r, i)) : (e = ti(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Cc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? fr : n, n(o, r) && e.ref === t.ref) return Sc(e, t, i);
		}
		return t.flags |= 1, e = $r(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ec(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (fr(a, r) && e.ref === t.ref) if (Xs = !1, t.pendingProps = r = a, Cc(e, i)) e.flags & 131072 && (Xs = !0);
			else return t.lanes = e.lanes, Sc(e, t, i);
		}
		return cc(e, t, n, r, i);
	}
	function tc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return rc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ua(t, a === null ? null : a.cachePool), a === null ? Ga() : Wa(t, a), Za(t);
			else return r = t.lanes = 536870912, rc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ua(t, null), Ga(), Qa(t)) : (ua(t, a.cachePool), Wa(t, a), Qa(t), t.memoizedState = null);
		return Zs(e, t, i, n), t.child;
	}
	function nc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function rc(e, t, n, r, i) {
		var a = la();
		return a = a === null ? null : {
			parent: Zi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ua(t, null), Ga(), Za(t), e !== null && Hi(e, t, r, !0), t.childLanes = i, null;
	}
	function ic(e, t) {
		return t = _c({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function ac(e, t, n) {
		return Oa(t, e.child, null, n), e = ic(t, t.pendingProps), e.flags |= 2, $a(t), t.memoizedState = null, e;
	}
	function oc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (wi) {
				if (r.mode === "hidden") return e = ic(t, r), t.lanes = 536870912, nc(null, e);
				if (Xa(t), (e = Ci) ? (e = sf(e, Ei), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: mi === null ? null : {
						id: hi,
						overflow: gi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ii(e), n.return = t, t.child = n, Si = t, Ci = null)) : e = null, e === null) throw Oi(t);
				return t.lanes = 536870912, null;
			}
			return ic(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Xa(t), a) if (t.flags & 256) t.flags &= -257, t = ac(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Xs || Hi(e, t, n, !1), a = (n & e.childLanes) !== 0, Xs || a) {
				if (r = Fl, r !== null && (s = Ge(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Kr(e, s), hu(r, e, s), Ys;
				Du(), t = ac(e, t, n);
			} else e = o.treeContext, Ci = df(s.nextSibling), Si = t, wi = !0, Ti = null, Ei = !1, e !== null && xi(t, e), t = ic(t, r), t.flags |= 4096;
			return t;
		}
		return e = $r(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function sc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function cc(e, t, n, r, i) {
		return Wi(t), n = ho(e, t, n, r, void 0, i), r = yo(), e !== null && !Xs ? (bo(e, t, i), Sc(e, t, i)) : (wi && r && yi(t), t.flags |= 1, Zs(e, t, n, i), t.child);
	}
	function lc(e, t, n, r, i, a) {
		return Wi(t), t.updateQueue = null, n = _o(t, r, n, i), go(e), r = yo(), e !== null && !Xs ? (bo(e, t, a), Sc(e, t, a)) : (wi && r && yi(t), t.flags |= 1, Zs(e, t, n, a), t.child);
	}
	function uc(e, t, n, r, i) {
		if (Wi(t), t.stateNode === null) {
			var a = Yr, o = n.contextType;
			typeof o == "object" && o && (a = Gi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Is, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ja(t), o = n.contextType, a.context = typeof o == "object" && o ? Gi(o) : Yr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Fs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Is.enqueueReplaceState(a, a.state, null), za(t, r, a, i), Ra(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = zs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Yr, typeof u == "object" && u && (o = Gi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Rs(t, a, r, o), Aa = !1;
			var f = t.memoizedState;
			a.state = f, za(t, r, a, i), Ra(), l = t.memoizedState, s || f !== l || Aa ? (typeof d == "function" && (Fs(t, n, d, r), l = t.memoizedState), (c = Aa || Ls(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ma(e, t), o = t.memoizedProps, u = zs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Yr, typeof l == "object" && l && (c = Gi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Rs(t, a, r, c), Aa = !1, f = t.memoizedState, a.state = f, za(t, r, a, i), Ra();
			var p = t.memoizedState;
			o !== d || f !== p || Aa || e !== null && e.dependencies !== null && Ui(e.dependencies) ? (typeof s == "function" && (Fs(t, n, s, r), p = t.memoizedState), (u = Aa || Ls(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ui(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, sc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Oa(t, e.child, null, i), t.child = Oa(t, null, n, i)) : Zs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Sc(e, t, i), e;
	}
	function dc(e, t, n, r) {
		return Mi(), t.flags |= 256, Zs(e, t, n, r), t.child;
	}
	var fc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function pc(e) {
		return {
			baseLanes: e,
			cachePool: da()
		};
	}
	function mc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function hc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (eo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (wi) {
				if (a ? Ya(t) : Qa(t), (e = Ci) ? (e = sf(e, Ei), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: mi === null ? null : {
						id: hi,
						overflow: gi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ii(e), n.return = t, t.child = n, Si = t, Ci = null)) : e = null, e === null) throw Oi(t);
				return lf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (Qa(t), a = t.mode, c = _c({
				mode: "hidden",
				children: c
			}, a), r = ni(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = pc(n), r.childLanes = mc(e, s, n), t.memoizedState = fc, nc(null, r)) : (Ya(t), gc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Ya(t), t.flags &= -257, t = vc(e, t, n)) : t.memoizedState === null ? (Qa(t), c = r.fallback, a = t.mode, r = _c({
				mode: "visible",
				children: r.children
			}, a), c = ni(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Oa(t, e.child, null, n), r = t.child, r.memoizedState = pc(n), r.childLanes = mc(e, s, n), t.memoizedState = fc, t = nc(null, r)) : (Qa(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Ya(t), lf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Pi({
					value: r,
					source: null,
					stack: null
				}), t = vc(e, t, n);
			} else if (Xs || Hi(e, t, n, !1), s = (n & e.childLanes) !== 0, Xs || s) {
				if (s = Fl, s !== null && (r = Ge(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Kr(e, r), hu(s, e, r), Ys;
				cf(c) || Du(), t = vc(e, t, n);
			} else cf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ci = df(c.nextSibling), Si = t, wi = !0, Ti = null, Ei = !1, e !== null && xi(t, e), t = gc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (Qa(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = $r(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ni(c, a, n, null), c.flags |= 2) : c = $r(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, nc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = pc(n) : (a = c.cachePool, a === null ? a = da() : (l = Zi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = mc(e, s, n), t.memoizedState = fc, nc(e.child, r)) : (Ya(t), n = e.child, e = n.sibling, n = $r(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function gc(e, t) {
		return t = _c({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function _c(e, t) {
		return e = Zr(22, e, null, t), e.lanes = 0, e;
	}
	function vc(e, t, n) {
		return Oa(t, e.child, null, n), e = gc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function yc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Bi(e.return, t, n);
	}
	function bc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function xc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = eo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, H(eo, o), Zs(e, t, r, n), r = wi ? di : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && yc(e, n, t);
			else if (e.tag === 19) yc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && to(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), bc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && to(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				bc(t, !0, n, null, a, r);
				break;
			case "together":
				bc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Sc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Hi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = $r(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = $r(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Cc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Ui(e))) : !0;
	}
	function wc(e, t, n) {
		switch (t.tag) {
			case 3:
				re(t, t.stateNode.containerInfo), Ri(t, Zi, e.memoizedState.cache), Mi();
				break;
			case 27:
			case 5:
				G(t);
				break;
			case 4:
				re(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ri(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Xa(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Ya(t), e = Sc(e, t, n), e === null ? null : e.sibling) : hc(e, t, n) : (Ya(t), t.flags |= 128, null);
				Ya(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Hi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return xc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), H(eo, eo.current), r) break;
				return null;
			case 22: return t.lanes = 0, tc(e, t, n, t.pendingProps);
			case 24: Ri(t, Zi, e.memoizedState.cache);
		}
		return Sc(e, t, n);
	}
	function Tc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Xs = !0;
		else {
			if (!Cc(e, n) && !(t.flags & 128)) return Xs = !1, wc(e, t, n);
			Xs = !!(e.flags & 131072);
		}
		else Xs = !1, wi && t.flags & 1048576 && vi(t, di, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = va(t.elementType), t.type = e, typeof e == "function") Qr(e) ? (r = zs(e, r), t.tag = 1, t = uc(null, t, e, r, n)) : (t.tag = 0, t = cc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = Qs(null, t, e, r, n);
								break a;
							} else if (a === D) {
								t.tag = 14, t = $s(null, t, e, r, n);
								break a;
							}
						}
						throw t = P(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return cc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = zs(r, t.pendingProps), uc(e, t, r, a, n);
			case 3:
				a: {
					if (re(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ma(e, t), za(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ri(t, Zi, r), r !== o.cache && Vi(t, [Zi], n, !0), Ra(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = dc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = si(Error(i(424)), t), Pi(a), t = dc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ci = df(e.firstChild), Si = t, wi = !0, Ti = null, Ei = !0, n = ka(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Mi(), r === a) {
							t = Sc(e, t, n);
							break a;
						}
						Zs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return sc(e, t), e === null ? (n = Mf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : wi || (n = t.type, e = t.pendingProps, r = Ud(te.current).createElement(n), r[Xe] = t, r[Ze] = e, Ld(r, n, e), lt(r), t.stateNode = r) : t.memoizedState = Mf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return G(t), e === null && wi && (r = t.stateNode = hf(t.type, t.pendingProps, te.current), Si = t, Ei = !0, a = Ci, ef(t.type) ? (ff = a, Ci = df(r.firstChild)) : Ci = a), Zs(e, t, t.pendingProps.children, n), sc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && wi && ((a = r = Ci) && (r = af(r, t.type, t.pendingProps, Ei), r === null ? a = !1 : (t.stateNode = r, Si = t, Ci = df(r.firstChild), Ei = !1, a = !0)), a || Oi(t)), G(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Kd(a, o) ? r = null : s !== null && Kd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ho(e, t, vo, null, null, n), ep._currentValue = a), sc(e, t), Zs(e, t, r, n), t.child;
			case 6: return e === null && wi && ((e = n = Ci) && (n = of(n, t.pendingProps, Ei), n === null ? e = !1 : (t.stateNode = n, Si = t, Ci = null, e = !0)), e || Oi(t)), null;
			case 13: return hc(e, t, n);
			case 4: return re(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Oa(t, null, r, n) : Zs(e, t, r, n), t.child;
			case 11: return Qs(e, t, t.type, t.pendingProps, n);
			case 7: return Zs(e, t, t.pendingProps, n), t.child;
			case 8: return Zs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Zs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ri(t, t.type, r.value), Zs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Wi(t), a = Gi(a), r = r(a), t.flags |= 1, Zs(e, t, r, n), t.child;
			case 14: return $s(e, t, t.type, t.pendingProps, n);
			case 15: return ec(e, t, t.type, t.pendingProps, n);
			case 19: return xc(e, t, n);
			case 31: return oc(e, t, n);
			case 22: return tc(e, t, n, t.pendingProps);
			case 24: return Wi(t), r = Gi(Zi), e === null ? (a = la(), a === null && (a = Fl, o = Qi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ja(t), Ri(t, Zi, a)) : ((e.lanes & n) !== 0 && (Ma(e, t), za(t, null, null, n), Ra()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ri(t, Zi, r), r !== a.cache && Vi(t, [Zi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ri(t, Zi, r))), Zs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Ec(e) {
		e.flags |= 4;
	}
	function Dc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw ya = ha, pa;
		} else e.flags &= -16777217;
	}
	function Oc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !qf(t)) if (wu()) e.flags |= 8192;
		else throw ya = ha, pa;
	}
	function kc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : ze(), e.lanes |= t, Yl |= t);
	}
	function Ac(e, t) {
		if (!wi) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function jc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Mc(e, t, n) {
		var r = t.pendingProps;
		switch (bi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return jc(t), null;
			case 1: return jc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), zi(Zi), ie(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ji(t) ? Ec(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ni())), jc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Ec(t), o === null ? (jc(t), Dc(t, a, null, r, n)) : (jc(t), Oc(t, o))) : o ? o === e.memoizedState ? (jc(t), t.flags &= -16777217) : (Ec(t), jc(t), Oc(t, o)) : (e = e.memoizedProps, e !== r && Ec(t), jc(t), Dc(t, a, e, r, n)), null;
			case 27:
				if (ae(t), n = te.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return jc(t), null;
					}
					e = U.current, ji(t) ? ki(t, e) : (e = hf(a, r, n), t.stateNode = e, Ec(t));
				}
				return jc(t), null;
			case 5:
				if (ae(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return jc(t), null;
					}
					if (o = U.current, ji(t)) ki(t, o);
					else {
						var s = Ud(te.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Xe] = t, o[Ze] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Ld(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Ec(t);
					}
				}
				return jc(t), Dc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = te.current, ji(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Si, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Xe] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Pd(e.nodeValue, n)), e || Oi(t, !0);
					} else e = Ud(e).createTextNode(r), e[Xe] = t, t.stateNode = e;
				}
				return jc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ji(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Xe] = t;
						} else Mi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						jc(t), e = !1;
					} else n = Ni(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? ($a(t), t) : ($a(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return jc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ji(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Xe] = t;
						} else Mi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						jc(t), a = !1;
					} else a = Ni(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? ($a(t), t) : ($a(t), null);
				}
				return $a(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), kc(t, t.updateQueue), jc(t), null);
			case 4: return ie(), e === null && wd(t.stateNode.containerInfo), jc(t), null;
			case 10: return zi(t.type), jc(t), null;
			case 19:
				if (V(eo), r = t.memoizedState, r === null) return jc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Ac(r, !1);
				else {
					if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = to(e), o !== null) {
							for (t.flags |= 128, Ac(r, !1), e = o.updateQueue, t.updateQueue = e, kc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ei(n, e), n = n.sibling;
							return H(eo, eo.current & 1 | 2), wi && _i(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && q() > tu && (t.flags |= 128, a = !0, Ac(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = to(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, kc(t, e), Ac(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !wi) return jc(t), null;
					} else 2 * q() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Ac(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (jc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = q(), e.sibling = null, n = eo.current, H(eo, a ? n & 1 | 2 : n & 1), wi && _i(t, r.treeForkCount), e);
			case 22:
			case 23: return $a(t), Ka(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (jc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : jc(t), n = t.updateQueue, n !== null && kc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && V(ca), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), zi(Zi), jc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Nc(e, t) {
		switch (bi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return zi(Zi), ie(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ae(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if ($a(t), t.alternate === null) throw Error(i(340));
					Mi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if ($a(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Mi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return V(eo), null;
			case 4: return ie(), null;
			case 10: return zi(t.type), null;
			case 22:
			case 23: return $a(t), Ka(), e !== null && V(ca), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return zi(Zi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Pc(e, t) {
		switch (bi(t), t.tag) {
			case 3:
				zi(Zi), ie();
				break;
			case 26:
			case 27:
			case 5:
				ae(t);
				break;
			case 4:
				ie();
				break;
			case 31:
				t.memoizedState !== null && $a(t);
				break;
			case 13:
				$a(t);
				break;
			case 19:
				V(eo);
				break;
			case 10:
				zi(t.type);
				break;
			case 22:
			case 23:
				$a(t), Ka(), e !== null && V(ca);
				break;
			case 24: zi(Zi);
		}
	}
	function Fc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Gu(t, t.return, e);
		}
	}
	function Ic(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Gu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Gu(t, t.return, e);
		}
	}
	function Lc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Va(t, n);
			} catch (t) {
				Gu(e, e.return, t);
			}
		}
	}
	function Rc(e, t, n) {
		n.props = zs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Gu(e, t, n);
		}
	}
	function zc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Gu(e, t, n);
		}
	}
	function Bc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Gu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Gu(e, t, n);
		}
		else n.current = null;
	}
	function Vc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Gu(e, e.return, t);
		}
	}
	function Hc(e, t, n) {
		try {
			var r = e.stateNode;
			Rd(r, e.type, n, t), r[Ze] = t;
		} catch (t) {
			Gu(e, e.return, t);
		}
	}
	function Uc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ef(e.type) || e.tag === 4;
	}
	function Wc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Uc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && ef(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Gc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ut));
		else if (r !== 4 && (r === 27 && ef(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Gc(e, t, n), e = e.sibling; e !== null;) Gc(e, t, n), e = e.sibling;
	}
	function Kc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && ef(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Kc(e, t, n), e = e.sibling; e !== null;) Kc(e, t, n), e = e.sibling;
	}
	function qc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Ld(t, r, n), t[Xe] = e, t[Ze] = n;
		} catch (t) {
			Gu(e, e.return, t);
		}
	}
	var Jc = !1, Yc = !1, Xc = !1, Zc = typeof WeakSet == "function" ? WeakSet : Set, Qc = null;
	function $c(e, t) {
		if (e = e.containerInfo, Vd = lp, e = gr(e), _r(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Hd = {
			focusedElem: e,
			selectionRange: n
		}, lp = !1, Qc = t; Qc !== null;) if (t = Qc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Qc = e;
		else for (; Qc !== null;) {
			switch (t = Qc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = zs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Gu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) rf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								rf(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, Qc = e;
				break;
			}
			Qc = t.return;
		}
	}
	function el(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				hl(e, n), r & 4 && Fc(5, n);
				break;
			case 1:
				if (hl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Gu(n, n.return, e);
				}
				else {
					var i = zs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Gu(n, n.return, e);
					}
				}
				r & 64 && Lc(n), r & 512 && zc(n, n.return);
				break;
			case 3:
				if (hl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Va(e, t);
					} catch (e) {
						Gu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && qc(n);
			case 26:
			case 5:
				hl(e, n), t === null && r & 4 && Vc(n), r & 512 && zc(n, n.return);
				break;
			case 12:
				hl(e, n);
				break;
			case 31:
				hl(e, n), r & 4 && ol(e, n);
				break;
			case 13:
				hl(e, n), r & 4 && sl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Yu.bind(null, n), uf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Jc, !r) {
					t = t !== null && t.memoizedState !== null || Yc, i = Jc;
					var a = Yc;
					Jc = r, (Yc = t) && !a ? _l(e, n, (n.subtreeFlags & 8772) != 0) : hl(e, n), Jc = i, Yc = a;
				}
				break;
			case 30: break;
			default: hl(e, n);
		}
	}
	function tl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, tl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && it(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var nl = null, rl = !1;
	function il(e, t, n) {
		for (n = n.child; n !== null;) al(e, t, n), n = n.sibling;
	}
	function al(e, t, n) {
		if (Ee && typeof Ee.onCommitFiberUnmount == "function") try {
			Ee.onCommitFiberUnmount(Te, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Yc || Bc(n, t), il(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Yc || Bc(n, t);
				var r = nl, i = rl;
				ef(n.type) && (nl = n.stateNode, rl = !1), il(e, t, n), gf(n.stateNode), nl = r, rl = i;
				break;
			case 5: Yc || Bc(n, t);
			case 6:
				if (r = nl, i = rl, nl = null, il(e, t, n), nl = r, rl = i, nl !== null) if (rl) try {
					(nl.nodeType === 9 ? nl.body : nl.nodeName === "HTML" ? nl.ownerDocument.body : nl).removeChild(n.stateNode);
				} catch (e) {
					Gu(n, t, e);
				}
				else try {
					nl.removeChild(n.stateNode);
				} catch (e) {
					Gu(n, t, e);
				}
				break;
			case 18:
				nl !== null && (rl ? (e = nl, tf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : tf(nl, n.stateNode));
				break;
			case 4:
				r = nl, i = rl, nl = n.stateNode.containerInfo, rl = !0, il(e, t, n), nl = r, rl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Ic(2, n, t), Yc || Ic(4, n, t), il(e, t, n);
				break;
			case 1:
				Yc || (Bc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Rc(n, t, r)), il(e, t, n);
				break;
			case 21:
				il(e, t, n);
				break;
			case 22:
				Yc = (r = Yc) || n.memoizedState !== null, il(e, t, n), Yc = r;
				break;
			default: il(e, t, n);
		}
	}
	function ol(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Gu(t, t.return, e);
			}
		}
	}
	function sl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Gu(t, t.return, e);
		}
	}
	function cl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Zc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Zc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ll(e, t) {
		var n = cl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Xu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ul(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (ef(c.type)) {
							nl = c.stateNode, rl = !1;
							break a;
						}
						break;
					case 5:
						nl = c.stateNode, rl = !1;
						break a;
					case 3:
					case 4:
						nl = c.stateNode.containerInfo, rl = !0;
						break a;
				}
				c = c.return;
			}
			if (nl === null) throw Error(i(160));
			al(o, s, a), nl = null, rl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) fl(t, e), t = t.sibling;
	}
	var dl = null;
	function fl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ul(t, e), pl(e), r & 4 && (Ic(3, e, e.return), Fc(3, e), Ic(5, e, e.return));
				break;
			case 1:
				ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), r & 64 && Jc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = dl;
				if (ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[rt] || o[Xe] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Ld(o, r, n), o[Xe] = e, lt(o), r = o;
									break a;
								case "link":
									var s = Wf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Ld(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Wf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Ld(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[Xe] = e, lt(o), r = o;
						}
						e.stateNode = r;
					} else Gf(a, e.type, e.stateNode);
					else e.stateNode = zf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Hc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Gf(a, e.type, e.stateNode) : zf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), n !== null && r & 4 && Hc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Ft(a, "");
					} catch (t) {
						Gu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Hc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Xc = !0);
				break;
			case 6:
				if (ul(t, e), pl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Gu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Uf = null, a = dl, dl = yf(t.containerInfo), ul(t, e), dl = a, pl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Gu(e, e.return, t);
				}
				Xc && (Xc = !1, ml(e));
				break;
			case 4:
				r = dl, dl = yf(e.stateNode.containerInfo), ul(t, e), pl(e), dl = r;
				break;
			case 12:
				ul(t, e), pl(e);
				break;
			case 31:
				ul(t, e), pl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 13:
				ul(t, e), pl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = q()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Jc, d = Yc;
				if (Jc = u || a, Yc = d || l, ul(t, e), Yc = d, Jc = u, pl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Jc || Yc || gl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Gu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Gu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? nf(m, !0) : nf(l.stateNode, !1);
							} catch (e) {
								Gu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ll(e, n))));
				break;
			case 19:
				ul(t, e), pl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ul(t, e), pl(e);
		}
	}
	function pl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Uc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Kc(e, Wc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Ft(o, ""), n.flags &= -33), Kc(e, Wc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Gc(e, Wc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Gu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function ml(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			ml(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function hl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) el(e, t.alternate, t), t = t.sibling;
	}
	function gl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Ic(4, t, t.return), gl(t);
					break;
				case 1:
					Bc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Rc(t, t.return, n), gl(t);
					break;
				case 27: gf(t.stateNode);
				case 26:
				case 5:
					Bc(t, t.return), gl(t);
					break;
				case 22:
					t.memoizedState === null && gl(t);
					break;
				case 30:
					gl(t);
					break;
				default: gl(t);
			}
			e = e.sibling;
		}
	}
	function _l(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					_l(i, a, n), Fc(4, a);
					break;
				case 1:
					if (_l(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Gu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ba(c[i], s);
						} catch (e) {
							Gu(r, r.return, e);
						}
					}
					n && o & 64 && Lc(a), zc(a, a.return);
					break;
				case 27: qc(a);
				case 26:
				case 5:
					_l(i, a, n), n && r === null && o & 4 && Vc(a), zc(a, a.return);
					break;
				case 12:
					_l(i, a, n);
					break;
				case 31:
					_l(i, a, n), n && o & 4 && ol(i, a);
					break;
				case 13:
					_l(i, a, n), n && o & 4 && sl(i, a);
					break;
				case 22:
					a.memoizedState === null && _l(i, a, n), zc(a, a.return);
					break;
				case 30: break;
				default: _l(i, a, n);
			}
			t = t.sibling;
		}
	}
	function vl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && $i(n));
	}
	function yl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && $i(e));
	}
	function bl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) xl(e, t, n, r), t = t.sibling;
	}
	function xl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, t, n, r), i & 2048 && Fc(9, t);
				break;
			case 1:
				bl(e, t, n, r);
				break;
			case 3:
				bl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && $i(e)));
				break;
			case 12:
				if (i & 2048) {
					bl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Gu(t, t.return, e);
					}
				} else bl(e, t, n, r);
				break;
			case 31:
				bl(e, t, n, r);
				break;
			case 13:
				bl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? bl(e, t, n, r) : (a._visibility |= 2, Sl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? bl(e, t, n, r) : Cl(e, t), i & 2048 && vl(o, t);
				break;
			case 24:
				bl(e, t, n, r), i & 2048 && yl(t.alternate, t);
				break;
			default: bl(e, t, n, r);
		}
	}
	function Sl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Sl(a, o, s, c, i), Fc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Sl(a, o, s, c, i)) : u._visibility & 2 ? Sl(a, o, s, c, i) : Cl(a, o), i && l & 2048 && vl(o.alternate, o);
					break;
				case 24:
					Sl(a, o, s, c, i), i && l & 2048 && yl(o.alternate, o);
					break;
				default: Sl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Cl(n, r), i & 2048 && vl(r.alternate, r);
					break;
				case 24:
					Cl(n, r), i & 2048 && yl(r.alternate, r);
					break;
				default: Cl(n, r);
			}
			t = t.sibling;
		}
	}
	var wl = 8192;
	function Tl(e, t, n) {
		if (e.subtreeFlags & wl) for (e = e.child; e !== null;) El(e, t, n), e = e.sibling;
	}
	function El(e, t, n) {
		switch (e.tag) {
			case 26:
				Tl(e, t, n), e.flags & wl && e.memoizedState !== null && Jf(n, dl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Tl(e, t, n);
				break;
			case 3:
			case 4:
				var r = dl;
				dl = yf(e.stateNode.containerInfo), Tl(e, t, n), dl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = wl, wl = 16777216, Tl(e, t, n), wl = r) : Tl(e, t, n));
				break;
			default: Tl(e, t, n);
		}
	}
	function Dl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ol(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Qc = r, jl(r, e);
			}
			Dl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) kl(e), e = e.sibling;
	}
	function kl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ol(e), e.flags & 2048 && Ic(9, e, e.return);
				break;
			case 3:
				Ol(e);
				break;
			case 12:
				Ol(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Al(e)) : Ol(e);
				break;
			default: Ol(e);
		}
	}
	function Al(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Qc = r, jl(r, e);
			}
			Dl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Ic(8, t, t.return), Al(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Al(t));
					break;
				default: Al(t);
			}
			e = e.sibling;
		}
	}
	function jl(e, t) {
		for (; Qc !== null;) {
			var n = Qc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ic(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: $i(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Qc = r;
			else a: for (n = e; Qc !== null;) {
				r = Qc;
				var i = r.sibling, a = r.return;
				if (tl(r), r === n) {
					Qc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Qc = i;
					break a;
				}
				Qc = a;
			}
		}
	}
	var Ml = {
		getCacheForType: function(e) {
			var t = Gi(Zi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Gi(Zi).controller.signal;
		}
	}, Nl = typeof WeakMap == "function" ? WeakMap : Map, Pl = 0, Fl = null, Il = null, Ll = 0, Rl = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return Pl & 2 && Ll !== 0 ? Ll & -Ll : I.T === null ? Je() : fd();
	}
	function mu() {
		if (Jl === 0) if (!(Ll & 536870912) || wi) {
			var e = Ne;
			Ne <<= 1, !(Ne & 3932160) && (Ne = 262144), Jl = e;
		} else Jl = 536870912;
		return e = qa.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === Fl && (Rl === 2 || Rl === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Ll, Jl, !1)), Ve(e, n), (!(Pl & 2) || e !== Fl) && (e === Fl && (!(Pl & 2) && (Kl |= n), Wl === 4 && yu(e, Ll, Jl, !1)), id(e));
	}
	function gu(e, t, n) {
		if (Pl & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Le(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Vl && !r && yu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !vu(n)) {
					a = Ou(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Xl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
								if (Hl && !l) {
									c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
									break a;
								}
								o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Su(e, 0), yu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							yu(r, t, Jl, !Bl);
							break a;
						case 2:
							Zl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = $l + 300 - q(), 10 < a)) {
						if (yu(r, t, Jl, !Bl), Ie(r, 0, !0) !== 0) break a;
						su = t, r.timeoutHandle = Yd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, "Throttled", -0, 0), a);
						break a;
					}
					_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		id(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Ut
			}, El(t, a, d);
			var m = (a & 62914560) === a ? $l - q() : (a & 4194048) === a ? eu - q() : 0;
			if (m = Xf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!dr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Oe(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Ue(e, n, t);
	}
	function bu() {
		return Pl & 6 ? !0 : (ad(0, !1), !1);
	}
	function xu() {
		if (Il !== null) {
			if (Rl === 0) var e = Il.return;
			else e = Il, Li = Ii = null, xo(e), Sa = null, Ca = 0, e = Il;
			for (; e !== null;) Pc(e.alternate, e), e = e.return;
			Il = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Xd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), Fl = e, Il = n = $r(e.current, null), Ll = t, Rl = 0, zl = null, Bl = !1, Vl = Le(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Oe(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, Ur(), n;
	}
	function Cu(e, t) {
		X = null, I.H = js, t === fa || t === ma ? (t = ba(), Rl = 3) : t === pa ? (t = ba(), Rl = 4) : Rl = t === Ys ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, Il === null && (Wl = 1, Us(e, si(t, e.current)));
	}
	function wu() {
		var e = qa.current;
		return e === null ? !0 : (Ll & 4194048) === Ll ? Ja === null : (Ll & 62914560) === Ll || Ll & 536870912 ? e === Ja : !1;
	}
	function Tu() {
		var e = I.H;
		return I.H = js, e === null ? js : e;
	}
	function Eu() {
		var e = I.A;
		return I.A = Ml, e;
	}
	function Du() {
		Wl = 4, Bl || (Ll & 4194048) !== Ll && qa.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || Fl === null || yu(Fl, Ll, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = Pl;
		Pl |= 2;
		var i = Tu(), a = Eu();
		(Fl !== e || Ll !== t) && (nu = null, Su(e, t)), t = !1;
		var o = Wl;
		a: do
			try {
				if (Rl !== 0 && Il !== null) {
					var s = Il, c = zl;
					switch (Rl) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							qa.current === null && (t = !0);
							var l = Rl;
							if (Rl = 0, zl = null, Pu(e, s, c, l), n && Vl) {
								o = 0;
								break a;
							}
							break;
						default: l = Rl, Rl = 0, zl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = Wl;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Li = Ii = null, Pl = r, I.H = i, I.A = a, Il === null && (Fl = null, Ll = 0, Ur()), o;
	}
	function ku() {
		for (; Il !== null;) Mu(Il);
	}
	function Au(e, t) {
		var n = Pl;
		Pl |= 2;
		var r = Tu(), a = Eu();
		Fl !== e || Ll !== t ? (nu = null, tu = q() + 500, Su(e, t)) : Vl = Le(e, t);
		a: do
			try {
				if (Rl !== 0 && Il !== null) {
					t = Il;
					var o = zl;
					b: switch (Rl) {
						case 1:
							Rl = 0, zl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ga(o)) {
								Rl = 0, zl = null, Nu(t);
								break;
							}
							t = function() {
								Rl !== 2 && Rl !== 9 || Fl !== e || (Rl = 7), id(e);
							}, o.then(t, t);
							break a;
						case 3:
							Rl = 7;
							break a;
						case 4:
							Rl = 5;
							break a;
						case 7:
							ga(o) ? (Rl = 0, zl = null, Nu(t)) : (Rl = 0, zl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Il.tag) {
								case 26: s = Il.memoizedState;
								case 5:
								case 27:
									var c = Il;
									if (s ? qf(s) : c.stateNode.complete) {
										Rl = 0, zl = null;
										var l = c.sibling;
										if (l !== null) Il = l;
										else {
											var u = c.return;
											u === null ? Il = null : (Il = u, Fu(u));
										}
										break b;
									}
							}
							Rl = 0, zl = null, Pu(e, t, o, 5);
							break;
						case 6:
							Rl = 0, zl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), Wl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Li = Ii = null, I.H = r, I.A = a, Pl = n, Il === null ? (Fl = null, Ll = 0, Ur(), Wl) : 0;
	}
	function ju() {
		for (; Il !== null && !he();) Mu(Il);
	}
	function Mu(e) {
		var t = Tc(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : Il = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = lc(n, t, t.pendingProps, t.type, void 0, Ll);
				break;
			case 11:
				t = lc(n, t, t.pendingProps, t.type.render, t.ref, Ll);
				break;
			case 5: xo(t);
			default: Pc(n, t), t = Il = ei(t, Ul), t = Tc(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : Il = t;
	}
	function Pu(e, t, n, r) {
		Li = Ii = null, xo(t), Sa = null, Ca = 0;
		var i = t.return;
		try {
			if (Js(e, i, t, n, Ll)) {
				Wl = 1, Us(e, si(n, e.current)), Il = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Il = i, t;
			Wl = 1, Us(e, si(n, e.current)), Il = null;
			return;
		}
		t.flags & 32768 ? (wi || r === 1 ? e = !0 : Vl || Ll & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = qa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Mc(t.alternate, t, Ul);
			if (n !== null) {
				Il = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Il = t;
				return;
			}
			Il = t = e;
		} while (t !== null);
		Wl === 0 && (Wl = 5);
	}
	function Iu(e, t) {
		do {
			var n = Nc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Il = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Il = e;
				return;
			}
			Il = e = n;
		} while (e !== null);
		Wl = 6, Il = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (Pl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Hr, He(e, n, o, s, c, l), e === Fl && (Il = Fl = null, Ll = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Zu(be, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = I.T, I.T = null, a = L.p, L.p = 2, s = Pl, Pl |= 4;
				try {
					$c(e, t, n);
				} finally {
					Pl = s, L.p = a, I.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Pl;
				Pl |= 4;
				try {
					fl(t, e);
					var a = Hd, o = gr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && hr(s.ownerDocument.documentElement, s)) {
						if (c !== null && _r(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = mr(s, h), v = mr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					lp = !!Vd, Hd = Vd = null;
				} finally {
					Pl = i, L.p = r, I.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Pl;
				Pl |= 4;
				try {
					el(e, t.alternate, t);
				} finally {
					Pl = i, L.p = r, I.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, ge();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), qe(n), t = t.stateNode, Ee && typeof Ee.onCommitFiberRoot == "function") try {
				Ee.onCommitFiberRoot(Te, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = I.T, i = L.p, L.p = 2, I.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					I.T = t, L.p = i;
				}
			}
			su & 3 && Hu(), id(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, ad(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, $i(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = qe(su), r = I.T, a = L.p;
		try {
			L.p = 32 > n ? 32 : n, I.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, Pl & 6) throw Error(i(331));
			var c = Pl;
			if (Pl |= 4, kl(o.current), xl(o, o.current, s, n), Pl = c, ad(0, !1), Ee && typeof Ee.onPostCommitFiberRoot == "function") try {
				Ee.onPostCommitFiberRoot(Te, o);
			} catch {}
			return !0;
		} finally {
			L.p = a, I.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = si(n, t), t = Gs(e.stateNode, t, 2), e = Pa(e, t, 2), e !== null && (Ve(e, 2), id(e));
	}
	function Gu(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = si(n, e), n = Ks(2), r = Pa(t, n, 2), r !== null && (qs(n, r, t, e), Ve(r, 2), id(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Nl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Hl = !0, i.add(n), e = qu.bind(null, e, t, n), t.then(e, e));
	}
	function qu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Fl === e && (Ll & n) === n && (Wl === 4 || Wl === 3 && (Ll & 62914560) === Ll && 300 > q() - $l ? !(Pl & 2) && Su(e, 0) : ql |= n, Yl === Ll && (Yl = 0)), id(e);
	}
	function Ju(e, t) {
		t === 0 && (t = ze()), e = Kr(e, t), e !== null && (Ve(e, t), id(e));
	}
	function Yu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ju(e, n);
	}
	function Xu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Ju(e, n);
	}
	function Zu(e, t) {
		return pe(e, t);
	}
	var Qu = null, $u = null, ed = !1, td = !1, nd = !1, rd = 0;
	function id(e) {
		e !== $u && e.next === null && ($u === null ? Qu = $u = e : $u = $u.next = e), td = !0, ed || (ed = !0, dd());
	}
	function ad(e, t) {
		if (!nd && td) {
			nd = !0;
			do
				for (var n = !1, r = Qu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Oe(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ud(r, a));
					} else a = Ll, a = Ie(r, r === Fl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Le(r, a) || (n = !0, ud(r, a));
					r = r.next;
				}
			while (n);
			nd = !1;
		}
	}
	function od() {
		sd();
	}
	function sd() {
		td = ed = !1;
		var e = 0;
		rd !== 0 && Jd() && (e = rd);
		for (var t = q(), n = null, r = Qu; r !== null;) {
			var i = r.next, a = cd(r, t);
			a === 0 ? (r.next = null, n === null ? Qu = i : n.next = i, i === null && ($u = n)) : (n = r, (e !== 0 || a & 3) && (td = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || ad(e, !1), rd !== 0 && (rd = 0);
	}
	function cd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Oe(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Re(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Fl, n = Ll, n = Ie(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Rl === 2 || Rl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && me(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Le(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && me(r), qe(n)) {
				case 2:
				case 8:
					n = ye;
					break;
				case 32:
					n = be;
					break;
				case 268435456:
					n = Se;
					break;
				default: n = be;
			}
			return r = ld.bind(null, e), n = pe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && me(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function ld(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Ll;
		return r = Ie(e, e === Fl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), cd(e, q()), e.callbackNode != null && e.callbackNode === n ? ld.bind(null, e) : null);
	}
	function ud(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function dd() {
		Qd(function() {
			Pl & 6 ? pe(ve, od) : sd();
		});
	}
	function fd() {
		if (rd === 0) {
			var e = na;
			e === 0 && (e = Me, Me <<= 1, !(Me & 261888) && (Me = 256)), rd = e;
		}
		return rd;
	}
	function pd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ht("" + e);
	}
	function md(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function hd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = pd((i[Ze] || null).action), o = r.submitter;
			o && (t = (t = o[Ze] || null) ? pd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new un("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (rd !== 0) {
								var e = o ? md(i, o) : new FormData(i);
								_s(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? md(i, o) : new FormData(i), _s(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var gd = 0; gd < Lr.length; gd++) {
		var _d = Lr[gd];
		Rr(_d.toLowerCase(), "on" + (_d[0].toUpperCase() + _d.slice(1)));
	}
	Rr(kr, "onAnimationEnd"), Rr(Ar, "onAnimationIteration"), Rr(jr, "onAnimationStart"), Rr("dblclick", "onDoubleClick"), Rr("focusin", "onFocus"), Rr("focusout", "onBlur"), Rr(Mr, "onTransitionRun"), Rr(Nr, "onTransitionStart"), Rr(Pr, "onTransitionCancel"), Rr(Fr, "onTransitionEnd"), pt("onMouseEnter", ["mouseout", "mouseover"]), pt("onMouseLeave", ["mouseout", "mouseover"]), pt("onPointerEnter", ["pointerout", "pointerover"]), pt("onPointerLeave", ["pointerout", "pointerover"]), ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ft("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var vd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), yd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vd));
	function bd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						zr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						zr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function xd(e, t) {
		var n = t[$e];
		n === void 0 && (n = t[$e] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Td(t, e, 2, !1), n.add(r));
	}
	function Sd(e, t, n) {
		var r = 0;
		t && (r |= 4), Td(n, e, r, t);
	}
	var Cd = "_reactListening" + Math.random().toString(36).slice(2);
	function wd(e) {
		if (!e[Cd]) {
			e[Cd] = !0, ut.forEach(function(t) {
				t !== "selectionchange" && (yd.has(t) || Sd(t, !1, e), Sd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Cd] || (t[Cd] = !0, Sd("selectionchange", !1, t));
		}
	}
	function Td(e, t, n, r) {
		switch (hp(t)) {
			case 2:
				var i = up;
				break;
			case 8:
				i = Q;
				break;
			default: i = dp;
		}
		n = i.bind(null, t, n, e), i = void 0, !Qt || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Ed(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = at(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Xt(function() {
			var r = a, i = Gt(n), s = [];
			a: {
				var c = Ir.get(e);
				if (c !== void 0) {
					var l = un, u = e;
					switch (e) {
						case "keypress": if (an(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = On;
							break;
						case "focusin":
							u = "focus", l = yn;
							break;
						case "focusout":
							u = "blur", l = yn;
							break;
						case "beforeblur":
						case "afterblur":
							l = yn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = _n;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = vn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = An;
							break;
						case kr:
						case Ar:
						case jr:
							l = bn;
							break;
						case Fr:
							l = jn;
							break;
						case "scroll":
						case "scrollend":
							l = fn;
							break;
						case "wheel":
							l = Mn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = xn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = kn;
							break;
						case "toggle":
						case "beforetoggle": l = Nn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Zt(m, p), g != null && d.push(Dd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Wt && (u = n.relatedTarget || n.fromElement) && (at(u) || u[Qe])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? at(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = _n, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = kn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : st(l), h = u == null ? c : st(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, at(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = kd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Ad(s, c, l, d, !1), u !== null && f !== null && Ad(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? st(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = $n;
					else if (qn(c)) if (er) v = lr;
					else {
						v = sr;
						var y = or;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && zt(r.elementType) && (v = $n) : v = cr;
					if (v &&= v(e, r)) {
						Jn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && jt(c, "number", c.value);
				}
				switch (y = r ? st(r) : window, e) {
					case "focusin":
						(qn(y) || y.contentEditable === "true") && (yr = y, br = r, xr = null);
						break;
					case "focusout":
						xr = br = yr = null;
						break;
					case "mousedown":
						Sr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Sr = !1, Cr(s, n, i);
						break;
					case "selectionchange": if (vr) break;
					case "keydown":
					case "keyup": Cr(s, n, i);
				}
				var b;
				if (Fn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Un ? Vn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Rn && n.locale !== "ko" && (Un || x !== "onCompositionStart" ? x === "onCompositionEnd" && Un && (b = rn()) : (en = i, tn = "value" in en ? en.value : en.textContent, Un = !0)), y = Od(r, x), 0 < y.length && (x = new Sn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Hn(n), b !== null && (x.data = b)))), (b = Ln ? Wn(e, n) : Gn(e, n)) && (x = Od(r, "onBeforeInput"), 0 < x.length && (y = new Sn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), hd(s, e, r, n, i);
			}
			bd(s, t);
		});
	}
	function Dd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Od(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Zt(e, n), i != null && r.unshift(Dd(e, i, a)), i = Zt(e, t), i != null && r.push(Dd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function kd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Ad(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Zt(n, a), l != null && o.unshift(Dd(n, l, c))) : i || (l = Zt(n, a), l != null && o.push(Dd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var jd = /\r\n?/g, Md = /\u0000|\uFFFD/g;
	function Nd(e) {
		return (typeof e == "string" ? e : "" + e).replace(jd, "\n").replace(Md, "");
	}
	function Pd(e, t) {
		return t = Nd(t), Nd(e) === t;
	}
	function Fd(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Ft(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Ft(e, "" + r);
				break;
			case "className":
				yt(e, "class", r);
				break;
			case "tabIndex":
				yt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				yt(e, n, r);
				break;
			case "style":
				Rt(e, r, o);
				break;
			case "data": if (t !== "object") {
				yt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Ht("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Fd(e, t, "name", a.name, a, null), Fd(e, t, "formEncType", a.formEncType, a, null), Fd(e, t, "formMethod", a.formMethod, a, null), Fd(e, t, "formTarget", a.formTarget, a, null)) : (Fd(e, t, "encType", a.encType, a, null), Fd(e, t, "method", a.method, a, null), Fd(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Ht("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Ut);
				break;
			case "onScroll":
				r != null && xd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && xd("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Ht("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				xd("beforetoggle", e), xd("toggle", e), vt(e, "popover", r);
				break;
			case "xlinkActuate":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				bt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				bt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				bt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				vt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Bt.get(n) || n, vt(e, n, r));
		}
	}
	function Id(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Rt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Ft(e, r) : (typeof r == "number" || typeof r == "bigint") && Ft(e, "" + r);
				break;
			case "onScroll":
				r != null && xd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && xd("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Ut);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!dt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[Ze] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : vt(e, n, r);
			}
		}
	}
	function Ld(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				xd("error", e), xd("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Fd(e, t, o, s, n, null);
					}
				}
				a && Fd(e, t, "srcSet", n.srcSet, n, null), r && Fd(e, t, "src", n.src, n, null);
				return;
			case "input":
				xd("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Fd(e, t, r, d, n, null);
					}
				}
				At(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in xd("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Fd(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Mt(e, !!r, n, !0) : Mt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in xd("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Fd(e, t, s, c, n, null);
				}
				Pt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Fd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				xd("beforetoggle", e), xd("toggle", e), xd("cancel", e), xd("close", e);
				break;
			case "iframe":
			case "object":
				xd("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < vd.length; r++) xd(vd[r], e);
				break;
			case "image":
				xd("error", e), xd("load", e);
				break;
			case "details":
				xd("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": xd("error", e), xd("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Fd(e, t, u, r, n, null);
				}
				return;
			default: if (zt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Id(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Fd(e, t, c, r, n, null));
	}
	function Rd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Fd(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Fd(e, t, p, m, r, f);
					}
				}
				kt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Fd(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Fd(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Mt(e, !!n, n ? [] : "", !1) : Mt(e, !!n, t, !0)) : Mt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Fd(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Fd(e, t, s, a, r, o);
				}
				Nt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Fd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Fd(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Fd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Fd(e, t, u, p, r, m);
				}
				return;
			default: if (zt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Id(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Id(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Fd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Fd(e, t, f, p, r, m);
	}
	function zd(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Bd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && zd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && zd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Vd = null, Hd = null;
	function Ud(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Wd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Gd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Kd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var qd = null;
	function Jd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === qd ? !1 : (qd = e, !0) : (qd = null, !1);
	}
	var Yd = typeof setTimeout == "function" ? setTimeout : void 0, Xd = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = typeof Promise == "function" ? Promise : void 0, Qd = typeof queueMicrotask == "function" ? queueMicrotask : Zd === void 0 ? Yd : function(e) {
		return Zd.resolve(null).then(e).catch($d);
	};
	function $d(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function ef(e) {
		return e === "head";
	}
	function tf(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") gf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, gf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[rt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && gf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function nf(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function rf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					rf(n), it(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function af(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[rt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = df(e.nextSibling), e === null) break;
		}
		return null;
	}
	function of(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = df(e.nextSibling), e === null)) return null;
		return e;
	}
	function sf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = df(e.nextSibling), e === null)) return null;
		return e;
	}
	function cf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function lf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function uf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function df(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var ff = null;
	function pf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return df(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function mf(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function hf(e, t, n) {
		switch (t = Ud(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		it(e);
	}
	var _f = /* @__PURE__ */ new Map(), vf = /* @__PURE__ */ new Set();
	function yf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var bf = L.d;
	L.d = {
		f: xf,
		r: Sf,
		D: Tf,
		C: Ef,
		L: Df,
		m: Of,
		X: Af,
		S: kf,
		M: jf
	};
	function xf() {
		var e = bf.f(), t = bu();
		return e || t;
	}
	function Sf(e) {
		var t = ot(e);
		t !== null && t.tag === 5 && t.type === "form" ? ys(t) : bf.r(e);
	}
	var Cf = typeof document > "u" ? null : document;
	function wf(e, t, n) {
		var r = Cf;
		if (r && typeof t == "string" && t) {
			var i = Ot(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), vf.has(i) || (vf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Ld(t, "link", e), lt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e) {
		bf.D(e), wf("dns-prefetch", e, null);
	}
	function Ef(e, t) {
		bf.C(e, t), wf("preconnect", e, t);
	}
	function Df(e, t, n) {
		bf.L(e, t, n);
		var r = Cf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Ot(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Ot(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Ot(n.imageSizes) + "\"]")) : i += "[href=\"" + Ot(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Nf(e);
					break;
				case "script": a = Lf(e);
			}
			_f.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), _f.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Pf(a)) || t === "script" && r.querySelector(Rf(a)) || (t = r.createElement("link"), Ld(t, "link", e), lt(t), r.head.appendChild(t)));
		}
	}
	function Of(e, t) {
		bf.m(e, t);
		var n = Cf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Ot(r) + "\"][href=\"" + Ot(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Lf(e);
			}
			if (!_f.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), _f.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Rf(a))) return;
				}
				r = n.createElement("link"), Ld(r, "link", e), lt(r), n.head.appendChild(r);
			}
		}
	}
	function kf(e, t, n) {
		bf.S(e, t, n);
		var r = Cf;
		if (r && e) {
			var i = ct(r).hoistableStyles, a = Nf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Pf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = _f.get(a)) && Vf(e, n);
					var c = o = r.createElement("link");
					lt(c), Ld(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Bf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Af(e, t) {
		bf.X(e, t);
		var n = Cf;
		if (n && e) {
			var r = ct(n).hoistableScripts, i = Lf(e), a = r.get(i);
			a || (a = n.querySelector(Rf(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = _f.get(i)) && Hf(e, t), a = n.createElement("script"), lt(a), Ld(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function jf(e, t) {
		bf.M(e, t);
		var n = Cf;
		if (n && e) {
			var r = ct(n).hoistableScripts, i = Lf(e), a = r.get(i);
			a || (a = n.querySelector(Rf(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = _f.get(i)) && Hf(e, t), a = n.createElement("script"), lt(a), Ld(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mf(e, t, n, r) {
		var a = (a = te.current) ? yf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Nf(n.href), n = ct(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Nf(n.href);
					var o = ct(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Pf(e))) && !o._p && (s.instance = o, s.state.loading = 5), _f.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, _f.set(e, n), o || If(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Lf(n), n = ct(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Nf(e) {
		return "href=\"" + Ot(e) + "\"";
	}
	function Pf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Ff(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function If(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Ld(t, "link", n), lt(t), e.head.appendChild(t));
	}
	function Lf(e) {
		return "[src=\"" + Ot(e) + "\"]";
	}
	function Rf(e) {
		return "script[async]" + e;
	}
	function zf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Ot(n.href) + "\"]");
				if (r) return t.instance = r, lt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), lt(r), Ld(r, "style", a), Bf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Nf(n.href);
				var o = e.querySelector(Pf(a));
				if (o) return t.state.loading |= 4, t.instance = o, lt(o), o;
				r = Ff(n), (a = _f.get(a)) && Vf(r, a), o = (e.ownerDocument || e).createElement("link"), lt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Ld(o, "link", r), t.state.loading |= 4, Bf(o, n.precedence, e), t.instance = o;
			case "script": return o = Lf(n.src), (a = e.querySelector(Rf(o))) ? (t.instance = a, lt(a), a) : (r = n, (a = _f.get(o)) && (r = h({}, n), Hf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), lt(a), Ld(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Bf(r, n.precedence, e));
		return t.instance;
	}
	function Bf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Vf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Hf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Uf = null;
	function Wf(e, t, n) {
		if (Uf === null) {
			var r = /* @__PURE__ */ new Map(), i = Uf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Uf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[rt] || a[Xe] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Gf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Kf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function qf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Jf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Nf(r.href), a = t.querySelector(Pf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Zf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, lt(a);
					return;
				}
				a = t.ownerDocument || t, r = Ff(r), (i = _f.get(i)) && Vf(r, i), a = a.createElement("link"), lt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Ld(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Zf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Yf = 0;
	function Xf(e, t) {
		return e.stylesheets && e.count === 0 && $f(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && $f(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Yf === 0 && (Yf = 62500 * Bd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && $f(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Yf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Zf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) $f(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Qf = null;
	function $f(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Qf = /* @__PURE__ */ new Map(), t.forEach(Z, e), Qf = null, Zf.call(e));
	}
	function Z(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Qf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Qf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Zf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var ep = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: ee,
		_currentValue2: ee,
		_threadCount: 0
	};
	function tp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Be(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Be(0), this.hiddenUpdates = Be(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function np(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new tp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Zr(3, null, null, t), e.current = a, a.stateNode = e, t = Qi(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ja(a), e;
	}
	function rp(e) {
		return e ? (e = Yr, e) : Yr;
	}
	function ip(e, t, n, r, i, a) {
		i = rp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Na(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Pa(e, r, t), n !== null && (hu(n, e, t), Fa(n, e, t));
	}
	function ap(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function op(e, t) {
		ap(e, t), (e = e.alternate) && ap(e, t);
	}
	function sp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Kr(e, 67108864);
			t !== null && hu(t, e, 67108864), op(e, 67108864);
		}
	}
	function cp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = Ke(t);
			var n = Kr(e, t);
			n !== null && hu(n, e, t), op(e, t);
		}
	}
	var lp = !0;
	function up(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 2, dp(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function Q(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 8, dp(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function dp(e, t, n, r) {
		if (lp) {
			var i = fp(r);
			if (i === null) Ed(e, t, r, pp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = ot(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Fe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Oe(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									id(a), !(Pl & 6) && (tu = q() + 500, ad(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Kr(a, 2), s !== null && hu(s, a, 2), bu(), op(a, 2);
					}
					if (a = fp(r), a === null && Ed(e, t, r, pp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Ed(e, t, r, null, n);
		}
	}
	function fp(e) {
		return e = Gt(e), mp(e);
	}
	var pp = null;
	function mp(e) {
		if (pp = null, e = at(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return pp = e, null;
	}
	function hp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (_e()) {
				case ve: return 2;
				case ye: return 8;
				case be:
				case xe: return 32;
				case Se: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var gp = !1, _p = null, $ = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				_p = null;
				break;
			case "dragenter":
			case "dragleave":
				$ = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = ot(t), t !== null && sp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return _p = wp(_p, e, t, n, r, i), !0;
			case "dragenter": return $ = wp($, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = at(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, J(e.priority, function() {
							cp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, J(e.priority, function() {
							cp(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = fp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Wt = r, n.target.dispatchEvent(r), Wt = null;
			} else return t = ot(n), t !== null && sp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		gp = !1, _p !== null && Dp(_p) && (_p = null), $ !== null && Dp($) && ($ = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, gp || (gp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (mp(r || n) === null) continue;
					break;
				}
				var a = ot(n);
				a !== null && (e.splice(t, 3), t -= 3, _s(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		_p !== null && Ap(_p, e), $ !== null && Ap($, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Ze] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Ze] || null) s = o.formAction;
					else if (mp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		ip(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			ip(e.current, 2, null, e, null, null), bu(), t[Qe] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Je();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.6") throw Error(i(527, Lp, "19.2.6"));
	L.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: I,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Te = zp.inject(Rp), Ee = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Bs, s = Vs, c = Hs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = np(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[Qe] = t.current, wd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ o(((e) => {
	var t = u(), n = m();
	function r(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var i = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), d = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), v = Symbol.for("react.scope"), y = Symbol.for("react.activity"), b = Symbol.for("react.legacy_hidden"), x = Symbol.for("react.memo_cache_sentinel"), S = Symbol.for("react.view_transition"), C = Symbol.iterator;
	function w(e) {
		return typeof e != "object" || !e ? null : (e = C && e[C] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var T = Array.isArray;
	function E(e, t) {
		var n = e.length & 3, r = e.length - n, i = t;
		for (t = 0; t < r;) {
			var a = e.charCodeAt(t) & 255 | (e.charCodeAt(++t) & 255) << 8 | (e.charCodeAt(++t) & 255) << 16 | (e.charCodeAt(++t) & 255) << 24;
			++t, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295, i ^= a, i = i << 13 | i >>> 19, i = 5 * (i & 65535) + ((5 * (i >>> 16) & 65535) << 16) & 4294967295, i = (i & 65535) + 27492 + (((i >>> 16) + 58964 & 65535) << 16);
		}
		switch (a = 0, n) {
			case 3: a ^= (e.charCodeAt(t + 2) & 255) << 16;
			case 2: a ^= (e.charCodeAt(t + 1) & 255) << 8;
			case 1: a ^= e.charCodeAt(t) & 255, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, i ^= 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295;
		}
		return i ^= e.length, i ^= i >>> 16, i = 2246822507 * (i & 65535) + ((2246822507 * (i >>> 16) & 65535) << 16) & 4294967295, i ^= i >>> 13, i = 3266489909 * (i & 65535) + ((3266489909 * (i >>> 16) & 65535) << 16) & 4294967295, (i ^ i >>> 16) >>> 0;
	}
	var D = Object.assign, O = Object.prototype.hasOwnProperty, k = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), A = {}, j = {};
	function M(e) {
		return O.call(j, e) ? !0 : O.call(A, e) ? !1 : k.test(e) ? j[e] = !0 : (A[e] = !0, !1);
	}
	var N = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), P = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), F = /["'&<>]/;
	function I(e) {
		if (typeof e == "boolean" || typeof e == "number" || typeof e == "bigint") return "" + e;
		e = "" + e;
		var t = F.exec(e);
		if (t) {
			var n = "", r, i = 0;
			for (r = t.index; r < e.length; r++) {
				switch (e.charCodeAt(r)) {
					case 34:
						t = "&quot;";
						break;
					case 38:
						t = "&amp;";
						break;
					case 39:
						t = "&#x27;";
						break;
					case 60:
						t = "&lt;";
						break;
					case 62:
						t = "&gt;";
						break;
					default: continue;
				}
				i !== r && (n += e.slice(i, r)), i = r + 1, n += t;
			}
			e = i === r ? n : n + e.slice(i, r);
		}
		return e;
	}
	var L = /([A-Z])/g, ee = /^ms-/, R = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function z(e) {
		return R.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	var B = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, U = V.d;
	V.d = {
		f: U.f,
		r: U.r,
		D: rt,
		C: it,
		L: at,
		m: ot,
		X: ct,
		S: st,
		M: lt
	};
	var W = [], te = null, ne = /(<\/|<)(s)(cript)/gi;
	function re(e, t, n, r) {
		return "" + t + (n === "s" ? "\\u0073" : "\\u0053") + r;
	}
	function ie(e, t, n, r, i) {
		return {
			idPrefix: e === void 0 ? "" : e,
			nextFormID: 0,
			streamingFormat: 0,
			bootstrapScriptContent: n,
			bootstrapScripts: r,
			bootstrapModules: i,
			instructions: 0,
			hasBody: !1,
			hasHtml: !1,
			unknownResources: {},
			dnsResources: {},
			connectResources: {
				default: {},
				anonymous: {},
				credentials: {}
			},
			imageResources: {},
			styleResources: {},
			scriptResources: {},
			moduleUnknownResources: {},
			moduleScriptResources: {}
		};
	}
	function G(e, t, n, r) {
		return {
			insertionMode: e,
			selectedValue: t,
			tagScope: n,
			viewTransition: r
		};
	}
	function ae(e, t, n) {
		var r = e.tagScope & -25;
		switch (t) {
			case "noscript": return G(2, null, r | 1, null);
			case "select": return G(2, n.value == null ? n.defaultValue : n.value, r, null);
			case "svg": return G(4, null, r, null);
			case "picture": return G(2, null, r | 2, null);
			case "math": return G(5, null, r, null);
			case "foreignObject": return G(2, null, r, null);
			case "table": return G(6, null, r, null);
			case "thead":
			case "tbody":
			case "tfoot": return G(7, null, r, null);
			case "colgroup": return G(9, null, r, null);
			case "tr": return G(8, null, r, null);
			case "head":
				if (2 > e.insertionMode) return G(3, null, r, null);
				break;
			case "html": if (e.insertionMode === 0) return G(1, null, r, null);
		}
		return 6 <= e.insertionMode || 2 > e.insertionMode ? G(2, null, r, null) : e.tagScope === r ? e : G(e.insertionMode, e.selectedValue, r, null);
	}
	function K(e) {
		return e === null ? null : {
			update: e.update,
			enter: "none",
			exit: "none",
			share: e.update,
			name: e.autoName,
			autoName: e.autoName,
			nameIdx: 0
		};
	}
	function oe(e, t) {
		return t.tagScope & 32 && (e.instructions |= 128), G(t.insertionMode, t.selectedValue, t.tagScope | 12, K(t.viewTransition));
	}
	function se(e, t) {
		e = K(t.viewTransition);
		var n = t.tagScope | 16;
		return e !== null && e.share !== "none" && (n |= 64), G(t.insertionMode, t.selectedValue, n, e);
	}
	var ce = /* @__PURE__ */ new Map();
	function le(e, t) {
		if (typeof t != "object") throw Error(r(62));
		var n = !0, i;
		for (i in t) if (O.call(t, i)) {
			var a = t[i];
			if (a != null && typeof a != "boolean" && a !== "") {
				if (i.indexOf("--") === 0) {
					var o = I(i);
					a = I(("" + a).trim());
				} else o = ce.get(i), o === void 0 && (o = I(i.replace(L, "-$1").toLowerCase().replace(ee, "-ms-")), ce.set(i, o)), a = typeof a == "number" ? a === 0 || N.has(i) ? "" + a : a + "px" : I(("" + a).trim());
				n ? (n = !1, e.push(" style=\"", o, ":", a)) : e.push(";", o, ":", a);
			}
		}
		n || e.push("\"");
	}
	function ue(e, t, n) {
		n && typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"\"");
	}
	function de(e, t, n) {
		typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && e.push(" ", t, "=\"", I(n), "\"");
	}
	var fe = I("javascript:throw new Error('React form unexpectedly submitted.')");
	function pe(e, t) {
		this.push("<input type=\"hidden\""), me(e), de(this, "name", t), de(this, "value", e), this.push("/>");
	}
	function me(e) {
		if (typeof e != "string") throw Error(r(480));
	}
	function he(e, t) {
		if (typeof t.$$FORM_ACTION == "function") {
			var n = e.nextFormID++;
			e = e.idPrefix + n;
			try {
				var r = t.$$FORM_ACTION(e);
				return r && r.data?.forEach(me), r;
			} catch (e) {
				if (typeof e == "object" && e && typeof e.then == "function") throw e;
			}
		}
		return null;
	}
	function ge(e, t, n, r, i, a, o, s) {
		var c = null;
		if (typeof r == "function") {
			var l = he(t, r);
			l === null ? (e.push(" ", "formAction", "=\"", fe, "\""), o = a = i = r = s = null, ye(t, n)) : (s = l.name, r = l.action || "", i = l.encType, a = l.method, o = l.target, c = l.data);
		}
		return s != null && q(e, "name", s), r != null && q(e, "formAction", r), i != null && q(e, "formEncType", i), a != null && q(e, "formMethod", a), o != null && q(e, "formTarget", o), c;
	}
	function q(e, t, n) {
		switch (t) {
			case "className":
				de(e, "class", n);
				break;
			case "tabIndex":
				de(e, "tabindex", n);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				de(e, t, n);
				break;
			case "style":
				le(e, n);
				break;
			case "src":
			case "href": if (n === "") break;
			case "action":
			case "formAction":
				if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = z("" + n), e.push(" ", t, "=\"", I(n), "\"");
				break;
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "ref": break;
			case "autoFocus":
			case "multiple":
			case "muted":
				ue(e, t.toLowerCase(), n);
				break;
			case "xlinkHref":
				if (typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = z("" + n), e.push(" ", "xlink:href", "=\"", I(n), "\"");
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"", I(n), "\"");
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				n && typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"\"");
				break;
			case "capture":
			case "download":
				!0 === n ? e.push(" ", t, "=\"\"") : !1 !== n && typeof n != "function" && typeof n != "symbol" && e.push(" ", t, "=\"", I(n), "\"");
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n && e.push(" ", t, "=\"", I(n), "\"");
				break;
			case "rowSpan":
			case "start":
				typeof n == "function" || typeof n == "symbol" || isNaN(n) || e.push(" ", t, "=\"", I(n), "\"");
				break;
			case "xlinkActuate":
				de(e, "xlink:actuate", n);
				break;
			case "xlinkArcrole":
				de(e, "xlink:arcrole", n);
				break;
			case "xlinkRole":
				de(e, "xlink:role", n);
				break;
			case "xlinkShow":
				de(e, "xlink:show", n);
				break;
			case "xlinkTitle":
				de(e, "xlink:title", n);
				break;
			case "xlinkType":
				de(e, "xlink:type", n);
				break;
			case "xmlBase":
				de(e, "xml:base", n);
				break;
			case "xmlLang":
				de(e, "xml:lang", n);
				break;
			case "xmlSpace":
				de(e, "xml:space", n);
				break;
			default: if ((!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = P.get(t) || t, M(t))) {
				switch (typeof n) {
					case "function":
					case "symbol": return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") return;
				}
				e.push(" ", t, "=\"", I(n), "\"");
			}
		}
	}
	function _e(e, t, n) {
		if (t != null) {
			if (n != null) throw Error(r(60));
			if (typeof t != "object" || !("__html" in t)) throw Error(r(61));
			t = t.__html, t != null && e.push("" + t);
		}
	}
	function ve(e) {
		var n = "";
		return t.Children.forEach(e, function(e) {
			e != null && (n += e);
		}), n;
	}
	function ye(e, t) {
		if (!(e.instructions & 16)) {
			e.instructions |= 16;
			var n = t.preamble, r = t.bootstrapChunks;
			(n.htmlChunks || n.headChunks) && r.length === 0 ? (r.push(t.startInlineScript), $e(r, e), r.push(">", "addEventListener(\"submit\",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute(\"formAction\");null!=f&&(e=f,b=null)}\"javascript:throw new Error('React form unexpectedly submitted.')\"===e&&(a.preventDefault(),b?(a=document.createElement(\"input\"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});", "<\/script>")) : r.unshift(t.startInlineScript, ">", "addEventListener(\"submit\",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute(\"formAction\");null!=f&&(e=f,b=null)}\"javascript:throw new Error('React form unexpectedly submitted.')\"===e&&(a.preventDefault(),b?(a=document.createElement(\"input\"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});", "<\/script>");
		}
	}
	function be(e, t) {
		for (var n in e.push(Ae("link")), t) if (O.call(t, n)) {
			var i = t[n];
			if (i != null) switch (n) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
				default: q(e, n, i);
			}
		}
		return e.push("/>"), null;
	}
	var xe = /(<\/|<)(s)(tyle)/gi;
	function Se(e, t, n, r) {
		return "" + t + (n === "s" ? "\\73 " : "\\53 ") + r;
	}
	function Ce(e, t, n) {
		for (var i in e.push(Ae(n)), t) if (O.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, n));
				default: q(e, i, a);
			}
		}
		return e.push("/>"), null;
	}
	function we(e, t) {
		e.push(Ae("title"));
		var n = null, r = null, i;
		for (i in t) if (O.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: q(e, i, a);
			}
		}
		return e.push(">"), t = Array.isArray(n) ? 2 > n.length ? n[0] : null : n, typeof t != "function" && typeof t != "symbol" && t != null && e.push(I("" + t)), _e(e, r, n), e.push(Ne("title")), null;
	}
	function Te(e, t) {
		e.push(Ae("script"));
		var n = null, r = null, i;
		for (i in t) if (O.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: q(e, i, a);
			}
		}
		return e.push(">"), _e(e, r, n), typeof n == "string" && e.push(("" + n).replace(ne, re)), e.push(Ne("script")), null;
	}
	function Ee(e, t, n) {
		e.push(Ae(n));
		var r = n = null, i;
		for (i in t) if (O.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: q(e, i, a);
			}
		}
		return e.push(">"), _e(e, r, n), n;
	}
	function De(e, t, n) {
		e.push(Ae(n));
		var r = n = null, i;
		for (i in t) if (O.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: q(e, i, a);
			}
		}
		return e.push(">"), _e(e, r, n), typeof n == "string" ? (e.push(I(n)), null) : n;
	}
	var Oe = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, ke = /* @__PURE__ */ new Map();
	function Ae(e) {
		var t = ke.get(e);
		if (t === void 0) {
			if (!Oe.test(e)) throw Error(r(65, e));
			t = "<" + e, ke.set(e, t);
		}
		return t;
	}
	function je(e, t, n, i, a, o, s, c, l) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path": break;
			case "a":
				e.push(Ae("a"));
				var u = null, d = null, f;
				for (f in n) if (O.call(n, f)) {
					var p = n[f];
					if (p != null) switch (f) {
						case "children":
							u = p;
							break;
						case "dangerouslySetInnerHTML":
							d = p;
							break;
						case "href":
							p === "" ? de(e, "href", "") : q(e, f, p);
							break;
						default: q(e, f, p);
					}
				}
				if (e.push(">"), _e(e, d, u), typeof u == "string") {
					e.push(I(u));
					var m = null;
				} else m = u;
				return m;
			case "g":
			case "p":
			case "li": break;
			case "select":
				e.push(Ae("select"));
				var h = null, g = null, _;
				for (_ in n) if (O.call(n, _)) {
					var v = n[_];
					if (v != null) switch (_) {
						case "children":
							h = v;
							break;
						case "dangerouslySetInnerHTML":
							g = v;
							break;
						case "defaultValue":
						case "value": break;
						default: q(e, _, v);
					}
				}
				return e.push(">"), _e(e, g, h), h;
			case "option":
				var y = c.selectedValue;
				e.push(Ae("option"));
				var b = null, x = null, S = null, C = null, w;
				for (w in n) if (O.call(n, w)) {
					var E = n[w];
					if (E != null) switch (w) {
						case "children":
							b = E;
							break;
						case "selected":
							S = E;
							break;
						case "dangerouslySetInnerHTML":
							C = E;
							break;
						case "value": x = E;
						default: q(e, w, E);
					}
				}
				if (y != null) {
					var k = x === null ? ve(b) : "" + x;
					if (T(y)) {
						for (var A = 0; A < y.length; A++) if ("" + y[A] === k) {
							e.push(" selected=\"\"");
							break;
						}
					} else "" + y === k && e.push(" selected=\"\"");
				} else S && e.push(" selected=\"\"");
				return e.push(">"), _e(e, C, b), b;
			case "textarea":
				e.push(Ae("textarea"));
				var j = null, N = null, P = null, F;
				for (F in n) if (O.call(n, F)) {
					var L = n[F];
					if (L != null) switch (F) {
						case "children":
							P = L;
							break;
						case "value":
							j = L;
							break;
						case "defaultValue":
							N = L;
							break;
						case "dangerouslySetInnerHTML": throw Error(r(91));
						default: q(e, F, L);
					}
				}
				if (j === null && N !== null && (j = N), e.push(">"), P != null) {
					if (j != null) throw Error(r(92));
					if (T(P)) {
						if (1 < P.length) throw Error(r(93));
						j = "" + P[0];
					}
					j = "" + P;
				}
				return typeof j == "string" && j[0] === "\n" && e.push("\n"), j !== null && e.push(I("" + j)), null;
			case "input":
				e.push(Ae("input"));
				var ee = null, R = null, B = null, V = null, H = null, U = null, te = null, ne = null, re = null, ie;
				for (ie in n) if (O.call(n, ie)) {
					var G = n[ie];
					if (G != null) switch (ie) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(399, "input"));
						case "name":
							ee = G;
							break;
						case "formAction":
							R = G;
							break;
						case "formEncType":
							B = G;
							break;
						case "formMethod":
							V = G;
							break;
						case "formTarget":
							H = G;
							break;
						case "defaultChecked":
							re = G;
							break;
						case "defaultValue":
							te = G;
							break;
						case "checked":
							ne = G;
							break;
						case "value":
							U = G;
							break;
						default: q(e, ie, G);
					}
				}
				var ae = ge(e, i, a, R, B, V, H, ee);
				return ne === null ? re !== null && ue(e, "checked", re) : ue(e, "checked", ne), U === null ? te !== null && q(e, "value", te) : q(e, "value", U), e.push("/>"), ae?.forEach(pe, e), null;
			case "button":
				e.push(Ae("button"));
				var K = null, oe = null, se = null, ce = null, me = null, Oe = null, ke = null, je;
				for (je in n) if (O.call(n, je)) {
					var Me = n[je];
					if (Me != null) switch (je) {
						case "children":
							K = Me;
							break;
						case "dangerouslySetInnerHTML":
							oe = Me;
							break;
						case "name":
							se = Me;
							break;
						case "formAction":
							ce = Me;
							break;
						case "formEncType":
							me = Me;
							break;
						case "formMethod":
							Oe = Me;
							break;
						case "formTarget":
							ke = Me;
							break;
						default: q(e, je, Me);
					}
				}
				var Pe = ge(e, i, a, ce, me, Oe, ke, se);
				if (e.push(">"), Pe?.forEach(pe, e), _e(e, oe, K), typeof K == "string") {
					e.push(I(K));
					var Fe = null;
				} else Fe = K;
				return Fe;
			case "form":
				e.push(Ae("form"));
				var Ie = null, Le = null, Re = null, ze = null, Be = null, Ve = null, He;
				for (He in n) if (O.call(n, He)) {
					var Ue = n[He];
					if (Ue != null) switch (He) {
						case "children":
							Ie = Ue;
							break;
						case "dangerouslySetInnerHTML":
							Le = Ue;
							break;
						case "action":
							Re = Ue;
							break;
						case "encType":
							ze = Ue;
							break;
						case "method":
							Be = Ue;
							break;
						case "target":
							Ve = Ue;
							break;
						default: q(e, He, Ue);
					}
				}
				var We = null, Ge = null;
				if (typeof Re == "function") {
					var Ke = he(i, Re);
					Ke === null ? (e.push(" ", "action", "=\"", fe, "\""), Ve = Be = ze = Re = null, ye(i, a)) : (Re = Ke.action || "", ze = Ke.encType, Be = Ke.method, Ve = Ke.target, We = Ke.data, Ge = Ke.name);
				}
				if (Re != null && q(e, "action", Re), ze != null && q(e, "encType", ze), Be != null && q(e, "method", Be), Ve != null && q(e, "target", Ve), e.push(">"), Ge !== null && (e.push("<input type=\"hidden\""), de(e, "name", Ge), e.push("/>"), We?.forEach(pe, e)), _e(e, Le, Ie), typeof Ie == "string") {
					e.push(I(Ie));
					var qe = null;
				} else qe = Ie;
				return qe;
			case "menuitem":
				for (var Je in e.push(Ae("menuitem")), n) if (O.call(n, Je)) {
					var J = n[Je];
					if (J != null) switch (Je) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(400));
						default: q(e, Je, J);
					}
				}
				return e.push(">"), null;
			case "object":
				e.push(Ae("object"));
				var Ye = null, Xe = null, Ze;
				for (Ze in n) if (O.call(n, Ze)) {
					var Qe = n[Ze];
					if (Qe != null) switch (Ze) {
						case "children":
							Ye = Qe;
							break;
						case "dangerouslySetInnerHTML":
							Xe = Qe;
							break;
						case "data":
							var $e = z("" + Qe);
							if ($e === "") break;
							e.push(" ", "data", "=\"", I($e), "\"");
							break;
						default: q(e, Ze, Qe);
					}
				}
				if (e.push(">"), _e(e, Xe, Ye), typeof Ye == "string") {
					e.push(I(Ye));
					var et = null;
				} else et = Ye;
				return et;
			case "title":
				var tt = c.tagScope & 1, nt = c.tagScope & 4;
				if (c.insertionMode === 4 || tt || n.itemProp != null) var rt = we(e, n);
				else nt ? rt = null : (we(a.hoistableChunks, n), rt = void 0);
				return rt;
			case "link":
				var it = c.tagScope & 1, at = c.tagScope & 4, ot = n.rel, st = n.href, ct = n.precedence;
				if (c.insertionMode === 4 || it || n.itemProp != null || typeof ot != "string" || typeof st != "string" || st === "") {
					be(e, n);
					var lt = null;
				} else if (n.rel === "stylesheet") if (typeof ct != "string" || n.disabled != null || n.onLoad || n.onError) lt = be(e, n);
				else {
					var ft = a.styles.get(ct), pt = i.styleResources.hasOwnProperty(st) ? i.styleResources[st] : void 0;
					if (pt !== null) {
						i.styleResources[st] = null, ft || (ft = {
							precedence: I(ct),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set(ct, ft));
						var mt = {
							state: 0,
							props: D({}, n, {
								"data-precedence": n.precedence,
								precedence: null
							})
						};
						if (pt) {
							pt.length === 2 && ut(mt.props, pt);
							var ht = a.preloads.stylesheets.get(st);
							ht && 0 < ht.length ? ht.length = 0 : mt.state = 1;
						}
						ft.sheets.set(st, mt), s && s.stylesheets.add(mt);
					} else if (ft) {
						var gt = ft.sheets.get(st);
						gt && s && s.stylesheets.add(gt);
					}
					l && e.push("<!-- -->"), lt = null;
				}
				else n.onLoad || n.onError ? lt = be(e, n) : (l && e.push("<!-- -->"), lt = at ? null : be(a.hoistableChunks, n));
				return lt;
			case "script":
				var _t = c.tagScope & 1, vt = n.async;
				if (typeof n.src != "string" || !n.src || !vt || typeof vt == "function" || typeof vt == "symbol" || n.onLoad || n.onError || c.insertionMode === 4 || _t || n.itemProp != null) var yt = Te(e, n);
				else {
					var bt = n.src;
					if (n.type === "module") var xt = i.moduleScriptResources, St = a.preloads.moduleScripts;
					else xt = i.scriptResources, St = a.preloads.scripts;
					var Ct = xt.hasOwnProperty(bt) ? xt[bt] : void 0;
					if (Ct !== null) {
						xt[bt] = null;
						var wt = n;
						if (Ct) {
							Ct.length === 2 && (wt = D({}, n), ut(wt, Ct));
							var Tt = St.get(bt);
							Tt && (Tt.length = 0);
						}
						var Et = [];
						a.scripts.add(Et), Te(Et, wt);
					}
					l && e.push("<!-- -->"), yt = null;
				}
				return yt;
			case "style":
				var Dt = c.tagScope & 1, Ot = n.precedence, kt = n.href, At = n.nonce;
				if (c.insertionMode === 4 || Dt || n.itemProp != null || typeof Ot != "string" || typeof kt != "string" || kt === "") {
					e.push(Ae("style"));
					var jt = null, Mt = null, Nt;
					for (Nt in n) if (O.call(n, Nt)) {
						var Pt = n[Nt];
						if (Pt != null) switch (Nt) {
							case "children":
								jt = Pt;
								break;
							case "dangerouslySetInnerHTML":
								Mt = Pt;
								break;
							default: q(e, Nt, Pt);
						}
					}
					e.push(">");
					var Ft = Array.isArray(jt) ? 2 > jt.length ? jt[0] : null : jt;
					typeof Ft != "function" && typeof Ft != "symbol" && Ft != null && e.push(("" + Ft).replace(xe, Se)), _e(e, Mt, jt), e.push(Ne("style"));
					var It = null;
				} else {
					var Lt = a.styles.get(Ot);
					if ((i.styleResources.hasOwnProperty(kt) ? i.styleResources[kt] : void 0) !== null) {
						i.styleResources[kt] = null, Lt || (Lt = {
							precedence: I(Ot),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set(Ot, Lt));
						var Rt = a.nonce.style;
						if (!Rt || Rt === At) {
							Lt.hrefs.push(I(kt));
							var zt = Lt.rules, Bt = null, Vt = null, Ht;
							for (Ht in n) if (O.call(n, Ht)) {
								var Ut = n[Ht];
								if (Ut != null) switch (Ht) {
									case "children":
										Bt = Ut;
										break;
									case "dangerouslySetInnerHTML": Vt = Ut;
								}
							}
							var Wt = Array.isArray(Bt) ? 2 > Bt.length ? Bt[0] : null : Bt;
							typeof Wt != "function" && typeof Wt != "symbol" && Wt != null && zt.push(("" + Wt).replace(xe, Se)), _e(zt, Vt, Bt);
						}
					}
					Lt && s && s.styles.add(Lt), l && e.push("<!-- -->"), It = void 0;
				}
				return It;
			case "meta":
				var Gt = c.tagScope & 1, Kt = c.tagScope & 4;
				if (c.insertionMode === 4 || Gt || n.itemProp != null) var qt = Ce(e, n, "meta");
				else l && e.push("<!-- -->"), qt = Kt ? null : typeof n.charSet == "string" ? Ce(a.charsetChunks, n, "meta") : n.name === "viewport" ? Ce(a.viewportChunks, n, "meta") : Ce(a.hoistableChunks, n, "meta");
				return qt;
			case "listing":
			case "pre":
				e.push(Ae(t));
				var Jt = null, Yt = null, Xt;
				for (Xt in n) if (O.call(n, Xt)) {
					var Zt = n[Xt];
					if (Zt != null) switch (Xt) {
						case "children":
							Jt = Zt;
							break;
						case "dangerouslySetInnerHTML":
							Yt = Zt;
							break;
						default: q(e, Xt, Zt);
					}
				}
				if (e.push(">"), Yt != null) {
					if (Jt != null) throw Error(r(60));
					if (typeof Yt != "object" || !("__html" in Yt)) throw Error(r(61));
					var Y = Yt.__html;
					Y != null && (typeof Y == "string" && 0 < Y.length && Y[0] === "\n" ? e.push("\n", Y) : e.push("" + Y));
				}
				return typeof Jt == "string" && Jt[0] === "\n" && e.push("\n"), Jt;
			case "img":
				var Qt = c.tagScope & 3, $t = n.src, en = n.srcSet;
				if (!(n.loading === "lazy" || !$t && !en || typeof $t != "string" && $t != null || typeof en != "string" && en != null || n.fetchPriority === "low" || Qt) && (typeof $t != "string" || $t[4] !== ":" || $t[0] !== "d" && $t[0] !== "D" || $t[1] !== "a" && $t[1] !== "A" || $t[2] !== "t" && $t[2] !== "T" || $t[3] !== "a" && $t[3] !== "A") && (typeof en != "string" || en[4] !== ":" || en[0] !== "d" && en[0] !== "D" || en[1] !== "a" && en[1] !== "A" || en[2] !== "t" && en[2] !== "T" || en[3] !== "a" && en[3] !== "A")) {
					s !== null && c.tagScope & 64 && (s.suspenseyImages = !0);
					var tn = typeof n.sizes == "string" ? n.sizes : void 0, nn = en ? en + "\n" + (tn || "") : $t, rn = a.preloads.images, an = rn.get(nn);
					if (an) (n.fetchPriority === "high" || 10 > a.highImagePreloads.size) && (rn.delete(nn), a.highImagePreloads.add(an));
					else if (!i.imageResources.hasOwnProperty(nn)) {
						i.imageResources[nn] = W;
						var on = n.crossOrigin, sn = typeof on == "string" ? on === "use-credentials" ? on : "" : void 0, cn = a.headers, ln;
						cn && 0 < cn.remainingCapacity && typeof n.srcSet != "string" && (n.fetchPriority === "high" || 500 > cn.highImagePreloads.length) && (ln = dt($t, "image", {
							imageSrcSet: n.srcSet,
							imageSizes: n.sizes,
							crossOrigin: sn,
							integrity: n.integrity,
							nonce: n.nonce,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.refererPolicy
						}), 0 <= (cn.remainingCapacity -= ln.length + 2)) ? (a.resets.image[nn] = W, cn.highImagePreloads && (cn.highImagePreloads += ", "), cn.highImagePreloads += ln) : (an = [], be(an, {
							rel: "preload",
							as: "image",
							href: en ? void 0 : $t,
							imageSrcSet: en,
							imageSizes: tn,
							crossOrigin: sn,
							integrity: n.integrity,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.referrerPolicy
						}), n.fetchPriority === "high" || 10 > a.highImagePreloads.size ? a.highImagePreloads.add(an) : (a.bulkPreloads.add(an), rn.set(nn, an)));
					}
				}
				return Ce(e, n, "img");
			case "base":
			case "area":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "param":
			case "source":
			case "track":
			case "wbr": return Ce(e, n, t);
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": break;
			case "head":
				if (2 > c.insertionMode) {
					var un = o || a.preamble;
					if (un.headChunks) throw Error(r(545, "`<head>`"));
					o !== null && e.push("<!--head-->"), un.headChunks = [];
					var dn = Ee(un.headChunks, n, "head");
				} else dn = De(e, n, "head");
				return dn;
			case "body":
				if (2 > c.insertionMode) {
					var fn = o || a.preamble;
					if (fn.bodyChunks) throw Error(r(545, "`<body>`"));
					o !== null && e.push("<!--body-->"), fn.bodyChunks = [];
					var pn = Ee(fn.bodyChunks, n, "body");
				} else pn = De(e, n, "body");
				return pn;
			case "html":
				if (c.insertionMode === 0) {
					var mn = o || a.preamble;
					if (mn.htmlChunks) throw Error(r(545, "`<html>`"));
					o !== null && e.push("<!--html-->"), mn.htmlChunks = [""];
					var hn = Ee(mn.htmlChunks, n, "html");
				} else hn = De(e, n, "html");
				return hn;
			default: if (t.indexOf("-") !== -1) {
				e.push(Ae(t));
				var gn = null, _n = null, vn;
				for (vn in n) if (O.call(n, vn)) {
					var yn = n[vn];
					if (yn != null) {
						var bn = vn;
						switch (vn) {
							case "children":
								gn = yn;
								break;
							case "dangerouslySetInnerHTML":
								_n = yn;
								break;
							case "style":
								le(e, yn);
								break;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "ref": break;
							case "className": bn = "class";
							default: if (M(vn) && typeof yn != "function" && typeof yn != "symbol" && !1 !== yn) {
								if (!0 === yn) yn = "";
								else if (typeof yn == "object") continue;
								e.push(" ", bn, "=\"", I(yn), "\"");
							}
						}
					}
				}
				return e.push(">"), _e(e, _n, gn), gn;
			}
		}
		return De(e, n, t);
	}
	var Me = /* @__PURE__ */ new Map();
	function Ne(e) {
		var t = Me.get(e);
		return t === void 0 && (t = "</" + e + ">", Me.set(e, t)), t;
	}
	function Pe(e, t) {
		e = e.preamble, e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks), e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks), e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks);
	}
	function Fe(e, t) {
		t = t.bootstrapChunks;
		for (var n = 0; n < t.length - 1; n++) e.push(t[n]);
		return n < t.length ? (n = t[n], t.length = 0, e.push(n)) : !0;
	}
	function Ie(e, t, n) {
		if (e.push("<!--$?--><template id=\""), n === null) throw Error(r(395));
		return e.push(t.boundaryPrefix), t = n.toString(16), e.push(t), e.push("\"></template>");
	}
	function Le(e, t, n, i) {
		switch (n.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return e.push("<div hidden id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 4: return e.push("<svg aria-hidden=\"true\" style=\"display:none\" id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 5: return e.push("<math aria-hidden=\"true\" style=\"display:none\" id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 6: return e.push("<table hidden id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 7: return e.push("<table hidden><tbody id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 8: return e.push("<table hidden><tr id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			case 9: return e.push("<table hidden><colgroup id=\""), e.push(t.segmentPrefix), t = i.toString(16), e.push(t), e.push("\">");
			default: throw Error(r(397));
		}
	}
	function Re(e, t) {
		switch (t.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return e.push("</div>");
			case 4: return e.push("</svg>");
			case 5: return e.push("</math>");
			case 6: return e.push("</table>");
			case 7: return e.push("</tbody></table>");
			case 8: return e.push("</tr></table>");
			case 9: return e.push("</colgroup></table>");
			default: throw Error(r(397));
		}
	}
	var ze = /[<\u2028\u2029]/g;
	function Be(e) {
		return JSON.stringify(e).replace(ze, function(e) {
			switch (e) {
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var Ve = /[&><\u2028\u2029]/g;
	function He(e) {
		return JSON.stringify(e).replace(Ve, function(e) {
			switch (e) {
				case "&": return "\\u0026";
				case ">": return "\\u003e";
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var Ue = !1, We = !0;
	function Ge(e) {
		var t = e.rules, n = e.hrefs, r = 0;
		if (n.length) {
			for (this.push(te.startInlineStyle), this.push(" media=\"not all\" data-precedence=\""), this.push(e.precedence), this.push("\" data-href=\""); r < n.length - 1; r++) this.push(n[r]), this.push(" ");
			for (this.push(n[r]), this.push("\">"), r = 0; r < t.length; r++) this.push(t[r]);
			We = this.push("</style>"), Ue = !0, t.length = 0, n.length = 0;
		}
	}
	function Ke(e) {
		return e.state === 2 ? !1 : Ue = !0;
	}
	function qe(e, t, n) {
		return Ue = !1, We = !0, te = n, t.styles.forEach(Ge, e), te = null, t.stylesheets.forEach(Ke), Ue && (n.stylesToHoist = !0), We;
	}
	function Je(e) {
		for (var t = 0; t < e.length; t++) this.push(e[t]);
		e.length = 0;
	}
	var J = [];
	function Ye(e) {
		be(J, e.props);
		for (var t = 0; t < J.length; t++) this.push(J[t]);
		J.length = 0, e.state = 2;
	}
	function Xe(e) {
		var t = 0 < e.sheets.size;
		e.sheets.forEach(Ye, this), e.sheets.clear();
		var n = e.rules, r = e.hrefs;
		if (!t || r.length) {
			if (this.push(te.startInlineStyle), this.push(" data-precedence=\""), this.push(e.precedence), e = 0, r.length) {
				for (this.push("\" data-href=\""); e < r.length - 1; e++) this.push(r[e]), this.push(" ");
				this.push(r[e]);
			}
			for (this.push("\">"), e = 0; e < n.length; e++) this.push(n[e]);
			this.push("</style>"), n.length = 0, r.length = 0;
		}
	}
	function Ze(e) {
		if (e.state === 0) {
			e.state = 1;
			var t = e.props;
			for (be(J, {
				rel: "preload",
				as: "style",
				href: e.props.href,
				crossOrigin: t.crossOrigin,
				fetchPriority: t.fetchPriority,
				integrity: t.integrity,
				media: t.media,
				hrefLang: t.hrefLang,
				referrerPolicy: t.referrerPolicy
			}), e = 0; e < J.length; e++) this.push(J[e]);
			J.length = 0;
		}
	}
	function Qe(e) {
		e.sheets.forEach(Ze, this), e.sheets.clear();
	}
	function $e(e, t) {
		!(t.instructions & 32) && (t.instructions |= 32, e.push(" id=\"", I("_" + t.idPrefix + "R_"), "\""));
	}
	function et(e, t) {
		e.push("[");
		var n = "[";
		t.stylesheets.forEach(function(t) {
			if (t.state !== 2) if (t.state === 3) e.push(n), t = He("" + t.props.href), e.push(t), e.push("]"), n = ",[";
			else {
				e.push(n);
				var i = t.props["data-precedence"], a = t.props, o = z("" + t.props.href);
				for (var s in o = He(o), e.push(o), i = "" + i, e.push(","), i = He(i), e.push(i), a) if (O.call(a, s) && (i = a[s], i != null)) switch (s) {
					case "href":
					case "rel":
					case "precedence":
					case "data-precedence": break;
					case "children":
					case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
					default: tt(e, s, i);
				}
				e.push("]"), n = ",[", t.state = 3;
			}
		}), e.push("]");
	}
	function tt(e, t, n) {
		var r = t.toLowerCase();
		switch (typeof n) {
			case "function":
			case "symbol": return;
		}
		switch (t) {
			case "innerHTML":
			case "dangerouslySetInnerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "style":
			case "ref": return;
			case "className":
				r = "class", t = "" + n;
				break;
			case "hidden":
				if (!1 === n) return;
				t = "";
				break;
			case "src":
			case "href":
				n = z(n), t = "" + n;
				break;
			default:
				if (2 < t.length && (t[0] === "o" || t[0] === "O") && (t[1] === "n" || t[1] === "N") || !M(t)) return;
				t = "" + n;
		}
		e.push(","), r = He(r), e.push(r), e.push(","), r = He(t), e.push(r);
	}
	function nt() {
		return {
			styles: /* @__PURE__ */ new Set(),
			stylesheets: /* @__PURE__ */ new Set(),
			suspenseyImages: !1
		};
	}
	function rt(e) {
		var t = In || null;
		if (t) {
			var n = t.resumableState, r = t.renderState;
			if (typeof e == "string" && e) {
				if (!n.dnsResources.hasOwnProperty(e)) {
					n.dnsResources[e] = null, n = r.headers;
					var i, a;
					(a = n && 0 < n.remainingCapacity) && (a = (i = "<" + ("" + e).replace(ft, pt) + ">; rel=dns-prefetch", 0 <= (n.remainingCapacity -= i.length + 2))), a ? (r.resets.dns[e] = null, n.preconnects && (n.preconnects += ", "), n.preconnects += i) : (i = [], be(i, {
						href: e,
						rel: "dns-prefetch"
					}), r.preconnects.add(i));
				}
				jr(t);
			}
		} else U.D(e);
	}
	function it(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (typeof e == "string" && e) {
				var a = t === "use-credentials" ? "credentials" : typeof t == "string" ? "anonymous" : "default";
				if (!r.connectResources[a].hasOwnProperty(e)) {
					r.connectResources[a][e] = null, r = i.headers;
					var o, s;
					if (s = r && 0 < r.remainingCapacity) {
						if (s = "<" + ("" + e).replace(ft, pt) + ">; rel=preconnect", typeof t == "string") {
							var c = ("" + t).replace(mt, ht);
							s += "; crossorigin=\"" + c + "\"";
						}
						s = (o = s, 0 <= (r.remainingCapacity -= o.length + 2));
					}
					s ? (i.resets.connect[a][e] = null, r.preconnects && (r.preconnects += ", "), r.preconnects += o) : (a = [], be(a, {
						rel: "preconnect",
						href: e,
						crossOrigin: t
					}), i.preconnects.add(a));
				}
				jr(n);
			}
		} else U.C(e, t);
	}
	function at(e, t, n) {
		var r = In || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (t && e) {
				switch (t) {
					case "image":
						if (n) var o = n.imageSrcSet, s = n.imageSizes, c = n.fetchPriority;
						var l = o ? o + "\n" + (s || "") : e;
						if (i.imageResources.hasOwnProperty(l)) return;
						i.imageResources[l] = W, i = a.headers;
						var u;
						i && 0 < i.remainingCapacity && typeof o != "string" && c === "high" && (u = dt(e, t, n), 0 <= (i.remainingCapacity -= u.length + 2)) ? (a.resets.image[l] = W, i.highImagePreloads && (i.highImagePreloads += ", "), i.highImagePreloads += u) : (i = [], be(i, D({
							rel: "preload",
							href: o ? void 0 : e,
							as: t
						}, n)), c === "high" ? a.highImagePreloads.add(i) : (a.bulkPreloads.add(i), a.preloads.images.set(l, i)));
						break;
					case "style":
						if (i.styleResources.hasOwnProperty(e)) return;
						o = [], be(o, D({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.styleResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? W : [n.crossOrigin, n.integrity], a.preloads.stylesheets.set(e, o), a.bulkPreloads.add(o);
						break;
					case "script":
						if (i.scriptResources.hasOwnProperty(e)) return;
						o = [], a.preloads.scripts.set(e, o), a.bulkPreloads.add(o), be(o, D({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.scriptResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? W : [n.crossOrigin, n.integrity];
						break;
					default:
						if (i.unknownResources.hasOwnProperty(t)) {
							if (o = i.unknownResources[t], o.hasOwnProperty(e)) return;
						} else o = {}, i.unknownResources[t] = o;
						if (o[e] = W, (i = a.headers) && 0 < i.remainingCapacity && t === "font" && (l = dt(e, t, n), 0 <= (i.remainingCapacity -= l.length + 2))) a.resets.font[e] = W, i.fontPreloads && (i.fontPreloads += ", "), i.fontPreloads += l;
						else switch (i = [], e = D({
							rel: "preload",
							href: e,
							as: t
						}, n), be(i, e), t) {
							case "font":
								a.fontPreloads.add(i);
								break;
							default: a.bulkPreloads.add(i);
						}
				}
				jr(r);
			}
		} else U.L(e, t, n);
	}
	function ot(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = t && typeof t.as == "string" ? t.as : "script";
				switch (a) {
					case "script":
						if (r.moduleScriptResources.hasOwnProperty(e)) return;
						a = [], r.moduleScriptResources[e] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? W : [t.crossOrigin, t.integrity], i.preloads.moduleScripts.set(e, a);
						break;
					default:
						if (r.moduleUnknownResources.hasOwnProperty(a)) {
							var o = r.unknownResources[a];
							if (o.hasOwnProperty(e)) return;
						} else o = {}, r.moduleUnknownResources[a] = o;
						a = [], o[e] = W;
				}
				be(a, D({
					rel: "modulepreload",
					href: e
				}, t)), i.bulkPreloads.add(a), jr(n);
			}
		} else U.m(e, t);
	}
	function st(e, t, n) {
		var r = In || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (e) {
				t ||= "default";
				var o = a.styles.get(t), s = i.styleResources.hasOwnProperty(e) ? i.styleResources[e] : void 0;
				s !== null && (i.styleResources[e] = null, o || (o = {
					precedence: I(t),
					rules: [],
					hrefs: [],
					sheets: /* @__PURE__ */ new Map()
				}, a.styles.set(t, o)), t = {
					state: 0,
					props: D({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n)
				}, s && (s.length === 2 && ut(t.props, s), (a = a.preloads.stylesheets.get(e)) && 0 < a.length ? a.length = 0 : t.state = 1), o.sheets.set(e, t), jr(r));
			}
		} else U.S(e, t, n);
	}
	function ct(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.scriptResources.hasOwnProperty(e) ? r.scriptResources[e] : void 0;
				a !== null && (r.scriptResources[e] = null, t = D({
					src: e,
					async: !0
				}, t), a && (a.length === 2 && ut(t, a), e = i.preloads.scripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), Te(e, t), jr(n));
			}
		} else U.X(e, t);
	}
	function lt(e, t) {
		var n = In || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.moduleScriptResources.hasOwnProperty(e) ? r.moduleScriptResources[e] : void 0;
				a !== null && (r.moduleScriptResources[e] = null, t = D({
					src: e,
					type: "module",
					async: !0
				}, t), a && (a.length === 2 && ut(t, a), e = i.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), Te(e, t), jr(n));
			}
		} else U.M(e, t);
	}
	function ut(e, t) {
		e.crossOrigin ??= t[0], e.integrity ??= t[1];
	}
	function dt(e, t, n) {
		for (var r in e = ("" + e).replace(ft, pt), t = ("" + t).replace(mt, ht), t = "<" + e + ">; rel=preload; as=\"" + t + "\"", n) O.call(n, r) && (e = n[r], typeof e == "string" && (t += "; " + r.toLowerCase() + "=\"" + ("" + e).replace(mt, ht) + "\""));
		return t;
	}
	var ft = /[<>\r\n]/g;
	function pt(e) {
		switch (e) {
			case "<": return "%3C";
			case ">": return "%3E";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	var mt = /["';,\r\n]/g;
	function ht(e) {
		switch (e) {
			case "\"": return "%22";
			case "'": return "%27";
			case ";": return "%3B";
			case ",": return "%2C";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	function gt(e) {
		this.styles.add(e);
	}
	function _t(e) {
		this.stylesheets.add(e);
	}
	function vt(e, t) {
		t.styles.forEach(gt, e), t.stylesheets.forEach(_t, e), t.suspenseyImages && (e.suspenseyImages = !0);
	}
	function yt(e, t) {
		var n = e.idPrefix, r = [], i = e.bootstrapScriptContent, a = e.bootstrapScripts, o = e.bootstrapModules;
		i !== void 0 && (r.push("<script"), $e(r, e), r.push(">", ("" + i).replace(ne, re), "<\/script>")), i = n + "P:";
		var s = n + "S:";
		n += "B:";
		var c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), h = {
			images: /* @__PURE__ */ new Map(),
			stylesheets: /* @__PURE__ */ new Map(),
			scripts: /* @__PURE__ */ new Map(),
			moduleScripts: /* @__PURE__ */ new Map()
		};
		if (a !== void 0) for (var g = 0; g < a.length; g++) {
			var _ = a[g], v, y = void 0, b = void 0, x = {
				rel: "preload",
				as: "script",
				fetchPriority: "low",
				nonce: void 0
			};
			typeof _ == "string" ? x.href = v = _ : (x.href = v = _.src, x.integrity = b = typeof _.integrity == "string" ? _.integrity : void 0, x.crossOrigin = y = typeof _ == "string" || _.crossOrigin == null ? void 0 : _.crossOrigin === "use-credentials" ? "use-credentials" : ""), _ = e;
			var S = v;
			_.scriptResources[S] = null, _.moduleScriptResources[S] = null, _ = [], be(_, x), f.add(_), r.push("<script src=\"", I(v), "\""), typeof b == "string" && r.push(" integrity=\"", I(b), "\""), typeof y == "string" && r.push(" crossorigin=\"", I(y), "\""), $e(r, e), r.push(" async=\"\"><\/script>");
		}
		if (o !== void 0) for (a = 0; a < o.length; a++) x = o[a], y = v = void 0, b = {
			rel: "modulepreload",
			fetchPriority: "low",
			nonce: void 0
		}, typeof x == "string" ? b.href = g = x : (b.href = g = x.src, b.integrity = y = typeof x.integrity == "string" ? x.integrity : void 0, b.crossOrigin = v = typeof x == "string" || x.crossOrigin == null ? void 0 : x.crossOrigin === "use-credentials" ? "use-credentials" : ""), x = e, _ = g, x.scriptResources[_] = null, x.moduleScriptResources[_] = null, x = [], be(x, b), f.add(x), r.push("<script type=\"module\" src=\"", I(g), "\""), typeof y == "string" && r.push(" integrity=\"", I(y), "\""), typeof v == "string" && r.push(" crossorigin=\"", I(v), "\""), $e(r, e), r.push(" async=\"\"><\/script>");
		return {
			placeholderPrefix: i,
			segmentPrefix: s,
			boundaryPrefix: n,
			startInlineScript: "<script",
			startInlineStyle: "<style",
			preamble: {
				htmlChunks: null,
				headChunks: null,
				bodyChunks: null
			},
			externalRuntimeScript: null,
			bootstrapChunks: r,
			importMapChunks: [],
			onHeaders: void 0,
			headers: null,
			resets: {
				font: {},
				dns: {},
				connect: {
					default: {},
					anonymous: {},
					credentials: {}
				},
				image: {},
				style: {}
			},
			charsetChunks: [],
			viewportChunks: [],
			hoistableChunks: [],
			preconnects: c,
			fontPreloads: l,
			highImagePreloads: u,
			styles: d,
			bootstrapScripts: f,
			scripts: p,
			bulkPreloads: m,
			preloads: h,
			nonce: {
				script: void 0,
				style: void 0
			},
			stylesToHoist: !1,
			generateStaticMarkup: t
		};
	}
	function bt(e, t, n, r) {
		return n.generateStaticMarkup ? (e.push(I(t)), !1) : (t === "" ? e = r : (r && e.push("<!-- -->"), e.push(I(t)), e = !0), e);
	}
	function xt(e, t, n, r) {
		t.generateStaticMarkup || n && r && e.push("<!-- -->");
	}
	var St = Function.prototype.bind, Ct = Symbol.for("react.client.reference");
	function wt(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === Ct ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case o: return "Fragment";
			case c: return "Profiler";
			case s: return "StrictMode";
			case p: return "Suspense";
			case h: return "SuspenseList";
			case y: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case a: return "Portal";
			case d: return e.displayName || "Context";
			case l: return (e._context.displayName || "Context") + ".Consumer";
			case f:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case g: return t = e.displayName || null, t === null ? wt(e.type) || "Memo" : t;
			case _:
				t = e._payload, e = e._init;
				try {
					return wt(e(t));
				} catch {}
		}
		return null;
	}
	var Tt = {}, Et = null;
	function Dt(e, t) {
		if (e !== t) {
			e.context._currentValue2 = e.parentValue, e = e.parent;
			var n = t.parent;
			if (e === null) {
				if (n !== null) throw Error(r(401));
			} else {
				if (n === null) throw Error(r(401));
				Dt(e, n);
			}
			t.context._currentValue2 = t.value;
		}
	}
	function Ot(e) {
		e.context._currentValue2 = e.parentValue, e = e.parent, e !== null && Ot(e);
	}
	function kt(e) {
		var t = e.parent;
		t !== null && kt(t), e.context._currentValue2 = e.value;
	}
	function At(e, t) {
		if (e.context._currentValue2 = e.parentValue, e = e.parent, e === null) throw Error(r(402));
		e.depth === t.depth ? Dt(e, t) : At(e, t);
	}
	function jt(e, t) {
		var n = t.parent;
		if (n === null) throw Error(r(402));
		e.depth === n.depth ? Dt(e, n) : jt(e, n), t.context._currentValue2 = t.value;
	}
	function Mt(e) {
		var t = Et;
		t !== e && (t === null ? kt(e) : e === null ? Ot(t) : t.depth === e.depth ? Dt(t, e) : t.depth > e.depth ? At(t, e) : jt(t, e), Et = e);
	}
	var Nt = {
		enqueueSetState: function(e, t) {
			e = e._reactInternals, e.queue !== null && e.queue.push(t);
		},
		enqueueReplaceState: function(e, t) {
			e = e._reactInternals, e.replace = !0, e.queue = [t];
		},
		enqueueForceUpdate: function() {}
	}, Pt = {
		id: 1,
		overflow: ""
	};
	function Ft(e, t, n) {
		var r = e.id;
		e = e.overflow;
		var i = 32 - It(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - It(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			return a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, {
				id: 1 << 32 - It(t) + i | n << i | r,
				overflow: a + e
			};
		}
		return {
			id: 1 << a | n << i | r,
			overflow: e
		};
	}
	var It = Math.clz32 ? Math.clz32 : zt, Lt = Math.log, Rt = Math.LN2;
	function zt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Lt(e) / Rt | 0) | 0;
	}
	function Bt() {}
	var Vt = Error(r(460));
	function Ht(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Bt, Bt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw t.reason;
			default:
				switch (typeof t.status == "string" ? t.then(Bt, Bt) : (e = t, e.status = "pending", e.then(function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "fulfilled", n.value = e;
					}
				}, function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "rejected", n.reason = e;
					}
				})), t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw t.reason;
				}
				throw Ut = t, Vt;
		}
	}
	var Ut = null;
	function Wt() {
		if (Ut === null) throw Error(r(459));
		var e = Ut;
		return Ut = null, e;
	}
	function Gt(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Kt = typeof Object.is == "function" ? Object.is : Gt, qt = null, Jt = null, Yt = null, Xt = null, Zt = null, Y = null, Qt = !1, $t = !1, en = 0, tn = 0, nn = -1, rn = 0, an = null, on = null, sn = 0;
	function cn() {
		if (qt === null) throw Error(r(321));
		return qt;
	}
	function ln() {
		if (0 < sn) throw Error(r(312));
		return {
			memoizedState: null,
			queue: null,
			next: null
		};
	}
	function un() {
		return Y === null ? Zt === null ? (Qt = !1, Zt = Y = ln()) : (Qt = !0, Y = Zt) : Y.next === null ? (Qt = !1, Y = Y.next = ln()) : (Qt = !0, Y = Y.next), Y;
	}
	function dn() {
		var e = an;
		return an = null, e;
	}
	function fn() {
		Xt = Yt = Jt = qt = null, $t = !1, Zt = null, sn = 0, Y = on = null;
	}
	function pn(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function mn(e, t, n) {
		if (qt = cn(), Y = un(), Qt) {
			var r = Y.queue;
			if (t = r.dispatch, on !== null && (n = on.get(r), n !== void 0)) {
				on.delete(r), r = Y.memoizedState;
				do
					r = e(r, n.action), n = n.next;
				while (n !== null);
				return Y.memoizedState = r, [r, t];
			}
			return [Y.memoizedState, t];
		}
		return e = e === pn ? typeof t == "function" ? t() : t : n === void 0 ? t : n(t), Y.memoizedState = e, e = Y.queue = {
			last: null,
			dispatch: null
		}, e = e.dispatch = gn.bind(null, qt, e), [Y.memoizedState, e];
	}
	function hn(e, t) {
		if (qt = cn(), Y = un(), t = t === void 0 ? null : t, Y !== null) {
			var n = Y.memoizedState;
			if (n !== null && t !== null) {
				var r = n[1];
				a: if (r === null) r = !1;
				else {
					for (var i = 0; i < r.length && i < t.length; i++) if (!Kt(t[i], r[i])) {
						r = !1;
						break a;
					}
					r = !0;
				}
				if (r) return n[0];
			}
		}
		return e = e(), Y.memoizedState = [e, t], e;
	}
	function gn(e, t, n) {
		if (25 <= sn) throw Error(r(301));
		if (e === qt) if ($t = !0, e = {
			action: n,
			next: null
		}, on === null && (on = /* @__PURE__ */ new Map()), n = on.get(t), n === void 0) on.set(t, e);
		else {
			for (t = n; t.next !== null;) t = t.next;
			t.next = e;
		}
	}
	function _n() {
		throw Error(r(440));
	}
	function vn() {
		throw Error(r(394));
	}
	function yn() {
		throw Error(r(479));
	}
	function bn(e, t, n) {
		cn();
		var r = tn++, i = Yt;
		if (typeof e.$$FORM_ACTION == "function") {
			var a = null, o = Xt;
			i = i.formState;
			var s = e.$$IS_SIGNATURE_EQUAL;
			if (i !== null && typeof s == "function") {
				var c = i[1];
				s.call(e, i[2], i[3]) && (a = n === void 0 ? "k" + E(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n, c === a && (nn = r, t = i[0]));
			}
			var l = e.bind(null, t);
			return e = function(e) {
				l(e);
			}, typeof l.$$FORM_ACTION == "function" && (e.$$FORM_ACTION = function(e) {
				e = l.$$FORM_ACTION(e), n !== void 0 && (n += "", e.action = n);
				var t = e.data;
				return t && (a === null && (a = n === void 0 ? "k" + E(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n), t.append("$ACTION_KEY", a)), e;
			}), [
				t,
				e,
				!1
			];
		}
		var u = e.bind(null, t);
		return [
			t,
			function(e) {
				u(e);
			},
			!1
		];
	}
	function xn(e) {
		var t = rn;
		return rn += 1, an === null && (an = []), Ht(an, e, t);
	}
	function Sn() {
		throw Error(r(393));
	}
	var Cn = {
		readContext: function(e) {
			return e._currentValue2;
		},
		use: function(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return xn(e);
				if (e.$$typeof === d) return e._currentValue2;
			}
			throw Error(r(438, String(e)));
		},
		useContext: function(e) {
			return cn(), e._currentValue2;
		},
		useMemo: hn,
		useReducer: mn,
		useRef: function(e) {
			qt = cn(), Y = un();
			var t = Y.memoizedState;
			return t === null ? (e = { current: e }, Y.memoizedState = e) : t;
		},
		useState: function(e) {
			return mn(pn, e);
		},
		useInsertionEffect: Bt,
		useLayoutEffect: Bt,
		useCallback: function(e, t) {
			return hn(function() {
				return e;
			}, t);
		},
		useImperativeHandle: Bt,
		useEffect: Bt,
		useDebugValue: Bt,
		useDeferredValue: function(e, t) {
			return cn(), t === void 0 ? e : t;
		},
		useTransition: function() {
			return cn(), [!1, vn];
		},
		useId: function() {
			var e = Jt.treeContext, t = e.overflow;
			e = e.id, e = (e & ~(1 << 32 - It(e) - 1)).toString(32) + t;
			var n = wn;
			if (n === null) throw Error(r(404));
			return t = en++, e = "_" + n.idPrefix + "R_" + e, 0 < t && (e += "H" + t.toString(32)), e + "_";
		},
		useSyncExternalStore: function(e, t, n) {
			if (n === void 0) throw Error(r(407));
			return n();
		},
		useOptimistic: function(e) {
			return cn(), [e, yn];
		},
		useActionState: bn,
		useFormState: bn,
		useHostTransitionStatus: function() {
			return cn(), H;
		},
		useMemoCache: function(e) {
			for (var t = Array(e), n = 0; n < e; n++) t[n] = x;
			return t;
		},
		useCacheRefresh: function() {
			return Sn;
		},
		useEffectEvent: function() {
			return _n;
		}
	}, wn = null, Tn = {
		getCacheForType: function() {
			throw Error(r(248));
		},
		cacheSignal: function() {
			throw Error(r(248));
		}
	}, En, Dn;
	function On(e) {
		if (En === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			En = t && t[1] || "", Dn = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + En + e + Dn;
	}
	var kn = !1;
	function An(e, t) {
		if (!e || kn) return "";
		kn = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			kn = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? On(n) : "";
	}
	function jn(e) {
		if (typeof e == "string") return On(e);
		if (typeof e == "function") return e.prototype && e.prototype.isReactComponent ? An(e, !0) : An(e, !1);
		if (typeof e == "object" && e) {
			switch (e.$$typeof) {
				case f: return An(e.render, !1);
				case g: return An(e.type, !1);
				case _:
					var t = e, n = t._payload;
					t = t._init;
					try {
						e = t(n);
					} catch {
						return On("Lazy");
					}
					return jn(e);
			}
			if (typeof e.name == "string") {
				a: {
					n = e.name, t = e.env;
					var r = e.debugLocation;
					if (r != null && (e = Error.prepareStackTrace, Error.prepareStackTrace = void 0, r = r.stack, Error.prepareStackTrace = e, r.startsWith("Error: react-stack-top-frame\n") && (r = r.slice(29)), e = r.indexOf("\n"), e !== -1 && (r = r.slice(e + 1)), e = r.indexOf("react_stack_bottom_frame"), e !== -1 && (e = r.lastIndexOf("\n", e)), e = e === -1 ? "" : r = r.slice(0, e), r = e.lastIndexOf("\n"), e = r === -1 ? e : e.slice(r + 1), e.indexOf(n) !== -1)) {
						n = "\n" + e;
						break a;
					}
					n = On(n + (t ? " [" + t + "]" : ""));
				}
				return n;
			}
		}
		switch (e) {
			case h: return On("SuspenseList");
			case p: return On("Suspense");
		}
		return "";
	}
	function Mn(e, t) {
		return (500 < t.byteSize || !1) && t.contentPreamble === null;
	}
	function Nn(e) {
		if (typeof e == "object" && e && typeof e.environmentName == "string") {
			var t = e.environmentName;
			e = [e].slice(0), typeof e[0] == "string" ? e.splice(0, 1, "[%s] " + e[0], " " + t + " ") : e.splice(0, 0, "[%s]", " " + t + " "), e.unshift(console), t = St.apply(console.error, e), t();
		} else console.error(e);
		return null;
	}
	function Pn(e, t, n, r, i, a, o, s, c, l, u) {
		var d = /* @__PURE__ */ new Set();
		this.destination = null, this.flushScheduled = !1, this.resumableState = e, this.renderState = t, this.rootFormatContext = n, this.progressiveChunkSize = r === void 0 ? 12800 : r, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = d, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = i === void 0 ? Nn : i, this.onPostpone = l === void 0 ? Bt : l, this.onAllReady = a === void 0 ? Bt : a, this.onShellReady = o === void 0 ? Bt : o, this.onShellError = s === void 0 ? Bt : s, this.onFatalError = c === void 0 ? Bt : c, this.formState = u === void 0 ? null : u;
	}
	function Fn(e, t, n, r, i, a, o, s, c, l, u, d) {
		return t = new Pn(t, n, r, i, a, o, s, c, l, u, d), n = Vn(t, 0, null, r, !1, !1), n.parentFlushed = !0, e = zn(t, null, e, -1, null, n, null, null, t.abortableTasks, null, r, null, Pt, null, null), Hn(e), t.pingedTasks.push(e), t;
	}
	var In = null;
	function Ln(e, t) {
		e.pingedTasks.push(t), e.pingedTasks.length === 1 && (e.flushScheduled = e.destination !== null, yr(e));
	}
	function Rn(e, t, n, r, i) {
		return n = {
			status: 0,
			rootSegmentID: -1,
			parentFlushed: !1,
			pendingTasks: 0,
			row: t,
			completedSegments: [],
			byteSize: 0,
			fallbackAbortableTasks: n,
			errorDigest: null,
			contentState: nt(),
			fallbackState: nt(),
			contentPreamble: r,
			fallbackPreamble: i,
			trackedContentKeyPath: null,
			trackedFallbackNode: null
		}, t !== null && (t.pendingTasks++, r = t.boundaries, r !== null && (e.allPendingTasks++, n.pendingTasks++, r.push(n)), e = t.inheritedHoistables, e !== null && vt(n.contentState, e)), n;
	}
	function zn(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
		e.allPendingTasks++, i === null ? e.pendingRootTasks++ : i.pendingTasks++, p !== null && p.pendingTasks++;
		var h = {
			replay: null,
			node: n,
			childIndex: r,
			ping: function() {
				return Ln(e, h);
			},
			blockedBoundary: i,
			blockedSegment: a,
			blockedPreamble: o,
			hoistableState: s,
			abortSet: c,
			keyPath: l,
			formatContext: u,
			context: d,
			treeContext: f,
			row: p,
			componentStack: m,
			thenableState: t
		};
		return c.add(h), h;
	}
	function Bn(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.allPendingTasks++, a === null ? e.pendingRootTasks++ : a.pendingTasks++, f !== null && f.pendingTasks++, n.pendingTasks++;
		var m = {
			replay: n,
			node: r,
			childIndex: i,
			ping: function() {
				return Ln(e, m);
			},
			blockedBoundary: a,
			blockedSegment: null,
			blockedPreamble: null,
			hoistableState: o,
			abortSet: s,
			keyPath: c,
			formatContext: l,
			context: u,
			treeContext: d,
			row: f,
			componentStack: p,
			thenableState: t
		};
		return s.add(m), m;
	}
	function Vn(e, t, n, r, i, a) {
		return {
			status: 0,
			parentFlushed: !1,
			id: -1,
			index: t,
			chunks: [],
			children: [],
			preambleChildren: [],
			parentFormatContext: r,
			boundary: n,
			lastPushedText: i,
			textEmbedded: a
		};
	}
	function Hn(e) {
		var t = e.node;
		if (typeof t == "object" && t) switch (t.$$typeof) {
			case i: e.componentStack = {
				parent: e.componentStack,
				type: t.type
			};
		}
	}
	function Un(e) {
		return e === null ? null : {
			parent: e.parent,
			type: "Suspense Fallback"
		};
	}
	function Wn(e) {
		var t = {};
		return e && Object.defineProperty(t, "componentStack", {
			configurable: !0,
			enumerable: !0,
			get: function() {
				try {
					var n = "", r = e;
					do
						n += jn(r.type), r = r.parent;
					while (r);
					var i = n;
				} catch (e) {
					i = "\nError generating stack: " + e.message + "\n" + e.stack;
				}
				return Object.defineProperty(t, "componentStack", { value: i }), i;
			}
		}), t;
	}
	function Gn(e, t, n) {
		if (e = e.onError, t = e(t, n), t == null || typeof t == "string") return t;
	}
	function Kn(e, t) {
		var n = e.onShellError, r = e.onFatalError;
		n(t), r(t), e.destination === null ? (e.status = 13, e.fatalError = t) : (e.status = 14, e.destination.destroy(t));
	}
	function qn(e, t) {
		Jn(e, t.next, t.hoistables);
	}
	function Jn(e, t, n) {
		for (; t !== null;) {
			n !== null && (vt(t.hoistables, n), t.inheritedHoistables = n);
			var r = t.boundaries;
			if (r !== null) {
				t.boundaries = null;
				for (var i = 0; i < r.length; i++) {
					var a = r[i];
					n !== null && vt(a.contentState, n), vr(e, a, null, null);
				}
			}
			if (t.pendingTasks--, 0 < t.pendingTasks) break;
			n = t.hoistables, t = t.next;
		}
	}
	function Yn(e, t) {
		var n = t.boundaries;
		if (n !== null && t.pendingTasks === n.length) {
			for (var r = !0, i = 0; i < n.length; i++) {
				var a = n[i];
				if (a.pendingTasks !== 1 || a.parentFlushed || Mn(e, a)) {
					r = !1;
					break;
				}
			}
			r && Jn(e, t, t.hoistables);
		}
	}
	function Xn(e) {
		var t = {
			pendingTasks: 1,
			boundaries: null,
			hoistables: nt(),
			inheritedHoistables: null,
			together: !1,
			next: null
		};
		return e !== null && 0 < e.pendingTasks && (t.pendingTasks++, t.boundaries = [], e.next = t), t;
	}
	function Zn(e, t, n, r, i) {
		var a = t.keyPath, o = t.treeContext, s = t.row;
		t.keyPath = n, n = r.length;
		var c = null;
		if (t.replay !== null) {
			var l = t.replay.slots;
			if (typeof l == "object" && l) for (var u = 0; u < n; u++) {
				var d = i !== "backwards" && i !== "unstable_legacy-backwards" ? u : n - 1 - u, f = r[d];
				t.row = c = Xn(c), t.treeContext = Ft(o, n, d);
				var p = l[d];
				typeof p == "number" ? (tr(e, t, p, f, d), delete l[d]) : ur(e, t, f, d), --c.pendingTasks === 0 && qn(e, c);
			}
			else for (l = 0; l < n; l++) u = i !== "backwards" && i !== "unstable_legacy-backwards" ? l : n - 1 - l, d = r[u], t.row = c = Xn(c), t.treeContext = Ft(o, n, u), ur(e, t, d, u), --c.pendingTasks === 0 && qn(e, c);
		} else if (i !== "backwards" && i !== "unstable_legacy-backwards") for (i = 0; i < n; i++) l = r[i], t.row = c = Xn(c), t.treeContext = Ft(o, n, i), ur(e, t, l, i), --c.pendingTasks === 0 && qn(e, c);
		else {
			for (i = t.blockedSegment, l = i.children.length, u = i.chunks.length, d = n - 1; 0 <= d; d--) {
				f = r[d], t.row = c = Xn(c), t.treeContext = Ft(o, n, d), p = Vn(e, u, null, t.formatContext, d === 0 ? i.lastPushedText : !0, !0), i.children.splice(l, 0, p), t.blockedSegment = p;
				try {
					ur(e, t, f, d), xt(p.chunks, e.renderState, p.lastPushedText, p.textEmbedded), p.status = 1, --c.pendingTasks === 0 && qn(e, c);
				} catch (t) {
					throw p.status = e.status === 12 ? 3 : 4, t;
				}
			}
			t.blockedSegment = i, i.lastPushedText = !1;
		}
		s !== null && c !== null && 0 < c.pendingTasks && (s.pendingTasks++, c.next = s), t.treeContext = o, t.row = s, t.keyPath = a;
	}
	function Qn(e, t, n, r, i, a) {
		var o = t.thenableState;
		for (t.thenableState = null, qt = {}, Jt = t, Yt = e, Xt = n, tn = en = 0, nn = -1, rn = 0, an = o, e = r(i, a); $t;) $t = !1, tn = en = 0, nn = -1, rn = 0, sn += 1, Y = null, e = r(i, a);
		return fn(), e;
	}
	function $n(e, t, n, r, i, a, o) {
		var s = !1;
		if (a !== 0 && e.formState !== null) {
			var c = t.blockedSegment;
			if (c !== null) {
				s = !0, c = c.chunks;
				for (var l = 0; l < a; l++) l === o ? c.push("<!--F!-->") : c.push("<!--F-->");
			}
		}
		a = t.keyPath, t.keyPath = n, i ? (n = t.treeContext, t.treeContext = Ft(n, 1, 0), ur(e, t, r, -1), t.treeContext = n) : s ? ur(e, t, r, -1) : nr(e, t, r, -1), t.keyPath = a;
	}
	function er(e, t, n, i, a, u) {
		if (typeof i == "function") if (i.prototype && i.prototype.isReactComponent) {
			var m = a;
			if ("ref" in a) for (var x in m = {}, a) x !== "ref" && (m[x] = a[x]);
			var C = i.defaultProps;
			if (C) for (var E in m === a && (m = D({}, m, a)), C) m[E] === void 0 && (m[E] = C[E]);
			a = m, m = Tt, C = i.contextType, typeof C == "object" && C && (m = C._currentValue2), m = new i(a, m);
			var O = m.state === void 0 ? null : m.state;
			if (m.updater = Nt, m.props = a, m.state = O, C = {
				queue: [],
				replace: !1
			}, m._reactInternals = C, u = i.contextType, m.context = typeof u == "object" && u ? u._currentValue2 : Tt, u = i.getDerivedStateFromProps, typeof u == "function" && (u = u(a, O), O = u == null ? O : D({}, O, u), m.state = O), typeof i.getDerivedStateFromProps != "function" && typeof m.getSnapshotBeforeUpdate != "function" && (typeof m.UNSAFE_componentWillMount == "function" || typeof m.componentWillMount == "function")) if (i = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), i !== m.state && Nt.enqueueReplaceState(m, m.state, null), C.queue !== null && 0 < C.queue.length) if (i = C.queue, u = C.replace, C.queue = null, C.replace = !1, u && i.length === 1) m.state = i[0];
			else {
				for (C = u ? i[0] : m.state, O = !0, u = +!!u; u < i.length; u++) E = i[u], E = typeof E == "function" ? E.call(m, C, a, void 0) : E, E != null && (O ? (O = !1, C = D({}, C, E)) : D(C, E));
				m.state = C;
			}
			else C.queue = null;
			if (i = m.render(), e.status === 12) throw null;
			a = t.keyPath, t.keyPath = n, nr(e, t, i, -1), t.keyPath = a;
		} else {
			if (i = Qn(e, t, n, i, a, void 0), e.status === 12) throw null;
			$n(e, t, n, i, en !== 0, tn, nn);
		}
		else if (typeof i == "string") if (m = t.blockedSegment, m === null) m = a.children, C = t.formatContext, O = t.keyPath, t.formatContext = ae(C, i, a), t.keyPath = n, ur(e, t, m, -1), t.formatContext = C, t.keyPath = O;
		else {
			if (O = je(m.chunks, i, a, e.resumableState, e.renderState, t.blockedPreamble, t.hoistableState, t.formatContext, m.lastPushedText), m.lastPushedText = !1, C = t.formatContext, u = t.keyPath, t.keyPath = n, (t.formatContext = ae(C, i, a)).insertionMode === 3) {
				n = Vn(e, 0, null, t.formatContext, !1, !1), m.preambleChildren.push(n), t.blockedSegment = n;
				try {
					n.status = 6, ur(e, t, O, -1), xt(n.chunks, e.renderState, n.lastPushedText, n.textEmbedded), n.status = 1;
				} finally {
					t.blockedSegment = m;
				}
			} else ur(e, t, O, -1);
			t.formatContext = C, t.keyPath = u;
			a: {
				switch (t = m.chunks, e = e.resumableState, i) {
					case "title":
					case "style":
					case "script":
					case "area":
					case "base":
					case "br":
					case "col":
					case "embed":
					case "hr":
					case "img":
					case "input":
					case "keygen":
					case "link":
					case "meta":
					case "param":
					case "source":
					case "track":
					case "wbr": break a;
					case "body":
						if (1 >= C.insertionMode) {
							e.hasBody = !0;
							break a;
						}
						break;
					case "html":
						if (C.insertionMode === 0) {
							e.hasHtml = !0;
							break a;
						}
						break;
					case "head": if (1 >= C.insertionMode) break a;
				}
				t.push(Ne(i));
			}
			m.lastPushedText = !1;
		}
		else {
			switch (i) {
				case b:
				case s:
				case c:
				case o:
					i = t.keyPath, t.keyPath = n, nr(e, t, a.children, -1), t.keyPath = i;
					return;
				case y:
					i = t.blockedSegment, i === null ? a.mode !== "hidden" && (i = t.keyPath, t.keyPath = n, ur(e, t, a.children, -1), t.keyPath = i) : a.mode !== "hidden" && (e.renderState.generateStaticMarkup || i.chunks.push("<!--&-->"), i.lastPushedText = !1, m = t.keyPath, t.keyPath = n, ur(e, t, a.children, -1), t.keyPath = m, e.renderState.generateStaticMarkup || i.chunks.push("<!--/&-->"), i.lastPushedText = !1);
					return;
				case h:
					a: {
						if (i = a.children, a = a.revealOrder, a === "forwards" || a === "backwards" || a === "unstable_legacy-backwards") {
							if (T(i)) {
								Zn(e, t, n, i, a);
								break a;
							}
							if ((m = w(i)) && (m = m.call(i))) {
								if (C = m.next(), !C.done) {
									do
										C = m.next();
									while (!C.done);
									Zn(e, t, n, i, a);
								}
								break a;
							}
						}
						a === "together" ? (a = t.keyPath, m = t.row, C = t.row = Xn(null), C.boundaries = [], C.together = !0, t.keyPath = n, nr(e, t, i, -1), --C.pendingTasks === 0 && qn(e, C), t.keyPath = a, t.row = m, m !== null && 0 < C.pendingTasks && (m.pendingTasks++, C.next = m)) : (a = t.keyPath, t.keyPath = n, nr(e, t, i, -1), t.keyPath = a);
					}
					return;
				case S:
				case v: throw Error(r(343));
				case p:
					a: if (t.replay !== null) {
						i = t.keyPath, m = t.formatContext, C = t.row, t.keyPath = n, t.formatContext = se(e.resumableState, m), t.row = null, n = a.children;
						try {
							ur(e, t, n, -1);
						} finally {
							t.keyPath = i, t.formatContext = m, t.row = C;
						}
					} else {
						i = t.keyPath, u = t.formatContext;
						var k = t.row, A = t.blockedBoundary;
						E = t.blockedPreamble;
						var j = t.hoistableState;
						x = t.blockedSegment;
						var M = a.fallback;
						a = a.children;
						var N = /* @__PURE__ */ new Set(), P = Rn(e, t.row, N, null, null);
						e.trackedPostpones !== null && (P.trackedContentKeyPath = n);
						var F = Vn(e, x.chunks.length, P, t.formatContext, !1, !1);
						x.children.push(F), x.lastPushedText = !1;
						var I = Vn(e, 0, null, t.formatContext, !1, !1);
						if (I.parentFlushed = !0, e.trackedPostpones !== null) {
							m = t.componentStack, C = [
								n[0],
								"Suspense Fallback",
								n[2]
							], O = [
								C[1],
								C[2],
								[],
								null
							], e.trackedPostpones.workingMap.set(C, O), P.trackedFallbackNode = O, t.blockedSegment = F, t.blockedPreamble = P.fallbackPreamble, t.keyPath = C, t.formatContext = oe(e.resumableState, u), t.componentStack = Un(m), F.status = 6;
							try {
								ur(e, t, M, -1), xt(F.chunks, e.renderState, F.lastPushedText, F.textEmbedded), F.status = 1;
							} catch (t) {
								throw F.status = e.status === 12 ? 3 : 4, t;
							} finally {
								t.blockedSegment = x, t.blockedPreamble = E, t.keyPath = i, t.formatContext = u;
							}
							t = zn(e, null, a, -1, P, I, P.contentPreamble, P.contentState, t.abortSet, n, se(e.resumableState, t.formatContext), t.context, t.treeContext, null, m), Hn(t), e.pingedTasks.push(t);
						} else {
							t.blockedBoundary = P, t.blockedPreamble = P.contentPreamble, t.hoistableState = P.contentState, t.blockedSegment = I, t.keyPath = n, t.formatContext = se(e.resumableState, u), t.row = null, I.status = 6;
							try {
								if (ur(e, t, a, -1), xt(I.chunks, e.renderState, I.lastPushedText, I.textEmbedded), I.status = 1, _r(P, I), P.pendingTasks === 0 && P.status === 0) {
									if (P.status = 1, !Mn(e, P)) {
										k !== null && --k.pendingTasks === 0 && qn(e, k), e.pendingRootTasks === 0 && t.blockedPreamble && Sr(e);
										break a;
									}
								} else k !== null && k.together && Yn(e, k);
							} catch (n) {
								P.status = 4, e.status === 12 ? (I.status = 3, m = e.fatalError) : (I.status = 4, m = n), C = Wn(t.componentStack), O = Gn(e, m, C), P.errorDigest = O, sr(e, P);
							} finally {
								t.blockedBoundary = A, t.blockedPreamble = E, t.hoistableState = j, t.blockedSegment = x, t.keyPath = i, t.formatContext = u, t.row = k;
							}
							t = zn(e, null, M, -1, A, F, P.fallbackPreamble, P.fallbackState, N, [
								n[0],
								"Suspense Fallback",
								n[2]
							], oe(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, Un(t.componentStack)), Hn(t), e.pingedTasks.push(t);
						}
					}
					return;
			}
			if (typeof i == "object" && i) switch (i.$$typeof) {
				case f:
					if ("ref" in a) for (M in m = {}, a) M !== "ref" && (m[M] = a[M]);
					else m = a;
					i = Qn(e, t, n, i.render, m, u), $n(e, t, n, i, en !== 0, tn, nn);
					return;
				case g:
					er(e, t, n, i.type, a, u);
					return;
				case d:
					if (C = a.children, m = t.keyPath, a = a.value, O = i._currentValue2, i._currentValue2 = a, u = Et, Et = i = {
						parent: u,
						depth: u === null ? 0 : u.depth + 1,
						context: i,
						parentValue: O,
						value: a
					}, t.context = i, t.keyPath = n, nr(e, t, C, -1), e = Et, e === null) throw Error(r(403));
					e.context._currentValue2 = e.parentValue, e = Et = e.parent, t.context = e, t.keyPath = m;
					return;
				case l:
					a = a.children, i = a(i._context._currentValue2), a = t.keyPath, t.keyPath = n, nr(e, t, i, -1), t.keyPath = a;
					return;
				case _:
					if (m = i._init, i = m(i._payload), e.status === 12) throw null;
					er(e, t, n, i, a, u);
					return;
			}
			throw Error(r(130, i == null ? i : typeof i, ""));
		}
	}
	function tr(e, t, n, r, i) {
		var a = t.replay, o = t.blockedBoundary, s = Vn(e, 0, null, t.formatContext, !1, !1);
		s.id = n, s.parentFlushed = !0;
		try {
			t.replay = null, t.blockedSegment = s, ur(e, t, r, i), s.status = 1, o === null ? e.completedRootSegment = s : (_r(o, s), o.parentFlushed && e.partialBoundaries.push(o));
		} finally {
			t.replay = a, t.blockedSegment = null;
		}
	}
	function nr(e, t, n, r) {
		t.replay !== null && typeof t.replay.slots == "number" ? tr(e, t, t.replay.slots, n, r) : (t.node = n, t.childIndex = r, n = t.componentStack, Hn(t), rr(e, t), t.componentStack = n);
	}
	function rr(e, t) {
		var n = t.node, o = t.childIndex;
		if (n !== null) {
			if (typeof n == "object") {
				switch (n.$$typeof) {
					case i:
						var s = n.type, c = n.key, l = n.props;
						n = l.ref;
						var u = n === void 0 ? null : n, f = wt(s), m = c ?? (o === -1 ? 0 : o);
						if (c = [
							t.keyPath,
							f,
							m
						], t.replay !== null) a: {
							var h = t.replay;
							for (o = h.nodes, n = 0; n < o.length; n++) {
								var g = o[n];
								if (m === g[1]) {
									if (g.length === 4) {
										if (f !== null && f !== g[0]) throw Error(r(490, g[0], f));
										var v = g[2];
										f = g[3], m = t.node, t.replay = {
											nodes: v,
											slots: f,
											pendingTasks: 1
										};
										try {
											if (er(e, t, c, s, l, u), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
											t.replay.pendingTasks--;
										} catch (r) {
											if (typeof r == "object" && r && (r === Vt || typeof r.then == "function")) throw t.node === m ? t.replay = h : o.splice(n, 1), r;
											t.replay.pendingTasks--, l = Wn(t.componentStack), c = e, e = t.blockedBoundary, s = r, l = Gn(c, s, l), fr(c, e, v, f, s, l);
										}
										t.replay = h;
									} else {
										if (s !== p) throw Error(r(490, "Suspense", wt(s) || "Unknown"));
										b: {
											h = void 0, s = g[5], u = g[2], f = g[3], m = g[4] === null ? [] : g[4][2], g = g[4] === null ? null : g[4][3];
											var y = t.keyPath, b = t.formatContext, x = t.row, S = t.replay, C = t.blockedBoundary, E = t.hoistableState, D = l.children, O = l.fallback, k = /* @__PURE__ */ new Set();
											l = Rn(e, t.row, k, null, null), l.parentFlushed = !0, l.rootSegmentID = s, t.blockedBoundary = l, t.hoistableState = l.contentState, t.keyPath = c, t.formatContext = se(e.resumableState, b), t.row = null, t.replay = {
												nodes: u,
												slots: f,
												pendingTasks: 1
											};
											try {
												if (ur(e, t, D, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
												if (t.replay.pendingTasks--, l.pendingTasks === 0 && l.status === 0) {
													l.status = 1, e.completedBoundaries.push(l);
													break b;
												}
											} catch (n) {
												l.status = 4, v = Wn(t.componentStack), h = Gn(e, n, v), l.errorDigest = h, t.replay.pendingTasks--, e.clientRenderedBoundaries.push(l);
											} finally {
												t.blockedBoundary = C, t.hoistableState = E, t.replay = S, t.keyPath = y, t.formatContext = b, t.row = x;
											}
											v = Bn(e, null, {
												nodes: m,
												slots: g,
												pendingTasks: 0
											}, O, -1, C, l.fallbackState, k, [
												c[0],
												"Suspense Fallback",
												c[2]
											], oe(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, Un(t.componentStack)), Hn(v), e.pingedTasks.push(v);
										}
									}
									o.splice(n, 1);
									break a;
								}
							}
						}
						else er(e, t, c, s, l, u);
						return;
					case a: throw Error(r(257));
					case _:
						if (v = n._init, n = v(n._payload), e.status === 12) throw null;
						nr(e, t, n, o);
						return;
				}
				if (T(n)) {
					ir(e, t, n, o);
					return;
				}
				if ((v = w(n)) && (v = v.call(n))) {
					if (n = v.next(), !n.done) {
						l = [];
						do
							l.push(n.value), n = v.next();
						while (!n.done);
						ir(e, t, l, o);
					}
					return;
				}
				if (typeof n.then == "function") return t.thenableState = null, nr(e, t, xn(n), o);
				if (n.$$typeof === d) return nr(e, t, n._currentValue2, o);
				throw o = Object.prototype.toString.call(n), Error(r(31, o === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : o));
			}
			typeof n == "string" ? (o = t.blockedSegment, o !== null && (o.lastPushedText = bt(o.chunks, n, e.renderState, o.lastPushedText))) : (typeof n == "number" || typeof n == "bigint") && (o = t.blockedSegment, o !== null && (o.lastPushedText = bt(o.chunks, "" + n, e.renderState, o.lastPushedText)));
		}
	}
	function ir(e, t, n, i) {
		var a = t.keyPath;
		if (i !== -1 && (t.keyPath = [
			t.keyPath,
			"Fragment",
			i
		], t.replay !== null)) {
			for (var o = t.replay, s = o.nodes, c = 0; c < s.length; c++) {
				var l = s[c];
				if (l[1] === i) {
					i = l[2], l = l[3], t.replay = {
						nodes: i,
						slots: l,
						pendingTasks: 1
					};
					try {
						if (ir(e, t, n, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
						t.replay.pendingTasks--;
					} catch (r) {
						if (typeof r == "object" && r && (r === Vt || typeof r.then == "function")) throw r;
						t.replay.pendingTasks--, n = Wn(t.componentStack);
						var u = t.blockedBoundary, d = r;
						n = Gn(e, d, n), fr(e, u, i, l, d, n);
					}
					t.replay = o, s.splice(c, 1);
					break;
				}
			}
			t.keyPath = a;
			return;
		}
		if (o = t.treeContext, s = n.length, t.replay !== null && (c = t.replay.slots, typeof c == "object" && c)) {
			for (i = 0; i < s; i++) l = n[i], t.treeContext = Ft(o, s, i), u = c[i], typeof u == "number" ? (tr(e, t, u, l, i), delete c[i]) : ur(e, t, l, i);
			t.treeContext = o, t.keyPath = a;
			return;
		}
		for (c = 0; c < s; c++) i = n[c], t.treeContext = Ft(o, s, c), ur(e, t, i, c);
		t.treeContext = o, t.keyPath = a;
	}
	function ar(e, t, n) {
		if (n.status = 5, n.rootSegmentID = e.nextSegmentId++, e = n.trackedContentKeyPath, e === null) throw Error(r(486));
		var i = n.trackedFallbackNode, a = [], o = t.workingMap.get(e);
		return o === void 0 ? (n = [
			e[1],
			e[2],
			a,
			null,
			i,
			n.rootSegmentID
		], t.workingMap.set(e, n), Pr(n, e[0], t), n) : (o[4] = i, o[5] = n.rootSegmentID, o);
	}
	function or(e, t, n, i) {
		i.status = 5;
		var a = n.keyPath, o = n.blockedBoundary;
		if (o === null) i.id = e.nextSegmentId++, t.rootSlots = i.id, e.completedRootSegment !== null && (e.completedRootSegment.status = 5);
		else {
			if (o !== null && o.status === 0) {
				var s = ar(e, t, o);
				if (o.trackedContentKeyPath === a && n.childIndex === -1) {
					i.id === -1 && (i.id = i.parentFlushed ? o.rootSegmentID : e.nextSegmentId++), s[3] = i.id;
					return;
				}
			}
			if (i.id === -1 && (i.id = i.parentFlushed && o !== null ? o.rootSegmentID : e.nextSegmentId++), n.childIndex === -1) a === null ? t.rootSlots = i.id : (n = t.workingMap.get(a), n === void 0 ? (n = [
				a[1],
				a[2],
				[],
				i.id
			], Pr(n, a[0], t)) : n[3] = i.id);
			else {
				if (a === null) {
					if (e = t.rootSlots, e === null) e = t.rootSlots = {};
					else if (typeof e == "number") throw Error(r(491));
				} else if (o = t.workingMap, s = o.get(a), s === void 0) e = {}, s = [
					a[1],
					a[2],
					[],
					e
				], o.set(a, s), Pr(s, a[0], t);
				else if (e = s[3], e === null) e = s[3] = {};
				else if (typeof e == "number") throw Error(r(491));
				e[n.childIndex] = i.id;
			}
		}
	}
	function sr(e, t) {
		e = e.trackedPostpones, e !== null && (t = t.trackedContentKeyPath, t !== null && (t = e.workingMap.get(t), t !== void 0 && (t.length = 4, t[2] = [], t[3] = null)));
	}
	function cr(e, t, n) {
		return Bn(e, n, t.replay, t.node, t.childIndex, t.blockedBoundary, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function lr(e, t, n) {
		var r = t.blockedSegment, i = Vn(e, r.chunks.length, null, t.formatContext, r.lastPushedText, !0);
		return r.children.push(i), r.lastPushedText = !1, zn(e, n, t.node, t.childIndex, t.blockedBoundary, i, t.blockedPreamble, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function ur(e, t, n, r) {
		var i = t.formatContext, a = t.context, o = t.keyPath, s = t.treeContext, c = t.componentStack, l = t.blockedSegment;
		if (l === null) {
			l = t.replay;
			try {
				return nr(e, t, n, r);
			} catch (u) {
				if (fn(), n = u === Vt ? Wt() : u, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						r = u === Vt ? dn() : null, e = cr(e, t, r).ping, n.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, Mt(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						n = u === Vt ? dn() : null, n = cr(e, t, n), e.pingedTasks.push(n), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, Mt(a);
						return;
					}
				}
			}
		} else {
			var u = l.children.length, d = l.chunks.length;
			try {
				return nr(e, t, n, r);
			} catch (r) {
				if (fn(), l.children.length = u, l.chunks.length = d, n = r === Vt ? Wt() : r, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						l = n, n = r === Vt ? dn() : null, e = lr(e, t, n).ping, l.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, Mt(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						l = r === Vt ? dn() : null, l = lr(e, t, l), e.pingedTasks.push(l), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, Mt(a);
						return;
					}
				}
			}
		}
		throw t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, Mt(a), n;
	}
	function dr(e) {
		var t = e.blockedBoundary, n = e.blockedSegment;
		n !== null && (n.status = 3, vr(this, t, e.row, n));
	}
	function fr(e, t, n, i, a, o) {
		for (var s = 0; s < n.length; s++) {
			var c = n[s];
			if (c.length === 4) fr(e, t, c[2], c[3], a, o);
			else {
				c = c[5];
				var l = e, u = o, d = Rn(l, null, /* @__PURE__ */ new Set(), null, null);
				d.parentFlushed = !0, d.rootSegmentID = c, d.status = 4, d.errorDigest = u, d.parentFlushed && l.clientRenderedBoundaries.push(d);
			}
		}
		if (n.length = 0, i !== null) {
			if (t === null) throw Error(r(487));
			if (t.status !== 4 && (t.status = 4, t.errorDigest = o, t.parentFlushed && e.clientRenderedBoundaries.push(t)), typeof i == "object") for (var f in i) delete i[f];
		}
	}
	function pr(e, t, n) {
		var r = e.blockedBoundary, i = e.blockedSegment;
		if (i !== null) {
			if (i.status === 6) return;
			i.status = 3;
		}
		var a = Wn(e.componentStack);
		if (r === null) {
			if (t.status !== 13 && t.status !== 14) {
				if (r = e.replay, r === null) {
					t.trackedPostpones !== null && i !== null ? (r = t.trackedPostpones, Gn(t, n, a), or(t, r, e, i), vr(t, null, e.row, i)) : (Gn(t, n, a), Kn(t, n));
					return;
				}
				r.pendingTasks--, r.pendingTasks === 0 && 0 < r.nodes.length && (i = Gn(t, n, a), fr(t, null, r.nodes, r.slots, n, i)), t.pendingRootTasks--, t.pendingRootTasks === 0 && hr(t);
			}
		} else {
			var o = t.trackedPostpones;
			if (r.status !== 4) {
				if (o !== null && i !== null) return Gn(t, n, a), or(t, o, e, i), r.fallbackAbortableTasks.forEach(function(e) {
					return pr(e, t, n);
				}), r.fallbackAbortableTasks.clear(), vr(t, r, e.row, i);
				r.status = 4, i = Gn(t, n, a), r.status = 4, r.errorDigest = i, sr(t, r), r.parentFlushed && t.clientRenderedBoundaries.push(r);
			}
			r.pendingTasks--, i = r.row, i !== null && --i.pendingTasks === 0 && qn(t, i), r.fallbackAbortableTasks.forEach(function(e) {
				return pr(e, t, n);
			}), r.fallbackAbortableTasks.clear();
		}
		e = e.row, e !== null && --e.pendingTasks === 0 && qn(t, e), t.allPendingTasks--, t.allPendingTasks === 0 && gr(t);
	}
	function mr(e, t) {
		try {
			var n = e.renderState, r = n.onHeaders;
			if (r) {
				var i = n.headers;
				if (i) {
					n.headers = null;
					var a = i.preconnects;
					if (i.fontPreloads && (a && (a += ", "), a += i.fontPreloads), i.highImagePreloads && (a && (a += ", "), a += i.highImagePreloads), !t) {
						var o = n.styles.values(), s = o.next();
						b: for (; 0 < i.remainingCapacity && !s.done; s = o.next()) for (var c = s.value.sheets.values(), l = c.next(); 0 < i.remainingCapacity && !l.done; l = c.next()) {
							var u = l.value, d = u.props, f = d.href, p = u.props, m = dt(p.href, "style", {
								crossOrigin: p.crossOrigin,
								integrity: p.integrity,
								nonce: p.nonce,
								type: p.type,
								fetchPriority: p.fetchPriority,
								referrerPolicy: p.referrerPolicy,
								media: p.media
							});
							if (0 <= (i.remainingCapacity -= m.length + 2)) n.resets.style[f] = W, a && (a += ", "), a += m, n.resets.style[f] = typeof d.crossOrigin == "string" || typeof d.integrity == "string" ? [d.crossOrigin, d.integrity] : W;
							else break b;
						}
					}
					r(a ? { Link: a } : {});
				}
			}
		} catch (t) {
			Gn(e, t, {});
		}
	}
	function hr(e) {
		e.trackedPostpones === null && mr(e, !0), e.trackedPostpones === null && Sr(e), e.onShellError = Bt, e = e.onShellReady, e();
	}
	function gr(e) {
		mr(e, e.trackedPostpones === null ? !0 : e.completedRootSegment === null || e.completedRootSegment.status !== 5), Sr(e), e = e.onAllReady, e();
	}
	function _r(e, t) {
		if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null && t.children[0].id === -1) {
			var n = t.children[0];
			n.id = t.id, n.parentFlushed = !0, n.status !== 1 && n.status !== 3 && n.status !== 4 || _r(e, n);
		} else e.completedSegments.push(t);
	}
	function vr(e, t, n, i) {
		if (n !== null && (--n.pendingTasks === 0 ? qn(e, n) : n.together && Yn(e, n)), e.allPendingTasks--, t === null) {
			if (i !== null && i.parentFlushed) {
				if (e.completedRootSegment !== null) throw Error(r(389));
				e.completedRootSegment = i;
			}
			e.pendingRootTasks--, e.pendingRootTasks === 0 && hr(e);
		} else if (t.pendingTasks--, t.status !== 4) if (t.pendingTasks === 0) {
			if (t.status === 0 && (t.status = 1), i !== null && i.parentFlushed && (i.status === 1 || i.status === 3) && _r(t, i), t.parentFlushed && e.completedBoundaries.push(t), t.status === 1) n = t.row, n !== null && vt(n.hoistables, t.contentState), Mn(e, t) || (t.fallbackAbortableTasks.forEach(dr, e), t.fallbackAbortableTasks.clear(), n !== null && --n.pendingTasks === 0 && qn(e, n)), e.pendingRootTasks === 0 && e.trackedPostpones === null && t.contentPreamble !== null && Sr(e);
			else if (t.status === 5 && (t = t.row, t !== null)) {
				if (e.trackedPostpones !== null) {
					n = e.trackedPostpones;
					var a = t.next;
					if (a !== null && (i = a.boundaries, i !== null)) for (a.boundaries = null, a = 0; a < i.length; a++) {
						var o = i[a];
						ar(e, n, o), vr(e, o, null, null);
					}
				}
				--t.pendingTasks === 0 && qn(e, t);
			}
		} else i === null || !i.parentFlushed || i.status !== 1 && i.status !== 3 || (_r(t, i), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)), t = t.row, t !== null && t.together && Yn(e, t);
		e.allPendingTasks === 0 && gr(e);
	}
	function yr(e) {
		if (e.status !== 14 && e.status !== 13) {
			var t = Et, n = B.H;
			B.H = Cn;
			var i = B.A;
			B.A = Tn;
			var a = In;
			In = e;
			var o = wn;
			wn = e.resumableState;
			try {
				var s = e.pingedTasks, c;
				for (c = 0; c < s.length; c++) {
					var l = s[c], u = e, d = l.blockedSegment;
					if (d === null) {
						var f = u;
						if (l.replay.pendingTasks !== 0) {
							Mt(l.context);
							try {
								if (typeof l.replay.slots == "number" ? tr(f, l, l.replay.slots, l.node, l.childIndex) : rr(f, l), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length) throw Error(r(488));
								l.replay.pendingTasks--, l.abortSet.delete(l), vr(f, l.blockedBoundary, l.row, null);
							} catch (e) {
								fn();
								var p = e === Vt ? Wt() : e;
								if (typeof p == "object" && p && typeof p.then == "function") {
									var m = l.ping;
									p.then(m, m), l.thenableState = e === Vt ? dn() : null;
								} else {
									l.replay.pendingTasks--, l.abortSet.delete(l);
									var h = Wn(l.componentStack);
									u = void 0;
									var g = f, _ = l.blockedBoundary, v = f.status === 12 ? f.fatalError : p, y = l.replay.nodes, b = l.replay.slots;
									u = Gn(g, v, h), fr(g, _, y, b, v, u), f.pendingRootTasks--, f.pendingRootTasks === 0 && hr(f), f.allPendingTasks--, f.allPendingTasks === 0 && gr(f);
								}
							}
						}
					} else if (f = void 0, g = d, g.status === 0) {
						g.status = 6, Mt(l.context);
						var x = g.children.length, S = g.chunks.length;
						try {
							rr(u, l), xt(g.chunks, u.renderState, g.lastPushedText, g.textEmbedded), l.abortSet.delete(l), g.status = 1, vr(u, l.blockedBoundary, l.row, g);
						} catch (e) {
							fn(), g.children.length = x, g.chunks.length = S;
							var C = e === Vt ? Wt() : u.status === 12 ? u.fatalError : e;
							if (u.status === 12 && u.trackedPostpones !== null) {
								var w = u.trackedPostpones, T = Wn(l.componentStack);
								l.abortSet.delete(l), Gn(u, C, T), or(u, w, l, g), vr(u, l.blockedBoundary, l.row, g);
							} else if (typeof C == "object" && C && typeof C.then == "function") {
								g.status = 0, l.thenableState = e === Vt ? dn() : null;
								var E = l.ping;
								C.then(E, E);
							} else {
								var D = Wn(l.componentStack);
								l.abortSet.delete(l), g.status = 4;
								var O = l.blockedBoundary, k = l.row;
								if (k !== null && --k.pendingTasks === 0 && qn(u, k), u.allPendingTasks--, f = Gn(u, C, D), O === null) Kn(u, C);
								else if (O.pendingTasks--, O.status !== 4) {
									O.status = 4, O.errorDigest = f, sr(u, O);
									var A = O.row;
									A !== null && --A.pendingTasks === 0 && qn(u, A), O.parentFlushed && u.clientRenderedBoundaries.push(O), u.pendingRootTasks === 0 && u.trackedPostpones === null && O.contentPreamble !== null && Sr(u);
								}
								u.allPendingTasks === 0 && gr(u);
							}
						}
					}
				}
				s.splice(0, c), e.destination !== null && Ar(e, e.destination);
			} catch (t) {
				Gn(e, t, {}), Kn(e, t);
			} finally {
				wn = o, B.H = n, B.A = i, n === Cn && Mt(t), In = a;
			}
		}
	}
	function br(e, t, n) {
		t.preambleChildren.length && n.push(t.preambleChildren);
		for (var r = !1, i = 0; i < t.children.length; i++) r = xr(e, t.children[i], n) || r;
		return r;
	}
	function xr(e, t, n) {
		var i = t.boundary;
		if (i === null) return br(e, t, n);
		var a = i.contentPreamble, o = i.fallbackPreamble;
		if (a === null || o === null) return !1;
		switch (i.status) {
			case 1:
				if (Pe(e.renderState, a), e.byteSize += i.byteSize, t = i.completedSegments[0], !t) throw Error(r(391));
				return br(e, t, n);
			case 5: if (e.trackedPostpones !== null) return !0;
			case 4: if (t.status === 1) return Pe(e.renderState, o), br(e, t, n);
			default: return !0;
		}
	}
	function Sr(e) {
		if (e.completedRootSegment && e.completedPreambleSegments === null) {
			var t = [], n = e.byteSize, r = xr(e, e.completedRootSegment, t), i = e.renderState.preamble;
			!1 === r || i.headChunks && i.bodyChunks ? e.completedPreambleSegments = t : e.byteSize = n;
		}
	}
	function Cr(e, t, n, i) {
		switch (n.parentFlushed = !0, n.status) {
			case 0: n.id = e.nextSegmentId++;
			case 5: return i = n.id, n.lastPushedText = !1, n.textEmbedded = !1, e = e.renderState, t.push("<template id=\""), t.push(e.placeholderPrefix), e = i.toString(16), t.push(e), t.push("\"></template>");
			case 1:
				n.status = 2;
				var a = !0, o = n.chunks, s = 0;
				n = n.children;
				for (var c = 0; c < n.length; c++) {
					for (a = n[c]; s < a.index; s++) t.push(o[s]);
					a = Tr(e, t, a, i);
				}
				for (; s < o.length - 1; s++) t.push(o[s]);
				return s < o.length && (a = t.push(o[s])), a;
			case 3: return !0;
			default: throw Error(r(390));
		}
	}
	var wr = 0;
	function Tr(e, t, n, i) {
		var a = n.boundary;
		if (a === null) return Cr(e, t, n, i);
		if (a.parentFlushed = !0, a.status === 4) {
			var o = a.row;
			return o !== null && --o.pendingTasks === 0 && qn(e, o), e.renderState.generateStaticMarkup || (a = a.errorDigest, t.push("<!--$!-->"), t.push("<template"), a && (t.push(" data-dgst=\""), a = I(a), t.push(a), t.push("\"")), t.push("></template>")), Cr(e, t, n, i), e = e.renderState.generateStaticMarkup ? !0 : t.push("<!--/$-->"), e;
		}
		if (a.status !== 1) return a.status === 0 && (a.rootSegmentID = e.nextSegmentId++), 0 < a.completedSegments.length && e.partialBoundaries.push(a), Ie(t, e.renderState, a.rootSegmentID), i && vt(i, a.fallbackState), Cr(e, t, n, i), t.push("<!--/$-->");
		if (!kr && Mn(e, a) && wr + a.byteSize > e.progressiveChunkSize) return a.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(a), Ie(t, e.renderState, a.rootSegmentID), Cr(e, t, n, i), t.push("<!--/$-->");
		if (wr += a.byteSize, i && vt(i, a.contentState), n = a.row, n !== null && Mn(e, a) && --n.pendingTasks === 0 && qn(e, n), e.renderState.generateStaticMarkup || t.push("<!--$-->"), n = a.completedSegments, n.length !== 1) throw Error(r(391));
		return Tr(e, t, n[0], i), e = e.renderState.generateStaticMarkup ? !0 : t.push("<!--/$-->"), e;
	}
	function Er(e, t, n, r) {
		return Le(t, e.renderState, n.parentFormatContext, n.id), Tr(e, t, n, r), Re(t, n.parentFormatContext);
	}
	function Dr(e, t, n) {
		wr = n.byteSize;
		for (var r = n.completedSegments, i = 0; i < r.length; i++) Or(e, t, n, r[i]);
		r.length = 0, r = n.row, r !== null && Mn(e, n) && --r.pendingTasks === 0 && qn(e, r), qe(t, n.contentState, e.renderState), r = e.resumableState, e = e.renderState, i = n.rootSegmentID, n = n.contentState;
		var a = e.stylesToHoist;
		return e.stylesToHoist = !1, t.push(e.startInlineScript), t.push(">"), a ? (!(r.instructions & 4) && (r.instructions |= 4, t.push("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};")), !(r.instructions & 2) && (r.instructions |= 2, t.push("$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d||\"/&\"===d)if(0===h)break;else h--;else\"$\"!==d&&\"$?\"!==d&&\"$~\"!==d&&\"$!\"!==d&&\"&\"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data=\"$\";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data=\"$~\",$RB.push(a,b),2===$RB.length&&(\"number\"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};")), r.instructions & 8 ? t.push("$RR(\"") : (r.instructions |= 8, t.push("$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll(\"link[data-precedence],style[data-precedence]\"),v=[],k=0;b=e[k++];)\"not all\"===b.getAttribute(\"media\")?v.push(b):(\"LINK\"===b.tagName&&$RM.set(b.getAttribute(\"href\"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement(\"link\");a.href=d;a.rel=\n\"stylesheet\";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute(\"media\");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute(\"data-precedence\");a.removeAttribute(\"media\")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=\n\"$~\";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,\"CSS failed to load\"))};$RR(\""))) : (!(r.instructions & 2) && (r.instructions |= 2, t.push("$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d||\"/&\"===d)if(0===h)break;else h--;else\"$\"!==d&&\"$?\"!==d&&\"$~\"!==d&&\"$!\"!==d&&\"&\"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data=\"$\";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data=\"$~\",$RB.push(a,b),2===$RB.length&&(\"number\"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};")), t.push("$RC(\"")), r = i.toString(16), t.push(e.boundaryPrefix), t.push(r), t.push("\",\""), t.push(e.segmentPrefix), t.push(r), a ? (t.push("\","), et(t, n)) : t.push("\""), n = t.push(")<\/script>"), Fe(t, e) && n;
	}
	function Or(e, t, n, i) {
		if (i.status === 2) return !0;
		var a = n.contentState, o = i.id;
		if (o === -1) {
			if ((i.id = n.rootSegmentID) === -1) throw Error(r(392));
			return Er(e, t, i, a);
		}
		return o === n.rootSegmentID ? Er(e, t, i, a) : (Er(e, t, i, a), n = e.resumableState, e = e.renderState, t.push(e.startInlineScript), t.push(">"), n.instructions & 1 ? t.push("$RS(\"") : (n.instructions |= 1, t.push("$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS(\"")), t.push(e.segmentPrefix), o = o.toString(16), t.push(o), t.push("\",\""), t.push(e.placeholderPrefix), t.push(o), t = t.push("\")<\/script>"), t);
	}
	var kr = !1;
	function Ar(e, t) {
		try {
			if (!(0 < e.pendingRootTasks)) {
				var n, r = e.completedRootSegment;
				if (r !== null) {
					if (r.status === 5) return;
					var i = e.completedPreambleSegments;
					if (i === null) return;
					wr = e.byteSize;
					var a = e.resumableState, o = e.renderState, s = o.preamble, c = s.htmlChunks, l = s.headChunks, u;
					if (c) {
						for (u = 0; u < c.length; u++) t.push(c[u]);
						if (l) for (u = 0; u < l.length; u++) t.push(l[u]);
						else {
							var d = Ae("head");
							t.push(d), t.push(">");
						}
					} else if (l) for (u = 0; u < l.length; u++) t.push(l[u]);
					var f = o.charsetChunks;
					for (u = 0; u < f.length; u++) t.push(f[u]);
					f.length = 0, o.preconnects.forEach(Je, t), o.preconnects.clear();
					var p = o.viewportChunks;
					for (u = 0; u < p.length; u++) t.push(p[u]);
					p.length = 0, o.fontPreloads.forEach(Je, t), o.fontPreloads.clear(), o.highImagePreloads.forEach(Je, t), o.highImagePreloads.clear(), te = o, o.styles.forEach(Xe, t), te = null;
					var m = o.importMapChunks;
					for (u = 0; u < m.length; u++) t.push(m[u]);
					m.length = 0, o.bootstrapScripts.forEach(Je, t), o.scripts.forEach(Je, t), o.scripts.clear(), o.bulkPreloads.forEach(Je, t), o.bulkPreloads.clear(), a.instructions |= 32;
					var h = o.hoistableChunks;
					for (u = 0; u < h.length; u++) t.push(h[u]);
					for (a = h.length = 0; a < i.length; a++) {
						var g = i[a];
						for (o = 0; o < g.length; o++) Tr(e, t, g[o], null);
					}
					var _ = e.renderState.preamble, v = _.headChunks;
					if (_.htmlChunks || v) {
						var y = Ne("head");
						t.push(y);
					}
					var b = _.bodyChunks;
					if (b) for (i = 0; i < b.length; i++) t.push(b[i]);
					Tr(e, t, r, null), e.completedRootSegment = null;
					var x = e.renderState;
					if (e.allPendingTasks !== 0 || e.clientRenderedBoundaries.length !== 0 || e.completedBoundaries.length !== 0 || e.trackedPostpones !== null && (e.trackedPostpones.rootNodes.length !== 0 || e.trackedPostpones.rootSlots !== null)) {
						var S = e.resumableState;
						if (!(S.instructions & 64)) {
							if (S.instructions |= 64, t.push(x.startInlineScript), !(S.instructions & 32)) {
								S.instructions |= 32;
								var C = "_" + S.idPrefix + "R_";
								t.push(" id=\"");
								var w = I(C);
								t.push(w), t.push("\"");
							}
							t.push(">"), t.push("requestAnimationFrame(function(){$RT=performance.now()});"), t.push("<\/script>");
						}
					}
					Fe(t, x);
				}
				var T = e.renderState;
				r = 0;
				var E = T.viewportChunks;
				for (r = 0; r < E.length; r++) t.push(E[r]);
				E.length = 0, T.preconnects.forEach(Je, t), T.preconnects.clear(), T.fontPreloads.forEach(Je, t), T.fontPreloads.clear(), T.highImagePreloads.forEach(Je, t), T.highImagePreloads.clear(), T.styles.forEach(Qe, t), T.scripts.forEach(Je, t), T.scripts.clear(), T.bulkPreloads.forEach(Je, t), T.bulkPreloads.clear();
				var D = T.hoistableChunks;
				for (r = 0; r < D.length; r++) t.push(D[r]);
				D.length = 0;
				var O = e.clientRenderedBoundaries;
				for (n = 0; n < O.length; n++) {
					var k = O[n];
					T = t;
					var A = e.resumableState, j = e.renderState, M = k.rootSegmentID, N = k.errorDigest;
					T.push(j.startInlineScript), T.push(">"), A.instructions & 4 ? T.push("$RX(\"") : (A.instructions |= 4, T.push("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX(\"")), T.push(j.boundaryPrefix);
					var P = M.toString(16);
					if (T.push(P), T.push("\""), N) {
						T.push(",");
						var F = Be(N || "");
						T.push(F);
					}
					var L = T.push(")<\/script>");
					if (!L) {
						e.destination = null, n++, O.splice(0, n);
						return;
					}
				}
				O.splice(0, n);
				var ee = e.completedBoundaries;
				for (n = 0; n < ee.length; n++) if (!Dr(e, t, ee[n])) {
					e.destination = null, n++, ee.splice(0, n);
					return;
				}
				ee.splice(0, n), kr = !0;
				var R = e.partialBoundaries;
				for (n = 0; n < R.length; n++) {
					var z = R[n];
					a: {
						O = e, k = t, wr = z.byteSize;
						var B = z.completedSegments;
						for (L = 0; L < B.length; L++) if (!Or(O, k, z, B[L])) {
							L++, B.splice(0, L);
							var V = !1;
							break a;
						}
						B.splice(0, L);
						var H = z.row;
						H !== null && H.together && z.pendingTasks === 1 && (H.pendingTasks === 1 ? Jn(O, H, H.hoistables) : H.pendingTasks--), V = qe(k, z.contentState, O.renderState);
					}
					if (!V) {
						e.destination = null, n++, R.splice(0, n);
						return;
					}
				}
				R.splice(0, n), kr = !1;
				var U = e.completedBoundaries;
				for (n = 0; n < U.length; n++) if (!Dr(e, t, U[n])) {
					e.destination = null, n++, U.splice(0, n);
					return;
				}
				U.splice(0, n);
			}
		} finally {
			kr = !1, e.allPendingTasks === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && (e.flushScheduled = !1, n = e.resumableState, n.hasBody && (R = Ne("body"), t.push(R)), n.hasHtml && (n = Ne("html"), t.push(n)), e.status = 14, t.push(null), e.destination = null);
		}
	}
	function jr(e) {
		if (!1 === e.flushScheduled && e.pingedTasks.length === 0 && e.destination !== null) {
			e.flushScheduled = !0;
			var t = e.destination;
			t ? Ar(e, t) : e.flushScheduled = !1;
		}
	}
	function Mr(e, t) {
		if (e.status === 13) e.status = 14, t.destroy(e.fatalError);
		else if (e.status !== 14 && e.destination === null) {
			e.destination = t;
			try {
				Ar(e, t);
			} catch (t) {
				Gn(e, t, {}), Kn(e, t);
			}
		}
	}
	function Nr(e, t) {
		(e.status === 11 || e.status === 10) && (e.status = 12);
		try {
			var n = e.abortableTasks;
			if (0 < n.size) {
				var i = t === void 0 ? Error(r(432)) : typeof t == "object" && t && typeof t.then == "function" ? Error(r(530)) : t;
				e.fatalError = i, n.forEach(function(t) {
					return pr(t, e, i);
				}), n.clear();
			}
			e.destination !== null && Ar(e, e.destination);
		} catch (t) {
			Gn(e, t, {}), Kn(e, t);
		}
	}
	function Pr(e, t, n) {
		if (t === null) n.rootNodes.push(e);
		else {
			var r = n.workingMap, i = r.get(t);
			i === void 0 && (i = [
				t[1],
				t[2],
				[],
				null
			], r.set(t, i), Pr(i, t[0], n)), i[2].push(e);
		}
	}
	function Fr() {}
	function Ir(e, t, n, i) {
		var a = !1, o = null, s = "", c = !1;
		if (t = ie(t ? t.identifierPrefix : void 0), e = Fn(e, t, yt(t, n), G(0, null, 0, null), Infinity, Fr, void 0, function() {
			c = !0;
		}, void 0, void 0, void 0), e.flushScheduled = e.destination !== null, yr(e), e.status === 10 && (e.status = 11), e.trackedPostpones === null && mr(e, e.pendingRootTasks === 0), Nr(e, i), Mr(e, {
			push: function(e) {
				return e !== null && (s += e), !0;
			},
			destroy: function(e) {
				a = !0, o = e;
			}
		}), a && o !== i) throw o;
		if (!c) throw Error(r(426));
		return s;
	}
	e.renderToStaticMarkup = function(e, t) {
		return Ir(e, t, !0, "The server used \"renderToStaticMarkup\" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to \"renderToReadableStream\" which supports Suspense on the server");
	}, e.renderToString = function(e, t) {
		return Ir(e, t, !1, "The server used \"renderToString\" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to \"renderToReadableStream\" which supports Suspense on the server");
	}, e.version = "19.2.6";
})), v = /* @__PURE__ */ o(((e) => {
	var t = u(), n = m();
	function r(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var i = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), d = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), v = Symbol.for("react.scope"), y = Symbol.for("react.activity"), b = Symbol.for("react.legacy_hidden"), x = Symbol.for("react.memo_cache_sentinel"), S = Symbol.for("react.view_transition"), C = Symbol.iterator;
	function w(e) {
		return typeof e != "object" || !e ? null : (e = C && e[C] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var T = Array.isArray;
	function E(e, t) {
		var n = e.length & 3, r = e.length - n, i = t;
		for (t = 0; t < r;) {
			var a = e.charCodeAt(t) & 255 | (e.charCodeAt(++t) & 255) << 8 | (e.charCodeAt(++t) & 255) << 16 | (e.charCodeAt(++t) & 255) << 24;
			++t, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295, i ^= a, i = i << 13 | i >>> 19, i = 5 * (i & 65535) + ((5 * (i >>> 16) & 65535) << 16) & 4294967295, i = (i & 65535) + 27492 + (((i >>> 16) + 58964 & 65535) << 16);
		}
		switch (a = 0, n) {
			case 3: a ^= (e.charCodeAt(t + 2) & 255) << 16;
			case 2: a ^= (e.charCodeAt(t + 1) & 255) << 8;
			case 1: a ^= e.charCodeAt(t) & 255, a = 3432918353 * (a & 65535) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, i ^= 461845907 * (a & 65535) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295;
		}
		return i ^= e.length, i ^= i >>> 16, i = 2246822507 * (i & 65535) + ((2246822507 * (i >>> 16) & 65535) << 16) & 4294967295, i ^= i >>> 13, i = 3266489909 * (i & 65535) + ((3266489909 * (i >>> 16) & 65535) << 16) & 4294967295, (i ^ i >>> 16) >>> 0;
	}
	var D = new MessageChannel(), O = [];
	D.port1.onmessage = function() {
		var e = O.shift();
		e && e();
	};
	function k(e) {
		O.push(e), D.port2.postMessage(null);
	}
	function A(e) {
		setTimeout(function() {
			throw e;
		});
	}
	var j = Promise, M = typeof queueMicrotask == "function" ? queueMicrotask : function(e) {
		j.resolve(null).then(e).catch(A);
	}, N = null, P = 0;
	function F(e, t) {
		if (t.byteLength !== 0) if (2048 < t.byteLength) 0 < P && (e.enqueue(new Uint8Array(N.buffer, 0, P)), N = new Uint8Array(2048), P = 0), e.enqueue(t);
		else {
			var n = N.length - P;
			n < t.byteLength && (n === 0 ? e.enqueue(N) : (N.set(t.subarray(0, n), P), e.enqueue(N), t = t.subarray(n)), N = new Uint8Array(2048), P = 0), N.set(t, P), P += t.byteLength;
		}
	}
	function I(e, t) {
		return F(e, t), !0;
	}
	function L(e) {
		N && 0 < P && (e.enqueue(new Uint8Array(N.buffer, 0, P)), N = null, P = 0);
	}
	var ee = new TextEncoder();
	function R(e) {
		return ee.encode(e);
	}
	function z(e) {
		return ee.encode(e);
	}
	function B(e) {
		return e.byteLength;
	}
	function V(e, t) {
		typeof e.error == "function" ? e.error(t) : e.close();
	}
	var H = Object.assign, U = Object.prototype.hasOwnProperty, W = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), te = {}, ne = {};
	function re(e) {
		return U.call(ne, e) ? !0 : U.call(te, e) ? !1 : W.test(e) ? ne[e] = !0 : (te[e] = !0, !1);
	}
	var ie = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), G = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), ae = /["'&<>]/;
	function K(e) {
		if (typeof e == "boolean" || typeof e == "number" || typeof e == "bigint") return "" + e;
		e = "" + e;
		var t = ae.exec(e);
		if (t) {
			var n = "", r, i = 0;
			for (r = t.index; r < e.length; r++) {
				switch (e.charCodeAt(r)) {
					case 34:
						t = "&quot;";
						break;
					case 38:
						t = "&amp;";
						break;
					case 39:
						t = "&#x27;";
						break;
					case 60:
						t = "&lt;";
						break;
					case 62:
						t = "&gt;";
						break;
					default: continue;
				}
				i !== r && (n += e.slice(i, r)), i = r + 1, n += t;
			}
			e = i === r ? n : n + e.slice(i, r);
		}
		return e;
	}
	var oe = /([A-Z])/g, se = /^ms-/, ce = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function le(e) {
		return ce.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	var ue = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, fe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, pe = de.d;
	de.d = {
		f: pe.f,
		r: pe.r,
		D: pr,
		C: mr,
		L: hr,
		m: gr,
		X: vr,
		S: _r,
		M: yr
	};
	var me = [], he = null;
	z("\"></template>");
	var ge = z("<script"), q = z("<\/script>"), _e = z("<script src=\""), ve = z("<script type=\"module\" src=\""), ye = z(" nonce=\""), be = z(" integrity=\""), xe = z(" crossorigin=\""), Se = z(" async=\"\"><\/script>"), Ce = z("<style"), we = /(<\/|<)(s)(cript)/gi;
	function Te(e, t, n, r) {
		return "" + t + (n === "s" ? "\\u0073" : "\\u0053") + r;
	}
	var Ee = z("<script type=\"importmap\">"), De = z("<\/script>");
	function Oe(e, t, n, r, i, a) {
		n = typeof t == "string" ? t : t && t.script;
		var o = n === void 0 ? ge : z("<script nonce=\"" + K(n) + "\""), s = typeof t == "string" ? void 0 : t && t.style, c = s === void 0 ? Ce : z("<style nonce=\"" + K(s) + "\""), l = e.idPrefix, u = [], d = e.bootstrapScriptContent, f = e.bootstrapScripts, p = e.bootstrapModules;
		if (d !== void 0 && (u.push(o), ar(u, e), u.push(nt, R(("" + d).replace(we, Te)), q)), d = [], r !== void 0 && (d.push(Ee), d.push(R(("" + JSON.stringify(r)).replace(we, Te))), d.push(De)), r = i ? {
			preconnects: "",
			fontPreloads: "",
			highImagePreloads: "",
			remainingCapacity: 2 + (typeof a == "number" ? a : 2e3)
		} : null, i = {
			placeholderPrefix: z(l + "P:"),
			segmentPrefix: z(l + "S:"),
			boundaryPrefix: z(l + "B:"),
			startInlineScript: o,
			startInlineStyle: c,
			preamble: Ae(),
			externalRuntimeScript: null,
			bootstrapChunks: u,
			importMapChunks: d,
			onHeaders: i,
			headers: r,
			resets: {
				font: {},
				dns: {},
				connect: {
					default: {},
					anonymous: {},
					credentials: {}
				},
				image: {},
				style: {}
			},
			charsetChunks: [],
			viewportChunks: [],
			hoistableChunks: [],
			preconnects: /* @__PURE__ */ new Set(),
			fontPreloads: /* @__PURE__ */ new Set(),
			highImagePreloads: /* @__PURE__ */ new Set(),
			styles: /* @__PURE__ */ new Map(),
			bootstrapScripts: /* @__PURE__ */ new Set(),
			scripts: /* @__PURE__ */ new Set(),
			bulkPreloads: /* @__PURE__ */ new Set(),
			preloads: {
				images: /* @__PURE__ */ new Map(),
				stylesheets: /* @__PURE__ */ new Map(),
				scripts: /* @__PURE__ */ new Map(),
				moduleScripts: /* @__PURE__ */ new Map()
			},
			nonce: {
				script: n,
				style: s
			},
			hoistableState: null,
			stylesToHoist: !1
		}, f !== void 0) for (r = 0; r < f.length; r++) l = f[r], s = o = void 0, c = {
			rel: "preload",
			as: "script",
			fetchPriority: "low",
			nonce: t
		}, typeof l == "string" ? c.href = a = l : (c.href = a = l.src, c.integrity = s = typeof l.integrity == "string" ? l.integrity : void 0, c.crossOrigin = o = typeof l == "string" || l.crossOrigin == null ? void 0 : l.crossOrigin === "use-credentials" ? "use-credentials" : ""), l = e, d = a, l.scriptResources[d] = null, l.moduleScriptResources[d] = null, l = [], dt(l, c), i.bootstrapScripts.add(l), u.push(_e, R(K(a)), Ke), n && u.push(ye, R(K(n)), Ke), typeof s == "string" && u.push(be, R(K(s)), Ke), typeof o == "string" && u.push(xe, R(K(o)), Ke), ar(u, e), u.push(Se);
		if (p !== void 0) for (t = 0; t < p.length; t++) s = p[t], a = r = void 0, o = {
			rel: "modulepreload",
			fetchPriority: "low",
			nonce: n
		}, typeof s == "string" ? o.href = f = s : (o.href = f = s.src, o.integrity = a = typeof s.integrity == "string" ? s.integrity : void 0, o.crossOrigin = r = typeof s == "string" || s.crossOrigin == null ? void 0 : s.crossOrigin === "use-credentials" ? "use-credentials" : ""), s = e, c = f, s.scriptResources[c] = null, s.moduleScriptResources[c] = null, s = [], dt(s, o), i.bootstrapScripts.add(s), u.push(ve, R(K(f)), Ke), n && u.push(ye, R(K(n)), Ke), typeof a == "string" && u.push(be, R(K(a)), Ke), typeof r == "string" && u.push(xe, R(K(r)), Ke), ar(u, e), u.push(Se);
		return i;
	}
	function ke(e, t, n, r, i) {
		return {
			idPrefix: e === void 0 ? "" : e,
			nextFormID: 0,
			streamingFormat: 0,
			bootstrapScriptContent: n,
			bootstrapScripts: r,
			bootstrapModules: i,
			instructions: 0,
			hasBody: !1,
			hasHtml: !1,
			unknownResources: {},
			dnsResources: {},
			connectResources: {
				default: {},
				anonymous: {},
				credentials: {}
			},
			imageResources: {},
			styleResources: {},
			scriptResources: {},
			moduleUnknownResources: {},
			moduleScriptResources: {}
		};
	}
	function Ae() {
		return {
			htmlChunks: null,
			headChunks: null,
			bodyChunks: null
		};
	}
	function je(e, t, n, r) {
		return {
			insertionMode: e,
			selectedValue: t,
			tagScope: n,
			viewTransition: r
		};
	}
	function Me(e) {
		return je(e === "http://www.w3.org/2000/svg" ? 4 : e === "http://www.w3.org/1998/Math/MathML" ? 5 : 0, null, 0, null);
	}
	function Ne(e, t, n) {
		var r = e.tagScope & -25;
		switch (t) {
			case "noscript": return je(2, null, r | 1, null);
			case "select": return je(2, n.value == null ? n.defaultValue : n.value, r, null);
			case "svg": return je(4, null, r, null);
			case "picture": return je(2, null, r | 2, null);
			case "math": return je(5, null, r, null);
			case "foreignObject": return je(2, null, r, null);
			case "table": return je(6, null, r, null);
			case "thead":
			case "tbody":
			case "tfoot": return je(7, null, r, null);
			case "colgroup": return je(9, null, r, null);
			case "tr": return je(8, null, r, null);
			case "head":
				if (2 > e.insertionMode) return je(3, null, r, null);
				break;
			case "html": if (e.insertionMode === 0) return je(1, null, r, null);
		}
		return 6 <= e.insertionMode || 2 > e.insertionMode ? je(2, null, r, null) : e.tagScope === r ? e : je(e.insertionMode, e.selectedValue, r, null);
	}
	function Pe(e) {
		return e === null ? null : {
			update: e.update,
			enter: "none",
			exit: "none",
			share: e.update,
			name: e.autoName,
			autoName: e.autoName,
			nameIdx: 0
		};
	}
	function Fe(e, t) {
		return t.tagScope & 32 && (e.instructions |= 128), je(t.insertionMode, t.selectedValue, t.tagScope | 12, Pe(t.viewTransition));
	}
	function Ie(e, t) {
		e = Pe(t.viewTransition);
		var n = t.tagScope | 16;
		return e !== null && e.share !== "none" && (n |= 64), je(t.insertionMode, t.selectedValue, n, e);
	}
	var Le = z("<!-- -->");
	function Re(e, t, n, r) {
		return t === "" ? r : (r && e.push(Le), e.push(R(K(t))), !0);
	}
	var ze = /* @__PURE__ */ new Map(), Be = z(" style=\""), Ve = z(":"), He = z(";");
	function Ue(e, t) {
		if (typeof t != "object") throw Error(r(62));
		var n = !0, i;
		for (i in t) if (U.call(t, i)) {
			var a = t[i];
			if (a != null && typeof a != "boolean" && a !== "") {
				if (i.indexOf("--") === 0) {
					var o = R(K(i));
					a = R(K(("" + a).trim()));
				} else o = ze.get(i), o === void 0 && (o = z(K(i.replace(oe, "-$1").toLowerCase().replace(se, "-ms-"))), ze.set(i, o)), a = typeof a == "number" ? a === 0 || ie.has(i) ? R("" + a) : R(a + "px") : R(K(("" + a).trim()));
				n ? (n = !1, e.push(Be, o, Ve, a)) : e.push(He, o, Ve, a);
			}
		}
		n || e.push(Ke);
	}
	var We = z(" "), Ge = z("=\""), Ke = z("\""), qe = z("=\"\"");
	function Je(e, t, n) {
		n && typeof n != "function" && typeof n != "symbol" && e.push(We, R(t), qe);
	}
	function J(e, t, n) {
		typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && e.push(We, R(t), Ge, R(K(n)), Ke);
	}
	var Ye = z(K("javascript:throw new Error('React form unexpectedly submitted.')")), Xe = z("<input type=\"hidden\"");
	function Ze(e, t) {
		this.push(Xe), Qe(e), J(this, "name", t), J(this, "value", e), this.push(rt);
	}
	function Qe(e) {
		if (typeof e != "string") throw Error(r(480));
	}
	function $e(e, t) {
		if (typeof t.$$FORM_ACTION == "function") {
			var n = e.nextFormID++;
			e = e.idPrefix + n;
			try {
				var r = t.$$FORM_ACTION(e);
				return r && r.data?.forEach(Qe), r;
			} catch (e) {
				if (typeof e == "object" && e && typeof e.then == "function") throw e;
			}
		}
		return null;
	}
	function et(e, t, n, r, i, a, o, s) {
		var c = null;
		if (typeof r == "function") {
			var l = $e(t, r);
			l === null ? (e.push(We, R("formAction"), Ge, Ye, Ke), o = a = i = r = s = null, ct(t, n)) : (s = l.name, r = l.action || "", i = l.encType, a = l.method, o = l.target, c = l.data);
		}
		return s != null && tt(e, "name", s), r != null && tt(e, "formAction", r), i != null && tt(e, "formEncType", i), a != null && tt(e, "formMethod", a), o != null && tt(e, "formTarget", o), c;
	}
	function tt(e, t, n) {
		switch (t) {
			case "className":
				J(e, "class", n);
				break;
			case "tabIndex":
				J(e, "tabindex", n);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				J(e, t, n);
				break;
			case "style":
				Ue(e, n);
				break;
			case "src":
			case "href": if (n === "") break;
			case "action":
			case "formAction":
				if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = le("" + n), e.push(We, R(t), Ge, R(K(n)), Ke);
				break;
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "ref": break;
			case "autoFocus":
			case "multiple":
			case "muted":
				Je(e, t.toLowerCase(), n);
				break;
			case "xlinkHref":
				if (typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") break;
				n = le("" + n), e.push(We, R("xlink:href"), Ge, R(K(n)), Ke);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				typeof n != "function" && typeof n != "symbol" && e.push(We, R(t), Ge, R(K(n)), Ke);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				n && typeof n != "function" && typeof n != "symbol" && e.push(We, R(t), qe);
				break;
			case "capture":
			case "download":
				!0 === n ? e.push(We, R(t), qe) : !1 !== n && typeof n != "function" && typeof n != "symbol" && e.push(We, R(t), Ge, R(K(n)), Ke);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n && e.push(We, R(t), Ge, R(K(n)), Ke);
				break;
			case "rowSpan":
			case "start":
				typeof n == "function" || typeof n == "symbol" || isNaN(n) || e.push(We, R(t), Ge, R(K(n)), Ke);
				break;
			case "xlinkActuate":
				J(e, "xlink:actuate", n);
				break;
			case "xlinkArcrole":
				J(e, "xlink:arcrole", n);
				break;
			case "xlinkRole":
				J(e, "xlink:role", n);
				break;
			case "xlinkShow":
				J(e, "xlink:show", n);
				break;
			case "xlinkTitle":
				J(e, "xlink:title", n);
				break;
			case "xlinkType":
				J(e, "xlink:type", n);
				break;
			case "xmlBase":
				J(e, "xml:base", n);
				break;
			case "xmlLang":
				J(e, "xml:lang", n);
				break;
			case "xmlSpace":
				J(e, "xml:space", n);
				break;
			default: if ((!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = G.get(t) || t, re(t))) {
				switch (typeof n) {
					case "function":
					case "symbol": return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") return;
				}
				e.push(We, R(t), Ge, R(K(n)), Ke);
			}
		}
	}
	var nt = z(">"), rt = z("/>");
	function it(e, t, n) {
		if (t != null) {
			if (n != null) throw Error(r(60));
			if (typeof t != "object" || !("__html" in t)) throw Error(r(61));
			t = t.__html, t != null && e.push(R("" + t));
		}
	}
	function at(e) {
		var n = "";
		return t.Children.forEach(e, function(e) {
			e != null && (n += e);
		}), n;
	}
	var ot = z(" selected=\"\""), st = z("addEventListener(\"submit\",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute(\"formAction\");null!=f&&(e=f,b=null)}\"javascript:throw new Error('React form unexpectedly submitted.')\"===e&&(a.preventDefault(),b?(a=document.createElement(\"input\"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});");
	function ct(e, t) {
		if (!(e.instructions & 16)) {
			e.instructions |= 16;
			var n = t.preamble, r = t.bootstrapChunks;
			(n.htmlChunks || n.headChunks) && r.length === 0 ? (r.push(t.startInlineScript), ar(r, e), r.push(nt, st, q)) : r.unshift(t.startInlineScript, nt, st, q);
		}
	}
	var lt = z("<!--F!-->"), ut = z("<!--F-->");
	function dt(e, t) {
		for (var n in e.push(Tt("link")), t) if (U.call(t, n)) {
			var i = t[n];
			if (i != null) switch (n) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
				default: tt(e, n, i);
			}
		}
		return e.push(rt), null;
	}
	var ft = /(<\/|<)(s)(tyle)/gi;
	function pt(e, t, n, r) {
		return "" + t + (n === "s" ? "\\73 " : "\\53 ") + r;
	}
	function mt(e, t, n) {
		for (var i in e.push(Tt(n)), t) if (U.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
				case "dangerouslySetInnerHTML": throw Error(r(399, n));
				default: tt(e, i, a);
			}
		}
		return e.push(rt), null;
	}
	function ht(e, t) {
		e.push(Tt("title"));
		var n = null, r = null, i;
		for (i in t) if (U.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: tt(e, i, a);
			}
		}
		return e.push(nt), t = Array.isArray(n) ? 2 > n.length ? n[0] : null : n, typeof t != "function" && typeof t != "symbol" && t != null && e.push(R(K("" + t))), it(e, r, n), e.push(kt("title")), null;
	}
	var gt = z("<!--head-->"), _t = z("<!--body-->"), vt = z("<!--html-->");
	function yt(e, t) {
		e.push(Tt("script"));
		var n = null, r = null, i;
		for (i in t) if (U.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: tt(e, i, a);
			}
		}
		return e.push(nt), it(e, r, n), typeof n == "string" && e.push(R(("" + n).replace(we, Te))), e.push(kt("script")), null;
	}
	function bt(e, t, n) {
		e.push(Tt(n));
		var r = n = null, i;
		for (i in t) if (U.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: tt(e, i, a);
			}
		}
		return e.push(nt), it(e, r, n), n;
	}
	function xt(e, t, n) {
		e.push(Tt(n));
		var r = n = null, i;
		for (i in t) if (U.call(t, i)) {
			var a = t[i];
			if (a != null) switch (i) {
				case "children":
					n = a;
					break;
				case "dangerouslySetInnerHTML":
					r = a;
					break;
				default: tt(e, i, a);
			}
		}
		return e.push(nt), it(e, r, n), typeof n == "string" ? (e.push(R(K(n))), null) : n;
	}
	var St = z("\n"), Ct = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, wt = /* @__PURE__ */ new Map();
	function Tt(e) {
		var t = wt.get(e);
		if (t === void 0) {
			if (!Ct.test(e)) throw Error(r(65, e));
			t = z("<" + e), wt.set(e, t);
		}
		return t;
	}
	var Et = z("<!DOCTYPE html>");
	function Dt(e, t, n, i, a, o, s, c, l) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path": break;
			case "a":
				e.push(Tt("a"));
				var u = null, d = null, f;
				for (f in n) if (U.call(n, f)) {
					var p = n[f];
					if (p != null) switch (f) {
						case "children":
							u = p;
							break;
						case "dangerouslySetInnerHTML":
							d = p;
							break;
						case "href":
							p === "" ? J(e, "href", "") : tt(e, f, p);
							break;
						default: tt(e, f, p);
					}
				}
				if (e.push(nt), it(e, d, u), typeof u == "string") {
					e.push(R(K(u)));
					var m = null;
				} else m = u;
				return m;
			case "g":
			case "p":
			case "li": break;
			case "select":
				e.push(Tt("select"));
				var h = null, g = null, _;
				for (_ in n) if (U.call(n, _)) {
					var v = n[_];
					if (v != null) switch (_) {
						case "children":
							h = v;
							break;
						case "dangerouslySetInnerHTML":
							g = v;
							break;
						case "defaultValue":
						case "value": break;
						default: tt(e, _, v);
					}
				}
				return e.push(nt), it(e, g, h), h;
			case "option":
				var y = c.selectedValue;
				e.push(Tt("option"));
				var b = null, x = null, S = null, C = null, w;
				for (w in n) if (U.call(n, w)) {
					var E = n[w];
					if (E != null) switch (w) {
						case "children":
							b = E;
							break;
						case "selected":
							S = E;
							break;
						case "dangerouslySetInnerHTML":
							C = E;
							break;
						case "value": x = E;
						default: tt(e, w, E);
					}
				}
				if (y != null) {
					var D = x === null ? at(b) : "" + x;
					if (T(y)) {
						for (var O = 0; O < y.length; O++) if ("" + y[O] === D) {
							e.push(ot);
							break;
						}
					} else "" + y === D && e.push(ot);
				} else S && e.push(ot);
				return e.push(nt), it(e, C, b), b;
			case "textarea":
				e.push(Tt("textarea"));
				var k = null, A = null, j = null, M;
				for (M in n) if (U.call(n, M)) {
					var N = n[M];
					if (N != null) switch (M) {
						case "children":
							j = N;
							break;
						case "value":
							k = N;
							break;
						case "defaultValue":
							A = N;
							break;
						case "dangerouslySetInnerHTML": throw Error(r(91));
						default: tt(e, M, N);
					}
				}
				if (k === null && A !== null && (k = A), e.push(nt), j != null) {
					if (k != null) throw Error(r(92));
					if (T(j)) {
						if (1 < j.length) throw Error(r(93));
						k = "" + j[0];
					}
					k = "" + j;
				}
				return typeof k == "string" && k[0] === "\n" && e.push(St), k !== null && e.push(R(K("" + k))), null;
			case "input":
				e.push(Tt("input"));
				var P = null, F = null, I = null, L = null, ee = null, z = null, B = null, V = null, W = null, te;
				for (te in n) if (U.call(n, te)) {
					var ne = n[te];
					if (ne != null) switch (te) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(399, "input"));
						case "name":
							P = ne;
							break;
						case "formAction":
							F = ne;
							break;
						case "formEncType":
							I = ne;
							break;
						case "formMethod":
							L = ne;
							break;
						case "formTarget":
							ee = ne;
							break;
						case "defaultChecked":
							W = ne;
							break;
						case "defaultValue":
							B = ne;
							break;
						case "checked":
							V = ne;
							break;
						case "value":
							z = ne;
							break;
						default: tt(e, te, ne);
					}
				}
				var ie = et(e, i, a, F, I, L, ee, P);
				return V === null ? W !== null && Je(e, "checked", W) : Je(e, "checked", V), z === null ? B !== null && tt(e, "value", B) : tt(e, "value", z), e.push(rt), ie?.forEach(Ze, e), null;
			case "button":
				e.push(Tt("button"));
				var G = null, ae = null, oe = null, se = null, ce = null, ue = null, de = null, fe;
				for (fe in n) if (U.call(n, fe)) {
					var pe = n[fe];
					if (pe != null) switch (fe) {
						case "children":
							G = pe;
							break;
						case "dangerouslySetInnerHTML":
							ae = pe;
							break;
						case "name":
							oe = pe;
							break;
						case "formAction":
							se = pe;
							break;
						case "formEncType":
							ce = pe;
							break;
						case "formMethod":
							ue = pe;
							break;
						case "formTarget":
							de = pe;
							break;
						default: tt(e, fe, pe);
					}
				}
				var he = et(e, i, a, se, ce, ue, de, oe);
				if (e.push(nt), he?.forEach(Ze, e), it(e, ae, G), typeof G == "string") {
					e.push(R(K(G)));
					var ge = null;
				} else ge = G;
				return ge;
			case "form":
				e.push(Tt("form"));
				var q = null, _e = null, ve = null, ye = null, be = null, xe = null, Se;
				for (Se in n) if (U.call(n, Se)) {
					var Ce = n[Se];
					if (Ce != null) switch (Se) {
						case "children":
							q = Ce;
							break;
						case "dangerouslySetInnerHTML":
							_e = Ce;
							break;
						case "action":
							ve = Ce;
							break;
						case "encType":
							ye = Ce;
							break;
						case "method":
							be = Ce;
							break;
						case "target":
							xe = Ce;
							break;
						default: tt(e, Se, Ce);
					}
				}
				var we = null, Te = null;
				if (typeof ve == "function") {
					var Ee = $e(i, ve);
					Ee === null ? (e.push(We, R("action"), Ge, Ye, Ke), xe = be = ye = ve = null, ct(i, a)) : (ve = Ee.action || "", ye = Ee.encType, be = Ee.method, xe = Ee.target, we = Ee.data, Te = Ee.name);
				}
				if (ve != null && tt(e, "action", ve), ye != null && tt(e, "encType", ye), be != null && tt(e, "method", be), xe != null && tt(e, "target", xe), e.push(nt), Te !== null && (e.push(Xe), J(e, "name", Te), e.push(rt), we?.forEach(Ze, e)), it(e, _e, q), typeof q == "string") {
					e.push(R(K(q)));
					var De = null;
				} else De = q;
				return De;
			case "menuitem":
				for (var Oe in e.push(Tt("menuitem")), n) if (U.call(n, Oe)) {
					var ke = n[Oe];
					if (ke != null) switch (Oe) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(r(400));
						default: tt(e, Oe, ke);
					}
				}
				return e.push(nt), null;
			case "object":
				e.push(Tt("object"));
				var Ae = null, je = null, Me;
				for (Me in n) if (U.call(n, Me)) {
					var Ne = n[Me];
					if (Ne != null) switch (Me) {
						case "children":
							Ae = Ne;
							break;
						case "dangerouslySetInnerHTML":
							je = Ne;
							break;
						case "data":
							var Pe = le("" + Ne);
							if (Pe === "") break;
							e.push(We, R("data"), Ge, R(K(Pe)), Ke);
							break;
						default: tt(e, Me, Ne);
					}
				}
				if (e.push(nt), it(e, je, Ae), typeof Ae == "string") {
					e.push(R(K(Ae)));
					var Fe = null;
				} else Fe = Ae;
				return Fe;
			case "title":
				var Ie = c.tagScope & 1, Re = c.tagScope & 4;
				if (c.insertionMode === 4 || Ie || n.itemProp != null) var ze = ht(e, n);
				else Re ? ze = null : (ht(a.hoistableChunks, n), ze = void 0);
				return ze;
			case "link":
				var Be = c.tagScope & 1, Ve = c.tagScope & 4, He = n.rel, qe = n.href, Qe = n.precedence;
				if (c.insertionMode === 4 || Be || n.itemProp != null || typeof He != "string" || typeof qe != "string" || qe === "") {
					dt(e, n);
					var st = null;
				} else if (n.rel === "stylesheet") if (typeof Qe != "string" || n.disabled != null || n.onLoad || n.onError) st = dt(e, n);
				else {
					var lt = a.styles.get(Qe), ut = i.styleResources.hasOwnProperty(qe) ? i.styleResources[qe] : void 0;
					if (ut !== null) {
						i.styleResources[qe] = null, lt || (lt = {
							precedence: R(K(Qe)),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set(Qe, lt));
						var Ct = {
							state: 0,
							props: H({}, n, {
								"data-precedence": n.precedence,
								precedence: null
							})
						};
						if (ut) {
							ut.length === 2 && br(Ct.props, ut);
							var wt = a.preloads.stylesheets.get(qe);
							wt && 0 < wt.length ? wt.length = 0 : Ct.state = 1;
						}
						lt.sheets.set(qe, Ct), s && s.stylesheets.add(Ct);
					} else if (lt) {
						var Dt = lt.sheets.get(qe);
						Dt && s && s.stylesheets.add(Dt);
					}
					l && e.push(Le), st = null;
				}
				else n.onLoad || n.onError ? st = dt(e, n) : (l && e.push(Le), st = Ve ? null : dt(a.hoistableChunks, n));
				return st;
			case "script":
				var Ot = c.tagScope & 1, At = n.async;
				if (typeof n.src != "string" || !n.src || !At || typeof At == "function" || typeof At == "symbol" || n.onLoad || n.onError || c.insertionMode === 4 || Ot || n.itemProp != null) var jt = yt(e, n);
				else {
					var Mt = n.src;
					if (n.type === "module") var Nt = i.moduleScriptResources, Pt = a.preloads.moduleScripts;
					else Nt = i.scriptResources, Pt = a.preloads.scripts;
					var Ft = Nt.hasOwnProperty(Mt) ? Nt[Mt] : void 0;
					if (Ft !== null) {
						Nt[Mt] = null;
						var It = n;
						if (Ft) {
							Ft.length === 2 && (It = H({}, n), br(It, Ft));
							var Lt = Pt.get(Mt);
							Lt && (Lt.length = 0);
						}
						var Rt = [];
						a.scripts.add(Rt), yt(Rt, It);
					}
					l && e.push(Le), jt = null;
				}
				return jt;
			case "style":
				var zt = c.tagScope & 1, Bt = n.precedence, Vt = n.href, Ht = n.nonce;
				if (c.insertionMode === 4 || zt || n.itemProp != null || typeof Bt != "string" || typeof Vt != "string" || Vt === "") {
					e.push(Tt("style"));
					var Ut = null, Wt = null, Gt;
					for (Gt in n) if (U.call(n, Gt)) {
						var Kt = n[Gt];
						if (Kt != null) switch (Gt) {
							case "children":
								Ut = Kt;
								break;
							case "dangerouslySetInnerHTML":
								Wt = Kt;
								break;
							default: tt(e, Gt, Kt);
						}
					}
					e.push(nt);
					var qt = Array.isArray(Ut) ? 2 > Ut.length ? Ut[0] : null : Ut;
					typeof qt != "function" && typeof qt != "symbol" && qt != null && e.push(R(("" + qt).replace(ft, pt))), it(e, Wt, Ut), e.push(kt("style"));
					var Jt = null;
				} else {
					var Yt = a.styles.get(Bt);
					if ((i.styleResources.hasOwnProperty(Vt) ? i.styleResources[Vt] : void 0) !== null) {
						i.styleResources[Vt] = null, Yt || (Yt = {
							precedence: R(K(Bt)),
							rules: [],
							hrefs: [],
							sheets: /* @__PURE__ */ new Map()
						}, a.styles.set(Bt, Yt));
						var Xt = a.nonce.style;
						if (!Xt || Xt === Ht) {
							Yt.hrefs.push(R(K(Vt)));
							var Zt = Yt.rules, Y = null, Qt = null, $t;
							for ($t in n) if (U.call(n, $t)) {
								var en = n[$t];
								if (en != null) switch ($t) {
									case "children":
										Y = en;
										break;
									case "dangerouslySetInnerHTML": Qt = en;
								}
							}
							var tn = Array.isArray(Y) ? 2 > Y.length ? Y[0] : null : Y;
							typeof tn != "function" && typeof tn != "symbol" && tn != null && Zt.push(R(("" + tn).replace(ft, pt))), it(Zt, Qt, Y);
						}
					}
					Yt && s && s.styles.add(Yt), l && e.push(Le), Jt = void 0;
				}
				return Jt;
			case "meta":
				var nn = c.tagScope & 1, rn = c.tagScope & 4;
				if (c.insertionMode === 4 || nn || n.itemProp != null) var an = mt(e, n, "meta");
				else l && e.push(Le), an = rn ? null : typeof n.charSet == "string" ? mt(a.charsetChunks, n, "meta") : n.name === "viewport" ? mt(a.viewportChunks, n, "meta") : mt(a.hoistableChunks, n, "meta");
				return an;
			case "listing":
			case "pre":
				e.push(Tt(t));
				var on = null, sn = null, cn;
				for (cn in n) if (U.call(n, cn)) {
					var ln = n[cn];
					if (ln != null) switch (cn) {
						case "children":
							on = ln;
							break;
						case "dangerouslySetInnerHTML":
							sn = ln;
							break;
						default: tt(e, cn, ln);
					}
				}
				if (e.push(nt), sn != null) {
					if (on != null) throw Error(r(60));
					if (typeof sn != "object" || !("__html" in sn)) throw Error(r(61));
					var un = sn.__html;
					un != null && (typeof un == "string" && 0 < un.length && un[0] === "\n" ? e.push(St, R(un)) : e.push(R("" + un)));
				}
				return typeof on == "string" && on[0] === "\n" && e.push(St), on;
			case "img":
				var dn = c.tagScope & 3, fn = n.src, pn = n.srcSet;
				if (!(n.loading === "lazy" || !fn && !pn || typeof fn != "string" && fn != null || typeof pn != "string" && pn != null || n.fetchPriority === "low" || dn) && (typeof fn != "string" || fn[4] !== ":" || fn[0] !== "d" && fn[0] !== "D" || fn[1] !== "a" && fn[1] !== "A" || fn[2] !== "t" && fn[2] !== "T" || fn[3] !== "a" && fn[3] !== "A") && (typeof pn != "string" || pn[4] !== ":" || pn[0] !== "d" && pn[0] !== "D" || pn[1] !== "a" && pn[1] !== "A" || pn[2] !== "t" && pn[2] !== "T" || pn[3] !== "a" && pn[3] !== "A")) {
					s !== null && c.tagScope & 64 && (s.suspenseyImages = !0);
					var mn = typeof n.sizes == "string" ? n.sizes : void 0, hn = pn ? pn + "\n" + (mn || "") : fn, gn = a.preloads.images, _n = gn.get(hn);
					if (_n) (n.fetchPriority === "high" || 10 > a.highImagePreloads.size) && (gn.delete(hn), a.highImagePreloads.add(_n));
					else if (!i.imageResources.hasOwnProperty(hn)) {
						i.imageResources[hn] = me;
						var vn = n.crossOrigin, yn = typeof vn == "string" ? vn === "use-credentials" ? vn : "" : void 0, bn = a.headers, xn;
						bn && 0 < bn.remainingCapacity && typeof n.srcSet != "string" && (n.fetchPriority === "high" || 500 > bn.highImagePreloads.length) && (xn = xr(fn, "image", {
							imageSrcSet: n.srcSet,
							imageSizes: n.sizes,
							crossOrigin: yn,
							integrity: n.integrity,
							nonce: n.nonce,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.refererPolicy
						}), 0 <= (bn.remainingCapacity -= xn.length + 2)) ? (a.resets.image[hn] = me, bn.highImagePreloads && (bn.highImagePreloads += ", "), bn.highImagePreloads += xn) : (_n = [], dt(_n, {
							rel: "preload",
							as: "image",
							href: pn ? void 0 : fn,
							imageSrcSet: pn,
							imageSizes: mn,
							crossOrigin: yn,
							integrity: n.integrity,
							type: n.type,
							fetchPriority: n.fetchPriority,
							referrerPolicy: n.referrerPolicy
						}), n.fetchPriority === "high" || 10 > a.highImagePreloads.size ? a.highImagePreloads.add(_n) : (a.bulkPreloads.add(_n), gn.set(hn, _n)));
					}
				}
				return mt(e, n, "img");
			case "base":
			case "area":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "param":
			case "source":
			case "track":
			case "wbr": return mt(e, n, t);
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": break;
			case "head":
				if (2 > c.insertionMode) {
					var Sn = o || a.preamble;
					if (Sn.headChunks) throw Error(r(545, "`<head>`"));
					o !== null && e.push(gt), Sn.headChunks = [];
					var Cn = bt(Sn.headChunks, n, "head");
				} else Cn = xt(e, n, "head");
				return Cn;
			case "body":
				if (2 > c.insertionMode) {
					var wn = o || a.preamble;
					if (wn.bodyChunks) throw Error(r(545, "`<body>`"));
					o !== null && e.push(_t), wn.bodyChunks = [];
					var Tn = bt(wn.bodyChunks, n, "body");
				} else Tn = xt(e, n, "body");
				return Tn;
			case "html":
				if (c.insertionMode === 0) {
					var En = o || a.preamble;
					if (En.htmlChunks) throw Error(r(545, "`<html>`"));
					o !== null && e.push(vt), En.htmlChunks = [Et];
					var Dn = bt(En.htmlChunks, n, "html");
				} else Dn = xt(e, n, "html");
				return Dn;
			default: if (t.indexOf("-") !== -1) {
				e.push(Tt(t));
				var On = null, kn = null, An;
				for (An in n) if (U.call(n, An)) {
					var jn = n[An];
					if (jn != null) {
						var Mn = An;
						switch (An) {
							case "children":
								On = jn;
								break;
							case "dangerouslySetInnerHTML":
								kn = jn;
								break;
							case "style":
								Ue(e, jn);
								break;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "ref": break;
							case "className": Mn = "class";
							default: if (re(An) && typeof jn != "function" && typeof jn != "symbol" && !1 !== jn) {
								if (!0 === jn) jn = "";
								else if (typeof jn == "object") continue;
								e.push(We, R(Mn), Ge, R(K(jn)), Ke);
							}
						}
					}
				}
				return e.push(nt), it(e, kn, On), On;
			}
		}
		return xt(e, n, t);
	}
	var Ot = /* @__PURE__ */ new Map();
	function kt(e) {
		var t = Ot.get(e);
		return t === void 0 && (t = z("</" + e + ">"), Ot.set(e, t)), t;
	}
	function At(e, t) {
		e = e.preamble, e.htmlChunks === null && t.htmlChunks && (e.htmlChunks = t.htmlChunks), e.headChunks === null && t.headChunks && (e.headChunks = t.headChunks), e.bodyChunks === null && t.bodyChunks && (e.bodyChunks = t.bodyChunks);
	}
	function jt(e, t) {
		t = t.bootstrapChunks;
		for (var n = 0; n < t.length - 1; n++) F(e, t[n]);
		return n < t.length ? (n = t[n], t.length = 0, I(e, n)) : !0;
	}
	var Mt = z("requestAnimationFrame(function(){$RT=performance.now()});"), Nt = z("<template id=\""), Pt = z("\"></template>"), Ft = z("<!--&-->"), It = z("<!--/&-->"), Lt = z("<!--$-->"), Rt = z("<!--$?--><template id=\""), zt = z("\"></template>"), Bt = z("<!--$!-->"), Vt = z("<!--/$-->"), Ht = z("<template"), Ut = z("\""), Wt = z(" data-dgst=\"");
	z(" data-msg=\""), z(" data-stck=\""), z(" data-cstck=\"");
	var Gt = z("></template>");
	function Kt(e, t, n) {
		if (F(e, Rt), n === null) throw Error(r(395));
		return F(e, t.boundaryPrefix), F(e, R(n.toString(16))), I(e, zt);
	}
	var qt = z("<div hidden id=\""), Jt = z("\">"), Yt = z("</div>"), Xt = z("<svg aria-hidden=\"true\" style=\"display:none\" id=\""), Zt = z("\">"), Y = z("</svg>"), Qt = z("<math aria-hidden=\"true\" style=\"display:none\" id=\""), $t = z("\">"), en = z("</math>"), tn = z("<table hidden id=\""), nn = z("\">"), rn = z("</table>"), an = z("<table hidden><tbody id=\""), on = z("\">"), sn = z("</tbody></table>"), cn = z("<table hidden><tr id=\""), ln = z("\">"), un = z("</tr></table>"), dn = z("<table hidden><colgroup id=\""), fn = z("\">"), pn = z("</colgroup></table>");
	function mn(e, t, n, i) {
		switch (n.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return F(e, qt), F(e, t.segmentPrefix), F(e, R(i.toString(16))), I(e, Jt);
			case 4: return F(e, Xt), F(e, t.segmentPrefix), F(e, R(i.toString(16))), I(e, Zt);
			case 5: return F(e, Qt), F(e, t.segmentPrefix), F(e, R(i.toString(16))), I(e, $t);
			case 6: return F(e, tn), F(e, t.segmentPrefix), F(e, R(i.toString(16))), I(e, nn);
			case 7: return F(e, an), F(e, t.segmentPrefix), F(e, R(i.toString(16))), I(e, on);
			case 8: return F(e, cn), F(e, t.segmentPrefix), F(e, R(i.toString(16))), I(e, ln);
			case 9: return F(e, dn), F(e, t.segmentPrefix), F(e, R(i.toString(16))), I(e, fn);
			default: throw Error(r(397));
		}
	}
	function hn(e, t) {
		switch (t.insertionMode) {
			case 0:
			case 1:
			case 3:
			case 2: return I(e, Yt);
			case 4: return I(e, Y);
			case 5: return I(e, en);
			case 6: return I(e, rn);
			case 7: return I(e, sn);
			case 8: return I(e, un);
			case 9: return I(e, pn);
			default: throw Error(r(397));
		}
	}
	var gn = z("$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS(\""), _n = z("$RS(\""), vn = z("\",\""), yn = z("\")<\/script>");
	z("<template data-rsi=\"\" data-sid=\""), z("\" data-pid=\"");
	var bn = z("$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d||\"/&\"===d)if(0===h)break;else h--;else\"$\"!==d&&\"$?\"!==d&&\"$~\"!==d&&\"$!\"!==d&&\"&\"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data=\"$\";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data=\"$~\",$RB.push(a,b),2===$RB.length&&(\"number\"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};");
	R("$RV=function(A,g){function k(a,b){var e=a.getAttribute(b);e&&(b=a.style,l.push(a,b.viewTransitionName,b.viewTransitionClass),\"auto\"!==e&&(b.viewTransitionClass=e),(a=a.getAttribute(\"vt-name\"))||(a=\"_T_\"+K++ +\"_\"),b.viewTransitionName=a,B=!0)}var B=!1,K=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var h=g[f].querySelectorAll(\"[vt-share]\"),d=0;d<h.length;d++){var c=h[d];m.set(c.getAttribute(\"vt-name\"),c)}var u=[];for(h=0;h<g.length;h+=2){var C=g[h],x=C.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){c=C;for(f=0;c;){if(8===c.nodeType){var r=c.data;if(\"/$\"===r)if(0===f)break;else f--;else\"$\"!==r&&\"$?\"!==r&&\"$~\"!==r&&\"$!\"!==r||f++}else if(1===c.nodeType){d=c;var D=d.getAttribute(\"vt-name\"),y=m.get(D);k(d,y?\"vt-share\":\"vt-exit\");y&&(k(y,\"vt-share\"),m.set(D,null));var E=d.querySelectorAll(\"[vt-share]\");for(d=0;d<E.length;d++){var F=E[d],G=F.getAttribute(\"vt-name\"),\nH=m.get(G);H&&(k(F,\"vt-share\"),k(H,\"vt-share\"),m.set(G,null))}}c=c.nextSibling}for(var I=g[h+1],t=I.firstElementChild;t;)null!==m.get(t.getAttribute(\"vt-name\"))&&k(t,\"vt-enter\"),t=t.nextElementSibling;c=x;do for(var n=c.firstElementChild;n;){var J=n.getAttribute(\"vt-update\");J&&\"none\"!==J&&!l.includes(n)&&k(n,\"vt-update\");n=n.nextElementSibling}while((c=c.parentNode)&&1===c.nodeType&&\"none\"!==c.getAttribute(\"vt-update\"));u.push.apply(u,I.querySelectorAll('img[src]:not([loading=\"lazy\"])'))}}}if(B){var z=\ndocument.__reactViewTransition=document.startViewTransition({update:function(){A(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],b={},e=0;e<u.length;b={g:b.g},e++)if(b.g=u[e],!b.g.complete){var p=b.g.getBoundingClientRect();0<p.bottom&&0<p.right&&p.top<window.innerHeight&&p.left<window.innerWidth&&(p=new Promise(function(w){return function(q){w.g.addEventListener(\"load\",q);w.g.addEventListener(\"error\",q)}}(b)),a.push(p))}return Promise.race([Promise.all(a),new Promise(function(w){var q=\nperformance.now();setTimeout(w,2300>q&&2E3<q?2300-q:500)})])},types:[]});z.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var b=l[a],e=b.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];\"\"===b.getAttribute(\"style\")&&b.removeAttribute(\"style\")}});z.finished.finally(function(){document.__reactViewTransition===z&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}A(g)}.bind(null,$RV);");
	var xn = z("$RC(\""), Sn = z("$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll(\"link[data-precedence],style[data-precedence]\"),v=[],k=0;b=e[k++];)\"not all\"===b.getAttribute(\"media\")?v.push(b):(\"LINK\"===b.tagName&&$RM.set(b.getAttribute(\"href\"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement(\"link\");a.href=d;a.rel=\n\"stylesheet\";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute(\"media\");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute(\"data-precedence\");a.removeAttribute(\"media\")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=\n\"$~\";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,\"CSS failed to load\"))};$RR(\""), Cn = z("$RR(\""), wn = z("\",\""), Tn = z("\","), En = z("\""), Dn = z(")<\/script>");
	z("<template data-rci=\"\" data-bid=\""), z("<template data-rri=\"\" data-bid=\""), z("\" data-sid=\""), z("\" data-sty=\"");
	var On = z("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};"), kn = z("$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX(\""), An = z("$RX(\""), jn = z("\""), Mn = z(","), Nn = z(")<\/script>");
	z("<template data-rxi=\"\" data-bid=\""), z("\" data-dgst=\""), z("\" data-msg=\""), z("\" data-stck=\""), z("\" data-cstck=\"");
	var Pn = /[<\u2028\u2029]/g;
	function Fn(e) {
		return JSON.stringify(e).replace(Pn, function(e) {
			switch (e) {
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var In = /[&><\u2028\u2029]/g;
	function Ln(e) {
		return JSON.stringify(e).replace(In, function(e) {
			switch (e) {
				case "&": return "\\u0026";
				case ">": return "\\u003e";
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var Rn = z(" media=\"not all\" data-precedence=\""), zn = z("\" data-href=\""), Bn = z("\">"), Vn = z("</style>"), Hn = !1, Un = !0;
	function Wn(e) {
		var t = e.rules, n = e.hrefs, r = 0;
		if (n.length) {
			for (F(this, he.startInlineStyle), F(this, Rn), F(this, e.precedence), F(this, zn); r < n.length - 1; r++) F(this, n[r]), F(this, Qn);
			for (F(this, n[r]), F(this, Bn), r = 0; r < t.length; r++) F(this, t[r]);
			Un = I(this, Vn), Hn = !0, t.length = 0, n.length = 0;
		}
	}
	function Gn(e) {
		return e.state === 2 ? !1 : Hn = !0;
	}
	function Kn(e, t, n) {
		return Hn = !1, Un = !0, he = n, t.styles.forEach(Wn, e), he = null, t.stylesheets.forEach(Gn), Hn && (n.stylesToHoist = !0), Un;
	}
	function qn(e) {
		for (var t = 0; t < e.length; t++) F(this, e[t]);
		e.length = 0;
	}
	var Jn = [];
	function Yn(e) {
		dt(Jn, e.props);
		for (var t = 0; t < Jn.length; t++) F(this, Jn[t]);
		Jn.length = 0, e.state = 2;
	}
	var Xn = z(" data-precedence=\""), Zn = z("\" data-href=\""), Qn = z(" "), $n = z("\">"), er = z("</style>");
	function tr(e) {
		var t = 0 < e.sheets.size;
		e.sheets.forEach(Yn, this), e.sheets.clear();
		var n = e.rules, r = e.hrefs;
		if (!t || r.length) {
			if (F(this, he.startInlineStyle), F(this, Xn), F(this, e.precedence), e = 0, r.length) {
				for (F(this, Zn); e < r.length - 1; e++) F(this, r[e]), F(this, Qn);
				F(this, r[e]);
			}
			for (F(this, $n), e = 0; e < n.length; e++) F(this, n[e]);
			F(this, er), n.length = 0, r.length = 0;
		}
	}
	function nr(e) {
		if (e.state === 0) {
			e.state = 1;
			var t = e.props;
			for (dt(Jn, {
				rel: "preload",
				as: "style",
				href: e.props.href,
				crossOrigin: t.crossOrigin,
				fetchPriority: t.fetchPriority,
				integrity: t.integrity,
				media: t.media,
				hrefLang: t.hrefLang,
				referrerPolicy: t.referrerPolicy
			}), e = 0; e < Jn.length; e++) F(this, Jn[e]);
			Jn.length = 0;
		}
	}
	function rr(e) {
		e.sheets.forEach(nr, this), e.sheets.clear();
	}
	z("<link rel=\"expect\" href=\"#"), z("\" blocking=\"render\"/>");
	var ir = z(" id=\"");
	function ar(e, t) {
		!(t.instructions & 32) && (t.instructions |= 32, e.push(ir, R(K("_" + t.idPrefix + "R_")), Ke));
	}
	var or = z("["), sr = z(",["), cr = z(","), lr = z("]");
	function ur(e, t) {
		F(e, or);
		var n = or;
		t.stylesheets.forEach(function(t) {
			if (t.state !== 2) if (t.state === 3) F(e, n), F(e, R(Ln("" + t.props.href))), F(e, lr), n = sr;
			else {
				F(e, n);
				var i = t.props["data-precedence"], a = t.props;
				for (var o in F(e, R(Ln(le("" + t.props.href)))), i = "" + i, F(e, cr), F(e, R(Ln(i))), a) if (U.call(a, o) && (i = a[o], i != null)) switch (o) {
					case "href":
					case "rel":
					case "precedence":
					case "data-precedence": break;
					case "children":
					case "dangerouslySetInnerHTML": throw Error(r(399, "link"));
					default: dr(e, o, i);
				}
				F(e, lr), n = sr, t.state = 3;
			}
		}), F(e, lr);
	}
	function dr(e, t, n) {
		var r = t.toLowerCase();
		switch (typeof n) {
			case "function":
			case "symbol": return;
		}
		switch (t) {
			case "innerHTML":
			case "dangerouslySetInnerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "style":
			case "ref": return;
			case "className":
				r = "class", t = "" + n;
				break;
			case "hidden":
				if (!1 === n) return;
				t = "";
				break;
			case "src":
			case "href":
				n = le(n), t = "" + n;
				break;
			default:
				if (2 < t.length && (t[0] === "o" || t[0] === "O") && (t[1] === "n" || t[1] === "N") || !re(t)) return;
				t = "" + n;
		}
		F(e, cr), F(e, R(Ln(r))), F(e, cr), F(e, R(Ln(t)));
	}
	function fr() {
		return {
			styles: /* @__PURE__ */ new Set(),
			stylesheets: /* @__PURE__ */ new Set(),
			suspenseyImages: !1
		};
	}
	function pr(e) {
		var t = qi || null;
		if (t) {
			var n = t.resumableState, r = t.renderState;
			if (typeof e == "string" && e) {
				if (!n.dnsResources.hasOwnProperty(e)) {
					n.dnsResources[e] = null, n = r.headers;
					var i, a;
					(a = n && 0 < n.remainingCapacity) && (a = (i = "<" + ("" + e).replace(Sr, Cr) + ">; rel=dns-prefetch", 0 <= (n.remainingCapacity -= i.length + 2))), a ? (r.resets.dns[e] = null, n.preconnects && (n.preconnects += ", "), n.preconnects += i) : (i = [], dt(i, {
						href: e,
						rel: "dns-prefetch"
					}), r.preconnects.add(i));
				}
				Wa(t);
			}
		} else pe.D(e);
	}
	function mr(e, t) {
		var n = qi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (typeof e == "string" && e) {
				var a = t === "use-credentials" ? "credentials" : typeof t == "string" ? "anonymous" : "default";
				if (!r.connectResources[a].hasOwnProperty(e)) {
					r.connectResources[a][e] = null, r = i.headers;
					var o, s;
					if (s = r && 0 < r.remainingCapacity) {
						if (s = "<" + ("" + e).replace(Sr, Cr) + ">; rel=preconnect", typeof t == "string") {
							var c = ("" + t).replace(wr, Tr);
							s += "; crossorigin=\"" + c + "\"";
						}
						s = (o = s, 0 <= (r.remainingCapacity -= o.length + 2));
					}
					s ? (i.resets.connect[a][e] = null, r.preconnects && (r.preconnects += ", "), r.preconnects += o) : (a = [], dt(a, {
						rel: "preconnect",
						href: e,
						crossOrigin: t
					}), i.preconnects.add(a));
				}
				Wa(n);
			}
		} else pe.C(e, t);
	}
	function hr(e, t, n) {
		var r = qi || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (t && e) {
				switch (t) {
					case "image":
						if (n) var o = n.imageSrcSet, s = n.imageSizes, c = n.fetchPriority;
						var l = o ? o + "\n" + (s || "") : e;
						if (i.imageResources.hasOwnProperty(l)) return;
						i.imageResources[l] = me, i = a.headers;
						var u;
						i && 0 < i.remainingCapacity && typeof o != "string" && c === "high" && (u = xr(e, t, n), 0 <= (i.remainingCapacity -= u.length + 2)) ? (a.resets.image[l] = me, i.highImagePreloads && (i.highImagePreloads += ", "), i.highImagePreloads += u) : (i = [], dt(i, H({
							rel: "preload",
							href: o ? void 0 : e,
							as: t
						}, n)), c === "high" ? a.highImagePreloads.add(i) : (a.bulkPreloads.add(i), a.preloads.images.set(l, i)));
						break;
					case "style":
						if (i.styleResources.hasOwnProperty(e)) return;
						o = [], dt(o, H({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.styleResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? me : [n.crossOrigin, n.integrity], a.preloads.stylesheets.set(e, o), a.bulkPreloads.add(o);
						break;
					case "script":
						if (i.scriptResources.hasOwnProperty(e)) return;
						o = [], a.preloads.scripts.set(e, o), a.bulkPreloads.add(o), dt(o, H({
							rel: "preload",
							href: e,
							as: t
						}, n)), i.scriptResources[e] = !n || typeof n.crossOrigin != "string" && typeof n.integrity != "string" ? me : [n.crossOrigin, n.integrity];
						break;
					default:
						if (i.unknownResources.hasOwnProperty(t)) {
							if (o = i.unknownResources[t], o.hasOwnProperty(e)) return;
						} else o = {}, i.unknownResources[t] = o;
						if (o[e] = me, (i = a.headers) && 0 < i.remainingCapacity && t === "font" && (l = xr(e, t, n), 0 <= (i.remainingCapacity -= l.length + 2))) a.resets.font[e] = me, i.fontPreloads && (i.fontPreloads += ", "), i.fontPreloads += l;
						else switch (i = [], e = H({
							rel: "preload",
							href: e,
							as: t
						}, n), dt(i, e), t) {
							case "font":
								a.fontPreloads.add(i);
								break;
							default: a.bulkPreloads.add(i);
						}
				}
				Wa(r);
			}
		} else pe.L(e, t, n);
	}
	function gr(e, t) {
		var n = qi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = t && typeof t.as == "string" ? t.as : "script";
				switch (a) {
					case "script":
						if (r.moduleScriptResources.hasOwnProperty(e)) return;
						a = [], r.moduleScriptResources[e] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? me : [t.crossOrigin, t.integrity], i.preloads.moduleScripts.set(e, a);
						break;
					default:
						if (r.moduleUnknownResources.hasOwnProperty(a)) {
							var o = r.unknownResources[a];
							if (o.hasOwnProperty(e)) return;
						} else o = {}, r.moduleUnknownResources[a] = o;
						a = [], o[e] = me;
				}
				dt(a, H({
					rel: "modulepreload",
					href: e
				}, t)), i.bulkPreloads.add(a), Wa(n);
			}
		} else pe.m(e, t);
	}
	function _r(e, t, n) {
		var r = qi || null;
		if (r) {
			var i = r.resumableState, a = r.renderState;
			if (e) {
				t ||= "default";
				var o = a.styles.get(t), s = i.styleResources.hasOwnProperty(e) ? i.styleResources[e] : void 0;
				s !== null && (i.styleResources[e] = null, o || (o = {
					precedence: R(K(t)),
					rules: [],
					hrefs: [],
					sheets: /* @__PURE__ */ new Map()
				}, a.styles.set(t, o)), t = {
					state: 0,
					props: H({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n)
				}, s && (s.length === 2 && br(t.props, s), (a = a.preloads.stylesheets.get(e)) && 0 < a.length ? a.length = 0 : t.state = 1), o.sheets.set(e, t), Wa(r));
			}
		} else pe.S(e, t, n);
	}
	function vr(e, t) {
		var n = qi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.scriptResources.hasOwnProperty(e) ? r.scriptResources[e] : void 0;
				a !== null && (r.scriptResources[e] = null, t = H({
					src: e,
					async: !0
				}, t), a && (a.length === 2 && br(t, a), e = i.preloads.scripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), yt(e, t), Wa(n));
			}
		} else pe.X(e, t);
	}
	function yr(e, t) {
		var n = qi || null;
		if (n) {
			var r = n.resumableState, i = n.renderState;
			if (e) {
				var a = r.moduleScriptResources.hasOwnProperty(e) ? r.moduleScriptResources[e] : void 0;
				a !== null && (r.moduleScriptResources[e] = null, t = H({
					src: e,
					type: "module",
					async: !0
				}, t), a && (a.length === 2 && br(t, a), e = i.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], i.scripts.add(e), yt(e, t), Wa(n));
			}
		} else pe.M(e, t);
	}
	function br(e, t) {
		e.crossOrigin ??= t[0], e.integrity ??= t[1];
	}
	function xr(e, t, n) {
		for (var r in e = ("" + e).replace(Sr, Cr), t = ("" + t).replace(wr, Tr), t = "<" + e + ">; rel=preload; as=\"" + t + "\"", n) U.call(n, r) && (e = n[r], typeof e == "string" && (t += "; " + r.toLowerCase() + "=\"" + ("" + e).replace(wr, Tr) + "\""));
		return t;
	}
	var Sr = /[<>\r\n]/g;
	function Cr(e) {
		switch (e) {
			case "<": return "%3C";
			case ">": return "%3E";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	var wr = /["';,\r\n]/g;
	function Tr(e) {
		switch (e) {
			case "\"": return "%22";
			case "'": return "%27";
			case ";": return "%3B";
			case ",": return "%2C";
			case "\n": return "%0A";
			case "\r": return "%0D";
			default: throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
		}
	}
	function Er(e) {
		this.styles.add(e);
	}
	function Dr(e) {
		this.stylesheets.add(e);
	}
	function Or(e, t) {
		t.styles.forEach(Er, e), t.stylesheets.forEach(Dr, e), t.suspenseyImages && (e.suspenseyImages = !0);
	}
	function kr(e) {
		return 0 < e.stylesheets.size || e.suspenseyImages;
	}
	var Ar = Function.prototype.bind, jr = Symbol.for("react.client.reference");
	function Mr(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === jr ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case o: return "Fragment";
			case c: return "Profiler";
			case s: return "StrictMode";
			case p: return "Suspense";
			case h: return "SuspenseList";
			case y: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case a: return "Portal";
			case d: return e.displayName || "Context";
			case l: return (e._context.displayName || "Context") + ".Consumer";
			case f:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case g: return t = e.displayName || null, t === null ? Mr(e.type) || "Memo" : t;
			case _:
				t = e._payload, e = e._init;
				try {
					return Mr(e(t));
				} catch {}
		}
		return null;
	}
	var Nr = {}, Pr = null;
	function Fr(e, t) {
		if (e !== t) {
			e.context._currentValue = e.parentValue, e = e.parent;
			var n = t.parent;
			if (e === null) {
				if (n !== null) throw Error(r(401));
			} else {
				if (n === null) throw Error(r(401));
				Fr(e, n);
			}
			t.context._currentValue = t.value;
		}
	}
	function Ir(e) {
		e.context._currentValue = e.parentValue, e = e.parent, e !== null && Ir(e);
	}
	function Lr(e) {
		var t = e.parent;
		t !== null && Lr(t), e.context._currentValue = e.value;
	}
	function Rr(e, t) {
		if (e.context._currentValue = e.parentValue, e = e.parent, e === null) throw Error(r(402));
		e.depth === t.depth ? Fr(e, t) : Rr(e, t);
	}
	function zr(e, t) {
		var n = t.parent;
		if (n === null) throw Error(r(402));
		e.depth === n.depth ? Fr(e, n) : zr(e, n), t.context._currentValue = t.value;
	}
	function Br(e) {
		var t = Pr;
		t !== e && (t === null ? Lr(e) : e === null ? Ir(t) : t.depth === e.depth ? Fr(t, e) : t.depth > e.depth ? Rr(t, e) : zr(t, e), Pr = e);
	}
	var Vr = {
		enqueueSetState: function(e, t) {
			e = e._reactInternals, e.queue !== null && e.queue.push(t);
		},
		enqueueReplaceState: function(e, t) {
			e = e._reactInternals, e.replace = !0, e.queue = [t];
		},
		enqueueForceUpdate: function() {}
	}, Hr = {
		id: 1,
		overflow: ""
	};
	function Ur(e, t, n) {
		var r = e.id;
		e = e.overflow;
		var i = 32 - Wr(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Wr(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			return a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, {
				id: 1 << 32 - Wr(t) + i | n << i | r,
				overflow: a + e
			};
		}
		return {
			id: 1 << a | n << i | r,
			overflow: e
		};
	}
	var Wr = Math.clz32 ? Math.clz32 : qr, Gr = Math.log, Kr = Math.LN2;
	function qr(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Gr(e) / Kr | 0) | 0;
	}
	function Jr() {}
	var Yr = Error(r(460));
	function Xr(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Jr, Jr), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw t.reason;
			default:
				switch (typeof t.status == "string" ? t.then(Jr, Jr) : (e = t, e.status = "pending", e.then(function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "fulfilled", n.value = e;
					}
				}, function(e) {
					if (t.status === "pending") {
						var n = t;
						n.status = "rejected", n.reason = e;
					}
				})), t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw t.reason;
				}
				throw Zr = t, Yr;
		}
	}
	var Zr = null;
	function Qr() {
		if (Zr === null) throw Error(r(459));
		var e = Zr;
		return Zr = null, e;
	}
	function $r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var ei = typeof Object.is == "function" ? Object.is : $r, ti = null, ni = null, ri = null, ii = null, ai = null, oi = null, si = !1, ci = !1, li = 0, ui = 0, di = -1, fi = 0, pi = null, mi = null, hi = 0;
	function gi() {
		if (ti === null) throw Error(r(321));
		return ti;
	}
	function _i() {
		if (0 < hi) throw Error(r(312));
		return {
			memoizedState: null,
			queue: null,
			next: null
		};
	}
	function vi() {
		return oi === null ? ai === null ? (si = !1, ai = oi = _i()) : (si = !0, oi = ai) : oi.next === null ? (si = !1, oi = oi.next = _i()) : (si = !0, oi = oi.next), oi;
	}
	function yi() {
		var e = pi;
		return pi = null, e;
	}
	function bi() {
		ii = ri = ni = ti = null, ci = !1, ai = null, hi = 0, oi = mi = null;
	}
	function xi(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Si(e, t, n) {
		if (ti = gi(), oi = vi(), si) {
			var r = oi.queue;
			if (t = r.dispatch, mi !== null && (n = mi.get(r), n !== void 0)) {
				mi.delete(r), r = oi.memoizedState;
				do
					r = e(r, n.action), n = n.next;
				while (n !== null);
				return oi.memoizedState = r, [r, t];
			}
			return [oi.memoizedState, t];
		}
		return e = e === xi ? typeof t == "function" ? t() : t : n === void 0 ? t : n(t), oi.memoizedState = e, e = oi.queue = {
			last: null,
			dispatch: null
		}, e = e.dispatch = wi.bind(null, ti, e), [oi.memoizedState, e];
	}
	function Ci(e, t) {
		if (ti = gi(), oi = vi(), t = t === void 0 ? null : t, oi !== null) {
			var n = oi.memoizedState;
			if (n !== null && t !== null) {
				var r = n[1];
				a: if (r === null) r = !1;
				else {
					for (var i = 0; i < r.length && i < t.length; i++) if (!ei(t[i], r[i])) {
						r = !1;
						break a;
					}
					r = !0;
				}
				if (r) return n[0];
			}
		}
		return e = e(), oi.memoizedState = [e, t], e;
	}
	function wi(e, t, n) {
		if (25 <= hi) throw Error(r(301));
		if (e === ti) if (ci = !0, e = {
			action: n,
			next: null
		}, mi === null && (mi = /* @__PURE__ */ new Map()), n = mi.get(t), n === void 0) mi.set(t, e);
		else {
			for (t = n; t.next !== null;) t = t.next;
			t.next = e;
		}
	}
	function Ti() {
		throw Error(r(440));
	}
	function Ei() {
		throw Error(r(394));
	}
	function Di() {
		throw Error(r(479));
	}
	function Oi(e, t, n) {
		gi();
		var r = ui++, i = ri;
		if (typeof e.$$FORM_ACTION == "function") {
			var a = null, o = ii;
			i = i.formState;
			var s = e.$$IS_SIGNATURE_EQUAL;
			if (i !== null && typeof s == "function") {
				var c = i[1];
				s.call(e, i[2], i[3]) && (a = n === void 0 ? "k" + E(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n, c === a && (di = r, t = i[0]));
			}
			var l = e.bind(null, t);
			return e = function(e) {
				l(e);
			}, typeof l.$$FORM_ACTION == "function" && (e.$$FORM_ACTION = function(e) {
				e = l.$$FORM_ACTION(e), n !== void 0 && (n += "", e.action = n);
				var t = e.data;
				return t && (a === null && (a = n === void 0 ? "k" + E(JSON.stringify([
					o,
					null,
					r
				]), 0) : "p" + n), t.append("$ACTION_KEY", a)), e;
			}), [
				t,
				e,
				!1
			];
		}
		var u = e.bind(null, t);
		return [
			t,
			function(e) {
				u(e);
			},
			!1
		];
	}
	function ki(e) {
		var t = fi;
		return fi += 1, pi === null && (pi = []), Xr(pi, e, t);
	}
	function Ai() {
		throw Error(r(393));
	}
	var ji = {
		readContext: function(e) {
			return e._currentValue;
		},
		use: function(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return ki(e);
				if (e.$$typeof === d) return e._currentValue;
			}
			throw Error(r(438, String(e)));
		},
		useContext: function(e) {
			return gi(), e._currentValue;
		},
		useMemo: Ci,
		useReducer: Si,
		useRef: function(e) {
			ti = gi(), oi = vi();
			var t = oi.memoizedState;
			return t === null ? (e = { current: e }, oi.memoizedState = e) : t;
		},
		useState: function(e) {
			return Si(xi, e);
		},
		useInsertionEffect: Jr,
		useLayoutEffect: Jr,
		useCallback: function(e, t) {
			return Ci(function() {
				return e;
			}, t);
		},
		useImperativeHandle: Jr,
		useEffect: Jr,
		useDebugValue: Jr,
		useDeferredValue: function(e, t) {
			return gi(), t === void 0 ? e : t;
		},
		useTransition: function() {
			return gi(), [!1, Ei];
		},
		useId: function() {
			var e = ni.treeContext, t = e.overflow;
			e = e.id, e = (e & ~(1 << 32 - Wr(e) - 1)).toString(32) + t;
			var n = Mi;
			if (n === null) throw Error(r(404));
			return t = li++, e = "_" + n.idPrefix + "R_" + e, 0 < t && (e += "H" + t.toString(32)), e + "_";
		},
		useSyncExternalStore: function(e, t, n) {
			if (n === void 0) throw Error(r(407));
			return n();
		},
		useOptimistic: function(e) {
			return gi(), [e, Di];
		},
		useActionState: Oi,
		useFormState: Oi,
		useHostTransitionStatus: function() {
			return gi(), fe;
		},
		useMemoCache: function(e) {
			for (var t = Array(e), n = 0; n < e; n++) t[n] = x;
			return t;
		},
		useCacheRefresh: function() {
			return Ai;
		},
		useEffectEvent: function() {
			return Ti;
		}
	}, Mi = null, Ni = {
		getCacheForType: function() {
			throw Error(r(248));
		},
		cacheSignal: function() {
			throw Error(r(248));
		}
	}, Pi, Fi;
	function Ii(e) {
		if (Pi === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Pi = t && t[1] || "", Fi = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Pi + e + Fi;
	}
	var Li = !1;
	function Ri(e, t) {
		if (!e || Li) return "";
		Li = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Li = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ii(n) : "";
	}
	function zi(e) {
		if (typeof e == "string") return Ii(e);
		if (typeof e == "function") return e.prototype && e.prototype.isReactComponent ? Ri(e, !0) : Ri(e, !1);
		if (typeof e == "object" && e) {
			switch (e.$$typeof) {
				case f: return Ri(e.render, !1);
				case g: return Ri(e.type, !1);
				case _:
					var t = e, n = t._payload;
					t = t._init;
					try {
						e = t(n);
					} catch {
						return Ii("Lazy");
					}
					return zi(e);
			}
			if (typeof e.name == "string") {
				a: {
					n = e.name, t = e.env;
					var r = e.debugLocation;
					if (r != null && (e = Error.prepareStackTrace, Error.prepareStackTrace = void 0, r = r.stack, Error.prepareStackTrace = e, r.startsWith("Error: react-stack-top-frame\n") && (r = r.slice(29)), e = r.indexOf("\n"), e !== -1 && (r = r.slice(e + 1)), e = r.indexOf("react_stack_bottom_frame"), e !== -1 && (e = r.lastIndexOf("\n", e)), e = e === -1 ? "" : r = r.slice(0, e), r = e.lastIndexOf("\n"), e = r === -1 ? e : e.slice(r + 1), e.indexOf(n) !== -1)) {
						n = "\n" + e;
						break a;
					}
					n = Ii(n + (t ? " [" + t + "]" : ""));
				}
				return n;
			}
		}
		switch (e) {
			case h: return Ii("SuspenseList");
			case p: return Ii("Suspense");
		}
		return "";
	}
	function Bi(e, t) {
		return (500 < t.byteSize || kr(t.contentState)) && t.contentPreamble === null;
	}
	function Vi(e) {
		if (typeof e == "object" && e && typeof e.environmentName == "string") {
			var t = e.environmentName;
			e = [e].slice(0), typeof e[0] == "string" ? e.splice(0, 1, "%c%s%c " + e[0], "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", "") : e.splice(0, 0, "%c%s%c", "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + t + " ", ""), e.unshift(console), t = Ar.apply(console.error, e), t();
		} else console.error(e);
		return null;
	}
	function Hi(e, t, n, r, i, a, o, s, c, l, u) {
		var d = /* @__PURE__ */ new Set();
		this.destination = null, this.flushScheduled = !1, this.resumableState = e, this.renderState = t, this.rootFormatContext = n, this.progressiveChunkSize = r === void 0 ? 12800 : r, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = d, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = i === void 0 ? Vi : i, this.onPostpone = l === void 0 ? Jr : l, this.onAllReady = a === void 0 ? Jr : a, this.onShellReady = o === void 0 ? Jr : o, this.onShellError = s === void 0 ? Jr : s, this.onFatalError = c === void 0 ? Jr : c, this.formState = u === void 0 ? null : u;
	}
	function Ui(e, t, n, r, i, a, o, s, c, l, u, d) {
		return t = new Hi(t, n, r, i, a, o, s, c, l, u, d), n = Qi(t, 0, null, r, !1, !1), n.parentFlushed = !0, e = Xi(t, null, e, -1, null, n, null, null, t.abortableTasks, null, r, null, Hr, null, null), $i(e), t.pingedTasks.push(e), t;
	}
	function Wi(e, t, n, r, i, a, o, s, c, l, u) {
		return e = Ui(e, t, n, r, i, a, o, s, c, l, u, void 0), e.trackedPostpones = {
			workingMap: /* @__PURE__ */ new Map(),
			rootNodes: [],
			rootSlots: null
		}, e;
	}
	function Gi(e, t, n, r, i, a, o, s, c) {
		return n = new Hi(t.resumableState, n, t.rootFormatContext, t.progressiveChunkSize, r, i, a, o, s, c, null), n.nextSegmentId = t.nextSegmentId, typeof t.replaySlots == "number" ? (r = Qi(n, 0, null, t.rootFormatContext, !1, !1), r.parentFlushed = !0, e = Xi(n, null, e, -1, null, r, null, null, n.abortableTasks, null, t.rootFormatContext, null, Hr, null, null), $i(e), n.pingedTasks.push(e), n) : (e = Zi(n, null, {
			nodes: t.replayNodes,
			slots: t.replaySlots,
			pendingTasks: 0
		}, e, -1, null, null, n.abortableTasks, null, t.rootFormatContext, null, Hr, null, null), $i(e), n.pingedTasks.push(e), n);
	}
	function Ki(e, t, n, r, i, a, o, s, c) {
		return e = Gi(e, t, n, r, i, a, o, s, c), e.trackedPostpones = {
			workingMap: /* @__PURE__ */ new Map(),
			rootNodes: [],
			rootSlots: null
		}, e;
	}
	var qi = null;
	function Ji(e, t) {
		e.pingedTasks.push(t), e.pingedTasks.length === 1 && (e.flushScheduled = e.destination !== null, e.trackedPostpones !== null || e.status === 10 ? M(function() {
			return ja(e);
		}) : k(function() {
			return ja(e);
		}));
	}
	function Yi(e, t, n, r, i) {
		return n = {
			status: 0,
			rootSegmentID: -1,
			parentFlushed: !1,
			pendingTasks: 0,
			row: t,
			completedSegments: [],
			byteSize: 0,
			fallbackAbortableTasks: n,
			errorDigest: null,
			contentState: fr(),
			fallbackState: fr(),
			contentPreamble: r,
			fallbackPreamble: i,
			trackedContentKeyPath: null,
			trackedFallbackNode: null
		}, t !== null && (t.pendingTasks++, r = t.boundaries, r !== null && (e.allPendingTasks++, n.pendingTasks++, r.push(n)), e = t.inheritedHoistables, e !== null && Or(n.contentState, e)), n;
	}
	function Xi(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
		e.allPendingTasks++, i === null ? e.pendingRootTasks++ : i.pendingTasks++, p !== null && p.pendingTasks++;
		var h = {
			replay: null,
			node: n,
			childIndex: r,
			ping: function() {
				return Ji(e, h);
			},
			blockedBoundary: i,
			blockedSegment: a,
			blockedPreamble: o,
			hoistableState: s,
			abortSet: c,
			keyPath: l,
			formatContext: u,
			context: d,
			treeContext: f,
			row: p,
			componentStack: m,
			thenableState: t
		};
		return c.add(h), h;
	}
	function Zi(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.allPendingTasks++, a === null ? e.pendingRootTasks++ : a.pendingTasks++, f !== null && f.pendingTasks++, n.pendingTasks++;
		var m = {
			replay: n,
			node: r,
			childIndex: i,
			ping: function() {
				return Ji(e, m);
			},
			blockedBoundary: a,
			blockedSegment: null,
			blockedPreamble: null,
			hoistableState: o,
			abortSet: s,
			keyPath: c,
			formatContext: l,
			context: u,
			treeContext: d,
			row: f,
			componentStack: p,
			thenableState: t
		};
		return s.add(m), m;
	}
	function Qi(e, t, n, r, i, a) {
		return {
			status: 0,
			parentFlushed: !1,
			id: -1,
			index: t,
			chunks: [],
			children: [],
			preambleChildren: [],
			parentFormatContext: r,
			boundary: n,
			lastPushedText: i,
			textEmbedded: a
		};
	}
	function $i(e) {
		var t = e.node;
		if (typeof t == "object" && t) switch (t.$$typeof) {
			case i: e.componentStack = {
				parent: e.componentStack,
				type: t.type
			};
		}
	}
	function ea(e) {
		return e === null ? null : {
			parent: e.parent,
			type: "Suspense Fallback"
		};
	}
	function ta(e) {
		var t = {};
		return e && Object.defineProperty(t, "componentStack", {
			configurable: !0,
			enumerable: !0,
			get: function() {
				try {
					var n = "", r = e;
					do
						n += zi(r.type), r = r.parent;
					while (r);
					var i = n;
				} catch (e) {
					i = "\nError generating stack: " + e.message + "\n" + e.stack;
				}
				return Object.defineProperty(t, "componentStack", { value: i }), i;
			}
		}), t;
	}
	function na(e, t, n) {
		if (e = e.onError, t = e(t, n), t == null || typeof t == "string") return t;
	}
	function ra(e, t) {
		var n = e.onShellError, r = e.onFatalError;
		n(t), r(t), e.destination === null ? (e.status = 13, e.fatalError = t) : (e.status = 14, V(e.destination, t));
	}
	function ia(e, t) {
		aa(e, t.next, t.hoistables);
	}
	function aa(e, t, n) {
		for (; t !== null;) {
			n !== null && (Or(t.hoistables, n), t.inheritedHoistables = n);
			var r = t.boundaries;
			if (r !== null) {
				t.boundaries = null;
				for (var i = 0; i < r.length; i++) {
					var a = r[i];
					n !== null && Or(a.contentState, n), Aa(e, a, null, null);
				}
			}
			if (t.pendingTasks--, 0 < t.pendingTasks) break;
			n = t.hoistables, t = t.next;
		}
	}
	function oa(e, t) {
		var n = t.boundaries;
		if (n !== null && t.pendingTasks === n.length) {
			for (var r = !0, i = 0; i < n.length; i++) {
				var a = n[i];
				if (a.pendingTasks !== 1 || a.parentFlushed || Bi(e, a)) {
					r = !1;
					break;
				}
			}
			r && aa(e, t, t.hoistables);
		}
	}
	function sa(e) {
		var t = {
			pendingTasks: 1,
			boundaries: null,
			hoistables: fr(),
			inheritedHoistables: null,
			together: !1,
			next: null
		};
		return e !== null && 0 < e.pendingTasks && (t.pendingTasks++, t.boundaries = [], e.next = t), t;
	}
	function ca(e, t, n, r, i) {
		var a = t.keyPath, o = t.treeContext, s = t.row;
		t.keyPath = n, n = r.length;
		var c = null;
		if (t.replay !== null) {
			var l = t.replay.slots;
			if (typeof l == "object" && l) for (var u = 0; u < n; u++) {
				var d = i !== "backwards" && i !== "unstable_legacy-backwards" ? u : n - 1 - u, f = r[d];
				t.row = c = sa(c), t.treeContext = Ur(o, n, d);
				var p = l[d];
				typeof p == "number" ? (fa(e, t, p, f, d), delete l[d]) : xa(e, t, f, d), --c.pendingTasks === 0 && ia(e, c);
			}
			else for (l = 0; l < n; l++) u = i !== "backwards" && i !== "unstable_legacy-backwards" ? l : n - 1 - l, d = r[u], t.row = c = sa(c), t.treeContext = Ur(o, n, u), xa(e, t, d, u), --c.pendingTasks === 0 && ia(e, c);
		} else if (i !== "backwards" && i !== "unstable_legacy-backwards") for (i = 0; i < n; i++) l = r[i], t.row = c = sa(c), t.treeContext = Ur(o, n, i), xa(e, t, l, i), --c.pendingTasks === 0 && ia(e, c);
		else {
			for (i = t.blockedSegment, l = i.children.length, u = i.chunks.length, d = n - 1; 0 <= d; d--) {
				f = r[d], t.row = c = sa(c), t.treeContext = Ur(o, n, d), p = Qi(e, u, null, t.formatContext, d === 0 ? i.lastPushedText : !0, !0), i.children.splice(l, 0, p), t.blockedSegment = p;
				try {
					xa(e, t, f, d), p.lastPushedText && p.textEmbedded && p.chunks.push(Le), p.status = 1, ka(e, t.blockedBoundary, p), --c.pendingTasks === 0 && ia(e, c);
				} catch (t) {
					throw p.status = e.status === 12 ? 3 : 4, t;
				}
			}
			t.blockedSegment = i, i.lastPushedText = !1;
		}
		s !== null && c !== null && 0 < c.pendingTasks && (s.pendingTasks++, c.next = s), t.treeContext = o, t.row = s, t.keyPath = a;
	}
	function la(e, t, n, r, i, a) {
		var o = t.thenableState;
		for (t.thenableState = null, ti = {}, ni = t, ri = e, ii = n, ui = li = 0, di = -1, fi = 0, pi = o, e = r(i, a); ci;) ci = !1, ui = li = 0, di = -1, fi = 0, hi += 1, oi = null, e = r(i, a);
		return bi(), e;
	}
	function ua(e, t, n, r, i, a, o) {
		var s = !1;
		if (a !== 0 && e.formState !== null) {
			var c = t.blockedSegment;
			if (c !== null) {
				s = !0, c = c.chunks;
				for (var l = 0; l < a; l++) l === o ? c.push(lt) : c.push(ut);
			}
		}
		a = t.keyPath, t.keyPath = n, i ? (n = t.treeContext, t.treeContext = Ur(n, 1, 0), xa(e, t, r, -1), t.treeContext = n) : s ? xa(e, t, r, -1) : pa(e, t, r, -1), t.keyPath = a;
	}
	function da(e, t, n, i, a, u) {
		if (typeof i == "function") if (i.prototype && i.prototype.isReactComponent) {
			var m = a;
			if ("ref" in a) for (var x in m = {}, a) x !== "ref" && (m[x] = a[x]);
			var C = i.defaultProps;
			if (C) for (var E in m === a && (m = H({}, m, a)), C) m[E] === void 0 && (m[E] = C[E]);
			a = m, m = Nr, C = i.contextType, typeof C == "object" && C && (m = C._currentValue), m = new i(a, m);
			var D = m.state === void 0 ? null : m.state;
			if (m.updater = Vr, m.props = a, m.state = D, C = {
				queue: [],
				replace: !1
			}, m._reactInternals = C, u = i.contextType, m.context = typeof u == "object" && u ? u._currentValue : Nr, u = i.getDerivedStateFromProps, typeof u == "function" && (u = u(a, D), D = u == null ? D : H({}, D, u), m.state = D), typeof i.getDerivedStateFromProps != "function" && typeof m.getSnapshotBeforeUpdate != "function" && (typeof m.UNSAFE_componentWillMount == "function" || typeof m.componentWillMount == "function")) if (i = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), i !== m.state && Vr.enqueueReplaceState(m, m.state, null), C.queue !== null && 0 < C.queue.length) if (i = C.queue, u = C.replace, C.queue = null, C.replace = !1, u && i.length === 1) m.state = i[0];
			else {
				for (C = u ? i[0] : m.state, D = !0, u = +!!u; u < i.length; u++) E = i[u], E = typeof E == "function" ? E.call(m, C, a, void 0) : E, E != null && (D ? (D = !1, C = H({}, C, E)) : H(C, E));
				m.state = C;
			}
			else C.queue = null;
			if (i = m.render(), e.status === 12) throw null;
			a = t.keyPath, t.keyPath = n, pa(e, t, i, -1), t.keyPath = a;
		} else {
			if (i = la(e, t, n, i, a, void 0), e.status === 12) throw null;
			ua(e, t, n, i, li !== 0, ui, di);
		}
		else if (typeof i == "string") if (m = t.blockedSegment, m === null) m = a.children, C = t.formatContext, D = t.keyPath, t.formatContext = Ne(C, i, a), t.keyPath = n, xa(e, t, m, -1), t.formatContext = C, t.keyPath = D;
		else {
			if (D = Dt(m.chunks, i, a, e.resumableState, e.renderState, t.blockedPreamble, t.hoistableState, t.formatContext, m.lastPushedText), m.lastPushedText = !1, C = t.formatContext, u = t.keyPath, t.keyPath = n, (t.formatContext = Ne(C, i, a)).insertionMode === 3) {
				n = Qi(e, 0, null, t.formatContext, !1, !1), m.preambleChildren.push(n), t.blockedSegment = n;
				try {
					n.status = 6, xa(e, t, D, -1), n.lastPushedText && n.textEmbedded && n.chunks.push(Le), n.status = 1, ka(e, t.blockedBoundary, n);
				} finally {
					t.blockedSegment = m;
				}
			} else xa(e, t, D, -1);
			t.formatContext = C, t.keyPath = u;
			a: {
				switch (t = m.chunks, e = e.resumableState, i) {
					case "title":
					case "style":
					case "script":
					case "area":
					case "base":
					case "br":
					case "col":
					case "embed":
					case "hr":
					case "img":
					case "input":
					case "keygen":
					case "link":
					case "meta":
					case "param":
					case "source":
					case "track":
					case "wbr": break a;
					case "body":
						if (1 >= C.insertionMode) {
							e.hasBody = !0;
							break a;
						}
						break;
					case "html":
						if (C.insertionMode === 0) {
							e.hasHtml = !0;
							break a;
						}
						break;
					case "head": if (1 >= C.insertionMode) break a;
				}
				t.push(kt(i));
			}
			m.lastPushedText = !1;
		}
		else {
			switch (i) {
				case b:
				case s:
				case c:
				case o:
					i = t.keyPath, t.keyPath = n, pa(e, t, a.children, -1), t.keyPath = i;
					return;
				case y:
					i = t.blockedSegment, i === null ? a.mode !== "hidden" && (i = t.keyPath, t.keyPath = n, xa(e, t, a.children, -1), t.keyPath = i) : a.mode !== "hidden" && (i.chunks.push(Ft), i.lastPushedText = !1, m = t.keyPath, t.keyPath = n, xa(e, t, a.children, -1), t.keyPath = m, i.chunks.push(It), i.lastPushedText = !1);
					return;
				case h:
					a: {
						if (i = a.children, a = a.revealOrder, a === "forwards" || a === "backwards" || a === "unstable_legacy-backwards") {
							if (T(i)) {
								ca(e, t, n, i, a);
								break a;
							}
							if ((m = w(i)) && (m = m.call(i))) {
								if (C = m.next(), !C.done) {
									do
										C = m.next();
									while (!C.done);
									ca(e, t, n, i, a);
								}
								break a;
							}
						}
						a === "together" ? (a = t.keyPath, m = t.row, C = t.row = sa(null), C.boundaries = [], C.together = !0, t.keyPath = n, pa(e, t, i, -1), --C.pendingTasks === 0 && ia(e, C), t.keyPath = a, t.row = m, m !== null && 0 < C.pendingTasks && (m.pendingTasks++, C.next = m)) : (a = t.keyPath, t.keyPath = n, pa(e, t, i, -1), t.keyPath = a);
					}
					return;
				case S:
				case v: throw Error(r(343));
				case p:
					a: if (t.replay !== null) {
						i = t.keyPath, m = t.formatContext, C = t.row, t.keyPath = n, t.formatContext = Ie(e.resumableState, m), t.row = null, n = a.children;
						try {
							xa(e, t, n, -1);
						} finally {
							t.keyPath = i, t.formatContext = m, t.row = C;
						}
					} else {
						i = t.keyPath, u = t.formatContext;
						var O = t.row;
						E = t.blockedBoundary, x = t.blockedPreamble;
						var k = t.hoistableState, A = t.blockedSegment, j = a.fallback;
						a = a.children;
						var M = /* @__PURE__ */ new Set(), N = 2 > t.formatContext.insertionMode ? Yi(e, t.row, M, Ae(), Ae()) : Yi(e, t.row, M, null, null);
						e.trackedPostpones !== null && (N.trackedContentKeyPath = n);
						var P = Qi(e, A.chunks.length, N, t.formatContext, !1, !1);
						A.children.push(P), A.lastPushedText = !1;
						var F = Qi(e, 0, null, t.formatContext, !1, !1);
						if (F.parentFlushed = !0, e.trackedPostpones !== null) {
							m = t.componentStack, C = [
								n[0],
								"Suspense Fallback",
								n[2]
							], D = [
								C[1],
								C[2],
								[],
								null
							], e.trackedPostpones.workingMap.set(C, D), N.trackedFallbackNode = D, t.blockedSegment = P, t.blockedPreamble = N.fallbackPreamble, t.keyPath = C, t.formatContext = Fe(e.resumableState, u), t.componentStack = ea(m), P.status = 6;
							try {
								xa(e, t, j, -1), P.lastPushedText && P.textEmbedded && P.chunks.push(Le), P.status = 1, ka(e, E, P);
							} catch (t) {
								throw P.status = e.status === 12 ? 3 : 4, t;
							} finally {
								t.blockedSegment = A, t.blockedPreamble = x, t.keyPath = i, t.formatContext = u;
							}
							t = Xi(e, null, a, -1, N, F, N.contentPreamble, N.contentState, t.abortSet, n, Ie(e.resumableState, t.formatContext), t.context, t.treeContext, null, m), $i(t), e.pingedTasks.push(t);
						} else {
							t.blockedBoundary = N, t.blockedPreamble = N.contentPreamble, t.hoistableState = N.contentState, t.blockedSegment = F, t.keyPath = n, t.formatContext = Ie(e.resumableState, u), t.row = null, F.status = 6;
							try {
								if (xa(e, t, a, -1), F.lastPushedText && F.textEmbedded && F.chunks.push(Le), F.status = 1, ka(e, N, F), Oa(N, F), N.pendingTasks === 0 && N.status === 0) {
									if (N.status = 1, !Bi(e, N)) {
										O !== null && --O.pendingTasks === 0 && ia(e, O), e.pendingRootTasks === 0 && t.blockedPreamble && Pa(e);
										break a;
									}
								} else O !== null && O.together && oa(e, O);
							} catch (n) {
								N.status = 4, e.status === 12 ? (F.status = 3, m = e.fatalError) : (F.status = 4, m = n), C = ta(t.componentStack), D = na(e, m, C), N.errorDigest = D, va(e, N);
							} finally {
								t.blockedBoundary = E, t.blockedPreamble = x, t.hoistableState = k, t.blockedSegment = A, t.keyPath = i, t.formatContext = u, t.row = O;
							}
							t = Xi(e, null, j, -1, E, P, N.fallbackPreamble, N.fallbackState, M, [
								n[0],
								"Suspense Fallback",
								n[2]
							], Fe(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, ea(t.componentStack)), $i(t), e.pingedTasks.push(t);
						}
					}
					return;
			}
			if (typeof i == "object" && i) switch (i.$$typeof) {
				case f:
					if ("ref" in a) for (A in m = {}, a) A !== "ref" && (m[A] = a[A]);
					else m = a;
					i = la(e, t, n, i.render, m, u), ua(e, t, n, i, li !== 0, ui, di);
					return;
				case g:
					da(e, t, n, i.type, a, u);
					return;
				case d:
					if (C = a.children, m = t.keyPath, a = a.value, D = i._currentValue, i._currentValue = a, u = Pr, Pr = i = {
						parent: u,
						depth: u === null ? 0 : u.depth + 1,
						context: i,
						parentValue: D,
						value: a
					}, t.context = i, t.keyPath = n, pa(e, t, C, -1), e = Pr, e === null) throw Error(r(403));
					e.context._currentValue = e.parentValue, e = Pr = e.parent, t.context = e, t.keyPath = m;
					return;
				case l:
					a = a.children, i = a(i._context._currentValue), a = t.keyPath, t.keyPath = n, pa(e, t, i, -1), t.keyPath = a;
					return;
				case _:
					if (m = i._init, i = m(i._payload), e.status === 12) throw null;
					da(e, t, n, i, a, u);
					return;
			}
			throw Error(r(130, i == null ? i : typeof i, ""));
		}
	}
	function fa(e, t, n, r, i) {
		var a = t.replay, o = t.blockedBoundary, s = Qi(e, 0, null, t.formatContext, !1, !1);
		s.id = n, s.parentFlushed = !0;
		try {
			t.replay = null, t.blockedSegment = s, xa(e, t, r, i), s.status = 1, ka(e, o, s), o === null ? e.completedRootSegment = s : (Oa(o, s), o.parentFlushed && e.partialBoundaries.push(o));
		} finally {
			t.replay = a, t.blockedSegment = null;
		}
	}
	function pa(e, t, n, r) {
		t.replay !== null && typeof t.replay.slots == "number" ? fa(e, t, t.replay.slots, n, r) : (t.node = n, t.childIndex = r, n = t.componentStack, $i(t), ma(e, t), t.componentStack = n);
	}
	function ma(e, t) {
		var n = t.node, o = t.childIndex;
		if (n !== null) {
			if (typeof n == "object") {
				switch (n.$$typeof) {
					case i:
						var s = n.type, c = n.key, l = n.props;
						n = l.ref;
						var u = n === void 0 ? null : n, f = Mr(s), m = c ?? (o === -1 ? 0 : o);
						if (c = [
							t.keyPath,
							f,
							m
						], t.replay !== null) a: {
							var h = t.replay;
							for (o = h.nodes, n = 0; n < o.length; n++) {
								var g = o[n];
								if (m === g[1]) {
									if (g.length === 4) {
										if (f !== null && f !== g[0]) throw Error(r(490, g[0], f));
										var v = g[2];
										f = g[3], m = t.node, t.replay = {
											nodes: v,
											slots: f,
											pendingTasks: 1
										};
										try {
											if (da(e, t, c, s, l, u), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
											t.replay.pendingTasks--;
										} catch (r) {
											if (typeof r == "object" && r && (r === Yr || typeof r.then == "function")) throw t.node === m ? t.replay = h : o.splice(n, 1), r;
											t.replay.pendingTasks--, l = ta(t.componentStack), c = e, e = t.blockedBoundary, s = r, l = na(c, s, l), Ca(c, e, v, f, s, l);
										}
										t.replay = h;
									} else {
										if (s !== p) throw Error(r(490, "Suspense", Mr(s) || "Unknown"));
										b: {
											h = void 0, s = g[5], u = g[2], f = g[3], m = g[4] === null ? [] : g[4][2], g = g[4] === null ? null : g[4][3];
											var y = t.keyPath, b = t.formatContext, x = t.row, S = t.replay, C = t.blockedBoundary, E = t.hoistableState, D = l.children, O = l.fallback, k = /* @__PURE__ */ new Set();
											l = 2 > t.formatContext.insertionMode ? Yi(e, t.row, k, Ae(), Ae()) : Yi(e, t.row, k, null, null), l.parentFlushed = !0, l.rootSegmentID = s, t.blockedBoundary = l, t.hoistableState = l.contentState, t.keyPath = c, t.formatContext = Ie(e.resumableState, b), t.row = null, t.replay = {
												nodes: u,
												slots: f,
												pendingTasks: 1
											};
											try {
												if (xa(e, t, D, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
												if (t.replay.pendingTasks--, l.pendingTasks === 0 && l.status === 0) {
													l.status = 1, e.completedBoundaries.push(l);
													break b;
												}
											} catch (n) {
												l.status = 4, v = ta(t.componentStack), h = na(e, n, v), l.errorDigest = h, t.replay.pendingTasks--, e.clientRenderedBoundaries.push(l);
											} finally {
												t.blockedBoundary = C, t.hoistableState = E, t.replay = S, t.keyPath = y, t.formatContext = b, t.row = x;
											}
											v = Zi(e, null, {
												nodes: m,
												slots: g,
												pendingTasks: 0
											}, O, -1, C, l.fallbackState, k, [
												c[0],
												"Suspense Fallback",
												c[2]
											], Fe(e.resumableState, t.formatContext), t.context, t.treeContext, t.row, ea(t.componentStack)), $i(v), e.pingedTasks.push(v);
										}
									}
									o.splice(n, 1);
									break a;
								}
							}
						}
						else da(e, t, c, s, l, u);
						return;
					case a: throw Error(r(257));
					case _:
						if (v = n._init, n = v(n._payload), e.status === 12) throw null;
						pa(e, t, n, o);
						return;
				}
				if (T(n)) {
					ha(e, t, n, o);
					return;
				}
				if ((v = w(n)) && (v = v.call(n))) {
					if (n = v.next(), !n.done) {
						l = [];
						do
							l.push(n.value), n = v.next();
						while (!n.done);
						ha(e, t, l, o);
					}
					return;
				}
				if (typeof n.then == "function") return t.thenableState = null, pa(e, t, ki(n), o);
				if (n.$$typeof === d) return pa(e, t, n._currentValue, o);
				throw o = Object.prototype.toString.call(n), Error(r(31, o === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : o));
			}
			typeof n == "string" ? (o = t.blockedSegment, o !== null && (o.lastPushedText = Re(o.chunks, n, e.renderState, o.lastPushedText))) : (typeof n == "number" || typeof n == "bigint") && (o = t.blockedSegment, o !== null && (o.lastPushedText = Re(o.chunks, "" + n, e.renderState, o.lastPushedText)));
		}
	}
	function ha(e, t, n, i) {
		var a = t.keyPath;
		if (i !== -1 && (t.keyPath = [
			t.keyPath,
			"Fragment",
			i
		], t.replay !== null)) {
			for (var o = t.replay, s = o.nodes, c = 0; c < s.length; c++) {
				var l = s[c];
				if (l[1] === i) {
					i = l[2], l = l[3], t.replay = {
						nodes: i,
						slots: l,
						pendingTasks: 1
					};
					try {
						if (ha(e, t, n, -1), t.replay.pendingTasks === 1 && 0 < t.replay.nodes.length) throw Error(r(488));
						t.replay.pendingTasks--;
					} catch (r) {
						if (typeof r == "object" && r && (r === Yr || typeof r.then == "function")) throw r;
						t.replay.pendingTasks--, n = ta(t.componentStack);
						var u = t.blockedBoundary, d = r;
						n = na(e, d, n), Ca(e, u, i, l, d, n);
					}
					t.replay = o, s.splice(c, 1);
					break;
				}
			}
			t.keyPath = a;
			return;
		}
		if (o = t.treeContext, s = n.length, t.replay !== null && (c = t.replay.slots, typeof c == "object" && c)) {
			for (i = 0; i < s; i++) l = n[i], t.treeContext = Ur(o, s, i), u = c[i], typeof u == "number" ? (fa(e, t, u, l, i), delete c[i]) : xa(e, t, l, i);
			t.treeContext = o, t.keyPath = a;
			return;
		}
		for (c = 0; c < s; c++) i = n[c], t.treeContext = Ur(o, s, c), xa(e, t, i, c);
		t.treeContext = o, t.keyPath = a;
	}
	function ga(e, t, n) {
		if (n.status = 5, n.rootSegmentID = e.nextSegmentId++, e = n.trackedContentKeyPath, e === null) throw Error(r(486));
		var i = n.trackedFallbackNode, a = [], o = t.workingMap.get(e);
		return o === void 0 ? (n = [
			e[1],
			e[2],
			a,
			null,
			i,
			n.rootSegmentID
		], t.workingMap.set(e, n), qa(n, e[0], t), n) : (o[4] = i, o[5] = n.rootSegmentID, o);
	}
	function _a(e, t, n, i) {
		i.status = 5;
		var a = n.keyPath, o = n.blockedBoundary;
		if (o === null) i.id = e.nextSegmentId++, t.rootSlots = i.id, e.completedRootSegment !== null && (e.completedRootSegment.status = 5);
		else {
			if (o !== null && o.status === 0) {
				var s = ga(e, t, o);
				if (o.trackedContentKeyPath === a && n.childIndex === -1) {
					i.id === -1 && (i.id = i.parentFlushed ? o.rootSegmentID : e.nextSegmentId++), s[3] = i.id;
					return;
				}
			}
			if (i.id === -1 && (i.id = i.parentFlushed && o !== null ? o.rootSegmentID : e.nextSegmentId++), n.childIndex === -1) a === null ? t.rootSlots = i.id : (n = t.workingMap.get(a), n === void 0 ? (n = [
				a[1],
				a[2],
				[],
				i.id
			], qa(n, a[0], t)) : n[3] = i.id);
			else {
				if (a === null) {
					if (e = t.rootSlots, e === null) e = t.rootSlots = {};
					else if (typeof e == "number") throw Error(r(491));
				} else if (o = t.workingMap, s = o.get(a), s === void 0) e = {}, s = [
					a[1],
					a[2],
					[],
					e
				], o.set(a, s), qa(s, a[0], t);
				else if (e = s[3], e === null) e = s[3] = {};
				else if (typeof e == "number") throw Error(r(491));
				e[n.childIndex] = i.id;
			}
		}
	}
	function va(e, t) {
		e = e.trackedPostpones, e !== null && (t = t.trackedContentKeyPath, t !== null && (t = e.workingMap.get(t), t !== void 0 && (t.length = 4, t[2] = [], t[3] = null)));
	}
	function ya(e, t, n) {
		return Zi(e, n, t.replay, t.node, t.childIndex, t.blockedBoundary, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function ba(e, t, n) {
		var r = t.blockedSegment, i = Qi(e, r.chunks.length, null, t.formatContext, r.lastPushedText, !0);
		return r.children.push(i), r.lastPushedText = !1, Xi(e, n, t.node, t.childIndex, t.blockedBoundary, i, t.blockedPreamble, t.hoistableState, t.abortSet, t.keyPath, t.formatContext, t.context, t.treeContext, t.row, t.componentStack);
	}
	function xa(e, t, n, r) {
		var i = t.formatContext, a = t.context, o = t.keyPath, s = t.treeContext, c = t.componentStack, l = t.blockedSegment;
		if (l === null) {
			l = t.replay;
			try {
				return pa(e, t, n, r);
			} catch (u) {
				if (bi(), n = u === Yr ? Qr() : u, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						r = u === Yr ? yi() : null, e = ya(e, t, r).ping, n.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, Br(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						n = u === Yr ? yi() : null, n = ya(e, t, n), e.pingedTasks.push(n), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, t.replay = l, Br(a);
						return;
					}
				}
			}
		} else {
			var u = l.children.length, d = l.chunks.length;
			try {
				return pa(e, t, n, r);
			} catch (r) {
				if (bi(), l.children.length = u, l.chunks.length = d, n = r === Yr ? Qr() : r, e.status !== 12 && typeof n == "object" && n) {
					if (typeof n.then == "function") {
						l = n, n = r === Yr ? yi() : null, e = ba(e, t, n).ping, l.then(e, e), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, Br(a);
						return;
					}
					if (n.message === "Maximum call stack size exceeded") {
						l = r === Yr ? yi() : null, l = ba(e, t, l), e.pingedTasks.push(l), t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, t.componentStack = c, Br(a);
						return;
					}
				}
			}
		}
		throw t.formatContext = i, t.context = a, t.keyPath = o, t.treeContext = s, Br(a), n;
	}
	function Sa(e) {
		var t = e.blockedBoundary, n = e.blockedSegment;
		n !== null && (n.status = 3, Aa(this, t, e.row, n));
	}
	function Ca(e, t, n, i, a, o) {
		for (var s = 0; s < n.length; s++) {
			var c = n[s];
			if (c.length === 4) Ca(e, t, c[2], c[3], a, o);
			else {
				c = c[5];
				var l = e, u = o, d = Yi(l, null, /* @__PURE__ */ new Set(), null, null);
				d.parentFlushed = !0, d.rootSegmentID = c, d.status = 4, d.errorDigest = u, d.parentFlushed && l.clientRenderedBoundaries.push(d);
			}
		}
		if (n.length = 0, i !== null) {
			if (t === null) throw Error(r(487));
			if (t.status !== 4 && (t.status = 4, t.errorDigest = o, t.parentFlushed && e.clientRenderedBoundaries.push(t)), typeof i == "object") for (var f in i) delete i[f];
		}
	}
	function wa(e, t, n) {
		var r = e.blockedBoundary, i = e.blockedSegment;
		if (i !== null) {
			if (i.status === 6) return;
			i.status = 3;
		}
		var a = ta(e.componentStack);
		if (r === null) {
			if (t.status !== 13 && t.status !== 14) {
				if (r = e.replay, r === null) {
					t.trackedPostpones !== null && i !== null ? (r = t.trackedPostpones, na(t, n, a), _a(t, r, e, i), Aa(t, null, e.row, i)) : (na(t, n, a), ra(t, n));
					return;
				}
				r.pendingTasks--, r.pendingTasks === 0 && 0 < r.nodes.length && (i = na(t, n, a), Ca(t, null, r.nodes, r.slots, n, i)), t.pendingRootTasks--, t.pendingRootTasks === 0 && Ea(t);
			}
		} else {
			var o = t.trackedPostpones;
			if (r.status !== 4) {
				if (o !== null && i !== null) return na(t, n, a), _a(t, o, e, i), r.fallbackAbortableTasks.forEach(function(e) {
					return wa(e, t, n);
				}), r.fallbackAbortableTasks.clear(), Aa(t, r, e.row, i);
				r.status = 4, i = na(t, n, a), r.status = 4, r.errorDigest = i, va(t, r), r.parentFlushed && t.clientRenderedBoundaries.push(r);
			}
			r.pendingTasks--, i = r.row, i !== null && --i.pendingTasks === 0 && ia(t, i), r.fallbackAbortableTasks.forEach(function(e) {
				return wa(e, t, n);
			}), r.fallbackAbortableTasks.clear();
		}
		e = e.row, e !== null && --e.pendingTasks === 0 && ia(t, e), t.allPendingTasks--, t.allPendingTasks === 0 && Da(t);
	}
	function Ta(e, t) {
		try {
			var n = e.renderState, r = n.onHeaders;
			if (r) {
				var i = n.headers;
				if (i) {
					n.headers = null;
					var a = i.preconnects;
					if (i.fontPreloads && (a && (a += ", "), a += i.fontPreloads), i.highImagePreloads && (a && (a += ", "), a += i.highImagePreloads), !t) {
						var o = n.styles.values(), s = o.next();
						b: for (; 0 < i.remainingCapacity && !s.done; s = o.next()) for (var c = s.value.sheets.values(), l = c.next(); 0 < i.remainingCapacity && !l.done; l = c.next()) {
							var u = l.value, d = u.props, f = d.href, p = u.props, m = xr(p.href, "style", {
								crossOrigin: p.crossOrigin,
								integrity: p.integrity,
								nonce: p.nonce,
								type: p.type,
								fetchPriority: p.fetchPriority,
								referrerPolicy: p.referrerPolicy,
								media: p.media
							});
							if (0 <= (i.remainingCapacity -= m.length + 2)) n.resets.style[f] = me, a && (a += ", "), a += m, n.resets.style[f] = typeof d.crossOrigin == "string" || typeof d.integrity == "string" ? [d.crossOrigin, d.integrity] : me;
							else break b;
						}
					}
					r(a ? { Link: a } : {});
				}
			}
		} catch (t) {
			na(e, t, {});
		}
	}
	function Ea(e) {
		e.trackedPostpones === null && Ta(e, !0), e.trackedPostpones === null && Pa(e), e.onShellError = Jr, e = e.onShellReady, e();
	}
	function Da(e) {
		Ta(e, e.trackedPostpones === null ? !0 : e.completedRootSegment === null || e.completedRootSegment.status !== 5), Pa(e), e = e.onAllReady, e();
	}
	function Oa(e, t) {
		if (t.chunks.length === 0 && t.children.length === 1 && t.children[0].boundary === null && t.children[0].id === -1) {
			var n = t.children[0];
			n.id = t.id, n.parentFlushed = !0, n.status !== 1 && n.status !== 3 && n.status !== 4 || Oa(e, n);
		} else e.completedSegments.push(t);
	}
	function ka(e, t, n) {
		if (B !== null) {
			n = n.chunks;
			for (var r = 0, i = 0; i < n.length; i++) r += n[i].byteLength;
			t === null ? e.byteSize += r : t.byteSize += r;
		}
	}
	function Aa(e, t, n, i) {
		if (n !== null && (--n.pendingTasks === 0 ? ia(e, n) : n.together && oa(e, n)), e.allPendingTasks--, t === null) {
			if (i !== null && i.parentFlushed) {
				if (e.completedRootSegment !== null) throw Error(r(389));
				e.completedRootSegment = i;
			}
			e.pendingRootTasks--, e.pendingRootTasks === 0 && Ea(e);
		} else if (t.pendingTasks--, t.status !== 4) if (t.pendingTasks === 0) {
			if (t.status === 0 && (t.status = 1), i !== null && i.parentFlushed && (i.status === 1 || i.status === 3) && Oa(t, i), t.parentFlushed && e.completedBoundaries.push(t), t.status === 1) n = t.row, n !== null && Or(n.hoistables, t.contentState), Bi(e, t) || (t.fallbackAbortableTasks.forEach(Sa, e), t.fallbackAbortableTasks.clear(), n !== null && --n.pendingTasks === 0 && ia(e, n)), e.pendingRootTasks === 0 && e.trackedPostpones === null && t.contentPreamble !== null && Pa(e);
			else if (t.status === 5 && (t = t.row, t !== null)) {
				if (e.trackedPostpones !== null) {
					n = e.trackedPostpones;
					var a = t.next;
					if (a !== null && (i = a.boundaries, i !== null)) for (a.boundaries = null, a = 0; a < i.length; a++) {
						var o = i[a];
						ga(e, n, o), Aa(e, o, null, null);
					}
				}
				--t.pendingTasks === 0 && ia(e, t);
			}
		} else i === null || !i.parentFlushed || i.status !== 1 && i.status !== 3 || (Oa(t, i), t.completedSegments.length === 1 && t.parentFlushed && e.partialBoundaries.push(t)), t = t.row, t !== null && t.together && oa(e, t);
		e.allPendingTasks === 0 && Da(e);
	}
	function ja(e) {
		if (e.status !== 14 && e.status !== 13) {
			var t = Pr, n = ue.H;
			ue.H = ji;
			var i = ue.A;
			ue.A = Ni;
			var a = qi;
			qi = e;
			var o = Mi;
			Mi = e.resumableState;
			try {
				var s = e.pingedTasks, c;
				for (c = 0; c < s.length; c++) {
					var l = s[c], u = e, d = l.blockedSegment;
					if (d === null) {
						var f = u;
						if (l.replay.pendingTasks !== 0) {
							Br(l.context);
							try {
								if (typeof l.replay.slots == "number" ? fa(f, l, l.replay.slots, l.node, l.childIndex) : ma(f, l), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length) throw Error(r(488));
								l.replay.pendingTasks--, l.abortSet.delete(l), Aa(f, l.blockedBoundary, l.row, null);
							} catch (e) {
								bi();
								var p = e === Yr ? Qr() : e;
								if (typeof p == "object" && p && typeof p.then == "function") {
									var m = l.ping;
									p.then(m, m), l.thenableState = e === Yr ? yi() : null;
								} else {
									l.replay.pendingTasks--, l.abortSet.delete(l);
									var h = ta(l.componentStack);
									u = void 0;
									var g = f, _ = l.blockedBoundary, v = f.status === 12 ? f.fatalError : p, y = l.replay.nodes, b = l.replay.slots;
									u = na(g, v, h), Ca(g, _, y, b, v, u), f.pendingRootTasks--, f.pendingRootTasks === 0 && Ea(f), f.allPendingTasks--, f.allPendingTasks === 0 && Da(f);
								}
							}
						}
					} else if (f = void 0, g = d, g.status === 0) {
						g.status = 6, Br(l.context);
						var x = g.children.length, S = g.chunks.length;
						try {
							ma(u, l), g.lastPushedText && g.textEmbedded && g.chunks.push(Le), l.abortSet.delete(l), g.status = 1, ka(u, l.blockedBoundary, g), Aa(u, l.blockedBoundary, l.row, g);
						} catch (e) {
							bi(), g.children.length = x, g.chunks.length = S;
							var C = e === Yr ? Qr() : u.status === 12 ? u.fatalError : e;
							if (u.status === 12 && u.trackedPostpones !== null) {
								var w = u.trackedPostpones, T = ta(l.componentStack);
								l.abortSet.delete(l), na(u, C, T), _a(u, w, l, g), Aa(u, l.blockedBoundary, l.row, g);
							} else if (typeof C == "object" && C && typeof C.then == "function") {
								g.status = 0, l.thenableState = e === Yr ? yi() : null;
								var E = l.ping;
								C.then(E, E);
							} else {
								var D = ta(l.componentStack);
								l.abortSet.delete(l), g.status = 4;
								var O = l.blockedBoundary, k = l.row;
								if (k !== null && --k.pendingTasks === 0 && ia(u, k), u.allPendingTasks--, f = na(u, C, D), O === null) ra(u, C);
								else if (O.pendingTasks--, O.status !== 4) {
									O.status = 4, O.errorDigest = f, va(u, O);
									var A = O.row;
									A !== null && --A.pendingTasks === 0 && ia(u, A), O.parentFlushed && u.clientRenderedBoundaries.push(O), u.pendingRootTasks === 0 && u.trackedPostpones === null && O.contentPreamble !== null && Pa(u);
								}
								u.allPendingTasks === 0 && Da(u);
							}
						}
					}
				}
				s.splice(0, c), e.destination !== null && Ha(e, e.destination);
			} catch (t) {
				na(e, t, {}), ra(e, t);
			} finally {
				Mi = o, ue.H = n, ue.A = i, n === ji && Br(t), qi = a;
			}
		}
	}
	function Ma(e, t, n) {
		t.preambleChildren.length && n.push(t.preambleChildren);
		for (var r = !1, i = 0; i < t.children.length; i++) r = Na(e, t.children[i], n) || r;
		return r;
	}
	function Na(e, t, n) {
		var i = t.boundary;
		if (i === null) return Ma(e, t, n);
		var a = i.contentPreamble, o = i.fallbackPreamble;
		if (a === null || o === null) return !1;
		switch (i.status) {
			case 1:
				if (At(e.renderState, a), e.byteSize += i.byteSize, t = i.completedSegments[0], !t) throw Error(r(391));
				return Ma(e, t, n);
			case 5: if (e.trackedPostpones !== null) return !0;
			case 4: if (t.status === 1) return At(e.renderState, o), Ma(e, t, n);
			default: return !0;
		}
	}
	function Pa(e) {
		if (e.completedRootSegment && e.completedPreambleSegments === null) {
			var t = [], n = e.byteSize, r = Na(e, e.completedRootSegment, t), i = e.renderState.preamble;
			!1 === r || i.headChunks && i.bodyChunks ? e.completedPreambleSegments = t : e.byteSize = n;
		}
	}
	function Fa(e, t, n, i) {
		switch (n.parentFlushed = !0, n.status) {
			case 0: n.id = e.nextSegmentId++;
			case 5: return i = n.id, n.lastPushedText = !1, n.textEmbedded = !1, e = e.renderState, F(t, Nt), F(t, e.placeholderPrefix), e = R(i.toString(16)), F(t, e), I(t, Pt);
			case 1:
				n.status = 2;
				var a = !0, o = n.chunks, s = 0;
				n = n.children;
				for (var c = 0; c < n.length; c++) {
					for (a = n[c]; s < a.index; s++) F(t, o[s]);
					a = La(e, t, a, i);
				}
				for (; s < o.length - 1; s++) F(t, o[s]);
				return s < o.length && (a = I(t, o[s])), a;
			case 3: return !0;
			default: throw Error(r(390));
		}
	}
	var Ia = 0;
	function La(e, t, n, i) {
		var a = n.boundary;
		if (a === null) return Fa(e, t, n, i);
		if (a.parentFlushed = !0, a.status === 4) {
			var o = a.row;
			o !== null && --o.pendingTasks === 0 && ia(e, o), a = a.errorDigest, I(t, Bt), F(t, Ht), a && (F(t, Wt), F(t, R(K(a))), F(t, Ut)), I(t, Gt), Fa(e, t, n, i);
		} else if (a.status !== 1) a.status === 0 && (a.rootSegmentID = e.nextSegmentId++), 0 < a.completedSegments.length && e.partialBoundaries.push(a), Kt(t, e.renderState, a.rootSegmentID), i && Or(i, a.fallbackState), Fa(e, t, n, i);
		else if (!Va && Bi(e, a) && (Ia + a.byteSize > e.progressiveChunkSize || kr(a.contentState))) a.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(a), Kt(t, e.renderState, a.rootSegmentID), Fa(e, t, n, i);
		else {
			if (Ia += a.byteSize, i && Or(i, a.contentState), n = a.row, n !== null && Bi(e, a) && --n.pendingTasks === 0 && ia(e, n), I(t, Lt), n = a.completedSegments, n.length !== 1) throw Error(r(391));
			La(e, t, n[0], i);
		}
		return I(t, Vt);
	}
	function Ra(e, t, n, r) {
		return mn(t, e.renderState, n.parentFormatContext, n.id), La(e, t, n, r), hn(t, n.parentFormatContext);
	}
	function za(e, t, n) {
		Ia = n.byteSize;
		for (var r = n.completedSegments, i = 0; i < r.length; i++) Ba(e, t, n, r[i]);
		r.length = 0, r = n.row, r !== null && Bi(e, n) && --r.pendingTasks === 0 && ia(e, r), Kn(t, n.contentState, e.renderState), r = e.resumableState, e = e.renderState, i = n.rootSegmentID, n = n.contentState;
		var a = e.stylesToHoist;
		return e.stylesToHoist = !1, F(t, e.startInlineScript), F(t, nt), a ? (!(r.instructions & 4) && (r.instructions |= 4, F(t, On)), !(r.instructions & 2) && (r.instructions |= 2, F(t, bn)), r.instructions & 8 ? F(t, Cn) : (r.instructions |= 8, F(t, Sn))) : (!(r.instructions & 2) && (r.instructions |= 2, F(t, bn)), F(t, xn)), r = R(i.toString(16)), F(t, e.boundaryPrefix), F(t, r), F(t, wn), F(t, e.segmentPrefix), F(t, r), a ? (F(t, Tn), ur(t, n)) : F(t, En), n = I(t, Dn), jt(t, e) && n;
	}
	function Ba(e, t, n, i) {
		if (i.status === 2) return !0;
		var a = n.contentState, o = i.id;
		if (o === -1) {
			if ((i.id = n.rootSegmentID) === -1) throw Error(r(392));
			return Ra(e, t, i, a);
		}
		return o === n.rootSegmentID ? Ra(e, t, i, a) : (Ra(e, t, i, a), n = e.resumableState, e = e.renderState, F(t, e.startInlineScript), F(t, nt), n.instructions & 1 ? F(t, _n) : (n.instructions |= 1, F(t, gn)), F(t, e.segmentPrefix), o = R(o.toString(16)), F(t, o), F(t, vn), F(t, e.placeholderPrefix), F(t, o), t = I(t, yn), t);
	}
	var Va = !1;
	function Ha(e, t) {
		N = new Uint8Array(2048), P = 0;
		try {
			if (!(0 < e.pendingRootTasks)) {
				var n, r = e.completedRootSegment;
				if (r !== null) {
					if (r.status === 5) return;
					var i = e.completedPreambleSegments;
					if (i === null) return;
					Ia = e.byteSize;
					var a = e.resumableState, o = e.renderState, s = o.preamble, c = s.htmlChunks, l = s.headChunks, u;
					if (c) {
						for (u = 0; u < c.length; u++) F(t, c[u]);
						if (l) for (u = 0; u < l.length; u++) F(t, l[u]);
						else F(t, Tt("head")), F(t, nt);
					} else if (l) for (u = 0; u < l.length; u++) F(t, l[u]);
					var d = o.charsetChunks;
					for (u = 0; u < d.length; u++) F(t, d[u]);
					d.length = 0, o.preconnects.forEach(qn, t), o.preconnects.clear();
					var f = o.viewportChunks;
					for (u = 0; u < f.length; u++) F(t, f[u]);
					f.length = 0, o.fontPreloads.forEach(qn, t), o.fontPreloads.clear(), o.highImagePreloads.forEach(qn, t), o.highImagePreloads.clear(), he = o, o.styles.forEach(tr, t), he = null;
					var p = o.importMapChunks;
					for (u = 0; u < p.length; u++) F(t, p[u]);
					p.length = 0, o.bootstrapScripts.forEach(qn, t), o.scripts.forEach(qn, t), o.scripts.clear(), o.bulkPreloads.forEach(qn, t), o.bulkPreloads.clear(), c || l || (a.instructions |= 32);
					var m = o.hoistableChunks;
					for (u = 0; u < m.length; u++) F(t, m[u]);
					for (a = m.length = 0; a < i.length; a++) {
						var h = i[a];
						for (o = 0; o < h.length; o++) La(e, t, h[o], null);
					}
					var g = e.renderState.preamble, _ = g.headChunks;
					(g.htmlChunks || _) && F(t, kt("head"));
					var v = g.bodyChunks;
					if (v) for (i = 0; i < v.length; i++) F(t, v[i]);
					La(e, t, r, null), e.completedRootSegment = null;
					var y = e.renderState;
					if (e.allPendingTasks !== 0 || e.clientRenderedBoundaries.length !== 0 || e.completedBoundaries.length !== 0 || e.trackedPostpones !== null && (e.trackedPostpones.rootNodes.length !== 0 || e.trackedPostpones.rootSlots !== null)) {
						var b = e.resumableState;
						if (!(b.instructions & 64)) {
							if (b.instructions |= 64, F(t, y.startInlineScript), !(b.instructions & 32)) {
								b.instructions |= 32;
								var x = "_" + b.idPrefix + "R_";
								F(t, ir), F(t, R(K(x))), F(t, Ke);
							}
							F(t, nt), F(t, Mt), I(t, q);
						}
					}
					jt(t, y);
				}
				var S = e.renderState;
				r = 0;
				var C = S.viewportChunks;
				for (r = 0; r < C.length; r++) F(t, C[r]);
				C.length = 0, S.preconnects.forEach(qn, t), S.preconnects.clear(), S.fontPreloads.forEach(qn, t), S.fontPreloads.clear(), S.highImagePreloads.forEach(qn, t), S.highImagePreloads.clear(), S.styles.forEach(rr, t), S.scripts.forEach(qn, t), S.scripts.clear(), S.bulkPreloads.forEach(qn, t), S.bulkPreloads.clear();
				var w = S.hoistableChunks;
				for (r = 0; r < w.length; r++) F(t, w[r]);
				w.length = 0;
				var T = e.clientRenderedBoundaries;
				for (n = 0; n < T.length; n++) {
					var E = T[n];
					S = t;
					var D = e.resumableState, O = e.renderState, k = E.rootSegmentID, A = E.errorDigest;
					F(S, O.startInlineScript), F(S, nt), D.instructions & 4 ? F(S, An) : (D.instructions |= 4, F(S, kn)), F(S, O.boundaryPrefix), F(S, R(k.toString(16))), F(S, jn), A && (F(S, Mn), F(S, R(Fn(A || ""))));
					var j = I(S, Nn);
					if (!j) {
						e.destination = null, n++, T.splice(0, n);
						return;
					}
				}
				T.splice(0, n);
				var M = e.completedBoundaries;
				for (n = 0; n < M.length; n++) if (!za(e, t, M[n])) {
					e.destination = null, n++, M.splice(0, n);
					return;
				}
				M.splice(0, n), L(t), N = new Uint8Array(2048), P = 0, Va = !0;
				var ee = e.partialBoundaries;
				for (n = 0; n < ee.length; n++) {
					var z = ee[n];
					a: {
						T = e, E = t, Ia = z.byteSize;
						var B = z.completedSegments;
						for (j = 0; j < B.length; j++) if (!Ba(T, E, z, B[j])) {
							j++, B.splice(0, j);
							var V = !1;
							break a;
						}
						B.splice(0, j);
						var H = z.row;
						H !== null && H.together && z.pendingTasks === 1 && (H.pendingTasks === 1 ? aa(T, H, H.hoistables) : H.pendingTasks--), V = Kn(E, z.contentState, T.renderState);
					}
					if (!V) {
						e.destination = null, n++, ee.splice(0, n);
						return;
					}
				}
				ee.splice(0, n), Va = !1;
				var U = e.completedBoundaries;
				for (n = 0; n < U.length; n++) if (!za(e, t, U[n])) {
					e.destination = null, n++, U.splice(0, n);
					return;
				}
				U.splice(0, n);
			}
		} finally {
			Va = !1, e.allPendingTasks === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 ? (e.flushScheduled = !1, n = e.resumableState, n.hasBody && F(t, kt("body")), n.hasHtml && F(t, kt("html")), L(t), e.status = 14, t.close(), e.destination = null) : L(t);
		}
	}
	function Ua(e) {
		e.flushScheduled = e.destination !== null, M(function() {
			return ja(e);
		}), k(function() {
			e.status === 10 && (e.status = 11), e.trackedPostpones === null && Ta(e, e.pendingRootTasks === 0);
		});
	}
	function Wa(e) {
		!1 === e.flushScheduled && e.pingedTasks.length === 0 && e.destination !== null && (e.flushScheduled = !0, k(function() {
			var t = e.destination;
			t ? Ha(e, t) : e.flushScheduled = !1;
		}));
	}
	function Ga(e, t) {
		if (e.status === 13) e.status = 14, V(t, e.fatalError);
		else if (e.status !== 14 && e.destination === null) {
			e.destination = t;
			try {
				Ha(e, t);
			} catch (t) {
				na(e, t, {}), ra(e, t);
			}
		}
	}
	function Ka(e, t) {
		(e.status === 11 || e.status === 10) && (e.status = 12);
		try {
			var n = e.abortableTasks;
			if (0 < n.size) {
				var i = t === void 0 ? Error(r(432)) : typeof t == "object" && t && typeof t.then == "function" ? Error(r(530)) : t;
				e.fatalError = i, n.forEach(function(t) {
					return wa(t, e, i);
				}), n.clear();
			}
			e.destination !== null && Ha(e, e.destination);
		} catch (t) {
			na(e, t, {}), ra(e, t);
		}
	}
	function qa(e, t, n) {
		if (t === null) n.rootNodes.push(e);
		else {
			var r = n.workingMap, i = r.get(t);
			i === void 0 && (i = [
				t[1],
				t[2],
				[],
				null
			], r.set(t, i), qa(i, t[0], n)), i[2].push(e);
		}
	}
	function Ja(e) {
		var t = e.trackedPostpones;
		if (t === null || t.rootNodes.length === 0 && t.rootSlots === null) return e.trackedPostpones = null;
		if (e.completedRootSegment === null || e.completedRootSegment.status !== 5 && e.completedPreambleSegments !== null) {
			var n = e.nextSegmentId, r = t.rootSlots, i = e.resumableState;
			i.bootstrapScriptContent = void 0, i.bootstrapScripts = void 0, i.bootstrapModules = void 0;
		} else {
			n = 0, r = -1, i = e.resumableState;
			var a = e.renderState;
			i.nextFormID = 0, i.hasBody = !1, i.hasHtml = !1, i.unknownResources = { font: a.resets.font }, i.dnsResources = a.resets.dns, i.connectResources = a.resets.connect, i.imageResources = a.resets.image, i.styleResources = a.resets.style, i.scriptResources = {}, i.moduleUnknownResources = {}, i.moduleScriptResources = {}, i.instructions = 0;
		}
		return {
			nextSegmentId: n,
			rootFormatContext: e.rootFormatContext,
			progressiveChunkSize: e.progressiveChunkSize,
			resumableState: e.resumableState,
			replayNodes: t.rootNodes,
			replaySlots: r
		};
	}
	function Ya() {
		var e = t.version;
		if (e !== "19.2.6") throw Error(r(527, e, "19.2.6"));
	}
	Ya(), Ya(), e.prerender = function(e, t) {
		return new Promise(function(n, r) {
			var i = t ? t.onHeaders : void 0, a;
			i && (a = function(e) {
				i(new Headers(e));
			});
			var o = ke(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), s = Wi(e, o, Oe(o, void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, a, t ? t.maxHeadersLength : void 0), Me(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ga(s, e);
					},
					cancel: function(e) {
						s.destination = null, Ka(s, e);
					}
				}, { highWaterMark: 0 });
				e = {
					postponed: Ja(s),
					prelude: e
				}, n(e);
			}, void 0, void 0, r, t ? t.onPostpone : void 0);
			if (t && t.signal) {
				var c = t.signal;
				if (c.aborted) Ka(s, c.reason);
				else {
					var l = function() {
						Ka(s, c.reason), c.removeEventListener("abort", l);
					};
					c.addEventListener("abort", l);
				}
			}
			Ua(s);
		});
	}, e.renderToReadableStream = function(e, t) {
		return new Promise(function(n, r) {
			var i, a, o = new Promise(function(e, t) {
				a = e, i = t;
			}), s = t ? t.onHeaders : void 0, c;
			s && (c = function(e) {
				s(new Headers(e));
			});
			var l = ke(t ? t.identifierPrefix : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.bootstrapScriptContent : void 0, t ? t.bootstrapScripts : void 0, t ? t.bootstrapModules : void 0), u = Ui(e, l, Oe(l, t ? t.nonce : void 0, t ? t.unstable_externalRuntimeSrc : void 0, t ? t.importMap : void 0, c, t ? t.maxHeadersLength : void 0), Me(t ? t.namespaceURI : void 0), t ? t.progressiveChunkSize : void 0, t ? t.onError : void 0, a, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ga(u, e);
					},
					cancel: function(e) {
						u.destination = null, Ka(u, e);
					}
				}, { highWaterMark: 0 });
				e.allReady = o, n(e);
			}, function(e) {
				o.catch(function() {}), r(e);
			}, i, t ? t.onPostpone : void 0, t ? t.formState : void 0);
			if (t && t.signal) {
				var d = t.signal;
				if (d.aborted) Ka(u, d.reason);
				else {
					var f = function() {
						Ka(u, d.reason), d.removeEventListener("abort", f);
					};
					d.addEventListener("abort", f);
				}
			}
			Ua(u);
		});
	}, e.resume = function(e, t, n) {
		return new Promise(function(r, i) {
			var a, o, s = new Promise(function(e, t) {
				o = e, a = t;
			}), c = Gi(e, t, Oe(t.resumableState, n ? n.nonce : void 0, void 0, void 0, void 0, void 0), n ? n.onError : void 0, o, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ga(c, e);
					},
					cancel: function(e) {
						c.destination = null, Ka(c, e);
					}
				}, { highWaterMark: 0 });
				e.allReady = s, r(e);
			}, function(e) {
				s.catch(function() {}), i(e);
			}, a, n ? n.onPostpone : void 0);
			if (n && n.signal) {
				var l = n.signal;
				if (l.aborted) Ka(c, l.reason);
				else {
					var u = function() {
						Ka(c, l.reason), l.removeEventListener("abort", u);
					};
					l.addEventListener("abort", u);
				}
			}
			Ua(c);
		});
	}, e.resumeAndPrerender = function(e, t, n) {
		return new Promise(function(r, i) {
			var a = Ki(e, t, Oe(t.resumableState, void 0, void 0, void 0, void 0, void 0), n ? n.onError : void 0, function() {
				var e = new ReadableStream({
					type: "bytes",
					pull: function(e) {
						Ga(a, e);
					},
					cancel: function(e) {
						a.destination = null, Ka(a, e);
					}
				}, { highWaterMark: 0 });
				e = {
					postponed: Ja(a),
					prelude: e
				}, r(e);
			}, void 0, void 0, i, n ? n.onPostpone : void 0);
			if (n && n.signal) {
				var o = n.signal;
				if (o.aborted) Ka(a, o.reason);
				else {
					var s = function() {
						Ka(a, o.reason), o.removeEventListener("abort", s);
					};
					o.addEventListener("abort", s);
				}
			}
			Ua(a);
		});
	}, e.version = "19.2.6";
})), y = /* @__PURE__ */ o(((e) => {
	var t = _(), n = v();
	e.version = t.version, e.renderToString = t.renderToString, e.renderToStaticMarkup = t.renderToStaticMarkup, e.renderToReadableStream = n.renderToReadableStream, e.resume = n.resume;
})), b = /* @__PURE__ */ c(u(), 1), x = /* @__PURE__ */ c(m(), 1), S = g(), C = y();
function w(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = w(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function T() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = w(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var E = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, D = T, O = (e, t) => (n) => {
	if (t?.variants == null) return D(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = E(t) || E(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return D(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, k = Object.defineProperty, A = (e, t) => k(e, "name", {
	value: t,
	configurable: !0
});
function j(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
A(j, "setRef");
function M(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = j(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : j(e[t], null);
			}
		};
	};
}
A(M, "composeRefs");
function N(...e) {
	return b.useCallback(M(...e), e);
}
A(N, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs
var P = Object.defineProperty, F = (e, t) => P(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function I(e) {
	let t = b.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		U(r) && typeof re == "function" && (r = re(r._payload)), b.Children.forEach(r, (e) => {
			if (V(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				U(n) && typeof re == "function" && (n = re(n._payload)), a = R(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = b.cloneElement(a, void 0, s) : !o && b.Children.count(r) === 1 && b.isValidElement(r) && (a = r);
		let c = a ? B(a) : void 0, l = N(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? ne(e) : te(e));
			return r;
		}
		let u = z(i, a.props ?? {});
		return a.type !== b.Fragment && (u.ref = n ? l : c), b.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
F(I, "createSlot");
var L = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function ee(e) {
	let t = /* @__PURE__ */ F((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = L, t;
}
F(ee, "createSlottable");
var R = /* @__PURE__ */ F((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return b.isValidElement(t) ? b.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return b.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function z(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
F(z, "mergeProps");
function B(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
F(B, "getElementRef");
function V(e) {
	return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === L;
}
F(V, "isSlottable");
var H = Symbol.for("react.lazy");
function U(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === H && "_payload" in e && W(e._payload);
}
F(U, "isLazyComponent");
function W(e) {
	return typeof e == "object" && !!e && "then" in e;
}
F(W, "isPromiseLike");
var te = /* @__PURE__ */ F((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), ne = /* @__PURE__ */ F((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), re = b.use, ie = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), G = (/* @__PURE__ */ o(((e, t) => {
	t.exports = ie();
})))(), ae = Object.defineProperty, K = (e, t) => ae(e, "name", {
	value: t,
	configurable: !0
}), oe = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ I(`Primitive.${t}`), r = b.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, G.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function se(e, t) {
	e && x.flushSync(() => e.dispatchEvent(t));
}
K(se, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var ce = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), le = Object.defineProperty, ue = (e, t) => le(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function de(e, t) {
	let n = b.createContext(t);
	n.displayName = e + "Context";
	let r = /* @__PURE__ */ ue((e) => {
		let { children: t, ...r } = e, i = b.useMemo(() => r, Object.values(r));
		return /* @__PURE__ */ (0, G.jsx)(n.Provider, {
			value: i,
			children: t
		});
	}, "Provider");
	r.displayName = e + "Provider";
	function i(r, i = {}) {
		let { optional: a = !1 } = i, o = b.useContext(n);
		if (o) return o;
		if (t !== void 0) return t;
		if (!a) throw Error(`\`${r}\` must be used within \`${e}\``);
	}
	return ue(i, "useContext"), [r, i];
}
ue(de, "createContext");
/* @__NO_SIDE_EFFECTS__ */
function fe(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = b.createContext(r);
		i.displayName = t + "Context";
		let a = n.length;
		n = [...n, r];
		let o = /* @__PURE__ */ ue((t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = b.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, G.jsx)(s.Provider, {
				value: c,
				children: r
			});
		}, "Provider");
		o.displayName = t + "Provider";
		function s(n, o, s = {}) {
			let { optional: c = !1 } = s, l = o?.[e]?.[a] || i, u = b.useContext(l);
			if (u) return u;
			if (r !== void 0) return r;
			if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return ue(s, "useContext"), [o, s];
	}
	ue(r, "createContext");
	let i = /* @__PURE__ */ ue(() => {
		let t = n.map((e) => b.createContext(e));
		return /* @__PURE__ */ ue(function(n) {
			let r = n?.[e] || t;
			return b.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		}, "useScope");
	}, "createScope");
	return i.scopeName = e, [r, pe(i, ...t)];
}
ue(fe, "createContextScope");
function pe(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = /* @__PURE__ */ ue(() => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ ue(function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return b.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		}, "useComposedScopes");
	}, "createScope");
	return n.scopeName = t.scopeName, n;
}
ue(pe, "composeContextScopes");
//#endregion
//#region node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var me = Object.defineProperty, he = (e, t) => me(e, "name", {
	value: t,
	configurable: !0
});
function ge(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
he(ge, "setRef");
function q(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = ge(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : ge(e[t], null);
			}
		};
	};
}
he(q, "composeRefs");
function _e(...e) {
	return b.useCallback(q(...e), e);
}
he(_e, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-slot/dist/index.mjs
var ve = Object.defineProperty, ye = (e, t) => ve(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function be(e) {
	let t = b.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		Oe(r) && typeof Me == "function" && (r = Me(r._payload)), b.Children.forEach(r, (e) => {
			if (Ee(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				Oe(n) && typeof Me == "function" && (n = Me(n._payload)), a = Ce(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = b.cloneElement(a, void 0, s) : !o && b.Children.count(r) === 1 && b.isValidElement(r) && (a = r);
		let c = a ? Te(a) : void 0, l = _e(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? je(e) : Ae(e));
			return r;
		}
		let u = we(i, a.props ?? {});
		return a.type !== b.Fragment && (u.ref = n ? l : c), b.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
ye(be, "createSlot");
var xe = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function Se(e) {
	let t = /* @__PURE__ */ ye((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = xe, t;
}
ye(Se, "createSlottable");
var Ce = /* @__PURE__ */ ye((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return b.isValidElement(t) ? b.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return b.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function we(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
ye(we, "mergeProps");
function Te(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
ye(Te, "getElementRef");
function Ee(e) {
	return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === xe;
}
ye(Ee, "isSlottable");
var De = Symbol.for("react.lazy");
function Oe(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === De && "_payload" in e && ke(e._payload);
}
ye(Oe, "isLazyComponent");
function ke(e) {
	return typeof e == "object" && !!e && "then" in e;
}
ye(ke, "isPromiseLike");
var Ae = /* @__PURE__ */ ye((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), je = /* @__PURE__ */ ye((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Me = b.use, Ne = Object.defineProperty, Pe = (e, t) => Ne(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function Fe(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ fe(t), [i, a] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), o = /* @__PURE__ */ Pe((e) => {
		let { scope: t, children: n } = e, r = b.useRef(null), a = b.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, G.jsx)(i, {
			scope: t,
			itemMap: a,
			collectionRef: r,
			children: n
		});
	}, "CollectionProvider");
	o.displayName = t;
	let s = e + "CollectionSlot", c = /* @__PURE__ */ be(s), l = b.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, G.jsx)(c, {
			ref: _e(t, a(s, n).collectionRef),
			children: r
		});
	});
	l.displayName = s;
	let u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ be(u), p = b.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = b.useRef(null), s = _e(t, o), c = a(u, n);
		return b.useEffect(() => (c.itemMap.set(o, {
			ref: o,
			...i
		}), () => void c.itemMap.delete(o))), /* @__PURE__ */ (0, G.jsx)(f, {
			[d]: "",
			ref: s,
			children: r
		});
	});
	p.displayName = u;
	function m(t) {
		let n = a(e + "CollectionConsumer", t);
		return b.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${d}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return Pe(m, "useCollection"), [
		{
			Provider: o,
			Slot: l,
			ItemSlot: p
		},
		m,
		r
	];
}
Pe(Fe, "createCollection");
var Ie = /* @__PURE__ */ new WeakMap(), Le = class e extends Map {
	static {
		Pe(this, "OrderedDict");
	}
	#e;
	constructor(e) {
		super(e), this.#e = [...super.keys()], Ie.set(this, !0);
	}
	set(e, t) {
		return Ie.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this;
	}
	insert(e, t, n) {
		let r = this.has(t), i = this.#e.length, a = Be(e), o = a >= 0 ? a : i + a, s = o < 0 || o >= i ? -1 : o;
		if (s === this.size || r && s === this.size - 1 || s === -1) return this.set(t, n), this;
		let c = this.size + +!r;
		a < 0 && o++;
		let l = [...this.#e], u, d = !1;
		for (let e = o; e < c; e++) if (o === e) {
			let i = l[e];
			l[e] === t && (i = l[e + 1]), r && this.delete(t), u = this.get(i), this.set(t, n);
		} else {
			!d && l[e - 1] === t && (d = !0);
			let n = l[d ? e : e - 1], r = u;
			u = this.get(n), this.delete(n), this.set(n, r);
		}
		return this;
	}
	with(t, n, r) {
		let i = new e(this);
		return i.insert(t, n, r), i;
	}
	before(e) {
		let t = this.#e.indexOf(e) - 1;
		if (!(t < 0)) return this.entryAt(t);
	}
	setBefore(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r, t, n);
	}
	after(e) {
		let t = this.#e.indexOf(e);
		if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1) return this.entryAt(t);
	}
	setAfter(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r + 1, t, n);
	}
	first() {
		return this.entryAt(0);
	}
	last() {
		return this.entryAt(-1);
	}
	clear() {
		return this.#e = [], super.clear();
	}
	delete(e) {
		let t = super.delete(e);
		return t && this.#e.splice(this.#e.indexOf(e), 1), t;
	}
	deleteAt(e) {
		let t = this.keyAt(e);
		return t === void 0 ? !1 : this.delete(t);
	}
	at(e) {
		let t = Re(this.#e, e);
		if (t !== void 0) return this.get(t);
	}
	entryAt(e) {
		let t = Re(this.#e, e);
		if (t !== void 0) return [t, this.get(t)];
	}
	indexOf(e) {
		return this.#e.indexOf(e);
	}
	keyAt(e) {
		return Re(this.#e, e);
	}
	from(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r);
	}
	keyFrom(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r);
	}
	find(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return r;
			n++;
		}
	}
	findIndex(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return n;
			n++;
		}
		return -1;
	}
	filter(t, n) {
		let r = [], i = 0;
		for (let e of this) Reflect.apply(t, n, [
			e,
			i,
			this
		]) && r.push(e), i++;
		return new e(r);
	}
	map(t, n) {
		let r = [], i = 0;
		for (let e of this) r.push([e[0], Reflect.apply(t, n, [
			e,
			i,
			this
		])]), i++;
		return new e(r);
	}
	reduce(...e) {
		let [t, n] = e, r = 0, i = n ?? this.at(0);
		for (let n of this) i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [
			i,
			n,
			r,
			this
		]), r++;
		return i;
	}
	reduceRight(...e) {
		let [t, n] = e, r = n ?? this.at(-1);
		for (let n = this.size - 1; n >= 0; n--) {
			let i = this.at(n);
			r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [
				r,
				i,
				n,
				this
			]);
		}
		return r;
	}
	toSorted(t) {
		return new e([...this.entries()].sort(t));
	}
	toReversed() {
		let t = new e();
		for (let e = this.size - 1; e >= 0; e--) {
			let n = this.keyAt(e), r = this.get(n);
			t.set(n, r);
		}
		return t;
	}
	toSpliced(...t) {
		let n = [...this.entries()];
		return n.splice(...t), new e(n);
	}
	slice(t, n) {
		let r = new e(), i = this.size - 1;
		if (t === void 0) return r;
		t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1);
		for (let e = t; e <= i; e++) {
			let t = this.keyAt(e), n = this.get(t);
			r.set(t, n);
		}
		return r;
	}
	every(e, t) {
		let n = 0;
		for (let r of this) {
			if (!Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !1;
			n++;
		}
		return !0;
	}
	some(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !0;
			n++;
		}
		return !1;
	}
};
function Re(e, t) {
	if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
	let n = ze(e, t);
	return n === -1 ? void 0 : e[n];
}
Pe(Re, "at");
function ze(e, t) {
	let n = e.length, r = Be(t), i = r >= 0 ? r : n + r;
	return i < 0 || i >= n ? -1 : i;
}
Pe(ze, "toSafeIndex");
function Be(e) {
	return e !== e || e === 0 ? 0 : Math.trunc(e);
}
Pe(Be, "toSafeInteger");
/* @__NO_SIDE_EFFECTS__ */
function Ve(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ fe(t), [i, a] = n(t, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new Le(),
		setItemMap: /* @__PURE__ */ Pe(() => void 0, "setItemMap")
	}), o = /* @__PURE__ */ Pe(({ state: e, ...t }) => e ? /* @__PURE__ */ (0, G.jsx)(c, {
		...t,
		state: e
	}) : /* @__PURE__ */ (0, G.jsx)(s, { ...t }), "CollectionProvider");
	o.displayName = t;
	let s = /* @__PURE__ */ Pe((e) => {
		let t = h();
		return /* @__PURE__ */ (0, G.jsx)(c, {
			...e,
			state: t
		});
	}, "CollectionInit");
	s.displayName = t + "Init";
	let c = /* @__PURE__ */ Pe((e) => {
		let { scope: t, children: n, state: r } = e, a = b.useRef(null), [o, s] = b.useState(null), c = _e(a, s), [l, u] = r;
		return b.useEffect(() => {
			if (!o) return;
			let e = Ge(() => {});
			return e.observe(o, {
				childList: !0,
				subtree: !0
			}), () => {
				e.disconnect();
			};
		}, [o]), /* @__PURE__ */ (0, G.jsx)(i, {
			scope: t,
			itemMap: l,
			setItemMap: u,
			collectionRef: c,
			collectionRefObject: a,
			collectionElement: o,
			children: n
		});
	}, "CollectionProviderImpl");
	c.displayName = t + "Impl";
	let l = e + "CollectionSlot", u = /* @__PURE__ */ be(l), d = b.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, G.jsx)(u, {
			ref: _e(t, a(l, n).collectionRef),
			children: r
		});
	});
	d.displayName = l;
	let f = e + "CollectionItemSlot", p = /* @__PURE__ */ be(f), m = b.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = b.useRef(null), [s, c] = b.useState(null), l = _e(t, o, c), { setItemMap: u } = a(f, n), d = b.useRef(i);
		He(d.current, i) || (d.current = i);
		let m = d.current;
		return b.useEffect(() => {
			let e = m;
			return u((t) => s ? t.has(s) ? t.set(s, {
				...e,
				element: s
			}).toSorted(We) : (t.set(s, {
				...e,
				element: s
			}), t.toSorted(We)) : t), () => {
				u((e) => !s || !e.has(s) ? e : (e.delete(s), new Le(e)));
			};
		}, [
			s,
			m,
			u
		]), /* @__PURE__ */ (0, G.jsx)(p, {
			"data-radix-collection-item": "",
			ref: l,
			children: r
		});
	});
	m.displayName = f;
	function h() {
		return b.useState(new Le());
	}
	Pe(h, "useInitCollection");
	function g(t) {
		let { itemMap: n } = a(e + "CollectionConsumer", t);
		return n;
	}
	return Pe(g, "useCollection"), [{
		Provider: o,
		Slot: d,
		ItemSlot: m
	}, {
		createCollectionScope: r,
		useCollection: g,
		useInitCollection: h
	}];
}
Pe(Ve, "createCollection");
function He(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e == null || t == null) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
	return !0;
}
Pe(He, "shallowEqual");
function Ue(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
Pe(Ue, "isElementPreceding");
function We(e, t) {
	return !e[1].element || !t[1].element ? 0 : Ue(e[1].element, t[1].element) ? -1 : 1;
}
Pe(We, "sortByDocumentPosition");
function Ge(e) {
	return new MutationObserver((t) => {
		for (let n of t) if (n.type === "childList") {
			e();
			return;
		}
	});
}
Pe(Ge, "getChildListObserver");
//#endregion
//#region node_modules/@radix-ui/primitive/dist/index.mjs
var Ke = Object.defineProperty, qe = (e, t) => Ke(e, "name", {
	value: t,
	configurable: !0
}), Je = !!(typeof window < "u" && window.document && window.document.createElement);
function J(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ qe(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
qe(J, "composeEventHandlers");
function Ye(e) {
	if (!Je) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
qe(Ye, "getOwnerWindow");
function Xe(e) {
	if (!Je) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
qe(Xe, "getOwnerDocument");
function Ze(e, t = !1) {
	let { activeElement: n } = Xe(e);
	if (!n?.nodeName) return null;
	if (Qe(n) && n.contentDocument) return Ze(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = Xe(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
qe(Ze, "getActiveElement");
function Qe(e) {
	return e.tagName === "IFRAME";
}
qe(Qe, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var $e = globalThis?.document ? b.useLayoutEffect : () => {}, et = Object.defineProperty, tt = (e, t) => et(e, "name", {
	value: t,
	configurable: !0
}), nt = b.useEffectEvent, rt = b.useInsertionEffect;
function it(e) {
	if (typeof nt == "function") return nt(e);
	let t = b.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof rt == "function" ? rt(() => {
		t.current = e;
	}) : $e(() => {
		t.current = e;
	}), b.useMemo(() => ((...e) => t.current?.(...e)), []);
}
tt(it, "useEffectEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var at = Object.defineProperty, ot = (e, t) => at(e, "name", {
	value: t,
	configurable: !0
}), st = b.useInsertionEffect || $e;
function ct({ prop: e, defaultProp: t, onChange: n = /* @__PURE__ */ ot(() => {}, "onChange"), caller: r }) {
	let [i, a, o] = lt({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0;
	return [s ? e : i, b.useCallback((t) => {
		if (s) {
			let n = ut(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
ot(ct, "useControllableState");
function lt({ defaultProp: e, onChange: t }) {
	let [n, r] = b.useState(e), i = b.useRef(n), a = b.useRef(t);
	return st(() => {
		a.current = t;
	}, [t]), b.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
ot(lt, "useUncontrolledState");
function ut(e) {
	return typeof e == "function";
}
ot(ut, "isFunction");
var dt = Symbol("RADIX:SYNC_STATE");
function ft(e, t, n, r) {
	let { prop: i, defaultProp: a, onChange: o, caller: s } = t, c = i !== void 0, l = it(o), u = [{
		...n,
		state: a
	}];
	r && u.push(r);
	let [d, f] = b.useReducer((t, n) => {
		if (n.type === dt) return {
			...t,
			state: n.state
		};
		let r = e(t, n);
		return c && !Object.is(r.state, t.state) && l(r.state), r;
	}, ...u), p = d.state, m = b.useRef(p);
	b.useEffect(() => {
		m.current !== p && (m.current = p, c || l(p));
	}, [
		p,
		m,
		c
	]);
	let h = b.useMemo(() => i === void 0 ? d : {
		...d,
		state: i
	}, [d, i]);
	return b.useEffect(() => {
		c && !Object.is(i, d.state) && f({
			type: dt,
			state: i
		});
	}, [
		i,
		d.state,
		c
	]), [h, f];
}
ot(ft, "useControllableStateReducer");
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
var pt = Object.defineProperty, mt = (e, t) => pt(e, "name", {
	value: t,
	configurable: !0
});
function ht(e, t) {
	return b.useReducer((e, n) => t[e][n] ?? e, e);
}
mt(ht, "useStateMachine");
var gt = /* @__PURE__ */ mt((e) => {
	let { present: t, children: n } = e, r = _t(t), i = typeof n == "function" ? n({ present: r.isPresent }) : b.Children.only(n), a = yt(r.ref, xt(i));
	return typeof n == "function" || r.isPresent ? b.cloneElement(i, { ref: a }) : null;
}, "Presence");
function _t(e) {
	let [t, n] = b.useState(), r = b.useRef(null), i = b.useRef(e), a = b.useRef("none"), o = b.useRef(void 0), [s, c] = ht(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return b.useEffect(() => {
		s === "mounted" ? (a.current = o.current ?? bt(r.current), o.current = void 0) : a.current = "none";
	}, [s]), $e(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, s = bt(t);
			e ? (o.current = s, c("MOUNT")) : s === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== s ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, c]), $e(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = /* @__PURE__ */ mt((a) => {
				let o = bt(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (c("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ mt((e) => {
				e.target === t && (a.current = bt(r.current));
			}, "handleAnimationStart");
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		} else c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: b.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, o.current = bt(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
mt(_t, "usePresence");
function vt(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
mt(vt, "setRef");
function yt(...e) {
	let t = b.useRef(e);
	return t.current = e, b.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = vt(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : vt(n[e], null);
			}
		};
	}, []);
}
mt(yt, "useStableComposedRefs");
function bt(e) {
	return e?.animationName || "none";
}
mt(bt, "getAnimationName");
function xt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
mt(xt, "getElementRef");
//#endregion
//#region node_modules/@radix-ui/react-id/dist/index.mjs
var St = Object.defineProperty, Ct = (e, t) => St(e, "name", {
	value: t,
	configurable: !0
}), wt = b.useId || (() => void 0), Tt = 0;
function Et(e) {
	let [t, n] = b.useState(wt());
	return $e(() => {
		e || n((e) => e ?? String(Tt++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
Ct(Et, "useId");
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var Dt = Object.defineProperty, Ot = (e, t) => Dt(e, "name", {
	value: t,
	configurable: !0
}), kt = b.createContext(void 0);
function At(e) {
	let t = b.useContext(kt);
	return e || t || "ltr";
}
Ot(At, "useDirection");
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var jt = Object.defineProperty, Mt = (e, t) => jt(e, "name", {
	value: t,
	configurable: !0
});
function Nt(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Mt(Nt, "setRef");
function Pt(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Nt(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Nt(e[t], null);
			}
		};
	};
}
Mt(Pt, "composeRefs");
function Ft(...e) {
	return b.useCallback(Pt(...e), e);
}
Mt(Ft, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var It = Object.defineProperty, Lt = (e, t) => It(e, "name", {
	value: t,
	configurable: !0
});
function Rt(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Lt(Rt, "setRef");
function zt(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Rt(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Rt(e[t], null);
			}
		};
	};
}
Lt(zt, "composeRefs");
function Bt(...e) {
	return b.useCallback(zt(...e), e);
}
Lt(Bt, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var Vt = Object.defineProperty, Ht = (e, t) => Vt(e, "name", {
	value: t,
	configurable: !0
});
function Ut(e) {
	let t = b.useRef(e);
	return b.useEffect(() => {
		t.current = e;
	}), b.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Ht(Ut, "useCallbackRef");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Wt = Object.defineProperty, Gt = (e, t) => Wt(e, "name", {
	value: t,
	configurable: !0
}), Kt = "dismissableLayer.update", qt = "dismissableLayer.pointerDownOutside", Jt = "dismissableLayer.focusOutside", Yt, Xt = b.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), Zt = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Gt(function(e, t) {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = e, u = b.useContext(Xt), [d, f] = b.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = b.useState({}), h = Bt(t, f), g = Array.from(u.layers), [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = _ ? g.indexOf(_) : -1, y = d ? g.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = y >= v, C = b.useRef(!1), w = $t((e) => {
		a?.(e), s?.(e), e.defaultPrevented || c?.();
	}, {
		ownerDocument: p,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: C,
		dismissableSurfaces: u.dismissableSurfaces,
		shouldHandlePointerDownOutside: b.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...u.branches].some((t) => t.contains(e));
			return S && !t;
		}, [u.branches, S])
	}), T = en((e) => {
		if (r && C.current) return;
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p), E = d ? y === g.length - 1 : !1, D = Ut((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	});
	return b.useEffect(() => {
		if (E) return p.addEventListener("keydown", D, { capture: !0 }), () => p.removeEventListener("keydown", D, { capture: !0 });
	}, [
		p,
		E,
		D
	]), b.useEffect(() => {
		if (d) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Yt = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), tn(), () => {
			n && (u.layersWithOutsidePointerEventsDisabled.delete(d), u.layersWithOutsidePointerEventsDisabled.size === 0 && (p.body.style.pointerEvents = Yt));
		};
	}, [
		d,
		p,
		n,
		u
	]), b.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), tn());
	}, [d, u]), b.useEffect(() => {
		let e = /* @__PURE__ */ Gt(() => m({}), "handleUpdate");
		return document.addEventListener(Kt, e), () => document.removeEventListener(Kt, e);
	}, []), /* @__PURE__ */ (0, G.jsx)(oe.div, {
		...l,
		ref: h,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: J(e.onFocusCapture, T.onFocusCapture),
		onBlurCapture: J(e.onBlurCapture, T.onBlurCapture),
		onPointerDownCapture: J(e.onPointerDownCapture, w.onPointerDownCapture)
	});
}, "DismissableLayer"));
function Y() {
	let e = b.useContext(Xt), [t, n] = b.useState(null);
	return b.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
Gt(Y, "useDismissableLayerSurface");
var Qt = /* @__PURE__ */ Gt(() => !0, "IS_TRUE");
function $t(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: a, shouldHandlePointerDownOutside: o = Qt } = t, s = Ut(e), c = b.useRef(!1), l = b.useRef(!1), u = b.useRef(/* @__PURE__ */ new Map()), d = b.useRef(() => {});
	return b.useEffect(() => {
		function e() {
			l.current = !1, i.current = !1, u.current.clear();
		}
		Gt(e, "resetOutsideInteraction");
		function t() {
			return Array.from(u.current.values()).some(Boolean);
		}
		Gt(t, "isOutsideInteractionIntercepted");
		function f(e) {
			if (!l.current) return;
			let t = e.target;
			t instanceof Node && [...a].some((e) => e.contains(t)) || u.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				l.current && d.current();
			}, 0);
		}
		Gt(f, "handleInteractionCapture");
		function p(e) {
			l.current && u.current.set(e.type, !1);
		}
		Gt(p, "handleInteractionBubble");
		let m = /* @__PURE__ */ Gt((a) => {
			if (a.target && !c.current) {
				let f = function() {
					n.removeEventListener("click", d.current);
					let r = t();
					e(), r || nn(qt, s, p, { discrete: !0 });
				};
				if (Gt(f, "handleAndDispatchPointerDownOutsideEvent"), !o(a.target)) {
					n.removeEventListener("click", d.current), e(), c.current = !1;
					return;
				}
				let p = { originalEvent: a };
				l.current = !0, i.current = r && a.button === 0, u.current.clear(), !r || a.button !== 0 ? f() : (n.removeEventListener("click", d.current), d.current = f, n.addEventListener("click", d.current, { once: !0 }));
			} else n.removeEventListener("click", d.current), e();
			c.current = !1;
		}, "handlePointerDown"), h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) n.addEventListener(e, f, !0), n.addEventListener(e, p);
		let g = window.setTimeout(() => {
			n.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), n.removeEventListener("pointerdown", m), n.removeEventListener("click", d.current);
			for (let e of h) n.removeEventListener(e, f, !0), n.removeEventListener(e, p);
		};
	}, [
		n,
		s,
		r,
		i,
		a,
		o
	]), { onPointerDownCapture: /* @__PURE__ */ Gt(() => c.current = !0, "onPointerDownCapture") };
}
Gt($t, "usePointerDownOutside");
function en(e, t = globalThis?.document) {
	let n = Ut(e), r = b.useRef(!1);
	return b.useEffect(() => {
		let e = /* @__PURE__ */ Gt((e) => {
			e.target && !r.current && nn(Jt, n, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: /* @__PURE__ */ Gt(() => r.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ Gt(() => r.current = !1, "onBlurCapture")
	};
}
Gt(en, "useFocusOutside");
function tn() {
	let e = new CustomEvent(Kt);
	document.dispatchEvent(e);
}
Gt(tn, "dispatchUpdate");
function nn(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? se(i, a) : i.dispatchEvent(a);
}
Gt(nn, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var rn = Object.defineProperty, an = (e, t) => rn(e, "name", {
	value: t,
	configurable: !0
});
function on(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
an(on, "setRef");
function sn(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = on(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : on(e[t], null);
			}
		};
	};
}
an(sn, "composeRefs");
function cn(...e) {
	return b.useCallback(sn(...e), e);
}
an(cn, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var ln = Object.defineProperty, un = (e, t) => ln(e, "name", {
	value: t,
	configurable: !0
}), dn = "focusScope.autoFocusOnMount", fn = "focusScope.autoFocusOnUnmount", pn = {
	bubbles: !1,
	cancelable: !0
}, mn = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ un(function(e, t) {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e, [s, c] = b.useState(null), l = Ut(i), u = Ut(a), d = b.useRef(null), f = cn(t, c), p = b.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	b.useEffect(() => {
		if (r) {
			let e = function(e) {
				if (p.paused || !s) return;
				let t = e.target;
				s.contains(t) ? d.current = t : xn(d.current, { select: !0 });
			}, t = function(e) {
				if (p.paused || !s) return;
				let t = e.relatedTarget;
				t !== null && (s.contains(t) || xn(d.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && xn(s);
			};
			un(e, "handleFocusIn"), un(t, "handleFocusOut"), un(n, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return s && r.observe(s, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		r,
		s,
		p.paused
	]), b.useEffect(() => {
		if (s) {
			Sn.add(p);
			let e = document.activeElement;
			if (!s.contains(e)) {
				let t = new CustomEvent(dn, pn);
				s.addEventListener(dn, l), s.dispatchEvent(t), t.defaultPrevented || (hn(Tn(_n(s)), { select: !0 }), document.activeElement === e && xn(s));
			}
			return () => {
				s.removeEventListener(dn, l), setTimeout(() => {
					let t = new CustomEvent(fn, pn);
					s.addEventListener(fn, u), s.dispatchEvent(t), t.defaultPrevented || xn(e ?? document.body, { select: !0 }), s.removeEventListener(fn, u), Sn.remove(p);
				}, 0);
			};
		}
	}, [
		s,
		l,
		u,
		p
	]);
	let m = b.useCallback((e) => {
		if (!n && !r || p.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (t && i) {
			let t = e.currentTarget, [r, a] = gn(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && xn(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && xn(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		p.paused
	]);
	return /* @__PURE__ */ (0, G.jsx)(oe.div, {
		tabIndex: -1,
		...o,
		ref: f,
		onKeyDown: m
	});
}, "FocusScope"));
function hn(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (xn(r, { select: t }), document.activeElement !== n) return;
}
un(hn, "focusFirst");
function gn(e) {
	let t = _n(e);
	return [vn(t, e), vn(t.reverse(), e)];
}
un(gn, "getTabbableEdges");
function _n(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ un((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
un(_n, "getTabbableCandidates");
function vn(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : yn(r, { upTo: t }))) return r;
}
un(vn, "findVisible");
function yn(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
un(yn, "isHidden");
function bn(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
un(bn, "isSelectableInput");
function xn(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && bn(e) && t && e.select();
	}
}
un(xn, "focus");
var Sn = Cn();
function Cn() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = wn(e, t), e.unshift(t);
		},
		remove(t) {
			e = wn(e, t), e[0]?.resume();
		}
	};
}
un(Cn, "createFocusScopesStack");
function wn(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
un(wn, "arrayRemove");
function Tn(e) {
	return e.filter((e) => e.tagName !== "A");
}
un(Tn, "removeLinks");
//#endregion
//#region node_modules/@radix-ui/react-portal/dist/index.mjs
var En = Object.defineProperty, Dn = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ ((e, t) => En(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { container: n, ...r } = e, [i, a] = b.useState(!1);
	$e(() => a(!0), []);
	let o = n || i && globalThis?.document?.body;
	return o ? x.createPortal(/* @__PURE__ */ (0, G.jsx)(oe.div, {
		...r,
		ref: t
	}), o) : null;
}, "Portal")), On = Object.defineProperty, kn = (e, t) => On(e, "name", {
	value: t,
	configurable: !0
}), An = 0, jn = null;
function Mn(e) {
	return Nn(), e.children;
}
kn(Mn, "FocusGuards");
function Nn() {
	b.useEffect(() => {
		jn ||= {
			start: Pn(),
			end: Pn()
		};
		let { start: e, end: t } = jn;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), An++, () => {
			An === 1 && (jn?.start.remove(), jn?.end.remove(), jn = null), An = Math.max(0, An - 1);
		};
	}, []);
}
kn(Nn, "useFocusGuards");
function Pn() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
kn(Pn, "createFocusGuard");
//#endregion
//#region node_modules/tslib/tslib.es6.mjs
var Fn = function() {
	return Fn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Fn.apply(this, arguments);
};
function In(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Ln(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Rn = "right-scroll-bar-position", zn = "width-before-scroll-bar", Bn = "with-scroll-bars-hidden", Vn = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function Hn(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function Un(e, t) {
	var n = (0, b.useState)(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Wn = typeof window < "u" ? b.useLayoutEffect : b.useEffect, Gn = /* @__PURE__ */ new WeakMap();
function Kn(e, t) {
	var n = Un(t || null, function(t) {
		return e.forEach(function(e) {
			return Hn(e, t);
		});
	});
	return Wn(function() {
		var t = Gn.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Hn(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Hn(e, a);
			});
		}
		Gn.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function qn(e) {
	return e;
}
function Jn(e, t) {
	t === void 0 && (t = qn);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Yn(e) {
	e === void 0 && (e = {});
	var t = Jn(null);
	return t.options = Fn({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Xn = function(e) {
	var t = e.sideCar, n = In(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return b.createElement(r, Fn({}, n));
};
Xn.isSideCarExport = !0;
function Zn(e, t) {
	return e.useMedium(t), Xn;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var Qn = Yn(), $n = function() {}, er = b.forwardRef(function(e, t) {
	var n = b.useRef(null), r = b.useState({
		onScrollCapture: $n,
		onWheelCapture: $n,
		onTouchMoveCapture: $n
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, m = e.noIsolation, h = e.inert, g = e.allowPinchZoom, _ = e.as, v = _ === void 0 ? "div" : _, y = e.gapMode, x = In(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = f, C = Kn([n, t]), w = Fn(Fn({}, x), i);
	return b.createElement(b.Fragment, null, u && b.createElement(S, {
		sideCar: Qn,
		removeScrollBar: l,
		shards: d,
		noRelative: p,
		noIsolation: m,
		inert: h,
		setCallbacks: a,
		allowPinchZoom: !!g,
		lockRef: n,
		gapMode: y
	}), o ? b.cloneElement(b.Children.only(s), Fn(Fn({}, w), { ref: C })) : b.createElement(v, Fn({}, w, {
		className: c,
		ref: C
	}), s));
});
er.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, er.classNames = {
	fullWidth: zn,
	zeroRight: Rn
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var tr, nr = function() {
	if (tr) return tr;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function rr() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = nr();
	return t && e.setAttribute("nonce", t), e;
}
function ir(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ar(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var or = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = rr()) && (ir(t, n), ar(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, sr = function() {
	var e = or();
	return function(t, n) {
		b.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, cr = function() {
	var e = sr();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, lr = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, ur = function(e) {
	return parseInt(e || "", 10) || 0;
}, dr = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		ur(n),
		ur(r),
		ur(i)
	];
}, fr = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return lr;
	var t = dr(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, pr = cr(), mr = "data-scroll-locked", hr = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Bn} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${mr}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${Rn} {
    right: ${s}px ${r};
  }
  
  .${zn} {
    margin-right: ${s}px ${r};
  }
  
  .${Rn} .${Rn} {
    right: 0 ${r};
  }
  
  .${zn} .${zn} {
    margin-right: 0 ${r};
  }
  
  body[${mr}] {
    ${Vn}: ${s}px;
  }
`;
}, gr = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, _r = function() {
	b.useEffect(function() {
		return document.body.setAttribute(mr, (gr() + 1).toString()), function() {
			var e = gr() - 1;
			e <= 0 ? document.body.removeAttribute(mr) : document.body.setAttribute(mr, e.toString());
		};
	}, []);
}, vr = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	_r();
	var a = b.useMemo(function() {
		return fr(i);
	}, [i]);
	return b.createElement(pr, { styles: hr(a, !t, i, n ? "" : "!important") });
}, yr = !1;
if (typeof window < "u") try {
	var br = Object.defineProperty({}, "passive", { get: function() {
		return yr = !0, !0;
	} });
	window.addEventListener("test", br, br), window.removeEventListener("test", br, br);
} catch {
	yr = !1;
}
var xr = yr ? { passive: !1 } : !1, Sr = function(e) {
	return e.tagName === "TEXTAREA";
}, Cr = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Sr(e) && n[t] === "visible");
}, wr = function(e) {
	return Cr(e, "overflowY");
}, Tr = function(e) {
	return Cr(e, "overflowX");
}, Er = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), kr(e, r)) {
			var i = Ar(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, Dr = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, Or = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, kr = function(e, t) {
	return e === "v" ? wr(t) : Tr(t);
}, Ar = function(e, t) {
	return e === "v" ? Dr(t) : Or(t);
}, jr = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Mr = function(e, t, n, r, i) {
	var a = jr(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Ar(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && kr(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Nr = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Pr = function(e) {
	return [e.deltaX, e.deltaY];
}, Fr = function(e) {
	return e && "current" in e ? e.current : e;
}, Ir = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, Lr = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, Rr = 0, zr = [];
function Br(e) {
	var t = b.useRef([]), n = b.useRef([0, 0]), r = b.useRef(), i = b.useState(Rr++)[0], a = b.useState(cr)[0], o = b.useRef(e);
	b.useEffect(function() {
		o.current = e;
	}, [e]), b.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = Ln([e.lockRef.current], (e.shards || []).map(Fr), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = b.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = Nr(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Er(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Er(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return Mr(h, t, e, h === "h" ? s : c, !0);
	}, []), c = b.useCallback(function(e) {
		var n = e;
		if (!(!zr.length || zr[zr.length - 1] !== a)) {
			var r = "deltaY" in n ? Pr(n) : Nr(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && Ir(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var c = (o.current.shards || []).map(Fr).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = b.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: Vr(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), u = b.useCallback(function(e) {
		n.current = Nr(e), r.current = void 0;
	}, []), d = b.useCallback(function(t) {
		l(t.type, Pr(t), t.target, s(t, e.lockRef.current));
	}, []), f = b.useCallback(function(t) {
		l(t.type, Nr(t), t.target, s(t, e.lockRef.current));
	}, []);
	b.useEffect(function() {
		return zr.push(a), e.setCallbacks({
			onScrollCapture: d,
			onWheelCapture: d,
			onTouchMoveCapture: f
		}), document.addEventListener("wheel", c, xr), document.addEventListener("touchmove", c, xr), document.addEventListener("touchstart", u, xr), function() {
			zr = zr.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, xr), document.removeEventListener("touchmove", c, xr), document.removeEventListener("touchstart", u, xr);
		};
	}, []);
	var p = e.removeScrollBar, m = e.inert;
	return b.createElement(b.Fragment, null, m ? b.createElement(a, { styles: Lr(i) }) : null, p ? b.createElement(vr, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function Vr(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Hr = Zn(Qn, Br), Ur = b.forwardRef(function(e, t) {
	return b.createElement(er, Fn({}, e, {
		ref: t,
		sideCar: Hr
	}));
});
Ur.classNames = er.classNames;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var Wr = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, Gr = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), qr = {}, Jr = 0, Yr = function(e) {
	return e && (e.host || Yr(e.parentNode));
}, Xr = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = Yr(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Zr = function(e, t, n, r) {
	var i = Xr(t, Array.isArray(e) ? e : [e]);
	qr[n] || (qr[n] = /* @__PURE__ */ new WeakMap());
	var a = qr[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (Gr.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				Gr.set(e, c), a.set(e, l), o.push(e), c === 1 && i && Kr.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), Jr++, function() {
		o.forEach(function(e) {
			var t = Gr.get(e) - 1, i = a.get(e) - 1;
			Gr.set(e, t), a.set(e, i), t || (Kr.has(e) || e.removeAttribute(r), Kr.delete(e)), i || e.removeAttribute(n);
		}), Jr--, Jr || (Gr = /* @__PURE__ */ new WeakMap(), Gr = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), qr = {});
	};
}, Qr = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || Wr(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Zr(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, $r = Object.defineProperty, ei = (e, t) => $r(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function ti(e) {
	let t = b.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		li(r) && typeof pi == "function" && (r = pi(r._payload)), b.Children.forEach(r, (e) => {
			if (si(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				li(n) && typeof pi == "function" && (n = pi(n._payload)), a = ii(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = b.cloneElement(a, void 0, s) : !o && b.Children.count(r) === 1 && b.isValidElement(r) && (a = r);
		let c = a ? oi(a) : void 0, l = Ft(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? fi(e) : di(e));
			return r;
		}
		let u = ai(i, a.props ?? {});
		return a.type !== b.Fragment && (u.ref = n ? l : c), b.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
ei(ti, "createSlot");
var ni = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function ri(e) {
	let t = /* @__PURE__ */ ei((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = ni, t;
}
ei(ri, "createSlottable");
var ii = /* @__PURE__ */ ei((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return b.isValidElement(t) ? b.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return b.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function ai(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
ei(ai, "mergeProps");
function oi(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
ei(oi, "getElementRef");
function si(e) {
	return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ni;
}
ei(si, "isSlottable");
var ci = Symbol.for("react.lazy");
function li(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === ci && "_payload" in e && ui(e._payload);
}
ei(li, "isLazyComponent");
function ui(e) {
	return typeof e == "object" && !!e && "then" in e;
}
ei(ui, "isPromiseLike");
var di = /* @__PURE__ */ ei((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), fi = /* @__PURE__ */ ei((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), pi = b.use, mi = Object.defineProperty, hi = (e, t) => mi(e, "name", {
	value: t,
	configurable: !0
}), gi = "Dialog", [_i, vi] = /* @__PURE__ */ fe(gi), [yi, bi] = _i(gi), xi = /* @__PURE__ */ hi((e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e, s = b.useRef(null), c = b.useRef(null), [l, u] = ct({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: gi
	}), [d, f] = b.useState(0), [p, m] = b.useState(0);
	return /* @__PURE__ */ (0, G.jsx)(yi, {
		scope: t,
		triggerRef: s,
		contentRef: c,
		contentId: Et(),
		titleId: Et(),
		descriptionId: Et(),
		titlePresent: d > 0,
		descriptionPresent: p > 0,
		setTitleCount: f,
		setDescriptionCount: m,
		open: l,
		onOpenChange: u,
		onOpenToggle: b.useCallback(() => u((e) => !e), [u]),
		modal: o,
		children: n
	});
}, "Dialog"), Si = "DialogPortal", [Ci, wi] = _i(Si, { forceMount: void 0 }), Ti = /* @__PURE__ */ hi((e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, a = bi(Si, t);
	return /* @__PURE__ */ (0, G.jsx)(Ci, {
		scope: t,
		forceMount: n,
		children: b.Children.map(r, (e) => /* @__PURE__ */ (0, G.jsx)(gt, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, G.jsx)(Dn, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
}, "DialogPortal"), Ei = "DialogOverlay", Di = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let n = wi(Ei, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = bi(Ei, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ (0, G.jsx)(gt, {
		present: r || a.open,
		children: /* @__PURE__ */ (0, G.jsx)(ki, {
			...i,
			ref: t
		})
	}) : null;
}, "DialogOverlay")), Oi = /* @__PURE__ */ ti("DialogOverlay.RemoveScroll"), ki = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = bi(Ei, n), a = Ft(t, Y());
	return /* @__PURE__ */ (0, G.jsx)(Ur, {
		as: Oi,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ (0, G.jsx)(oe.div, {
			"data-state": Vi(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}, "DialogOverlayImpl")), Ai = "DialogContent", ji = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let n = wi(Ai, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = bi(Ai, e.__scopeDialog);
	return /* @__PURE__ */ (0, G.jsx)(gt, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ (0, G.jsx)(Mi, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, G.jsx)(Ni, {
			...i,
			ref: t
		})
	});
}, "DialogContent")), Mi = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let n = bi(Ai, e.__scopeDialog), r = b.useRef(null), i = Ft(t, n.contentRef, r);
	return b.useEffect(() => {
		let e = r.current;
		if (e) return Qr(e);
	}, []), /* @__PURE__ */ (0, G.jsx)(Pi, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		onCloseAutoFocus: J(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: J(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: J(e.onFocusOutside, (e) => e.preventDefault())
	});
}, "DialogContentModal")), Ni = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let n = bi(Ai, e.__scopeDialog), r = b.useRef(!1), i = b.useRef(!1);
	return /* @__PURE__ */ (0, G.jsx)(Pi, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "DialogContentNonModal")), Pi = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = bi(Ai, n);
	return Nn(), /* @__PURE__ */ (0, G.jsx)(G.Fragment, { children: /* @__PURE__ */ (0, G.jsx)(mn, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ (0, G.jsx)(Zt, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
			"aria-labelledby": s.titlePresent ? s.titleId : void 0,
			"data-state": Vi(s.open),
			...o,
			ref: t,
			deferPointerDownOutside: !0,
			onDismiss: () => s.onOpenChange(!1)
		})
	}) });
}, "DialogContentImpl")), Fi = "DialogTitle", Ii = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = bi(Fi, n), { setTitleCount: a } = i;
	return $e(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, G.jsx)(oe.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
}, "DialogTitle")), Li = "DialogDescription", Ri = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = bi(Li, n), { setDescriptionCount: a } = i;
	return $e(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, G.jsx)(oe.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
}, "DialogDescription")), zi = "DialogClose", Bi = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ hi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = bi(zi, n);
	return /* @__PURE__ */ (0, G.jsx)(oe.button, {
		type: "button",
		...r,
		ref: t,
		onClick: J(e.onClick, () => i.onOpenChange(!1))
	});
}, "DialogClose"));
function Vi(e) {
	return e ? "open" : "closed";
}
hi(Vi, "getState");
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
var Hi = Object.defineProperty, Ui = (e, t) => Hi(e, "name", {
	value: t,
	configurable: !0
});
function Wi(e) {
	let [t, n] = b.useState(void 0);
	return $e(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		} else n(void 0);
	}, [e]), t;
}
Ui(Wi, "useSize");
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var Gi = Object.defineProperty, Ki = (e, t) => Gi(e, "name", {
	value: t,
	configurable: !0
});
function qi(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Ki(qi, "setRef");
function Ji(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = qi(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : qi(e[t], null);
			}
		};
	};
}
Ki(Ji, "composeRefs");
function Yi(...e) {
	return b.useCallback(Ji(...e), e);
}
Ki(Yi, "useComposedRefs");
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Xi = [
	"top",
	"right",
	"bottom",
	"left"
], Zi = Math.min, Qi = Math.max, $i = Math.round, ea = Math.floor, ta = (e) => ({
	x: e,
	y: e
}), na = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ra(e, t, n) {
	return Qi(e, Zi(t, n));
}
function ia(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function aa(e) {
	return e.split("-")[0];
}
function oa(e) {
	return e.split("-")[1];
}
function sa(e) {
	return e === "x" ? "y" : "x";
}
function ca(e) {
	return e === "y" ? "height" : "width";
}
function la(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ua(e) {
	return sa(la(e));
}
function da(e, t, n) {
	n === void 0 && (n = !1);
	let r = oa(e), i = ua(e), a = ca(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ba(o)), [o, ba(o)];
}
function fa(e) {
	let t = ba(e);
	return [
		pa(e),
		t,
		pa(t)
	];
}
function pa(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ma = ["left", "right"], ha = ["right", "left"], ga = ["top", "bottom"], _a = ["bottom", "top"];
function va(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? ha : ma : t ? ma : ha;
		case "left":
		case "right": return t ? ga : _a;
		default: return [];
	}
}
function ya(e, t, n, r) {
	let i = oa(e), a = va(aa(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(pa)))), a;
}
function ba(e) {
	let t = aa(e);
	return na[t] + e.slice(t.length);
}
function xa(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Sa(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : xa(e);
}
function Ca(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function wa(e, t, n) {
	let { reference: r, floating: i } = e, a = la(t), o = ua(t), s = ca(o), c = aa(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = oa(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Ta(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = ia(t, e), p = Sa(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Ca(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Ca(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Ea = 50, Da = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Ta
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = wa(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Ea && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = wa(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Oa = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = ia(e, t) || {};
		if (l == null) return {};
		let d = Sa(u), f = {
			x: n,
			y: r
		}, p = ua(i), m = ca(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Zi(d[_], T), D = Zi(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = ra(E, k, O), j = !c.arrow && oa(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + M,
			data: {
				[p]: A,
				centerOffset: k - A - M,
				...j && { alignmentOffset: M }
			},
			reset: j
		};
	}
}), ka = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = ia(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = aa(r), _ = la(o), v = aa(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ba(o)] : fa(o)), x = p !== "none";
			!d && x && b.push(...ya(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = da(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== la(t)) || T.every((e) => la(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = la(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Aa(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function ja(e) {
	return Xi.some((t) => e[t] >= 0);
}
var Ma = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = ia(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Aa(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: ja(e)
					} };
				}
				case "escaped": {
					let e = Aa(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: ja(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Na = /* @__PURE__ */ new Set(["left", "top"]);
async function Pa(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = aa(n), s = oa(n), c = la(n) === "y", l = Na.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = ia(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Fa = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Pa(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Ia = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = ia(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = la(i), p = sa(f), m = u[p], h = u[f], g = (e, t) => ra(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, La = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = ia(e, t), u = {
				x: n,
				y: r
			}, d = la(i), f = sa(d), p = u[f], m = u[d], h = ia(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Na.has(aa(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Ra = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = ia(e, t), c = await i.detectOverflow(t, s), l = aa(n), u = oa(n), d = la(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Zi(p - c[m], g), y = Zi(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Qi(c.left, c.right) : S = p - 2 * Qi(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function za() {
	return typeof window < "u";
}
function Ba(e) {
	return Ua(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Va(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ha(e) {
	return ((Ua(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ua(e) {
	return za() ? e instanceof Node || e instanceof Va(e).Node : !1;
}
function Wa(e) {
	return za() ? e instanceof Element || e instanceof Va(e).Element : !1;
}
function Ga(e) {
	return za() ? e instanceof HTMLElement || e instanceof Va(e).HTMLElement : !1;
}
function Ka(e) {
	return !za() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Va(e).ShadowRoot;
}
function qa(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = ro(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Ja(e) {
	return /^(table|td|th)$/.test(Ba(e));
}
function Ya(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Xa = /transform|translate|scale|rotate|perspective|filter/, Za = /paint|layout|strict|content/, Qa = (e) => !!e && e !== "none", $a;
function eo(e) {
	let t = Wa(e) ? ro(e) : e;
	return Qa(t.transform) || Qa(t.translate) || Qa(t.scale) || Qa(t.rotate) || Qa(t.perspective) || !no() && (Qa(t.backdropFilter) || Qa(t.filter)) || Xa.test(t.willChange || "") || Za.test(t.contain || "");
}
function to(e) {
	let t = ao(e);
	for (; Ga(t) && !X(t);) {
		if (eo(t)) return t;
		if (Ya(t)) return null;
		t = ao(t);
	}
	return null;
}
function no() {
	return $a ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), $a;
}
function X(e) {
	return /^(html|body|#document)$/.test(Ba(e));
}
function ro(e) {
	return Va(e).getComputedStyle(e);
}
function io(e) {
	return Wa(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function ao(e) {
	if (Ba(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ka(e) && e.host || Ha(e);
	return Ka(t) ? t.host : t;
}
function oo(e) {
	let t = ao(e);
	return X(t) ? (e.ownerDocument || e).body : Ga(t) && qa(t) ? t : oo(t);
}
function so(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = oo(e), i = r === e.ownerDocument?.body, a = Va(r);
	if (i) {
		let e = co(a);
		return t.concat(a, a.visualViewport || [], qa(r) ? r : [], e && n ? so(e) : []);
	} else return t.concat(r, so(r, [], n));
}
function co(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function lo(e) {
	let t = ro(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Ga(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = $i(n) !== a || $i(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function uo(e) {
	return Wa(e) ? e : e.contextElement;
}
function fo(e) {
	let t = uo(e);
	if (!Ga(t)) return ta(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = lo(t), o = (a ? $i(n.width) : n.width) / r, s = (a ? $i(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var po = /* @__PURE__ */ ta(0);
function mo(e) {
	let t = Va(e);
	return !no() || !t.visualViewport ? po : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function ho(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Va(e);
}
function go(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = uo(e), o = ta(1);
	t && (r ? Wa(r) && (o = fo(r)) : o = fo(e));
	let s = ho(a, n, r) ? mo(a) : ta(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Va(a), t = Wa(r) ? Va(r) : r, n = e, i = co(n);
		for (; i && t !== n;) {
			let e = fo(i), t = i.getBoundingClientRect(), r = ro(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Va(i), i = co(n);
		}
	}
	return Ca({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function _o(e, t) {
	let n = io(e).scrollLeft;
	return t ? t.left + n : go(Ha(e)).left + n;
}
function vo(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - _o(e, n),
		y: n.top + t.scrollTop
	};
}
function yo(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Ha(r), s = t ? Ya(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = ta(1), u = ta(0), d = Ga(r);
	if ((d || !a) && ((Ba(r) !== "body" || qa(o)) && (c = io(r)), d)) {
		let e = go(r);
		l = fo(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? vo(o, c) : ta(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function bo(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function xo(e) {
	let t = io(e), n = e.ownerDocument.body, r = Qi(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Qi(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + _o(e), o = -t.scrollTop;
	return ro(n).direction === "rtl" && (a += Qi(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var So = 25;
function Co(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Va(e), a = Ha(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !no() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (_o(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= So && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function wo(e, t) {
	let n = go(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = fo(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function To(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Co(e, n, t);
	else if (t === "document") r = xo(Ha(e));
	else if (Wa(t)) r = wo(t, n);
	else {
		let n = mo(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Ca(r);
}
function Eo(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = so(e, [], !1).filter((e) => Wa(e) && Ba(e) !== "body"), i = null, a = ro(e).position === "fixed", o = a ? ao(e) : e;
	for (; Wa(o) && !X(o);) {
		let e = ro(o), t = eo(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = ao(o);
	}
	return t.set(e, r), r;
}
function Do(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Ya(t) ? [] : Eo(t, this._c) : [].concat(n), r], o = To(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = To(t, a[e], i);
		s = Qi(n.top, s), c = Zi(n.right, c), l = Zi(n.bottom, l), u = Qi(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Oo(e) {
	let { width: t, height: n } = lo(e);
	return {
		width: t,
		height: n
	};
}
function ko(e, t, n) {
	let r = Ga(t), i = Ha(t), a = n === "fixed", o = go(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = ta(0);
	if ((r || !a) && ((Ba(t) !== "body" || qa(i)) && (s = io(t)), r)) {
		let e = go(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = _o(i));
	let l = i && !r && !a ? vo(i, s) : ta(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Ao(e) {
	return ro(e).position === "static";
}
function jo(e, t) {
	if (!Ga(e) || ro(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Ha(e) === n && (n = n.ownerDocument.body), n;
}
function Mo(e, t) {
	let n = Va(e);
	if (Ya(e)) return n;
	if (!Ga(e)) {
		let t = ao(e);
		for (; t && !X(t);) {
			if (Wa(t) && !Ao(t)) return t;
			t = ao(t);
		}
		return n;
	}
	let r = jo(e, t);
	for (; r && Ja(r) && Ao(r);) r = jo(r, t);
	return r && X(r) && Ao(r) && !eo(r) ? n : r || to(e) || n;
}
var No = async function(e) {
	let t = this.getOffsetParent || Mo, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: ko(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Po(e) {
	return ro(e).direction === "rtl";
}
var Fo = {
	convertOffsetParentRelativeRectToViewportRelativeRect: yo,
	getDocumentElement: Ha,
	getClippingRect: Do,
	getOffsetParent: Mo,
	getElementRects: No,
	getClientRects: bo,
	getDimensions: Oo,
	getScale: fo,
	isElement: Wa,
	isRTL: Po
};
function Io(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Lo(e, t, n) {
	let r = null, i, a = Ha(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = ea(d), h = ea(a.clientWidth - (u + f)), g = ea(a.clientHeight - (d + p)), _ = ea(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Qi(0, Zi(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Io(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = Va(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Ro(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = uo(e), u = i || a ? [...l ? so(l) : [], ...t ? so(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Lo(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? go(e) : null;
	c && g();
	function g() {
		let t = go(e);
		h && !Io(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var zo = Fa, Bo = Ia, Vo = ka, Ho = Ra, Uo = Ma, Wo = Oa, Go = La, Ko = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Fo,
		...i.platform,
		_c: r
	};
	return Da(e, t, {
		...i,
		platform: a
	});
}, qo = typeof document < "u" ? b.useLayoutEffect : function() {};
function Jo(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Jo(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Jo(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Yo(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Xo(e, t) {
	let n = Yo(e);
	return Math.round(t * n) / n;
}
function Zo(e) {
	let t = b.useRef(e);
	return qo(() => {
		t.current = e;
	}), t;
}
function Qo(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = b.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = b.useState(r);
	Jo(f, r) || p(r);
	let [m, h] = b.useState(null), [g, _] = b.useState(null), v = b.useCallback((e) => {
		e !== w.current && (w.current = e, h(e));
	}, []), y = b.useCallback((e) => {
		e !== T.current && (T.current = e, _(e));
	}, []), S = a || m, C = o || g, w = b.useRef(null), T = b.useRef(null), E = b.useRef(u), D = c != null, O = Zo(c), k = Zo(i), A = Zo(l), j = b.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		k.current && (e.platform = k.current), Ko(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Jo(E.current, t) && (E.current = t, x.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		k,
		A
	]);
	qo(() => {
		l === !1 && E.current.isPositioned && (E.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let M = b.useRef(!1);
	qo(() => (M.current = !0, () => {
		M.current = !1;
	}), []), qo(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = b.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: v,
		setFloating: y
	}), [v, y]), P = b.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = b.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = Xo(P.floating, u.x), r = Xo(P.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Yo(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		P.floating,
		u.x,
		u.y
	]);
	return b.useMemo(() => ({
		...u,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		u,
		j,
		N,
		P,
		F
	]);
}
var $o = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : Wo({
				element: r.current,
				padding: i
			}).fn(n) : r ? Wo({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, es = (e, t) => {
	let n = zo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ts = (e, t) => {
	let n = Bo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ns = (e, t) => ({
	fn: Go(e).fn,
	options: [e, t]
}), rs = (e, t) => {
	let n = Vo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, is = (e, t) => {
	let n = Ho(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, as = (e, t) => {
	let n = Uo(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, os = (e, t) => {
	let n = $o(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ss = Object.defineProperty, cs = (e, t) => ss(e, "name", {
	value: t,
	configurable: !0
});
function ls(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
cs(ls, "setRef");
function us(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = ls(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : ls(e[t], null);
			}
		};
	};
}
cs(us, "composeRefs");
function ds(...e) {
	return b.useCallback(us(...e), e);
}
cs(ds, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-popper/dist/index.mjs
var fs = Object.defineProperty, ps = (e, t) => fs(e, "name", {
	value: t,
	configurable: !0
}), ms = "Popper", [hs, gs] = /* @__PURE__ */ fe(ms), [_s, vs] = hs(ms), ys = /* @__PURE__ */ ps((e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = b.useState(null), [a, o] = b.useState(void 0);
	return /* @__PURE__ */ (0, G.jsx)(_s, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		placementState: a,
		setPlacementState: o,
		children: n
	});
}, "Popper"), bs = "PopperAnchor", xs = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ ps(function(e, t) {
	let { __scopePopper: n, virtualRef: r, ...i } = e, a = vs(bs, n), o = b.useRef(null), s = a.onAnchorChange, c = ds(t, b.useCallback((e) => {
		o.current = e, e && s(e);
	}, [s])), l = b.useRef(null);
	b.useEffect(() => {
		if (!r) return;
		let e = l.current;
		l.current = r.current, e !== l.current && s(l.current);
	});
	let u = a.placementState && Os(a.placementState), d = u?.[0], f = u?.[1];
	return r ? null : /* @__PURE__ */ (0, G.jsx)(oe.div, {
		"data-radix-popper-side": d,
		"data-radix-popper-align": f,
		...i,
		ref: c
	});
}, "PopperAnchor")), Ss = "PopperContent", [Cs, ws] = hs(Ss), Ts = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ ps(function(e, t) {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, arrowPadding: s = 0, avoidCollisions: c = !0, collisionBoundary: l = [], collisionPadding: u = 0, sticky: d = "partial", hideWhenDetached: f = !1, updatePositionStrategy: p = "optimized", onPlaced: m, ...h } = e, g = vs(Ss, n), [_, v] = b.useState(null), y = ds(t, v), [x, S] = b.useState(null), C = Wi(x), w = C?.width ?? 0, T = C?.height ?? 0, E = r + (a === "center" ? "" : "-" + a), D = typeof u == "number" ? u : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...u
	}, O = Array.isArray(l) ? l : [l], k = O.length > 0, A = {
		padding: D,
		boundary: O.filter(Es),
		altBoundary: k
	}, { refs: j, floatingStyles: M, placement: N, isPositioned: P, middlewareData: F } = Qo({
		strategy: "fixed",
		placement: E,
		whileElementsMounted: /* @__PURE__ */ ps((...e) => Ro(...e, { animationFrame: p === "always" }), "whileElementsMounted"),
		elements: { reference: g.anchor },
		middleware: [
			es({
				mainAxis: i + T,
				alignmentAxis: o
			}),
			c && ts({
				mainAxis: !0,
				crossAxis: !1,
				limiter: d === "partial" ? ns() : void 0,
				...A
			}),
			c && rs({ ...A }),
			is({
				...A,
				apply: /* @__PURE__ */ ps(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}, "apply")
			}),
			x && os({
				element: x,
				padding: s
			}),
			Ds({
				arrowWidth: w,
				arrowHeight: T
			}),
			f && as({
				strategy: "referenceHidden",
				...A,
				boundary: k ? A.boundary : void 0
			})
		]
	}), I = g.setPlacementState;
	$e(() => (I(N), () => {
		I(void 0);
	}), [N, I]);
	let [L, ee] = Os(N), R = Ut(m);
	$e(() => {
		P && R?.();
	}, [P, R]);
	let z = F.arrow?.x, B = F.arrow?.y, V = F.arrow?.centerOffset !== 0, [H, U] = b.useState();
	return $e(() => {
		_ && U(window.getComputedStyle(_).zIndex);
	}, [_]), /* @__PURE__ */ (0, G.jsx)("div", {
		ref: j.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...M,
			transform: P ? M.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: H,
			"--radix-popper-transform-origin": [F.transformOrigin?.x, F.transformOrigin?.y].join(" "),
			...F.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ (0, G.jsx)(Cs, {
			scope: n,
			placedSide: L,
			placedAlign: ee,
			onArrowChange: S,
			arrowX: z,
			arrowY: B,
			shouldHideArrow: V,
			children: /* @__PURE__ */ (0, G.jsx)(oe.div, {
				"data-side": L,
				"data-align": ee,
				...h,
				ref: y,
				style: {
					...h.style,
					animation: P ? h.style?.animation : "none"
				}
			})
		})
	});
}, "PopperContent"));
function Es(e) {
	return e !== null;
}
ps(Es, "isNotNull");
var Ds = /* @__PURE__ */ ps((e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Os(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
}), "transformOrigin");
function Os(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
ps(Os, "getSideAndAlignFromPlacement");
var ks = ys, As = xs, js = Ts, Ms = Object.defineProperty, Ns = (e, t) => Ms(e, "name", {
	value: t,
	configurable: !0
});
function Ps(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Ns(Ps, "setRef");
function Fs(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Ps(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Ps(e[t], null);
			}
		};
	};
}
Ns(Fs, "composeRefs");
function Is(...e) {
	return b.useCallback(Fs(...e), e);
}
Ns(Is, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
var Ls = Object.defineProperty, Rs = (e, t) => Ls(e, "name", {
	value: t,
	configurable: !0
}), zs = !1;
function Bs() {
	let [e, t] = b.useState(zs);
	return b.useEffect(() => {
		zs || (zs = !0, t(!0));
	}, []), e;
}
Rs(Bs, "useIsHydrated");
var Vs = b.useSyncExternalStore;
function Hs() {
	return () => {};
}
Rs(Hs, "subscribe");
function Us() {
	return Vs(Hs, () => !0, () => !1);
}
Rs(Us, "useIsHydratedModern");
var Ws = typeof Vs == "function" ? Us : Bs, Gs = Object.defineProperty, Ks = (e, t) => Gs(e, "name", {
	value: t,
	configurable: !0
}), qs = "rovingFocusGroup.onEntryFocus", Js = {
	bubbles: !1,
	cancelable: !0
}, Ys = "RovingFocusGroup", [Xs, Zs, Qs] = /* @__PURE__ */ Fe(Ys), [$s, ec] = /* @__PURE__ */ fe(Ys, [Qs]), [tc, nc] = $s(Ys), rc = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ks(function(e, t) {
	return /* @__PURE__ */ (0, G.jsx)(Xs.Provider, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, G.jsx)(Xs.Slot, {
			scope: e.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, G.jsx)(ic, {
				...e,
				ref: t
			})
		})
	});
}, "RovingFocusGroup")), ic = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ks(function(e, t) {
	let { __scopeRovingFocusGroup: n, orientation: r, loop: i = !1, dir: a, currentTabStopId: o, defaultCurrentTabStopId: s, onCurrentTabStopIdChange: c, onEntryFocus: l, preventScrollOnEntryFocus: u = !1, ...d } = e, f = b.useRef(null), p = Is(t, f), m = At(a), [h, g] = ct({
		prop: o,
		defaultProp: s ?? null,
		onChange: c,
		caller: Ys
	}), [_, v] = b.useState(!1), y = Ut(l), x = Zs(n), S = b.useRef(!1), [C, w] = b.useState(0);
	return b.useEffect(() => {
		let e = f.current;
		if (e) return e.addEventListener(qs, y), () => e.removeEventListener(qs, y);
	}, [y]), /* @__PURE__ */ (0, G.jsx)(tc, {
		scope: n,
		orientation: r,
		dir: m,
		loop: i,
		currentTabStopId: h,
		onItemFocus: b.useCallback((e) => g(e), [g]),
		onItemShiftTab: b.useCallback(() => v(!0), []),
		onFocusableItemAdd: b.useCallback(() => w((e) => e + 1), []),
		onFocusableItemRemove: b.useCallback(() => w((e) => e - 1), []),
		children: /* @__PURE__ */ (0, G.jsx)(oe.div, {
			tabIndex: _ || C === 0 ? -1 : 0,
			"data-orientation": r,
			...d,
			ref: p,
			style: {
				outline: "none",
				...e.style
			},
			onMouseDown: J(e.onMouseDown, () => {
				S.current = !0;
			}),
			onFocus: J(e.onFocus, (e) => {
				let t = !S.current;
				if (e.target === e.currentTarget && t && !_) {
					let t = new CustomEvent(qs, Js);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = x().filter((e) => e.focusable);
						uc([
							e.find((e) => e.active),
							e.find((e) => e.id === h),
							...e
						].filter(Boolean).map((e) => e.ref.current), u);
					}
				}
				S.current = !1;
			}),
			onBlur: J(e.onBlur, () => v(!1))
		})
	});
}, "RovingFocusGroupImpl")), ac = "RovingFocusGroupItem", oc = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ks(function(e, t) {
	let { __scopeRovingFocusGroup: n, focusable: r = !0, active: i = !1, tabStopId: a, children: o, ...s } = e, c = Et(), l = a || c, u = nc(ac, n), d = u.currentTabStopId === l, f = Zs(n), { onFocusableItemAdd: p, onFocusableItemRemove: m, currentTabStopId: h } = u, g = Ws();
	return $e(() => {
		if (!(!g || !r)) return p(), () => m();
	}, [
		g,
		r,
		p,
		m
	]), b.useEffect(() => {
		if (!(g || !r)) return p(), () => m();
	}, [
		g,
		r,
		p,
		m
	]), /* @__PURE__ */ (0, G.jsx)(Xs.ItemSlot, {
		scope: n,
		id: l,
		focusable: r,
		active: i,
		children: /* @__PURE__ */ (0, G.jsx)(oe.span, {
			tabIndex: d ? 0 : -1,
			"data-orientation": u.orientation,
			...s,
			ref: t,
			onMouseDown: J(e.onMouseDown, (e) => {
				r ? u.onItemFocus(l) : e.preventDefault();
			}),
			onFocus: J(e.onFocus, () => u.onItemFocus(l)),
			onKeyDown: J(e.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					u.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = lc(e, u.orientation, u.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = f().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = u.loop ? dc(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => uc(n));
				}
			}),
			children: typeof o == "function" ? o({
				isCurrentTabStop: d,
				hasTabStop: h != null
			}) : o
		})
	});
}, "RovingFocusGroupItem")), sc = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function cc(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
Ks(cc, "getDirectionAwareKey");
function lc(e, t, n) {
	let r = cc(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return sc[r];
}
Ks(lc, "getFocusIntent");
function uc(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
Ks(uc, "focusFirst");
function dc(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
Ks(dc, "wrapArray");
var fc = rc, pc = oc, mc = Object.defineProperty, hc = (e, t) => mc(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function gc(e) {
	let t = b.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		wc(r) && typeof Oc == "function" && (r = Oc(r._payload)), b.Children.forEach(r, (e) => {
			if (Sc(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				wc(n) && typeof Oc == "function" && (n = Oc(n._payload)), a = yc(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = b.cloneElement(a, void 0, s) : !o && b.Children.count(r) === 1 && b.isValidElement(r) && (a = r);
		let c = a ? xc(a) : void 0, l = Yi(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? Dc(e) : Ec(e));
			return r;
		}
		let u = bc(i, a.props ?? {});
		return a.type !== b.Fragment && (u.ref = n ? l : c), b.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
hc(gc, "createSlot");
var _c = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function vc(e) {
	let t = /* @__PURE__ */ hc((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = _c, t;
}
hc(vc, "createSlottable");
var yc = /* @__PURE__ */ hc((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return b.isValidElement(t) ? b.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return b.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function bc(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
hc(bc, "mergeProps");
function xc(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
hc(xc, "getElementRef");
function Sc(e) {
	return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === _c;
}
hc(Sc, "isSlottable");
var Cc = Symbol.for("react.lazy");
function wc(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === Cc && "_payload" in e && Tc(e._payload);
}
hc(wc, "isLazyComponent");
function Tc(e) {
	return typeof e == "object" && !!e && "then" in e;
}
hc(Tc, "isPromiseLike");
var Ec = /* @__PURE__ */ hc((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Dc = /* @__PURE__ */ hc((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Oc = b.use, kc = Object.defineProperty, Ac = (e, t) => kc(e, "name", {
	value: t,
	configurable: !0
}), jc = ["Enter", " "], Mc = [
	"ArrowDown",
	"PageUp",
	"Home"
], Nc = [
	"ArrowUp",
	"PageDown",
	"End"
], Pc = [...Mc, ...Nc];
[...jc], [...jc];
var Fc = "Menu", [Ic, Lc, Rc] = /* @__PURE__ */ Fe(Fc), [zc, Bc] = /* @__PURE__ */ fe(Fc, [
	Rc,
	gs,
	ec
]), Vc = gs(), Hc = ec(), [Uc, Wc] = zc(Fc), [Gc, Kc] = zc(Fc), qc = /* @__PURE__ */ Ac((e) => {
	let { __scopeMenu: t, open: n = !1, children: r, dir: i, onOpenChange: a, modal: o = !0 } = e, s = Vc(t), [c, l] = b.useState(null), u = b.useRef(!1), d = Ut(a), f = At(i);
	return b.useEffect(() => {
		let e = /* @__PURE__ */ Ac(() => {
			u.current = !0, document.addEventListener("pointerdown", t, {
				capture: !0,
				once: !0
			}), document.addEventListener("pointermove", t, {
				capture: !0,
				once: !0
			});
		}, "handleKeyDown"), t = /* @__PURE__ */ Ac(() => u.current = !1, "handlePointer");
		return document.addEventListener("keydown", e, { capture: !0 }), () => {
			document.removeEventListener("keydown", e, { capture: !0 }), document.removeEventListener("pointerdown", t, { capture: !0 }), document.removeEventListener("pointermove", t, { capture: !0 });
		};
	}, []), b.useEffect(() => {
		if (!n) return;
		let e = /* @__PURE__ */ Ac(() => d(!1), "handleBlur");
		return window.addEventListener("blur", e), () => window.removeEventListener("blur", e);
	}, [n, d]), /* @__PURE__ */ (0, G.jsx)(ks, {
		...s,
		children: /* @__PURE__ */ (0, G.jsx)(Uc, {
			scope: t,
			open: n,
			onOpenChange: d,
			content: c,
			onContentChange: l,
			children: /* @__PURE__ */ (0, G.jsx)(Gc, {
				scope: t,
				onClose: b.useCallback(() => d(!1), [d]),
				isUsingKeyboardRef: u,
				dir: f,
				modal: o,
				children: r
			})
		})
	});
}, "Menu"), Jc = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let { __scopeMenu: n, ...r } = e, i = Vc(n);
	return /* @__PURE__ */ (0, G.jsx)(As, {
		...i,
		...r,
		ref: t
	});
}, "MenuAnchor")), Yc = "MenuPortal", [Xc, Zc] = zc(Yc, { forceMount: void 0 }), Qc = /* @__PURE__ */ Ac((e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = Wc(Yc, t);
	return /* @__PURE__ */ (0, G.jsx)(Xc, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ (0, G.jsx)(gt, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, G.jsx)(Dn, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
}, "MenuPortal"), $c = "MenuContent", [el, tl] = zc($c), nl = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let n = Zc($c, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = Wc($c, e.__scopeMenu), o = Kc($c, e.__scopeMenu);
	return /* @__PURE__ */ (0, G.jsx)(Ic.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ (0, G.jsx)(gt, {
			present: r || a.open,
			children: /* @__PURE__ */ (0, G.jsx)(Ic.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ (0, G.jsx)(rl, {
					...i,
					ref: t
				}) : /* @__PURE__ */ (0, G.jsx)(il, {
					...i,
					ref: t
				})
			})
		})
	});
}, "MenuContent")), rl = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let n = Wc($c, e.__scopeMenu), r = b.useRef(null), i = Yi(t, r);
	return b.useEffect(() => {
		let e = r.current;
		if (e) return Qr(e);
	}, []), /* @__PURE__ */ (0, G.jsx)(ol, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		disableOutsideScroll: !0,
		onFocusOutside: J(e.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => n.onOpenChange(!1)
	});
}, "MenuRootContentModal")), il = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let n = Wc($c, e.__scopeMenu);
	return /* @__PURE__ */ (0, G.jsx)(ol, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}, "MenuRootContentNonModal")), al = /* @__PURE__ */ gc("MenuContent.ScrollLock"), ol = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let { __scopeMenu: n, loop: r = !1, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, disableOutsidePointerEvents: s, onEntryFocus: c, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: d, onInteractOutside: f, onDismiss: p, disableOutsideScroll: m, ...h } = e, g = Wc($c, n), _ = Kc($c, n), v = Vc(n), y = Hc(n), x = Lc(n), [S, C] = b.useState(null), w = b.useRef(null), T = Yi(t, w, g.onContentChange), E = b.useRef(0), D = b.useRef(""), O = b.useRef(0), k = b.useRef(null), A = b.useRef("right"), j = b.useRef(0), M = m ? Ur : b.Fragment, N = m ? {
		as: al,
		allowPinchZoom: !0
	} : void 0, P = /* @__PURE__ */ Ac((e) => {
		let t = D.current + e, n = x().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = wl(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(/* @__PURE__ */ Ac((function e(t) {
			D.current = t, window.clearTimeout(E.current), t !== "" && (E.current = window.setTimeout(() => e(""), 1e3));
		}), "updateSearch"))(t), o && setTimeout(() => o.focus());
	}, "handleTypeaheadSearch");
	b.useEffect(() => () => window.clearTimeout(E.current), []), Nn();
	let F = b.useCallback((e) => A.current === k.current?.side && El(e, k.current?.area), []);
	return /* @__PURE__ */ (0, G.jsx)(el, {
		scope: n,
		searchRef: D,
		onItemEnter: b.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		onItemLeave: b.useCallback((e) => {
			F(e) || (w.current?.focus(), C(null));
		}, [F]),
		onTriggerLeave: b.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		pointerGraceTimerRef: O,
		onPointerGraceIntentChange: b.useCallback((e) => {
			k.current = e;
		}, []),
		children: /* @__PURE__ */ (0, G.jsx)(M, {
			...N,
			children: /* @__PURE__ */ (0, G.jsx)(mn, {
				asChild: !0,
				trapped: i,
				onMountAutoFocus: J(a, (e) => {
					e.preventDefault(), w.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: o,
				children: /* @__PURE__ */ (0, G.jsx)(Zt, {
					asChild: !0,
					disableOutsidePointerEvents: s,
					onEscapeKeyDown: l,
					onPointerDownOutside: u,
					onFocusOutside: d,
					onInteractOutside: f,
					onDismiss: p,
					children: /* @__PURE__ */ (0, G.jsx)(fc, {
						asChild: !0,
						...y,
						dir: _.dir,
						orientation: "vertical",
						loop: r,
						currentTabStopId: S,
						onCurrentTabStopIdChange: C,
						onEntryFocus: J(c, (e) => {
							_.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ (0, G.jsx)(js, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": yl(g.open),
							"data-radix-menu-content": "",
							dir: _.dir,
							...v,
							...h,
							ref: T,
							style: {
								outline: "none",
								...h.style
							},
							onKeyDown: J(h.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && P(e.key));
								let i = w.current;
								if (e.target !== i || !Pc.includes(e.key)) return;
								e.preventDefault();
								let a = x().filter((e) => !e.disabled).map((e) => e.ref.current);
								Nc.includes(e.key) && a.reverse(), Sl(a);
							}),
							onBlur: J(e.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(E.current), D.current = "");
							}),
							onPointerMove: J(e.onPointerMove, Dl((e) => {
								let t = e.target, n = j.current !== e.clientX;
								e.currentTarget.contains(t) && n && (A.current = e.clientX > j.current ? "right" : "left", j.current = e.clientX);
							}))
						})
					})
				})
			})
		})
	});
}, "MenuContentImpl")), sl = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, G.jsx)(oe.div, {
		...r,
		ref: t
	});
}, "MenuLabel")), cl = "MenuItem", ll = "menu.itemSelect", ul = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let { disabled: n = !1, onSelect: r, ...i } = e, a = b.useRef(null), o = Kc(cl, e.__scopeMenu), s = tl(cl, e.__scopeMenu), c = Yi(t, a), l = b.useRef(!1), u = /* @__PURE__ */ Ac(() => {
		let e = a.current;
		if (!n && e) {
			let t = new CustomEvent(ll, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(ll, (e) => r?.(e), { once: !0 }), se(e, t), t.defaultPrevented ? l.current = !1 : o.onClose();
		}
	}, "handleSelect");
	return /* @__PURE__ */ (0, G.jsx)(dl, {
		...i,
		ref: c,
		disabled: n,
		onClick: J(e.onClick, u),
		onPointerDown: (t) => {
			e.onPointerDown?.(t), l.current = !0;
		},
		onPointerUp: J(e.onPointerUp, (e) => {
			l.current || e.currentTarget?.click();
		}),
		onKeyDown: J(e.onKeyDown, (e) => {
			n || e.target !== e.currentTarget || s.searchRef.current !== "" && e.key === " " || jc.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
}, "MenuItem")), dl = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let { __scopeMenu: n, disabled: r = !1, textValue: i, ...a } = e, o = tl(cl, n), s = Hc(n), c = b.useRef(null), l = Yi(t, c), [u, d] = b.useState(!1), [f, p] = b.useState("");
	return b.useEffect(() => {
		let e = c.current;
		e && p((e.textContent ?? "").trim());
	}, [a.children]), /* @__PURE__ */ (0, G.jsx)(Ic.ItemSlot, {
		scope: n,
		disabled: r,
		textValue: i ?? f,
		children: /* @__PURE__ */ (0, G.jsx)(pc, {
			asChild: !0,
			...s,
			focusable: !r,
			children: /* @__PURE__ */ (0, G.jsx)(oe.div, {
				role: "menuitem",
				"data-highlighted": u ? "" : void 0,
				"aria-disabled": r || void 0,
				"data-disabled": r ? "" : void 0,
				...a,
				ref: l,
				onPointerMove: J(e.onPointerMove, Dl((e) => {
					r ? o.onItemLeave(e) : (o.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: J(e.onPointerLeave, Dl((e) => o.onItemLeave(e))),
				onFocus: J(e.onFocus, () => d(!0)),
				onBlur: J(e.onBlur, () => d(!1))
			})
		})
	});
}, "MenuItemImpl")), [fl, pl] = zc("MenuRadioGroup", {
	value: void 0,
	onValueChange: /* @__PURE__ */ Ac(() => {}, "onValueChange")
}), [ml, hl] = zc("MenuItemIndicator", { checked: !1 }), gl = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ac(function(e, t) {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, G.jsx)(oe.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
}, "MenuSeparator")), [_l, vl] = zc("MenuSub");
function yl(e) {
	return e ? "open" : "closed";
}
Ac(yl, "getOpenState");
function bl(e) {
	return e === "indeterminate";
}
Ac(bl, "isIndeterminate");
function xl(e) {
	return bl(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
Ac(xl, "getCheckedState");
function Sl(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
Ac(Sl, "focusFirst");
function Cl(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
Ac(Cl, "wrapArray");
function wl(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Cl(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
Ac(wl, "getNextMatch");
function Tl(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
Ac(Tl, "isPointInPolygon");
function El(e, t) {
	return t ? Tl({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
Ac(El, "isPointerInGraceArea");
function Dl(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
Ac(Dl, "whenMouse");
var Ol = qc, kl = Jc, Al = Qc, jl = nl, Ml = sl, Nl = ul, Pl = gl, Fl = Object.defineProperty, Il = (e, t) => Fl(e, "name", {
	value: t,
	configurable: !0
});
function Ll(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Il(Ll, "setRef");
function Rl(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Ll(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Ll(e[t], null);
			}
		};
	};
}
Il(Rl, "composeRefs");
function zl(...e) {
	return b.useCallback(Rl(...e), e);
}
Il(zl, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var Bl = Object.defineProperty, Vl = (e, t) => Bl(e, "name", {
	value: t,
	configurable: !0
}), Hl = "DropdownMenu", [Ul, Wl] = /* @__PURE__ */ fe(Hl, [Bc]), Gl = Bc(), [Kl, ql] = Ul(Hl), Jl = /* @__PURE__ */ Vl((e) => {
	let { __scopeDropdownMenu: t, children: n, dir: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = e, c = Gl(t), l = b.useRef(null), [u, d] = ct({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Hl
	});
	return /* @__PURE__ */ (0, G.jsx)(Kl, {
		scope: t,
		triggerId: Et(),
		triggerRef: l,
		contentId: Et(),
		open: u,
		onOpenChange: d,
		onOpenToggle: b.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: /* @__PURE__ */ (0, G.jsx)(Ol, {
			...c,
			open: u,
			onOpenChange: d,
			dir: r,
			modal: s,
			children: n
		})
	});
}, "DropdownMenu"), Yl = "DropdownMenuTrigger", Xl = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Vl(function(e, t) {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = ql(Yl, n), o = Gl(n), s = zl(t, a.triggerRef);
	return /* @__PURE__ */ (0, G.jsx)(kl, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ (0, G.jsx)(oe.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: s,
			onPointerDown: J(e.onPointerDown, (e) => {
				!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e.preventDefault());
			}),
			onKeyDown: J(e.onKeyDown, (e) => {
				r || (["Enter", " "].includes(e.key) && a.onOpenToggle(), e.key === "ArrowDown" && a.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
}, "DropdownMenuTrigger")), Zl = /* @__PURE__ */ Vl((e) => {
	let { __scopeDropdownMenu: t, ...n } = e, r = Gl(t);
	return /* @__PURE__ */ (0, G.jsx)(Al, {
		...r,
		...n
	});
}, "DropdownMenuPortal"), Ql = "DropdownMenuContent", $l = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Vl(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = ql(Ql, n), a = Gl(n), o = b.useRef(!1);
	return /* @__PURE__ */ (0, G.jsx)(jl, {
		id: i.contentId,
		"aria-labelledby": i.triggerId,
		...a,
		...r,
		ref: t,
		onCloseAutoFocus: J(e.onCloseAutoFocus, (e) => {
			o.current || i.triggerRef.current?.focus(), o.current = !1, e.preventDefault();
		}),
		onInteractOutside: J(e.onInteractOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
			(!i.modal || r) && (o.current = !0);
		}),
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "DropdownMenuContent")), eu = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Vl(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = Gl(n);
	return /* @__PURE__ */ (0, G.jsx)(Ml, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuLabel")), tu = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Vl(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = Gl(n);
	return /* @__PURE__ */ (0, G.jsx)(Nl, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuItem")), nu = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Vl(function(e, t) {
	let { __scopeDropdownMenu: n, ...r } = e, i = Gl(n);
	return /* @__PURE__ */ (0, G.jsx)(Pl, {
		...i,
		...r,
		ref: t
	});
}, "DropdownMenuSeparator")), ru = Jl, iu = Xl, au = Zl, ou = $l, su = eu, cu = tu, lu = nu, uu = Object.defineProperty, du = (e, t) => uu(e, "name", {
	value: t,
	configurable: !0
});
function fu(e) {
	let t = b.useRef({
		value: e,
		previous: e
	});
	return b.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
du(fu, "usePrevious");
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
var pu = Object.defineProperty, mu = (e, t) => pu(e, "name", {
	value: t,
	configurable: !0
});
function hu(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
mu(hu, "clamp");
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var gu = Object.defineProperty, _u = (e, t) => gu(e, "name", {
	value: t,
	configurable: !0
});
function vu(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
_u(vu, "setRef");
function yu(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = vu(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : vu(e[t], null);
			}
		};
	};
}
_u(yu, "composeRefs");
function bu(...e) {
	return b.useCallback(yu(...e), e);
}
_u(bu, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-slot/dist/index.mjs
var xu = Object.defineProperty, Su = (e, t) => xu(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function Cu(e) {
	let t = b.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		ju(r) && typeof Fu == "function" && (r = Fu(r._payload)), b.Children.forEach(r, (e) => {
			if (ku(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				ju(n) && typeof Fu == "function" && (n = Fu(n._payload)), a = Eu(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = b.cloneElement(a, void 0, s) : !o && b.Children.count(r) === 1 && b.isValidElement(r) && (a = r);
		let c = a ? Ou(a) : void 0, l = bu(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? Pu(e) : Nu(e));
			return r;
		}
		let u = Du(i, a.props ?? {});
		return a.type !== b.Fragment && (u.ref = n ? l : c), b.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
Su(Cu, "createSlot");
var wu = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function Tu(e) {
	let t = /* @__PURE__ */ Su((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = wu, t;
}
Su(Tu, "createSlottable");
var Eu = /* @__PURE__ */ Su((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return b.isValidElement(t) ? b.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return b.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function Du(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
Su(Du, "mergeProps");
function Ou(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Su(Ou, "getElementRef");
function ku(e) {
	return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === wu;
}
Su(ku, "isSlottable");
var Au = Symbol.for("react.lazy");
function ju(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === Au && "_payload" in e && Mu(e._payload);
}
Su(ju, "isLazyComponent");
function Mu(e) {
	return typeof e == "object" && !!e && "then" in e;
}
Su(Mu, "isPromiseLike");
var Nu = /* @__PURE__ */ Su((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Pu = /* @__PURE__ */ Su((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Fu = b.use, Iu = Object.defineProperty, Lu = (e, t) => Iu(e, "name", {
	value: t,
	configurable: !0
}), Ru = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], zu = [" ", "Enter"], Bu = "Select", [Vu, Hu, Uu] = /* @__PURE__ */ Fe(Bu), [Wu, Gu] = /* @__PURE__ */ fe(Bu, [Uu, gs]), Ku = gs(), [qu, Ju] = Wu(Bu), [Yu, Xu] = Wu(Bu);
function Zu(e) {
	let { __scopeSelect: t, children: n, open: r, defaultOpen: i, onOpenChange: a, value: o, defaultValue: s, onValueChange: c, dir: l, name: u, autoComplete: d, disabled: f, required: p, form: m, internal_do_not_use_render: h } = e, g = Ku(t), [_, v] = b.useState(null), [y, x] = b.useState(null), [S, C] = b.useState(!1), w = At(l), [T, E] = ct({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: Bu
	}), [D, O] = ct({
		prop: o,
		defaultProp: s,
		onChange: c,
		caller: Bu
	}), k = b.useRef(null), A = b.useRef(D);
	b.useEffect(() => {
		let e = m ? _?.ownerDocument.getElementById(m) : _?.form;
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ Lu(() => O(A.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		m,
		_,
		O
	]);
	let j = _ ? !!m || !!_.closest("form") : !0, [M, N] = b.useState(/* @__PURE__ */ new Set()), P = Et(), F = Array.from(M).map((e) => e.props.value).join(";"), I = b.useCallback((e) => {
		N((t) => new Set(t).add(e));
	}, []), L = b.useCallback((e) => {
		N((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		});
	}, []), ee = {
		required: p,
		trigger: _,
		onTriggerChange: v,
		valueNode: y,
		onValueNodeChange: x,
		valueNodeHasChildren: S,
		onValueNodeHasChildrenChange: C,
		contentId: P,
		value: D,
		onValueChange: O,
		open: T,
		onOpenChange: E,
		dir: w,
		triggerPointerDownPosRef: k,
		disabled: f,
		name: u,
		autoComplete: d,
		form: m,
		nativeOptions: M,
		nativeSelectKey: F,
		isFormControl: j
	};
	return /* @__PURE__ */ (0, G.jsx)(ks, {
		...g,
		children: /* @__PURE__ */ (0, G.jsx)(qu, {
			scope: t,
			...ee,
			children: /* @__PURE__ */ (0, G.jsx)(Vu.Provider, {
				scope: t,
				children: /* @__PURE__ */ (0, G.jsx)(Yu, {
					scope: t,
					onNativeOptionAdd: I,
					onNativeOptionRemove: L,
					children: Rd(h) ? h(ee) : n
				})
			})
		})
	});
}
Lu(Zu, "SelectProvider");
var Qu = /* @__PURE__ */ Lu((e) => {
	let { __scopeSelect: t, children: n, ...r } = e;
	return /* @__PURE__ */ (0, G.jsx)(Zu, {
		__scopeSelect: t,
		...r,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [n, e ? /* @__PURE__ */ (0, G.jsx)(Ld, { __scopeSelect: t }) : null] })
	});
}, "Select"), $u = "SelectTrigger", ed = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, disabled: r = !1, ...i } = e, a = Ku(n), o = Ju($u, n), s = o.disabled || r, c = bu(t, o.onTriggerChange), l = Hu(n), u = b.useRef("touch"), [d, f, p] = Bd((e) => {
		let t = l().filter((e) => !e.disabled), n = Vd(t, e, t.find((e) => e.value === o.value));
		n !== void 0 && o.onValueChange(n.value);
	}), m = /* @__PURE__ */ Lu((e) => {
		s || (o.onOpenChange(!0), p()), e && (o.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	}, "handleOpen");
	return /* @__PURE__ */ (0, G.jsx)(As, {
		asChild: !0,
		...a,
		children: /* @__PURE__ */ (0, G.jsx)(oe.button, {
			type: "button",
			role: "combobox",
			"aria-controls": o.open ? o.contentId : void 0,
			"aria-expanded": o.open,
			"aria-required": o.required,
			"aria-autocomplete": "none",
			dir: o.dir,
			"data-state": o.open ? "open" : "closed",
			disabled: s,
			"data-disabled": s ? "" : void 0,
			"data-placeholder": zd(o.value) ? "" : void 0,
			...i,
			ref: c,
			onClick: J(i.onClick, (e) => {
				e.currentTarget.focus(), u.current !== "mouse" && m(e);
			}),
			onPointerDown: J(i.onPointerDown, (e) => {
				u.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (m(e), e.preventDefault());
			}),
			onKeyDown: J(i.onKeyDown, (e) => {
				let t = d.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && f(e.key), !(t && e.key === " ") && Ru.includes(e.key) && (m(), e.preventDefault());
			})
		})
	});
}, "SelectTrigger")), td = "SelectValue", nd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = Ju(td, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = bu(t, c.onValueNodeChange);
	$e(() => {
		l(u);
	}, [l, u]);
	let f = zd(c.value);
	return /* @__PURE__ */ (0, G.jsx)(oe.span, {
		...s,
		asChild: f ? !1 : s.asChild,
		ref: d,
		style: { pointerEvents: "none" },
		children: /* @__PURE__ */ (0, G.jsx)(b.Fragment, { children: f ? o : a }, f ? "placeholder" : "value")
	});
}, "SelectValue")), rd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ (0, G.jsx)(oe.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
}, "SelectIcon")), [id, ad] = Wu("SelectPortal", { forceMount: void 0 }), od = /* @__PURE__ */ Lu((e) => {
	let { __scopeSelect: t, forceMount: n, ...r } = e;
	return /* @__PURE__ */ (0, G.jsx)(id, {
		scope: e.__scopeSelect,
		forceMount: n,
		children: /* @__PURE__ */ (0, G.jsx)(Dn, {
			asChild: !0,
			...r
		})
	});
}, "SelectPortal"), sd = "SelectContent", cd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let n = ad(sd, e.__scopeSelect), { forceMount: r = n.forceMount, ...i } = e, a = Ju(sd, e.__scopeSelect), [o, s] = b.useState();
	return $e(() => {
		s(new DocumentFragment());
	}, []), /* @__PURE__ */ (0, G.jsx)(gt, {
		present: r || a.open,
		children: ({ present: e }) => e ? /* @__PURE__ */ (0, G.jsx)(md, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, G.jsx)(ld, {
			...i,
			fragment: o
		})
	});
}, "SelectContent")), ld = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, children: r, fragment: i } = e;
	return i ? x.createPortal(/* @__PURE__ */ (0, G.jsx)(dd, {
		scope: n,
		children: /* @__PURE__ */ (0, G.jsx)(Vu.Slot, {
			scope: n,
			children: /* @__PURE__ */ (0, G.jsx)("div", {
				ref: t,
				children: r
			})
		})
	}), i) : null;
}, "SelectContentFragment")), ud = 10, [dd, fd] = Wu(sd), pd = /* @__PURE__ */ Cu("SelectContent.RemoveScroll"), md = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n } = e, { position: r = "item-aligned", onCloseAutoFocus: i, onEscapeKeyDown: a, onPointerDownOutside: o, side: s, sideOffset: c, align: l, alignOffset: u, arrowPadding: d, collisionBoundary: f, collisionPadding: p, sticky: m, hideWhenDetached: h, avoidCollisions: g, ..._ } = e, v = Ju(sd, n), [y, x] = b.useState(null), [S, C] = b.useState(null), w = bu(t, x), [T, E] = b.useState(null), [D, O] = b.useState(null), k = Hu(n), [A, j] = b.useState(!1), M = b.useRef(!1);
	b.useEffect(() => {
		if (y) return Qr(y);
	}, [y]), Nn();
	let N = b.useCallback((e) => {
		let [t, ...n] = k().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && S && (S.scrollTop = 0), n === r && S && (S.scrollTop = S.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [k, S]), P = b.useCallback(() => N([T, y]), [
		N,
		T,
		y
	]);
	b.useEffect(() => {
		A && P();
	}, [A, P]);
	let { onOpenChange: F, triggerPointerDownPosRef: I } = v;
	b.useEffect(() => {
		if (y) {
			let e = {
				x: 0,
				y: 0
			}, t = /* @__PURE__ */ Lu((t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (I.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (I.current?.y ?? 0))
				};
			}, "handlePointerMove"), n = /* @__PURE__ */ Lu((n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : n.composedPath().includes(y) || F(!1), document.removeEventListener("pointermove", t), I.current = null;
			}, "handlePointerUp");
			return I.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		y,
		F,
		I
	]), b.useEffect(() => {
		let e = /* @__PURE__ */ Lu(() => F(!1), "close");
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [F]);
	let [L, ee] = Bd((e) => {
		let t = k().filter((e) => !e.disabled), n = Vd(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current?.focus());
	}), R = b.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(v.value !== void 0 && v.value === t || r) && (E(e), r && (M.current = !0));
	}, [v.value]), z = b.useCallback(() => y?.focus(), [y]), B = b.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(v.value !== void 0 && v.value === t || r) && O(e);
	}, [v.value]), V = r === "popper" ? gd : hd, H = V === gd ? {
		side: s,
		sideOffset: c,
		align: l,
		alignOffset: u,
		arrowPadding: d,
		collisionBoundary: f,
		collisionPadding: p,
		sticky: m,
		hideWhenDetached: h,
		avoidCollisions: g
	} : {};
	return /* @__PURE__ */ (0, G.jsx)(dd, {
		scope: n,
		content: y,
		viewport: S,
		onViewportChange: C,
		itemRefCallback: R,
		selectedItem: T,
		onItemLeave: z,
		itemTextRefCallback: B,
		focusSelectedItem: P,
		selectedItemText: D,
		position: r,
		isPositioned: A,
		searchRef: L,
		children: /* @__PURE__ */ (0, G.jsx)(Ur, {
			as: pd,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ (0, G.jsx)(mn, {
				asChild: !0,
				trapped: v.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: J(i, (e) => {
					v.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ (0, G.jsx)(Zt, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: a,
					onPointerDownOutside: o,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => v.onOpenChange(!1),
					children: /* @__PURE__ */ (0, G.jsx)(V, {
						role: "listbox",
						id: v.contentId,
						"data-state": v.open ? "open" : "closed",
						dir: v.dir,
						onContextMenu: (e) => e.preventDefault(),
						..._,
						...H,
						onPlaced: () => j(!0),
						ref: w,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							..._.style
						},
						onKeyDown: J(_.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && ee(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = k().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => N(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
}, "SelectContentImpl")), hd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, onPlaced: r, ...i } = e, a = Ju(sd, n), o = fd(sd, n), [s, c] = b.useState(null), [l, u] = b.useState(null), d = bu(t, u), f = Hu(n), p = b.useRef(!1), m = b.useRef(!0), { viewport: h, selectedItem: g, selectedItemText: _, focusSelectedItem: v } = o, y = b.useCallback(() => {
		if (a.trigger && a.valueNode && s && l && h && g && _) {
			let e = a.trigger.getBoundingClientRect(), t = l.getBoundingClientRect(), n = a.valueNode.getBoundingClientRect(), i = _.getBoundingClientRect();
			if (a.dir !== "rtl") {
				let r = i.left - t.left, a = n.left - r, o = e.left - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - ud, d = hu(a, [ud, Math.max(ud, u - l)]);
				s.style.minWidth = c + "px", s.style.left = d + "px";
			} else {
				let r = t.right - i.right, a = window.innerWidth - n.right - r, o = window.innerWidth - e.right - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - ud, d = hu(a, [ud, Math.max(ud, u - l)]);
				s.style.minWidth = c + "px", s.style.right = d + "px";
			}
			let o = f(), c = window.innerHeight - ud * 2, u = h.scrollHeight, d = window.getComputedStyle(l), m = parseInt(d.borderTopWidth, 10), v = parseInt(d.paddingTop, 10), y = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = m + v + u + b + y, S = Math.min(g.offsetHeight * 5, x), C = window.getComputedStyle(h), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - ud, D = c - E, O = g.offsetHeight / 2, k = g.offsetTop + O, A = m + v + k, j = x - A;
			if (A <= E) {
				let e = o.length > 0 && g === o[o.length - 1].ref.current;
				s.style.bottom = "0px";
				let t = l.clientHeight - h.offsetTop - h.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + y);
				s.style.height = n + "px";
			} else {
				let e = o.length > 0 && g === o[0].ref.current;
				s.style.top = "0px";
				let t = Math.max(E, m + h.offsetTop + (e ? w : 0) + O) + j;
				s.style.height = t + "px", h.scrollTop = A - E + h.offsetTop;
			}
			s.style.margin = `${ud}px 0`, s.style.minHeight = S + "px", s.style.maxHeight = c + "px", r?.(), requestAnimationFrame(() => p.current = !0);
		}
	}, [
		f,
		a.trigger,
		a.valueNode,
		s,
		l,
		h,
		g,
		_,
		a.dir,
		r
	]);
	$e(() => y(), [y]);
	let [x, S] = b.useState();
	return $e(() => {
		l && S(window.getComputedStyle(l).zIndex);
	}, [l]), /* @__PURE__ */ (0, G.jsx)(_d, {
		scope: n,
		contentWrapper: s,
		shouldExpandOnScrollRef: p,
		onScrollButtonChange: b.useCallback((e) => {
			e && m.current === !0 && (y(), v?.(), m.current = !1);
		}, [y, v]),
		children: /* @__PURE__ */ (0, G.jsx)("div", {
			ref: c,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: x
			},
			children: /* @__PURE__ */ (0, G.jsx)(oe.div, {
				...i,
				ref: d,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...i.style
				}
			})
		})
	});
}, "SelectItemAlignedPosition")), gd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = ud, ...a } = e, o = Ku(n);
	return /* @__PURE__ */ (0, G.jsx)(js, {
		...o,
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "SelectPopperPosition")), [_d, vd] = Wu(sd, {}), yd = "SelectViewport", bd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, nonce: r, ...i } = e, a = fd(yd, n), o = vd(yd, n), s = bu(t, a.onViewportChange), c = b.useRef(0);
	return /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsx)("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: r
	}), /* @__PURE__ */ (0, G.jsx)(Vu.Slot, {
		scope: n,
		children: /* @__PURE__ */ (0, G.jsx)(oe.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...i,
			ref: s,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...i.style
			},
			onScroll: J(i.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = o;
				if (r?.current && n) {
					let e = Math.abs(c.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - ud * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				c.current = t.scrollTop;
			})
		})
	})] });
}, "SelectViewport")), [xd, Sd] = Wu("SelectGroup"), Cd = "SelectItem", [wd, Td] = Wu(Cd), Ed = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, value: r, disabled: i = !1, textValue: a, ...o } = e, s = Ju(Cd, n), c = fd(Cd, n), l = s.value === r, [u, d] = b.useState(a ?? ""), [f, p] = b.useState(!1), m = bu(t, Ut((e) => c.itemRefCallback?.(e, r, i))), h = Et(), g = b.useRef("touch"), _ = /* @__PURE__ */ Lu(() => {
		i || (s.onValueChange(r), s.onOpenChange(!1));
	}, "handleSelect");
	return /* @__PURE__ */ (0, G.jsx)(wd, {
		scope: n,
		value: r,
		disabled: i,
		textId: h,
		isSelected: l,
		onItemTextChange: b.useCallback((e) => {
			d((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ (0, G.jsx)(Vu.ItemSlot, {
			scope: n,
			value: r,
			disabled: i,
			textValue: u,
			children: /* @__PURE__ */ (0, G.jsx)(oe.div, {
				role: "option",
				"aria-labelledby": h,
				"data-highlighted": f ? "" : void 0,
				"aria-selected": l && f,
				"data-state": l ? "checked" : "unchecked",
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				tabIndex: i ? void 0 : -1,
				...o,
				ref: m,
				onFocus: J(o.onFocus, () => p(!0)),
				onBlur: J(o.onBlur, () => p(!1)),
				onClick: J(o.onClick, () => {
					g.current !== "mouse" && _();
				}),
				onPointerUp: J(o.onPointerUp, () => {
					g.current === "mouse" && _();
				}),
				onPointerDown: J(o.onPointerDown, (e) => {
					g.current = e.pointerType;
				}),
				onPointerMove: J(o.onPointerMove, (e) => {
					g.current = e.pointerType, i ? c.onItemLeave?.() : g.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: J(o.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && c.onItemLeave?.();
				}),
				onKeyDown: J(o.onKeyDown, (e) => {
					i || e.target !== e.currentTarget || c.searchRef?.current !== "" && e.key === " " || (zu.includes(e.key) && _(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
}, "SelectItem")), Dd = "SelectItemText", Od = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, ...a } = e, o = Ju(Dd, n), s = fd(Dd, n), c = Td(Dd, n), l = Xu(Dd, n), [u, d] = b.useState(null), f = Ut((e) => s.itemTextRefCallback?.(e, c.value, c.disabled)), p = bu(t, d, c.onItemTextChange, f), m = u?.textContent, h = b.useMemo(() => /* @__PURE__ */ (0, G.jsx)("option", {
		value: c.value,
		disabled: c.disabled,
		children: m
	}, c.value), [
		c.disabled,
		c.value,
		m
	]), { onNativeOptionAdd: g, onNativeOptionRemove: _ } = l;
	return $e(() => (g(h), () => _(h)), [
		g,
		_,
		h
	]), /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsx)(oe.span, {
		id: c.textId,
		...a,
		ref: p
	}), c.isSelected && o.valueNode && !o.valueNodeHasChildren && !zd(o.value) ? x.createPortal(a.children, o.valueNode) : null] });
}, "SelectItemText")), kd = "SelectItemIndicator", Ad = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, ...r } = e;
	return Td(kd, n).isSelected ? /* @__PURE__ */ (0, G.jsx)(oe.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
}, "SelectItemIndicator")), jd = "SelectScrollUpButton", Md = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let n = fd(jd, e.__scopeSelect), r = vd(jd, e.__scopeSelect), [i, a] = b.useState(!1), o = bu(t, r.onScrollButtonChange);
	return $e(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				a(t.scrollTop > 0);
			};
			Lu(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, G.jsx)(Fd, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
}, "SelectScrollUpButton")), Nd = "SelectScrollDownButton", Pd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let n = fd(Nd, e.__scopeSelect), r = vd(Nd, e.__scopeSelect), [i, a] = b.useState(!1), o = bu(t, r.onScrollButtonChange);
	return $e(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				a(Math.ceil(t.scrollTop) < e);
			};
			Lu(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, G.jsx)(Fd, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
}, "SelectScrollDownButton")), Fd = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function(e, t) {
	let { __scopeSelect: n, onAutoScroll: r, ...i } = e, a = fd("SelectScrollButton", n), o = b.useRef(null), s = Hu(n), c = b.useCallback(() => {
		o.current !== null && (window.clearInterval(o.current), o.current = null);
	}, []);
	return b.useEffect(() => () => c(), [c]), $e(() => {
		s().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [s]), /* @__PURE__ */ (0, G.jsx)(oe.div, {
		"aria-hidden": !0,
		...i,
		ref: t,
		style: {
			flexShrink: 0,
			...i.style
		},
		onPointerDown: J(i.onPointerDown, () => {
			o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerMove: J(i.onPointerMove, () => {
			a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerLeave: J(i.onPointerLeave, () => {
			c();
		})
	});
}, "SelectScrollButtonImpl")), Id = "SelectBubbleInput", Ld = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Lu(function({ __scopeSelect: e, ...t }, n) {
	let r = Ju(Id, e), { value: i, onValueChange: a, required: o, disabled: s, name: c, autoComplete: l, form: u } = r, { nativeOptions: d, nativeSelectKey: f } = r, p = b.useRef(null), m = bu(n, p), h = i ?? "", g = fu(h), _ = Array.from(d).some((e) => (e.props.value ?? "") === "");
	return b.useEffect(() => {
		let e = p.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, n = Object.getOwnPropertyDescriptor(t, "value").set;
		if (g !== h && n) {
			let t = new Event("change", { bubbles: !0 });
			n.call(e, h), e.dispatchEvent(t);
		}
	}, [g, h]), /* @__PURE__ */ (0, G.jsxs)(oe.select, {
		"aria-hidden": !0,
		required: o,
		tabIndex: -1,
		name: c,
		autoComplete: l,
		disabled: s,
		form: u,
		onChange: (e) => a(e.target.value),
		...t,
		style: {
			...ce,
			...t.style
		},
		ref: m,
		defaultValue: h,
		children: [zd(i) && !_ ? /* @__PURE__ */ (0, G.jsx)("option", { value: "" }) : null, Array.from(d)]
	}, f);
}, "SelectBubbleInput"));
function Rd(e) {
	return typeof e == "function";
}
Lu(Rd, "isFunction");
function zd(e) {
	return e === "" || e === void 0;
}
Lu(zd, "shouldShowPlaceholder");
function Bd(e) {
	let t = Ut(e), n = b.useRef(""), r = b.useRef(0), i = b.useCallback((e) => {
		let i = n.current + e;
		t(i), (/* @__PURE__ */ Lu((function e(t) {
			n.current = t, window.clearTimeout(r.current), t !== "" && (r.current = window.setTimeout(() => e(""), 1e3));
		}), "updateSearch"))(i);
	}, [t]), a = b.useCallback(() => {
		n.current = "", window.clearTimeout(r.current);
	}, []);
	return b.useEffect(() => () => window.clearTimeout(r.current), []), [
		n,
		i,
		a
	];
}
Lu(Bd, "useTypeaheadSearch");
function Vd(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Hd(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
Lu(Vd, "findNextItem");
function Hd(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
Lu(Hd, "wrapArray");
//#endregion
//#region node_modules/radix-ui/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var Ud = Object.defineProperty, Wd = (e, t) => Ud(e, "name", {
	value: t,
	configurable: !0
});
function Gd(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Wd(Gd, "setRef");
function Kd(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Gd(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Gd(e[t], null);
			}
		};
	};
}
Wd(Kd, "composeRefs");
function qd(...e) {
	return b.useCallback(Kd(...e), e);
}
Wd(qd, "useComposedRefs");
//#endregion
//#region node_modules/radix-ui/node_modules/@radix-ui/react-slot/dist/index.mjs
var Jd = Object.defineProperty, Yd = (e, t) => Jd(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function Xd(e) {
	let t = b.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		of(r) && typeof uf == "function" && (r = uf(r._payload)), b.Children.forEach(r, (e) => {
			if (rf(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				of(n) && typeof uf == "function" && (n = uf(n._payload)), a = ef(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = b.cloneElement(a, void 0, s) : !o && b.Children.count(r) === 1 && b.isValidElement(r) && (a = r);
		let c = a ? nf(a) : void 0, l = qd(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? lf(e) : cf(e));
			return r;
		}
		let u = tf(i, a.props ?? {});
		return a.type !== b.Fragment && (u.ref = n ? l : c), b.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
Yd(Xd, "createSlot");
var Zd = /* @__PURE__ */ Xd("Slot"), Qd = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function $d(e) {
	let t = /* @__PURE__ */ Yd((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = Qd, t;
}
Yd($d, "createSlottable");
var ef = /* @__PURE__ */ Yd((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return b.isValidElement(t) ? b.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return b.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function tf(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
Yd(tf, "mergeProps");
function nf(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Yd(nf, "getElementRef");
function rf(e) {
	return b.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Qd;
}
Yd(rf, "isSlottable");
var af = Symbol.for("react.lazy");
function of(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === af && "_payload" in e && sf(e._payload);
}
Yd(of, "isLazyComponent");
function sf(e) {
	return typeof e == "object" && !!e && "then" in e;
}
Yd(sf, "isPromiseLike");
var cf = /* @__PURE__ */ Yd((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), lf = /* @__PURE__ */ Yd((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), uf = b.use, df = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, ff = (e, t) => ({
	classGroupId: e,
	validator: t
}), pf = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), mf = "-", hf = [], gf = "arbitrary..", _f = (e) => {
	let t = bf(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return yf(e);
			let n = e.split(mf);
			return vf(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? df(i, t) : t : i || hf;
			}
			return n[e] || hf;
		}
	};
}, vf = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = vf(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(mf) : e.slice(t).join(mf), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, yf = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? gf + r : void 0;
})(), bf = (e) => {
	let { theme: t, classGroups: n } = e;
	return xf(n, t);
}, xf = (e, t) => {
	let n = pf();
	for (let r in e) {
		let i = e[r];
		Sf(i, n, r, t);
	}
	return n;
}, Sf = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Cf(i, t, n, r);
	}
}, Cf = (e, t, n, r) => {
	if (typeof e == "string") {
		wf(e, t, n);
		return;
	}
	if (typeof e == "function") {
		Tf(e, t, n, r);
		return;
	}
	Ef(e, t, n, r);
}, wf = (e, t, n) => {
	let r = e === "" ? t : Df(t, e);
	r.classGroupId = n;
}, Tf = (e, t, n, r) => {
	if (Of(e)) {
		Sf(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(ff(n, e));
}, Ef = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Sf(o, Df(t, a), n, r);
	}
}, Df = (e, t) => {
	let n = e, r = t.split(mf), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = pf(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Of = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, kf = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, Af = "!", jf = ":", Mf = [], Nf = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), Pf = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === jf) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(Af) ? (c = s.slice(0, -1), l = !0) : s.startsWith(Af) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return Nf(t, l, c, u);
	};
	if (t) {
		let e = t + jf, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : Nf(Mf, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, Ff = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, If = (e) => ({
	cache: kf(e.cacheSize),
	parseClassName: Pf(e),
	sortModifiers: Ff(e),
	postfixLookupClassGroupIds: Lf(e),
	..._f(e)
}), Lf = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Rf = /\s+/, zf = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Rf), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + Af : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, Bf = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = Vf(n)) && (i && (i += " "), i += r);
	return i;
}, Vf = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = Vf(e[r])) && (n && (n += " "), n += t);
	return n;
}, Hf = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = If(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = zf(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(Bf(...e));
}, Uf = [], Wf = (e) => {
	let t = (t) => t[e] || Uf;
	return t.isThemeGetter = !0, t;
}, Gf = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Kf = /^\((?:(\w[\w-]*):)?(.+)\)$/i, qf = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Jf = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Yf = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Xf = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Zf = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Qf = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, $f = (e) => qf.test(e), Z = (e) => !!e && !Number.isNaN(Number(e)), ep = (e) => !!e && Number.isInteger(Number(e)), tp = (e) => e.endsWith("%") && Z(e.slice(0, -1)), np = (e) => Jf.test(e), rp = () => !0, ip = (e) => Yf.test(e) && !Xf.test(e), ap = () => !1, op = (e) => Zf.test(e), sp = (e) => Qf.test(e), cp = (e) => !Q(e) && !$(e), lp = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), up = (e) => Tp(e, kp, ap), Q = (e) => Gf.test(e), dp = (e) => Tp(e, Ap, ip), fp = (e) => Tp(e, jp, Z), pp = (e) => Tp(e, Np, rp), mp = (e) => Tp(e, Mp, ap), hp = (e) => Tp(e, Dp, ap), gp = (e) => Tp(e, Op, sp), _p = (e) => Tp(e, Pp, op), $ = (e) => Kf.test(e), vp = (e) => Ep(e, Ap), yp = (e) => Ep(e, Mp), bp = (e) => Ep(e, Dp), xp = (e) => Ep(e, kp), Sp = (e) => Ep(e, Op), Cp = (e) => Ep(e, Pp, !0), wp = (e) => Ep(e, Np, !0), Tp = (e, t, n) => {
	let r = Gf.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Ep = (e, t, n = !1) => {
	let r = Kf.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Dp = (e) => e === "position" || e === "percentage", Op = (e) => e === "image" || e === "url", kp = (e) => e === "length" || e === "size" || e === "bg-size", Ap = (e) => e === "length", jp = (e) => e === "number", Mp = (e) => e === "family-name", Np = (e) => e === "number" || e === "weight", Pp = (e) => e === "shadow", Fp = /* @__PURE__ */ Hf(() => {
	let e = Wf("color"), t = Wf("font"), n = Wf("text"), r = Wf("font-weight"), i = Wf("tracking"), a = Wf("leading"), o = Wf("breakpoint"), s = Wf("container"), c = Wf("spacing"), l = Wf("radius"), u = Wf("shadow"), d = Wf("inset-shadow"), f = Wf("text-shadow"), p = Wf("drop-shadow"), m = Wf("blur"), h = Wf("perspective"), g = Wf("aspect"), _ = Wf("ease"), v = Wf("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		$,
		Q
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		$,
		Q,
		c
	], T = () => [
		$f,
		"full",
		"auto",
		...w()
	], E = () => [
		ep,
		"none",
		"subgrid",
		$,
		Q
	], D = () => [
		"auto",
		{ span: [
			"full",
			ep,
			$,
			Q
		] },
		ep,
		$,
		Q
	], O = () => [
		ep,
		"auto",
		$,
		Q
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		$,
		Q
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], N = () => [
		$f,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		$f,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], F = () => [
		$f,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], I = () => [
		e,
		$,
		Q
	], L = () => [
		...b(),
		bp,
		hp,
		{ position: [$, Q] }
	], ee = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], R = () => [
		"auto",
		"cover",
		"contain",
		xp,
		up,
		{ size: [$, Q] }
	], z = () => [
		tp,
		vp,
		dp
	], B = () => [
		"",
		"none",
		"full",
		l,
		$,
		Q
	], V = () => [
		"",
		Z,
		vp,
		dp
	], H = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], U = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], W = () => [
		Z,
		tp,
		bp,
		hp
	], te = () => [
		"",
		"none",
		m,
		$,
		Q
	], ne = () => [
		"none",
		Z,
		$,
		Q
	], re = () => [
		"none",
		Z,
		$,
		Q
	], ie = () => [
		Z,
		$,
		Q
	], G = () => [
		$f,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [np],
			breakpoint: [np],
			color: [rp],
			container: [np],
			"drop-shadow": [np],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [cp],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [np],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [np],
			shadow: [np],
			spacing: ["px", Z],
			text: [np],
			"text-shadow": [np],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				$f,
				Q,
				$,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				$,
				Q
			] }],
			"container-named": [lp],
			columns: [{ columns: [
				Z,
				Q,
				$,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				ep,
				"auto",
				$,
				Q
			] }],
			basis: [{ basis: [
				$f,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				Z,
				$f,
				"auto",
				"initial",
				"none",
				Q
			] }],
			grow: [{ grow: [
				"",
				Z,
				$,
				Q
			] }],
			shrink: [{ shrink: [
				"",
				Z,
				$,
				Q
			] }],
			order: [{ order: [
				ep,
				"first",
				"last",
				"none",
				$,
				Q
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mbs: [{ mbs: M() }],
			mbe: [{ mbe: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: N() }],
			"inline-size": [{ inline: ["auto", ...P()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...P()] }],
			"max-inline-size": [{ "max-inline": ["none", ...P()] }],
			"block-size": [{ block: ["auto", ...F()] }],
			"min-block-size": [{ "min-block": ["auto", ...F()] }],
			"max-block-size": [{ "max-block": ["none", ...F()] }],
			w: [{ w: [
				s,
				"screen",
				...N()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...N()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...N()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...N()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...N()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				vp,
				dp
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				wp,
				pp
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				tp,
				Q
			] }],
			"font-family": [{ font: [
				yp,
				mp,
				t
			] }],
			"font-features": [{ "font-features": [Q] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				$,
				Q
			] }],
			"line-clamp": [{ "line-clamp": [
				Z,
				"none",
				$,
				fp
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				$,
				Q
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				$,
				Q
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: I() }],
			"text-color": [{ text: I() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...H(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				Z,
				"from-font",
				"auto",
				$,
				dp
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				Z,
				"auto",
				$,
				Q
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				ep,
				$,
				Q
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				$,
				Q
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				$,
				Q
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: L() }],
			"bg-repeat": [{ bg: ee() }],
			"bg-size": [{ bg: R() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						ep,
						$,
						Q
					],
					radial: [
						"",
						$,
						Q
					],
					conic: [
						ep,
						$,
						Q
					]
				},
				Sp,
				gp
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: z() }],
			"gradient-via-pos": [{ via: z() }],
			"gradient-to-pos": [{ to: z() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: B() }],
			"rounded-s": [{ "rounded-s": B() }],
			"rounded-e": [{ "rounded-e": B() }],
			"rounded-t": [{ "rounded-t": B() }],
			"rounded-r": [{ "rounded-r": B() }],
			"rounded-b": [{ "rounded-b": B() }],
			"rounded-l": [{ "rounded-l": B() }],
			"rounded-ss": [{ "rounded-ss": B() }],
			"rounded-se": [{ "rounded-se": B() }],
			"rounded-ee": [{ "rounded-ee": B() }],
			"rounded-es": [{ "rounded-es": B() }],
			"rounded-tl": [{ "rounded-tl": B() }],
			"rounded-tr": [{ "rounded-tr": B() }],
			"rounded-br": [{ "rounded-br": B() }],
			"rounded-bl": [{ "rounded-bl": B() }],
			"border-w": [{ border: V() }],
			"border-w-x": [{ "border-x": V() }],
			"border-w-y": [{ "border-y": V() }],
			"border-w-s": [{ "border-s": V() }],
			"border-w-e": [{ "border-e": V() }],
			"border-w-bs": [{ "border-bs": V() }],
			"border-w-be": [{ "border-be": V() }],
			"border-w-t": [{ "border-t": V() }],
			"border-w-r": [{ "border-r": V() }],
			"border-w-b": [{ "border-b": V() }],
			"border-w-l": [{ "border-l": V() }],
			"divide-x": [{ "divide-x": V() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": V() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...H(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...H(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: I() }],
			"border-color-x": [{ "border-x": I() }],
			"border-color-y": [{ "border-y": I() }],
			"border-color-s": [{ "border-s": I() }],
			"border-color-e": [{ "border-e": I() }],
			"border-color-bs": [{ "border-bs": I() }],
			"border-color-be": [{ "border-be": I() }],
			"border-color-t": [{ "border-t": I() }],
			"border-color-r": [{ "border-r": I() }],
			"border-color-b": [{ "border-b": I() }],
			"border-color-l": [{ "border-l": I() }],
			"divide-color": [{ divide: I() }],
			"outline-style": [{ outline: [
				...H(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				Z,
				$,
				Q
			] }],
			"outline-w": [{ outline: [
				"",
				Z,
				vp,
				dp
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				Cp,
				_p
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Cp,
				_p
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: V() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [Z, dp] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": V() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Cp,
				_p
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				Z,
				$,
				Q
			] }],
			"mix-blend": [{ "mix-blend": [
				...U(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": U() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [Z] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": W() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": W() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": W() }],
			"mask-image-t-to-pos": [{ "mask-t-to": W() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": W() }],
			"mask-image-r-to-pos": [{ "mask-r-to": W() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": W() }],
			"mask-image-b-to-pos": [{ "mask-b-to": W() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": W() }],
			"mask-image-l-to-pos": [{ "mask-l-to": W() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": W() }],
			"mask-image-x-to-pos": [{ "mask-x-to": W() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": W() }],
			"mask-image-y-to-pos": [{ "mask-y-to": W() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [$, Q] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": W() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": W() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [Z] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": W() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": W() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": I() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: L() }],
			"mask-repeat": [{ mask: ee() }],
			"mask-size": [{ mask: R() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				$,
				Q
			] }],
			filter: [{ filter: [
				"",
				"none",
				$,
				Q
			] }],
			blur: [{ blur: te() }],
			brightness: [{ brightness: [
				Z,
				$,
				Q
			] }],
			contrast: [{ contrast: [
				Z,
				$,
				Q
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Cp,
				_p
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				Z,
				$,
				Q
			] }],
			"hue-rotate": [{ "hue-rotate": [
				Z,
				$,
				Q
			] }],
			invert: [{ invert: [
				"",
				Z,
				$,
				Q
			] }],
			saturate: [{ saturate: [
				Z,
				$,
				Q
			] }],
			sepia: [{ sepia: [
				"",
				Z,
				$,
				Q
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				$,
				Q
			] }],
			"backdrop-blur": [{ "backdrop-blur": te() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				Z,
				$,
				Q
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				Z,
				$,
				Q
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				Z,
				$,
				Q
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				Z,
				$,
				Q
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				Z,
				$,
				Q
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				Z,
				$,
				Q
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				Z,
				$,
				Q
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				Z,
				$,
				Q
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				$,
				Q
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				Z,
				"initial",
				$,
				Q
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				$,
				Q
			] }],
			delay: [{ delay: [
				Z,
				$,
				Q
			] }],
			animate: [{ animate: [
				"none",
				v,
				$,
				Q
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				$,
				Q
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ne() }],
			"rotate-x": [{ "rotate-x": ne() }],
			"rotate-y": [{ "rotate-y": ne() }],
			"rotate-z": [{ "rotate-z": ne() }],
			scale: [{ scale: re() }],
			"scale-x": [{ "scale-x": re() }],
			"scale-y": [{ "scale-y": re() }],
			"scale-z": [{ "scale-z": re() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ie() }],
			"skew-x": [{ "skew-x": ie() }],
			"skew-y": [{ "skew-y": ie() }],
			transform: [{ transform: [
				$,
				Q,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: G() }],
			"translate-x": [{ "translate-x": G() }],
			"translate-y": [{ "translate-y": G() }],
			"translate-z": [{ "translate-z": G() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				ep,
				$,
				Q
			] }],
			accent: [{ accent: I() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: I() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				$,
				Q
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": I() }],
			"scrollbar-track-color": [{ "scrollbar-track": I() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				$,
				Q
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				Z,
				vp,
				dp,
				fp
			] }],
			stroke: [{ stroke: ["none", ...I()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region lib/utils.ts
function Ip(...e) {
	return Fp(T(e));
}
//#endregion
//#region components/ui/button.tsx
var Lp = O("inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Rp({ className: e, variant: t = "default", size: n = "default", asChild: r = !1, ...i }) {
	return /* @__PURE__ */ (0, G.jsx)(r ? Zd : "button", {
		"data-slot": "button",
		"data-variant": t,
		"data-size": n,
		className: Ip(Lp({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
//#endregion
//#region components/ui/badge.tsx
var zp = O("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
		secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
		outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		link: "text-primary underline-offset-4 [a&]:hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function Bp({ className: e, variant: t = "default", asChild: n = !1, ...r }) {
	return /* @__PURE__ */ (0, G.jsx)(n ? Zd : "span", {
		"data-slot": "badge",
		"data-variant": t,
		className: Ip(zp({ variant: t }), e),
		...r
	});
}
//#endregion
//#region components/ui/input.tsx
function Vp({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, G.jsx)("input", {
		type: t,
		"data-slot": "input",
		className: Ip("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
//#endregion
//#region components/ui/textarea.tsx
function Hp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)("textarea", {
		"data-slot": "textarea",
		className: Ip("flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40", e),
		...t
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var Up = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Wp = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Gp = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Kp = (e) => {
	let t = Gp(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, qp = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, Jp = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Yp = (0, b.createContext)({}), Xp = () => (0, b.useContext)(Yp), Zp = (0, b.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = Xp() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, b.createElement)("svg", {
		ref: c,
		...qp,
		width: t ?? l ?? qp.width,
		height: t ?? l ?? qp.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: Up("lucide", p, i),
		...!a && !Jp(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, b.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), Qp = (e, t) => {
	let n = (0, b.forwardRef)(({ className: n, ...r }, i) => (0, b.createElement)(Zp, {
		ref: i,
		iconNode: t,
		className: Up(`lucide-${Wp(Kp(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = Kp(e), n;
}, $p = Qp("chart-no-axes-combined", [
	["path", {
		d: "M12 16v5",
		key: "zza2cw"
	}],
	["path", {
		d: "M16 14.639V21",
		key: "1s85h0"
	}],
	["path", {
		d: "M20 10.656V21",
		key: "q45596"
	}],
	["path", {
		d: "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15",
		key: "1fw8x9"
	}],
	["path", {
		d: "M4 18.463V21",
		key: "1otddq"
	}],
	["path", {
		d: "M8 14.656V21",
		key: "1t2idw"
	}]
]), em = Qp("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), tm = Qp("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), nm = Qp("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), rm = Qp("clipboard-check", [
	["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1",
		key: "tgr4d6"
	}],
	["path", {
		d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
		key: "116196"
	}],
	["path", {
		d: "m9 14 2 2 4-4",
		key: "df797q"
	}]
]), im = Qp("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region components/ui/dialog.tsx
function am({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(xi, {
		"data-slot": "dialog",
		...e
	});
}
function om({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(Ti, {
		"data-slot": "dialog-portal",
		...e
	});
}
function sm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Di, {
		"data-slot": "dialog-overlay",
		className: Ip("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function cm({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, G.jsxs)(om, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, G.jsx)(sm, {}), /* @__PURE__ */ (0, G.jsxs)(ji, {
			"data-slot": "dialog-content",
			className: Ip("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", e),
			...r,
			children: [t, n && /* @__PURE__ */ (0, G.jsxs)(Bi, {
				"data-slot": "dialog-close",
				className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, G.jsx)(im, {}), /* @__PURE__ */ (0, G.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function lm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Ii, {
		"data-slot": "dialog-title",
		className: Ip("text-lg leading-none font-semibold", e),
		...t
	});
}
function um({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Ri, {
		"data-slot": "dialog-description",
		className: Ip("text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region components/ui/select.tsx
function dm({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(Qu, {
		"data-slot": "select",
		...e
	});
}
function fm({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(nd, {
		"data-slot": "select-value",
		...e
	});
}
function pm({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, G.jsxs)(ed, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: Ip("flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", e),
		...r,
		children: [n, /* @__PURE__ */ (0, G.jsx)(rd, {
			asChild: !0,
			children: /* @__PURE__ */ (0, G.jsx)(tm, { className: "size-4 opacity-50" })
		})]
	});
}
function mm({ className: e, children: t, position: n = "item-aligned", align: r = "center", ...i }) {
	return /* @__PURE__ */ (0, G.jsx)(od, { children: /* @__PURE__ */ (0, G.jsxs)(cd, {
		"data-slot": "select-content",
		className: Ip("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
		position: n,
		align: r,
		...i,
		children: [
			/* @__PURE__ */ (0, G.jsx)(gm, {}),
			/* @__PURE__ */ (0, G.jsx)(bd, {
				className: Ip("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
				children: t
			}),
			/* @__PURE__ */ (0, G.jsx)(_m, {})
		]
	}) });
}
function hm({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, G.jsxs)(Ed, {
		"data-slot": "select-item",
		className: Ip("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, G.jsx)("span", {
			"data-slot": "select-item-indicator",
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, G.jsx)(Ad, { children: /* @__PURE__ */ (0, G.jsx)(em, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, G.jsx)(Od, { children: t })]
	});
}
function gm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Md, {
		"data-slot": "select-scroll-up-button",
		className: Ip("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, G.jsx)(nm, { className: "size-4" })
	});
}
function _m({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(Pd, {
		"data-slot": "select-scroll-down-button",
		className: Ip("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, G.jsx)(tm, { className: "size-4" })
	});
}
//#endregion
//#region components/ui/dropdown-menu.tsx
function vm({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(ru, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function ym({ ...e }) {
	return /* @__PURE__ */ (0, G.jsx)(iu, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function bm({ className: e, sideOffset: t = 4, ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(au, { children: /* @__PURE__ */ (0, G.jsx)(ou, {
		"data-slot": "dropdown-menu-content",
		sideOffset: t,
		className: Ip("z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", e),
		...n
	}) });
}
function xm({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, G.jsx)(cu, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: Ip("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!", e),
		...r
	});
}
function Sm({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, G.jsx)(su, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: Ip("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", e),
		...n
	});
}
function Cm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, G.jsx)(lu, {
		"data-slot": "dropdown-menu-separator",
		className: Ip("-mx-1 my-1 h-px bg-border", e),
		...t
	});
}
//#endregion
//#region ui-system/runtime.tsx
var wm = (e) => e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"), Tm = (e) => {
	let t = document.createElement("template");
	return t.innerHTML = e, t;
}, Em = Tm((0, C.renderToStaticMarkup)(/* @__PURE__ */ (0, G.jsx)(Vp, {}))).content.querySelector("input").className, Dm = Tm((0, C.renderToStaticMarkup)(/* @__PURE__ */ (0, G.jsx)(Hp, {}))).content.querySelector("textarea").className;
function Om(e, t) {
	let n = Tm(e).content.querySelector("button");
	return n ? (0, C.renderToStaticMarkup)(/* @__PURE__ */ (0, G.jsx)(Rp, {
		variant: t ? "default" : "outline",
		className: "crm-button " + (n.className || ""),
		dangerouslySetInnerHTML: { __html: n.innerHTML }
	})).replace("<button ", "<button onclick=\"" + wm(n.getAttribute("onclick") || "") + "\" ") : e;
}
function km(e) {
	let t = Tm(e).content.querySelector("span");
	return t ? (0, C.renderToStaticMarkup)(/* @__PURE__ */ (0, G.jsx)(Bp, {
		variant: "outline",
		className: t.className,
		dangerouslySetInnerHTML: { __html: t.innerHTML }
	})) : e;
}
function Am(e) {
	let t = Tm(e);
	for (let e of t.content.querySelectorAll("input:not([type=checkbox]):not([type=radio]):not([type=hidden]),textarea")) e.classList.add(...(e.tagName === "TEXTAREA" ? Dm : Em).split(" ")), e.setAttribute("data-slot", e.tagName === "TEXTAREA" ? "textarea" : "input");
	return t.innerHTML;
}
var jm = /* @__PURE__ */ new Map(), Mm = /* @__PURE__ */ new Map(), Nm = /* @__PURE__ */ new WeakMap(), Pm = 0, Fm = !1;
function Im(e) {
	return Nm.has(e) || Nm.set(e, ++Pm), Nm.get(e);
}
function Lm(e) {
	return e.getAttribute("aria-label") || (e.labels?.[0])?.childNodes[0]?.textContent?.trim() || e.name || "Pilih opsi";
}
function Rm({ native: e }) {
	let t = Array.from(e.options), n = String(Math.max(0, e.selectedIndex)), r = (0, b.useRef)(null), i = jm.get(e)?.focus;
	return (0, b.useLayoutEffect)(() => (e.focus = (e) => r.current?.focus(e), () => {
		i && (e.focus = i);
	}), [e]), /* @__PURE__ */ (0, G.jsxs)(dm, {
		value: n,
		disabled: e.disabled,
		onValueChange: (t) => {
			let n = Number(t);
			!Number.isInteger(n) || n < 0 || n >= e.options.length || (e.selectedIndex = n, e.dispatchEvent(new Event("input", { bubbles: !0 })), e.dispatchEvent(new Event("change", { bubbles: !0 })), Zm());
		},
		children: [/* @__PURE__ */ (0, G.jsx)(pm, {
			ref: r,
			className: "crm-select-trigger",
			"aria-label": Lm(e),
			"aria-required": e.required || void 0,
			"aria-invalid": e.getAttribute("aria-invalid") === "true" || void 0,
			"aria-describedby": e.getAttribute("aria-describedby") || void 0,
			children: /* @__PURE__ */ (0, G.jsx)(fm, {})
		}), /* @__PURE__ */ (0, G.jsx)(mm, {
			position: "popper",
			sideOffset: 6,
			className: "crm-select-content",
			"data-ui-portal": "true",
			children: t.map((e, t) => /* @__PURE__ */ (0, G.jsx)(hm, {
				value: String(t),
				disabled: e.disabled,
				className: "crm-select-item",
				children: e.textContent || "Pilih…"
			}, t))
		})]
	});
}
function zm(e) {
	return Array.from(e.querySelectorAll("button")).filter((e) => !e.closest("[data-ui-island]") && !e.hidden && e.style.display !== "none");
}
function Bm({ native: e }) {
	let t = e.querySelector("summary")?.textContent?.trim() || "Tindakan lainnya";
	return /* @__PURE__ */ (0, G.jsxs)(vm, {
		modal: !1,
		children: [/* @__PURE__ */ (0, G.jsx)(ym, {
			asChild: !0,
			children: /* @__PURE__ */ (0, G.jsxs)(Rp, {
				variant: "outline",
				className: "crm-menu-trigger",
				children: [t, /* @__PURE__ */ (0, G.jsx)(tm, { size: 16 })]
			})
		}), /* @__PURE__ */ (0, G.jsxs)(bm, {
			align: "end",
			sideOffset: 6,
			className: "crm-menu-content",
			"data-ui-portal": "true",
			children: [
				/* @__PURE__ */ (0, G.jsx)(Sm, { children: t }),
				/* @__PURE__ */ (0, G.jsx)(Cm, {}),
				zm(e).map((e) => /* @__PURE__ */ (0, G.jsx)(xm, {
					disabled: e.disabled,
					className: e.classList.contains("ao-danger-action") ? "crm-menu-danger" : "",
					onSelect: () => e.click(),
					children: e.textContent
				}, Im(e)))
			]
		})]
	});
}
var Vm = document.querySelector("#modal"), Hm = null, Um = null, Wm = "Detail", Gm = null, Km = null;
function qm() {
	if (!Vm) return;
	let e = new Event("cancel", { cancelable: !0 });
	Vm.dispatchEvent(e) && Vm.close();
}
function Jm() {
	let [e, t] = (0, b.useState)(!1), [n, r] = (0, b.useState)("Detail");
	Hm = t, Gm = r;
	let i = (0, b.useRef)(null);
	return (0, b.useLayoutEffect)(() => {
		if (e && i.current && Vm) {
			i.current.append(Vm), Vm.setAttribute("open", ""), Vm.setAttribute("role", "presentation");
			let e = Vm.querySelector("input:not([type=hidden]):not([disabled]),select:not([disabled]),textarea:not([disabled]),.modalhead button");
			queueMicrotask(() => e?.focus());
		}
		return () => {
			Vm && Um && (Um.append(Vm), Vm.removeAttribute("open"));
		};
	}, [e]), /* @__PURE__ */ (0, G.jsx)(am, {
		open: e,
		onOpenChange: (e) => {
			e || qm();
		},
		children: /* @__PURE__ */ (0, G.jsxs)(cm, {
			className: "crm-dialog-content",
			showCloseButton: !1,
			onEscapeKeyDown: (e) => {
				e.preventDefault(), qm();
			},
			onInteractOutside: (e) => {
				e.preventDefault(), qm();
			},
			onCloseAutoFocus: (e) => {
				e.preventDefault(), Km?.isConnected && Km.focus();
			},
			children: [
				/* @__PURE__ */ (0, G.jsx)(lm, {
					className: "sr-only",
					children: n
				}),
				/* @__PURE__ */ (0, G.jsx)(um, {
					className: "sr-only",
					children: "Formulir CRM BPD Bali. Field wajib dan pesan kesalahan ditampilkan pada formulir."
				}),
				/* @__PURE__ */ (0, G.jsx)("div", {
					ref: i,
					className: "crm-dialog-holder"
				})
			]
		})
	});
}
function Ym() {
	if (!Vm) return;
	Um = document.createElement("div"), Um.dataset.uiDialogParking = "true", document.body.append(Um), Um.append(Vm);
	let e = document.createElement("div");
	e.dataset.uiIsland = "dialog", document.body.append(e);
	let t = (0, S.createRoot)(e);
	(0, x.flushSync)(() => t.render(/* @__PURE__ */ (0, G.jsx)(Jm, {}))), Vm.showModal = () => {
		Km = document.activeElement instanceof HTMLElement ? document.activeElement : null, Wm = Vm.querySelector("h2")?.textContent || "Detail", Gm?.(Wm), Vm.setAttribute("open", ""), (0, x.flushSync)(() => Hm?.(!0)), Zm();
	}, Vm.close = (e) => {
		Vm.returnValue = e || "", Vm.removeAttribute("open"), (0, x.flushSync)(() => Hm?.(!1)), Vm.dispatchEvent(new Event("close"));
	}, new MutationObserver(() => {
		let e = Vm.querySelector("h2")?.textContent || "Detail";
		e !== Wm && (Wm = e, Gm?.(e));
	}).observe(Vm, {
		childList: !0,
		subtree: !0
	});
}
function Xm() {
	Fm = !1;
	for (let [e, t] of jm) (!e.isConnected || !t.host.isConnected) && (t.root.unmount(), e.focus = t.focus, jm.delete(e));
	for (let [e, t] of Mm) (!e.isConnected || !t.host.isConnected) && (t.root.unmount(), Mm.delete(e));
	for (let e of document.querySelectorAll("#app select,#form select")) {
		if (e.multiple || e.size > 1 || e.closest("[data-ui-island]")) continue;
		let t = jm.get(e);
		if (!t) {
			let n = document.createElement("span");
			n.dataset.uiIsland = "select", n.className = "crm-select-host", e.after(n), t = {
				host: n,
				root: (0, S.createRoot)(n),
				key: "",
				focus: e.focus
			}, jm.set(e, t), e.classList.add("crm-native-select"), e.setAttribute("aria-hidden", "true"), e.tabIndex = -1;
		}
		let n = JSON.stringify([
			e.selectedIndex,
			e.disabled,
			e.required,
			e.getAttribute("aria-invalid"),
			e.getAttribute("aria-describedby"),
			Lm(e),
			Array.from(e.options).map((e) => [
				e.textContent,
				e.value,
				e.disabled
			])
		]);
		n !== t.key && (t.key = n, t.root.render(/* @__PURE__ */ (0, G.jsx)(Rm, { native: e })));
	}
	for (let e of document.querySelectorAll(".ao-more-actions,.mobile-header-options")) {
		let t = Mm.get(e);
		if (!t) {
			let n = document.createElement("span");
			n.dataset.uiIsland = "menu", n.className = "crm-menu-host", e.before(n), t = {
				host: n,
				root: (0, S.createRoot)(n),
				key: ""
			}, Mm.set(e, t), e.classList.add("crm-legacy-menu");
		}
		let n = JSON.stringify([e.querySelector("summary")?.textContent, zm(e).map((e) => [
			Im(e),
			e.textContent,
			e.disabled
		])]);
		n !== t.key && (t.key = n, t.root.render(/* @__PURE__ */ (0, G.jsx)(Bm, { native: e })));
	}
	for (let e of document.querySelectorAll("#app button,#form button,main>header button")) e.closest("[data-ui-island],[data-ui-portal]") || e.hasAttribute("data-slot") || e.classList.add("crm-control");
	for (let e of document.querySelectorAll("#app input:not([type=hidden]):not([type=checkbox]):not([type=radio]),#form input:not([type=hidden]):not([type=checkbox]):not([type=radio]),#form textarea")) e.classList.add("crm-field");
	for (let [e, t] of [["Target & Kinerja", $p], ["Kesiapan POC", rm]]) {
		let n = Array.from(document.querySelectorAll("body[data-mode=cms] #nav button")).find((t) => t.textContent?.trim() === e);
		n && !n.querySelector("svg") && (n.insertAdjacentHTML("afterbegin", (0, C.renderToStaticMarkup)(/* @__PURE__ */ (0, G.jsx)(t, {
			width: 18,
			height: 18,
			"aria-hidden": "true"
		}))), n.classList.add("crm-nav-with-icon"));
	}
}
function Zm() {
	Fm || (Fm = !0, queueMicrotask(Xm));
}
window.BPDDesignRuntime = {
	buttonMarkup: Om,
	badgeMarkup: km,
	fieldMarkup: Am,
	refresh: Zm,
	version: "20261124-shadcn-1"
}, Ym(), new MutationObserver((e) => {
	e.some((e) => !(e.target instanceof Element) || !e.target.closest("[data-ui-island],[data-ui-portal]")) && Zm();
}).observe(document.body, {
	childList: !0,
	subtree: !0,
	attributes: !0,
	attributeFilter: [
		"disabled",
		"required",
		"selected",
		"aria-invalid",
		"aria-describedby",
		"aria-label"
	]
}), document.addEventListener("change", Zm, !0), document.addEventListener("input", Zm, !0), window.dispatchEvent(new CustomEvent("bpd-design-ready")), Zm();
//#endregion
