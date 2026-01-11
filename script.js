
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
