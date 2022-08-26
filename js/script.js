const $J = document.querySelector.bind (document);
const $$ = document.querySelectorAll.bind (document);

//HEADER//
$J("#search-input").oninput = function () {
    if (!this.value) {
        $("#close-search-icon").css ("display", "none");
    }
    else {
        $("#close-search-icon").css ("display", "block");
    }
}
$("#close-search-icon").click (function() {
    $J("#search-input").value = "";
    $("#close-search-icon").css ("display", "none");
})
//HEADER//
let openMenu = false;
$J(".menu-icon").onclick = () => {
    $J("#menu-icon").classList.toggle ("animation-menu-icon");
    $J(".menu-navigation").classList.toggle ("active");
    if (openMenu) {
        $("body").css ("overflow", "auto");
    }
    else {
        $("body").css ("overflow", "hidden");
    }
    openMenu = !openMenu;
    $$("section .menu-navigation .item-navigation .item-navigation__text").forEach (item => {
        if (item.style.display == "block") {
            item.classList.add ("hideText");
            setTimeout (()=> {
                item.style.display = "none";
                item.classList.remove ("hideText");
            }, 300)
        }
        else {
            item.style.display = "block";
        }
    })
}

let objPagnition = {
    sizePage: 9,
    delegate: ".item-web-project",
    useLastFirst: true,
    useNextPrev: true,
    sizePagnition: 5,
    contentMoveLast: `<span class="material-symbols-outlined">double_arrow</span>`,
    contentMoveFirst: `<span class="material-symbols-outlined">keyboard_double_arrow_left</span>`,
    contentNext: `<span class="material-symbols-outlined">keyboard_arrow_right</span>`,
    contentPrev: `<span class="material-symbols-outlined">keyboard_arrow_left</span>`,
    scrollBehavior: 'smooth',
    scrollEl: 'top-page',
    unique: true,
    responsive: [
        {
            breakpoint: 600,
            setting: {
                sizePagnition: 3,
            }
        },
        {
            breakpoint: 300,
            setting: {
                sizePagnition: 2
            }
        }
    ]
}

$("#pagnition-project-web").pagnition (objPagnition);