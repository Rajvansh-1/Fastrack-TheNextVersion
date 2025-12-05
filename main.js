import './style.css'


function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();


}
loco();




// cursor
function cursor(){
  const main=document.querySelector('body');

  main.addEventListener('mousemove',(event)=>{
    gsap.to('.cursor',{
      x:event.x,
      y:event.y,
      duration:0,
      opacity:1,
      stagger:0.02
    })
  })
  main.addEventListener('mouseleave',(event)=>{
    gsap.to('.cursor',{
      
      opacity:0,
      duration:0.001
    })
  })

}
cursor()



//loader Animation
function loader(){

  const loaderTl=gsap.timeline();
loaderTl.from('.loader .fastrack',{
  width:0,
  opacity:0,
  duration:.5,
  delay:0.2,

})
loaderTl.to('.loader .upText',{
  width:'100%',
  duration:1.5,
})
loaderTl.to('.loadText',{
  opacity:0,
  scale:0,
  // rotate:720,
  duration:.75,
  delay:0.3
})
loaderTl.to('.dialCircle',{
  scale:5.6,
  rotate:360,
  duration:1.5,
  delay:-.5,
  opacity:1
})
loaderTl.to('.dialCircle img',{
  scale:0,
  rotate:360,
  duration:1.5,
  delay:.75,
  opacity:1,
  top:'50%'

})
loaderTl.to('.dialCircle',{
  background:'white',
  border:'white',
  duration:1,
  delay:-1.5,
  opacity:1
})
loaderTl.to('.clock',{
  rotate:360,
  transformOrigin:'top left',
  duration:1.5,
  opacity:1,
  scale:1,
  delay:-1.8
})
loaderTl.to('.clock lottie-player',{
  rotate:360,
  duration:1.5,
  delay:-.5,
  scale:1.55,

})
loaderTl.to('.clock lottie-player',{
  
  duration:1,
  scale:1,
  
})
loaderTl.to('.wristWatch',{
  duration:1,
  opacity:1,
  delay:-.5
})
loaderTl.to('.dialCircle',{
  scale:20,
  rotate:360,
  duration:1.5,
  opacity:0, 
  
})
loaderTl.to('.wristWatch',{
  duration:.5,
  opacity:0,
  scale:.5,
  delay:-1.75,
  zIndex:-1
})
loaderTl.to('.clock lottie-player',{
  duration:.5,
  delay:-1.75,
  opacity:0,
  scale:0.7,
  zIndex:-1
})
loaderTl.to('.page',{
  opacity:0,
  duration:2,
  backgroun:'none',
  delay:-1
})
loaderTl.to('.page',{
  scale:0,
  duration:.1,
  delay:-.2
})



}
loader();

gsap.to('.navPage .navbar ',{
  scrollTrigger:{
    pin:true,
    scrub:2,
    start:'top top',
    end:'1000% top',
    trigger:'.navPage .navbar',
    scroller:`#main`,


  }
})


gsap.to('.page1 .video ',{
  scrollTrigger:{
    pin:true,
    scrub:2,
    start:'top top',
    end:'100% top',
    trigger:'.page1 .video',
    scroller:`#main`,
    markers:false


  }
})



//Horizontal scroll Animation
function scrollHorizontal(){

  const slider=document.querySelector('.wrapper');
  const sections=gsap.utils.toArray('.horizontalScroll .wrapper .slide');

  const tlScroll=gsap.timeline({
    default:{
      ease:'none'
    },
    scrollTrigger:{
      trigger:slider,
      scroller:'#main',
      pin:true,
      scrub:2,
      start:'top 0%',
      end:'top -100%',
      markers:false,
    }
  })

  tlScroll.to(slider,{
    xPercent:-75
  }, "<")


  let listX=['0','-50vw','-50vw'];
  let listY=['-50vh','100vh','-100vh'];
  let listRotate=['0deg','45deg','-45deg'];

  sections.forEach((stop, index)=> {

    if(index===0){

      tlScroll.from(stop.querySelector('.image'),{
        x:'-50vw',
        rotate:'-180deg',
        scrollTrigger:{
          trigger:stop.querySelector('.image'),
          containerAnimation:tlScroll,
          scrub:true,
          markers:false,
    
        }
      })

    }else{

      tlScroll.from(stop.querySelector('.image'),{
        x:listX[index-1],
        rotate:listRotate[index-1],
        y:listY[index-1],
        scrollTrigger:{
          trigger:stop.querySelector('.image'),
          containerAnimation:tlScroll,
          scrub:true,
          markers:false,
          end:'center center'
    
        }
      })
      

    }
  
  // console.log(stop.querySelector('.image'))
  
  
});
  
}

