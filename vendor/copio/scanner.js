/* Vendored <copio-scanner> Web Component bundle. Delete vendor/copio/ when importing copio from npm/CDN. */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// js/adapters/storage/storage-port.js
var StoragePort = class {
  /**
   * Initializes the storage backend, opening connections and verifying availability.
   * @returns {Promise<StorageInitResult>}
   */
  async init() {
    throw new Error("StoragePort.init() must be implemented by adapter");
  }
  /**
   * Returns all stored documents.
   * @returns {Promise<DocRow[]>}
   */
  async listDocs() {
    throw new Error("StoragePort.listDocs() must be implemented by adapter");
  }
  /**
   * Retrieves a document by its ID.
   * @param {string} _id
   * @returns {Promise<DocRow|null>}
   */
  async getDoc(_id) {
    throw new Error("StoragePort.getDoc() must be implemented by adapter");
  }
  /**
   * Saves or updates a document.
   * @param {string} _id
   * @param {DocRow} _doc
   * @returns {Promise<void>}
   */
  async saveDoc(_id, _doc) {
    throw new Error("StoragePort.saveDoc() must be implemented by adapter");
  }
  /**
   * Deletes a document and its associated pages.
   * @param {string} _id
   * @returns {Promise<void>}
   */
  async deleteDoc(_id) {
    throw new Error("StoragePort.deleteDoc() must be implemented by adapter");
  }
  /**
   * Saves page binary/data for a specific document.
   * @param {string} _docId
   * @param {string} _pageId
   * @param {any} _blobOrData
   * @returns {Promise<void>}
   */
  async savePage(_docId, _pageId, _blobOrData) {
    throw new Error("StoragePort.savePage() must be implemented by adapter");
  }
  /**
   * Retrieves page binary/data.
   * @param {string} _docId
   * @param {string} _pageId
   * @returns {Promise<any>}
   */
  async getPage(_docId, _pageId) {
    throw new Error("StoragePort.getPage() must be implemented by adapter");
  }
  /**
   * Deletes page binary/data.
   * @param {string} _docId
   * @param {string} _pageId
   * @returns {Promise<void>}
   */
  async deletePage(_docId, _pageId) {
    throw new Error("StoragePort.deletePage() must be implemented by adapter");
  }
  /**
   * Subscribes to storage changes (document modifications, additions, deletions).
   * @param {() => void} _cb
   * @returns {() => void} Unsubscribe function
   */
  subscribe(_cb) {
    return () => {
    };
  }
};

// js/adapters/storage/memory-adapter.js
var _docs, _pages, _subscribers, _MemoryStorageAdapter_instances, notify_fn;
var MemoryStorageAdapter = class extends StoragePort {
  constructor() {
    super();
    __privateAdd(this, _MemoryStorageAdapter_instances);
    /** @type {Map<string, { id: string, name: string, pages: any[] }>} */
    __privateAdd(this, _docs, /* @__PURE__ */ new Map());
    /** @type {Map<string, any>} key: `${docId}/${pageId}` */
    __privateAdd(this, _pages, /* @__PURE__ */ new Map());
    /** @type {Set<() => void>} */
    __privateAdd(this, _subscribers, /* @__PURE__ */ new Set());
  }
  /**
   * @returns {Promise<{ kind: string, persistent: boolean }>}
   */
  async init() {
    return {
      kind: "memory",
      persistent: false
    };
  }
  /**
   * Returns list of all stored documents synchronously.
   * @returns {Array<{ id: string, name: string, pages: any[] }>}
   */
  listDocsSync() {
    return Array.from(__privateGet(this, _docs).values()).map((doc) => ({
      id: doc.id,
      name: doc.name,
      pages: Array.isArray(doc.pages) ? [...doc.pages] : []
    }));
  }
  /**
   * Returns list of all stored documents.
   * @returns {Promise<Array<{ id: string, name: string, pages: any[] }>>}
   */
  async listDocs() {
    return this.listDocsSync();
  }
  /**
   * Retrieves a document by its ID synchronously.
   * @param {string} id
   * @returns {{ id: string, name: string, pages: any[] } | null}
   */
  getDocSync(id) {
    const doc = __privateGet(this, _docs).get(id);
    if (!doc) return null;
    return {
      id: doc.id,
      name: doc.name,
      pages: Array.isArray(doc.pages) ? [...doc.pages] : []
    };
  }
  /**
   * Retrieves a document by its ID.
   * @param {string} id
   * @returns {Promise<{ id: string, name: string, pages: any[] } | null>}
   */
  async getDoc(id) {
    return this.getDocSync(id);
  }
  /**
   * Saves or updates a document.
   * @param {string} id
   * @param {import('./storage-port.js').DocRow} doc
   * @returns {Promise<void>}
   */
  async saveDoc(id, doc) {
    if (!id) throw new Error("Cannot save document without an ID");
    let pages = [];
    if (Array.isArray(doc.pages)) {
      pages = [...doc.pages];
    } else if (typeof doc.pages === "string") {
      try {
        pages = JSON.parse(doc.pages);
      } catch {
        pages = [];
      }
    }
    __privateGet(this, _docs).set(id, {
      id,
      name: doc.name || "",
      pages
    });
    __privateMethod(this, _MemoryStorageAdapter_instances, notify_fn).call(this);
  }
  /**
   * Deletes a document and its pages.
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteDoc(id) {
    __privateGet(this, _docs).delete(id);
    const prefix = `${id}/`;
    for (const key of __privateGet(this, _pages).keys()) {
      if (key.startsWith(prefix)) {
        __privateGet(this, _pages).delete(key);
      }
    }
    __privateMethod(this, _MemoryStorageAdapter_instances, notify_fn).call(this);
  }
  /**
   * Saves page data for a document.
   * @param {string} docId
   * @param {string} pageId
   * @param {any} blobOrData
   * @returns {Promise<void>}
   */
  async savePage(docId, pageId, blobOrData) {
    __privateGet(this, _pages).set(`${docId}/${pageId}`, blobOrData);
    const doc = __privateGet(this, _docs).get(docId);
    if (doc) {
      const idx = doc.pages.findIndex((p3) => p3.id === pageId);
      if (idx >= 0) {
        if (typeof blobOrData === "object" && blobOrData !== null && !(blobOrData instanceof Blob)) {
          doc.pages[idx] = { ...doc.pages[idx], ...blobOrData };
        } else {
          doc.pages[idx] = { ...doc.pages[idx], src: blobOrData };
        }
      } else {
        const pageObj = typeof blobOrData === "object" && blobOrData !== null && !(blobOrData instanceof Blob) ? { id: pageId, ...blobOrData } : { id: pageId, src: blobOrData };
        doc.pages.push(pageObj);
      }
    }
    __privateMethod(this, _MemoryStorageAdapter_instances, notify_fn).call(this);
  }
  /**
   * Retrieves page data.
   * @param {string} docId
   * @param {string} pageId
   * @returns {Promise<any>}
   */
  async getPage(docId, pageId) {
    if (__privateGet(this, _pages).has(`${docId}/${pageId}`)) {
      return __privateGet(this, _pages).get(`${docId}/${pageId}`);
    }
    const doc = __privateGet(this, _docs).get(docId);
    if (doc) {
      const page = doc.pages.find((p3) => p3.id === pageId);
      if (page) return page.src ?? page;
    }
    return null;
  }
  /**
   * Deletes page data.
   * @param {string} docId
   * @param {string} pageId
   * @returns {Promise<void>}
   */
  async deletePage(docId, pageId) {
    __privateGet(this, _pages).delete(`${docId}/${pageId}`);
    const doc = __privateGet(this, _docs).get(docId);
    if (doc) {
      doc.pages = doc.pages.filter((p3) => p3.id !== pageId);
    }
    __privateMethod(this, _MemoryStorageAdapter_instances, notify_fn).call(this);
  }
  /**
   * Subscribes to document changes.
   * @param {() => void} cb
   * @returns {() => void}
   */
  subscribe(cb) {
    __privateGet(this, _subscribers).add(cb);
    return () => {
      __privateGet(this, _subscribers).delete(cb);
    };
  }
  /**
   * Clears all in-memory data (useful for test isolation).
   */
  clear() {
    __privateGet(this, _docs).clear();
    __privateGet(this, _pages).clear();
    __privateMethod(this, _MemoryStorageAdapter_instances, notify_fn).call(this);
  }
};
_docs = new WeakMap();
_pages = new WeakMap();
_subscribers = new WeakMap();
_MemoryStorageAdapter_instances = new WeakSet();
notify_fn = function() {
  for (const subscriber of __privateGet(this, _subscribers)) {
    try {
      subscriber();
    } catch (err) {
      console.error("Error in MemoryStorageAdapter subscriber:", err);
    }
  }
};

