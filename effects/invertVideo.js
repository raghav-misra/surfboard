window._currentEffect = () => ({
    template: /*html*/``,
    style: /*css*/`
        video {
            filter: none;
            animation: invert 2s ease;
        }
        
        @keyframes invert {
            50% {
                filter: invert(1);
            }
        }
    `,
    duration: 2000
});