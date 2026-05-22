const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});


function firstpageanime(){
  var t1 = gsap.timeline();

t1.from("#nav",{
y:'-10',
opacity : 0,
duration:1,
ease : Expo.easeInOut
})

.to(".boundinglm",{
    y:0,
    ease: Expo.easeInOut,
    duration :1.5,
    delay : -1,
    stagger: .2

})

.from("#herofooter",{
    y:-10,
    opacity : 0,
    duration : 1.5,
    delay : -1,
    ease : Expo.easeInOut
})

}

// circle mouse follower
function circlemousefollower(xscale,yscale){
  window.addEventListener("mousemove",function(dets){
   // console.log(dets.clientX,dets.clientY);
   document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  })
}

var timeout;

function circlesqeezing(){
  // define default scale value
  var xscale =1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0; 
  window.addEventListener("mousemove",function(dets){
   clearTimeout(timeout);
   var xdiff =  dets.clientX - xprev;
   var ydiff = dets.clientY - yprev;

    xscale =  gsap.utils.clamp(.8,1.2,xdiff);
    yscale =  gsap.utils.clamp(.8,1.2,ydiff); 


    xprev = dets.clientX;
    yprev = dets.clientY;

    circlemousefollower(xscale,yscale);
   timeout = setTimeout(function(){
   document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;


    },100)

  

  });
}

circlemousefollower();
firstpageanime();
circlesqeezing();

document.querySelectorAll(".elem").forEach(function(elem){
  var rotate =0;
  var diffrot =0;

  elem.addEventListener("mouseleave",function(dets){
  gsap.to(elem.querySelector("img"),{
    opacity:0,
    ease: Power1,
    duration: .5,
   
  });
});


elem.addEventListener("mousemove",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
  gsap.to(elem.querySelector("img"),{
    opacity:1,
    ease: Power3,
    top:diff,
    left : dets.clientX,
    rotate : gsap.utils.clamp(-20,20,diffrot*.5),
  });
});
});
