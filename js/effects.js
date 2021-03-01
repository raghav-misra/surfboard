const mount = document.querySelector("main");

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
    effectInProgress = true;

    const scriptTag = document.createElement("script");
    scriptTag.src = `/effects/${effect}.js`;
    scriptTag.async = true;

    scriptTag.addEventListener("load", () => {
        if (!window._currentEffect) {
            console.log("Unable to RUN effect (load successful):", effect);
            effectInProgress = false;
            return;
        }

        const { template, style, script, duration } = window._currentEffect(params);
        delete window._currentEffect;

        const styleTag = document.createElement("style");
        styleTag.textContent = style;
        document.head.appendChild(styleTag);

        mount.innerHTML = template;

        if (typeof script === "function") {
            script(mount);
        }

        setTimeout(() => {
            styleTag.remove();
            scriptTag.remove();
            mount.innerHTML = "";
            console.log("Completed effect:", effect);
            effectInProgress = false;
        }, duration - 1);
    });

    scriptTag.addEventListener("error", () => {
        scriptTag.remove();
        console.log("Unable to LOAD effect:", effect);
        effectInProgress = false;
    })

    document.body.appendChild(scriptTag);
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