// js/lib/tinybase.6.5.2.js
var e = (e3) => typeof e3;
var t = "";
var s = e(t);
var n = e(true);
var l = e(0);
var o = e(e);
var a = "type";
var r = "default";
var i = "Listener";
var d = "Result";
var c = "add";
var u = "Has";
var g = "Ids";
var h = "Table";
var f = h + "s";
var I = h + g;
var b = "Row";
var w = b + "Count";
var L = b + g;
var C = "Sorted" + b + g;
var R = "Cell";
var T = R + g;
var v = "Value";
var p = v + "s";
var S = v + g;
var y = (e3) => t + e3;
var M = (e3, s3 = t, n3) => e3.split(s3, n3);
var E = globalThis;
var k = Math;
var D = k.max;
var x = k.min;
var H = k.floor;
var J = isFinite;
var F = (e3) => null == e3;
var Q = (e3, t3, s3) => F(e3) ? s3?.() : t3(e3);
var z = (e3) => e3 == s || e3 == n;
var N = (t3) => e(t3) == s;
var O = (t3) => e(t3) == o;
var W = (e3) => Array.isArray(e3);
var A = (e3, t3, s3) => e3.slice(t3, s3);
var P = (e3) => e3.length;
var j = () => {
};
var B = async (e3, t3, s3) => {
  try {
    return await e3();
  } catch (e4) {
    t3?.(e4);
  }
};
var U = (e3, t3) => e3.includes(t3);
var q = (e3, t3) => e3.every(t3);
var G = (e3, t3) => P(e3) === P(t3) && q(e3, ((e4, s3) => t3[s3] === e4));
var K = (e3, t3) => q(e3, ((s3, n3) => 0 == n3 || t3(e3[n3 - 1], s3) <= 0));
var X = (e3, t3) => e3.sort(t3);
var Y = (e3, t3) => e3.forEach(t3);
var Z = (e3, t3) => e3.map(t3);
var $ = (e3) => te(e3, ((e4, t3) => e4 + t3), 0);
var ee = (e3) => 0 == P(e3);
var te = (e3, t3, s3) => e3.reduce(t3, s3);
var se = (e3, ...t3) => e3.push(...t3);
var ne = (e3) => e3.pop();
var le = (e3) => e3.shift();
var oe = (t3) => {
  const s3 = e(t3);
  return z(s3) || s3 == l && J(t3) ? s3 : void 0;
};
var re = (e3, t3, s3, n3, l3) => F(l3) ? e3.delCell(t3, s3, n3, true) : e3.setCell(t3, s3, n3, l3);
var ie = (e3, t3, s3) => F(s3) ? e3.delValue(t3) : e3.setValue(t3, s3);
var de = (e3) => (t3) => te(be(t3), ((t4, s3) => t4 + e3(s3)), 0);
var ce = (e3) => e3?.size ?? 0;
var ue = de(ce);
var ge = de(ue);
var he = de(ge);
var fe = (e3, t3) => e3?.has(t3) ?? false;
var Ie = (e3) => F(e3) || 0 == ce(e3);
var be = (e3) => [...e3?.values() ?? []];
var we = (e3) => e3.clear();
var Le = (e3, t3) => e3?.forEach(t3);
var Ce = (e3, t3) => e3?.delete(t3);
var Re = Object;
var Te = (e3) => Re.getPrototypeOf(e3);
var ve = Re.isFrozen;
var pe = Re.entries;
var Se = (e3) => !F(e3) && Q(Te(e3), ((e4) => e4 == Re.prototype || F(Te(e4))), (() => true));
var ye = Re.keys;
var Ve = Re.freeze;
var me = (e3 = []) => Re.fromEntries(e3);
var Me = (e3, t3) => t3 in e3;
var Ee = (e3, t3) => (delete e3[t3], e3);
var ke = (e3, t3) => Y(pe(e3), (([e4, s3]) => t3(s3, e4)));
var De = (e3, t3) => me(((e4, t4) => Z(pe(e4), (([e5, s3]) => t4(s3, e5))))(e3, ((e4, s3) => [s3, t3(e4, s3)])));
var xe = (e3) => Se(e3) && 0 == ((e4) => P(ye(e4)))(e3);
var Je = (e3, t3, s3, n3 = 0) => F(e3) || !Se(e3) || !n3 && xe(e3) || ve(e3) ? (s3?.(), false) : (ke(e3, ((s4, n4) => {
  t3(s4, n4) || Ee(e3, n4);
})), !!n3 || !xe(e3));
var Fe = (e3) => new Map(e3);
var Qe = (e3) => [...e3?.keys() ?? []];
var ze = (e3, t3) => e3?.get(t3);
var Ne = (e3, t3) => Le(e3, ((e4, s3) => t3(s3, e4)));
var Oe = (e3, t3, s3) => F(s3) ? (Ce(e3, t3), e3) : e3?.set(t3, s3);
var We = (e3, t3, s3, n3) => (fe(e3, t3) ? n3?.(ze(e3, t3)) : Oe(e3, t3, s3()), ze(e3, t3));
var Ae = (e3, t3, s3, n3 = Oe) => (De(t3, ((t4, n4) => s3(e3, n4, t4))), Ne(e3, ((s4) => Me(t3, s4) ? 0 : n3(e3, s4))), e3);
var Pe = (e3, t3, s3, n3) => {
  const l3 = {};
  return Le(e3, ((e4, o3) => {
    if (!s3?.(e4, o3)) {
      const s4 = t3 ? t3(e4, o3) : e4;
      n3?.(s4) || (l3[o3] = s4);
    }
  })), l3;
};
var je = (e3, t3, s3) => Pe(e3, ((e4) => Pe(e4, t3, s3)), Ie, xe);
var _e = (e3, t3, s3) => Pe(e3, ((e4) => je(e4, t3, s3)), Ie, xe);
var Be = (e3, t3) => {
  const s3 = Fe();
  return Le(e3, ((e4, n3) => s3.set(n3, t3?.(e4) ?? e4))), s3;
};
var Ue = (e3) => Be(e3, Be);
var qe = (e3) => Be(e3, Ue);
var Ge = (e3, t3, s3, n3, l3 = 0) => Q((s3 ? We : ze)(e3, t3[l3], l3 > P(t3) - 2 ? s3 : Fe), ((o3) => {
  if (l3 > P(t3) - 2) return n3?.(o3) && Oe(e3, t3[l3]), o3;
  const a3 = Ge(o3, t3, s3, n3, l3 + 1);
  return Ie(o3) && Oe(e3, t3[l3]), a3;
}));
var Ke = (e3) => new Set(W(e3) || F(e3) ? e3 : [e3]);
var Xe = (e3, t3) => e3?.add(t3);
var Ye = (e3, t3, s3, n3, l3) => {
  const o3 = e3.hasRow, a3 = Fe(), r3 = Fe(), i3 = Fe(), d3 = Fe(), c3 = Fe(), u3 = Fe(), g3 = (t4, s4, ...n4) => {
    const l4 = We(u3, t4, Ke);
    return Y(n4, ((t5) => Xe(l4, t5) && s4 && e3.callListener(t5))), n4;
  }, h3 = (t4, ...s4) => Q(ze(u3, t4), ((n4) => {
    Y(ee(s4) ? be(n4) : s4, ((t5) => {
      e3.delListener(t5), Ce(n4, t5);
    })), Ie(n4) && Oe(u3, t4);
  })), f4 = (e4, s4) => {
    Oe(a3, e4, s4), fe(r3, e4) || (Oe(r3, e4, t3()), Oe(d3, e4, Fe()), Oe(c3, e4, Fe()), l3(i3));
  }, I4 = (e4) => {
    Oe(a3, e4), Oe(r3, e4), Oe(d3, e4), Oe(c3, e4), h3(e4), l3(i3);
  };
  return [() => e3, () => Qe(a3), (e4) => Ne(r3, e4), (e4) => fe(r3, e4), (e4) => ze(a3, e4), (e4) => ze(r3, e4), (e4, t4) => Oe(r3, e4, t4), f4, (t4, n4, l4, a4, r4) => {
    f4(t4, n4);
    const i4 = Fe(), u4 = Fe(), I5 = ze(d3, t4), b4 = ze(c3, t4), w3 = (t5) => {
      const l5 = (s4) => e3.getCell(n4, t5, s4), d4 = ze(I5, t5), c4 = o3(n4, t5) ? s3(a4(l5, t5)) : void 0;
      if (d4 === c4 || W(d4) && W(c4) && G(d4, c4) || Oe(i4, t5, [d4, c4]), !F(r4)) {
        const e4 = ze(b4, t5), s4 = o3(n4, t5) ? r4(l5, t5) : void 0;
        e4 != s4 && Oe(u4, t5, s4);
      }
    }, L4 = (e4) => {
      l4((() => {
        Le(i4, (([, e5], t5) => Oe(I5, t5, e5))), Le(u4, ((e5, t5) => Oe(b4, t5, e5)));
      }), i4, u4, I5, b4, e4), we(i4), we(u4);
    };
    Ne(I5, w3), e3.hasTable(n4) && Y(e3.getRowIds(n4), ((e4) => {
      fe(I5, e4) || w3(e4);
    })), L4(true), h3(t4), g3(t4, 0, e3.addRowListener(n4, null, ((e4, t5, s4) => w3(s4))), e3.addTableListener(n4, (() => L4())));
  }, I4, (e4) => n3(e4, i3), () => Ne(u3, I4), g3, h3];
};
var Ze = (e3, s3) => N(e3) ? (t3) => t3(e3) : e3 ?? (() => s3 ?? t);
var $e = (e3, t3) => {
  const s3 = /* @__PURE__ */ new WeakMap();
  return (n3) => {
    s3.has(n3) || s3.set(n3, e3(n3));
    const l3 = s3.get(n3);
    return t3?.(l3), l3;
  };
};
var et = /^\d+$/;
var tt = () => {
  const e3 = [];
  let s3 = 0;
  return [(n3) => (n3 ? le(e3) : null) ?? t + s3++, (t3) => {
    et.test(t3) && P(e3) < 1e3 && se(e3, t3);
  }];
};
var st = (e3) => {
  let s3;
  const [n3, l3] = tt(), o3 = Fe();
  return [(l4, a3, r3, i3 = [], d3 = () => []) => {
    s3 ?? (s3 = e3());
    const c3 = n3(1);
    return Oe(o3, c3, [l4, a3, r3, i3, d3]), Xe(Ge(a3, r3 ?? [t], Ke), c3), c3;
  }, (e4, n4, ...l4) => Y(((e5, s4 = [t]) => {
    const n5 = [], l5 = (e6, t3) => t3 == P(s4) ? se(n5, e6) : null === s4[t3] ? Le(e6, ((e7) => l5(e7, t3 + 1))) : Y([s4[t3], null], ((s5) => l5(ze(e6, s5), t3 + 1)));
    return l5(e5, 0), n5;
  })(e4, n4), ((e5) => Le(e5, ((e6) => ze(o3, e6)[0](s3, ...n4 ?? [], ...l4))))), (e4) => Q(ze(o3, e4), (([, s4, n4]) => (Ge(s4, n4 ?? [t], void 0, ((t3) => (Ce(t3, e4), Ie(t3) ? 1 : 0))), Oe(o3, e4), l3(e4), n4))), (e4) => Q(ze(o3, e4), (([e5, , t3 = [], n4, l4]) => {
    const o4 = (...a3) => {
      const r3 = P(a3);
      r3 == P(t3) ? e5(s3, ...a3, ...l4(a3)) : F(t3[r3]) ? Y(n4[r3]?.(...a3) ?? [], ((e6) => o4(...a3, e6))) : o4(...a3, t3[r3]);
    };
    o4();
  }))];
};
var nt = $e(((e3) => {
  let s3, n3, l3, o3 = 100, a3 = Fe(), r3 = Fe(), i3 = 1;
  const d3 = Fe(), c3 = Fe(), [u3, g3, h3] = st((() => H3)), f4 = Fe(), I4 = Fe(), b4 = [], w3 = [], L4 = (t3, s4) => {
    i3 = 0, e3.transaction((() => {
      const [n4, l4] = ze(f4, s4);
      Le(n4, ((s5, n5) => Le(s5, ((s6, l5) => Le(s6, ((s7, o4) => re(e3, n5, l5, o4, s7[t3]))))))), Le(l4, ((s5, n5) => ie(e3, n5, s5[t3])));
    })), i3 = 1;
  }, C4 = (e4) => {
    Oe(f4, e4), Oe(I4, e4), g3(c3, [e4]);
  }, R4 = (e4, t3) => Y(((e5, t4) => e5.splice(0, t4))(e4, t3 ?? P(e4)), C4), T3 = () => R4(b4, P(b4) - o3), v4 = () => Q(s3, (() => {
    se(b4, s3), T3(), R4(w3), s3 = void 0, l3 = 1;
  })), p3 = () => {
    s3 = ne(b4), l3 = 1;
  };
  let S3, y3;
  const V3 = (e4 = t) => (F(s3) && (s3 = t + n3++, Oe(f4, s3, [a3, r3]), D3(s3, e4), a3 = Fe(), r3 = Fe(), l3 = 1), s3), m3 = () => {
    ee(b4) || (((e4, ...t3) => {
      e4.unshift(...t3);
    })(w3, V3()), L4(0, s3), s3 = ne(b4), l3 = 1);
  }, M3 = () => {
    ee(w3) || (se(b4, s3), s3 = le(w3), L4(1, s3), l3 = 1);
  }, E3 = () => {
    l3 && (g3(d3), l3 = 0);
  }, k4 = (e4) => {
    const t3 = V3(e4);
    return E3(), t3;
  }, D3 = (e4, t3) => (x4(e4) && ze(I4, e4) !== t3 && (Oe(I4, e4, t3), g3(c3, [e4])), H3), x4 = (e4) => fe(f4, e4), H3 = { setSize: (e4) => (o3 = e4, T3(), H3), addCheckpoint: k4, setCheckpoint: D3, getStore: () => e3, getCheckpointIds: () => [[...b4], s3, [...w3]], forEachCheckpoint: (e4) => Ne(I4, e4), hasCheckpoint: x4, getCheckpoint: (e4) => ze(I4, e4), goBackward: () => (m3(), E3(), H3), goForward: () => (M3(), E3(), H3), goTo: (e4) => {
    const t3 = U(b4, e4) ? m3 : U(w3, e4) ? M3 : null;
    for (; !F(t3) && e4 != s3; ) t3();
    return E3(), H3;
  }, addCheckpointIdsListener: (e4) => u3(e4, d3), addCheckpointListener: (e4, t3) => u3(t3, c3, [e4]), delListener: (e4) => (h3(e4), H3), clear: () => (R4(b4), R4(w3), F(s3) || C4(s3), s3 = void 0, n3 = 0, k4(), H3), clearForward: () => (ee(w3) || (R4(w3), g3(d3)), H3), destroy: () => {
    e3.delListener(S3), e3.delListener(y3);
  }, getListenerStats: () => ({ checkpointIds: ue(d3), checkpoint: ue(c3) }), _registerListeners: () => {
    S3 = e3.addCellListener(null, null, null, ((e4, t3, s4, n4, l4, o4) => {
      if (i3) {
        v4();
        const e5 = We(a3, t3, Fe), r4 = We(e5, s4, Fe), i4 = We(r4, n4, (() => [o4, void 0]));
        i4[1] = l4, i4[0] === l4 && Ie(Oe(r4, n4)) && Ie(Oe(e5, s4)) && Ie(Oe(a3, t3)) && p3(), E3();
      }
    })), y3 = e3.addValueListener(null, ((e4, t3, s4, n4) => {
      if (i3) {
        v4();
        const e5 = We(r3, t3, (() => [n4, void 0]));
        e5[1] = s4, e5[0] === s4 && Ie(Oe(r3, t3)) && p3(), E3();
      }
    }));
  } };
  return Ve(H3.clear());
}), ((e3) => e3._registerListeners()));
var lt = M("-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz");
var ot = Fe(Z(lt, ((e3, t3) => [e3, t3])));
var it = E.crypto ? (e3) => E.crypto.getRandomValues(e3) : (e3) => Z(e3, (() => H(256 * k.random())));
var ct = JSON.stringify;
var ut = JSON.parse;
var gt = (e3) => ct(e3, ((e4, t3) => {
  return s3 = Map, t3 instanceof s3 ? Re.fromEntries([...t3]) : t3;
  var s3;
}));
var ht = new E.TextEncoder();
var Vt = 2 ** 36;
var mt = 2 ** 30;
var Mt = 2 ** 24;
var Et = 2 ** 18;
var Ht = (e3, t3) => (e3 ?? 0) < (t3 ?? 0) ? -1 : 1;
var Jt = $e(((e3) => {
  const s3 = Fe(), n3 = Fe(), [l3, o3, a3] = st((() => C4)), [r3, i3, d3, c3, u3, g3, h3, , f4, I4, b4, w3] = Ye(e3, Fe, ((e4) => F(e4) ? t : W(e4) ? Z(e4, y) : y(e4)), l3, o3), L4 = (t3, s4, n4) => {
    const l4 = u3(t3);
    Le(n4, ((t4, n5) => s4(n5, ((s5) => Le(t4, ((t5) => s5(t5, ((s6) => e3.forEachCell(l4, t5, s6)))))))));
  }, C4 = { setIndexDefinition: (e4, t3, l4, a4, r4, i4 = Ht) => {
    const d4 = F(r4) ? void 0 : ([e5], [t4]) => r4(e5, t4);
    return f4(e4, t3, ((t4, l5, r5, c4, u4, f5) => {
      let I5 = 0;
      const b5 = Ke(), w4 = Ke(), L5 = g3(e4);
      if (Le(l5, (([e5, t5], s4) => {
        const n4 = Ke(e5), l6 = Ke(t5);
        Le(n4, ((e6) => Ce(l6, e6) ? Ce(n4, e6) : 0)), Le(n4, ((e6) => {
          Xe(b5, e6), Q(ze(L5, e6), ((t6) => {
            Ce(t6, s4), Ie(t6) && (Oe(L5, e6), I5 = 1);
          }));
        })), Le(l6, ((e6) => {
          Xe(b5, e6), fe(L5, e6) || (Oe(L5, e6, Ke()), I5 = 1), Xe(ze(L5, e6), s4), F(a4) || Xe(w4, e6);
        }));
      })), t4(), Ie(u4) || (f5 ? Ne(L5, ((e5) => Xe(w4, e5))) : Ne(r5, ((e5) => Q(ze(c4, e5), ((e6) => Y(W(e6) ? e6 : [e6], ((e7) => Xe(w4, e7))))))), Le(w4, ((e5) => {
        const t5 = (t6, s5) => i4(ze(u4, t6), ze(u4, s5), e5), s4 = [...ze(L5, e5)];
        K(s4, t5) || (Oe(L5, e5, Ke(X(s4, t5))), Xe(b5, e5));
      }))), (I5 || f5) && !F(d4)) {
        const t5 = [...L5];
        K(t5, d4) || (h3(e4, Fe(X(t5, d4))), I5 = 1);
      }
      I5 && o3(s3, [e4]), Le(b5, ((t5) => o3(n3, [e4, t5])));
    }), Ze(l4), Q(a4, Ze)), C4;
  }, delIndexDefinition: (e4) => (I4(e4), C4), getStore: r3, getIndexIds: i3, forEachIndex: (e4) => d3(((t3, s4) => e4(t3, ((e5) => L4(t3, e5, s4))))), forEachSlice: (e4, t3) => L4(e4, t3, g3(e4)), hasIndex: c3, hasSlice: (e4, t3) => fe(g3(e4), t3), getTableId: u3, getSliceIds: (e4) => Qe(g3(e4)), getSliceRowIds: (e4, t3) => be(ze(g3(e4), t3)), addIndexIdsListener: b4, addSliceIdsListener: (e4, t3) => l3(t3, s3, [e4]), addSliceRowIdsListener: (e4, t3, s4) => l3(s4, n3, [e4, t3]), delListener: (e4) => (a3(e4), C4), destroy: w3, getListenerStats: () => ({ sliceIds: ue(s3), sliceRowIds: ge(n3) }) };
  return Ve(C4);
}));
var Gt = (e3) => [e3, e3];
var Kt = (e3, t3 = ue) => t3(e3[0]) + t3(e3[1]);
var Xt = () => [Fe(), Fe()];
var Yt = (e3) => [...e3];
var Zt = ([e3, t3]) => e3 === t3;
var $t = (e3, t3, s3) => Oe(e3, t3, ze(e3, t3) == -s3 ? void 0 : s3);
var es = () => {
  let e3, t3, s3 = false, n3 = false, o3 = 0, d3 = [];
  const g3 = Fe(), C4 = Fe(), V3 = Fe(), m3 = Fe(), M3 = Fe(), E3 = Fe(), k4 = Fe(), D3 = Fe(), x4 = Fe(), H3 = Fe(), J4 = Fe(), N4 = Fe(), P3 = Fe(), j4 = Fe(), _3 = Ke(), q4 = Fe(), K4 = Fe(), $4 = Fe(), ee3 = Fe(), te3 = Xt(), ne3 = Xt(), le3 = Xt(), ae2 = Xt(), de3 = Xt(), be3 = Xt(), Re3 = Xt(), Te3 = Xt(), ve3 = Xt(), pe3 = Xt(), ye3 = Xt(), me3 = Xt(), ke3 = Xt(), He2 = Xt(), Ge3 = Xt(), Ye3 = Xt(), Ze2 = Xt(), $e3 = Xt(), et3 = Xt(), nt3 = Xt(), lt2 = Xt(), ot3 = Xt(), at2 = Fe(), rt2 = Xt(), [it3, dt, ct3, ht3] = st((() => Ps)), ft = (e4) => {
    if (!Je(e4, ((e5, t5) => U([a, r], t5)))) return false;
    const t4 = e4[a];
    return !(!z(t4) && t4 != l) && (oe(e4[r]) != t4 && Ee(e4, r), true);
  }, It2 = W, bt = (t4, s4) => (!e3 || fe(J4, s4) || Ut2(s4)) && Je(t4, ((e4, t5) => wt(s4, t5, e4)), (() => Ut2(s4))), wt = (e4, t4, s4, n4) => Je(n4 ? s4 : Tt(s4, e4, t4), ((n5, l3) => Q(Lt(e4, t4, l3, n5), ((e5) => (s4[l3] = e5, true)), (() => false))), (() => Ut2(e4, t4))), Lt = (t4, s4, n4, l3) => e3 ? Q(ze(ze(J4, t4), n4), ((e4) => oe(l3) != e4[a] ? Ut2(t4, s4, n4, l3, e4[r]) : l3), (() => Ut2(t4, s4, n4, l3))) : F(oe(l3)) ? Ut2(t4, s4, n4, l3) : l3, Ct2 = (e4, t4) => Je(t4 ? e4 : vt2(e4), ((t5, s4) => Q(Rt2(s4, t5), ((t6) => (e4[s4] = t6, true)), (() => false))), (() => qt2())), Rt2 = (e4, s4) => t3 ? Q(ze(P3, e4), ((t4) => oe(s4) != t4[a] ? qt2(e4, s4, t4[r]) : s4), (() => qt2(e4, s4))) : F(oe(s4)) ? qt2(e4, s4) : s4, Tt = (e4, t4, s4) => (Q(ze(N4, t4), (([n4, l3]) => {
    Le(n4, ((t5, s5) => {
      Me(e4, s5) || (e4[s5] = t5);
    })), Le(l3, ((n5) => {
      Me(e4, n5) || Ut2(t4, s4, n5);
    }));
  })), e4), vt2 = (e4) => (t3 && (Le(j4, ((t4, s4) => {
    Me(e4, s4) || (e4[s4] = t4);
  })), Le(_3, ((t4) => {
    Me(e4, t4) || qt2(t4);
  }))), e4), pt2 = (e4) => Ae(J4, e4, ((e5, t4, s4) => {
    const n4 = Fe(), l3 = Ke();
    Ae(We(J4, t4, Fe), s4, ((e6, t5, s5) => {
      Oe(e6, t5, s5), Q(s5[r], ((e7) => Oe(n4, t5, e7)), (() => Xe(l3, t5)));
    })), Oe(N4, t4, [n4, l3]);
  }), ((e5, t4) => {
    Oe(J4, t4), Oe(N4, t4);
  })), St = (e4) => Ae(P3, e4, ((e5, t4, s4) => {
    Oe(P3, t4, s4), Q(s4[r], ((e6) => Oe(j4, t4, e6)), (() => Xe(_3, t4)));
  }), ((e5, t4) => {
    Oe(P3, t4), Oe(j4, t4), Ce(_3, t4);
  })), yt = (e4) => xe(e4) ? Hs() : Ms(e4), Vt2 = (e4) => Ae($4, e4, ((e5, t4, s4) => mt3(t4, s4)), ((e5, t4) => Qt(t4))), mt3 = (e4, t4) => Ae(We($4, e4, (() => (Wt2(e4, 1), Oe(q4, e4, tt()), Oe(K4, e4, Fe()), Fe()))), t4, ((t5, s4, n4) => Mt3(e4, t5, s4, n4)), ((t5, s4) => zt2(e4, t5, s4))), Mt3 = (e4, t4, s4, n4, l3) => Ae(We(t4, s4, (() => (At(e4, s4, 1), Fe()))), n4, ((t5, n5, l4) => Et3(e4, s4, t5, n5, l4)), ((n5, o4) => Nt2(e4, t4, s4, n5, o4, l3))), Et3 = (e4, t4, s4, n4, l3) => {
    fe(s4, n4) || Pt(e4, t4, n4, 1);
    const o4 = ze(s4, n4);
    l3 !== o4 && (jt2(e4, t4, n4, o4, l3), Oe(s4, n4, l3));
  }, kt = (e4, t4, s4, n4, l3) => Q(ze(t4, s4), ((t5) => Et3(e4, s4, t5, n4, l3)), (() => Mt3(e4, t4, s4, Tt({ [n4]: l3 }, e4, s4)))), Dt2 = (e4) => xe(e4) ? Qs() : Es(e4), xt2 = (e4) => Ae(ee3, e4, ((e5, t4, s4) => Jt2(t4, s4)), ((e5, t4) => Ot2(t4))), Jt2 = (e4, t4) => {
    fe(ee3, e4) || _t2(e4, 1);
    const s4 = ze(ee3, e4);
    t4 !== s4 && (Bt2(e4, s4, t4), Oe(ee3, e4, t4));
  }, Ft2 = (e4) => ze($4, e4) ?? mt3(e4, {}), Qt = (e4) => mt3(e4, {}), zt2 = (e4, t4, s4) => {
    const [, n4] = ze(q4, e4);
    n4(s4), Mt3(e4, t4, s4, {}, true);
  }, Nt2 = (e4, t4, s4, n4, l3, o4) => {
    const a3 = ze(ze(N4, e4)?.[0], l3);
    if (!F(a3) && !o4) return Et3(e4, s4, n4, l3, a3);
    const r3 = (t5) => {
      jt2(e4, s4, t5, ze(n4, t5)), Pt(e4, s4, t5, -1), Oe(n4, t5);
    };
    F(a3) ? r3(l3) : Ne(n4, r3), Ie(n4) && (At(e4, s4, -1), Ie(Oe(t4, s4)) && (Wt2(e4, -1), Oe($4, e4), Oe(q4, e4), Oe(K4, e4)));
  }, Ot2 = (e4) => {
    const t4 = ze(j4, e4);
    if (!F(t4)) return Jt2(e4, t4);
    Bt2(e4, ze(ee3, e4)), _t2(e4, -1), Oe(ee3, e4);
  }, Wt2 = (e4, t4) => $t(g3, e4, t4), At = (e4, t4, s4) => $t(We(m3, e4, Fe), t4, s4) && Oe(V3, e4, We(V3, e4, (() => 0)) + s4), Pt = (e4, t4, s4, n4) => {
    const l3 = ze(K4, e4), o4 = ze(l3, s4) ?? 0;
    (0 == o4 && 1 == n4 || 1 == o4 && -1 == n4) && $t(We(C4, e4, Fe), s4, n4), Oe(l3, s4, o4 != -n4 ? o4 + n4 : null), $t(We(We(M3, e4, Fe), t4, Fe), s4, n4);
  }, jt2 = (e4, t4, s4, n4, l3) => {
    We(We(We(E3, e4, Fe), t4, Fe), s4, (() => [n4, 0]))[1] = l3, d3[3]?.(e4, t4, s4, l3);
  }, _t2 = (e4, t4) => $t(k4, e4, t4), Bt2 = (e4, t4, s4) => {
    We(D3, e4, (() => [t4, 0]))[1] = s4, d3[4]?.(e4, s4);
  }, Ut2 = (e4, t4, s4, n4, l3) => (se(We(We(We(x4, e4, Fe), t4, Fe), s4, (() => [])), n4), l3), qt2 = (e4, t4, s4) => (se(We(H3, e4, (() => [])), t4), s4), ts = (e4, t4, s4) => Q(ze(ze(ze(E3, e4), t4), s4), (([e5, t5]) => [true, e5, t5]), (() => [false, ...Gt(ws(e4, t4, s4))])), ss = (e4) => Q(ze(D3, e4), (([e5, t4]) => [true, e5, t4]), (() => [false, ...Gt(Rs(e4))])), ns = (e4) => Ie(x4) || Ie(Ye3[e4]) ? 0 : Le(e4 ? qe(x4) : x4, ((t4, s4) => Le(t4, ((t5, n4) => Le(t5, ((t6, l3) => dt(Ye3[e4], [s4, n4, l3], t6))))))), ls2 = (e4) => Ie(H3) || Ie(Ze2[e4]) ? 0 : Le(e4 ? Be(H3) : H3, ((t4, s4) => dt(Ze2[e4], [s4], t4))), os2 = (e4, t4, s4, n4) => {
    if (!Ie(e4)) return dt(t4, n4, (() => Pe(e4))), Ne(e4, ((e5, t5) => dt(s4, [...n4 ?? [], e5], 1 == t5))), 1;
  }, as2 = (e4) => {
    const t4 = Ts();
    t4 != s3 && dt(te3[e4], void 0, t4);
    const n4 = Ie(pe3[e4]), l3 = Ie(ke3[e4]) && Ie(He2[e4]) && Ie(ve3[e4]) && Ie(ye3[e4]) && Ie(be3[e4]) && Ie(Re3[e4]) && Ie(Te3[e4]) && n4 && Ie(le3[e4]) && Ie(ae2[e4]), o4 = Ie(Ge3[e4]) && Ie(me3[e4]) && Ie(de3[e4]) && Ie(ne3[e4]);
    if (!l3 || !o4) {
      const t5 = e4 ? [Be(g3), Ue(C4), Be(V3), Ue(m3), qe(M3), qe(E3)] : [g3, C4, V3, m3, M3, E3];
      if (!l3) {
        os2(t5[0], le3[e4], ae2[e4]), Le(t5[1], ((t6, s5) => os2(t6, be3[e4], Re3[e4], [s5]))), Le(t5[2], ((t6, s5) => {
          0 != t6 && dt(Te3[e4], [s5], hs(s5));
        }));
        const s4 = Ke();
        Le(t5[3], ((t6, l4) => {
          os2(t6, ve3[e4], ye3[e4], [l4]) && !n4 && (dt(pe3[e4], [l4, null]), Xe(s4, l4));
        })), n4 || Le(t5[5], ((t6, n5) => {
          if (!fe(s4, n5)) {
            const s5 = Ke();
            Le(t6, ((e5) => Le(e5, (([t7, n6], l4) => n6 !== t7 ? Xe(s5, l4) : Ce(e5, l4))))), Le(s5, ((t7) => dt(pe3[e4], [n5, t7])));
          }
        })), Le(t5[4], ((t6, s5) => Le(t6, ((t7, n5) => os2(t7, ke3[e4], He2[e4], [s5, n5])))));
      }
      if (!o4) {
        let s4;
        Le(t5[5], ((t6, n5) => {
          let l4;
          Le(t6, ((t7, o5) => {
            let a3;
            Le(t7, (([t8, r3], i3) => {
              r3 !== t8 && (dt(Ge3[e4], [n5, o5, i3], r3, t8, ts), s4 = l4 = a3 = 1);
            })), a3 && dt(me3[e4], [n5, o5], ts);
          })), l4 && dt(de3[e4], [n5], ts);
        })), s4 && dt(ne3[e4], void 0, ts);
      }
    }
  }, rs2 = (e4) => {
    const t4 = Vs();
    t4 != n3 && dt($e3[e4], void 0, t4);
    const s4 = Ie(nt3[e4]) && Ie(lt2[e4]), l3 = Ie(ot3[e4]) && Ie(et3[e4]);
    if (!s4 || !l3) {
      const t5 = e4 ? [Be(k4), Be(D3)] : [k4, D3];
      if (s4 || os2(t5[0], nt3[e4], lt2[e4]), !l3) {
        let s5;
        Le(t5[1], (([t6, n4], l4) => {
          n4 !== t6 && (dt(ot3[e4], [l4], n4, t6, ss), s5 = 1);
        })), s5 && dt(et3[e4], void 0, ss);
      }
    }
  }, is2 = (e4, ...t4) => (Os((() => e4(...Z(t4, y)))), Ps), ds = (e4, t4, s4, n4, l3) => {
    let o4 = Is(e4, t4, ...s4);
    return it3((() => {
      const l4 = Is(e4, t4, ...s4);
      G(l4, o4) || (o4 = l4, n4(Ps, e4, t4, ...s4, o4));
    }), pe3[l3 ? 1 : 0], [e4, t4], [us]);
  }, cs = () => _e($4), us = () => Qe($4), gs = (e4) => Qe(ze(K4, y(e4))), hs = (e4) => ce(ze($4, y(e4))), fs = (e4) => Qe(ze($4, y(e4))), Is = (e4, t4, s4, n4 = 0, l3) => {
    return Se(e4) ? Is(e4.tableId, e4.cellId, e4.descending, e4.offset, e4.limit) : Z(A(X((o4 = ze($4, y(e4)), a3 = (e5, s5) => [F(t4) ? s5 : ze(e5, y(t4)), s5], Z([...o4?.entries() ?? []], (([e5, t5]) => a3(t5, e5)))), (([e5], [t5]) => Ht(e5, t5) * (s4 ? -1 : 1))), n4, F(l3) ? l3 : n4 + l3), (([, e5]) => e5));
    var o4, a3;
  }, bs = (e4, t4) => Qe(ze(ze($4, y(e4)), y(t4))), ws = (e4, t4, s4) => ze(ze(ze($4, y(e4)), y(t4)), y(s4)), Ls = () => Pe(ee3), Cs = () => Qe(ee3), Rs = (e4) => ze(ee3, y(e4)), Ts = () => !Ie($4), vs = (e4) => fe($4, y(e4)), ps = (e4, t4) => fe(ze(K4, y(e4)), y(t4)), Ss = (e4, t4) => fe(ze($4, y(e4)), y(t4)), ys = (e4, t4, s4) => fe(ze(ze($4, y(e4)), y(t4)), y(s4)), Vs = () => !Ie(ee3), ms = (e4) => fe(ee3, y(e4)), Ms = (e4) => is2((() => ((e5) => Je(e5, bt, Ut2))(e4) ? Vt2(e4) : 0)), Es = (e4) => is2((() => Ct2(e4) ? xt2(e4) : 0)), ks = (e4) => (B((() => yt(ut(e4)))), Ps), Ds = (t4) => is2((() => {
    if ((e3 = Je(t4, ((e4) => Je(e4, ft)))) && (pt2(t4), !Ie($4))) {
      const e4 = cs();
      Hs(), Ms(e4);
    }
  })), xs = (e4) => is2((() => {
    if (t3 = ((e5) => Je(e5, ft))(e4)) {
      const s4 = Ls();
      Ns(), Qs(), t3 = true, St(e4), Es(s4);
    }
  })), Hs = () => is2((() => Vt2({}))), Js = (e4) => is2(((e5) => fe($4, e5) ? Qt(e5) : 0), e4), Fs = (e4, t4) => is2(((e5, t5) => Q(ze($4, e5), ((s4) => fe(s4, t5) ? zt2(e5, s4, t5) : 0))), e4, t4), Qs = () => is2((() => xt2({}))), zs = () => is2((() => {
    pt2({}), e3 = false;
  })), Ns = () => is2((() => {
    St({}), t3 = false;
  })), Os = (e4, t4) => {
    if (-1 != o3) {
      Ws();
      const s4 = e4();
      return As(t4), s4;
    }
  }, Ws = () => (-1 != o3 && o3++, 1 == o3 && (d3[0]?.(), dt(at2)), Ps), As = (e4) => (o3 > 0 && (o3--, 0 == o3 && (o3 = 1, ns(1), Ie(E3) || as2(1), ls2(1), Ie(D3) || rs2(1), e4?.(Ps) && (Le(E3, ((e5, t4) => Le(e5, ((e6, s4) => Le(e6, (([e7], n4) => re(Ps, t4, s4, n4, e7))))))), we(E3), Le(D3, (([e5], t4) => ie(Ps, t4, e5))), we(D3)), dt(rt2[0], void 0), o3 = -1, ns(0), Ie(E3) || as2(0), ls2(0), Ie(D3) || rs2(0), d3[1]?.(), dt(rt2[1], void 0), d3[2]?.(), o3 = 0, s3 = Ts(), n3 = Vs(), Y([g3, C4, V3, m3, M3, E3, x4, k4, D3, H3], we))), Ps), Ps = { getContent: () => [cs(), Ls()], getTables: cs, getTableIds: us, getTable: (e4) => je(ze($4, y(e4))), getTableCellIds: gs, getRowCount: hs, getRowIds: fs, getSortedRowIds: Is, getRow: (e4, t4) => Pe(ze(ze($4, y(e4)), y(t4))), getCellIds: bs, getCell: ws, getValues: Ls, getValueIds: Cs, getValue: Rs, hasTables: Ts, hasTable: vs, hasTableCell: ps, hasRow: Ss, hasCell: ys, hasValues: Vs, hasValue: ms, getTablesJson: () => gt($4), getValuesJson: () => gt(ee3), getJson: () => gt([$4, ee3]), getTablesSchemaJson: () => gt(J4), getValuesSchemaJson: () => gt(P3), getSchemaJson: () => gt([J4, P3]), hasTablesSchema: () => e3, hasValuesSchema: () => t3, setContent: (e4) => is2((() => {
    const t4 = O(e4) ? e4() : e4;
    It2(t4) && (([e5, t5]) => {
      (xe(e5) ? Hs : Ms)(e5), (xe(t5) ? Qs : Es)(t5);
    })(t4);
  })), setTables: Ms, setTable: (e4, t4) => is2(((e5) => bt(t4, e5) ? mt3(e5, t4) : 0), e4), setRow: (e4, t4, s4) => is2(((e5, t5) => wt(e5, t5, s4) ? Mt3(e5, Ft2(e5), t5, s4) : 0), e4, t4), addRow: (e4, t4, s4 = true) => Os((() => {
    let n4;
    return wt(e4, n4, t4) && (e4 = y(e4), Mt3(e4, Ft2(e4), n4 = ((e5, t5) => {
      const [s5] = ze(q4, e5);
      let n5;
      do {
        n5 = s5(t5);
      } while (fe(ze($4, e5), n5));
      return n5;
    })(e4, s4 ? 1 : 0), t4)), n4;
  })), setPartialRow: (e4, t4, s4) => is2(((e5, t5) => {
    if (wt(e5, t5, s4, 1)) {
      const n4 = Ft2(e5);
      De(s4, ((s5, l3) => kt(e5, n4, t5, l3, s5)));
    }
  }), e4, t4), setCell: (e4, t4, s4, n4) => is2(((e5, t5, s5) => Q(Lt(e5, t5, s5, O(n4) ? n4(ws(e5, t5, s5)) : n4), ((n5) => kt(e5, Ft2(e5), t5, s5, n5)))), e4, t4, s4), setValues: Es, setPartialValues: (e4) => is2((() => Ct2(e4, 1) ? De(e4, ((e5, t4) => Jt2(t4, e5))) : 0)), setValue: (e4, t4) => is2(((e5) => Q(Rt2(e5, O(t4) ? t4(Rs(e5)) : t4), ((t5) => Jt2(e5, t5)))), e4), applyChanges: (e4) => is2((() => {
    De(e4[0], ((e5, t4) => F(e5) ? Js(t4) : De(e5, ((e6, s4) => F(e6) ? Fs(t4, s4) : De(e6, ((e7, n4) => re(Ps, t4, s4, n4, e7))))))), De(e4[1], ((e5, t4) => ie(Ps, t4, e5)));
  })), setTablesJson: ks, setValuesJson: (e4) => (B((() => Dt2(ut(e4)))), Ps), setJson: (e4) => is2((() => B((() => {
    const [t4, s4] = ut(e4);
    yt(t4), Dt2(s4);
  }), (() => ks(e4))))), setTablesSchema: Ds, setValuesSchema: xs, setSchema: (e4, t4) => is2((() => {
    Ds(e4), xs(t4);
  })), delTables: Hs, delTable: Js, delRow: Fs, delCell: (e4, t4, s4, n4) => is2(((e5, t5, s5) => Q(ze($4, e5), ((l3) => Q(ze(l3, t5), ((o4) => fe(o4, s5) ? Nt2(e5, l3, t5, o4, s5, n4) : 0))))), e4, t4, s4), delValues: Qs, delValue: (e4) => is2(((e5) => fe(ee3, e5) ? Ot2(e5) : 0), e4), delTablesSchema: zs, delValuesSchema: Ns, delSchema: () => is2((() => {
    zs(), Ns();
  })), transaction: Os, startTransaction: Ws, getTransactionChanges: () => [Pe(E3, ((e4, t4) => -1 === ze(g3, t4) ? void 0 : Pe(e4, ((e5, s4) => -1 === ze(ze(m3, t4), s4) ? void 0 : Pe(e5, (([, e6]) => e6), ((e6) => Zt(e6)))), Ie, xe)), Ie, xe), Pe(D3, (([, e4]) => e4), ((e4) => Zt(e4))), 1], getTransactionLog: () => [!Ie(E3), !Ie(D3), _e(E3, Yt, Zt), _e(x4), Pe(D3, Yt, Zt), Pe(H3), Pe(g3), je(m3), _e(M3), Pe(k4)], finishTransaction: As, forEachTable: (e4) => Le($4, ((t4, s4) => e4(s4, ((e5) => Le(t4, ((t5, s5) => e5(s5, ((e6) => Ne(t5, e6))))))))), forEachTableCell: (e4, t4) => Ne(ze(K4, y(e4)), t4), forEachRow: (e4, t4) => Le(ze($4, y(e4)), ((e5, s4) => t4(s4, ((t5) => Ne(e5, t5))))), forEachCell: (e4, t4, s4) => Ne(ze(ze($4, y(e4)), y(t4)), s4), forEachValue: (e4) => Ne(ee3, e4), addSortedRowIdsListener: (e4, t4, s4, n4, l3, o4, a3) => Se(e4) ? ds(e4.tableId, e4.cellId, [e4.descending ?? false, e4.offset ?? 0, e4.limit], t4, s4) : ds(e4, t4, [s4, n4, l3], o4, a3), addStartTransactionListener: (e4) => it3(e4, at2), addWillFinishTransactionListener: (e4) => it3(e4, rt2[0]), addDidFinishTransactionListener: (e4) => it3(e4, rt2[1]), callListener: (e4) => (ht3(e4), Ps), delListener: (e4) => (ct3(e4), Ps), getListenerStats: () => ({ hasTables: Kt(te3), tables: Kt(ne3), tableIds: Kt(le3), hasTable: Kt(ae2), table: Kt(de3), tableCellIds: Kt(be3), hasTableCell: Kt(Re3, ge), rowCount: Kt(Te3), rowIds: Kt(ve3), sortedRowIds: Kt(pe3), hasRow: Kt(ye3, ge), row: Kt(me3, ge), cellIds: Kt(ke3, ge), hasCell: Kt(He2, he), cell: Kt(Ge3, he), invalidCell: Kt(Ye3, he), hasValues: Kt($e3), values: Kt(et3), valueIds: Kt(nt3), hasValue: Kt(lt2), value: Kt(ot3), invalidValue: Kt(Ze2), transaction: ue(at2) + Kt(rt2) }), isMergeable: () => false, createStore: es, addListener: it3, callListeners: dt, setInternalListeners: (e4, t4, s4, n4, l3) => d3 = [e4, t4, s4, n4, l3] };
  return De({ [u + f]: [0, te3, [], () => [Ts()]], [f]: [0, ne3], [I]: [0, le3], [u + h]: [1, ae2, [us], (e4) => [vs(...e4)]], [h]: [1, de3, [us]], [h + T]: [1, be3, [us]], [u + h + R]: [2, Re3, [us, gs], (e4) => [ps(...e4)]], [w]: [1, Te3, [us]], [L]: [1, ve3, [us]], [u + b]: [2, ye3, [us, fs], (e4) => [Ss(...e4)]], [b]: [2, me3, [us, fs]], [T]: [2, ke3, [us, fs]], [u + R]: [3, He2, [us, fs, bs], (e4) => [ys(...e4)]], [R]: [3, Ge3, [us, fs, bs], (e4) => Gt(ws(...e4))], InvalidCell: [3, Ye3], [u + p]: [0, $e3, [], () => [Vs()]], [p]: [0, et3], [S]: [0, nt3], [u + v]: [1, lt2, [Cs], (e4) => [ms(...e4)]], [v]: [1, ot3, [Cs], (e4) => Gt(Rs(e4[0]))], InvalidValue: [1, Ze2] }, (([e4, t4, s4, n4], l3) => {
    Ps[c + l3 + i] = (...l4) => it3(l4[e4], t4[l4[e4 + 1] ? 1 : 0], e4 > 0 ? A(l4, 0, e4) : void 0, s4, n4);
  })), Ve(Ps);
};
var ls = Fe([["avg", [(e3, t3) => $(e3) / t3, (e3, t3, s3) => e3 + (t3 - e3) / (s3 + 1), (e3, t3, s3) => e3 + (e3 - t3) / (s3 - 1), (e3, t3, s3, n3) => e3 + (t3 - s3) / n3]], ["max", [(e3) => D(...e3), (e3, t3) => D(t3, e3), (e3, t3) => t3 == e3 ? void 0 : e3, (e3, t3, s3) => s3 == e3 ? void 0 : D(t3, e3)]], ["min", [(e3) => x(...e3), (e3, t3) => x(t3, e3), (e3, t3) => t3 == e3 ? void 0 : e3, (e3, t3, s3) => s3 == e3 ? void 0 : x(t3, e3)]], ["sum", [(e3) => $(e3), (e3, t3) => e3 + t3, (e3, t3) => e3 - t3, (e3, t3, s3) => e3 - s3 + t3]]]);
var os = (e3, t3, s3, n3, l3, o3 = false) => {
  if (Ie(s3)) return;
  const [a3, r3, i3, d3] = l3;
  return o3 || (o3 = F(e3)), Le(n3, (([s4, n4]) => {
    o3 || (e3 = F(s4) ? r3?.(e3, n4, t3++) : F(n4) ? i3?.(e3, s4, t3--) : d3?.(e3, n4, s4, t3), o3 || (o3 = F(e3)));
  })), o3 ? a3(be(s3), ce(s3)) : e3;
};
var as = $e(((e3) => {
  const s3 = Fe(), [n3, l3, o3] = st((() => w3)), [a3, r3, i3, d3, c3, u3, g3, , h3, f4, I4, b4] = Ye(e3, j, ((e4) => isNaN(e4) || F(e4) || true === e4 || false === e4 || e4 === t ? void 0 : 1 * e4), n3, l3), w3 = { setMetricDefinition: (e4, t3, n4, o4, a4, r4, i4) => {
    const d4 = O(n4) ? [n4, a4, r4, i4] : ze(ls, n4) ?? ze(ls, "sum");
    return h3(e4, t3, ((t4, n5, o5, a5, r5, i5) => {
      const c4 = u3(e4), h4 = ce(a5);
      i5 || (i5 = F(c4)), t4();
      let f5 = os(c4, h4, a5, n5, d4, i5);
      J(f5) || (f5 = void 0), f5 != c4 && (g3(e4, f5), l3(s3, [e4], f5, c4));
    }), Ze(o4, 1)), w3;
  }, delMetricDefinition: (e4) => (f4(e4), w3), getStore: a3, getMetricIds: r3, forEachMetric: i3, hasMetric: d3, getTableId: c3, getMetric: u3, addMetricIdsListener: I4, addMetricListener: (e4, t3) => n3(t3, s3, [e4]), delListener: (e4) => (o3(e4), w3), destroy: b4, getListenerStats: () => ({ metric: ue(s3) }) };
  return Ve(w3);
}));
var rs = $e(((e3) => {
  const s3 = e3.createStore, n3 = s3(), l3 = s3(), o3 = Fe(), { addListener: a3, callListeners: r3, delListener: u3 } = l3, [g3, f4, I4, v4, p3, , , S3, , y3, V3, m3, M3, E3] = Ye(e3, (() => true), j, a3, r3), k4 = (e4, t3, ...s4) => Y(s4, ((s5) => Xe(We(We(o3, t3, Fe), e4, Ke), s5))), D3 = (e4) => {
    Q(ze(o3, e4), ((e5) => {
      Ne(e5, ((e6, t3) => Le(t3, ((t4) => e6.delListener(t4))))), we(e5);
    })), Y([l3, n3], ((t3) => t3.delTable(e4)));
  }, x4 = (e4, t3, s4) => k4(t3, e4, t3.addStartTransactionListener(s4.startTransaction), t3.addDidFinishTransactionListener((() => s4.finishTransaction()))), H3 = { setQueryDefinition: (s4, o4, a4) => {
    S3(s4, o4), D3(s4);
    const r4 = [], i3 = [[null, [o4, null, null, [], Fe()]]], d3 = [], c3 = [], u4 = [];
    a4({ select: (e4, s5) => {
      const n4 = O(e4) ? [P(r4) + t, e4] : [F(s5) ? e4 : s5, (t3) => t3(e4, s5)];
      return se(r4, n4), { as: (e5) => n4[0] = e5 };
    }, join: (e4, t3, s5) => {
      const n4 = F(s5) || O(t3) ? null : t3, l4 = F(n4) ? t3 : s5, o5 = [e4, [e4, n4, O(l4) ? l4 : (e5) => e5(l4), [], Fe()]];
      return se(i3, o5), { as: (e5) => o5[0] = e5 };
    }, where: (e4, t3, s5) => se(d3, O(e4) ? e4 : F(s5) ? (s6) => s6(e4) === t3 : (n4) => n4(e4, t3) === s5), group: (e4, t3, s5, n4, l4) => {
      const o5 = [e4, [e4, O(t3) ? [t3, s5, n4, l4] : ze(ls, t3) ?? [(e5, t4) => t4]]];
      return se(c3, o5), { as: (e5) => o5[0] = e5 };
    }, having: (e4, t3) => se(u4, O(e4) ? e4 : (s5) => s5(e4) === t3) });
    const g4 = Fe(r4);
    if (Ie(g4)) return H3;
    const h3 = Fe(i3);
    Ne(h3, ((e4, [, t3]) => Q(ze(h3, t3), (({ 3: t4 }) => F(e4) ? 0 : se(t4, e4)))));
    const f5 = Fe(c3);
    let I5 = n3;
    if (Ie(f5) && ee(u4)) I5 = l3;
    else {
      x4(s4, I5, l3);
      const e4 = Fe();
      Ne(f5, ((t4, [s5, n5]) => Xe(We(e4, s5, Ke), [t4, n5])));
      const t3 = Ke();
      Ne(g4, ((s5) => fe(e4, s5) ? 0 : Xe(t3, s5)));
      const n4 = Fe(), o5 = (t4, n5, o6, a5) => Q(t4, (([r5, i4, d4, c4]) => {
        Ne(n5, ((t5, [s5]) => {
          const n6 = We(r5, t5, Fe), l4 = ze(n6, o6), i5 = a5 ? void 0 : s5;
          if (l4 !== i5) {
            const s6 = Ke([[l4, i5]]), a6 = ce(n6);
            Oe(n6, o6, i5), Le(ze(e4, t5), (([e5, t6]) => {
              const l5 = os(c4[e5], a6, n6, s6, t6);
              c4[e5] = F(oe(l5)) ? null : l5;
            }));
          }
        })), Ie(i4) || !q(u4, ((e5) => e5(((e6) => c4[e6])))) ? l3.delRow(s4, d4) : F(d4) ? t4[2] = l3.addRow(s4, c4) : l3.setRow(s4, d4, c4);
      }));
      k4(I5, s4, I5.addRowListener(s4, null, ((l4, a5, r5, i4) => {
        const d4 = [], c4 = [], u5 = Fe(), g5 = I5.hasRow(s4, r5);
        let h4 = !g5;
        Le(t3, ((e5) => {
          const [t4, n5, l5] = i4(s4, r5, e5);
          se(d4, n5), se(c4, l5), h4 || (h4 = t4);
        })), Ne(e4, ((e5) => {
          const [t4, , n5] = i4(s4, r5, e5);
          (h4 || t4) && Oe(u5, e5, [n5]);
        })), h4 && o5(Ge(n4, d4, void 0, (([, e5]) => (Ce(e5, r5), Ie(e5)))), u5, r5, 1), g5 && o5(Ge(n4, c4, (() => {
          const e5 = {};
          return Le(t3, ((t4) => e5[t4] = I5.getCell(s4, r5, t4))), [Fe(), Ke(), void 0, e5];
        }), (([, e5]) => {
          Xe(e5, r5);
        })), u5, r5);
      })));
    }
    x4(s4, e3, I5);
    const b4 = (t3, n4, l4, a5) => {
      const r5 = (t4) => e3.getCell(n4, l4, t4);
      Y(a5, ((n5) => {
        const [l5, , o5, a6, i4] = ze(h3, n5), d4 = o5?.(r5, t3), [c4, u5] = ze(i4, t3) ?? [];
        d4 != c4 && (F(u5) || E3(s4, u5), Oe(i4, t3, F(d4) ? null : [d4, ...M3(s4, 1, e3.addRowListener(l5, d4, (() => b4(t3, l5, d4, a6))))]));
      })), ((t4) => {
        const n5 = (s5, n6) => e3.getCell(...F(n6) ? [o4, t4, s5] : s5 === o4 ? [o4, t4, n6] : [ze(h3, s5)?.[0], ze(ze(h3, s5)?.[4], t4)?.[0], n6]);
        I5.transaction((() => q(d3, ((e4) => e4(n5))) ? Ne(g4, ((e4, l5) => re(I5, s4, t4, e4, l5(n5, t4)))) : I5.delRow(s4, t4)));
      })(t3);
    }, { 3: w3 } = ze(h3, null);
    return I5.transaction((() => M3(s4, 1, e3.addRowListener(o4, null, ((t3, n4, l4) => {
      e3.hasRow(o4, l4) ? b4(l4, o4, l4, w3) : (I5.delRow(s4, l4), Le(h3, (({ 4: e4 }) => Q(ze(e4, l4), (([, t4]) => {
        E3(s4, t4), Oe(e4, l4);
      })))));
    }))))), H3;
  }, delQueryDefinition: (e4) => (D3(e4), y3(e4), H3), getStore: g3, getQueryIds: f4, forEachQuery: I4, hasQuery: v4, getTableId: p3, addQueryIdsListener: (e4) => V3((() => e4(H3))), delListener: (e4) => (u3(e4), H3), destroy: m3, getListenerStats: () => {
    const { tables: e4, tableIds: t3, transaction: s4, ...n4 } = l3.getListenerStats();
    return n4;
  } };
  return De({ [h]: [1, 1], [h + T]: [0, 1], [w]: [0, 1], [L]: [0, 1], [C]: [0, 5], [b]: [1, 2], [T]: [0, 2], [R]: [1, 3] }, (([e4, t3], s4) => {
    Y(e4 ? ["get", "has", "forEach"] : ["get"], ((e5) => H3[e5 + d + s4] = (...t4) => l3[e5 + s4](...t4))), H3[c + d + s4 + i] = (...e5) => l3[c + s4 + i](...A(e5, 0, t3), ((s5, ...n4) => e5[t3](H3, ...n4)), true);
  })), Ve(H3);
}));
var is = $e(((e3) => {
  const s3 = Fe(), n3 = Fe(), l3 = Fe(), o3 = Fe(), [a3, r3, i3] = st((() => v4)), [d3, c3, u3, g3, h3, f4, , , I4, b4, w3, L4] = Ye(e3, (() => [Fe(), Fe(), Fe(), Fe()]), ((e4) => F(e4) ? void 0 : e4 + t), a3, r3), C4 = (e4, t3, s4) => Q(f4(e4), (([n4, , l4]) => {
    if (!fe(l4, t3)) {
      const o4 = Ke();
      if (h3(e4) != T3(e4)) Xe(o4, t3);
      else {
        let e5 = t3;
        for (; !F(e5) && !fe(o4, e5); ) Xe(o4, e5), e5 = ze(n4, e5);
      }
      if (s4) return o4;
      Oe(l4, t3, o4);
    }
    return ze(l4, t3);
  })), R4 = (e4, t3) => Q(f4(e4), (([, , e5]) => Oe(e5, t3))), T3 = (e4) => ze(s3, e4), v4 = { setRelationshipDefinition: (e4, t3, a4, i4) => (Oe(s3, e4, a4), I4(e4, t3, ((t4, s4) => {
    const a5 = Ke(), i5 = Ke(), d4 = Ke(), [c4, u4] = f4(e4);
    Le(s4, (([t5, s5], n4) => {
      F(t5) || (Xe(i5, t5), Q(ze(u4, t5), ((e5) => {
        Ce(e5, n4), Ie(e5) && Oe(u4, t5);
      }))), F(s5) || (Xe(i5, s5), fe(u4, s5) || Oe(u4, s5, Ke()), Xe(ze(u4, s5), n4)), Xe(a5, n4), Oe(c4, n4, s5), Ne(ze(o3, e4), ((t6) => {
        fe(C4(e4, t6), n4) && Xe(d4, t6);
      }));
    })), t4(), Le(a5, ((t5) => r3(n3, [e4, t5]))), Le(i5, ((t5) => r3(l3, [e4, t5]))), Le(d4, ((t5) => {
      R4(e4, t5), r3(o3, [e4, t5]);
    }));
  }), Ze(i4)), v4), delRelationshipDefinition: (e4) => (Oe(s3, e4), b4(e4), v4), getStore: d3, getRelationshipIds: c3, forEachRelationship: (t3) => u3(((s4) => t3(s4, ((t4) => e3.forEachRow(h3(s4), t4))))), hasRelationship: g3, getLocalTableId: h3, getRemoteTableId: T3, getRemoteRowId: (e4, t3) => ze(f4(e4)?.[0], t3), getLocalRowIds: (e4, t3) => be(ze(f4(e4)?.[1], t3)), getLinkedRowIds: (e4, t3) => F(f4(e4)) ? [t3] : be(C4(e4, t3, true)), addRelationshipIdsListener: w3, addRemoteRowIdListener: (e4, t3, s4) => a3(s4, n3, [e4, t3]), addLocalRowIdsListener: (e4, t3, s4) => a3(s4, l3, [e4, t3]), addLinkedRowIdsListener: (e4, t3, s4) => (C4(e4, t3), a3(s4, o3, [e4, t3])), delListener: (e4) => (R4(...i3(e4) ?? []), v4), destroy: L4, getListenerStats: () => ({ remoteRowId: ge(n3), localRowIds: ge(l3), linkedRowIds: ge(o3) }) };
  return Ve(v4);
}));

