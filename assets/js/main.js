// const html = document.getElementsByTagName("html");
const body = document.querySelector(".body");
const header = document.querySelector(".header-desktop");
const hamburgerBtn = document.getElementById("hamburger-btn");
const scrollingHeader = document.querySelector(".header");


gsap.registerPlugin(ScrollTrigger);

// Lenis Imported
const lenis = new Lenis({
    duration: 1,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})


ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scroll = value
      }
      return lenis.scroll
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
})
  
ScrollTrigger.defaults({ scroller: document.body })


// Toggle the header on scroll
let prevScrollPos = lenis.scroll;
function toggleHeader() {
    let currentScrollPos = lenis.scroll;
    if(prevScrollPos > currentScrollPos){
        scrollingHeader.style.transform = "translateY(0)";
    }else{
        scrollingHeader.style.transform = "translateY(-180px)";
    }
    prevScrollPos = currentScrollPos;
}

//====== Sticky Header start ==========
function stickyHeader() {
  const scrollY = lenis.scroll;
  if(header){
      scrollY > 20 ? header.classList.add("sticky") : header.classList.remove("sticky");
  }
}
//======= Sticky Header End ===========


lenis.on('scroll', (e) => {
    toggleHeader();
    stickyHeader();
});


function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


let isOpened = false;
function stopLenisScroll(){
    isOpened = !isOpened;
    isOpened ? lenis.stop() : lenis.start();
}

// ----=== Loader Start ----=========
window.onload = function(){
    const revealText = new SplitType(".reveal-p");
    const tl = gsap.timeline();

    const loader = document.querySelector(".loader-container");
    if(loader){
        loader.style.display = "none"; 
    }

    tl.from(".header__logo", {
        opacity:0,
        duration:1.5,
        delay:-0.95,
        ease:"power3.out",
    })
    .from(".nav", {
        opacity:0,
        duration:1,
        delay:-0.8,
        ease:"power3.out",
    })
    .from(".nav__link", {
        opacity:0,
        y:30,
        stagger:0.01,
        duration:1,
        delay:-0.85,
        ease:"power3.out",
    })
    .from(".h-title-reveal", {
        opacity:0,
        backgroundPositionX:"0%",
        duration:1.15,
        delay:-0.9,
        ease:"power3.out",
    })
    .from(".h-reveal-btn", {
        opacity:0,
        y:30,
        duration:1,
        delay:-0.92,
        ease:"power3.out",
    })
    revealText.lines.forEach(line => {
        tl.from(line,{
            opacity:0,
            y: 100,
            rotation: 10,
            duration: 1.25,
            stagger: 0.1,
            delay:-0.95,
            ease: "expo.out",
        });
    })
    tl.from(".hero-banner__wrapper img", {
        opacity:0,
        y:60,
        duration:1.5,
        delay:-2.5,
        ease: "power3.inOut"
    })
}
// ----=== Loader End ----=========


//====== Active Page Link Start ======
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".nav__link");
const mobileNavLinks = document.querySelectorAll(".mobile-menu__link");

function activeLink(link) {
    const linkPathname = new URL(link.href).pathname;
    if((windowPathname === linkPathname) || (windowPathname === "./index.html" && linkPathname === "/")){
        link.classList.add("active");
    }
}

navLinks && navLinks.forEach((navLink) => {
    activeLink(navLink);
});

mobileNavLinks && mobileNavLinks.forEach((navLink) => {
    activeLink(navLink);
});


//====== Active Page Link End ======


//====== Toggle Mobile Menu Start ==========
function toggleMobileMenu(){
    const mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("is-open");
    body.classList.toggle("disable-scroll");
    stopLenisScroll();
}

if(hamburgerBtn){
    hamburgerBtn.onclick = toggleMobileMenu;
    const closeMenuBtn = document.getElementById("close-menu-btn");
    closeMenuBtn.onclick = toggleMobileMenu;
}
//====== Toggle Mobile Menu End ==========


