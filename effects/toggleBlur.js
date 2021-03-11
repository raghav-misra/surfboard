window._currentEffect = ({ blur }) => ({
    style: /*css*/`
        video {
            filter: none;
            transition: filter 0.5s ease-in-out;
        }
    `,

    toggle() {
        const video = document.querySelector("video");
        video.style.filter = `blur(${blur || 4}px)`;

        return () => {
            video.style.filter = "none";
        };
    },

    duration: [500, 500]
});