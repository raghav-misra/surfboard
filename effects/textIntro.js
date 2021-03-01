window._currentEffect = params => ({
    template: /*html*/`
        <svg width="100%" height="100%" style="display:none;">
            <defs>
                <filter id="wavy" filterUnits="userSpaceOnUse" x="0" y="0">
                    <feTurbulence id="wave-animation" numOctaves="1" seed="1" baseFrequency="0 0.0645034">
                    </feTurbulence>
                    <feDisplacementMap scale="10" in="SourceGraphic"></feDisplacementMap>
                </filter>
                <animate 
                    xlink:href="#wave-animation" 
                    attributeName="baseFrequency" 
                    dur="5s" keyTimes="0;0.5;1" 
                    values="0.0 0.04;0.0 0.07;0.0 0.04"
                    repeatCount="indefinite"></animate>
            </defs>
        </svg>
        <span class="text">
            ${params.text}
        </span>
    `,
    style: /*css*/`
        main .text {
            font-size: 100px;
            font-weight: bold;
            filter: url("#wavy");
        
            /* -webkit-text-stroke: white 2px; */
            color: black;
            text-shadow: 0px 5px 0 white, 
                0px -5px 0 white,
                5px 0px 0 white, 
                -5px 0px 0 white;
        
            animation: skew-text 2s infinite;
        }
        
        @keyframes skew-text {
            33% {
                transform: skew(10deg);
            }
        
            66% {
                transform: skew(-10deg);
            }
        }
    `,
    script(mount) {
        console.log(mount);
    },
    duration: 2000
});