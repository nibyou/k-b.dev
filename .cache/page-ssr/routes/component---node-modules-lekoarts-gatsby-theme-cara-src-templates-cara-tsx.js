"use strict";
exports.id = 527;
exports.ids = [527];
exports.modules = {

/***/ 520:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "V": () => (/* binding */ Parallax),
  "_": () => (/* binding */ ParallaxLayer)
});

// EXTERNAL MODULE: external "/Users/luca/Desktop/work/nibyou/code/k-b.dev/node_modules/react/index.js"
var index_js_ = __webpack_require__(2562);
;// CONCATENATED MODULE: ./node_modules/@react-spring/rafz/dist/react-spring-rafz.esm.js
let updateQueue = makeQueue();
const raf = fn => schedule(fn, updateQueue);
let writeQueue = makeQueue();

raf.write = fn => schedule(fn, writeQueue);

let onStartQueue = makeQueue();

raf.onStart = fn => schedule(fn, onStartQueue);

let onFrameQueue = makeQueue();

raf.onFrame = fn => schedule(fn, onFrameQueue);

let onFinishQueue = makeQueue();

raf.onFinish = fn => schedule(fn, onFinishQueue);

let timeouts = [];

raf.setTimeout = (handler, ms) => {
  let time = raf.now() + ms;

  let cancel = () => {
    let i = timeouts.findIndex(t => t.cancel == cancel);
    if (~i) timeouts.splice(i, 1);
    __raf.count -= ~i ? 1 : 0;
  };

  let timeout = {
    time,
    handler,
    cancel
  };
  timeouts.splice(findTimeout(time), 0, timeout);
  __raf.count += 1;
  start();
  return timeout;
};

let findTimeout = time => ~(~timeouts.findIndex(t => t.time > time) || ~timeouts.length);

raf.cancel = fn => {
  updateQueue.delete(fn);
  writeQueue.delete(fn);
};

raf.sync = fn => {
  sync = true;
  raf.batchedUpdates(fn);
  sync = false;
};

raf.throttle = fn => {
  let lastArgs;

  function queuedFn() {
    try {
      fn(...lastArgs);
    } finally {
      lastArgs = null;
    }
  }

  function throttled(...args) {
    lastArgs = args;
    raf.onStart(queuedFn);
  }

  throttled.handler = fn;

  throttled.cancel = () => {
    onStartQueue.delete(queuedFn);
    lastArgs = null;
  };

  return throttled;
};

let nativeRaf = typeof window != 'undefined' ? window.requestAnimationFrame : () => {};

raf.use = impl => nativeRaf = impl;

raf.now = typeof performance != 'undefined' ? () => performance.now() : Date.now;

raf.batchedUpdates = fn => fn();

raf.catch = console.error;
raf.frameLoop = 'always';

raf.advance = () => {
  if (raf.frameLoop !== 'demand') {
    console.warn('Cannot call the manual advancement of rafz whilst frameLoop is not set as demand');
  } else {
    update();
  }
};

let ts = -1;
let sync = false;

function schedule(fn, queue) {
  if (sync) {
    queue.delete(fn);
    fn(0);
  } else {
    queue.add(fn);
    start();
  }
}

function start() {
  if (ts < 0) {
    ts = 0;

    if (raf.frameLoop !== 'demand') {
      nativeRaf(loop);
    }
  }
}

function loop() {
  if (~ts) {
    nativeRaf(loop);
    raf.batchedUpdates(update);
  }
}

function update() {
  let prevTs = ts;
  ts = raf.now();
  let count = findTimeout(ts);

  if (count) {
    eachSafely(timeouts.splice(0, count), t => t.handler());
    __raf.count -= count;
  }

  onStartQueue.flush();
  updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
  onFrameQueue.flush();
  writeQueue.flush();
  onFinishQueue.flush();
}

function makeQueue() {
  let next = new Set();
  let current = next;
  return {
    add(fn) {
      __raf.count += current == next && !next.has(fn) ? 1 : 0;
      next.add(fn);
    },

    delete(fn) {
      __raf.count -= current == next && next.has(fn) ? 1 : 0;
      return next.delete(fn);
    },

    flush(arg) {
      if (current.size) {
        next = new Set();
        __raf.count -= current.size;
        eachSafely(current, fn => fn(arg) && next.add(fn));
        __raf.count += next.size;
        current = next;
      }
    }

  };
}

function eachSafely(values, each) {
  values.forEach(value => {
    try {
      each(value);
    } catch (e) {
      raf.catch(e);
    }
  });
}

const __raf = {
  count: 0,

  clear() {
    ts = -1;
    timeouts = [];
    onStartQueue = makeQueue();
    updateQueue = makeQueue();
    onFrameQueue = makeQueue();
    writeQueue = makeQueue();
    onFinishQueue = makeQueue();
    __raf.count = 0;
  }

};



;// CONCATENATED MODULE: ./node_modules/@react-spring/shared/dist/react-spring-shared.esm.js





function noop() {}
const defineHidden = (obj, key, value) => Object.defineProperty(obj, key, {
  value,
  writable: true,
  configurable: true
});
const react_spring_shared_esm_is = {
  arr: Array.isArray,
  obj: a => !!a && a.constructor.name === 'Object',
  fun: a => typeof a === 'function',
  str: a => typeof a === 'string',
  num: a => typeof a === 'number',
  und: a => a === undefined
};
function isEqual(a, b) {
  if (react_spring_shared_esm_is.arr(a)) {
    if (!react_spring_shared_esm_is.arr(b) || a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  return a === b;
}
const react_spring_shared_esm_each = (obj, fn) => obj.forEach(fn);
function react_spring_shared_esm_eachProp(obj, fn, ctx) {
  if (react_spring_shared_esm_is.arr(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(ctx, obj[i], `${i}`);
    }

    return;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(ctx, obj[key], key);
    }
  }
}
const react_spring_shared_esm_toArray = a => react_spring_shared_esm_is.und(a) ? [] : react_spring_shared_esm_is.arr(a) ? a : [a];
function flush(queue, iterator) {
  if (queue.size) {
    const items = Array.from(queue);
    queue.clear();
    react_spring_shared_esm_each(items, iterator);
  }
}
const flushCalls = (queue, ...args) => flush(queue, fn => fn(...args));

let createStringInterpolator$1;
let to;
let colors$1 = null;
let skipAnimation = false;
let willAdvance = noop;
const react_spring_shared_esm_assign = globals => {
  if (globals.to) to = globals.to;
  if (globals.now) raf.now = globals.now;
  if (globals.colors !== undefined) colors$1 = globals.colors;
  if (globals.skipAnimation != null) skipAnimation = globals.skipAnimation;
  if (globals.createStringInterpolator) createStringInterpolator$1 = globals.createStringInterpolator;
  if (globals.requestAnimationFrame) raf.use(globals.requestAnimationFrame);
  if (globals.batchedUpdates) raf.batchedUpdates = globals.batchedUpdates;
  if (globals.willAdvance) willAdvance = globals.willAdvance;
  if (globals.frameLoop) raf.frameLoop = globals.frameLoop;
};

var globals = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get createStringInterpolator () { return createStringInterpolator$1; },
  get to () { return to; },
  get colors () { return colors$1; },
  get skipAnimation () { return skipAnimation; },
  get willAdvance () { return willAdvance; },
  assign: react_spring_shared_esm_assign
});

const startQueue = new Set();
let currentFrame = [];
let prevFrame = [];
let priority = 0;
const frameLoop = {
  get idle() {
    return !startQueue.size && !currentFrame.length;
  },

  start(animation) {
    if (priority > animation.priority) {
      startQueue.add(animation);
      raf.onStart(flushStartQueue);
    } else {
      startSafely(animation);
      raf(advance);
    }
  },

  advance,

  sort(animation) {
    if (priority) {
      raf.onFrame(() => frameLoop.sort(animation));
    } else {
      const prevIndex = currentFrame.indexOf(animation);

      if (~prevIndex) {
        currentFrame.splice(prevIndex, 1);
        startUnsafely(animation);
      }
    }
  },

  clear() {
    currentFrame = [];
    startQueue.clear();
  }

};

function flushStartQueue() {
  startQueue.forEach(startSafely);
  startQueue.clear();
  raf(advance);
}

function startSafely(animation) {
  if (!currentFrame.includes(animation)) startUnsafely(animation);
}

function startUnsafely(animation) {
  currentFrame.splice(findIndex(currentFrame, other => other.priority > animation.priority), 0, animation);
}

function advance(dt) {
  const nextFrame = prevFrame;

  for (let i = 0; i < currentFrame.length; i++) {
    const animation = currentFrame[i];
    priority = animation.priority;

    if (!animation.idle) {
      willAdvance(animation);
      animation.advance(dt);

      if (!animation.idle) {
        nextFrame.push(animation);
      }
    }
  }

  priority = 0;
  prevFrame = currentFrame;
  prevFrame.length = 0;
  currentFrame = nextFrame;
  return currentFrame.length > 0;
}

function findIndex(arr, test) {
  const index = arr.findIndex(test);
  return index < 0 ? arr.length : index;
}

const colors = {
  transparent: 0x00000000,
  aliceblue: 0xf0f8ffff,
  antiquewhite: 0xfaebd7ff,
  aqua: 0x00ffffff,
  aquamarine: 0x7fffd4ff,
  azure: 0xf0ffffff,
  beige: 0xf5f5dcff,
  bisque: 0xffe4c4ff,
  black: 0x000000ff,
  blanchedalmond: 0xffebcdff,
  blue: 0x0000ffff,
  blueviolet: 0x8a2be2ff,
  brown: 0xa52a2aff,
  burlywood: 0xdeb887ff,
  burntsienna: 0xea7e5dff,
  cadetblue: 0x5f9ea0ff,
  chartreuse: 0x7fff00ff,
  chocolate: 0xd2691eff,
  coral: 0xff7f50ff,
  cornflowerblue: 0x6495edff,
  cornsilk: 0xfff8dcff,
  crimson: 0xdc143cff,
  cyan: 0x00ffffff,
  darkblue: 0x00008bff,
  darkcyan: 0x008b8bff,
  darkgoldenrod: 0xb8860bff,
  darkgray: 0xa9a9a9ff,
  darkgreen: 0x006400ff,
  darkgrey: 0xa9a9a9ff,
  darkkhaki: 0xbdb76bff,
  darkmagenta: 0x8b008bff,
  darkolivegreen: 0x556b2fff,
  darkorange: 0xff8c00ff,
  darkorchid: 0x9932ccff,
  darkred: 0x8b0000ff,
  darksalmon: 0xe9967aff,
  darkseagreen: 0x8fbc8fff,
  darkslateblue: 0x483d8bff,
  darkslategray: 0x2f4f4fff,
  darkslategrey: 0x2f4f4fff,
  darkturquoise: 0x00ced1ff,
  darkviolet: 0x9400d3ff,
  deeppink: 0xff1493ff,
  deepskyblue: 0x00bfffff,
  dimgray: 0x696969ff,
  dimgrey: 0x696969ff,
  dodgerblue: 0x1e90ffff,
  firebrick: 0xb22222ff,
  floralwhite: 0xfffaf0ff,
  forestgreen: 0x228b22ff,
  fuchsia: 0xff00ffff,
  gainsboro: 0xdcdcdcff,
  ghostwhite: 0xf8f8ffff,
  gold: 0xffd700ff,
  goldenrod: 0xdaa520ff,
  gray: 0x808080ff,
  green: 0x008000ff,
  greenyellow: 0xadff2fff,
  grey: 0x808080ff,
  honeydew: 0xf0fff0ff,
  hotpink: 0xff69b4ff,
  indianred: 0xcd5c5cff,
  indigo: 0x4b0082ff,
  ivory: 0xfffff0ff,
  khaki: 0xf0e68cff,
  lavender: 0xe6e6faff,
  lavenderblush: 0xfff0f5ff,
  lawngreen: 0x7cfc00ff,
  lemonchiffon: 0xfffacdff,
  lightblue: 0xadd8e6ff,
  lightcoral: 0xf08080ff,
  lightcyan: 0xe0ffffff,
  lightgoldenrodyellow: 0xfafad2ff,
  lightgray: 0xd3d3d3ff,
  lightgreen: 0x90ee90ff,
  lightgrey: 0xd3d3d3ff,
  lightpink: 0xffb6c1ff,
  lightsalmon: 0xffa07aff,
  lightseagreen: 0x20b2aaff,
  lightskyblue: 0x87cefaff,
  lightslategray: 0x778899ff,
  lightslategrey: 0x778899ff,
  lightsteelblue: 0xb0c4deff,
  lightyellow: 0xffffe0ff,
  lime: 0x00ff00ff,
  limegreen: 0x32cd32ff,
  linen: 0xfaf0e6ff,
  magenta: 0xff00ffff,
  maroon: 0x800000ff,
  mediumaquamarine: 0x66cdaaff,
  mediumblue: 0x0000cdff,
  mediumorchid: 0xba55d3ff,
  mediumpurple: 0x9370dbff,
  mediumseagreen: 0x3cb371ff,
  mediumslateblue: 0x7b68eeff,
  mediumspringgreen: 0x00fa9aff,
  mediumturquoise: 0x48d1ccff,
  mediumvioletred: 0xc71585ff,
  midnightblue: 0x191970ff,
  mintcream: 0xf5fffaff,
  mistyrose: 0xffe4e1ff,
  moccasin: 0xffe4b5ff,
  navajowhite: 0xffdeadff,
  navy: 0x000080ff,
  oldlace: 0xfdf5e6ff,
  olive: 0x808000ff,
  olivedrab: 0x6b8e23ff,
  orange: 0xffa500ff,
  orangered: 0xff4500ff,
  orchid: 0xda70d6ff,
  palegoldenrod: 0xeee8aaff,
  palegreen: 0x98fb98ff,
  paleturquoise: 0xafeeeeff,
  palevioletred: 0xdb7093ff,
  papayawhip: 0xffefd5ff,
  peachpuff: 0xffdab9ff,
  peru: 0xcd853fff,
  pink: 0xffc0cbff,
  plum: 0xdda0ddff,
  powderblue: 0xb0e0e6ff,
  purple: 0x800080ff,
  rebeccapurple: 0x663399ff,
  red: 0xff0000ff,
  rosybrown: 0xbc8f8fff,
  royalblue: 0x4169e1ff,
  saddlebrown: 0x8b4513ff,
  salmon: 0xfa8072ff,
  sandybrown: 0xf4a460ff,
  seagreen: 0x2e8b57ff,
  seashell: 0xfff5eeff,
  sienna: 0xa0522dff,
  silver: 0xc0c0c0ff,
  skyblue: 0x87ceebff,
  slateblue: 0x6a5acdff,
  slategray: 0x708090ff,
  slategrey: 0x708090ff,
  snow: 0xfffafaff,
  springgreen: 0x00ff7fff,
  steelblue: 0x4682b4ff,
  tan: 0xd2b48cff,
  teal: 0x008080ff,
  thistle: 0xd8bfd8ff,
  tomato: 0xff6347ff,
  turquoise: 0x40e0d0ff,
  violet: 0xee82eeff,
  wheat: 0xf5deb3ff,
  white: 0xffffffff,
  whitesmoke: 0xf5f5f5ff,
  yellow: 0xffff00ff,
  yellowgreen: 0x9acd32ff
};

const NUMBER = '[-+]?\\d*\\.?\\d+';
const PERCENTAGE = NUMBER + '%';

function call(...parts) {
  return '\\(\\s*(' + parts.join(')\\s*,\\s*(') + ')\\s*\\)';
}

const rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER));
const rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER));
const hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE));
const hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
const hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex6 = /^#([0-9a-fA-F]{6})$/;
const hex8 = /^#([0-9a-fA-F]{8})$/;

function normalizeColor(color) {
  let match;

  if (typeof color === 'number') {
    return color >>> 0 === color && color >= 0 && color <= 0xffffffff ? color : null;
  }

  if (match = hex6.exec(color)) return parseInt(match[1] + 'ff', 16) >>> 0;

  if (colors$1 && colors$1[color] !== undefined) {
    return colors$1[color];
  }

  if (match = rgb.exec(color)) {
    return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 0x000000ff) >>> 0;
  }

  if (match = rgba.exec(color)) {
    return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
  }

  if (match = hex3.exec(color)) {
    return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + 'ff', 16) >>> 0;
  }

  if (match = hex8.exec(color)) return parseInt(match[1], 16) >>> 0;

  if (match = hex4.exec(color)) {
    return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
  }

  if (match = hsl.exec(color)) {
    return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 0x000000ff) >>> 0;
  }

  if (match = hsla.exec(color)) {
    return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
  }

  return null;
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}

function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0) return 0;
  if (int > 255) return 255;
  return int;
}

function parse360(str) {
  const int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}

function parse1(str) {
  const num = parseFloat(str);
  if (num < 0) return 0;
  if (num > 1) return 255;
  return Math.round(num * 255);
}

function parsePercentage(str) {
  const int = parseFloat(str);
  if (int < 0) return 0;
  if (int > 100) return 1;
  return int / 100;
}

function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null) return input;
  int32Color = int32Color || 0;
  let r = (int32Color & 0xff000000) >>> 24;
  let g = (int32Color & 0x00ff0000) >>> 16;
  let b = (int32Color & 0x0000ff00) >>> 8;
  let a = (int32Color & 0x000000ff) / 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const createInterpolator = (range, output, extrapolate) => {
  if (react_spring_shared_esm_is.fun(range)) {
    return range;
  }

  if (react_spring_shared_esm_is.arr(range)) {
    return createInterpolator({
      range,
      output: output,
      extrapolate
    });
  }

  if (react_spring_shared_esm_is.str(range.output[0])) {
    return createStringInterpolator$1(range);
  }

  const config = range;
  const outputRange = config.output;
  const inputRange = config.range || [0, 1];
  const extrapolateLeft = config.extrapolateLeft || config.extrapolate || 'extend';
  const extrapolateRight = config.extrapolateRight || config.extrapolate || 'extend';

  const easing = config.easing || (t => t);

  return input => {
    const range = findRange(input, inputRange);
    return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, config.map);
  };
};

function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
  let result = map ? map(input) : input;

  if (result < inputMin) {
    if (extrapolateLeft === 'identity') return result;else if (extrapolateLeft === 'clamp') result = inputMin;
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') return result;else if (extrapolateRight === 'clamp') result = inputMax;
  }

  if (outputMin === outputMax) return outputMin;
  if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax;
  if (inputMin === -Infinity) result = -result;else if (inputMax === Infinity) result = result - inputMin;else result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  if (outputMin === -Infinity) result = -result;else if (outputMax === Infinity) result = result + outputMin;else result = result * (outputMax - outputMin) + outputMin;
  return result;
}

function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i) if (inputRange[i] >= input) break;

  return i - 1;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const $get = Symbol.for('FluidValue.get');
const $observers = Symbol.for('FluidValue.observers');

const hasFluidValue = arg => Boolean(arg && arg[$get]);

const getFluidValue = arg => arg && arg[$get] ? arg[$get]() : arg;

const getFluidObservers = target => target[$observers] || null;

function callFluidObserver(observer, event) {
  if (observer.eventObserved) {
    observer.eventObserved(event);
  } else {
    observer(event);
  }
}

function callFluidObservers(target, event) {
  let observers = target[$observers];

  if (observers) {
    observers.forEach(observer => {
      callFluidObserver(observer, event);
    });
  }
}

class FluidValue {
  constructor(get) {
    this[$get] = void 0;
    this[$observers] = void 0;

    if (!get && !(get = this.get)) {
      throw Error('Unknown getter');
    }

    setFluidGetter(this, get);
  }

}

const setFluidGetter = (target, get) => setHidden(target, $get, get);

function react_spring_shared_esm_addFluidObserver(target, observer) {
  if (target[$get]) {
    let observers = target[$observers];

    if (!observers) {
      setHidden(target, $observers, observers = new Set());
    }

    if (!observers.has(observer)) {
      observers.add(observer);

      if (target.observerAdded) {
        target.observerAdded(observers.size, observer);
      }
    }
  }

  return observer;
}

function removeFluidObserver(target, observer) {
  let observers = target[$observers];

  if (observers && observers.has(observer)) {
    const count = observers.size - 1;

    if (count) {
      observers.delete(observer);
    } else {
      target[$observers] = null;
    }

    if (target.observerRemoved) {
      target.observerRemoved(count, observer);
    }
  }
}

const setHidden = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
});

const numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
const unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, 'i');
let namedColorRegex;
const rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;

const rgbaRound = (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;

const createStringInterpolator = config => {
  if (!namedColorRegex) namedColorRegex = colors$1 ? new RegExp(`(${Object.keys(colors$1).join('|')})(?!\\w)`, 'g') : /^\b$/;
  const output = config.output.map(value => getFluidValue(value).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba));
  const keyframes = output.map(value => value.match(numberRegex).map(Number));
  const outputRanges = keyframes[0].map((_, i) => keyframes.map(values => {
    if (!(i in values)) {
      throw Error('The arity of each "output" value must be equal');
    }

    return values[i];
  }));
  const interpolators = outputRanges.map(output => createInterpolator(_extends({}, config, {
    output
  })));
  return input => {
    var _output$find;

    const missingUnit = !unitRegex.test(output[0]) && ((_output$find = output.find(value => unitRegex.test(value))) == null ? void 0 : _output$find.replace(numberRegex, ''));
    let i = 0;
    return output[0].replace(numberRegex, () => `${interpolators[i++](input)}${missingUnit || ''}`).replace(rgbaRegex, rgbaRound);
  };
};

const prefix = 'react-spring: ';

const once = fn => {
  const func = fn;
  let called = false;

  if (typeof func != 'function') {
    throw new TypeError(`${prefix}once requires a function parameter`);
  }

  return (...args) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};

