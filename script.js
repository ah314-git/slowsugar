
/* 햄버거 메뉴 */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile_nav');
const close = document.querySelector('.close');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
});

close.addEventListener('click', () => {
    mobileNav.classList.remove('active');
});



/* 카드 슬라이더 */
const cardList = document.querySelector('.menu_card_list');
const cards = document.querySelectorAll('.menu_card');
const tabs = document.querySelectorAll('.menu_tab li');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const tabDisplay = document.querySelector('.tab_display');

let currentIdx = 0;
const cardWidth = 256;
const gap = 40;
const moveSize = cardWidth + gap;
let isMoving = false;


tabs.forEach((tab, index) => {

    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');


        const isMobile = window.innerWidth <= 480;
        const moveDist = isMobile ? 60 : 100;
        tabDisplay.style.transform = `translateX(${index * moveDist}px)`;


        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'ALL' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        currentIdx = 0;
        cardList.style.transition = 'none';
        cardList.style.transform = `translateX(0px)`;

        setTimeout(() => {
            cardList.style.transition = 'transform 0.3s ease-in-out';
        }, 10);
    });

});


nextBtn.addEventListener('click', () => {
    if (isMoving) return;
    const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');

    if (currentIdx < visibleCards.length - 4) {
        isMoving = true;
        currentIdx++;
        cardList.style.transform = `translateX(-${currentIdx * moveSize}px)`;
        setTimeout(() => { isMoving = false; }, 500);
    }
});

prevBtn.addEventListener('click', () => {
    if (isMoving) return;
    if (currentIdx > 0) {
        isMoving = true;
        currentIdx--;
        cardList.style.transform = `translateX(-${currentIdx * moveSize}px)`;
        setTimeout(() => { isMoving = false; }, 500);
    }
});






/* 풀페이지 스크롤링 */
const sections = document.querySelectorAll('.section');
const footer = document.querySelector('footer');
let current = 0;
let isScrolling = false;



window.addEventListener('wheel', (e) => {

    if (current === sections.length - 1 && e.deltaY > 0) {
        return; 
    }
    if (current === sections.length - 1 && e.deltaY < 0 && window.scrollY > sections[current].offsetTop) {
        return;
    }
    e.preventDefault();
    if (isScrolling) return;



    const direction = e.deltaY > 0 ? 1 : -1;

    if (direction === 1 && current === sections.length - 1) return;
    if (direction === -1 && current === 0) return;

    isScrolling = true;
    current += direction;

    window.scrollTo({
        top: sections[current].offsetTop,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}, { passive: false });


/* 풀페이지 스크롤링(모바일) */
let touchStartY = 0;

window.addEventListener('touchmove', (e) => {
    if (current < sections.length - 1) {
        if (e.cancelable) e.preventDefault();
    }
}, { passive: false });

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].pageY;
}, { passive: false });

window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].pageY;
    const diffY = touchStartY - touchEndY;
    const threshold = 40;

    if (isScrolling) return;
    if (diffY < -threshold) { 
        if (current > 0) {
            isScrolling = true;
            current--;
            moveToSection();
        }
    } 
    else if (diffY > threshold) {
        if (current < sections.length - 1) {
            isScrolling = true;
            current++;
            moveToSection();
        }
    }
}, { passive: false });


function moveToSection() {
    window.scrollTo({
        top: sections[current].offsetTop,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}