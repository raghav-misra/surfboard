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

// Toggle-based effect:
const toggleOffCallbacks = Object.create(null);

function launchToggleEffect(scriptTag, effect, key) {
    effectInProgress = false;
    const styleTag = document.createElement("style");
    document.head.appendChild(styleTag);

    if (typeof effect.style === "string") {
        styleTag.textContent = effect.style;
    }

    const untoggleEffect = effect.toggle();

    setTimeout(() => {
        toggleOffCallbacks[key] = () => {
            untoggleEffect();
            setTimeout(() => {
                styleTag.remove();
                scriptTag.remove();
                console.log("Completed TOGGLE effect:", effect);

                delete toggleOffCallbacks[key];
            }, effect.duration[1] - 1);
        };
    }, effect.duration[0] - 1);
}

// Time-based effect:
function launchDurationEffect(scriptTag, effect) {
    const styleTag = document.createElement("style");
    document.head.appendChild(styleTag);

    if (typeof effect.template === "string") {
        mount.innerHTML = effect.template;
    }

    if (typeof effect.style === "string") {
        styleTag.textContent = effect.style;
    }

    if (typeof effect.script === "function") {
        effect.script();
    }

    setTimeout(() => {
        styleTag.remove();
        scriptTag.remove();
        mount.innerHTML = "";
        console.log("Completed DURATION effect:", effect);
        effectInProgress = false;
    }, effect.duration - 1);
}

// Trigger effect megafunction:
let effectInProgress = false;
function triggerEffect(effect, key) {
    effectInProgress = true;

    const scriptTag = document.createElement("script");
    scriptTag.src = `/effects/${effect}.js`;
    scriptTag.async = true;

    scriptTag.addEventListener("load", () => {
        if (!window._currentEffect) {
            console.log("Unable to RUN effect (load successful, error in effect script):", effect);
            effectInProgress = false;
            return;
        }

        const effect = window._currentEffect(params);
        delete window._currentEffect;

        if (typeof effect.toggle === "function") {
            launchToggleEffect(scriptTag, effect, key);
        }

        else {
            launchDurationEffect(scriptTag, effect);
        }
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
    if (key === "s") {
        location.href = "/settings.html";
    }

    else if (toggleOffCallbacks[key]) {
        toggleOffCallbacks[key]();
    }

    else if (typeof keyMap[key] === "string" && !effectInProgress) {
        console.log("Trigger effect:", keyMap[key]);
        triggerEffect(keyMap[key], key);
    }
});

// Initialize video element:
const videoPlayer = document.querySelector("#videoPlayer");

// Adjust player on resize:
function adjustVideoSize() {
    document.querySelectorAll("video").forEach(v => {
        v.setAttribute("width", innerWidth);
        v.setAttribute("height", innerHeight);
    });
}

addEventListener("resize", adjustVideoSize);
adjustVideoSize();

// Trigger video prompt:
alert("Click anywhere to start. If this is your first time, press the 'S' key to configure effects.");
document.body.addEventListener("click", () => {
    const videoUpload = document.querySelector("#videoUpload");

    videoUpload.addEventListener("input", () => {
        document.querySelectorAll("video").forEach(v => v.src = URL.createObjectURL(videoUpload.files[0]));
        alert("Playing video.");
        setTimeout(() => {
            videoPlayer.play();
        }, 500);

        document.querySelectorAll(".motion-blur-clone").forEach(cloneVideo => setTimeout(() => cloneVideo.play(), Number(cloneVideo.dataset.offset)));
    });

    videoUpload.click();
}, {
    once: true
});