scrollHorizontal()


//Service Animation

function service(){

  const serviceContainer=document.querySelector('.services')
  const serviceLine=document.querySelector('.line')

  var tl= gsap.timeline({scrollTrigger: {start:'top 80%',end:'top 0%', markers:false, scroller:'#main', trigger:'.services', scrub:3, }})

  tl.from(serviceLine,{
    x:'-100%',
    duration:2,
    delay:0.5,
    ease: "slow(0.7,0.7,false)",

  })
  tl.from('.section',{
    y:-60,
    duration:1.5,
    opacity:0,
    stagger:0.6,
    ease: "elastic.out(0.9,0.3)",

  })
  tl.from('.serviceText', {
    opacity:0,
    x:-80,
    duration:0.5,
    stagger:0.5,
    delay:-2.5 

  })


}
service();


//Trendings Animation
function trendings(){

  gsap.from('.trendings .heading h1 div',{
    y:'-100px',
    scale:0,
    scrollTrigger: {
      trigger:'.trendings',
      scroller:'#main',
      markers:false,
      start:"top 70%",
      end:'top 20%',
      scrub:2,
    },
    duration:1,
    stagger:0.1
  
  })
  gsap.from('.trendings .slideContainer',{  
    opacity:0,
    x:'100%',
    scrollTrigger: {
      trigger:'.trendings',
      scroller:'#main',
      markers:false,
      start:"top 60%",
      end:'top 15%',
      scrub:2,
    },
    duration:1,
    delay:0.3
  
  })
  
  gsap.from('.trendings .slideContainer2',{
    opacity:0,
    x:'-100%',
    scrollTrigger: {
      trigger:'.trendings',
      scroller:'#main',
      markers:false,
      start:"top 50%",
      end:'top 10%',
      scrub:2,
    },
    duration:1,
    delay:0.3
  
  })
  
  

}
trendings();


function features(){

  gsap.from('.feature .heading h1 div',{
    y:'-100px',
    scale:0,
    scrollTrigger: {
      trigger:'.feature',
      scroller:'#main',
      markers:false,
      start:"top 80%",
      end:'top 30%',
      scrub:2,
    },
    duration:1,
    stagger:0.1
  
  });

  gsap.from('.featureSlide',{
    y:'100%',
    x:'100%',
    scale:0,

    scrollTrigger: {
      trigger:'.feature',
      scroller:'#main',
      markers:false,
      start:"top 50%",
      end:'top 0%',
      scrub:2,
    },
    duration:1.5,
  })
  
}
features()


//ShopYourVibe Animation
function shopYourVibe(){

  let tl1=gsap.timeline({scrollTrigger: {start:'top 0%',end:'top -100%', markers:false, scroller:'#main', trigger:'.slider', scrub:2, pin:true}})

  tl1.to('.shopYourVibe .sliderContainer .slider .slide1 .image',{
    y:'-100%',
    duration:2,
    stagger:-.2,
  })
  tl1.from('.shopYourVibe .sliderContainer .slider .slide2 .image',{
    y:'100%',
    delay:-3,
    duration:2,
    stagger:-.2,
    opacity:0
  })
  tl1.to('.shopYourVibe .sliderContainer .slider .slide2 .image',{
    y:'0',
    stagger:0,
    duration:1.2
  })
  tl1.to('.shopYourVibe .sliderContainer .slider .slide2 .image',{
    y:'-100%',
    duration:2,
    stagger:-.2,
  })
  tl1.from('.shopYourVibe .sliderContainer .slider .slide3 .image',{
    y:'100%',
    delay:-3,
    duration:2,
    stagger:-.2,
    opacity:0
  })
  tl1.to('.shopYourVibe .sliderContainer .slider .slide3 .image',{
    y:'0',
    stagger:0,
    duration:1.2
  })



}
shopYourVibe()

