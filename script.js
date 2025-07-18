var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function firstPageAnimation(){
    var t1=gsap.timeline();

    t1.from("#nav",{
        y:"-10",
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem",{
            y:0,
            duration:2,
            ease: Expo.easeInOut,
            delay: -1,
            stagger: .2
        })
        .from("#footer",{
            y:-10,
            opacity:0,
            duration:0.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

function skew(){
    var xScale = 1;
    var yScale = 1;

    var xPrev = 0;
    var yPrev = 0;    
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);

        var xDiff = dets.clientX - xPrev;
        var yDiff = dets.clientY - yPrev;

        xScale = gsap.utils.clamp(0.8,1.2,xDiff);
        yScale = gsap.utils.clamp(0.8,1.2,yDiff);
        
        xPrev = dets.clientX;
        yPrev = dets.clientY;

        circleMouseFollower(xScale,yScale)
        timeout=setTimeout(function(){
            document.querySelector("#circlecursor").style.transform= `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        },100);
    });
}

function circleMouseFollower(xScale,yScale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#circlecursor").style.transform= `translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`;
    });
}

skew();
circleMouseFollower();
firstPageAnimation();

document.querySelectorAll(".element").forEach(function (element){
    var rotate = 0;
    var diffrot = 0;

    element.addEventListener("mouseleave",function(dets) {
        var diff = dets.clientY-element.getBoundingClientRect().top;
        diffrot = dets.clientX-rotate;
        rotate = dets.clientX;

        gsap.to(element.querySelector("img"), {
            opacity: 0,
            ease: Power1, 
            // top: dets.clientY,
            // left: dets.clientX
        });
    });


    element.addEventListener("mousemove",function(dets) {
        var diff = dets.clientY-element.getBoundingClientRect().top;
        diffrot = dets.clientX-rotate;
        rotate = dets.clientX;

        gsap.to(element.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot * 0.8)
            // top: dets.clientY,
            // left: dets.clientX
        });
    });
});