const warnInterpolate = once(console.warn);
function react_spring_shared_esm_deprecateInterpolate() {
  warnInterpolate(`${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const warnDirectCall = once(console.warn);
function react_spring_shared_esm_deprecateDirectCall() {
  warnDirectCall(`${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}

function isAnimatedString(value) {
  return react_spring_shared_esm_is.str(value) && (value[0] == '#' || /\d/.test(value) || value in (colors$1 || {}));
}

const react_spring_shared_esm_useOnce = effect => (0,index_js_.useEffect)(effect, emptyDeps);
const emptyDeps = [];

function react_spring_shared_esm_useForceUpdate() {
  const update = (0,index_js_.useState)()[1];
  const mounted = (0,index_js_.useState)(makeMountedRef)[0];
  react_spring_shared_esm_useOnce(mounted.unmount);
  return () => {
    if (mounted.current) {
      update({});
    }
  };
}

function makeMountedRef() {
  const mounted = {
    current: true,
    unmount: () => () => {
      mounted.current = false;
    }
  };
  return mounted;
}

function useMemoOne(getResult, inputs) {
  const [initial] = (0,index_js_.useState)(() => ({
    inputs,
    result: getResult()
  }));
  const committed = (0,index_js_.useRef)();
  const prevCache = committed.current;
  let cache = prevCache;

  if (cache) {
    const useCache = Boolean(inputs && cache.inputs && areInputsEqual(inputs, cache.inputs));

    if (!useCache) {
      cache = {
        inputs,
        result: getResult()
      };
    }
  } else {
    cache = initial;
  }

  (0,index_js_.useEffect)(() => {
    committed.current = cache;

    if (prevCache == initial) {
      initial.inputs = initial.result = undefined;
    }
  }, [cache]);
  return cache.result;
}

function areInputsEqual(next, prev) {
  if (next.length !== prev.length) {
    return false;
  }

  for (let i = 0; i < next.length; i++) {
    if (next[i] !== prev[i]) {
      return false;
    }
  }

  return true;
}

function react_spring_shared_esm_usePrev(value) {
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value;
  });
  return prevRef.current;
}

const react_spring_shared_esm_useLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? index_js_.useLayoutEffect : index_js_.useEffect;



;// CONCATENATED MODULE: ./node_modules/@react-spring/animated/dist/react-spring-animated.esm.js




const $node = Symbol.for('Animated:node');
const isAnimated = value => !!value && value[$node] === value;
const getAnimated = owner => owner && owner[$node];
const setAnimated = (owner, node) => defineHidden(owner, $node, node);
const getPayload = owner => owner && owner[$node] && owner[$node].getPayload();
class Animated {
  constructor() {
    this.payload = void 0;
    setAnimated(this, this);
  }

  getPayload() {
    return this.payload || [];
  }

}

class AnimatedValue extends Animated {
  constructor(_value) {
    super();
    this.done = true;
    this.elapsedTime = void 0;
    this.lastPosition = void 0;
    this.lastVelocity = void 0;
    this.v0 = void 0;
    this.durationProgress = 0;
    this._value = _value;

    if (react_spring_shared_esm_is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }

  static create(value) {
    return new AnimatedValue(value);
  }

  getPayload() {
    return [this];
  }

  getValue() {
    return this._value;
  }

  setValue(value, step) {
    if (react_spring_shared_esm_is.num(value)) {
      this.lastPosition = value;

      if (step) {
        value = Math.round(value / step) * step;

        if (this.done) {
          this.lastPosition = value;
        }
      }
    }

    if (this._value === value) {
      return false;
    }

    this._value = value;
    return true;
  }

  reset() {
    const {
      done
    } = this;
    this.done = false;

    if (react_spring_shared_esm_is.num(this._value)) {
      this.elapsedTime = 0;
      this.durationProgress = 0;
      this.lastPosition = this._value;
      if (done) this.lastVelocity = null;
      this.v0 = null;
    }
  }

}

class AnimatedString extends AnimatedValue {
  constructor(value) {
    super(0);
    this._string = null;
    this._toString = void 0;
    this._toString = createInterpolator({
      output: [value, value]
    });
  }

  static create(value) {
    return new AnimatedString(value);
  }

  getValue() {
    let value = this._string;
    return value == null ? this._string = this._toString(this._value) : value;
  }

  setValue(value) {
    if (react_spring_shared_esm_is.str(value)) {
      if (value == this._string) {
        return false;
      }

      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }

    return true;
  }

  reset(goal) {
    if (goal) {
      this._toString = createInterpolator({
        output: [this.getValue(), goal]
      });
    }

    this._value = 0;
    super.reset();
  }

}

const TreeContext = {
  dependencies: null
};

class AnimatedObject extends Animated {
  constructor(source) {
    super();
    this.source = source;
    this.setValue(source);
  }

  getValue(animated) {
    const values = {};
    react_spring_shared_esm_eachProp(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated);
      } else if (hasFluidValue(source)) {
        values[key] = getFluidValue(source);
      } else if (!animated) {
        values[key] = source;
      }
    });
    return values;
  }

  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }

  reset() {
    if (this.payload) {
      react_spring_shared_esm_each(this.payload, node => node.reset());
    }
  }

  _makePayload(source) {
    if (source) {
      const payload = new Set();
      react_spring_shared_esm_eachProp(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }

  _addToPayload(source) {
    if (TreeContext.dependencies && hasFluidValue(source)) {
      TreeContext.dependencies.add(source);
    }

    const payload = getPayload(source);

    if (payload) {
      react_spring_shared_esm_each(payload, node => this.add(node));
    }
  }

}

class AnimatedArray extends AnimatedObject {
  constructor(source) {
    super(source);
  }

  static create(source) {
    return new AnimatedArray(source);
  }

  getValue() {
    return this.source.map(node => node.getValue());
  }

  setValue(source) {
    const payload = this.getPayload();

    if (source.length == payload.length) {
      return payload.map((node, i) => node.setValue(source[i])).some(Boolean);
    }

    super.setValue(source.map(makeAnimated));
    return true;
  }

}

function makeAnimated(value) {
  const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
  return nodeType.create(value);
}

function getAnimatedType(value) {
  const parentNode = getAnimated(value);
  return parentNode ? parentNode.constructor : react_spring_shared_esm_is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
}

function react_spring_animated_esm_extends() {
  react_spring_animated_esm_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return react_spring_animated_esm_extends.apply(this, arguments);
}

const withAnimated = (Component, host) => {
  const hasInstance = !react_spring_shared_esm_is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
  return (0,index_js_.forwardRef)((givenProps, givenRef) => {
    const instanceRef = (0,index_js_.useRef)(null);
    const ref = hasInstance && (0,index_js_.useCallback)(value => {
      instanceRef.current = updateRef(givenRef, value);
    }, [givenRef]);
    const [props, deps] = getAnimatedState(givenProps, host);
    const forceUpdate = react_spring_shared_esm_useForceUpdate();

    const callback = () => {
      const instance = instanceRef.current;

      if (hasInstance && !instance) {
        return;
      }

      const didUpdate = instance ? host.applyAnimatedValues(instance, props.getValue(true)) : false;

      if (didUpdate === false) {
        forceUpdate();
      }
    };

    const observer = new PropsObserver(callback, deps);
    const observerRef = (0,index_js_.useRef)();
    react_spring_shared_esm_useLayoutEffect(() => {
      const lastObserver = observerRef.current;
      observerRef.current = observer;
      react_spring_shared_esm_each(deps, dep => react_spring_shared_esm_addFluidObserver(dep, observer));

      if (lastObserver) {
        react_spring_shared_esm_each(lastObserver.deps, dep => removeFluidObserver(dep, lastObserver));
        raf.cancel(lastObserver.update);
      }
    });
    (0,index_js_.useEffect)(callback, []);
    react_spring_shared_esm_useOnce(() => () => {
      const observer = observerRef.current;
      react_spring_shared_esm_each(observer.deps, dep => removeFluidObserver(dep, observer));
    });
    const usedProps = host.getComponentProps(props.getValue());
    return index_js_.createElement(Component, react_spring_animated_esm_extends({}, usedProps, {
      ref: ref
    }));
  });
};

class PropsObserver {
  constructor(update, deps) {
    this.update = update;
    this.deps = deps;
  }

  eventObserved(event) {
    if (event.type == 'change') {
      raf.write(this.update);
    }
  }

}

function getAnimatedState(props, host) {
  const dependencies = new Set();
  TreeContext.dependencies = dependencies;
  if (props.style) props = react_spring_animated_esm_extends({}, props, {
    style: host.createAnimatedStyle(props.style)
  });
  props = new AnimatedObject(props);
  TreeContext.dependencies = null;
  return [props, dependencies];
}

function updateRef(ref, value) {
  if (ref) {
    if (react_spring_shared_esm_is.fun(ref)) ref(value);else ref.current = value;
  }

  return value;
}

const cacheKey = Symbol.for('AnimatedComponent');
const createHost = (components, {
  applyAnimatedValues: _applyAnimatedValues = () => false,
  createAnimatedStyle: _createAnimatedStyle = style => new AnimatedObject(style),
  getComponentProps: _getComponentProps = props => props
} = {}) => {
  const hostConfig = {
    applyAnimatedValues: _applyAnimatedValues,
    createAnimatedStyle: _createAnimatedStyle,
    getComponentProps: _getComponentProps
  };

  const animated = Component => {
    const displayName = getDisplayName(Component) || 'Anonymous';

    if (react_spring_shared_esm_is.str(Component)) {
      Component = animated[Component] || (animated[Component] = withAnimated(Component, hostConfig));
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }

    Component.displayName = `Animated(${displayName})`;
    return Component;
  };

  react_spring_shared_esm_eachProp(components, (Component, key) => {
    if (react_spring_shared_esm_is.arr(components)) {
      key = getDisplayName(Component);
    }

    animated[key] = animated(Component);
  });
  return {
    animated
  };
};

const getDisplayName = arg => react_spring_shared_esm_is.str(arg) ? arg : arg && react_spring_shared_esm_is.str(arg.displayName) ? arg.displayName : react_spring_shared_esm_is.fun(arg) && arg.name || null;



;// CONCATENATED MODULE: ./node_modules/@react-spring/core/dist/react-spring-core.esm.js








function react_spring_core_esm_extends() {
  react_spring_core_esm_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return react_spring_core_esm_extends.apply(this, arguments);
}

function callProp(value, ...args) {
  return react_spring_shared_esm_is.fun(value) ? value(...args) : value;
}
const matchProp = (value, key) => value === true || !!(key && value && (react_spring_shared_esm_is.fun(value) ? value(key) : react_spring_shared_esm_toArray(value).includes(key)));
const resolveProp = (prop, key) => react_spring_shared_esm_is.obj(prop) ? key && prop[key] : prop;
const getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : undefined;

const noopTransform = value => value;

const getDefaultProps = (props, transform = noopTransform) => {
  let keys = DEFAULT_PROPS;

  if (props.default && props.default !== true) {
    props = props.default;
    keys = Object.keys(props);
  }

  const defaults = {};

  for (const key of keys) {
    const value = transform(props[key], key);

    if (!react_spring_shared_esm_is.und(value)) {
      defaults[key] = value;
    }
  }

  return defaults;
};
const DEFAULT_PROPS = ['config', 'onProps', 'onStart', 'onChange', 'onPause', 'onResume', 'onRest'];
const RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  keys: 1,
  callId: 1,
  parentId: 1
};

function getForwardProps(props) {
  const forward = {};
  let count = 0;
  react_spring_shared_esm_eachProp(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count++;
    }
  });

  if (count) {
    return forward;
  }
}

function inferTo(props) {
  const to = getForwardProps(props);

  if (to) {
    const out = {
      to
    };
    react_spring_shared_esm_eachProp(props, (val, key) => key in to || (out[key] = val));
    return out;
  }

  return react_spring_core_esm_extends({}, props);
}
function computeGoal(value) {
  value = getFluidValue(value);
  return react_spring_shared_esm_is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? globals.createStringInterpolator({
    range: [0, 1],
    output: [value, value]
  })(1) : value;
}
function hasProps(props) {
  for (const _ in props) return true;

  return false;
}
function isAsyncTo(to) {
  return react_spring_shared_esm_is.fun(to) || react_spring_shared_esm_is.arr(to) && react_spring_shared_esm_is.obj(to[0]);
}
function detachRefs(ctrl, ref) {
  var _ctrl$ref;

  (_ctrl$ref = ctrl.ref) == null ? void 0 : _ctrl$ref.delete(ctrl);
  ref == null ? void 0 : ref.delete(ctrl);
}
function replaceRef(ctrl, ref) {
  if (ref && ctrl.ref !== ref) {
    var _ctrl$ref2;

    (_ctrl$ref2 = ctrl.ref) == null ? void 0 : _ctrl$ref2.delete(ctrl);
    ref.add(ctrl);
    ctrl.ref = ref;
  }
}

function useChain(refs, timeSteps, timeFrame = 1000) {
  useLayoutEffect(() => {
    if (timeSteps) {
      let prevDelay = 0;
      each(refs, (ref, i) => {
        const controllers = ref.current;

        if (controllers.length) {
          let delay = timeFrame * timeSteps[i];
          if (isNaN(delay)) delay = prevDelay;else prevDelay = delay;
          each(controllers, ctrl => {
            each(ctrl.queue, props => {
              const memoizedDelayProp = props.delay;

              props.delay = key => delay + callProp(memoizedDelayProp || 0, key);
            });
            ctrl.start();
          });
        }
      });
    } else {
      let p = Promise.resolve();
      each(refs, ref => {
        const controllers = ref.current;

        if (controllers.length) {
          const queues = controllers.map(ctrl => {
            const q = ctrl.queue;
            ctrl.queue = [];
            return q;
          });
          p = p.then(() => {
            each(controllers, (ctrl, i) => each(queues[i] || [], update => ctrl.queue.push(update)));
            return Promise.all(ref.start());
          });
        }
      });
    }
  });
}

const config = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  },
  molasses: {
    tension: 280,
    friction: 120
  }
};

const linear = t => t;

const defaults = react_spring_core_esm_extends({}, config.default, {
  mass: 1,
  damping: 1,
  easing: linear,
  clamp: false
});

class AnimationConfig {
  constructor() {
    this.tension = void 0;
    this.friction = void 0;
    this.frequency = void 0;
    this.damping = void 0;
    this.mass = void 0;
    this.velocity = 0;
    this.restVelocity = void 0;
    this.precision = void 0;
    this.progress = void 0;
    this.duration = void 0;
    this.easing = void 0;
    this.clamp = void 0;
    this.bounce = void 0;
    this.decay = void 0;
    this.round = void 0;
    Object.assign(this, defaults);
  }

}
function mergeConfig(config, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = react_spring_core_esm_extends({}, defaultConfig);
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = react_spring_core_esm_extends({}, defaultConfig, newConfig);
  }

  sanitizeConfig(config, newConfig);
  Object.assign(config, newConfig);

  for (const key in defaults) {
    if (config[key] == null) {
      config[key] = defaults[key];
    }
  }

  let {
    mass,
    frequency,
    damping
  } = config;

  if (!react_spring_shared_esm_is.und(frequency)) {
    if (frequency < 0.01) frequency = 0.01;
    if (damping < 0) damping = 0;
    config.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
    config.friction = 4 * Math.PI * damping * mass / frequency;
  }

  return config;
}

function sanitizeConfig(config, props) {
  if (!react_spring_shared_esm_is.und(props.decay)) {
    config.duration = undefined;
  } else {
    const isTensionConfig = !react_spring_shared_esm_is.und(props.tension) || !react_spring_shared_esm_is.und(props.friction);

    if (isTensionConfig || !react_spring_shared_esm_is.und(props.frequency) || !react_spring_shared_esm_is.und(props.damping) || !react_spring_shared_esm_is.und(props.mass)) {
      config.duration = undefined;
      config.decay = undefined;
    }

    if (isTensionConfig) {
      config.frequency = undefined;
    }
  }
}

const emptyArray = [];
class Animation {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.to = void 0;
    this.from = void 0;
    this.config = new AnimationConfig();
    this.immediate = false;
  }

}

function scheduleProps(callId, {
  key,
  props,
  defaultProps,
  state,
  actions
}) {
  return new Promise((resolve, reject) => {
    var _props$cancel;

    let delay;
    let timeout;
    let cancel = matchProp((_props$cancel = props.cancel) != null ? _props$cancel : defaultProps == null ? void 0 : defaultProps.cancel, key);

    if (cancel) {
      onStart();
    } else {
      if (!react_spring_shared_esm_is.und(props.pause)) {
        state.paused = matchProp(props.pause, key);
      }

      let pause = defaultProps == null ? void 0 : defaultProps.pause;

      if (pause !== true) {
        pause = state.paused || matchProp(pause, key);
      }

      delay = callProp(props.delay || 0, key);

      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }

    function onPause() {
      state.resumeQueue.add(onResume);
      state.timeouts.delete(timeout);
      timeout.cancel();
      delay = timeout.time - raf.now();
    }

    function onResume() {
      if (delay > 0) {
        timeout = raf.setTimeout(onStart, delay);
        state.pauseQueue.add(onPause);
        state.timeouts.add(timeout);
      } else {
        onStart();
      }
    }

    function onStart() {
      state.pauseQueue.delete(onPause);
      state.timeouts.delete(timeout);

      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }

      try {
        actions.start(react_spring_core_esm_extends({}, props, {
          callId,
          cancel
        }), resolve);
      } catch (err) {
        reject(err);
      }
    }
  });
}

const getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some(result => result.cancelled) ? getCancelledResult(target.get()) : results.every(result => result.noop) ? getNoopResult(target.get()) : getFinishedResult(target.get(), results.every(result => result.finished));
const getNoopResult = value => ({
  value,
  noop: true,
  finished: true,
  cancelled: false
});
const getFinishedResult = (value, finished, cancelled = false) => ({
  value,
  finished,
  cancelled
});
const getCancelledResult = value => ({
  value,
  cancelled: true,
  finished: false
});

function runAsync(to, props, state, target) {
  const {
    callId,
    parentId,
    onRest
  } = props;
  const {
    asyncTo: prevTo,
    promise: prevPromise
  } = state;

  if (!parentId && to === prevTo && !props.reset) {
    return prevPromise;
  }

  return state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to;
    const defaultProps = getDefaultProps(props, (value, key) => key === 'onRest' ? undefined : value);
    let preventBail;
    let bail;
    const bailPromise = new Promise((resolve, reject) => (preventBail = resolve, bail = reject));

    const bailIfEnded = bailSignal => {
      const bailResult = callId <= (state.cancelId || 0) && getCancelledResult(target) || callId !== state.asyncId && getFinishedResult(target, false);

      if (bailResult) {
        bailSignal.result = bailResult;
        bail(bailSignal);
        throw bailSignal;
      }
    };

    const animate = (arg1, arg2) => {
      const bailSignal = new BailSignal();
      const skipAnimationSignal = new SkipAniamtionSignal();
      return (async () => {
        if (globals.skipAnimation) {
          stopAsync(state);
          skipAnimationSignal.result = getFinishedResult(target, false);
          bail(skipAnimationSignal);
          throw skipAnimationSignal;
        }

        bailIfEnded(bailSignal);
        const props = react_spring_shared_esm_is.obj(arg1) ? react_spring_core_esm_extends({}, arg1) : react_spring_core_esm_extends({}, arg2, {
          to: arg1
        });
        props.parentId = callId;
        react_spring_shared_esm_eachProp(defaultProps, (value, key) => {
          if (react_spring_shared_esm_is.und(props[key])) {
            props[key] = value;
          }
        });
        const result = await target.start(props);
        bailIfEnded(bailSignal);

        if (state.paused) {
          await new Promise(resume => {
            state.resumeQueue.add(resume);
          });
        }

        return result;
      })();
    };

    let result;

    if (globals.skipAnimation) {
      stopAsync(state);
      return getFinishedResult(target, false);
    }

    try {
      let animating;

      if (react_spring_shared_esm_is.arr(to)) {
        animating = (async queue => {
          for (const props of queue) {
            await animate(props);
          }
        })(to);
      } else {
          animating = Promise.resolve(to(animate, target.stop.bind(target)));
        }

      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target.get(), true, false);
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else if (err instanceof SkipAniamtionSignal) {
        result = err.result;
      } else {
        throw err;
      }
    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : undefined;
        state.promise = parentId ? prevPromise : undefined;
      }
    }

    if (react_spring_shared_esm_is.fun(onRest)) {
      raf.batchedUpdates(() => {
        onRest(result, target, target.item);
      });
    }

    return result;
  })();
}
function stopAsync(state, cancelId) {
  flush(state.timeouts, t => t.cancel());
  state.pauseQueue.clear();
  state.resumeQueue.clear();
  state.asyncId = state.asyncTo = state.promise = undefined;
  if (cancelId) state.cancelId = cancelId;
}
class BailSignal extends Error {
  constructor() {
    super('An async animation has been interrupted. You see this error because you ' + 'forgot to use `await` or `.catch(...)` on its returned promise.');
    this.result = void 0;
  }

}
class SkipAniamtionSignal extends Error {
  constructor() {
    super('SkipAnimationSignal');
    this.result = void 0;
  }

}

const isFrameValue = value => value instanceof FrameValue;
let nextId$1 = 1;
class FrameValue extends FluidValue {
  constructor(...args) {
    super(...args);
    this.id = nextId$1++;
    this.key = void 0;
    this._priority = 0;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    if (this._priority != priority) {
      this._priority = priority;

      this._onPriorityChange(priority);
    }
  }

  get() {
    const node = getAnimated(this);
    return node && node.getValue();
  }

  to(...args) {
    return globals.to(this, args);
  }

  interpolate(...args) {
    react_spring_shared_esm_deprecateInterpolate();
    return globals.to(this, args);
  }

  toJSON() {
    return this.get();
  }

  observerAdded(count) {
    if (count == 1) this._attach();
  }

