window._currentEffect = ({ invert }) => ({
    style: /*css*/`
        video {
            filter: none;
            transition: filter 0.5s ease-in-out;
        }
    `,

    toggle() {
        const video = document.querySelector("video");
        video.style.filter = `invert(${invert || 1})`;

        return () => {
            video.style.filter = "none";
        };
    },

    duration: [500, 500]
});