// js/lib/tinybase-persister-indexed-db.js
var et2 = Promise;
var vt = globalThis;
var k2 = vt.window;
var Et2 = 1e3;
var Mt2 = (t3, e3, s3) => setInterval(t3, e3 * Et2);
var Ct = clearInterval;
var L2 = (t3) => t3 == null;
var R2 = (t3, e3, s3) => L2(t3) ? s3?.() : e3(t3);
var q2 = (t3) => Array.isArray(t3);
var b2 = (t3) => t3.length;
var ht2 = (t3, e3) => t3.test(e3);
var st2 = (t3) => new et2(t3);
var nt2 = async (t3) => et2.all(t3);
var ot2 = (t3) => {
  throw new Error(t3);
};
var A2 = async (t3, e3, s3) => {
  try {
    return await t3();
  } catch (o3) {
    e3?.(o3);
  }
};
var K2 = (t3, e3) => t3.forEach(e3);
var N2 = (t3, e3) => t3.map(e3);
var Nt = (t3, e3) => t3.splice(0, e3);
var _ = (t3, ...e3) => t3.push(...e3);
var ct2 = (t3) => t3.shift();
var C2 = Object;
var tt2 = (t3) => C2.getPrototypeOf(t3);
var mt2 = C2.entries;
var pt = (t3) => !L2(t3) && R2(tt2(t3), (e3) => e3 == C2.prototype || L2(tt2(e3)), () => true);
var Dt = C2.keys;
var It = C2.freeze;
var jt = (t3 = []) => C2.fromEntries(t3);
var xt = (t3, e3) => e3 in t3;
var Gt2 = (t3, e3) => N2(mt2(t3), ([s3, o3]) => e3(o3, s3));
var Rt = (t3) => b2(Dt(t3));
var I2 = (t3) => pt(t3) && Rt(t3) == 0;
var _t = (t3) => t3?.size ?? 0;
var Ft = (t3, e3) => t3?.has(e3) ?? false;
var at = (t3) => L2(t3) || _t(t3) == 0;
var rt = (t3, e3) => t3?.forEach(e3);
var it2 = (t3, e3) => t3?.delete(e3);
var m = (t3) => new Map(t3);
var f2 = (t3, e3) => t3?.get(e3);
var v2 = (t3, e3, s3) => L2(s3) ? (it2(t3, e3), t3) : t3?.set(e3, s3);
var V = (t3, e3, s3, o3) => (Ft(t3, e3) ? o3?.(f2(t3, e3)) : v2(t3, e3, s3()), f2(t3, e3));
var J2 = (t3, e3, s3, o3, c3 = 0) => R2((s3 ? V : f2)(t3, e3[c3], c3 > b2(e3) - 2 ? s3 : m), (l3) => {
  if (c3 > b2(e3) - 2) return o3?.(l3) && v2(t3, e3[c3]), l3;
  let P3 = J2(l3, e3, s3, o3, c3 + 1);
  return at(l3) && v2(t3, e3[c3]), P3;
});
var zt = /^\d+$/;
var Yt2 = () => {
  let t3 = [], e3 = 0;
  return [(s3) => (s3 ? ct2(t3) : null) ?? "" + e3++, (s3) => {
    ht2(zt, s3) && b2(t3) < 1e3 && _(t3, s3);
  }];
};
var Bt = (t3) => new Set(q2(t3) || L2(t3) ? t3 : [t3]);
var Ht2 = (t3, e3) => t3?.add(e3);
var Wt = (t3, e3 = [""]) => {
  let s3 = [], o3 = (c3, l3) => l3 == b2(e3) ? _(s3, c3) : e3[l3] === null ? rt(c3, (P3) => o3(P3, l3 + 1)) : K2([e3[l3], null], (P3) => o3(f2(c3, P3), l3 + 1));
  return o3(t3, 0), s3;
};
var Ot = (t3) => {
  let e3, [s3, o3] = Yt2(), c3 = m();
  return [(a3, r3, i3, y3 = [], g3 = () => []) => {
    e3 ?? (e3 = t3());
    let u3 = s3(1);
    return v2(c3, u3, [a3, r3, i3, y3, g3]), Ht2(J2(r3, i3 ?? [""], Bt), u3), u3;
  }, (a3, r3, ...i3) => K2(Wt(a3, r3), (y3) => rt(y3, (g3) => f2(c3, g3)[0](e3, ...r3 ?? [], ...i3))), (a3) => R2(f2(c3, a3), ([, r3, i3]) => (J2(r3, i3 ?? [""], void 0, (y3) => (it2(y3, a3), at(y3) ? 1 : 0)), v2(c3, a3), o3(a3), i3)), (a3) => R2(f2(c3, a3), ([r3, , i3 = [], y3, g3]) => {
    let u3 = (...d3) => {
      let T3 = b2(d3);
      T3 == b2(i3) ? r3(e3, ...d3, ...g3(d3)) : L2(i3[T3]) ? K2(y3[T3]?.(...d3) ?? [], (h3) => u3(...d3, h3)) : u3(...d3, i3[T3]);
    };
    u3();
  })];
};
var j2 = m();
var x2 = m();
var Ut = (t3 = 1, e3, s3) => t3 != 1 && e3.isMergeable() ? [1, e3.getMergeableContent, () => e3.getTransactionMergeableChanges(!s3), ([[o3], [c3]]) => !I2(o3) || !I2(c3), e3.setDefaultContent] : t3 != 2 ? [0, e3.getContent, e3.getTransactionChanges, ([o3, c3]) => !I2(o3) || !I2(c3), e3.setContent] : ot2("Store type not supported by this Persister");
var $t2 = (t3, e3, s3, o3, c3, l3, P3, F3 = {}, z3 = 0, a3 = []) => {
  let r3 = 0, i3 = 0, y3 = 0, g3, u3, d3;
  V(j2, a3, () => 0), V(x2, a3, () => []);
  let T3 = m(), [h3, Y3, lt2, ut2, Q3] = Ut(P3, t3, z3), [dt, yt, gt2] = Ot(() => w3), E3 = (n3) => {
    n3 != r3 && (r3 = n3, yt(T3, void 0, r3));
  }, wt = async () => {
    if (!f2(j2, a3)) {
      for (v2(j2, a3, 1); !L2(g3 = ct2(f2(x2, a3))); ) await A2(g3, l3);
      v2(j2, a3, 0);
    }
  }, X3 = (n3) => {
    (h3 && q2(n3?.[0]) ? n3?.[2] === 1 ? t3.applyMergeableChanges : t3.setMergeableContent : n3?.[2] === 1 ? t3.applyChanges : t3.setContent)(n3);
  }, B3 = async (n3) => (r3 != 2 && (E3(1), i3++, await U3(async () => {
    await A2(async () => {
      let S3 = await e3();
      q2(S3) ? X3(S3) : n3 ? Q3(n3) : ot2(`Content is not an array: ${S3}`);
    }, () => {
      n3 && Q3(n3);
    }), E3(0);
  })), w3), H3 = async (n3) => (p3(), await B3(n3), await A2(async () => u3 = await o3(async (S3, M3) => {
    M3 || S3 ? r3 != 2 && (E3(1), i3++, X3(M3 ?? S3), E3(0)) : await B3();
  }), l3), w3), p3 = async () => (u3 && (await A2(() => c3(u3), l3), u3 = void 0), w3), ft = () => !L2(u3), W3 = async (n3) => (r3 != 1 && (E3(2), y3++, await U3(async () => {
    await A2(() => s3(Y3, n3), l3), E3(0);
  })), w3), O3 = async () => (D3(), await W3(), d3 = t3.addDidFinishTransactionListener(() => {
    let n3 = lt2();
    ut2(n3) && W3(n3);
  }), w3), D3 = async () => (d3 && (t3.delListener(d3), d3 = void 0), w3), St = () => !L2(d3), Lt = async (n3, S3 = false) => {
    let [M3, bt] = S3 ? [O3, H3] : [H3, O3];
    return await M3(n3), await bt(n3), w3;
  }, Z3 = async (n3 = false) => {
    let [S3, M3] = n3 ? [D3, p3] : [p3, D3];
    return await S3(), await M3(), w3;
  }, Pt = () => r3, Tt = (n3) => dt(n3, T3), At = (n3) => (gt2(n3), t3), U3 = async (...n3) => (_(f2(x2, a3), ...n3), await wt(), w3), w3 = { load: B3, startAutoLoad: H3, stopAutoLoad: p3, isAutoLoading: ft, save: W3, startAutoSave: O3, stopAutoSave: D3, isAutoSaving: St, startAutoPersisting: Lt, stopAutoPersisting: Z3, getStatus: Pt, addStatusListener: Tt, delListener: At, schedule: U3, getStore: () => t3, destroy: () => (Nt(f2(x2, a3)), Z3()), getStats: () => ({ loads: i3, saves: y3 }), ...F3 };
  return It(w3);
};
var $2 = ["t", "v"];
var qt = { keyPath: "k" };
var Kt2 = async (t3, e3) => {
  let s3 = Gt2(e3, (o3, c3) => G2(t3, "put", { k: c3, v: o3 }));
  N2(await G2(t3, "getAllKeys"), (o3) => xt(e3, o3) ? 0 : _(s3, G2(t3, "delete", o3))), await nt2(s3);
};
var G2 = async (t3, e3, s3) => st2((o3, c3) => {
  let l3 = t3[e3](s3);
  l3.onsuccess = () => o3(l3.result), l3.onerror = () => c3(`objectStore.${e3} error`);
});
var Xt2 = (t3, e3, s3 = 1, o3) => {
  let c3 = async (a3, r3 = [], i3 = 0) => st2((y3, g3) => {
    let u3 = (k2 ? k2.indexedDB : indexedDB).open(e3, i3 ? 2 : void 0);
    u3.onupgradeneeded = () => i3 && N2($2, (d3) => A2(() => u3.result.createObjectStore(d3, qt))), u3.onsuccess = () => A2(async () => {
      let d3 = u3.result.transaction($2, "readwrite"), T3 = await nt2(N2($2, (h3, Y3) => a3(d3.objectStore(h3), r3[Y3])));
      u3.result.close(), y3(T3);
    }, (d3) => {
      u3.result.close(), g3(d3);
    }), u3.onerror = () => g3("indexedDB.open error");
  });
  return $t2(t3, async () => await c3(async (a3) => jt(N2(await G2(a3, "getAll"), ({ k: r3, v: i3 }) => [r3, i3]))), (a3) => c3((r3, i3) => Kt2(r3, i3), a3(), 1), (a3) => Mt2(a3, s3), (a3) => Ct(a3), o3, 1, { getDbName: () => e3 });
};

// js/core/store.js
var store = es();
store.setTable("docs", {});
var persister = Xt2(store, "copio-db");
persister.startAutoLoad();
persister.startAutoSave();

// js/adapters/storage/indexeddb-adapter.js
var _store, _persister, _dbName, _isCustom, _IndexedDbStorageAdapter_instances, parsePages_fn;
var IndexedDbStorageAdapter = class extends StoragePort {
  /**
   * @param {Object} [options]
   * @param {any} [options.store] - Optional TinyBase store instance
   * @param {any} [options.persister] - Optional TinyBase persister instance
   * @param {string} [options.dbName] - Custom IndexedDB database name
   */
  constructor(options = {}) {
    super();
    __privateAdd(this, _IndexedDbStorageAdapter_instances);
    __privateAdd(this, _store, null);
    __privateAdd(this, _persister, null);
    __privateAdd(this, _dbName, "copio-db");
    __privateAdd(this, _isCustom, false);
    if (options.dbName && options.dbName !== "copio-db") {
      __privateSet(this, _dbName, options.dbName);
      __privateSet(this, _store, options.store || es());
      __privateGet(this, _store).setTable("docs", {});
      __privateSet(this, _persister, options.persister || Xt2(__privateGet(this, _store), __privateGet(this, _dbName)));
      __privateSet(this, _isCustom, true);
    } else {
      __privateSet(this, _store, options.store || store);
      __privateSet(this, _persister, options.persister || persister);
      __privateSet(this, _dbName, "copio-db");
    }
  }
  get store() {
    return __privateGet(this, _store);
  }
  get persister() {
    return __privateGet(this, _persister);
  }
  /**
   * @returns {Promise<{ kind: string, persistent: boolean }>}
   */
  async init() {
    if (__privateGet(this, _isCustom)) {
      await __privateGet(this, _persister).load();
      __privateGet(this, _persister).startAutoLoad();
      __privateGet(this, _persister).startAutoSave();
    } else {
      await __privateGet(this, _persister).load();
    }
    return {
      kind: "indexeddb",
      persistent: true
    };
  }
  /**
   * Returns list of all stored documents synchronously from the TinyBase cache.
   * @returns {Array<{ id: string, name: string, pages: any[] }>}
   */
  listDocsSync() {
    const table = __privateGet(this, _store).getTable("docs");
    return Object.entries(table || {}).map(([id, row]) => ({
      id,
      name: row.name || "",
      pages: __privateMethod(this, _IndexedDbStorageAdapter_instances, parsePages_fn).call(this, row.pages)
    }));
  }
  /**
   * Returns list of all stored documents.
   * @returns {Promise<Array<{ id: string, name: string, pages: any[] }>>}
   */
  async listDocs() {
    return this.listDocsSync();
  }
  /**
   * Retrieves a document by its ID synchronously from the TinyBase cache.
   * @param {string} id
   * @returns {{ id: string, name: string, pages: any[] } | null}
   */
  getDocSync(id) {
    if (!__privateGet(this, _store).hasRow("docs", id)) {
      return null;
    }
    const row = __privateGet(this, _store).getRow("docs", id);
    return {
      id,
      name: row.name || "",
      pages: __privateMethod(this, _IndexedDbStorageAdapter_instances, parsePages_fn).call(this, row.pages)
    };
  }
  /**
   * Retrieves a document by its ID.
   * @param {string} id
   * @returns {Promise<{ id: string, name: string, pages: any[] } | null>}
   */
  async getDoc(id) {
    return this.getDocSync(id);
  }
  /**
   * Saves or updates a document.
   * @param {string} id
   * @param {import('./storage-port.js').DocRow} doc
   * @returns {Promise<void>}
   */
  async saveDoc(id, doc) {
    if (!id) throw new Error("Cannot save document without an ID");
    const pages = Array.isArray(doc.pages) ? doc.pages : __privateMethod(this, _IndexedDbStorageAdapter_instances, parsePages_fn).call(this, doc.pages);
    __privateGet(this, _store).setRow("docs", id, {
      name: doc.name || "",
      pages: JSON.stringify(pages)
    });
  }
  /**
   * Deletes a document.
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteDoc(id) {
    __privateGet(this, _store).delRow("docs", id);
  }
  /**
   * Saves page data for a document.
   * @param {string} docId
   * @param {string} pageId
   * @param {any} blobOrData
   * @returns {Promise<void>}
   */
  async savePage(docId, pageId, blobOrData) {
    const doc = await this.getDoc(docId);
    if (!doc) throw new Error(`Document ${docId} not found`);
    const idx = doc.pages.findIndex((p3) => p3.id === pageId);
    if (idx >= 0) {
      if (typeof blobOrData === "object" && blobOrData !== null && !(blobOrData instanceof Blob)) {
        doc.pages[idx] = { ...doc.pages[idx], ...blobOrData };
      } else {
        doc.pages[idx] = { ...doc.pages[idx], src: blobOrData };
      }
    } else {
      const pageObj = typeof blobOrData === "object" && blobOrData !== null && !(blobOrData instanceof Blob) ? { id: pageId, ...blobOrData } : { id: pageId, src: blobOrData };
      doc.pages.push(pageObj);
    }
    await this.saveDoc(docId, doc);
  }
  /**
   * Retrieves page data.
   * @param {string} docId
   * @param {string} pageId
   * @returns {Promise<any>}
   */
  async getPage(docId, pageId) {
    const doc = await this.getDoc(docId);
    if (!doc) return null;
    const page = doc.pages.find((p3) => p3.id === pageId);
    return page ? page.src ?? page : null;
  }
  /**
   * Deletes page data.
   * @param {string} docId
   * @param {string} pageId
   * @returns {Promise<void>}
   */
  async deletePage(docId, pageId) {
    const doc = await this.getDoc(docId);
    if (!doc) return;
    doc.pages = doc.pages.filter((p3) => p3.id !== pageId);
    await this.saveDoc(docId, doc);
  }
  /**
   * Subscribes to document changes via TinyBase table listener.
   * @param {() => void} cb
   * @returns {() => void} Unsubscribe function
   */
  subscribe(cb) {
    const listenerId = __privateGet(this, _store).addTableListener("docs", cb);
    return () => {
      __privateGet(this, _store).delListener(listenerId);
    };
  }
};
_store = new WeakMap();
_persister = new WeakMap();
_dbName = new WeakMap();
_isCustom = new WeakMap();
_IndexedDbStorageAdapter_instances = new WeakSet();
parsePages_fn = function(rawPages) {
  if (Array.isArray(rawPages)) return rawPages;
  if (typeof rawPages === "string") {
    try {
      return JSON.parse(rawPages);
    } catch {
      return [];
    }
  }
  return [];
};

// js/adapters/storage/index.js
function createDefaultAdapter(options = {}) {
  if (options.forceMemory) {
    return new MemoryStorageAdapter();
  }
  if (typeof indexedDB !== "undefined") {
    return new IndexedDbStorageAdapter(options);
  }
  return new MemoryStorageAdapter();
}

