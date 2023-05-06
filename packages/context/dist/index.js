var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createContext: () => createContext
});

// src/create-context.tsx
var import_react = __toESM(require("react"));

// src/utils/capitalize.ts
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// src/utils/dedent.ts
function dedent(text, preservedIndent = 0) {
  const trimmedFirstLineBreak = text.replace(/^\n/, "");
  const trimmedLastLineBreak = trimmedFirstLineBreak.replace(/\n$/, "");
  const lines = trimmedLastLineBreak.split("\n");
  const rawIndent = Math.min(...lines.filter((line) => line !== "").map((line) => line.search(/[^ ]|$/)));
  const toTrimIndentText = " ".repeat(Math.max(rawIndent, 0));
  const indentText = " ".repeat(Math.max(preservedIndent, 0));
  return lines.map((line) => line === "" ? line : line.replace(toTrimIndentText, indentText)).join("\n");
}

// src/dummy.ts
function createDummy(name) {
  const store = (() => {
    const record = {};
    if (globalThis.Proxy && name) {
      return new Proxy(record, {
        get: (target, key) => {
          if (!Object.prototype.hasOwnProperty.call(target, key)) {
            throw new Error(dedent(`

                            ------------------------------------------------------------
                            The property "${key}" does not exist on "${name}".
                                Read data which "${name}" provided fails.
                                Please make sure:
                                1. Your have rightly placed the provider of "${name}". See https://reactjs.org/docs/context.html#contextprovider for detail.".
                                2. Call the Omnistate hoo   ks after running React Application.
                            ------------------------------------------------------------

                            `));
          } else {
            return target[key];
          }
        }
      });
    }
    return record;
  })();
  const fromEntries = (entries) => {
    for (const [key, value] of entries) {
      store[key] = value;
    }
  };
  const clear = () => {
    for (const key of Object.keys(store)) {
      delete store[key];
    }
  };
  return {
    store,
    fromEntries,
    clear
  };
}

// src/create-context.tsx
var isDev = process.env.NODE_ENV !== "production";
var BRAND_DISPLAY_NAME_PREFIX = "Omnistate_";
var HOOK_MARK = "Hook_";
function createContext(useValue) {
  const storeName = isDev ? capitalize(useValue.name.replace(/^use/, "")) || "[anonymous]" : void 0;
  const dummyHooksStore = createDummy(storeName);
  const dummyExternalStore = createDummy(storeName);
  const SyncExternalStore = import_react.default.memo(function SyncExternalStore2(value) {
    import_react.default.useEffect(() => dummyExternalStore.fromEntries(Object.entries(value)), [value]);
    import_react.default.useEffect(() => () => {
      dummyHooksStore.clear();
      dummyExternalStore.clear();
    }, []);
    return null;
  });
  const Provider = (_a) => {
    var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
    const value = useValue(props);
    const [contextWithKeyList] = import_react.default.useState(() => {
      const contextWithKeyList2 = Object.entries(value).map(([key, fieldValue]) => {
        const context = import_react.default.createContext(fieldValue);
        const useContext = () => import_react.default.useContext(context);
        const hookName = `use${capitalize(key)}`;
        if (isDev) {
          context.displayName = `${BRAND_DISPLAY_NAME_PREFIX}${HOOK_MARK}${capitalize(hookName)}`;
        }
        return {
          hookName,
          key,
          context,
          useContext
        };
      });
      dummyHooksStore.fromEntries(contextWithKeyList2.map(({ hookName, useContext }) => [hookName, useContext]));
      return contextWithKeyList2;
    });
    return contextWithKeyList.reduce((accChildren, currContextWithKey) => /* @__PURE__ */ import_react.default.createElement(currContextWithKey.context.Provider, {
      value: value[currContextWithKey.key]
    }, accChildren), /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children, /* @__PURE__ */ import_react.default.createElement(SyncExternalStore, __spreadValues({}, value))));
  };
  if (isDev && storeName) {
    Provider.displayName = `${BRAND_DISPLAY_NAME_PREFIX}${storeName}Provider`;
  }
  return [Provider, dummyHooksStore.store, dummyExternalStore.store];
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createContext
});