// ============ Swipers Start =================
const mySwiper = document.querySelector("#mySwiper");
if(mySwiper){
    const swiper1 = new Swiper(mySwiper, {
        slidePerView:1,
        navigation:{
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev ",
        }
    })
}

// ============ Swipers End =================


// ======== Accordian Toggle Start ========
const accordions = document.querySelectorAll(".accordion__title-wrapper");
accordions && accordions.forEach((accordion)=>{
    accordion.addEventListener("click", function(){
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content) {
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        }

        accordions.forEach((acdnItem)=>{
            if(acdnItem !== accordion){
                acdnItem.classList.remove("active");
                acdnItem.nextElementSibling.style.maxHeight = null;
            }
        })
    });

})

const mobileSubmenu = document.querySelectorAll(".mobile-submenu");
mobileSubmenu && mobileSubmenu.forEach((submenu)=>{
    submenu.addEventListener("click", function(){
        const menu = submenu.querySelector(".subMenu__list--mobile");
        submenu.classList.toggle("active");
        let content = menu;
        if (content) {
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        }

        mobileSubmenu.forEach((acdnItem)=>{
            if(acdnItem !== submenu){
                acdnItem.classList.remove("active");
                acdnItem.querySelector(".subMenu__list--mobile").style.maxHeight = null;
            }
        })
    })
})
// ======== Accordian Toggle End ========


// ============ Custom select box start ============
const selectBox = document.querySelector(".select-box");
const selected = document .querySelector(".selected");
const optionList = document.querySelectorAll(".option");

selected && selected.addEventListener("click", ()=>{
    selectBox.classList.toggle("active");
});

optionList && optionList.forEach((option)=>{
    option.addEventListener("click", ()=>{
        selected.innerHTML = option.querySelector("label")?.innerHTML;
        selectBox.classList.remove("active");
        selected.classList.add("active");
    });
});

// ============ Custom select box end ============


// ========== Counter script start ============
const counterSections = document.querySelectorAll(".counter-section");
counterSections && counterSections.forEach((counterSection)=>{
    const counters = counterSection.querySelectorAll(".counter-number");
    if(counters.length > 0) {
        let CounterObserver = new IntersectionObserver(
            (entries, observer)=>{
                let [entry] = entries;
                if(!entry.isIntersecting) return;
        
                let speed = 200;
                counters.forEach((counter, index) => {
                    const updateCounter = () =>{
                        let targetNumber = +counter.dataset.target;
                        let initialNumber = +counter.innerText;
                        let incPerCount = targetNumber / speed;
                        if(initialNumber  < targetNumber ){
                            counter.innerText = Math.ceil(initialNumber + incPerCount);
                            setTimeout(updateCounter, 40);
                        }
                    }
                    updateCounter();
                })
                observer.unobserve(counterSection);
            },{
                root:null,
                threshold:0.4,
            }
        );
        CounterObserver.observe(counterSection);
    }
})
// ============ Counter script end ============


// ========= Animation Starts =========
//  animation fade in 
const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
    const anim = gsap.fromTo(mainContent,
        { opacity: 0 },
        { opacity: 1, duration: 1.35, ease: "power3.in" }
    );
    ScrollTrigger.create({
        trigger: mainContent,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.35,
        stagger:0.1,
        ease: "power3.in"
    });
});

// animate fade in up
const textContainers = gsap.utils.toArray(".fade-in-up");
textContainers.forEach((item, i) => {
    const anim = gsap.fromTo(item,
        { opacity: 0, y: 60},
        { opacity: 1, y: 0, duration: 1.15, ease: "power4.out"  }
    );
    ScrollTrigger.create({
        trigger: item,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.15,
        stagger:0.75,
        ease: "power4.out"
    });
});


