(function(g) {
  var __bem_xjst = (function(exports) {
     /// -------------------------------------
/// ---------- Bootstrap start ----------
/// -------------------------------------
function run(templates, context, ignore) {
  if (!ignore)
    ignore = {};
  var index = 0;
  var currentId = null;
  var last = null;

  Object.keys(ignore).forEach(function(key) {
    if (ignore[key] > 0)
      ignore[key]--;
  });

  function template() {
    var id = index++;
    var match = !context.$override &&
                Array.prototype.every.call(arguments, function(cond) {
      try {
        return typeof cond === 'function' ? cond.call(context) : cond;
      } catch (e) {
        if (/Cannot read property/.test(e.message))
          return false;
      }
    });

    // Respect applyNext
    if (match && ignore[id]) match = false;

    // Ignore body if match failed
    if (!match) return function() {};

    // Set current id
    currentId = id;

    return function bodyHandler(body) {
      last = {
        id: id,
        body: typeof body === 'function' ? body.bind(context)
                                         : function() { return body }
      };

      return null;
    };
  };

  function local() {
    var backup = [];

    Array.prototype.forEach.call(arguments, function(change) {
      Object.keys(change).forEach(function(key) {
        var parts = key.split('.'),
            newValue = change[key],
            oldValue,
            subContext = context;

        // Dive inside
        for (var i = 0; i < parts.length - 1; i++) {
          subContext = subContext[parts[i]];
        }

        // Set property and remember old value
        oldValue = subContext[parts[i]];
        subContext[parts[i]] = newValue;

        // Push old value to backup list
        backup.push({
          key: parts,
          value: oldValue
        });
      });
    });

    return function bodyHandler(body) {
      var result = typeof body === 'function' ? body.call(context) : body;

      // Rollback old values
      for (var i = backup.length - 1; i >= 0; i--) {
        var subContext = context,
            change = backup[i];

        // Dive inside
        for (var j = 0; j < change.key.length - 1; j++) {
          subContext = subContext[change.key[j]];
        }

        // Restore value
        subContext[change.key[j]] = change.value;
      }

      return result;
    };
  };

  function apply() {
    return local.apply(this, arguments)(function() {
      return run(templates, context, ignore);
    });
  };

  function applyNext() {
    return local.apply(this, arguments)(function() {
      ignore[currentId] = 2;
      return run(templates, context, ignore);
    });
  };

  function oninit(cb) {
    if (context.$init) cb(exports, context.$context);
  }

  templates.call(context, template, local, apply, applyNext, oninit);

  if (!last) {
    if (context.$init) return;
    throw new Error('Match failed');
  }
  return last.body();
};
exports.apply = function apply(ctx) {
  try {
    return applyc(ctx || this);
  } catch (e) {
    e.xjstContext = ctx || this;
    throw e;
  }
};function applyc(ctx) {
  return run(templates, ctx);
};
try {
  applyc({
    $init:true,
    $exports: exports,
    $context: { recordExtensions: function() {} }
  });
} catch (e) {
  // Just ignore any errors
}
function templates(template, local, apply, applyNext, oninit) {
/// -------------------------------------
/// ---------- Bootstrap end ------------
/// -------------------------------------

/// -------------------------------------
/// ---------- User code start ----------
/// -------------------------------------
/// -------------------------------------
/// --------- BEM-XJST Runtime Start ----
/// -------------------------------------

  var __$that = this,
      __$blockRef = {},
      __$elemRef = {},
      __$queue = [];

  // Called after all matches
  function __$flush() {
    __$queue.filter(function(item) {
      return !item.__$parent;
    }).forEach(function(item) {
      function apply(conditions, item) {
        if (item && item.__$children) {
          // Sub-template
          var subcond = conditions.concat(item.__$cond);
          item.__$children.forEach(function(child) {
            apply(subcond, child);
          });
        } else {
          var hasBlock = false;
          var hasElem = false;
          conditions = conditions.filter(function(cond) {
            if (cond === __$blockRef) {
              hasBlock = true;
              return false;
            }
            if (cond === __$elemRef) {
              hasElem = true;
              return false;
            }
            return true;
          });
          if (hasBlock && !hasElem) conditions.push(!__$that.elem);

          // Body
          template.apply(null, conditions)(item);
        }
      }
      apply([], item);
    });
  };

  // Matching
  function match() {
    function fn() {
      var args = Array.prototype.slice.call(arguments);

      args.forEach(function(arg) {
        if (arg && arg.__$children) {
          // Sub-template
          arg.__$parent = fn;
        }
        fn.__$children.push(arg);
      });

      // Handle match().match()
      var res = fn;
      while (res.__$parent) res = res.__$parent;
      return res;
    };
    __$queue.push(fn);
    fn.__$children = [];
    fn.__$parent = null;
    fn.__$cond = Array.prototype.slice.call(arguments);

    fn.match = match;
    fn.elemMatch = elemMatch;
    fn.block = block;
    fn.elem = elem;
    fn.mode = mode;
    fn.mod = mod;
    fn.elemMod = elemMod;
    fn.def = def;
    fn.tag = tag;
    fn.attrs = attrs;
    fn.cls = cls;
    fn.js = js;
    fn.jsAttr = jsAttr;
    fn.bem = bem;
    fn.mix = mix;
    fn.content = content;

    // match().match()
    if (this && this.__$children) {
      this.__$children.push(fn);
      fn.__$parent = this;
    }

    return fn;
  };

  function block(name) {
    return match.call(this, __$blockRef, __$that.block === name);
  };

  function elemMatch() {
    var args = Array.prototype.slice.call(arguments);
    return match.apply(this, [__$elemRef].concat(args));
  }

  function elem(name) {
    return match.call(this, __$elemRef, __$that.elem === name);
  };

  function mode(name) {
    return match.call(this, __$that._mode === name);
  };

  function mod(name, value) {
    return match.call(this, __$that.mods, function() {
      return __$that.mods[name] === value;
    });
  }

  function elemMod(name, value) {
    return match.call(this, __$that.elemMods, function() {
      return __$that.elemMods[name] === value;
    });
  }

  function def() { return mode.call(this, 'default'); };
  function tag() { return mode.call(this, 'tag'); };
  function attrs() { return mode.call(this,'attrs'); };
  function cls() { return mode.call(this, 'cls'); };
  function js() { return mode.call(this, 'js'); };
  function jsAttr() { return mode.call(this, 'jsAttr'); };
  function bem() { return mode.call(this, 'bem'); };
  function mix() { return mode.call(this, 'mix'); };
  function content() { return mode.call(this, 'content'); };

  // Apply by mode, local by mode and applyCtx
  apply = function(apply) {
    return function bemApply() {
      var args = Array.prototype.map.call(arguments, function(arg) {
        if (typeof arg === 'string') {
          return { _mode: arg };
        } else {
          return arg;
        }
      });
      return apply.apply(null, args);
    };
  }(apply);

  applyNext = function(applyNext) {
    return function bemApplyNext() {
      var args = Array.prototype.map.call(arguments, function(arg) {
        if (typeof arg === 'string') {
          return { _mode: arg };
        } else {
          return arg;
        }
      });
      return applyNext.apply(null, args);
    };
  }(applyNext);

  local = function(local) {
    return function bemLocal() {
      var args = Array.prototype.map.call(arguments, function(arg) {
        if (typeof arg === 'string') {
          return { _mode: arg };
        } else {
          return arg;
        }
      });
      return local.apply(null, args);
    };
  }(local);

  function applyCtx() {
    var context = arguments[arguments.length - 1];
    var rest = Array.prototype.slice.call(arguments, 0, -1);
    return applyNext.apply(this, [{ _mode: '', ctx: context }].concat(rest));
  };
;
;
/// -------------------------------------
/// --------- BEM-XJST Runtime End ------
/// -------------------------------------

/// -------------------------------------
/// ------ BEM-XJST User-code Start -----
/// -------------------------------------
/* begin: /Users/user/Development/bem-homefinance/libs/bem-core/common.blocks/i-bem/i-bem.bemtree */
oninit(function(exports) {

var BEM_ = {},
    toString = Object.prototype.toString,
    isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
    },
    buildEscape = (function() {
        var ts = { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' },
            f = function(t) { return ts[t] || t };
        return function(r) {
            r = new RegExp(r, 'g');
            return function(s) { return ('' + s).replace(r, f) }
        };
    })();

function BEMContext(context, apply_) {
    this.ctx = context;
    this.apply = apply_;
    this._buf = {};
    this._ = this;

    // Stub out fields that will be used later
    this._mode = '';
    this.block = undefined;
    this.elem = undefined;
    this.mods = undefined;
    this.elemMods = undefined;
};

BEMContext.prototype.isArray = isArray;

BEMContext.prototype.isSimple = function isSimple(obj) {
    var t = typeof obj;
    return t === 'string' || t === 'number' || t === 'boolean';
};

BEMContext.prototype.extend = function extend(o1, o2) {
    if(!o1 || !o2) return o1 || o2;
    var res = {}, n;
    for(n in o1) o1.hasOwnProperty(n) && (res[n] = o1[n]);
    for(n in o2) o2.hasOwnProperty(n) && (res[n] = o2[n]);
    return res;
};

BEMContext.prototype.identify = (function() {
    var cnt = 0,
        id = (+new Date()),
        expando = '__' + id,
        get = function() { return 'uniq' + id + ++cnt; };
    return function(obj, onlyGet) {
        if(!obj) return get();
        if(onlyGet || obj[expando]) return obj[expando];
        else return (obj[expando] = get());
    };
})();

BEMContext.prototype.xmlEscape = buildEscape('[&<>]');
BEMContext.prototype.attrEscape = buildEscape('["&<>]');

BEMContext.prototype.generateId = function generateId() {
    return this.identify(this.ctx);
};

BEMContext.prototype.doAsync = function(fn) {
    var mode  = this._mode,
        ctx   = this.ctx,
        block = this.block,
        elem  = this.elem,
        mods  = this.mods,
        elemMods = this.elemMods,
        promise = Vow.invoke(fn);

    (this.__queue || (this.__queue = [])).push(promise);

    promise.always(function() {
        this._mode = mode;
        this.ctx   = ctx;
        this.block = block;
        this.elem  = elem;
        this.mods  = mods;
        this.elemMods = elemMods;
    }.bind(this));

    return promise;
};

// Wrap xjst's apply and export our own
var oldApply = exports.apply;
exports.apply = BEMContext.applyAsync = function _applyAsync(context) {
    var ctx = new BEMContext(context || this, oldApply);

    ctx.__queue = [];
    ctx._buf = ctx.apply();

    return Vow.allResolved(ctx.__queue)
        .always(function() {
            return ctx._buf;
        });
};

});


match(this._mode === '')(

    match()(function() {
        this.ctx || (this.ctx = {});

        var vBlock = this.ctx.block,
            vElem = this.ctx.elem,
            block = this._currBlock || this.block;

        return apply('default', {
            block : vBlock || (vElem ? block : undefined),
            _currBlock : (vBlock || vElem) ? undefined : block,
            elem  : this.ctx.elem,
            mods : vBlock? this.ctx.mods || (this.ctx.mods = {}) : this.mods,
            elemMods : this.ctx.elemMods || {}
        });
    }),

    match(function() { return this._.isArray(this.ctx) })(function() {
        var v = this.ctx,
            l = v.length,
            i = 0,
            buf = [];

        while(i < l)
            buf.push(apply({ ctx: v[i++] }));

        return buf;
    }),

    match(function() { return !this.ctx })(),

    match(function() { return this._.isSimple(this.ctx) })(function() {
        var ctx = this.ctx;
        if(ctx && ctx !== true || ctx === 0) {
            return ctx;
        }
    })

);

def()(function() {
    var content = apply('content');
    if(content || content === 0) {
        this.ctx.content = apply('', { ctx : content });
    }
    return this.ctx;
});

content()(function() {
    return this.ctx.content
});

/* end: /Users/user/Development/bem-homefinance/libs/bem-core/common.blocks/i-bem/i-bem.bemtree */;
/// -------------------------------------
/// ------ BEM-XJST User-code End -------
/// -------------------------------------
__$flush();
/// -------------------------------------
/// ---------- User code end ------------
/// -------------------------------------
};;
     return exports;
  })({});
  var defineAsGlobal = true;
  if(typeof exports === "object") {
    exports["BEMTREE"] = __bem_xjst;
    defineAsGlobal = false;
  }
  if(typeof modules === "object") {
    modules.define("BEMTREE",
                   function(provide) { provide(__bem_xjst) });
    defineAsGlobal = false;
  }
  defineAsGlobal && (g["BEMTREE"] = __bem_xjst);
})(this);