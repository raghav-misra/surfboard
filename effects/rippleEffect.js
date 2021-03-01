window._currentEffect = () => ({
    template: /*html*/`
    <div class="circle">
        <div class="circle">
            <div class="circle"></div>
        </div>
    </div>
    `,
    style: /*css*/`
        main .circle {
            transform: scale(0);
            border-radius: 50%;
            border: 50px red solid;
            display: flex;
            box-shadow: 0 0 100px white;
            justify-content: center;
            align-items: center;
            animation: big 1s ease-in-out;
        }
        
        main > .circle {
            width: 2000px;
            height: 2000px;
        }
        
        main > .circle > .circle {
            width: 1500px;
            height: 1500px;
        }
        
        main > .circle > .circle > .circle {
            width: 500px;
            height: 500px;
        }
        
        @keyframes big {
            from {
                transform: scale(0);
            }
        
            to {
                transform: scale(2);
            }
        }
    `,
    duration: 1000
});