  observerRemoved(count) {
    if (count == 0) this._detach();
  }

  _attach() {}

  _detach() {}

  _onChange(value, idle = false) {
    callFluidObservers(this, {
      type: 'change',
      parent: this,
      value,
      idle
    });
  }

  _onPriorityChange(priority) {
    if (!this.idle) {
      frameLoop.sort(this);
    }

    callFluidObservers(this, {
      type: 'priority',
      parent: this,
      priority
    });
  }

}

const $P = Symbol.for('SpringPhase');
const HAS_ANIMATED = 1;
const IS_ANIMATING = 2;
const IS_PAUSED = 4;
const hasAnimated = target => (target[$P] & HAS_ANIMATED) > 0;
const isAnimating = target => (target[$P] & IS_ANIMATING) > 0;
const isPaused = target => (target[$P] & IS_PAUSED) > 0;
const setActiveBit = (target, active) => active ? target[$P] |= IS_ANIMATING | HAS_ANIMATED : target[$P] &= ~IS_ANIMATING;
const setPausedBit = (target, paused) => paused ? target[$P] |= IS_PAUSED : target[$P] &= ~IS_PAUSED;

class SpringValue extends FrameValue {
  constructor(arg1, arg2) {
    super();
    this.key = void 0;
    this.animation = new Animation();
    this.queue = void 0;
    this.defaultProps = {};
    this._state = {
      paused: false,
      pauseQueue: new Set(),
      resumeQueue: new Set(),
      timeouts: new Set()
    };
    this._pendingCalls = new Set();
    this._lastCallId = 0;
    this._lastToId = 0;
    this._memoizedDuration = 0;

    if (!react_spring_shared_esm_is.und(arg1) || !react_spring_shared_esm_is.und(arg2)) {
      const props = react_spring_shared_esm_is.obj(arg1) ? react_spring_core_esm_extends({}, arg1) : react_spring_core_esm_extends({}, arg2, {
        from: arg1
      });

      if (react_spring_shared_esm_is.und(props.default)) {
        props.default = true;
      }

      this.start(props);
    }
  }

  get idle() {
    return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
  }

  get goal() {
    return getFluidValue(this.animation.to);
  }

  get velocity() {
    const node = getAnimated(this);
    return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map(node => node.lastVelocity || 0);
  }

  get hasAnimated() {
    return hasAnimated(this);
  }

  get isAnimating() {
    return isAnimating(this);
  }

  get isPaused() {
    return isPaused(this);
  }

  advance(dt) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let {
      config,
      toValues
    } = anim;
    const payload = getPayload(anim.to);

    if (!payload && hasFluidValue(anim.to)) {
      toValues = react_spring_shared_esm_toArray(getFluidValue(anim.to));
    }

    anim.values.forEach((node, i) => {
      if (node.done) return;
      const to = node.constructor == AnimatedString ? 1 : payload ? payload[i].lastPosition : toValues[i];
      let finished = anim.immediate;
      let position = to;

      if (!finished) {
        position = node.lastPosition;

        if (config.tension <= 0) {
          node.done = true;
          return;
        }

        let elapsed = node.elapsedTime += dt;
        const from = anim.fromValues[i];
        const v0 = node.v0 != null ? node.v0 : node.v0 = react_spring_shared_esm_is.arr(config.velocity) ? config.velocity[i] : config.velocity;
        let velocity;

        if (!react_spring_shared_esm_is.und(config.duration)) {
          let p = 1;

          if (config.duration > 0) {
            if (this._memoizedDuration !== config.duration) {
              this._memoizedDuration = config.duration;

              if (node.durationProgress > 0) {
                node.elapsedTime = config.duration * node.durationProgress;
                elapsed = node.elapsedTime += dt;
              }
            }

            p = (config.progress || 0) + elapsed / this._memoizedDuration;
            p = p > 1 ? 1 : p < 0 ? 0 : p;
            node.durationProgress = p;
          }

          position = from + config.easing(p) * (to - from);
          velocity = (position - node.lastPosition) / dt;
          finished = p == 1;
        } else if (config.decay) {
            const decay = config.decay === true ? 0.998 : config.decay;
            const e = Math.exp(-(1 - decay) * elapsed);
            position = from + v0 / (1 - decay) * (1 - e);
            finished = Math.abs(node.lastPosition - position) < 0.1;
            velocity = v0 * e;
          } else {
              velocity = node.lastVelocity == null ? v0 : node.lastVelocity;
              const precision = config.precision || (from == to ? 0.005 : Math.min(1, Math.abs(to - from) * 0.001));
              const restVelocity = config.restVelocity || precision / 10;
              const bounceFactor = config.clamp ? 0 : config.bounce;
              const canBounce = !react_spring_shared_esm_is.und(bounceFactor);
              const isGrowing = from == to ? node.v0 > 0 : from < to;
              let isMoving;
              let isBouncing = false;
              const step = 1;
              const numSteps = Math.ceil(dt / step);

              for (let n = 0; n < numSteps; ++n) {
                isMoving = Math.abs(velocity) > restVelocity;

                if (!isMoving) {
                  finished = Math.abs(to - position) <= precision;

                  if (finished) {
                    break;
                  }
                }

                if (canBounce) {
                  isBouncing = position == to || position > to == isGrowing;

                  if (isBouncing) {
                    velocity = -velocity * bounceFactor;
                    position = to;
                  }
                }

                const springForce = -config.tension * 0.000001 * (position - to);
                const dampingForce = -config.friction * 0.001 * velocity;
                const acceleration = (springForce + dampingForce) / config.mass;
                velocity = velocity + acceleration * step;
                position = position + velocity * step;
              }
            }

        node.lastVelocity = velocity;

        if (Number.isNaN(position)) {
          console.warn(`Got NaN while animating:`, this);
          finished = true;
        }
      }

      if (payload && !payload[i].done) {
        finished = false;
      }

      if (finished) {
        node.done = true;
      } else {
        idle = false;
      }

      if (node.setValue(position, config.round)) {
        changed = true;
      }
    });
    const node = getAnimated(this);
    const currVal = node.getValue();

    if (idle) {
      const finalVal = getFluidValue(anim.to);

      if ((currVal !== finalVal || changed) && !config.decay) {
        node.setValue(finalVal);

        this._onChange(finalVal);
      } else if (changed && config.decay) {
        this._onChange(currVal);
      }

      this._stop();
    } else if (changed) {
      this._onChange(currVal);
    }
  }

  set(value) {
    raf.batchedUpdates(() => {
      this._stop();

      this._focus(value);

      this._set(value);
    });
    return this;
  }

  pause() {
    this._update({
      pause: true
    });
  }

  resume() {
    this._update({
      pause: false
    });
  }

  finish() {
    if (isAnimating(this)) {
      const {
        to,
        config
      } = this.animation;
      raf.batchedUpdates(() => {
        this._onStart();

        if (!config.decay) {
          this._set(to, false);
        }

        this._stop();
      });
    }

    return this;
  }

  update(props) {
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }

  start(to, arg2) {
    let queue;

    if (!react_spring_shared_esm_is.und(to)) {
      queue = [react_spring_shared_esm_is.obj(to) ? to : react_spring_core_esm_extends({}, arg2, {
        to
      })];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }

    return Promise.all(queue.map(props => this._update(props))).then(results => getCombinedResult(this, results));
  }

  stop(cancel) {
    const {
      to
    } = this.animation;

    this._focus(this.get());

    stopAsync(this._state, cancel && this._lastCallId);
    raf.batchedUpdates(() => this._stop(to, cancel));
    return this;
  }

  reset() {
    this._update({
      reset: true
    });
  }

  eventObserved(event) {
    if (event.type == 'change') {
      this._start();
    } else if (event.type == 'priority') {
      this.priority = event.priority + 1;
    }
  }

  _prepareNode(props) {
    const key = this.key || '';
    let {
      to,
      from
    } = props;
    to = react_spring_shared_esm_is.obj(to) ? to[key] : to;

    if (to == null || isAsyncTo(to)) {
      to = undefined;
    }

    from = react_spring_shared_esm_is.obj(from) ? from[key] : from;

    if (from == null) {
      from = undefined;
    }

    const range = {
      to,
      from
    };

    if (!hasAnimated(this)) {
      if (props.reverse) [to, from] = [from, to];
      from = getFluidValue(from);

      if (!react_spring_shared_esm_is.und(from)) {
        this._set(from);
      } else if (!getAnimated(this)) {
          this._set(to);
        }
    }

    return range;
  }

  _update(_ref, isLoop) {
    let props = react_spring_core_esm_extends({}, _ref);

    const {
      key,
      defaultProps
    } = this;
    if (props.default) Object.assign(defaultProps, getDefaultProps(props, (value, prop) => /^on/.test(prop) ? resolveProp(value, key) : value));
    mergeActiveFn(this, props, 'onProps');
    sendEvent(this, 'onProps', props, this);

    const range = this._prepareNode(props);

    if (Object.isFrozen(this)) {
      throw Error('Cannot animate a `SpringValue` object that is frozen. ' + 'Did you forget to pass your component to `animated(...)` before animating its props?');
    }

    const state = this._state;
    return scheduleProps(++this._lastCallId, {
      key,
      props,
      defaultProps,
      state,
      actions: {
        pause: () => {
          if (!isPaused(this)) {
            setPausedBit(this, true);
            flushCalls(state.pauseQueue);
            sendEvent(this, 'onPause', getFinishedResult(this, checkFinished(this, this.animation.to)), this);
          }
        },
        resume: () => {
          if (isPaused(this)) {
            setPausedBit(this, false);

            if (isAnimating(this)) {
              this._resume();
            }

            flushCalls(state.resumeQueue);
            sendEvent(this, 'onResume', getFinishedResult(this, checkFinished(this, this.animation.to)), this);
          }
        },
        start: this._merge.bind(this, range)
      }
    }).then(result => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);

        if (nextProps) {
          return this._update(nextProps, true);
        }
      }

      return result;
    });
  }

  _merge(range, props, resolve) {
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }

    const hasToProp = !react_spring_shared_esm_is.und(range.to);
    const hasFromProp = !react_spring_shared_esm_is.und(range.from);

    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }

    const {
      key,
      defaultProps,
      animation: anim
    } = this;
    const {
      to: prevTo,
      from: prevFrom
    } = anim;
    let {
      to = prevTo,
      from = prevFrom
    } = range;

    if (hasFromProp && !hasToProp && (!props.default || react_spring_shared_esm_is.und(to))) {
      to = from;
    }

    if (props.reverse) [to, from] = [from, to];
    const hasFromChanged = !isEqual(from, prevFrom);

    if (hasFromChanged) {
      anim.from = from;
    }

    from = getFluidValue(from);
    const hasToChanged = !isEqual(to, prevTo);

    if (hasToChanged) {
      this._focus(to);
    }

    const hasAsyncTo = isAsyncTo(props.to);
    const {
      config
    } = anim;
    const {
      decay,
      velocity
    } = config;

    if (hasToProp || hasFromProp) {
      config.velocity = 0;
    }

    if (props.config && !hasAsyncTo) {
      mergeConfig(config, callProp(props.config, key), props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0);
    }

    let node = getAnimated(this);

    if (!node || react_spring_shared_esm_is.und(to)) {
      return resolve(getFinishedResult(this, true));
    }

    const reset = react_spring_shared_esm_is.und(props.reset) ? hasFromProp && !props.default : !react_spring_shared_esm_is.und(from) && matchProp(props.reset, key);
    const value = reset ? from : this.get();
    const goal = computeGoal(to);
    const isAnimatable = react_spring_shared_esm_is.num(goal) || react_spring_shared_esm_is.arr(goal) || isAnimatedString(goal);
    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));

    if (hasToChanged) {
      const nodeType = getAnimatedType(to);

      if (nodeType !== node.constructor) {
        if (immediate) {
          node = this._set(goal);
        } else throw Error(`Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`);
      }
    }

    const goalType = node.constructor;
    let started = hasFluidValue(to);
    let finished = false;

    if (!started) {
      const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;

      if (hasToChanged || hasValueChanged) {
        finished = isEqual(computeGoal(value), goal);
        started = !finished;
      }

      if (!isEqual(anim.immediate, immediate) && !immediate || !isEqual(config.decay, decay) || !isEqual(config.velocity, velocity)) {
        started = true;
      }
    }

    if (finished && isAnimating(this)) {
      if (anim.changed && !reset) {
        started = true;
      } else if (!started) {
          this._stop(prevTo);
        }
    }

    if (!hasAsyncTo) {
      if (started || hasFluidValue(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = hasFluidValue(to) ? null : goalType == AnimatedString ? [1] : react_spring_shared_esm_toArray(goal);
      }

      if (anim.immediate != immediate) {
        anim.immediate = immediate;

        if (!immediate && !reset) {
          this._set(prevTo);
        }
      }

      if (started) {
        const {
          onRest
        } = anim;
        react_spring_shared_esm_each(ACTIVE_EVENTS, type => mergeActiveFn(this, props, type));
        const result = getFinishedResult(this, checkFinished(this, prevTo));
        flushCalls(this._pendingCalls, result);

        this._pendingCalls.add(resolve);

        if (anim.changed) raf.batchedUpdates(() => {
          anim.changed = !reset;
          onRest == null ? void 0 : onRest(result, this);

          if (reset) {
            callProp(defaultProps.onRest, result);
          } else {
              anim.onStart == null ? void 0 : anim.onStart(result, this);
            }
        });
      }
    }

    if (reset) {
      this._set(value);
    }

    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } else if (started) {
        this._start();
      } else if (isAnimating(this) && !hasToChanged) {
          this._pendingCalls.add(resolve);
        } else {
            resolve(getNoopResult(value));
          }
  }

  _focus(value) {
    const anim = this.animation;

    if (value !== anim.to) {
      if (getFluidObservers(this)) {
        this._detach();
      }

      anim.to = value;

      if (getFluidObservers(this)) {
        this._attach();
      }
    }
  }

  _attach() {
    let priority = 0;
    const {
      to
    } = this.animation;

    if (hasFluidValue(to)) {
      react_spring_shared_esm_addFluidObserver(to, this);

      if (isFrameValue(to)) {
        priority = to.priority + 1;
      }
    }

    this.priority = priority;
  }

  _detach() {
    const {
      to
    } = this.animation;

    if (hasFluidValue(to)) {
      removeFluidObserver(to, this);
    }
  }

  _set(arg, idle = true) {
    const value = getFluidValue(arg);

    if (!react_spring_shared_esm_is.und(value)) {
      const oldNode = getAnimated(this);

      if (!oldNode || !isEqual(value, oldNode.getValue())) {
        const nodeType = getAnimatedType(value);

        if (!oldNode || oldNode.constructor != nodeType) {
          setAnimated(this, nodeType.create(value));
        } else {
          oldNode.setValue(value);
        }

        if (oldNode) {
          raf.batchedUpdates(() => {
            this._onChange(value, idle);
          });
        }
      }
    }

    return getAnimated(this);
  }

  _onStart() {
    const anim = this.animation;

    if (!anim.changed) {
      anim.changed = true;
      sendEvent(this, 'onStart', getFinishedResult(this, checkFinished(this, anim.to)), this);
    }
  }

  _onChange(value, idle) {
    if (!idle) {
      this._onStart();

      callProp(this.animation.onChange, value, this);
    }

    callProp(this.defaultProps.onChange, value, this);

    super._onChange(value, idle);
  }

  _start() {
    const anim = this.animation;
    getAnimated(this).reset(getFluidValue(anim.to));

    if (!anim.immediate) {
      anim.fromValues = anim.values.map(node => node.lastPosition);
    }

    if (!isAnimating(this)) {
      setActiveBit(this, true);

      if (!isPaused(this)) {
        this._resume();
      }
    }
  }

  _resume() {
    if (globals.skipAnimation) {
      this.finish();
    } else {
      frameLoop.start(this);
    }
  }

  _stop(goal, cancel) {
    if (isAnimating(this)) {
      setActiveBit(this, false);
      const anim = this.animation;
      react_spring_shared_esm_each(anim.values, node => {
        node.done = true;
      });

      if (anim.toValues) {
        anim.onChange = anim.onPause = anim.onResume = undefined;
      }

      callFluidObservers(this, {
        type: 'idle',
        parent: this
      });
      const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal != null ? goal : anim.to));
      flushCalls(this._pendingCalls, result);

      if (anim.changed) {
        anim.changed = false;
        sendEvent(this, 'onRest', result, this);
      }
    }
  }

}

function checkFinished(target, to) {
  const goal = computeGoal(to);
  const value = computeGoal(target.get());
  return isEqual(value, goal);
}

function createLoopUpdate(props, loop = props.loop, to = props.to) {
  let loopRet = callProp(loop);

  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate(react_spring_core_esm_extends({}, props, {
      loop,
      default: false,
      pause: undefined,
      to: !reverse || isAsyncTo(to) ? to : undefined,
      from: reset ? props.from : undefined,
      reset
    }, overrides));
  }
}
function createUpdate(props) {
  const {
    to,
    from
  } = props = inferTo(props);
  const keys = new Set();
  if (react_spring_shared_esm_is.obj(to)) findDefined(to, keys);
  if (react_spring_shared_esm_is.obj(from)) findDefined(from, keys);
  props.keys = keys.size ? Array.from(keys) : null;
  return props;
}
function declareUpdate(props) {
  const update = createUpdate(props);

  if (is.und(update.default)) {
    update.default = getDefaultProps(update);
  }

  return update;
}

function findDefined(values, keys) {
  react_spring_shared_esm_eachProp(values, (value, key) => value != null && keys.add(key));
}

const ACTIVE_EVENTS = ['onStart', 'onRest', 'onChange', 'onPause', 'onResume'];

function mergeActiveFn(target, props, type) {
  target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : undefined;
}

function sendEvent(target, type, ...args) {
  var _target$animation$typ, _target$animation, _target$defaultProps$, _target$defaultProps;

  (_target$animation$typ = (_target$animation = target.animation)[type]) == null ? void 0 : _target$animation$typ.call(_target$animation, ...args);
  (_target$defaultProps$ = (_target$defaultProps = target.defaultProps)[type]) == null ? void 0 : _target$defaultProps$.call(_target$defaultProps, ...args);
}

const BATCHED_EVENTS = ['onStart', 'onChange', 'onRest'];
let nextId = 1;
class Controller {
  constructor(props, flush) {
    this.id = nextId++;
    this.springs = {};
    this.queue = [];
    this.ref = void 0;
    this._flush = void 0;
    this._initialProps = void 0;
    this._lastAsyncId = 0;
    this._active = new Set();
    this._changed = new Set();
    this._started = false;
    this._item = void 0;
    this._state = {
      paused: false,
      pauseQueue: new Set(),
      resumeQueue: new Set(),
      timeouts: new Set()
    };
    this._events = {
      onStart: new Map(),
      onChange: new Map(),
      onRest: new Map()
    };
    this._onFrame = this._onFrame.bind(this);

    if (flush) {
      this._flush = flush;
    }

    if (props) {
      this.start(react_spring_core_esm_extends({
        default: true
      }, props));
    }
  }

  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every(spring => spring.idle);
  }

  get item() {
    return this._item;
  }

  set item(item) {
    this._item = item;
  }

  get() {
    const values = {};
    this.each((spring, key) => values[key] = spring.get());
    return values;
  }

  set(values) {
    for (const key in values) {
      const value = values[key];

      if (!react_spring_shared_esm_is.und(value)) {
        this.springs[key].set(value);
      }
    }
  }

  update(props) {
    if (props) {
      this.queue.push(createUpdate(props));
    }

    return this;
  }

  start(props) {
    let {
      queue
    } = this;

    if (props) {
      queue = react_spring_shared_esm_toArray(props).map(createUpdate);
    } else {
      this.queue = [];
    }

    if (this._flush) {
      return this._flush(this, queue);
    }

    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }

  stop(arg, keys) {
    if (arg !== !!arg) {
      keys = arg;
    }

    if (keys) {
      const springs = this.springs;
      react_spring_shared_esm_each(react_spring_shared_esm_toArray(keys), key => springs[key].stop(!!arg));
    } else {
      stopAsync(this._state, this._lastAsyncId);
      this.each(spring => spring.stop(!!arg));
    }

    return this;
  }

  pause(keys) {
    if (react_spring_shared_esm_is.und(keys)) {
      this.start({
        pause: true
      });
    } else {
      const springs = this.springs;
      react_spring_shared_esm_each(react_spring_shared_esm_toArray(keys), key => springs[key].pause());
    }

    return this;
  }

  resume(keys) {
    if (react_spring_shared_esm_is.und(keys)) {
      this.start({
        pause: false
      });
    } else {
      const springs = this.springs;
      react_spring_shared_esm_each(react_spring_shared_esm_toArray(keys), key => springs[key].resume());
    }

    return this;
  }

  each(iterator) {
    react_spring_shared_esm_eachProp(this.springs, iterator);
  }

  _onFrame() {
    const {
      onStart,
      onChange,
      onRest
    } = this._events;
    const active = this._active.size > 0;
    const changed = this._changed.size > 0;

    if (active && !this._started || changed && !this._started) {
      this._started = true;
      flush(onStart, ([onStart, result]) => {
        result.value = this.get();
        onStart(result, this, this._item);
      });
    }

    const idle = !active && this._started;
    const values = changed || idle && onRest.size ? this.get() : null;

    if (changed && onChange.size) {
      flush(onChange, ([onChange, result]) => {
        result.value = values;
        onChange(result, this, this._item);
      });
    }

    if (idle) {
      this._started = false;
      flush(onRest, ([onRest, result]) => {
        result.value = values;
        onRest(result, this, this._item);
      });
    }
  }

  eventObserved(event) {
    if (event.type == 'change') {
      this._changed.add(event.parent);

      if (!event.idle) {
        this._active.add(event.parent);
      }
    } else if (event.type == 'idle') {
      this._active.delete(event.parent);
    } else return;

    raf.onFrame(this._onFrame);
  }

}
function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map(props => flushUpdate(ctrl, props))).then(results => getCombinedResult(ctrl, results));
}
async function flushUpdate(ctrl, props, isLoop) {
  const {
    keys,
    to,
    from,
    loop,
    onRest,
    onResolve
  } = props;
  const defaults = react_spring_shared_esm_is.obj(props.default) && props.default;

  if (loop) {
    props.loop = false;
  }

  if (to === false) props.to = null;
  if (from === false) props.from = null;
  const asyncTo = react_spring_shared_esm_is.arr(to) || react_spring_shared_esm_is.fun(to) ? to : undefined;

  if (asyncTo) {
    props.to = undefined;
    props.onRest = undefined;

    if (defaults) {
      defaults.onRest = undefined;
    }
  } else {
      react_spring_shared_esm_each(BATCHED_EVENTS, key => {
        const handler = props[key];

        if (react_spring_shared_esm_is.fun(handler)) {
          const queue = ctrl['_events'][key];

          props[key] = ({
            finished,
            cancelled
          }) => {
            const result = queue.get(handler);

            if (result) {
              if (!finished) result.finished = false;
              if (cancelled) result.cancelled = true;
            } else {
              queue.set(handler, {
                value: null,
                finished: finished || false,
                cancelled: cancelled || false
              });
            }
          };

          if (defaults) {
            defaults[key] = props[key];
          }
        }
      });
    }

  const state = ctrl['_state'];

  if (props.pause === !state.paused) {
    state.paused = props.pause;
    flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
  } else if (state.paused) {
      props.pause = true;
    }

  const promises = (keys || Object.keys(ctrl.springs)).map(key => ctrl.springs[key].start(props));
  const cancel = props.cancel === true || getDefaultProp(props, 'cancel') === true;

  if (asyncTo || cancel && state.asyncId) {
    promises.push(scheduleProps(++ctrl['_lastAsyncId'], {
      props,
      state,
      actions: {
        pause: noop,
        resume: noop,

        start(props, resolve) {
          if (cancel) {
            stopAsync(state, ctrl['_lastAsyncId']);
            resolve(getCancelledResult(ctrl));
          } else {
            props.onRest = onRest;
            resolve(runAsync(asyncTo, props, state, ctrl));
          }
        }

      }
    }));
  }

  if (state.paused) {
    await new Promise(resume => {
      state.resumeQueue.add(resume);
    });
  }

  const result = getCombinedResult(ctrl, await Promise.all(promises));

  if (loop && result.finished && !(isLoop && result.noop)) {
    const nextProps = createLoopUpdate(props, loop, to);

    if (nextProps) {
      prepareKeys(ctrl, [nextProps]);
      return flushUpdate(ctrl, nextProps, true);
    }
  }

  if (onResolve) {
    raf.batchedUpdates(() => onResolve(result, ctrl, ctrl.item));
  }

  return result;
}
function getSprings(ctrl, props) {
  const springs = react_spring_core_esm_extends({}, ctrl.springs);

  if (props) {
    each(toArray(props), props => {
      if (is.und(props.keys)) {
        props = createUpdate(props);
      }

      if (!is.obj(props.to)) {
        props = react_spring_core_esm_extends({}, props, {
          to: undefined
        });
      }

      prepareSprings(springs, props, key => {
        return createSpring(key);
      });
    });
  }

  setSprings(ctrl, springs);
  return springs;
}
function setSprings(ctrl, springs) {
  eachProp(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      addFluidObserver(spring, ctrl);
    }
  });
}

