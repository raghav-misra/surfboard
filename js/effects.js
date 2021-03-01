// PARAMS map for each effect
const params = (() => {
    try { return JSON.parse(localStorage.getItem("params") || undefined); }
    catch (e) { return Object.create(null); }
})();

// Generate map of KEY : EFFECT
const _keys = (() => {
    try { return JSON.parse(localStorage.getItem("effects") || undefined); }
    catch (e) { return Object.create(null); }
})();

const keyMap = Object.keys(_keys)
    .reduce((obj, key) => ({ ...obj, [_keys[key]]: key }), {});