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
        scrollingHeader.style.transform = "translateY(-186px)";
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
    const tl = gsap.timeline({
        defaults:{
            opacity:0,
            duration:1,
            ease:"power3.out"
        }
    });

    const loader = document.querySelector(".loader-container");
    if(loader){
        loader.style.display = "none"; 
    }
    tl.fromTo(".header",
        { opacity:0, y:30 },
        { opacity:1, y:0, }
    )
    tl.from(".header__logo", {
        duration:1.25,
        delay:-1,
    })
    .from(".nav__link", {
        y:30,
        stagger:0.01,
        delay:-1.15,
    })
    .fromTo(".action-btn", 
        { opacity:0, y:30 },
        { 
            opacity:1,
            y:0, 
            stagger:0.02, 
            delay:-1.2, 
            duration:1
        }
    )
    .from(".header-btn", {
        y:30,
        delay:-1.25,
    })
    .from(".hero-rating", {
        y:50,
        delay:-1.25,
    })
    .from(".hero__title", {
        y:50,
        delay:-1.3,
    })
    .from(".hero__subTitle", {
        y:60,
        delay:-1.35,
    })
    .from(".hero-btn", {
        y:50,
        duration:1.2,
        delay:-1.4,
    })
    .from(".hero-banner-img", {
        y:50,
        duration:1.25,
        delay:-1.45,
        ease:"power3.out"
    })
    .fromTo(".icon-box", 
        { opacity:0,  y:50, },
        { 
            opacity:1, y:0, 
            stagger:0.15,
            delay:-1.5, 
            duration:1, 
            ease:"power3.out" 
        }
    )
    .fromTo([".cta-item", ".form-group"], 
        { opacity:0, y:50, },
        { 
            opacity:1,
            y:0 ,        
            duration:1.5,
            stagger:0.1,
            delay:-1.55,
            ease:"power3.out"
        }
    )
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
    stopLenisScroll();
}

if(hamburgerBtn){
    hamburgerBtn.onclick = toggleMobileMenu;
    const closeMenuBtn = document.getElementById("close-menu-btn");
    closeMenuBtn.onclick = toggleMobileMenu;
}
//====== Toggle Mobile Menu End ==========


// Toggle Search Bar
function toggleSearchBar(){
    const searchContainer = document.querySelector(".header-search-container");
    searchContainer.classList.toggle("is-open");
    stopLenisScroll();
    gspa.from(".header-search-wrapper", {
        opacity:0,
        y:50,
        duration:1,
        ease:"power3.out"
    });
}


const searchBtn  = document.querySelector("#search-btn");
if(searchBtn){
    searchBtn.onclick  = toggleSearchBar;
}
const mobileSearchBtn = document.querySelector(".search-icon-wrapper");
if(mobileSearchBtn){
    mobileSearchBtn.onclick  = toggleSearchBar;
}

const closeFormBtn = document.getElementById("close-form-btn");
if(closeFormBtn){
    closeFormBtn.onclick = toggleSearchBar;
}


// ============ Swipers Start =================
const swiperTestmonials = new Swiper('.swiper-testmonials', {
    slidesPerView: 1,
    grabCursor: true,
    loop:true,
    navigation: {
        nextEl: '.swiper-button-testmonials-next',
        prevEl: '.swiper-button-testmonials-prev',
    },
    breakpoints: {
        500: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2.3,
        },
        1280: {
            slidesPerView: 3,
        },
    }
});

const swiperPost = new Swiper('.swiper-post', {
    slidesPerView: 1.4,
    grabCursor: true,
    loop:true,
    autoplay: {
        delay: 2000,
    },
    spaceBetween:7,
    breakpoints: {
        500: {
            slidesPerView: 2.4,
        },
        768: {
            slidesPerView: 3.4,
        },
        992: {
            slidesPerView: 4.4,
        },
        1200: {
            slidesPerView: 5,
            spaceBetween:2,
        },
    }
});
// ============ Swipers End =================


// ======== Accordian Toggle Start ========
function toggleAccordion(accordions){
    accordions.forEach((accordion)=>{
        accordion.addEventListener("click", function(){
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content) {
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
                gsap.from(content.querySelector("p"), 
                {
                    opacity: 0,
                    y:50,
                    duration:1,
                    ease:"power3.out",
                }
            )
            }
    
            accordions.forEach((acdnItem)=>{
                if(acdnItem !== accordion){
                    acdnItem.classList.remove("active");
                    acdnItem.nextElementSibling.style.maxHeight = null;
                }
            })
        });
    })
}

const accordions = document.querySelectorAll(".accordion__title-wrapper");
accordions && toggleAccordion(accordions);

const filterAccordions = document.querySelectorAll(".filter-label");
filterAccordions && toggleAccordion(filterAccordions);


// ---------- Mobile SubMenu Start --------
const mobileSubmenu = document.querySelectorAll(".mobile-submenu ");
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
// ---------- Mobile SubMenu End --------

// ======== Accordian Toggle End ========


// ============ Custom select box start ============
const selectWrapper = document.querySelector('.custom-select-wrapper');
const selectTrigger = document.querySelector('.custom-select-trigger');
const options = document.querySelectorAll('.custom-option');