function createSpring(key, observer) {
  const spring = new SpringValue();
  spring.key = key;

  if (observer) {
    react_spring_shared_esm_addFluidObserver(spring, observer);
  }

  return spring;
}

function prepareSprings(springs, props, create) {
  if (props.keys) {
    react_spring_shared_esm_each(props.keys, key => {
      const spring = springs[key] || (springs[key] = create(key));
      spring['_prepareNode'](props);
    });
  }
}

function prepareKeys(ctrl, queue) {
  react_spring_shared_esm_each(queue, props => {
    prepareSprings(ctrl.springs, props, key => {
      return createSpring(key, ctrl);
    });
  });
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const _excluded$3 = ["children"];
const SpringContext = _ref => {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  const inherited = (0,index_js_.useContext)(ctx);
  const pause = props.pause || !!inherited.pause,
        immediate = props.immediate || !!inherited.immediate;
  props = useMemoOne(() => ({
    pause,
    immediate
  }), [pause, immediate]);
  const {
    Provider
  } = ctx;
  return index_js_.createElement(Provider, {
    value: props
  }, children);
};
const ctx = makeContext(SpringContext, {});
SpringContext.Provider = ctx.Provider;
SpringContext.Consumer = ctx.Consumer;

function makeContext(target, init) {
  Object.assign(target, index_js_.createContext(init));
  target.Provider._context = target;
  target.Consumer._context = target;
  return target;
}

const SpringRef = () => {
  const current = [];

  const SpringRef = function SpringRef(props) {
    deprecateDirectCall();
    const results = [];
    each(current, (ctrl, i) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update = _getProps(props, ctrl, i);

        if (update) {
          results.push(ctrl.start(update));
        }
      }
    });
    return results;
  };

  SpringRef.current = current;

  SpringRef.add = function (ctrl) {
    if (!current.includes(ctrl)) {
      current.push(ctrl);
    }
  };

  SpringRef.delete = function (ctrl) {
    const i = current.indexOf(ctrl);
    if (~i) current.splice(i, 1);
  };

  SpringRef.pause = function () {
    each(current, ctrl => ctrl.pause(...arguments));
    return this;
  };

  SpringRef.resume = function () {
    each(current, ctrl => ctrl.resume(...arguments));
    return this;
  };

  SpringRef.set = function (values) {
    each(current, ctrl => ctrl.set(values));
  };

  SpringRef.start = function (props) {
    const results = [];
    each(current, (ctrl, i) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update = this._getProps(props, ctrl, i);

        if (update) {
          results.push(ctrl.start(update));
        }
      }
    });
    return results;
  };

  SpringRef.stop = function () {
    each(current, ctrl => ctrl.stop(...arguments));
    return this;
  };

  SpringRef.update = function (props) {
    each(current, (ctrl, i) => ctrl.update(this._getProps(props, ctrl, i)));
    return this;
  };

  const _getProps = function _getProps(arg, ctrl, index) {
    return is.fun(arg) ? arg(index, ctrl) : arg;
  };

  SpringRef._getProps = _getProps;
  return SpringRef;
};

function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps) deps = [];
  const ref = useMemo(() => propsFn || arguments.length == 3 ? SpringRef() : void 0, []);
  const layoutId = useRef(0);
  const forceUpdate = useForceUpdate();
  const state = useMemo(() => ({
    ctrls: [],
    queue: [],

    flush(ctrl, updates) {
      const springs = getSprings(ctrl, updates);
      const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs).some(key => !ctrl.springs[key]);
      return canFlushSync ? flushUpdateQueue(ctrl, updates) : new Promise(resolve => {
        setSprings(ctrl, springs);
        state.queue.push(() => {
          resolve(flushUpdateQueue(ctrl, updates));
        });
        forceUpdate();
      });
    }

  }), []);
  const ctrls = useRef([...state.ctrls]);
  const updates = [];
  const prevLength = usePrev(length) || 0;
  useMemo(() => {
    each(ctrls.current.slice(length, prevLength), ctrl => {
      detachRefs(ctrl, ref);
      ctrl.stop(true);
    });
    ctrls.current.length = length;
    declareUpdates(prevLength, length);
  }, [length]);
  useMemo(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);

  function declareUpdates(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      const ctrl = ctrls.current[i] || (ctrls.current[i] = new Controller(null, state.flush));
      const update = propsFn ? propsFn(i, ctrl) : props[i];

      if (update) {
        updates[i] = declareUpdate(update);
      }
    }
  }

  const springs = ctrls.current.map((ctrl, i) => getSprings(ctrl, updates[i]));
  const context = useContext(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useLayoutEffect(() => {
    layoutId.current++;
    state.ctrls = ctrls.current;
    const {
      queue
    } = state;

    if (queue.length) {
      state.queue = [];
      each(queue, cb => cb());
    }

    each(ctrls.current, (ctrl, i) => {
      ref == null ? void 0 : ref.add(ctrl);

      if (hasContext) {
        ctrl.start({
          default: context
        });
      }

      const update = updates[i];

      if (update) {
        replaceRef(ctrl, update.ref);

        if (ctrl.ref) {
          ctrl.queue.push(update);
        } else {
          ctrl.start(update);
        }
      }
    });
  });
  useOnce(() => () => {
    each(state.ctrls, ctrl => ctrl.stop(true));
  });
  const values = springs.map(x => react_spring_core_esm_extends({}, x));
  return ref ? [values, ref] : values;
}

function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], ref] = useSprings(1, isFn ? props : [props], isFn ? deps || [] : deps);
  return isFn || arguments.length == 2 ? [values, ref] : values;
}

const initSpringRef = () => SpringRef();

const useSpringRef = () => useState(initSpringRef)[0];

function useTrail(length, propsArg, deps) {
  const propsFn = is.fun(propsArg) && propsArg;
  if (propsFn && !deps) deps = [];
  let reverse = true;
  const result = useSprings(length, (i, ctrl) => {
    const props = propsFn ? propsFn(i, ctrl) : propsArg;
    reverse = reverse && props.reverse;
    return props;
  }, deps || [{}]);
  const ref = result[1];
  useLayoutEffect(() => {
    each(ref.current, (ctrl, i) => {
      const parent = ref.current[i + (reverse ? 1 : -1)];
      if (parent) ctrl.start({
        to: parent.springs
      });
    });
  }, deps);

  if (propsFn || arguments.length == 3) {
    ref['_getProps'] = (propsArg, ctrl, i) => {
      const props = is.fun(propsArg) ? propsArg(i, ctrl) : propsArg;

      if (props) {
        const parent = ref.current[i + (props.reverse ? 1 : -1)];
        if (parent) props.to = parent.springs;
        return props;
      }
    };

    return result;
  }

  return result[0];
}

let TransitionPhase;

(function (TransitionPhase) {
  TransitionPhase["MOUNT"] = "mount";
  TransitionPhase["ENTER"] = "enter";
  TransitionPhase["UPDATE"] = "update";
  TransitionPhase["LEAVE"] = "leave";
})(TransitionPhase || (TransitionPhase = {}));

function useTransition(data, props, deps) {
  const propsFn = is.fun(props) && props;
  const {
    reset,
    sort,
    trail = 0,
    expires = true,
    onDestroyed,
    ref: propsRef,
    config: propsConfig
  } = propsFn ? propsFn() : props;
  const ref = useMemo(() => propsFn || arguments.length == 3 ? SpringRef() : void 0, []);
  const items = toArray(data);
  const transitions = [];
  const usedTransitions = useRef(null);
  const prevTransitions = reset ? null : usedTransitions.current;
  useLayoutEffect(() => {
    usedTransitions.current = transitions;
  });
  useOnce(() => () => each(usedTransitions.current, t => {
    if (t.expired) {
      clearTimeout(t.expirationId);
    }

    detachRefs(t.ctrl, ref);
    t.ctrl.stop(true);
  }));
  const keys = getKeys(items, propsFn ? propsFn() : props, prevTransitions);
  const expired = reset && usedTransitions.current || [];
  useLayoutEffect(() => each(expired, ({
    ctrl,
    item,
    key
  }) => {
    detachRefs(ctrl, ref);
    callProp(onDestroyed, item, key);
  }));
  const reused = [];
  if (prevTransitions) each(prevTransitions, (t, i) => {
    if (t.expired) {
      clearTimeout(t.expirationId);
      expired.push(t);
    } else {
      i = reused[i] = keys.indexOf(t.key);
      if (~i) transitions[i] = t;
    }
  });
  each(items, (item, i) => {
    if (!transitions[i]) {
      transitions[i] = {
        key: keys[i],
        item,
        phase: TransitionPhase.MOUNT,
        ctrl: new Controller()
      };
      transitions[i].ctrl.item = item;
    }
  });

  if (reused.length) {
    let i = -1;
    const {
      leave
    } = propsFn ? propsFn() : props;
    each(reused, (keyIndex, prevIndex) => {
      const t = prevTransitions[prevIndex];

      if (~keyIndex) {
        i = transitions.indexOf(t);
        transitions[i] = react_spring_core_esm_extends({}, t, {
          item: items[keyIndex]
        });
      } else if (leave) {
        transitions.splice(++i, 0, t);
      }
    });
  }

  if (is.fun(sort)) {
    transitions.sort((a, b) => sort(a.item, b.item));
  }

  let delay = -trail;
  const forceUpdate = useForceUpdate();
  const defaultProps = getDefaultProps(props);
  const changes = new Map();
  each(transitions, (t, i) => {
    const key = t.key;
    const prevPhase = t.phase;
    const p = propsFn ? propsFn() : props;
    let to;
    let phase;
    let propsDelay = callProp(p.delay || 0, key);

    if (prevPhase == TransitionPhase.MOUNT) {
      to = p.enter;
      phase = TransitionPhase.ENTER;
    } else {
      const isLeave = keys.indexOf(key) < 0;

      if (prevPhase != TransitionPhase.LEAVE) {
        if (isLeave) {
          to = p.leave;
          phase = TransitionPhase.LEAVE;
        } else if (to = p.update) {
          phase = TransitionPhase.UPDATE;
        } else return;
      } else if (!isLeave) {
        to = p.enter;
        phase = TransitionPhase.ENTER;
      } else return;
    }

    to = callProp(to, t.item, i);
    to = is.obj(to) ? inferTo(to) : {
      to
    };

    if (!to.config) {
      const config = propsConfig || defaultProps.config;
      to.config = callProp(config, t.item, i, phase);
    }

    delay += trail;

    const payload = react_spring_core_esm_extends({}, defaultProps, {
      delay: propsDelay + delay,
      ref: propsRef,
      immediate: p.immediate,
      reset: false
    }, to);

    if (phase == TransitionPhase.ENTER && is.und(payload.from)) {
      const _p = propsFn ? propsFn() : props;

      const from = is.und(_p.initial) || prevTransitions ? _p.from : _p.initial;
      payload.from = callProp(from, t.item, i);
    }

    const {
      onResolve
    } = payload;

    payload.onResolve = result => {
      callProp(onResolve, result);
      const transitions = usedTransitions.current;
      const t = transitions.find(t => t.key === key);
      if (!t) return;

      if (result.cancelled && t.phase != TransitionPhase.UPDATE) {
        return;
      }

      if (t.ctrl.idle) {
        const idle = transitions.every(t => t.ctrl.idle);

        if (t.phase == TransitionPhase.LEAVE) {
          const expiry = callProp(expires, t.item);

          if (expiry !== false) {
            const expiryMs = expiry === true ? 0 : expiry;
            t.expired = true;

            if (!idle && expiryMs > 0) {
              if (expiryMs <= 0x7fffffff) t.expirationId = setTimeout(forceUpdate, expiryMs);
              return;
            }
          }
        }

        if (idle && transitions.some(t => t.expired)) {
          forceUpdate();
        }
      }
    };

    const springs = getSprings(t.ctrl, payload);
    changes.set(t, {
      phase,
      springs,
      payload
    });
  });
  const context = useContext(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useLayoutEffect(() => {
    if (hasContext) each(transitions, t => {
      t.ctrl.start({
        default: context
      });
    });
  }, [context]);
  useLayoutEffect(() => {
    each(changes, ({
      phase,
      payload
    }, t) => {
      const {
        ctrl
      } = t;
      t.phase = phase;
      ref == null ? void 0 : ref.add(ctrl);

      if (hasContext && phase == TransitionPhase.ENTER) {
        ctrl.start({
          default: context
        });
      }

      if (payload) {
        replaceRef(ctrl, payload.ref);

        if (ctrl.ref) {
          ctrl.update(payload);
        } else {
          ctrl.start(payload);
        }
      }
    });
  }, reset ? void 0 : deps);

  const renderTransitions = render => React.createElement(React.Fragment, null, transitions.map((t, i) => {
    const {
      springs
    } = changes.get(t) || t.ctrl;
    const elem = render(react_spring_core_esm_extends({}, springs), t.item, t, i);
    return elem && elem.type ? React.createElement(elem.type, react_spring_core_esm_extends({}, elem.props, {
      key: is.str(t.key) || is.num(t.key) ? t.key : t.ctrl.id,
      ref: elem.ref
    })) : elem;
  }));

  return ref ? [renderTransitions, ref] : renderTransitions;
}
let nextKey = 1;

function getKeys(items, {
  key,
  keys = key
}, prevTransitions) {
  if (keys === null) {
    const reused = new Set();
    return items.map(item => {
      const t = prevTransitions && prevTransitions.find(t => t.item === item && t.phase !== TransitionPhase.LEAVE && !reused.has(t));

      if (t) {
        reused.add(t);
        return t.key;
      }

      return nextKey++;
    });
  }

  return is.und(keys) ? items : is.fun(keys) ? items.map(keys) : toArray(keys);
}

const _excluded$2 = (/* unused pure expression or super */ null && (["children"]));
function Spring(_ref) {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  return children(useSpring(props));
}

const _excluded$1 = (/* unused pure expression or super */ null && (["items", "children"]));
function Trail(_ref) {
  let {
    items,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  const trails = useTrail(items.length, props);
  return items.map((item, index) => {
    const result = children(item, index);
    return is.fun(result) ? result(trails[index]) : result;
  });
}

const _excluded = (/* unused pure expression or super */ null && (["items", "children"]));
function Transition(_ref) {
  let {
    items,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return useTransition(items, props)(children);
}

class Interpolation extends FrameValue {
  constructor(source, args) {
    super();
    this.key = void 0;
    this.idle = true;
    this.calc = void 0;
    this._active = new Set();
    this.source = source;
    this.calc = createInterpolator(...args);

    const value = this._get();

    const nodeType = getAnimatedType(value);
    setAnimated(this, nodeType.create(value));
  }

  advance(_dt) {
    const value = this._get();

    const oldValue = this.get();

    if (!isEqual(value, oldValue)) {
      getAnimated(this).setValue(value);

      this._onChange(value, this.idle);
    }

    if (!this.idle && checkIdle(this._active)) {
      becomeIdle(this);
    }
  }

  _get() {
    const inputs = react_spring_shared_esm_is.arr(this.source) ? this.source.map(getFluidValue) : react_spring_shared_esm_toArray(getFluidValue(this.source));
    return this.calc(...inputs);
  }

  _start() {
    if (this.idle && !checkIdle(this._active)) {
      this.idle = false;
      react_spring_shared_esm_each(getPayload(this), node => {
        node.done = false;
      });

      if (globals.skipAnimation) {
        raf.batchedUpdates(() => this.advance());
        becomeIdle(this);
      } else {
        frameLoop.start(this);
      }
    }
  }

  _attach() {
    let priority = 1;
    react_spring_shared_esm_each(react_spring_shared_esm_toArray(this.source), source => {
      if (hasFluidValue(source)) {
        react_spring_shared_esm_addFluidObserver(source, this);
      }

      if (isFrameValue(source)) {
        if (!source.idle) {
          this._active.add(source);
        }

        priority = Math.max(priority, source.priority + 1);
      }
    });
    this.priority = priority;

    this._start();
  }

  _detach() {
    react_spring_shared_esm_each(react_spring_shared_esm_toArray(this.source), source => {
      if (hasFluidValue(source)) {
        removeFluidObserver(source, this);
      }
    });

    this._active.clear();

    becomeIdle(this);
  }

  eventObserved(event) {
    if (event.type == 'change') {
      if (event.idle) {
        this.advance();
      } else {
        this._active.add(event.parent);

        this._start();
      }
    } else if (event.type == 'idle') {
        this._active.delete(event.parent);
      } else if (event.type == 'priority') {
          this.priority = react_spring_shared_esm_toArray(this.source).reduce((highest, parent) => Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1), 0);
        }
  }

}

function isIdle(source) {
  return source.idle !== false;
}

function checkIdle(active) {
  return !active.size || Array.from(active).every(isIdle);
}

function becomeIdle(self) {
  if (!self.idle) {
    self.idle = true;
    react_spring_shared_esm_each(getPayload(self), node => {
      node.done = true;
    });
    callFluidObservers(self, {
      type: 'idle',
      parent: self
    });
  }
}

const react_spring_core_esm_to = (source, ...args) => new Interpolation(source, args);
const react_spring_core_esm_interpolate = (source, ...args) => (deprecateInterpolate(), new Interpolation(source, args));

globals.assign({
  createStringInterpolator: createStringInterpolator,
  to: (source, args) => new Interpolation(source, args)
});
const react_spring_core_esm_update = frameLoop.advance;



// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(3935);
;// CONCATENATED MODULE: ./node_modules/@react-spring/web/dist/react-spring-web.esm.js






function react_spring_web_esm_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const react_spring_web_esm_excluded$2 = ["style", "children", "scrollTop", "scrollLeft"];
const isCustomPropRE = /^--/;

function dangerousStyleValue(name, value) {
  if (value == null || typeof value === 'boolean' || value === '') return '';
  if (typeof value === 'number' && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + 'px';
  return ('' + value).trim();
}

const attributeCache = {};
function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }

  const isFilterElement = instance.nodeName === 'filter' || instance.parentNode && instance.parentNode.nodeName === 'filter';

  const _ref = props,
        {
    style,
    children,
    scrollTop,
    scrollLeft
  } = _ref,
        attributes = react_spring_web_esm_objectWithoutPropertiesLoose(_ref, react_spring_web_esm_excluded$2);

  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(name => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, n => '-' + n.toLowerCase())));

  if (children !== void 0) {
    instance.textContent = children;
  }

  for (let name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue(name, style[name]);

      if (isCustomPropRE.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }

  names.forEach((name, i) => {
    instance.setAttribute(name, values[i]);
  });

  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }

  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
}
let isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

const prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);

const prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach(prefix => acc[prefixKey(prefix, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);

const react_spring_web_esm_excluded$1 = ["x", "y", "z"];
const domTransforms = /^(matrix|translate|scale|rotate|skew)/;
const pxTransforms = /^(translate)/;
const degTransforms = /^(rotate|skew)/;

const addUnit = (value, unit) => react_spring_shared_esm_is.num(value) && value !== 0 ? value + unit : value;

const isValueIdentity = (value, id) => react_spring_shared_esm_is.arr(value) ? value.every(v => isValueIdentity(v, id)) : react_spring_shared_esm_is.num(value) ? value === id : parseFloat(value) === id;

class AnimatedStyle extends AnimatedObject {
  constructor(_ref) {
    let {
      x,
      y,
      z
    } = _ref,
        style = react_spring_web_esm_objectWithoutPropertiesLoose(_ref, react_spring_web_esm_excluded$1);

    const inputs = [];
    const transforms = [];

    if (x || y || z) {
      inputs.push([x || 0, y || 0, z || 0]);
      transforms.push(xyz => [`translate3d(${xyz.map(v => addUnit(v, 'px')).join(',')})`, isValueIdentity(xyz, 0)]);
    }

    react_spring_shared_esm_eachProp(style, (value, key) => {
      if (key === 'transform') {
        inputs.push([value || '']);
        transforms.push(transform => [transform, transform === '']);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (react_spring_shared_esm_is.und(value)) return;
        const unit = pxTransforms.test(key) ? 'px' : degTransforms.test(key) ? 'deg' : '';
        inputs.push(react_spring_shared_esm_toArray(value));
        transforms.push(key === 'rotate3d' ? ([x, y, z, deg]) => [`rotate3d(${x},${y},${z},${addUnit(deg, unit)})`, isValueIdentity(deg, 0)] : input => [`${key}(${input.map(v => addUnit(v, unit)).join(',')})`, isValueIdentity(input, key.startsWith('scale') ? 1 : 0)]);
      }
    });

    if (inputs.length) {
      style.transform = new FluidTransform(inputs, transforms);
    }

    super(style);
  }

}

class FluidTransform extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this._value = null;
    this.inputs = inputs;
    this.transforms = transforms;
  }

  get() {
    return this._value || (this._value = this._get());
  }

  _get() {
    let transform = '';
    let identity = true;
    react_spring_shared_esm_each(this.inputs, (input, i) => {
      const arg1 = getFluidValue(input[0]);
      const [t, id] = this.transforms[i](react_spring_shared_esm_is.arr(arg1) ? arg1 : input.map(getFluidValue));
      transform += ' ' + t;
      identity = identity && id;
    });
    return identity ? 'none' : transform;
  }

  observerAdded(count) {
    if (count == 1) react_spring_shared_esm_each(this.inputs, input => react_spring_shared_esm_each(input, value => hasFluidValue(value) && react_spring_shared_esm_addFluidObserver(value, this)));
  }

  observerRemoved(count) {
    if (count == 0) react_spring_shared_esm_each(this.inputs, input => react_spring_shared_esm_each(input, value => hasFluidValue(value) && removeFluidObserver(value, this)));
  }

  eventObserved(event) {
    if (event.type == 'change') {
      this._value = null;
    }

    callFluidObservers(this, event);
  }

}

const primitives = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', 'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

const react_spring_web_esm_excluded = ["scrollTop", "scrollLeft"];
globals.assign({
  batchedUpdates: react_dom.unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator,
  colors: colors
});
const host = createHost(primitives, {
  applyAnimatedValues,
  createAnimatedStyle: style => new AnimatedStyle(style),
  getComponentProps: _ref => {
    let props = react_spring_web_esm_objectWithoutPropertiesLoose(_ref, react_spring_web_esm_excluded);

    return props;
  }
});
const animated = host.animated;



;// CONCATENATED MODULE: ./node_modules/@react-spring/parallax/dist/react-spring-parallax.esm.js





function react_spring_parallax_esm_extends() {
  react_spring_parallax_esm_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return react_spring_parallax_esm_extends.apply(this, arguments);
}

function react_spring_parallax_esm_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const react_spring_parallax_esm_excluded = ["horizontal", "factor", "offset", "speed", "sticky"],
      _excluded2 = ["pages", "innerStyle", "config", "enabled", "horizontal", "children"];
const ParentContext = index_js_.createContext(null);

function getScrollType(horizontal) {
  return horizontal ? 'scrollLeft' : 'scrollTop';
}

function mapChildrenRecursive(children, callback) {
  const isReactFragment = node => {
    if (node.type) {
      return node.type === index_js_.Fragment;
    }

    return node === index_js_.Fragment;
  };

  return index_js_.Children.map(children, child => isReactFragment(child) ? mapChildrenRecursive(child.props.children, callback) : callback(child));
}

const START_TRANSLATE_3D = 'translate3d(0px,0px,0px)';
const START_TRANSLATE = 'translate(0px,0px)';
const ParallaxLayer = index_js_.memo(index_js_.forwardRef((_ref, ref) => {
  let {
    horizontal,
    factor = 1,
    offset = 0,
    speed = 0,
    sticky
  } = _ref,
      rest = react_spring_parallax_esm_objectWithoutPropertiesLoose(_ref, react_spring_parallax_esm_excluded);

  const parent = (0,index_js_.useContext)(ParentContext);
  const ctrl = useMemoOne(() => {
    let translate;

    if (sticky) {
      const start = sticky.start || 0;
      translate = start * parent.space;
    } else {
      const targetScroll = Math.floor(offset) * parent.space;
      const distance = parent.space * offset + targetScroll * speed;
      translate = -(parent.current * speed) + distance;
    }

    return new Controller({
      space: sticky ? parent.space : parent.space * factor,
      translate
    });
  }, []);
  const layer = useMemoOne(() => ({
    horizontal: horizontal === undefined || sticky ? parent.horizontal : horizontal,
    sticky: undefined,
    isSticky: false,

    setPosition(height, scrollTop, immediate = false) {
      if (sticky) {
        setSticky(height, scrollTop);
      } else {
        const targetScroll = Math.floor(offset) * height;
        const distance = height * offset + targetScroll * speed;
        ctrl.start({
          translate: -(scrollTop * speed) + distance,
          config: parent.config,
          immediate
        });
      }
    },

    setHeight(height, immediate = false) {
      ctrl.start({
        space: sticky ? height : height * factor,
        config: parent.config,
        immediate
      });
    }

  }), []);
  react_spring_shared_esm_useOnce(() => {
    if (sticky) {
      const start = sticky.start || 0;
      const end = sticky.end || start + 1;
      layer.sticky = {
        start,
        end
      };
    }
  });
  index_js_.useImperativeHandle(ref, () => layer);
  const layerRef = (0,index_js_.useRef)();

  const setSticky = (height, scrollTop) => {
    const start = layer.sticky.start * height;
    const end = layer.sticky.end * height;
    const isSticky = scrollTop >= start && scrollTop <= end;
    if (isSticky === layer.isSticky) return;
    layer.isSticky = isSticky;
    const ref = layerRef.current;
    ref.style.position = isSticky ? 'sticky' : 'absolute';
    ctrl.set({
      translate: isSticky ? 0 : scrollTop < start ? start : end
    });
  };

  react_spring_shared_esm_useOnce(() => {
    if (parent) {
      parent.layers.add(layer);
      parent.update();
      return () => {
        parent.layers.delete(layer);
        parent.update();
      };
    }
  });
  const translate3d = ctrl.springs.translate.to(layer.horizontal ? x => `translate3d(${x}px,0,0)` : y => `translate3d(0,${y}px,0)`);
  return index_js_.createElement(animated.div, react_spring_parallax_esm_extends({}, rest, {
    ref: layerRef,
    style: react_spring_parallax_esm_extends({
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',
      willChange: 'transform',
      [layer.horizontal ? 'height' : 'width']: '100%',
      [layer.horizontal ? 'width' : 'height']: ctrl.springs.space,
      WebkitTransform: translate3d,
      msTransform: translate3d,
      transform: translate3d
    }, rest.style)
  }));
}));
const Parallax = index_js_.memo(index_js_.forwardRef((props, ref) => {
  const [ready, setReady] = (0,index_js_.useState)(false);

  const {
    pages,
    config: config$1 = config.slow,
    enabled = true,
    horizontal = false,
    children
  } = props,
        rest = react_spring_parallax_esm_objectWithoutPropertiesLoose(props, _excluded2);

  const state = useMemoOne(() => ({
    config: config$1,
    horizontal,
    busy: false,
    space: 0,
    current: 0,
    offset: 0,
    controller: new Controller({
      scroll: 0
    }),
    layers: new Set(),
    update: () => update(),
    scrollTo: offset => scrollTo(offset),
    stop: () => state.controller.stop()
  }), []);
  (0,index_js_.useEffect)(() => {
    state.config = config$1;
  }, [config$1]);
  index_js_.useImperativeHandle(ref, () => state);
  const containerRef = (0,index_js_.useRef)();
  const contentRef = (0,index_js_.useRef)();

  const update = () => {
    const container = containerRef.current;
    if (!container) return;
    const spaceProp = horizontal ? 'clientWidth' : 'clientHeight';
    state.space = container[spaceProp];
    const scrollType = getScrollType(horizontal);

    if (enabled) {
      state.current = container[scrollType];
    } else {
      container[scrollType] = state.current = state.offset * state.space;
    }

    const content = contentRef.current;

    if (content) {
      const sizeProp = horizontal ? 'width' : 'height';
      content.style[sizeProp] = `${state.space * pages}px`;
    }

    state.layers.forEach(layer => {
      layer.setHeight(state.space, true);
      layer.setPosition(state.space, state.current, true);
    });
  };

  const scrollTo = offset => {
    const container = containerRef.current;
    const scrollType = getScrollType(horizontal);
    state.offset = offset;
    state.controller.set({
      scroll: state.current
    });
    state.controller.stop().start({
      scroll: offset * state.space,
      config: config$1,

      onChange({
        value: {
          scroll
        }
      }) {
        container[scrollType] = scroll;
      }

    });
  };

  const onScroll = event => {
    if (!state.busy) {
      state.busy = true;
      state.current = event.target[getScrollType(horizontal)];
      raf.onStart(() => {
        state.layers.forEach(layer => layer.setPosition(state.space, state.current));
        state.busy = false;
      });
    }
  };

  (0,index_js_.useEffect)(() => state.update());
  react_spring_shared_esm_useOnce(() => {
    setReady(true);

    const onResize = () => {
      const update = () => state.update();

      raf.onFrame(update);
      setTimeout(update, 150);
    };

    window.addEventListener('resize', onResize, false);
    return () => window.removeEventListener('resize', onResize, false);
  });
  const overflow = enabled ? 'scroll' : 'hidden';
  return index_js_.createElement(animated.div, react_spring_parallax_esm_extends({}, rest, {
    ref: containerRef,
    onScroll: onScroll,
    onWheel: enabled ? state.stop : undefined,
    onTouchStart: enabled ? state.stop : undefined,
    style: react_spring_parallax_esm_extends({
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow,
      overflowY: horizontal ? 'hidden' : overflow,
      overflowX: horizontal ? overflow : 'hidden',
      WebkitOverflowScrolling: 'touch',
      WebkitTransform: START_TRANSLATE,
      msTransform: START_TRANSLATE,
      transform: START_TRANSLATE_3D
    }, rest.style)
  }), ready && index_js_.createElement(index_js_.Fragment, null, index_js_.createElement(animated.div, {
    ref: contentRef,
    style: react_spring_parallax_esm_extends({
      overflow: 'hidden',
      position: 'absolute',
      [horizontal ? 'height' : 'width']: '100%',
      [horizontal ? 'width' : 'height']: state.space * pages,
      WebkitTransform: START_TRANSLATE,
      msTransform: START_TRANSLATE,
      transform: START_TRANSLATE_3D
    }, props.innerStyle)
  }, index_js_.createElement(ParentContext.Provider, {
    value: state
  }, mapChildrenRecursive(children, child => !child.props.sticky && child))), index_js_.createElement(ParentContext.Provider, {
    value: state
  }, mapChildrenRecursive(children, child => child.props.sticky && child))));
}));




/***/ }),

/***/ 4917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2562);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6657);
/* harmony import */ var _seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6003);
const Layout=({children,className=``})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_2__/* .Global */ .xB,{styles:theme=>({"*":{boxSizing:`inherit`,"&:before":{boxSizing:`inherit`},"&:after":{boxSizing:`inherit`}},html:{fontSize:`18px`,WebkitTextSizeAdjust:`100%`},img:{borderStyle:`none`},pre:{fontFamily:`monospace`,fontSize:`1em`},"[hidden]":{display:`none`},"::selection":{backgroundColor:theme.colors.primary,color:theme.colors.background}})}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_seo__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("main",{className:className},children));/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ 6003:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ seo)
});

// EXTERNAL MODULE: external "/Users/luca/Desktop/work/nibyou/code/k-b.dev/node_modules/react/index.js"
var index_js_ = __webpack_require__(2562);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(4593);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(2031);
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/hooks/use-site-metadata.tsx
const useSiteMetadata=()=>{const data=(0,gatsby_browser_entry.useStaticQuery)("318001574");return data.site.siteMetadata;};/* harmony default export */ const use_site_metadata = (useSiteMetadata);
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/seo.tsx
const SEO=({title=``,description=``,pathname=``,image=``,children=null})=>{const site=use_site_metadata();const{siteTitle,siteTitleAlt:defaultTitle,siteUrl,siteDescription:defaultDescription,siteLanguage,siteImage:defaultImage,author}=site;const seo={title:title||defaultTitle,description:description||defaultDescription,url:`${siteUrl}${pathname||``}`,image:`${siteUrl}${image||defaultImage}`};return/*#__PURE__*/index_js_.createElement(Helmet.Helmet,{title:title,defaultTitle:defaultTitle,titleTemplate:`%s | ${siteTitle}`},/*#__PURE__*/index_js_.createElement("html",{lang:siteLanguage}),/*#__PURE__*/index_js_.createElement("meta",{name:"description",content:seo.description}),/*#__PURE__*/index_js_.createElement("meta",{name:"image",content:seo.image}),/*#__PURE__*/index_js_.createElement("meta",{property:"og:title",content:seo.title}),/*#__PURE__*/index_js_.createElement("meta",{property:"og:url",content:seo.url}),/*#__PURE__*/index_js_.createElement("meta",{property:"og:description",content:seo.description}),/*#__PURE__*/index_js_.createElement("meta",{property:"og:image",content:seo.image}),/*#__PURE__*/index_js_.createElement("meta",{property:"og:type",content:"website"}),/*#__PURE__*/index_js_.createElement("meta",{property:"og:image:alt",content:seo.description}),/*#__PURE__*/index_js_.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),/*#__PURE__*/index_js_.createElement("meta",{name:"twitter:title",content:seo.title}),/*#__PURE__*/index_js_.createElement("meta",{name:"twitter:url",content:seo.url}),/*#__PURE__*/index_js_.createElement("meta",{name:"twitter:description",content:seo.description}),/*#__PURE__*/index_js_.createElement("meta",{name:"twitter:image",content:seo.image}),/*#__PURE__*/index_js_.createElement("meta",{name:"twitter:image:alt",content:seo.description}),/*#__PURE__*/index_js_.createElement("meta",{name:"twitter:creator",content:author}),/*#__PURE__*/index_js_.createElement("meta",{name:"gatsby-theme",content:"@lekoarts/gatsby-theme-cara"}),/*#__PURE__*/index_js_.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:(0,gatsby_browser_entry.withPrefix)(`/favicon-32x32.png`)}),/*#__PURE__*/index_js_.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:(0,gatsby_browser_entry.withPrefix)(`/favicon-16x16.png`)}),/*#__PURE__*/index_js_.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:(0,gatsby_browser_entry.withPrefix)(`/apple-touch-icon.png`)}),children);};/* harmony default export */ const seo = (SEO);

/***/ }),

/***/ 1086:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ svg)
});

// EXTERNAL MODULE: external "/Users/luca/Desktop/work/nibyou/code/k-b.dev/node_modules/react/index.js"
var index_js_ = __webpack_require__(2562);
// EXTERNAL MODULE: ./node_modules/theme-ui/dist/theme-ui.esm.js
var theme_ui_esm = __webpack_require__(8733);
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/styles/utils.tsx
const utils_hidden=[`none`,`none`,`block`];
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/svg.tsx
/** @jsx jsx */const icons={triangle:{shape:(0,theme_ui_esm/* jsx */.tZ)("polygon",{strokeWidth:"1px",strokeLinejoin:"round",strokeMiterlimit:"10",points:"14.921,2.27 28.667,25.5 1.175,25.5 "}),viewBox:`0 0 30 30`},circle:{shape:(0,theme_ui_esm/* jsx */.tZ)("path",{d:"M15,30A15,15,0,1,1,30,15,15,15,0,0,1,15,30ZM15,6.23A8.77,8.77,0,1,0,23.77,15,8.77,8.77,0,0,0,15,6.23Z"}),viewBox:`0 0 30 30`},arrowUp:{shape:(0,theme_ui_esm/* jsx */.tZ)(index_js_.Fragment,null,(0,theme_ui_esm/* jsx */.tZ)("path",{d:"M28.74,20.81H1.26a1.26,1.26,0,0,1-1-2L14.16.5a1.25,1.25,0,0,1,1-.5h0a1.24,1.24,0,0,1,1,.51L29.75,18.8a1.25,1.25,0,0,1-1,2ZM3.81,18.29H26.22L15.16,3.37Z"}),` `,(0,theme_ui_esm/* jsx */.tZ)("path",{d:"M28.74,42H1.26a1.28,1.28,0,0,1-1.13-.71A1.26,1.26,0,0,1,.26,40l13.9-18.29a1.28,1.28,0,0,1,1-.5h0a1.24,1.24,0,0,1,1,.51L29.75,40a1.26,1.26,0,0,1,.12,1.32A1.28,1.28,0,0,1,28.74,42ZM3.81,39.47H26.22L15.16,24.55Z"})),viewBox:`0 0 30 42`},upDown:{shape:(0,theme_ui_esm/* jsx */.tZ)(index_js_.Fragment,null,(0,theme_ui_esm/* jsx */.tZ)("path",{d:"M28.74,44.58a1.28,1.28,0,0,1-1-.51L15.16,27.13l-12.89,17a1.26,1.26,0,1,1-2-1.53l13.9-18.29a1.34,1.34,0,0,1,1-.5,1.24,1.24,0,0,1,1,.51L29.75,42.56a1.27,1.27,0,0,1-1,2Z"}),(0,theme_ui_esm/* jsx */.tZ)("path",{d:"M14.83,20.82h0a1.28,1.28,0,0,1-1-.52L.25,2a1.27,1.27,0,0,1,2-1.51L14.84,17.45,27.73.5a1.26,1.26,0,0,1,2,1.53L15.84,20.32A1.28,1.28,0,0,1,14.83,20.82Z"})),viewBox:`0 0 30 44.58`},box:{shape:(0,theme_ui_esm/* jsx */.tZ)("path",{d:"M28,2V28H2V2H28m.13-2H1.88A1.88,1.88,0,0,0,0,1.88V28.13A1.88,1.88,0,0,0,1.88,30H28.13A1.87,1.87,0,0,0,30,28.13V1.88A1.88,1.88,0,0,0,28.13,0Z"}),viewBox:`0 0 30 30`},hexa:{shape:(0,theme_ui_esm/* jsx */.tZ)("polygon",{strokeLinejoin:"round",strokeMiterlimit:"10",points:"27.5,21.904 15,28.809  2.5,21.904 2.5,8.095 15,1.19 27.5,8.095 "}),viewBox:`0 0 30 30`},cross:{shape:(0,theme_ui_esm/* jsx */.tZ)("path",{strokeWidth:"3px",d:"M60.5,50l34.8-34.8c2.9-2.9,2.9-7.6,0-10.5c-2.9-2.9-7.6-2.9-10.5,0L50,39.5L15.2,4.7c-2.9-2.9-7.6-2.9-10.5,0    c-2.9,2.9-2.9,7.6,0,10.5L39.5,50L4.7,84.8c-2.9,2.9-2.9,7.6,0,10.5c1.4,1.4,3.3,2.2,5.2,2.2s3.8-0.7,5.2-2.2L50,60.5l34.8,34.8    c1.4,1.4,3.3,2.2,5.2,2.2c1.9,0,3.8-0.7,5.2-2.2c2.9-2.9,2.9-7.6,0-10.5L60.5,50z"}),viewBox:`0 0 100 100`}};const Svg=({stroke=false,color=``,width,icon,left,top,hiddenMobile=false})=>(0,theme_ui_esm/* jsx */.tZ)("svg",{sx:{position:`absolute`,stroke:stroke?`currentColor`:`none`,fill:stroke?`none`:`currentColor`,display:hiddenMobile?utils_hidden:`block`,color,width,left,top},viewBox:icons[icon].viewBox},icons[icon].shape);/* harmony default export */ const svg = (Svg);

/***/ }),

/***/ 8715:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8733);
/* harmony import */ var _react_spring_parallax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520);
/** @jsx jsx */const Content=({speed,offset,children,className=``,factor=1})=>(0,theme_ui__WEBPACK_IMPORTED_MODULE_1__/* .jsx */ .tZ)(_react_spring_parallax__WEBPACK_IMPORTED_MODULE_0__/* .ParallaxLayer */ ._,{sx:{padding:[3,4,4,5],display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,zIndex:50},speed:speed,offset:offset,factor:factor,className:className},children);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Content);

/***/ }),