//Best Seller Animation
function bestSellerAnimation(){

  gsap.from('.bestSeller .heading h1 div',{
    // opacity:0,
    y:'-100px',
    scale:0,
    scrollTrigger: {
      trigger:'.bestSeller',
      scroller:'#main',
      markers:false,
      start:"top 70%",
      end:'top 20%',
      scrub:2,
      
    },
    duration:1,
    stagger:0.1
  
  })
  
  const slide=document.querySelectorAll('.bestSeller .bestSeller-slide')
  // console.log(slide)
  
  gsap.from('.bestSeller .bestSeller-slide',{
    opacity:0,
    scale:0,
    scrollTrigger: {
      trigger:'.bestSeller',
      scroller:'#main',
      markers:false,
      start:"top 55%",
      end:'top 10%',
      scrub:2,
    },
    duration:1,
    stagger:0.3
  
  })
  
  

}


 function category(){
  //Category
  document.querySelector(".l-btn1").addEventListener("mousemove", function () {
    const centerCenterElement = document.querySelector(".center-center1");
    const contentElement = document.querySelector(".content-1");
    if (window.matchMedia("(max-width: 540px)").matches) {
      centerCenterElement.style.height = "22vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 640px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "40vw";
    } else {
      centerCenterElement.style.height = "70vh";
      contentElement.style.width = "30vw";
    }
    document.querySelector(".l-btn1").style.color = "white";
    document.querySelector(".l-btn1").style.border = "none";
    document.querySelector(".content-1").style.opacity = "1";
    document.querySelector(".content-1").style.filter = "blur(0.5px)";
  });
  document.querySelector(".l-btn1").addEventListener("mouseleave", function () {
    document.querySelector(".center-center1").style.height = "0";
    document.querySelector(".l-btn1").style.color = "#dadada";
    document.querySelector(".l-btn1").style.border = "1px solid #b6b5b5";
    document.querySelector(".content-1").style.width = "20vw";
    document.querySelector(".content-1").style.opacity = "0";
    document.querySelector(".content-1").style.filter = "blur(10px)";
  });
  
  document.querySelector(".l-btn2").addEventListener("mousemove", function () {
    const centerCenterElement = document.querySelector(".center-center2");
    const contentElement = document.querySelector(".content-2");
    if (window.matchMedia("(max-width: 540px)").matches) {
      centerCenterElement.style.height = "22vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 640px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "40vw";
    } else {
      centerCenterElement.style.height = "50vh";
      contentElement.style.width = "30vw";
    }
    document.querySelector(".l-btn2").style.color = "white";
    document.querySelector(".l-btn2").style.border = "none";
    document.querySelector(".content-2").style.opacity = "1";
    document.querySelector(".content-2").style.filter = "blur(0.5px)";
  });
  document.querySelector(".l-btn2").addEventListener("mouseleave", function () {
    document.querySelector(".center-center2").style.height = "0";
    document.querySelector(".l-btn2").style.color = "#dadada";
    document.querySelector(".l-btn2").style.border = "1px solid #b6b5b5";
    document.querySelector(".content-2").style.width = "20vw";
    document.querySelector(".content-2").style.opacity = "0";
    document.querySelector(".content-2").style.filter = "blur(10px)";
  });
  
  document.querySelector(".r-btn1").addEventListener("mousemove", function () {
    const centerCenterElement = document.querySelector(".center-center3");
    const contentElement = document.querySelector(".content-3");
    if (window.matchMedia("(max-width: 540px)").matches) {
      centerCenterElement.style.height = "22vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 640px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "40vw";
    } else {
      centerCenterElement.style.height = "50vh";
      contentElement.style.width = "30vw";
    }
    document.querySelector(".r-btn1").style.color = "white";
    document.querySelector(".r-btn1").style.border = "none";
    document.querySelector(".content-3").style.opacity = "1";
    document.querySelector(".content-3").style.filter = "blur(0.5px)";
  });
  document.querySelector(".r-btn1").addEventListener("mouseleave", function () {
    document.querySelector(".center-center3").style.height = "0";
    document.querySelector(".r-btn1").style.color = "#dadada";
    document.querySelector(".r-btn1").style.border = "1px solid #b6b5b5";
    document.querySelector(".content-3").style.width = "20vw";
    document.querySelector(".content-3").style.opacity = "0";
    document.querySelector(".content-3").style.filter = "blur(10px)";
  });
  
  document.querySelector(".r-btn2").addEventListener("mousemove", function () {
    const centerCenterElement = document.querySelector(".center-center4");
    const contentElement = document.querySelector(".content-4");
    if (window.matchMedia("(max-width: 540px)").matches) {
      centerCenterElement.style.height = "22vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 640px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "80vw";
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      centerCenterElement.style.height = "35vh";
      contentElement.style.width = "40vw";
    } else {
      centerCenterElement.style.height = "50vh";
      contentElement.style.width = "30vw";
    }
    document.querySelector(".r-btn2").style.color = "white";
    document.querySelector(".r-btn2").style.border = "none";
    document.querySelector(".content-4").style.opacity = "1";
    document.querySelector(".content-4").style.filter = "blur(0.5px)";
  });
  document.querySelector(".r-btn2").addEventListener("mouseleave", function () {
    document.querySelector(".center-center4").style.height = "0";
    document.querySelector(".r-btn2").style.color = "#dadada";
    document.querySelector(".r-btn2").style.border = "1px solid #b6b5b5";
    document.querySelector(".content-4").style.width = "20vw";
    document.querySelector(".content-4").style.opacity = "0";
    document.querySelector(".content-4").style.filter = "blur(10px)";
  });
 }
 category();


 // Trending cards creation 
