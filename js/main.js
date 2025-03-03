let sectionIdx = 0; // 현재 보고 있는 섹션.

window.addEventListener('load', () => {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const slideNav = document.querySelector('.slide-nav');

    // 섹션 인덱스 매핑.
    const SECTION_INDICES = {
        'intro-section': 0,
        'about-section': 1,
        'skill-section': 2,
        'publ-section': 3,
        'outro-section': 4
    };

    const setNavStyles = (color, bgColor) => {
        Array.from(slideNav.children).forEach(child => {
            child.children[0].style.color = color;
            child.children[1].style.backgroundColor = bgColor;
        });
    };

    const setHeaderStyles = (color) => {
        Array.from(header.children[0].children).forEach(child => {
            child.style.backgroundColor = color;
        });
    };

    // 옵저버로 각 섹션이 보여질 때 처리
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                Array.from(slideNav.children).forEach(child => {
                    child.children[0].classList.remove('active');
                    child.children[1].classList.remove('active');
                });

                // 현재 섹션 인덱스 설정.
                const targetName = entry.target.classList[0];
                sectionIdx = SECTION_INDICES[targetName] ?? sectionIdx;

                // 현재 섹션 활성화.
                const currentNav = slideNav.children[sectionIdx];
                if (currentNav) {
                    currentNav.children[0].classList.add('active');
                    currentNav.children[1].classList.add('active');
                }

                // 스타일 적용.
                if (sectionIdx > 0) {
                    if (sectionIdx < 4) {
                        entry.target.style.animation = 'fadeInAndUp2 0.5s linear both';
                    }
                    
                    setNavStyles('#40362f', '#40362f');
                    setHeaderStyles('#000');
                } else {
                    setNavStyles('#fff', '#fff');
                    setHeaderStyles('#fff');
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});

window.addEventListener('resize', () => {
    InOutSectionHeightSet();
});

window.addEventListener("DOMContentLoaded", () => {
    InOutSectionHeightSet();
});

// nav-btn toggle 기능.
function navToggle() {
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const navBtn = document.querySelector('.gnb-btn');
    const gnbNav = document.querySelector('.gnb-nav');
    const introSection = document.querySelector('.intro-section');
    const introHeight = parseInt(introSection.style.height) || 0;
    const isNavActive = navBtn.classList.contains('active');
    
    const setMobileGnbBtnColor = (color) => {
        Array.from(header.children[0].children).forEach(child => {
            child.style.backgroundColor = color;
        });
    };

    if (isNavActive) {
        body.style.overflow = 'visible';
        navBtn.classList.remove('active');
        gnbNav.classList.remove('active');
        
        if (introHeight < window.scrollY) {
            setMobileGnbBtnColor('#000');
        }
    } else {
        body.style.overflow = 'hidden';
        navBtn.classList.add('active');
        gnbNav.classList.add('active');
        setMobileGnbBtnColor('#fff');
    }
}

// in, outro 섹션 높이 세팅.
function InOutSectionHeightSet() {
    document.querySelector('.intro-section').style.height = `${window.innerHeight}px`;
    document.querySelector('.outro-section').style.height = `${window.innerHeight}px`;
}

// slide nav에 mouseenter & leave일 때.
function slideNavMouseEnter(ele) {
    ele.children[0].classList.add('active');
    ele.children[1].classList.add('active');
}

function slideNavMouseLeave(idx, ele) {
    if(sectionIdx != idx) { // 현재 섹션의 nav에 마우스가 떠났을 때 나타나는 버그 방지.
        ele.children[0].classList.remove('active');
        ele.children[1].classList.remove('active');
    }
}

// 퍼블리싱 작업물 선택.
function itemView(idx, ele) {
    const btnContainer = ele.parentElement;
    const descContainer = document.querySelector('.item-desc').parentElement;

    Array.from(btnContainer.children).forEach(btn => btn.classList.remove('active'));
    Array.from(descContainer.children).forEach(desc => desc.classList.remove('active'));

    ele.classList.add('active');
    descContainer.children[idx]?.classList.add('active');
}

// modal로 작업물 보이기.
let urls = [
    "https://91calicali.github.io/vogue-main-page-hard-coding/",
    "https://91calicali.github.io/neker-main-page-hard-coding/",
    "publishing/coupang-play.html",
    "publishing/mega-login.html",
];

function viewPageInModal(idx) {
    let container = document.querySelector(".container");

    let modal = `
            <div id="modal" class="web-page-modal">
                <iframe src="${urls[idx]}"></iframe>
                <div class="web-page-modal-close-btn" onClick="hideModal()">&larr;<div>
            </div>
            `;

    container.insertAdjacentHTML("beforeend", modal);
}

// modal 제거.
function hideModal() {
    let modal = document.getElementById("modal");

    modal.remove();
}

function webEventPop() {
    const pop = document.querySelector('.web-event-popup');

    if(pop.classList.contains('active')) {
        pop.classList.remove('active');
    } else {
        pop.classList.add('active');
    }
}