/***/ 4680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8733);
/* harmony import */ var _react_spring_parallax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520);
/** @jsx jsx */const Divider=({speed,offset,factor=1,bg=``,fill=``,clipPath=``,children=null,className=``})=>(0,theme_ui__WEBPACK_IMPORTED_MODULE_1__/* .jsx */ .tZ)(_react_spring_parallax__WEBPACK_IMPORTED_MODULE_0__/* .ParallaxLayer */ ._,{sx:{position:`absolute`,width:`full`,height:`full`,background:bg,backgroundColor:bg,"#contact-wave":{color:fill,fill:`currentColor`},clipPath},speed:speed,offset:offset,factor:factor,className:className},children);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Divider);

/***/ }),

/***/ 9830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8733);
/** @jsx jsx */const Inner=({className=``,children})=>(0,theme_ui__WEBPACK_IMPORTED_MODULE_0__/* .jsx */ .tZ)("div",{sx:{width:[`full`,`full`,`full`,`full`,`full`,`2/3`],textAlign:`left`},className:className},children);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inner);

/***/ }),

/***/ 5804:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w6": () => (/* binding */ UpDown),
/* harmony export */   "sr": () => (/* binding */ UpDownWide),
/* harmony export */   "Ry": () => (/* binding */ waveAnimation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2562);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6657);
/** @jsx jsx */const wave=_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .keyframes */ .F4`
  0% {
    d: path("M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z");
  }
  50% {
    d: path("M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z");
  }
  100% {
    d: path("M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 100 Z");
  }
`;const upDown=_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .keyframes */ .F4`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px);
  }
`;const upDownWide=_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .keyframes */ .F4`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(200px);
  }
`;const upDownAnimation=_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .css */ .iv`
  ${upDown} 4s ease-in-out infinite alternate;
`;const upDownWideAnimation=_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .css */ .iv`
  ${upDownWide} 18s ease-in-out infinite alternate;
`;function UpDown({children}){return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .jsx */ .tZ)("div",{css:_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .css */ .iv`
        animation: ${upDownAnimation};
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `},children);}function UpDownWide({children}){return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .jsx */ .tZ)("div",{css:_emotion_react__WEBPACK_IMPORTED_MODULE_1__/* .css */ .iv`
        animation: ${upDownWideAnimation};
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `},children);}const waveAnimation=length=>`${wave} ${length} linear infinite alternate`;

/***/ }),

/***/ 4445:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ cara)
});

// EXTERNAL MODULE: external "/Users/luca/Desktop/work/nibyou/code/k-b.dev/node_modules/react/index.js"
var index_js_ = __webpack_require__(2562);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./node_modules/@react-spring/parallax/dist/react-spring-parallax.esm.js + 5 modules
var react_spring_parallax_esm = __webpack_require__(520);
// EXTERNAL MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/layout.tsx
var layout = __webpack_require__(4917);
// EXTERNAL MODULE: ./node_modules/theme-ui/dist/theme-ui.esm.js
var theme_ui_esm = __webpack_require__(8733);
// EXTERNAL MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/elements/divider.tsx
var divider = __webpack_require__(4680);
// EXTERNAL MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/elements/inner.tsx
var inner = __webpack_require__(9830);
// EXTERNAL MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/elements/content.tsx
var content = __webpack_require__(8715);
// EXTERNAL MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/svg.tsx + 1 modules
var svg = __webpack_require__(1086);
// EXTERNAL MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/styles/animations.tsx
var animations = __webpack_require__(5804);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(4925);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/dist/esm.js
var esm = __webpack_require__(3905);
;// CONCATENATED MODULE: ./src/@lekoarts/gatsby-theme-cara/sections/intro.mdx
const _excluded=["components"];/* @jsx mdx *//* @jsxRuntime classic */ /* @jsx mdx */const _frontmatter={};const layoutProps={_frontmatter};const MDXLayout="wrapper";function MDXContent(_ref){let{components}=_ref,props=(0,objectWithoutProperties/* default */.Z)(_ref,_excluded);return (0,esm/* mdx */.kt)(MDXLayout,Object.assign({},layoutProps,props,{components:components,mdxType:"MDXLayout"}),(0,esm/* mdx */.kt)("h1",null,`K&B Software`),(0,esm/* mdx */.kt)("p",null,`Software, die Menschen verbindet.`));};MDXContent.isMDXComponent=true;
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/hero.tsx
/** @jsx jsx */// @ts-ignore
const Hero=({offset,factor=1})=>(0,theme_ui_esm/* jsx */.tZ)("div",null,(0,theme_ui_esm/* jsx */.tZ)(divider/* default */.Z,{speed:0.2,offset:offset,factor:factor},(0,theme_ui_esm/* jsx */.tZ)(animations/* UpDown */.w6,null,(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",hiddenMobile:true,width:48,stroke:true,color:"icon_orange",left:"10%",top:"20%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"hexa",width:48,stroke:true,color:"icon_red",left:"60%",top:"70%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",width:6,color:"icon_darker",left:"60%",top:"15%"})),(0,theme_ui_esm/* jsx */.tZ)(animations/* UpDownWide */.sr,null,(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"arrowUp",hiddenMobile:true,width:16,color:"icon_blue",left:"80%",top:"10%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",width:12,stroke:true,color:"icon_brightest",left:"90%",top:"50%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:16,color:"icon_darker",left:"70%",top:"90%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",width:16,stroke:true,color:"icon_darkest",left:"30%",top:"65%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"cross",width:16,stroke:true,color:"icon_pink",left:"28%",top:"15%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:6,color:"icon_darkest",left:"75%",top:"10%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:8,color:"icon_darkest",left:"45%",top:"10%"})),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",hiddenMobile:true,width:24,color:"icon_darker",left:"5%",top:"70%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:6,color:"icon_darkest",left:"4%",top:"20%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:12,color:"icon_darkest",left:"50%",top:"60%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"upDown",width:8,color:"icon_darkest",left:"95%",top:"90%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:24,color:"icon_darker",left:"40%",top:"80%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",width:8,stroke:true,color:"icon_darker",left:"25%",top:"5%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:64,color:"icon_green",left:"95%",top:"5%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",hiddenMobile:true,width:64,color:"icon_purple",left:"5%",top:"90%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",width:6,color:"icon_darkest",left:"10%",top:"10%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",width:12,color:"icon_darkest",left:"40%",top:"30%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"hexa",width:16,stroke:true,color:"icon_darker",left:"10%",top:"50%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"hexa",width:8,stroke:true,color:"icon_darker",left:"80%",top:"70%"})),(0,theme_ui_esm/* jsx */.tZ)(content/* default */.Z,{sx:{variant:`texts.bigger`},speed:0.4,offset:offset,factor:factor},(0,theme_ui_esm/* jsx */.tZ)(inner/* default */.Z,null,(0,theme_ui_esm/* jsx */.tZ)(MDXContent,null))));/* harmony default export */ const hero = (Hero);
;// CONCATENATED MODULE: ./src/@lekoarts/gatsby-theme-cara/sections/projects.mdx
const projects_excluded=["components"];/* @jsx mdx *//* @jsxRuntime classic */ /* @jsx mdx */const projects_frontmatter={};const makeShortcode=name=>function MDXDefaultShortcode(props){console.warn("Component "+name+" was not imported, exported, or provided by MDXProvider as global scope");return (0,esm/* mdx */.kt)("div",props);};const ProjectCard=makeShortcode("ProjectCard");const projects_layoutProps={_frontmatter: projects_frontmatter};const projects_MDXLayout="wrapper";function projects_MDXContent(_ref){let{components}=_ref,props=(0,objectWithoutProperties/* default */.Z)(_ref,projects_excluded);return (0,esm/* mdx */.kt)(projects_MDXLayout,Object.assign({},projects_layoutProps,props,{components:components,mdxType:"MDXLayout"}),(0,esm/* mdx */.kt)("h2",null,`Projekte`),(0,esm/* mdx */.kt)(ProjectCard,{title:"Nibyou",link:"https://nibyou.de",bg:"linear-gradient(to right, #98c1c12e 0%, #87b7b7 100%)",mdxType:"ProjectCard"},"Praxissoftware f\xFCr zertifizierte Ern\xE4hrungsberater. Von Organisation bis Therapie - alles aus einer Hand."));};projects_MDXContent.isMDXComponent=true;
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/projects.tsx
/** @jsx jsx */// @ts-ignore
const Projects=({offset,factor=2})=>(0,theme_ui_esm/* jsx */.tZ)("div",null,(0,theme_ui_esm/* jsx */.tZ)(divider/* default */.Z,{bg:"linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)",sx:{clipPath:`polygon(0 15%, 100% 25%, 100% 85%, 0 75%)`},speed:-0.2,offset:1.1,factor:factor}),(0,theme_ui_esm/* jsx */.tZ)(content/* default */.Z,{speed:0.4,offset:offset+0.2,factor:factor},(0,theme_ui_esm/* jsx */.tZ)(inner/* default */.Z,null,(0,theme_ui_esm/* jsx */.tZ)("div",{sx:{display:`grid`,gridGap:[4,4,4,5],gridTemplateColumns:[`1fr`,`1fr`,`repeat(2, 1fr)`],h2:{gridColumn:`-1/1`,color:`white !important`}}},(0,theme_ui_esm/* jsx */.tZ)(projects_MDXContent,null)))),(0,theme_ui_esm/* jsx */.tZ)(divider/* default */.Z,{speed:0.1,offset:offset,factor:factor},(0,theme_ui_esm/* jsx */.tZ)(animations/* UpDown */.w6,null,(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",width:6,color:"icon_brightest",left:"85%",top:"75%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"upDown",width:8,color:"icon_teal",left:"70%",top:"20%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",width:8,stroke:true,color:"icon_orange",left:"25%",top:"5%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",hiddenMobile:true,width:24,color:"icon_brightest",left:"17%",top:"60%"})),(0,theme_ui_esm/* jsx */.tZ)(animations/* UpDownWide */.sr,null,(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"arrowUp",hiddenMobile:true,width:16,color:"icon_green",left:"20%",top:"90%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",width:12,stroke:true,color:"icon_brightest",left:"90%",top:"30%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:16,color:"icon_yellow",left:"70%",top:"90%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",hiddenMobile:true,width:16,stroke:true,color:"icon_teal",left:"18%",top:"75%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:6,color:"icon_brightest",left:"75%",top:"10%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:8,color:"icon_green",left:"45%",top:"10%"})),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",hiddenMobile:true,width:6,color:"icon_brightest",left:"4%",top:"20%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:12,color:"icon_pink",left:"80%",top:"60%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",width:6,color:"icon_orange",left:"10%",top:"10%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",width:12,color:"icon_yellow",left:"29%",top:"26%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"hexa",width:16,stroke:true,color:"icon_red",left:"75%",top:"30%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"hexa",width:8,stroke:true,color:"icon_yellow",left:"80%",top:"70%"})));/* harmony default export */ const projects = (Projects);
;// CONCATENATED MODULE: ./src/@lekoarts/gatsby-theme-cara/sections/about.mdx
const about_excluded=["components"];/* @jsx mdx *//* @jsxRuntime classic */ /* @jsx mdx */const about_frontmatter={};const about_layoutProps={_frontmatter: about_frontmatter};const about_MDXLayout="wrapper";function about_MDXContent(_ref){let{components}=_ref,props=(0,objectWithoutProperties/* default */.Z)(_ref,about_excluded);return (0,esm/* mdx */.kt)(about_MDXLayout,Object.assign({},about_layoutProps,props,{components:components,mdxType:"MDXLayout"}),(0,esm/* mdx */.kt)("h2",null,`Über Uns`),(0,esm/* mdx */.kt)("blockquote",null,(0,esm/* mdx */.kt)("p",{parentName:"blockquote"},`Wir bei der K&B Software entwickeln Programme und Schnittstellen, um ganzheitlich alle Teilnehmer an ärztlichen Behandlungen miteinander zu verbinden.`)),(0,esm/* mdx */.kt)("p",null,`Hierzu bauen wir eine Plattform, die es erlaubt Gesundheitsdaten schnell, und dank Ende-zu-Ende-Verschlüsselung, auch sicher zwischen Patienten und verschiedenen Ärzten und Therapeuten auszutauschen.`));};about_MDXContent.isMDXComponent=true;
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/about.tsx
// @ts-ignore
const About=({offset,factor=1})=>/*#__PURE__*/index_js_.createElement("div",null,/*#__PURE__*/index_js_.createElement(divider/* default */.Z,{bg:"divider",clipPath:"polygon(0 16%, 100% 4%, 100% 82%, 0 94%)",speed:0.2,offset:offset,factor:factor}),/*#__PURE__*/index_js_.createElement(divider/* default */.Z,{speed:0.1,offset:offset,factor:factor},/*#__PURE__*/index_js_.createElement(animations/* UpDown */.w6,null,/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"box",hiddenMobile:true,width:6,color:"icon_blue",left:"50%",top:"75%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:8,color:"icon_darkest",left:"70%",top:"20%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"triangle",width:8,stroke:true,color:"icon_darkest",left:"25%",top:"5%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:24,color:"icon_orange",left:"80%",top:"80%"})),/*#__PURE__*/index_js_.createElement(animations/* UpDownWide */.sr,null,/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"arrowUp",hiddenMobile:true,width:16,color:"icon_purple",left:"5%",top:"80%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"triangle",width:12,stroke:true,color:"icon_brightest",left:"95%",top:"50%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"circle",hiddenMobile:true,width:6,color:"icon_brightest",left:"85%",top:"15%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:8,color:"icon_darkest",left:"45%",top:"10%"})),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"circle",hiddenMobile:true,width:6,color:"icon_brightest",left:"4%",top:"20%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"circle",width:12,color:"icon_darkest",left:"70%",top:"60%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"box",width:6,color:"icon_orange",left:"10%",top:"10%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"box",width:12,color:"icon_darkest",left:"20%",top:"30%"}),/*#__PURE__*/index_js_.createElement(svg/* default */.Z,{icon:"hexa",width:8,stroke:true,color:"icon_darkest",left:"80%",top:"70%"})),/*#__PURE__*/index_js_.createElement(content/* default */.Z,{speed:0.4,offset:offset,factor:factor},/*#__PURE__*/index_js_.createElement(inner/* default */.Z,null,/*#__PURE__*/index_js_.createElement(about_MDXContent,null))));/* harmony default export */ const about = (About);
// EXTERNAL MODULE: ./node_modules/@theme-ui/color-modes/dist/theme-ui-color-modes.esm.js
var theme_ui_color_modes_esm = __webpack_require__(6197);
// EXTERNAL MODULE: ./node_modules/@emotion/styled/dist/emotion-styled.esm.js + 3 modules
var emotion_styled_esm = __webpack_require__(2414);
// EXTERNAL MODULE: ./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js
var theme_ui_css_esm = __webpack_require__(3431);
;// CONCATENATED MODULE: ./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/memoize/dist/memoize.esm.js
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const memoize_esm = (memoize);

;// CONCATENATED MODULE: ./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.esm.js


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize_esm(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ const is_prop_valid_esm = (index);

// EXTERNAL MODULE: ./node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js
var object_assign = __webpack_require__(4852);
var object_assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);
;// CONCATENATED MODULE: ./node_modules/@styled-system/core/dist/index.esm.js

var merge = function merge(a, b) {
  var result = object_assign_default()({}, a, b);

  for (var key in a) {
    var _assign;

    if (!a[key] || typeof b[key] !== 'object') continue;
    object_assign_default()(result, (_assign = {}, _assign[key] = object_assign_default()(a[key], b[key]), _assign));
  }

  return result;
}; // sort object-value responsive styles

var sort = function sort(obj) {
  var next = {};
  Object.keys(obj).sort(function (a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  }).forEach(function (key) {
    next[key] = obj[key];
  });
  return next;
};

var defaults = {
  breakpoints: [40, 52, 64].map(function (n) {
    return n + 'em';
  })
};

var createMediaQuery = function createMediaQuery(n) {
  return "@media screen and (min-width: " + n + ")";
};

var getValue = function getValue(n, scale) {
  return index_esm_get(scale, n, n);
};

var index_esm_get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};
var index_esm_createParser = function createParser(config) {
  var cache = {};

  var parse = function parse(props) {
    var styles = {};
    var shouldSort = false;
    var isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;

    for (var key in props) {
      if (!config[key]) continue;
      var sx = config[key];
      var raw = props[key];
      var scale = index_esm_get(props.theme, sx.scale, sx.defaults);

      if (typeof raw === 'object') {
        cache.breakpoints = !isCacheDisabled && cache.breakpoints || index_esm_get(props.theme, 'breakpoints', defaults.breakpoints);

        if (Array.isArray(raw)) {
          cache.media = !isCacheDisabled && cache.media || [null].concat(cache.breakpoints.map(createMediaQuery));
          styles = merge(styles, parseResponsiveStyle(cache.media, sx, scale, raw, props));
          continue;
        }

        if (raw !== null) {
          styles = merge(styles, parseResponsiveObject(cache.breakpoints, sx, scale, raw, props));
          shouldSort = true;
        }

        continue;
      }

      object_assign_default()(styles, sx(raw, scale, props));
    } // sort object-based responsive styles


    if (shouldSort) {
      styles = sort(styles);
    }

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;
  var keys = Object.keys(config).filter(function (k) {
    return k !== 'config';
  });

  if (keys.length > 1) {
    keys.forEach(function (key) {
      var _createParser;

      parse[key] = createParser((_createParser = {}, _createParser[key] = config[key], _createParser));
    });
  }

  return parse;
};

var parseResponsiveStyle = function parseResponsiveStyle(mediaQueries, sx, scale, raw, _props) {
  var styles = {};
  raw.slice(0, mediaQueries.length).forEach(function (value, i) {
    var media = mediaQueries[i];
    var style = sx(value, scale, _props);

    if (!media) {
      object_assign_default()(styles, style);
    } else {
      var _assign2;

      object_assign_default()(styles, (_assign2 = {}, _assign2[media] = object_assign_default()({}, styles[media], style), _assign2));
    }
  });
  return styles;
};

var parseResponsiveObject = function parseResponsiveObject(breakpoints, sx, scale, raw, _props) {
  var styles = {};

  for (var key in raw) {
    var breakpoint = breakpoints[key];
    var value = raw[key];
    var style = sx(value, scale, _props);

    if (!breakpoint) {
      object_assign_default()(styles, style);
    } else {
      var _assign3;

      var media = createMediaQuery(breakpoint);
      object_assign_default()(styles, (_assign3 = {}, _assign3[media] = object_assign_default()({}, styles[media], style), _assign3));
    }
  }

  return styles;
};

var index_esm_createStyleFunction = function createStyleFunction(_ref) {
  var properties = _ref.properties,
      property = _ref.property,
      scale = _ref.scale,
      _ref$transform = _ref.transform,
      transform = _ref$transform === void 0 ? getValue : _ref$transform,
      defaultScale = _ref.defaultScale;
  properties = properties || [property];

  var sx = function sx(value, scale, _props) {
    var result = {};
    var n = transform(value, scale, _props);
    if (n === null) return;
    properties.forEach(function (prop) {
      result[prop] = n;
    });
    return result;
  };

  sx.scale = scale;
  sx.defaults = defaultScale;
  return sx;
}; // new v5 API

var system = function system(args) {
  if (args === void 0) {
    args = {};
  }

  var config = {};
  Object.keys(args).forEach(function (key) {
    var conf = args[key];

    if (conf === true) {
      // shortcut definition
      config[key] = index_esm_createStyleFunction({
        property: key,
        scale: key
      });
      return;
    }

    if (typeof conf === 'function') {
      config[key] = conf;
      return;
    }

    config[key] = index_esm_createStyleFunction(conf);
  });
  var parser = index_esm_createParser(config);
  return parser;
};
var compose = function compose() {
  var config = {};

  for (var _len = arguments.length, parsers = new Array(_len), _key = 0; _key < _len; _key++) {
    parsers[_key] = arguments[_key];
  }

  parsers.forEach(function (parser) {
    if (!parser || !parser.config) return;
    object_assign_default()(config, parser.config);
  });
  var parser = index_esm_createParser(config);
  return parser;
};

;// CONCATENATED MODULE: ./node_modules/@styled-system/layout/dist/index.esm.js


var isNumber = function isNumber(n) {
  return typeof n === 'number' && !isNaN(n);
};

var getWidth = function getWidth(n, scale) {
  return index_esm_get(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');
};

var config = {
  width: {
    property: 'width',
    scale: 'sizes',
    transform: getWidth
  },
  height: {
    property: 'height',
    scale: 'sizes'
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes'
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes'
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes'
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes'
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes'
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true
};
var index_esm_layout = system(config);
/* harmony default export */ const index_esm = (index_esm_layout);

;// CONCATENATED MODULE: ./node_modules/@styled-system/color/dist/index.esm.js

var index_esm_config = {
  color: {
    property: 'color',
    scale: 'colors'
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors'
  },
  opacity: true
};
index_esm_config.bg = index_esm_config.backgroundColor;
var color = system(index_esm_config);
/* harmony default export */ const dist_index_esm = (color);

;// CONCATENATED MODULE: ./node_modules/@styled-system/typography/dist/index.esm.js

var index_esm_defaults = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var dist_index_esm_config = {
  fontFamily: {
    property: 'fontFamily',
    scale: 'fonts'
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
    defaultScale: index_esm_defaults.fontSizes
  },
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights'
  },
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights'
  },
  letterSpacing: {
    property: 'letterSpacing',
    scale: 'letterSpacings'
  },
  textAlign: true,
  fontStyle: true
};
var typography = system(dist_index_esm_config);
/* harmony default export */ const typography_dist_index_esm = (typography);

;// CONCATENATED MODULE: ./node_modules/@styled-system/flexbox/dist/index.esm.js

var flexbox_dist_index_esm_config = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  // item
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true
};
var flexbox = system(flexbox_dist_index_esm_config);
/* harmony default export */ const flexbox_dist_index_esm = (flexbox);

;// CONCATENATED MODULE: ./node_modules/@styled-system/grid/dist/index.esm.js

var dist_index_esm_defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};
var grid_dist_index_esm_config = {
  gridGap: {
    property: 'gridGap',
    scale: 'space',
    defaultScale: dist_index_esm_defaults.space
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
    defaultScale: dist_index_esm_defaults.space
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
    defaultScale: dist_index_esm_defaults.space
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true
};
var grid = system(grid_dist_index_esm_config);
/* harmony default export */ const grid_dist_index_esm = (grid);

;// CONCATENATED MODULE: ./node_modules/@styled-system/border/dist/index.esm.js

var border_dist_index_esm_config = {
  border: {
    property: 'border',
    scale: 'borders'
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'borderWidths'
  },
  borderStyle: {
    property: 'borderStyle',
    scale: 'borderStyles'
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors'
  },
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii'
  },
  borderTop: {
    property: 'borderTop',
    scale: 'borders'
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii'
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii'
  },
  borderRight: {
    property: 'borderRight',
    scale: 'borders'
  },
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders'
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii'
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii'
  },
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders'
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders'
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders'
  }
};
border_dist_index_esm_config.borderTopWidth = {
  property: 'borderTopWidth',
  scale: 'borderWidths'
};
border_dist_index_esm_config.borderTopColor = {
  property: 'borderTopColor',
  scale: 'colors'
};
border_dist_index_esm_config.borderTopStyle = {
  property: 'borderTopStyle',
  scale: 'borderStyles'
};
border_dist_index_esm_config.borderTopLeftRadius = {
  property: 'borderTopLeftRadius',
  scale: 'radii'
};
border_dist_index_esm_config.borderTopRightRadius = {
  property: 'borderTopRightRadius',
  scale: 'radii'
};
border_dist_index_esm_config.borderBottomWidth = {
  property: 'borderBottomWidth',
  scale: 'borderWidths'
};
border_dist_index_esm_config.borderBottomColor = {
  property: 'borderBottomColor',
  scale: 'colors'
};
border_dist_index_esm_config.borderBottomStyle = {
  property: 'borderBottomStyle',
  scale: 'borderStyles'
};
border_dist_index_esm_config.borderBottomLeftRadius = {
  property: 'borderBottomLeftRadius',
  scale: 'radii'
};
border_dist_index_esm_config.borderBottomRightRadius = {
  property: 'borderBottomRightRadius',
  scale: 'radii'
};
border_dist_index_esm_config.borderLeftWidth = {
  property: 'borderLeftWidth',
  scale: 'borderWidths'
};
border_dist_index_esm_config.borderLeftColor = {
  property: 'borderLeftColor',
  scale: 'colors'
};
border_dist_index_esm_config.borderLeftStyle = {
  property: 'borderLeftStyle',
  scale: 'borderStyles'
};
border_dist_index_esm_config.borderRightWidth = {
  property: 'borderRightWidth',
  scale: 'borderWidths'
};
border_dist_index_esm_config.borderRightColor = {
  property: 'borderRightColor',
  scale: 'colors'
};
border_dist_index_esm_config.borderRightStyle = {
  property: 'borderRightStyle',
  scale: 'borderStyles'
};
var border = system(border_dist_index_esm_config);
/* harmony default export */ const border_dist_index_esm = (border);