async function fillTrending() {
  const res = await fetch("https://jayasaha811733.github.io/ReImagine_2_API/assets.json");
  const data = await res.json();
  const arr = data.trending;
  const wrapper = document.querySelector(".trending-wrapper");
  const wrapper2 = document.querySelector(".trending-wrapper2");
  for (let i = 0; i < 5; i++) {
    wrapper.innerHTML =
      wrapper.innerHTML +
      `
        <div style="--position:${i}" class="slide trending-slide max-w-[400px] h-[250px] w-[98vw] border border-[#FF721D] rounded-[20px] bg-[#100F0F] p-3 absolute">
    <div class="desc flex flex-col w-[60%] justify-between p-3 h-full font-bold">

      <div class="logo w-[30%]">
        <img src="https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/faslogo.png" alt="logo">
      </div>

      <div class="itemName text-white">
        <p>${arr[i].name.slice(0, 35)}...</p>
      </div>

      <div class=" text-[grey] text-[9px] leading-3">
        ${arr[i].cate}
      </div>

      <div class="price flex gap-2 items-center">
        <div class="sp text-white text-sm">&#8377; ${arr[i].price}</div>
        <div class="mrp line-through text-[grey] text-sm">&#8377; 7000</div>
        <div class="discount text-[#FF721D] text-xs">62% OFF</div>
      </div>

      <div class="buttonContainer flex gap-3 text-white">
        <div class="buyNow hov-eff transition-all duration-700 px-3 py-2 bg-gradient-to-r from-[#FF721D] to-[#972b07] rounded-full text-[10px] text-center font-bold tracking-wide ">BUY NOW</div>
        <div class="addToCart hov-eff transition-all duration-700 px-3 py-2 bg-gradient-to-r from-[#FF721D] to-[#972b07] rounded-full text-[10px] text-center font-bold tracking-wide">+ ADD TO CART</div>
      </div>

    </div>

    <div class="watch-img absolute transition-all duration-500 w-[45%] h-[110%] top-1/2 -right-[7%] -translate-y-1/2">
      <img class="h-full object-cover "  src="${arr[i].img}" alt="">
    </div>

    </div>   
    `;
  }

  for(let i=5; i<10; i++){
    wrapper2.innerHTML =
      wrapper2.innerHTML +
      `
        <div style="--position:${i-5}" class="slide trending-slide max-w-[400px] h-[250px] w-[98vw] border border-[#FF721D] rounded-[20px] bg-[#100F0F] p-3 relative">
    <div class="desc flex flex-col w-[60%] justify-between p-3 h-full font-bold">

      <div class="logo w-[30%]">
        <img src="https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/faslogo.png" alt="logo">
      </div>

      <div class="itemName text-white">
        <p>${arr[i].name.slice(0, 35)}...</p>
      </div>

      <div class=" text-[grey] text-[9px] leading-3">
        ${arr[i].cate}
      </div>

      <div class="price flex gap-2 items-center">
        <div class="sp text-white text-sm">&#8377; ${arr[i].price}</div>
        <div class="mrp line-through text-[grey] text-sm">&#8377; 7000</div>
        <div class="discount text-[#FF721D] text-xs">62% OFF</div>
      </div>

      <div class="buttonContainer flex gap-3 text-white">
        <div class="buyNow hov-eff transition-all duration-700 px-3 py-2 bg-gradient-to-r from-[#FF721D] to-[#972b07] rounded-full text-[10px] text-center font-bold tracking-wide ">BUY NOW</div>
        <div class="addToCart hov-eff transition-all duration-700 px-3 py-2 bg-gradient-to-r from-[#FF721D] to-[#972b07] rounded-full text-[10px] text-center font-bold tracking-wide">+ ADD TO CART</div>
      </div>

    </div>

    <div class="watch-img absolute transition-all duration-500 w-[45%] h-[110%] top-1/2 -right-[7%] -translate-y-1/2">
      <img class="h-full object-cover "  src="${arr[i].img}" alt="">
    </div>

    </div>   
    `;
  }
}
fillTrending();

