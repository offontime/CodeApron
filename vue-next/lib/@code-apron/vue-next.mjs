import { ref as b0, openBlock as v0, createElementBlock as w0, createElementVNode as E0, unref as H0, normalizeStyle as O0 } from "vue";
var V = {}, V0 = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, p0 = {}, I = {};
let i0;
const G0 = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
I.getSymbolSize = function(e) {
  if (!e)
    throw new Error('"version" cannot be null or undefined');
  if (e < 1 || e > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return e * 4 + 17;
};
I.getSymbolTotalCodewords = function(e) {
  return G0[e];
};
I.getBCHDigit = function(x) {
  let e = 0;
  for (; x !== 0; )
    e++, x >>>= 1;
  return e;
};
I.setToSJISFunction = function(e) {
  if (typeof e != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  i0 = e;
};
I.isKanjiModeEnabled = function() {
  return typeof i0 < "u";
};
I.toSJIS = function(e) {
  return i0(e);
};
var Y = {};
(function(x) {
  x.L = { bit: 1 }, x.M = { bit: 0 }, x.Q = { bit: 3 }, x.H = { bit: 2 };
  function e(n) {
    if (typeof n != "string")
      throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "l":
      case "low":
        return x.L;
      case "m":
      case "medium":
        return x.M;
      case "q":
      case "quartile":
        return x.Q;
      case "h":
      case "high":
        return x.H;
      default:
        throw new Error("Unknown EC Level: " + n);
    }
  }
  x.isValid = function(c) {
    return c && typeof c.bit < "u" && c.bit >= 0 && c.bit < 4;
  }, x.from = function(c, t) {
    if (x.isValid(c))
      return c;
    try {
      return e(c);
    } catch {
      return t;
    }
  };
})(Y);
function y0() {
  this.buffer = [], this.length = 0;
}
y0.prototype = {
  get: function(x) {
    const e = Math.floor(x / 8);
    return (this.buffer[e] >>> 7 - x % 8 & 1) === 1;
  },
  put: function(x, e) {
    for (let n = 0; n < e; n++)
      this.putBit((x >>> e - n - 1 & 1) === 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(x) {
    const e = Math.floor(this.length / 8);
    this.buffer.length <= e && this.buffer.push(0), x && (this.buffer[e] |= 128 >>> this.length % 8), this.length++;
  }
};
var $0 = y0;
function G(x) {
  if (!x || x < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = x, this.data = new Uint8Array(x * x), this.reservedBit = new Uint8Array(x * x);
}
G.prototype.set = function(x, e, n, c) {
  const t = x * this.size + e;
  this.data[t] = n, c && (this.reservedBit[t] = !0);
};
G.prototype.get = function(x, e) {
  return this.data[x * this.size + e];
};
G.prototype.xor = function(x, e, n) {
  this.data[x * this.size + e] ^= n;
};
G.prototype.isReserved = function(x, e) {
  return this.reservedBit[x * this.size + e];
};
var K0 = G, S0 = {};
(function(x) {
  const e = I.getSymbolSize;
  x.getRowColCoords = function(c) {
    if (c === 1)
      return [];
    const t = Math.floor(c / 7) + 2, a = e(c), r = a === 145 ? 26 : Math.ceil((a - 13) / (2 * t - 2)) * 2, f = [a - 7];
    for (let i = 1; i < t - 1; i++)
      f[i] = f[i - 1] - r;
    return f.push(6), f.reverse();
  }, x.getPositions = function(c) {
    const t = [], a = x.getRowColCoords(c), r = a.length;
    for (let f = 0; f < r; f++)
      for (let i = 0; i < r; i++)
        f === 0 && i === 0 || // top-left
        f === 0 && i === r - 1 || // bottom-left
        f === r - 1 && i === 0 || t.push([a[f], a[i]]);
    return t;
  };
})(S0);
var C0 = {};
const J0 = I.getSymbolSize, _0 = 7;
C0.getPositions = function(e) {
  const n = J0(e);
  return [
    // top-left
    [0, 0],
    // top-right
    [n - _0, 0],
    // bottom-left
    [0, n - _0]
  ];
};
var A0 = {};
(function(x) {
  x.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const e = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  x.isValid = function(t) {
    return t != null && t !== "" && !isNaN(t) && t >= 0 && t <= 7;
  }, x.from = function(t) {
    return x.isValid(t) ? parseInt(t, 10) : void 0;
  }, x.getPenaltyN1 = function(t) {
    const a = t.size;
    let r = 0, f = 0, i = 0, s = null, u = null;
    for (let l = 0; l < a; l++) {
      f = i = 0, s = u = null;
      for (let d = 0; d < a; d++) {
        let b = t.get(l, d);
        b === s ? f++ : (f >= 5 && (r += e.N1 + (f - 5)), s = b, f = 1), b = t.get(d, l), b === u ? i++ : (i >= 5 && (r += e.N1 + (i - 5)), u = b, i = 1);
      }
      f >= 5 && (r += e.N1 + (f - 5)), i >= 5 && (r += e.N1 + (i - 5));
    }
    return r;
  }, x.getPenaltyN2 = function(t) {
    const a = t.size;
    let r = 0;
    for (let f = 0; f < a - 1; f++)
      for (let i = 0; i < a - 1; i++) {
        const s = t.get(f, i) + t.get(f, i + 1) + t.get(f + 1, i) + t.get(f + 1, i + 1);
        (s === 4 || s === 0) && r++;
      }
    return r * e.N2;
  }, x.getPenaltyN3 = function(t) {
    const a = t.size;
    let r = 0, f = 0, i = 0;
    for (let s = 0; s < a; s++) {
      f = i = 0;
      for (let u = 0; u < a; u++)
        f = f << 1 & 2047 | t.get(s, u), u >= 10 && (f === 1488 || f === 93) && r++, i = i << 1 & 2047 | t.get(u, s), u >= 10 && (i === 1488 || i === 93) && r++;
    }
    return r * e.N3;
  }, x.getPenaltyN4 = function(t) {
    let a = 0;
    const r = t.data.length;
    for (let i = 0; i < r; i++)
      a += t.data[i];
    return Math.abs(Math.ceil(a * 100 / r / 5) - 10) * e.N4;
  };
  function n(c, t, a) {
    switch (c) {
      case x.Patterns.PATTERN000:
        return (t + a) % 2 === 0;
      case x.Patterns.PATTERN001:
        return t % 2 === 0;
      case x.Patterns.PATTERN010:
        return a % 3 === 0;
      case x.Patterns.PATTERN011:
        return (t + a) % 3 === 0;
      case x.Patterns.PATTERN100:
        return (Math.floor(t / 2) + Math.floor(a / 3)) % 2 === 0;
      case x.Patterns.PATTERN101:
        return t * a % 2 + t * a % 3 === 0;
      case x.Patterns.PATTERN110:
        return (t * a % 2 + t * a % 3) % 2 === 0;
      case x.Patterns.PATTERN111:
        return (t * a % 3 + (t + a) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + c);
    }
  }
  x.applyMask = function(t, a) {
    const r = a.size;
    for (let f = 0; f < r; f++)
      for (let i = 0; i < r; i++)
        a.isReserved(i, f) || a.xor(i, f, n(t, i, f));
  }, x.getBestMask = function(t, a) {
    const r = Object.keys(x.Patterns).length;
    let f = 0, i = 1 / 0;
    for (let s = 0; s < r; s++) {
      a(s), x.applyMask(s, t);
      const u = x.getPenaltyN1(t) + x.getPenaltyN2(t) + x.getPenaltyN3(t) + x.getPenaltyN4(t);
      x.applyMask(s, t), u < i && (i = u, f = s);
    }
    return f;
  };
})(A0);
var X = {};
const N = Y, $ = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
], K = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
X.getBlocksCount = function(e, n) {
  switch (n) {
    case N.L:
      return $[(e - 1) * 4 + 0];
    case N.M:
      return $[(e - 1) * 4 + 1];
    case N.Q:
      return $[(e - 1) * 4 + 2];
    case N.H:
      return $[(e - 1) * 4 + 3];
    default:
      return;
  }
};
X.getTotalCodewordsCount = function(e, n) {
  switch (n) {
    case N.L:
      return K[(e - 1) * 4 + 0];
    case N.M:
      return K[(e - 1) * 4 + 1];
    case N.Q:
      return K[(e - 1) * 4 + 2];
    case N.H:
      return K[(e - 1) * 4 + 3];
    default:
      return;
  }
};
var B0 = {}, j = {};
const H = new Uint8Array(512), J = new Uint8Array(256);
(function() {
  let e = 1;
  for (let n = 0; n < 255; n++)
    H[n] = e, J[e] = n, e <<= 1, e & 256 && (e ^= 285);
  for (let n = 255; n < 512; n++)
    H[n] = H[n - 255];
})();
j.log = function(e) {
  if (e < 1)
    throw new Error("log(" + e + ")");
  return J[e];
};
j.exp = function(e) {
  return H[e];
};
j.mul = function(e, n) {
  return e === 0 || n === 0 ? 0 : H[J[e] + J[n]];
};
(function(x) {
  const e = j;
  x.mul = function(c, t) {
    const a = new Uint8Array(c.length + t.length - 1);
    for (let r = 0; r < c.length; r++)
      for (let f = 0; f < t.length; f++)
        a[r + f] ^= e.mul(c[r], t[f]);
    return a;
  }, x.mod = function(c, t) {
    let a = new Uint8Array(c);
    for (; a.length - t.length >= 0; ) {
      const r = a[0];
      for (let i = 0; i < t.length; i++)
        a[i] ^= e.mul(t[i], r);
      let f = 0;
      for (; f < a.length && a[f] === 0; )
        f++;
      a = a.slice(f);
    }
    return a;
  }, x.generateECPolynomial = function(c) {
    let t = new Uint8Array([1]);
    for (let a = 0; a < c; a++)
      t = x.mul(t, new Uint8Array([1, e.exp(a)]));
    return t;
  };
})(B0);
const I0 = B0;
function o0(x) {
  this.genPoly = void 0, this.degree = x, this.degree && this.initialize(this.degree);
}
o0.prototype.initialize = function(e) {
  this.degree = e, this.genPoly = I0.generateECPolynomial(this.degree);
};
o0.prototype.encode = function(e) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const n = new Uint8Array(e.length + this.degree);
  n.set(e);
  const c = I0.mod(n, this.genPoly), t = this.degree - c.length;
  if (t > 0) {
    const a = new Uint8Array(this.degree);
    return a.set(c, t), a;
  }
  return c;
};
var Q0 = o0, M0 = {}, L = {}, s0 = {};
s0.isValid = function(e) {
  return !isNaN(e) && e >= 1 && e <= 40;
};
var T = {};
const T0 = "[0-9]+", Y0 = "[A-Z $%*+\\-./:]+";
let O = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
O = O.replace(/u/g, "\\u");
const X0 = "(?:(?![A-Z0-9 $%*+\\-./:]|" + O + `)(?:.|[\r
]))+`;
T.KANJI = new RegExp(O, "g");
T.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
T.BYTE = new RegExp(X0, "g");
T.NUMERIC = new RegExp(T0, "g");
T.ALPHANUMERIC = new RegExp(Y0, "g");
const j0 = new RegExp("^" + O + "$"), Z0 = new RegExp("^" + T0 + "$"), q0 = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
T.testKanji = function(e) {
  return j0.test(e);
};
T.testNumeric = function(e) {
  return Z0.test(e);
};
T.testAlphanumeric = function(e) {
  return q0.test(e);
};
(function(x) {
  const e = s0, n = T;
  x.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, x.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, x.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, x.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, x.MIXED = {
    bit: -1
  }, x.getCharCountIndicator = function(a, r) {
    if (!a.ccBits)
      throw new Error("Invalid mode: " + a);
    if (!e.isValid(r))
      throw new Error("Invalid version: " + r);
    return r >= 1 && r < 10 ? a.ccBits[0] : r < 27 ? a.ccBits[1] : a.ccBits[2];
  }, x.getBestModeForData = function(a) {
    return n.testNumeric(a) ? x.NUMERIC : n.testAlphanumeric(a) ? x.ALPHANUMERIC : n.testKanji(a) ? x.KANJI : x.BYTE;
  }, x.toString = function(a) {
    if (a && a.id)
      return a.id;
    throw new Error("Invalid mode");
  }, x.isValid = function(a) {
    return a && a.bit && a.ccBits;
  };
  function c(t) {
    if (typeof t != "string")
      throw new Error("Param is not a string");
    switch (t.toLowerCase()) {
      case "numeric":
        return x.NUMERIC;
      case "alphanumeric":
        return x.ALPHANUMERIC;
      case "kanji":
        return x.KANJI;
      case "byte":
        return x.BYTE;
      default:
        throw new Error("Unknown mode: " + t);
    }
  }
  x.from = function(a, r) {
    if (x.isValid(a))
      return a;
    try {
      return c(a);
    } catch {
      return r;
    }
  };
})(L);
(function(x) {
  const e = I, n = X, c = Y, t = L, a = s0, r = 7973, f = e.getBCHDigit(r);
  function i(d, b, _) {
    for (let h = 1; h <= 40; h++)
      if (b <= x.getCapacity(h, _, d))
        return h;
  }
  function s(d, b) {
    return t.getCharCountIndicator(d, b) + 4;
  }
  function u(d, b) {
    let _ = 0;
    return d.forEach(function(h) {
      const p = s(h.mode, b);
      _ += p + h.getBitsLength();
    }), _;
  }
  function l(d, b) {
    for (let _ = 1; _ <= 40; _++)
      if (u(d, _) <= x.getCapacity(_, b, t.MIXED))
        return _;
  }
  x.from = function(b, _) {
    return a.isValid(b) ? parseInt(b, 10) : _;
  }, x.getCapacity = function(b, _, h) {
    if (!a.isValid(b))
      throw new Error("Invalid QR Code version");
    typeof h > "u" && (h = t.BYTE);
    const p = e.getSymbolTotalCodewords(b), v = n.getTotalCodewordsCount(b, _), w = (p - v) * 8;
    if (h === t.MIXED)
      return w;
    const g = w - s(h, b);
    switch (h) {
      case t.NUMERIC:
        return Math.floor(g / 10 * 3);
      case t.ALPHANUMERIC:
        return Math.floor(g / 11 * 2);
      case t.KANJI:
        return Math.floor(g / 13);
      case t.BYTE:
      default:
        return Math.floor(g / 8);
    }
  }, x.getBestVersionForData = function(b, _) {
    let h;
    const p = c.from(_, c.M);
    if (Array.isArray(b)) {
      if (b.length > 1)
        return l(b, p);
      if (b.length === 0)
        return 1;
      h = b[0];
    } else
      h = b;
    return i(h.mode, h.getLength(), p);
  }, x.getEncodedBits = function(b) {
    if (!a.isValid(b) || b < 7)
      throw new Error("Invalid QR Code version");
    let _ = b << 12;
    for (; e.getBCHDigit(_) - f >= 0; )
      _ ^= r << e.getBCHDigit(_) - f;
    return b << 12 | _;
  };
})(M0);
var P0 = {};
const n0 = I, N0 = 1335, W0 = 21522, h0 = n0.getBCHDigit(N0);
P0.getEncodedBits = function(e, n) {
  const c = e.bit << 3 | n;
  let t = c << 10;
  for (; n0.getBCHDigit(t) - h0 >= 0; )
    t ^= N0 << n0.getBCHDigit(t) - h0;
  return (c << 10 | t) ^ W0;
};
var L0 = {};
const x1 = L;
function U(x) {
  this.mode = x1.NUMERIC, this.data = x.toString();
}
U.getBitsLength = function(e) {
  return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
};
U.prototype.getLength = function() {
  return this.data.length;
};
U.prototype.getBitsLength = function() {
  return U.getBitsLength(this.data.length);
};
U.prototype.write = function(e) {
  let n, c, t;
  for (n = 0; n + 3 <= this.data.length; n += 3)
    c = this.data.substr(n, 3), t = parseInt(c, 10), e.put(t, 10);
  const a = this.data.length - n;
  a > 0 && (c = this.data.substr(n), t = parseInt(c, 10), e.put(t, a * 3 + 1));
};
var e1 = U;
const t1 = L, W = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function R(x) {
  this.mode = t1.ALPHANUMERIC, this.data = x;
}
R.getBitsLength = function(e) {
  return 11 * Math.floor(e / 2) + 6 * (e % 2);
};
R.prototype.getLength = function() {
  return this.data.length;
};
R.prototype.getBitsLength = function() {
  return R.getBitsLength(this.data.length);
};
R.prototype.write = function(e) {
  let n;
  for (n = 0; n + 2 <= this.data.length; n += 2) {
    let c = W.indexOf(this.data[n]) * 45;
    c += W.indexOf(this.data[n + 1]), e.put(c, 11);
  }
  this.data.length % 2 && e.put(W.indexOf(this.data[n]), 6);
};
var c1 = R, n1 = function(e) {
  for (var n = [], c = e.length, t = 0; t < c; t++) {
    var a = e.charCodeAt(t);
    if (a >= 55296 && a <= 56319 && c > t + 1) {
      var r = e.charCodeAt(t + 1);
      r >= 56320 && r <= 57343 && (a = (a - 55296) * 1024 + r - 56320 + 65536, t += 1);
    }
    if (a < 128) {
      n.push(a);
      continue;
    }
    if (a < 2048) {
      n.push(a >> 6 | 192), n.push(a & 63 | 128);
      continue;
    }
    if (a < 55296 || a >= 57344 && a < 65536) {
      n.push(a >> 12 | 224), n.push(a >> 6 & 63 | 128), n.push(a & 63 | 128);
      continue;
    }
    if (a >= 65536 && a <= 1114111) {
      n.push(a >> 18 | 240), n.push(a >> 12 & 63 | 128), n.push(a >> 6 & 63 | 128), n.push(a & 63 | 128);
      continue;
    }
    n.push(239, 191, 189);
  }
  return new Uint8Array(n).buffer;
};
const a1 = n1, r1 = L;
function F(x) {
  this.mode = r1.BYTE, typeof x == "string" && (x = a1(x)), this.data = new Uint8Array(x);
}
F.getBitsLength = function(e) {
  return e * 8;
};
F.prototype.getLength = function() {
  return this.data.length;
};
F.prototype.getBitsLength = function() {
  return F.getBitsLength(this.data.length);
};
F.prototype.write = function(x) {
  for (let e = 0, n = this.data.length; e < n; e++)
    x.put(this.data[e], 8);
};
var f1 = F;
const i1 = L, o1 = I;
function D(x) {
  this.mode = i1.KANJI, this.data = x;
}
D.getBitsLength = function(e) {
  return e * 13;
};
D.prototype.getLength = function() {
  return this.data.length;
};
D.prototype.getBitsLength = function() {
  return D.getBitsLength(this.data.length);
};
D.prototype.write = function(x) {
  let e;
  for (e = 0; e < this.data.length; e++) {
    let n = o1.toSJIS(this.data[e]);
    if (n >= 33088 && n <= 40956)
      n -= 33088;
    else if (n >= 57408 && n <= 60351)
      n -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " + this.data[e] + `
Make sure your charset is UTF-8`
      );
    n = (n >>> 8 & 255) * 192 + (n & 255), x.put(n, 13);
  }
};
var s1 = D, U0 = { exports: {} };
(function(x) {
  var e = {
    single_source_shortest_paths: function(n, c, t) {
      var a = {}, r = {};
      r[c] = 0;
      var f = e.PriorityQueue.make();
      f.push(c, 0);
      for (var i, s, u, l, d, b, _, h, p; !f.empty(); ) {
        i = f.pop(), s = i.value, l = i.cost, d = n[s] || {};
        for (u in d)
          d.hasOwnProperty(u) && (b = d[u], _ = l + b, h = r[u], p = typeof r[u] > "u", (p || h > _) && (r[u] = _, f.push(u, _), a[u] = s));
      }
      if (typeof t < "u" && typeof r[t] > "u") {
        var v = ["Could not find a path from ", c, " to ", t, "."].join("");
        throw new Error(v);
      }
      return a;
    },
    extract_shortest_path_from_predecessor_list: function(n, c) {
      for (var t = [], a = c; a; )
        t.push(a), n[a], a = n[a];
      return t.reverse(), t;
    },
    find_path: function(n, c, t) {
      var a = e.single_source_shortest_paths(n, c, t);
      return e.extract_shortest_path_from_predecessor_list(
        a,
        t
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(n) {
        var c = e.PriorityQueue, t = {}, a;
        n = n || {};
        for (a in c)
          c.hasOwnProperty(a) && (t[a] = c[a]);
        return t.queue = [], t.sorter = n.sorter || c.default_sorter, t;
      },
      default_sorter: function(n, c) {
        return n.cost - c.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(n, c) {
        var t = { value: n, cost: c };
        this.queue.push(t), this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  x.exports = e;
})(U0);
var d1 = U0.exports;
(function(x) {
  const e = L, n = e1, c = c1, t = f1, a = s1, r = T, f = I, i = d1;
  function s(v) {
    return unescape(encodeURIComponent(v)).length;
  }
  function u(v, w, g) {
    const m = [];
    let E;
    for (; (E = v.exec(g)) !== null; )
      m.push({
        data: E[0],
        index: E.index,
        mode: w,
        length: E[0].length
      });
    return m;
  }
  function l(v) {
    const w = u(r.NUMERIC, e.NUMERIC, v), g = u(r.ALPHANUMERIC, e.ALPHANUMERIC, v);
    let m, E;
    return f.isKanjiModeEnabled() ? (m = u(r.BYTE, e.BYTE, v), E = u(r.KANJI, e.KANJI, v)) : (m = u(r.BYTE_KANJI, e.BYTE, v), E = []), w.concat(g, m, E).sort(function(S, C) {
      return S.index - C.index;
    }).map(function(S) {
      return {
        data: S.data,
        mode: S.mode,
        length: S.length
      };
    });
  }
  function d(v, w) {
    switch (w) {
      case e.NUMERIC:
        return n.getBitsLength(v);
      case e.ALPHANUMERIC:
        return c.getBitsLength(v);
      case e.KANJI:
        return a.getBitsLength(v);
      case e.BYTE:
        return t.getBitsLength(v);
    }
  }
  function b(v) {
    return v.reduce(function(w, g) {
      const m = w.length - 1 >= 0 ? w[w.length - 1] : null;
      return m && m.mode === g.mode ? (w[w.length - 1].data += g.data, w) : (w.push(g), w);
    }, []);
  }
  function _(v) {
    const w = [];
    for (let g = 0; g < v.length; g++) {
      const m = v[g];
      switch (m.mode) {
        case e.NUMERIC:
          w.push([
            m,
            { data: m.data, mode: e.ALPHANUMERIC, length: m.length },
            { data: m.data, mode: e.BYTE, length: m.length }
          ]);
          break;
        case e.ALPHANUMERIC:
          w.push([
            m,
            { data: m.data, mode: e.BYTE, length: m.length }
          ]);
          break;
        case e.KANJI:
          w.push([
            m,
            { data: m.data, mode: e.BYTE, length: s(m.data) }
          ]);
          break;
        case e.BYTE:
          w.push([
            { data: m.data, mode: e.BYTE, length: s(m.data) }
          ]);
      }
    }
    return w;
  }
  function h(v, w) {
    const g = {}, m = { start: {} };
    let E = ["start"];
    for (let y = 0; y < v.length; y++) {
      const S = v[y], C = [];
      for (let B = 0; B < S.length; B++) {
        const A = S[B], M = "" + y + B;
        C.push(M), g[M] = { node: A, lastCount: 0 }, m[M] = {};
        for (let q = 0; q < E.length; q++) {
          const P = E[q];
          g[P] && g[P].node.mode === A.mode ? (m[P][M] = d(g[P].lastCount + A.length, A.mode) - d(g[P].lastCount, A.mode), g[P].lastCount += A.length) : (g[P] && (g[P].lastCount = A.length), m[P][M] = d(A.length, A.mode) + 4 + e.getCharCountIndicator(A.mode, w));
        }
      }
      E = C;
    }
    for (let y = 0; y < E.length; y++)
      m[E[y]].end = 0;
    return { map: m, table: g };
  }
  function p(v, w) {
    let g;
    const m = e.getBestModeForData(v);
    if (g = e.from(w, m), g !== e.BYTE && g.bit < m.bit)
      throw new Error('"' + v + '" cannot be encoded with mode ' + e.toString(g) + `.
 Suggested mode is: ` + e.toString(m));
    switch (g === e.KANJI && !f.isKanjiModeEnabled() && (g = e.BYTE), g) {
      case e.NUMERIC:
        return new n(v);
      case e.ALPHANUMERIC:
        return new c(v);
      case e.KANJI:
        return new a(v);
      case e.BYTE:
        return new t(v);
    }
  }
  x.fromArray = function(w) {
    return w.reduce(function(g, m) {
      return typeof m == "string" ? g.push(p(m, null)) : m.data && g.push(p(m.data, m.mode)), g;
    }, []);
  }, x.fromString = function(w, g) {
    const m = l(w, f.isKanjiModeEnabled()), E = _(m), y = h(E, g), S = i.find_path(y.map, "start", "end"), C = [];
    for (let B = 1; B < S.length - 1; B++)
      C.push(y.table[S[B]].node);
    return x.fromArray(b(C));
  }, x.rawSplit = function(w) {
    return x.fromArray(
      l(w, f.isKanjiModeEnabled())
    );
  };
})(L0);
const Z = I, x0 = Y, u1 = $0, l1 = K0, b1 = S0, _1 = C0, a0 = A0, r0 = X, h1 = Q0, Q = M0, g1 = P0, m1 = L, e0 = L0;
function v1(x, e) {
  const n = x.size, c = _1.getPositions(e);
  for (let t = 0; t < c.length; t++) {
    const a = c[t][0], r = c[t][1];
    for (let f = -1; f <= 7; f++)
      if (!(a + f <= -1 || n <= a + f))
        for (let i = -1; i <= 7; i++)
          r + i <= -1 || n <= r + i || (f >= 0 && f <= 6 && (i === 0 || i === 6) || i >= 0 && i <= 6 && (f === 0 || f === 6) || f >= 2 && f <= 4 && i >= 2 && i <= 4 ? x.set(a + f, r + i, !0, !0) : x.set(a + f, r + i, !1, !0));
  }
}
function w1(x) {
  const e = x.size;
  for (let n = 8; n < e - 8; n++) {
    const c = n % 2 === 0;
    x.set(n, 6, c, !0), x.set(6, n, c, !0);
  }
}
function E1(x, e) {
  const n = b1.getPositions(e);
  for (let c = 0; c < n.length; c++) {
    const t = n[c][0], a = n[c][1];
    for (let r = -2; r <= 2; r++)
      for (let f = -2; f <= 2; f++)
        r === -2 || r === 2 || f === -2 || f === 2 || r === 0 && f === 0 ? x.set(t + r, a + f, !0, !0) : x.set(t + r, a + f, !1, !0);
  }
}
function p1(x, e) {
  const n = x.size, c = Q.getEncodedBits(e);
  let t, a, r;
  for (let f = 0; f < 18; f++)
    t = Math.floor(f / 3), a = f % 3 + n - 8 - 3, r = (c >> f & 1) === 1, x.set(t, a, r, !0), x.set(a, t, r, !0);
}
function t0(x, e, n) {
  const c = x.size, t = g1.getEncodedBits(e, n);
  let a, r;
  for (a = 0; a < 15; a++)
    r = (t >> a & 1) === 1, a < 6 ? x.set(a, 8, r, !0) : a < 8 ? x.set(a + 1, 8, r, !0) : x.set(c - 15 + a, 8, r, !0), a < 8 ? x.set(8, c - a - 1, r, !0) : a < 9 ? x.set(8, 15 - a - 1 + 1, r, !0) : x.set(8, 15 - a - 1, r, !0);
  x.set(c - 8, 8, 1, !0);
}
function y1(x, e) {
  const n = x.size;
  let c = -1, t = n - 1, a = 7, r = 0;
  for (let f = n - 1; f > 0; f -= 2)
    for (f === 6 && f--; ; ) {
      for (let i = 0; i < 2; i++)
        if (!x.isReserved(t, f - i)) {
          let s = !1;
          r < e.length && (s = (e[r] >>> a & 1) === 1), x.set(t, f - i, s), a--, a === -1 && (r++, a = 7);
        }
      if (t += c, t < 0 || n <= t) {
        t -= c, c = -c;
        break;
      }
    }
}
function S1(x, e, n) {
  const c = new u1();
  n.forEach(function(i) {
    c.put(i.mode.bit, 4), c.put(i.getLength(), m1.getCharCountIndicator(i.mode, x)), i.write(c);
  });
  const t = Z.getSymbolTotalCodewords(x), a = r0.getTotalCodewordsCount(x, e), r = (t - a) * 8;
  for (c.getLengthInBits() + 4 <= r && c.put(0, 4); c.getLengthInBits() % 8 !== 0; )
    c.putBit(0);
  const f = (r - c.getLengthInBits()) / 8;
  for (let i = 0; i < f; i++)
    c.put(i % 2 ? 17 : 236, 8);
  return C1(c, x, e);
}
function C1(x, e, n) {
  const c = Z.getSymbolTotalCodewords(e), t = r0.getTotalCodewordsCount(e, n), a = c - t, r = r0.getBlocksCount(e, n), f = c % r, i = r - f, s = Math.floor(c / r), u = Math.floor(a / r), l = u + 1, d = s - u, b = new h1(d);
  let _ = 0;
  const h = new Array(r), p = new Array(r);
  let v = 0;
  const w = new Uint8Array(x.buffer);
  for (let S = 0; S < r; S++) {
    const C = S < i ? u : l;
    h[S] = w.slice(_, _ + C), p[S] = b.encode(h[S]), _ += C, v = Math.max(v, C);
  }
  const g = new Uint8Array(c);
  let m = 0, E, y;
  for (E = 0; E < v; E++)
    for (y = 0; y < r; y++)
      E < h[y].length && (g[m++] = h[y][E]);
  for (E = 0; E < d; E++)
    for (y = 0; y < r; y++)
      g[m++] = p[y][E];
  return g;
}
function A1(x, e, n, c) {
  let t;
  if (Array.isArray(x))
    t = e0.fromArray(x);
  else if (typeof x == "string") {
    let s = e;
    if (!s) {
      const u = e0.rawSplit(x);
      s = Q.getBestVersionForData(u, n);
    }
    t = e0.fromString(x, s || 40);
  } else
    throw new Error("Invalid data");
  const a = Q.getBestVersionForData(t, n);
  if (!a)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!e)
    e = a;
  else if (e < a)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + a + `.
`
    );
  const r = S1(e, n, t), f = Z.getSymbolSize(e), i = new l1(f);
  return v1(i, e), w1(i), E1(i, e), t0(i, n, 0), e >= 7 && p1(i, e), y1(i, r), isNaN(c) && (c = a0.getBestMask(
    i,
    t0.bind(null, i, n)
  )), a0.applyMask(c, i), t0(i, n, c), {
    modules: i,
    version: e,
    errorCorrectionLevel: n,
    maskPattern: c,
    segments: t
  };
}
p0.create = function(e, n) {
  if (typeof e > "u" || e === "")
    throw new Error("No input text");
  let c = x0.M, t, a;
  return typeof n < "u" && (c = x0.from(n.errorCorrectionLevel, x0.M), t = Q.from(n.version), a = a0.from(n.maskPattern), n.toSJISFunc && Z.setToSJISFunction(n.toSJISFunc)), A1(e, t, c, a);
};
var R0 = {}, d0 = {};
(function(x) {
  function e(n) {
    if (typeof n == "number" && (n = n.toString()), typeof n != "string")
      throw new Error("Color should be defined as hex string");
    let c = n.slice().replace("#", "").split("");
    if (c.length < 3 || c.length === 5 || c.length > 8)
      throw new Error("Invalid hex color: " + n);
    (c.length === 3 || c.length === 4) && (c = Array.prototype.concat.apply([], c.map(function(a) {
      return [a, a];
    }))), c.length === 6 && c.push("F", "F");
    const t = parseInt(c.join(""), 16);
    return {
      r: t >> 24 & 255,
      g: t >> 16 & 255,
      b: t >> 8 & 255,
      a: t & 255,
      hex: "#" + c.slice(0, 6).join("")
    };
  }
  x.getOptions = function(c) {
    c || (c = {}), c.color || (c.color = {});
    const t = typeof c.margin > "u" || c.margin === null || c.margin < 0 ? 4 : c.margin, a = c.width && c.width >= 21 ? c.width : void 0, r = c.scale || 4;
    return {
      width: a,
      scale: a ? 4 : r,
      margin: t,
      color: {
        dark: e(c.color.dark || "#000000ff"),
        light: e(c.color.light || "#ffffffff")
      },
      type: c.type,
      rendererOpts: c.rendererOpts || {}
    };
  }, x.getScale = function(c, t) {
    return t.width && t.width >= c + t.margin * 2 ? t.width / (c + t.margin * 2) : t.scale;
  }, x.getImageWidth = function(c, t) {
    const a = x.getScale(c, t);
    return Math.floor((c + t.margin * 2) * a);
  }, x.qrToImageData = function(c, t, a) {
    const r = t.modules.size, f = t.modules.data, i = x.getScale(r, a), s = Math.floor((r + a.margin * 2) * i), u = a.margin * i, l = [a.color.light, a.color.dark];
    for (let d = 0; d < s; d++)
      for (let b = 0; b < s; b++) {
        let _ = (d * s + b) * 4, h = a.color.light;
        if (d >= u && b >= u && d < s - u && b < s - u) {
          const p = Math.floor((d - u) / i), v = Math.floor((b - u) / i);
          h = l[f[p * r + v] ? 1 : 0];
        }
        c[_++] = h.r, c[_++] = h.g, c[_++] = h.b, c[_] = h.a;
      }
  };
})(d0);
(function(x) {
  const e = d0;
  function n(t, a, r) {
    t.clearRect(0, 0, a.width, a.height), a.style || (a.style = {}), a.height = r, a.width = r, a.style.height = r + "px", a.style.width = r + "px";
  }
  function c() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  x.render = function(a, r, f) {
    let i = f, s = r;
    typeof i > "u" && (!r || !r.getContext) && (i = r, r = void 0), r || (s = c()), i = e.getOptions(i);
    const u = e.getImageWidth(a.modules.size, i), l = s.getContext("2d"), d = l.createImageData(u, u);
    return e.qrToImageData(d.data, a, i), n(l, s, u), l.putImageData(d, 0, 0), s;
  }, x.renderToDataURL = function(a, r, f) {
    let i = f;
    typeof i > "u" && (!r || !r.getContext) && (i = r, r = void 0), i || (i = {});
    const s = x.render(a, r, i), u = i.type || "image/png", l = i.rendererOpts || {};
    return s.toDataURL(u, l.quality);
  };
})(R0);
var F0 = {};
const B1 = d0;
function g0(x, e) {
  const n = x.a / 255, c = e + '="' + x.hex + '"';
  return n < 1 ? c + " " + e + '-opacity="' + n.toFixed(2).slice(1) + '"' : c;
}
function c0(x, e, n) {
  let c = x + e;
  return typeof n < "u" && (c += " " + n), c;
}
function I1(x, e, n) {
  let c = "", t = 0, a = !1, r = 0;
  for (let f = 0; f < x.length; f++) {
    const i = Math.floor(f % e), s = Math.floor(f / e);
    !i && !a && (a = !0), x[f] ? (r++, f > 0 && i > 0 && x[f - 1] || (c += a ? c0("M", i + n, 0.5 + s + n) : c0("m", t, 0), t = 0, a = !1), i + 1 < e && x[f + 1] || (c += c0("h", r), r = 0)) : t++;
  }
  return c;
}
F0.render = function(e, n, c) {
  const t = B1.getOptions(n), a = e.modules.size, r = e.modules.data, f = a + t.margin * 2, i = t.color.light.a ? "<path " + g0(t.color.light, "fill") + ' d="M0 0h' + f + "v" + f + 'H0z"/>' : "", s = "<path " + g0(t.color.dark, "stroke") + ' d="' + I1(r, a, t.margin) + '"/>', u = 'viewBox="0 0 ' + f + " " + f + '"', d = '<svg xmlns="http://www.w3.org/2000/svg" ' + (t.width ? 'width="' + t.width + '" height="' + t.width + '" ' : "") + u + ' shape-rendering="crispEdges">' + i + s + `</svg>
`;
  return typeof c == "function" && c(null, d), d;
};
const M1 = V0, f0 = p0, D0 = R0, T1 = F0;
function u0(x, e, n, c, t) {
  const a = [].slice.call(arguments, 1), r = a.length, f = typeof a[r - 1] == "function";
  if (!f && !M1())
    throw new Error("Callback required as last argument");
  if (f) {
    if (r < 2)
      throw new Error("Too few arguments provided");
    r === 2 ? (t = n, n = e, e = c = void 0) : r === 3 && (e.getContext && typeof t > "u" ? (t = c, c = void 0) : (t = c, c = n, n = e, e = void 0));
  } else {
    if (r < 1)
      throw new Error("Too few arguments provided");
    return r === 1 ? (n = e, e = c = void 0) : r === 2 && !e.getContext && (c = n, n = e, e = void 0), new Promise(function(i, s) {
      try {
        const u = f0.create(n, c);
        i(x(u, e, c));
      } catch (u) {
        s(u);
      }
    });
  }
  try {
    const i = f0.create(n, c);
    t(null, x(i, e, c));
  } catch (i) {
    t(i);
  }
}
V.create = f0.create;
V.toCanvas = u0.bind(null, D0.render);
V.toDataURL = u0.bind(null, D0.renderToDataURL);
V.toString = u0.bind(null, function(x, e, n) {
  return T1.render(x, n);
});
const P1 = { class: "apron-qr-code" }, N1 = ["src"], z0 = /* @__PURE__ */ Object.assign({
  name: "ApQrcode"
}, {
  __name: "qrcode",
  props: {
    text: {
      type: String,
      default: "Apron Design QrCode"
    },
    size: {
      type: [String, Number],
      default: ""
    },
    color: {
      type: String,
      default: "#393939"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    margin: Number
  },
  emits: {
    // fail: () => { console.log(fail) }
  },
  setup(x, { emit: e }) {
    const n = x, c = b0(n.text), t = b0("");
    function a(r) {
      const f = {
        errorCorrectionLevel: "H",
        width: n.size,
        margin: n.margin,
        color: {
          light: n.backgroundColor,
          dark: n.color
        }
      };
      V.toDataURL(r || n.text, f, (i, s) => {
        i ? alert(i) : t.value = s;
      });
    }
    return a(c.value), (r, f) => (v0(), w0("div", P1, [
      E0("img", { src: t.value }, null, 8, N1)
    ]));
  }
});
var o = {
  PLUS: "+",
  MINUS: "-",
  BASE: 10,
  scale: 0,
  bc_num: function() {
    this.n_sign = null, this.n_len = null, this.n_scale = null, this.n_value = null, this.toString = function() {
      var x, e;
      return e = this.n_value.join(""), x = (this.n_sign == o.PLUS ? "" : this.n_sign) + e.substr(0, this.n_len), this.n_scale > 0 && (x += "." + e.substr(this.n_len, this.n_scale)), x;
    }, this.setScale = function(x) {
      for (; this.n_scale < x; )
        this.n_value.push(0), this.n_scale++;
      for (; this.n_scale > x; )
        this.n_value.pop(), this.n_scale--;
      return this;
    };
  },
  bc_new_num: function(x, e) {
    var n;
    return n = new o.bc_num(), n.n_sign = o.PLUS, n.n_len = x, n.n_scale = e, n.n_value = o.safe_emalloc(1, x + e, 0), o.memset(n.n_value, 0, 0, x + e), n;
  },
  safe_emalloc: function(x, e, n) {
    return Array(x * e + n);
  },
  bc_init_num: function() {
    return new o.bc_new_num(1, 0);
  },
  _bc_rm_leading_zeros: function(x) {
    for (; x.n_value[0] === 0 && x.n_len > 1; )
      x.n_value.shift(), x.n_len--;
  },
  php_str2num: function(x) {
    var e;
    return e = x.indexOf("."), e == -1 ? o.bc_str2num(x, 0) : o.bc_str2num(x, x.length - e);
  },
  CH_VAL: function(x) {
    return x - "0";
  },
  BCD_CHAR: function(x) {
    return x + "0";
  },
  isdigit: function(x) {
    return !isNaN(parseInt(x, 10));
  },
  bc_str2num: function(x, e) {
    var n, c, t, a, r, f, i;
    for (n = x.split(""), t = 0, a = 0, r = 0, f = !1, (n[t] === "+" || n[t] === "-") && t++; n[t] === "0"; )
      t++;
    for (; n[t] % 1 === 0; )
      t++, a++;
    for (n[t] === "." && t++; n[t] % 1 === 0; )
      t++, r++;
    if (n[t] || a + r === 0)
      return o.bc_init_num();
    for (r = o.MIN(r, e), a === 0 && (f = !0, a = 1), c = o.bc_new_num(a, r), t = 0, n[t] === "-" ? (c.n_sign = o.MINUS, t++) : (c.n_sign = o.PLUS, n[t] === "+" && t++); n[t] === "0"; )
      t++;
    for (i = 0, f && (c.n_value[i++] = 0, a = 0); a > 0; a--)
      c.n_value[i++] = o.CH_VAL(n[t++]);
    if (r > 0)
      for (t++; r > 0; r--)
        c.n_value[i++] = o.CH_VAL(n[t++]);
    return c;
  },
  cint: function(x) {
    typeof x > "u" && (x = 0);
    var e = parseInt(x, 10);
    return isNaN(e) && (e = 0), e;
  },
  MIN: function(x, e) {
    return x > e ? e : x;
  },
  MAX: function(x, e) {
    return x > e ? x : e;
  },
  ODD: function(x) {
    return x & 1;
  },
  memset: function(x, e, n, c) {
    var t;
    for (t = 0; t < c; t++)
      x[e + t] = n;
  },
  memcpy: function(x, e, n, c, t) {
    var a;
    for (a = 0; a < t; a++)
      x[e + a] = n[c + a];
    return !0;
  },
  bc_is_zero: function(x) {
    var e, n;
    for (e = x.n_len + x.n_scale, n = 0; e > 0 && x.n_value[n++] === 0; )
      e--;
    return e === 0;
  },
  bc_out_of_memory: function() {
    throw new Error("(BC) Out of memory");
  }
};
o.bc_add = function(x, e, n) {
  var c, t, a;
  if (x.n_sign === e.n_sign)
    c = o._bc_do_add(x, e, n), c.n_sign = x.n_sign;
  else
    switch (t = o._bc_do_compare(x, e, !1, !1), t) {
      case -1:
        c = o._bc_do_sub(e, x, n), c.n_sign = e.n_sign;
        break;
      case 0:
        a = o.MAX(n, o.MAX(x.n_scale, e.n_scale)), c = o.bc_new_num(1, a), o.memset(c.n_value, 0, 0, a + 1);
        break;
      case 1:
        c = o._bc_do_sub(x, e, n), c.n_sign = x.n_sign;
    }
  return c;
};
o.bc_compare = function(x, e) {
  return o._bc_do_compare(x, e, !0, !1);
};
o._bc_do_compare = function(x, e, n, c) {
  var t, a, r;
  if (n && x.n_sign != e.n_sign)
    return x.n_sign == o.PLUS ? 1 : -1;
  if (x.n_len != e.n_len)
    return x.n_len > e.n_len ? !n || x.n_sign == o.PLUS ? 1 : -1 : !n || x.n_sign == o.PLUS ? -1 : 1;
  for (r = x.n_len + Math.min(x.n_scale, e.n_scale), t = 0, a = 0; r > 0 && x.n_value[t] == e.n_value[a]; )
    t++, a++, r--;
  if (c && r == 1 && x.n_scale == e.n_scale)
    return 0;
  if (r !== 0)
    return x.n_value[t] > e.n_value[a] ? !n || x.n_sign == o.PLUS ? 1 : -1 : !n || x.n_sign == o.PLUS ? -1 : 1;
  if (x.n_scale != e.n_scale) {
    if (x.n_scale > e.n_scale) {
      for (r = x.n_scale - e.n_scale; r > 0; r--)
        if (x.n_value[t++] !== 0)
          return !n || x.n_sign == o.PLUS ? 1 : -1;
    } else
      for (r = e.n_scale - x.n_scale; r > 0; r--)
        if (e.n_value[a++] !== 0)
          return !n || x.n_sign == o.PLUS ? -1 : 1;
  }
  return 0;
};
o._one_mult = function(x, e, n, c, t, a) {
  var r, f, i, s;
  if (c === 0)
    o.memset(t, 0, 0, n);
  else if (c == 1)
    o.memcpy(t, a, x, e, n);
  else {
    for (i = e + n - 1, s = a + n - 1, r = 0; n-- > 0; )
      f = x[i--] * c + r, t[s--] = f % o.BASE, r = Math.floor(f / o.BASE);
    r != 0 && (t[s] = r);
  }
};
o.bc_divide = function(x, e, n) {
  var c, t, a, r, f, i, s, u, l, d, b, _, h, p, v, w, g, m, E, y, S, C;
  if (o.bc_is_zero(e))
    return -1;
  if (o.bc_is_zero(x))
    return o.bc_new_num(1, n);
  for (e.n_scale === 0 && e.n_len === 1 && e.n_value[0] === 1 && (c = o.bc_new_num(x.n_len, n), c.n_sign = x.n_sign == e.n_sign ? o.PLUS : o.MINUS, o.memset(c.n_value, x.n_len, 0, n), o.memcpy(
    c.n_value,
    0,
    x.n_value,
    0,
    x.n_len + o.MIN(x.n_scale, n)
  )), _ = e.n_scale, i = e.n_len + _ - 1; _ > 0 && e.n_value[i--] === 0; )
    _--;
  for (d = x.n_len + _, u = x.n_scale - _, u < n ? p = n - u : p = 0, t = o.safe_emalloc(1, x.n_len + x.n_scale, p + 2), t === null && o.bc_out_of_memory(), o.memset(t, 0, 0, x.n_len + x.n_scale + p + 2), o.memcpy(t, 1, x.n_value, 0, x.n_len + x.n_scale), b = e.n_len + _, a = o.safe_emalloc(1, b, 1), a === null && o.bc_out_of_memory(), o.memcpy(a, 0, e.n_value, 0, b), a[b] = 0, i = 0; a[i] === 0; )
    i++, b--;
  if (b > d + n ? (h = n + 1, S = !0) : (S = !1, b > d ? h = n + 1 : h = d - b + n + 1), c = o.bc_new_num(h - n, n), o.memset(c.n_value, 0, 0, h), y = o.safe_emalloc(1, b, 1), y === null && o.bc_out_of_memory(), !S)
    for (C = Math.floor(10 / (e.n_value[i] + 1)), C != 1 && (o._one_mult(t, 0, d + u + p + 1, C, t, 0), o._one_mult(e.n_value, i, b, C, e.n_value, i)), w = 0, b > d ? s = b - d : s = 0; w <= d + n - b; ) {
      if (e.n_value[i] == t[w] ? g = 9 : g = Math.floor((t[w] * 10 + t[w + 1]) / e.n_value[i]), e.n_value[i + 1] * g > (t[w] * 10 + t[w + 1] - e.n_value[i] * g) * 10 + t[w + 2] && (g--, e.n_value[i + 1] * g > (t[w] * 10 + t[w + 1] - e.n_value[i] * g) * 10 + t[w + 2] && g--), m = 0, g !== 0)
        for (y[0] = 0, o._one_mult(e.n_value, i, b, g, y, 1), r = w + b, f = b, v = 0; v < b + 1; v++)
          f < 0 ? l = t[r] - 0 - m : l = t[r] - y[f--] - m, l < 0 ? (l += 10, m = 1) : m = 0, t[r--] = l;
      if (m == 1) {
        for (g--, r = w + b, f = b - 1, E = 0, v = 0; v < b; v++)
          f < 0 ? l = t[r] + 0 + E : l = t[r] + e.n_value[f--] + E, l > 9 ? (l -= 10, E = 1) : E = 0, t[r--] = l;
        E == 1 && (t[r] = (t[r] + 1) % 10);
      }
      c.n_value[s++] = g, w++;
    }
  return c.n_sign = x.n_sign == e.n_sign ? o.PLUS : o.MINUS, o.bc_is_zero(c) && (c.n_sign = o.PLUS), o._bc_rm_leading_zeros(c), c;
};
o._bc_do_add = function(x, e, n) {
  var c, t, a, r, f, i, s, u, l, d;
  if (t = o.MAX(x.n_scale, e.n_scale), a = o.MAX(x.n_len, e.n_len) + 1, c = o.bc_new_num(a, o.MAX(t, n)), u = x.n_scale, l = e.n_scale, r = x.n_len + u - 1, f = e.n_len + l - 1, i = t + a - 1, u != l)
    if (u > l)
      for (; u > l; )
        c.n_value[i--] = x.n_value[r--], u--;
    else
      for (; l > u; )
        c.n_value[i--] = e.n_value[f--], l--;
  for (u += x.n_len, l += e.n_len, s = 0; u > 0 && l > 0; )
    d = x.n_value[r--] + e.n_value[f--] + s, d >= o.BASE ? (s = 1, d -= o.BASE) : s = 0, c.n_value[i] = d, i--, u--, l--;
  if (u === 0)
    for (; l-- > 0; )
      d = e.n_value[f--] + s, d >= o.BASE ? (s = 1, d -= o.BASE) : s = 0, c.n_value[i--] = d;
  else
    for (; u-- > 0; )
      d = x.n_value[r--] + s, d >= o.BASE ? (s = 1, d -= o.BASE) : s = 0, c.n_value[i--] = d;
  return s == 1 && (c.n_value[i] += 1), o._bc_rm_leading_zeros(c), c;
};
o._bc_do_sub = function(x, e, n) {
  var c, t, a, r, f, i, s, u, l, d, b;
  if (a = o.MAX(x.n_len, e.n_len), t = o.MAX(x.n_scale, e.n_scale), f = o.MIN(x.n_len, e.n_len), r = o.MIN(x.n_scale, e.n_scale), c = o.bc_new_num(a, o.MAX(t, n)), i = x.n_len + x.n_scale - 1, s = e.n_len + e.n_scale - 1, u = a + t - 1, l = 0, x.n_scale != r)
    for (d = x.n_scale - r; d > 0; d--)
      c.n_value[u--] = x.n_value[i--];
  else
    for (d = e.n_scale - r; d > 0; d--)
      b = 0 - e.n_value[s--] - l, b < 0 ? (b += o.BASE, l = 1) : (l = 0, c.n_value[u--] = b);
  for (d = 0; d < f + r; d++)
    b = x.n_value[i--] - e.n_value[s--] - l, b < 0 ? (b += o.BASE, l = 1) : l = 0, c.n_value[u--] = b;
  if (a != f)
    for (d = a - f; d > 0; d--)
      b = x.n_value[i--] - l, b < 0 ? (b += o.BASE, l = 1) : l = 0, c.n_value[u--] = b;
  return o._bc_rm_leading_zeros(c), c;
};
o.MUL_BASE_DIGITS = 80;
o.MUL_SMALL_DIGITS = o.MUL_BASE_DIGITS / 4;
o.bc_multiply = function(x, e, n) {
  var c, t, a, r, f;
  return t = x.n_len + x.n_scale, a = e.n_len + e.n_scale, r = x.n_scale + e.n_scale, f = o.MIN(r, o.MAX(n, o.MAX(x.n_scale, e.n_scale))), c = o._bc_rec_mul(x, t, e, a, r), c.n_sign = x.n_sign == e.n_sign ? o.PLUS : o.MINUS, c.n_len = a + t + 1 - r, c.n_scale = f, o._bc_rm_leading_zeros(c), o.bc_is_zero(c) && (c.n_sign = o.PLUS), c;
};
o.new_sub_num = function(x, e, n) {
  var c = new o.bc_num();
  return c.n_sign = o.PLUS, c.n_len = x, c.n_scale = e, c.n_value = n, c;
};
o._bc_simp_mul = function(x, e, n, c, t) {
  var a, r, f, i, s, u, l, d, b;
  for (b = e + c + 1, a = o.bc_new_num(b, 0), s = e - 1, u = c - 1, i = b - 1, d = 0, l = 0; l < b - 1; l++) {
    for (r = s - o.MAX(0, l - c + 1), f = u - o.MIN(l, c - 1); r >= 0 && f <= u; )
      d += x.n_value[r--] * n.n_value[f++];
    a.n_value[i--] = Math.floor(d % o.BASE), d = Math.floor(d / o.BASE);
  }
  return a.n_value[i] = d, a;
};
o._bc_shift_addsub = function(x, e, n, c) {
  var t, a, r, f;
  if (r = e.n_len, e.n_value[0] === 0 && r--, !(x.n_len + x.n_scale >= n + r))
    throw new Error("len + scale < shift + count");
  if (t = x.n_len + x.n_scale - n - 1, a = e.n_len = 1, f = 0, c) {
    for (; r--; )
      x.n_value[t] -= e.n_value[a--] + f, x.n_value[t] < 0 ? (f = 1, x.n_value[t--] += o.BASE) : (f = 0, t--);
    for (; f; )
      x.n_value[t] -= f, x.n_value[t] < 0 ? x.n_value[t--] += o.BASE : f = 0;
  } else {
    for (; r--; )
      x.n_value[t] += e.n_value[a--] + f, x.n_value[t] > o.BASE - 1 ? (f = 1, x.n_value[t--] -= o.BASE) : (f = 0, t--);
    for (; f; )
      x.n_value[t] += f, x.n_value[t] > o.BASE - 1 ? x.n_value[t--] -= o.BASE : f = 0;
  }
  return !0;
};
o._bc_rec_mul = function(x, e, n, c, t) {
  var a, r, f, i, s, u, l, d, b, _, h, p, v, w, g;
  return e + c < o.MUL_BASE_DIGITS || e < o.MUL_SMALL_DIGITS || c < o.MUL_SMALL_DIGITS ? o._bc_simp_mul(x, e, n, c, t) : (h = Math.floor((o.MAX(e, c) + 1) / 2), e < h ? (f = o.bc_init_num(), r = o.new_sub_num(e, 0, x.n_value)) : (f = o.new_sub_num(e - h, 0, x.n_value), r = o.new_sub_num(h, 0, x.n_value + e - h)), c < h ? (s = o.bc_init_num(), i = o.new_sub_num(c, 0, n.n_value)) : (s = o.new_sub_num(c - h, 0, n.n_value), i = o.new_sub_num(h, 0, n.n_value + c - h)), o._bc_rm_leading_zeros(f), o._bc_rm_leading_zeros(r), r.n_len, o._bc_rm_leading_zeros(s), o._bc_rm_leading_zeros(i), i.n_len, v = o.bc_is_zero(f) || o.bc_is_zero(s), b = o.bc_init_num(), _ = o.bc_init_num(), b = o.bc_sub(f, r, 0), w = b.n_len, _ = o.bc_sub(i, s, 0), g = _.n_len, v ? u = o.bc_init_num() : u = o._bc_rec_mul(f, f.n_len, s, s.n_len, 0), o.bc_is_zero(b) || o.bc_is_zero(_) ? l = o.bc_init_num() : l = o._bc_rec_mul(b, w, _, g, 0), o.bc_is_zero(r) || o.bc_is_zero(i) ? d = o.bc_init_num() : d = o._bc_rec_mul(r, r.n_len, i, i.n_len, 0), p = e + c + 1, a = o.bc_new_num(p, 0), v || (o._bc_shift_addsub(a, u, 2 * h, 0), o._bc_shift_addsub(a, u, h, 0)), o._bc_shift_addsub(a, d, h, 0), o._bc_shift_addsub(a, d, 0, 0), o._bc_shift_addsub(a, l, h, b.n_sign != _.n_sign), a);
};
o.bc_sub = function(x, e, n) {
  var c, t, a;
  if (x.n_sign != e.n_sign)
    c = o._bc_do_add(x, e, n), c.n_sign = x.n_sign;
  else
    switch (t = o._bc_do_compare(x, e, !1, !1), t) {
      case -1:
        c = o._bc_do_sub(e, x, n), c.n_sign = e.n_sign == o.PLUS ? o.MINUS : o.PLUS;
        break;
      case 0:
        a = o.MAX(n, o.MAX(x.n_scale, e.n_scale)), c = o.bc_new_num(1, a), o.memset(c.n_value, 0, 0, a + 1);
        break;
      case 1:
        c = o._bc_do_sub(x, e, n), c.n_sign = x.n_sign;
        break;
    }
  return c;
};
function z(x, e, n) {
  var c, t, a;
  return typeof n > "u" && (n = o.scale), n = n < 0 ? 0 : n, c = o.bc_init_num(), t = o.bc_init_num(), a = o.bc_init_num(), c = o.php_str2num(x.toString()), t = o.php_str2num(e.toString()), c.n_scale > t.n_scale && t.setScale(c.n_scale), t.n_scale > c.n_scale && c.setScale(t.n_scale), a = o.bc_add(c, t, n), a.n_scale > n && (a.n_scale = n), a.toString();
}
function m0(x, e, n) {
  var c, t, a;
  if (typeof n > "u" && (n = o.scale), n = n < 0 ? 0 : n, c = o.bc_init_num(), t = o.bc_init_num(), a = o.bc_init_num(), c = o.php_str2num(x.toString()), t = o.php_str2num(e.toString()), c.n_scale > t.n_scale && t.setScale(c.n_scale), t.n_scale > c.n_scale && c.setScale(t.n_scale), a = o.bc_divide(c, t, n), a === -1)
    throw new Error(11, "(BC) Division by zero");
  return a.n_scale > n && (a.n_scale = n), a.toString();
}
function k(x, e, n) {
  var c, t, a;
  return typeof n > "u" && (n = o.scale), n = n < 0 ? 0 : n, c = o.bc_init_num(), t = o.bc_init_num(), a = o.bc_init_num(), c = o.php_str2num(x.toString()), t = o.php_str2num(e.toString()), c.n_scale > t.n_scale && t.setScale(c.n_scale), t.n_scale > c.n_scale && c.setScale(t.n_scale), a = o.bc_multiply(c, t, n), a.n_scale > n && (a.n_scale = n), a.toString();
}
function L1() {
  return {
    ROWHEIGHT: 4,
    QUIETH: 2,
    QUIETV: 2,
    barcode_array: {},
    start_pattern: "11111111010101000",
    stop_pattern: "111111101000101001",
    /**
    * Array of text Compaction Sub-Modes (values 0xFB - 0xFF are used for submode changers).
    */
    textsubmodes: [
      [
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        32,
        253,
        254,
        255
      ],
      // Alpha
      [
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
        111,
        112,
        113,
        114,
        115,
        116,
        117,
        118,
        119,
        120,
        121,
        122,
        32,
        253,
        254,
        255
      ],
      // Lower
      [
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        38,
        13,
        9,
        44,
        58,
        35,
        45,
        46,
        36,
        47,
        43,
        37,
        42,
        61,
        94,
        251,
        32,
        253,
        254,
        255
      ],
      // Mixed
      [
        59,
        60,
        62,
        64,
        91,
        92,
        93,
        95,
        96,
        126,
        33,
        13,
        9,
        44,
        58,
        10,
        45,
        46,
        36,
        47,
        34,
        124,
        42,
        40,
        41,
        63,
        123,
        125,
        39,
        255
      ]
      // Puntuaction
    ],
    /**
    * Array of switching codes for Text Compaction Sub-Modes.
    */
    textlatch: {
      "01": [27],
      "02": [28],
      "03": [28, 25],
      //
      10: [28, 28],
      12: [28],
      13: [28, 25],
      //
      20: [28],
      21: [27],
      23: [25],
      //
      30: [29],
      31: [29, 27],
      32: [29, 28]
      //
    },
    /**
    * Clusters of codewords (0, 3, 6)<br/>
    * Values are hex equivalents of binary representation of bars (1 = bar, 0 = space).<br/>
    * The codewords numbered from 900 to 928 have special meaning, some enable to switch between modes in order to optimise the code:
    * <ul>
    * <li>900 : Switch to "Text" mode</li>
    * <li>901 : Switch to "Byte" mode</li>
    * <li>902 : Switch to "Numeric" mode</li>
    * <li>903 - 912 : Reserved</li>
    * <li>913 : Switch to "Octet" only for the next codeword</li>
    * <li>914 - 920 : Reserved</li>
    * <li>921 : Initialization</li>
    * <li>922 : Terminator codeword for Macro PDF control block</li>
    * <li>923 : Sequence tag to identify the beginning of optional fields in the Macro PDF control block</li>
    * <li>924 : Switch to "Byte" mode (If the total number of byte is multiple of 6)</li>
    * <li>925 : Identifier for a user defined Extended Channel Interpretation (ECI)</li>
    * <li>926 : Identifier for a general purpose ECI format</li>
    * <li>927 : Identifier for an ECI of a character set or code page</li>
    * <li>928 : Macro marker codeword to indicate the beginning of a Macro PDF Control Block</li>
    * </ul>
    */
    clusters: [
      [
        // cluster 0 -----------------------------------------------------------------------
        120256,
        125680,
        128380,
        120032,
        125560,
        128318,
        108736,
        119920,
        108640,
        86080,
        //  10
        108592,
        86048,
        110016,
        120560,
        125820,
        109792,
        120440,
        125758,
        88256,
        109680,
        //  20
        88160,
        89536,
        110320,
        120700,
        89312,
        110200,
        120638,
        89200,
        110140,
        89840,
        //  30
        110460,
        89720,
        110398,
        89980,
        128506,
        119520,
        125304,
        128190,
        107712,
        119408,
        //  40
        125244,
        107616,
        119352,
        84032,
        107568,
        119324,
        84e3,
        107544,
        83984,
        108256,
        //  50
        119672,
        125374,
        85184,
        108144,
        119612,
        85088,
        108088,
        119582,
        85040,
        108060,
        //  60
        85728,
        108408,
        119742,
        85616,
        108348,
        85560,
        108318,
        85880,
        108478,
        85820,
        //  70
        85790,
        107200,
        119152,
        125116,
        107104,
        119096,
        125086,
        83008,
        107056,
        119068,
        //  80
        82976,
        107032,
        82960,
        82952,
        83648,
        107376,
        119228,
        83552,
        107320,
        119198,
        //  90
        83504,
        107292,
        83480,
        83468,
        83824,
        107452,
        83768,
        107422,
        83740,
        83900,
        // 100
        106848,
        118968,
        125022,
        82496,
        106800,
        118940,
        82464,
        106776,
        118926,
        82448,
        // 110
        106764,
        82440,
        106758,
        82784,
        106936,
        119006,
        82736,
        106908,
        82712,
        106894,
        // 120
        82700,
        82694,
        106974,
        82830,
        82240,
        106672,
        118876,
        82208,
        106648,
        118862,
        // 130
        82192,
        106636,
        82184,
        106630,
        82180,
        82352,
        82328,
        82316,
        82080,
        118830,
        // 140
        106572,
        106566,
        82050,
        117472,
        124280,
        127678,
        103616,
        117360,
        124220,
        103520,
        // 150
        117304,
        124190,
        75840,
        103472,
        75808,
        104160,
        117624,
        124350,
        76992,
        104048,
        // 160
        117564,
        76896,
        103992,
        76848,
        76824,
        77536,
        104312,
        117694,
        77424,
        104252,
        // 170
        77368,
        77340,
        77688,
        104382,
        77628,
        77758,
        121536,
        126320,
        128700,
        121440,
        // 180
        126264,
        128670,
        111680,
        121392,
        126236,
        111648,
        121368,
        126222,
        111632,
        121356,
        // 190
        103104,
        117104,
        124092,
        112320,
        103008,
        117048,
        124062,
        112224,
        121656,
        126366,
        // 200
        93248,
        74784,
        102936,
        117006,
        93216,
        112152,
        93200,
        75456,
        103280,
        117180,
        // 210
        93888,
        75360,
        103224,
        117150,
        93792,
        112440,
        121758,
        93744,
        75288,
        93720,
        // 220
        75632,
        103356,
        94064,
        75576,
        103326,
        94008,
        112542,
        93980,
        75708,
        94140,
        // 230
        75678,
        94110,
        121184,
        126136,
        128606,
        111168,
        121136,
        126108,
        111136,
        121112,
        // 240
        126094,
        111120,
        121100,
        111112,
        111108,
        102752,
        116920,
        123998,
        111456,
        102704,
        // 250
        116892,
        91712,
        74272,
        121244,
        116878,
        91680,
        74256,
        102668,
        91664,
        111372,
        // 260
        102662,
        74244,
        74592,
        102840,
        116958,
        92e3,
        74544,
        102812,
        91952,
        111516,
        // 270
        102798,
        91928,
        74508,
        74502,
        74680,
        102878,
        92088,
        74652,
        92060,
        74638,
        // 280
        92046,
        92126,
        110912,
        121008,
        126044,
        110880,
        120984,
        126030,
        110864,
        120972,
        // 290
        110856,
        120966,
        110852,
        110850,
        74048,
        102576,
        116828,
        90944,
        74016,
        102552,
        // 300
        116814,
        90912,
        111e3,
        121038,
        90896,
        73992,
        102534,
        90888,
        110982,
        90884,
        // 310
        74160,
        102620,
        91056,
        74136,
        102606,
        91032,
        111054,
        91020,
        74118,
        91014,
        // 320
        91100,
        91086,
        110752,
        120920,
        125998,
        110736,
        120908,
        110728,
        120902,
        110724,
        // 330
        110722,
        73888,
        102488,
        116782,
        90528,
        73872,
        102476,
        90512,
        110796,
        102470,
        // 340
        90504,
        73860,
        90500,
        73858,
        73944,
        90584,
        90572,
        90566,
        120876,
        120870,
        // 350
        110658,
        102444,
        73800,
        90312,
        90308,
        90306,
        101056,
        116080,
        123580,
        100960,
        // 360
        116024,
        70720,
        100912,
        115996,
        70688,
        100888,
        70672,
        70664,
        71360,
        101232,
        // 370
        116156,
        71264,
        101176,
        116126,
        71216,
        101148,
        71192,
        71180,
        71536,
        101308,
        // 380
        71480,
        101278,
        71452,
        71612,
        71582,
        118112,
        124600,
        127838,
        105024,
        118064,
        // 390
        124572,
        104992,
        118040,
        124558,
        104976,
        118028,
        104968,
        118022,
        100704,
        115896,
        // 400
        123486,
        105312,
        100656,
        115868,
        79424,
        70176,
        118172,
        115854,
        79392,
        105240,
        // 410
        100620,
        79376,
        70152,
        79368,
        70496,
        100792,
        115934,
        79712,
        70448,
        118238,
        // 420
        79664,
        105372,
        100750,
        79640,
        70412,
        79628,
        70584,
        100830,
        79800,
        70556,
        // 430
        79772,
        70542,
        70622,
        79838,
        122176,
        126640,
        128860,
        122144,
        126616,
        128846,
        // 440
        122128,
        126604,
        122120,
        126598,
        122116,
        104768,
        117936,
        124508,
        113472,
        104736,
        // 450
        126684,
        124494,
        113440,
        122264,
        126670,
        113424,
        104712,
        117894,
        113416,
        122246,
        // 460
        104706,
        69952,
        100528,
        115804,
        78656,
        69920,
        100504,
        115790,
        96064,
        78624,
        // 470
        104856,
        117966,
        96032,
        113560,
        122318,
        100486,
        96016,
        78600,
        104838,
        96008,
        // 480
        69890,
        70064,
        100572,
        78768,
        70040,
        100558,
        96176,
        78744,
        104910,
        96152,
        // 490
        113614,
        70022,
        78726,
        70108,
        78812,
        70094,
        96220,
        78798,
        122016,
        126552,
        // 500
        128814,
        122e3,
        126540,
        121992,
        126534,
        121988,
        121986,
        104608,
        117848,
        124462,
        // 510
        113056,
        104592,
        126574,
        113040,
        122060,
        117830,
        113032,
        104580,
        113028,
        104578,
        // 520
        113026,
        69792,
        100440,
        115758,
        78240,
        69776,
        100428,
        95136,
        78224,
        104652,
        // 530
        100422,
        95120,
        113100,
        69764,
        95112,
        78212,
        69762,
        78210,
        69848,
        100462,
        // 540
        78296,
        69836,
        95192,
        78284,
        69830,
        95180,
        78278,
        69870,
        95214,
        121936,
        // 550
        126508,
        121928,
        126502,
        121924,
        121922,
        104528,
        117804,
        112848,
        104520,
        117798,
        // 560
        112840,
        121958,
        112836,
        104514,
        112834,
        69712,
        100396,
        78032,
        69704,
        100390,
        // 570
        94672,
        78024,
        104550,
        94664,
        112870,
        69698,
        94660,
        78018,
        94658,
        78060,
        // 580
        94700,
        94694,
        126486,
        121890,
        117782,
        104484,
        104482,
        69672,
        77928,
        94440,
        // 590
        69666,
        77922,
        99680,
        68160,
        99632,
        68128,
        99608,
        115342,
        68112,
        99596,
        // 600
        68104,
        99590,
        68448,
        99768,
        115422,
        68400,
        99740,
        68376,
        99726,
        68364,
        // 610
        68358,
        68536,
        99806,
        68508,
        68494,
        68574,
        101696,
        116400,
        123740,
        101664,
        // 620
        116376,
        101648,
        116364,
        101640,
        116358,
        101636,
        67904,
        99504,
        115292,
        72512,
        // 630
        67872,
        116444,
        115278,
        72480,
        101784,
        116430,
        72464,
        67848,
        99462,
        72456,
        // 640
        101766,
        67842,
        68016,
        99548,
        72624,
        67992,
        99534,
        72600,
        101838,
        72588,
        // 650
        67974,
        68060,
        72668,
        68046,
        72654,
        118432,
        124760,
        127918,
        118416,
        124748,
        // 660
        118408,
        124742,
        118404,
        118402,
        101536,
        116312,
        105888,
        101520,
        116300,
        105872,
        // 670
        118476,
        116294,
        105864,
        101508,
        105860,
        101506,
        105858,
        67744,
        99416,
        72096,
        // 680
        67728,
        116334,
        80800,
        72080,
        101580,
        99398,
        80784,
        105932,
        67716,
        80776,
        // 690
        72068,
        67714,
        72066,
        67800,
        99438,
        72152,
        67788,
        80856,
        72140,
        67782,
        // 700
        80844,
        72134,
        67822,
        72174,
        80878,
        126800,
        128940,
        126792,
        128934,
        126788,
        // 710
        126786,
        118352,
        124716,
        122576,
        126828,
        124710,
        122568,
        126822,
        122564,
        118338,
        // 720
        122562,
        101456,
        116268,
        105680,
        101448,
        116262,
        114128,
        105672,
        118374,
        114120,
        // 730
        122598,
        101442,
        114116,
        105666,
        114114,
        67664,
        99372,
        71888,
        67656,
        99366,
        // 740
        80336,
        71880,
        101478,
        97232,
        80328,
        105702,
        67650,
        97224,
        114150,
        71874,
        // 750
        97220,
        67692,
        71916,
        67686,
        80364,
        71910,
        97260,
        80358,
        97254,
        126760,
        // 760
        128918,
        126756,
        126754,
        118312,
        124694,
        122472,
        126774,
        122468,
        118306,
        122466,
        // 770
        101416,
        116246,
        105576,
        101412,
        113896,
        105572,
        101410,
        113892,
        105570,
        113890,
        // 780
        67624,
        99350,
        71784,
        101430,
        80104,
        71780,
        67618,
        96744,
        80100,
        71778,
        // 790
        96740,
        80098,
        96738,
        71798,
        96758,
        126738,
        122420,
        122418,
        105524,
        113780,
        // 800
        113778,
        71732,
        79988,
        96500,
        96498,
        66880,
        66848,
        98968,
        66832,
        66824,
        // 810
        66820,
        66992,
        66968,
        66956,
        66950,
        67036,
        67022,
        1e5,
        99984,
        115532,
        // 820
        99976,
        115526,
        99972,
        99970,
        66720,
        98904,
        69024,
        100056,
        98892,
        69008,
        // 830
        100044,
        69e3,
        100038,
        68996,
        66690,
        68994,
        66776,
        98926,
        69080,
        100078,
        // 840
        69068,
        66758,
        69062,
        66798,
        69102,
        116560,
        116552,
        116548,
        116546,
        99920,
        // 850
        102096,
        116588,
        115494,
        102088,
        116582,
        102084,
        99906,
        102082,
        66640,
        68816,
        // 860
        66632,
        98854,
        73168,
        68808,
        66628,
        73160,
        68804,
        66626,
        73156,
        68802,
        // 870
        66668,
        68844,
        66662,
        73196,
        68838,
        73190,
        124840,
        124836,
        124834,
        116520,
        // 880
        118632,
        124854,
        118628,
        116514,
        118626,
        99880,
        115478,
        101992,
        116534,
        106216,
        // 890
        101988,
        99874,
        106212,
        101986,
        106210,
        66600,
        98838,
        68712,
        99894,
        72936,
        // 900
        68708,
        66594,
        81384,
        72932,
        68706,
        81380,
        72930,
        66614,
        68726,
        72950,
        // 910
        81398,
        128980,
        128978,
        124820,
        126900,
        124818,
        126898,
        116500,
        118580,
        116498,
        // 920
        122740,
        118578,
        122738,
        99860,
        101940,
        99858,
        106100,
        101938,
        114420
      ],
      // 929
      [
        // cluster 3 -----------------------------------------------------------------------
        128352,
        129720,
        125504,
        128304,
        129692,
        125472,
        128280,
        129678,
        125456,
        128268,
        //  10
        125448,
        128262,
        125444,
        125792,
        128440,
        129758,
        120384,
        125744,
        128412,
        120352,
        //  20
        125720,
        128398,
        120336,
        125708,
        120328,
        125702,
        120324,
        120672,
        125880,
        128478,
        //  30
        110144,
        120624,
        125852,
        110112,
        120600,
        125838,
        110096,
        120588,
        110088,
        120582,
        //  40
        110084,
        110432,
        120760,
        125918,
        89664,
        110384,
        120732,
        89632,
        110360,
        120718,
        //  50
        89616,
        110348,
        89608,
        110342,
        89952,
        110520,
        120798,
        89904,
        110492,
        89880,
        //  60
        110478,
        89868,
        90040,
        110558,
        90012,
        89998,
        125248,
        128176,
        129628,
        125216,
        //  70
        128152,
        129614,
        125200,
        128140,
        125192,
        128134,
        125188,
        125186,
        119616,
        125360,
        //  80
        128220,
        119584,
        125336,
        128206,
        119568,
        125324,
        119560,
        125318,
        119556,
        119554,
        //  90
        108352,
        119728,
        125404,
        108320,
        119704,
        125390,
        108304,
        119692,
        108296,
        119686,
        // 100
        108292,
        108290,
        85824,
        108464,
        119772,
        85792,
        108440,
        119758,
        85776,
        108428,
        // 110
        85768,
        108422,
        85764,
        85936,
        108508,
        85912,
        108494,
        85900,
        85894,
        85980,
        // 120
        85966,
        125088,
        128088,
        129582,
        125072,
        128076,
        125064,
        128070,
        125060,
        125058,
        // 130
        119200,
        125144,
        128110,
        119184,
        125132,
        119176,
        125126,
        119172,
        119170,
        107424,
        // 140
        119256,
        125166,
        107408,
        119244,
        107400,
        119238,
        107396,
        107394,
        83872,
        107480,
        // 150
        119278,
        83856,
        107468,
        83848,
        107462,
        83844,
        83842,
        83928,
        107502,
        83916,
        // 160
        83910,
        83950,
        125008,
        128044,
        125e3,
        128038,
        124996,
        124994,
        118992,
        125036,
        // 170
        118984,
        125030,
        118980,
        118978,
        106960,
        119020,
        106952,
        119014,
        106948,
        106946,
        // 180
        82896,
        106988,
        82888,
        106982,
        82884,
        82882,
        82924,
        82918,
        124968,
        128022,
        // 190
        124964,
        124962,
        118888,
        124982,
        118884,
        118882,
        106728,
        118902,
        106724,
        106722,
        // 200
        82408,
        106742,
        82404,
        82402,
        124948,
        124946,
        118836,
        118834,
        106612,
        106610,
        // 210
        124224,
        127664,
        129372,
        124192,
        127640,
        129358,
        124176,
        127628,
        124168,
        127622,
        // 220
        124164,
        124162,
        117568,
        124336,
        127708,
        117536,
        124312,
        127694,
        117520,
        124300,
        // 230
        117512,
        124294,
        117508,
        117506,
        104256,
        117680,
        124380,
        104224,
        117656,
        124366,
        // 240
        104208,
        117644,
        104200,
        117638,
        104196,
        104194,
        77632,
        104368,
        117724,
        77600,
        // 250
        104344,
        117710,
        77584,
        104332,
        77576,
        104326,
        77572,
        77744,
        104412,
        77720,
        // 260
        104398,
        77708,
        77702,
        77788,
        77774,
        128672,
        129880,
        93168,
        128656,
        129868,
        // 270
        92664,
        128648,
        129862,
        92412,
        128644,
        128642,
        124064,
        127576,
        129326,
        126368,
        // 280
        124048,
        129902,
        126352,
        128716,
        127558,
        126344,
        124036,
        126340,
        124034,
        126338,
        // 290
        117152,
        124120,
        127598,
        121760,
        117136,
        124108,
        121744,
        126412,
        124102,
        121736,
        // 300
        117124,
        121732,
        117122,
        121730,
        103328,
        117208,
        124142,
        112544,
        103312,
        117196,
        // 310
        112528,
        121804,
        117190,
        112520,
        103300,
        112516,
        103298,
        112514,
        75680,
        103384,
        // 320
        117230,
        94112,
        75664,
        103372,
        94096,
        112588,
        103366,
        94088,
        75652,
        94084,
        // 330
        75650,
        75736,
        103406,
        94168,
        75724,
        94156,
        75718,
        94150,
        75758,
        128592,
        // 340
        129836,
        91640,
        128584,
        129830,
        91388,
        128580,
        91262,
        128578,
        123984,
        127532,
        // 350
        126160,
        123976,
        127526,
        126152,
        128614,
        126148,
        123970,
        126146,
        116944,
        124012,
        // 360
        121296,
        116936,
        124006,
        121288,
        126182,
        121284,
        116930,
        121282,
        102864,
        116972,
        // 370
        111568,
        102856,
        116966,
        111560,
        121318,
        111556,
        102850,
        111554,
        74704,
        102892,
        // 380
        92112,
        74696,
        102886,
        92104,
        111590,
        92100,
        74690,
        92098,
        74732,
        92140,
        // 390
        74726,
        92134,
        128552,
        129814,
        90876,
        128548,
        90750,
        128546,
        123944,
        127510,
        // 400
        126056,
        128566,
        126052,
        123938,
        126050,
        116840,
        123958,
        121064,
        116836,
        121060,
        // 410
        116834,
        121058,
        102632,
        116854,
        111080,
        121078,
        111076,
        102626,
        111074,
        74216,
        // 420
        102646,
        91112,
        74212,
        91108,
        74210,
        91106,
        74230,
        91126,
        128532,
        90494,
        // 430
        128530,
        123924,
        126004,
        123922,
        126002,
        116788,
        120948,
        116786,
        120946,
        102516,
        // 440
        110836,
        102514,
        110834,
        73972,
        90612,
        73970,
        90610,
        128522,
        123914,
        125978,
        // 450
        116762,
        120890,
        102458,
        110714,
        123552,
        127320,
        129198,
        123536,
        127308,
        123528,
        // 460
        127302,
        123524,
        123522,
        116128,
        123608,
        127342,
        116112,
        123596,
        116104,
        123590,
        // 470
        116100,
        116098,
        101280,
        116184,
        123630,
        101264,
        116172,
        101256,
        116166,
        101252,
        // 480
        101250,
        71584,
        101336,
        116206,
        71568,
        101324,
        71560,
        101318,
        71556,
        71554,
        // 490
        71640,
        101358,
        71628,
        71622,
        71662,
        127824,
        129452,
        79352,
        127816,
        129446,
        // 500
        79100,
        127812,
        78974,
        127810,
        123472,
        127276,
        124624,
        123464,
        127270,
        124616,
        // 510
        127846,
        124612,
        123458,
        124610,
        115920,
        123500,
        118224,
        115912,
        123494,
        118216,
        // 520
        124646,
        118212,
        115906,
        118210,
        100816,
        115948,
        105424,
        100808,
        115942,
        105416,
        // 530
        118246,
        105412,
        100802,
        105410,
        70608,
        100844,
        79824,
        70600,
        100838,
        79816,
        // 540
        105446,
        79812,
        70594,
        79810,
        70636,
        79852,
        70630,
        79846,
        129960,
        95728,
        // 550
        113404,
        129956,
        95480,
        113278,
        129954,
        95356,
        95294,
        127784,
        129430,
        78588,
        // 560
        128872,
        129974,
        95996,
        78462,
        128868,
        127778,
        95870,
        128866,
        123432,
        127254,
        // 570
        124520,
        123428,
        126696,
        128886,
        123426,
        126692,
        124514,
        126690,
        115816,
        123446,
        // 580
        117992,
        115812,
        122344,
        117988,
        115810,
        122340,
        117986,
        122338,
        100584,
        115830,
        // 590
        104936,
        100580,
        113640,
        104932,
        100578,
        113636,
        104930,
        113634,
        70120,
        100598,
        // 600
        78824,
        70116,
        96232,
        78820,
        70114,
        96228,
        78818,
        96226,
        70134,
        78838,
        // 610
        129940,
        94968,
        113022,
        129938,
        94844,
        94782,
        127764,
        78206,
        128820,
        127762,
        // 620
        95102,
        128818,
        123412,
        124468,
        123410,
        126580,
        124466,
        126578,
        115764,
        117876,
        // 630
        115762,
        122100,
        117874,
        122098,
        100468,
        104692,
        100466,
        113140,
        104690,
        113138,
        // 640
        69876,
        78324,
        69874,
        95220,
        78322,
        95218,
        129930,
        94588,
        94526,
        127754,
        // 650
        128794,
        123402,
        124442,
        126522,
        115738,
        117818,
        121978,
        100410,
        104570,
        112890,
        // 660
        69754,
        78074,
        94714,
        94398,
        123216,
        127148,
        123208,
        127142,
        123204,
        123202,
        // 670
        115408,
        123244,
        115400,
        123238,
        115396,
        115394,
        99792,
        115436,
        99784,
        115430,
        // 680
        99780,
        99778,
        68560,
        99820,
        68552,
        99814,
        68548,
        68546,
        68588,
        68582,
        // 690
        127400,
        129238,
        72444,
        127396,
        72318,
        127394,
        123176,
        127126,
        123752,
        123172,
        // 700
        123748,
        123170,
        123746,
        115304,
        123190,
        116456,
        115300,
        116452,
        115298,
        116450,
        // 710
        99560,
        115318,
        101864,
        99556,
        101860,
        99554,
        101858,
        68072,
        99574,
        72680,
        // 720
        68068,
        72676,
        68066,
        72674,
        68086,
        72694,
        129492,
        80632,
        105854,
        129490,
        // 730
        80508,
        80446,
        127380,
        72062,
        127924,
        127378,
        80766,
        127922,
        123156,
        123700,
        // 740
        123154,
        124788,
        123698,
        124786,
        115252,
        116340,
        115250,
        118516,
        116338,
        118514,
        // 750
        99444,
        101620,
        99442,
        105972,
        101618,
        105970,
        67828,
        72180,
        67826,
        80884,
        // 760
        72178,
        80882,
        97008,
        114044,
        96888,
        113982,
        96828,
        96798,
        129482,
        80252,
        // 770
        130010,
        97148,
        80190,
        97086,
        127370,
        127898,
        128954,
        123146,
        123674,
        124730,
        // 780
        126842,
        115226,
        116282,
        118394,
        122618,
        99386,
        101498,
        105722,
        114170,
        67706,
        // 790
        71930,
        80378,
        96632,
        113854,
        96572,
        96542,
        80062,
        96702,
        96444,
        96414,
        // 800
        96350,
        123048,
        123044,
        123042,
        115048,
        123062,
        115044,
        115042,
        99048,
        115062,
        // 810
        99044,
        99042,
        67048,
        99062,
        67044,
        67042,
        67062,
        127188,
        68990,
        127186,
        // 820
        123028,
        123316,
        123026,
        123314,
        114996,
        115572,
        114994,
        115570,
        98932,
        100084,
        // 830
        98930,
        100082,
        66804,
        69108,
        66802,
        69106,
        129258,
        73084,
        73022,
        127178,
        // 840
        127450,
        123018,
        123290,
        123834,
        114970,
        115514,
        116602,
        98874,
        99962,
        102138,
        // 850
        66682,
        68858,
        73210,
        81272,
        106174,
        81212,
        81182,
        72894,
        81342,
        97648,
        // 860
        114364,
        97592,
        114334,
        97564,
        97550,
        81084,
        97724,
        81054,
        97694,
        97464,
        // 870
        114270,
        97436,
        97422,
        80990,
        97502,
        97372,
        97358,
        97326,
        114868,
        114866,
        // 880
        98676,
        98674,
        66292,
        66290,
        123098,
        114842,
        115130,
        98618,
        99194,
        66170,
        // 890
        67322,
        69310,
        73404,
        73374,
        81592,
        106334,
        81564,
        81550,
        73310,
        81630,
        // 900
        97968,
        114524,
        97944,
        114510,
        97932,
        97926,
        81500,
        98012,
        81486,
        97998,
        // 910
        97880,
        114478,
        97868,
        97862,
        81454,
        97902,
        97836,
        97830,
        69470,
        73564,
        // 920
        73550,
        81752,
        106414,
        81740,
        81734,
        73518,
        81774,
        81708,
        81702
      ],
      // 929
      [
        // cluster 6 -----------------------------------------------------------------------
        109536,
        120312,
        86976,
        109040,
        120060,
        86496,
        108792,
        119934,
        86256,
        108668,
        //  10
        86136,
        129744,
        89056,
        110072,
        129736,
        88560,
        109820,
        129732,
        88312,
        109694,
        //  20
        129730,
        88188,
        128464,
        129772,
        89592,
        128456,
        129766,
        89340,
        128452,
        89214,
        //  30
        128450,
        125904,
        128492,
        125896,
        128486,
        125892,
        125890,
        120784,
        125932,
        120776,
        //  40
        125926,
        120772,
        120770,
        110544,
        120812,
        110536,
        120806,
        110532,
        84928,
        108016,
        //  50
        119548,
        84448,
        107768,
        119422,
        84208,
        107644,
        84088,
        107582,
        84028,
        129640,
        //  60
        85488,
        108284,
        129636,
        85240,
        108158,
        129634,
        85116,
        85054,
        128232,
        129654,
        //  70
        85756,
        128228,
        85630,
        128226,
        125416,
        128246,
        125412,
        125410,
        119784,
        125430,
        //  80
        119780,
        119778,
        108520,
        119798,
        108516,
        108514,
        83424,
        107256,
        119166,
        83184,
        //  90
        107132,
        83064,
        107070,
        83004,
        82974,
        129588,
        83704,
        107390,
        129586,
        83580,
        // 100
        83518,
        128116,
        83838,
        128114,
        125172,
        125170,
        119284,
        119282,
        107508,
        107506,
        // 110
        82672,
        106876,
        82552,
        106814,
        82492,
        82462,
        129562,
        82812,
        82750,
        128058,
        // 120
        125050,
        119034,
        82296,
        106686,
        82236,
        82206,
        82366,
        82108,
        82078,
        76736,
        // 130
        103920,
        117500,
        76256,
        103672,
        117374,
        76016,
        103548,
        75896,
        103486,
        75836,
        // 140
        129384,
        77296,
        104188,
        129380,
        77048,
        104062,
        129378,
        76924,
        76862,
        127720,
        // 150
        129398,
        77564,
        127716,
        77438,
        127714,
        124392,
        127734,
        124388,
        124386,
        117736,
        // 160
        124406,
        117732,
        117730,
        104424,
        117750,
        104420,
        104418,
        112096,
        121592,
        126334,
        // 170
        92608,
        111856,
        121468,
        92384,
        111736,
        121406,
        92272,
        111676,
        92216,
        111646,
        // 180
        92188,
        75232,
        103160,
        117118,
        93664,
        74992,
        103036,
        93424,
        112252,
        102974,
        // 190
        93304,
        74812,
        93244,
        74782,
        93214,
        129332,
        75512,
        103294,
        129908,
        129330,
        // 200
        93944,
        75388,
        129906,
        93820,
        75326,
        93758,
        127604,
        75646,
        128756,
        127602,
        // 210
        94078,
        128754,
        124148,
        126452,
        124146,
        126450,
        117236,
        121844,
        117234,
        121842,
        // 220
        103412,
        103410,
        91584,
        111344,
        121212,
        91360,
        111224,
        121150,
        91248,
        111164,
        // 230
        91192,
        111134,
        91164,
        91150,
        74480,
        102780,
        91888,
        74360,
        102718,
        91768,
        // 240
        111422,
        91708,
        74270,
        91678,
        129306,
        74620,
        129850,
        92028,
        74558,
        91966,
        // 250
        127546,
        128634,
        124026,
        126202,
        116986,
        121338,
        102906,
        90848,
        110968,
        121022,
        // 260
        90736,
        110908,
        90680,
        110878,
        90652,
        90638,
        74104,
        102590,
        91e3,
        74044,
        // 270
        90940,
        74014,
        90910,
        74174,
        91070,
        90480,
        110780,
        90424,
        110750,
        90396,
        // 280
        90382,
        73916,
        90556,
        73886,
        90526,
        90296,
        110686,
        90268,
        90254,
        73822,
        // 290
        90334,
        90204,
        90190,
        71136,
        101112,
        116094,
        70896,
        100988,
        70776,
        100926,
        // 300
        70716,
        70686,
        129204,
        71416,
        101246,
        129202,
        71292,
        71230,
        127348,
        71550,
        // 310
        127346,
        123636,
        123634,
        116212,
        116210,
        101364,
        101362,
        79296,
        105200,
        118140,
        // 320
        79072,
        105080,
        118078,
        78960,
        105020,
        78904,
        104990,
        78876,
        78862,
        70384,
        // 330
        100732,
        79600,
        70264,
        100670,
        79480,
        105278,
        79420,
        70174,
        79390,
        129178,
        // 340
        70524,
        129466,
        79740,
        70462,
        79678,
        127290,
        127866,
        123514,
        124666,
        115962,
        // 350
        118266,
        100858,
        113376,
        122232,
        126654,
        95424,
        113264,
        122172,
        95328,
        113208,
        // 360
        122142,
        95280,
        113180,
        95256,
        113166,
        95244,
        78560,
        104824,
        117950,
        95968,
        // 370
        78448,
        104764,
        95856,
        113468,
        104734,
        95800,
        78364,
        95772,
        78350,
        95758,
        // 380
        70008,
        100542,
        78712,
        69948,
        96120,
        78652,
        69918,
        96060,
        78622,
        96030,
        // 390
        70078,
        78782,
        96190,
        94912,
        113008,
        122044,
        94816,
        112952,
        122014,
        94768,
        // 400
        112924,
        94744,
        112910,
        94732,
        94726,
        78192,
        104636,
        95088,
        78136,
        104606,
        // 410
        95032,
        113054,
        95004,
        78094,
        94990,
        69820,
        78268,
        69790,
        95164,
        78238,
        // 420
        95134,
        94560,
        112824,
        121950,
        94512,
        112796,
        94488,
        112782,
        94476,
        94470,
        // 430
        78008,
        104542,
        94648,
        77980,
        94620,
        77966,
        94606,
        69726,
        78046,
        94686,
        // 440
        94384,
        112732,
        94360,
        112718,
        94348,
        94342,
        77916,
        94428,
        77902,
        94414,
        // 450
        94296,
        112686,
        94284,
        94278,
        77870,
        94318,
        94252,
        94246,
        68336,
        99708,
        // 460
        68216,
        99646,
        68156,
        68126,
        68476,
        68414,
        127162,
        123258,
        115450,
        99834,
        // 470
        72416,
        101752,
        116414,
        72304,
        101692,
        72248,
        101662,
        72220,
        72206,
        67960,
        // 480
        99518,
        72568,
        67900,
        72508,
        67870,
        72478,
        68030,
        72638,
        80576,
        105840,
        // 490
        118460,
        80480,
        105784,
        118430,
        80432,
        105756,
        80408,
        105742,
        80396,
        80390,
        // 500
        72048,
        101564,
        80752,
        71992,
        101534,
        80696,
        71964,
        80668,
        71950,
        80654,
        // 510
        67772,
        72124,
        67742,
        80828,
        72094,
        80798,
        114016,
        122552,
        126814,
        96832,
        // 520
        113968,
        122524,
        96800,
        113944,
        122510,
        96784,
        113932,
        96776,
        113926,
        96772,
        // 530
        80224,
        105656,
        118366,
        97120,
        80176,
        105628,
        97072,
        114076,
        105614,
        97048,
        // 540
        80140,
        97036,
        80134,
        97030,
        71864,
        101470,
        80312,
        71836,
        97208,
        80284,
        // 550
        71822,
        97180,
        80270,
        97166,
        67678,
        71902,
        80350,
        97246,
        96576,
        113840,
        // 560
        122460,
        96544,
        113816,
        122446,
        96528,
        113804,
        96520,
        113798,
        96516,
        96514,
        // 570
        80048,
        105564,
        96688,
        80024,
        105550,
        96664,
        113870,
        96652,
        80006,
        96646,
        // 580
        71772,
        80092,
        71758,
        96732,
        80078,
        96718,
        96416,
        113752,
        122414,
        96400,
        // 590
        113740,
        96392,
        113734,
        96388,
        96386,
        79960,
        105518,
        96472,
        79948,
        96460,
        // 600
        79942,
        96454,
        71726,
        79982,
        96494,
        96336,
        113708,
        96328,
        113702,
        96324,
        // 610
        96322,
        79916,
        96364,
        79910,
        96358,
        96296,
        113686,
        96292,
        96290,
        79894,
        // 620
        96310,
        66936,
        99006,
        66876,
        66846,
        67006,
        68976,
        100028,
        68920,
        99998,
        // 630
        68892,
        68878,
        66748,
        69052,
        66718,
        69022,
        73056,
        102072,
        116574,
        73008,
        // 640
        102044,
        72984,
        102030,
        72972,
        72966,
        68792,
        99934,
        73144,
        68764,
        73116,
        // 650
        68750,
        73102,
        66654,
        68830,
        73182,
        81216,
        106160,
        118620,
        81184,
        106136,
        // 660
        118606,
        81168,
        106124,
        81160,
        106118,
        81156,
        81154,
        72880,
        101980,
        81328,
        // 670
        72856,
        101966,
        81304,
        106190,
        81292,
        72838,
        81286,
        68700,
        72924,
        68686,
        // 680
        81372,
        72910,
        81358,
        114336,
        122712,
        126894,
        114320,
        122700,
        114312,
        122694,
        // 690
        114308,
        114306,
        81056,
        106072,
        118574,
        97696,
        81040,
        106060,
        97680,
        114380,
        // 700
        106054,
        97672,
        81028,
        97668,
        81026,
        97666,
        72792,
        101934,
        81112,
        72780,
        // 710
        97752,
        81100,
        72774,
        97740,
        81094,
        97734,
        68654,
        72814,
        81134,
        97774,
        // 720
        114256,
        122668,
        114248,
        122662,
        114244,
        114242,
        80976,
        106028,
        97488,
        80968,
        // 730
        106022,
        97480,
        114278,
        97476,
        80962,
        97474,
        72748,
        81004,
        72742,
        97516,
        // 740
        80998,
        97510,
        114216,
        122646,
        114212,
        114210,
        80936,
        106006,
        97384,
        80932,
        // 750
        97380,
        80930,
        97378,
        72726,
        80950,
        97398,
        114196,
        114194,
        80916,
        97332,
        // 760
        80914,
        97330,
        66236,
        66206,
        67256,
        99166,
        67228,
        67214,
        66142,
        67294,
        // 770
        69296,
        100188,
        69272,
        100174,
        69260,
        69254,
        67164,
        69340,
        67150,
        69326,
        // 780
        73376,
        102232,
        116654,
        73360,
        102220,
        73352,
        102214,
        73348,
        73346,
        69208,
        // 790
        100142,
        73432,
        102254,
        73420,
        69190,
        73414,
        67118,
        69230,
        73454,
        106320,
        // 800
        118700,
        106312,
        118694,
        106308,
        106306,
        73296,
        102188,
        81616,
        106348,
        102182,
        // 810
        81608,
        73284,
        81604,
        73282,
        81602,
        69164,
        73324,
        69158,
        81644,
        73318,
        // 820
        81638,
        122792,
        126934,
        122788,
        122786,
        106280,
        118678,
        114536,
        106276,
        114532,
        // 830
        106274,
        114530,
        73256,
        102166,
        81512,
        73252,
        98024,
        81508,
        73250,
        98020,
        // 840
        81506,
        98018,
        69142,
        73270,
        81526,
        98038,
        122772,
        122770,
        106260,
        114484,
        // 850
        106258,
        114482,
        73236,
        81460,
        73234,
        97908,
        81458,
        97906,
        122762,
        106250,
        // 860
        114458,
        73226,
        81434,
        97850,
        66396,
        66382,
        67416,
        99246,
        67404,
        67398,
        // 870
        66350,
        67438,
        69456,
        100268,
        69448,
        100262,
        69444,
        69442,
        67372,
        69484,
        // 880
        67366,
        69478,
        102312,
        116694,
        102308,
        102306,
        69416,
        100246,
        73576,
        102326,
        // 890
        73572,
        69410,
        73570,
        67350,
        69430,
        73590,
        118740,
        118738,
        102292,
        106420,
        // 900
        102290,
        106418,
        69396,
        73524,
        69394,
        81780,
        73522,
        81778,
        118730,
        102282,
        // 910
        106394,
        69386,
        73498,
        81722,
        66476,
        66470,
        67496,
        99286,
        67492,
        67490,
        // 920
        66454,
        67510,
        100308,
        100306,
        67476,
        69556,
        67474,
        69554,
        116714
      ]
      // 929
    ],
    /**
    * Array of factors of the Reed-Solomon polynomial equations used for error correction; one sub array for each correction level (0-8).
    * @protected
    */
    rsfactors: [
      [
        // ECL 0 (2 factors) -------------------------------------------------------------------------------
        27,
        917
      ],
      //   2
      [
        // ECL 1 (4 factors) -------------------------------------------------------------------------------
        522,
        568,
        723,
        809
      ],
      //   4
      [
        // ECL 2 (8 factors) -------------------------------------------------------------------------------
        237,
        308,
        436,
        284,
        646,
        653,
        428,
        379
      ],
      //   8
      [
        // ECL 3 (16 factors) ------------------------------------------------------------------------------
        274,
        562,
        232,
        755,
        599,
        524,
        801,
        132,
        295,
        116,
        442,
        428,
        295,
        42,
        176,
        65
      ],
      //  16
      [
        // ECL 4 (32 factors) ------------------------------------------------------------------------------
        361,
        575,
        922,
        525,
        176,
        586,
        640,
        321,
        536,
        742,
        677,
        742,
        687,
        284,
        193,
        517,
        //  16
        273,
        494,
        263,
        147,
        593,
        800,
        571,
        320,
        803,
        133,
        231,
        390,
        685,
        330,
        63,
        410
      ],
      //  32
      [
        // ECL 5 (64 factors) ------------------------------------------------------------------------------
        539,
        422,
        6,
        93,
        862,
        771,
        453,
        106,
        610,
        287,
        107,
        505,
        733,
        877,
        381,
        612,
        //  16
        723,
        476,
        462,
        172,
        430,
        609,
        858,
        822,
        543,
        376,
        511,
        400,
        672,
        762,
        283,
        184,
        //  32
        440,
        35,
        519,
        31,
        460,
        594,
        225,
        535,
        517,
        352,
        605,
        158,
        651,
        201,
        488,
        502,
        //  48
        648,
        733,
        717,
        83,
        404,
        97,
        280,
        771,
        840,
        629,
        4,
        381,
        843,
        623,
        264,
        543
      ],
      //  64
      [
        // ECL 6 (128 factors) -----------------------------------------------------------------------------
        521,
        310,
        864,
        547,
        858,
        580,
        296,
        379,
        53,
        779,
        897,
        444,
        400,
        925,
        749,
        415,
        //  16
        822,
        93,
        217,
        208,
        928,
        244,
        583,
        620,
        246,
        148,
        447,
        631,
        292,
        908,
        490,
        704,
        //  32
        516,
        258,
        457,
        907,
        594,
        723,
        674,
        292,
        272,
        96,
        684,
        432,
        686,
        606,
        860,
        569,
        //  48
        193,
        219,
        129,
        186,
        236,
        287,
        192,
        775,
        278,
        173,
        40,
        379,
        712,
        463,
        646,
        776,
        //  64
        171,
        491,
        297,
        763,
        156,
        732,
        95,
        270,
        447,
        90,
        507,
        48,
        228,
        821,
        808,
        898,
        //  80
        784,
        663,
        627,
        378,
        382,
        262,
        380,
        602,
        754,
        336,
        89,
        614,
        87,
        432,
        670,
        616,
        //  96
        157,
        374,
        242,
        726,
        600,
        269,
        375,
        898,
        845,
        454,
        354,
        130,
        814,
        587,
        804,
        34,
        // 112
        211,
        330,
        539,
        297,
        827,
        865,
        37,
        517,
        834,
        315,
        550,
        86,
        801,
        4,
        108,
        539
      ],
      // 128
      [
        // ECL 7 (256 factors) -----------------------------------------------------------------------------
        524,
        894,
        75,
        766,
        882,
        857,
        74,
        204,
        82,
        586,
        708,
        250,
        905,
        786,
        138,
        720,
        //  16
        858,
        194,
        311,
        913,
        275,
        190,
        375,
        850,
        438,
        733,
        194,
        280,
        201,
        280,
        828,
        757,
        //  32
        710,
        814,
        919,
        89,
        68,
        569,
        11,
        204,
        796,
        605,
        540,
        913,
        801,
        700,
        799,
        137,
        //  48
        439,
        418,
        592,
        668,
        353,
        859,
        370,
        694,
        325,
        240,
        216,
        257,
        284,
        549,
        209,
        884,
        //  64
        315,
        70,
        329,
        793,
        490,
        274,
        877,
        162,
        749,
        812,
        684,
        461,
        334,
        376,
        849,
        521,
        //  80
        307,
        291,
        803,
        712,
        19,
        358,
        399,
        908,
        103,
        511,
        51,
        8,
        517,
        225,
        289,
        470,
        //  96
        637,
        731,
        66,
        255,
        917,
        269,
        463,
        830,
        730,
        433,
        848,
        585,
        136,
        538,
        906,
        90,
        // 112
        2,
        290,
        743,
        199,
        655,
        903,
        329,
        49,
        802,
        580,
        355,
        588,
        188,
        462,
        10,
        134,
        // 128
        628,
        320,
        479,
        130,
        739,
        71,
        263,
        318,
        374,
        601,
        192,
        605,
        142,
        673,
        687,
        234,
        // 144
        722,
        384,
        177,
        752,
        607,
        640,
        455,
        193,
        689,
        707,
        805,
        641,
        48,
        60,
        732,
        621,
        // 160
        895,
        544,
        261,
        852,
        655,
        309,
        697,
        755,
        756,
        60,
        231,
        773,
        434,
        421,
        726,
        528,
        // 176
        503,
        118,
        49,
        795,
        32,
        144,
        500,
        238,
        836,
        394,
        280,
        566,
        319,
        9,
        647,
        550,
        // 192
        73,
        914,
        342,
        126,
        32,
        681,
        331,
        792,
        620,
        60,
        609,
        441,
        180,
        791,
        893,
        754,
        // 208
        605,
        383,
        228,
        749,
        760,
        213,
        54,
        297,
        134,
        54,
        834,
        299,
        922,
        191,
        910,
        532,
        // 224
        609,
        829,
        189,
        20,
        167,
        29,
        872,
        449,
        83,
        402,
        41,
        656,
        505,
        579,
        481,
        173,
        // 240
        404,
        251,
        688,
        95,
        497,
        555,
        642,
        543,
        307,
        159,
        924,
        558,
        648,
        55,
        497,
        10
      ],
      // 256
      [
        // ECL 8 (512 factors) -----------------------------------------------------------------------------
        352,
        77,
        373,
        504,
        35,
        599,
        428,
        207,
        409,
        574,
        118,
        498,
        285,
        380,
        350,
        492,
        //  16
        197,
        265,
        920,
        155,
        914,
        299,
        229,
        643,
        294,
        871,
        306,
        88,
        87,
        193,
        352,
        781,
        //  32
        846,
        75,
        327,
        520,
        435,
        543,
        203,
        666,
        249,
        346,
        781,
        621,
        640,
        268,
        794,
        534,
        //  48
        539,
        781,
        408,
        390,
        644,
        102,
        476,
        499,
        290,
        632,
        545,
        37,
        858,
        916,
        552,
        41,
        //  64
        542,
        289,
        122,
        272,
        383,
        800,
        485,
        98,
        752,
        472,
        761,
        107,
        784,
        860,
        658,
        741,
        //  80
        290,
        204,
        681,
        407,
        855,
        85,
        99,
        62,
        482,
        180,
        20,
        297,
        451,
        593,
        913,
        142,
        //  96
        808,
        684,
        287,
        536,
        561,
        76,
        653,
        899,
        729,
        567,
        744,
        390,
        513,
        192,
        516,
        258,
        // 112
        240,
        518,
        794,
        395,
        768,
        848,
        51,
        610,
        384,
        168,
        190,
        826,
        328,
        596,
        786,
        303,
        // 128
        570,
        381,
        415,
        641,
        156,
        237,
        151,
        429,
        531,
        207,
        676,
        710,
        89,
        168,
        304,
        402,
        // 144
        40,
        708,
        575,
        162,
        864,
        229,
        65,
        861,
        841,
        512,
        164,
        477,
        221,
        92,
        358,
        785,
        // 160
        288,
        357,
        850,
        836,
        827,
        736,
        707,
        94,
        8,
        494,
        114,
        521,
        2,
        499,
        851,
        543,
        // 176
        152,
        729,
        771,
        95,
        248,
        361,
        578,
        323,
        856,
        797,
        289,
        51,
        684,
        466,
        533,
        820,
        // 192
        669,
        45,
        902,
        452,
        167,
        342,
        244,
        173,
        35,
        463,
        651,
        51,
        699,
        591,
        452,
        578,
        // 208
        37,
        124,
        298,
        332,
        552,
        43,
        427,
        119,
        662,
        777,
        475,
        850,
        764,
        364,
        578,
        911,
        // 224
        283,
        711,
        472,
        420,
        245,
        288,
        594,
        394,
        511,
        327,
        589,
        777,
        699,
        688,
        43,
        408,
        // 240
        842,
        383,
        721,
        521,
        560,
        644,
        714,
        559,
        62,
        145,
        873,
        663,
        713,
        159,
        672,
        729,
        // 256
        624,
        59,
        193,
        417,
        158,
        209,
        563,
        564,
        343,
        693,
        109,
        608,
        563,
        365,
        181,
        772,
        // 272
        677,
        310,
        248,
        353,
        708,
        410,
        579,
        870,
        617,
        841,
        632,
        860,
        289,
        536,
        35,
        777,
        // 288
        618,
        586,
        424,
        833,
        77,
        597,
        346,
        269,
        757,
        632,
        695,
        751,
        331,
        247,
        184,
        45,
        // 304
        787,
        680,
        18,
        66,
        407,
        369,
        54,
        492,
        228,
        613,
        830,
        922,
        437,
        519,
        644,
        905,
        // 320
        789,
        420,
        305,
        441,
        207,
        300,
        892,
        827,
        141,
        537,
        381,
        662,
        513,
        56,
        252,
        341,
        // 336
        242,
        797,
        838,
        837,
        720,
        224,
        307,
        631,
        61,
        87,
        560,
        310,
        756,
        665,
        397,
        808,
        // 352
        851,
        309,
        473,
        795,
        378,
        31,
        647,
        915,
        459,
        806,
        590,
        731,
        425,
        216,
        548,
        249,
        // 368
        321,
        881,
        699,
        535,
        673,
        782,
        210,
        815,
        905,
        303,
        843,
        922,
        281,
        73,
        469,
        791,
        // 384
        660,
        162,
        498,
        308,
        155,
        422,
        907,
        817,
        187,
        62,
        16,
        425,
        535,
        336,
        286,
        437,
        // 400
        375,
        273,
        610,
        296,
        183,
        923,
        116,
        667,
        751,
        353,
        62,
        366,
        691,
        379,
        687,
        842,
        // 416
        37,
        357,
        720,
        742,
        330,
        5,
        39,
        923,
        311,
        424,
        242,
        749,
        321,
        54,
        669,
        316,
        // 432
        342,
        299,
        534,
        105,
        667,
        488,
        640,
        672,
        576,
        540,
        316,
        486,
        721,
        610,
        46,
        656,
        // 448
        447,
        171,
        616,
        464,
        190,
        531,
        297,
        321,
        762,
        752,
        533,
        175,
        134,
        14,
        381,
        433,
        // 464
        717,
        45,
        111,
        20,
        596,
        284,
        736,
        138,
        646,
        411,
        877,
        669,
        141,
        919,
        45,
        780,
        // 480
        407,
        164,
        332,
        899,
        165,
        726,
        600,
        325,
        498,
        655,
        357,
        752,
        768,
        223,
        849,
        647,
        // 496
        63,
        310,
        863,
        251,
        366,
        304,
        282,
        738,
        675,
        410,
        389,
        244,
        31,
        121,
        303,
        263
      ]
      // 512
    ],
    /**
    * This is the class constructor.
    * Creates a PDF417 object
    * @param code (string) code to represent using PDF417
    * @param ecl (int) error correction level (0-8); default -1 = automatic correction level
    * @param aspectratio (float) the width to height of the symbol (excluding quiet zones)
    */
    init: function(x, e, n) {
      if (x = unescape(encodeURIComponent(x)), e = e || -1, n = n || 2, this.barcode_array = {}, x === "")
        return !1;
      let c = this.getInputSequences(x), t = [];
      for (var a = 0; a < c.length; a++) {
        var r = this.getCompaction(c[a][0], c[a][1], !0);
        t = t.concat(r);
      }
      t[0] == 900 && t.shift();
      var f = t.length;
      if (f > 925)
        return !1;
      e = this.getErrorCorrectionLevel(e, f);
      var i = 2 << e, s = f + i + 1, u = Math.round(
        (Math.sqrt(4761 + 68 * n * this.ROWHEIGHT * s) - 69) / 34
      );
      u < 1 ? u = 1 : u > 30 && (u = 30);
      var l = Math.ceil(s / u), d = u * l;
      (l < 3 || l > 90) && (l < 3 ? l = 3 : l > 90 && (l = 90), u = Math.ceil(d / l), d = u * l), d > 928 && (Math.abs(n - 17 * 29 / 32) < Math.abs(n - 17 * 16 / 58) ? (u = 29, l = 32) : (u = 16, l = 58), d = 928);
      var b = d - s;
      b > 0 && (d - l == s ? (--l, d -= l) : t = t.concat(this._array_fill(0, b, 900)));
      var _ = d - i;
      t.unshift(_);
      var h = this.getErrorCorrection(t, e);
      t = t.concat(h);
      var p = this._str_repeat("0", this.QUIETH) + this.start_pattern, v = this.stop_pattern + "" + this._str_repeat("0", this.QUIETH);
      this.barcode_array.num_rows = l * this.ROWHEIGHT + 2 * this.QUIETV, this.barcode_array.num_cols = (u + 2) * 17 + 35 + 2 * this.QUIETH, this.barcode_array.bcode = [];
      var w;
      if (this.QUIETV > 0) {
        w = this._array_fill(0, this.barcode_array.num_cols, 0);
        for (var a = 0; a < this.QUIETV; ++a)
          this.barcode_array.bcode.push(w);
      }
      for (var g, m = 0, E = 0, y = 0; y < l; ++y) {
        var S = p;
        switch (E) {
          case 0: {
            g = 30 * this._intval(y / 3) + this._intval((l - 1) / 3);
            break;
          }
          case 1: {
            g = 30 * this._intval(y / 3) + e * 3 + (l - 1) % 3;
            break;
          }
          case 2: {
            g = 30 * this._intval(y / 3) + (u - 1);
            break;
          }
        }
        S += this._sprintf("%17b", this.clusters[E][g]);
        for (var C = 0; C < u; ++C)
          S += this._sprintf("%17b", this.clusters[E][t[m]]), ++m;
        switch (E) {
          case 0: {
            g = 30 * this._intval(y / 3) + (u - 1);
            break;
          }
          case 1: {
            g = 30 * this._intval(y / 3) + this._intval((l - 1) / 3);
            break;
          }
          case 2: {
            g = 30 * this._intval(y / 3) + e * 3 + (l - 1) % 3;
            break;
          }
        }
        S += this._sprintf("%17b", this.clusters[E][g]), S += v;
        for (var B = this._preg_split("//", S, -1, "PREG_SPLIT_NO_EMPTY"), A = 0; A < this.ROWHEIGHT; ++A)
          this.barcode_array.bcode.push(B);
        ++E, E > 2 && (E = 0);
      }
      if (this.QUIETV > 0)
        for (var a = 0; a < this.QUIETV; ++a)
          this.barcode_array.bcode.push(w);
    },
    getInputSequences: function(x) {
      var e = [], n = [];
      if (n = x.match(/([0-9]{13,44})/g), n == null)
        n = [];
      else
        for (var c = 0, t = 0; c < n.length; c++)
          t = x.indexOf(n[c], t), n[c] = [n[c], t], t += n[c][0].length;
      n.push(["", x.length]);
      for (var t = 0, a = 0; a < n.length; a++) {
        var r = n[a], f = r[0].length;
        if (r[1] > 0) {
          var i = x.substr(t, r[1] - t), s = [];
          if (s = i.match(/([\x09\x0a\x0d\x20-\x7e]{5,})/g), s == null)
            s = [];
          else
            for (var c = 0; c < s.length; c++) {
              var t = i.indexOf(s[c]);
              s[c] = [s[c], t];
            }
          s.push(["", i.length]);
          for (var u = 0, l = 0; l < s.length; l++) {
            var d = s[l], b = d[0].length;
            if (d[1] > 0) {
              var _ = i.substr(u, d[1] - u);
              _.length > 0 && (_.length == 1 && e.length > 0 && e[e.length - 1][0] == 900 ? e.push([913, _]) : _.length % 6 == 0 ? e.push([924, _]) : e.push([901, _]));
            }
            b > 0 && e.push([900, d[0]]), u = d[1] + b;
          }
        }
        f > 0 && e.push([902, r[0]]), t = r[1] + f;
      }
      return e;
    },
    getCompaction: function(x, e, n) {
      n = n || !0;
      var c = [];
      switch (x) {
        case 900: {
          for (var t = 0, a = [], r = e.length, f = 0; f < r; ++f) {
            var i = this._ord(e.charAt(f)), s;
            if ((s = this._array_search(i, this.textsubmodes[t])) !== !1)
              a.push(s);
            else
              for (var u = 0; u < 4; ++u)
                if (u != t && (s = this._array_search(i, this.textsubmodes[u])) !== !1) {
                  (f + 1 == r || f + 1 < r && this._array_search(
                    this._ord(e.charAt(f + 1)),
                    this.textsubmodes[t]
                  ) !== !1) && (u == 3 || u == 0 && t == 1) ? u == 3 ? a.push(29) : a.push(27) : (a = a.concat(this.textlatch["" + t + u]), t = u), a.push(s);
                  break;
                }
          }
          var l = a.length;
          l % 2 != 0 && (a.push(29), ++l);
          for (var f = 0; f < l; f += 2)
            c.push(30 * parseInt(a[f]) + parseInt(a[f + 1]));
          break;
        }
        case 901:
        case 924: {
          for (var d, b, r; (r = e.length) > 0; ) {
            if (r > 6 ? (d = e.substring(6), e = e.substring(0, 6), b = 6) : (d = "", b = e.length), b == 6) {
              var _ = k("" + this._ord(e.charAt(0)), "1099511627776");
              _ = z(_, k("" + this._ord(e.charAt(1)), "4294967296")), _ = z(_, k("" + this._ord(e.charAt(2)), "16777216")), _ = z(_, k("" + this._ord(e.charAt(3)), "65536")), _ = z(_, k("" + this._ord(e.charAt(4)), "256")), _ = z(_, "" + this._ord(e.charAt(5)));
              var h = [];
              do {
                var p = this._my_bcmod(_, "900");
                _ = m0(_, "900"), h.unshift(p);
              } while (_ != "0");
              c = c.concat(h);
            } else
              for (var f = 0; f < b; ++f)
                c.push(this._ord(e.charAt(f)));
            e = d;
          }
          break;
        }
        case 902: {
          for (var d, r; (r = e.length) > 0; ) {
            r > 44 ? (d = e.substring(44), e = e.substring(0, 44)) : d = "";
            var _ = "1" + e;
            do {
              var p = this._my_bcmod(_, "900");
              _ = m0(_, "900"), c.unshift(p);
            } while (_ != "0");
            e = d;
          }
          break;
        }
        case 913: {
          c.push(this._ord(e));
          break;
        }
      }
      return n && c.unshift(x), c;
    },
    getErrorCorrectionLevel: function(x, e) {
      for (var n = 8, c = 928 - e; n > 0; ) {
        var t = 2 << x;
        if (c >= t)
          break;
        --n;
      }
      return (x < 0 || x > 8) && (e < 41 ? x = 2 : e < 161 ? x = 3 : e < 321 ? x = 4 : e < 864 ? x = 5 : x = n), x > n && (x = n), x;
    },
    getErrorCorrection: function(x, e) {
      for (var n = this.rsfactors[e], c = 2 << e, t = c - 1, a = this._array_fill(0, c, 0), r = 0; r < x.length; r++) {
        for (var f = (x[r] + a[t]) % 929, i = t; i > 0; --i) {
          var s = f * n[i] % 929, u = 929 - s;
          a[i] = (a[i - 1] + u) % 929;
        }
        s = f * n[0] % 929, u = 929 - s, a[0] = u % 929;
      }
      for (var i = 0; i < a.length; i++)
        a[i] != 0 && (a[i] = 929 - a[i]);
      return a = a.reverse(), a;
    },
    getBarcodeArray: function() {
      return this.barcode_array;
    },
    /**
     *
     * Functions from phpjs.org
     *
     */
    _array_fill: function(x, e, n) {
      var c, t = {};
      if (x == 0) {
        for (var a = [], r = 0; r < e; r++)
          a.push(n);
        return a;
      }
      if (!isNaN(x) && !isNaN(e))
        for (c = 0; c < e; c++)
          t[c + x] = n;
      return t;
    },
    _str_repeat: function(x, e) {
      for (var n = ""; e & 1 && (n += x), e >>= 1, e; )
        x += x;
      return n;
    },
    _intval: function(x, e) {
      var n, c = typeof x;
      return c === "boolean" ? +x : c === "string" ? (n = parseInt(x, e || 10), isNaN(n) || !isFinite(n) ? 0 : n) : c === "number" && isFinite(x) ? x | 0 : 0;
    },
    _sprintf: function() {
      var x = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g, e = arguments, n = 0, c = e[n++], t = function(s, u, l, d) {
        l || (l = " ");
        var b = s.length >= u ? "" : Array(1 + u - s.length >>> 0).join(l);
        return d ? s + b : b + s;
      }, a = function(s, u, l, d, b, _) {
        var h = d - s.length;
        return h > 0 && (l || !b ? s = t(s, d, _, l) : s = s.slice(0, u.length) + t("", h, "0", !0) + s.slice(u.length)), s;
      }, r = function(s, u, l, d, b, _, h) {
        var p = s >>> 0;
        return l = l && p && {
          2: "0b",
          8: "0",
          16: "0x"
        }[u] || "", s = l + t(p.toString(u), _ || 0, "0", !1), a(s, l, d, b, h);
      }, f = function(s, u, l, d, b, _) {
        return d != null && (s = s.slice(0, d)), a(
          s,
          "",
          u,
          l,
          b,
          _
        );
      }, i = function(s, u, l, d, b, _, h) {
        var p, v, w, g, m;
        if (s == "%%")
          return "%";
        for (var E = !1, y = "", S = !1, C = !1, B = " ", A = l.length, M = 0; l && M < A; M++)
          switch (l.charAt(M)) {
            case " ":
              y = " ";
              break;
            case "+":
              y = "+";
              break;
            case "-":
              E = !0;
              break;
            case "'":
              B = l.charAt(M + 1);
              break;
            case "0":
              S = !0;
              break;
            case "#":
              C = !0;
              break;
          }
        if (d ? d == "*" ? d = +e[n++] : d.charAt(0) == "*" ? d = +e[d.slice(1, -1)] : d = +d : d = 0, d < 0 && (d = -d, E = !0), !isFinite(d))
          throw new Error("sprintf: (minimum-)width must be finite");
        switch (_ ? _ == "*" ? _ = +e[n++] : _.charAt(0) == "*" ? _ = +e[_.slice(1, -1)] : _ = +_ : _ = "fFeE".indexOf(h) > -1 ? 6 : h == "d" ? 0 : void 0, m = u ? e[u.slice(0, -1)] : e[n++], h) {
          case "s":
            return f(
              String(m),
              E,
              d,
              _,
              S,
              B
            );
          case "c":
            return f(
              String.fromCharCode(+m),
              E,
              d,
              _,
              S
            );
          case "b":
            return r(
              m,
              2,
              C,
              E,
              d,
              _,
              S
            );
          case "o":
            return r(
              m,
              8,
              C,
              E,
              d,
              _,
              S
            );
          case "x":
            return r(
              m,
              16,
              C,
              E,
              d,
              _,
              S
            );
          case "X":
            return r(
              m,
              16,
              C,
              E,
              d,
              _,
              S
            ).toUpperCase();
          case "u":
            return r(
              m,
              10,
              C,
              E,
              d,
              _,
              S
            );
          case "i":
          case "d":
            return p = +m || 0, p = Math.round(p - p % 1), v = p < 0 ? "-" : y, m = v + t(String(Math.abs(p)), _, "0", !1), a(m, v, E, d, S);
          case "e":
          case "E":
          case "f":
          case "F":
          case "g":
          case "G":
            return p = +m, v = p < 0 ? "-" : y, w = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(h.toLowerCase())], g = ["toString", "toUpperCase"]["eEfFgG".indexOf(h) % 2], m = v + Math.abs(p)[w](_), a(m, v, E, d, S)[g]();
          default:
            return s;
        }
      };
      return c.replace(x, i);
    },
    _preg_split: function(x, e, n, c) {
      n = n || 0, c = c || "";
      var t, a = [], r = 0, f = 0, i = !1, s = !1, u = !1, l = {}, d = 0, b = /^\/(.*)\/\w*$/.exec(x.toString())[1], _ = /^\/.*\/(\w*)$/.exec(x.toString())[1];
      if (x = x.global && typeof x != "string" ? x : new RegExp(
        b,
        _ + (_.indexOf("g") !== -1 ? "" : "g")
      ), l = {
        PREG_SPLIT_NO_EMPTY: 1,
        PREG_SPLIT_DELIM_CAPTURE: 2,
        PREG_SPLIT_OFFSET_CAPTURE: 4
      }, typeof c != "number") {
        for (c = [].concat(c), f = 0; f < c.length; f++)
          l[c[f]] && (d = d | l[c[f]]);
        c = d;
      }
      i = c & l.PREG_SPLIT_NO_EMPTY, s = c & l.PREG_SPLIT_DELIM_CAPTURE, u = c & l.PREG_SPLIT_OFFSET_CAPTURE;
      var h = function(v, w) {
        i && !v.length || (u && (v = [v, w]), a.push(v));
      };
      if (!b) {
        for (t = e.split(""), f = 0; f < t.length; f++)
          h(t[f], f);
        return a;
      }
      for (; (t = x.exec(e)) && n !== 1; ) {
        if (h(e.slice(r, t.index), r), r = t.index + t[0].length, s) {
          var p = Array.prototype.slice.call(t);
          for (f = 1; f < p.length; f++)
            t[f] !== void 0 && h(t[f], t.index + t[0].indexOf(t[f]));
        }
        n--;
      }
      return h(e.slice(r, e.length), r), a;
    },
    _ord: function(x) {
      return x.charCodeAt(0);
    },
    _array_search: function(x, e, n) {
      var c = !!n, t = "";
      if (e && typeof e == "object" && e.change_key_case)
        return e.search(x, n);
      if (typeof x == "object" && x.exec) {
        if (!c) {
          var a = "i" + (x.global ? "g" : "") + (x.multiline ? "m" : "") + (x.sticky ? "y" : "");
          x = new RegExp(x.source, a);
        }
        for (t in e)
          if (x.test(e[t]))
            return t;
        return !1;
      }
      for (t in e)
        if (c && e[t] === x || !c && e[t] == x)
          return t;
      return !1;
    },
    _my_bcmod: function(x, e) {
      var n = 5, c = "";
      do {
        var t = parseInt(c + "" + x.substring(0, n));
        x = x.substring(n), c = t % e;
      } while (x.length);
      return parseInt(c);
    }
  };
}
function U1(x, e, n, c, t = "#000000", a = "#FFFFFF") {
  const r = x.getContext("2d");
  let f = 0;
  for (let i = 0; i < e.num_rows; i += 1) {
    let s = 0;
    for (let u = 0; u < e.num_cols; u += 1)
      e.bcode[i][u] === "1" ? r.fillStyle = t : r.fillStyle = a, r.fillRect(s, f, n, c), s += n;
    f += c;
  }
}
function R1(x, e, n) {
  const c = document.createElement("canvas"), t = L1();
  t.init(x);
  const a = t.getBarcodeArray();
  return c.width = 5 * a.num_cols, c.height = 5 * a.num_rows, U1(c, a, 5, 5, e, n), c.toDataURL();
}
const F1 = (x, e) => {
  const n = x.__vccOpts || x;
  for (const [c, t] of e)
    n[c] = t;
  return n;
}, D1 = { class: "apron-pdf417" }, z1 = ["src"], k1 = /* @__PURE__ */ Object.assign({
  name: "ApPdf417"
}, {
  __name: "index",
  props: {
    text: {
      type: String,
      default: "Apron Design pdf417 code"
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    },
    color: {
      type: String,
      default: "#393939"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    margin: Number
  },
  setup(x) {
    const e = x, n = R1(e.text, e.color, e.backgroundColor);
    return (c, t) => (v0(), w0("div", D1, [
      E0("img", {
        src: H0(n),
        style: O0({
          width: `${x.width}px`,
          height: `${x.height}px`,
          padding: `${x.margin}px`
        })
      }, null, 12, z1)
    ]));
  }
}), k0 = /* @__PURE__ */ F1(k1, [["__scopeId", "data-v-b52caae3"]]), H1 = [
  z0,
  k0
], l0 = function(x) {
  if (l0.installed)
    return !1;
  H1.map((e) => x.component(e.name, e));
};
typeof window < "u" && window.Vue && l0(window.Vue);
const V1 = {
  install: l0,
  Qrcode: z0,
  Pdf417: k0
};
export {
  V1 as default
};