selectTrigger && selectTrigger.addEventListener('click', () => {
    selectWrapper && selectWrapper.classList.toggle('open');
});

options && options.forEach(option => {
    option.addEventListener('click', () => {
        // const value = option.getAttribute('data-value');
        const text = option.textContent;
        document.querySelector('.custom-option.selected').classList.remove('selected');
        option.classList.add('selected');
        selectTrigger.querySelector('span').textContent = text;
        selectWrapper.classList.remove('open');
    });
});

if(selectWrapper){
    document.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            selectWrapper && selectWrapper.classList.remove('open');
        }
    });
}
// ============ Custom select box end ============


//========== Video Play /Pause Button Start ============
const playBtns = document.querySelectorAll(".play-button-wrapper");
if(playBtns) {
  const videoContainer = document.querySelector(".video__popup-container");
  const closeBtn = document.querySelector(".video__popup-close");
  let iframe = document.querySelector(".video__popup-iframe-container > iframe");

  function togglePopup() {
    videoContainer.classList.toggle("show");
    gsap.fromTo(".video__popup-wrapper", 0.5,
      { opacity:0, y:50},
      { opacity:1, y:0, ease:Power4.easeOut }
    );
    stopLenisScroll();
  }

  playBtns.forEach((playBtn, index) => {
    playBtn.addEventListener("click",() => {
      const videoId = playBtn.dataset.id;
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      togglePopup();
    })
  });

  closeBtn && closeBtn.addEventListener("click", ()=>{
    iframe.src = "";
    togglePopup();
  });
}
//========== Video Play /Pause Button End ============


//===================
const thumbImages = document.querySelectorAll(".thumb-img img");
if(thumbImages) {
    thumbImages.forEach(function(thumbImage){
        thumbImage.addEventListener("click", function(e){
            const src = thumbImage.src;
            const mainImage = document.querySelector(".main-imgBox-figure > img");
            if(mainImage){
                mainImage.src = src;
            }
        })
    })
}

//======= Filter (Mobile) Start ========
function toggleFilterContainer(){
    const filterContainer = document.querySelector(".filters-container");
    filterContainer && filterContainer.classList.toggle("show");
    overlay.classList.toggle("active");
    stopLenisScroll();
}

const filterBtn = document.getElementById("filter-btn");
const closeFilterBtn = document.getElementById("close-filter-btn");

filterBtn && filterBtn.addEventListener("click", toggleFilterContainer)
closeFilterBtn && closeFilterBtn.addEventListener("click", toggleFilterContainer)
//======= Filter (Mobile) End ========



//======= Sort By (Mobile) Start ========
const overlay = document.querySelector('.overlay');
const sortBtn = document.getElementById("sort-by-btn");

function toggleSort(){
    const customSelectWrapper = document.querySelector('.sort-container--mobile .custom-select-wrapper');
    customSelectWrapper && customSelectWrapper.classList.toggle("active");
    overlay.classList.toggle("active");
    stopLenisScroll();
}

sortBtn && sortBtn.addEventListener('click', toggleSort);
overlay && overlay.addEventListener('click', toggleSort);

//======= Sort By (Mobile) End ========


// ===== Mobile Filter Tabs Start ======
function openTab(event, tabName){
    // Hide All Tab Contents
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents && tabContents.forEach((tabContent)=>{
        tabContent.classList.remove("active");
    });

    // Remove Active Class From All The Tablinks
    const tabLinks = document.querySelectorAll(".tablinks");
    tabLinks && tabLinks.forEach((tabLink)=>{
        tabLink.classList.remove("active");
    });

    // Show the current tab and active class to the tab link
    const currentTab =  document.getElementById(tabName);
    currentTab && currentTab.classList.add("active");
    const tabChildren = currentTab.children;
    gsap.fromTo(tabChildren , 
        { 
            opacity:0, 
            y:50
        },
        {
            opacity:1,
            y:0,
            duration:1,
            stagger:0.15,
            ease:"power3.out"
        }
    )
    event.currentTarget.classList.add("active");
}

// Add event listeners to all tablinks
const tabLinks = document.querySelectorAll(".tablinks");
tabLinks && tabLinks.forEach((tabLink)=>{
    tabLink.addEventListener("click", (e)=>{
        const tabName = tabLink.dataset.tab;
        openTab(e, tabName);
    })
})
// ===== Mobile Filter Tabs End ======


// ========= Animation Starts =========
//  animation fade in 
const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
    const anim = gsap.fromTo(mainContent,
        { opacity: 0 },
        { opacity: 1, duration: 1.1, ease: "power4.in" }
    );
    ScrollTrigger.create({
        trigger: mainContent,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.1,
        stagger:0.1,
        ease: "power3.in"
    });
});

// animate fade in up
const fadeInUp = gsap.utils.toArray(".fade-in-up");
fadeInUp.forEach((item, i) => {
    const anim = gsap.fromTo(item,
        { opacity: 0, y: 60},
        { opacity: 1, y: 0, duration: 1.05, ease: "power3.out" }
    );
    ScrollTrigger.create({
        trigger: item,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.05,
        stagger:0.1,
        ease: "power3.out"
    });
});



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

    gsap.fromTo(".caret-down-icon",
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
    gsap.fromTo(".socials-link", 
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
    gsap.fromTo(".caret-down-icon",
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