// Best Seller Cards Creation
async function bestSeller() {
  const res = await fetch("https://jayasaha811733.github.io/ReImagine_2_API/assets.json");
  const data = await res.json();
  const arr = data.Bestseller;
  const wrapper = document.querySelector(".bs-wrapper");

  arr.forEach((element) => {
    wrapper.innerHTML =
      wrapper.innerHTML +
      `
        <div
                class="bestSeller-slide h-[340px] custom:h-[400px] relative rounded-xl bg-[#1D1C1C] overflow-hidden"
              >
                <div class="imgBox">
                  <img
                    class="lg:w-[200px] custom:w-[170px] w-[130px]"
                    src="${element.img}"
                    alt=""
                  />
                </div>

                <div
                  class="contentBox pt-[30px] flex flex-col gap-2 custom:gap-3"
                >
                  <h2
                    class="text-white relative font-bold text-lg custom:text-xl sm:text-2xl"
                  >
                    ${element.name}
                  </h2>
                  <p
                    class="bestSeller-cate text-[#7d7d7d] text-[10px] leading-3"
                  >
                    ${element.cate}
                  </p>
                  <div
                    class="bestSeller-price flex gap-2 items-center justify-center"
                  >
                    <div
                      class="font-semibold text-white text-[13px] custom:text-[15px] md:text-lg lg:text-xl"
                    >
                      &#8377; ${element.price}
                    </div>
                    <div
                      class="font-semibold line-through text-[grey] text-[13px] custom:text-[15px] md:text-lg lg:text-xl"
                    >
                      &#8377; 7000
                    </div>
                    <div
                      class="discount text-[#FF721D] text-[9px] custom:text-xs"
                    >
                      62% OFF
                    </div>
                  </div>
                  <div class="bestSeller-button w-full flex justify-center">
                    <div
                      class="buyNow hov-eff transition-all duration-700 px-3 py-2 bg-gradient-to-r from-[#FF721D] to-[#972b07] rounded-md text-[white] text-[12px] md:text-[15px] text-center font-bold tracking-widest w-[80%] sm:w-[70%]"
                    >
                      ADD TO CART
                    </div>
                  </div>
                </div>
              </div>
    `;
  });

  bestSellerAnimation()
  cart()
}
bestSeller();