// js/lib/exifr.js
function e2(e3, t3, i3) {
  return t3 in e3 ? Object.defineProperty(e3, t3, { value: i3, enumerable: true, configurable: true, writable: true }) : e3[t3] = i3, e3;
}
var t2 = "undefined" != typeof self ? self : global;
var i2 = "undefined" != typeof navigator;
var s2 = i2 && "undefined" == typeof HTMLImageElement;
var n2 = !("undefined" == typeof global || "undefined" == typeof process || !process.versions || !process.versions.node);
var r2 = t2.Buffer;
var a2 = t2.BigInt;
var o2 = !!r2;
var h2 = (e3) => f3(e3) ? void 0 : e3;
var l2 = (e3) => void 0 !== e3;
function f3(e3) {
  return void 0 === e3 || (e3 instanceof Map ? 0 === e3.size : 0 === Object.values(e3).filter(l2).length);
}
function u2(e3) {
  let t3 = new Error(e3);
  throw delete t3.stack, t3;
}
function d2(e3) {
  return "" === (e3 = (function(e4) {
    for (; e4.endsWith("\0"); ) e4 = e4.slice(0, -1);
    return e4;
  })(e3).trim()) ? void 0 : e3;
}
function c2(e3) {
  let t3 = (function(e4) {
    let t4 = 0;
    return e4.ifd0.enabled && (t4 += 1024), e4.exif.enabled && (t4 += 2048), e4.makerNote && (t4 += 2048), e4.userComment && (t4 += 1024), e4.gps.enabled && (t4 += 512), e4.interop.enabled && (t4 += 100), e4.ifd1.enabled && (t4 += 1024), t4 + 2048;
  })(e3);
  return e3.jfif.enabled && (t3 += 50), e3.xmp.enabled && (t3 += 2e4), e3.iptc.enabled && (t3 += 14e3), e3.icc.enabled && (t3 += 6e3), t3;
}
var g2 = (e3) => String.fromCharCode.apply(null, e3);
var p2 = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;
function m2(e3) {
  return p2 ? p2.decode(e3) : o2 ? Buffer.from(e3).toString("utf8") : decodeURIComponent(escape(g2(e3)));
}
var y2 = class _y {
  static from(e3, t3) {
    return e3 instanceof this && e3.le === t3 ? e3 : new _y(e3, void 0, void 0, t3);
  }
  constructor(e3, t3 = 0, i3, s3) {
    if ("boolean" == typeof s3 && (this.le = s3), Array.isArray(e3) && (e3 = new Uint8Array(e3)), 0 === e3) this.byteOffset = 0, this.byteLength = 0;
    else if (e3 instanceof ArrayBuffer) {
      void 0 === i3 && (i3 = e3.byteLength - t3);
      let s4 = new DataView(e3, t3, i3);
      this._swapDataView(s4);
    } else if (e3 instanceof Uint8Array || e3 instanceof DataView || e3 instanceof _y) {
      void 0 === i3 && (i3 = e3.byteLength - t3), (t3 += e3.byteOffset) + i3 > e3.byteOffset + e3.byteLength && u2("Creating view outside of available memory in ArrayBuffer");
      let s4 = new DataView(e3.buffer, t3, i3);
      this._swapDataView(s4);
    } else if ("number" == typeof e3) {
      let t4 = new DataView(new ArrayBuffer(e3));
      this._swapDataView(t4);
    } else u2("Invalid input argument for BufferView: " + e3);
  }
  _swapArrayBuffer(e3) {
    this._swapDataView(new DataView(e3));
  }
  _swapBuffer(e3) {
    this._swapDataView(new DataView(e3.buffer, e3.byteOffset, e3.byteLength));
  }
  _swapDataView(e3) {
    this.dataView = e3, this.buffer = e3.buffer, this.byteOffset = e3.byteOffset, this.byteLength = e3.byteLength;
  }
  _lengthToEnd(e3) {
    return this.byteLength - e3;
  }
  set(e3, t3, i3 = _y) {
    return e3 instanceof DataView || e3 instanceof _y ? e3 = new Uint8Array(e3.buffer, e3.byteOffset, e3.byteLength) : e3 instanceof ArrayBuffer && (e3 = new Uint8Array(e3)), e3 instanceof Uint8Array || u2("BufferView.set(): Invalid data argument."), this.toUint8().set(e3, t3), new i3(this, t3, e3.byteLength);
  }
  subarray(e3, t3) {
    return t3 = t3 || this._lengthToEnd(e3), new _y(this, e3, t3);
  }
  toUint8() {
    return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
  }
  getUint8Array(e3, t3) {
    return new Uint8Array(this.buffer, this.byteOffset + e3, t3);
  }
  getString(e3 = 0, t3 = this.byteLength) {
    return m2(this.getUint8Array(e3, t3));
  }
  getLatin1String(e3 = 0, t3 = this.byteLength) {
    let i3 = this.getUint8Array(e3, t3);
    return g2(i3);
  }
  getUnicodeString(e3 = 0, t3 = this.byteLength) {
    const i3 = [];
    for (let s3 = 0; s3 < t3 && e3 + s3 < this.byteLength; s3 += 2) i3.push(this.getUint16(e3 + s3));
    return g2(i3);
  }
  getInt8(e3) {
    return this.dataView.getInt8(e3);
  }
  getUint8(e3) {
    return this.dataView.getUint8(e3);
  }
  getInt16(e3, t3 = this.le) {
    return this.dataView.getInt16(e3, t3);
  }
  getInt32(e3, t3 = this.le) {
    return this.dataView.getInt32(e3, t3);
  }
  getUint16(e3, t3 = this.le) {
    return this.dataView.getUint16(e3, t3);
  }
  getUint32(e3, t3 = this.le) {
    return this.dataView.getUint32(e3, t3);
  }
  getFloat32(e3, t3 = this.le) {
    return this.dataView.getFloat32(e3, t3);
  }
  getFloat64(e3, t3 = this.le) {
    return this.dataView.getFloat64(e3, t3);
  }
  getFloat(e3, t3 = this.le) {
    return this.dataView.getFloat32(e3, t3);
  }
  getDouble(e3, t3 = this.le) {
    return this.dataView.getFloat64(e3, t3);
  }
  getUintBytes(e3, t3, i3) {
    switch (t3) {
      case 1:
        return this.getUint8(e3, i3);
      case 2:
        return this.getUint16(e3, i3);
      case 4:
        return this.getUint32(e3, i3);
      case 8:
        return this.getUint64 && this.getUint64(e3, i3);
    }
  }
  getUint(e3, t3, i3) {
    switch (t3) {
      case 8:
        return this.getUint8(e3, i3);
      case 16:
        return this.getUint16(e3, i3);
      case 32:
        return this.getUint32(e3, i3);
      case 64:
        return this.getUint64 && this.getUint64(e3, i3);
    }
  }
  toString(e3) {
    return this.dataView.toString(e3, this.constructor.name);
  }
  ensureChunk() {
  }
};
function b3(e3, t3) {
  u2(`${e3} '${t3}' was not loaded, try using full build of exifr.`);
}
var w2 = class extends Map {
  constructor(e3) {
    super(), this.kind = e3;
  }
  get(e3, t3) {
    return this.has(e3) || b3(this.kind, e3), t3 && (e3 in t3 || (function(e4, t4) {
      u2(`Unknown ${e4} '${t4}'.`);
    })(this.kind, e3), t3[e3].enabled || b3(this.kind, e3)), super.get(e3);
  }
  keyList() {
    return Array.from(this.keys());
  }
};
var S2 = new w2("file parser");
var k3 = new w2("segment parser");
var v3 = new w2("file reader");
var O2 = t2.fetch;
function x3(e3, t3) {
  return (s3 = e3).startsWith("data:") || s3.length > 1e4 ? P2(e3, t3, "base64") : n2 && e3.includes("://") ? C3(e3, t3, "url", A3) : n2 ? P2(e3, t3, "fs") : i2 ? C3(e3, t3, "url", A3) : void u2("Invalid input argument");
  var s3;
}
async function C3(e3, t3, i3, s3) {
  return v3.has(i3) ? P2(e3, t3, i3) : s3 ? (async function(e4, t4) {
    let i4 = await t4(e4);
    return new y2(i4);
  })(e3, s3) : void u2(`Parser ${i3} is not loaded`);
}
async function P2(e3, t3, i3) {
  let s3 = new (v3.get(i3))(e3, t3);
  return await s3.read(), s3;
}
var A3 = (e3) => O2(e3).then(((e4) => e4.arrayBuffer()));
var U2 = (e3) => new Promise(((t3, i3) => {
  let s3 = new FileReader();
  s3.onloadend = () => t3(s3.result || new ArrayBuffer()), s3.onerror = i3, s3.readAsArrayBuffer(e3);
}));
var I3 = class extends Map {
  get tagKeys() {
    return this.allKeys || (this.allKeys = Array.from(this.keys())), this.allKeys;
  }
  get tagValues() {
    return this.allValues || (this.allValues = Array.from(this.values())), this.allValues;
  }
};
function B2(e3, t3, i3) {
  let s3 = new I3();
  for (let [e4, t4] of i3) s3.set(e4, t4);
  if (Array.isArray(t3)) for (let i4 of t3) e3.set(i4, s3);
  else e3.set(t3, s3);
  return s3;
}
function F2(e3, t3, i3) {
  let s3, n3 = e3.get(t3);
  for (s3 of i3) n3.set(s3[0], s3[1]);
}
var L3 = /* @__PURE__ */ new Map();
var D2 = /* @__PURE__ */ new Map();
var T2 = /* @__PURE__ */ new Map();
var z2 = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"];
var N3 = ["jfif", "xmp", "icc", "iptc", "ihdr"];
var V2 = ["tiff", ...N3];
var M2 = ["ifd0", "ifd1", "exif", "gps", "interop"];
var E2 = [...V2, ...M2];
var R3 = ["makerNote", "userComment"];
var j3 = ["translateKeys", "translateValues", "reviveValues", "multiSegment"];
var G3 = [...j3, "sanitize", "mergeOutput", "silentErrors"];
var H2 = class {
  get translate() {
    return this.translateKeys || this.translateValues || this.reviveValues;
  }
};
var _2 = class extends H2 {
  get needed() {
    return this.enabled || this.deps.size > 0;
  }
  constructor(t3, i3, s3, n3) {
    if (super(), e2(this, "enabled", false), e2(this, "skip", /* @__PURE__ */ new Set()), e2(this, "pick", /* @__PURE__ */ new Set()), e2(this, "deps", /* @__PURE__ */ new Set()), e2(this, "translateKeys", false), e2(this, "translateValues", false), e2(this, "reviveValues", false), this.key = t3, this.enabled = i3, this.parse = this.enabled, this.applyInheritables(n3), this.canBeFiltered = M2.includes(t3), this.canBeFiltered && (this.dict = L3.get(t3)), void 0 !== s3) if (Array.isArray(s3)) this.parse = this.enabled = true, this.canBeFiltered && s3.length > 0 && this.translateTagSet(s3, this.pick);
    else if ("object" == typeof s3) {
      if (this.enabled = true, this.parse = false !== s3.parse, this.canBeFiltered) {
        let { pick: e3, skip: t4 } = s3;
        e3 && e3.length > 0 && this.translateTagSet(e3, this.pick), t4 && t4.length > 0 && this.translateTagSet(t4, this.skip);
      }
      this.applyInheritables(s3);
    } else true === s3 || false === s3 ? this.parse = this.enabled = s3 : u2(`Invalid options argument: ${s3}`);
  }
  applyInheritables(e3) {
    let t3, i3;
    for (t3 of j3) i3 = e3[t3], void 0 !== i3 && (this[t3] = i3);
  }
  translateTagSet(e3, t3) {
    if (this.dict) {
      let i3, s3, { tagKeys: n3, tagValues: r3 } = this.dict;
      for (i3 of e3) "string" == typeof i3 ? (s3 = r3.indexOf(i3), -1 === s3 && (s3 = n3.indexOf(Number(i3))), -1 !== s3 && t3.add(Number(n3[s3]))) : t3.add(i3);
    } else for (let i3 of e3) t3.add(i3);
  }
  finalizeFilters() {
    !this.enabled && this.deps.size > 0 ? (this.enabled = true, q3(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && q3(this.pick, this.deps);
  }
};
var W2 = { jfif: false, tiff: true, xmp: false, icc: false, iptc: false, ifd0: true, ifd1: false, exif: true, gps: true, interop: false, ihdr: void 0, makerNote: false, userComment: false, multiSegment: false, skip: [], pick: [], translateKeys: true, translateValues: true, reviveValues: true, sanitize: true, mergeOutput: true, silentErrors: true, chunked: true, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 };
var $3 = /* @__PURE__ */ new Map();
var K3 = class extends H2 {
  static useCached(e3) {
    let t3 = $3.get(e3);
    return void 0 !== t3 || (t3 = new this(e3), $3.set(e3, t3)), t3;
  }
  constructor(e3) {
    super(), true === e3 ? this.setupFromTrue() : void 0 === e3 ? this.setupFromUndefined() : Array.isArray(e3) ? this.setupFromArray(e3) : "object" == typeof e3 ? this.setupFromObject(e3) : u2(`Invalid options argument ${e3}`), void 0 === this.firstChunkSize && (this.firstChunkSize = i2 ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
  }
  setupFromUndefined() {
    let e3;
    for (e3 of z2) this[e3] = W2[e3];
    for (e3 of G3) this[e3] = W2[e3];
    for (e3 of R3) this[e3] = W2[e3];
    for (e3 of E2) this[e3] = new _2(e3, W2[e3], void 0, this);
  }
  setupFromTrue() {
    let e3;
    for (e3 of z2) this[e3] = W2[e3];
    for (e3 of G3) this[e3] = W2[e3];
    for (e3 of R3) this[e3] = true;
    for (e3 of E2) this[e3] = new _2(e3, true, void 0, this);
  }
  setupFromArray(e3) {
    let t3;
    for (t3 of z2) this[t3] = W2[t3];
    for (t3 of G3) this[t3] = W2[t3];
    for (t3 of R3) this[t3] = W2[t3];
    for (t3 of E2) this[t3] = new _2(t3, false, void 0, this);
    this.setupGlobalFilters(e3, void 0, M2);
  }
  setupFromObject(e3) {
    let t3;
    for (t3 of (M2.ifd0 = M2.ifd0 || M2.image, M2.ifd1 = M2.ifd1 || M2.thumbnail, Object.assign(this, e3), z2)) this[t3] = Y2(e3[t3], W2[t3]);
    for (t3 of G3) this[t3] = Y2(e3[t3], W2[t3]);
    for (t3 of R3) this[t3] = Y2(e3[t3], W2[t3]);
    for (t3 of V2) this[t3] = new _2(t3, W2[t3], e3[t3], this);
    for (t3 of M2) this[t3] = new _2(t3, W2[t3], e3[t3], this.tiff);
    this.setupGlobalFilters(e3.pick, e3.skip, M2, E2), true === e3.tiff ? this.batchEnableWithBool(M2, true) : false === e3.tiff ? this.batchEnableWithUserValue(M2, e3) : Array.isArray(e3.tiff) ? this.setupGlobalFilters(e3.tiff, void 0, M2) : "object" == typeof e3.tiff && this.setupGlobalFilters(e3.tiff.pick, e3.tiff.skip, M2);
  }
  batchEnableWithBool(e3, t3) {
    for (let i3 of e3) this[i3].enabled = t3;
  }
  batchEnableWithUserValue(e3, t3) {
    for (let i3 of e3) {
      let e4 = t3[i3];
      this[i3].enabled = false !== e4 && void 0 !== e4;
    }
  }
  setupGlobalFilters(e3, t3, i3, s3 = i3) {
    if (e3 && e3.length) {
      for (let e4 of s3) this[e4].enabled = false;
      let t4 = X2(e3, i3);
      for (let [e4, i4] of t4) q3(this[e4].pick, i4), this[e4].enabled = true;
    } else if (t3 && t3.length) {
      let e4 = X2(t3, i3);
      for (let [t4, i4] of e4) q3(this[t4].skip, i4);
    }
  }
  filterNestedSegmentTags() {
    let { ifd0: e3, exif: t3, xmp: i3, iptc: s3, icc: n3 } = this;
    this.makerNote ? t3.deps.add(37500) : t3.skip.add(37500), this.userComment ? t3.deps.add(37510) : t3.skip.add(37510), i3.enabled || e3.skip.add(700), s3.enabled || e3.skip.add(33723), n3.enabled || e3.skip.add(34675);
  }
  traverseTiffDependencyTree() {
    let { ifd0: e3, exif: t3, gps: i3, interop: s3 } = this;
    s3.needed && (t3.deps.add(40965), e3.deps.add(40965)), t3.needed && e3.deps.add(34665), i3.needed && e3.deps.add(34853), this.tiff.enabled = M2.some(((e4) => true === this[e4].enabled)) || this.makerNote || this.userComment;
    for (let e4 of M2) this[e4].finalizeFilters();
  }
  get onlyTiff() {
    return !N3.map(((e3) => this[e3].enabled)).some(((e3) => true === e3)) && this.tiff.enabled;
  }
  checkLoadedPlugins() {
    for (let e3 of V2) this[e3].enabled && !k3.has(e3) && b3("segment parser", e3);
  }
};
function X2(e3, t3) {
  let i3, s3, n3, r3, a3 = [];
  for (n3 of t3) {
    for (r3 of (i3 = L3.get(n3), s3 = [], i3)) (e3.includes(r3[0]) || e3.includes(r3[1])) && s3.push(r3[0]);
    s3.length && a3.push([n3, s3]);
  }
  return a3;
}
function Y2(e3, t3) {
  return void 0 !== e3 ? e3 : void 0 !== t3 ? t3 : void 0;
}
function q3(e3, t3) {
  for (let i3 of t3) e3.add(i3);
}
e2(K3, "default", W2);
var J3 = class {
  constructor(t3) {
    e2(this, "parsers", {}), e2(this, "output", {}), e2(this, "errors", []), e2(this, "pushToErrors", ((e3) => this.errors.push(e3))), this.options = K3.useCached(t3);
  }
  async read(e3) {
    this.file = await (function(e4, t3) {
      return "string" == typeof e4 ? x3(e4, t3) : i2 && !s2 && e4 instanceof HTMLImageElement ? x3(e4.src, t3) : e4 instanceof Uint8Array || e4 instanceof ArrayBuffer || e4 instanceof DataView ? new y2(e4) : i2 && e4 instanceof Blob ? C3(e4, t3, "blob", U2) : void u2("Invalid input argument");
    })(e3, this.options);
  }
  setup() {
    if (this.fileParser) return;
    let { file: e3 } = this, t3 = e3.getUint16(0);
    for (let [i3, s3] of S2) if (s3.canHandle(e3, t3)) return this.fileParser = new s3(this.options, this.file, this.parsers), e3[i3] = true;
    this.file.close && this.file.close(), u2("Unknown file format");
  }
  async parse() {
    let { output: e3, errors: t3 } = this;
    return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t3.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t3.length > 0 && (e3.errors = t3), h2(e3);
  }
  async executeParsers() {
    let { output: e3 } = this;
    await this.fileParser.parse();
    let t3 = Object.values(this.parsers).map((async (t4) => {
      let i3 = await t4.parse();
      t4.assignToOutput(e3, i3);
    }));
    this.options.silentErrors && (t3 = t3.map(((e4) => e4.catch(this.pushToErrors)))), await Promise.all(t3);
  }
  async extractThumbnail() {
    this.setup();
    let { options: e3, file: t3 } = this, i3 = k3.get("tiff", e3);
    var s3;
    if (t3.tiff ? s3 = { start: 0, type: "tiff" } : t3.jpeg && (s3 = await this.fileParser.getOrFindSegment("tiff")), void 0 === s3) return;
    let n3 = await this.fileParser.ensureSegmentChunk(s3), r3 = this.parsers.tiff = new i3(n3, e3, t3), a3 = await r3.extractThumbnail();
    return t3.close && t3.close(), a3;
  }
};
async function Z2(e3, t3) {
  let i3 = new J3(t3);
  return await i3.read(e3), i3.parse();
}
var Q2 = Object.freeze({ __proto__: null, parse: Z2, Exifr: J3, fileParsers: S2, segmentParsers: k3, fileReaders: v3, tagKeys: L3, tagValues: D2, tagRevivers: T2, createDictionary: B2, extendDictionary: F2, fetchUrlAsArrayBuffer: A3, readBlobAsArrayBuffer: U2, chunkedProps: z2, otherSegments: N3, segments: V2, tiffBlocks: M2, segmentsAndBlocks: E2, tiffExtractables: R3, inheritables: j3, allFormatters: G3, Options: K3 });
var ee2 = class {
  constructor(t3, i3, s3) {
    e2(this, "errors", []), e2(this, "ensureSegmentChunk", (async (e3) => {
      let t4 = e3.start, i4 = e3.size || 65536;
      if (this.file.chunked) if (this.file.available(t4, i4)) e3.chunk = this.file.subarray(t4, i4);
      else try {
        e3.chunk = await this.file.readChunk(t4, i4);
      } catch (t5) {
        u2(`Couldn't read segment: ${JSON.stringify(e3)}. ${t5.message}`);
      }
      else this.file.byteLength > t4 + i4 ? e3.chunk = this.file.subarray(t4, i4) : void 0 === e3.size ? e3.chunk = this.file.subarray(t4) : u2("Segment unreachable: " + JSON.stringify(e3));
      return e3.chunk;
    })), this.extendOptions && this.extendOptions(t3), this.options = t3, this.file = i3, this.parsers = s3;
  }
  injectSegment(e3, t3) {
    this.options[e3].enabled && this.createParser(e3, t3);
  }
  createParser(e3, t3) {
    let i3 = new (k3.get(e3))(t3, this.options, this.file);
    return this.parsers[e3] = i3;
  }
  createParsers(e3) {
    for (let t3 of e3) {
      let { type: e4, chunk: i3 } = t3, s3 = this.options[e4];
      if (s3 && s3.enabled) {
        let t4 = this.parsers[e4];
        t4 && t4.append || t4 || this.createParser(e4, i3);
      }
    }
  }
  async readSegments(e3) {
    let t3 = e3.map(this.ensureSegmentChunk);
    await Promise.all(t3);
  }
};
var te2 = class {
  static findPosition(e3, t3) {
    let i3 = e3.getUint16(t3 + 2) + 2, s3 = "function" == typeof this.headerLength ? this.headerLength(e3, t3, i3) : this.headerLength, n3 = t3 + s3, r3 = i3 - s3;
    return { offset: t3, length: i3, headerLength: s3, start: n3, size: r3, end: n3 + r3 };
  }
  static parse(e3, t3 = {}) {
    return new this(e3, new K3({ [this.type]: t3 }), e3).parse();
  }
  normalizeInput(e3) {
    return e3 instanceof y2 ? e3 : new y2(e3);
  }
  constructor(t3, i3 = {}, s3) {
    e2(this, "errors", []), e2(this, "raw", /* @__PURE__ */ new Map()), e2(this, "handleError", ((e3) => {
      if (!this.options.silentErrors) throw e3;
      this.errors.push(e3.message);
    })), this.chunk = this.normalizeInput(t3), this.file = s3, this.type = this.constructor.type, this.globalOptions = this.options = i3, this.localOptions = i3[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
  }
  translate() {
    this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
  }
  get output() {
    return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
  }
  translateBlock(e3, t3) {
    let i3 = T2.get(t3), s3 = D2.get(t3), n3 = L3.get(t3), r3 = this.options[t3], a3 = r3.reviveValues && !!i3, o3 = r3.translateValues && !!s3, h3 = r3.translateKeys && !!n3, l3 = {};
    for (let [t4, r4] of e3) a3 && i3.has(t4) ? r4 = i3.get(t4)(r4) : o3 && s3.has(t4) && (r4 = this.translateValue(r4, s3.get(t4))), h3 && n3.has(t4) && (t4 = n3.get(t4) || t4), l3[t4] = r4;
    return l3;
  }
  translateValue(e3, t3) {
    return t3[e3] || t3.DEFAULT || e3;
  }
  assignToOutput(e3, t3) {
    this.assignObjectToOutput(e3, this.constructor.type, t3);
  }
  assignObjectToOutput(e3, t3, i3) {
    if (this.globalOptions.mergeOutput) return Object.assign(e3, i3);
    e3[t3] ? Object.assign(e3[t3], i3) : e3[t3] = i3;
  }
};
e2(te2, "headerLength", 4), e2(te2, "type", void 0), e2(te2, "multiSegment", false), e2(te2, "canHandle", (() => false));
function ie2(e3) {
  return 192 === e3 || 194 === e3 || 196 === e3 || 219 === e3 || 221 === e3 || 218 === e3 || 254 === e3;
}
function se2(e3) {
  return e3 >= 224 && e3 <= 239;
}
function ne2(e3, t3, i3) {
  for (let [s3, n3] of k3) if (n3.canHandle(e3, t3, i3)) return s3;
}
var re2 = class extends ee2 {
  constructor(...t3) {
    super(...t3), e2(this, "appSegments", []), e2(this, "jpegSegments", []), e2(this, "unknownSegments", []);
  }
  static canHandle(e3, t3) {
    return 65496 === t3;
  }
  async parse() {
    await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
  }
  setupSegmentFinderArgs(e3) {
    true === e3 ? (this.findAll = true, this.wanted = new Set(k3.keyList())) : (e3 = void 0 === e3 ? k3.keyList().filter(((e4) => this.options[e4].enabled)) : e3.filter(((e4) => this.options[e4].enabled && k3.has(e4))), this.findAll = false, this.remaining = new Set(e3), this.wanted = new Set(e3)), this.unfinishedMultiSegment = false;
  }
  async findAppSegments(e3 = 0, t3) {
    this.setupSegmentFinderArgs(t3);
    let { file: i3, findAll: s3, wanted: n3, remaining: r3 } = this;
    if (!s3 && this.file.chunked && (s3 = Array.from(n3).some(((e4) => {
      let t4 = k3.get(e4), i4 = this.options[e4];
      return t4.multiSegment && i4.multiSegment;
    })), s3 && await this.file.readWhole()), e3 = this.findAppSegmentsInRange(e3, i3.byteLength), !this.options.onlyTiff && i3.chunked) {
      let t4 = false;
      for (; r3.size > 0 && !t4 && (i3.canReadNextChunk || this.unfinishedMultiSegment); ) {
        let { nextChunkOffset: s4 } = i3, n4 = this.appSegments.some(((e4) => !this.file.available(e4.offset || e4.start, e4.length || e4.size)));
        if (t4 = e3 > s4 && !n4 ? !await i3.readNextChunk(e3) : !await i3.readNextChunk(s4), void 0 === (e3 = this.findAppSegmentsInRange(e3, i3.byteLength))) return;
      }
    }
  }
  findAppSegmentsInRange(e3, t3) {
    t3 -= 2;
    let i3, s3, n3, r3, a3, o3, { file: h3, findAll: l3, wanted: f4, remaining: u3, options: d3 } = this;
    for (; e3 < t3; e3++) if (255 === h3.getUint8(e3)) {
      if (i3 = h3.getUint8(e3 + 1), se2(i3)) {
        if (s3 = h3.getUint16(e3 + 2), n3 = ne2(h3, e3, s3), n3 && f4.has(n3) && (r3 = k3.get(n3), a3 = r3.findPosition(h3, e3), o3 = d3[n3], a3.type = n3, this.appSegments.push(a3), !l3 && (r3.multiSegment && o3.multiSegment ? (this.unfinishedMultiSegment = a3.chunkNumber < a3.chunkCount, this.unfinishedMultiSegment || u3.delete(n3)) : u3.delete(n3), 0 === u3.size))) break;
        d3.recordUnknownSegments && (a3 = te2.findPosition(h3, e3), a3.marker = i3, this.unknownSegments.push(a3)), e3 += s3 + 1;
      } else if (ie2(i3)) {
        if (s3 = h3.getUint16(e3 + 2), 218 === i3 && false !== d3.stopAfterSos) return;
        d3.recordJpegSegments && this.jpegSegments.push({ offset: e3, length: s3, marker: i3 }), e3 += s3 + 1;
      }
    }
    return e3;
  }
  mergeMultiSegments() {
    if (!this.appSegments.some(((e4) => e4.multiSegment))) return;
    let e3 = (function(e4, t3) {
      let i3, s3, n3, r3 = /* @__PURE__ */ new Map();
      for (let a3 = 0; a3 < e4.length; a3++) i3 = e4[a3], s3 = i3[t3], r3.has(s3) ? n3 = r3.get(s3) : r3.set(s3, n3 = []), n3.push(i3);
      return Array.from(r3);
    })(this.appSegments, "type");
    this.mergedAppSegments = e3.map((([e4, t3]) => {
      let i3 = k3.get(e4, this.options);
      if (i3.handleMultiSegments) {
        return { type: e4, chunk: i3.handleMultiSegments(t3) };
      }
      return t3[0];
    }));
  }
  getSegment(e3) {
    return this.appSegments.find(((t3) => t3.type === e3));
  }
  async getOrFindSegment(e3) {
    let t3 = this.getSegment(e3);
    return void 0 === t3 && (await this.findAppSegments(0, [e3]), t3 = this.getSegment(e3)), t3;
  }
};
e2(re2, "type", "jpeg"), S2.set("jpeg", re2);
var ae = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
var oe2 = class extends te2 {
  parseHeader() {
    var e3 = this.chunk.getUint16();
    18761 === e3 ? this.le = true : 19789 === e3 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
  }
  parseTags(e3, t3, i3 = /* @__PURE__ */ new Map()) {
    let { pick: s3, skip: n3 } = this.options[t3];
    s3 = new Set(s3);
    let r3 = s3.size > 0, a3 = 0 === n3.size, o3 = this.chunk.getUint16(e3);
    e3 += 2;
    for (let h3 = 0; h3 < o3; h3++) {
      let o4 = this.chunk.getUint16(e3);
      if (r3) {
        if (s3.has(o4) && (i3.set(o4, this.parseTag(e3, o4, t3)), s3.delete(o4), 0 === s3.size)) break;
      } else !a3 && n3.has(o4) || i3.set(o4, this.parseTag(e3, o4, t3));
      e3 += 12;
    }
    return i3;
  }
  parseTag(e3, t3, i3) {
    let { chunk: s3 } = this, n3 = s3.getUint16(e3 + 2), r3 = s3.getUint32(e3 + 4), a3 = ae[n3];
    if (a3 * r3 <= 4 ? e3 += 8 : e3 = s3.getUint32(e3 + 8), (n3 < 1 || n3 > 13) && u2(`Invalid TIFF value type. block: ${i3.toUpperCase()}, tag: ${t3.toString(16)}, type: ${n3}, offset ${e3}`), e3 > s3.byteLength && u2(`Invalid TIFF value offset. block: ${i3.toUpperCase()}, tag: ${t3.toString(16)}, type: ${n3}, offset ${e3} is outside of chunk size ${s3.byteLength}`), 1 === n3) return s3.getUint8Array(e3, r3);
    if (2 === n3) return d2(s3.getString(e3, r3));
    if (7 === n3) return s3.getUint8Array(e3, r3);
    if (1 === r3) return this.parseTagValue(n3, e3);
    {
      let t4 = new ((function(e4) {
        switch (e4) {
          case 1:
            return Uint8Array;
          case 3:
            return Uint16Array;
          case 4:
            return Uint32Array;
          case 5:
            return Array;
          case 6:
            return Int8Array;
          case 8:
            return Int16Array;
          case 9:
            return Int32Array;
          case 10:
            return Array;
          case 11:
            return Float32Array;
          case 12:
            return Float64Array;
          default:
            return Array;
        }
      })(n3))(r3), i4 = a3;
      for (let s4 = 0; s4 < r3; s4++) t4[s4] = this.parseTagValue(n3, e3), e3 += i4;
      return t4;
    }
  }
  parseTagValue(e3, t3) {
    let { chunk: i3 } = this;
    switch (e3) {
      case 1:
        return i3.getUint8(t3);
      case 3:
        return i3.getUint16(t3);
      case 4:
        return i3.getUint32(t3);
      case 5:
        return i3.getUint32(t3) / i3.getUint32(t3 + 4);
      case 6:
        return i3.getInt8(t3);
      case 8:
        return i3.getInt16(t3);
      case 9:
        return i3.getInt32(t3);
      case 10:
        return i3.getInt32(t3) / i3.getInt32(t3 + 4);
      case 11:
        return i3.getFloat(t3);
      case 12:
        return i3.getDouble(t3);
      case 13:
        return i3.getUint32(t3);
      default:
        u2(`Invalid tiff type ${e3}`);
    }
  }
};
var he2 = class extends oe2 {
  static canHandle(e3, t3) {
    return 225 === e3.getUint8(t3 + 1) && 1165519206 === e3.getUint32(t3 + 4) && 0 === e3.getUint16(t3 + 8);
  }
  async parse() {
    this.parseHeader();
    let { options: e3 } = this;
    return e3.ifd0.enabled && await this.parseIfd0Block(), e3.exif.enabled && await this.safeParse("parseExifBlock"), e3.gps.enabled && await this.safeParse("parseGpsBlock"), e3.interop.enabled && await this.safeParse("parseInteropBlock"), e3.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
  }
  safeParse(e3) {
    let t3 = this[e3]();
    return void 0 !== t3.catch && (t3 = t3.catch(this.handleError)), t3;
  }
  findIfd0Offset() {
    void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4));
  }
  findIfd1Offset() {
    if (void 0 === this.ifd1Offset) {
      this.findIfd0Offset();
      let e3 = this.chunk.getUint16(this.ifd0Offset), t3 = this.ifd0Offset + 2 + 12 * e3;
      this.ifd1Offset = this.chunk.getUint32(t3);
    }
  }
  parseBlock(e3, t3) {
    let i3 = /* @__PURE__ */ new Map();
    return this[t3] = i3, this.parseTags(e3, t3, i3), i3;
  }
  async parseIfd0Block() {
    if (this.ifd0) return;
    let { file: e3 } = this;
    this.findIfd0Offset(), this.ifd0Offset < 8 && u2("Malformed EXIF data"), !e3.chunked && this.ifd0Offset > e3.byteLength && u2(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e3.byteLength}`), e3.tiff && await e3.ensureChunk(this.ifd0Offset, c2(this.options));
    let t3 = this.parseBlock(this.ifd0Offset, "ifd0");
    return 0 !== t3.size ? (this.exifOffset = t3.get(34665), this.interopOffset = t3.get(40965), this.gpsOffset = t3.get(34853), this.xmp = t3.get(700), this.iptc = t3.get(33723), this.icc = t3.get(34675), this.options.sanitize && (t3.delete(34665), t3.delete(40965), t3.delete(34853), t3.delete(700), t3.delete(33723), t3.delete(34675)), t3) : void 0;
  }
  async parseExifBlock() {
    if (this.exif) return;
    if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.exifOffset) return;
    this.file.tiff && await this.file.ensureChunk(this.exifOffset, c2(this.options));
    let e3 = this.parseBlock(this.exifOffset, "exif");
    return this.interopOffset || (this.interopOffset = e3.get(40965)), this.makerNote = e3.get(37500), this.userComment = e3.get(37510), this.options.sanitize && (e3.delete(40965), e3.delete(37500), e3.delete(37510)), this.unpack(e3, 41728), this.unpack(e3, 41729), e3;
  }
  unpack(e3, t3) {
    let i3 = e3.get(t3);
    i3 && 1 === i3.length && e3.set(t3, i3[0]);
  }
  async parseGpsBlock() {
    if (this.gps) return;
    if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.gpsOffset) return;
    let e3 = this.parseBlock(this.gpsOffset, "gps");
    return e3 && e3.has(2) && e3.has(4) && (e3.set("latitude", le2(...e3.get(2), e3.get(1))), e3.set("longitude", le2(...e3.get(4), e3.get(3)))), e3;
  }
  async parseInteropBlock() {
    if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), void 0 !== this.interopOffset || this.exif || await this.parseExifBlock(), void 0 !== this.interopOffset)) return this.parseBlock(this.interopOffset, "interop");
  }
  async parseThumbnailBlock(e3 = false) {
    if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e3)) return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
  }
  async extractThumbnail() {
    if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), void 0 === this.ifd1) return;
    let e3 = this.ifd1.get(513), t3 = this.ifd1.get(514);
    return this.chunk.getUint8Array(e3, t3);
  }
  get image() {
    return this.ifd0;
  }
  get thumbnail() {
    return this.ifd1;
  }
  createOutput() {
    let e3, t3, i3, s3 = {};
    for (t3 of M2) if (e3 = this[t3], !f3(e3)) if (i3 = this.canTranslate ? this.translateBlock(e3, t3) : Object.fromEntries(e3), this.options.mergeOutput) {
      if ("ifd1" === t3) continue;
      Object.assign(s3, i3);
    } else s3[t3] = i3;
    return this.makerNote && (s3.makerNote = this.makerNote), this.userComment && (s3.userComment = this.userComment), s3;
  }
  assignToOutput(e3, t3) {
    if (this.globalOptions.mergeOutput) Object.assign(e3, t3);
    else for (let [i3, s3] of Object.entries(t3)) this.assignObjectToOutput(e3, i3, s3);
  }
};
function le2(e3, t3, i3, s3) {
  var n3 = e3 + t3 / 60 + i3 / 3600;
  return "S" !== s3 && "W" !== s3 || (n3 *= -1), n3;
}
e2(he2, "type", "tiff"), e2(he2, "headerLength", 10), k3.set("tiff", he2);
var fe2 = Object.freeze({ __proto__: null, default: Q2, Exifr: J3, fileParsers: S2, segmentParsers: k3, fileReaders: v3, tagKeys: L3, tagValues: D2, tagRevivers: T2, createDictionary: B2, extendDictionary: F2, fetchUrlAsArrayBuffer: A3, readBlobAsArrayBuffer: U2, chunkedProps: z2, otherSegments: N3, segments: V2, tiffBlocks: M2, segmentsAndBlocks: E2, tiffExtractables: R3, inheritables: j3, allFormatters: G3, Options: K3, parse: Z2 });
var ue2 = { ifd0: false, ifd1: false, exif: false, gps: false, interop: false, sanitize: false, reviveValues: true, translateKeys: false, translateValues: false, mergeOutput: false };
var de2 = Object.assign({}, ue2, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
async function ce2(e3) {
  let t3 = new J3(de2);
  await t3.read(e3);
  let i3 = await t3.parse();
  if (i3 && i3.gps) {
    let { latitude: e4, longitude: t4 } = i3.gps;
    return { latitude: e4, longitude: t4 };
  }
}
var ge2 = Object.assign({}, ue2, { tiff: false, ifd1: true, mergeOutput: false });
async function pe2(e3) {
  let t3 = new J3(ge2);
  await t3.read(e3);
  let i3 = await t3.extractThumbnail();
  return i3 && o2 ? r2.from(i3) : i3;
}
async function me2(e3) {
  let t3 = await this.thumbnail(e3);
  if (void 0 !== t3) {
    let e4 = new Blob([t3]);
    return URL.createObjectURL(e4);
  }
}
var ye2 = Object.assign({}, ue2, { firstChunkSize: 4e4, ifd0: [274] });
async function be2(e3) {
  let t3 = new J3(ye2);
  await t3.read(e3);
  let i3 = await t3.parse();
  if (i3 && i3.ifd0) return i3.ifd0[274];
}
var we2 = Object.freeze({ 1: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
var Se2 = true;
var ke2 = true;
if ("object" == typeof navigator) {
  let e3 = navigator.userAgent;
  if (e3.includes("iPad") || e3.includes("iPhone")) {
    let t3 = e3.match(/OS (\d+)_(\d+)/);
    if (t3) {
      let [, e4, i3] = t3, s3 = Number(e4) + 0.1 * Number(i3);
      Se2 = s3 < 13.4, ke2 = false;
    }
  } else if (e3.includes("OS X 10")) {
    let [, t3] = e3.match(/OS X 10[_.](\d+)/);
    Se2 = ke2 = Number(t3) < 15;
  }
  if (e3.includes("Chrome/")) {
    let [, t3] = e3.match(/Chrome\/(\d+)/);
    Se2 = ke2 = Number(t3) < 81;
  } else if (e3.includes("Firefox/")) {
    let [, t3] = e3.match(/Firefox\/(\d+)/);
    Se2 = ke2 = Number(t3) < 77;
  }
}
async function ve2(e3) {
  let t3 = await be2(e3);
  return Object.assign({ canvas: Se2, css: ke2 }, we2[t3]);
}
var Oe2 = class extends y2 {
  constructor(...t3) {
    super(...t3), e2(this, "ranges", new xe2()), 0 !== this.byteLength && this.ranges.add(0, this.byteLength);
  }
  _tryExtend(e3, t3, i3) {
    if (0 === e3 && 0 === this.byteLength && i3) {
      let e4 = new DataView(i3.buffer || i3, i3.byteOffset, i3.byteLength);
      this._swapDataView(e4);
    } else {
      let i4 = e3 + t3;
      if (i4 > this.byteLength) {
        let { dataView: e4 } = this._extend(i4);
        this._swapDataView(e4);
      }
    }
  }
  _extend(e3) {
    let t3;
    t3 = o2 ? r2.allocUnsafe(e3) : new Uint8Array(e3);
    let i3 = new DataView(t3.buffer, t3.byteOffset, t3.byteLength);
    return t3.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), { uintView: t3, dataView: i3 };
  }
  subarray(e3, t3, i3 = false) {
    return t3 = t3 || this._lengthToEnd(e3), i3 && this._tryExtend(e3, t3), this.ranges.add(e3, t3), super.subarray(e3, t3);
  }
  set(e3, t3, i3 = false) {
    i3 && this._tryExtend(t3, e3.byteLength, e3);
    let s3 = super.set(e3, t3);
    return this.ranges.add(t3, s3.byteLength), s3;
  }
  async ensureChunk(e3, t3) {
    this.chunked && (this.ranges.available(e3, t3) || await this.readChunk(e3, t3));
  }
  available(e3, t3) {
    return this.ranges.available(e3, t3);
  }
};
var xe2 = class {
  constructor() {
    e2(this, "list", []);
  }
  get length() {
    return this.list.length;
  }
  add(e3, t3, i3 = 0) {
    let s3 = e3 + t3, n3 = this.list.filter(((t4) => Ce2(e3, t4.offset, s3) || Ce2(e3, t4.end, s3)));
    if (n3.length > 0) {
      e3 = Math.min(e3, ...n3.map(((e4) => e4.offset))), s3 = Math.max(s3, ...n3.map(((e4) => e4.end))), t3 = s3 - e3;
      let i4 = n3.shift();
      i4.offset = e3, i4.length = t3, i4.end = s3, this.list = this.list.filter(((e4) => !n3.includes(e4)));
    } else this.list.push({ offset: e3, length: t3, end: s3 });
  }
  available(e3, t3) {
    let i3 = e3 + t3;
    return this.list.some(((t4) => t4.offset <= e3 && i3 <= t4.end));
  }
};
function Ce2(e3, t3, i3) {
  return e3 <= t3 && t3 <= i3;
}
var Pe2 = class extends Oe2 {
  constructor(t3, i3) {
    super(0), e2(this, "chunksRead", 0), this.input = t3, this.options = i3;
  }
  async readWhole() {
    this.chunked = false, await this.readChunk(this.nextChunkOffset);
  }
  async readChunked() {
    this.chunked = true, await this.readChunk(0, this.options.firstChunkSize);
  }
  async readNextChunk(e3 = this.nextChunkOffset) {
    if (this.fullyRead) return this.chunksRead++, false;
    let t3 = this.options.chunkSize, i3 = await this.readChunk(e3, t3);
    return !!i3 && i3.byteLength === t3;
  }
  async readChunk(e3, t3) {
    if (this.chunksRead++, 0 !== (t3 = this.safeWrapAddress(e3, t3))) return this._readChunk(e3, t3);
  }
  safeWrapAddress(e3, t3) {
    return void 0 !== this.size && e3 + t3 > this.size ? Math.max(0, this.size - e3) : t3;
  }
  get nextChunkOffset() {
    if (0 !== this.ranges.list.length) return this.ranges.list[0].length;
  }
  get canReadNextChunk() {
    return this.chunksRead < this.options.chunkLimit;
  }
  get fullyRead() {
    return void 0 !== this.size && this.nextChunkOffset === this.size;
  }
  read() {
    return this.options.chunked ? this.readChunked() : this.readWhole();
  }
  close() {
  }
};
v3.set("blob", class extends Pe2 {
  async readWhole() {
    this.chunked = false;
    let e3 = await U2(this.input);
    this._swapArrayBuffer(e3);
  }
  readChunked() {
    return this.chunked = true, this.size = this.input.size, super.readChunked();
  }
  async _readChunk(e3, t3) {
    let i3 = t3 ? e3 + t3 : void 0, s3 = this.input.slice(e3, i3), n3 = await U2(s3);
    return this.set(n3, e3, true);
  }
});
var Ae2 = Object.freeze({ __proto__: null, default: fe2, Exifr: J3, fileParsers: S2, segmentParsers: k3, fileReaders: v3, tagKeys: L3, tagValues: D2, tagRevivers: T2, createDictionary: B2, extendDictionary: F2, fetchUrlAsArrayBuffer: A3, readBlobAsArrayBuffer: U2, chunkedProps: z2, otherSegments: N3, segments: V2, tiffBlocks: M2, segmentsAndBlocks: E2, tiffExtractables: R3, inheritables: j3, allFormatters: G3, Options: K3, parse: Z2, gpsOnlyOptions: de2, gps: ce2, thumbnailOnlyOptions: ge2, thumbnail: pe2, thumbnailUrl: me2, orientationOnlyOptions: ye2, orientation: be2, rotations: we2, get rotateCanvas() {
  return Se2;
}, get rotateCss() {
  return ke2;
}, rotation: ve2 });
v3.set("url", class extends Pe2 {
  async readWhole() {
    this.chunked = false;
    let e3 = await A3(this.input);
    e3 instanceof ArrayBuffer ? this._swapArrayBuffer(e3) : e3 instanceof Uint8Array && this._swapBuffer(e3);
  }
  async _readChunk(e3, t3) {
    let i3 = t3 ? e3 + t3 - 1 : void 0, s3 = this.options.httpHeaders || {};
    (e3 || i3) && (s3.range = `bytes=${[e3, i3].join("-")}`);
    let n3 = await O2(this.input, { headers: s3 }), r3 = await n3.arrayBuffer(), a3 = r3.byteLength;
    if (416 !== n3.status) return a3 !== t3 && (this.size = e3 + a3), this.set(r3, e3, true);
  }
});
y2.prototype.getUint64 = function(e3) {
  let t3 = this.getUint32(e3), i3 = this.getUint32(e3 + 4);
  return t3 < 1048575 ? t3 << 32 | i3 : void 0 !== typeof a2 ? (console.warn("Using BigInt because of type 64uint but JS can only handle 53b numbers."), a2(t3) << a2(32) | a2(i3)) : void u2("Trying to read 64b value but JS can only handle 53b numbers.");
};
var Ue2 = class extends ee2 {
  parseBoxes(e3 = 0) {
    let t3 = [];
    for (; e3 < this.file.byteLength - 4; ) {
      let i3 = this.parseBoxHead(e3);
      if (t3.push(i3), 0 === i3.length) break;
      e3 += i3.length;
    }
    return t3;
  }
  parseSubBoxes(e3) {
    e3.boxes = this.parseBoxes(e3.start);
  }
  findBox(e3, t3) {
    return void 0 === e3.boxes && this.parseSubBoxes(e3), e3.boxes.find(((e4) => e4.kind === t3));
  }
  parseBoxHead(e3) {
    let t3 = this.file.getUint32(e3), i3 = this.file.getString(e3 + 4, 4), s3 = e3 + 8;
    return 1 === t3 && (t3 = this.file.getUint64(e3 + 8), s3 += 8), { offset: e3, length: t3, kind: i3, start: s3 };
  }
  parseBoxFullHead(e3) {
    if (void 0 !== e3.version) return;
    let t3 = this.file.getUint32(e3.start);
    e3.version = t3 >> 24, e3.start += 4;
  }
};
var Ie2 = class extends Ue2 {
  static canHandle(e3, t3) {
    if (0 !== t3) return false;
    let i3 = e3.getUint16(2);
    if (i3 > 50) return false;
    let s3 = 16, n3 = [];
    for (; s3 < i3; ) n3.push(e3.getString(s3, 4)), s3 += 4;
    return n3.includes(this.type);
  }
  async parse() {
    let e3 = this.file.getUint32(0), t3 = this.parseBoxHead(e3);
    for (; "meta" !== t3.kind; ) e3 += t3.length, await this.file.ensureChunk(e3, 16), t3 = this.parseBoxHead(e3);
    await this.file.ensureChunk(t3.offset, t3.length), this.parseBoxFullHead(t3), this.parseSubBoxes(t3), this.options.icc.enabled && await this.findIcc(t3), this.options.tiff.enabled && await this.findExif(t3);
  }
  async registerSegment(e3, t3, i3) {
    await this.file.ensureChunk(t3, i3);
    let s3 = this.file.subarray(t3, i3);
    this.createParser(e3, s3);
  }
  async findIcc(e3) {
    let t3 = this.findBox(e3, "iprp");
    if (void 0 === t3) return;
    let i3 = this.findBox(t3, "ipco");
    if (void 0 === i3) return;
    let s3 = this.findBox(i3, "colr");
    void 0 !== s3 && await this.registerSegment("icc", s3.offset + 12, s3.length);
  }
  async findExif(e3) {
    let t3 = this.findBox(e3, "iinf");
    if (void 0 === t3) return;
    let i3 = this.findBox(e3, "iloc");
    if (void 0 === i3) return;
    let s3 = this.findExifLocIdInIinf(t3), n3 = this.findExtentInIloc(i3, s3);
    if (void 0 === n3) return;
    let [r3, a3] = n3;
    await this.file.ensureChunk(r3, a3);
    let o3 = 4 + this.file.getUint32(r3);
    r3 += o3, a3 -= o3, await this.registerSegment("tiff", r3, a3);
  }
  findExifLocIdInIinf(e3) {
    this.parseBoxFullHead(e3);
    let t3, i3, s3, n3, r3 = e3.start, a3 = this.file.getUint16(r3);
    for (r3 += 2; a3--; ) {
      if (t3 = this.parseBoxHead(r3), this.parseBoxFullHead(t3), i3 = t3.start, t3.version >= 2 && (s3 = 3 === t3.version ? 4 : 2, n3 = this.file.getString(i3 + s3 + 2, 4), "Exif" === n3)) return this.file.getUintBytes(i3, s3);
      r3 += t3.length;
    }
  }
  get8bits(e3) {
    let t3 = this.file.getUint8(e3);
    return [t3 >> 4, 15 & t3];
  }
  findExtentInIloc(e3, t3) {
    this.parseBoxFullHead(e3);
    let i3 = e3.start, [s3, n3] = this.get8bits(i3++), [r3, a3] = this.get8bits(i3++), o3 = 2 === e3.version ? 4 : 2, h3 = 1 === e3.version || 2 === e3.version ? 2 : 0, l3 = a3 + s3 + n3, f4 = 2 === e3.version ? 4 : 2, u3 = this.file.getUintBytes(i3, f4);
    for (i3 += f4; u3--; ) {
      let e4 = this.file.getUintBytes(i3, o3);
      i3 += o3 + h3 + 2 + r3;
      let f5 = this.file.getUint16(i3);
      if (i3 += 2, e4 === t3) return f5 > 1 && console.warn("ILOC box has more than one extent but we're only processing one\nPlease create an issue at https://github.com/MikeKovarik/exifr with this file"), [this.file.getUintBytes(i3 + a3, s3), this.file.getUintBytes(i3 + a3 + s3, n3)];
      i3 += f5 * l3;
    }
  }
};
var Be2 = class extends Ie2 {
};
e2(Be2, "type", "heic");
var Fe2 = class extends Ie2 {
};
e2(Fe2, "type", "avif"), S2.set("heic", Be2), S2.set("avif", Fe2), B2(L3, ["ifd0", "ifd1"], [[256, "ImageWidth"], [257, "ImageHeight"], [258, "BitsPerSample"], [259, "Compression"], [262, "PhotometricInterpretation"], [270, "ImageDescription"], [271, "Make"], [272, "Model"], [273, "StripOffsets"], [274, "Orientation"], [277, "SamplesPerPixel"], [278, "RowsPerStrip"], [279, "StripByteCounts"], [282, "XResolution"], [283, "YResolution"], [284, "PlanarConfiguration"], [296, "ResolutionUnit"], [301, "TransferFunction"], [305, "Software"], [306, "ModifyDate"], [315, "Artist"], [316, "HostComputer"], [317, "Predictor"], [318, "WhitePoint"], [319, "PrimaryChromaticities"], [513, "ThumbnailOffset"], [514, "ThumbnailLength"], [529, "YCbCrCoefficients"], [530, "YCbCrSubSampling"], [531, "YCbCrPositioning"], [532, "ReferenceBlackWhite"], [700, "ApplicationNotes"], [33432, "Copyright"], [33723, "IPTC"], [34665, "ExifIFD"], [34675, "ICC"], [34853, "GpsIFD"], [330, "SubIFD"], [40965, "InteropIFD"], [40091, "XPTitle"], [40092, "XPComment"], [40093, "XPAuthor"], [40094, "XPKeywords"], [40095, "XPSubject"]]), B2(L3, "exif", [[33434, "ExposureTime"], [33437, "FNumber"], [34850, "ExposureProgram"], [34852, "SpectralSensitivity"], [34855, "ISO"], [34858, "TimeZoneOffset"], [34859, "SelfTimerMode"], [34864, "SensitivityType"], [34865, "StandardOutputSensitivity"], [34866, "RecommendedExposureIndex"], [34867, "ISOSpeed"], [34868, "ISOSpeedLatitudeyyy"], [34869, "ISOSpeedLatitudezzz"], [36864, "ExifVersion"], [36867, "DateTimeOriginal"], [36868, "CreateDate"], [36873, "GooglePlusUploadCode"], [36880, "OffsetTime"], [36881, "OffsetTimeOriginal"], [36882, "OffsetTimeDigitized"], [37121, "ComponentsConfiguration"], [37122, "CompressedBitsPerPixel"], [37377, "ShutterSpeedValue"], [37378, "ApertureValue"], [37379, "BrightnessValue"], [37380, "ExposureCompensation"], [37381, "MaxApertureValue"], [37382, "SubjectDistance"], [37383, "MeteringMode"], [37384, "LightSource"], [37385, "Flash"], [37386, "FocalLength"], [37393, "ImageNumber"], [37394, "SecurityClassification"], [37395, "ImageHistory"], [37396, "SubjectArea"], [37500, "MakerNote"], [37510, "UserComment"], [37520, "SubSecTime"], [37521, "SubSecTimeOriginal"], [37522, "SubSecTimeDigitized"], [37888, "AmbientTemperature"], [37889, "Humidity"], [37890, "Pressure"], [37891, "WaterDepth"], [37892, "Acceleration"], [37893, "CameraElevationAngle"], [40960, "FlashpixVersion"], [40961, "ColorSpace"], [40962, "ExifImageWidth"], [40963, "ExifImageHeight"], [40964, "RelatedSoundFile"], [41483, "FlashEnergy"], [41486, "FocalPlaneXResolution"], [41487, "FocalPlaneYResolution"], [41488, "FocalPlaneResolutionUnit"], [41492, "SubjectLocation"], [41493, "ExposureIndex"], [41495, "SensingMethod"], [41728, "FileSource"], [41729, "SceneType"], [41730, "CFAPattern"], [41985, "CustomRendered"], [41986, "ExposureMode"], [41987, "WhiteBalance"], [41988, "DigitalZoomRatio"], [41989, "FocalLengthIn35mmFormat"], [41990, "SceneCaptureType"], [41991, "GainControl"], [41992, "Contrast"], [41993, "Saturation"], [41994, "Sharpness"], [41996, "SubjectDistanceRange"], [42016, "ImageUniqueID"], [42032, "OwnerName"], [42033, "SerialNumber"], [42034, "LensInfo"], [42035, "LensMake"], [42036, "LensModel"], [42037, "LensSerialNumber"], [42080, "CompositeImage"], [42081, "CompositeImageCount"], [42082, "CompositeImageExposureTimes"], [42240, "Gamma"], [59932, "Padding"], [59933, "OffsetSchema"], [65e3, "OwnerName"], [65001, "SerialNumber"], [65002, "Lens"], [65100, "RawFile"], [65101, "Converter"], [65102, "WhiteBalance"], [65105, "Exposure"], [65106, "Shadows"], [65107, "Brightness"], [65108, "Contrast"], [65109, "Saturation"], [65110, "Sharpness"], [65111, "Smoothness"], [65112, "MoireFilter"], [40965, "InteropIFD"]]), B2(L3, "gps", [[0, "GPSVersionID"], [1, "GPSLatitudeRef"], [2, "GPSLatitude"], [3, "GPSLongitudeRef"], [4, "GPSLongitude"], [5, "GPSAltitudeRef"], [6, "GPSAltitude"], [7, "GPSTimeStamp"], [8, "GPSSatellites"], [9, "GPSStatus"], [10, "GPSMeasureMode"], [11, "GPSDOP"], [12, "GPSSpeedRef"], [13, "GPSSpeed"], [14, "GPSTrackRef"], [15, "GPSTrack"], [16, "GPSImgDirectionRef"], [17, "GPSImgDirection"], [18, "GPSMapDatum"], [19, "GPSDestLatitudeRef"], [20, "GPSDestLatitude"], [21, "GPSDestLongitudeRef"], [22, "GPSDestLongitude"], [23, "GPSDestBearingRef"], [24, "GPSDestBearing"], [25, "GPSDestDistanceRef"], [26, "GPSDestDistance"], [27, "GPSProcessingMethod"], [28, "GPSAreaInformation"], [29, "GPSDateStamp"], [30, "GPSDifferential"], [31, "GPSHPositioningError"]]), B2(D2, ["ifd0", "ifd1"], [[274, { 1: "Horizontal (normal)", 2: "Mirror horizontal", 3: "Rotate 180", 4: "Mirror vertical", 5: "Mirror horizontal and rotate 270 CW", 6: "Rotate 90 CW", 7: "Mirror horizontal and rotate 90 CW", 8: "Rotate 270 CW" }], [296, { 1: "None", 2: "inches", 3: "cm" }]]);
var Le2 = B2(D2, "exif", [[34850, { 0: "Not defined", 1: "Manual", 2: "Normal program", 3: "Aperture priority", 4: "Shutter priority", 5: "Creative program", 6: "Action program", 7: "Portrait mode", 8: "Landscape mode" }], [37121, { 0: "-", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B" }], [37383, { 0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other" }], [37384, { 0: "Unknown", 1: "Daylight", 2: "Fluorescent", 3: "Tungsten (incandescent light)", 4: "Flash", 9: "Fine weather", 10: "Cloudy weather", 11: "Shade", 12: "Daylight fluorescent (D 5700 - 7100K)", 13: "Day white fluorescent (N 4600 - 5400K)", 14: "Cool white fluorescent (W 3900 - 4500K)", 15: "White fluorescent (WW 3200 - 3700K)", 17: "Standard light A", 18: "Standard light B", 19: "Standard light C", 20: "D55", 21: "D65", 22: "D75", 23: "D50", 24: "ISO studio tungsten", 255: "Other" }], [37385, { 0: "Flash did not fire", 1: "Flash fired", 5: "Strobe return light not detected", 7: "Strobe return light detected", 9: "Flash fired, compulsory flash mode", 13: "Flash fired, compulsory flash mode, return light not detected", 15: "Flash fired, compulsory flash mode, return light detected", 16: "Flash did not fire, compulsory flash mode", 24: "Flash did not fire, auto mode", 25: "Flash fired, auto mode", 29: "Flash fired, auto mode, return light not detected", 31: "Flash fired, auto mode, return light detected", 32: "No flash function", 65: "Flash fired, red-eye reduction mode", 69: "Flash fired, red-eye reduction mode, return light not detected", 71: "Flash fired, red-eye reduction mode, return light detected", 73: "Flash fired, compulsory flash mode, red-eye reduction mode", 77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89: "Flash fired, auto mode, red-eye reduction mode", 93: "Flash fired, auto mode, return light not detected, red-eye reduction mode", 95: "Flash fired, auto mode, return light detected, red-eye reduction mode" }], [41495, { 1: "Not defined", 2: "One-chip color area sensor", 3: "Two-chip color area sensor", 4: "Three-chip color area sensor", 5: "Color sequential area sensor", 7: "Trilinear sensor", 8: "Color sequential linear sensor" }], [41728, { 1: "Film Scanner", 2: "Reflection Print Scanner", 3: "Digital Camera" }], [41729, { 1: "Directly photographed" }], [41985, { 0: "Normal", 1: "Custom", 2: "HDR (no original saved)", 3: "HDR (original saved)", 4: "Original (for HDR)", 6: "Panorama", 7: "Portrait HDR", 8: "Portrait" }], [41986, { 0: "Auto", 1: "Manual", 2: "Auto bracket" }], [41987, { 0: "Auto", 1: "Manual" }], [41990, { 0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night", 4: "Other" }], [41991, { 0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down" }], [41996, { 0: "Unknown", 1: "Macro", 2: "Close", 3: "Distant" }], [42080, { 0: "Unknown", 1: "Not a Composite Image", 2: "General Composite Image", 3: "Composite Image Captured While Shooting" }]]);
var De2 = { 1: "No absolute unit of measurement", 2: "Inch", 3: "Centimeter" };
Le2.set(37392, De2), Le2.set(41488, De2);
var Te2 = { 0: "Normal", 1: "Low", 2: "High" };
function ze2(e3) {
  return "object" == typeof e3 && void 0 !== e3.length ? e3[0] : e3;
}
function Ne2(e3) {
  let t3 = Array.from(e3).slice(1);
  return t3[1] > 15 && (t3 = t3.map(((e4) => String.fromCharCode(e4)))), "0" !== t3[2] && 0 !== t3[2] || t3.pop(), t3.join(".");
}
function Ve2(e3) {
  if ("string" == typeof e3) {
    var [t3, i3, s3, n3, r3, a3] = e3.trim().split(/[-: ]/g).map(Number), o3 = new Date(t3, i3 - 1, s3);
    return Number.isNaN(n3) || Number.isNaN(r3) || Number.isNaN(a3) || (o3.setHours(n3), o3.setMinutes(r3), o3.setSeconds(a3)), Number.isNaN(+o3) ? e3 : o3;
  }
}
function Me2(e3) {
  if ("string" == typeof e3) return e3;
  let t3 = [];
  if (0 === e3[1] && 0 === e3[e3.length - 1]) for (let i3 = 0; i3 < e3.length; i3 += 2) t3.push(Ee2(e3[i3 + 1], e3[i3]));
  else for (let i3 = 0; i3 < e3.length; i3 += 2) t3.push(Ee2(e3[i3], e3[i3 + 1]));
  return d2(String.fromCodePoint(...t3));
}
function Ee2(e3, t3) {
  return e3 << 8 | t3;
}
Le2.set(41992, Te2), Le2.set(41993, Te2), Le2.set(41994, Te2), B2(T2, ["ifd0", "ifd1"], [[50827, function(e3) {
  return "string" != typeof e3 ? m2(e3) : e3;
}], [306, Ve2], [40091, Me2], [40092, Me2], [40093, Me2], [40094, Me2], [40095, Me2]]), B2(T2, "exif", [[40960, Ne2], [36864, Ne2], [36867, Ve2], [36868, Ve2], [40962, ze2], [40963, ze2]]), B2(T2, "gps", [[0, (e3) => Array.from(e3).join(".")], [7, (e3) => Array.from(e3).join(":")]]);
var Re2 = class extends te2 {
  static canHandle(e3, t3) {
    return 225 === e3.getUint8(t3 + 1) && 1752462448 === e3.getUint32(t3 + 4) && "http://ns.adobe.com/" === e3.getString(t3 + 4, "http://ns.adobe.com/".length);
  }
  static headerLength(e3, t3) {
    return "http://ns.adobe.com/xmp/extension/" === e3.getString(t3 + 4, "http://ns.adobe.com/xmp/extension/".length) ? 79 : 4 + "http://ns.adobe.com/xap/1.0/".length + 1;
  }
  static findPosition(e3, t3) {
    let i3 = super.findPosition(e3, t3);
    return i3.multiSegment = i3.extended = 79 === i3.headerLength, i3.multiSegment ? (i3.chunkCount = e3.getUint8(t3 + 72), i3.chunkNumber = e3.getUint8(t3 + 76), 0 !== e3.getUint8(t3 + 77) && i3.chunkNumber++) : (i3.chunkCount = 1 / 0, i3.chunkNumber = -1), i3;
  }
  static handleMultiSegments(e3) {
    return e3.map(((e4) => e4.chunk.getString())).join("");
  }
  normalizeInput(e3) {
    return "string" == typeof e3 ? e3 : y2.from(e3).getString();
  }
  parse(e3 = this.chunk) {
    if (!this.localOptions.parse) return e3;
    e3 = (function(e4) {
      let t4 = {}, i4 = {};
      for (let e5 of Ye2) t4[e5] = [], i4[e5] = 0;
      return e4.replace(qe2, ((e5, s4, n3) => {
        if ("<" === s4) {
          let s5 = ++i4[n3];
          return t4[n3].push(s5), `${e5}#${s5}`;
        }
        return `${e5}#${t4[n3].pop()}`;
      }));
    })(e3);
    let t3 = Ge2.findAll(e3, "rdf", "Description");
    0 === t3.length && t3.push(new Ge2("rdf", "Description", void 0, e3));
    let i3, s3 = {};
    for (let e4 of t3) for (let t4 of e4.properties) i3 = $e2(t4.ns, s3), He(t4, i3);
    return (function(e4) {
      let t4;
      for (let i4 in e4) t4 = e4[i4] = h2(e4[i4]), void 0 === t4 && delete e4[i4];
      return h2(e4);
    })(s3);
  }
  assignToOutput(e3, t3) {
    if (this.localOptions.parse) for (let [i3, s3] of Object.entries(t3)) switch (i3) {
      case "tiff":
        this.assignObjectToOutput(e3, "ifd0", s3);
        break;
      case "exif":
        this.assignObjectToOutput(e3, "exif", s3);
        break;
      case "xmlns":
        break;
      default:
        this.assignObjectToOutput(e3, i3, s3);
    }
    else e3.xmp = t3;
  }
};
e2(Re2, "type", "xmp"), e2(Re2, "multiSegment", true), k3.set("xmp", Re2);
var je2 = class _je {
  static findAll(e3) {
    return Ke2(e3, /([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)=("[^"]*"|'[^']*')/gm).map(_je.unpackMatch);
  }
  static unpackMatch(e3) {
    let t3 = e3[1], i3 = e3[2], s3 = e3[3].slice(1, -1);
    return s3 = Xe2(s3), new _je(t3, i3, s3);
  }
  constructor(e3, t3, i3) {
    this.ns = e3, this.name = t3, this.value = i3;
  }
  serialize() {
    return this.value;
  }
};
var Ge2 = class _Ge {
  static findAll(e3, t3, i3) {
    if (void 0 !== t3 || void 0 !== i3) {
      t3 = t3 || "[\\w\\d-]+", i3 = i3 || "[\\w\\d-]+";
      var s3 = new RegExp(`<(${t3}):(${i3})(#\\d+)?((\\s+?[\\w\\d-:]+=("[^"]*"|'[^']*'))*\\s*)(\\/>|>([\\s\\S]*?)<\\/\\1:\\2\\3>)`, "gm");
    } else s3 = /<([\w\d-]+):([\w\d-]+)(#\d+)?((\s+?[\w\d-:]+=("[^"]*"|'[^']*'))*\s*)(\/>|>([\s\S]*?)<\/\1:\2\3>)/gm;
    return Ke2(e3, s3).map(_Ge.unpackMatch);
  }
  static unpackMatch(e3) {
    let t3 = e3[1], i3 = e3[2], s3 = e3[4], n3 = e3[8];
    return new _Ge(t3, i3, s3, n3);
  }
  constructor(e3, t3, i3, s3) {
    this.ns = e3, this.name = t3, this.attrString = i3, this.innerXml = s3, this.attrs = je2.findAll(i3), this.children = _Ge.findAll(s3), this.value = 0 === this.children.length ? Xe2(s3) : void 0, this.properties = [...this.attrs, ...this.children];
  }
  get isPrimitive() {
    return void 0 !== this.value && 0 === this.attrs.length && 0 === this.children.length;
  }
  get isListContainer() {
    return 1 === this.children.length && this.children[0].isList;
  }
  get isList() {
    let { ns: e3, name: t3 } = this;
    return "rdf" === e3 && ("Seq" === t3 || "Bag" === t3 || "Alt" === t3);
  }
  get isListItem() {
    return "rdf" === this.ns && "li" === this.name;
  }
  serialize() {
    if (0 === this.properties.length && void 0 === this.value) return;
    if (this.isPrimitive) return this.value;
    if (this.isListContainer) return this.children[0].serialize();
    if (this.isList) return We2(this.children.map(_e2));
    if (this.isListItem && 1 === this.children.length && 0 === this.attrs.length) return this.children[0].serialize();
    let e3 = {};
    for (let t3 of this.properties) He(t3, e3);
    return void 0 !== this.value && (e3.value = this.value), h2(e3);
  }
};
function He(e3, t3) {
  let i3 = e3.serialize();
  void 0 !== i3 && (t3[e3.name] = i3);
}
var _e2 = (e3) => e3.serialize();
var We2 = (e3) => 1 === e3.length ? e3[0] : e3;
var $e2 = (e3, t3) => t3[e3] ? t3[e3] : t3[e3] = {};
function Ke2(e3, t3) {
  let i3, s3 = [];
  if (!e3) return s3;
  for (; null !== (i3 = t3.exec(e3)); ) s3.push(i3);
  return s3;
}
function Xe2(e3) {
  if ((function(e4) {
    return null == e4 || "null" === e4 || "undefined" === e4 || "" === e4 || "" === e4.trim();
  })(e3)) return;
  let t3 = Number(e3);
  if (!Number.isNaN(t3)) return t3;
  let i3 = e3.toLowerCase();
  return "true" === i3 || "false" !== i3 && e3.trim();
}
var Ye2 = ["rdf:li", "rdf:Seq", "rdf:Bag", "rdf:Alt", "rdf:Description"];
var qe2 = new RegExp(`(<|\\/)(${Ye2.join("|")})`, "g");
var exifr_default = Ae2;

// js/utils/utils.js
async function extractExif(file) {
  try {
    return await exifr_default.parse(file) || null;
  } catch {
    return null;
  }
}
function randomId() {
  return Array.from(
    crypto.getRandomValues(new Uint8Array(16)),
    (b4) => b4.toString(16).padStart(2, "0")
  ).join("");
}
async function fileToBase64(file) {
  if (typeof createImageBitmap === "undefined" || typeof document === "undefined") {
    if (file && typeof file.arrayBuffer === "function") {
      const buf = await file.arrayBuffer();
      const bufCtor = (
        /** @type {any} */
        globalThis.Buffer
      );
      const b64 = typeof bufCtor !== "undefined" ? bufCtor.from(buf).toString("base64") : btoa(String.fromCharCode(...new Uint8Array(buf)));
      const mime = file.type || "image/png";
      return `data:${mime};base64,${b64}`;
    }
    if (typeof file === "string") return file;
  }
  const bitmap = await createImageBitmap(file);
  const MAX_W = 1654;
  const MAX_H = 2339;
  const scale = Math.min(1, MAX_W / bitmap.width, MAX_H / bitmap.height);
  if (scale === 1 && (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/webp")) {
    bitmap.close();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const format = file.type === "image/png" ? "image/png" : "image/jpeg";
  return canvas.toDataURL(format, format === "image/png" ? void 0 : 0.82);
}
function applySauvolaToImageData(imageData, windowSize = 21, k4 = 0.2, R4 = 128) {
  const { data, width, height } = imageData;
  const stride = width + 1;
  const sum = new Float64Array((width + 1) * (height + 1));
  const sqSum = new Float64Array((width + 1) * (height + 1));
  const gray = new Uint8Array(width * height);
  for (let y3 = 0; y3 < height; y3++) {
    let rowSum = 0;
    let rowSqSum = 0;
    const rowIdx = y3 * width;
    const sumRowIdx = (y3 + 1) * stride;
    const prevSumRowIdx = y3 * stride;
    for (let x4 = 0; x4 < width; x4++) {
      const idx = (rowIdx + x4) * 4;
      const g3 = data[idx] * 77 + data[idx + 1] * 150 + data[idx + 2] * 29 >> 8;
      gray[rowIdx + x4] = g3;
      rowSum += g3;
      rowSqSum += g3 * g3;
      sum[sumRowIdx + x4 + 1] = sum[prevSumRowIdx + x4 + 1] + rowSum;
      sqSum[sumRowIdx + x4 + 1] = sqSum[prevSumRowIdx + x4 + 1] + rowSqSum;
    }
  }
  const half = Math.floor(windowSize / 2);
  for (let y3 = 0; y3 < height; y3++) {
    const y1 = Math.max(0, y3 - half);
    const y22 = Math.min(height - 1, y3 + half);
    const y1Str = y1 * stride;
    const y2Str = (y22 + 1) * stride;
    for (let x4 = 0; x4 < width; x4++) {
      const x1 = Math.max(0, x4 - half);
      const x22 = Math.min(width - 1, x4 + half);
      const count = (x22 - x1 + 1) * (y22 - y1 + 1);
      const areaSum = sum[y2Str + x22 + 1] - sum[y1Str + x22 + 1] - sum[y2Str + x1] + sum[y1Str + x1];
      const areaSqSum = sqSum[y2Str + x22 + 1] - sqSum[y1Str + x22 + 1] - sqSum[y2Str + x1] + sqSum[y1Str + x1];
      const mean = areaSum / count;
      const variance = Math.max(0, areaSqSum / count - mean * mean);
      const stdDev = Math.sqrt(variance);
      const threshold = mean * (1 + k4 * (stdDev / R4 - 1));
      const pIdx = y3 * width + x4;
      const pixelVal = gray[pIdx] < threshold ? 0 : 255;
      const dataIdx = pIdx * 4;
      data[dataIdx] = pixelVal;
      data[dataIdx + 1] = pixelVal;
      data[dataIdx + 2] = pixelVal;
    }
  }
  return imageData;
}
function normalizeEdits(edits) {
  if (!edits || typeof edits !== "object") {
    return { crop: null, rotation: 0, filter: "none" };
  }
  const crop = edits.crop && typeof edits.crop === "object" && edits.crop.width > 0 && edits.crop.height > 0 ? {
    x: Math.round(edits.crop.x || 0),
    y: Math.round(edits.crop.y || 0),
    width: Math.round(edits.crop.width),
    height: Math.round(edits.crop.height)
  } : null;
  const rotation = (Math.round(edits.rotation || 0) % 360 + 360) % 360;
  const filter = edits.filter === "bw" ? "bw" : "none";
  return { crop, rotation, filter };
}
function renderEditsToCanvas(imgOrCanvas, edits) {
  const norm = normalizeEdits(edits);
  const srcWidth = (
    /** @type {any} */
    imgOrCanvas.naturalWidth || imgOrCanvas.width || 0
  );
  const srcHeight = (
    /** @type {any} */
    imgOrCanvas.naturalHeight || imgOrCanvas.height || 0
  );
  let cropCanvas = document.createElement("canvas");
  let cWidth = srcWidth;
  let cHeight = srcHeight;
  let cropX = 0;
  let cropY = 0;
  if (norm.crop) {
    cropX = Math.max(0, Math.min(norm.crop.x, srcWidth));
    cropY = Math.max(0, Math.min(norm.crop.y, srcHeight));
    cWidth = Math.max(1, Math.min(norm.crop.width, srcWidth - cropX));
    cHeight = Math.max(1, Math.min(norm.crop.height, srcHeight - cropY));
  }
  cropCanvas.width = cWidth;
  cropCanvas.height = cHeight;
  const cropCtx = cropCanvas.getContext("2d");
  cropCtx.drawImage(imgOrCanvas, cropX, cropY, cWidth, cHeight, 0, 0, cWidth, cHeight);
  let workingCanvas = cropCanvas;
  if (norm.rotation !== 0) {
    const rot = norm.rotation;
    const rotCanvas = document.createElement("canvas");
    if (rot === 90 || rot === 270) {
      rotCanvas.width = workingCanvas.height;
      rotCanvas.height = workingCanvas.width;
    } else {
      rotCanvas.width = workingCanvas.width;
      rotCanvas.height = workingCanvas.height;
    }
    const rCtx = rotCanvas.getContext("2d");
    rCtx.translate(rotCanvas.width / 2, rotCanvas.height / 2);
    rCtx.rotate(rot * Math.PI / 180);
    rCtx.drawImage(workingCanvas, -workingCanvas.width / 2, -workingCanvas.height / 2);
    workingCanvas = rotCanvas;
  }
  if (norm.filter === "bw") {
    const wCtx = workingCanvas.getContext("2d");
    const imgData = wCtx.getImageData(0, 0, workingCanvas.width, workingCanvas.height);
    applySauvolaToImageData(imgData);
    wCtx.putImageData(imgData, 0, 0);
  }
  return workingCanvas;
}

// js/services/doc-repository.js
var _adapter, _softDeletedDocs, _softDeletedPages, _DocRepository_instances, clearDocSoftDelete_fn, clearPageSoftDelete_fn, normalizePages_fn;
var DocRepository = class {
  /**
   * @param {import('../adapters/storage/storage-port.js').StoragePort} [adapter]
   */
  constructor(adapter = createDefaultAdapter()) {
    __privateAdd(this, _DocRepository_instances);
    __privateAdd(this, _adapter, null);
    __privateAdd(this, _softDeletedDocs, /* @__PURE__ */ new Map());
    __privateAdd(this, _softDeletedPages, /* @__PURE__ */ new Map());
    __privateSet(this, _adapter, adapter);
  }
  /**
   * Underlying StoragePort adapter.
   */
  get adapter() {
    return __privateGet(this, _adapter);
  }
  /**
   * Backward-compatibility accessor for the underlying TinyBase store (if available).
   */
  get store() {
    return __privateGet(this, _adapter)?.store ?? null;
  }
  /**
   * Initializes the repository and underlying storage adapter.
   * @returns {Promise<{ kind: string, persistent: boolean }>}
   */
  async init() {
    return __privateGet(this, _adapter).init();
  }
  /**
   * Lists all documents with metadata synchronously if supported by adapter.
   * @returns {DocMetadata[]}
   */
  listDocsSync() {
    if (typeof __privateGet(this, _adapter).listDocsSync === "function") {
      const rows = __privateGet(this, _adapter).listDocsSync();
      return rows.map((row) => {
        const pages = __privateMethod(this, _DocRepository_instances, normalizePages_fn).call(this, row.pages);
        return {
          id: row.id,
          name: row.name || "",
          pageCount: pages.length,
          pages
        };
      });
    }
    return [];
  }
  /**
   * Lists all documents with metadata (id, name, pageCount, pages).
   * @returns {Promise<DocMetadata[]>}
   */
  async listDocs() {
    const rows = await __privateGet(this, _adapter).listDocs();
    return rows.map((row) => {
      const pages = __privateMethod(this, _DocRepository_instances, normalizePages_fn).call(this, row.pages);
      return {
        id: row.id,
        name: row.name || "",
        pageCount: pages.length,
        pages
      };
    });
  }
  /**
   * Retrieves a document with its parsed pages array synchronously if supported.
   * @param {string} id
   * @returns {DocWithPages|null}
   */
  getDocSync(id) {
    if (!id) return null;
    if (typeof __privateGet(this, _adapter).getDocSync === "function") {
      const row = __privateGet(this, _adapter).getDocSync(id);
      if (!row) return null;
      return {
        id: row.id,
        name: row.name || "",
        pages: __privateMethod(this, _DocRepository_instances, normalizePages_fn).call(this, row.pages)
      };
    }
    const docs = this.listDocsSync();
    const doc = docs.find((d3) => d3.id === id);
    if (!doc) return null;
    return {
      id: doc.id,
      name: doc.name,
      pages: doc.pages || []
    };
  }
  /**
   * Retrieves a document with its parsed pages array.
   * Returns null if not found.
   * @param {string} id
   * @returns {Promise<DocWithPages|null>}
   */
  async getDoc(id) {
    return this.getDocSync(id);
  }
  /**
   * Creates a new document with an optional title and initial pages.
   * @param {string} [name='Untitled Document']
   * @param {Array<any>} [pages=[]]
   * @returns {Promise<DocWithPages>}
   */
  async createDoc(name = "Untitled Document", pages = []) {
    const id = randomId();
    const normalizedPages = __privateMethod(this, _DocRepository_instances, normalizePages_fn).call(this, pages);
    const doc = {
      id,
      name: name || "Untitled Document",
      pages: normalizedPages
    };
    await __privateGet(this, _adapter).saveDoc(id, doc);
    return doc;
  }
  /**
   * Saves or updates an existing document.
   * @param {string} id
   * @param {{ name?: string, pages?: any[] }} doc
   * @returns {Promise<void>}
   */
  async saveDoc(id, doc) {
    if (!id) throw new Error("Cannot save document without an ID");
    const normalizedPages = __privateMethod(this, _DocRepository_instances, normalizePages_fn).call(this, doc.pages);
    await __privateGet(this, _adapter).saveDoc(id, {
      id,
      name: doc.name || "",
      pages: normalizedPages
    });
  }
  /**
   * Renames a document.
   * @param {string} id
   * @param {string} name
   * @returns {Promise<void>}
   */
  async renameDoc(id, name) {
    const doc = await this.getDoc(id);
    if (!doc) throw new Error(`Document "${id}" not found`);
    doc.name = name;
    await this.saveDoc(id, doc);
  }
  /**
   * Deletes a document with soft-delete undo support (CPO-016).
   * @param {string} id
   * @param {Object} [options]
   * @param {boolean} [options.soft=true] - Whether to allow undo for timeoutMs
   * @param {number} [options.timeoutMs=5000] - Duration in ms before purging permanently
   * @returns {Promise<{ id: string, name: string, undo: () => Promise<any> }|void>}
   */
  async deleteDoc(id, { soft = true, timeoutMs = 5e3 } = {}) {
    if (!id) return;
    const doc = this.getDocSync(id);
    if (!doc) return;
    __privateMethod(this, _DocRepository_instances, clearDocSoftDelete_fn).call(this, id);
    await __privateGet(this, _adapter).deleteDoc(id);
    if (soft && timeoutMs > 0) {
      const timerId = setTimeout(async () => {
        __privateGet(this, _softDeletedDocs).delete(id);
      }, timeoutMs);
      __privateGet(this, _softDeletedDocs).set(id, {
        doc,
        timerId
      });
    }
    return {
      id,
      name: doc.name,
      undo: () => this.undoDeleteDoc(id)
    };
  }
  /**
   * Restores a soft-deleted document back into the active store.
   * @param {string} id
   * @returns {Promise<DocWithPages|null>}
   */
  async undoDeleteDoc(id) {
    const entry = __privateGet(this, _softDeletedDocs).get(id);
    if (!entry) return null;
    clearTimeout(entry.timerId);
    __privateGet(this, _softDeletedDocs).delete(id);
    await __privateGet(this, _adapter).saveDoc(id, entry.doc);
    return entry.doc;
  }
  /**
   * Checks whether a document is currently in soft-delete state.
   * @param {string} id
   * @returns {boolean}
   */
  isSoftDeletedDoc(id) {
    return __privateGet(this, _softDeletedDocs).has(id);
  }
  /**
   * Appends pages to an existing document.
   * @param {string} id
   * @param {Array<any>|any} pages
   * @returns {Promise<void>}
   */
  async addPages(id, pages) {
    const doc = await this.getDoc(id);
    if (!doc) throw new Error(`Document "${id}" not found`);
    const toAdd = Array.isArray(pages) ? pages : [pages];
    doc.pages.push(...toAdd);
    await this.saveDoc(id, doc);
  }
  /**
   * Updates an individual page within a document.
   * @param {string} id
   * @param {string} pageId
   * @param {Record<string, any>} updates
   * @returns {Promise<void>}
   */
  async updatePage(id, pageId, updates) {
    const doc = await this.getDoc(id);
    if (!doc) throw new Error(`Document "${id}" not found`);
    const pageIndex = doc.pages.findIndex((p3) => p3.id === pageId);
    if (pageIndex === -1) {
      throw new Error(`Page "${pageId}" not found in document "${id}"`);
    }
    doc.pages[pageIndex] = {
      ...doc.pages[pageIndex],
      ...updates
    };
    await this.saveDoc(id, doc);
  }
  /**
   * Reorders pages in a document according to an array of page IDs.
   * Any pages omitted from pageIds will be appended at the end.
   * @param {string} id
   * @param {string[]} pageIds
   * @returns {Promise<void>}
   */
  async reorderPages(id, pageIds) {
    const doc = await this.getDoc(id);
    if (!doc) throw new Error(`Document "${id}" not found`);
    const pageMap = new Map(doc.pages.map((p3) => [p3.id, p3]));
    const reordered = [];
    for (const pid of pageIds) {
      if (pageMap.has(pid)) {
        reordered.push(pageMap.get(pid));
        pageMap.delete(pid);
      }
    }
    for (const remaining of pageMap.values()) {
      reordered.push(remaining);
    }
    doc.pages = reordered;
    await this.saveDoc(id, doc);
  }
  /**
   * Deletes a page from a document with soft-delete undo support (CPO-016).
   * @param {string} id
   * @param {string} pageId
   * @param {Object} [options]
   * @param {boolean} [options.soft=true] - Whether to allow undo for timeoutMs
   * @param {number} [options.timeoutMs=5000] - Duration in ms before purging permanently
   * @returns {Promise<{ docId: string, pageId: string, undo: () => Promise<any> }|void>}
   */
  async deletePage(id, pageId, { soft = true, timeoutMs = 5e3 } = {}) {
    const doc = await this.getDoc(id);
    if (!doc) throw new Error(`Document "${id}" not found`);
    const pageIndex = doc.pages.findIndex((p3) => p3.id === pageId);
    if (pageIndex === -1) return;
    const [deletedPage] = doc.pages.splice(pageIndex, 1);
    await this.saveDoc(id, doc);
    const key = `${id}:${pageId}`;
    __privateMethod(this, _DocRepository_instances, clearPageSoftDelete_fn).call(this, key);
    if (!soft || timeoutMs <= 0) {
      if (typeof __privateGet(this, _adapter).deletePage === "function") {
        try {
          await __privateGet(this, _adapter).deletePage(id, pageId);
        } catch (err) {
          console.warn(`[DocRepository] Adapter deletePage error:`, err);
        }
      }
      return;
    }
    const timerId = setTimeout(async () => {
      __privateGet(this, _softDeletedPages).delete(key);
      if (typeof __privateGet(this, _adapter).deletePage === "function") {
        try {
          await __privateGet(this, _adapter).deletePage(id, pageId);
        } catch (err) {
          console.warn(`[DocRepository] Adapter deletePage error:`, err);
        }
      }
    }, timeoutMs);
    __privateGet(this, _softDeletedPages).set(key, {
      docId: id,
      pageId,
      page: deletedPage,
      index: pageIndex,
      timerId
    });
    return {
      docId: id,
      pageId,
      undo: () => this.undoDeletePage(id, pageId)
    };
  }
  /**
   * Restores a soft-deleted page back into its parent document at its original index.
   * @param {string} id
   * @param {string} pageId
   * @returns {Promise<any|null>}
   */
  async undoDeletePage(id, pageId) {
    const key = `${id}:${pageId}`;
    const entry = __privateGet(this, _softDeletedPages).get(key);
    if (!entry) return null;
    clearTimeout(entry.timerId);
    __privateGet(this, _softDeletedPages).delete(key);
    const doc = await this.getDoc(id);
    if (!doc) return null;
    const insertIdx = Math.min(entry.index, doc.pages.length);
    doc.pages.splice(insertIdx, 0, entry.page);
    await this.saveDoc(id, doc);
    return entry.page;
  }
  /**
   * Checks whether a page is currently in soft-delete state.
   * @param {string} id
   * @param {string} pageId
   * @returns {boolean}
   */
  isSoftDeletedPage(id, pageId) {
    return __privateGet(this, _softDeletedPages).has(`${id}:${pageId}`);
  }
  /**
   * Subscribes to document updates in storage.
   * @param {() => void} cb
   * @returns {() => void} Unsubscribe function
   */
  subscribe(cb) {
    return __privateGet(this, _adapter).subscribe(cb);
  }
  /**
   * Returns all documents as a dictionary indexed by id.
   * @returns {Promise<Record<string, DocWithPages>>}
   */
  async getAllDocs() {
    const docs = await this.listDocs();
    const result = {};
    for (const doc of docs) {
      result[doc.id] = doc;
    }
    return result;
  }
  /**
   * Exports all documents formatted for wire transmission (e.g. P2P sync).
   * @returns {Promise<Record<string, { name: string, pages: string }>>}
   */
  async exportAll() {
    const docs = await this.listDocs();
    const result = {};
    for (const doc of docs) {
      result[doc.id] = {
        name: doc.name,
        pages: JSON.stringify(doc.pages)
      };
    }
    return result;
  }
  /**
   * Imports multiple documents from wire/raw format (e.g. from P2P sync).
   * @param {Record<string, any>} docsMap
   * @returns {Promise<number>} Count of newly added documents
   */
  async importDocs(docsMap) {
    let added = 0;
    for (const [id, row] of Object.entries(docsMap || {})) {
      const existing = await this.getDoc(id);
      if (!existing) added++;
      const pages = __privateMethod(this, _DocRepository_instances, normalizePages_fn).call(this, row.pages);
      await this.saveDoc(id, {
        name: row.name || "",
        pages
      });
    }
    return added;
  }
};
_adapter = new WeakMap();
_softDeletedDocs = new WeakMap();
_softDeletedPages = new WeakMap();
_DocRepository_instances = new WeakSet();
clearDocSoftDelete_fn = function(id) {
  if (__privateGet(this, _softDeletedDocs).has(id)) {
    const entry = __privateGet(this, _softDeletedDocs).get(id);
    clearTimeout(entry.timerId);
    __privateGet(this, _softDeletedDocs).delete(id);
  }
};
clearPageSoftDelete_fn = function(key) {
  if (__privateGet(this, _softDeletedPages).has(key)) {
    const entry = __privateGet(this, _softDeletedPages).get(key);
    clearTimeout(entry.timerId);
    __privateGet(this, _softDeletedPages).delete(key);
  }
};
normalizePages_fn = function(rawPages) {
  if (Array.isArray(rawPages)) return [...rawPages];
  if (typeof rawPages === "string") {
    try {
      return JSON.parse(rawPages);
    } catch {
      return [];
    }
  }
  return [];
};
var docRepository = new DocRepository();

// js/utils/module-loader.js
var configuredAssetBase = ".";
function getAssetBase() {
  return configuredAssetBase;
}
function setAssetBase(base) {
  if (typeof base === "string") {
    configuredAssetBase = base.replace(/\/+$/, "") || ".";
  }
}

// js/adapters/ocr/ocr-port.js
var OcrPort = class {
  /**
   * Recognize text from a single image.
   * @param {string|Blob|File|HTMLImageElement|HTMLCanvasElement} _image
   * @param {Object} [_options]
   * @returns {Promise<{ text: string, confidence: number, words?: any[], lines?: any[], paragraphs?: any[], hocr?: string }>}
   */
  async recognizeImageText(_image, _options = {}) {
    throw new Error("OcrPort.recognizeImageText() must be implemented by adapter");
  }
  /**
   * Batch recognize text across multiple document pages.
   * @param {Array<{ id: string, src?: string, type?: string, content?: string, name?: string }>} _pages
   * @param {Object} [_options]
   * @returns {Promise<OcrBatchResult>}
   */
  async recognizeDocumentPages(_pages2, _options = {}) {
    throw new Error("OcrPort.recognizeDocumentPages() must be implemented by adapter");
  }
  /**
   * Obtain or initialize an active OCR worker instance.
   * @param {string} [_lang='eng']
   * @param {Function} [_onProgress]
   * @returns {Promise<any>}
   */
  async getOcrWorker(_lang = "eng", _onProgress = null) {
    throw new Error("OcrPort.getOcrWorker() must be implemented by adapter");
  }
  /**
   * Terminate active OCR worker and release resources.
   * @returns {Promise<void>}
   */
  async terminateOcrWorker() {
    throw new Error("OcrPort.terminateOcrWorker() must be implemented by adapter");
  }
};

// js/adapters/ocr/null-ocr-adapter.js
var NullOcrAdapter = class extends OcrPort {
  /**
   * Throws FEATURE_DISABLED error to prevent network requests.
   * @param {string|Blob|File|HTMLImageElement|HTMLCanvasElement} _image
   * @param {Object} [_options]
   * @returns {Promise<any>}
   */
  async recognizeImageText(_image, _options = {}) {
    const err = new Error('Feature "ocr" is disabled or OCR module not opted in');
    err.code = "FEATURE_DISABLED";
    throw err;
  }
  /**
   * Throws FEATURE_DISABLED error to prevent network requests.
   * @param {Array<{ id: string, src?: string, type?: string, content?: string, name?: string }>} _pages
   * @param {Object} [_options]
   * @returns {Promise<any>}
   */
  async recognizeDocumentPages(_pages2, _options = {}) {
    const err = new Error('Feature "ocr" is disabled or OCR module not opted in');
    err.code = "FEATURE_DISABLED";
    throw err;
  }
  /**
   * Null worker without instantiating any WASM or worker thread.
   * @returns {Promise<null>}
   */
  async getOcrWorker() {
    return null;
  }
  /**
   * No-op termination.
   * @returns {Promise<void>}
   */
  async terminateOcrWorker() {
  }
};

// js/adapters/pdf/pdf-port.js
var PdfPort = class {
  /**
   * Export document pages as a PDF Blob.
   * @param {string} _docName
   * @param {Array<any>} _pages
   * @param {Object} [_options]
   * @returns {Promise<Blob|undefined>}
   */
  async exportDocumentAsPdf(_docName, _pages2, _options = {}) {
    throw new Error("PdfPort.exportDocumentAsPdf() must be implemented by adapter");
  }
  /**
   * Render pages of a PDF File or ArrayBuffer to image data URLs.
   * @param {File|Blob|ArrayBuffer} _fileOrBuffer
   * @returns {Promise<string[]>}
   */
  async renderPdfPagesToDataUrls(_fileOrBuffer) {
    throw new Error("PdfPort.renderPdfPagesToDataUrls() must be implemented by adapter");
  }
};

// js/adapters/pdf/null-pdf-adapter.js
var NullPdfAdapter = class extends PdfPort {
  /**
   * Throws FEATURE_DISABLED error to prevent network requests.
   * @param {string} _docName
   * @param {Array<any>} _pages
   * @param {Object} [_options]
   * @returns {Promise<any>}
   */
  async exportDocumentAsPdf(_docName, _pages2, _options = {}) {
    const err = new Error('Feature "pdf" is disabled or PDF module not opted in');
    err.code = "FEATURE_DISABLED";
    throw err;
  }
  /**
   * Returns empty array without importing pdf-utils or making network calls.
   * @param {File|Blob|ArrayBuffer} _fileOrBuffer
   * @returns {Promise<string[]>}
   */
  async renderPdfPagesToDataUrls(_fileOrBuffer) {
    return [];
  }
};

// js/adapters/image/image-processor-port.js
var ImageProcessorPort = class {
  /**
   * Applies non-destructive edits (crop, rotate, filter) to an original image source.
   * @param {string} _originalSrc - Data URL or Object URL of the raw original image
   * @param {Object} _edits - Edit stack { crop, rotate, filter }
   * @returns {Promise<string>} Derived image data URL with edits applied
   */
  async renderEdits(_originalSrc, _edits) {
    throw new Error("ImageProcessorPort.renderEdits() must be implemented by adapter");
  }
  /**
   * Crops an image source.
   * @param {string} _src
   * @param {{ x: number, y: number, w: number, h: number }} _crop - Normalized coordinates
   * @returns {Promise<string>}
   */
  async crop(_src, _crop) {
    throw new Error("ImageProcessorPort.crop() must be implemented by adapter");
  }
  /**
   * Rotates an image source by degrees.
   * @param {string} _src
   * @param {number} _degrees - 90, 180, 270
   * @returns {Promise<string>}
   */
  async rotate(_src, _degrees) {
    throw new Error("ImageProcessorPort.rotate() must be implemented by adapter");
  }
  /**
   * Applies an adaptive or tonal filter to an image source.
   * @param {string} _src
   * @param {'bw'|'none'} _filter
   * @returns {Promise<string>}
   */
  async applyFilter(_src, _filter) {
    throw new Error("ImageProcessorPort.applyFilter() must be implemented by adapter");
  }
};

// js/adapters/image/canvas2d-adapter.js
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
var Canvas2DAdapter = class extends ImageProcessorPort {
  /**
   * Applies non-destructive edits (crop, rotate, filter) to an original image source.
   * @param {string} originalSrc
   * @param {Object} edits
   * @returns {Promise<string>}
   */
  async renderEdits(originalSrc, edits = {}) {
    if (!originalSrc) return "";
    if (typeof document === "undefined") {
      return originalSrc;
    }
    try {
      const img = await loadImage(originalSrc);
      const normalizedEdits = { ...edits };
      if (edits?.crop && "w" in edits.crop) {
        normalizedEdits.crop = {
          x: Math.round((edits.crop.x || 0) * img.naturalWidth),
          y: Math.round((edits.crop.y || 0) * img.naturalHeight),
          width: Math.round((edits.crop.w || 1) * img.naturalWidth),
          height: Math.round((edits.crop.h || 1) * img.naturalHeight)
        };
      }
      if (edits?.rotate !== void 0) {
        normalizedEdits.rotation = edits.rotate;
      }
      const canvas = renderEditsToCanvas(img, normalizedEdits);
      return canvas.toDataURL("image/jpeg", 0.92);
    } catch {
      return originalSrc;
    }
  }
  /**
   * Crops an image source using normalized coordinates.
   * @param {string} src
   * @param {{ x: number, y: number, w: number, h: number }} crop
   * @returns {Promise<string>}
   */
  async crop(src, crop) {
    return this.renderEdits(src, { crop });
  }
  /**
   * Rotates an image source.
   * @param {string} src
   * @param {number} degrees
   * @returns {Promise<string>}
   */
  async rotate(src, degrees) {
    return this.renderEdits(src, { rotate: degrees });
  }
  /**
   * Applies Sauvola adaptive B&W threshold to an image source.
   * @param {string} src
   * @param {'bw'|'none'} filter
   * @returns {Promise<string>}
   */
  async applyFilter(src, filter) {
    return this.renderEdits(src, { filter });
  }
};

// js/adapters/image/null-image-processor-adapter.js
var NullImageProcessorAdapter = class extends ImageProcessorPort {
  async renderEdits(originalSrc, _edits) {
    return originalSrc;
  }
  async crop(src, _crop) {
    return src;
  }
  async rotate(src, _degrees) {
    return src;
  }
  async applyFilter(src, _filter) {
    return src;
  }
};

// sdk/models.js
function normalizeEditStack(edits = {}) {
  const crop = edits && edits.crop && typeof edits.crop === "object" ? {
    x: Math.max(0, Math.min(1, Number(edits.crop.x) || 0)),
    y: Math.max(0, Math.min(1, Number(edits.crop.y) || 0)),
    w: Math.max(0, Math.min(1, Number(edits.crop.w) || 1)),
    h: Math.max(0, Math.min(1, Number(edits.crop.h) || 1))
  } : null;
  let rotate = 0;
  if (edits && edits.rotate !== void 0) {
    const r3 = (Math.round(Number(edits.rotate) / 90) * 90 % 360 + 360) % 360;
    if (r3 === 90 || r3 === 180 || r3 === 270) {
      rotate = /** @type {0|90|180|270} */
      r3;
    }
  }
  const filter = edits && edits.filter === "bw" ? "bw" : "none";
  return { crop, rotate, filter };
}

// sdk/core.js
var DEFAULT_FEATURES = ["crop", "rotate", "filter", "ocr", "export", "sync"];
var DEFAULT_EXPORT_FORMATS = ["pdf", "zip", "png", "jpg"];
var DEFAULT_OCR_LANGUAGES = ["eng"];
var registeredServices = {};
function getRegisteredService(name) {
  if (registeredServices[name]) return registeredServices[name];
  if (typeof globalThis !== "undefined" && globalThis.__copio_services__?.[name]) {
    return globalThis.__copio_services__[name];
  }
  return null;
}
function normalizeFeatures(features) {
  if (!features) return new Set(DEFAULT_FEATURES);
  if (features instanceof Set) return new Set(features);
  if (Array.isArray(features)) {
    return new Set(features.map((f4) => String(f4).trim().toLowerCase()).filter(Boolean));
  }
  if (typeof features === "string") {
    return new Set(
      features.split(/[\s,]+/).map((f4) => f4.trim().toLowerCase()).filter(Boolean)
    );
  }
  return new Set(DEFAULT_FEATURES);
}
function normalizeList(val, defaultVal) {
  if (!val) return [...defaultVal];
  if (Array.isArray(val)) return val.map((v4) => String(v4).trim().toLowerCase()).filter(Boolean);
  if (typeof val === "string") {
    return val.split(/[\s,]+/).map((v4) => v4.trim().toLowerCase()).filter(Boolean);
  }
  return [...defaultVal];
}
var _features, _exportFormats, _ocrLanguages, _maxPages, _licenseKey, _storage, _repository, _services, _ocr, _pdf, _imageProcessor, _undoStack, _redoStack, _CopioEngine_instances, pushUndo_fn, resolveDocId_fn, resolveDocAndPages_fn;
var CopioEngine = class {
  /**
   * @param {Object} [options]
   * @param {StoragePort} [options.storage] - Persistence adapter implementing StoragePort
   * @param {DocRepository} [options.repository] - Headless document repository instance
   * @param {Object} [options.services] - Custom driven adapters ({ export, ocr, sync, pdf, imageProcessor })
   * @param {ImageProcessorPort} [options.imageProcessor] - Image transform adapter
   * @param {string|string[]} [options.features] - Enabled feature set ('crop rotate filter ocr export sync')
   * @param {string|string[]} [options.exportFormats] - Supported export formats ('pdf', 'zip', 'png', 'jpg')
   * @param {string|string[]} [options.ocrLanguages] - Configured OCR languages ('eng', 'deu', etc.)
   * @param {number} [options.maxPages=0] - Maximum allowed pages (0 = unlimited)
   * @param {string} [options.assetBase] - Base URL for lazy-loaded assets and workers
   * @param {string} [options.licenseKey] - SDK commercial license key
   * @param {boolean} [options.ocr=true] - Whether OCR module is enabled (developer opt-in CPO-042)
   * @param {boolean} [options.pdf=true] - Whether PDF module is enabled (developer opt-in CPO-042)
   */
  constructor(options = {}) {
    __privateAdd(this, _CopioEngine_instances);
    __privateAdd(this, _features, new Set(DEFAULT_FEATURES));
    __privateAdd(this, _exportFormats, [...DEFAULT_EXPORT_FORMATS]);
    __privateAdd(this, _ocrLanguages, [...DEFAULT_OCR_LANGUAGES]);
    __privateAdd(this, _maxPages, 0);
    __privateAdd(this, _licenseKey, "");
    __privateAdd(this, _storage, null);
    __privateAdd(this, _repository, null);
    __privateAdd(this, _services, {});
    __privateAdd(this, _ocr, true);
    __privateAdd(this, _pdf, true);
    __privateAdd(this, _imageProcessor, null);
    __privateAdd(this, _undoStack, /* @__PURE__ */ new Map());
    __privateAdd(this, _redoStack, /* @__PURE__ */ new Map());
    __privateSet(this, _storage, options.storage || createDefaultAdapter(
      /** @type {any} */
      options
    ));
    __privateSet(this, _repository, options.repository || new DocRepository(__privateGet(this, _storage)));
    if (options.services) {
      __privateSet(this, _services, { ...options.services });
    }
    if (options.imageProcessor) {
      __privateSet(this, _imageProcessor, options.imageProcessor);
      __privateGet(this, _services).imageProcessor = options.imageProcessor;
    } else if (this.getService("imageProcessor")) {
      __privateSet(this, _imageProcessor, this.getService("imageProcessor"));
    } else if (typeof document !== "undefined") {
      __privateSet(this, _imageProcessor, new Canvas2DAdapter());
    } else {
      __privateSet(this, _imageProcessor, new NullImageProcessorAdapter());
    }
    if (options.features !== void 0) {
      this.setFeatures(options.features);
    }
    if (options.exportFormats !== void 0) {
      __privateSet(this, _exportFormats, normalizeList(options.exportFormats, DEFAULT_EXPORT_FORMATS));
    }
    if (options.ocrLanguages !== void 0) {
      __privateSet(this, _ocrLanguages, normalizeList(options.ocrLanguages, DEFAULT_OCR_LANGUAGES));
    }
    if (options.maxPages !== void 0) {
      __privateSet(this, _maxPages, Math.max(0, Number(options.maxPages) || 0));
    }
    if (options.assetBase !== void 0) {
      setAssetBase(options.assetBase);
    }
    if (options.licenseKey !== void 0) {
      __privateSet(this, _licenseKey, String(options.licenseKey || ""));
    }
    if (options.ocr !== void 0) {
      this.ocr = Boolean(options.ocr);
    } else if (options.features !== void 0 && !this.hasFeature("ocr")) {
      this.ocr = false;
    }
    if (options.pdf !== void 0) {
      this.pdf = Boolean(options.pdf);
    } else if (options.exportFormats !== void 0 && !__privateGet(this, _exportFormats).includes("pdf")) {
      this.pdf = false;
    }
  }
  /**
   * Initializes the underlying storage adapter.
   * @returns {Promise<{ kind: string, persistent: boolean }>}
   */
  async init() {
    return __privateGet(this, _storage).init();
  }
  // --- Configuration & Feature Gating API (CPO-035) ---
  /**
   * Register or override an adapter service for this engine instance.
   * @param {string} name 
   * @param {any} service 
   */
  setService(name, service) {
    __privateGet(this, _services)[name] = service;
  }
  /**
   * Retrieve an adapter service instance.
   * @param {string} name 
   * @returns {any}
   */
  getService(name) {
    return __privateGet(this, _services)[name] || getRegisteredService(name);
  }
  /**
   * Check if a specific feature is enabled.
   * @param {string} featureName
   * @returns {boolean}
   */
  hasFeature(featureName) {
    if (!featureName) return false;
    return __privateGet(this, _features).has(String(featureName).trim().toLowerCase());
  }
  /**
   * Returns list of currently enabled features.
   * @returns {string[]}
   */
  get features() {
    return Array.from(__privateGet(this, _features));
  }
  /**
   * Set enabled features.
   * @param {string|string[]|Set<string>} features
   */
  setFeatures(features) {
    __privateSet(this, _features, normalizeFeatures(features));
    if (!this.hasFeature("ocr")) {
      __privateSet(this, _ocr, false);
      this.setService("ocr", new NullOcrAdapter());
    } else {
      __privateSet(this, _ocr, true);
      if (this.getService("ocr") instanceof NullOcrAdapter) {
        this.setService("ocr", getRegisteredService("ocr"));
      }
    }
  }
  /**
   * Enable a specific feature.
   * @param {string} featureName
   */
  enableFeature(featureName) {
    if (featureName) {
      const name = String(featureName).trim().toLowerCase();
      __privateGet(this, _features).add(name);
      if (name === "ocr") {
        __privateSet(this, _ocr, true);
        if (this.getService("ocr") instanceof NullOcrAdapter) {
          this.setService("ocr", getRegisteredService("ocr"));
        }
      }
    }
  }
  /**
   * Disable a specific feature.
   * @param {string} featureName
   */
  disableFeature(featureName) {
    if (featureName) {
      const name = String(featureName).trim().toLowerCase();
      __privateGet(this, _features).delete(name);
      if (name === "ocr") {
        __privateSet(this, _ocr, false);
        this.setService("ocr", new NullOcrAdapter());
      }
    }
  }
  /**
   * Developer opt-in status for OCR heavy module (CPO-042).
   * @type {boolean}
   */
  get ocr() {
    return __privateGet(this, _ocr) && this.hasFeature("ocr");
  }
  set ocr(enabled) {
    __privateSet(this, _ocr, Boolean(enabled));
    if (__privateGet(this, _ocr)) {
      this.enableFeature("ocr");
      if (this.getService("ocr") instanceof NullOcrAdapter) {
        this.setService("ocr", getRegisteredService("ocr"));
      }
    } else {
      this.disableFeature("ocr");
      this.setService("ocr", new NullOcrAdapter());
    }
  }
  /**
   * Developer opt-in status for PDF heavy module (CPO-042).
   * @type {boolean}
   */
  get pdf() {
    return __privateGet(this, _pdf) && __privateGet(this, _exportFormats).includes("pdf");
  }
  set pdf(enabled) {
    __privateSet(this, _pdf, Boolean(enabled));
    if (__privateGet(this, _pdf)) {
      if (!__privateGet(this, _exportFormats).includes("pdf")) {
        __privateGet(this, _exportFormats).push("pdf");
      }
      if (this.getService("pdf") instanceof NullPdfAdapter) {
        this.setService("pdf", getRegisteredService("pdf"));
      }
    } else {
      __privateSet(this, _exportFormats, __privateGet(this, _exportFormats).filter((f4) => f4 !== "pdf"));
      this.setService("pdf", new NullPdfAdapter());
    }
  }
  /**
   * Get supported export formats.
   * @returns {string[]}
   */
  get exportFormats() {
    return [...__privateGet(this, _exportFormats)];
  }
  /**
   * Set supported export formats.
   * @param {string|string[]} formats
   */
  set exportFormats(formats) {
    __privateSet(this, _exportFormats, normalizeList(formats, DEFAULT_EXPORT_FORMATS));
    if (!__privateGet(this, _exportFormats).includes("pdf")) {
      __privateSet(this, _pdf, false);
      this.setService("pdf", new NullPdfAdapter());
    } else {
      __privateSet(this, _pdf, true);
      if (this.getService("pdf") instanceof NullPdfAdapter) {
        this.setService("pdf", getRegisteredService("pdf"));
      }
    }
  }
  /**
   * Get configured OCR languages.
   * @returns {string[]}
   */
  get ocrLanguages() {
    return [...__privateGet(this, _ocrLanguages)];
  }
  /**
   * Set configured OCR languages.
   * @param {string|string[]} langs
   */
  set ocrLanguages(langs) {
    __privateSet(this, _ocrLanguages, normalizeList(langs, DEFAULT_OCR_LANGUAGES));
  }
  /**
   * Maximum page limit (0 = unlimited).
   * @returns {number}
   */
  get maxPages() {
    return __privateGet(this, _maxPages);
  }
  /**
   * Set maximum page limit.
   * @param {number} limit
   */
  set maxPages(limit) {
    __privateSet(this, _maxPages, Math.max(0, Number(limit) || 0));
  }
  /**
   * Get asset base path.
   * @returns {string}
   */
  get assetBase() {
    return getAssetBase();
  }
  /**
   * Set asset base path for lazy worker/WASM loading.
   * @param {string} base
   */
  set assetBase(base) {
    setAssetBase(base);
  }
  /**
   * License key.
   * @returns {string}
   */
  get licenseKey() {
    return __privateGet(this, _licenseKey);
  }
  /**
   * Set license key.
   * @param {string} key
   */
  set licenseKey(key) {
    __privateSet(this, _licenseKey, String(key || ""));
  }
  /**
   * Underlying StoragePort adapter.
   * @returns {StoragePort}
   */
  get storage() {
    return __privateGet(this, _storage);
  }
  /**
   * Switch the underlying storage adapter.
   * @param {StoragePort} newStorage
   */
  setStorage(newStorage) {
    if (!newStorage) return;
    __privateSet(this, _storage, newStorage);
    __privateSet(this, _repository, new DocRepository(__privateGet(this, _storage)));
  }
  /**
   * Current ImageProcessorPort adapter.
   * @type {ImageProcessorPort}
   */
  get imageProcessor() {
    return __privateGet(this, _imageProcessor);
  }
  setImageProcessor(processor) {
    if (!processor) return;
    __privateSet(this, _imageProcessor, processor);
    this.setService("imageProcessor", processor);
  }
  /**
   * Underlying document repository.
   * @returns {DocRepository}
   */
  get docs() {
    return __privateGet(this, _repository);
  }
  // --- Document Repository Delegation ---
  async listDocuments() {
    return __privateGet(this, _repository).listDocs();
  }
  async getDocument(id) {
    return __privateGet(this, _repository).getDoc(id);
  }
  async createDocument(name, pages) {
    return __privateGet(this, _repository).createDoc(name, pages);
  }
  async deleteDocument(id, options = {}) {
    return __privateGet(this, _repository).deleteDoc(id, options);
  }
  async undoDeleteDocument(id) {
    return __privateGet(this, _repository).undoDeleteDoc(id);
  }
  async renameDocument(id, name) {
    return __privateGet(this, _repository).renameDoc(id, name);
  }
  async addPages(id, pages) {
    return __privateGet(this, _repository).addPages(id, pages);
  }
  async deletePage(id, pageId, options = {}) {
    __privateMethod(this, _CopioEngine_instances, pushUndo_fn).call(this, id, { type: "delete", pageId });
    return __privateGet(this, _repository).deletePage(id, pageId, options);
  }
  async undoDeletePage(id, pageId) {
    return __privateGet(this, _repository).undoDeletePage(id, pageId);
  }
  async updatePage(id, pageId, updates) {
    return __privateGet(this, _repository).updatePage(id, pageId, updates);
  }
  async reorderPages(id, pageIds) {
    const doc = await this.getDocument(id);
    const priorOrder = doc?.pages ? doc.pages.map((p3) => p3.id) : [];
    __privateMethod(this, _CopioEngine_instances, pushUndo_fn).call(this, id, { type: "reorder", priorOrder, newOrder: [...pageIds] });
    return __privateGet(this, _repository).reorderPages(id, pageIds);
  }
  /**
   * Applies non-destructive edits to a document page (CPO-011, CPO-045).
   * Generates derived src via ImageProcessorPort while keeping originalSrc intact.
   * 
   * @param {string} docId
   * @param {string} pageId
   * @param {Object} edits
   * @returns {Promise<Object>}
   */
  async applyEdit(docId, pageId, edits) {
    const targetDocId = await __privateMethod(this, _CopioEngine_instances, resolveDocId_fn).call(this, docId);
    const doc = targetDocId ? await this.getDocument(targetDocId) : null;
    if (!doc || !doc.pages) {
      throw new Error(`Document with ID "${targetDocId || docId}" not found`);
    }
    const page = doc.pages.find((p3) => p3.id === pageId);
    if (!page) {
      throw new Error(`Page with ID "${pageId}" not found in document "${targetDocId}"`);
    }
    const priorEdits = { ...page.edits || { crop: null, rotate: 0, filter: "none" } };
    const priorSrc = page.src;
    const mergedEdits = normalizeEditStack({ ...priorEdits, ...edits });
    const originalSrc = page.originalSrc || page.src;
    let derivedSrc = originalSrc;
    if (__privateGet(this, _imageProcessor)) {
      derivedSrc = await __privateGet(this, _imageProcessor).renderEdits(originalSrc, mergedEdits);
    }
    await this.updatePage(targetDocId, pageId, {
      originalSrc,
      src: derivedSrc,
      edits: mergedEdits
    });
    __privateMethod(this, _CopioEngine_instances, pushUndo_fn).call(this, targetDocId, {
      type: "edit",
      pageId,
      priorEdits,
      priorSrc,
      newEdits: mergedEdits,
      newSrc: derivedSrc
    });
    return {
      ...page,
      originalSrc,
      src: derivedSrc,
      edits: mergedEdits
    };
  }
  /**
   * Reverts the most recent operation on a document (CPO-016, CPO-045).
   * @param {string} docId
   * @returns {Promise<Object|null>}
   */
  async undo(docId) {
    const targetDocId = await __privateMethod(this, _CopioEngine_instances, resolveDocId_fn).call(this, docId);
    const stack = targetDocId ? __privateGet(this, _undoStack).get(targetDocId) : null;
    if (!stack || stack.length === 0) return null;
    const action = stack.pop();
    if (!__privateGet(this, _redoStack).has(targetDocId)) {
      __privateGet(this, _redoStack).set(targetDocId, []);
    }
    __privateGet(this, _redoStack).get(targetDocId).push(action);
    if (action.type === "edit") {
      await this.updatePage(targetDocId, action.pageId, {
        edits: action.priorEdits,
        src: action.priorSrc
      });
      return { type: "edit", pageId: action.pageId, restoredEdits: action.priorEdits };
    } else if (action.type === "delete") {
      await this.undoDeletePage(targetDocId, action.pageId);
      return { type: "delete", pageId: action.pageId };
    } else if (action.type === "reorder") {
      await __privateGet(this, _repository).reorderPages(targetDocId, action.priorOrder);
      return { type: "reorder", priorOrder: action.priorOrder };
    }
    return action;
  }
  /**
   * Re-applies the most recently reverted operation on a document (CPO-045).
   * @param {string} docId
   * @returns {Promise<Object|null>}
   */
  async redo(docId) {
    const targetDocId = await __privateMethod(this, _CopioEngine_instances, resolveDocId_fn).call(this, docId);
    const stack = targetDocId ? __privateGet(this, _redoStack).get(targetDocId) : null;
    if (!stack || stack.length === 0) return null;
    const action = stack.pop();
    if (!__privateGet(this, _undoStack).has(targetDocId)) {
      __privateGet(this, _undoStack).set(targetDocId, []);
    }
    __privateGet(this, _undoStack).get(targetDocId).push(action);
    if (action.type === "edit") {
      await this.updatePage(targetDocId, action.pageId, {
        edits: action.newEdits,
        src: action.newSrc
      });
      return { type: "edit", pageId: action.pageId, appliedEdits: action.newEdits };
    } else if (action.type === "delete") {
      await this.deletePage(targetDocId, action.pageId);
      return { type: "delete", pageId: action.pageId };
    } else if (action.type === "reorder") {
      await this.reorderPages(targetDocId, action.newOrder);
      return { type: "reorder", newOrder: action.newOrder };
    }
    return action;
  }
  subscribe(callback) {
    return __privateGet(this, _repository).subscribe(callback);
  }
  // --- Public Domain Methods & Use Cases (CPO-037) ---
  /**
   * Ingest and process an array of File or Blob objects, converting them to document pages.
   * Handles images (with EXIF extraction) and PDF files (rendering pages to data URLs).
   * 
   * @param {FileList|File[]|Blob[]} files
   * @param {string} [docId] - Target document ID (if omitted, attaches to latest or creates new doc)
   * @returns {Promise<Array<Object>>} Added page entities
   */
  async addFiles(files, docId = null) {
    if (!files || files.length === 0) return [];
    const fileList = Array.from(files);
    const newPages = [];
    for (const file of fileList) {
      if (file.type === "application/pdf") {
        const pdfService = this.getService("pdf");
        if (pdfService && typeof pdfService.renderPdfPagesToDataUrls === "function") {
          const rendered = await pdfService.renderPdfPagesToDataUrls(file);
          for (const dataUrl of rendered) {
            newPages.push({
              id: randomId(),
              src: dataUrl,
              originalSrc: dataUrl,
              edits: { crop: null, rotation: 0, filter: "none" },
              type: "image",
              name: (
                /** @type {any} */
                file.name || "PDF Page"
              )
            });
          }
        } else {
          console.warn("PDF import service (PdfPort) not registered. Skipping PDF file.");
        }
      } else if (file.type && file.type.startsWith("image/")) {
        const base64 = await fileToBase64(file);
        let orientation = null;
        try {
          orientation = await extractExif(file);
        } catch {
        }
        newPages.push({
          id: randomId(),
          src: base64,
          originalSrc: base64,
          edits: { crop: null, rotation: 0, filter: "none" },
          type: "image",
          name: (
            /** @type {any} */
            file.name || "Captured Image"
          ),
          orientation
        });
      }
    }
    if (newPages.length === 0) return [];
    let targetDocId = docId;
    if (!targetDocId) {
      const docs = await this.listDocuments();
      if (docs.length > 0) {
        targetDocId = docs[0].id;
      } else {
        const created = await this.createDocument("Scanned Document", []);
        targetDocId = created.id;
      }
    } else {
      const existing = await this.getDocument(targetDocId);
      if (!existing) {
        await __privateGet(this, _repository).saveDoc(targetDocId, { name: "Scanned Document", pages: [] });
      }
    }
    if (__privateGet(this, _maxPages) > 0) {
      const existing = (await this.getDocument(targetDocId))?.pages || [];
      const remainingSlots = Math.max(0, __privateGet(this, _maxPages) - existing.length);
      if (remainingSlots <= 0) {
        throw new Error(`Maximum page limit (${__privateGet(this, _maxPages)}) reached`);
      }
      newPages.splice(remainingSlots);
    }
    await this.addPages(targetDocId, newPages);
    return newPages;
  }
  /**
   * Get all pages for a document.
   * @param {string} [docId]
   * @returns {Promise<Array<Object>>}
   */
  async getPages(docId = null) {
    let targetDocId = docId;
    if (!targetDocId) {
      const docs = await this.listDocuments();
      if (docs.length === 0) return [];
      targetDocId = docs[0].id;
    }
    const doc = await this.getDocument(targetDocId);
    return doc?.pages || [];
  }
  /**
   * Clear all pages from a document.
   * @param {string} [docId]
   * @returns {Promise<void>}
   */
  async clear(docId = null) {
    let targetDocId = docId;
    if (!targetDocId) {
      const docs = await this.listDocuments();
      if (docs.length === 0) return;
      targetDocId = docs[0].id;
    }
    const doc = await this.getDocument(targetDocId);
    if (!doc || !doc.pages) return;
    for (const p3 of doc.pages) {
      await this.deletePage(targetDocId, p3.id);
    }
  }
  /**
   * Export document pages as a PDF Blob.
   * Does NOT trigger automatic browser download unless options.download === true.
   * 
   * @param {string|Array<Object>} [docIdOrPages]
   * @param {Object} [options]
   * @param {boolean} [options.download=false] - Whether to trigger browser download
   * @param {Function} [options.onProgress] - Progress callback (done, total)
   * @returns {Promise<Blob>}
   */
  async exportPdf(docIdOrPages, options = {}) {
    if (!this.hasFeature("export")) {
      const err = new Error('Feature "export" is disabled');
      Object.assign(err, { code: "FEATURE_DISABLED" });
      throw err;
    }
    if (!__privateGet(this, _pdf) || !__privateGet(this, _exportFormats).includes("pdf")) {
      const err = new Error('Feature "pdf" is disabled');
      Object.assign(err, { code: "FEATURE_DISABLED" });
      throw err;
    }
    const { docName, pages } = await __privateMethod(this, _CopioEngine_instances, resolveDocAndPages_fn).call(this, docIdOrPages);
    const exportService = this.getService("pdf") || this.getService("export");
    if (!exportService || typeof exportService.exportDocumentAsPdf !== "function") {
      throw new Error("Export service (PdfPort) is not registered. Import @copio/sdk or register an exportService.");
    }
    return exportService.exportDocumentAsPdf(docName, pages, {
      download: false,
      showProgress: false,
      ...options
    });
  }
  /**
   * Export document pages as a ZIP (or single image) Blob.
   * Does NOT trigger automatic browser download unless options.download === true.
   * 
   * @param {string|Array<Object>} [docIdOrPages]
   * @param {Object} [options]
   * @param {boolean} [options.download=false] - Whether to trigger browser download
   * @param {Function} [options.onProgress] - Progress callback (done, total)
   * @returns {Promise<Blob>}
   */
  async exportZip(docIdOrPages, options = {}) {
    if (!this.hasFeature("export")) {
      const err = new Error('Feature "export" is disabled');
      Object.assign(err, { code: "FEATURE_DISABLED" });
      throw err;
    }
    const { docName, pages } = await __privateMethod(this, _CopioEngine_instances, resolveDocAndPages_fn).call(this, docIdOrPages);
    const exportService = this.getService("export");
    if (!exportService || typeof exportService.exportDocumentAsImages !== "function") {
      throw new Error("Export service is not registered. Import @copio/sdk or register an exportService.");
    }
    return exportService.exportDocumentAsImages(docName, pages, {
      download: false,
      showProgress: false,
      ...options
    });
  }
  /**
   * Run optical character recognition on document pages.
   * 
   * @param {string|Array<Object>} [docIdOrPages]
   * @param {string} [pageId] - Optional specific page ID to recognize
   * @param {Object} [options]
   * @param {string} [options.lang] - OCR language (defaults to first configured language or 'eng')
   * @param {Function} [options.onPageProgress]
   * @returns {Promise<{ combinedText: string, text: string, pagesResults: Array<Object>, averageConfidence: number }>}
   */
  async runOcr(docIdOrPages, pageId = null, options = {}) {
    if (!__privateGet(this, _ocr) || !this.hasFeature("ocr")) {
      const err = new Error('Feature "ocr" is disabled');
      Object.assign(err, { code: "FEATURE_DISABLED" });
      throw err;
    }
    const { pages } = await __privateMethod(this, _CopioEngine_instances, resolveDocAndPages_fn).call(this, docIdOrPages);
    let targetPages = pages;
    if (pageId) {
      targetPages = pages.filter((p3) => p3.id === pageId);
    }
    const ocrService = this.getService("ocr");
    if (!ocrService || typeof ocrService.recognizeDocumentPages !== "function") {
      throw new Error("OCR service (OcrPort) is not registered. Import @copio/sdk or register an ocrService.");
    }
    const lang = options.lang || __privateGet(this, _ocrLanguages)[0] || "eng";
    const result = await ocrService.recognizeDocumentPages(targetPages, {
      lang,
      ...options
    });
    return {
      text: result.combinedText,
      ...result
    };
  }
  /**
   * Initialize P2P synchronization session.
   * 
   * @param {Object} [options]
   * @param {Function} [options.onStateChange]
   * @returns {Promise<any>}
   */
  async sync(options = {}) {
    if (!this.hasFeature("sync")) {
      const err = new Error('Feature "sync" is disabled');
      Object.assign(err, { code: "FEATURE_DISABLED" });
      throw err;
    }
    const SyncManagerClass = this.getService("sync");
    if (!SyncManagerClass) {
      throw new Error("Sync service (SyncPort) is not registered. Import @copio/sdk or register a syncService.");
    }
    return new SyncManagerClass(__privateGet(this, _repository), options.onStateChange);
  }
};
_features = new WeakMap();
_exportFormats = new WeakMap();
_ocrLanguages = new WeakMap();
_maxPages = new WeakMap();
_licenseKey = new WeakMap();
_storage = new WeakMap();
_repository = new WeakMap();
_services = new WeakMap();
_ocr = new WeakMap();
_pdf = new WeakMap();
_imageProcessor = new WeakMap();
_undoStack = new WeakMap();
_redoStack = new WeakMap();
_CopioEngine_instances = new WeakSet();
pushUndo_fn = function(docId, action) {
  if (!__privateGet(this, _undoStack).has(docId)) {
    __privateGet(this, _undoStack).set(docId, []);
  }
  const stack = __privateGet(this, _undoStack).get(docId);
  stack.push(action);
  if (stack.length > 50) stack.shift();
  if (__privateGet(this, _redoStack).has(docId)) {
    __privateGet(this, _redoStack).get(docId).length = 0;
  }
};
resolveDocId_fn = async function(docId) {
  if (docId) return docId;
  const docs = await this.listDocuments();
  return docs.length > 0 ? docs[0].id : null;
};
resolveDocAndPages_fn = async function(docIdOrPages) {
  if (Array.isArray(docIdOrPages)) {
    return { docName: "document", pages: docIdOrPages, docId: null };
  }
  if (typeof docIdOrPages === "string") {
    const doc = await this.getDocument(docIdOrPages);
    return {
      docName: doc?.name || "document",
      pages: doc?.pages || [],
      docId: docIdOrPages
    };
  }
  const docs = await this.listDocuments();
  if (docs.length > 0) {
    const doc = await this.getDocument(docs[0].id);
    return {
      docName: doc?.name || "document",
      pages: doc?.pages || [],
      docId: docs[0].id
    };
  }
  return { docName: "document", pages: [], docId: null };
};

// sdk/events.js
var COPIO_EVENTS = {
  PAGE_ADDED: "copio:page-added",
  PAGE_REMOVED: "copio:page-removed",
  PAGES_CHANGED: "copio:pages-changed",
  SCAN_COMPLETE: "copio:scan-complete",
  EXPORT_PROGRESS: "copio:export-progress",
  EXPORT_COMPLETE: "copio:export-complete",
  OCR_COMPLETE: "copio:ocr-complete",
  SYNC_CONNECTED: "copio:sync-connected",
  ERROR: "copio:error"
};
function dispatchCopioEvent(target, eventName, detail = {}) {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    composed: true,
    cancelable: true,
    detail
  });
  if (target && typeof target.dispatchEvent === "function") {
    target.dispatchEvent(event);
  }
  return event;
}

// sdk/styles.js
var scannerCss = `
/* ==========================================================================
   1. HOST RESET & BOUNDARY ENCAPSULATION
   all: initial isolates inherited typography, line-height, text-align, etc.
   ========================================================================== */
:host {
  all: initial;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 320px;
  container-type: inline-size;
  container-name: copio-scanner;
  overflow: hidden;
  contain: layout;
  box-sizing: border-box;
  text-align: left;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Typography Design Tokens */
  --copio-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --copio-font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;

  /* Surface & Background Tokens (Default Dark) */
  --copio-color-bg: #0b0f17;
  --copio-color-surface: #131b26;
  --copio-color-surface-elevated: #1c2736;
  --copio-color-surface-overlay: rgba(15, 22, 32, 0.88);
  --copio-color-stage-bg: #070a0f;

  /* Text & Iconography Tokens */
  --copio-color-text: #f1f5f9;
  --copio-color-text-muted: #94a3b8;
  --copio-color-text-inverse: #090d14;

  /* Brand & Semantic Accent Tokens */
  --copio-color-primary: #38bdf8;
  --copio-color-primary-hover: #7dd3fc;
  --copio-color-primary-contrast: #06131f;
  --copio-color-success: #22c55e;
  --copio-color-warning: #f59e0b;
  --copio-color-danger: #ef4444;

  /* Borders, Dividers & Focus Rings */
  --copio-color-border: rgba(148, 163, 184, 0.18);
  --copio-color-border-strong: rgba(148, 163, 184, 0.34);
  --copio-focus-ring: 0 0 0 2px #0b0f17, 0 0 0 4px #38bdf8;

  /* Geometry, Spacing & Touch Ergonomics (>=44px touch targets) */
  --copio-radius-sm: 6px;
  --copio-radius-md: 10px;
  --copio-radius-lg: 14px;
  --copio-radius-pill: 9999px;
  --copio-spacing-xs: 4px;
  --copio-spacing-sm: 8px;
  --copio-spacing-md: 12px;
  --copio-spacing-lg: 16px;
  --copio-spacing-xl: 24px;
  --copio-touch-target-min: 44px;
  --copio-crop-handle-hit: 48px;
  --copio-crop-handle-visual: 16px;
  --copio-shadow-elevated: 0 12px 32px -4px rgba(0, 0, 0, 0.55);
  --copio-transition-fast: 150ms cubic-bezier(0.22, 1, 0.36, 1);
  --copio-transition-normal: 240ms cubic-bezier(0.22, 1, 0.36, 1);

  /* Shoelace Theme Mapping */
  --sl-font-sans: var(--copio-font-family);
  --sl-font-mono: var(--copio-font-mono);
  --sl-color-primary-50: #f0f9ff;
  --sl-color-primary-100: #e0f2fe;
  --sl-color-primary-200: #bae6fd;
  --sl-color-primary-300: #7dd3fc;
  --sl-color-primary-400: #38bdf8;
  --sl-color-primary-500: #0ea5e9;
  --sl-color-primary-600: var(--copio-color-primary);
  --sl-color-primary-700: #0369a1;
  --sl-color-primary-800: #075985;
  --sl-color-primary-900: #0c4a6e;
  --sl-color-primary-950: #082f49;

  font-family: var(--copio-font-family);
  font-size: 14px;
  line-height: 1.5;
  color: var(--copio-color-text);
  background-color: var(--copio-color-bg);
  color-scheme: dark;
}

/* Explicit Dark Theme Override */
:host([theme="dark"]),
:host(.copio-theme-dark),
:host-context([data-theme="dark"]),
:host-context(.sl-theme-dark),
:host-context(.theme-dark) {
  --copio-color-bg: #0b0f17;
  --copio-color-surface: #131b26;
  --copio-color-surface-elevated: #1c2736;
  --copio-color-surface-overlay: rgba(15, 22, 32, 0.88);
  --copio-color-stage-bg: #070a0f;
  --copio-color-text: #f1f5f9;
  --copio-color-text-muted: #94a3b8;
  --copio-color-text-inverse: #090d14;
  --copio-color-primary: #38bdf8;
  --copio-color-primary-hover: #7dd3fc;
  --copio-color-primary-contrast: #06131f;
  --copio-color-success: #22c55e;
  --copio-color-warning: #f59e0b;
  --copio-color-danger: #ef4444;
  --copio-color-border: rgba(148, 163, 184, 0.18);
  --copio-color-border-strong: rgba(148, 163, 184, 0.34);
  --copio-focus-ring: 0 0 0 2px #0b0f17, 0 0 0 4px #38bdf8;
  --copio-radius-sm: 6px;
  --copio-radius-md: 10px;
  --copio-radius-lg: 14px;
  --copio-shadow-elevated: 0 12px 32px -4px rgba(0, 0, 0, 0.55);
  color-scheme: dark;
}

/* Light Theme Override */
:host([theme="light"]),
:host(.copio-theme-light),
:host-context([data-theme="light"]),
:host-context(.sl-theme-light),
:host-context(.theme-light) {
  --copio-color-bg: #f8fafc;
  --copio-color-surface: #ffffff;
  --copio-color-surface-elevated: #f1f5f9;
  --copio-color-surface-overlay: rgba(255, 255, 255, 0.92);
  --copio-color-stage-bg: #1e293b;
  --copio-color-text: #0f172a;
  --copio-color-text-muted: #475569;
  --copio-color-text-inverse: #ffffff;
  --copio-color-primary: #0284c7;
  --copio-color-primary-hover: #0369a1;
  --copio-color-primary-contrast: #ffffff;
  --copio-color-success: #16a34a;
  --copio-color-warning: #d97706;
  --copio-color-danger: #dc2626;
  --copio-color-border: rgba(15, 23, 42, 0.12);
  --copio-color-border-strong: rgba(15, 23, 42, 0.26);
  --copio-focus-ring: 0 0 0 2px #ffffff, 0 0 0 4px #0284c7;
  --copio-radius-sm: 6px;
  --copio-radius-md: 10px;
  --copio-radius-lg: 14px;
  --copio-shadow-elevated: 0 12px 28px -4px rgba(15, 23, 42, 0.18);
  color-scheme: light;
}

/* Brand Theme Override (Emerald) */
:host([theme="brand"]),
:host(.copio-theme-brand),
:host-context([data-theme="brand"]),
:host-context(.theme-brand) {
  --copio-color-bg: #0f111a;
  --copio-color-surface: #181b28;
  --copio-color-surface-elevated: #23273a;
  --copio-color-surface-overlay: rgba(24, 27, 40, 0.90);
  --copio-color-stage-bg: #090a10;
  --copio-color-text: #f8fafc;
  --copio-color-text-muted: #9ca3af;
  --copio-color-text-inverse: #ffffff;
  --copio-color-primary: #10b981;
  --copio-color-primary-hover: #34d399;
  --copio-color-primary-contrast: #042f2e;
  --copio-color-success: #10b981;
  --copio-color-warning: #f59e0b;
  --copio-color-danger: #ef4444;
  --copio-color-border: rgba(16, 185, 129, 0.22);
  --copio-color-border-strong: rgba(16, 185, 129, 0.42);
  --copio-focus-ring: 0 0 0 2px #0f111a, 0 0 0 4px #10b981;
  --copio-radius-sm: 4px;
  --copio-radius-md: 8px;
  --copio-radius-lg: 12px;
  --copio-shadow-elevated: 0 12px 32px -4px rgba(0, 0, 0, 0.65);
  color-scheme: dark;
}

/* Auto Theme: follows prefers-color-scheme when theme is auto */
@media (prefers-color-scheme: light) {
  :host([theme="auto"]),
  :host(.copio-theme-auto) {
    --copio-color-bg: #f8fafc;
    --copio-color-surface: #ffffff;
    --copio-color-surface-elevated: #f1f5f9;
    --copio-color-surface-overlay: rgba(255, 255, 255, 0.92);
    --copio-color-stage-bg: #1e293b;
    --copio-color-text: #0f172a;
    --copio-color-text-muted: #475569;
    --copio-color-text-inverse: #ffffff;
    --copio-color-primary: #0284c7;
    --copio-color-primary-hover: #0369a1;
    --copio-color-primary-contrast: #ffffff;
    --copio-color-success: #16a34a;
    --copio-color-warning: #d97706;
    --copio-color-danger: #dc2626;
    --copio-color-border: rgba(15, 23, 42, 0.12);
    --copio-color-border-strong: rgba(15, 23, 42, 0.26);
    --copio-focus-ring: 0 0 0 2px #ffffff, 0 0 0 4px #0284c7;
    --copio-radius-sm: 6px;
    --copio-radius-md: 10px;
    --copio-radius-lg: 14px;
    --copio-shadow-elevated: 0 12px 28px -4px rgba(15, 23, 42, 0.18);
    color-scheme: light;
  }
}

/* ==========================================================================
   2. INTERNAL ELEMENT RESET (Scoped to Shadow DOM)
   ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
}

::slotted(*) {
  box-sizing: border-box;
}

/* ==========================================================================
   3. ROOT CONTAINER & COMPONENT SHELL
   ========================================================================== */
.copio-scanner-container {
  width: 100%;
  height: 100%;
  min-height: 320px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  container-type: inline-size;
  container-name: copio-scanner;
  contain: layout;
  background: var(--copio-color-bg);
  color: var(--copio-color-text);
  font-family: var(--copio-font-family);
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  direction: ltr;
  user-select: none;
}

/* Header (Shadow Part: header) */
.copio-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--copio-spacing-sm);
  padding: var(--copio-spacing-sm) var(--copio-spacing-md);
  background: var(--copio-color-surface);
  border-bottom: 1px solid var(--copio-color-border);
  min-height: 52px;
  flex-shrink: 0;
  z-index: 5;
  box-sizing: border-box;
}

.copio-header-left {
  display: flex;
  align-items: center;
  gap: var(--copio-spacing-sm);
  min-width: 0;
}

.copio-mode-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: var(--copio-radius-pill);
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-primary);
  border: 1px solid var(--copio-color-border);
  white-space: nowrap;
}

.copio-title-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.copio-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--copio-color-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copio-subtitle {
  font-size: 11px;
  color: var(--copio-color-text-muted);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copio-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

/* Interactive Stage Switcher Pill (Viewfinder vs Workbench) */
.copio-stage-tabs {
  display: inline-flex;
  background: var(--copio-color-bg);
  padding: 2px;
  border-radius: var(--copio-radius-md);
  border: 1px solid var(--copio-color-border);
}

.copio-stage-tab {
  appearance: none;
  border: none;
  background: transparent;
  color: var(--copio-color-text-muted);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 10px;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  border-radius: var(--copio-radius-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background var(--copio-transition-fast), color var(--copio-transition-fast);
}

.copio-stage-tab[aria-selected="true"] {
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-text);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Touch-Safe Interactive Buttons (>=44px touch invariant) */
.copio-btn {
  appearance: none;
  border: 1px solid var(--copio-color-border);
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-text);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  padding: 0 12px;
  border-radius: var(--copio-radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
  white-space: nowrap;
  text-decoration: none;
  box-sizing: border-box;
}

.copio-btn:hover {
  background: var(--copio-color-primary-hover);
  color: var(--copio-color-primary-contrast);
  border-color: var(--copio-color-primary);
}

.copio-btn-primary {
  background: var(--copio-color-primary);
  color: var(--copio-color-primary-contrast);
  border-color: var(--copio-color-primary);
}

.copio-btn-danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--copio-color-danger);
  border-color: rgba(239, 68, 68, 0.35);
}

.copio-btn-danger:hover {
  background: var(--copio-color-danger);
  color: #fff;
}

/* Viewfinder (Shadow Part: viewfinder) */
.copio-viewfinder,
.copio-viewfinder-stage {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--copio-color-stage-bg);
  overflow: hidden;
  min-height: 268px;
  width: 100%;
}

.copio-viewfinder-feed,
.copio-camera-feed {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 20px 104px 20px;
  background: radial-gradient(circle at 50% 45%, #1e293b 0%, #090d14 75%);
}

/* Framing Guide Overlay (receipt | card | a4 | auto) */
.copio-framing-guide {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  border: 1.5px dashed rgba(56, 189, 248, 0.55);
  border-radius: 12px;
  box-shadow: 0 0 0 9999px rgba(4, 7, 12, 0.52);
  transition: all var(--copio-transition-normal);
  overflow: hidden;
}

.copio-framing-guide[data-aspect="receipt"] {
  aspect-ratio: 1 / 2.1;
  height: 100%;
}

.copio-framing-guide[data-aspect="card"] {
  aspect-ratio: 1.586 / 1;
  width: 92%;
  max-height: 82%;
}

.copio-framing-guide[data-aspect="a4"] {
  aspect-ratio: 1 / 1.414;
  height: 96%;
}

.copio-framing-guide[data-aspect="auto"] {
  width: 94%;
  height: 94%;
}

.copio-camera-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--copio-color-text-muted);
  text-align: center;
  padding: 14px;
  font-size: 12px;
  font-weight: 500;
}

/* Corner Targeting Brackets */
.copio-corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: var(--copio-color-primary);
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  z-index: 2;
}
.copio-corner.tl { top: 6px; left: 6px; border-top-width: 3px; border-left-width: 3px; border-top-left-radius: 6px; }
.copio-corner.tr { top: 6px; right: 6px; border-top-width: 3px; border-right-width: 3px; border-top-right-radius: 6px; }
.copio-corner.bl { bottom: 6px; left: 6px; border-bottom-width: 3px; border-left-width: 3px; border-bottom-left-radius: 6px; }
.copio-corner.br { bottom: 6px; right: 6px; border-bottom-width: 3px; border-right-width: 3px; border-bottom-right-radius: 6px; }

/* Top Viewfinder HUD Overlay (Step Pill + Privacy Assurance Badge) */
.copio-viewfinder-hud-top {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(to bottom, rgba(7, 10, 15, 0.85), transparent);
}

.copio-step-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--copio-radius-pill);
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(56, 189, 248, 0.45);
  color: #f8fafc;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.copio-privacy-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: var(--copio-radius-pill);
  background: rgba(22, 101, 52, 0.35);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #86efac;
  font-size: 11px;
  font-weight: 500;
}

/* Shutter Dock (Shadow Part: shutter-dock) */
.copio-shutter-dock {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-border);
  min-height: 84px;
  flex-shrink: 0;
}

.copio-shutter-side {
  flex: 1;
  display: flex;
  align-items: center;
}

.copio-shutter-side.right {
  justify-content: flex-end;
}

.copio-shutter-btn {
  appearance: none;
  width: 64px;
  height: 64px;
  border-radius: var(--copio-radius-pill);
  border: 4px solid var(--copio-color-primary);
  background: transparent;
  padding: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--copio-transition-fast), border-color 150ms ease;
  flex-shrink: 0;
}

.copio-shutter-btn:hover {
  transform: scale(1.04);
}

.copio-shutter-btn:active {
  transform: scale(0.94);
}

.copio-shutter-btn-inner,
.copio-shutter-inner {
  width: 100%;
  height: 100%;
  border-radius: var(--copio-radius-pill);
  background: var(--copio-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--copio-color-primary-contrast);
  transition: transform var(--copio-transition-fast);
}

.copio-shutter-btn:active .copio-shutter-btn-inner,
.copio-shutter-btn:active .copio-shutter-inner {
  transform: scale(0.88);
}

/* Stacking Thumbnail Counter Pill in Viewfinder */
.copio-stack-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: var(--copio-touch-target-min);
  padding: 4px 12px 4px 6px;
  border-radius: var(--copio-radius-md);
  background: var(--copio-color-surface-elevated);
  border: 1px solid var(--copio-color-primary);
  color: var(--copio-color-text);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.copio-stack-thumb {
  width: 30px;
  height: 36px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: #000;
}

/* Workbench & Filmstrip (Shadow Part: workbench) */
.copio-workbench,
.copio-workbench-stage {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background: var(--copio-color-bg);
  overflow: hidden;
  min-height: 0;
  width: 100%;
}

.copio-workbench-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
  overflow: hidden;
}

.copio-stage-canvas,
.copio-canvas-viewport {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px 20px 44px 20px;
  background: var(--copio-color-stage-bg);
  min-height: 180px;
}

.copio-canvas-viewport.has-card-switcher {
  padding-top: 66px;
}

.copio-canvas-viewport.is-cropping {
  padding: 74px 26px 26px 26px;
}

/* Card Side Switcher */
.copio-card-side-switcher {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: inline-flex;
  gap: 4px;
  padding: 3px;
  background: var(--copio-color-surface-overlay, rgba(15, 22, 32, 0.88));
  border: 1px solid var(--copio-color-border-strong);
  border-radius: var(--copio-radius-pill);
  backdrop-filter: blur(8px);
}

.copio-side-pill {
  appearance: none;
  border: none;
  background: transparent;
  color: var(--copio-color-text-muted);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 12px;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  border-radius: var(--copio-radius-pill);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.copio-side-pill[aria-selected="true"] {
  background: var(--copio-color-primary);
  color: var(--copio-color-primary-contrast);
}

.copio-stage-figure {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}

.copio-stage-canvas img,
.copio-stage-img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: var(--copio-shadow-elevated);
  border-radius: var(--copio-radius-sm);
  user-select: none;
}

.copio-edit-state-bar {
  position: absolute;
  bottom: 10px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 5;
}

.copio-status-chip {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--copio-radius-pill);
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #e2e8f0;
  font-size: 11px;
  font-weight: 500;
  backdrop-filter: blur(6px);
}

/* ==========================================================================
   NON-DESTRUCTIVE CROP OVERLAY (CPO-025)
   ========================================================================== */
.copio-crop-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 8;
  touch-action: none;
}

.copio-crop-box {
  position: absolute;
  border: 2px solid var(--copio-color-primary);
  box-shadow: 0 0 0 9999px rgba(5, 8, 14, 0.68);
  cursor: move;
  touch-action: none;
  box-sizing: border-box;
}

/* Rule-of-thirds crop grid */
.copio-crop-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(56, 189, 248, 0.28) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(56, 189, 248, 0.28) 1px, transparent 1px);
  background-size: 33.333% 33.333%;
}

/* 48px x 48px Touch Target Handles (exceeds 44px requirement) */
.copio-crop-handle {
  position: absolute;
  width: var(--copio-crop-handle-hit);
  height: var(--copio-crop-handle-hit);
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  touch-action: none;
  box-sizing: border-box;
}

.copio-crop-handle::after {
  content: '';
  width: var(--copio-crop-handle-visual);
  height: var(--copio-crop-handle-visual);
  border-radius: 50%;
  background: var(--copio-color-primary);
  border: 2.5px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  transition: transform 120ms ease;
  box-sizing: border-box;
}

.copio-crop-handle:hover::after,
.copio-crop-handle:active::after {
  transform: scale(1.25);
  background: var(--copio-color-success, #22c55e);
}

.copio-crop-handle.nw { top: -24px; left: -24px; cursor: nwse-resize; }
.copio-crop-handle.ne { top: -24px; right: -24px; cursor: nesw-resize; }
.copio-crop-handle.sw { bottom: -24px; left: -24px; cursor: nesw-resize; }
.copio-crop-handle.se { bottom: -24px; right: -24px; cursor: nwse-resize; }
.copio-crop-handle.n  { top: -24px; left: calc(50% - 24px); cursor: ns-resize; }
.copio-crop-handle.s  { bottom: -24px; left: calc(50% - 24px); cursor: ns-resize; }
.copio-crop-handle.w  { left: -24px; top: calc(50% - 24px); cursor: ew-resize; }
.copio-crop-handle.e  { right: -24px; top: calc(50% - 24px); cursor: ew-resize; }

/* Crop Sub-Toolbar Banner */
.copio-crop-banner {
  position: absolute;
  top: 8px;
  left: 12px;
  right: 12px;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 8px;
  background: var(--copio-color-surface-overlay, rgba(15, 23, 42, 0.94));
  border: 1px solid var(--copio-color-primary);
  border-radius: var(--copio-radius-md);
  box-shadow: var(--copio-shadow-elevated);
}

.copio-crop-banner-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--copio-color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copio-crop-banner-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

/* Filmstrip & Reorder Tray */
.copio-filmstrip,
.copio-filmstrip-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-border);
  overflow-x: auto;
  min-height: 80px;
  flex-shrink: 0;
}

.copio-thumb-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  flex-shrink: 0;
  padding: 4px;
  border-radius: var(--copio-radius-sm);
  background: var(--copio-color-surface-elevated);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
}

.copio-thumb-card[aria-selected="true"] {
  border-color: var(--copio-color-primary);
  background: rgba(56, 189, 248, 0.12);
}

.copio-thumb-card.dragging {
  opacity: 0.4;
  transform: scale(0.95);
}

.copio-thumb-img-wrap {
  width: 48px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copio-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.copio-thumb-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
  font-size: 10px;
  font-weight: 600;
  color: var(--copio-color-text-muted);
}

.copio-filmstrip-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: auto;
}

.copio-add-page-tile {
  min-width: 60px;
  height: 82px;
  padding: 0 8px;
  flex-shrink: 0;
  border-radius: var(--copio-radius-sm);
  border: 1.5px dashed var(--copio-color-border-strong);
  background: transparent;
  color: var(--copio-color-text-muted);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
}

.copio-add-page-tile:hover {
  border-color: var(--copio-color-primary);
  color: var(--copio-color-primary);
  background: rgba(56, 189, 248, 0.06);
}

/* Edit Action Toolbar & Primary Completion Dock */
.copio-toolbar,
.copio-controls-dock {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-border);
  min-height: 56px;
  flex-shrink: 0;
  z-index: 6;
}

.copio-edit-toolbar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
}

.copio-edit-toolbar.cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.copio-tool-btn {
  appearance: none;
  border: 1px solid var(--copio-color-border);
  background: var(--copio-color-surface-elevated);
  color: var(--copio-color-text);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  padding: 4px 6px;
  border-radius: var(--copio-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  transition: all var(--copio-transition-fast);
}

.copio-tool-btn:hover:not(:disabled) {
  border-color: var(--copio-color-border-strong);
  background: rgba(255, 255, 255, 0.06);
}

.copio-tool-btn[aria-pressed="true"] {
  background: rgba(56, 189, 248, 0.16);
  color: var(--copio-color-primary);
  border-color: var(--copio-color-primary);
}

.copio-tool-btn.danger {
  color: #fca5a5;
}

.copio-tool-btn.danger:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.16);
  border-color: rgba(239, 68, 68, 0.45);
}

.copio-submit-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.copio-submit-btn {
  flex: 1;
  min-height: 46px;
  font-size: 14px;
}

/* Container-Scoped Toast & Undo Notification */
.copio-toast-region {
  position: absolute;
  bottom: 124px;
  left: 12px;
  right: 12px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.copio-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--copio-radius-md);
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid var(--copio-color-primary);
  box-shadow: var(--copio-shadow-elevated);
  font-size: 12px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.copio-toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--copio-color-primary);
  transition: width 100ms linear;
}

.copio-toast-undo-btn {
  appearance: none;
  border: 1px solid rgba(56, 189, 248, 0.45);
  background: rgba(56, 189, 248, 0.16);
  color: #38bdf8;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  min-height: var(--copio-touch-target-min);
  min-width: var(--copio-touch-target-min);
  padding: 0 12px;
  border-radius: var(--copio-radius-sm);
  cursor: pointer;
  flex-shrink: 0;
}

/* Slide-up OCR Extraction Sheet */
.copio-ocr-sheet {
  position: absolute;
  inset: auto 0 0 0;
  max-height: 78%;
  background: var(--copio-color-surface);
  border-top: 1px solid var(--copio-color-primary);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.65);
  z-index: 25;
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 10px;
}

.copio-ocr-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.copio-ocr-textarea {
  width: 100%;
  min-height: 130px;
  flex: 1;
  resize: none;
  background: var(--copio-color-bg);
  color: var(--copio-color-text);
  border: 1px solid var(--copio-color-border);
  border-radius: var(--copio-radius-sm);
  padding: 10px;
  font-family: var(--copio-font-mono);
  font-size: 11px;
  line-height: 1.5;
}

/* Container-Scoped Toast Stack */
.sl-toast-stack,
.copio-toast-stack-scoped {
  position: absolute !important;
  top: auto !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  padding: var(--copio-spacing-md) !important;
  box-sizing: border-box !important;
  z-index: 1000 !important;
  pointer-events: none;
}

.sl-toast-stack sl-alert,
.copio-toast-stack-scoped sl-alert {
  pointer-events: auto;
  margin-top: var(--copio-spacing-sm);
}

/* ==========================================================================
   4. @container BREAKPOINTS (Strictly Container Queries)
   ========================================================================== */

/* Modal Breakpoint: <= 400px */
@container copio-scanner (max-width: 400px) {
  .copio-header {
    padding: 6px 10px;
    min-height: 52px;
  }
  .copio-header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .copio-mode-badge {
    font-size: 10px;
    padding: 2px 6px;
  }
  .copio-subtitle {
    display: none;
  }
  .copio-privacy-pill span.hide-compact {
    display: none;
  }
  .copio-crop-banner-text {
    display: none;
  }
  .copio-crop-banner-actions {
    width: 100%;
    justify-content: space-between;
  }
  .copio-filmstrip-bar {
    gap: 6px;
    padding: 6px 8px;
  }
  .copio-thumb-card {
    width: 52px;
    padding: 3px;
  }
  .copio-thumb-img-wrap {
    width: 42px;
    height: 52px;
  }
  .copio-filmstrip-actions {
    gap: 4px;
  }
  .copio-add-page-tile {
    min-width: 52px;
    height: 70px;
    padding: 0 6px;
    font-size: 10px;
  }
  .copio-tool-btn {
    font-size: 10px;
    padding: 3px 4px;
  }
  .copio-btn {
    padding: 0 8px;
    font-size: 12px;
  }
}

/* Drawer Breakpoint: 401px..767px */
@container copio-scanner (min-width: 401px) and (max-width: 767px) {
  .copio-header {
    padding: var(--copio-spacing-sm) var(--copio-spacing-md);
  }
  .copio-tool-btn {
    flex-direction: row;
    font-size: 12px;
    gap: 6px;
  }
}

/* Full View Breakpoint: >= 768px */
@container copio-scanner (min-width: 768px) {
  .copio-header {
    padding: var(--copio-spacing-md) var(--copio-spacing-lg);
  }
  .copio-workbench-main {
    flex-direction: row;
  }
  .copio-filmstrip-bar {
    order: -1;
    flex-direction: column;
    width: 168px;
    height: 100%;
    border-top: none;
    border-right: 1px solid var(--copio-color-border);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px;
  }
  .copio-thumb-card {
    width: 100%;
    padding: 8px;
  }
  .copio-thumb-img-wrap {
    width: 100%;
    height: 110px;
  }
  .copio-filmstrip-actions {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 0;
  }
}
`;
var cachedScannerSheet = null;
function getScannerStyleSheet() {
  if (cachedScannerSheet) {
    return cachedScannerSheet;
  }
  if (typeof CSSStyleSheet !== "undefined" && typeof Document !== "undefined" && "adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype) {
    try {
      cachedScannerSheet = new CSSStyleSheet();
      cachedScannerSheet.replaceSync(scannerCss);
      return cachedScannerSheet;
    } catch {
      return null;
    }
  }
  return null;
}
function adoptScannerStyles(shadowRoot) {
  if (!shadowRoot) return;
  const sheet = getScannerStyleSheet();
  if (sheet && "adoptedStyleSheets" in shadowRoot) {
    const current = shadowRoot.adoptedStyleSheets || [];
    if (!current.includes(sheet)) {
      shadowRoot.adoptedStyleSheets = [...current, sheet];
    }
  } else {
    if (!shadowRoot.querySelector("style[data-copio-encapsulated-styles]")) {
      const styleEl = document.createElement("style");
      styleEl.setAttribute("data-copio-encapsulated-styles", "");
      styleEl.textContent = scannerCss;
      shadowRoot.appendChild(styleEl);
    }
  }
}

// sdk/scanner.js
var BaseElement = typeof HTMLElement !== "undefined" ? HTMLElement : (
  /** @type {any} */
  class {
  }
);
var _engine, _storage2, _unsubscribeRepo, _isOpen, _stage, _activePageIndex, _cropMode, _draftCrop, _undoTimer, _undoRemaining, _renderPromise, _sessionDocId, _cameraStream, _CopioScanner_instances, targetDocId_get, initEngine_fn, updateChildViews_fn, buildInitialDom_fn, bindEventListeners_fn, bindCropHandles_fn, updateCropBoxUi_fn, syncView_fn, doSyncView_fn, renderFilmstrip_fn, movePage_fn, stopCameraStream_fn, handleShutterClick_fn, rotateActivePage_fn, toggleActivePageBw_fn, toggleCropMode_fn, deleteActivePageWithUndo_fn, showUndoToast_fn, openOcrSheet_fn, closeOcrSheet_fn, handlePrimaryCtaClick_fn;
var CopioScanner = class extends BaseElement {
  constructor() {
    super();
    __privateAdd(this, _CopioScanner_instances);
    __privateAdd(this, _engine, null);
    __privateAdd(this, _storage2, null);
    __privateAdd(this, _unsubscribeRepo, null);
    __privateAdd(this, _isOpen, false);
    __privateAdd(this, _stage, "viewfinder");
    // 'viewfinder' | 'workbench'
    __privateAdd(this, _activePageIndex, 0);
    __privateAdd(this, _cropMode, false);
    __privateAdd(this, _draftCrop, null);
    __privateAdd(this, _undoTimer, null);
    __privateAdd(this, _undoRemaining, 0);
    __privateAdd(this, _renderPromise, null);
    __privateAdd(this, _sessionDocId, null);
    __privateAdd(this, _cameraStream, null);
    if (typeof this.attachShadow === "function") {
      this.attachShadow({ mode: "open" });
    }
    __privateMethod(this, _CopioScanner_instances, initEngine_fn).call(this);
  }
  static get observedAttributes() {
    return [
      "mode",
      "aspect",
      "stage",
      "doc-id",
      "features",
      "export-formats",
      "ocr-languages",
      "max-pages",
      "asset-base",
      "license-key",
      "theme",
      "ocr",
      "pdf"
    ];
  }
  connectedCallback() {
    if (this.shadowRoot) {
      adoptScannerStyles(this.shadowRoot);
      __privateMethod(this, _CopioScanner_instances, buildInitialDom_fn).call(this);
    }
    if (__privateGet(this, _engine)) {
      __privateSet(this, _unsubscribeRepo, __privateGet(this, _engine).subscribe(async () => {
        const pages = await this.getPages();
        this.dispatch(COPIO_EVENTS.PAGES_CHANGED, {
          pages,
          docId: this.docId
        });
        __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
      }));
    }
    if (this.hasAttribute && this.hasAttribute("asset-base")) {
      setAssetBase(this.getAttribute("asset-base"));
    }
    __privateMethod(this, _CopioScanner_instances, updateChildViews_fn).call(this);
    __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
  }
  disconnectedCallback() {
    __privateMethod(this, _CopioScanner_instances, stopCameraStream_fn).call(this);
    if (typeof __privateGet(this, _unsubscribeRepo) === "function") {
      __privateGet(this, _unsubscribeRepo).call(this);
      __privateSet(this, _unsubscribeRepo, null);
    }
    if (__privateGet(this, _undoTimer)) {
      clearInterval(__privateGet(this, _undoTimer));
      __privateSet(this, _undoTimer, null);
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !__privateGet(this, _engine)) return;
    switch (name) {
      case "features":
        __privateGet(this, _engine).setFeatures(newValue);
        __privateMethod(this, _CopioScanner_instances, updateChildViews_fn).call(this);
        break;
      case "export-formats":
        __privateGet(this, _engine).exportFormats = newValue;
        __privateMethod(this, _CopioScanner_instances, updateChildViews_fn).call(this);
        break;
      case "ocr-languages":
        __privateGet(this, _engine).ocrLanguages = newValue;
        break;
      case "asset-base":
        __privateGet(this, _engine).assetBase = newValue;
        break;
      case "license-key":
        __privateGet(this, _engine).licenseKey = newValue;
        break;
      case "ocr":
        __privateGet(this, _engine).ocr = newValue !== "false";
        __privateMethod(this, _CopioScanner_instances, updateChildViews_fn).call(this);
        break;
      case "pdf":
        __privateGet(this, _engine).pdf = newValue !== "false";
        __privateMethod(this, _CopioScanner_instances, updateChildViews_fn).call(this);
        break;
      case "stage":
        if (newValue === "viewfinder" || newValue === "workbench") {
          __privateSet(this, _stage, newValue);
          const shadow = this.shadowRoot;
          if (shadow) {
            const vf = shadow.getElementById("viewfinder-section");
            const wb = shadow.getElementById("workbench-section");
            if (vf && wb) {
              vf.style.display = newValue === "viewfinder" ? "flex" : "none";
              wb.style.display = newValue === "workbench" ? "flex" : "none";
            }
          }
          __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
        }
        break;
      case "max-pages":
        __privateGet(this, _engine).maxPages = newValue;
        __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
        break;
      case "mode":
      case "aspect":
      case "theme":
        __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
        break;
    }
  }
  // --- Configuration Properties (CPO-034, CPO-035, CPO-038) ---
  get theme() {
    return typeof this.getAttribute === "function" ? (
      /** @type {'dark'|'light'|'brand'|'auto'} */
      this.getAttribute("theme") || "dark"
    ) : "dark";
  }
  set theme(val) {
    if (typeof this.setAttribute === "function") {
      if (val) this.setAttribute("theme", val);
      else this.removeAttribute("theme");
    }
  }
  get mode() {
    return typeof this.getAttribute === "function" ? (
      /** @type {'single'|'batch'|'document'} */
      this.getAttribute("mode") || "document"
    ) : "document";
  }
  set mode(val) {
    if (typeof this.setAttribute === "function") {
      this.setAttribute("mode", val);
    }
  }
  get aspect() {
    return typeof this.getAttribute === "function" ? (
      /** @type {'receipt'|'card'|'a4'|'auto'} */
      this.getAttribute("aspect") || "auto"
    ) : "auto";
  }
  set aspect(val) {
    if (typeof this.setAttribute === "function") {
      this.setAttribute("aspect", val);
    }
  }
  get stage() {
    return __privateGet(this, _stage);
  }
  set stage(val) {
    if (val === "viewfinder" || val === "workbench") {
      __privateSet(this, _stage, val);
      if (typeof this.setAttribute === "function" && this.getAttribute("stage") !== val) {
        this.setAttribute("stage", val);
      }
      const shadow = this.shadowRoot;
      if (shadow) {
        const vf = shadow.getElementById("viewfinder-section");
        const wb = shadow.getElementById("workbench-section");
        if (vf && wb) {
          vf.style.display = val === "viewfinder" ? "flex" : "none";
          wb.style.display = val === "workbench" ? "flex" : "none";
        }
      }
      __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
    }
  }
  get docId() {
    return typeof this.getAttribute === "function" ? this.getAttribute("doc-id") : null;
  }
  set docId(val) {
    if (typeof this.setAttribute === "function") {
      if (val) this.setAttribute("doc-id", val);
      else this.removeAttribute("doc-id");
    }
  }
  // --- Imperative UI Actions ---
  async rotateActivePage() {
    return __privateMethod(this, _CopioScanner_instances, rotateActivePage_fn).call(this);
  }
  async toggleActivePageBw() {
    return __privateMethod(this, _CopioScanner_instances, toggleActivePageBw_fn).call(this);
  }
  async toggleCropMode() {
    return __privateMethod(this, _CopioScanner_instances, toggleCropMode_fn).call(this);
  }
  async deleteActivePageWithUndo() {
    return __privateMethod(this, _CopioScanner_instances, deleteActivePageWithUndo_fn).call(this);
  }
  get features() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).features : [];
  }
  set features(val) {
    if (typeof this.setAttribute === "function") {
      const str = Array.isArray(val) ? val.join(" ") : String(val || "");
      this.setAttribute("features", str);
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).setFeatures(val);
    }
  }
  hasFeature(featureName) {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).hasFeature(featureName) : false;
  }
  get ocrEnabled() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).ocr : true;
  }
  set ocrEnabled(val) {
    const enabled = Boolean(val);
    if (typeof this.setAttribute === "function") {
      this.setAttribute("ocr", enabled ? "true" : "false");
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).ocr = enabled;
    }
    __privateMethod(this, _CopioScanner_instances, updateChildViews_fn).call(this);
  }
  get pdf() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).pdf : true;
  }
  set pdf(val) {
    const enabled = Boolean(val);
    if (typeof this.setAttribute === "function") {
      this.setAttribute("pdf", enabled ? "true" : "false");
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).pdf = enabled;
    }
    __privateMethod(this, _CopioScanner_instances, updateChildViews_fn).call(this);
  }
  get exportFormats() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).exportFormats : [];
  }
  set exportFormats(val) {
    if (typeof this.setAttribute === "function") {
      const str = Array.isArray(val) ? val.join(",") : String(val || "");
      this.setAttribute("export-formats", str);
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).exportFormats = val;
    }
  }
  get ocrLanguages() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).ocrLanguages : [];
  }
  set ocrLanguages(val) {
    if (typeof this.setAttribute === "function") {
      const str = Array.isArray(val) ? val.join(",") : String(val || "");
      this.setAttribute("ocr-languages", str);
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).ocrLanguages = val;
    }
  }
  get maxPages() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).maxPages : 0;
  }
  set maxPages(val) {
    if (typeof this.setAttribute === "function") {
      this.setAttribute("max-pages", String(val));
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).maxPages = val;
    }
  }
  get assetBase() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).assetBase : "";
  }
  set assetBase(val) {
    if (typeof this.setAttribute === "function") {
      this.setAttribute("asset-base", String(val || ""));
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).assetBase = val;
    }
  }
  get licenseKey() {
    return __privateGet(this, _engine) ? __privateGet(this, _engine).licenseKey : "";
  }
  set licenseKey(val) {
    if (typeof this.setAttribute === "function") {
      this.setAttribute("license-key", String(val || ""));
    }
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).licenseKey = val;
    }
  }
  get storage() {
    return __privateGet(this, _storage2);
  }
  set storage(adapter) {
    __privateSet(this, _storage2, adapter);
    if (__privateGet(this, _engine)) {
      __privateGet(this, _engine).setStorage(adapter);
    }
  }
  get engine() {
    return __privateGet(this, _engine);
  }
  set engine(customEngine) {
    if (customEngine instanceof CopioEngine) {
      __privateSet(this, _engine, customEngine);
    }
  }
  // --- Public Event Dispatcher Helper (CPO-036) ---
  dispatch(eventName, detail = {}) {
    return dispatchCopioEvent(this, eventName, detail);
  }
  // --- Public Methods API (CPO-037) ---
  async open() {
    __privateSet(this, _isOpen, true);
    if (typeof this.focus === "function") this.focus();
  }
  async close() {
    __privateMethod(this, _CopioScanner_instances, stopCameraStream_fn).call(this);
    __privateSet(this, _isOpen, false);
  }
  get isOpen() {
    return __privateGet(this, _isOpen);
  }
  async capture() {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.style.display = "none";
      input.onchange = async () => {
        try {
          if (input.files && input.files.length > 0) {
            const added = await this.addFiles([input.files[0]]);
            resolve(added[0] || null);
          } else {
            resolve(null);
          }
        } catch (err) {
          this.dispatch(COPIO_EVENTS.ERROR, {
            code: "CAPTURE_FAILED",
            message: err.message,
            error: err
          });
          resolve(null);
        } finally {
          input.remove();
        }
      };
      input.onerror = () => {
        input.remove();
        resolve(null);
      };
      document.body.appendChild(input);
      input.click();
    });
  }
  async addFiles(files) {
    try {
      const newPages = await __privateGet(this, _engine).addFiles(files, __privateGet(this, _CopioScanner_instances, targetDocId_get));
      for (let i3 = 0; i3 < newPages.length; i3++) {
        this.dispatch(COPIO_EVENTS.PAGE_ADDED, {
          page: newPages[i3],
          pageNumber: i3 + 1,
          docId: this.docId,
          source: "file"
        });
      }
      const allPages = await this.getPages();
      this.dispatch(COPIO_EVENTS.PAGES_CHANGED, {
        pages: allPages,
        docId: this.docId
      });
      if (this.mode === "single" && newPages.length > 0 && this.maxPages <= 1) {
        this.dispatch(COPIO_EVENTS.SCAN_COMPLETE, {
          mode: this.mode,
          aspect: this.aspect,
          docId: this.docId,
          pages: allPages,
          page: allPages[0] || null,
          pageCount: allPages.length
        });
      }
      await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
      return newPages;
    } catch (err) {
      this.dispatch(COPIO_EVENTS.ERROR, {
        code: err.code || "ADD_FILES_FAILED",
        message: err.message,
        error: err
      });
      throw err;
    }
  }
  async getPages() {
    return __privateGet(this, _engine).getPages(__privateGet(this, _CopioScanner_instances, targetDocId_get));
  }
  async clear() {
    __privateMethod(this, _CopioScanner_instances, stopCameraStream_fn).call(this);
    await __privateGet(this, _engine).clear(__privateGet(this, _CopioScanner_instances, targetDocId_get));
    this.dispatch(COPIO_EVENTS.PAGES_CHANGED, {
      pages: [],
      docId: this.docId
    });
    await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
  }
  async exportPdf(opts = {}) {
    try {
      const blob = await __privateGet(this, _engine).exportPdf(__privateGet(this, _CopioScanner_instances, targetDocId_get), opts);
      this.dispatch(COPIO_EVENTS.EXPORT_COMPLETE, {
        type: "pdf",
        format: "pdf",
        blob,
        docId: this.docId
      });
      return blob;
    } catch (err) {
      this.dispatch(COPIO_EVENTS.ERROR, {
        code: err.code || "EXPORT_FAILED",
        message: err.message,
        error: err
      });
      throw err;
    }
  }
  async exportZip(opts = {}) {
    try {
      const blob = await __privateGet(this, _engine).exportZip(__privateGet(this, _CopioScanner_instances, targetDocId_get), opts);
      this.dispatch(COPIO_EVENTS.EXPORT_COMPLETE, {
        type: "zip",
        format: "zip",
        blob,
        docId: this.docId
      });
      return blob;
    } catch (err) {
      this.dispatch(COPIO_EVENTS.ERROR, {
        code: err.code || "EXPORT_FAILED",
        message: err.message,
        error: err
      });
      throw err;
    }
  }
  async ocr(pageId = null, opts = {}) {
    try {
      const result = await __privateGet(this, _engine).runOcr(__privateGet(this, _CopioScanner_instances, targetDocId_get), pageId, opts);
      this.dispatch(COPIO_EVENTS.OCR_COMPLETE, {
        text: result.text,
        pages: result.pagesResults,
        averageConfidence: result.averageConfidence,
        docId: this.docId,
        pageId
      });
      return result;
    } catch (err) {
      this.dispatch(COPIO_EVENTS.ERROR, {
        code: err.code || "OCR_FAILED",
        message: err.message,
        error: err
      });
      throw err;
    }
  }
  async runOcr(pageId = null, opts = {}) {
    return this.ocr(pageId, opts);
  }
  async sync(opts = {}) {
    try {
      const manager = await __privateGet(this, _engine).sync({
        onStateChange: (state) => {
          if (state && (state.step === "connected" || state.step === "syncing")) {
            this.dispatch(COPIO_EVENTS.SYNC_CONNECTED, {
              peerId: state.peerId,
              mode: state.mode
            });
          }
          if (opts.onStateChange) opts.onStateChange(state);
        }
      });
      return manager;
    } catch (err) {
      this.dispatch(COPIO_EVENTS.ERROR, {
        code: err.code || "SYNC_FAILED",
        message: err.message,
        error: err
      });
      throw err;
    }
  }
};
_engine = new WeakMap();
_storage2 = new WeakMap();
_unsubscribeRepo = new WeakMap();
_isOpen = new WeakMap();
_stage = new WeakMap();
_activePageIndex = new WeakMap();
_cropMode = new WeakMap();
_draftCrop = new WeakMap();
_undoTimer = new WeakMap();
_undoRemaining = new WeakMap();
_renderPromise = new WeakMap();
_sessionDocId = new WeakMap();
_cameraStream = new WeakMap();
_CopioScanner_instances = new WeakSet();
targetDocId_get = function() {
  if (this.docId) return this.docId;
  if (!__privateGet(this, _sessionDocId)) {
    __privateSet(this, _sessionDocId, `doc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`);
  }
  return __privateGet(this, _sessionDocId);
};
initEngine_fn = function() {
  const opts = {
    storage: __privateGet(this, _storage2)
  };
  if (typeof this.getAttribute === "function") {
    if (this.hasAttribute("features")) opts.features = this.getAttribute("features");
    if (this.hasAttribute("export-formats")) opts.exportFormats = this.getAttribute("export-formats");
    if (this.hasAttribute("ocr-languages")) opts.ocrLanguages = this.getAttribute("ocr-languages");
    if (this.hasAttribute("max-pages")) opts.maxPages = this.getAttribute("max-pages");
    if (this.hasAttribute("asset-base")) opts.assetBase = this.getAttribute("asset-base");
    if (this.hasAttribute("license-key")) opts.licenseKey = this.getAttribute("license-key");
    if (this.hasAttribute("ocr")) opts.ocr = this.getAttribute("ocr") !== "false";
    if (this.hasAttribute("pdf")) opts.pdf = this.getAttribute("pdf") !== "false";
  }
  __privateSet(this, _engine, new CopioEngine(opts));
};
updateChildViews_fn = function() {
  if (typeof this.querySelectorAll !== "function") return;
  const roots = [];
  if (this.shadowRoot) roots.push(this.shadowRoot);
  roots.push(this);
  for (const root of roots) {
    const children = root.querySelectorAll("copio-carousel, copio-row, copio-images");
    for (const child of children) {
      if ("ocr" in child) child.ocr = this.ocrEnabled;
      if ("pdf" in child) child.pdf = this.pdf;
    }
  }
};
buildInitialDom_fn = function() {
  if (!this.shadowRoot || this.shadowRoot.innerHTML) return;
  let initialStepText = "Align Document Inside Frame";
  if (this.aspect === "card" && this.maxPages === 2) {
    initialStepText = "Step 1 of 2: Capture Front of ID Card";
  } else if (this.aspect === "card") {
    initialStepText = "Take a Photo or Upload Screenshot of Card";
  } else if (this.mode === "batch") {
    initialStepText = "Batch Capture \xB7 Page 1";
  }
  this.shadowRoot.innerHTML = `
      <div class="copio-scanner-container copio-scanner-host" part="scanner-root">
        <header class="copio-header" part="header">
          <div class="copio-header-left">
            <span class="copio-mode-badge" id="mode-badge">${(this.mode || "single").toUpperCase()}</span>
            <div class="copio-title-group">
              <h2 class="copio-title" id="header-title">Copio Scanner</h2>
              <p class="copio-subtitle" id="header-subtitle">Non-destructive mobile document scanner</p>
            </div>
          </div>
          <div class="copio-header-actions" part="header-actions">
            <div class="copio-stage-tabs" role="tablist" aria-label="Scanner Stage">
              <button type="button" class="copio-stage-tab" id="tab-viewfinder" role="tab" aria-selected="true">Camera</button>
              <button type="button" class="copio-stage-tab" id="tab-workbench" role="tab" aria-selected="false">Workbench</button>
            </div>
            <slot name="header-actions"></slot>
          </div>
        </header>

        <!-- Viewfinder Stage -->
        <div class="copio-viewfinder copio-viewfinder-stage" part="viewfinder" id="viewfinder-section">
          <div class="copio-viewfinder-hud-top">
            <div class="copio-step-pill" id="step-pill">
              <span class="copio-status-dot"></span>
              <span id="step-pill-text">${initialStepText}</span>
            </div>
            <div class="copio-privacy-pill" title="100% Local On-Device Processing">
              <span>\u{1F512} 100% Local</span>
            </div>
          </div>

          <div class="copio-camera-feed" id="camera-feed">
            <video id="camera-video" playsinline muted autoplay style="display: none; width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; z-index: 1;"></video>
            <slot name="viewfinder">
              <div class="copio-framing-guide" id="framing-guide" data-aspect="${this.aspect}" style="position: relative; z-index: 2;">
                <span class="copio-corner tl"></span>
                <span class="copio-corner tr"></span>
                <span class="copio-corner bl"></span>
                <span class="copio-corner br"></span>
                <div class="copio-edge-quad"></div>
                <div class="copio-camera-placeholder" id="camera-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span id="camera-placeholder-text">Tap shutter for camera or Import screenshot</span>
                </div>
              </div>
            </slot>
          </div>

          <div class="copio-shutter-dock" part="shutter-dock">
            <div class="copio-shutter-side left">
              <button type="button" class="copio-btn copio-btn-secondary" id="btn-import-file" title="Import image from file">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>Import</span>
              </button>
            </div>

            <slot name="shutter-dock">
              <button type="button" class="copio-shutter-btn" id="btn-shutter" aria-label="Capture page">
                <span class="copio-shutter-btn-inner"></span>
              </button>
            </slot>

            <div class="copio-shutter-side right">
              <button type="button" class="copio-stack-pill" id="btn-review" title="Review pages" style="display:none;">
                <span id="review-pill-text">Review (0) \u2192</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Workbench Stage -->
        <div class="copio-workbench copio-workbench-stage" part="workbench" id="workbench-section" style="display: none;">
          <div class="copio-workbench-main">
            <div class="copio-canvas-viewport" id="canvas-viewport">
              <div class="copio-card-side-switcher" id="card-side-switcher" style="display:none;" role="tablist" aria-label="Card side switcher">
                <button type="button" role="tab" class="copio-side-pill active" id="btn-card-front" aria-selected="true">1. Front Side</button>
                <button type="button" role="tab" class="copio-side-pill" id="btn-card-back" aria-selected="false">2. Back Side</button>
              </div>

              <div class="copio-canvas-wrapper" id="canvas-wrapper">
                <img id="stage-img" class="copio-stage-image" alt="Active document page" />
              </div>
            </div>

            <!-- Filmstrip Tray -->
            <div class="copio-filmstrip" id="filmstrip-tray" part="filmstrip">
              <div class="copio-filmstrip-scroll" id="filmstrip-scroll">
                <slot name="filmstrip"></slot>
              </div>
            </div>
          </div>

          <!-- Bottom Action Toolbar -->
          <footer class="copio-toolbar" part="toolbar" id="workbench-toolbar">
            <div class="copio-toolbar-tools">
              <button type="button" class="copio-tool-btn" id="btn-retake" title="Retake page">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 4v6h-6M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                <span>Retake</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-crop" title="Adjust crop">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
                  <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
                </svg>
                <span id="crop-btn-label">Crop</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-rotate" title="Rotate 90\xB0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Rotate</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-filter-bw" title="Toggle B&W filter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/>
                </svg>
                <span>B&W</span>
              </button>

              <button type="button" class="copio-tool-btn" id="btn-ocr" title="Recognize text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
                </svg>
                <span>OCR</span>
              </button>

              <button type="button" class="copio-tool-btn copio-btn-danger" id="btn-delete" title="Delete active page">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                <span>Delete</span>
              </button>
            </div>

            <div class="copio-toolbar-actions">
              <slot name="toolbar">
                <button type="button" class="copio-btn copio-btn-primary" id="btn-primary-complete">
                  \u2713 Use Photo
                </button>
              </slot>
            </div>
          </footer>

          <!-- Scoped OCR Slide-out / Bottom Sheet -->
          <div class="copio-ocr-sheet" id="ocr-sheet" style="display:none;" part="ocr-sheet">
            <div class="copio-ocr-header">
              <strong class="copio-ocr-title">Text Recognition (OCR)</strong>
              <button type="button" class="copio-btn copio-btn-secondary" id="btn-close-ocr">\u2715</button>
            </div>
            <div class="copio-ocr-body" id="ocr-body">
              <p class="copio-ocr-placeholder">Select text or extract full page data...</p>
            </div>
          </div>

          <!-- Container-scoped Toast Region (5s undo) -->
          <div class="copio-toast-region" id="toast-region" aria-live="polite"></div>
        </div>

        <!-- Hidden input for file picker fallback -->
        <input type="file" id="internal-file-input" accept="image/*" style="display: none;" />
        <slot></slot>
      </div>
    `;
  __privateMethod(this, _CopioScanner_instances, bindEventListeners_fn).call(this);
};
bindEventListeners_fn = function() {
  const shadow = this.shadowRoot;
  if (!shadow) return;
  shadow.getElementById("tab-viewfinder")?.addEventListener("click", () => {
    this.stage = "viewfinder";
  });
  shadow.getElementById("tab-workbench")?.addEventListener("click", () => {
    this.stage = "workbench";
  });
  const fileInput = shadow.getElementById("internal-file-input");
  shadow.getElementById("btn-import-file")?.addEventListener("click", () => {
    fileInput?.click();
  });
  fileInput?.addEventListener("change", async (e3) => {
    const input = (
      /** @type {HTMLInputElement} */
      e3.target
    );
    if (input.files && input.files.length > 0) {
      await this.addFiles(input.files);
      input.value = "";
      this.stage = "workbench";
    }
  });
  shadow.getElementById("btn-shutter")?.addEventListener("click", async () => {
    await __privateMethod(this, _CopioScanner_instances, handleShutterClick_fn).call(this);
  });
  shadow.getElementById("btn-review")?.addEventListener("click", () => {
    this.stage = "workbench";
  });
  shadow.getElementById("btn-retake")?.addEventListener("click", () => {
    __privateSet(this, _cropMode, false);
    this.stage = "viewfinder";
  });
  shadow.getElementById("btn-rotate")?.addEventListener("click", async () => {
    await __privateMethod(this, _CopioScanner_instances, rotateActivePage_fn).call(this);
  });
  shadow.getElementById("btn-filter-bw")?.addEventListener("click", async () => {
    await __privateMethod(this, _CopioScanner_instances, toggleActivePageBw_fn).call(this);
  });
  shadow.getElementById("btn-crop")?.addEventListener("click", async () => {
    await __privateMethod(this, _CopioScanner_instances, toggleCropMode_fn).call(this);
  });
  shadow.getElementById("btn-delete")?.addEventListener("click", async () => {
    await __privateMethod(this, _CopioScanner_instances, deleteActivePageWithUndo_fn).call(this);
  });
  shadow.getElementById("btn-ocr")?.addEventListener("click", async () => {
    await __privateMethod(this, _CopioScanner_instances, openOcrSheet_fn).call(this);
  });
  shadow.getElementById("btn-close-ocr")?.addEventListener("click", () => {
    __privateMethod(this, _CopioScanner_instances, closeOcrSheet_fn).call(this);
  });
  shadow.getElementById("btn-primary-complete")?.addEventListener("click", async () => {
    await __privateMethod(this, _CopioScanner_instances, handlePrimaryCtaClick_fn).call(this);
  });
  shadow.getElementById("btn-card-front")?.addEventListener("click", () => {
    __privateSet(this, _activePageIndex, 0);
    __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
  });
  shadow.getElementById("btn-card-back")?.addEventListener("click", () => {
    __privateSet(this, _activePageIndex, 1);
    __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
  });
  __privateMethod(this, _CopioScanner_instances, bindCropHandles_fn).call(this);
};
bindCropHandles_fn = function() {
  const shadow = this.shadowRoot;
  if (!shadow) return;
  const cropBox = shadow.getElementById("crop-box");
  const handles = shadow.querySelectorAll(".copio-crop-handle");
  if (!cropBox || handles.length === 0) return;
  let activeHandle = null;
  let startX = 0;
  let startY = 0;
  let initialCrop = null;
  const onPointerDown = (e3) => {
    const handleEl = e3.target.closest(".copio-crop-handle");
    if (!handleEl) return;
    e3.preventDefault();
    e3.stopPropagation();
    activeHandle = handleEl.getAttribute("data-handle");
    startX = e3.clientX;
    startY = e3.clientY;
    initialCrop = __privateGet(this, _draftCrop) ? { ...__privateGet(this, _draftCrop) } : { x: 0.05, y: 0.05, w: 0.9, h: 0.9 };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };
  const onPointerMove = (e3) => {
    if (!activeHandle || !initialCrop) return;
    const viewport = shadow.getElementById("canvas-viewport");
    const rect = viewport?.getBoundingClientRect() || { width: 300, height: 400 };
    const dx = (e3.clientX - startX) / Math.max(rect.width, 1);
    const dy = (e3.clientY - startY) / Math.max(rect.height, 1);
    let { x: x4, y: y3, w: w3, h: h3 } = initialCrop;
    if (activeHandle.includes("w")) {
      const nextX = Math.min(Math.max(0, x4 + dx), x4 + w3 - 0.1);
      w3 += x4 - nextX;
      x4 = nextX;
    }
    if (activeHandle.includes("e")) {
      w3 = Math.min(Math.max(0.1, w3 + dx), 1 - x4);
    }
    if (activeHandle.includes("n")) {
      const nextY = Math.min(Math.max(0, y3 + dy), y3 + h3 - 0.1);
      h3 += y3 - nextY;
      y3 = nextY;
    }
    if (activeHandle.includes("s")) {
      h3 = Math.min(Math.max(0.1, h3 + dy), 1 - y3);
    }
    __privateSet(this, _draftCrop, { x: x4, y: y3, w: w3, h: h3 });
    __privateMethod(this, _CopioScanner_instances, updateCropBoxUi_fn).call(this);
  };
  const onPointerUp = () => {
    activeHandle = null;
    initialCrop = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };
  handles.forEach((handle) => {
    handle.addEventListener("pointerdown", onPointerDown);
  });
};
updateCropBoxUi_fn = function() {
  const shadow = this.shadowRoot;
  if (!shadow || !__privateGet(this, _draftCrop)) return;
  const cropBox = shadow.getElementById("crop-box");
  if (!cropBox) return;
  cropBox.style.left = `${(__privateGet(this, _draftCrop).x * 100).toFixed(1)}%`;
  cropBox.style.top = `${(__privateGet(this, _draftCrop).y * 100).toFixed(1)}%`;
  cropBox.style.width = `${(__privateGet(this, _draftCrop).w * 100).toFixed(1)}%`;
  cropBox.style.height = `${(__privateGet(this, _draftCrop).h * 100).toFixed(1)}%`;
};
syncView_fn = async function() {
  if (!this.shadowRoot) return;
  if (__privateGet(this, _renderPromise)) {
    return __privateGet(this, _renderPromise);
  }
  __privateSet(this, _renderPromise, (async () => {
    try {
      await Promise.resolve();
      await __privateMethod(this, _CopioScanner_instances, doSyncView_fn).call(this);
    } finally {
      __privateSet(this, _renderPromise, null);
    }
  })());
  return __privateGet(this, _renderPromise);
};
doSyncView_fn = async function() {
  if (!this.shadowRoot) return;
  try {
    const pages = await this.getPages();
    const shadow = this.shadowRoot;
    const modeBadge = shadow.getElementById("mode-badge");
    if (modeBadge) {
      modeBadge.textContent = (this.mode || "single").toUpperCase();
    }
    const tabViewfinder = shadow.getElementById("tab-viewfinder");
    const tabWorkbench = shadow.getElementById("tab-workbench");
    if (tabViewfinder) tabViewfinder.setAttribute("aria-selected", String(__privateGet(this, _stage) === "viewfinder"));
    if (tabWorkbench) tabWorkbench.setAttribute("aria-selected", String(__privateGet(this, _stage) === "workbench"));
    const vfSection = shadow.getElementById("viewfinder-section");
    const wbSection = shadow.getElementById("workbench-section");
    if (vfSection && wbSection) {
      if (__privateGet(this, _stage) === "viewfinder") {
        vfSection.style.display = "flex";
        wbSection.style.display = "none";
      } else {
        vfSection.style.display = "none";
        wbSection.style.display = "flex";
      }
    }
    const guide = shadow.getElementById("framing-guide");
    if (guide) {
      guide.setAttribute("data-aspect", this.aspect || "auto");
    }
    const stepPillText = shadow.getElementById("step-pill-text");
    if (stepPillText) {
      if (__privateGet(this, _cameraStream)) {
        stepPillText.textContent = "Camera Active \xB7 Tap Shutter to Snap Photo";
      } else if (this.aspect === "card" && this.maxPages === 2) {
        stepPillText.textContent = pages.length === 0 ? "Step 1 of 2: Capture Front of ID Card" : "Step 2 of 2: Capture Back of ID Card";
      } else if (this.aspect === "card") {
        stepPillText.textContent = "Take a Photo or Upload Screenshot of Card";
      } else if (this.mode === "batch") {
        stepPillText.textContent = `Batch Capture \xB7 Page ${pages.length + 1}`;
      } else {
        stepPillText.textContent = "Align Document Inside Frame";
      }
    }
    const btnOcr = shadow.getElementById("btn-ocr");
    if (btnOcr) {
      btnOcr.style.display = this.ocrEnabled && this.hasFeature("ocr") ? "" : "none";
    }
    const reviewBtn = shadow.getElementById("btn-review");
    const reviewText = shadow.getElementById("review-pill-text");
    if (reviewBtn && reviewText) {
      if (pages.length > 0) {
        reviewBtn.style.display = "inline-flex";
        reviewText.textContent = `Review (${pages.length}) \u2192`;
      } else {
        reviewBtn.style.display = "none";
      }
    }
    if (pages.length === 0) {
      if (__privateGet(this, _stage) === "workbench") {
        this.stage = "viewfinder";
      }
      return;
    }
    if (__privateGet(this, _activePageIndex) >= pages.length) {
      __privateSet(this, _activePageIndex, Math.max(0, pages.length - 1));
    }
    const activePage = pages[__privateGet(this, _activePageIndex)];
    const cardSwitcher = shadow.getElementById("card-side-switcher");
    if (cardSwitcher) {
      const isCardGuided = this.aspect === "card" && this.maxPages === 2;
      cardSwitcher.style.display = isCardGuided ? "flex" : "none";
      const btnFront = shadow.getElementById("btn-card-front");
      const btnBack = shadow.getElementById("btn-card-back");
      if (btnFront) {
        btnFront.classList.toggle("active", __privateGet(this, _activePageIndex) === 0);
        btnFront.setAttribute("aria-selected", String(__privateGet(this, _activePageIndex) === 0));
      }
      if (btnBack) {
        btnBack.classList.toggle("active", __privateGet(this, _activePageIndex) === 1);
        btnBack.setAttribute("aria-selected", String(__privateGet(this, _activePageIndex) === 1));
      }
    }
    const stageImg = (
      /** @type {HTMLImageElement|null} */
      shadow.getElementById("stage-img")
    );
    if (stageImg && activePage) {
      stageImg.src = __privateGet(this, _cropMode) ? activePage.originalSrc || activePage.src || "" : activePage.src || activePage.originalSrc || "";
    }
    let cropLayer = shadow.getElementById("crop-layer");
    if (__privateGet(this, _cropMode)) {
      if (!cropLayer) {
        const wrapper = shadow.getElementById("canvas-wrapper");
        cropLayer = document.createElement("div");
        cropLayer.className = "copio-crop-layer";
        cropLayer.id = "crop-layer";
        cropLayer.innerHTML = `
            <div class="copio-crop-box" id="crop-box">
              <span class="copio-crop-handle nw" data-handle="nw"></span>
              <span class="copio-crop-handle ne" data-handle="ne"></span>
              <span class="copio-crop-handle se" data-handle="se"></span>
              <span class="copio-crop-handle sw" data-handle="sw"></span>
              <span class="copio-crop-handle edge-n" data-handle="n"></span>
              <span class="copio-crop-handle edge-e" data-handle="e"></span>
              <span class="copio-crop-handle edge-s" data-handle="s"></span>
              <span class="copio-crop-handle edge-w" data-handle="w"></span>
            </div>
          `;
        wrapper?.appendChild(cropLayer);
        __privateMethod(this, _CopioScanner_instances, bindCropHandles_fn).call(this);
      }
      cropLayer.style.display = "block";
      __privateSet(this, _draftCrop, activePage.edits?.crop || { x: 0.05, y: 0.05, w: 0.9, h: 0.9 });
      __privateMethod(this, _CopioScanner_instances, updateCropBoxUi_fn).call(this);
    } else if (cropLayer) {
      cropLayer.remove();
    }
    const cropBtnLabel = shadow.getElementById("crop-btn-label");
    if (cropBtnLabel) {
      cropBtnLabel.textContent = __privateGet(this, _cropMode) ? "Apply" : "Crop";
    }
    const primaryCta = shadow.getElementById("btn-primary-complete");
    if (primaryCta) {
      if (this.aspect === "card" && this.maxPages === 2 && pages.length === 1) {
        primaryCta.textContent = "Next: Capture Back (Step 2/2) \u2192";
      } else if (this.aspect === "card" && pages.length >= 2) {
        primaryCta.textContent = "\u2713 Complete ID Scan (2 Sides)";
      } else if (this.mode === "batch") {
        primaryCta.textContent = `\u2713 Complete Scan (${pages.length} Pages)`;
      } else {
        primaryCta.textContent = "\u2713 Use Photo";
      }
    }
    __privateMethod(this, _CopioScanner_instances, renderFilmstrip_fn).call(this, pages);
  } catch {
  }
};
renderFilmstrip_fn = function(pages) {
  const shadow = this.shadowRoot;
  if (!shadow) return;
  const scrollContainer = shadow.getElementById("filmstrip-scroll");
  if (!scrollContainer) return;
  scrollContainer.innerHTML = "";
  pages.forEach((page, idx) => {
    const item = document.createElement("div");
    item.className = `copio-filmstrip-item ${idx === __privateGet(this, _activePageIndex) ? "is-active" : ""}`;
    item.setAttribute("data-index", String(idx));
    item.innerHTML = `
        <div class="copio-thumb-container">
          <img src="${page.src || page.originalSrc}" alt="Page ${idx + 1}" class="copio-thumb-img" />
          <span class="copio-thumb-num">${idx + 1}</span>
        </div>
        ${this.mode === "batch" ? `
          <div class="copio-thumb-reorder">
            <button type="button" class="copio-reorder-btn move-left" title="Move Left" ${idx === 0 ? "disabled" : ""}>\u25C0</button>
            <button type="button" class="copio-reorder-btn move-right" title="Move Right" ${idx === pages.length - 1 ? "disabled" : ""}>\u25B6</button>
          </div>
        ` : ""}
      `;
    item.querySelector(".copio-thumb-container")?.addEventListener("click", () => {
      __privateSet(this, _activePageIndex, idx);
      __privateSet(this, _cropMode, false);
      __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
    });
    if (this.mode === "batch") {
      item.querySelector(".move-left")?.addEventListener("click", async (e3) => {
        e3.stopPropagation();
        await __privateMethod(this, _CopioScanner_instances, movePage_fn).call(this, idx, idx - 1);
      });
      item.querySelector(".move-right")?.addEventListener("click", async (e3) => {
        e3.stopPropagation();
        await __privateMethod(this, _CopioScanner_instances, movePage_fn).call(this, idx, idx + 1);
      });
    }
    scrollContainer.appendChild(item);
  });
};
movePage_fn = async function(fromIdx, toIdx) {
  const pages = await this.getPages();
  if (toIdx < 0 || toIdx >= pages.length || fromIdx === toIdx) return;
  const pageIds = pages.map((p3) => p3.id);
  const [moved] = pageIds.splice(fromIdx, 1);
  pageIds.splice(toIdx, 0, moved);
  await __privateGet(this, _engine).reorderPages(__privateGet(this, _CopioScanner_instances, targetDocId_get), pageIds);
  __privateSet(this, _activePageIndex, toIdx);
  __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
};
stopCameraStream_fn = function() {
  if (__privateGet(this, _cameraStream)) {
    try {
      __privateGet(this, _cameraStream).getTracks().forEach((t3) => t3.stop());
    } catch {
    }
    __privateSet(this, _cameraStream, null);
  }
  const shadow = this.shadowRoot;
  if (shadow) {
    const video = (
      /** @type {HTMLVideoElement|null} */
      shadow.getElementById("camera-video")
    );
    if (video) {
      video.srcObject = null;
      video.style.display = "none";
    }
    const placeholder = shadow.getElementById("camera-placeholder");
    if (placeholder) {
      placeholder.style.display = "";
    }
  }
};
handleShutterClick_fn = async function() {
  const shadow = this.shadowRoot;
  const video = (
    /** @type {HTMLVideoElement|null} */
    shadow?.getElementById("camera-video")
  );
  if (__privateGet(this, _cameraStream) && video && video.readyState >= 2) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((r3) => canvas.toBlob(r3, "image/png"));
      __privateMethod(this, _CopioScanner_instances, stopCameraStream_fn).call(this);
      if (blob) {
        const file = new File([blob], `card-scan-${Date.now()}.png`, { type: "image/png" });
        await this.addFiles([file]);
        this.stage = "workbench";
        return;
      }
    }
  }
  if (typeof navigator !== "undefined" && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function") {
    try {
      __privateSet(this, _cameraStream, await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      }));
      if (video) {
        video.srcObject = __privateGet(this, _cameraStream);
        video.style.display = "block";
        await video.play().catch(() => {
        });
      }
      const placeholder = shadow?.getElementById("camera-placeholder");
      if (placeholder) placeholder.style.display = "none";
      await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
      return;
    } catch {
      __privateMethod(this, _CopioScanner_instances, stopCameraStream_fn).call(this);
    }
  }
  const fileInput = shadow?.getElementById("internal-file-input");
  if (fileInput && typeof fileInput.click === "function") {
    fileInput.click();
  }
};
rotateActivePage_fn = async function() {
  const pages = await this.getPages();
  const activePage = pages[__privateGet(this, _activePageIndex)];
  if (!activePage) return;
  const currentRotate = activePage.edits?.rotate || 0;
  const newRotate = (currentRotate + 90) % 360;
  await __privateGet(this, _engine).applyEdit(__privateGet(this, _CopioScanner_instances, targetDocId_get), activePage.id, {
    rotate: newRotate
  });
  await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
};
toggleActivePageBw_fn = async function() {
  const pages = await this.getPages();
  const activePage = pages[__privateGet(this, _activePageIndex)];
  if (!activePage) return;
  const currentFilter = activePage.edits?.filter || "none";
  const newFilter = currentFilter === "bw" ? "none" : "bw";
  await __privateGet(this, _engine).applyEdit(__privateGet(this, _CopioScanner_instances, targetDocId_get), activePage.id, {
    filter: newFilter
  });
  await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
};
toggleCropMode_fn = async function() {
  const pages = await this.getPages();
  const activePage = pages[__privateGet(this, _activePageIndex)];
  if (!activePage) return;
  if (__privateGet(this, _cropMode)) {
    __privateSet(this, _cropMode, false);
    const draft = __privateGet(this, _draftCrop);
    __privateSet(this, _draftCrop, null);
    if (draft) {
      await __privateGet(this, _engine).applyEdit(__privateGet(this, _CopioScanner_instances, targetDocId_get), activePage.id, {
        crop: draft
      });
    }
  } else {
    __privateSet(this, _cropMode, true);
  }
  await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
};
deleteActivePageWithUndo_fn = async function() {
  const pages = await this.getPages();
  const activePage = pages[__privateGet(this, _activePageIndex)];
  if (!activePage) return;
  const deletedPageId = activePage.id;
  await __privateGet(this, _engine).deletePage(__privateGet(this, _CopioScanner_instances, targetDocId_get), deletedPageId);
  this.dispatch(COPIO_EVENTS.PAGE_REMOVED, {
    pageId: deletedPageId,
    docId: this.docId
  });
  if (__privateGet(this, _activePageIndex) >= pages.length - 1) {
    __privateSet(this, _activePageIndex, Math.max(0, pages.length - 2));
  }
  __privateMethod(this, _CopioScanner_instances, showUndoToast_fn).call(this);
  await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
};
showUndoToast_fn = function() {
  const shadow = this.shadowRoot;
  if (!shadow) return;
  const toastRegion = shadow.getElementById("toast-region");
  if (!toastRegion) return;
  if (__privateGet(this, _undoTimer)) {
    clearInterval(__privateGet(this, _undoTimer));
  }
  __privateSet(this, _undoRemaining, 5);
  const renderToast = () => {
    toastRegion.innerHTML = `
        <div class="copio-toast copio-toast-undo">
          <span>Page deleted</span>
          <button type="button" class="copio-btn-toast-undo" id="btn-toast-undo">
            Undo (${__privateGet(this, _undoRemaining)}s)
          </button>
        </div>
      `;
    shadow.getElementById("btn-toast-undo")?.addEventListener("click", async () => {
      clearInterval(__privateGet(this, _undoTimer));
      __privateSet(this, _undoTimer, null);
      toastRegion.innerHTML = "";
      await __privateGet(this, _engine).undo(__privateGet(this, _CopioScanner_instances, targetDocId_get));
      await __privateMethod(this, _CopioScanner_instances, syncView_fn).call(this);
    });
  };
  renderToast();
  __privateSet(this, _undoTimer, setInterval(() => {
    __privateSet(this, _undoRemaining, __privateGet(this, _undoRemaining) - 1);
    if (__privateGet(this, _undoRemaining) <= 0) {
      clearInterval(__privateGet(this, _undoTimer));
      __privateSet(this, _undoTimer, null);
      toastRegion.innerHTML = "";
    } else {
      renderToast();
    }
  }, 1e3));
};
openOcrSheet_fn = async function() {
  const shadow = this.shadowRoot;
  if (!shadow) return;
  const sheet = shadow.getElementById("ocr-sheet");
  const body = shadow.getElementById("ocr-body");
  if (!sheet || !body) return;
  sheet.style.display = "block";
  body.innerHTML = `<p class="copio-ocr-loading">Recognizing text...</p>`;
  try {
    const pages = await this.getPages();
    const activePage = pages[__privateGet(this, _activePageIndex)];
    const result = await this.ocr(activePage?.id || null);
    body.innerHTML = `
        <div class="copio-ocr-content">
          <pre class="copio-ocr-text">${result.text || "No text detected."}</pre>
          <div class="copio-ocr-meta">
            <span>Confidence: ${Math.round((result.averageConfidence || 0) * 100)}%</span>
          </div>
        </div>
      `;
  } catch (err) {
    body.innerHTML = `<p class="copio-ocr-error">OCR recognition failed: ${err.message}</p>`;
  }
};
closeOcrSheet_fn = function() {
  const shadow = this.shadowRoot;
  if (!shadow) return;
  const sheet = shadow.getElementById("ocr-sheet");
  if (sheet) sheet.style.display = "none";
};
handlePrimaryCtaClick_fn = async function() {
  const pages = await this.getPages();
  if (this.aspect === "card" && this.maxPages === 2 && pages.length === 1) {
    this.stage = "viewfinder";
    return;
  }
  const summarizedPages = pages.map((p3, idx) => ({
    id: p3.id,
    pageNumber: idx + 1,
    label: p3.label || `Page ${idx + 1}`,
    originalSrc: p3.originalSrc,
    src: p3.src,
    originalPreserved: true,
    dimensions: { width: p3.width || 0, height: p3.height || 0 },
    edits: p3.edits || { crop: { x: 0, y: 0, w: 1, h: 1 }, rotate: 0, filter: "none" },
    ocrText: p3.ocrText || null,
    blob: p3.blob || null
  }));
  const payload = {
    mode: this.mode,
    aspect: this.aspect,
    docId: this.docId,
    pageCount: summarizedPages.length,
    pages: summarizedPages
  };
  if (this.mode === "single") {
    payload.page = summarizedPages[0] || null;
    if (this.maxPages > 1) {
      payload.maxPages = this.maxPages;
    }
  }
  this.dispatch(COPIO_EVENTS.SCAN_COMPLETE, payload);
};
if (typeof customElements !== "undefined" && !customElements.get("copio-scanner")) {
  customElements.define("copio-scanner", CopioScanner);
}
export {
  COPIO_EVENTS,
  CopioEngine,
  CopioScanner,
  adoptScannerStyles,
  dispatchCopioEvent,
  getScannerStyleSheet,
  scannerCss
};