;// CONCATENATED MODULE: ./node_modules/@styled-system/background/dist/index.esm.js

var background_dist_index_esm_config = {
  background: true,
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true
};
background_dist_index_esm_config.bgImage = background_dist_index_esm_config.backgroundImage;
background_dist_index_esm_config.bgSize = background_dist_index_esm_config.backgroundSize;
background_dist_index_esm_config.bgPosition = background_dist_index_esm_config.backgroundPosition;
background_dist_index_esm_config.bgRepeat = background_dist_index_esm_config.backgroundRepeat;
var background = system(background_dist_index_esm_config);
/* harmony default export */ const background_dist_index_esm = (background);

;// CONCATENATED MODULE: ./node_modules/@styled-system/position/dist/index.esm.js

var position_dist_index_esm_defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};
var position_dist_index_esm_config = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices'
  },
  top: {
    property: 'top',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  },
  right: {
    property: 'right',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  },
  left: {
    property: 'left',
    scale: 'space',
    defaultScale: position_dist_index_esm_defaults.space
  }
};
var position = system(position_dist_index_esm_config);
/* harmony default export */ const position_dist_index_esm = (position);

;// CONCATENATED MODULE: ./node_modules/@styled-system/space/dist/index.esm.js

var space_dist_index_esm_defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};

var index_esm_isNumber = function isNumber(n) {
  return typeof n === 'number' && !isNaN(n);
};

var getMargin = function getMargin(n, scale) {
  if (!index_esm_isNumber(n)) {
    return index_esm_get(scale, n, n);
  }

  var isNegative = n < 0;
  var absolute = Math.abs(n);
  var value = index_esm_get(scale, absolute, absolute);

  if (!index_esm_isNumber(value)) {
    return isNegative ? '-' + value : value;
  }

  return value * (isNegative ? -1 : 1);
};

var configs = {};
configs.margin = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: getMargin,
    defaultScale: space_dist_index_esm_defaults.space
  }
};
configs.margin.m = configs.margin.margin;
configs.margin.mt = configs.margin.marginTop;
configs.margin.mr = configs.margin.marginRight;
configs.margin.mb = configs.margin.marginBottom;
configs.margin.ml = configs.margin.marginLeft;
configs.margin.mx = configs.margin.marginX;
configs.margin.my = configs.margin.marginY;
configs.padding = {
  padding: {
    property: 'padding',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    defaultScale: space_dist_index_esm_defaults.space
  }
};
configs.padding.p = configs.padding.padding;
configs.padding.pt = configs.padding.paddingTop;
configs.padding.pr = configs.padding.paddingRight;
configs.padding.pb = configs.padding.paddingBottom;
configs.padding.pl = configs.padding.paddingLeft;
configs.padding.px = configs.padding.paddingX;
configs.padding.py = configs.padding.paddingY;
var margin = system(configs.margin);
var padding = system(configs.padding);
var space = compose(margin, padding);
/* harmony default export */ const space_dist_index_esm = (space);

;// CONCATENATED MODULE: ./node_modules/@styled-system/shadow/dist/index.esm.js

var shadow = system({
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows'
  },
  textShadow: {
    property: 'textShadow',
    scale: 'shadows'
  }
});
/* harmony default export */ const shadow_dist_index_esm = ((/* unused pure expression or super */ null && (shadow)));

;// CONCATENATED MODULE: ./node_modules/@styled-system/css/dist/index.esm.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// based on https://github.com/developit/dlv
var dist_index_esm_get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};
var defaultBreakpoints = [40, 52, 64].map(function (n) {
  return n + 'em';
});
var defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY'
};
var multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height']
};
var scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  outlineColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors'
};

var positiveOrNegative = function positiveOrNegative(scale, value) {
  if (typeof value !== 'number' || value >= 0) {
    return dist_index_esm_get(scale, value, value);
  }

  var absolute = Math.abs(value);
  var n = dist_index_esm_get(scale, absolute, absolute);
  if (typeof n === 'string') return '-' + n;
  return n * -1;
};

var transforms = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'top', 'bottom', 'left', 'right'].reduce(function (acc, curr) {
  var _extends2;

  return _extends({}, acc, (_extends2 = {}, _extends2[curr] = positiveOrNegative, _extends2));
}, {});
var responsive = function responsive(styles) {
  return function (theme) {
    var next = {};
    var breakpoints = dist_index_esm_get(theme, 'breakpoints', defaultBreakpoints);
    var mediaQueries = [null].concat(breakpoints.map(function (n) {
      return "@media screen and (min-width: " + n + ")";
    }));

    for (var key in styles) {
      var value = typeof styles[key] === 'function' ? styles[key](theme) : styles[key];
      if (value == null) continue;

      if (!Array.isArray(value)) {
        next[key] = value;
        continue;
      }

      for (var i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
        var media = mediaQueries[i];

        if (!media) {
          next[key] = value[i];
          continue;
        }

        next[media] = next[media] || {};
        if (value[i] == null) continue;
        next[media][key] = value[i];
      }
    }

    return next;
  };
};
var css = function css(args) {
  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = _extends({}, defaultTheme, {}, props.theme || props);

    var result = {};
    var obj = typeof args === 'function' ? args(theme) : args;
    var styles = responsive(obj)(theme);

    for (var key in styles) {
      var x = styles[key];
      var val = typeof x === 'function' ? x(theme) : x;

      if (key === 'variant') {
        var variant = css(dist_index_esm_get(theme, val))(theme);
        result = _extends({}, result, {}, variant);
        continue;
      }

      if (val && typeof val === 'object') {
        result[key] = css(val)(theme);
        continue;
      }

      var prop = dist_index_esm_get(aliases, key, key);
      var scaleName = dist_index_esm_get(scales, prop);
      var scale = dist_index_esm_get(theme, scaleName, dist_index_esm_get(theme, prop, {}));
      var transform = dist_index_esm_get(transforms, prop, dist_index_esm_get);
      var value = transform(scale, val, val);

      if (multiples[prop]) {
        var dirs = multiples[prop];

        for (var i = 0; i < dirs.length; i++) {
          result[dirs[i]] = value;
        }
      } else {
        result[prop] = value;
      }
    }

    return result;
  };
};
/* harmony default export */ const css_dist_index_esm = (css);

;// CONCATENATED MODULE: ./node_modules/@styled-system/variant/dist/index.esm.js


var variant = function variant(_ref) {
  var _config;

  var scale = _ref.scale,
      _ref$prop = _ref.prop,
      prop = _ref$prop === void 0 ? 'variant' : _ref$prop,
      _ref$variants = _ref.variants,
      variants = _ref$variants === void 0 ? {} : _ref$variants,
      key = _ref.key;
  var sx;

  if (Object.keys(variants).length) {
    sx = function sx(value, scale, props) {
      return css_dist_index_esm(index_esm_get(scale, value, null))(props.theme);
    };
  } else {
    sx = function sx(value, scale) {
      return index_esm_get(scale, value, null);
    };
  }

  sx.scale = scale || key;
  sx.defaults = variants;
  var config = (_config = {}, _config[prop] = sx, _config);
  var parser = index_esm_createParser(config);
  return parser;
};
/* harmony default export */ const variant_dist_index_esm = ((/* unused pure expression or super */ null && (variant)));
var buttonStyle = variant({
  key: 'buttons'
});
var textStyle = variant({
  key: 'textStyles',
  prop: 'textStyle'
});
var colorStyle = variant({
  key: 'colorStyles',
  prop: 'colors'
});

;// CONCATENATED MODULE: ./node_modules/styled-system/dist/index.esm.js
 // v4 api shims






















var width = index_esm.width,
    height = index_esm.height,
    minWidth = index_esm.minWidth,
    minHeight = index_esm.minHeight,
    maxWidth = index_esm.maxWidth,
    maxHeight = index_esm.maxHeight,
    size = index_esm.size,
    verticalAlign = index_esm.verticalAlign,
    display = index_esm.display,
    overflow = index_esm.overflow,
    overflowX = index_esm.overflowX,
    overflowY = index_esm.overflowY;
var opacity = dist_index_esm.opacity;
var fontSize = typography_dist_index_esm.fontSize,
    fontFamily = typography_dist_index_esm.fontFamily,
    fontWeight = typography_dist_index_esm.fontWeight,
    lineHeight = typography_dist_index_esm.lineHeight,
    textAlign = typography_dist_index_esm.textAlign,
    fontStyle = typography_dist_index_esm.fontStyle,
    letterSpacing = typography_dist_index_esm.letterSpacing;
var alignItems = flexbox_dist_index_esm.alignItems,
    alignContent = flexbox_dist_index_esm.alignContent,
    justifyItems = flexbox_dist_index_esm.justifyItems,
    justifyContent = flexbox_dist_index_esm.justifyContent,
    flexWrap = flexbox_dist_index_esm.flexWrap,
    flexDirection = flexbox_dist_index_esm.flexDirection,
    flex = flexbox_dist_index_esm.flex,
    flexGrow = flexbox_dist_index_esm.flexGrow,
    flexShrink = flexbox_dist_index_esm.flexShrink,
    flexBasis = flexbox_dist_index_esm.flexBasis,
    justifySelf = flexbox_dist_index_esm.justifySelf,
    alignSelf = flexbox_dist_index_esm.alignSelf,
    order = flexbox_dist_index_esm.order;
var gridGap = grid_dist_index_esm.gridGap,
    gridColumnGap = grid_dist_index_esm.gridColumnGap,
    gridRowGap = grid_dist_index_esm.gridRowGap,
    gridColumn = grid_dist_index_esm.gridColumn,
    gridRow = grid_dist_index_esm.gridRow,
    gridAutoFlow = grid_dist_index_esm.gridAutoFlow,
    gridAutoColumns = grid_dist_index_esm.gridAutoColumns,
    gridAutoRows = grid_dist_index_esm.gridAutoRows,
    gridTemplateColumns = grid_dist_index_esm.gridTemplateColumns,
    gridTemplateRows = grid_dist_index_esm.gridTemplateRows,
    gridTemplateAreas = grid_dist_index_esm.gridTemplateAreas,
    gridArea = grid_dist_index_esm.gridArea;
var borderWidth = border_dist_index_esm.borderWidth,
    borderStyle = border_dist_index_esm.borderStyle,
    borderColor = border_dist_index_esm.borderColor,
    borderTop = border_dist_index_esm.borderTop,
    borderRight = border_dist_index_esm.borderRight,
    borderBottom = border_dist_index_esm.borderBottom,
    borderLeft = border_dist_index_esm.borderLeft,
    borderRadius = border_dist_index_esm.borderRadius;
var backgroundImage = background_dist_index_esm.backgroundImage,
    backgroundSize = background_dist_index_esm.backgroundSize,
    backgroundPosition = background_dist_index_esm.backgroundPosition,
    backgroundRepeat = background_dist_index_esm.backgroundRepeat;
var zIndex = position_dist_index_esm.zIndex,
    index_esm_top = position_dist_index_esm.top,
    right = position_dist_index_esm.right,
    bottom = position_dist_index_esm.bottom,
    left = position_dist_index_esm.left;

 // v4 style API shim

var style = function style(_ref) {
  var prop = _ref.prop,
      cssProperty = _ref.cssProperty,
      alias = _ref.alias,
      key = _ref.key,
      transformValue = _ref.transformValue,
      scale = _ref.scale,
      properties = _ref.properties;
  var config = {};
  config[prop] = createStyleFunction({
    properties: properties,
    property: cssProperty || prop,
    scale: key,
    defaultScale: scale,
    transform: transformValue
  });
  if (alias) config[alias] = config[prop];
  var parse = createParser(config);
  return parse;
};

;// CONCATENATED MODULE: ./node_modules/@styled-system/should-forward-prop/dist/index.esm.js



var index_esm_all = compose(space, typography, color, index_esm_layout, flexbox, border, background, position, grid, shadow, buttonStyle, textStyle, colorStyle);
var props = index_esm_all.propNames;
var createShouldForwardProp = function createShouldForwardProp(props) {
  var regex = new RegExp("^(" + props.join('|') + ")$");
  return memoize_esm(function (prop) {
    return is_prop_valid_esm(prop) && !regex.test(prop);
  });
};
/* harmony default export */ const should_forward_prop_dist_index_esm = (createShouldForwardProp(props));

// EXTERNAL MODULE: ./node_modules/@emotion/react/dist/emotion-react.esm.js
var emotion_react_esm = __webpack_require__(6657);
;// CONCATENATED MODULE: ./node_modules/@theme-ui/components/dist/theme-ui-components.esm.js








var boxSystemProps = [].concat(space_dist_index_esm.propNames, dist_index_esm.propNames);
/**
 * @internal
 * @type {(prop: string) => boolean}
 */

var __isBoxStyledSystemProp = function __isBoxStyledSystemProp(prop) {
  return boxSystemProps.includes(prop);
};
var shouldForwardProp = createShouldForwardProp(boxSystemProps);

var sx = function sx(props) {
  return (0,theme_ui_css_esm/* css */.iv)(props.sx)(props.theme);
};

var base = function base(props) {
  return (0,theme_ui_css_esm/* css */.iv)(props.__css)(props.theme);
};

var theme_ui_components_esm_variant = function variant(_ref) {
  var theme = _ref.theme,
      variant = _ref.variant,
      _ref$__themeKey = _ref.__themeKey,
      __themeKey = _ref$__themeKey === void 0 ? 'variants' : _ref$__themeKey;

  return (0,theme_ui_css_esm/* css */.iv)((0,theme_ui_css_esm/* get */.U2)(theme, __themeKey + '.' + variant, (0,theme_ui_css_esm/* get */.U2)(theme, variant)));
};

var Box = (0,emotion_styled_esm/* default */.Z)('div', {
  shouldForwardProp: shouldForwardProp
})({
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0
}, base, theme_ui_components_esm_variant, space_dist_index_esm, dist_index_esm, sx, function (props) {
  return props.css;
});
Box.displayName = 'Box';

var Flex = (0,emotion_styled_esm/* default */.Z)(Box)({
  display: 'flex'
});
Flex.displayName = 'Flex';

function theme_ui_components_esm_extends() {
  theme_ui_components_esm_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return theme_ui_components_esm_extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var theme_ui_components_esm_excluded = (/* unused pure expression or super */ null && (["width", "columns", "gap", "repeat"]));

var px = function px(n) {
  return typeof n === 'number' ? n + 'px' : n;
};

var widthToColumns = function widthToColumns(width, repeat) {
  return Array.isArray(width) ? width.map(function (w) {
    return widthToColumns(w, repeat);
  }) : !!width && "repeat(auto-" + repeat + ", minmax(" + px(width) + ", 1fr))";
};

var countToColumns = function countToColumns(n) {
  return Array.isArray(n) ? n.map(countToColumns) : !!n && (typeof n === 'number' ? "repeat(" + n + ", 1fr)" : n);
};

var Grid = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Grid(_ref, ref) {
  var width = _ref.width,
      columns = _ref.columns,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 3 : _ref$gap,
      _ref$repeat = _ref.repeat,
      repeat = _ref$repeat === void 0 ? 'fit' : _ref$repeat,
      props = _objectWithoutPropertiesLoose(_ref, theme_ui_components_esm_excluded);

  var gridTemplateColumns = !!width ? widthToColumns(width, repeat) : countToColumns(columns);
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref
  }, props, {
    __themeKey: "grids",
    __css: {
      display: 'grid',
      gridGap: gap,
      gridTemplateColumns: gridTemplateColumns
    }
  }));
})));

var Button = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Button(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "button",
    variant: "primary"
  }, props, {
    __themeKey: "buttons",
    __css: {
      appearance: 'none',
      display: props.hidden ? undefined : 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      px: 3,
      py: 2,
      color: 'white',
      bg: 'primary',
      border: 0,
      borderRadius: 4
    }
  }));
})));

var Link = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Link(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "a",
    variant: "styles.a"
  }, props, {
    __themeKey: "links"
  }));
})));

var Paragraph = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Paragraph(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "p",
    variant: "paragraph",
    __themeKey: "text",
    __css: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  }, props));
})));

var Text = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Text(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    as: "span",
    ref: ref,
    variant: "default"
  }, props, {
    __themeKey: "text"
  }));
})));

var Heading = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Heading(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "h2",
    variant: "heading"
  }, props, {
    __themeKey: "text",
    __css: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading'
    }
  }));
})));

var Image = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Image(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "img"
  }, props, {
    __themeKey: "images",
    __css: theme_ui_components_esm_extends({
      maxWidth: '100%',
      height: 'auto'
    }, props.__css)
  }));
})));

var Card = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Card(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "cards"
  }));
})));

var Label = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Label(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "label",
    variant: "label"
  }, props, {
    __themeKey: "forms",
    __css: {
      width: '100%',
      display: 'flex'
    }
  }));
})));

var _excluded$1 = (/* unused pure expression or super */ null && (["sx", "autofillBackgroundColor"]));
/** @type {import('theme-ui').ThemeUIStyleObject} */

var autofillStyles = {
  boxShadow: 'inset 0 0 0 1000px var(--theme-ui-input-autofill-bg)',
  fontSize: 'inherit',
  ':first-line': {
    fontSize: '1rem'
  }
};
/** @type {import('theme-ui').ThemeUIStyleObject} */

var defaultInputStyles = {
  display: 'block',
  width: '100%',
  p: 2,
  appearance: 'none',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  border: '1px solid',
  borderRadius: 4,
  color: 'inherit',
  bg: 'transparent',
  ':autofill, :autofill:hover, :autofill:focus': autofillStyles,
  ':-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus': autofillStyles
};
var Input = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Input(_ref, ref) {
  var sx = _ref.sx,
      _ref$autofillBackgrou = _ref.autofillBackgroundColor,
      autofillBackgroundColor = _ref$autofillBackgrou === void 0 ? 'background' : _ref$autofillBackgrou,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "input",
    variant: "input",
    sx: theme_ui_components_esm_extends({
      '--theme-ui-input-autofill-bg': function themeUiInputAutofillBg(theme) {
        return get(theme.colors, autofillBackgroundColor, null);
      }
    }, sx)
  }, rest, {
    __themeKey: "forms",
    __css: defaultInputStyles
  }));
})));

var _excluded$2 = ["size"];

var SVG = function SVG(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 24 : _ref$size,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  return /*#__PURE__*/index_js_default().createElement(Box, theme_ui_components_esm_extends({
    as: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    width: size + '',
    height: size + '',
    viewBox: "0 0 24 24",
    fill: "currentcolor"
  }, props));
};

