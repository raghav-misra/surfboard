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

// Trigger effect megafunction:
let effectInProgress = false;
function triggerEffect(effect) {
    
}

// Listen for key presses:
document.body.addEventListener("keyup", e => {
    const key = e.key.toLowerCase();

    // Go to settings:q
    if (key === "escape") {
        location.href = "/settings.html";
    }

    else if (typeof keyMap[key] === "string" && !effectInProgress) {
        console.log("Trigger effect:", keyMap[key]);
        triggerEffect(keyMap[key]);
    }
});