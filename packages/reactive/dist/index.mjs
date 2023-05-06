// src/useReactive.ts
import React from "react";

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
  const [, forceUpdate] = React.useReducer((times) => times + 1, 0);
  const [staticToReactive] = React.useState(toReactive);
  const [staticAccessors] = React.useState(accessors);
  const [staticMethods] = React.useState(methods);
  const accessorEntries = staticAccessors.map((accessor) => {
    const [accessorValue, setAccessorValue] = React.useState(() => staticToReactive[accessor]);
    const accessorGetter = React.useCallback(() => staticToReactive[accessor], [accessor]);
    const accessorSetter = React.useCallback((newValue) => {
      staticToReactive[accessor] = newValue;
      setAccessorValue(staticToReactive[accessor]);
    }, [accessor]);
    return [accessor, accessorValue, accessorGetter, accessorSetter];
  });
  const methodEntries = staticMethods.map((method) => {
    const methodAlternative = React.useCallback((...args) => {
      const ret = staticToReactive[method](...args);
      forceUpdate();
      return ret;
    }, [method]);
    return [method, methodAlternative];
  });
  const [reactivePrototype] = React.useState(() => createReactive([...accessorEntries, ...methodEntries]));
  const staticReactiveDeps = accessorEntries.map(([, value]) => value);
  const reactive = React.useMemo(() => derive(reactivePrototype), staticReactiveDeps);
  return reactive;
}
export {
  toRaw,
  useReactive
};