SVG.displayName = 'SVG';

var getProps = function getProps(test) {
  return function (props) {
    var next = {};

    for (var key in props) {
      if (test(key || '')) next[key] = props[key];
    }

    return next;
  };
};
var MRE = /^m[trblxy]?$/;
var theme_ui_components_esm_getMargin = getProps(function (k) {
  return MRE.test(k);
});
var omitMargin = getProps(function (k) {
  return !MRE.test(k);
});

var _excluded$3 = (/* unused pure expression or super */ null && (["arrow"]));

var DownArrow = function DownArrow(props) {
  return /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
    d: "M7 10l5 5 5-5z"
  }));
};

var Select = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Select(_ref, ref) {
  var arrow = _ref.arrow,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({}, theme_ui_components_esm_getMargin(props), {
    sx: {
      display: 'flex'
    }
  }), /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "select",
    variant: "select"
  }, omitMargin(props), {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      p: 2,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderRadius: 4,
      color: 'inherit',
      backgroundColor: function backgroundColor(theme) {
        return get(theme, 'colors.background', null);
      }
    }
  })), arrow || /*#__PURE__*/React.createElement(DownArrow, {
    sx: {
      ml: -28,
      alignSelf: 'center',
      pointerEvents: 'none'
    }
  }));
})));

var Textarea = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Textarea(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "textarea",
    variant: "textarea"
  }, props, {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      p: 2,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderRadius: 4,
      color: 'inherit',
      bg: 'transparent'
    }
  }));
})));

var _excluded$4 = (/* unused pure expression or super */ null && (["className", "sx", "variant"]));

var RadioChecked = function RadioChecked(props) {
  return /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
    d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }));
};

var RadioUnchecked = function RadioUnchecked(props) {
  return /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }));
};

var RadioIcon = function RadioIcon(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RadioChecked, theme_ui_components_esm_extends({}, props, {
    __css: {
      display: 'none',
      'input:checked ~ &': {
        display: 'block'
      }
    }
  })), /*#__PURE__*/React.createElement(RadioUnchecked, theme_ui_components_esm_extends({}, props, {
    __css: {
      display: 'block',
      'input:checked ~ &': {
        display: 'none'
      }
    }
  })));
};

var Radio = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Radio(_ref, ref) {
  var className = _ref.className,
      sx = _ref.sx,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'radio' : _ref$variant,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$4);

  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      minWidth: 'min-content'
    }
  }, /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "input",
    type: "radio"
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    as: RadioIcon,
    "aria-hidden": "true",
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      // todo: system props??
      mr: 2,
      borderRadius: 9999,
      color: 'gray',
      flexShrink: 0,
      'input:checked ~ &': {
        color: 'primary'
      },
      'input:focus ~ &': {
        bg: 'highlight'
      }
    }
  }));
})));

var _excluded$5 = (/* unused pure expression or super */ null && (["className", "sx", "variant", "children"]));

var CheckboxChecked = function CheckboxChecked(props) {
  return /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
    d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  }));
};

var CheckboxUnchecked = function CheckboxUnchecked(props) {
  return /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
    d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
  }));
};

var CheckboxIcon = function CheckboxIcon(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CheckboxChecked, theme_ui_components_esm_extends({}, props, {
    __css: {
      display: 'none',
      'input:checked ~ &': {
        display: 'block'
      }
    }
  })), /*#__PURE__*/React.createElement(CheckboxUnchecked, theme_ui_components_esm_extends({}, props, {
    __css: {
      display: 'block',
      'input:checked ~ &': {
        display: 'none'
      }
    }
  })));
};

var Checkbox = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Checkbox(_ref, ref) {
  var className = _ref.className,
      sx = _ref.sx,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'checkbox' : _ref$variant,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$5);

  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      minWidth: 'min-content'
    }
  }, /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "input",
    type: "checkbox"
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    as: CheckboxIcon,
    "aria-hidden": "true",
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      mr: 2,
      borderRadius: 4,
      color: 'gray',
      flexShrink: 0,
      'input:checked ~ &': {
        color: 'primary'
      },
      'input:focus ~ &': {
        color: 'primary',
        bg: 'highlight'
      }
    }
  }), children);
})));

var _excluded$6 = (/* unused pure expression or super */ null && (["className", "label", "sx", "variant"]));
var GUTTER = 2;
var SIZE = 18;
var Switch = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Switch(_ref, ref) {
  var className = _ref.className,
      label = _ref.label,
      sx = _ref.sx,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'switch' : _ref$variant,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$6);

  return /*#__PURE__*/React.createElement(Label, {
    sx: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "input",
    type: "checkbox",
    __themeKey: "forms",
    "aria-label": label
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    css: {
      padding: GUTTER
    },
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      position: 'relative',
      bg: 'gray',
      borderRadius: SIZE,
      height: SIZE + GUTTER * 2,
      width: SIZE * 2 + GUTTER * 2,
      mr: 2,
      'input:disabled ~ &': {
        opacity: 0.5,
        cursor: 'not-allowed'
      },
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50%',
        height: SIZE,
        width: SIZE,
        bg: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        transform: 'translateX(0%)',
        transition: "transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)"
      },
      'input:checked ~ &': {
        bg: 'primary',
        '> div': {
          transform: 'translateX(100%)'
        }
      }
    }
  }, /*#__PURE__*/React.createElement(Box, null)), /*#__PURE__*/React.createElement("span", null, label));
})));

var thumb = {
  appearance: 'none',
  width: 16,
  height: 16,
  bg: 'currentcolor',
  border: 0,
  borderRadius: 9999,
  variant: 'forms.slider.thumb'
};
var Slider = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Slider(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "input",
    type: "range",
    variant: "slider"
  }, props, {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      height: 4,
      my: 2,
      cursor: 'pointer',
      appearance: 'none',
      borderRadius: 9999,
      color: 'inherit',
      bg: 'gray',
      ':focus': {
        outline: 'none',
        color: 'primary'
      },
      '&::-webkit-slider-thumb': thumb,
      '&::-moz-range-thumb': thumb,
      '&::-ms-thumb': thumb
    }
  }));
})));

var _excluded$7 = (/* unused pure expression or super */ null && (["as", "label", "id", "name"]));
var Field = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Field(_ref, ref) {
  var _ref$as = _ref.as,
      Control = _ref$as === void 0 ? Input : _ref$as,
      label = _ref.label,
      id = _ref.id,
      name = _ref.name,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$7);

  var fieldIdentifier = id || name;
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_getMargin(props), /*#__PURE__*/React.createElement(Label, {
    htmlFor: fieldIdentifier
  }, label), /*#__PURE__*/React.createElement(Control, theme_ui_components_esm_extends({
    ref: ref,
    id: fieldIdentifier,
    name: name
  }, omitMargin(props))));
})));

var Progress = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Progress(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "progress",
    variant: "styles.progress"
  }, props, {
    __css: {
      display: 'block',
      width: '100%',
      height: '4px',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      appearance: 'none',
      color: 'primary',
      bg: 'gray',
      borderRadius: 9999,
      border: 'none',
      '&::-webkit-progress-bar': {
        bg: 'transparent'
      },
      '&::-webkit-progress-value': {
        bg: 'currentcolor'
      },
      '&::-moz-progress-bar': {
        bg: 'currentcolor'
      }
    }
  }));
})));

var _excluded$8 = (/* unused pure expression or super */ null && (["size", "strokeWidth", "value", "min", "max", "title"]));
var Donut = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Donut(_ref, ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 128 : _ref$size,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 1 : _ref$max,
      title = _ref.title,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$8);

  var r = 16 - strokeWidth;
  var C = 2 * r * Math.PI;
  var offset = C - (value - min) / (max - min) * C;
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "svg",
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    strokeWidth: strokeWidth,
    fill: "none",
    stroke: "currentcolor",
    role: "img",
    "aria-valuenow": value,
    "aria-valuemin": min,
    "aria-valuemax": max
  }, props, {
    __css: {
      color: 'primary'
    }
  }), title && /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    opacity: 1 / 8
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    strokeDasharray: C,
    strokeDashoffset: offset,
    transform: "rotate(-90 16 16)"
  }));
})));

var _excluded$9 = (/* unused pure expression or super */ null && (["size", "strokeWidth", "max", "title", "duration"]));
var spin = (0,emotion_react_esm/* keyframes */.F4)({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
});
var Spinner = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Spinner(_ref, ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 48 : _ref$size,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 4 : _ref$strokeWidth,
      _ref$max = _ref.max,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Loading...' : _ref$title,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 500 : _ref$duration,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$9);

  var r = 16 - strokeWidth;
  var C = 2 * r * Math.PI;
  var offset = C - 1 / 4 * C;
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "svg",
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    strokeWidth: strokeWidth,
    fill: "none",
    stroke: "currentcolor",
    role: "img"
  }, props, {
    __css: {
      color: 'primary',
      overflow: 'visible'
    }
  }), /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    opacity: 1 / 8
  }), /*#__PURE__*/React.createElement(Box, {
    as: "circle",
    cx: 16,
    cy: 16,
    r: r,
    strokeDasharray: C,
    strokeDashoffset: offset,
    __css: {
      transformOrigin: '50% 50%',
      animationName: spin.toString(),
      animationTimingFunction: 'linear',
      animationDuration: duration + 'ms',
      animationIterationCount: 'infinite'
    }
  }));
})));

var _excluded$a = (/* unused pure expression or super */ null && (["size"]));
var Avatar = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Avatar(_ref, ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 48 : _ref$size,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$a);

  return /*#__PURE__*/React.createElement(Image, theme_ui_components_esm_extends({
    ref: ref,
    width: size,
    height: size,
    variant: "avatar"
  }, props, {
    __css: {
      borderRadius: 9999
    }
  }));
})));

var Badge = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Badge(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "badges",
    __css: {
      display: 'inline-block',
      verticalAlign: 'baseline',
      fontSize: 0,
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      px: 1,
      borderRadius: 2,
      color: 'white',
      bg: 'primary'
    }
  }));
})));

var _excluded$b = (/* unused pure expression or super */ null && (["size"]));
var IconButton = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function IconButton(_ref, ref) {
  var _props$__css;

  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 32 : _ref$size,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$b);

  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "button",
    variant: "icon"
  }, props, {
    __themeKey: "buttons",
    __css: {
      label: ((_props$__css = props.__css) == null ? void 0 : _props$__css.label) || 'IconButton',
      appearance: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      width: size,
      height: size,
      color: 'inherit',
      bg: 'transparent',
      border: 'none',
      borderRadius: 4
    }
  }));
})));

var _excluded$c = (/* unused pure expression or super */ null && (["size"]));
var x = /*#__PURE__*/index_js_default().createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "currentcolor",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/index_js_default().createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}));
var Close = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Close(_ref, ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 32 : _ref$size,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$c);

  return /*#__PURE__*/React.createElement(IconButton, theme_ui_components_esm_extends({
    ref: ref,
    size: size,
    title: "Close",
    "aria-label": "Close",
    variant: "close"
  }, props, {
    children: x
  }));
})));

var Alert = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Alert(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "alerts",
    __css: {
      display: 'flex',
      alignItems: 'center',
      px: 3,
      py: 2,
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      borderRadius: 4
    }
  }));
})));

var Divider = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Divider(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "hr",
    variant: "styles.hr"
  }, props, {
    __css: {
      color: 'gray',
      m: 0,
      my: 2,
      border: 0,
      borderBottom: '1px solid'
    }
  }));
})));

var _excluded$d = (/* unused pure expression or super */ null && (["variant", "sx", "ratio", "src", "frameBorder", "allowFullScreen", "width", "height", "allow"]));
var getContainerProps = getProps(__isBoxStyledSystemProp);
var getIframeProps = getProps(function (str) {
  return !__isBoxStyledSystemProp(str);
});
/** @typedef {import("../index").EmbedProps} EmbedProps */

/** @type {React.ForwardRefExoticComponent<EmbedProps>} */

var Embed = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Embed(_ref, ref) {
  var variant = _ref.variant,
      sx = _ref.sx,
      _ref$ratio = _ref.ratio,
      ratio = _ref$ratio === void 0 ? 16 / 9 : _ref$ratio,
      src = _ref.src,
      _ref$frameBorder = _ref.frameBorder,
      frameBorder = _ref$frameBorder === void 0 ? 0 : _ref$frameBorder,
      _ref$allowFullScreen = _ref.allowFullScreen,
      allowFullScreen = _ref$allowFullScreen === void 0 ? true : _ref$allowFullScreen,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 560 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 315 : _ref$height,
      allow = _ref.allow,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$d);

  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    variant: variant,
    sx: sx,
    __css: {
      width: '100%',
      height: 0,
      paddingBottom: 100 / ratio + '%',
      position: 'relative',
      overflow: 'hidden'
    }
  }, getContainerProps(rest)), /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    as: "iframe",
    src: src,
    width: width,
    height: height,
    frameBorder: frameBorder,
    allowFullScreen: allowFullScreen,
    allow: allow
  }, getIframeProps(rest), {
    __css: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      border: 0
    }
  })));
})));

var _excluded$e = (/* unused pure expression or super */ null && (["ratio", "children"]));
var AspectRatio = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function AspectRatio(_ref, ref) {
  var _ref$ratio = _ref.ratio,
      ratio = _ref$ratio === void 0 ? 4 / 3 : _ref$ratio,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$e);

  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    sx: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    sx: {
      width: '100%',
      height: 0,
      paddingBottom: 100 / ratio + '%'
    }
  }), /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({}, props, {
    __css: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }), children));
})));

var _excluded$f = (/* unused pure expression or super */ null && (["ratio"]));
var AspectImage = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function AspectImage(_ref, ref) {
  var ratio = _ref.ratio,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$f);

  return /*#__PURE__*/React.createElement(AspectRatio, {
    ratio: ratio
  }, /*#__PURE__*/React.createElement(Image, theme_ui_components_esm_extends({
    ref: ref
  }, props, {
    __css: {
      objectFit: 'cover'
    }
  })));
})));

var Container = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Container(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref,
    variant: "container"
  }, props, {
    __themeKey: "layout",
    __css: {
      width: '100%',
      maxWidth: 'container',
      mx: 'auto'
    }
  }));
})));

var NavLink = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function NavLink(props, ref) {
  return /*#__PURE__*/React.createElement(Link, theme_ui_components_esm_extends({
    ref: ref,
    variant: "nav"
  }, props, {
    __css: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-block',
      '&:hover, &:focus, &.active': {
        color: 'primary'
      }
    }
  }));
})));

var Message = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function Message(props, ref) {
  return /*#__PURE__*/React.createElement(Box, theme_ui_components_esm_extends({
    ref: ref
  }, props, {
    __themeKey: "messages",
    __css: {
      padding: 3,
      paddingLeft: function paddingLeft(t) {
        return t.space[3] - t.space[1];
      },
      borderLeftWidth: function borderLeftWidth(t) {
        return t.space[1];
      },
      borderLeftStyle: 'solid',
      borderLeftColor: 'primary',
      borderRadius: 4,
      bg: 'highlight'
    }
  }));
})));

var MenuIcon = function MenuIcon(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 24 : _ref$size;
  return /*#__PURE__*/React.createElement(Box, {
    as: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    fill: "currentcolor",
    viewBox: "0 0 24 24",
    sx: {
      display: 'block',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
  }));
};
var MenuButton = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function MenuButton(props, ref) {
  return /*#__PURE__*/React.createElement(IconButton, theme_ui_components_esm_extends({
    ref: ref,
    title: "Menu",
    "aria-label": "Toggle Menu",
    variant: "menu"
  }, props), /*#__PURE__*/React.createElement(MenuIcon, null));
})));



// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(2031);
;// CONCATENATED MODULE: ./src/@lekoarts/gatsby-theme-cara/components/footer.tsx
/** @jsx jsx */const Footer=()=>{const[colorMode,setColorMode]=(0,theme_ui_color_modes_esm/* useColorMode */.If)();const isDark=colorMode===`dark`;const toggleColorMode=e=>{setColorMode(isDark?`light`:`dark`);};return (0,theme_ui_esm/* jsx */.tZ)(Box,{as:"footer",variant:"footer"},(0,theme_ui_esm/* jsx */.tZ)("button",{sx:{variant:`buttons.toggle`,fontWeight:`semibold`,display:`block`,mx:`auto`,mb:3},onClick:toggleColorMode,type:"button","aria-label":"Toggle dark mode"},isDark?`Hell`:`Dunkel`),"Copyright \xA9 ",new Date().getFullYear(),". Alle Rechte vorberhalten.",(0,theme_ui_esm/* jsx */.tZ)("br",null),(0,theme_ui_esm/* jsx */.tZ)(Flex,{sx:{justifyContent:`center`,alignItems:`center`,mt:3,color:`text`,fontWeight:`semibold`,a:{color:`text`}}},(0,theme_ui_esm/* jsx */.tZ)(gatsby_browser_entry.Link,{to:"/impressum"},"Impressum")));};/* harmony default export */ const footer = (Footer);
;// CONCATENATED MODULE: ./src/@lekoarts/gatsby-theme-cara/sections/contact.mdx
const contact_excluded=["components"];/* @jsx mdx *//* @jsxRuntime classic */ /* @jsx mdx */const contact_frontmatter={};const contact_layoutProps={_frontmatter: contact_frontmatter};const contact_MDXLayout="wrapper";function contact_MDXContent(_ref){let{components}=_ref,props=(0,objectWithoutProperties/* default */.Z)(_ref,contact_excluded);return (0,esm/* mdx */.kt)(contact_MDXLayout,Object.assign({},contact_layoutProps,props,{components:components,mdxType:"MDXLayout"}),(0,esm/* mdx */.kt)("h2",null,`Uns erreichen`),(0,esm/* mdx */.kt)("p",null,(0,esm/* mdx */.kt)("a",{parentName:"p","href":"https://go.nibyou.com/facebook"},`Facebook`),` - `,(0,esm/* mdx */.kt)("a",{parentName:"p","href":"https://go.nibyou.com/github"},`GitHub`),` - `,(0,esm/* mdx */.kt)("a",{parentName:"p","href":"https://go.nibyou.com/twitter"},`Twitter`),` - `,(0,esm/* mdx */.kt)("a",{parentName:"p","href":"https://go.nibyou.com/linkedin"},`LinkedIn`)));};contact_MDXContent.isMDXComponent=true;
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/components/contact.tsx
/** @jsx jsx */// @ts-ignore
const Contact=({offset,factor=1})=>(0,theme_ui_esm/* jsx */.tZ)("div",null,(0,theme_ui_esm/* jsx */.tZ)(divider/* default */.Z,{fill:"divider",speed:0.2,offset:offset,factor:factor},(0,theme_ui_esm/* jsx */.tZ)("div",{sx:{position:`absolute`,bottom:0,width:`full`,transform:`matrix(1, 0, 0, -1, 0, 0)`}},(0,theme_ui_esm/* jsx */.tZ)("div",{sx:{position:`relative`,height:`full`,svg:{width:`100%`,height:`40vh`},path:{animation:(0,animations/* waveAnimation */.Ry)(`20s`)}}},(0,theme_ui_esm/* jsx */.tZ)("svg",{xmlns:"http://www.w3.org/2000/svg",id:"contact-wave",viewBox:"0 0 800 338.05",preserveAspectRatio:"none"},(0,theme_ui_esm/* jsx */.tZ)("path",null,(0,theme_ui_esm/* jsx */.tZ)("animate",{attributeName:"d",values:"M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 100 Z",repeatCount:"indefinite",dur:"30s"})))))),(0,theme_ui_esm/* jsx */.tZ)(content/* default */.Z,{speed:0.4,offset:offset,factor:factor},(0,theme_ui_esm/* jsx */.tZ)(inner/* default */.Z,null,(0,theme_ui_esm/* jsx */.tZ)(contact_MDXContent,null)),(0,theme_ui_esm/* jsx */.tZ)(footer,null)),(0,theme_ui_esm/* jsx */.tZ)(divider/* default */.Z,{speed:0.1,offset:offset,factor:factor},(0,theme_ui_esm/* jsx */.tZ)(animations/* UpDown */.w6,null,(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:8,color:"icon_darkest",left:"70%",top:"20%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",width:8,stroke:true,color:"icon_darkest",left:"25%",top:"5%"})),(0,theme_ui_esm/* jsx */.tZ)(animations/* UpDownWide */.sr,null,(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"triangle",width:12,stroke:true,color:"icon_brightest",left:"95%",top:"50%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:6,color:"icon_brightest",left:"85%",top:"15%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"upDown",hiddenMobile:true,width:8,color:"icon_darkest",left:"45%",top:"10%"})),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:6,color:"icon_brightest",left:"4%",top:"20%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"circle",width:12,color:"icon_darkest",left:"70%",top:"60%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"box",width:12,color:"icon_darkest",left:"20%",top:"30%"}),(0,theme_ui_esm/* jsx */.tZ)(svg/* default */.Z,{icon:"hexa",width:8,stroke:true,color:"icon_darkest",left:"80%",top:"70%"})));/* harmony default export */ const contact = (Contact);
;// CONCATENATED MODULE: ./node_modules/@lekoarts/gatsby-theme-cara/src/templates/cara.tsx
const Cara=()=>/*#__PURE__*/index_js_.createElement(layout/* default */.Z,null,/*#__PURE__*/index_js_.createElement(react_spring_parallax_esm/* Parallax */.V,{pages:5},/*#__PURE__*/index_js_.createElement(hero,{offset:0,factor:1}),/*#__PURE__*/index_js_.createElement(projects,{offset:1,factor:2}),/*#__PURE__*/index_js_.createElement(about,{offset:3,factor:1}),/*#__PURE__*/index_js_.createElement(contact,{offset:4,factor:1})));/* harmony default export */ const cara = (Cara);

/***/ })

};
;
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-cara-src-templates-cara-tsx.js.map