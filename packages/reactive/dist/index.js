var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
  toRaw: () => toRaw,
  useReactive: () => useReactive
});

// src/useReactive.ts
var import_react = __toESM(require("react"));

// src/utils/create-reactive.ts
var createReactive = (descriptorEntries) => {
  const reactive = {};
  descriptorEntries.forEach(([property, value, getter, setter]) => {
    const propertyDescriptor = getter ? { get: getter, set: setter } : { value };
    Object.defineProperty(reactive, property, propertyDescriptor);
  });
  return reactive;
};

// src/utils/derive.ts
var rawPrototypeWeakMap = /* @__PURE__ */ new WeakMap();
var derive = (toDerive) => {
  const derived = Object.create(toDerive);
  rawPrototypeWeakMap.set(derived, toDerive);
  return derived;
};
var toRaw = (derived) => {
  var _a;
  const prototype = (_a = rawPrototypeWeakMap.get(derived)) != null ? _a : derived;
  return Object.getOwnPropertyNames(prototype).reduce((raw, propertyName) => {
    raw[propertyName] = prototype[propertyName];
    return raw;
  }, {});
};

// src/useReactive.ts
function useReactive(toReactive, { accessors = [], methods = [] }) {
  const [, forceUpdate] = import_react.default.useReducer((times) => times + 1, 0);
  const [staticToReactive] = import_react.default.useState(toReactive);
  const [staticAccessors] = import_react.default.useState(accessors);
  const [staticMethods] = import_react.default.useState(methods);
  const accessorEntries = staticAccessors.map((accessor) => {
    const [accessorValue, setAccessorValue] = import_react.default.useState(() => staticToReactive[accessor]);
    const accessorGetter = import_react.default.useCallback(() => staticToReactive[accessor], [accessor]);
    const accessorSetter = import_react.default.useCallback((newValue) => {
      staticToReactive[accessor] = newValue;
      setAccessorValue(staticToReactive[accessor]);
    }, [accessor]);
    return [accessor, accessorValue, accessorGetter, accessorSetter];
  });
  const methodEntries = staticMethods.map((method) => {
    const methodAlternative = import_react.default.useCallback((...args) => {
      const ret = staticToReactive[method](...args);
      forceUpdate();
      return ret;
    }, [method]);
    return [method, methodAlternative];
  });
  const [reactivePrototype] = import_react.default.useState(() => createReactive([...accessorEntries, ...methodEntries]));
  const staticReactiveDeps = accessorEntries.map(([, value]) => value);
  const reactive = import_react.default.useMemo(() => derive(reactivePrototype), staticReactiveDeps);
  return reactive;
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toRaw,
  useReactive
});
