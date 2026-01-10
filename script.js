const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile_nav');
const close = document.querySelector('.close');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
});

close.addEventListener('click', () => {
    mobileNav.classList.remove('active');
});
