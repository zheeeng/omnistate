var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/create-context.tsx
import React from "react";

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
  const SyncExternalStore = React.memo(function SyncExternalStore2(value) {
    React.useEffect(() => dummyExternalStore.fromEntries(Object.entries(value)), [value]);
    React.useEffect(() => () => {
      dummyHooksStore.clear();
      dummyExternalStore.clear();
    }, []);
    return null;
  });
  const Provider = (_a) => {
    var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
    const value = useValue(props);
    const [contextWithKeyList] = React.useState(() => {
      const contextWithKeyList2 = Object.entries(value).map(([key, fieldValue]) => {
        const context = React.createContext(fieldValue);
        const useContext = () => React.useContext(context);
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
    return contextWithKeyList.reduce((accChildren, currContextWithKey) => /* @__PURE__ */ React.createElement(currContextWithKey.context.Provider, {
      value: value[currContextWithKey.key]
    }, accChildren), /* @__PURE__ */ React.createElement(React.Fragment, null, children, /* @__PURE__ */ React.createElement(SyncExternalStore, __spreadValues({}, value))));
  };
  if (isDev && storeName) {
    Provider.displayName = `${BRAND_DISPLAY_NAME_PREFIX}${storeName}Provider`;
  }
  return [Provider, dummyHooksStore.store, dummyExternalStore.store];
}
export {
  createContext
};