//videoAspect configuration
function videoRatio(){
  const width= window.innerWidth;
  const height=window.innerHeight;
  // console.log(width , height)
  const video=document.querySelector('.page1');
  const source=document.querySelector('.page1 video source')
  const overcast=document.querySelector('.page1 .overCast')
  const scrollAspect=document.querySelector('.scroll-aspect');
  const slider1=document.querySelectorAll('.shopYourVibe .slide1 .image');
  const slider2=document.querySelectorAll('.shopYourVibe .slide2 .image');
  const slider3=document.querySelectorAll('.shopYourVibe .slide3 .image');


  function resizeVdo(){

    const width= window.innerWidth;
    const height=window.innerHeight;
    // console.log((width/height).toFixed(2) , (height/width).toFixed(2))
    let hRatio=width/height;
    let vRatio=height/width;

    if(hRatio>vRatio){
        video.style.aspectRatio=16/9;
        source.src='https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/vdbig.mp4';
        overcast.style.aspectRatio=16/9;

        scrollAspect.src='https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/banner1.png';
        slider1.forEach((element, idx) => {
          element.style.background=`url('https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/banner1.png')`;
          
          element.style.backgroundPosition=`${25 * idx}%`;
          element.style.backgroundSize=`500% 100%`
          
        });
        slider2.forEach((element, idx) => {
          element.style.background=`url('https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/banner2.png')`;
          
          element.style.backgroundPosition=`${25 * idx}%`;
          element.style.backgroundSize=`500% 100%`
          
        });
        slider3.forEach((element, idx) => {
          element.style.background=`url('https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/banner3.png')`;
          
          element.style.backgroundPosition=`${25 * idx}%`;
          element.style.backgroundSize=`500% 100%`
          
        });
        
    }else{
        video.style.aspectRatio=9/16;

        
        source.src='https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/vdsmall.mp4';
        overcast.style.aspectRatio=9/16;

        scrollAspect.src='https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/smbanner1.png';
        slider1.forEach((element, idx) => {
          element.style.background=`url('https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/smbanner1.png')`;

          element.style.backgroundPosition=`${25 * idx}%`;
          element.style.backgroundSize=`500% 100%`;
          // element.style.border='1px solid red'
          
        });
        slider2.forEach((element, idx) => {
          element.style.background=`url('https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/smbanner2.png')`;

          element.style.backgroundPosition=`${25 * idx}%`;
          element.style.backgroundSize=`500% 100%`;
          // element.style.border='1px solid red'
          
        });
        slider3.forEach((element, idx) => {
          element.style.background=`url('https://raw.githubusercontent.com/JayaSaha811733/ReImagine_2_API/main/smbanner3.png')`;

          element.style.backgroundPosition=`${25 * idx}%`;
          element.style.backgroundSize=`500% 100%`;
          // element.style.border='1px solid red'
          
        });
        


    }

  }
  resizeVdo()
  
  window.addEventListener('resize', resizeVdo)
}
videoRatio()



function canvas(){
  const canvas=document.querySelector('canvas');
  const context=canvas.getContext('2d');

  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  window.addEventListener('resize', function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    render();
  })

  function files(index){
    var data=`https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_000.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_001.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_002.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_003.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_004.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_005.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_006.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_007.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_008.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_009.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_010.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_011.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_012.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_013.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_014.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_015.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_016.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_017.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_018.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_019.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_020.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_021.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_022.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_023.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_024.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_025.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_026.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_027.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_028.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_029.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_030.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_031.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_032.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_033.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_034.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_035.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_036.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_037.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_038.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_039.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_040.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_041.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_042.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_043.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_044.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_045.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_046.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_047.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_048.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_049.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_050.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_051.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_052.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_052.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_054.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_055.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_056.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_057.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_058.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_059.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_060.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_061.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_062.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_063.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_064.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_065.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_066.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_067.jpg
    https://jayasaha811733.github.io/Reimagine2ImageSequence/VN20240724_170147_068.jpg

    `
    return data.split("\n")[index];
  }

  const frameCount=69;

  const images=[];
  const imageSeq={
    frame:1,
  }

  for (let i = 0; i < frameCount; i++) {
    const img=new Image();
    img.src=files(i);
    images.push(img);
    
  }

  gsap.to(imageSeq,{
    frame:frameCount-1,
    snap:'frame',
    ease:'none',
    scrollTrigger:{
      scrub:3,
      trigger:'.page10 canvas',
      start:'top top',
      end:'300% top',
      scroller:'#main'
    },
    onUpdate:render
  });

  images[1].onload=render;

  function render(){
    scaleImage(images[imageSeq.frame], context);
  }


  function scaleImage(img, ctx){
    var canvas=ctx.canvas;
    var hRatio=canvas.width/img.width;
    var vRatio=canvas.height/img.height;
    var ratio=Math.max(hRatio, vRatio);
    var centerShift_x=(canvas.width - img.width*ratio) / 2;
    var centerShift_y=(canvas.height - img.height*ratio) / 2;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width*ratio,
      img.height*ratio
    );
  }


  let canvasTl=gsap.timeline({
    default:'none',
    scrollTrigger:{
      trigger:'.page10>canvas',
      pin:true,
      scroller:'#main',
      start:'top top',
      end:'300% top'
    }
  })


}
canvas()


