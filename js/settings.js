function storedObjectOrDefault(key, defaultValue = {}) {
    try {
        return JSON.parse(localStorage.getItem(key) || undefined);
    }

    catch (e) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return JSON.parse(localStorage.getItem(key));
    }
}

const app = new Vue({
    el: "#app",
    data: {
        effects: storedObjectOrDefault("effects", {
            rippleEffect: "",
            textIntro: ""
        }),
        params: storedObjectOrDefault("params", {
            text: ""
        })
    },
    watch: {
        effects: {
            deep: true,
            handler() {
                localStorage.setItem("effects", JSON.stringify(this.effects));
            }
        },
        params:  {
            deep: true,
            handler() {
                localStorage.setItem("params", JSON.stringify(this.params));
            }
        },
    },
    methods: {
        clearData() {
            localStorage.clear();
            location.reload();
        }
    }
});