// Heading Animation 
function animateHeadings(selector){
    const headings = document.querySelectorAll(selector);
    headings.forEach((heading) => {
        const anim = gsap.fromTo(heading,
            {
                backgroundPositionX:"100%",
            },
            {
                backgroundPositionX:"0%",
                duration:1,
                ease:"power3.inOut"
             }
        );
        ScrollTrigger.create({
            trigger:heading,
            animation:anim,
            toggleActions:"play",
            start:"top 98%",
            end:"bottom 40%",
            duration:1,
            scrub:true,
            ease:"power3.inOut"
        })
    })
}

// Aimate the different headings
animateHeadings(".headings-reveal");
animateHeadings(".headings-reveal-2");
animateHeadings(".headings-reveal-3");


// ANimate Dividers
function animateDividers(selector) {
    const dividers = gsap.utils.toArray(selector);
    dividers.forEach((divider) => {
        const anim = gsap.fromTo(divider,
            { opacity: 0, width:"0%"},
            { opacity: 1, width:"100%", duration: 1, ease:"power3.inOut" }
        );
        ScrollTrigger.create({
            trigger: divider,
            animation: anim,
            toggleActions:"play",
            once: true,
            duration:1,
            stagger:1,
            ease:"power3.inOut"
        });
    });
}


// Animate the different dividers
animateDividers(".divider");
animateDividers(".divider-grey") 
animateDividers(".divider-secondary"); 



// Navbar Items Animations
const menuHamburgerBtn = document.querySelector(".hamburger-wrapper");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");
const mobileMenuLinksArr = Array.from(mobileMenuLinks);


menuHamburgerBtn.onclick = function(){
   gsap.fromTo(".mobile-menu", 
        {
            opacity:0,
            x:"-100%",
        },{
            opacity:1,
            x:0,
            duration:0.2,
            ease:"power4.inOut"
        }
    );

    mobileMenuLinksArr.forEach((mobileLink)=>{
        gsap.fromTo(mobileLink,
            {
                opacity:0,
                y:60,
                ease:"power3.inOut"
            },{
                opacity:1,
                y:0,
                duration:1,
                stagger:0.5,
                ease:"power3.inOut"
            }
        )
    });

    gsap.fromTo(".dropdown-icon",
        {
            opacity:0,
            y:100,
            ease:"power4.inOut"
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.15,
            ease:"power4.inOut"
        }
    );

    gsap.from(".footer__link-title",{
        opacity:0,
        y:50,
        duration:0.85,
        delay:0.25,
        ease:"power3.inOut"
    })
    gsap.fromTo(".footer__list-item", 
        {
            opacity:0,
            y:50,        
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.25,
            delay:0.35,
            ease:"power3.inOut"
        }
    )
    gsap.fromTo(".social-link", 
        {
            opacity:0,
            y:50,
         
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.2,
            delay:0.4,
            ease:"power3.inOut"
        }
    )

    stopLenisScroll();
}


closeMenuBtn.onclick = function(){

    gsap.fromTo(".dropdown-icon",
        {
            opacity:1,
            y:0,
        },
        {
            opacity:0,
            y:100,
            duration:1,
            stagger:0.15,
            ease:"power4.inOut"
        },
    )

    mobileMenuLinksArr.forEach((mobileLink)=>{
        gsap.fromTo(mobileLink,
            {
                opacity:1,
                y:0,  
            },{
                opacity:0,
                y:60,
                duration:1,
                stagger:0.5,
                ease:"power3.inOut"
            }
        )
    })
    gsap.fromTo(".mobile-menu", 
        {
            opacity:1,
            x:0,  
        },{
            opacity:0,
            x:"-100%",
            duration:0.2,
            ease:"power4.inOut"
        }
    );
    stopLenisScroll();  
}


const update = (time, deltaTime, frame) => {
    lenis.raf(time * 1000)
}

gsap.ticker.add(update);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    ScrollTrigger.update()
});

//  gsap.ticker.lagSmoothing(0);