let tlWhy=gsap.timeline({

  scrollTrigger:{
    trigger:'.page12',
    start:'50% 100%',
    end:'50% 50%',
    scrub:true,
    markers:false,
    scroller:'#main'
  }

})

if(window.innerWidth>1023){
  tlWhy.to('.imageWhy',{
    top:'100vh',
    left:'0',
    translateY:'50%',
    zIndex:5,
    
  })
}
else{
  tlWhy.to('.imageWhy',{
    top:'100vh',
    // translateY:'50%'
    zIndex:5
    
  })
}
let tlWhy2=gsap.timeline({

  scrollTrigger:{
    trigger:'.page13',
    start:'50% 100%',
    end:'50% 50%',
    scrub:true,
    markers:false,
    scroller:'#main'
  }

})

if(window.innerWidth>1023){
  tlWhy2.to('.imageWhy',{
    top:'200vh',
    left:'100%',
    translateY:'50%',
    translateX:'-100%'
    
  })
}
else{
  tlWhy2.to('.imageWhy',{
    top:'200vh',
    // translateY:'50%'
    zIndex:5
    
  })
}


//Add To Cart 

function cart(){
const addToCartBS=document.querySelectorAll('.bestSeller  .buyNow');
// console.log(addToCartBS)
addToCartBS.forEach(element => {
  element.addEventListener('click',()=>{
    if(element.innerHTML==='ADD TO CART'){
      element.innerHTML=`GO TO CART`
    }
    else{
      element.innerHTML=`ADD TO CART`
    }
  })
  
});

const addToCartT=document.querySelectorAll('.trendings .addToCart');
// console.log(addToCartT)
addToCartT.forEach(element => {
  element.addEventListener('click',()=>{

    // console.log(element.innerHTML)
    if(element.innerHTML==='+ ADD TO CART'){
      element.innerHTML=`GO TO CART`
    }
    else{
      element.innerHTML=`+ ADD TO CART`
    }
  })
});

const addToCartF=document.querySelector('.feature .addToCart');
addToCartF.addEventListener('click',()=>{
  // console.log(addToCartF.innerHTML.trim())
  if(addToCartF.innerHTML.trim()==='+ ADD TO CART'){
    addToCartF.innerHTML=`GO TO CART`
  }
  else{
    addToCartF.innerHTML=`+ ADD TO CART`
  }

})

}

//feature
var swiper = new Swiper('.swiper-container', {

  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    450:{
      slidesPerView: 4,
      spaceBetween: 20,
    }
  },
});

document.querySelectorAll('.swiper-slide').forEach(slide => {
  slide.addEventListener('click', function() {

    const img = this.querySelector('img');
    const featureImg = document.querySelector('.feature-img-div')
    const outerDiv = document.querySelector('.feature-text')

    if (window.matchMedia("(max-width: 740px)").matches){
      document.querySelector('.feature-img').src = img.src
      document.querySelector('.feature-img').classList.remove('scale-x-[-1]')
      document.querySelector('.feature-img').classList.remove('transform')
      featureImg.classList.remove('justify-start')
      featureImg.classList.add('justify-center')
      featureImg.classList.add('pb-8')
      document.querySelector('.feature-img-outer').classList.remove('justify-start')
      document.querySelector('.feature-img-outer').classList.add('justify-center')
      document.querySelector('.feature-img').classList.remove('w-full')
      document.querySelector('.feature-img').classList.add('h-[249px]')
      outerDiv.style.display = 'none'
    }
    else{
      document.querySelector('.feature-img').src = img.src
      document.querySelector('.feature-img-outer').classList.add('!w-[85%]')
      document.querySelector('.feature-img').classList.remove('scale-x-[-1]')
      document.querySelector('.feature-img').classList.remove('transform')
      featureImg.classList.remove('items-end');
      featureImg.classList.add('items-center');
      outerDiv.style.display = 'none'
      featureImg.classList.remove('justify-start')
      featureImg.classList.add('justify-center')
     
      outerDiv.classList.add('justify-center')
    }


   
   
  }); 
});

