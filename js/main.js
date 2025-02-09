let sectionIdx = 0; // 현재 보고 있는 섹션.

window.addEventListener('load', () => {
    const header = document.querySelector('header');
    const section = document.querySelectorAll('section');
    const slideNav = document.querySelector('.slide-nav');

    // 옵저버로 각 섹션이 보여질 때 처리.
    let observer = new IntersectionObserver((e) => {
        e.forEach((param) => {
            if(param.isIntersecting) {
                // 화면 우측에 fix된 슬라이드 바 색상을 변경해야한다.
                for(let i = 0; i < section.length; i++) {
                    slideNav.children[i].children[0].classList.remove('active'); 
                    slideNav.children[i].children[1].classList.remove('active');

                    const targetName = param.target.classList[0];

                    switch (targetName) {
                        case 'intro-section':
                            sectionIdx = 0;
                            break;
                        case 'about-section':
                            sectionIdx = 1;
                            break;
                        case 'skill-section':
                            sectionIdx = 2;
                            break;
                        case 'publ-section':
                            sectionIdx = 3;
                            break;
                        case 'outro-section':
                            sectionIdx = 4;
                            break;
                        default:
                            break;
                    }
                }

                slideNav.children[sectionIdx].children[0].classList.add('active'); 
                slideNav.children[sectionIdx].children[1].classList.add('active');

                if(sectionIdx > 0) {
                    // 섹션 등장 애니메이션.
                    if(sectionIdx < 4) {
                        param.target.style.animation = 'fadeInAndUp2 0.5s linear both';
                    }

                    for(let i = 0; i < section.length; i++) {
                        slideNav.children[i].children[0].style.color = '#2a2a77';
                        slideNav.children[i].children[1].style.backgroundColor = '#2a2a77';
                    }

                    // gnb-btn 색상도 같이 변경.
                    for(let i = 0; i < header.children[0].children.length; i++) {
                        header.children[0].children[i].style.backgroundColor = '#000';                        
                    }
                } else {
                    for(let i = 0; i < section.length; i++) {
                        slideNav.children[i].children[0].style.color = '#fff';
                        slideNav.children[i].children[1].style.backgroundColor = '#fff';
                    }

                    for(let i = 0; i < header.children[0].children.length; i++) {
                        header.children[0].children[i].style.backgroundColor = '#fff';
                    }
                }
            }
        });        
    }, {
        threshold: 0.5
    });

    for(let i = 0; i < section.length; i++) {
        observer.observe(section[i]);
    }
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
    const introHeight =  Number(document.querySelector('.intro-section').style.height.split('px')[0]);

    if(navBtn.classList.contains('active')){
        body.style.overflow = 'visible';
        navBtn.classList.remove('active');
        gnbNav.classList.remove('active');
        
        if(introHeight < scrollY) {
            for(let i = 0; i < header.children[0].children.length; i++) {
                header.children[0].children[i].style.backgroundColor = '#000';
            }
        }
    } else {
        body.style.overflow = 'hidden';
        navBtn.classList.add('active');
        gnbNav.classList.add('active');

        for(let i = 0; i < header.children[0].children.length; i++) {
            header.children[0].children[i].style.backgroundColor = '#fff';
        }
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
    const btnSiblingEle = ele.parentElement.children;
    const descSiblingEle = document.querySelector('.item-desc').parentElement.children;

    for(let i = 0; i < btnSiblingEle.length; i++){
        btnSiblingEle[i].classList.remove('active');
        descSiblingEle[i].classList.remove('active');
    }

    ele.classList.add('active');
    descSiblingEle[idx].classList.add('active');
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